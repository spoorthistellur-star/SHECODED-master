import React from 'react';
import { History, Calendar, FileText, Trash2, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { SavedSymptomLog, UserProfile, AssessmentResult } from '../types';
import { StorageService } from '../services/storageService';

interface SavedLogsTabProps {
  user: UserProfile | null;
  onOpenAuth: () => void;
  onLoadLog: (assessment: AssessmentResult, rawInput: string) => void;
  logs: SavedSymptomLog[];
  onRefreshLogs: () => void;
}

export const SavedLogsTab: React.FC<SavedLogsTabProps> = ({
  user,
  onOpenAuth,
  onLoadLog,
  logs,
  onRefreshLogs
}) => {
  const handleDeleteLog = (logId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this symptom assessment log?')) {
      StorageService.deleteLog(logId);
      onRefreshLogs();
    }
  };

  const urgencyBadge = (urgency: SavedSymptomLog['urgencyLevel']) => {
    switch (urgency) {
      case 'urgent':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'soon':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-rose-50 text-rose-600">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {user ? `${user.name}'s Saved Symptom Records` : 'Your Saved Health Logs'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review how your symptoms, cycle patterns, and clinical indicators evolve over time
            </p>
          </div>
        </div>

        {!user ? (
          <button
            onClick={onOpenAuth}
            className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all"
          >
            Sign In to Store Logs
          </button>
        ) : (
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-slate-700">
            Total Records: {logs.length}
          </span>
        )}
      </div>

      {/* Logs List */}
      <div className="space-y-3.5">
        {logs.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center text-slate-400">
            <Heart className="w-10 h-10 text-rose-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-700">No Assessment Records Saved Yet</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              When you share your symptoms on the &ldquo;Share Symptoms&rdquo; tab, they are automatically saved to your profile for your doctor visits.
            </p>
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              onClick={() => onLoadLog(log.assessment, log.rawInput)}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{new Date(log.timestamp).toLocaleDateString()} at {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </span>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${urgencyBadge(log.urgencyLevel)}`}>
                    Urgency: {log.urgencyLevel}
                  </span>

                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                    Rotterdam: {log.rotterdamCriteriaCount} of 3 criteria
                  </span>
                </div>

                <div className="text-xs text-slate-600 line-clamp-2 italic font-serif bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-2">
                  &ldquo;{log.rawInput}&rdquo;
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {log.symptomsSummary.slice(0, 5).map((s, idx) => (
                    <span key={idx} className="text-[11px] bg-rose-50 text-rose-800 border border-rose-100 px-2 py-0.5 rounded-md font-medium">
                      {s}
                    </span>
                  ))}
                  {log.symptomsSummary.length > 5 && (
                    <span className="text-[11px] text-slate-400 font-medium">
                      +{log.symptomsSummary.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={(e) => handleDeleteLog(log.id, e)}
                  className="p-2 rounded-xl text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete log"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>All historical logs are stored strictly on your local browser. Zero cloud tracking.</span>
        </div>
      </div>
    </div>
  );
};
