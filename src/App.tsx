import React, { useState, useEffect } from 'react';
import {
  SupportedLanguage,
  AssessmentResult,
  UserProfile,
  SavedSymptomLog
} from './types';
import { Navbar } from './components/Navbar';
import { InputSection } from './components/InputSection';
import { RedFlagAlert } from './components/RedFlagAlert';
import { ExtractedSymptomsCard } from './components/ExtractedSymptomsCard';
import { FollowUpQuestions } from './components/FollowUpQuestions';
import { ExplanationCard } from './components/ExplanationCard';
import { DifferentialConditions } from './components/DifferentialConditions';
import { DoctorConsultationCard } from './components/DoctorConsultationCard';
import { DoctorSummaryModal } from './components/DoctorSummaryModal';
import { EducationalSnippets } from './components/EducationalSnippets';
import { FeedbackWidget } from './components/FeedbackWidget';
import { AuthModal } from './components/AuthModal';
import { ActionTimelineTab } from './components/ActionTimelineTab';
import { SavedLogsTab } from './components/SavedLogsTab';
import { evaluateSymptoms } from './services/evaluator';
import { SpeechSynthesisService } from './services/speechService';
import { StorageService } from './services/storageService';
import { TRANSLATIONS } from './services/translations';
import { Heart, ShieldCheck, Sparkles, CheckCircle2, CalendarClock, History } from 'lucide-react';

export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => StorageService.getActiveUser());
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => currentUser?.preferredLanguage || 'en');
  const [rawInput, setRawInput] = useState<string>('');
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [selectedSymptomIds, setSelectedSymptomIds] = useState<string[]>([]);
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'input' | 'results' | 'actions' | 'logs' | 'education'>('input');
  const [userLogs, setUserLogs] = useState<SavedSymptomLog[]>(() => {
    return currentUser ? StorageService.getUserLogs(currentUser.id) : [];
  });

  const t = TRANSLATIONS[currentLang];

  // Stop audio on unmount or language change
  useEffect(() => {
    return () => {
      SpeechSynthesisService.stop();
    };
  }, [currentLang]);

  const refreshLogs = () => {
    if (currentUser) {
      setUserLogs(StorageService.getUserLogs(currentUser.id));
    } else {
      setUserLogs([]);
    }
  };

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setCurrentLang(lang);
    SpeechSynthesisService.stop();
    setIsAudioPlaying(false);

    // If assessment already exists, refresh translations
    if (assessment) {
      const refreshed = evaluateSymptoms(rawInput, lang, followUpAnswers, selectedSymptomIds);
      setAssessment(refreshed);
    }
  };

  const handleUserAuthenticated = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.preferredLanguage) {
      setCurrentLang(user.preferredLanguage);
    }
    setUserLogs(StorageService.getUserLogs(user.id));
  };

  const handleLogout = () => {
    StorageService.logout();
    setCurrentUser(null);
    setUserLogs([]);
  };

  const handleSymptomSubmit = async (text: string) => {
    setIsLoading(true);
    setRawInput(text);
    SpeechSynthesisService.stop();
    setIsAudioPlaying(false);

    try {
      // Evaluate with clinical engine
      const result = evaluateSymptoms(text, currentLang, followUpAnswers);
      const extractedIds = result.extractedSymptoms.map(s => s.id);
      setSelectedSymptomIds(extractedIds);
      setAssessment(result);

      // Save log automatically for user
      const effectiveUserId = currentUser ? currentUser.id : 'guest';
      StorageService.saveSymptomLog(effectiveUserId, text, result);
      refreshLogs();

      setActiveTab('results');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle symptom from checklist on Page 2
  const handleToggleSymptom = (symptomId: string) => {
    setSelectedSymptomIds(prev => {
      const isAlreadySelected = prev.includes(symptomId);
      const next = isAlreadySelected
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId];

      const updatedAssessment = evaluateSymptoms(
        rawInput || 'User marked symptoms on checklist',
        currentLang,
        followUpAnswers,
        next
      );
      setAssessment(updatedAssessment);

      return next;
    });
  };

  // Select follow-up question answer
  const handleFollowUpAnswer = (questionId: string, optionId: string) => {
    const updatedAnswers = {
      ...followUpAnswers,
      [questionId]: optionId
    };
    setFollowUpAnswers(updatedAnswers);

    const reResult = evaluateSymptoms(
      rawInput || 'User marked symptoms and answered questions',
      currentLang,
      updatedAnswers,
      selectedSymptomIds
    );
    setAssessment(reResult);
  };

  // Explicit SUBMIT button handler on Page 2
  const handleReanalyze = () => {
    setIsUpdating(true);
    SpeechSynthesisService.stop();
    setIsAudioPlaying(false);

    setTimeout(() => {
      const updated = evaluateSymptoms(
        rawInput || 'User marked symptoms and answered follow-up questions',
        currentLang,
        followUpAnswers,
        selectedSymptomIds
      );
      setAssessment(updated);
      setIsUpdating(false);
      setShowSuccessBanner(true);

      // Save updated assessment in user logs
      const effectiveUserId = currentUser ? currentUser.id : 'guest';
      StorageService.saveSymptomLog(
        effectiveUserId,
        rawInput || 'Checklist & follow-up evaluation',
        updated
      );
      refreshLogs();

      setTimeout(() => {
        setShowSuccessBanner(false);
      }, 5000);
    }, 400);
  };

  // Allow clicking Tab 2 directly even without entering text
  const handleTabClick = (tab: 'input' | 'results' | 'actions' | 'logs' | 'education') => {
    if (tab === 'results' && !assessment) {
      const initial = evaluateSymptoms('', currentLang, followUpAnswers, selectedSymptomIds);
      setAssessment(initial);
    }
    setActiveTab(tab);
  };

  const handleLoadPastLog = (pastAssessment: AssessmentResult, pastInput: string) => {
    setAssessment(pastAssessment);
    setRawInput(pastInput);
    setSelectedSymptomIds(pastAssessment.extractedSymptoms.map(s => s.id));
    setActiveTab('results');
  };

  const handlePlayAudio = (text?: string) => {
    if (isAudioPlaying) {
      SpeechSynthesisService.stop();
      setIsAudioPlaying(false);
      return;
    }

    let textToSpeak = text || assessment?.plainLanguageExplanation;

    if (!textToSpeak) {
      // Welcome speech in the user's selected language
      switch (currentLang) {
        case 'te':
          textToSpeak = 'మహిళల ఆరోగ్య లక్షణాల గైడ్‌కి స్వాగతం. మీ పీరియడ్స్, చర్మం, జుట్టు లేదా బరువు మార్పుల గురించి ఇక్కడ మీ స్వంత భాషలో టైప్ చేయండి లేదా మాట్లాడండి.';
          break;
        case 'kn':
          textToSpeak = 'ಮಹಿಳೆಯರ ಆರೋಗ್ಯ ಲಕ್ಷಣ ಮಾರ್ಗದರ್ಶಿಗೆ ಸುಸ್ವಾಗತ. ನಿಮ್ಮ ಮುಟ್ಟು, ಕೂದಲು, ಮೊಡವೆ ಅಥವಾ ತೂಕ ಬದಲಾವಣೆಗಳ ಬಗ್ಗೆ ನಿಮ್ಮ ಸ್ವಂತ ಭಾಷೆಯಲ್ಲಿ ಇಲ್ಲಿ ತಿಳಿಸಿ.';
          break;
        case 'hi':
          textToSpeak = 'महिला स्वास्थ्य लक्षण गाइड में आपका स्वागत है। अपने मासिक धर्म, त्वचा, बाल या वजन में आए बदलावों के बारे में अपनी भाषा में यहां लिखें या बोलें।';
          break;
        case 'ta':
          textToSpeak = 'பெண்கள் சுகாதார அறிகுறி வழிகாட்டிக்கு நல்வரவு. உங்கள் மாதவிடாய், முகப்பரு, முடி அல்லது எடை மாற்றங்கள் குறித்து உங்கள் தாய்மொழியில் பகிரவும்.';
          break;
        default:
          textToSpeak = "Welcome to the Women's Health Symptom Guide. Describe your menstrual, skin, hair, or weight changes in your own words to receive safe care guidance.";
          break;
      }
    }

    setIsAudioPlaying(true);
    SpeechSynthesisService.speak(textToSpeak, currentLang, () => {
      setIsAudioPlaying(false);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentLang={currentLang}
        onSelectLang={handleLanguageChange}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={() => handlePlayAudio()}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onNavigateTab={handleTabClick}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 no-print">
          <button
            onClick={() => handleTabClick('input')}
            className={`px-3.5 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'input'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {t.tabInput}
          </button>

          <button
            onClick={() => handleTabClick('results')}
            className={`px-3.5 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'results'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {t.tabResults}
          </button>

          <button
            onClick={() => handleTabClick('actions')}
            className={`px-3.5 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'actions'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <CalendarClock className="w-3.5 h-3.5" />
            <span>Care Action Plan</span>
          </button>

          <button
            onClick={() => handleTabClick('logs')}
            className={`px-3.5 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'logs'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Saved Logs ({userLogs.length})</span>
          </button>

          <button
            onClick={() => handleTabClick('education')}
            className={`px-3.5 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'education'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {t.tabLearn}
          </button>
        </div>

        {/* View 1: Input Section */}
        {activeTab === 'input' && (
          <div className="space-y-6 animate-fade-in">
            <InputSection
              currentLang={currentLang}
              onLanguageDetected={handleLanguageChange}
              onSubmitSymptoms={handleSymptomSubmit}
              isLoading={isLoading}
            />

            {/* Quick Teaser for Action Plan */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-rose-50 text-rose-600">
                  <CalendarClock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    What should you do tomorrow vs. next month?
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    We organize your next clinical appointments, fasting blood tests, and daily nutrition into an actionable timeline.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('actions')}
                className="whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors"
              >
                View Action Plan →
              </button>
            </div>
          </div>
        )}

        {/* View 2: Analysis & Results */}
        {activeTab === 'results' && assessment && (
          <div className="space-y-6 animate-fade-in">
            {/* Global Success Notification when user submits/updates */}
            {showSuccessBanner && (
              <div className="p-4 rounded-2xl bg-emerald-500 text-white shadow-lg flex items-center justify-between gap-3 animate-bounce-subtle">
                <div className="flex items-center gap-2.5 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>{t.answersUpdatedSuccess} (Saved to your profile)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSuccessBanner(false)}
                  className="text-xs font-semibold underline text-emerald-100 hover:text-white"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* 1. Red Flag Alert (Priority 1) */}
            <RedFlagAlert alert={assessment.redFlags} />

            {/* 2. Structured Symptoms Extracted with interactive checklist and SUBMIT button */}
            <ExtractedSymptomsCard
              symptoms={assessment.extractedSymptoms}
              currentLang={currentLang}
              selectedSymptomIds={selectedSymptomIds}
              onToggleSymptom={handleToggleSymptom}
              onSubmitReanalyze={handleReanalyze}
              isUpdating={isUpdating}
            />

            {/* 3. Follow-up Questions with prominent SUBMIT button */}
            <FollowUpQuestions
              currentLang={currentLang}
              answers={followUpAnswers}
              onAnswerSelected={handleFollowUpAnswer}
              onSubmitReanalyze={handleReanalyze}
              isUpdating={isUpdating}
              showSuccessBanner={showSuccessBanner}
            />

            {/* 4. Plain-Language Explanation & Rotterdam Criteria */}
            <ExplanationCard
              assessment={assessment}
              currentLang={currentLang}
              onPlayAudio={handlePlayAudio}
              isAudioPlaying={isAudioPlaying}
            />

            {/* 5. Differential Conditions Overlap */}
            <DifferentialConditions
              conditions={assessment.differentialConditions}
              currentLang={currentLang}
            />

            {/* 6. Doctor Consultation Care Guidance */}
            <DoctorConsultationCard
              careGuidance={assessment.careGuidance}
              currentLang={currentLang}
              onOpenDoctorSummary={() => setIsDoctorModalOpen(true)}
            />

            {/* 7. Feedback Widget */}
            <FeedbackWidget currentLang={currentLang} />
          </div>
        )}

        {/* View 3: Care Action Plan Timeline ("Tomorrow what you have to do, Next month what you have to do") */}
        {activeTab === 'actions' && (
          <ActionTimelineTab
            user={currentUser}
            currentLang={currentLang}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {/* View 4: Saved Symptom Logs */}
        {activeTab === 'logs' && (
          <SavedLogsTab
            user={currentUser}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onLoadLog={handleLoadPastLog}
            logs={userLogs}
            onRefreshLogs={refreshLogs}
          />
        )}

        {/* View 5: Educational Modules */}
        {activeTab === 'education' && (
          <div className="animate-fade-in">
            <EducationalSnippets currentLang={currentLang} />
          </div>
        )}
      </main>

      {/* Doctor Consultation Printable Summary Modal */}
      {assessment && (
        <DoctorSummaryModal
          isOpen={isDoctorModalOpen}
          onClose={() => setIsDoctorModalOpen(false)}
          assessment={assessment}
          rawInput={rawInput || 'User marked symptoms on analysis page'}
          currentLang={currentLang}
        />
      )}

      {/* User Login & Register Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onUserAuthenticated={handleUserAuthenticated}
        currentLang={currentLang}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 no-print">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-3">
          <div className="flex items-center justify-center gap-2 font-semibold text-slate-700">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>SheDecoded</span>
            <span className="text-slate-400 font-normal">• Making Women&apos;s Health Easier to Understand.</span>
          </div>

          <p className="max-w-2xl mx-auto leading-relaxed text-slate-500">
            {t.privacyGuarantee} Designed for Indian regional languages (Kannada, Hindi, Tamil, Telugu, and English) to empower informed conversations with healthcare professionals.
          </p>

          <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Rotterdam 2003/2023 Guidelines Aligned • Non-Diagnostic Health Education</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
