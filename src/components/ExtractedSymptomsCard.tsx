import React, { useState } from 'react';
import { CheckCircle2, Tag, AlertCircle, PlusCircle, CheckSquare, Square, RefreshCw, Sparkles } from 'lucide-react';
import { ExtractedSymptom, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../services/translations';
import { SYMPTOM_DEFINITIONS } from '../services/symptomExtractor';

interface ExtractedSymptomsCardProps {
  symptoms: ExtractedSymptom[];
  currentLang: SupportedLanguage;
  selectedSymptomIds: string[];
  onToggleSymptom: (symptomId: string) => void;
  onSubmitReanalyze: () => void;
  isUpdating: boolean;
}

export const ExtractedSymptomsCard: React.FC<ExtractedSymptomsCardProps> = ({
  symptoms,
  currentLang,
  selectedSymptomIds,
  onToggleSymptom,
  onSubmitReanalyze,
  isUpdating
}) => {
  const [showChecklist, setShowChecklist] = useState(true);
  const t = TRANSLATIONS[currentLang];

  const categoryColor = (cat: ExtractedSymptom['category']) => {
    switch (cat) {
      case 'menstrual':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'hyperandrogenism':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'metabolic':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'fertility':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const severityBadge = (sev: ExtractedSymptom['severity']) => {
    switch (sev) {
      case 'severe':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'mild':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm">
            {selectedSymptomIds.length}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {t.symptomsDetectedTitle} ({selectedSymptomIds.length} Marked)
            </h3>
            <p className="text-xs text-slate-500">
              Select or unselect any symptoms below to update your clinical evaluation
            </p>
          </div>
        </div>

        {/* Toggle checklist & Re-analyze button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowChecklist(!showChecklist)}
            className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 flex items-center gap-1.5 transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5 text-rose-500" />
            <span>{showChecklist ? 'Hide Checklist' : 'Mark More Symptoms'}</span>
          </button>

          <button
            type="button"
            onClick={onSubmitReanalyze}
            disabled={isUpdating}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-md shadow-rose-200 active:scale-98 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
            <span>{isUpdating ? t.submittingAnswersBtn : t.submitAnswersBtn}</span>
          </button>
        </div>
      </div>

      {/* Interactive Symptom Marking Checklist */}
      {showChecklist && (
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-rose-50/40 border border-rose-100">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>{t.markSymptomsTitle}</span>
            </h4>
            <span className="text-[11px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
              Tap to check/uncheck
            </span>
          </div>
          <p className="text-xs text-slate-600 mb-3.5">
            {t.markSymptomsDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {SYMPTOM_DEFINITIONS.map(def => {
              const isChecked = selectedSymptomIds.includes(def.id);
              return (
                <button
                  key={def.id}
                  type="button"
                  onClick={() => onToggleSymptom(def.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                    isChecked
                      ? 'bg-white border-rose-400 shadow-sm ring-1 ring-rose-200'
                      : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-600'
                  }`}
                >
                  <div className="mt-0.5">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-rose-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-semibold ${isChecked ? 'text-slate-900' : 'text-slate-700'}`}>
                      {def.name}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      {def.category} • SNOMED: {def.snomedCode}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Submit Bar right under checklist */}
          <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Marked: <strong className="text-rose-600">{selectedSymptomIds.length} symptoms</strong>
            </span>

            <button
              type="button"
              onClick={onSubmitReanalyze}
              disabled={isUpdating}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-200 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
              <span>{isUpdating ? t.submittingAnswersBtn : 'Submit Marked Symptoms & Re-Analyze'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Structured Symptoms Cards */}
      {symptoms.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center text-slate-500">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-medium">{t.noSymptomsFound}</p>
          <p className="text-xs text-slate-400 mt-1">
            Use the checklist above to check any symptoms you are experiencing and click Submit!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {symptoms.map((symptom) => (
            <div
              key={symptom.id}
              className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-rose-200 hover:bg-rose-50/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${categoryColor(symptom.category)} uppercase tracking-wider`}>
                    {symptom.category}
                  </span>

                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${severityBadge(symptom.severity)} capitalize`}>
                    {t.severityLabel}: {symptom.severity}
                  </span>
                </div>

                <h4 className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{symptom.name}</span>
                </h4>

                <div className="text-xs text-slate-500 mt-1 italic">
                  Reported as: &ldquo;{symptom.originalTerm}&rdquo;
                </div>

                <p className="text-xs text-slate-600 mt-2 font-normal leading-relaxed">
                  {symptom.clinicalSignificance}
                </p>
              </div>

              {symptom.snomedCode && (
                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>SNOMED:</span>
                  </span>
                  <span className="font-mono text-slate-600 font-semibold">{symptom.snomedCode}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
