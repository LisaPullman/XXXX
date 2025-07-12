import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TestHistory } from './useTestHistoryStore';

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  gender?: 'male' | 'female' | 'other';
  createdAt: Date;
  updatedAt: Date;
  
  // 核心测试结果
  primaryMBTI?: string;
  primaryZodiacSign?: string;
  
  // 偏好设置
  preferences: {
    favoriteTests: string[];
    notifications: boolean;
    privacyLevel: 'public' | 'friends' | 'private';
    shareResults: boolean;
  };
  
  // 统计数据
  stats: {
    totalTests: number;
    testsThisWeek: number;
    testsThisMonth: number;
    longestStreak: number;
    currentStreak: number;
    averageTestScore: number;
  };
  
  // 成就系统
  achievements: Achievement[];
  
  // 个人标签
  tags: string[];
  
  // 个人简介
  bio?: string;
}

export interface Achievement {
  id: string;
  type: 'test_count' | 'streak' | 'accuracy' | 'exploration' | 'social' | 'special';
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress?: number;
  maxProgress?: number;
}

export interface GrowthMilestone {
  id: string;
  date: Date;
  type: 'personality_shift' | 'insight_gained' | 'consistency_noted' | 'growth_area_identified';
  title: string;
  description: string;
  relatedTests: string[];
  significance: 'low' | 'medium' | 'high';
}

export interface PersonalityInsight {
  id: string;
  category: 'strength' | 'growth_area' | 'pattern' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  basedOn: string[];
  actionable: boolean;
  actions?: string[];
}

interface UserProfileState {
  // 用户档案
  profile: UserProfile | null;
  
  // 成长轨迹
  growthMilestones: GrowthMilestone[];
  
  // 个性洞察
  personalityInsights: PersonalityInsight[];
  
  // 操作方法
  createProfile: (data: Partial<UserProfile>) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  deleteProfile: () => void;
  
  // 成就系统
  checkAchievements: (testHistory: TestHistory[]) => Achievement[];
  unlockAchievement: (achievement: Achievement) => void;
  
  // 成长分析
  analyzeMilestones: (testHistory: TestHistory[]) => void;
  addMilestone: (milestone: Omit<GrowthMilestone, 'id'>) => void;
  
  // 洞察生成
  generateInsights: (testHistory: TestHistory[]) => void;
  addInsight: (insight: Omit<PersonalityInsight, 'id'>) => void;
  removeInsight: (id: string) => void;
  
  // 统计更新
  updateStats: (testHistory: TestHistory[]) => void;
  
  // 个性化建议
  getPersonalizedRecommendations: () => {
    nextTests: string[];
    developmentAreas: string[];
    dailyPractices: string[];
  };
}

export const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      growthMilestones: [],
      personalityInsights: [],

      createProfile: (data) => {
        const newProfile: UserProfile = {
          id: generateId(),
          name: data.name || '用户',
          createdAt: new Date(),
          updatedAt: new Date(),
          preferences: {
            favoriteTests: [],
            notifications: true,
            privacyLevel: 'private',
            shareResults: false,
            ...data.preferences
          },
          stats: {
            totalTests: 0,
            testsThisWeek: 0,
            testsThisMonth: 0,
            longestStreak: 0,
            currentStreak: 0,
            averageTestScore: 0,
            ...data.stats
          },
          achievements: [],
          tags: [],
          ...data
        };
        
        set({ profile: newProfile });
      },

      updateProfile: (updates) => {
        set((state) => ({
          profile: state.profile ? {
            ...state.profile,
            ...updates,
            updatedAt: new Date()
          } : null
        }));
      },

      deleteProfile: () => {
        set({
          profile: null,
          growthMilestones: [],
          personalityInsights: []
        });
      },

      checkAchievements: (testHistory) => {
        const { profile } = get();
        if (!profile) return [];

        const newAchievements: Achievement[] = [];
        const existingAchievementIds = new Set(profile.achievements.map(a => a.id));

        // 检查各种成就条件
        const achievements = [
          // 测试数量成就
          {
            id: 'first_test',
            condition: testHistory.length >= 1,
            type: 'test_count' as const,
            title: '初次探索',
            description: '完成了第一次心理测试',
            icon: '🎯',
            rarity: 'common' as const
          },
          {
            id: 'test_explorer',
            condition: testHistory.length >= 10,
            type: 'test_count' as const,
            title: '探索者',
            description: '完成了10次测试',
            icon: '🧭',
            rarity: 'common' as const
          },
          {
            id: 'test_enthusiast',
            condition: testHistory.length >= 50,
            type: 'test_count' as const,
            title: '测试达人',
            description: '完成了50次测试',
            icon: '⭐',
            rarity: 'rare' as const
          },
          {
            id: 'test_master',
            condition: testHistory.length >= 100,
            type: 'test_count' as const,
            title: '测试大师',
            description: '完成了100次测试',
            icon: '👑',
            rarity: 'epic' as const
          },
          
          // 多样性成就
          {
            id: 'diverse_explorer',
            condition: new Set(testHistory.map(t => t.type)).size >= 5,
            type: 'exploration' as const,
            title: '全面探索',
            description: '尝试了5种不同类型的测试',
            icon: '🌈',
            rarity: 'rare' as const
          },
          
          // 连续性成就
          {
            id: 'consistent_tester',
            condition: profile.stats.currentStreak >= 7,
            type: 'streak' as const,
            title: '坚持不懈',
            description: '连续7天进行测试',
            icon: '🔥',
            rarity: 'rare' as const
          },
          
          // 准确性成就
          {
            id: 'high_accuracy',
            condition: profile.stats.averageTestScore >= 90,
            type: 'accuracy' as const,
            title: '精准洞察',
            description: '测试平均准确度达到90%',
            icon: '🎯',
            rarity: 'epic' as const
          }
        ];

        achievements.forEach(achievement => {
          if (achievement.condition && !existingAchievementIds.has(achievement.id)) {
            newAchievements.push({
              ...achievement,
              unlockedAt: new Date()
            });
          }
        });

        return newAchievements;
      },

      unlockAchievement: (achievement) => {
        set((state) => ({
          profile: state.profile ? {
            ...state.profile,
            achievements: [...state.profile.achievements, achievement]
          } : null
        }));
      },

      analyzeMilestones: (testHistory) => {
        const { growthMilestones } = get();
        const newMilestones: GrowthMilestone[] = [];

        // 分析MBTI一致性
        const mbtiTests = testHistory.filter(t => t.type === 'mbti');
        if (mbtiTests.length >= 3) {
          const recentTypes = mbtiTests.slice(0, 3).map(t => t.result.type);
          const allSame = recentTypes.every(type => type === recentTypes[0]);
          
          if (allSame && !growthMilestones.some(m => m.type === 'consistency_noted')) {
            newMilestones.push({
              id: generateId(),
              date: new Date(),
              type: 'consistency_noted',
              title: 'MBTI类型稳定',
              description: `连续多次测试都显示为${recentTypes[0]}类型，表明你对自己有稳定的认知`,
              relatedTests: mbtiTests.slice(0, 3).map(t => t.id),
              significance: 'medium'
            });
          }
        }

        // 分析测试频率变化
        const recentTests = testHistory.filter(t => {
          const testDate = new Date(t.completedAt);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return testDate >= thirtyDaysAgo;
        });

        if (recentTests.length >= 10 && !growthMilestones.some(m => m.type === 'insight_gained')) {
          newMilestones.push({
            id: generateId(),
            date: new Date(),
            type: 'insight_gained',
            title: '自我探索加速',
            description: '最近一个月测试频率显著增加，显示出强烈的自我认知欲望',
            relatedTests: recentTests.map(t => t.id),
            significance: 'high'
          });
        }

        newMilestones.forEach(milestone => {
          get().addMilestone(milestone);
        });
      },

      addMilestone: (milestone) => {
        set((state) => ({
          growthMilestones: [
            { ...milestone, id: generateId() },
            ...state.growthMilestones
          ]
        }));
      },

      generateInsights: (testHistory) => {
        const { profile } = get();
        if (!profile) return;

        const newInsights: PersonalityInsight[] = [];

        // 分析测试偏好
        const testTypeCounts = testHistory.reduce((acc, test) => {
          acc[test.type] = (acc[test.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const favoriteTestType = Object.entries(testTypeCounts)
          .sort(([,a], [,b]) => b - a)[0];

        if (favoriteTestType && favoriteTestType[1] >= 3) {
          const testTypeNames = {
            'mbti': 'MBTI人格测试',
            'astrology': '星座分析',
            'tarot': '塔罗占卜',
            'bloodtype': '血型分析',
            'palmistry': '手相面相',
            'iching': '易经占卜',
            'aimaster': 'AI大师',
            'meditation': '冥想记录'
          };

          newInsights.push({
            id: generateId(),
            category: 'pattern',
            title: '测试偏好模式',
            description: `你特别偏爱${testTypeNames[favoriteTestType[0] as keyof typeof testTypeNames]}，这反映了你对${getTestFocus(favoriteTestType[0])}的关注`,
            confidence: 0.8,
            basedOn: [`${favoriteTestType[1]}次${testTypeNames[favoriteTestType[0] as keyof typeof testTypeNames]}`],
            actionable: true,
            actions: ['尝试其他类型的测试来获得更全面的自我认知', '深入研究你偏爱测试类型的相关知识']
          });
        }

        // 分析MBTI一致性
        const mbtiTests = testHistory.filter(t => t.type === 'mbti');
        if (mbtiTests.length >= 2) {
          const types = mbtiTests.map(t => t.result.type);
          const uniqueTypes = new Set(types);

          if (uniqueTypes.size === 1) {
            newInsights.push({
              id: generateId(),
              category: 'strength',
              title: '自我认知清晰',
              description: '你的MBTI测试结果非常一致，说明你对自己的性格特质有清晰的认知',
              confidence: 0.9,
              basedOn: [`${mbtiTests.length}次一致的MBTI测试结果`],
              actionable: true,
              actions: ['继续发挥你的性格优势', '帮助他人了解MBTI人格类型']
            });
          } else if (uniqueTypes.size >= 3) {
            newInsights.push({
              id: generateId(),
              category: 'growth_area',
              title: '性格发展阶段',
              description: 'MBTI测试结果的变化可能表明你正在经历性格发展的重要阶段',
              confidence: 0.7,
              basedOn: [`${uniqueTypes.size}种不同的MBTI结果`],
              actionable: true,
              actions: ['深入反思最近的生活变化', '寻求专业的性格发展指导', '保持开放心态拥抱成长']
            });
          }
        }

        newInsights.forEach(insight => {
          get().addInsight(insight);
        });
      },

      addInsight: (insight) => {
        set((state) => ({
          personalityInsights: [
            { ...insight, id: generateId() },
            ...state.personalityInsights
          ]
        }));
      },

      removeInsight: (id) => {
        set((state) => ({
          personalityInsights: state.personalityInsights.filter(i => i.id !== id)
        }));
      },

      updateStats: (testHistory) => {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        const testsThisWeek = testHistory.filter(t => 
          new Date(t.completedAt) >= oneWeekAgo
        ).length;

        const testsThisMonth = testHistory.filter(t => 
          new Date(t.completedAt) >= oneMonthAgo
        ).length;

        // 计算连续天数
        const currentStreak = calculateStreak(testHistory);
        
        // 计算平均分数
        const testsWithScores = testHistory.filter(t => t.confidence !== undefined);
        const averageTestScore = testsWithScores.length > 0
          ? testsWithScores.reduce((sum, t) => sum + (t.confidence || 0), 0) / testsWithScores.length
          : 0;

        set((state) => ({
          profile: state.profile ? {
            ...state.profile,
            stats: {
              ...state.profile.stats,
              totalTests: testHistory.length,
              testsThisWeek,
              testsThisMonth,
              currentStreak,
              longestStreak: Math.max(state.profile.stats.longestStreak, currentStreak),
              averageTestScore: Math.round(averageTestScore)
            }
          } : null
        }));
      },

      getPersonalizedRecommendations: () => {
        const { profile, personalityInsights } = get();
        
        if (!profile) {
          return {
            nextTests: ['mbti', 'astrology'],
            developmentAreas: ['自我认知', '性格发展'],
            dailyPractices: ['自我反思', '冥想练习']
          };
        }

        const recommendations = {
          nextTests: [] as string[],
          developmentAreas: [] as string[],
          dailyPractices: [] as string[]
        };

        // 基于已完成测试推荐
        const completedTestTypes = new Set(profile.preferences.favoriteTests);
        const allTestTypes = ['mbti', 'astrology', 'tarot', 'bloodtype', 'palmistry', 'iching', 'aimaster', 'meditation'];
        
        recommendations.nextTests = allTestTypes
          .filter(type => !completedTestTypes.has(type))
          .slice(0, 3);

        // 基于洞察推荐发展领域
        const growthInsights = personalityInsights.filter(i => i.category === 'growth_area');
        recommendations.developmentAreas = growthInsights
          .map(i => i.title)
          .slice(0, 3);

        // 基于性格特点推荐日常练习
        if (profile.primaryMBTI) {
          recommendations.dailyPractices = getDailyPracticesForMBTI(profile.primaryMBTI);
        } else {
          recommendations.dailyPractices = ['自我反思', '冥想练习', '感恩练习'];
        }

        return recommendations;
      }
    }),
    {
      name: 'user-profile-storage',
      version: 1
    }
  )
);

// 辅助函数
function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function calculateStreak(testHistory: TestHistory[]): number {
  if (testHistory.length === 0) return 0;

  const sortedTests = testHistory
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const test of sortedTests) {
    const testDate = new Date(test.completedAt);
    testDate.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((currentDate.getTime() - testDate.getTime()) / (24 * 60 * 60 * 1000));

    if (daysDiff === streak) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (daysDiff > streak) {
      break;
    }
  }

  return streak;
}

function getTestFocus(testType: string): string {
  const focuses = {
    'mbti': '性格类型和心理功能',
    'astrology': '宇宙能量和天体影响',
    'tarot': '直觉洞察和灵性指导',
    'bloodtype': '生理特征和性格倾向',
    'palmistry': '手相学和面相学',
    'iching': '东方智慧和变化规律',
    'aimaster': '综合分析和人工智能',
    'meditation': '内在平静和心灵成长'
  };
  
  return focuses[testType as keyof typeof focuses] || '自我认知';
}

function getDailyPracticesForMBTI(mbtiType: string): string[] {
  const practices = {
    'INTJ': ['深度思考时间', '长期规划练习', '创意表达'],
    'INFJ': ['冥想练习', '写作反思', '帮助他人'],
    'ISTJ': ['日程规划', '技能学习', '传统文化学习'],
    'ISFJ': ['关爱他人', '社区服务', '艺术欣赏'],
    'INFP': ['创意写作', '价值观反思', '自然连接'],
    'INTP': ['逻辑思考', '理论学习', '问题解决'],
    'ESTP': ['体育运动', '社交活动', '实践学习'],
    'ESFP': ['艺术表达', '人际交往', '新体验'],
    'ENFP': ['创意项目', '社交网络', '灵感收集'],
    'ENTP': ['头脑风暴', '辩论讨论', '创新尝试'],
    'ESTJ': ['目标设定', '团队领导', '效率优化'],
    'ESFJ': ['人际关系', '社区参与', '传统活动'],
    'ENFJ': ['指导他人', '团队建设', '社会服务'],
    'ENTJ': ['战略规划', '领导实践', '效率提升'],
    'ISTP': ['技能练习', '独立项目', '问题解决'],
    'ISFP': ['艺术创作', '自然体验', '个人价值']
  };

  return practices[mbtiType as keyof typeof practices] || ['自我反思', '目标设定', '技能学习'];
}