import React from 'react';
import { Heart, User, Volume2, CalendarClock, History, LogOut } from 'lucide-react';
import { SupportedLanguage, UserProfile } from '../types';
import { TRANSLATIONS } from '../services/translations';
import { SUPPORTED_LANGUAGES } from '../services/languageDetector';

interface NavbarProps {
  currentLang: SupportedLanguage;
  onSelectLang: (lang: SupportedLanguage) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onNavigateTab: (tab: 'input' | 'results' | 'actions' | 'logs' | 'education') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onSelectLang,
  isAudioPlaying,
  onToggleAudio,
  currentUser,
  onOpenAuth,
  onLogout,
  onNavigateTab
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-rose-100 shadow-sm no-print">
      {/* Top safety disclaimer bar */}
      <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 border-b border-rose-100 px-4 py-1.5 text-xs text-rose-800 text-center font-medium flex items-center justify-center gap-2">
        <span>{t.disclaimerBanner}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div
            onClick={() => onNavigateTab('input')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md shadow-rose-200 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  {t.appTitle}
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800 border border-rose-200">
                  PCOS Care
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Controls: Language Pills, Audio, User Account */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector pills */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              {SUPPORTED_LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => onSelectLang(lang.code)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                    currentLang === lang.code
                      ? 'bg-white text-rose-600 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                  title={lang.name}
                >
                  <span className="sm:hidden">{lang.code.toUpperCase()}</span>
                  <span className="hidden sm:inline">{lang.nativeName}</span>
                </button>
              ))}
            </div>

            {/* Audio Read-Aloud Toggle */}
            <button
              onClick={onToggleAudio}
              className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                isAudioPlaying
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title={isAudioPlaying ? t.audioStop : t.audioReadAloud}
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden xl:inline">{isAudioPlaying ? t.audioStop : t.audioReadAloud}</span>
            </button>

            {/* User Account Button */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 p-1 rounded-xl">
                <button
                  onClick={() => onNavigateTab('actions')}
                  className="px-2.5 py-1 text-xs font-bold text-rose-700 flex items-center gap-1.5 hover:text-rose-900"
                  title="View your Action Timeline"
                >
                  <User className="w-3.5 h-3.5 text-rose-600" />
                  <span className="max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
                </button>

                <button
                  onClick={onLogout}
                  className="p-1 rounded-lg text-rose-400 hover:text-rose-700 hover:bg-rose-100 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-600 text-white shadow-sm shadow-rose-200 hover:bg-rose-700 flex items-center gap-1.5 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In / Create Account</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
