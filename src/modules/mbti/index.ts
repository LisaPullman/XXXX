// MBTI人格测试模块入口文件
export { default as MBTITest } from './components/MBTITest';
export { default as MBTIResult } from './components/MBTIResult';
export { default as MBTIComparison } from './components/MBTIComparison';
export { default as MBTICareerMatch } from './components/MBTICareerMatch';
export { default as MBTIRelationshipMatch } from './components/MBTIRelationshipMatch';
export { default as MBTIProfessionalReport } from './components/MBTIProfessionalReport';
export { default as MBTIPersonalityTraits } from './components/MBTIPersonalityTraits';
export { default as MBTIGrowthPlan } from './components/MBTIGrowthPlan';
export { default as MBTIHistoryTracker } from './components/MBTIHistoryTracker';

// 导出类型定义
export * from './types';

// 导出工具函数
export * from './utils/mbtiCalculator';
export * from './utils/mbtiAnalyzer';
export * from './utils/mbtiCompatibility';
export * from './utils/mbtiCareerMatcher';

// 导出数据
export * from './data/mbtiQuestions';
export * from './data/mbtiTypes';
export * from './data/mbtiCareers';
export * from './data/mbtiCompatibility';

// 导出服务
export * from './services/mbtiApiService';
export * from './services/mbtiReportService';