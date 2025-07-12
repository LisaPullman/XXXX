import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { MeditationTimer as TimerType, AmbientSound } from '../types';
import { MeditationService } from '../services';
import { cn } from '../../../utils/cn';

interface MeditationTimerProps {
  onComplete: (duration: number) => void;
  className?: string;
}

export const MeditationTimer: React.FC<MeditationTimerProps> = ({
  onComplete,
  className
}) => {
  const [timer, setTimer] = useState<TimerType | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(15); // 默认15分钟
  const [selectedSound, setSelectedSound] = useState<string>('silence');
  const [showSettings, setShowSettings] = useState(true);

  const ambientSounds = MeditationService.getAmbientSounds();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && timer && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete(timer.duration / 60);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timer, timeLeft, onComplete]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!timer) {
      const newTimer = MeditationService.createTimer(selectedDuration, selectedSound);
      setTimer(newTimer);
      setTimeLeft(newTimer.duration);
    }
    setIsRunning(true);
    setShowSettings(false);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (timer) {
      const completedMinutes = (timer.duration - timeLeft) / 60;
      onComplete(completedMinutes);
    }
    handleReset();
  };

  const handleReset = () => {
    setTimer(null);
    setTimeLeft(0);
    setIsRunning(false);
    setShowSettings(true);
  };

  const progress = timer ? ((timer.duration - timeLeft) / timer.duration) * 100 : 0;
  const circumference = 2 * Math.PI * 120; // 半径120的圆周长
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  if (showSettings) {
    return (
      <div className={cn('max-w-lg mx-auto p-4 safe-area-container', className)}>
        <Card>
          <CardHeader className="mobile-content">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-xl sm:text-2xl mb-4">
                ⏰
              </div>
              <h2 className="mobile-text-lg font-bold text-gray-800">冥想计时器</h2>
              <p className="text-gray-600 mt-2 mobile-text-sm">设置您的冥想时间和环境音效</p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 mobile-content">
            {/* 时间选择 */}
            <div>
              <label className="block mobile-text-sm font-medium text-gray-700 mb-3">
                冥想时长
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[5, 10, 15, 20, 30, 45, 60, 90].map(duration => (
                  <button
                    key={duration}
                    onClick={() => setSelectedDuration(duration)}
                    className={cn(
                      'p-3 rounded-lg border text-center transition-colors mobile-button touch-friendly',
                      selectedDuration === duration
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-indigo-300'
                    )}
                  >
                    <div className="font-medium mobile-text-sm">{duration}</div>
                    <div className="mobile-text-sm text-gray-500">分钟</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 环境音效选择 */}
            <div>
              <label className="block mobile-text-sm font-medium text-gray-700 mb-3">
                环境音效
              </label>
              <div className="space-y-2">
                {ambientSounds.map(sound => (
                  <button
                    key={sound.id}
                    onClick={() => setSelectedSound(sound.id)}
                    className={cn(
                      'w-full p-3 rounded-lg border text-left transition-colors mobile-button touch-friendly',
                      selectedSound === sound.id
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-indigo-300'
                    )}
                  >
                    <div className="font-medium mobile-text-sm">{sound.name}</div>
                    <div className="mobile-text-sm text-gray-500">{sound.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleStart}
              className="w-full py-4 mobile-text-base mobile-button"
            >
              开始冥想
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn('max-w-lg mx-auto p-4 safe-area-container', className)}>
      <Card>
        <CardContent className="py-8 sm:py-12 mobile-content">
          <div className="text-center space-y-8">
            {/* 圆形进度条 */}
            <div className="relative">
              <svg className="w-48 h-48 sm:w-64 sm:h-64 mx-auto transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="text-indigo-500 transition-all duration-1000 ease-in-out"
                  strokeLinecap="round"
                />
              </svg>
              
              {/* 时间显示 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mobile-text-lg sm:text-4xl font-bold text-gray-800 mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="mobile-text-sm text-gray-500">
                    {isRunning ? '正在冥想...' : '已暂停'}
                  </div>
                </div>
              </div>
            </div>

            {/* 冥想引导文字 */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
              <p className="text-indigo-700 mobile-text-sm text-center">
                {isRunning 
                  ? "专注于您的呼吸，让思绪如云朵般飘过..." 
                  : "点击继续按钮恢复您的冥想练习"}
              </p>
            </div>

            {/* 控制按钮 */}
            <div className="flex flex-wrap justify-center gap-3">
              {!isRunning ? (
                <Button
                  variant="primary"
                  onClick={timeLeft === 0 ? handleStart : handleResume}
                  className="px-6 py-3 mobile-button"
                >
                  {timeLeft === 0 ? '开始' : '继续'}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={handlePause}
                  className="px-6 py-3 mobile-button"
                >
                  暂停
                </Button>
              )}
              
              <Button
                variant="outline"
                onClick={handleStop}
                className="px-6 py-3 mobile-button"
                disabled={timeLeft === (timer?.duration || 0)}
              >
                结束
              </Button>
              
              <Button
                variant="outline"
                onClick={handleReset}
                className="px-6 py-3 mobile-button"
              >
                重置
              </Button>
            </div>

            {/* 音效信息 */}
            {timer?.ambientSound && timer.ambientSound.id !== 'silence' && (
              <div className="mobile-text-sm text-gray-500 text-center">
                🎵 {timer.ambientSound.name}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};