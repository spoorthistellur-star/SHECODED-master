import { UserProfile, SavedSymptomLog, CareActionItem, AssessmentResult, SupportedLanguage } from '../types';

const USERS_KEY = 'womens_health_users_v1';
const CURRENT_USER_KEY = 'womens_health_active_user_v1';
const LOGS_KEY = 'womens_health_logs_v1';
const ACTIONS_KEY = 'womens_health_actions_v1';

// Default initial action plan for PCOS & cycle care
export const DEFAULT_ACTION_ITEMS: CareActionItem[] = [
  // Tomorrow
  {
    id: 'act_tom_1',
    title: 'Schedule Gynecologist Consultation',
    timeframe: 'tomorrow',
    category: 'medical',
    description: 'Call an OB/GYN clinic to book a consultation. Tell them you would like to discuss cycle irregularities and hormonal evaluation.',
    isCompleted: false,
    priority: 'high',
    suggestedDayOrDate: 'Tomorrow Morning'
  },
  {
    id: 'act_tom_2',
    title: 'Begin Daily Menstrual & Symptom Journal',
    timeframe: 'tomorrow',
    category: 'tracking',
    description: 'Note down whether you have any spotting, acne flare-ups, pelvic cramps, or energy dips today.',
    isCompleted: false,
    priority: 'medium',
    suggestedDayOrDate: 'Tomorrow'
  },
  {
    id: 'act_tom_3',
    title: 'Morning Low-GI Breakfast Swap',
    timeframe: 'tomorrow',
    category: 'nutrition',
    description: 'Replace high-sugar cereals, bread, or pure carbs with protein & fiber (e.g. vegetable ragi dosa, sprouted moong, eggs, or paneer).',
    isCompleted: false,
    priority: 'medium',
    suggestedDayOrDate: 'Tomorrow Breakfast'
  },
  {
    id: 'act_tom_4',
    title: 'Post-Dinner 20-Minute Gentle Walk',
    timeframe: 'tomorrow',
    category: 'activity',
    description: 'A brief walk 15–30 minutes after dinner lowers postprandial glucose and improves insulin sensitivity without straining the adrenals.',
    isCompleted: false,
    priority: 'normal',
    suggestedDayOrDate: 'Tomorrow Night'
  },

  // This Week (Next 7 Days)
  {
    id: 'act_week_1',
    title: 'Complete Morning Fasting Lab Tests',
    timeframe: 'this_week',
    category: 'medical',
    description: 'After an 8–10 hour overnight fast, complete standard blood draws: Fasting Glucose, Fasting Insulin, Lipid Profile, and TSH.',
    isCompleted: false,
    priority: 'high',
    suggestedDayOrDate: 'This Week'
  },
  {
    id: 'act_week_2',
    title: 'Print / Download Your Doctor Consultation Slip',
    timeframe: 'this_week',
    category: 'tracking',
    description: 'Use the "Print / PDF" button on this website to save your structured symptoms report to show your doctor during the appointment.',
    isCompleted: false,
    priority: 'medium',
    suggestedDayOrDate: 'Before Clinic Visit'
  },
  {
    id: 'act_week_3',
    title: 'Add Soaked Methi Seeds or Spearmint Infusion',
    timeframe: 'this_week',
    category: 'nutrition',
    description: 'Soak 1 tsp fenugreek (methi) seeds in water overnight, or sip 1 cup of spearmint tea daily to support androgen balance.',
    isCompleted: false,
    priority: 'normal',
    suggestedDayOrDate: 'Daily This Week'
  },
  {
    id: 'act_week_4',
    title: 'Lock In a Consistent 10:30 PM Sleep Window',
    timeframe: 'this_week',
    category: 'tracking',
    description: 'Turn off screens 30 minutes before bed. Aim for 7.5 to 8 hours of restful sleep to reduce morning cortisol spikes.',
    isCompleted: false,
    priority: 'medium',
    suggestedDayOrDate: 'Nightly'
  },

  // Next Month (30 - 60 Days)
  {
    id: 'act_month_1',
    title: 'Pelvic Ultrasound (USG) on Cycle Day 3–5',
    timeframe: 'next_month',
    category: 'medical',
    description: 'If periods arrive, schedule your pelvic ultrasound during days 3 to 5 of menses to check ovarian morphology and follicular distribution.',
    isCompleted: false,
    priority: 'high',
    suggestedDayOrDate: 'Next Month (Cycle Days 3–5)'
  },
  {
    id: 'act_month_2',
    title: '1-Month Menstrual Cycle Review',
    timeframe: 'next_month',
    category: 'tracking',
    description: 'Review the total days between periods. Note if cycle length shortened, flow was heavy or light, or if periods were delayed.',
    isCompleted: false,
    priority: 'high',
    suggestedDayOrDate: 'In 30 Days'
  },
  {
    id: 'act_month_3',
    title: 'Doctor Follow-Up on Hormone/Ultrasound Results',
    timeframe: 'next_month',
    category: 'medical',
    description: 'Review lab panel (LH:FSH ratio, AMH, Free Testosterone) and ultrasound findings with your doctor for your long-term plan.',
    isCompleted: false,
    priority: 'high',
    suggestedDayOrDate: 'Next Month'
  },
  {
    id: 'act_month_4',
    title: 'Symptom & Skin Progress Evaluation',
    timeframe: 'next_month',
    category: 'tracking',
    description: 'Log into this tool and do a re-evaluation to track whether chin acne, hair loss, belly bloating, or fatigue have improved.',
    isCompleted: false,
    priority: 'medium',
    suggestedDayOrDate: 'In 4–6 Weeks'
  }
];

export class StorageService {
  // User Management
  public static getAllUsers(): UserProfile[] {
    try {
      const data = localStorage.getItem(USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static getActiveUser(): UserProfile | null {
    try {
      const data = localStorage.getItem(CURRENT_USER_KEY);
      if (data) return JSON.parse(data);

      // Default demo profile if first time
      const users = this.getAllUsers();
      if (users.length > 0) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[0]));
        return users[0];
      }
      return null;
    } catch {
      return null;
    }
  }

  public static setActiveUser(user: UserProfile) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }

  public static registerUser(
    name: string,
    email: string,
    age?: number,
    preferredLanguage: SupportedLanguage = 'en',
    cycleLengthDays: number = 32
  ): UserProfile {
    const users = this.getAllUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      this.setActiveUser(existing);
      return existing;
    }

    const newUser: UserProfile = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name,
      email,
      age,
      preferredLanguage,
      cycleLengthDays,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    this.setActiveUser(newUser);

    // Initialize user's default action plan
    this.initUserActions(newUser.id);

    return newUser;
  }

  public static logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  // Symptom Logs History
  public static getUserLogs(userId: string): SavedSymptomLog[] {
    try {
      const data = localStorage.getItem(LOGS_KEY);
      const allLogs: SavedSymptomLog[] = data ? JSON.parse(data) : [];
      return allLogs.filter(log => log.userId === userId).sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    } catch {
      return [];
    }
  }

  public static saveSymptomLog(
    userId: string,
    rawInput: string,
    assessment: AssessmentResult,
    userNotes?: string
  ): SavedSymptomLog {
    const logs = this.getAllLogs();
    const newLog: SavedSymptomLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      userId,
      timestamp: new Date().toISOString(),
      rawInput,
      symptomsCount: assessment.extractedSymptoms.length,
      symptomsSummary: assessment.extractedSymptoms.map(s => s.name.split(' (')[0]),
      rotterdamCriteriaCount: assessment.rotterdamCriteriaMatch.criteriaMetCount,
      urgencyLevel: assessment.careGuidance.urgencyLevel,
      assessment,
      userNotes
    };

    logs.unshift(newLog);
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
    return newLog;
  }

  public static deleteLog(logId: string) {
    const logs = this.getAllLogs().filter(l => l.id !== logId);
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  }

  private static getAllLogs(): SavedSymptomLog[] {
    try {
      const data = localStorage.getItem(LOGS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  // Action Items / Care Plan Timeline ("Tomorrow what you have to do, Next month what you have to do")
  public static getUserActions(userId: string): CareActionItem[] {
    try {
      const key = `${ACTIONS_KEY}_${userId}`;
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }
      // Initialize with defaults if none exist
      const initial = DEFAULT_ACTION_ITEMS.map(item => ({ ...item, id: `${item.id}_${Date.now()}` }));
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    } catch {
      return DEFAULT_ACTION_ITEMS;
    }
  }

  public static toggleActionCompletion(userId: string, actionId: string): CareActionItem[] {
    const items = this.getUserActions(userId);
    const updated = items.map(item =>
      item.id === actionId ? { ...item, isCompleted: !item.isCompleted } : item
    );
    const key = `${ACTIONS_KEY}_${userId}`;
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  }

  public static addActionItem(userId: string, item: Omit<CareActionItem, 'id' | 'isCompleted'>): CareActionItem[] {
    const items = this.getUserActions(userId);
    const newItem: CareActionItem = {
      ...item,
      id: `act_cust_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      isCompleted: false
    };
    items.unshift(newItem);
    const key = `${ACTIONS_KEY}_${userId}`;
    localStorage.setItem(key, JSON.stringify(items));
    return items;
  }

  public static deleteActionItem(userId: string, actionId: string): CareActionItem[] {
    const items = this.getUserActions(userId).filter(i => i.id !== actionId);
    const key = `${ACTIONS_KEY}_${userId}`;
    localStorage.setItem(key, JSON.stringify(items));
    return items;
  }

  private static initUserActions(userId: string) {
    const key = `${ACTIONS_KEY}_${userId}`;
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(DEFAULT_ACTION_ITEMS));
    }
  }
}
