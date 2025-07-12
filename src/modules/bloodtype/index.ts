// 血型分析模块导出
export { BloodTypeTest } from './components/BloodTypeTest';
export { BloodTypeResult } from './components/BloodTypeResult';
export { BloodTypeCompatibility } from './components/BloodTypeCompatibility';
export { BloodTypeService } from './services';
export { BloodTypeCalculator } from './utils/bloodTypeCalculator';
export { bloodTypeDatabase } from './data/bloodTypeData';
export * from './types';

// 血型分析模块信息
export const bloodTypeModuleInfo = {
  name: '血型分析',
  description: '基于血型的性格分析与配对测试',
  version: '1.0.0',
  features: [
    '血型性格分析',
    '血型配对测试',
    '健康风险评估',
    '每日建议',
    '职业指导',
    '人际关系建议'
  ],
  emoji: '🩸'
};