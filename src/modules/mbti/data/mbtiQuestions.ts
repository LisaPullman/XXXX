// MBTI测试题库 - 整合快速版和专业版
import { MBTIQuestion } from '../types';
import { professionalMBTIQuestions, quickMBTIQuestions as professionalQuickQuestions, getTestModeInfo as getProfessionalTestModeInfo } from './professionalMBTIQuestions';

// 导出专业版题库（93题）
export { professionalMBTIQuestions as completeMBTIQuestions };

// 导出快速版题库（30题精选）
export { professionalQuickQuestions as quickMBTIQuestions };

// 测试模式定义
export type TestMode = 'quick' | 'professional';

export const getQuestionsByMode = (mode: TestMode): MBTIQuestion[] => {
  return mode === 'quick' ? professionalQuickQuestions : professionalMBTIQuestions;
};

export const getTestModeInfo = (mode: TestMode) => {
  const info = getProfessionalTestModeInfo(mode);
  
  // 可以在这里添加额外的本地化或自定义信息
  if (mode === 'professional') {
    return {
      ...info,
      title: '专业完整版',
      description: '93道权威题目，基于荣格认知功能理论的专业级人格分析',
      features: [
        ...info.features,
        '认知功能堆栈分析',
        '人格发展水平评估',
        '详细的改进建议',
        '职业匹配度分析'
      ]
    };
  }
  
  return info;
};

// 兼容性导出
export const MBTI_QUESTIONS = professionalQuickQuestions;