import React, { useState } from 'react';
import { MeditationTimer } from './MeditationTimer';
import { MeditationCourseComponent } from './MeditationCourse';
import { BreathingExerciseComponent } from './BreathingExercise';
import { MeditationProgressComponent } from './MeditationProgress';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent } from '../../../components/ui/Card';
import { MeditationService } from '../services';
import { MoodLevel } from '../types';
import { cn } from '../../../utils/cn';

interface MeditationTestProps {
  onComplete?: (result: any) => void;
  className?: string;
}

type View = 'home' | 'timer' | 'courses' | 'breathing' | 'progress' | 'session-complete';

interface SessionComplete {
  type: 'timer' | 'course' | 'breathing';
  duration: number;
  courseId?: string;
  sessionId?: string;
  exerciseId?: string;
}

export const MeditationTest: React.FC<MeditationTestProps> = ({
  onComplete,
  className
}) => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [sessionComplete, setSessionComplete] = useState<SessionComplete | null>(null);
  const [completionData, setCompletionData] = useState({
    moodBefore: 5 as MoodLevel,
    moodAfter: 5 as MoodLevel,
    rating: 5,
    notes: ''
  });

  const statistics = MeditationService.getStatistics();

  const handleTimerComplete = (duration: number) => {
    setSessionComplete({ type: 'timer', duration });
    setCurrentView('session-complete');
  };

  const handleCourseComplete = (courseId: string, sessionId: string, duration: number) => {
    setSessionComplete({ type: 'course', duration, courseId, sessionId });
    setCurrentView('session-complete');
  };

  const handleBreathingComplete = (exerciseId: string, duration: number) => {
    setSessionComplete({ type: 'breathing', duration, exerciseId });
    setCurrentView('session-complete');
  };

  const handleSessionSubmit = async () => {
    if (!sessionComplete) return;

    try {
      // 创建并完成冥想会话记录
      const sessionId = await MeditationService.startMeditationSession(
        sessionComplete.type,
        sessionComplete.courseId,
        sessionComplete.sessionId,
        sessionComplete.duration
      );

      await MeditationService.completeMeditationSession(
        sessionId,
        sessionComplete.duration,
        completionData.moodBefore,
        completionData.moodAfter,
        completionData.rating,
        completionData.notes
      );

      // 如果有完成回调，调用它
      if (onComplete) {
        onComplete({
          type: sessionComplete.type,
          duration: sessionComplete.duration,
          rating: completionData.rating,
          moodImprovement: completionData.moodAfter - completionData.moodBefore
        });
      }

      // 返回主页
      setCurrentView('home');
      setSessionComplete(null);
      setCompletionData({
        moodBefore: 5,
        moodAfter: 5,
        rating: 5,
        notes: ''
      });
    } catch (error) {
      console.error('保存冥想记录失败:', error);
    }
  };

  // 主页视图
  if (currentView === 'home') {
    return (
      <div className={cn('max-w-6xl mx-auto p-4', className)}>
        {/* 欢迎区域 */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-4xl mb-6">
            🧘‍♀️
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            内在宇宙冥想空间
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            在这里找到内心的平静，开启专属于您的冥想之旅
          </p>
          
          {/* 统计信息 */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{statistics.totalSessions}</div>
                <div className="text-sm text-gray-600">总会话</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{Math.floor(statistics.totalMinutes / 60)}h</div>
                <div className="text-sm text-gray-600">总时长</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{statistics.currentStreak}</div>
                <div className="text-sm text-gray-600">连击天数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{statistics.achievements}</div>
                <div className="text-sm text-gray-600">成就数量</div>
              </div>
            </div>
          </div>
        </div>

        {/* 功能卡片 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 冥想计时器 */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            onClick={() => setCurrentView('timer')}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-2xl mb-4">
                ⏰
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">自由冥想</h3>
              <p className="text-gray-600 text-sm mb-4">
                设定时间，在静谧中探索内心
              </p>
              <div className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                5-90分钟
              </div>
            </CardContent>
          </Card>

          {/* 引导冥想 */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            onClick={() => setCurrentView('courses')}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center text-2xl mb-4">
                🎧
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">引导课程</h3>
              <p className="text-gray-600 text-sm mb-4">
                跟随专业导师，系统学习冥想技巧
              </p>
              <div className="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
                {MeditationService.getCourses().length}个课程
              </div>
            </CardContent>
          </Card>

          {/* 呼吸练习 */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            onClick={() => setCurrentView('breathing')}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-2xl mb-4">
                🌬️
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">呼吸练习</h3>
              <p className="text-gray-600 text-sm mb-4">
                掌握呼吸技巧，调节身心状态
              </p>
              <div className="text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                {MeditationService.getBreathingExercises().length}种方法
              </div>
            </CardContent>
          </Card>

          {/* 进度统计 */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            onClick={() => setCurrentView('progress')}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-2xl mb-4">
                📊
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">进度统计</h3>
              <p className="text-gray-600 text-sm mb-4">
                查看您的冥想成长历程
              </p>
              <div className="text-xs text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                详细分析
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 今日建议 */}
        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-xl">
                  💡
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">今日冥想建议</h3>
                  <p className="text-gray-600 mb-3">
                    {statistics.currentStreak === 0
                      ? "今天是开始冥想之旅的好日子！建议从5-10分钟的简单练习开始。"
                      : statistics.currentStreak < 7
                      ? "您已经坚持了几天，很棒！继续保持每日练习的习惯。"
                      : "您的冥想习惯已经很稳定了！可以尝试更深入的练习或新的冥想类型。"
                    }
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                      推荐时长: {statistics.totalSessions < 10 ? '10-15分钟' : '15-20分钟'}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      最佳时间: 早晨或睡前
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 会话完成视图
  if (currentView === 'session-complete' && sessionComplete) {
    return (
      <div className={cn('max-w-2xl mx-auto p-4', className)}>
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center text-3xl mb-6">
              ✨
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              冥想完成！
            </h2>
            
            <p className="text-gray-600 mb-6">
              恭喜您完成了 {Math.round(sessionComplete.duration)} 分钟的冥想练习
            </p>

            <div className="space-y-6">
              {/* 心情评价 */}
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  练习前后心情评价 (1-10分)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">练习前</label>
                    <select
                      value={completionData.moodBefore}
                      onChange={(e) => setCompletionData(prev => ({
                        ...prev,
                        moodBefore: parseInt(e.target.value) as MoodLevel
                      }))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num}分</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">练习后</label>
                    <select
                      value={completionData.moodAfter}
                      onChange={(e) => setCompletionData(prev => ({
                        ...prev,
                        moodAfter: parseInt(e.target.value) as MoodLevel
                      }))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num}分</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 整体评分 */}
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  本次练习整体评分
                </label>
                <div className="flex justify-center space-x-2">
                  {[1,2,3,4,5].map(star => (
                    <button
                      key={star}
                      onClick={() => setCompletionData(prev => ({ ...prev, rating: star }))}
                      className={cn(
                        'text-2xl transition-colors',
                        star <= completionData.rating ? 'text-yellow-400' : 'text-gray-300'
                      )}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>

              {/* 练习笔记 */}
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  练习感受 (可选)
                </label>
                <textarea
                  value={completionData.notes}
                  onChange={(e) => setCompletionData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="记录您在这次冥想中的感受、体会或想法..."
                  className="w-full p-3 border border-gray-300 rounded-md resize-none"
                  rows={3}
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentView('home');
                    setSessionComplete(null);
                  }}
                  className="flex-1"
                >
                  跳过记录
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSessionSubmit}
                  className="flex-1"
                >
                  保存记录
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 其他视图
  return (
    <div className={className}>
      {/* 返回按钮 */}
      {currentView !== 'home' && currentView !== 'session-complete' && (
        <div className="mb-4">
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('home')}
          >
            ← 返回主页
          </Button>
        </div>
      )}

      {currentView === 'timer' && (
        <MeditationTimer onComplete={handleTimerComplete} />
      )}
      
      {currentView === 'courses' && (
        <MeditationCourseComponent onSessionComplete={handleCourseComplete} />
      )}
      
      {currentView === 'breathing' && (
        <BreathingExerciseComponent onComplete={handleBreathingComplete} />
      )}
      
      {currentView === 'progress' && (
        <MeditationProgressComponent />
      )}
    </div>
  );
};