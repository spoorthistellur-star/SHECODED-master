import React from 'react';
import { HelpCircle, Check, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { FOLLOW_UP_QUESTIONS_CATALOG } from '../services/evaluator';
import { TRANSLATIONS } from '../services/translations';

interface FollowUpQuestionsProps {
  currentLang: SupportedLanguage;
  answers: Record<string, string>;
  onAnswerSelected: (questionId: string, optionId: string) => void;
  onSubmitReanalyze: () => void;
  isUpdating: boolean;
  showSuccessBanner?: boolean;
}

export const FollowUpQuestions: React.FC<FollowUpQuestionsProps> = ({
  currentLang,
  answers,
  onAnswerSelected,
  onSubmitReanalyze,
  isUpdating,
  showSuccessBanner = false
}) => {
  const t = TRANSLATIONS[currentLang];
  const answeredCount = Object.keys(answers).length;
  const totalCount = FOLLOW_UP_QUESTIONS_CATALOG.length;

  return (
    <div className="bg-gradient-to-br from-rose-50/60 to-pink-50/40 rounded-3xl p-6 sm:p-7 border border-rose-200/80 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-rose-200/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-rose-500 text-white">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {t.followUpTitle}
            </h3>
            <p className="text-xs text-slate-600">
              {t.followUpSubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-rose-200 text-rose-700">
            {answeredCount} of {totalCount} Answered
          </span>
        </div>
      </div>

      {showSuccessBanner && (
        <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{t.answersUpdatedSuccess}</span>
        </div>
      )}

      <div className="space-y-4">
        {FOLLOW_UP_QUESTIONS_CATALOG.map((q, idx) => {
          const selectedOptionId = answers[q.id];
          const questionText = q.translatedQuestion[currentLang] || q.question;

          return (
            <div key={q.id} className="bg-white/90 p-4 sm:p-5 rounded-2xl border border-rose-100 shadow-sm transition-all hover:border-rose-200">
              <div className="flex items-start gap-2.5 mb-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <h4 className="text-sm font-semibold text-slate-800 leading-snug">
                  {questionText}
                </h4>
              </div>

              {/* Tappable Options Chips */}
              <div className="flex flex-wrap gap-2 pl-7">
                {q.options.map(opt => {
                  const isSelected = selectedOptionId === opt.id;
                  const label = opt.translatedLabel[currentLang] || opt.label;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onAnswerSelected(q.id, opt.id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                        isSelected
                          ? 'bg-rose-600 text-white shadow-md shadow-rose-200 font-semibold ring-2 ring-rose-300 scale-102'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-rose-300 hover:bg-rose-50/40'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Prominent Submit & Re-Analyze Button */}
      <div className="mt-6 pt-4 border-t border-rose-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-500 text-center sm:text-left">
          Click below to re-calculate your Rotterdam criteria, explanations, and doctor notes with these answers:
        </p>

        <button
          type="button"
          onClick={onSubmitReanalyze}
          disabled={isUpdating}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 active:scale-98 transition-all"
        >
          {isUpdating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{t.submittingAnswersBtn}</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{t.submitAnswersBtn}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
