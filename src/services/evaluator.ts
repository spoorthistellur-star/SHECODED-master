import {
  AssessmentResult,
  ExtractedSymptom,
  FollowUpQuestion,
  RedFlagAlert,
  SupportedLanguage,
  CareGuidance
} from '../types';
import { checkRedFlags } from './redFlags';
import { extractSymptoms, buildSymptomFromId } from './symptomExtractor';
import { normalizeAndTranslateInput } from './normalizer';
import {
  DIFFERENTIAL_CONDITIONS_BASE,
  RECOMMENDED_LAB_TESTS,
  SPECIALIST_GUIDANCE
} from './knowledgeBase';

export const FOLLOW_UP_QUESTIONS_CATALOG: FollowUpQuestion[] = [
  {
    id: 'cycle_gap',
    question: 'How many days usually pass between the start of one period and the start of the next?',
    translatedQuestion: {
      en: 'How many days usually pass between the start of one period and the next?',
      kn: 'ಒಂದು ಮುಟ್ಟಿನ ಆರಂಭದಿಂದ ಮುಂದಿನ ಮುಟ್ಟಿನ ಆರಂಭದವರೆಗೆ ಸಾಮಾನ್ಯವಾಗಿ ಎಷ್ಟು ದಿನಗಳ ಅಂತರವಿರುತ್ತದೆ?',
      hi: 'एक मासिक धर्म (पीरियड) शुरू होने से अगले के बीच आमतौर पर कितने दिनों का अंतर होता है?',
      ta: 'ஒரு மாதவிடாய் தொடங்குவதற்கும் அடுத்தது தொடங்குவதற்கும் இடையே பொதுவாக எத்தனை நாட்கள் இடைவெளி இருக்கும்?',
      te: 'ఒక పీరియడ్ ప్రారంభం నుండి తదుపరి పీరియడ్ ప్రారంభం మధ్య సాధారణంగా ఎన్ని రోజుల వ్యవధి ఉంటుంది?'
    },
    options: [
      {
        id: 'regular_28_35',
        label: 'Regular (21 to 35 days)',
        translatedLabel: {
          en: 'Regular (21 to 35 days)',
          kn: 'ನಿಯಮಿತ (21 ರಿಂದ 35 ದಿನಗಳು)',
          hi: 'नियमित (21 से 35 दिन)',
          ta: 'வழக்கமானது (21 முதல் 35 நாட்கள்)',
          te: 'క్రమబద్ధమైనది (21 నుండి 35 రోజులు)'
        },
        clinicalTag: 'normal_cycle'
      },
      {
        id: 'delayed_36_60',
        label: 'Delayed (36 to 60 days)',
        translatedLabel: {
          en: 'Delayed (36 to 60 days)',
          kn: 'ತಡವಾಗಿ (36 ರಿಂದ 60 ದಿನಗಳು)',
          hi: 'देरी से (36 से 60 दिन)',
          ta: 'தாமதமாக (36 முதல் 60 நாட்கள்)',
          te: 'ఆలస్యంగా (36 నుండి 60 రోజులు)'
        },
        clinicalTag: 'oligomenorrhea'
      },
      {
        id: 'missed_over_60',
        label: 'Rare or Missed (> 60 days or several months)',
        translatedLabel: {
          en: 'Rare or Missed (> 60 days / skips months)',
          kn: 'ವಿರಳ ಅಥವಾ ತಪ್ಪಿಹೋಗುವುದು (60 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚು)',
          hi: 'बहुत कम या छूटना (60 दिनों से अधिक या महीनों का अंतर)',
          ta: 'மிக அரிதாக அல்லது மாதங்கள் தள்ளிப்போகும் (> 60 நாட்கள்)',
          te: 'చాలా అరుదుగా లేదా నెలలు దాటడం (> 60 రోజులు)'
        },
        clinicalTag: 'severe_oligomenorrhea'
      },
      {
        id: 'completely_unpredictable',
        label: 'Completely unpredictable / random',
        translatedLabel: {
          en: 'Completely unpredictable / random',
          kn: 'ಸಂಪೂರ್ಣವಾಗಿ ಅನಿಶ್ಚಿತ / ಯಾವಾಗ ಬರುತ್ತದೋ ತಿಳಿಯದು',
          hi: 'पूरी तरह अनिश्चित / कभी भी आना',
          ta: 'முற்றிலும் கணிக்க முடியாதது',
          te: 'పూర్తిగా అనిశ్చితం / ఎప్పుడు వస్తుందో తెలియదు'
        },
        clinicalTag: 'irregular_cycle'
      }
    ]
  },
  {
    id: 'symptom_duration',
    question: 'How long have you noticed these symptoms happening?',
    translatedQuestion: {
      en: 'How long have you noticed these symptoms happening?',
      kn: 'ಈ ಲಕ್ಷಣಗಳು ನಿಮಗೆ ಎಷ್ಟು ಸಮಯದಿಂದ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತಿವೆ?',
      hi: 'आप इन लक्षणों को कितने समय से महसूस कर रही हैं?',
      ta: 'இந்த அறிகுறிகள் எத்தனை காலமாக உங்களுக்கு ஏற்படுகின்றன?',
      te: 'ఈ లక్షణాలు మీకు ఎంత కాలం నుండి కనిపిస్తున్నాయి?'
    },
    options: [
      {
        id: 'recent_1_3m',
        label: 'Less than 3 months (Recent)',
        translatedLabel: {
          en: 'Less than 3 months (Recent)',
          kn: '3 ತಿಂಗಳಿಗಿಂತ ಕಡಿಮೆ (ಇತ್ತೀಚೆಗೆ)',
          hi: '3 महीने से कम (हाल ही में)',
          ta: '3 மாதங்களுக்கும் குறைவாக',
          te: '3 నెలల కంటే తక్కువ (ఇటీవల)'
        },
        clinicalTag: 'acute_onset'
      },
      {
        id: 'chronic_6m_plus',
        label: '6 months to 1 year',
        translatedLabel: {
          en: '6 months to 1 year',
          kn: '6 ತಿಂಗಳಿಂದ 1 ವರ್ಷ',
          hi: '6 महीने से 1 साल',
          ta: '6 மாதங்கள் முதல் 1 வருடம் வரை',
          te: '6 నెలల నుండి 1 సంవత్సరం వరకు'
        },
        clinicalTag: 'chronic_established'
      },
      {
        id: 'longstanding_over_1y',
        label: 'More than 1 year (Longstanding)',
        translatedLabel: {
          en: 'More than 1 year (Longstanding)',
          kn: '1 ವರ್ಷಕ್ಕಿಂತ ಹೆಚ್ಚು (ದೀರ್ಘಕಾಲೀನ)',
          hi: '1 वर्ष से अधिक (लंबे समय से)',
          ta: '1 வருடத்திற்கும் மேலாக',
          te: '1 సంవత్సరం కంటే ఎక్కువ కాలం'
        },
        clinicalTag: 'longstanding'
      }
    ]
  },
  {
    id: 'weight_metabolic',
    question: 'Have you noticed any sudden or unexplained changes in your weight?',
    translatedQuestion: {
      en: 'Have you noticed any sudden or unexplained changes in your weight?',
      kn: 'ನಿಮ್ಮ ತೂಕದಲ್ಲಿ ಹಠಾತ್ ಅಥವಾ ವಿವರಿಸಲಾಗದ ಬದಲಾವಣೆಗಳನ್ನು ಗಮನಿಸಿದ್ದೀರಾ?',
      hi: 'क्या आपने अपने वजन में कोई अचानक या अस्पष्ट बदलाव देखा है?',
      ta: 'உங்கள் எடையில் திடீர் அல்லது விளக்க முடியாத மாற்றங்களை கவனித்தீர்களா?',
      te: 'మీ బరువులో ఆకస్మిక లేదా కారణం తెలియని మార్పులను గమనించారా?'
    },
    options: [
      {
        id: 'gain_around_abdomen',
        label: 'Weight gain, especially around the belly/waist',
        translatedLabel: {
          en: 'Weight gain, especially around the belly',
          kn: 'ತೂಕ ಹೆಚ್ಚಳ, ಮುಖ್ಯವಾಗಿ ಹೊಟ್ಟೆಯ ಸುತ್ತ',
          hi: 'वजन बढ़ना, खासकर पेट के आसपास',
          ta: 'எடை அதிகரிப்பு, குறிப்பாக அடிவயிற்றில்',
          te: 'బరువు పెరగడం, ముఖ్యంగా పొట్ట చుట్టూ'
        },
        clinicalTag: 'central_adiposity'
      },
      {
        id: 'difficulty_losing',
        label: 'Dieting or exercising but unable to lose weight',
        translatedLabel: {
          en: 'Unable to lose weight despite efforts',
          kn: 'ಪ್ರಯತ್ನಿಸಿದರೂ ತೂಕ ಇಳಿಯುತ್ತಿಲ್ಲ',
          hi: 'कोशिशों के बावजूद वजन कम न होना',
          ta: 'முயற்சி செய்தும் எடையைக் குறைக்க முடியவில்லை',
          te: 'ప్రయత్నించినా బరువు తగ్గలేకపోవడం'
        },
        clinicalTag: 'metabolic_resistance'
      },
      {
        id: 'no_weight_change',
        label: 'No significant weight change (Lean build)',
        translatedLabel: {
          en: 'No significant weight change (Lean build)',
          kn: 'ಯಾವುದೇ ಗಮನಾರ್ಹ ತೂಕ ಬದಲಾವಣೆ ಇಲ್ಲ',
          hi: 'वजन में कोई खास बदलाव नहीं (सामान्य वजन)',
          ta: 'குறிப்பிடத்தக்க எடை மாற்றம் இல்லை',
          te: 'బరువులో పెద్దగా మార్పు లేదు'
        },
        clinicalTag: 'lean_phenotype'
      }
    ]
  },
  {
    id: 'hormone_meds_pregnancy',
    question: 'Are you currently pregnant, on hormonal pills, or thyroid medication?',
    translatedQuestion: {
      en: 'Are you currently pregnant, on hormonal pills, or thyroid medication?',
      kn: 'ನೀವು ಪ್ರಸ್ತುತ ಗರ್ಭಿಣಿಯಾಗಿದ್ದೀರಾ, ಹಾರ್ಮೋನ್ ಅಥವಾ ಥೈರಾಯ್ಡ್ ಔಷಧಿಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತಿದ್ದೀರಾ?',
      hi: 'क्या आप वर्तमान में गर्भवती हैं, गर्भनिरोधक गोलियां या थायरॉइड दवा ले रही हैं?',
      ta: 'நீங்கள் தற்போது கர்ப்பமாக இருக்கிறீர்களா அல்லது ஹார்மோன்/தைராய்டு மாத்திரைகள் எடுத்துக்கொள்கிறீர்களா?',
      te: 'మీరు ప్రస్తుతం గర్భవతా, లేదా హార్మోన్/థైరాయిడ్ మందులు తీసుకుంటున్నారా?'
    },
    options: [
      {
        id: 'on_birth_control',
        label: 'Taking oral contraceptives / hormonal birth control',
        translatedLabel: {
          en: 'Taking hormonal birth control / pills',
          kn: 'ಹಾರ್ಮೋನ್ ಮಾತ್ರೆಗಳು / ಗರ್ಭನಿರೋಧಕ ತೆಗೆದುಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ',
          hi: 'गर्भनिरोधक या हार्मोन की गोलियां ले रही हूं',
          ta: 'ஹார்மோன் அல்லது கருத்தடை மாத்திரைகள் எடுக்கிறேன்',
          te: 'హార్మోన్ లేదా గర్భనిరోధక మాత్రలు వాడుతున్నాను'
        },
        clinicalTag: 'exogenous_hormones'
      },
      {
        id: 'on_thyroid_meds',
        label: 'Diagnosed with thyroid issue and taking medicine',
        translatedLabel: {
          en: 'Taking thyroid medication (e.g. Thyronorm/Eltroxin)',
          kn: 'ಥೈರಾಯ್ಡ್ ಔಷಧಿ ತೆಗೆದುಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ',
          hi: 'थायरॉइड की दवा ले रही हूं',
          ta: 'தைராய்டு மருந்து உட்கொள்கிறேன்',
          te: 'థైరాయిడ్ మందులు తీసుకుంటున్నాను'
        },
        clinicalTag: 'known_thyroid'
      },
      {
        id: 'none_of_these',
        label: 'No hormonal medication, not currently pregnant',
        translatedLabel: {
          en: 'No hormonal medication, not pregnant',
          kn: 'ಯಾವುದೇ ಹಾರ್ಮೋನ್ ಔಷಧಿ ಇಲ್ಲ, ಗರ್ಭಿಣಿಯಲ್ಲ',
          hi: 'कोई हार्मोनल दवा नहीं, गर्भवती नहीं',
          ta: 'எந்த மாத்திரைகளும் இல்லை, கர்ப்பம் இல்லை',
          te: 'ఎలాంటి హార్మోన్ మందులు వాడట్లేదు, గర్భవతిని కాదు'
        },
        clinicalTag: 'medication_free'
      }
    ]
  }
];

// Safety guardrails enforcement
export function applyNonDiagnosticGuardrails(text: string): string {
  let cleaned = text;

  const forbiddenReplacements: [RegExp, string][] = [
    [/you have pcos/gi, 'your symptoms show patterns frequently associated with PCOS'],
    [/you are diagnosed with/gi, 'your symptom profile aligns with features often evaluated for'],
    [/you suffer from/gi, 'you are experiencing symptoms that overlap with'],
    [/your diagnosis is/gi, 'clinical patterns suggest considering'],
    [/we diagnose you/gi, 'our analysis highlights patterns seen in'],
    [/this confirms you have/gi, 'these indications commonly warrant clinical investigation for'],
    [/you definitely have/gi, 'the combination of symptoms is characteristic of']
  ];

  for (const [pattern, replacement] of forbiddenReplacements) {
    cleaned = cleaned.replace(pattern, replacement);
  }

  // Prepend or verify non-diagnostic statement
  if (!cleaned.toLowerCase().includes('informational') && !cleaned.toLowerCase().includes('not a diagnosis')) {
    cleaned = 'Notice: This summary provides health understanding for discussion with your doctor, not a medical diagnosis.\n\n' + cleaned;
  }

  return cleaned;
}

export function evaluateSymptoms(
  rawInput: string,
  userSelectedLanguage: SupportedLanguage,
  followUpAnswers: Record<string, string> = {},
  explicitSymptomIds?: string[]
): AssessmentResult {
  // Step 1: Red-flag check (Safety layer running before anything else)
  const redFlags: RedFlagAlert = checkRedFlags(rawInput);

  // Step 2: Normalization & pivot translation
  const { normalizedPivot, recognizedPhrases } = normalizeAndTranslateInput(rawInput, userSelectedLanguage);

  // Step 3: Extract structured symptoms
  let extractedSymptoms: ExtractedSymptom[] = [];

  if (explicitSymptomIds && explicitSymptomIds.length > 0) {
    // If the user explicitly marked/selected symptoms on Page 2, use those!
    explicitSymptomIds.forEach(id => {
      const sym = buildSymptomFromId(id);
      if (sym) extractedSymptoms.push(sym);
    });
  } else if (rawInput.trim()) {
    extractedSymptoms = extractSymptoms(`${rawInput} ${normalizedPivot}`);
  }

  // Enhance symptoms if follow-up questions answered
  if (followUpAnswers['cycle_gap'] === 'delayed_36_60' || followUpAnswers['cycle_gap'] === 'missed_over_60' || followUpAnswers['cycle_gap'] === 'completely_unpredictable') {
    if (!extractedSymptoms.some(s => s.id === 'menstrual_irregularity' || s.id === 'amenorrhea')) {
      extractedSymptoms.unshift({
        id: 'menstrual_irregularity',
        name: 'Menstrual Irregularity (Confirmed via Follow-up)',
        originalTerm: 'Follow-up: Extended or skipped cycle',
        snomedCode: '80182007',
        category: 'menstrual',
        severity: followUpAnswers['cycle_gap'] === 'missed_over_60' ? 'severe' : 'moderate',
        clinicalSignificance: 'Ovulatory delay confirmed by self-reported cycle intervals exceeding 35 days.'
      });
    }
  }

  if (followUpAnswers['weight_metabolic'] === 'gain_around_abdomen') {
    if (!extractedSymptoms.some(s => s.id === 'central_weight_gain')) {
      extractedSymptoms.push({
        id: 'central_weight_gain',
        name: 'Central Abdominal Weight Gain',
        originalTerm: 'Follow-up: Weight gain around belly',
        snomedCode: '8943002',
        category: 'metabolic',
        severity: 'moderate',
        clinicalSignificance: 'Adipose tissue distribution consistent with peripheral insulin resistance.'
      });
    }
  }

  // Step 4: Evaluate Rotterdam 2003/2023 Criteria
  const hasOvulatoryDysfunction = extractedSymptoms.some(s => s.category === 'menstrual');
  const hasHyperandrogenism = extractedSymptoms.some(s => s.category === 'hyperandrogenism');
  const hasMetabolicMarkers = extractedSymptoms.some(s => s.category === 'metabolic');

  // Let's check ultrasound or morphology indicator
  const hasUltrasoundMention = rawInput.toLowerCase().includes('scan') ||
    rawInput.toLowerCase().includes('ultrasound') ||
    rawInput.toLowerCase().includes('cysts') ||
    rawInput.toLowerCase().includes('water bubbles');

  let criteriaMetCount = 0;
  if (hasOvulatoryDysfunction) criteriaMetCount++;
  if (hasHyperandrogenism) criteriaMetCount++;
  if (hasUltrasoundMention) criteriaMetCount++;

  // Step 5: Differential pattern matching
  const differentialConditions = DIFFERENTIAL_CONDITIONS_BASE.map(condition => {
    let likelihood = condition.likelihoodCategory;
    if (condition.conditionName.includes('PCOS')) {
      if (criteriaMetCount >= 2) {
        likelihood = 'High alignment';
      } else if (criteriaMetCount === 1 || hasMetabolicMarkers) {
        likelihood = 'Moderate alignment';
      }
    }
    return { ...condition, likelihoodCategory: likelihood };
  });

  // Step 6: Determine urgency
  let urgencyLevel: CareGuidance['urgencyLevel'] = 'routine';
  let urgencyText = 'Routine evaluation: Schedule a convenient visit with a gynecologist to review your menstrual health.';

  if (redFlags.isTriggered) {
    urgencyLevel = 'urgent';
    urgencyText = 'Immediate clinical attention required due to acute symptoms.';
  } else if (
    extractedSymptoms.some(s => s.severity === 'severe') ||
    followUpAnswers['cycle_gap'] === 'missed_over_60' ||
    (hasOvulatoryDysfunction && hasHyperandrogenism && hasMetabolicMarkers)
  ) {
    urgencyLevel = 'soon';
    urgencyText = 'Prompt consultation recommended: We suggest consulting a doctor within the next 2 to 3 weeks for hormone and metabolic evaluation.';
  }

  // Step 7: Plain-language explanation in user's selected language (Telugu, Kannada, Hindi, Tamil, English)
  const symptomListStr = extractedSymptoms.map(s => s.name.split(' (')[0]).join(', ');

  const localizedSymptomNames = extractedSymptoms.map(s => {
    switch (userSelectedLanguage) {
      case 'te':
        if (s.id.includes('menstrual') || s.id.includes('amenorrhea')) return 'పీరియడ్స్ ఆలస్యం కావడం';
        if (s.id.includes('hair') || s.id.includes('hirsutism')) return 'ముఖంపై వెంట్రుకలు';
        if (s.id.includes('acne')) return 'మొటిమలు';
        if (s.id.includes('alopecia')) return 'జుట్టు రాలడం';
        if (s.id.includes('weight')) return 'పొట్ట చుట్టూ బరువు పెరగడం';
        if (s.id.includes('dark') || s.id.includes('acanthosis')) return 'మెడ వద్ద నల్లటి మచ్చలు';
        if (s.id.includes('fatigue')) return 'అలసట మరియు నీరసం';
        return 'హార్మోన్ల మార్పులు';
      case 'kn':
        if (s.id.includes('menstrual') || s.id.includes('amenorrhea')) return 'ಮುಟ್ಟು ತಡವಾಗುವುದು';
        if (s.id.includes('hair') || s.id.includes('hirsutism')) return 'ಮುಖದ ಮೇಲೆ ಕೂದಲು';
        if (s.id.includes('acne')) return 'ಮೊಡವೆಗಳು';
        if (s.id.includes('alopecia')) return 'ಕೂದಲು ಉದುರುವಿಕೆ';
        if (s.id.includes('weight')) return 'ಹೊಟ್ಟೆಯ ಸುತ್ತ ತೂಕ ಹೆಚ್ಚಾಗುವುದು';
        if (s.id.includes('dark') || s.id.includes('acanthosis')) return 'ಕುತ್ತಿಗೆಯ ಮೇಲೆ ಕಪ್ಪು ಕಲೆಗಳು';
        if (s.id.includes('fatigue')) return 'ಆಯಾಸ ಮತ್ತು ನಿಶ್ಯಕ್ತಿ';
        return 'ಹಾರ್ಮೋನುಗಳ ಬದಲಾವಣೆ';
      case 'hi':
        if (s.id.includes('menstrual') || s.id.includes('amenorrhea')) return 'अनियमित पीरियड्स';
        if (s.id.includes('hair') || s.id.includes('hirsutism')) return 'चेहरे पर अनचाहे बाल';
        if (s.id.includes('acne')) return 'मुंहासे';
        if (s.id.includes('alopecia')) return 'बाल झड़ना';
        if (s.id.includes('weight')) return 'पेट के आसपास वजन बढ़ना';
        if (s.id.includes('dark') || s.id.includes('acanthosis')) return 'गले पर कालापन';
        if (s.id.includes('fatigue')) return 'थकान और कमजोरी';
        return 'हार्मोनल बदलाव';
      case 'ta':
        if (s.id.includes('menstrual') || s.id.includes('amenorrhea')) return 'தாமதமான மாதவிடாய்';
        if (s.id.includes('hair') || s.id.includes('hirsutism')) return 'முகத்தில் தேவையற்ற முடி';
        if (s.id.includes('acne')) return 'பருக்கள்';
        if (s.id.includes('alopecia')) return 'முடி கொட்டுதல்';
        if (s.id.includes('weight')) return 'அடிவயிற்றில் எடை கூடுதல்';
        if (s.id.includes('dark') || s.id.includes('acanthosis')) return 'கழுத்தில் கருமை';
        if (s.id.includes('fatigue')) return 'அடிக்கடி சோர்வு';
        return 'ஹார்மோன் மாறுபாடுகள்';
      default:
        return s.name.split(' (')[0];
    }
  });

  const localizedListStr = localizedSymptomNames.slice(0, 4).join(', ');

  let plainLanguageExplanation = '';

  if (extractedSymptoms.length > 0) {
    switch (userSelectedLanguage) {
      case 'te':
        plainLanguageExplanation = `గమనిక: ఇది సమాచారం మరియు అవగాహన కొరకు మాత్రమే, వైద్య నిర్ధారణ కాదు. మీ డాక్టర్‌తో చర్చించడానికి ఇది ఉపయోగపడుతుంది.

మీరు తెలిపిన వివరాల ప్రకారం, ${localizedListStr} వంటి ముఖ్యమైన సంకేతాలు కనిపిస్తున్నాయి. మహిళల ప్రత్యుత్పత్తి ఆరోగ్యంలో ఈ లక్షణాలు పీసీఓఎస్ (PCOS), థైరాయిడ్ సమస్యలు లేదా అధిక ఒత్తిడి వంటి పరిస్థితులలో సాధారణంగా కనిపిస్తాయి.

మీ శరీరంలో అండాశయాలు ప్రతి నెలా క్రమంగా ఒక అండాన్ని విడుదల చేయడానికి హార్మోన్ల సమతుల్యత చాలా అవసరం. ఇన్సులిన్ లేదా ఆండ్రోజెన్ హార్మోన్ల స్థాయిలు కొద్దిగా పెరిగినప్పుడు, అండాశయాలలో అండం విడుదల ఆలస్యం కావచ్చు లేదా ఆగవచ్చు. దీనివల్ల పీరియడ్స్ ఆలస్యం కావడం, ముఖంపై లేదా గడ్డం వద్ద అవాంఛిత వెంట్రుకలు రావడం, మొటిమలు మరియు పొట్ట చుట్టూ బరువు పెరగడం వంటి మార్పులు జరుగుతాయి.

ఇలాంటి లక్షణాలు థైరాయిడ్ అసమతుల్యత లేదా జీవనశైలి ఒత్తిడి వల్ల కూడా రావచ్చు. కాబట్టి ఖచ్చితమైన కారణాన్ని తెలుసుకోవడానికి గైనకాలజిస్ట్‌ని సంప్రదించి పెల్విక్ అల్ట్రాసౌండ్ స్కాన్ మరియు సాధారణ హార్మోన్ రక్త పరీక్షలు చేయించుకోవడం మంచిది.`;
        break;

      case 'kn':
        plainLanguageExplanation = `ಗಮನಿಸಿ: ಇದು ಶೈಕ್ಷಣಿಕ ಮಾಹಿತಿಗಾಗಿ ಮಾತ್ರ, ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವಲ್ಲ. ನಿಮ್ಮ ವೈದ್ಯರೊಂದಿಗೆ ಸಮಾಲೋಚನೆ ನಡೆಸಲು ಇದು ಸಹಾಯಕವಾಗಿದೆ.

ನಿಮ್ಮ ವಿವರಣೆಯ ಪ್ರಕಾರ, ${localizedListStr} ನಂತಹ ಪ್ರಮುಖ ಲಕ್ಷಣಗಳು ಕಂಡುಬರುತ್ತಿವೆ. ಮಹಿಳೆಯರ ಸಂತಾನೋತ್ಪತ್ತಿ ಮತ್ತು ಹಾರ್ಮೋನ್ ಆರೋಗ್ಯದಲ್ಲಿ ಈ ಲಕ್ಷಣಗಳು ಪಿಸಿಓಎಸ್ (PCOS), ಥೈರಾಯ್ಡ್ ಸಮಸ್ಯೆಗಳು ಅಥವಾ ತೀವ್ರ ಮಾನಸಿಕ ಒತ್ತಡದ ಸಂದರ್ಭಗಳಲ್ಲಿ ಸಾಮಾನ್ಯವಾಗಿ ಕಂಡುಬರುತ್ತವೆ.

ದೇಹದಲ್ಲಿ ಅಂಡಾಶಯಗಳು ಪ್ರತಿ ತಿಂಗಳು ಅಂಡಾಣು ಬಿಡುಗಡೆ ಮಾಡಲು ಹಾರ್ಮೋನುಗಳ ಸಮತೋಲನ ಅತ್ಯಗತ್ಯ. ಇನ್ಸುಲಿನ್ ಅಥವಾ ಆಂಡ್ರೋಜೆನ್ ಹಾರ್ಮೋನುಗಳ ಮಟ್ಟ ಹೆಚ್ಚಾದಾಗ, ಅಂಡಾಣು ಬಿಡುಗಡೆ ಪ್ರಕ್ರಿಯೆ ವಿಳಂಬವಾಗಬಹುದು. ಇದರಿಂದಾಗಿ ಮುಟ್ಟು ತಡವಾಗುವುದು, ಮುಖದ ಮೇಲೆ ಅನಗತ್ಯ ಕೂದಲು, ಹಾರ್ಮೋನಲ್ ಮೊಡವೆಗಳು ಮತ್ತು ಹೊಟ್ಟೆಯ ಸುತ್ತ ತೂಕ ಹೆಚ್ಚಾಗುವಂತಹ ಲಕ್ಷಣಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ.

ಇದೇ ರೀತಿಯ ಲಕ್ಷಣಗಳು ಥೈರಾಯ್ಡ್ ಅಸಮತೋಲನದಲ್ಲೂ ಕಂಡುಬರುವುದರಿಂದ, ನಿಖರವಾದ ಕಾರಣ ತಿಳಿಯಲು ಸ್ತ್ರೀರೋಗ ತಜ್ಞರನ್ನು (Gynecologist) ಭೇಟಿ ಮಾಡಿ ಅಲ್ಟ್ರಾಸೌಂಡ್ ಸ್ಕ್ಯಾನ್ ಮತ್ತು ರಕ್ತ ಪರೀಕ್ಷೆಗಳನ್ನು ಮಾಡಿಸಿಕೊಳ್ಳುವುದು ಉತ್ತಮ.`;
        break;

      case 'hi':
        plainLanguageExplanation = `सूचना: यह केवल जानकारी और मार्गदर्शन के लिए है, चिकित्सीय निदान नहीं। अपने डॉक्टर से परामर्श के लिए यह उपयोगी है।

आपके द्वारा बताए गए लक्षणों के अनुसार, ${localizedListStr} जैसे संकेत दिखाई दे रहे हैं। महिलाओं के स्वास्थ्य में ये लक्षण आमतौर पर पीसीओएस (PCOS), थायरॉइड असंतुलन या अत्यधिक तनाव जैसी स्थितियों में देखे जाते हैं।

शरीर में अंडाशय से हर महीने एक अंडा विकसित होकर निकलने के लिए हार्मोन संतुलन बहुत महत्वपूर्ण होता है। जब इंसुलिन या एंड्रोजन हार्मोन का स्तर बढ़ता है, तो अंडाशय में अंडे का विकास रुक सकता है। इसके कारण पीरियड्स समय पर नहीं आते, चेहरे पर अनचाहे बाल, मुंहासे और पेट के आसपास वजन बढ़ सकता है।

क्योंकि थायरॉइड और तनाव में भी ऐसे ही लक्षण दिखाई देते हैं, इसलिए सही स्थिति जानने के लिए किसी स्त्री रोग विशेषज्ञ (Gynecologist) से मिलकर पेल्विक अल्ट्रासाउंड और आवश्यक रक्त जांच करवाने की सलाह दी जाती है।`;
        break;

      case 'ta':
        plainLanguageExplanation = `குறிப்பு: இது கல்வி மற்றும் விழிப்புணர்வுக்காக மட்டுமே, மருத்துவ நோய் கண்டறிதல் அல்ல. உங்கள் மருத்துவரிடம் கலந்துரையாட இது உதவும்.

நீங்கள் விவரித்த அறிகுறிகளின்படி, ${localizedListStr} போன்ற அறிகுறிகள் காணப்படுகின்றன. பெண்களின் நலனில் இந்த அறிகுறிகள் பொதுவாக பிசிஓஎஸ் (PCOS), தைராய்டு மாறுபாடுகள் அல்லது அதிக மன அழுத்தத்தின் போது ஏற்படுகின்றன.

உடலில் கருப்பைகள் ஒவ்வொரு மாதமும் முட்டையை வெளியிட ஹார்மோன்கள் சமநிலையில் இருக்க வேண்டும். இன்சுலின் அல்லது ஆண்ட்ரோஜன் ஹார்மோன்கள் அதிகரிக்கும் போது முட்டை வெளிப்படுவது தாமதமாகலாம். இதனால் மாதவிடாய் தள்ளிப்போவது, முகத்தில் தேவையற்ற முடி, பருக்கள் மற்றும் அடிவயிற்றில் எடை கூடுதல் போன்ற மாற்றங்கள் நிகழ்கின்றன.

இத்தகைய அறிகுறிகள் தைராய்டு மாற்றங்களிலும் வரக்கூடும் என்பதால், தெளிவான முடிவுக்கு மகளிர் மருத்துவரை அணுகி அல்ட்ராசౌண்ட் மற்றும் இரத்தப் பரிசோதனைகள் செய்து கொள்வது அவசியமாகும்.`;
        break;

      default:
        plainLanguageExplanation = `Notice: This summary provides health understanding for discussion with your doctor, not a medical diagnosis.

Your description mentions signs such as ${symptomListStr}. In women's reproductive health, these symptoms are commonly seen in conditions like Polycystic Ovary Syndrome (PCOS), thyroid variations, or periods of high stress.

In your body, the ovaries and brain communicate using hormones to release an egg every month. When hormones like insulin or androgens (sometimes called male hormones, which all women naturally have) are slightly elevated, the ovaries may pause egg release. This can cause periods to be late or skipped, and may lead to changes like skin breakouts, unwanted hair, or weight changes around the waist.

Because conditions like thyroid imbalance or stress can produce very similar signs, doctors always recommend running simple blood tests and an ultrasound to look at the complete picture. This tool gives you clear knowledge to guide your conversation with a healthcare professional.`;
        break;
    }
  } else {
    switch (userSelectedLanguage) {
      case 'te':
        plainLanguageExplanation = `మీ లక్షణాల వివరణకు ధన్యవాదాలు. మీరు అందించిన వివరాలలో నిర్దిష్ట హార్మోన్ లేదా పీరియడ్స్ సంబంధిత లక్షణాలు ఏవీ స్పష్టంగా కనిపించలేదు. దయచేసి మీ పీరియడ్స్ తేదీలు, చర్మం లేదా బరువు మార్పుల గురించి మరిన్ని వివరాలు అందించండి.`;
        break;
      case 'kn':
        plainLanguageExplanation = `ನಿಮ್ಮ ವಿವರಗಳಿಗೆ ಧನ್ಯವಾದಗಳು. ನೀವು ನೀಡಿದ ವಿವರಣೆಯಲ್ಲಿ ಯಾವುದೇ ನಿರ್ದಿಷ್ಟ ಮುಟ್ಟು ಅಥವಾ ಹಾರ್ಮೋನ್ ಲಕ್ಷಣಗಳು ಸ್ಪಷ್ಟವಾಗಿ ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಮುಟ್ಟು ಮತ್ತು ದೈಹಿಕ ಬದಲಾವಣೆಗಳ ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ವಿವರಗಳನ್ನು ತಿಳಿಸಿ.`;
        break;
      case 'hi':
        plainLanguageExplanation = `अपने लक्षणों को साझा करने के लिए धन्यवाद। दिए गए विवरण में कोई स्पष्ट मासिक या हार्मोनल लक्षण नहीं मिला। कृपया अपने मासिक चक्र, त्वचा या बालों में आए बदलावों के बारे में विस्तार से बताएं।`;
        break;
      case 'ta':
        plainLanguageExplanation = `உங்கள் அறிகுறிகளைப் பகிர்ந்ததற்கு நன்றி. நீங்கள் உள்ளிட்ட தகவலில் குறிப்பிட்ட மாதவிடாய் அல்லது ஹார்மோன் அறிகுறிகள் தெளிவாகக் கண்டறியப்படவில்லை. தயவுசெய்து உங்கள் சுழற்சி குறித்து கூடுதல் விவரங்களை உள்ளிடவும்.`;
        break;
      default:
        plainLanguageExplanation = `Thank you for sharing your thoughts. We were not able to detect specific menstrual, hormonal, or metabolic symptoms from the text provided. You can describe your periods, cycle dates, skin, hair, or energy changes in your native language or by using voice input.`;
        break;
    }
  }

  // Guardrail enforcement
  plainLanguageExplanation = applyNonDiagnosticGuardrails(plainLanguageExplanation);

  const educationalNotes = [
    'Rotterdam 2-of-3 Rule: Globally, doctors evaluate PCOS using the Rotterdam Consensus. A woman is evaluated for PCOS if she has at least two out of three criteria: irregular cycles, androgen symptoms (like hair or acne), or multiple tiny follicles on ultrasound.',
    'The Role of Insulin: Over 70% of women with PCOS have insulin resistance. This means your body needs extra insulin to process blood sugar, and that extra insulin signals the ovaries to produce more androgens.',
    'Why It Is Manageable: PCOS is not a disease that defines you; it is a metabolic and hormonal state that responds remarkably well to balanced nutrition, restful sleep, stress management, and medical guidance.'
  ];

  const careGuidance: CareGuidance = {
    specialists: SPECIALIST_GUIDANCE,
    testsToAskAbout: RECOMMENDED_LAB_TESTS,
    urgencyLevel,
    urgencyText,
    lifestyleInsights: {
      nutrition: 'Focus on low-glycemic, fiber-rich meals (whole grains like ragi, bajra, pulses, lentils, and generous green vegetables). Pair carbohydrates with proteins or healthy fats to stabilize insulin surges.',
      physicalActivity: 'Aim for 30 minutes of moderate activity (brisk walking, strength training, yoga, or swimming) most days. Resistance training is particularly helpful for muscle insulin sensitivity.',
      sleepAndStress: 'Consistent 7–8 hours of quality sleep helps regulate cortisol and reproductive hormone pulsatility.'
    }
  };

  return {
    detectedLanguage: userSelectedLanguage,
    inputWasTransliterated: recognizedPhrases.length > 0,
    normalizedEnglishText: normalizedPivot,
    redFlags,
    extractedSymptoms,
    rotterdamCriteriaMatch: {
      ovulatoryDysfunction: hasOvulatoryDysfunction,
      hyperandrogenism: hasHyperandrogenism,
      polycysticMorphologySigns: hasUltrasoundMention,
      criteriaMetCount
    },
    differentialConditions,
    plainLanguageExplanation,
    educationalNotes,
    careGuidance,
    followUpAnswers,
    generatedAt: new Date().toISOString()
  };
}
