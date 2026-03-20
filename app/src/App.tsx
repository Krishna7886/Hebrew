import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, ChevronRight, ChevronLeft, BookOpen, MessageSquare, GraduationCap, RefreshCw, X, Loader2, AlertCircle } from 'lucide-react';
import { HEBREW_ALPHABET, FLASHCARDS, HebrewLetter, FlashcardData } from './constants';
import { getPronunciation, askTutor, textToSpeech } from './services/geminiService';
import Markdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Plays raw PCM audio data from Gemini TTS (24kHz, 16-bit, mono)
 */
let sharedAudioContext: AudioContext | null = null;

async function playRawAudio(base64Data: string) {
  if (base64Data === "FALLBACK_TO_BROWSER") return; // Handled separately in components
  try {
    if (!sharedAudioContext) {
      sharedAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    
    // Ensure context is running (browsers suspend it until user interaction)
    if (sharedAudioContext.state === 'suspended') {
      await sharedAudioContext.resume();
    }

    const binaryString = window.atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Convert 16-bit PCM to Float32
    const int16Array = new Int16Array(bytes.buffer);
    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768;
    }

    const audioBuffer = sharedAudioContext.createBuffer(1, float32Array.length, 24000);
    audioBuffer.getChannelData(0).set(float32Array);

    const source = sharedAudioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(sharedAudioContext.destination);
    source.start();
    
    return new Promise<void>((resolve) => {
      source.onended = () => {
        resolve();
      };
    });
  } catch (err) {
    console.error("Error playing raw audio:", err);
  }
}

/**
 * Fallback using browser's built-in SpeechSynthesis
 */
function speakWithBrowser(text: string) {
  return new Promise<void>((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'he-IL'; // Hebrew
    utterance.rate = 0.9;
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

// --- Components ---

const AlphabetCard = ({ letter }: { letter: HebrewLetter }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing'>('idle');

  const playSound = async () => {
    if (status !== 'idle') return;
    setStatus('loading');
    
    // Try pre-recorded audio first
    if (letter.audio) {
      try {
        setStatus('playing');
        const audio = new Audio(letter.audio);
        await new Promise((resolve, reject) => {
          audio.onended = resolve;
          audio.onerror = reject;
          audio.play().catch(reject);
        });
        setStatus('idle');
        return;
      } catch (e) {
        console.warn("Pre-recorded audio failed, trying AI...");
      }
    }

    try {
      const base64 = await getPronunciation(letter.char);
      if (base64 === "FALLBACK_TO_BROWSER") {
        setStatus('playing');
        await speakWithBrowser(letter.char);
      } else if (base64) {
        setStatus('playing');
        await playRawAudio(base64);
      }
    } catch (err) {
      // Final fallback
      setStatus('playing');
      await speakWithBrowser(letter.char);
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 flex flex-col items-center justify-center gap-2 cursor-pointer group"
        onClick={playSound}
      >
        <span className="hebrew-text text-5xl font-bold text-stone-800 group-hover:text-emerald-600 transition-colors">
          {letter.char}
        </span>
        <div className="text-center">
          <p className="text-sm font-semibold text-stone-600">{letter.name}</p>
          <p className="text-xs text-stone-400 italic">{letter.transliteration}</p>
        </div>
        {status === 'loading' ? (
          <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
        ) : (
          <Volume2 className={cn("w-4 h-4 text-stone-300 group-hover:text-emerald-500 transition-colors", status === 'playing' && "text-emerald-500 animate-pulse")} />
        )}
      </motion.div>
    </div>
  );
};

const Flashcard = ({ card }: { card: FlashcardData }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing'>('idle');

  const playSound = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status !== 'idle') return;
    setStatus('loading');

    // Try pre-recorded audio first
    if (card.audio) {
      try {
        setStatus('playing');
        const audio = new Audio(card.audio);
        await new Promise((resolve, reject) => {
          audio.onended = resolve;
          audio.onerror = reject;
          audio.play().catch(reject);
        });
        setStatus('idle');
        return;
      } catch (e) {
        console.warn("Pre-recorded audio failed, trying AI...");
      }
    }

    try {
      const base64 = await getPronunciation(card.hebrew);
      if (base64 === "FALLBACK_TO_BROWSER") {
        setStatus('playing');
        await speakWithBrowser(card.hebrew);
      } else if (base64) {
        setStatus('playing');
        await playRawAudio(base64);
      }
    } catch (err) {
      setStatus('playing');
      await speakWithBrowser(card.hebrew);
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div 
      className="perspective-1000 w-full h-64 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full h-full preserve-3d"
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-lg border border-stone-100 flex flex-col items-center justify-center p-8">
          <span className="hebrew-text text-7xl font-bold text-stone-800 mb-4">{card.hebrew}</span>
          <button 
            onClick={playSound}
            className="p-3 rounded-full bg-stone-50 hover:bg-emerald-50 text-stone-400 hover:text-emerald-600 transition-colors"
          >
            {status === 'loading' ? (
              <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            ) : (
              <Volume2 className={cn("w-6 h-6", status === 'playing' && "animate-pulse text-emerald-600")} />
            )}
          </button>
          <p className="mt-4 text-stone-400 text-sm uppercase tracking-widest font-semibold">Tap to flip</p>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden bg-emerald-600 rounded-3xl shadow-lg flex flex-col items-center justify-center p-8 text-white"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <p className="text-xl font-medium opacity-80 mb-2">{card.transliteration}</p>
          <h3 className="text-3xl font-bold text-center">{card.english}</h3>
          <span className="mt-6 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider">
            {card.category}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

const TutorChat = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "Shalom! I'm your Hebrew tutor. Ask me anything about Hebrew grammar, vocabulary, or how to pronounce words!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await askTutor(userMsg, []);
      setMessages(prev => [...prev, { role: 'model', text: response || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to tutor. Please try again." }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  const speakMessage = async (text: string, index: number) => {
    if (playingIndex !== null || loadingIndex !== null) return;
    setLoadingIndex(index);
    try {
      // Clean markdown for better TTS
      const cleanText = text.replace(/[*_#`]/g, '');
      const base64 = await textToSpeech(cleanText);
      if (base64 === "FALLBACK_TO_BROWSER") {
        setLoadingIndex(null);
        setPlayingIndex(index);
        await speakWithBrowser(cleanText);
      } else if (base64) {
        setLoadingIndex(null);
        setPlayingIndex(index);
        await playRawAudio(base64);
      }
    } finally {
      setLoadingIndex(null);
      setPlayingIndex(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-stone-100 flex flex-col h-[600px] overflow-hidden">
      <div className="p-6 border-bottom border-stone-100 bg-stone-50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="font-bold text-stone-800">AI Hebrew Tutor</h3>
          <p className="text-xs text-stone-500">Always online to help</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex flex-col", msg.role === 'user' ? "items-end" : "items-start")}>
            <div className={cn(
              "max-w-[80%] p-4 rounded-2xl text-sm relative group",
              msg.role === 'user' 
                ? "bg-emerald-600 text-white rounded-tr-none" 
                : "bg-stone-100 text-stone-800 rounded-tl-none"
            )}>
              <Markdown>{msg.text}</Markdown>
              {msg.role === 'model' && (
                <button 
                  onClick={() => speakMessage(msg.text, i)}
                  className={cn(
                    "absolute -right-10 top-2 p-2 rounded-full bg-white shadow-sm border border-stone-100 text-stone-400 hover:text-emerald-600 transition-all opacity-0 group-hover:opacity-100",
                    (playingIndex === i || loadingIndex === i) && "opacity-100 text-emerald-600"
                  )}
                >
                  {loadingIndex === i ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Volume2 className={cn("w-4 h-4", playingIndex === i && "animate-pulse")} />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-stone-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-4 border-t border-stone-100 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about a word or rule..."
          className="flex-1 bg-stone-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'alphabet' | 'flashcards' | 'tutor'>('alphabet');
  const [cardIndex, setCardIndex] = useState(0);

  const nextCard = () => setCardIndex((prev) => (prev + 1) % FLASHCARDS.length);
  const prevCard = () => setCardIndex((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">א</div>
            <h1 className="text-xl font-bold tracking-tight text-stone-800">Aleph Learning</h1>
          </div>
          <nav className="hidden md:flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('alphabet')}
              className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all", activeTab === 'alphabet' ? "bg-white shadow-sm text-emerald-600" : "text-stone-500 hover:text-stone-800")}
            >
              Alphabet
            </button>
            <button 
              onClick={() => setActiveTab('flashcards')}
              className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all", activeTab === 'flashcards' ? "bg-white shadow-sm text-emerald-600" : "text-stone-500 hover:text-stone-800")}
            >
              Flashcards
            </button>
            <button 
              onClick={() => setActiveTab('tutor')}
              className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all", activeTab === 'tutor' ? "bg-white shadow-sm text-emerald-600" : "text-stone-500 hover:text-stone-800")}
            >
              AI Tutor
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'alphabet' && (
            <motion.div
              key="alphabet"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-4xl font-bold text-stone-900 mb-4">The Alef-Bet</h2>
                <p className="text-stone-500">Tap any letter to hear its pronunciation. Hebrew is read from right to left!</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {HEBREW_ALPHABET.map((letter) => (
                  <AlphabetCard key={letter.char} letter={letter} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'flashcards' && (
            <motion.div
              key="flashcards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 max-w-md mx-auto"
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold text-stone-900 mb-4">Vocabulary</h2>
                <p className="text-stone-500">Master common phrases with interactive cards.</p>
              </div>
              
              <div className="relative">
                <Flashcard card={FLASHCARDS[cardIndex]} />
                
                <div className="flex items-center justify-between mt-8">
                  <button 
                    onClick={prevCard}
                    className="p-3 rounded-full bg-white shadow-md hover:bg-stone-50 text-stone-600 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <span className="text-stone-400 font-mono text-sm">
                    {cardIndex + 1} / {FLASHCARDS.length}
                  </span>
                  <button 
                    onClick={nextCard}
                    className="p-3 rounded-full bg-white shadow-md hover:bg-stone-50 text-stone-600 transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'tutor' && (
            <motion.div
              key="tutor"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold text-stone-900 mb-4">Personal Tutor</h2>
                <p className="text-stone-500">Stuck on a rule? Ask our AI tutor for help anytime.</p>
              </div>
              <TutorChat />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-6 py-3 flex justify-around items-center z-50">
        <button 
          onClick={() => setActiveTab('alphabet')}
          className={cn("flex flex-col items-center gap-1", activeTab === 'alphabet' ? "text-emerald-600" : "text-stone-400")}
        >
          <GraduationCap className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Alphabet</span>
        </button>
        <button 
          onClick={() => setActiveTab('flashcards')}
          className={cn("flex flex-col items-center gap-1", activeTab === 'flashcards' ? "text-emerald-600" : "text-stone-400")}
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Cards</span>
        </button>
        <button 
          onClick={() => setActiveTab('tutor')}
          className={cn("flex flex-col items-center gap-1", activeTab === 'tutor' ? "text-emerald-600" : "text-stone-400")}
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Tutor</span>
        </button>
      </div>
    </div>
  );
}
