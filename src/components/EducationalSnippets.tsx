import React, { useState } from 'react';
import { Lightbulb, Apple, Activity, Moon, Layers, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../services/translations';

interface EducationalSnippetsProps {
  currentLang: SupportedLanguage;
}

export const EducationalSnippets: React.FC<EducationalSnippetsProps> = ({ currentLang }) => {
  const [activeTab, setActiveTab] = useState<'biology' | 'insulin' | 'lifestyle' | 'indian_diet'>('biology');
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {t.tabLearn}: Demystifying Hormones & PCOS
          </h3>
          <p className="text-xs text-slate-500">
            Simple, science-backed explanations designed for everyday empowerment
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-100 pb-3">
        <button
          onClick={() => setActiveTab('biology')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'biology'
              ? 'bg-rose-50 text-rose-700 border border-rose-200 shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>How Ovaries Work</span>
        </button>

        <button
          onClick={() => setActiveTab('insulin')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'insulin'
              ? 'bg-rose-50 text-rose-700 border border-rose-200 shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>The Insulin & Androgen Link</span>
        </button>

        <button
          onClick={() => setActiveTab('lifestyle')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'lifestyle'
              ? 'bg-rose-50 text-rose-700 border border-rose-200 shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Movement & Sleep</span>
        </button>

        <button
          onClick={() => setActiveTab('indian_diet')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'indian_diet'
              ? 'bg-rose-50 text-rose-700 border border-rose-200 shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Apple className="w-4 h-4" />
          <span>Indian Dietary Tips</span>
        </button>
      </div>

      {/* Tab 1: How Ovaries Work */}
      {activeTab === 'biology' && (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed animate-fade-in">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1">What happens during a natural cycle?</h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Each month, several tiny fluid-filled sacs called <strong>follicles</strong> start maturing in the ovaries. Under the signal of Follicle-Stimulating Hormone (FSH), one dominant follicle grows, releases an egg (ovulation), and produces progesterone to regulate the menstrual lining.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100">
            <h4 className="font-bold text-rose-950 mb-1">What changes in PCOS?</h4>
            <p className="text-xs sm:text-sm text-slate-700">
              In PCOS, the hormonal signal to trigger ovulation gets paused. Rather than one egg fully maturing and releasing, multiple small follicles (2 to 9 mm) remain suspended in development. On an ultrasound scan, these look like a &ldquo;string of pearls&rdquo; or tiny water bubbles. Because ovulation does not occur regularly, your period gets delayed or missed.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: The Insulin & Androgen Link */}
      {activeTab === 'insulin' && (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed animate-fade-in">
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
            <h4 className="font-bold text-amber-950 mb-1">Why is insulin involved?</h4>
            <p className="text-xs sm:text-sm text-slate-700">
              Insulin is the hormone produced by your pancreas to move glucose from the bloodstream into your cells for energy. In over 70% of women with PCOS, the body cells become resistant to insulin. The pancreas compensates by producing higher levels of insulin (hyperinsulinemia).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1">How does high insulin cause skin and hair changes?</h4>
            <p className="text-xs sm:text-sm text-slate-600">
              High circulating insulin does two things:
              <br />
              1. It directly stimulates the ovaries to produce more <strong>androgens (testosterone)</strong>.
              <br />
              2. It lowers SHBG (Sex Hormone-Binding Globulin) in the liver, leaving more active free testosterone circulating in your blood.
              <br />
              This free androgen stimulates hair follicles on the chin and jawline, activates facial oil glands causing cystic acne, and can cause velvety dark skin on the neck (Acanthosis Nigricans).
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Movement & Sleep */}
      {activeTab === 'lifestyle' && (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200">
              <div className="flex items-center gap-2 font-bold text-emerald-950 mb-1.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Strength & Walking</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Muscles are the largest consumers of glucose in your body. Moderate resistance training (bodyweight squats, resistance bands, yoga, or lifting weights) pulls glucose into muscle cells independent of insulin, improving insulin sensitivity for up to 48 hours.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200">
              <div className="flex items-center gap-2 font-bold text-indigo-950 mb-1.5">
                <Moon className="w-4 h-4 text-indigo-600" />
                <span>Circadian Sleep Rhythm</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Irregular sleep or sleeping fewer than 6 hours elevates evening cortisol and ghrelin (hunger hormone), worsening insulin resistance the following day. Aim for 7–8 hours in a dark, cool room with a consistent bedtime.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Indian Dietary Tips */}
      {activeTab === 'indian_diet' && (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed animate-fade-in">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1">PCOS-Friendly Traditional Indian Foods</h4>
            <p className="text-xs text-slate-600 mb-3">
              You do not need exotic western ingredients to manage PCOS. Traditional regional Indian staples are exceptionally rich in fiber and micronutrients:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="font-semibold text-rose-700">Millets & Complex Carbs:</span> Ragi, Jowar, Bajra, Foxtail millet, and brown/red unpolished rice have a lower glycemic index than refined maida or white polished rice.
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="font-semibold text-rose-700">Protein Pairing:</span> Pair your roti or rice with double portions of dal, sambar, sprouted green moong, chana, or paneer to flatten post-meal insulin spikes.
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="font-semibold text-rose-700">Fenugreek (Methi) Seeds:</span> Soaked methi seeds contain 4-hydroxyisoleucine, which supports healthy insulin sensitivity.
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="font-semibold text-rose-700">Spearmint & Cinnamon:</span> A warm infusion of spearmint leaves or Ceylon cinnamon has gentle natural anti-androgenic and glycemic benefits.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
