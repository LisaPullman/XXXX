// MBTI模块的TypeScript类型定义 - 专业级扩展版本
export interface MBTIAnswer {
  questionId: number;
  answer: 'A' | 'B';
  timestamp: Date;
  responseTime?: number; // 响应时间（毫秒）
  confidence?: number; // 回答置信度
}

export interface MBTIDimensions {
  E: number; // 外向性得分 (0-100)
  I: number; // 内向性得分 (0-100)
  S: number; // 感觉得分 (0-100)
  N: number; // 直觉得分 (0-100)
  T: number; // 思考得分 (0-100)
  F: number; // 情感得分 (0-100)
  J: number; // 判断得分 (0-100)
  P: number; // 知觉得分 (0-100)
}

// 认知功能强度
export interface CognitiveFunctions {
  Ni: number; // 内向直觉
  Ne: number; // 外向直觉
  Si: number; // 内向感觉
  Se: number; // 外向感觉
  Ti: number; // 内向思考
  Te: number; // 外向思考
  Fi: number; // 内向情感
  Fe: number; // 外向情感
}

export type MBTIType = 
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export interface MBTIResult {
  type: MBTIType;
  dimensions: MBTIDimensions;
  confidence: number; // 置信度 (0-100)
  completedAt: Date;
  
  // 扩展分析结果（可选）
  cognitiveFunctions?: CognitiveFunctions;
  functionStack?: string[];
  typeVariation?: 'clear' | 'moderate' | 'slight';
  balancedDimensions?: string[];
  developmentLevel?: 'developing' | 'established' | 'mature';
  reliability?: number;
}

export interface MBTIQuestion {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
  };
  scoring: {
    A: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
    B: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
  };
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  weight: number;
  category?: string;
  explanation?: string;
}

export interface PersonalityTrait {
  category: string;
  name: string;
  description: string;
  score: number; // 0-100
  examples: string[];
}

export interface CognitiveFunction {
  name: string;
  abbreviation: string;
  description: string;
  strength: number; // 0-100
  role: 'dominant' | 'auxiliary' | 'tertiary' | 'inferior';
}

export interface MBTICareerMatch {
  category: string;
  jobs: string[];
  matchScore: number; // 0-100
  reasons: string[];
  workEnvironment: string[];
  skills: string[];
}

export interface MBTICompatibility {
  type: MBTIType;
  compatibilityScore: number; // 0-100
  relationshipType: 'ideal' | 'complement' | 'similar' | 'challenging';
  description: string;
  strengths: string[];
  challenges: string[];
  tips: string[];
}

export interface MBTIGrowthArea {
  area: string;
  description: string;
  suggestions: string[];
  exercises: string[];
  resources: string[];
}

export interface MBTITestHistory {
  id: string;
  testDate: Date;
  result: MBTIResult;
  version: string;
  notes?: string;
}

export interface MBTITestConfig {
  version: string;
  totalQuestions: number;
  timeLimit?: number; // 秒
  randomizeQuestions: boolean;
  showProgress: boolean;
  allowReview: boolean;
}

export interface MBTIFeedback {
  questionId: number;
  feedback: string;
  difficulty: 'easy' | 'medium' | 'hard';
  clarity: number; // 1-5
  relevance: number; // 1-5
}

// 详细分析报告接口
export interface DetailedMBTIAnalysis {
  personalityProfile: PersonalityProfile;
  relationshipAdvice: RelationshipAdvice;
  careerGuidance: CareerGuidance;
  stressManagement: StressManagement;
  growthAreas: GrowthArea[];
  compatibilityInsights: CompatibilityInsight;
  dailyTips: string[];
}

export interface PersonalityProfile {
  coreTraits: string[];
  strengths: string[];
  weaknesses: string[];
  motivations: string[];
  fears: string[];
  values: string[];
  communicationStyle: string;
  decisionMakingStyle: string;
  stressResponse: string;
  growthAreas: string[];
}

export interface RelationshipAdvice {
  strengths: string[];
  challenges: string[];
  tips: string[];
  compatibility: string[];
}

export interface CareerGuidance {
  idealEnvironments: string[];
  workStyle: string[];
  leadershipStyle: string;
  avoidCareers: string[];
  growthPath: string[];
}

export interface StressManagement {
  stressTriggers: string[];
  stressSignals: string[];
  copingStrategies: string[];
  relaxationMethods: string[];
}

export interface GrowthArea {
  area: string;
  description: string;
  actions: string[];
}

export interface CompatibilityInsight {
  bestMatches: string[];
  challengingMatches: string[];
  friendshipCompatibility: string[];
  workCompatibility: string[];
}