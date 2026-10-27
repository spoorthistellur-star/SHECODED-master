import React from 'react';
import { BookOpen, Volume2, Shield, CheckCircle, CircleDot } from 'lucide-react';
import { AssessmentResult, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../services/translations';
import { ROTTERDAM_GUIDELINES_SUMMARY } from '../services/knowledgeBase';

interface ExplanationCardProps {
  assessment: AssessmentResult;
  currentLang: SupportedLanguage;
  onPlayAudio: (text: string) => void;
  isAudioPlaying: boolean;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({
  assessment,
  currentLang,
  onPlayAudio,
  isAudioPlaying
}) => {
  const t = TRANSLATIONS[currentLang];
  const { rotterdamCriteriaMatch, plainLanguageExplanation, educationalNotes } = assessment;

  const features = [
    {
      name: 'Ovulatory Dysfunction (Delayed or Missed Periods)',
      isMet: rotterdamCriteriaMatch.ovulatoryDysfunction,
      description: 'Cycles taking longer than 35 days or irregular gaps between periods.'
    },
    {
      name: 'Hyperandrogenism (Signs of Elevated Androgen Hormones)',
      isMet: rotterdamCriteriaMatch.hyperandrogenism,
      description: 'Persistent facial/chin hair, hormonal cystic acne, or scalp hair loss.'
    },
    {
      name: 'Polycystic Ovarian Morphology (Ultrasound Finding)',
      isMet: rotterdamCriteriaMatch.polycysticMorphologySigns,
      description: 'Multiple immature follicles (sometimes called cysts) visible on an ultrasound scan.'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6">
      {/* Header with audio read-aloud button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-600">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {t.explanationTitle}
            </h3>
            <p className="text-xs text-slate-500">
              Written at Grade 6-8 reading level for clear understanding
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onPlayAudio(plainLanguageExplanation)}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
            isAudioPlaying
              ? 'bg-rose-600 text-white border-rose-600'
              : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>{isAudioPlaying ? t.audioStop : t.audioReadAloud}</span>
        </button>
      </div>

      {/* Main explanation content */}
      <div className="prose prose-rose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
        {plainLanguageExplanation.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Rotterdam Criteria Visual Meter */}
      <div className="mt-7 pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-purple-600" />
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
              {t.rotterdamCriteriaTitle}
            </h4>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
            {rotterdamCriteriaMatch.criteriaMetCount} of 3 features indicated
          </span>
        </div>

        <p className="text-xs text-slate-500 mb-4">
          {t.rotterdamExplanation}
        </p>

        <div className="space-y-2.5">
          {features.map((f, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                f.isMet
                  ? 'bg-purple-50/70 border-purple-200 text-purple-950'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className="mt-0.5">
                {f.isMet ? (
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                ) : (
                  <CircleDot className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="text-sm font-semibold text-slate-900">{f.name}</h5>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    f.isMet ? 'bg-purple-200 text-purple-900' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {f.isMet ? 'Indicated in Your Input' : 'Not Detected in Input'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-normal">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-slate-500 mt-3 italic">
          {ROTTERDAM_GUIDELINES_SUMMARY.icmrFogsiNote}
        </p>
      </div>

      {/* Educational Pearls */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Key Takeaways:
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {educationalNotes.map((note, idx) => {
            const [heading, body] = note.split(': ');
            return (
              <div key={idx} className="p-3.5 rounded-2xl bg-rose-50/40 border border-rose-100">
                <div className="text-xs font-bold text-rose-700 mb-1">{heading}</div>
                <div className="text-xs text-slate-600 leading-relaxed">{body}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
