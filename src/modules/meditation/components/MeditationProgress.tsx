import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { MeditationProgress, Achievement, MeditationInsight } from '../types';
import { MeditationService } from '../services';
import { cn } from '../../../utils/cn';

interface MeditationProgressProps {
  className?: string;
}

export const MeditationProgressComponent: React.FC<MeditationProgressProps> = ({
  className
}) => {
  const [currentTab, setCurrentTab] = useState<'overview' | 'achievements' | 'insights' | 'goals'>('overview');
  
  const progress = MeditationService.getMeditationProgress();
  const statistics = MeditationService.getStatistics();
  const weeklyInsight = MeditationService.generateInsights('week');
  const monthlyInsight = MeditationService.generateInsights('month');

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}小时${mins}分钟` : `${mins}分钟`;
  };

  const getStreakColor = (streak: number): string => {
    if (streak >= 30) return 'from-purple-500 to-pink-500';
    if (streak >= 14) return 'from-blue-500 to-indigo-500';
    if (streak >= 7) return 'from-green-500 to-teal-500';
    return 'from-gray-400 to-gray-500';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* 核心统计 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600 mb-1">
              {statistics.totalSessions}
            </div>
            <div className="text-sm text-gray-600">总会话数</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {formatTime(statistics.totalMinutes)}
            </div>
            <div className="text-sm text-gray-600">总冥想时长</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {statistics.currentStreak}
            </div>
            <div className="text-sm text-gray-600">当前连击</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {statistics.longestStreak}
            </div>
            <div className="text-sm text-gray-600">最长连击</div>
          </CardContent>
        </Card>
      </div>

      {/* 连击展示 */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-800">连击记录</h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold',
              `bg-gradient-to-r ${getStreakColor(statistics.currentStreak)}`
            )}>
              🔥
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {statistics.currentStreak} 天
              </div>
              <div className="text-sm text-gray-600">
                连续冥想 • 最长记录: {statistics.longestStreak} 天
              </div>
            </div>
          </div>
          
          {/* 连击进度条 */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>距离下一个里程碑</span>
              <span>{Math.min(statistics.currentStreak, 30)}/30 天</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  `bg-gradient-to-r ${getStreakColor(statistics.currentStreak)}`
                )}
                style={{ width: `${Math.min((statistics.currentStreak / 30) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 本周目标 */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-800">本周目标</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>冥想时长</span>
              <span>{formatTime(statistics.weeklyProgress)} / {formatTime(statistics.weeklyGoal)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((statistics.weeklyProgress / statistics.weeklyGoal) * 100, 100)}%` }}
              ></div>
            </div>
            {statistics.weeklyProgress >= statistics.weeklyGoal && (
              <div className="text-center text-green-600 font-medium">
                🎉 恭喜您完成了本周目标！
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 最近洞察 */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-800">本周洞察</h3>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">练习频率</h4>
              <div className="text-sm text-blue-700">
                本周完成 {weeklyInsight.metrics.totalSessions} 次冥想，
                趋势: {weeklyInsight.trends.sessionFrequency === 'increasing' ? '📈 增长' : '📊 稳定'}
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">情绪改善</h4>
              <div className="text-sm text-green-700">
                平均情绪提升 {weeklyInsight.metrics.moodImprovement.toFixed(1)} 分，
                趋势: {weeklyInsight.trends.moodTrend === 'improving' ? '😊 改善' : '😌 稳定'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">成就徽章</h3>
        <p className="text-gray-600">您已解锁 {progress.achievements.length} 个成就</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {progress.achievements.map(achievement => (
          <Card key={achievement.id} className="text-center">
            <CardContent className="p-6">
              <div className="text-4xl mb-3">{achievement.icon}</div>
              <h4 className="font-semibold text-gray-800 mb-1">{achievement.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
              <div className="text-xs text-gray-500">
                解锁于 {new Date(achievement.unlockedAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 未解锁成就预览 */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">即将解锁</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MeditationService.getAchievements()
            .filter(a => !progress.achievements.some(p => p.id === a.id))
            .slice(0, 3)
            .map(achievement => (
              <Card key={achievement.id} className="text-center opacity-60">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3 grayscale">{achievement.icon}</div>
                  <h4 className="font-semibold text-gray-600 mb-1">{achievement.title}</h4>
                  <p className="text-sm text-gray-500 mb-2">{achievement.description}</p>
                  <div className="text-xs text-gray-400">
                    要求: {achievement.requirement}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-6">
      {/* 月度分析 */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-800">月度分析报告</h3>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">练习数据</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>总会话数:</span>
                    <span className="font-medium">{monthlyInsight.metrics.totalSessions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>总时长:</span>
                    <span className="font-medium">{formatTime(monthlyInsight.metrics.totalMinutes)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>平均评分:</span>
                    <span className="font-medium">{monthlyInsight.metrics.averageRating}/5</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">个人偏好</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>最佳时段:</span>
                    <span className="font-medium">
                      {monthlyInsight.metrics.preferredTime === 'morning' ? '早晨' :
                       monthlyInsight.metrics.preferredTime === 'afternoon' ? '下午' : '晚上'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>喜爱类型:</span>
                    <span className="font-medium">{monthlyInsight.metrics.favoriteCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>坚持度:</span>
                    <span className="font-medium">{monthlyInsight.metrics.consistencyScore}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 mb-2">趋势分析</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>练习频率:</span>
                    <span className="flex items-center">
                      {monthlyInsight.trends.sessionFrequency === 'increasing' ? '📈' : '📊'}
                      <span className="ml-1 font-medium">
                        {monthlyInsight.trends.sessionFrequency === 'increasing' ? '增长' : '稳定'}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>会话时长:</span>
                    <span className="flex items-center">
                      {monthlyInsight.trends.sessionLength === 'increasing' ? '📈' : 
                       monthlyInsight.trends.sessionLength === 'decreasing' ? '📉' : '📊'}
                      <span className="ml-1 font-medium">
                        {monthlyInsight.trends.sessionLength === 'increasing' ? '增长' :
                         monthlyInsight.trends.sessionLength === 'decreasing' ? '下降' : '稳定'}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>情绪状态:</span>
                    <span className="flex items-center">
                      {monthlyInsight.trends.moodTrend === 'improving' ? '😊' : '😌'}
                      <span className="ml-1 font-medium">
                        {monthlyInsight.trends.moodTrend === 'improving' ? '改善' : '稳定'}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">个性化建议</h4>
                <div className="space-y-2">
                  {monthlyInsight.recommendations.slice(0, 3).map((rec, index) => (
                    <div key={index} className="text-sm text-yellow-700 flex items-start">
                      <span className="text-yellow-500 mr-1 mt-0.5">•</span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className={cn('max-w-6xl mx-auto p-4', className)}>
      {/* 标题 */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-3xl mb-4">
          📊
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">冥想进度</h2>
        <p className="text-gray-600">追踪您的冥想成长之路</p>
      </div>

      {/* 标签页导航 */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1 flex space-x-1">
          {[
            { id: 'overview', label: '总览', icon: '📊' },
            { id: 'achievements', label: '成就', icon: '🏆' },
            { id: 'insights', label: '洞察', icon: '💡' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as any)}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2',
                currentTab === tab.id
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              )}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 标签页内容 */}
      {currentTab === 'overview' && renderOverview()}
      {currentTab === 'achievements' && renderAchievements()}
      {currentTab === 'insights' && renderInsights()}
    </div>
  );
};