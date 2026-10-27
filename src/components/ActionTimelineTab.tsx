import React, { useState } from 'react';
import {
  CalendarClock,
  CheckCircle2,
  Circle,
  PlusCircle,
  Sparkles,
  Stethoscope,
  Apple,
  Activity,
  ClipboardList,
  ChevronRight,
  Trash2
} from 'lucide-react';
import { CareActionItem, ActionTimeframe, UserProfile, SupportedLanguage } from '../types';
import { StorageService } from '../services/storageService';

interface ActionTimelineTabProps {
  user: UserProfile | null;
  currentLang: SupportedLanguage;
  onOpenAuth: () => void;
}

export const ActionTimelineTab: React.FC<ActionTimelineTabProps> = ({
  user,
  onOpenAuth
}) => {
  const [activeTimeframe, setActiveTimeframe] = useState<ActionTimeframe>('tomorrow');
  const [actions, setActions] = useState<CareActionItem[]>(() => {
    return user ? StorageService.getUserActions(user.id) : StorageService.getUserActions('guest');
  });

  // New action modal / form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<CareActionItem['category']>('medical');
  const [newPriority, setNewPriority] = useState<CareActionItem['priority']>('medium');

  const userId = user ? user.id : 'guest';

  const handleToggle = (actionId: string) => {
    const updated = StorageService.toggleActionCompletion(userId, actionId);
    setActions(updated);
  };

  const handleDelete = (actionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = StorageService.deleteActionItem(userId, actionId);
    setActions(updated);
  };

  const handleAddAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const updated = StorageService.addActionItem(userId, {
      title: newTitle.trim(),
      description: newDesc.trim() || 'Custom care item added by you.',
      timeframe: activeTimeframe,
      category: newCategory,
      priority: newPriority,
      suggestedDayOrDate: activeTimeframe === 'tomorrow' ? 'Tomorrow' : activeTimeframe === 'this_week' ? 'This Week' : 'Next Month'
    });

    setActions(updated);
    setNewTitle('');
    setNewDesc('');
    setShowAddForm(false);
  };

  const filteredActions = actions.filter(a => a.timeframe === activeTimeframe);
  const completedCount = actions.filter(a => a.isCompleted).length;
  const progressPercent = actions.length > 0 ? Math.round((completedCount / actions.length) * 100) : 0;

  const categoryIcon = (cat: CareActionItem['category']) => {
    switch (cat) {
      case 'medical':
        return <Stethoscope className="w-3.5 h-3.5 text-rose-600" />;
      case 'nutrition':
        return <Apple className="w-3.5 h-3.5 text-emerald-600" />;
      case 'activity':
        return <Activity className="w-3.5 h-3.5 text-blue-600" />;
      case 'tracking':
        return <ClipboardList className="w-3.5 h-3.5 text-purple-600" />;
    }
  };

  const priorityBadge = (p: CareActionItem['priority']) => {
    switch (p) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner & Progress */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-rose-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-semibold uppercase tracking-wider mb-2">
              <CalendarClock className="w-3.5 h-3.5" />
              <span>Your Personal Care Timeline</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {user ? `${user.name}'s Health Action Plan` : "Women's Health Action Plan"}
            </h2>
            <p className="text-xs sm:text-sm text-rose-100 mt-1 max-w-xl leading-relaxed">
              Clear, step-by-step guidance on what to do tomorrow, this week, and next month to manage your hormones, cycles, and clinical care.
            </p>
          </div>

          {!user && (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2.5 rounded-2xl bg-white text-rose-600 font-bold text-xs shadow-md hover:bg-rose-50 transition-all whitespace-nowrap self-start sm:self-auto"
            >
              Sign In to Save Progress
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-5 border-t border-white/20">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span>Overall Action Plan Progress</span>
            <span>{completedCount} of {actions.length} Completed ({progressPercent}%)</span>
          </div>
          <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Timeframe Selector Tabs */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          {/* Timeframe Pills */}
          <div className="grid grid-cols-3 gap-2 flex-1 sm:max-w-lg bg-slate-100 p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveTimeframe('tomorrow')}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                activeTimeframe === 'tomorrow'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🌅 Tomorrow</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTimeframe('this_week')}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                activeTimeframe === 'this_week'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>📅 This Week</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTimeframe('next_month')}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                activeTimeframe === 'next_month'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🗓️ Next Month</span>
            </button>
          </div>

          {/* Add custom action button */}
          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Custom Reminder</span>
          </button>
        </div>

        {/* Add Action Form Modal/Inline */}
        {showAddForm && (
          <form onSubmit={handleAddAction} className="mb-6 p-4 sm:p-5 rounded-2xl bg-rose-50/50 border border-rose-200 animate-scale-in">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-950 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Add Custom To-Do for {activeTimeframe.replace('_', ' ').toUpperCase()}</span>
            </h4>
            <div className="space-y-3">
              <input
                type="text"
                required
                placeholder="What do you need to do? (e.g. Call Dr. Ananya for ultrasound report)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none text-xs sm:text-sm"
              />

              <input
                type="text"
                placeholder="Optional details or instructions..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none text-xs sm:text-sm"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as CareActionItem['category'])}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-medium bg-white"
                  >
                    <option value="medical">Medical / Doctor</option>
                    <option value="nutrition">Nutrition & Diet</option>
                    <option value="activity">Physical Activity</option>
                    <option value="tracking">Symptom Tracking</option>
                  </select>

                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as CareActionItem['priority'])}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-medium bg-white"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="normal">Normal Priority</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs shadow hover:bg-rose-700"
                  >
                    Save Action
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* Action Items List */}
        <div className="space-y-3">
          {filteredActions.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs font-medium">
              No actions in this category yet. Click &ldquo;Add Custom Reminder&rdquo; to add one!
            </div>
          ) : (
            filteredActions.map((action) => (
              <div
                key={action.id}
                onClick={() => handleToggle(action.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  action.isCompleted
                    ? 'bg-emerald-50/40 border-emerald-200 text-slate-500'
                    : 'bg-white border-slate-200/90 hover:border-rose-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex-shrink-0">
                    {action.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 hover:text-rose-500 transition-colors" />
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${priorityBadge(action.priority)}`}>
                        {action.priority}
                      </span>

                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        {categoryIcon(action.category)}
                        <span className="capitalize">{action.category}</span>
                      </span>

                      {action.suggestedDayOrDate && (
                        <span className="text-[11px] text-slate-400 font-medium">
                          • {action.suggestedDayOrDate}
                        </span>
                      )}
                    </div>

                    <h4 className={`text-sm sm:text-base font-bold ${
                      action.isCompleted ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}>
                      {action.title}
                    </h4>

                    <p className={`text-xs mt-1 leading-relaxed ${
                      action.isCompleted ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {action.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleDelete(action.id, e)}
                  className="text-slate-300 hover:text-rose-600 p-1.5 transition-colors flex-shrink-0"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
