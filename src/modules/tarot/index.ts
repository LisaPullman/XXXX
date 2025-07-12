// 塔罗牌模块导出
export { TarotReading } from './components/TarotReading';
export { TarotResult } from './components/TarotResult';
export { TarotLibrary } from './components/TarotLibrary';
export { TarotService } from './services';
export { TarotCalculator } from './utils/tarotCalculator';
export { allTarotCards, tarotSpreads, getDailyCard } from './data/tarotData';
export * from './types';

// 塔罗模块信息
export const tarotModuleInfo = {
  name: '塔罗占卜',
  description: '专业的塔罗牌占卜系统，包含78张完整牌库和多种牌阵',
  version: '1.0.0',
  features: [
    '78张完整塔罗牌库',
    '多种经典牌阵',
    '智能解读系统',
    '每日塔罗指引',
    '学习进度追踪',
    '塔罗日记功能'
  ],
  emoji: '🔮'
};