// 血型分析模块的类型定义
export interface BloodType {
  type: 'A' | 'B' | 'O' | 'AB';
  name: string;
  emoji: string;
  description: string;
}

export interface BloodTypePersonality {
  positive: string[];
  negative: string[];
  core: string;
  keywords: string[];
}

export interface BloodTypeCareer {
  suitable: string[];
  unsuitable: string[];
  advice: string;
}

export interface BloodTypeHealth {
  strengths: string[];
  weaknesses: string[];
  diseases: string[];
  advice: string[];
}

export interface BloodTypeLifestyle {
  diet: string[];
  exercise: string[];
  stress: string[];
}

export interface BloodTypeRelationships {
  love: string;
  friendship: string;
  family: string;
  communication: string;
}

export interface BloodTypeCompatibility {
  [key: string]: {
    score: number;
    description: string;
    advice: string;
  };
}

export interface BloodTypeTestResult {
  bloodType: BloodType;
  personality: BloodTypePersonality;
  career: BloodTypeCareer;
  health: BloodTypeHealth;
  lifestyle: BloodTypeLifestyle;
  relationships: BloodTypeRelationships;
  compatibility: BloodTypeCompatibility;
  dailyAdvice: string[];
  motto: string;
  color: string;
  gradient: string;
}

export interface BloodTypeAnalysisState {
  currentStep: 'input' | 'result';
  selectedBloodType: 'A' | 'B' | 'O' | 'AB' | null;
  result: BloodTypeTestResult | null;
  loading: boolean;
  error: string | null;
}

export interface BloodTypeCompatibilityResult {
  type1: string;
  type2: string;
  score: number;
  category: '完美配对' | '不错配对' | '一般配对' | '需要努力';
  description: string;
  strengths: string[];
  challenges: string[];
  advice: string;
}

export interface BloodTypeHealthRisk {
  level: 'low' | 'medium' | 'high';
  diseases: string[];
  advice: string[];
}

// 血型分析参数
export interface BloodTypeAnalysisParams {
  bloodType: 'A' | 'B' | 'O' | 'AB';
  partnerBloodType?: 'A' | 'B' | 'O' | 'AB';
  analysisType: 'personality' | 'health' | 'compatibility' | 'comprehensive';
}