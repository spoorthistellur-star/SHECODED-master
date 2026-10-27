import React, { useState } from 'react';
import { X, User, Mail, Calendar, Heart, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { SupportedLanguage, UserProfile } from '../types';
import { StorageService } from '../services/storageService';
import { SUPPORTED_LANGUAGES } from '../services/languageDetector';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAuthenticated: (user: UserProfile) => void;
  currentLang: SupportedLanguage;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onUserAuthenticated,
  currentLang
}) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState<number | ''>(24);
  const [cycleLength, setCycleLength] = useState<number>(35);
  const [prefLang, setPrefLang] = useState<SupportedLanguage>(currentLang);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please provide an email or username.');
      return;
    }

    if (isRegistering && !name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }

    const userName = name.trim() || email.split('@')[0];
    const user = StorageService.registerUser(
      userName,
      email.trim(),
      typeof age === 'number' ? age : undefined,
      prefLang,
      cycleLength
    );

    onUserAuthenticated(user);
    onClose();
  };

  const handleQuickDemo = () => {
    const demoUser = StorageService.registerUser(
      'Ananya Rao',
      'ananya@example.com',
      25,
      currentLang,
      38
    );
    onUserAuthenticated(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-rose-100 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-200">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">
                {isRegistering ? 'Create Your Health Account' : 'Welcome Back'}
              </h3>
              <p className="text-xs text-slate-500">
                Save symptom logs & track your health action plan
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher: Create Account vs Sign In */}
        <div className="flex bg-slate-100 p-1 rounded-2xl my-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setIsRegistering(true); setErrorMsg(''); }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              isRegistering ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => { setIsRegistering(false); setErrorMsg(''); }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              !isRegistering ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
        </div>

        {errorMsg && (
          <div className="mb-3 p-2.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-medium border border-rose-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegistering && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Your Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none text-sm font-medium"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="e.g. priya@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none text-sm font-medium"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {isRegistering && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    min="12"
                    max="65"
                    placeholder="24"
                    value={age}
                    onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : '')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Cycle Length (Days)
                  </label>
                  <input
                    type="number"
                    min="15"
                    max="180"
                    placeholder="35"
                    value={cycleLength}
                    onChange={(e) => setCycleLength(parseInt(e.target.value) || 30)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Preferred Language
                </label>
                <select
                  value={prefLang}
                  onChange={(e) => setPrefLang(e.target.value as SupportedLanguage)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none text-sm font-medium bg-white"
                >
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName} ({lang.name})
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-md shadow-rose-200 transition-all flex items-center justify-center gap-2"
            >
              <span>{isRegistering ? 'Create Account & Start' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Quick Demo button */}
        <div className="mt-4 pt-4 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={handleQuickDemo}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center justify-center gap-1.5 mx-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Use One-Click Demo Profile (Ananya, 25 yrs)</span>
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Private & confidential. Stored locally on your device.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
