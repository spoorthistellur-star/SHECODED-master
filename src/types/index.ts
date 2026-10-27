export type SupportedLanguage = 'en' | 'kn' | 'hi' | 'ta' | 'te';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  samplePhrase: string;
  transliteratedSample: string;
}

export type SymptomSeverity = 'mild' | 'moderate' | 'severe';
export type SymptomDuration = '< 1 month' | '1-3 months' | '3-6 months' | '6-12 months' | '> 1 year';
export type SymptomOnset = 'recent' | 'gradual' | 'chronic';

export interface ExtractedSymptom {
  id: string;
  name: string;
  originalTerm: string;
  snomedCode?: string;
  category: 'menstrual' | 'hyperandrogenism' | 'metabolic' | 'systemic' | 'fertility';
  severity: SymptomSeverity;
  duration?: string;
  details?: string;
  clinicalSignificance: string;
}

export interface RedFlagAlert {
  isTriggered: boolean;
  category: 'heavy_bleeding' | 'severe_pain' | 'ectopic_risk' | 'fainting_syncope' | 'mental_distress' | 'infection_risk' | 'none';
  headline: string;
  reason: string;
  actionRequired: string;
  helplines: { name: string; number: string; description: string }[];
}

export interface FollowUpQuestion {
  id: string;
  question: string;
  translatedQuestion: Record<SupportedLanguage, string>;
  options: {
    id: string;
    label: string;
    translatedLabel: Record<SupportedLanguage, string>;
    clinicalTag?: string;
  }[];
  selectedOptionId?: string;
}

export interface ConditionOverlap {
  conditionName: string;
  commonSymptoms: string[];
  keyDistinguishingFeatures: string;
  likelihoodCategory: 'High alignment' | 'Moderate alignment' | 'Possible contributing factor';
  whyConsidered: string;
}

export interface CareGuidance {
  specialists: {
    role: string;
    why: string;
    icon: string;
  }[];
  testsToAskAbout: {
    testName: string;
    purpose: string;
    idealTiming?: string;
  }[];
  urgencyLevel: 'routine' | 'soon' | 'urgent';
  urgencyText: string;
  lifestyleInsights: {
    nutrition: string;
    physicalActivity: string;
    sleepAndStress: string;
  };
}

export interface AssessmentResult {
  detectedLanguage: SupportedLanguage;
  inputWasTransliterated: boolean;
  normalizedEnglishText: string;
  redFlags: RedFlagAlert;
  extractedSymptoms: ExtractedSymptom[];
  rotterdamCriteriaMatch: {
    ovulatoryDysfunction: boolean;
    hyperandrogenism: boolean;
    polycysticMorphologySigns: boolean;
    criteriaMetCount: number; // Rotterdam requires 2 of 3
  };
  differentialConditions: ConditionOverlap[];
  plainLanguageExplanation: string;
  educationalNotes: string[];
  careGuidance: CareGuidance;
  followUpAnswers?: Record<string, string>;
  generatedAt: string;
}

// User Profile & Account Data
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age?: number;
  cycleLengthDays?: number;
  preferredLanguage: SupportedLanguage;
  createdAt: string;
}

// Saved Symptom Log Entry
export interface SavedSymptomLog {
  id: string;
  userId: string;
  timestamp: string;
  rawInput: string;
  symptomsCount: number;
  symptomsSummary: string[];
  rotterdamCriteriaCount: number;
  urgencyLevel: 'routine' | 'soon' | 'urgent';
  assessment: AssessmentResult;
  userNotes?: string;
}

// Action items / Plan timeline ("Tomorrow what you have to do, Next month what you have to do")
export type ActionTimeframe = 'tomorrow' | 'this_week' | 'next_month';

export interface CareActionItem {
  id: string;
  title: string;
  timeframe: ActionTimeframe;
  category: 'medical' | 'nutrition' | 'activity' | 'tracking';
  description: string;
  isCompleted: boolean;
  suggestedDayOrDate?: string;
  priority: 'high' | 'medium' | 'normal';
}
