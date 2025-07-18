import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { useUserProfileStore, Achievement } from '../../stores/useUserProfileStore';
import { useTestHistoryStore } from '../../stores/useTestHistoryStore';
import { cn } from '../../utils/cn';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface UserProfileProps {
  className?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'growth' | 'insights' | 'settings'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    birthDate: '',
    birthTime: '',
    tags: [] as string[]
  });

  const {
    profile,
    growthMilestones,
    personalityInsights,
    createProfile,
    updateProfile,
    updateStats,
    checkAchievements,
    unlockAchievement,
    analyzeMilestones,
    generateInsights,
    getPersonalizedRecommendations
  } = useUserProfileStore();

  const { history } = useTestHistoryStore();

  // 初始化和更新用户数据
  useEffect(() => {
    if (!profile && history.length > 0) {
      // 如果有测试历史但没有用户档案，创建一个
      createProfile({
        name: '用户',
        preferences: {
          favoriteTests: [],
          notifications: true,
          privacyLevel: 'private',
          shareResults: false
        }
      });
    }

    if (profile) {
      // 更新统计数据
      updateStats(history);
      
      // 检查新成就
      const newAchievements = checkAchievements(history);
      newAchievements.forEach(achievement => {
        unlockAchievement(achievement);
      });
      
      // 分析成长里程碑
      analyzeMilestones(history);
      
      // 生成个性洞察
      generateInsights(history);
    }
  }, [history, profile]);

  const handleEditProfile = () => {
    if (profile) {
      setEditForm({
        name: profile.name,
        bio: profile.bio || '',
        birthDate: profile.birthDate || '',
        birthTime: profile.birthTime || '',
        tags: profile.tags || []
      });
      setIsEditing(true);
    }
  };

  const handleSaveProfile = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return format(new Date(date), 'yyyy年MM月dd日', { locale: zhCN });
  };

  const getAchievementColor = (rarity: Achievement['rarity']) => {
    const colors = {
      common: 'bg-gray-100 text-gray-700 border-gray-200',
      rare: 'bg-blue-100 text-blue-700 border-blue-200',
      epic: 'bg-purple-100 text-purple-700 border-purple-200',
      legendary: 'bg-yellow-100 text-yellow-700 border-yellow-200'
    };
    return colors[rarity];
  };

  const renderOverview = () => {
    if (!profile) {
      return (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">👋</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">欢迎来到内在宇宙</h3>
          <p className="text-gray-600 mb-4">完成一些测试后，这里会展示你的个人档案</p>
          <Button onClick={() => createProfile({ name: '用户' })}>
            创建个人档案
          </Button>
        </div>
      );
    }

    const recommendations = getPersonalizedRecommendations();

    return (
      <div className="space-y-6">
        {/* 基本信息 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mobile-text-lg">
                  {profile.name}
                </h2>
                {profile.bio && (
                  <p className="text-gray-600 mobile-text-sm mt-1">{profile.bio}</p>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded mobile-text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <Button onClick={handleEditProfile} variant="outline" size="sm">
              编辑
            </Button>
          </div>
        </div>

        {/* 统计概览 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{profile.stats.totalTests}</div>
            <div className="text-gray-600 mobile-text-sm">总测试数</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{profile.stats.currentStreak}</div>
            <div className="text-gray-600 mobile-text-sm">连续天数</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{profile.achievements.length}</div>
            <div className="text-gray-600 mobile-text-sm">获得成就</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{profile.stats.averageTestScore}%</div>
            <div className="text-gray-600 mobile-text-sm">平均准确度</div>
          </div>
        </div>

        {/* 个性化推荐 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4 mobile-text-base">🎯 个性化推荐</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2 mobile-text-sm">推荐测试</h4>
              <div className="space-y-2">
                {recommendations.nextTests.map((test, index) => (
                  <div key={index} className="text-gray-600 mobile-text-xs">
                    • {getTestTypeName(test)}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2 mobile-text-sm">发展领域</h4>
              <div className="space-y-2">
                {recommendations.developmentAreas.map((area, index) => (
                  <div key={index} className="text-gray-600 mobile-text-xs">
                    • {area}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2 mobile-text-sm">日常练习</h4>
              <div className="space-y-2">
                {recommendations.dailyPractices.map((practice, index) => (
                  <div key={index} className="text-gray-600 mobile-text-xs">
                    • {practice}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">🏆 成就系统</h3>
        <p className="text-gray-600 mobile-text-sm">通过完成测试和探索自我来解锁各种成就</p>
      </div>

      {profile?.achievements.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={cn(
                'border-2 rounded-lg p-4',
                getAchievementColor(achievement.rarity)
              )}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium mobile-text-sm">{achievement.title}</h4>
                    <span className="bg-white px-2 py-1 rounded mobile-text-xs font-medium">
                      {achievement.rarity}
                    </span>
                  </div>
                  <p className="text-gray-600 mobile-text-xs mb-2">{achievement.description}</p>
                  <p className="mobile-text-xs opacity-75">
                    解锁于 {formatDate(achievement.unlockedAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-4">🏆</div>
          <p>完成更多测试来解锁成就</p>
        </div>
      )}
    </div>
  );

  const renderGrowth = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">📈 成长轨迹</h3>
        <p className="text-gray-600 mobile-text-sm">记录你的心理成长和重要里程碑</p>
      </div>

      {growthMilestones.length > 0 ? (
        <div className="space-y-4">
          {growthMilestones.map((milestone) => (
            <div key={milestone.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className={cn(
                  'w-3 h-3 rounded-full mt-2',
                  milestone.significance === 'high' ? 'bg-red-500' :
                  milestone.significance === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                )} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900 mobile-text-sm">{milestone.title}</h4>
                    <span className="text-gray-500 mobile-text-xs">
                      {formatDate(milestone.date)}
                    </span>
                  </div>
                  <p className="text-gray-600 mobile-text-xs">{milestone.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-4">📈</div>
          <p>完成更多测试来追踪成长轨迹</p>
        </div>
      )}
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">💡 个性洞察</h3>
        <p className="text-gray-600 mobile-text-sm">基于测试结果生成的个性化分析</p>
      </div>

      {personalityInsights.length > 0 ? (
        <div className="space-y-4">
          {personalityInsights.map((insight) => (
            <div key={insight.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 mobile-text-sm">{insight.title}</h4>
                <span className={cn(
                  'px-2 py-1 rounded mobile-text-xs',
                  insight.category === 'strength' ? 'bg-green-100 text-green-700' :
                  insight.category === 'growth_area' ? 'bg-orange-100 text-orange-700' :
                  insight.category === 'pattern' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                )}>
                  {getCategoryName(insight.category)}
                </span>
              </div>
              <p className="text-gray-600 mobile-text-xs mb-3">{insight.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-gray-500 mobile-text-xs">
                  可信度: {Math.round(insight.confidence * 100)}%
                </div>
                {insight.actionable && insight.actions && (
                  <Button variant="outline" size="sm" className="mobile-text-xs">
                    查看建议
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-4">💡</div>
          <p>完成更多测试来获得个性洞察</p>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">⚙️ 设置</h3>
        <p className="text-gray-600 mobile-text-sm">管理你的个人档案和偏好设置</p>
      </div>

      {/* 编辑表单 */}
      {isEditing && profile && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4 mobile-text-base">编辑个人信息</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mobile-text-sm mb-1">姓名</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mobile-text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 mobile-text-sm mb-1">个人简介</label>
              <textarea
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mobile-text-sm"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mobile-text-sm mb-1">出生日期</label>
                <input
                  type="date"
                  value={editForm.birthDate}
                  onChange={(e) => setEditForm({ ...editForm, birthDate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded mobile-text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 mobile-text-sm mb-1">出生时间</label>
                <input
                  type="time"
                  value={editForm.birthTime}
                  onChange={(e) => setEditForm({ ...editForm, birthTime: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded mobile-text-sm"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSaveProfile}>保存</Button>
              <Button onClick={() => setIsEditing(false)} variant="outline">取消</Button>
            </div>
          </div>
        </div>
      )}

      {/* 偏好设置 */}
      {profile && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4 mobile-text-base">偏好设置</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 mobile-text-sm">推送通知</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={profile.preferences.notifications}
                  onChange={(e) => updateProfile({
                    preferences: {
                      ...profile.preferences,
                      notifications: e.target.checked
                    }
                  })}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 mobile-text-sm">分享测试结果</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={profile.preferences.shareResults}
                  onChange={(e) => updateProfile({
                    preferences: {
                      ...profile.preferences,
                      shareResults: e.target.checked
                    }
                  })}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const tabs = [
    { id: 'overview', label: '概览', icon: '👤' },
    { id: 'achievements', label: '成就', icon: '🏆' },
    { id: 'growth', label: '成长', icon: '📈' },
    { id: 'insights', label: '洞察', icon: '💡' },
    { id: 'settings', label: '设置', icon: '⚙️' }
  ];

  return (
    <Card className={cn('border-0 shadow-lg', className)}>
      <CardHeader>
        <h2 className="text-xl font-bold text-gray-900 mobile-text-lg">
          👤 个人档案
        </h2>
        <p className="text-gray-600 mobile-text-sm">
          管理你的个人信息和追踪成长历程
        </p>
      </CardHeader>

      <CardContent>
        {/* 标签页导航 */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              size="sm"
              className="mobile-text-xs"
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </Button>
          ))}
        </div>

        {/* 内容区域 */}
        <div className="min-h-96">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'achievements' && renderAchievements()}
          {activeTab === 'growth' && renderGrowth()}
          {activeTab === 'insights' && renderInsights()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </CardContent>
    </Card>
  );
};

// 辅助函数
function getTestTypeName(type: string): string {
  const names = {
    'mbti': 'MBTI人格测试',
    'astrology': '星座分析',
    'tarot': '塔罗占卜',
    'bloodtype': '血型分析',
    'palmistry': '手相面相',
    'iching': '易经占卜',
    'aimaster': 'AI大师',
    'meditation': '冥想记录'
  };
  return names[type as keyof typeof names] || type;
}

function getCategoryName(category: string): string {
  const names = {
    'strength': '优势',
    'growth_area': '成长领域',
    'pattern': '模式',
    'recommendation': '建议'
  };
  return names[category as keyof typeof names] || category;
}