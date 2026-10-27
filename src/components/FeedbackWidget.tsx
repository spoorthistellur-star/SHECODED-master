import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle2, MessageSquareHeart } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../services/translations';

interface FeedbackWidgetProps {
  currentLang: SupportedLanguage;
}

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({ currentLang }) => {
  const [feedbackState, setFeedbackState] = useState<'idle' | 'submitted'>('idle');
  const [rating, setRating] = useState<'helpful' | 'needs_improvement' | null>(null);
  const [comment, setComment] = useState('');
  const t = TRANSLATIONS[currentLang];

  const handleFeedback = (type: 'helpful' | 'needs_improvement') => {
    setRating(type);
    setFeedbackState('submitted');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm mb-6 text-center">
      <div className="max-w-md mx-auto">
        {feedbackState === 'idle' ? (
          <>
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-2.5">
              <MessageSquareHeart className="w-5 h-5" />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
              {t.feedbackQuestion}
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Your feedback helps us refine symptom comprehension and regional medical translations.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handleFeedback('helpful')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 bg-white hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-all text-slate-700"
              >
                <ThumbsUp className="w-4 h-4 text-emerald-600" />
                <span>{t.feedbackHelpful}</span>
              </button>

              <button
                type="button"
                onClick={() => handleFeedback('needs_improvement')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 transition-all text-slate-700"
              >
                <ThumbsDown className="w-4 h-4 text-rose-500" />
                <span>{t.feedbackNeedsImprovement}</span>
              </button>
            </div>
          </>
        ) : (
          <div className="py-2 animate-fade-in">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900">
              {t.feedbackThankYou}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Thank you for helping us make women&apos;s healthcare information clearer and more accessible.
            </p>

            {comment === '' && (
              <div className="mt-3 flex items-center justify-center gap-2">
                <input
                  type="text"
                  placeholder="Optional: Any notes on medical terms or translation?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 w-full max-w-xs outline-none focus:border-rose-400"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
