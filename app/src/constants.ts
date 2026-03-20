export interface HebrewLetter {
  char: string;
  name: string;
  pronunciation: string;
  transliteration: string;
  audio?: string;
}

export const HEBREW_ALPHABET: HebrewLetter[] = [
  { char: 'א', name: 'Aleph', pronunciation: 'Silent or glottal stop', transliteration: "'", audio: 'https://www.dictionary.co.il/audio/aleph.mp3' },
  { char: 'ב', name: 'Bet', pronunciation: 'B as in boy (with dagesh) or V as in vine', transliteration: 'B/V', audio: 'https://www.dictionary.co.il/audio/bet.mp3' },
  { char: 'ג', name: 'Gimel', pronunciation: 'G as in girl', transliteration: 'G', audio: 'https://www.dictionary.co.il/audio/gimel.mp3' },
  { char: 'ד', name: 'Dalet', pronunciation: 'D as in dog', transliteration: 'D', audio: 'https://www.dictionary.co.il/audio/dalet.mp3' },
  { char: 'ה', name: 'He', pronunciation: 'H as in house', transliteration: 'H', audio: 'https://www.dictionary.co.il/audio/he.mp3' },
  { char: 'ו', name: 'Vav', pronunciation: 'V as in vine', transliteration: 'V', audio: 'https://www.dictionary.co.il/audio/vav.mp3' },
  { char: 'ז', name: 'Zayin', pronunciation: 'Z as in zebra', transliteration: 'Z', audio: 'https://www.dictionary.co.il/audio/zayin.mp3' },
  { char: 'ח', name: 'Het', pronunciation: 'Ch as in Bach', transliteration: 'Ch', audio: 'https://www.dictionary.co.il/audio/chet.mp3' },
  { char: 'ט', name: 'Tet', pronunciation: 'T as in tall', transliteration: 'T', audio: 'https://www.dictionary.co.il/audio/tet.mp3' },
  { char: 'י', name: 'Yod', pronunciation: 'Y as in yes', transliteration: 'Y', audio: 'https://www.dictionary.co.il/audio/yod.mp3' },
  { char: 'כ', name: 'Kaf', pronunciation: 'K as in kite (with dagesh) or Ch as in Bach', transliteration: 'K/Ch', audio: 'https://www.dictionary.co.il/audio/kaf.mp3' },
  { char: 'ל', name: 'Lamed', pronunciation: 'L as in look', transliteration: 'L', audio: 'https://www.dictionary.co.il/audio/lamed.mp3' },
  { char: 'מ', name: 'Mem', pronunciation: 'M as in mom', transliteration: 'M', audio: 'https://www.dictionary.co.il/audio/mem.mp3' },
  { char: 'נ', name: 'Nun', pronunciation: 'N as in now', transliteration: 'N', audio: 'https://www.dictionary.co.il/audio/nun.mp3' },
  { char: 'ס', name: 'Samekh', pronunciation: 'S as in sun', transliteration: 'S', audio: 'https://www.dictionary.co.il/audio/samech.mp3' },
  { char: 'ע', name: 'Ayin', pronunciation: 'Silent or deep glottal', transliteration: "`", audio: 'https://www.dictionary.co.il/audio/ayin.mp3' },
  { char: 'פ', name: 'Pe', pronunciation: 'P as in park (with dagesh) or F as in fish', transliteration: 'P/F', audio: 'https://www.dictionary.co.il/audio/pe.mp3' },
  { char: 'צ', name: 'Tsadi', pronunciation: 'Ts as in cats', transliteration: 'Ts', audio: 'https://www.dictionary.co.il/audio/tsadi.mp3' },
  { char: 'ק', name: 'Kof', pronunciation: 'K as in kite', transliteration: 'K', audio: 'https://www.dictionary.co.il/audio/kof.mp3' },
  { char: 'ר', name: 'Resh', pronunciation: 'R as in rain (rolled)', transliteration: 'R', audio: 'https://www.dictionary.co.il/audio/resh.mp3' },
  { char: 'ש', name: 'Shin/Sin', pronunciation: 'Sh as in shoe or S as in sun', transliteration: 'Sh/S', audio: 'https://www.dictionary.co.il/audio/shin.mp3' },
  { char: 'ת', name: 'Tav', pronunciation: 'T as in tall', transliteration: 'T', audio: 'https://www.dictionary.co.il/audio/tav.mp3' },
];

export interface FlashcardData {
  hebrew: string;
  transliteration: string;
  english: string;
  category: string;
  audio?: string;
}

export const FLASHCARDS: FlashcardData[] = [
  { hebrew: 'שלום', transliteration: 'Shalom', english: 'Hello / Peace / Goodbye', category: 'Greetings', audio: 'https://www.dictionary.co.il/audio/shalom.mp3' },
  { hebrew: 'תודה', transliteration: 'Toda', english: 'Thank you', category: 'Greetings', audio: 'https://www.dictionary.co.il/audio/toda.mp3' },
  { hebrew: 'בבקשה', transliteration: 'Bevakasha', english: 'Please / You\'re welcome', category: 'Greetings' },
  { hebrew: 'כן', transliteration: 'Ken', english: 'Yes', category: 'Basics', audio: 'https://www.dictionary.co.il/audio/ken.mp3' },
  { hebrew: 'לא', transliteration: 'Lo', english: 'No', category: 'Basics', audio: 'https://www.dictionary.co.il/audio/lo.mp3' },
  { hebrew: 'סליחה', transliteration: 'Slicha', english: 'Excuse me / Sorry', category: 'Greetings' },
  { hebrew: 'בוקר טוב', transliteration: 'Boker Tov', english: 'Good morning', category: 'Greetings' },
  { hebrew: 'לילה טוב', transliteration: 'Layla Tov', english: 'Good night', category: 'Greetings' },
  { hebrew: 'מים', transliteration: 'Mayim', english: 'Water', category: 'Food & Drink', audio: 'https://www.dictionary.co.il/audio/mayim.mp3' },
  { hebrew: 'לחם', transliteration: 'Lechem', english: 'Bread', category: 'Food & Drink', audio: 'https://www.dictionary.co.il/audio/lechem.mp3' },
];
