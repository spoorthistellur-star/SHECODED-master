import { SupportedLanguage } from '../types';

const SPEECH_LANG_CODES: Record<SupportedLanguage, string[]> = {
  en: ['en-IN', 'en-US', 'en-GB', 'en'],
  kn: ['kn-IN', 'kn'],
  hi: ['hi-IN', 'hi'],
  ta: ['ta-IN', 'ta'],
  te: ['te-IN', 'te']
};

export class SpeechRecognitionService {
  private recognition: any = null;
  public isSupported: boolean = false;

  constructor() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.isSupported = true;
    }
  }

  public startListening(
    lang: SupportedLanguage,
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (error: string) => void,
    onEnd: () => void
  ) {
    if (!this.recognition) {
      onError('Speech recognition not supported in this browser.');
      return;
    }

    this.recognition.lang = SPEECH_LANG_CODES[lang][0] || 'en-IN';

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      onResult(finalTranscript || interimTranscript, !!finalTranscript);
    };

    this.recognition.onerror = (event: any) => {
      onError(event.error || 'An error occurred during speech recognition.');
    };

    this.recognition.onend = () => {
      onEnd();
    };

    try {
      this.recognition.start();
    } catch (e: any) {
      console.warn('Recognition already started or error:', e);
    }
  }

  public stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
  }
}

export class SpeechSynthesisService {
  private static cachedVoices: SpeechSynthesisVoice[] = [];

  public static isSupported(): boolean {
    return 'speechSynthesis' in window;
  }

  // Pre-load voices if supported
  public static init() {
    if (!this.isSupported()) return;
    this.cachedVoices = window.speechSynthesis.getVoices();
    if ('onvoiceschanged' in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.cachedVoices = window.speechSynthesis.getVoices();
      };
    }
  }

  // Find the most suitable voice for the requested language
  public static findBestVoice(lang: SupportedLanguage): SpeechSynthesisVoice | undefined {
    if (!this.isSupported()) return undefined;
    const voices = this.cachedVoices.length > 0 ? this.cachedVoices : window.speechSynthesis.getVoices();
    const codes = SPEECH_LANG_CODES[lang] || ['en-IN'];
    const langNames: Record<SupportedLanguage, string> = {
      te: 'telugu',
      kn: 'kannada',
      hi: 'hindi',
      ta: 'tamil',
      en: 'india'
    };
    const targetName = langNames[lang];

    // 1. Try exact or prefix match on lang code
    let matched = voices.find(v => codes.some(c => v.lang.toLowerCase() === c.toLowerCase()));
    if (matched) return matched;

    // 2. Try partial code match (e.g. starts with 'te', 'kn', 'hi', 'ta')
    const primaryTag = codes[0].split('-')[0].toLowerCase();
    matched = voices.find(v => v.lang.toLowerCase().startsWith(primaryTag));
    if (matched) return matched;

    // 3. Try voice name search
    matched = voices.find(v => v.name.toLowerCase().includes(targetName));
    if (matched) return matched;

    // 4. Fallback to any Indian accent voice or default
    matched = voices.find(v => v.lang.toLowerCase().includes('in'));
    return matched || voices[0];
  }

  public static speak(
    text: string,
    lang: SupportedLanguage,
    onEnd?: () => void
  ) {
    if (!this.isSupported()) return;

    window.speechSynthesis.cancel(); // Stop any ongoing speech

    // Clean text: strip markdown characters for natural voice read-aloud
    const cleanText = text
      .replace(/[*_#`~[\]]/g, '')
      .replace(/Notice:\s*/gi, '')
      .replace(/ಗಮನಿಸಿ:\s*/gi, '')
      .replace(/గమనిక:\s*/gi, '')
      .replace(/सूचना:\s*/gi, '')
      .replace(/குறிப்பு:\s*/gi, '')
      .trim();

    if (!cleanText) return;

    // Split text into paragraphs or sentences to prevent browser 15-second speech truncation
    const chunks = cleanText
      .split(/(?<=[.!?\n])\s+/)
      .filter(c => c.trim().length > 0);

    if (chunks.length === 0) return;

    const voice = this.findBestVoice(lang);
    const targetLangCode = SPEECH_LANG_CODES[lang][0] || 'en-IN';

    let currentChunkIdx = 0;

    const speakNextChunk = () => {
      if (currentChunkIdx >= chunks.length) {
        if (onEnd) onEnd();
        return;
      }

      const chunkText = chunks[currentChunkIdx];
      currentChunkIdx++;

      const utterance = new SpeechSynthesisUtterance(chunkText);
      utterance.lang = targetLangCode;
      utterance.rate = 0.95; // Gentle, clear speed for health comprehension
      utterance.pitch = 1.0;

      if (voice) {
        utterance.voice = voice;
      }

      utterance.onend = () => {
        speakNextChunk();
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis chunk error:', e);
        speakNextChunk();
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNextChunk();
  }

  public static stop() {
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
    }
  }

  public static isSpeaking(): boolean {
    if (!this.isSupported()) return false;
    return window.speechSynthesis.speaking;
  }
}

// Initialize voices listener immediately
SpeechSynthesisService.init();
