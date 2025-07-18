// AI大师模块类型定义

export interface PersonalityDimension {
  id: string;
  name: string;
  score: number; // 0-100
  description: string;
  insights: string[];
}

export interface LifeArea {
  id: string;
  name: string;
  score: number; // 0-100
  analysis: string;
  recommendations: string[];
  challenges: string[];
  opportunities: string[];
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

export interface ComprehensiveAnalysis {
  id: string;
  timestamp: Date;
  userId?: string;
  
  // 输入数据
  inputData: {
    mbtiResult?: any;
    astrologyResult?: any;
    bloodTypeResult?: any;
    tarotResult?: any;
    palmistryResult?: any;
    ichingResult?: any;
    userInput?: {
      age?: number;
      gender?: string;
      occupation?: string;
      interests?: string[];
      goals?: string[];
      concerns?: string[];
    };
  };
  
  // 分析结果
  analysis: {
    personalityProfile: PersonalityProfile;
    dimensions: PersonalityDimension[];
    lifeAreas: LifeArea[];
    overallScore: number;
    confidence: number;
    consistency: number; // 各模块结果的一致性
  };
  
  // AI 解读
  aiInsights: {
    summary: string;
    keyFindings: string[];
    personalizedAdvice: string[];
    developmentPlan: {
      shortTerm: string[]; // 1-3个月
      mediumTerm: string[]; // 3-12个月
      longTerm: string[]; // 1年以上
    };
    relationshipAdvice: string[];
    careerGuidance: string[];
    wellnessRecommendations: string[];
  };
  
  // 动态建议
  actionPlans: ActionPlan[];
  
  // 相似档案
  similarProfiles?: SimilarProfile[];
}

export interface ActionPlan {
  id: string;
  title: string;
  description: string;
  category: 'personal' | 'career' | 'relationships' | 'health' | 'spiritual';
  priority: 'high' | 'medium' | 'low';
  timeline: string;
  steps: string[];
  metrics: string[];
  resources: string[];
}

export interface SimilarProfile {
  id: string;
  similarity: number; // 0-100
  commonTraits: string[];
  differentiatingFactors: string[];
  insights: string[];
}

export interface AIConversation {
  id: string;
  timestamp: Date;
  analysisId: string;
  messages: AIMessage[];
  context: {
    userProfile: ComprehensiveAnalysis;
    conversationGoals: string[];
    currentFocus: string;
  };
}

export interface AIMessage {
  id: string;
  timestamp: Date;
  sender: 'user' | 'ai';
  content: string;
  messageType: 'text' | 'analysis' | 'recommendation' | 'question' | 'crisis_support';
  metadata?: {
    confidence?: number;
    sources?: string[];
    relatedInsights?: string[];
    isAIGenerated?: boolean;
    fallbackReason?: string;
  };
}

export interface AIPersonality {
  name: string;
  description: string;
  specialties: string[];
  communicationStyle: string;
  avatar: string;
  prompt: string;
}

export interface AnalysisRequest {
  includeModules: ModuleType[];
  userInput: {
    basicInfo: {
      age?: number;
      gender?: string;
      occupation?: string;
      location?: string;
    };
    goals: string[];
    concerns: string[];
    interests: string[];
    preferences: {
      analysisDepth: 'basic' | 'detailed' | 'comprehensive';
      focusAreas: string[];
      communicationStyle: 'formal' | 'casual' | 'encouraging';
    };
  };
  existingResults: {
    [key in ModuleType]?: any;
  };
}

export type ModuleType = 'mbti' | 'astrology' | 'bloodtype' | 'tarot' | 'palmistry' | 'iching';

export interface InsightCategory {
  id: string;
  name: string;
  description: string;
  insights: Insight[];
  weight: number; // 在总体分析中的权重
}

export interface Insight {
  id: string;
  content: string;
  confidence: number;
  sources: ModuleType[];
  category: string;
  importance: 'high' | 'medium' | 'low';
  actionable: boolean;
  supportingEvidence: string[];
}

export interface PersonalityEvolution {
  id: string;
  userId: string;
  analyses: ComprehensiveAnalysis[];
  trends: {
    dimension: string;
    values: { date: Date; score: number }[];
    trend: 'increasing' | 'decreasing' | 'stable';
    significance: number;
  }[];
  milestones: {
    date: Date;
    description: string;
    impact: string;
    analysisId: string;
  }[];
}

export interface AICoachingSession {
  id: string;
  timestamp: Date;
  userId: string;
  analysisId: string;
  sessionType: 'goal-setting' | 'problem-solving' | 'reflection' | 'planning';
  duration: number; // minutes
  objectives: string[];
  outcomes: string[];
  nextSteps: string[];
  satisfaction: number; // 1-5
}