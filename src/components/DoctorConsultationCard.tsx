import React from 'react';
import { Stethoscope, Clock, FileText, FlaskConical, UserCheck, ChevronRight } from 'lucide-react';
import { CareGuidance, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../services/translations';

interface DoctorConsultationCardProps {
  careGuidance: CareGuidance;
  currentLang: SupportedLanguage;
  onOpenDoctorSummary: () => void;
}

export const DoctorConsultationCard: React.FC<DoctorConsultationCardProps> = ({
  careGuidance,
  currentLang,
  onOpenDoctorSummary
}) => {
  const t = TRANSLATIONS[currentLang];
  const { specialists, testsToAskAbout, urgencyLevel, urgencyText } = careGuidance;

  const urgencyBadge = (level: CareGuidance['urgencyLevel']) => {
    switch (level) {
      case 'urgent':
        return {
          bg: 'bg-red-500 text-white',
          label: 'Immediate / Urgent Attention',
          desc: 'Same-day emergency or hospital visit recommended.'
        };
      case 'soon':
        return {
          bg: 'bg-amber-500 text-white',
          label: 'Consult Soon (Within 2-3 Weeks)',
          desc: 'Prompt scheduling with a gynecologist is advised.'
        };
      default:
        return {
          bg: 'bg-emerald-500 text-white',
          label: 'Routine Consultation',
          desc: 'Schedule a visit at your convenience to discuss baseline cycle health.'
        };
    }
  };

  const badge = urgencyBadge(urgencyLevel);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6">
      {/* Header & Urgency Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {t.careGuidanceTitle}
            </h3>
            <p className="text-xs text-slate-500">
              Structured preparation for an empowering and informative doctor consultation
            </p>
          </div>
        </div>

        {/* Doctor Summary Slip button */}
        <button
          type="button"
          onClick={onOpenDoctorSummary}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md shadow-rose-200 hover:shadow-lg transition-all"
        >
          <FileText className="w-4 h-4" />
          <span>{t.tabDoctorCard} (Print / PDF)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Urgency Alert Bar */}
      <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
        <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700">
          <Clock className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${badge.bg}`}>
              {badge.label}
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-800 mt-1">
            {urgencyText}
          </p>
        </div>
      </div>

      {/* Recommended Specialists */}
      <div className="mt-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <UserCheck className="w-4 h-4 text-indigo-500" />
          <span>{t.specialistTitle}</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {specialists.map((s, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-indigo-50/40 border border-indigo-100 flex flex-col justify-between">
              <div>
                <div className="text-sm font-bold text-indigo-950 mb-1">{s.role}</div>
                <div className="text-xs text-slate-600 leading-relaxed">{s.why}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Lab Tests to Discuss */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <FlaskConical className="w-4 h-4 text-rose-500" />
          <span>{t.testsTitle}</span>
        </h4>
        <div className="space-y-2.5">
          {testsToAskAbout.map((test, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-100/60 transition-colors"
            >
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  {test.testName}
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  {test.purpose}
                </div>
              </div>

              {test.idealTiming && (
                <span className="text-[11px] font-medium text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-lg sm:text-right whitespace-nowrap">
                  🕒 {test.idealTiming}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
