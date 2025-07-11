// 用户相关类型
export interface User {
  id: string;
  email: string;
  username: string;
  preferredLanguage: string;
  timezone: string;
  region: string;
  createdAt: Date;
  updatedAt: Date;
  avatar?: string;
  bio?: string;
  birthDate?: Date;
  gender?: 'male' | 'female' | 'other';
  location?: string;
  phone?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  twoFactorEnabled?: boolean;
  profileCompleted?: boolean;
  mbtiType?: string;
  astrologySign?: string;
  preferences?: UserPreferences;
}

// 用户偏好设置
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showEmail: boolean;
    showPhone: boolean;
    showBirthDate: boolean;
  };
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
    largeText: boolean;
  };
}

// 通知类型
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string>;
}

// 表单验证类型
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// 组件Props类型
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// 表单数据类型
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  acceptTerms: boolean;
}

// MBTI 测试相关类型
export type MBTIType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export interface MBTIDimensions {
  EI: number; // Extraversion (E) vs. Introversion (I)
  SN: number; // Sensing (S) vs. Intuition (N)
  TF: number; // Thinking (T) vs. Feeling (F)
  JP: number; // Judging (J) vs. Perceiving (P)
}

export interface MBTIQuestion {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
  };
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  weight: number;
}

export interface MBTIAnswer {
  questionId: number;
  answer: 'A' | 'B';
}

export interface MBTIResult {
  type: MBTIType;
  dimensions: MBTIDimensions;
  confidence: number;
  completedAt: Date;
}

// 星座相关类型
export type ZodiacSign =
  | 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo'
  | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

export interface ZodiacInfo {
  name: string;
  symbol: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  quality: 'cardinal' | 'fixed' | 'mutable';
  rulingPlanet: string;
  dateRange: string;
  description: string;
  traits: {
    positive: string[];
    negative: string[];
  };
  compatibility: {
    best: ZodiacSign[];
    good: ZodiacSign[];
    challenging: ZodiacSign[];
  };
  luckyNumbers: number[];
  luckyColors: string[];
  career: string[];
  love: string;
  health: string;
}

export interface AstrologyResult {
  sunSign: ZodiacSign;
  element: 'fire' | 'earth' | 'air' | 'water';
  quality: 'cardinal' | 'fixed' | 'mutable';
  rulingPlanet: string;
  birthDate: string;
  traits: string[];
  compatibility: ZodiacSign[];
  luckyNumbers: number[];
  luckyColors: string[];
  completedAt: Date;
}
