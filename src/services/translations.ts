import { SupportedLanguage } from '../types';

export interface TranslationStrings {
  appTitle: string;
  appSubtitle: string;
  disclaimerBanner: string;
  tabInput: string;
  tabResults: string;
  tabLearn: string;
  tabDoctorCard: string;
  inputPlaceholder: string;
  inputPromptTitle: string;
  inputPromptDesc: string;
  voiceButtonStart: string;
  voiceButtonStop: string;
  voiceListening: string;
  voiceNotSupported: string;
  analyzeButton: string;
  analyzingButton: string;
  samplePhrasesLabel: string;
  clearButton: string;
  redFlagAlertTitle: string;
  redFlagImmediateAction: string;
  symptomsDetectedTitle: string;
  noSymptomsFound: string;
  severityLabel: string;
  snomedCodeLabel: string;
  clinicalSignificanceLabel: string;
  followUpTitle: string;
  followUpSubtitle: string;
  explanationTitle: string;
  differentialTitle: string;
  rotterdamCriteriaTitle: string;
  rotterdamExplanation: string;
  careGuidanceTitle: string;
  specialistTitle: string;
  testsTitle: string;
  urgencyTitle: string;
  lifestyleTitle: string;
  nutritionTitle: string;
  activityTitle: string;
  sleepTitle: string;
  printSummaryBtn: string;
  shareSummaryBtn: string;
  copiedNotification: string;
  audioReadAloud: string;
  audioStop: string;
  feedbackQuestion: string;
  feedbackHelpful: string;
  feedbackNeedsImprovement: string;
  feedbackThankYou: string;
  privacyGuarantee: string;
  apiSettings: string;
  close: string;
  submitAnswersBtn: string;
  submittingAnswersBtn: string;
  answersUpdatedSuccess: string;
  markSymptomsTitle: string;
  markSymptomsDesc: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationStrings> = {
  en: {
    appTitle: "SheDecoded",
    appSubtitle: "Making Women's Health Easier to Understand.",
    disclaimerBanner: "⚠️ For Information Only: This tool provides educational guidance and is not a medical diagnosis. Always consult a qualified doctor for clinical decisions.",
    tabInput: "1. Share Symptoms",
    tabResults: "2. Analysis & Insights",
    tabLearn: "3. PCOS Explained",
    tabDoctorCard: "4. Doctor Summary",
    inputPlaceholder: "Describe what you're experiencing in your words (e.g., 'Periods late aagide for 4 months, getting acne on chin and hair fall'). Type or speak in English, Kannada, Hindi, Tamil, Telugu, or Kanglish/Hinglish...",
    inputPromptTitle: "Tell us about your symptoms",
    inputPromptDesc: "You can type in English, your regional language, or mixed conversational style (Kanglish/Hinglish). You can also click the microphone to speak.",
    voiceButtonStart: "Speak in Your Language",
    voiceButtonStop: "Stop Recording",
    voiceListening: "Listening... Please speak clearly",
    voiceNotSupported: "Speech recognition is not supported in this browser. Please use Google Chrome or Edge.",
    analyzeButton: "Understand My Symptoms",
    analyzingButton: "Analyzing & Safety Screening...",
    samplePhrasesLabel: "Try these sample descriptions:",
    clearButton: "Clear",
    redFlagAlertTitle: "Urgent Medical Attention Recommended",
    redFlagImmediateAction: "Please contact an emergency healthcare provider or hospital immediately.",
    symptomsDetectedTitle: "Structured Symptoms Identified",
    noSymptomsFound: "No distinct hormonal or menstrual symptoms recognized yet. Please add more details about your cycle or physical changes.",
    severityLabel: "Severity",
    snomedCodeLabel: "Clinical Standard (SNOMED)",
    clinicalSignificanceLabel: "Clinical Significance",
    followUpTitle: "Smart Follow-Up Questions",
    followUpSubtitle: "Select the option that best matches your situation to refine your guidance.",
    explanationTitle: "What Your Symptoms Mean",
    differentialTitle: "Other Conditions with Overlapping Symptoms",
    rotterdamCriteriaTitle: "Rotterdam PCOS Evaluation Framework",
    rotterdamExplanation: "Under international medical guidelines, doctors check if at least 2 of these 3 features are present:",
    careGuidanceTitle: "Care Guidance & Next Steps",
    specialistTitle: "Which Doctor Should You Consult?",
    testsTitle: "Tests You May Want to Ask Your Doctor About",
    urgencyTitle: "Consultation Urgency",
    lifestyleTitle: "Everyday Self-Care & Lifestyle Guidance",
    nutritionTitle: "Balanced Nutrition",
    activityTitle: "Physical Movement",
    sleepTitle: "Sleep & Stress Harmony",
    printSummaryBtn: "Print / Save PDF for Doctor",
    shareSummaryBtn: "Copy Clinical Brief",
    copiedNotification: "Summary copied to clipboard!",
    audioReadAloud: "Listen (Audio Read-Aloud)",
    audioStop: "Pause Audio",
    feedbackQuestion: "Was this information clear and helpful for your doctor visit?",
    feedbackHelpful: "Yes, very helpful",
    feedbackNeedsImprovement: "Needs improvement",
    feedbackThankYou: "Thank you for your valuable feedback!",
    privacyGuarantee: "🔒 Privacy First: Your symptoms are evaluated locally in your browser. No health information is permanently stored.",
    apiSettings: "AI Engine Settings",
    close: "Close",
    submitAnswersBtn: "Submit Answers & Re-Analyze Symptoms",
    submittingAnswersBtn: "Updating Analysis...",
    answersUpdatedSuccess: "Analysis successfully updated with your answers!",
    markSymptomsTitle: "Mark / Refine Symptoms You Experience",
    markSymptomsDesc: "Tap any symptom below to mark or unmark it for direct clinical evaluation:"
  },
  kn: {
    appTitle: "SheDecoded",
    appSubtitle: "ಮಹಿಳೆಯರ ಆರೋಗ್ಯವನ್ನು ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು — Making Women's Health Easier to Understand.",
    disclaimerBanner: "⚠️ ಮಾಹಿತಿಗಾಗಿ ಮಾತ್ರ: ಇದು ಶೈಕ್ಷಣಿಕ ಮಾಹಿತಿಯಾಗಿದೆ ಮತ್ತು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವಲ್ಲ. ವೈದ್ಯಕೀಯ ತೀರ್ಮಾನಗಳಿಗೆ ಅರ್ಹ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    tabInput: "1. ಲಕ್ಷಣಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
    tabResults: "2. ವಿಶ್ಲೇಷಣೆ & ಮಾಹಿತಿ",
    tabLearn: "3. ಪಿಸಿಓಎಸ್ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ",
    tabDoctorCard: "4. ವೈದ್ಯರ ಸಮಾಲೋಚನೆ ಚೀಟಿ",
    inputPlaceholder: "ನಿಮ್ಮ ಮಾತುಗಳಲ್ಲಿ ಬರೆಯಿರಿ (ಉದಾ: 'Periods late aagide, ಮುಖದ ಮೇಲೆ ಮೊಡವೆ ಮತ್ತು ಕೂದಲು ಉದುರುತ್ತಿದೆ'). ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್ ಅಥವಾ Kanglish ನಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಮಾತನಾಡಿ...",
    inputPromptTitle: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಲಕ್ಷಣಗಳನ್ನು ತಿಳಿಸಿ",
    inputPromptDesc: "ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್ ಅಥವಾ ಕಾಂಗ್ಲಿಷ್ (Kanglish) ನಲ್ಲಿ ಬರೆಯಬಹುದು. ಮಾತನಾಡಲು ಮೈಕ್ರೋಫೋನ್ ಬಟನ್ ಒತ್ತಿ.",
    voiceButtonStart: "ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ",
    voiceButtonStop: "ಧ್ವನಿ ಮುಕ್ತಾಯಗೊಳಿಸಿ",
    voiceListening: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇವೆ... ದಯವಿಟ್ಟು ಮಾತನಾಡಿ",
    voiceNotSupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಲಭ್ಯವಿಲ್ಲ. Google Chrome ಬಳಸಿ.",
    analyzeButton: "ಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    analyzingButton: "ವಿಶ್ಲೇಷಣೆ ನಡೆಯುತ್ತಿದೆ...",
    samplePhrasesLabel: "ಮಾದರಿ ವಿವರಣೆಗಳು:",
    clearButton: "ತೆರವುಗೊಳಿಸಿ",
    redFlagAlertTitle: "ತುರ್ತು ವೈದ್ಯಕೀಯ ನೆರವು ಅಗತ್ಯವಿದೆ",
    redFlagImmediateAction: "ದಯವಿಟ್ಟು ತಕ್ಷಣವೇ ತುರ್ತು ಚಿಕಿತ್ಸಾ ಆಸ್ಪತ್ರೆ ಅಥವಾ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    symptomsDetectedTitle: "ಗುರುತಿಸಲಾದ ಲಕ್ಷಣಗಳು",
    noSymptomsFound: "ಯಾವುದೇ ಸ್ಪಷ್ಟ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಮುಟ್ಟು ಮತ್ತು ದೈಹಿಕ ಬದಲಾವಣೆಗಳ ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ವಿವರ ನೀಡಿ.",
    severityLabel: "ತೀವ್ರತೆ",
    snomedCodeLabel: "ಕ್ಲಿನಿಕಲ್ ಕೋಡ್ (SNOMED)",
    clinicalSignificanceLabel: "ವೈದ್ಯಕೀಯ ಮಹತ್ವ",
    followUpTitle: "ಪೂರಕ ಪ್ರಶ್ನೆಗಳು",
    followUpSubtitle: "ನಿಖರವಾದ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಲು ಸೂಕ್ತ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ.",
    explanationTitle: "ನಿಮ್ಮ ಲಕ್ಷಣಗಳ ವಿವರಣೆ",
    differentialTitle: "ಇದೇ ರೀತಿಯ ಲಕ್ಷಣಗಳನ್ನು ಹೊಂದಿರುವ ಇತರ ಪರಿಸ್ಥಿತಿಗಳು",
    rotterdamCriteriaTitle: "ರೋಟರ್ಡ್ಯಾಮ್ (Rotterdam) ಪಿಸಿಓಎಸ್ ಮಾನದಂಡ",
    rotterdamExplanation: "ಅಂತರರಾಷ್ಟ್ರೀಯ ಮಾರ್ಗಸೂಚಿಗಳ ಪ್ರಕಾರ, ವೈದ್ಯರು ಈ ಕೆಳಗಿನ 3 ಲಕ್ಷಣಗಳಲ್ಲಿ ಕನಿಷ್ಠ 2 ನ್ನು ಪರಿಶೀಲಿಸುತ್ತಾರೆ:",
    careGuidanceTitle: "ವೈದ್ಯಕೀಯ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಮುಂದಿನ ಹಂತಗಳು",
    specialistTitle: "ಯಾವ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಬೇಕು?",
    testsTitle: "ವೈದ್ಯರ ಬಳಿ ಚರ್ಚಿಸಬಹುದಾದ ಪರೀಕ್ಷೆಗಳು",
    urgencyTitle: "ಸಮಾಲೋಚನೆಯ ತುರ್ತು",
    lifestyleTitle: "ದೈನಂದಿನ ಜೀವನಶೈಲಿ ಸಲಹೆಗಳು",
    nutritionTitle: "ಸಮತೋಲಿತ ಆಹಾರ",
    activityTitle: "ದೈಹಿಕ ವ್ಯಾಯಾಮ",
    sleepTitle: "ನಿದ್ದೆ ಮತ್ತು ಒತ್ತಡ ನಿರ್ವಹಣೆ",
    printSummaryBtn: "ವೈದ್ಯರಿಗಾಗಿ ಪ್ರಿಂಟ್ / PDF ಉಳಿಸಿ",
    shareSummaryBtn: "ಮಾಹಿತಿ ನಕಲಿಸಿ",
    copiedNotification: "ಕ್ಲಿಪ್‌ಬೋರ್ಡ್‌ಗೆ ನಕಲಿಸಲಾಗಿದೆ!",
    audioReadAloud: "ಕೇಳಿ (ಆಡಿಯೋ ವಾಚನ)",
    audioStop: "ಆಡಿಯೋ ನಿಲ್ಲಿಸಿ",
    feedbackQuestion: "ಈ ಮಾಹಿತಿ ನಿಮಗೆ ಉಪಯುಕ್ತವಾಗಿದೆಯೇ?",
    feedbackHelpful: "ಹೌದು, ತುಂಬಾ ಉಪಯುಕ್ತ",
    feedbackNeedsImprovement: "ಸುಧಾರಣೆ ಅಗತ್ಯವಿದೆ",
    feedbackThankYou: "ನಿಮ್ಮ ಅಮೂಲ್ಯ ಅಭಿಪ್ರಾಯಕ್ಕೆ ಧನ್ಯವಾದಗಳು!",
    privacyGuarantee: "🔒 ಸಂಪೂರ್ಣ ಗೌಪ್ಯತೆ: ನಿಮ್ಮ ಆರೋಗ್ಯ ವಿವರಗಳನ್ನು ಎಲ್ಲಿಯೂ ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ.",
    apiSettings: "AI ಸೆಟ್ಟಿಂಗ್ಸ್",
    close: "ಮುಚ್ಚಿ",
    submitAnswersBtn: "ಉತ್ತರಗಳನ್ನು ಸಲ್ಲಿಸಿ & ಲಕ್ಷಣಗಳನ್ನು ಮರುಪರಿಶೀಲಿಸಿ",
    submittingAnswersBtn: "ವಿಶ್ಲೇಷಣೆ ನವೀಕರಿಸಲಾಗುತ್ತಿದೆ...",
    answersUpdatedSuccess: "ನಿಮ್ಮ ಉತ್ತರಗಳ ಆಧಾರದ ಮೇಲೆ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!",
    markSymptomsTitle: "ನಿಮ್ಮಲ್ಲಿ ಕಂಡುಬರುವ ಲಕ್ಷಣಗಳನ್ನು ಗುರುತಿಸಿ / ಸರಿಹೊಂದಿಸಿ",
    markSymptomsDesc: "ನೇರ ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನಕ್ಕಾಗಿ ಕೆಳಗಿನ ಯಾವುದೇ ಲಕ್ಷಣವನ್ನು ಗುರುತಿಸಿ ಅಥವಾ ತೆಗೆದುಹಾಕಿ:"
  },
  hi: {
    appTitle: "SheDecoded",
    appSubtitle: "महिलाओं के स्वास्थ्य को समझना हुआ और भी आसान — Making Women's Health Easier to Understand.",
    disclaimerBanner: "⚠️ केवल जानकारी के लिए: यह एक शैक्षिक मार्गदर्शन है, चिकित्सीय निदान (Diagnosis) नहीं। चिकित्सा सलाह के लिए हमेशा डॉक्टर से संपर्क करें।",
    tabInput: "1. लक्षण बताएं",
    tabResults: "2. विश्लेषण और जानकारी",
    tabLearn: "3. पीसीओएस को समझें",
    tabDoctorCard: "4. डॉक्टर समरी",
    inputPlaceholder: "अपनी भाषा में लिखें (जैसे: 'Periods late ho rahe hain, chehre pe pimples aur baal aa gaye hain'). हिंदी, हिंग्लिश या इंग्लिश में टाइप करें या बोलें...",
    inputPromptTitle: "अपने लक्षणों के बारे में बताएं",
    inputPromptDesc: "हिंदी, हिंग्लिश या अंग्रेजी में लिखें या माइक बटन दबाकर बोलें।",
    voiceButtonStart: "अपनी भाषा में बोलें",
    voiceButtonStop: "रिकॉर्डिंग बंद करें",
    voiceListening: "सुन रहे हैं... कृपया स्पष्ट बोलें",
    voiceNotSupported: "इस ब्राउज़र में स्पीच रिकॉग्निशन समर्थित नहीं है। कृपया Chrome का उपयोग करें।",
    analyzeButton: "लक्षणों का विश्लेषण करें",
    analyzingButton: "विश्लेषण जारी है...",
    samplePhrasesLabel: "उदाहरण वाक्य:",
    clearButton: "हटाएं",
    redFlagAlertTitle: "तत्काल चिकित्सा सहायता की आवश्यकता",
    redFlagImmediateAction: "कृपया तुरंत किसी नजदीकी आपातकालीन अस्पताल या डॉक्टर से संपर्क करें।",
    symptomsDetectedTitle: "पहचाने गए लक्षण",
    noSymptomsFound: "कोई स्पष्ट लक्षण नहीं मिला। कृपया अपने मासिक चक्र या शारीरिक बदलावों के बारे में विस्तार से लिखें।",
    severityLabel: "गंभीरता",
    snomedCodeLabel: "चिकित्सीय कोड (SNOMED)",
    clinicalSignificanceLabel: "चिकित्सीय महत्व",
    followUpTitle: "महत्वपूर्ण अनुवर्ती प्रश्न",
    followUpSubtitle: "सटीक जानकारी प्राप्त करने के लिए सही विकल्प चुनें।",
    explanationTitle: "लक्षणों का सरल अर्थ",
    differentialTitle: "समान लक्षणों वाली अन्य स्वास्थ्य स्थितियां",
    rotterdamCriteriaTitle: "रॉटरडैम पीसीओएस मूल्यांकन मानक",
    rotterdamExplanation: "अंतर्राष्ट्रीय दिशानिर्देशों के अनुसार, डॉक्टर इन 3 में से कम से कम 2 लक्षणों की जांच करते हैं:",
    careGuidanceTitle: "देखभाल मार्गदर्शन और अगले कदम",
    specialistTitle: "किस डॉक्टर से परामर्श लें?",
    testsTitle: "जांच जिनके बारे में डॉक्टर से चर्चा करें",
    urgencyTitle: "परामर्श की प्राथमिकता",
    lifestyleTitle: "जीवनशैली और स्व-देखभाल के सुझाव",
    nutritionTitle: "संतुलित पोषण",
    activityTitle: "शारीरिक व्यायाम",
    sleepTitle: "नींद और तनाव नियंत्रण",
    printSummaryBtn: "डॉक्टर के लिए प्रिंट / PDF बनाएं",
    shareSummaryBtn: "कॉपी करें",
    copiedNotification: "क्लिपबोर्ड पर कॉपी हो गया!",
    audioReadAloud: "ऑडियो सुनें (Read Aloud)",
    audioStop: "ऑडियो रोकें",
    feedbackQuestion: "क्या यह जानकारी आपके लिए मददगार थी?",
    feedbackHelpful: "हाँ, बहुत मददगार",
    feedbackNeedsImprovement: "सुधार की जरूरत है",
    feedbackThankYou: "आपकी प्रतिक्रिया के लिए धन्यवाद!",
    privacyGuarantee: "🔒 गोपनीयता की गारंटी: आपकी स्वास्थ्य जानकारी कहीं भी सहेजी नहीं जाती है।",
    apiSettings: "AI सेटिंग्स",
    close: "बंद करें",
    submitAnswersBtn: "उत्तर सबमिट करें और लक्षणों का पुन: विश्लेषण करें",
    submittingAnswersBtn: "विश्लेषण अपडेट किया जा रहा है...",
    answersUpdatedSuccess: "आपके उत्तरों के आधार पर विश्लेषण सफलतापूर्वक अपडेट हो गया!",
    markSymptomsTitle: "अपने लक्षणों को चिन्हित करें / चुनें",
    markSymptomsDesc: "प्रत्यक्ष नैदानिक ​​मूल्यांकन के लिए नीचे दिए गए लक्षणों को चुनें या हटाएं:"
  },
  ta: {
    appTitle: "SheDecoded",
    appSubtitle: "பெண்களின் ஆரோக்கியத்தை எளிதாகப் புரிந்து கொள்ள — Making Women's Health Easier to Understand.",
    disclaimerBanner: "⚠️ தகவலுக்கு மட்டுமே: இது மருத்துவக் கண்டறிதல் (Diagnosis) அல்ல, கல்வி வழிகாட்டுதல் மட்டுமே. மருத்துவ முடிவுகளுக்கு மருத்துவரை அணுகவும்.",
    tabInput: "1. அறிகுறிகளை பகிரவும்",
    tabResults: "2. பகுப்பாய்வு & தகவல்கள்",
    tabLearn: "3. PCOS பற்றி அறிய",
    tabDoctorCard: "4. மருத்துவர் குறிப்பு",
    inputPlaceholder: "உங்கள் வார்த்தைகளில் விவரிக்கவும் (எ.கா: 'Periods sariya varala, face la mudi valaruthu, weight poduthu'). தமிழ் அல்லது Tanglish-ல் எழுதலாம்...",
    inputPromptTitle: "உங்கள் அறிகுறிகளைப் பற்றி சொல்லுங்கள்",
    inputPromptDesc: "தமிழ், ஆங்கிலம் அல்லது Tanglish-ல் தட்டச்சு செய்யலாம் அல்லது மைக்ரோஃபோன் வழியாக பேசலாம்.",
    voiceButtonStart: "உங்கள் மொழியில் பேசுங்கள்",
    voiceButtonStop: "பதிவை நிறுத்துங்கள்",
    voiceListening: "கேட்கிறது... தயவுசெய்து பேசுங்கள்",
    voiceNotSupported: "இந்த உலாவியில் வாய்ஸ் வசதி இல்லை. Google Chrome பயன்படுத்தவும்.",
    analyzeButton: "அறிகுறிகளை பகுப்பாய்வு செய்",
    analyzingButton: "பகுப்பாய்வு நடக்கிறது...",
    samplePhrasesLabel: "மாதிரி வாக்கியங்கள்:",
    clearButton: "அழி",
    redFlagAlertTitle: "உடனடி மருத்துவ உதவி தேவை",
    redFlagImmediateAction: "தயவுசெய்து உடனடியாக அவசர சிகிச்சை மருத்துவமனை அல்லது மருத்துவரை அணுகவும்.",
    symptomsDetectedTitle: "கண்டறியப்பட்ட அறிகுறிகள்",
    noSymptomsFound: "குறிப்பிட்ட அறிகுறிகள் எதுவும் கண்டறியப்படவில்லை. மேலும் விவரங்களை உள்ளிடவும்.",
    severityLabel: "தீவிரம்",
    snomedCodeLabel: "மருத்துவ குறியீடு (SNOMED)",
    clinicalSignificanceLabel: "மருத்துவ முக்கியத்துவம்",
    followUpTitle: "தொடர் கேள்விகள்",
    followUpSubtitle: "துல்லியமான வழிகாட்டுதலுக்கு சரியான தேர்வைத் தேர்ந்தெடுக்கவும்.",
    explanationTitle: "அறிகுறிகளின் விளக்கம்",
    differentialTitle: "ஒத்த அறிகுறிகளைக் கொண்ட பிற நிலைகள்",
    rotterdamCriteriaTitle: "ராட்டர்டாம் PCOS மதிப்பீட்டு முறை",
    rotterdamExplanation: "சர்வதேச வழிகாட்டுதல்களின்படி, மருத்துவர்கள் இந்த 3-ல் குறைந்தபட்சம் 2 அம்சங்களை பரிசீலிக்கின்றனர்:",
    careGuidanceTitle: "சிகிச்சை வழிகாட்டுதல் மற்றும் அடுத்த படிகள்",
    specialistTitle: "எந்த மருத்துவரை அணுக வேண்டும்?",
    testsTitle: "மருத்துவரிடம் கேட்க வேண்டிய பரிசோதனைகள்",
    urgencyTitle: "ஆலோசனையின் அவசரம்",
    lifestyleTitle: "சுய பாதுகாப்பு & வாழ்க்கை முறை ஆலோசனைகள்",
    nutritionTitle: "சீரான ஊட்டச்சத்து",
    activityTitle: "உடற்பயிற்சி",
    sleepTitle: "தூக்கம் & மன அழுத்தம் குறைப்பு",
    printSummaryBtn: "மருத்துவருக்கு அச்சிட / PDF சேமிக்க",
    shareSummaryBtn: "நகலெடு",
    copiedNotification: "நகலெடுக்கப்பட்டது!",
    audioReadAloud: "கேட்க (ஆடியோ வாசிப்பு)",
    audioStop: "ஆடியோவை நிறுத்து",
    feedbackQuestion: "இந்த தகவல் உங்களுக்கு பயனுள்ளதாக இருந்ததா?",
    feedbackHelpful: "ஆம், மிகவும் பயனுள்ளது",
    feedbackNeedsImprovement: "மேம்படுத்த வேண்டும்",
    feedbackThankYou: "உங்கள் கருத்துக்கு நன்றி!",
    privacyGuarantee: "🔒 முழுமையான தனியுரிமை: உங்கள் உடல்நலத் தகவல்கள் சேமிக்கப்படாது.",
    apiSettings: "AI அமைப்புகள்",
    close: "மூடு",
    submitAnswersBtn: "பதில்களை சமர்ப்பித்து மீண்டும் பகுப்பாய்வு செய்யவும்",
    submittingAnswersBtn: "பகுப்பாய்வு புதுப்பிக்கப்படுகிறது...",
    answersUpdatedSuccess: "உங்கள் பதில்களின் அடிப்படையில் பகுப்பாய்வு புதுப்பிக்கப்பட்டது!",
    markSymptomsTitle: "உங்கள் அறிகுறிகளைத் தேர்வு செய்யவும்",
    markSymptomsDesc: "மருத்துவ மதிப்பீட்டிற்காக கீழே உள்ள அறிகுறிகளை தேர்வு செய்யவும்:"
  },
  te: {
    appTitle: "SheDecoded",
    appSubtitle: "మహిళల ఆరోగ్యాన్ని సులభంగా అర్థం చేసుకోండి — Making Women's Health Easier to Understand.",
    disclaimerBanner: "⚠️ సమాచారం కొరకు మాత్రమే: ఇది అవగాహన కొరకు మాత్రమే, వైద్య నిర్ధారణ (Diagnosis) కాదు. చికిత్స కోసం అర్హత కలిగిన వైద్యుడిని సంప్రదించండి.",
    tabInput: "1. లక్షణాలు చెప్పండి",
    tabResults: "2. విశ్లేషణ & సమాచారం",
    tabLearn: "3. PCOS గురించి తెలుసుకోండి",
    tabDoctorCard: "4. డాక్టర్ సలహా పత్రం",
    inputPlaceholder: "మీ మాటల్లో వివరించండి (ఉదా: 'Periods time ki raavadam ledu, mukham meeda ventrukalu and weight perigindi'). తెలుగు లేదా ఇంగ్లీషులో టైప్ చేయండి...",
    inputPromptTitle: "మీ ఆరోగ్య లక్షణాల గురించి తెలపండి",
    inputPromptDesc: "తెలుగు లేదా ఇంగ్లీష్‌లో టైప్ చేయండి లేదా మాట్లాడటానికి మైక్రోఫోన్ బటన్ నొక్కండి.",
    voiceButtonStart: "మీ భాషలో మాట్లాడండి",
    voiceButtonStop: "రికార్డింగ్ ఆపండి",
    voiceListening: "వింటున్నాము... దయచేసి మాట్లాడండి",
    voiceNotSupported: "ఈ బ్రౌజర్‌లో వాయిస్ రికగ్నిషన్ అందుబాటులో లేదు. Google Chrome ఉపయోగించండి.",
    analyzeButton: "లక్షణాలను విశ్లేషించండి",
    analyzingButton: "విశ్లేషిస్తున్నాము...",
    samplePhrasesLabel: "ఉదాహరణ వాక్యాలు:",
    clearButton: "క్లియర్",
    redFlagAlertTitle: "తక్షణ వైద్య సహాయం అవసరం",
    redFlagImmediateAction: "దయచేసి వెంటనే అత్యవసర ఆసుపత్రిని లేదా వైద్యుడిని సంప్రదించండి.",
    symptomsDetectedTitle: "గుర్తించిన లక్షణాలు",
    noSymptomsFound: "నిర్దిష్ట లక్షణాలు ఏవీ గుర్తించబడలేదు. దయచేసి మరిన్ని వివరాలు అందించండి.",
    severityLabel: "తీవ్రత",
    snomedCodeLabel: "క్లినికల్ కోడ్ (SNOMED)",
    clinicalSignificanceLabel: "వైద్య ప్రాముఖ్యత",
    followUpTitle: "అనుబంధ ప్రశ్నలు",
    followUpSubtitle: "మరింత స్పష్టమైన మార్గదర్శకత్వం కోసం సరైన ఎంపికను ఎంచుకోండి.",
    explanationTitle: "మీ లక్షణాల వివరణ",
    differentialTitle: "ఇలాంటి లక్షణాలు ఉండే ఇతర పరిస్థితులు",
    rotterdamCriteriaTitle: "రోటర్‌డ్యామ్ PCOS ప్రమాణాలు",
    rotterdamExplanation: "అంతర్జాతీయ మార్గదర్శకాల ప్రకారం, వైద్యులు ఈ 3 లక్షణాలలో కనీసం 2 ఉన్నాయో లేదో పరీక్షిస్తారు:",
    careGuidanceTitle: "సంరక్షణ మార్గదర్శకత్వం & తదుపరి చర్యలు",
    specialistTitle: "ఏ డాక్టర్‌ని సంప్రదించాలి?",
    testsTitle: "డాక్టర్‌తో చర్చించాల్సిన పరీక్షలు",
    urgencyTitle: "సంప్రదింపు ప్రాధాన్యత",
    lifestyleTitle: "జీవనశైలి & స్వీయ సంరక్షణ సూచనలు",
    nutritionTitle: "సమతుల్య పోషకాహారం",
    activityTitle: "శారీరక వ్యాయామం",
    sleepTitle: "నిద్ర & మానసిక ప్రశాంతత",
    printSummaryBtn: "డాక్టర్ కోసం ప్రింట్ / PDF పొందండి",
    shareSummaryBtn: "సారాంశాన్ని కాపీ చేయండి",
    copiedNotification: "క్లిప్‌బోర్డ్‌కి కాపీ చేయబడింది!",
    audioReadAloud: "వినండి (ఆడియో చదవడం)",
    audioStop: "ఆడియో ఆపండి",
    feedbackQuestion: "ఈ సమాచారం మీకు ఉపయోగకరంగా ఉందా?",
    feedbackHelpful: "అవును, చాలా సహాయకరంగా ఉంది",
    feedbackNeedsImprovement: "మెరుగుపరచాలి",
    feedbackThankYou: "మీ విలువైన అభిప్రాయానికి ధన్యవాదాలు!",
    privacyGuarantee: "🔒 పూర్తి గోప్యత: మీ ఆరోగ్య వివరాలు ఎక్కడా నిల్వ చేయబడవు.",
    apiSettings: "AI సెట్టింగ్స్",
    close: "మూసివేయి",
    submitAnswersBtn: "సమాధానాలు సమర్పించండి & లక్షణాలను పునఃసమీక్షించండి",
    submittingAnswersBtn: "విశ్లేషణ నవీకరించబడుతోంది...",
    answersUpdatedSuccess: "మీ సమాధానాల ఆధారంగా విశ్లేషణ విజయవంతంగా నవీకరించబడింది!",
    markSymptomsTitle: "మీ లక్షణాలను గుర్తించండి / ఎంచుకోండి",
    markSymptomsDesc: "వైద్య మూల్యాంకనం కోసం క్రింది లక్షణాలను ఎంచుకోండి లేదా తొలగించండి:"
  }
};
