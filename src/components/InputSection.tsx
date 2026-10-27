import React, { useState } from 'react';
import { Send, RotateCcw, Sparkles, MessageSquare } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { VoiceInput } from './VoiceInput';
import { TRANSLATIONS } from '../services/translations';
import { detectLanguage } from '../services/languageDetector';

interface InputSectionProps {
  currentLang: SupportedLanguage;
  onLanguageDetected: (lang: SupportedLanguage) => void;
  onSubmitSymptoms: (text: string) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({
  currentLang,
  onLanguageDetected,
  onSubmitSymptoms,
  isLoading
}) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const sampleInputs = [
    {
      label: 'Kanglish (PCOS signs)',
      lang: 'kn' as SupportedLanguage,
      text: 'Periods late aagide for 4 months, dates sari aagi barthilla. Mukhadalli pimples and chin meeda hair barthide, weight jasti aagthide.'
    },
    {
      label: 'Hinglish (PCOS signs)',
      lang: 'hi' as SupportedLanguage,
      text: 'Mahina time pe nahi aa raha, 3 mahine chadh gaye. Face pe baal aur pimples aa gaye hain, pet me charbi badh rahi hai.'
    },
    {
      label: 'Kannada (ಕನ್ನಡ)',
      lang: 'kn' as SupportedLanguage,
      text: 'ನನ್ನ ಮುಟ್ಟು ಸರಿಯಾಗಿ ಆಗುತ್ತಿಲ್ಲ, 3 ತಿಂಗಳಿಂದ ಬಂದಿಲ್ಲ. ಮುಖದ ಮೇಲೆ ಮೊಡವೆ ಮತ್ತು ಕೂದಲು ಹೆಚ್ಚಾಗಿದೆ, ತೂಕ ಏರಿದೆ.'
    },
    {
      label: 'Hindi (हिन्दी)',
      lang: 'hi' as SupportedLanguage,
      text: 'पिछले 4 महीने से पीरियड्स अनियमित हैं। चेहरे पर अनचाहे बाल, मुंहासे और पेट के आसपास वजन बढ़ रहा है।'
    },
    {
      label: 'Tanglish / Tamil',
      lang: 'ta' as SupportedLanguage,
      text: 'Periods sariya varala, 3 months aachu. Face la mudi valaruthu, chin la pimples and udambu edai athigam aachu.'
    },
    {
      label: 'Telugu (తెలుగు)',
      lang: 'te' as SupportedLanguage,
      text: 'పీరియడ్స్ సమయానికి రావడం లేదు, 4 నెలలుగా చాలా ఆలస్యం అవుతోంది. ముఖంపై వెంట్రుకలు, మొటిమలు మరియు పొట్ట వద్ద బరువు పెరుగుతోంది.'
    },
    {
      label: 'Red Flag Test (Emergency)',
      lang: 'en' as SupportedLanguage,
      text: 'Severe unbearable lower abdominal pain with heavy bleeding soaking a pad in 45 minutes and feeling very dizzy.'
    }
  ];

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);

    // Auto-detect language if more than 10 chars
    if (val.length > 8) {
      const detected = detectLanguage(val);
      if (detected.language !== currentLang) {
        onLanguageDetected(detected.language);
      }
    }
  };

  const handleVoiceTranscript = (transcript: string) => {
    const combined = inputText ? `${inputText} ${transcript}` : transcript;
    setInputText(combined);

    const detected = detectLanguage(combined);
    if (detected.language !== currentLang) {
      onLanguageDetected(detected.language);
    }
  };

  const handleClear = () => {
    setInputText('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSubmitSymptoms(inputText.trim());
  };

  const applySample = (sample: typeof sampleInputs[0]) => {
    setInputText(sample.text);
    onLanguageDetected(sample.lang);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xl shadow-rose-50/50">
      <div className="mb-4">
        <div className="flex items-center gap-2 text-rose-600 font-semibold text-xs tracking-wider uppercase mb-1">
          <MessageSquare className="w-4 h-4" />
          <span>{t.tabInput}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          {t.inputPromptTitle}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          {t.inputPromptDesc}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="relative">
          <textarea
            value={inputText}
            onChange={handleTextChange}
            placeholder={t.inputPlaceholder}
            rows={5}
            className="w-full p-4 sm:p-5 rounded-2xl border-2 border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none transition-all text-slate-800 placeholder-slate-400 text-sm sm:text-base resize-none leading-relaxed"
          />

          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            {inputText && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs px-2.5 py-1 text-slate-400 hover:text-slate-600 font-medium transition-colors"
              >
                {t.clearButton}
              </button>
            )}
            <span className="text-[11px] text-slate-400 font-mono px-2 py-0.5 bg-slate-50 rounded">
              {inputText.length} chars
            </span>
          </div>
        </div>

        {/* Input Bar actions: Speech recognition & Submit */}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <VoiceInput
            currentLang={currentLang}
            onTranscriptReceived={handleVoiceTranscript}
            isListening={isListening}
            setIsListening={setIsListening}
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm sm:text-base text-white shadow-md transition-all ${
              !inputText.trim() || isLoading
                ? 'bg-slate-300 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 active:scale-98'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t.analyzingButton}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t.analyzeButton}</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Quick sample chips */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2.5">
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>{t.samplePhrasesLabel}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sampleInputs.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applySample(sample)}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-300 transition-all text-left font-medium"
            >
              <span className="font-semibold text-rose-500 mr-1.5">{sample.label}:</span>
              <span className="text-slate-500 truncate inline-block max-w-[200px] align-bottom">
                {sample.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
