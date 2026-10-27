import { ExtractedSymptom, SymptomSeverity } from '../types';

export interface SymptomDefinition {
  id: string;
  name: string;
  category: ExtractedSymptom['category'];
  snomedCode: string;
  triggers: (string | RegExp)[];
  clinicalSignificance: string;
}

export const SYMPTOM_DEFINITIONS: SymptomDefinition[] = [
  {
    id: 'menstrual_irregularity',
    name: 'Menstrual Irregularity / Oligomenorrhea',
    category: 'menstrual',
    snomedCode: '80182007',
    triggers: [
      /irregular/i, /delay/i, /late/i, /gap/i, /infrequent/i, /oligomenorrhea/i,
      /sari aagilla/i, /sariyilla/i, /gadbad/i, /sariya varala/i, /tappindi/i,
      /ಅನಿಯಮಿತ/i, /अनियमित/i, /ஒழுங்கற்ற/i, /క్రమం తప్ప/i
    ],
    clinicalSignificance: 'One of the core hallmarks of ovulatory dysfunction under Rotterdam Criteria (cycles >35 days or <8 cycles/year).'
  },
  {
    id: 'amenorrhea',
    name: 'Absent Periods (Secondary Amenorrhea)',
    category: 'menstrual',
    snomedCode: '86044005',
    triggers: [
      /missed.*period/i, /no.*period/i, /haven't had.*period/i, /amenorrhea/i,
      /baralla/i, /ruk gaya/i, /varave illai/i, /raavadam aagipoyindi/i,
      /ತಿಂಗಳುಗಳಿಂದ ಮುಟ್ಟು ಬಂದಿಲ್ಲ/i, /महीनों से नहीं आया/i
    ],
    clinicalSignificance: 'Absence of menses for 3+ months indicates chronic anovulation or hormonal suppression requiring investigation.'
  },
  {
    id: 'hirsutism',
    name: 'Excess Facial / Body Hair (Hirsutism)',
    category: 'hyperandrogenism',
    snomedCode: '39993001',
    triggers: [
      /facial hair/i, /chin hair/i, /chest hair/i, /upper lip/i, /hirsutism/i,
      /unwanted hair/i, /koodlu mukhadalli/i, /chehre pe baal/i, /face la mudi/i,
      /mukham meeda ventrukalu/i, /ಮುಖದ ಮೇಲೆ ಕೂದಲು/i, /चेहरे पर बाल/i, /பருவ முடி/i
    ],
    clinicalSignificance: 'Clinical sign of hyperandrogenism (excess circulating androgens or hypersensitivity of hair follicles).'
  },
  {
    id: 'cystic_acne',
    name: 'Persistent / Hormonal Acne',
    category: 'hyperandrogenism',
    snomedCode: '247441003',
    triggers: [
      /acne/i, /pimple/i, /breakout/i, /boils/i, /mole/i, /muhase/i, /muhanse/i,
      /paru/i, /parukkal/i, /motimalu/i, /ಮೊಡವೆ/i, /मुंहासे/i
    ],
    clinicalSignificance: 'Adult-onset jawline and lower face acne frequently reflects androgen stimulation of sebaceous glands.'
  },
  {
    id: 'androgenic_alopecia',
    name: 'Scalp Hair Thinning (Alopecia)',
    category: 'hyperandrogenism',
    snomedCode: '278040002',
    triggers: [
      /hair fall/i, /hair loss/i, /thinning/i, /alopecia/i, /crown/i,
      /koodlu udhrode/i, /baal jhadna/i, /mudi kottuthu/i, /ventrukalu raladam/i,
      /ಕೂದಲು ಉದುರುವಿಕೆ/i, /बाल झड़ना/i, /முடி கொட்டுதல்/i
    ],
    clinicalSignificance: 'Miniaturization of hair follicles on vertex or crown due to androgen sensitivity.'
  },
  {
    id: 'central_weight_gain',
    name: 'Central Adiposity / Weight Gain',
    category: 'metabolic',
    snomedCode: '8943002',
    triggers: [
      /weight gain/i, /belly fat/i, /stomach fat/i, /putting on weight/i,
      /thooka hecchu/i, /vajan badh/i, /pet me charbi/i, /udambu edai/i,
      /baruvu perigindi/i, /ತೂಕ ಹೆಚ್ಚಳ/i, /वजन बढ़ना/i
    ],
    clinicalSignificance: 'Often connected to hyperinsulinemia and peripheral insulin resistance in metabolic phenotypes of PCOS.'
  },
  {
    id: 'acanthosis_nigricans',
    name: 'Dark Skin Patches (Acanthosis Nigricans)',
    category: 'metabolic',
    snomedCode: '402599005',
    triggers: [
      /dark skin/i, /dark neck/i, /black neck/i, /velvety/i, /underarms/i,
      /koralu kappu/i, /gale pe kalapan/i, /kaluthu karuppu/i, /meda nallaga/i,
      /ಕುತ್ತಿಗೆ ಕಪ್ಪು/i, /गले पर कालापन/i
    ],
    clinicalSignificance: 'Classic dermatological marker of elevated circulating fasting insulin interacting with skin IGF receptors.'
  },
  {
    id: 'fatigue',
    name: 'Chronic Fatigue & Energy Fluctuations',
    category: 'systemic',
    snomedCode: '84229001',
    triggers: [
      /fatigue/i, /tired/i, /exhaust/i, /low energy/i, /susthu/i, /thakan/i,
      /kamzori/i, /ayarsiya/i, /alasata/i, /neerasam/i, /ಆಯಾಸ/i, /थकान/i
    ],
    clinicalSignificance: 'May reflect glycemic swings, disrupted sleep architecture, or thyroid co-involvement.'
  },
  {
    id: 'mood_changes',
    name: 'Mood Swings / Anxiety / Irritability',
    category: 'systemic',
    snomedCode: '18963009',
    triggers: [
      /mood/i, /irritab/i, /anxi/i, /depress/i, /crying/i, /chinta/i, /gussa/i,
      /kovam/i, /bada/i, /ಆತಂಕ/i, /चिड़चिड़ापन/i
    ],
    clinicalSignificance: 'High prevalence in hormonal dysregulation; secondary to neuroendocrine alterations and chronic symptom burden.'
  },
  {
    id: 'subfertility',
    name: 'Difficulty Conceiving / Subfertility',
    category: 'fertility',
    snomedCode: '6738008',
    triggers: [
      /trying to conceive/i, /pregnant/i, /fertility/i, /infertility/i,
      /makkalu aagthilla/i, /bacche nahi/i, /kuzhandhai/i, /pillalu/i,
      /ಗರ್ಭಧಾರಣೆ/i, /गर्भधारण/i
    ],
    clinicalSignificance: 'Anovulation or oligo-ovulation is the most frequent cause of female subfertility.'
  }
];

export function extractSymptoms(text: string): ExtractedSymptom[] {
  const extracted: ExtractedSymptom[] = [];
  const lower = text.toLowerCase();

  for (const def of SYMPTOM_DEFINITIONS) {
    let matched = false;
    let originalTerm = '';

    for (const trigger of def.triggers) {
      if (trigger instanceof RegExp) {
        const m = lower.match(trigger);
        if (m) {
          matched = true;
          originalTerm = m[0];
          break;
        }
      } else if (lower.includes(trigger.toLowerCase())) {
        matched = true;
        originalTerm = trigger;
        break;
      }
    }

    if (matched) {
      // Determine severity based on contextual qualifiers
      let severity: SymptomSeverity = 'moderate';
      if (lower.includes('severe') || lower.includes('extreme') || lower.includes('thumba') || lower.includes('bahut') || lower.includes('athigam') || lower.includes('chala')) {
        severity = 'severe';
      } else if (lower.includes('mild') || lower.includes('slight') || lower.includes('swalpa') || lower.includes('thoda') || lower.includes('koncham') || lower.includes('konjam')) {
        severity = 'mild';
      }

      // Determine duration if mentioned in text
      let duration: string | undefined = undefined;
      const durationMatches = [
        { regex: /(\d+)\s*(months?|tingalu|mahine|matham|nelalu)/i, format: (n: string) => `${n} months` },
        { regex: /(\d+)\s*(years?|varsha|saal|varudam|samvatsaram)/i, format: (n: string) => `${n} years` },
        { regex: /recently|kithu dinagalu|haali me|seekiram|recent ga/i, format: () => '< 1 month' }
      ];

      for (const d of durationMatches) {
        const match = lower.match(d.regex);
        if (match) {
          duration = d.format(match[1] || '');
          break;
        }
      }

      extracted.push({
        id: def.id,
        name: def.name,
        originalTerm: originalTerm || def.name,
        snomedCode: def.snomedCode,
        category: def.category,
        severity,
        duration,
        clinicalSignificance: def.clinicalSignificance
      });
    }
  }

  return extracted;
}

export function buildSymptomFromId(id: string, severity: SymptomSeverity = 'moderate'): ExtractedSymptom | null {
  const def = SYMPTOM_DEFINITIONS.find(d => d.id === id);
  if (!def) return null;
  return {
    id: def.id,
    name: def.name,
    originalTerm: 'Selected by user on analysis page',
    snomedCode: def.snomedCode,
    category: def.category,
    severity,
    clinicalSignificance: def.clinicalSignificance
  };
}
