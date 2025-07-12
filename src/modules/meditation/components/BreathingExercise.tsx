import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { BreathingExercise } from '../types';
import { MeditationService } from '../services';
import { cn } from '../../../utils/cn';

interface BreathingExerciseComponentProps {
  onComplete: (exerciseId: string, duration: number) => void;
  className?: string;
}

export const BreathingExerciseComponent: React.FC<BreathingExerciseComponentProps> = ({
  onComplete,
  className
}) => {
  const [selectedExercise, setSelectedExercise] = useState<BreathingExercise | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  const exercises = MeditationService.getBreathingExercises();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && selectedExercise && phaseTimeLeft > 0) {
      intervalId = setInterval(() => {
        setPhaseTimeLeft(prev => {
          if (prev <= 1) {
            // 切换到下一个阶段
            moveToNextPhase();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, selectedExercise, phaseTimeLeft]);

  const moveToNextPhase = () => {
    if (!selectedExercise) return;

    const { pattern } = selectedExercise;
    
    switch (currentPhase) {
      case 'inhale':
        if (pattern.hold > 0) {
          setCurrentPhase('hold');
          setPhaseTimeLeft(pattern.hold);
        } else {
          setCurrentPhase('exhale');
          setPhaseTimeLeft(pattern.exhale);
        }
        break;
      case 'hold':
        setCurrentPhase('exhale');
        setPhaseTimeLeft(pattern.exhale);
        break;
      case 'exhale':
        if (pattern.pause > 0) {
          setCurrentPhase('pause');
          setPhaseTimeLeft(pattern.pause);
        } else {
          moveToNextCycle();
        }
        break;
      case 'pause':
        moveToNextCycle();
        break;
    }
  };

  const moveToNextCycle = () => {
    if (!selectedExercise) return;

    if (currentCycle >= selectedExercise.cycles - 1) {
      // 练习完成
      setIsRunning(false);
      onComplete(selectedExercise.id, selectedExercise.totalDuration / 60);
    } else {
      // 下一个循环
      setCurrentCycle(prev => prev + 1);
      setCurrentPhase('inhale');
      setPhaseTimeLeft(selectedExercise.pattern.inhale);
    }
  };

  const handleStart = (exercise: BreathingExercise) => {
    setSelectedExercise(exercise);
    setCurrentCycle(0);
    setCurrentPhase('inhale');
    setPhaseTimeLeft(exercise.pattern.inhale);
    setIsRunning(true);
    setShowInstructions(false);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setSelectedExercise(null);
    setCurrentCycle(0);
    setCurrentPhase('inhale');
    setPhaseTimeLeft(0);
    setShowInstructions(true);
  };

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'inhale': return '吸气';
      case 'hold': return '屏气';
      case 'exhale': return '呼气';
      case 'pause': return '停顿';
      default: return '';
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'inhale': return 'from-blue-400 to-blue-500';
      case 'hold': return 'from-yellow-400 to-yellow-500';
      case 'exhale': return 'from-green-400 to-green-500';
      case 'pause': return 'from-gray-400 to-gray-500';
      default: return 'from-indigo-400 to-purple-500';
    }
  };

  const getPhaseInstruction = () => {
    if (!selectedExercise) return '';
    
    switch (currentPhase) {
      case 'inhale': return '缓慢深吸气，让空气充满肺部';
      case 'hold': return '保持呼吸，感受身体的稳定';
      case 'exhale': return '慢慢呼气，释放所有紧张';
      case 'pause': return '自然停顿，准备下一次呼吸';
      default: return '';
    }
  };

  // 练习选择页面
  if (showInstructions) {
    return (
      <div className={cn('max-w-4xl mx-auto p-4', className)}>
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-400 to-green-500 rounded-full flex items-center justify-center text-3xl mb-4">
            🌬️
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">呼吸练习</h2>
          <p className="text-gray-600">选择适合的呼吸法，调节身心状态</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map(exercise => (
            <Card 
              key={exercise.id} 
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-400 to-green-500 rounded-full flex items-center justify-center text-2xl mb-3">
                    💨
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {exercise.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {exercise.description}
                  </p>
                  <div className="text-xs text-gray-500">
                    {exercise.cycles}个循环 • {Math.floor(exercise.totalDuration / 60)}分{exercise.totalDuration % 60}秒
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* 呼吸模式 */}
                <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">呼吸模式</h4>
                  <div className="flex justify-center items-center space-x-2 text-sm">
                    <span className="text-blue-600">{exercise.pattern.inhale}秒</span>
                    <span className="text-gray-400">-</span>
                    {exercise.pattern.hold > 0 && (
                      <>
                        <span className="text-yellow-600">{exercise.pattern.hold}秒</span>
                        <span className="text-gray-400">-</span>
                      </>
                    )}
                    <span className="text-green-600">{exercise.pattern.exhale}秒</span>
                    {exercise.pattern.pause > 0 && (
                      <>
                        <span className="text-gray-400">-</span>
                        <span className="text-gray-600">{exercise.pattern.pause}秒</span>
                      </>
                    )}
                  </div>
                  <div className="text-xs text-center text-gray-500 mt-1">
                    吸气-{exercise.pattern.hold > 0 ? '屏气-' : ''}呼气{exercise.pattern.pause > 0 ? '-停顿' : ''}
                  </div>
                </div>

                {/* 益处 */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">主要益处</h4>
                  <div className="space-y-1">
                    {exercise.benefits.slice(0, 3).map((benefit, index) => (
                      <div key={index} className="text-xs text-gray-600 flex items-center">
                        <span className="text-green-500 mr-1">•</span>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 可视化描述 */}
                {exercise.visualization && (
                  <div className="bg-purple-50 rounded-lg p-3 mb-4 border border-purple-200">
                    <h4 className="font-medium text-purple-800 mb-1">想象引导</h4>
                    <p className="text-xs text-purple-700">{exercise.visualization}</p>
                  </div>
                )}

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => handleStart(exercise)}
                >
                  开始练习
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // 呼吸练习页面
  if (selectedExercise) {
    const progress = selectedExercise ? ((currentCycle + 1) / selectedExercise.cycles) * 100 : 0;
    const circleSize = 200 + (phaseTimeLeft * 10); // 根据时间动态调整大小

    return (
      <div className={cn('max-w-2xl mx-auto p-4', className)}>
        <Card>
          <CardHeader>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedExercise.name}
              </h2>
              <div className="text-sm text-gray-500">
                第 {currentCycle + 1} / {selectedExercise.cycles} 循环
              </div>
            </div>
          </CardHeader>

          <CardContent className="py-12">
            <div className="text-center space-y-8">
              {/* 呼吸圆圈 */}
              <div className="flex justify-center">
                <div 
                  className={cn(
                    'rounded-full flex items-center justify-center transition-all duration-1000 ease-in-out',
                    `bg-gradient-to-br ${getPhaseColor()}`
                  )}
                  style={{ 
                    width: `${circleSize}px`, 
                    height: `${circleSize}px`
                  }}
                >
                  <div className="text-center text-white">
                    <div className="text-3xl font-bold mb-1">
                      {phaseTimeLeft}
                    </div>
                    <div className="text-lg">
                      {getPhaseText()}
                    </div>
                  </div>
                </div>
              </div>

              {/* 引导文字 */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
                <p className="text-indigo-700 text-lg">
                  {getPhaseInstruction()}
                </p>
                {selectedExercise.visualization && (
                  <p className="text-indigo-600 text-sm mt-2">
                    {selectedExercise.visualization}
                  </p>
                )}
              </div>

              {/* 进度条 */}
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* 控制按钮 */}
              <div className="flex justify-center space-x-4">
                {!isRunning ? (
                  <Button
                    variant="primary"
                    onClick={handleResume}
                    className="px-8 py-3"
                  >
                    继续
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handlePause}
                    className="px-8 py-3"
                  >
                    暂停
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={handleStop}
                  className="px-8 py-3"
                >
                  结束练习
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};