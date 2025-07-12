/**
 * 专业级MBTI分析计算器
 * 基于荣格认知功能理论和现代心理学研究
 * 
 * 特性：
 * - 认知功能深度分析 (Ni, Ne, Si, Se, Ti, Te, Fi, Fe)
 * - 多维度权重计算
 * - 动态置信度评估
 * - 边界类型识别
 * - 发展建议生成
 */

import type { MBTIAnswer, MBTIDimensions, MBTIResult, MBTIType } from '../types';
import { getQuestionsByMode, TestMode, professionalMBTIQuestions, cognitiveFunctionWeights } from '../data/professionalMBTIQuestions';

// 认知功能定义
interface CognitiveFunctions {
  Ni: number; // 内向直觉 (Introverted Intuition)
  Ne: number; // 外向直觉 (Extraverted Intuition)  
  Si: number; // 内向感觉 (Introverted Sensing)
  Se: number; // 外向感觉 (Extraverted Sensing)
  Ti: number; // 内向思考 (Introverted Thinking)
  Te: number; // 外向思考 (Extraverted Thinking)
  Fi: number; // 内向情感 (Introverted Feeling)
  Fe: number; // 外向情感 (Extraverted Feeling)
}

// 扩展的MBTI结果
interface AdvancedMBTIResult extends MBTIResult {
  cognitiveFunctions?: CognitiveFunctions;
  functionStack?: string[];
  typeVariation?: 'clear' | 'moderate' | 'slight';
  balancedDimensions?: string[];
  developmentLevel?: 'developing' | 'established' | 'mature';
  reliability?: number;
}

/**
 * 主要计算函数 - 专业级MBTI分析
 */
export function calculateAdvancedMBTIResult(answers: MBTIAnswer[], mode: TestMode = 'professional'): AdvancedMBTIResult {
  const dimensions = calculateAdvancedDimensions(answers, mode);
  const type = determineMBTIType(dimensions);
  const confidence = calculateAdvancedConfidence(dimensions, answers, mode);
  const cognitiveFunctions = calculateCognitiveFunctions(answers, type, mode);
  const functionStack = getFunctionStack(type);
  const typeVariation = getTypeVariation(dimensions);
  const balancedDimensions = getBalancedDimensions(dimensions);
  const developmentLevel = assessDevelopmentLevel(cognitiveFunctions, confidence);
  const reliability = calculateReliability(answers, dimensions, mode);

  return {
    type,
    dimensions,
    confidence,
    cognitiveFunctions,
    functionStack,
    typeVariation,
    balancedDimensions,
    developmentLevel,
    reliability,
    completedAt: new Date(),
  };
}

/**
 * 高级维度计算 - 考虑题目权重和类别
 */
function calculateAdvancedDimensions(answers: MBTIAnswer[], mode: TestMode): MBTIDimensions {
  const scores = {
    EI: { total: 0, weight: 0 },
    SN: { total: 0, weight: 0 },
    TF: { total: 0, weight: 0 },
    JP: { total: 0, weight: 0 }
  };

  const questions = getQuestionsByMode(mode);

  // 加权计算每个维度
  answers.forEach((answer) => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;

    const scoring = question.scoring[answer.answer];
    const weight = question.weight || 1;
    const categoryMultiplier = getCategoryMultiplier(question.category);
    const finalWeight = weight * categoryMultiplier;

    switch (question.dimension) {
      case 'EI':
        scores.EI.total += (scoring === 'E' ? finalWeight : -finalWeight);
        scores.EI.weight += finalWeight;
        break;
      case 'SN':
        scores.SN.total += (scoring === 'N' ? finalWeight : -finalWeight);
        scores.SN.weight += finalWeight;
        break;
      case 'TF':
        scores.TF.total += (scoring === 'F' ? finalWeight : -finalWeight);
        scores.TF.weight += finalWeight;
        break;
      case 'JP':
        scores.JP.total += (scoring === 'P' ? finalWeight : -finalWeight);
        scores.JP.weight += finalWeight;
        break;
    }
  });

  // 标准化为0-100分数
  return {
    E: Math.max(0, Math.round(((scores.EI.total / scores.EI.weight) + 1) * 50)),
    I: Math.max(0, Math.round(((-scores.EI.total / scores.EI.weight) + 1) * 50)),
    S: Math.max(0, Math.round(((-scores.SN.total / scores.SN.weight) + 1) * 50)),
    N: Math.max(0, Math.round(((scores.SN.total / scores.SN.weight) + 1) * 50)),
    T: Math.max(0, Math.round(((-scores.TF.total / scores.TF.weight) + 1) * 50)),
    F: Math.max(0, Math.round(((scores.TF.total / scores.TF.weight) + 1) * 50)),
    J: Math.max(0, Math.round(((-scores.JP.total / scores.JP.weight) + 1) * 50)),
    P: Math.max(0, Math.round(((scores.JP.total / scores.JP.weight) + 1) * 50)),
  };
}

/**
 * 题目类别权重乘数
 */
function getCategoryMultiplier(category?: string): number {
  const multipliers: Record<string, number> = {
    // 核心行为模式
    'energy_source': 1.5,
    'core_values': 1.5,
    'decision_basis': 1.5,
    'lifestyle_preference': 1.5,
    
    // 重要行为指标
    'thinking_process': 1.3,
    'communication_style': 1.3,
    'work_style': 1.3,
    'stress_response': 1.3,
    
    // 一般行为模式
    'social_behavior': 1.0,
    'learning_style': 1.0,
    'leisure_preference': 1.0,
    
    // 细节指标
    'memory_focus': 0.8,
    'email_management': 0.8,
    'attention_focus': 0.8
  };
  
  return multipliers[category || ''] || 1.0;
}

/**
 * 计算认知功能强度
 */
function calculateCognitiveFunctions(answers: MBTIAnswer[], type: MBTIType, mode: TestMode): CognitiveFunctions {
  const functions: CognitiveFunctions = {
    Ni: 0, Ne: 0, Si: 0, Se: 0,
    Ti: 0, Te: 0, Fi: 0, Fe: 0
  };

  if (mode !== 'professional') {
    // 快速版使用基础估算
    return estimateFunctionsFromType(type);
  }

  const questions = professionalMBTIQuestions;
  
  // 基于答案模式分析认知功能
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;

    const functionWeights = analyzeFunctionUsage(question, answer);
    Object.entries(functionWeights).forEach(([func, weight]) => {
      functions[func as keyof CognitiveFunctions] += weight;
    });
  });

  // 标准化分数
  const maxScore = Math.max(...Object.values(functions));
  if (maxScore > 0) {
    Object.keys(functions).forEach(func => {
      functions[func as keyof CognitiveFunctions] = 
        Math.round((functions[func as keyof CognitiveFunctions] / maxScore) * 100);
    });
  }

  return functions;
}

/**
 * 分析单个问题对认知功能的指示
 */
function analyzeFunctionUsage(question: any, answer: MBTIAnswer): Partial<CognitiveFunctions> {
  const weights: Partial<CognitiveFunctions> = {};
  const scoring = question.scoring[answer.answer];
  const baseWeight = question.weight || 1;

  // 基于维度和类别分析
  switch (question.dimension) {
    case 'EI':
      if (scoring === 'E') {
        // 外向偏好可能指示外向功能
        if (question.category?.includes('communication') || question.category?.includes('social')) {
          weights.Fe = baseWeight * 0.7;
          weights.Te = baseWeight * 0.5;
          weights.Se = baseWeight * 0.6;
          weights.Ne = baseWeight * 0.6;
        }
      } else {
        // 内向偏好可能指示内向功能
        weights.Fi = baseWeight * 0.7;
        weights.Ti = baseWeight * 0.5;
        weights.Si = baseWeight * 0.6;
        weights.Ni = baseWeight * 0.6;
      }
      break;
      
    case 'SN':
      if (scoring === 'N') {
        weights.Ni = baseWeight * 1.0;
        weights.Ne = baseWeight * 1.0;
      } else {
        weights.Si = baseWeight * 1.0;
        weights.Se = baseWeight * 1.0;
      }
      break;
      
    case 'TF':
      if (scoring === 'T') {
        weights.Ti = baseWeight * 1.0;
        weights.Te = baseWeight * 1.0;
      } else {
        weights.Fi = baseWeight * 1.0;
        weights.Fe = baseWeight * 1.0;
      }
      break;
      
    case 'JP':
      if (scoring === 'J') {
        // 判断偏好可能指示判断功能在外向位置
        weights.Te = baseWeight * 0.6;
        weights.Fe = baseWeight * 0.6;
      } else {
        // 知觉偏好可能指示知觉功能在外向位置
        weights.Se = baseWeight * 0.6;
        weights.Ne = baseWeight * 0.6;
      }
      break;
  }

  return weights;
}

/**
 * 从类型估算认知功能（快速版使用）
 */
function estimateFunctionsFromType(type: MBTIType): CognitiveFunctions {
  const functionStacks: Record<MBTIType, CognitiveFunctions> = {
    'INTJ': { Ni: 90, Te: 70, Fi: 40, Se: 20, Ne: 10, Si: 10, Ti: 30, Fe: 15 },
    'INFJ': { Ni: 90, Fe: 70, Ti: 40, Se: 20, Ne: 10, Si: 10, Te: 30, Fi: 15 },
    'ISTJ': { Si: 90, Te: 70, Fi: 40, Ne: 20, Se: 10, Ni: 10, Ti: 30, Fe: 15 },
    'ISFJ': { Si: 90, Fe: 70, Ti: 40, Ne: 20, Se: 10, Ni: 10, Te: 30, Fi: 15 },
    'INFP': { Fi: 90, Ne: 70, Si: 40, Te: 20, Fe: 10, Ni: 10, Ti: 30, Se: 15 },
    'INTP': { Ti: 90, Ne: 70, Si: 40, Fe: 20, Te: 10, Ni: 10, Fi: 30, Se: 15 },
    'ESTP': { Se: 90, Ti: 70, Fe: 40, Ni: 20, Si: 10, Ne: 10, Te: 30, Fi: 15 },
    'ESFP': { Se: 90, Fi: 70, Te: 40, Ni: 20, Si: 10, Ne: 10, Ti: 30, Fe: 15 },
    'ENFP': { Ne: 90, Fi: 70, Te: 40, Si: 20, Ni: 10, Se: 10, Ti: 30, Fe: 15 },
    'ENTP': { Ne: 90, Ti: 70, Fe: 40, Si: 20, Ni: 10, Se: 10, Te: 30, Fi: 15 },
    'ESTJ': { Te: 90, Si: 70, Ne: 40, Fi: 20, Ti: 10, Se: 10, Fe: 30, Ni: 15 },
    'ESFJ': { Fe: 90, Si: 70, Ne: 40, Ti: 20, Fi: 10, Se: 10, Te: 30, Ni: 15 },
    'ENFJ': { Fe: 90, Ni: 70, Se: 40, Ti: 20, Fi: 10, Si: 10, Te: 30, Ne: 15 },
    'ENTJ': { Te: 90, Ni: 70, Se: 40, Fi: 20, Ti: 10, Si: 10, Fe: 30, Ne: 15 },
    'ISFP': { Fi: 90, Se: 70, Ni: 40, Te: 20, Fe: 10, Si: 10, Ti: 30, Ne: 15 },
    'ISTP': { Ti: 90, Se: 70, Ni: 40, Fe: 20, Te: 10, Si: 10, Fi: 30, Ne: 15 }
  };

  return functionStacks[type];
}

/**
 * 获取认知功能堆栈
 */
function getFunctionStack(type: MBTIType): string[] {
  const stacks: Record<MBTIType, string[]> = {
    'INTJ': ['Ni', 'Te', 'Fi', 'Se'],
    'INFJ': ['Ni', 'Fe', 'Ti', 'Se'],
    'ISTJ': ['Si', 'Te', 'Fi', 'Ne'],
    'ISFJ': ['Si', 'Fe', 'Ti', 'Ne'],
    'INFP': ['Fi', 'Ne', 'Si', 'Te'],
    'INTP': ['Ti', 'Ne', 'Si', 'Fe'],
    'ESTP': ['Se', 'Ti', 'Fe', 'Ni'],
    'ESFP': ['Se', 'Fi', 'Te', 'Ni'],
    'ENFP': ['Ne', 'Fi', 'Te', 'Si'],
    'ENTP': ['Ne', 'Ti', 'Fe', 'Si'],
    'ESTJ': ['Te', 'Si', 'Ne', 'Fi'],
    'ESFJ': ['Fe', 'Si', 'Ne', 'Ti'],
    'ENFJ': ['Fe', 'Ni', 'Se', 'Ti'],
    'ENTJ': ['Te', 'Ni', 'Se', 'Fi'],
    'ISFP': ['Fi', 'Se', 'Ni', 'Te'],
    'ISTP': ['Ti', 'Se', 'Ni', 'Fe']
  };

  return stacks[type];
}

/**
 * 高级置信度计算
 */
function calculateAdvancedConfidence(dimensions: MBTIDimensions, answers: MBTIAnswer[], mode: TestMode): number {
  // 基础维度确定性
  const eiConfidence = Math.abs(dimensions.E - dimensions.I) / 100;
  const snConfidence = Math.abs(dimensions.S - dimensions.N) / 100;
  const tfConfidence = Math.abs(dimensions.T - dimensions.F) / 100;
  const jpConfidence = Math.abs(dimensions.J - dimensions.P) / 100;
  
  const averageConfidence = (eiConfidence + snConfidence + tfConfidence + jpConfidence) / 4;
  
  // 答案一致性分析
  const consistencyBonus = analyzeAnswerConsistency(answers);
  
  // 测试模式调整
  const modeMultiplier = mode === 'professional' ? 1.0 : 0.85;
  
  // 答题完整度
  const completionRate = answers.length / getQuestionsByMode(mode).length;
  
  const finalConfidence = averageConfidence * modeMultiplier * completionRate + consistencyBonus;
  
  return Math.min(95, Math.max(30, Math.round(finalConfidence * 100)));
}

/**
 * 分析答案一致性
 */
function analyzeAnswerConsistency(answers: MBTIAnswer[]): number {
  // 检查相似问题的答案一致性
  // 这里简化实现，实际可以更复杂
  const totalAnswers = answers.length;
  if (totalAnswers < 10) return 0;
  
  // 模拟一致性检查（实际应该基于相似问题的答案模式）
  const consistencyScore = 0.85 + (Math.random() * 0.1); // 85-95%的基础一致性
  
  return (consistencyScore - 0.85) * 0.1; // 最多加10%
}

/**
 * 确定类型变化程度
 */
function getTypeVariation(dimensions: MBTIDimensions): 'clear' | 'moderate' | 'slight' {
  const differences = [
    Math.abs(dimensions.E - dimensions.I),
    Math.abs(dimensions.S - dimensions.N),
    Math.abs(dimensions.T - dimensions.F),
    Math.abs(dimensions.J - dimensions.P)
  ];
  
  const averageDifference = differences.reduce((a, b) => a + b, 0) / 4;
  
  if (averageDifference >= 30) return 'clear';
  if (averageDifference >= 15) return 'moderate';
  return 'slight';
}

/**
 * 识别平衡的维度
 */
function getBalancedDimensions(dimensions: MBTIDimensions): string[] {
  const balanced = [];
  const threshold = 15; // 15%以内认为是平衡的
  
  if (Math.abs(dimensions.E - dimensions.I) <= threshold) balanced.push('EI');
  if (Math.abs(dimensions.S - dimensions.N) <= threshold) balanced.push('SN');
  if (Math.abs(dimensions.T - dimensions.F) <= threshold) balanced.push('TF');
  if (Math.abs(dimensions.J - dimensions.P) <= threshold) balanced.push('JP');
  
  return balanced;
}

/**
 * 评估发展水平
 */
function assessDevelopmentLevel(functions: CognitiveFunctions, confidence: number): 'developing' | 'established' | 'mature' {
  const functionValues = Object.values(functions);
  const topFunction = Math.max(...functionValues);
  const functionSpread = topFunction - Math.min(...functionValues);
  
  if (confidence >= 85 && functionSpread >= 50) return 'mature';
  if (confidence >= 70 && functionSpread >= 30) return 'established';
  return 'developing';
}

/**
 * 计算测试可靠性
 */
function calculateReliability(answers: MBTIAnswer[], dimensions: MBTIDimensions, mode: TestMode): number {
  const completionRate = answers.length / getQuestionsByMode(mode).length;
  const dimensionClarity = getTypeVariation(dimensions);
  const modeReliability = mode === 'professional' ? 0.95 : 0.85;
  
  let reliabilityScore = modeReliability * completionRate;
  
  switch (dimensionClarity) {
    case 'clear': reliabilityScore *= 1.0; break;
    case 'moderate': reliabilityScore *= 0.9; break;
    case 'slight': reliabilityScore *= 0.8; break;
  }
  
  return Math.round(reliabilityScore * 100);
}

/**
 * 根据维度得分确定MBTI类型
 */
function determineMBTIType(dimensions: MBTIDimensions): MBTIType {
  const e_or_i = dimensions.E > dimensions.I ? 'E' : 'I';
  const s_or_n = dimensions.S > dimensions.N ? 'S' : 'N';
  const t_or_f = dimensions.T > dimensions.F ? 'T' : 'F';
  const j_or_p = dimensions.J > dimensions.P ? 'J' : 'P';
  
  return `${e_or_i}${s_or_n}${t_or_f}${j_or_p}` as MBTIType;
}

/**
 * 兼容性函数 - 保持向后兼容
 */
export function calculateMBTIResult(answers: MBTIAnswer[], mode: TestMode = 'quick'): MBTIResult {
  const advancedResult = calculateAdvancedMBTIResult(answers, mode);
  
  // 返回基础结果格式
  return {
    type: advancedResult.type,
    dimensions: advancedResult.dimensions,
    confidence: advancedResult.confidence,
    completedAt: advancedResult.completedAt
  };
}

// 导出原有函数以保持兼容性
export * from './mbtiCalculator';