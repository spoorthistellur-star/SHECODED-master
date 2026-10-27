import React from 'react';
import { GitCompare, CheckCircle2, HelpCircle } from 'lucide-react';
import { ConditionOverlap, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../services/translations';

interface DifferentialConditionsProps {
  conditions: ConditionOverlap[];
  currentLang: SupportedLanguage;
}

export const DifferentialConditions: React.FC<DifferentialConditionsProps> = ({
  conditions,
  currentLang
}) => {
  const t = TRANSLATIONS[currentLang];

  const likelihoodBadge = (cat: ConditionOverlap['likelihoodCategory']) => {
    switch (cat) {
      case 'High alignment':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Moderate alignment':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 rounded-2xl bg-teal-50 text-teal-600">
          <GitCompare className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {t.differentialTitle}
          </h3>
          <p className="text-xs text-slate-500">
            Hormonal symptoms frequently overlap. Doctors run tests to differentiate these conditions:
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {conditions.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-bold text-sm sm:text-base text-slate-900">
                  {item.conditionName}
                </h4>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border whitespace-nowrap ${likelihoodBadge(item.likelihoodCategory)}`}>
                  {item.likelihoodCategory}
                </span>
              </div>

              <div className="mt-2.5">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Shared Symptoms:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.commonSymptoms.map((symp, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1 text-xs bg-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md"
                    >
                      <CheckCircle2 className="w-3 h-3 text-teal-600 flex-shrink-0" />
                      <span>{symp}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Distinguishing clue: </span>
                {item.keyDistinguishingFeatures}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] text-slate-500">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span>{item.whyConsidered}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
