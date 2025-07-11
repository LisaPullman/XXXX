// 基础用户类型
export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  preferredLanguage: string;
  timezone: string;
  region: string;
  birthDate?: Date;
  birthTime?: string;
  birthLocation?: {
    city: string;
    province: string;
    latitude: number;
    longitude: number;
  };
  gender?: 'male' | 'female' | 'other';
  createdAt: Date;
  updatedAt: Date;
}

// 位置数据类型
export interface LocationData {
  city: string;
  province: string;
  latitude: number;
  longitude: number;
}

// MBTI相关类型
export interface MBTIAnswer {
  questionId: number;
  answer: number; // 1-5分
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
}

export interface MBTIResult {
  type: string; // 如 'INTJ'
  dimensions: {
    EI: number; // 外向性得分 (-100 到 100)
    SN: number; // 感觉-直觉得分
    TF: number; // 思考-情感得分
    JP: number; // 判断-感知得分
  };
  confidence: number; // 置信度 (0-1)
  description: string;
  strengths: string[];
  challenges: string[];
  careers: string[];
  relationships: string[];
  completedAt: Date;
}

// 星座相关类型
export type ZodiacSign = 
  | 'aries' | 'taurus' | 'gemini' | 'cancer' 
  | 'leo' | 'virgo' | 'libra' | 'scorpio' 
  | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

export interface ZodiacInfo {
  name: string;
  symbol: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  quality: 'cardinal' | 'fixed' | 'mutable';
  dates: string;
  description: string;
  traits: string[];
  compatibility: ZodiacSign[];
  colors: string[];
  stones: string[];
}

export interface AstrologyResult {
  sunSign: ZodiacSign;
  moonSign?: ZodiacSign;
  ascendant?: ZodiacSign;
  birthChart?: any;
  personality: string;
  love: string;
  career: string;
  health: string;
  fortune: string;
  luckyNumbers: number[];
  luckyColors: string[];
  compatibility: {
    sign: ZodiacSign;
    score: number;
    description: string;
  }[];
  completedAt: Date;
}

// AI分析相关类型
export interface AIAnalysisResponse {
  analysis: string;
  suggestions: string[];
  keywords: string[];
  confidence?: number;
  relatedTopics?: string[];
}

export interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  role?: 'user' | 'assistant';
}

// 通知类型
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

// 测试结果基础类型
export interface TestResult {
  id: string;
  userId: string;
  type: 'mbti' | 'astrology' | 'blood_type' | 'palmistry';
  result: any;
  aiAnalysis?: AIAnalysisResponse;
  createdAt: Date;
  updatedAt: Date;
}

// 应用状态类型
export interface AppState {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string>;
}
