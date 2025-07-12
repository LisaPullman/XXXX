// 冥想模块类型定义

export interface MeditationCourse {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number; // 分钟
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: MeditationCategory;
  tags: string[];
  thumbnail: string;
  audioUrl?: string;
  transcription?: string;
  benefits: string[];
  prerequisites?: string[];
  sessions: MeditationSession[];
}

export interface MeditationSession {
  id: string;
  title: string;
  description: string;
  duration: number; // 分钟
  audioUrl?: string;
  instructions: string[];
  focusPoints: string[];
  preparation: string[];
  postSession: string[];
}

export interface MeditationTimer {
  id: string;
  duration: number; // 秒
  ambientSound?: AmbientSound;
  intervals?: {
    duration: number; // 秒
    sound: string;
    instruction?: string;
  }[];
  startTime: Date;
  endTime?: Date;
  paused: boolean;
  totalPauseTime: number;
}

export interface AmbientSound {
  id: string;
  name: string;
  description: string;
  audioUrl: string;
  category: 'nature' | 'instrumental' | 'binaural' | 'silence';
  volume: number; // 0-100
  loop: boolean;
}

export interface MeditationProgress {
  userId: string;
  totalSessions: number;
  totalMinutes: number;
  longestStreak: number;
  currentStreak: number;
  favoriteCategory: MeditationCategory;
  completedCourses: string[];
  achievements: Achievement[];
  weeklyGoal: number; // 分钟
  weeklyProgress: number; // 分钟
  lastSessionDate: Date;
  averageSessionLength: number;
}

export interface MeditationRecord {
  id: string;
  userId: string;
  sessionId?: string;
  courseId?: string;
  type: 'guided' | 'timer' | 'free';
  duration: number; // 分钟
  category: MeditationCategory;
  mood: {
    before: MoodLevel;
    after: MoodLevel;
  };
  notes?: string;
  rating: number; // 1-5
  date: Date;
  completionRate: number; // 0-100
  interruptions: number;
  environment: 'quiet' | 'noisy' | 'natural' | 'indoor' | 'outdoor';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'streak' | 'duration' | 'course' | 'milestone';
  requirement: string;
}

export interface MeditationGoal {
  id: string;
  userId: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  target: number; // 分钟或次数
  unit: 'minutes' | 'sessions';
  startDate: Date;
  endDate: Date;
  progress: number;
  completed: boolean;
  description: string;
}

export interface MeditationInsight {
  id: string;
  userId: string;
  period: 'week' | 'month' | 'quarter' | 'year';
  startDate: Date;
  endDate: Date;
  metrics: {
    totalSessions: number;
    totalMinutes: number;
    averageRating: number;
    moodImprovement: number; // -5 to +5
    consistencyScore: number; // 0-100
    preferredTime: string; // morning, afternoon, evening
    favoriteCategory: MeditationCategory;
  };
  trends: {
    sessionFrequency: 'increasing' | 'decreasing' | 'stable';
    sessionLength: 'increasing' | 'decreasing' | 'stable';
    moodTrend: 'improving' | 'declining' | 'stable';
  };
  recommendations: string[];
}

export interface MindfulnessReminder {
  id: string;
  userId: string;
  title: string;
  message: string;
  time: string; // HH:MM format
  days: number[]; // 0-6, Sunday = 0
  enabled: boolean;
  sound: string;
  type: 'meditation' | 'breathing' | 'gratitude' | 'mindfulness';
}

export type MeditationCategory = 
  | 'mindfulness'
  | 'breathing'
  | 'body_scan'
  | 'loving_kindness'
  | 'visualization'
  | 'movement'
  | 'sleep'
  | 'stress_relief'
  | 'focus'
  | 'emotional'
  | 'spiritual'
  | 'beginner';

export type MoodLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  pattern: {
    inhale: number; // 秒
    hold: number; // 秒
    exhale: number; // 秒
    pause: number; // 秒
  };
  cycles: number;
  totalDuration: number; // 秒
  benefits: string[];
  instructions: string[];
  visualization?: string;
}

export interface MeditationJournal {
  id: string;
  userId: string;
  date: Date;
  entry: string;
  mood: MoodLevel;
  gratitude: string[];
  insights: string[];
  challenges: string[];
  intentions: string[];
  tags: string[];
}

export interface MeditationCommunity {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: string;
  isPublic: boolean;
  events: CommunityEvent[];
  discussions: Discussion[];
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  instructor: string;
  date: Date;
  duration: number;
  participants: number;
  maxParticipants: number;
  type: 'group_meditation' | 'workshop' | 'retreat' | 'discussion';
}

export interface Discussion {
  id: string;
  title: string;
  author: string;
  content: string;
  replies: Reply[];
  createdAt: Date;
  likes: number;
  tags: string[];
}

export interface Reply {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  likes: number;
}

export interface MeditationPreferences {
  userId: string;
  preferredDuration: number; // 分钟
  preferredTime: 'morning' | 'afternoon' | 'evening' | 'flexible';
  favoriteCategories: MeditationCategory[];
  ambientSounds: string[];
  reminderSettings: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'custom';
    times: string[];
  };
  privacy: {
    showProgress: boolean;
    showAchievements: boolean;
    joinCommunity: boolean;
  };
  accessibility: {
    subtitles: boolean;
    slowedInstructions: boolean;
    largeText: boolean;
    highContrast: boolean;
  };
}