import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { SpeechRecognitionService } from '../services/speechService';
import { TRANSLATIONS } from '../services/translations';

interface VoiceInputProps {
  currentLang: SupportedLanguage;
  onTranscriptReceived: (text: string) => void;
  isListening: boolean;
  setIsListening: (val: boolean) => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  currentLang,
  onTranscriptReceived,
  isListening,
  setIsListening
}) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionService | null>(null);
  const t = TRANSLATIONS[currentLang];

  useEffect(() => {
    recognitionRef.current = new SpeechRecognitionService();
  }, []);

  const toggleListening = () => {
    setErrorMsg(null);
    if (!recognitionRef.current || !recognitionRef.current.isSupported) {
      setErrorMsg(t.voiceNotSupported);
      return;
    }

    if (isListening) {
      recognitionRef.current.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.startListening(
        currentLang,
        (transcript, _isFinal) => {
          onTranscriptReceived(transcript);
        },
        (err) => {
          setErrorMsg(err);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={toggleListening}
        className={`relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm ${
          isListening
            ? 'bg-rose-600 text-white shadow-rose-200 ring-4 ring-rose-200 animate-pulse'
            : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-50 hover:border-rose-300'
        }`}
        title={isListening ? t.voiceButtonStop : t.voiceButtonStart}
      >
        {isListening ? (
          <>
            <MicOff className="w-4 h-4 animate-bounce" />
            <span>{t.voiceButtonStop}</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 text-rose-500" />
            <span>{t.voiceButtonStart}</span>
          </>
        )}
      </button>

      {isListening && (
        <div className="mt-2 text-xs text-rose-600 font-medium flex items-center gap-1.5 animate-pulse">
          <span className="inline-block w-2 h-2 rounded-full bg-rose-500"></span>
          <span>{t.voiceListening} ({currentLang.toUpperCase()})</span>
        </div>
      )}

      {errorMsg && (
        <div className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
