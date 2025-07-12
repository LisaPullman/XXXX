import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { MeditationCourse, MeditationSession } from '../types';
import { MeditationService } from '../services';
import { cn } from '../../../utils/cn';

interface MeditationCourseComponentProps {
  onSessionComplete: (courseId: string, sessionId: string, duration: number) => void;
  className?: string;
}

export const MeditationCourseComponent: React.FC<MeditationCourseComponentProps> = ({
  onSessionComplete,
  className
}) => {
  const [selectedCourse, setSelectedCourse] = useState<MeditationCourse | null>(null);
  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null);
  const [currentStep, setCurrentStep] = useState<'courses' | 'sessions' | 'session-detail' | 'practice'>('courses');
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionProgress, setSessionProgress] = useState(0);

  const courses = MeditationService.getCourses();

  const handleCourseSelect = (course: MeditationCourse) => {
    setSelectedCourse(course);
    setCurrentStep('sessions');
  };

  const handleSessionSelect = (session: MeditationSession) => {
    setSelectedSession(session);
    setCurrentStep('session-detail');
  };

  const handleStartSession = () => {
    setCurrentStep('practice');
    setIsPlaying(true);
    
    // 模拟会话进度
    const progressInterval = setInterval(() => {
      setSessionProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsPlaying(false);
          if (selectedCourse && selectedSession) {
            onSessionComplete(selectedCourse.id, selectedSession.id, selectedSession.duration);
          }
          return 100;
        }
        return prev + (100 / (selectedSession!.duration * 60)); // 每秒增加的百分比
      });
    }, 1000);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setSelectedSession(null);
    setCurrentStep('courses');
    setSessionProgress(0);
    setIsPlaying(false);
  };

  const handleBackToSessions = () => {
    setSelectedSession(null);
    setCurrentStep('sessions');
    setSessionProgress(0);
    setIsPlaying(false);
  };

  // 课程列表页面
  if (currentStep === 'courses') {
    return (
      <div className={cn('max-w-4xl mx-auto p-4', className)}>
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-3xl mb-4">
            🧘‍♀️
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">冥想课程</h2>
          <p className="text-gray-600">选择适合您的引导冥想课程</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {courses.map(course => (
            <Card 
              key={course.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => handleCourseSelect(course)}
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10"></div>
                
                <CardHeader className="relative">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{course.thumbnail}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {course.instructor} • {course.duration}分钟
                      </p>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={cn(
                          'px-2 py-1 rounded-full text-xs font-medium',
                          course.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                          course.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        )}>
                          {course.difficulty === 'beginner' ? '初级' :
                           course.difficulty === 'intermediate' ? '中级' : '高级'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {course.sessions.length} 节课
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative">
                  <p className="text-gray-600 text-sm mb-4">
                    {course.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">课程收益：</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {course.benefits.slice(0, 4).map((benefit, index) => (
                        <div key={index} className="text-xs text-gray-600 flex items-center">
                          <span className="text-green-500 mr-1">•</span>
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {course.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // 课程会话列表页面
  if (currentStep === 'sessions' && selectedCourse) {
    return (
      <div className={cn('max-w-4xl mx-auto p-4', className)}>
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={handleBackToCourses}
            className="mb-4"
          >
            ← 返回课程列表
          </Button>
          
          <div className="text-center">
            <div className="text-4xl mb-2">{selectedCourse.thumbnail}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedCourse.title}
            </h2>
            <p className="text-gray-600">{selectedCourse.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          {selectedCourse.sessions.map((session, index) => (
            <Card 
              key={session.id}
              className="cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => handleSessionSelect(session)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {session.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {session.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>⏱️ {session.duration}分钟</span>
                        <span>🎯 {session.focusPoints.length}个重点</span>
                      </div>
                      
                      <Button variant="primary" size="sm">
                        开始练习
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // 会话详情页面
  if (currentStep === 'session-detail' && selectedSession) {
    return (
      <div className={cn('max-w-3xl mx-auto p-4', className)}>
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={handleBackToSessions}
            className="mb-4"
          >
            ← 返回课程
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedSession.title}
              </h2>
              <p className="text-gray-600 mb-4">{selectedSession.description}</p>
              <div className="text-sm text-gray-500">
                预计时长：{selectedSession.duration}分钟
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 练习准备 */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">💡 练习准备</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                {selectedSession.preparation.map((prep, index) => (
                  <li key={index}>• {prep}</li>
                ))}
              </ul>
            </div>

            {/* 重点关注 */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">🎯 本节重点</h3>
              <ul className="text-sm text-green-700 space-y-1">
                {selectedSession.focusPoints.map((point, index) => (
                  <li key={index}>• {point}</li>
                ))}
              </ul>
            </div>

            {/* 练习指导 */}
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">🧘‍♀️ 练习指导</h3>
              <ol className="text-sm text-purple-700 space-y-2">
                {selectedSession.instructions.map((instruction, index) => (
                  <li key={index}>{index + 1}. {instruction}</li>
                ))}
              </ol>
            </div>

            {/* 练习后建议 */}
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">✨ 练习后建议</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                {selectedSession.postSession.map((post, index) => (
                  <li key={index}>• {post}</li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <Button
                variant="primary"
                size="lg"
                onClick={handleStartSession}
                className="px-12 py-4 text-lg"
              >
                开始冥想练习
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 冥想练习页面
  if (currentStep === 'practice' && selectedSession) {
    return (
      <div className={cn('max-w-2xl mx-auto p-4', className)}>
        <Card>
          <CardContent className="py-16 text-center">
            <div className="space-y-8">
              {/* 进度圆环 */}
              <div className="relative">
                <svg className="w-48 h-48 mx-auto transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 88}
                    strokeDashoffset={2 * Math.PI * 88 * (1 - sessionProgress / 100)}
                    className="text-indigo-500 transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800 mb-1">
                      {Math.round(sessionProgress)}%
                    </div>
                    <div className="text-sm text-gray-500">已完成</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedSession.title}
                </h2>
                <p className="text-gray-600">
                  {isPlaying ? '正在进行冥想练习...' : '练习已完成'}
                </p>
              </div>

              {/* 引导文字 */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
                <p className="text-indigo-700">
                  {isPlaying 
                    ? selectedSession.instructions[Math.floor((sessionProgress / 100) * selectedSession.instructions.length)]
                    : "恭喜您完成了这次冥想练习！"}
                </p>
              </div>

              {/* 控制按钮 */}
              <div className="flex justify-center space-x-4">
                {sessionProgress >= 100 ? (
                  <Button
                    variant="primary"
                    onClick={handleBackToCourses}
                    className="px-8 py-3"
                  >
                    返回课程
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsPlaying(false);
                      setSessionProgress(100);
                    }}
                    className="px-8 py-3"
                  >
                    提前结束
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};