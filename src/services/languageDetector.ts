import { SupportedLanguage, LanguageInfo } from '../types';

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    samplePhrase: 'Periods are irregular for the last 6 months, having acne and weight gain around belly',
    transliteratedSample: 'Periods are irregular, having acne and facial hair'
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    samplePhrase: 'ನನ್ನ ಮುಟ್ಟು ಸರಿಯಾಗಿ ಆಗುತ್ತಿಲ್ಲ, ಮುಖದ ಮೇಲೆ ಕೂದಲು ಬರುತ್ತಿದೆ ಮತ್ತು ತೂಕ ಹೆಚ್ಚಾಗಿದೆ',
    transliteratedSample: 'Periods late aagide, dates sari aagi barthilla, face alli hair & weight jasti aagthide'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    samplePhrase: 'पिछले छह महीनों से पीरियड्स समय पर नहीं आ रहे हैं, चेहरे पर अनचाहे बाल और मुंहासे हैं',
    transliteratedSample: 'Periods time pe nahi aa rahe, mahina late ho gaya, face pe baal aur pimples ho gaye'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    samplePhrase: 'மாதவிடாய் ஒழுங்கற்றதாக உள்ளது, முகத்தில் முடி வளர்கிறது மற்றும் உடல் எடை அதிகரித்துள்ளது',
    transliteratedSample: 'Periods sariya varala, irregular dates, face la mudi valaruthu weight athigam aachu'
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    samplePhrase: 'పీరియడ్స్ క్రమం తప్పాయి, ముఖంపై వెంట్రుకలు వస్తున్నాయి మరియు బరువు పెరుగుతోంది',
    transliteratedSample: 'Periods time ki raavadam ledu, irregular dates, face meeda ventrukalu and weight perigindi'
  }
];

// Transliterated keyword signals
const KANGLISH_KEYWORDS = [
  'aagide', 'aagthide', 'barthilla', 'baralla', 'koodlu', 'thale', 'jasti', 'kammi', 'muttu',
  'dinagalu', 'yenu', 'beku', 'hechhu', 'gothe', 'sari', 'illa', 'madodu', 'kannada', 'agilla'
];

const HINGLISH_KEYWORDS = [
  'nahi', 'aa rahe', 'chadh gaya', 'mahina', 'baal', 'chehre', 'vajan', 'badh', 'gaya',
  'dard', 'bahut', 'chakar', 'pet', 'khun', 'khoon', 'kamzori', 'thakan', 'chinta', 'hota'
];

const TANGLISH_KEYWORDS = [
  'sariya', 'varala', 'mudi', 'valaruthu', 'udambu', 'edai', 'kooduthu', 'valikuthu',
  'vayiru', 'raththam', 'adikkadi', 'seekiram', 'thalli', 'pona', 'madhividai'
];

const TELUGLISH_KEYWORDS = [
  'raavadam', 'ledu', 'perigindi', 'ventrukalu', 'kallu', 'kadupu', 'noppi', 'ekkuva',
  'bada', 'chala', 'vastundi', 'nellu', 'tappayi', 'samayamlo'
];

export function detectLanguage(text: string): {
  language: SupportedLanguage;
  isTransliterated: boolean;
  confidence: number;
} {
  const trimmed = text.trim();
  if (!trimmed) {
    return { language: 'en', isTransliterated: false, confidence: 1 };
  }

  // 1. Check Native Unicode Script Ranges
  const kannadaRegex = /[\u0C80-\u0CFF]/;
  const devanagariRegex = /[\u0900-\u097F]/;
  const tamilRegex = /[\u0B80-\u0BFF]/;
  const teluguRegex = /[\u0C00-\u0C7F]/;

  const charCounts = {
    kn: (trimmed.match(/[\u0C80-\u0CFF]/g) || []).length,
    hi: (trimmed.match(/[\u0900-\u097F]/g) || []).length,
    ta: (trimmed.match(/[\u0B80-\u0BFF]/g) || []).length,
    te: (trimmed.match(/[\u0C00-\u0C7F]/g) || []).length,
  };

  const maxScript = Object.entries(charCounts).reduce((a, b) => b[1] > a[1] ? b : a);
  if (maxScript[1] > 3) {
    return {
      language: maxScript[0] as SupportedLanguage,
      isTransliterated: false,
      confidence: 0.95
    };
  }

  // 2. Check Transliterated / Code-mixed patterns (Latin script with Indian language tokens)
  const lower = trimmed.toLowerCase();
  
  const countMatches = (keywords: string[]) => 
    keywords.reduce((acc, kw) => acc + (lower.includes(kw) ? 1 : 0), 0);

  const kanglishScore = countMatches(KANGLISH_KEYWORDS);
  const hinglishScore = countMatches(HINGLISH_KEYWORDS);
  const tanglishScore = countMatches(TANGLISH_KEYWORDS);
  const teluglishScore = countMatches(TELUGLISH_KEYWORDS);

  const transliteratedScores = [
    { lang: 'kn' as SupportedLanguage, score: kanglishScore },
    { lang: 'hi' as SupportedLanguage, score: hinglishScore },
    { lang: 'ta' as SupportedLanguage, score: tanglishScore },
    { lang: 'te' as SupportedLanguage, score: teluglishScore },
  ];

  transliteratedScores.sort((a, b) => b.score - a.score);

  if (transliteratedScores[0].score >= 1) {
    return {
      language: transliteratedScores[0].lang,
      isTransliterated: true,
      confidence: 0.85
    };
  }

  return {
    language: 'en',
    isTransliterated: false,
    confidence: 0.9
  };
}
