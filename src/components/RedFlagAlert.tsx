import React from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert, HeartHandshake } from 'lucide-react';
import { RedFlagAlert as RedFlagAlertType } from '../types';

interface RedFlagAlertProps {
  alert: RedFlagAlertType;
}

export const RedFlagAlert: React.FC<RedFlagAlertProps> = ({ alert }) => {
  if (!alert.isTriggered) return null;

  const isMentalDistress = alert.category === 'mental_distress';

  return (
    <div className={`rounded-2xl border-2 p-5 sm:p-6 mb-6 shadow-lg transition-all animate-bounce-subtle ${
      isMentalDistress
        ? 'bg-amber-50/90 border-amber-300 text-amber-950 shadow-amber-100'
        : 'bg-rose-50/95 border-rose-400 text-rose-950 shadow-rose-100'
    }`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl flex-shrink-0 ${
          isMentalDistress ? 'bg-amber-200 text-amber-800' : 'bg-rose-200 text-rose-800'
        }`}>
          {isMentalDistress ? (
            <HeartHandshake className="w-7 h-7" />
          ) : (
            <ShieldAlert className="w-7 h-7 animate-pulse" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase ${
              isMentalDistress ? 'bg-amber-200 text-amber-900' : 'bg-rose-200 text-rose-900'
            }`}>
              {isMentalDistress ? 'Emotional Support Priority' : 'Urgent Safety Alert'}
            </span>
            <AlertTriangle className={`w-4 h-4 ${isMentalDistress ? 'text-amber-600' : 'text-rose-600'}`} />
          </div>

          <h3 className="text-lg sm:text-xl font-bold mt-1 text-slate-900">
            {alert.headline}
          </h3>

          <p className="text-sm mt-2 font-medium text-slate-700 leading-relaxed">
            {alert.reason}
          </p>

          <div className="mt-3 p-3.5 rounded-xl bg-white/80 border border-slate-200 text-sm font-semibold text-slate-900">
            ⚠️ Recommended Action: {alert.actionRequired}
          </div>

          {/* Emergency Helplines */}
          <div className="mt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Immediate Contact Numbers:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {alert.helplines.map((line, idx) => (
                <a
                  key={idx}
                  href={`tel:${line.number.split('/')[0].trim()}`}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200 hover:border-rose-400 hover:shadow-sm transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{line.name}</div>
                    <div className="text-sm font-extrabold text-rose-600">{line.number}</div>
                    <div className="text-[10px] text-slate-500">{line.description}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
