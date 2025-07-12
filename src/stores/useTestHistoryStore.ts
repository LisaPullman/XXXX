import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MBTIResult } from '../modules/mbti/types';
import type { AstrologyResult } from '../modules/astrology/types';

export interface TestHistory {
  id: string;
  type: 'mbti' | 'astrology' | 'tarot' | 'bloodtype' | 'palmistry' | 'iching' | 'aimaster' | 'meditation';
  result: any;
  completedAt: Date;
  mode?: string;
  confidence?: number;
  metadata?: Record<string, any>;
}

export interface ComparisonData {
  id: string;
  name: string;
  tests: TestHistory[];
  createdAt: Date;
  notes?: string;
}

interface TestHistoryState {
  // 测试历史
  history: TestHistory[];
  
  // 对比数据
  comparisons: ComparisonData[];
  
  // 当前选中的对比项
  selectedComparison: ComparisonData | null;
  
  // 操作方法
  addTestResult: (test: Omit<TestHistory, 'id' | 'completedAt'>) => void;
  removeTestResult: (id: string) => void;
  getTestsByType: (type: TestHistory['type']) => TestHistory[];
  getRecentTests: (limit?: number) => TestHistory[];
  
  // 对比功能
  createComparison: (name: string, testIds: string[]) => void;
  addToComparison: (comparisonId: string, testId: string) => void;
  removeFromComparison: (comparisonId: string, testId: string) => void;
  deleteComparison: (id: string) => void;
  setSelectedComparison: (comparison: ComparisonData | null) => void;
  
  // 统计分析
  getTestStats: () => {
    totalTests: number;
    testsByType: Record<string, number>;
    testsThisMonth: number;
    averageConfidence: number;
  };
  
  // 成长轨迹
  getGrowthTrajectory: (type: TestHistory['type']) => {
    timeline: Array<{
      date: Date;
      result: any;
      changes: string[];
    }>;
    trends: string[];
  };
  
  // 清理旧数据
  clearOldData: (olderThanDays: number) => void;
}

export const useTestHistoryStore = create<TestHistoryState>()(
  persist(
    (set, get) => ({
      history: [],
      comparisons: [],
      selectedComparison: null,

      addTestResult: (test) => {
        const newTest: TestHistory = {
          ...test,
          id: generateId(),
          completedAt: new Date()
        };
        
        set((state) => ({
          history: [newTest, ...state.history]
        }));
      },

      removeTestResult: (id) => {
        set((state) => ({
          history: state.history.filter(test => test.id !== id),
          comparisons: state.comparisons.map(comp => ({
            ...comp,
            tests: comp.tests.filter(test => test.id !== id)
          }))
        }));
      },

      getTestsByType: (type) => {
        return get().history.filter(test => test.type === type);
      },

      getRecentTests: (limit = 10) => {
        return get().history
          .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
          .slice(0, limit);
      },

      createComparison: (name, testIds) => {
        const { history } = get();
        const tests = history.filter(test => testIds.includes(test.id));
        
        const newComparison: ComparisonData = {
          id: generateId(),
          name,
          tests,
          createdAt: new Date()
        };
        
        set((state) => ({
          comparisons: [newComparison, ...state.comparisons]
        }));
      },

      addToComparison: (comparisonId, testId) => {
        const { history } = get();
        const test = history.find(t => t.id === testId);
        
        if (test) {
          set((state) => ({
            comparisons: state.comparisons.map(comp =>
              comp.id === comparisonId
                ? { ...comp, tests: [...comp.tests, test] }
                : comp
            )
          }));
        }
      },

      removeFromComparison: (comparisonId, testId) => {
        set((state) => ({
          comparisons: state.comparisons.map(comp =>
            comp.id === comparisonId
              ? { ...comp, tests: comp.tests.filter(test => test.id !== testId) }
              : comp
          )
        }));
      },

      deleteComparison: (id) => {
        set((state) => ({
          comparisons: state.comparisons.filter(comp => comp.id !== id),
          selectedComparison: state.selectedComparison?.id === id ? null : state.selectedComparison
        }));
      },

      setSelectedComparison: (comparison) => {
        set({ selectedComparison: comparison });
      },

      getTestStats: () => {
        const { history } = get();
        const now = new Date();
        const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        
        const testsByType = history.reduce((acc, test) => {
          acc[test.type] = (acc[test.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        const testsThisMonth = history.filter(
          test => new Date(test.completedAt) >= thisMonth
        ).length;
        
        const confidenceTests = history.filter(test => test.confidence !== undefined);
        const averageConfidence = confidenceTests.length > 0
          ? confidenceTests.reduce((sum, test) => sum + (test.confidence || 0), 0) / confidenceTests.length
          : 0;
        
        return {
          totalTests: history.length,
          testsByType,
          testsThisMonth,
          averageConfidence: Math.round(averageConfidence)
        };
      },

      getGrowthTrajectory: (type) => {
        const { history } = get();
        const typeTests = history
          .filter(test => test.type === type)
          .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime());
        
        const timeline = typeTests.map((test, index) => {
          const changes = [];
          
          if (index > 0) {
            const prevTest = typeTests[index - 1];
            changes.push(...analyzeChanges(prevTest.result, test.result, type));
          }
          
          return {
            date: new Date(test.completedAt),
            result: test.result,
            changes
          };
        });
        
        const trends = analyzeTrends(typeTests, type);
        
        return { timeline, trends };
      },

      clearOldData: (olderThanDays) => {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);
        
        set((state) => ({
          history: state.history.filter(
            test => new Date(test.completedAt) >= cutoffDate
          ),
          comparisons: state.comparisons.filter(
            comp => new Date(comp.createdAt) >= cutoffDate
          )
        }));
      }
    }),
    {
      name: 'test-history-storage',
      version: 1
    }
  )
);

// 辅助函数
function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function analyzeChanges(prevResult: any, currentResult: any, type: TestHistory['type']): string[] {
  const changes: string[] = [];
  
  switch (type) {
    case 'mbti':
      if (prevResult.type !== currentResult.type) {
        changes.push(`MBTI类型从 ${prevResult.type} 变为 ${currentResult.type}`);
      }
      
      // 分析维度变化
      const prevDim = prevResult.dimensions;
      const currDim = currentResult.dimensions;
      
      if (Math.abs(prevDim.E - currDim.E) > 10) {
        changes.push(`外向性得分变化 ${Math.abs(prevDim.E - currDim.E)} 分`);
      }
      if (Math.abs(prevDim.S - currDim.S) > 10) {
        changes.push(`感知偏好发生明显变化`);
      }
      if (Math.abs(prevDim.T - currDim.T) > 10) {
        changes.push(`决策方式偏好发生变化`);
      }
      if (Math.abs(prevDim.J - currDim.J) > 10) {
        changes.push(`生活方式偏好发生变化`);
      }
      break;
      
    case 'astrology':
      if (prevResult.sign !== currentResult.sign) {
        changes.push(`星座结果发生变化（可能是边界日期的影响）`);
      }
      break;
      
    default:
      // 通用变化检测
      if (JSON.stringify(prevResult) !== JSON.stringify(currentResult)) {
        changes.push('测试结果发生了变化');
      }
  }
  
  return changes;
}

function analyzeTrends(tests: TestHistory[], type: TestHistory['type']): string[] {
  const trends: string[] = [];
  
  if (tests.length < 2) {
    return ['测试次数不足，无法分析趋势'];
  }
  
  switch (type) {
    case 'mbti':
      // 分析MBTI稳定性
      const mbtiTypes = tests.map(test => test.result.type);
      const uniqueTypes = new Set(mbtiTypes);
      
      if (uniqueTypes.size === 1) {
        trends.push('MBTI类型非常稳定，表明你对自己有清晰的认知');
      } else if (uniqueTypes.size === 2) {
        trends.push('MBTI类型在两种之间变化，可能处于性格发展的过渡期');
      } else {
        trends.push('MBTI类型变化较大，建议深入了解自己的核心特质');
      }
      
      // 分析置信度趋势
      const confidences = tests
        .map(test => test.result.confidence)
        .filter(c => c !== undefined);
      
      if (confidences.length >= 2) {
        const trend = confidences[confidences.length - 1] - confidences[0];
        if (trend > 5) {
          trends.push('测试准确性呈上升趋势，自我认知不断清晰');
        } else if (trend < -5) {
          trends.push('测试结果的确定性有所下降，可能正在经历内在变化');
        }
      }
      break;
      
    default:
      trends.push('持续关注自己的成长和变化');
  }
  
  return trends;
}