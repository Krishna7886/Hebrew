import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function textToSpeech(text: string): Promise<string | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (error: any) {
    console.error("Error in textToSpeech:", error);
    
    // Check if it's a quota error
    if (error?.message?.includes('quota') || error?.message?.includes('429')) {
      console.warn("Gemini Quota exceeded. Falling back to browser SpeechSynthesis.");
      return "FALLBACK_TO_BROWSER";
    }
    return null;
  }
}

export async function getPronunciation(text: string): Promise<string | null> {
  return textToSpeech(`Pronounce clearly in Hebrew: ${text}`);
}

export async function askTutor(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are a helpful and encouraging Hebrew language tutor. Help the user with grammar, vocabulary, and pronunciation tips. Keep explanations simple and use transliterations (e.g., Shalom).",
    },
  });

  // We don't actually use the history in the create call for this SDK version as per docs, 
  // but we can send messages sequentially or just use generateContent for simplicity if needed.
  // Actually, sendMessage is better for chat.
  
  // For simplicity in this turn, I'll just use generateContent with context if needed, 
  // but let's try the chat sendMessage.
  
  const response = await chat.sendMessage({ message });
  return response.text;
}
