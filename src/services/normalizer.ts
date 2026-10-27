import { SupportedLanguage } from '../types';

interface ColloquialMapping {
  patterns: (string | RegExp)[];
  standardEnglish: string;
  category: 'menstrual' | 'hyperandrogenism' | 'metabolic' | 'systemic' | 'fertility' | 'red_flag';
}

const COLLOQUIAL_DICTIONARY: ColloquialMapping[] = [
  // Menstrual irregularity / Amenorrhea / Oligomenorrhea
  {
    patterns: [
      /periods?\s*(are\s*)?late/i,
      /periods?\s*(are\s*)?irregular/i,
      /missed\s*(my\s*)?periods?/i,
      /irregular\s*dates/i,
      /dates?\s*(are\s*)?late/i,
      /dates?\s*(are\s*)?missing/i,
      /chums?\s*late/i,
      /cycle\s*(is\s*)?delayed/i,
      /cycle\s*gap\s*is\s*too\s*long/i,
      /periods?\s*aagthilla/i,
      /periods?\s*late\s*aagide/i,
      /dates\s*sari\s*aagi\s*barthilla/i,
      /dates\s*sari\s*illa/i,
      /muttu\s*sariyilla/i,
      /muttu\s*aagthilla/i,
      /dinagalu\s*thumba\s*gap/i,
      /mahina\s*(chadh|chad|chadh gaya|ruk gaya|late)/i,
      /periods?\s*time\s*pe\s*nahi\s*aa\s*rahe/i,
      /time\s*pe\s*nahi\s*aaya/i,
      /dates\s*gadbad\s*hai/i,
      /periods?\s*sariya\s*varala/i,
      /dates\s*thalli\s*pochu/i,
      /madhavidai\s*thalli/i,
      /theettu\s*sari\s*illa/i,
      /periods?\s*time\s*ki\s*raavadam\s*ledu/i,
      /nellu\s*tappindi/i,
      /dates\s*late\s*ayyindi/i,
      /cycle\s*maripoyindi/i,
      /ಮುಟ್ಟು\s*ಸರಿಯಾಗಿ\s*ಆಗುತ್ತಿಲ್ಲ/i,
      /ಪೀರಿಯಡ್ಸ್\s*ತಡ/i,
      /पीरियड्स\s*अनियमित/i,
      /महीना\s*समय\s*पर\s*नहीं/i,
      /மாதவிடாய்\s*ஒழுங்கற்ற/i,
      /పీరియడ్స్\s*క్రమం\s*తప్ప/i
    ],
    standardEnglish: 'irregular menstrual cycles, delayed or infrequent periods (oligomenorrhea)',
    category: 'menstrual'
  },
  // Facial hair / Hirsutism
  {
    patterns: [
      /facial\s*hair/i,
      /hair\s*on\s*(chin|jawline|upper\s*lip|face|chest|belly)/i,
      /unwanted\s*hair/i,
      /excess\s*hair/i,
      /face\s*alli\s*koodlu/i,
      /koodlu\s*mukhadalli/i,
      /face\s*meeda\s*ventrukalu/i,
      /chehre\s*pe\s*baal/i,
      /chin\s*pe\s*baal/i,
      /face\s*la\s*mudi/i,
      /mudi\s*valaruthu/i,
      /chin\s*la\s*mudi/i,
      /ಮುಖದ\s*ಮೇಲೆ\s*ಕೂದಲು/i,
      /चेहरे\s*पर\s*बाल/i,
      /முகத்தில்\s*முடி/i,
      /ముఖంపై\s*వెంట్రుకలు/i
    ],
    standardEnglish: 'excess facial or body hair growth in androgen-dependent areas (hirsutism)',
    category: 'hyperandrogenism'
  },
  // Scalp hair fall / thinning
  {
    patterns: [
      /hair\s*fall/i,
      /hair\s*thinning/i,
      /bald\s*patches?/i,
      /hair\s*loss\s*on\s*scalp/i,
      /thale\s*koodlu\s*udhrode/i,
      /koodlu\s*uthirthide/i,
      /baal\s*jhad\s*rahe/i,
      /baal\s*patle\s*ho\s*rahe/i,
      /mudi\s*kottuthu/i,
      /mudi\s*kottudhu/i,
      /ventrukalu\s*raladam/i,
      /thala\s*ventrukalu\s*oodatam/i,
      /ಕೂದಲು\s*ಉದುರುವಿಕೆ/i,
      /बाल\s*झड़ना/i,
      /முடி\s*கொட்டுதல்/i,
      /జుట్టు\s*రాలడం/i
    ],
    standardEnglish: 'scalp hair thinning or loss (female pattern androgenic alopecia)',
    category: 'hyperandrogenism'
  },
  // Acne / Pimples
  {
    patterns: [
      /acne/i,
      /pimples?/i,
      /breakouts?/i,
      /boils\s*on\s*face/i,
      /deep\s*pimples/i,
      /mukhadalli\s*mole/i,
      /pimples\s*jasti/i,
      /muhase|muhanse/i,
      /face\s*pe\s*dane/i,
      /phunsi|phunsiyan/i,
      /mukathula\s*paru/i,
      /parukkal/i,
      /mukhampi\s*pimples/i,
      /ಮೊಡವೆಗಳು/i,
      /मुंहासे/i,
      /பருக்கள்/i,
      /మొటిమలు/i
    ],
    standardEnglish: 'persistent or hormonal cystic acne across jawline and face',
    category: 'hyperandrogenism'
  },
  // Weight gain around belly / Central adiposity
  {
    patterns: [
      /weight\s*gain/i,
      /belly\s*fat/i,
      /fat\s*around\s*waist/i,
      /putting\s*on\s*weight/i,
      /unable\s*to\s*lose\s*weight/i,
      /weight\s*jasti\s*aagthide/i,
      /hotte\s*doddadaagide/i,
      /thooka\s*hecchagide/i,
      /vajan\s*badh\s*gaya/i,
      /pet\s*me\s*charbi/i,
      /wazan\s*kam\s*nahi\s*hota/i,
      /udambu\s*edai\s*athigam/i,
      /thoppai\s*poduthu/i,
      /baruvu\s*perigindi/i,
      /potta\s*peragadam/i,
      /ತೂಕ\s*ಹೆಚ್ಚಳ/i,
      /वजन\s*बढ़ना/i,
      /எடை\s*அதிகரிப்பு/i,
      /బరువు\s*పెరుగు/i
    ],
    standardEnglish: 'unexplained weight gain, central abdominal adiposity, difficulty losing weight',
    category: 'metabolic'
  },
  // Dark skin patches (Acanthosis Nigricans)
  {
    patterns: [
      /dark\s*skin\s*patches?/i,
      /dark\s*neck/i,
      /blackness\s*around\s*neck/i,
      /dark\s*underarms?/i,
      /velvety\s*skin/i,
      /neck\s*kappagide/i,
      /kappu\s*koralu/i,
      /gale\s*pe\s*kalapan/i,
      /kala\s*gardan/i,
      /kaluthu\s*karuppu/i,
      /meda\s*nallaga/i,
      /నల్లటి\s*మెడ/i,
      /गले\s*पर\s*कालापन/i,
      /ಕುತ್ತಿಗೆ\s*ಕಪ್ಪಾಗಿರುವುದು/i,
      /கழுத்தில்\s*கருமை/i
    ],
    standardEnglish: 'darkened, velvety hyperpigmented skin patches in neck and folds (acanthosis nigricans)',
    category: 'metabolic'
  },
  // Fatigue / Tiredness
  {
    patterns: [
      /fatigue/i,
      /tired\s*all\s*the\s*time/i,
      /low\s*energy/i,
      /exhaustion/i,
      /susthu/i,
      /thumba\_susthu/i,
      /thakan\s*rehti\s*hai/i,
      /kamzori/i,
      /eppavum\s*ayarsiya/i,
      /thanal/i,
      /alasata/i,
      /నీరసం/i,
      /थकान/i,
      /ಆಯಾಸ/i,
      /களைப்பு/i
    ],
    standardEnglish: 'chronic fatigue, daytime sleepiness, and low energy levels',
    category: 'systemic'
  },
  // Mood swings / Irritability / Anxiety
  {
    patterns: [
      /mood\s*swings?/i,
      /irritability/i,
      /anxiety/i,
      /crying\s*spells?/i,
      /depression/i,
      /kovam\s*varuthu/i,
      /chinta\s*aur\s*gussa/i,
      /mood\s*off/i,
      /mood\s*change/i,
      /ಆತಂಕ|ಸಿಟ್ಟು/i,
      /चिड़चिड़ापन/i
    ],
    standardEnglish: 'frequent mood changes, emotional volatility, anxiety, or irritability',
    category: 'systemic'
  },
  // Subfertility / Trouble conceiving
  {
    patterns: [
      /trying\s*to\s*conceive/i,
      /unable\s*to\s*get\s*pregnant/i,
      /fertility\s*issues?/i,
      /makkalu\s*aagthilla/i,
      /magu\s*beku/i,
      /bacche\s*nahi\s*thehar\s*rahe/i,
      /garbh\s*dharan/i,
      /kuzhandhai\s*illai/i,
      /pillalu\s*puttadam\s*ledu/i,
      /గర్భం\s*రావట్లేదు/i,
      /ಗರ್ಭಧಾರಣೆ\s*ಆಗುತ್ತಿಲ್ಲ/i,
      /गर्भधारण\s*में\s*कठिनाई/i
    ],
    standardEnglish: 'difficulty conceiving or delayed pregnancy over 6-12 months',
    category: 'fertility'
  }
];

export function normalizeAndTranslateInput(
  rawText: string,
  _lang: SupportedLanguage
): {
  normalizedPivot: string;
  matchedCategories: string[];
  recognizedPhrases: string[];
} {
  const recognizedPhrases: string[] = [];
  const matchedCategories = new Set<string>();
  const normalizedSnippets: string[] = [];

  for (const item of COLLOQUIAL_DICTIONARY) {
    for (const pattern of item.patterns) {
      if (pattern instanceof RegExp ? pattern.test(rawText) : rawText.toLowerCase().includes(pattern.toLowerCase())) {
        matchedCategories.add(item.category);
        if (!normalizedSnippets.includes(item.standardEnglish)) {
          normalizedSnippets.push(item.standardEnglish);
          recognizedPhrases.push(item.standardEnglish);
        }
        break;
      }
    }
  }

  // If colloquial terms recognized, combine them with the cleaned text
  let normalizedPivot = rawText;
  if (normalizedSnippets.length > 0) {
    normalizedPivot = `User reported symptoms include: ${normalizedSnippets.join('; ')}. Context notes: "${rawText}"`;
  }

  return {
    normalizedPivot,
    matchedCategories: Array.from(matchedCategories),
    recognizedPhrases
  };
}
