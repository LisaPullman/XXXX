import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import type { MBTIAnswer } from '../types';
import { getQuestionsByMode, getTestModeInfo, TestMode } from '../data/mbtiQuestions';
import { cn } from '../../../utils/cn';

interface MBTITestProps {
  onComplete: (answers: MBTIAnswer[], mode: TestMode) => void;
  onProgress?: (current: number, total: number) => void;
  className?: string;
}

export const MBTITest: React.FC<MBTITestProps> = ({ 
  onComplete, 
  onProgress,
  className 
}) => {
  const [selectedMode, setSelectedMode] = useState<TestMode | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<MBTIAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const questions = selectedMode ? getQuestionsByMode(selectedMode) : [];
  const question = questions[currentQuestion];
  const progress = selectedMode ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  useEffect(() => {
    if (selectedMode) {
      onProgress?.(currentQuestion + 1, questions.length);
    }
  }, [currentQuestion, selectedMode, onProgress]);

  const handleModeSelect = (mode: TestMode) => {
    setSelectedMode(mode);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answer: 'A' | 'B') => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (!selectedAnswer || !selectedMode) return;

    const newAnswer: MBTIAnswer = {
      questionId: question.id,
      answer: selectedAnswer,
      timestamp: new Date(),
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnimating(false);
      }, 300);
    } else {
      onComplete(newAnswers, selectedMode);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev - 1);
        setAnswers(prev => prev.slice(0, -1));
        setSelectedAnswer(null);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleBackToModeSelect = () => {
    setSelectedMode(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
  };

  // 模式选择界面
  if (!selectedMode) {
    return (
      <div className={cn('max-w-4xl mx-auto p-4 safe-area-container', className)}>
        {/* 移动端适配标题 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-3xl mb-4">
            🧠
          </div>
          <h1 className="mobile-text-lg font-bold text-gray-800 mb-2">
            MBTI人格测试
          </h1>
          <p className="mobile-text-sm text-gray-600">
            选择适合您的测试模式，深度了解自己的性格类型
          </p>
        </div>

        {/* 测试模式选择卡片 */}
        <div className="mobile-grid gap-6">
          {(['quick', 'professional'] as TestMode[]).map(mode => {
            const modeInfo = getTestModeInfo(mode);
            return (
              <Card 
                key={mode}
                className="touch-friendly cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                onClick={() => handleModeSelect(mode)}
              >
                <div className="relative overflow-hidden">
                  <div className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-10',
                    modeInfo.color
                  )}></div>
                  
                  <CardHeader className="relative mobile-content">
                    <div className="text-center">
                      <div className={cn(
                        'w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-4 bg-gradient-to-r text-white',
                        modeInfo.color
                      )}>
                        {modeInfo.icon}
                      </div>
                      <h3 className="mobile-text-base font-bold text-gray-800 mb-2">
                        {modeInfo.title}
                      </h3>
                      <p className="mobile-text-sm text-gray-600 mb-3">
                        {modeInfo.description}
                      </p>
                      <div className="flex items-center justify-center space-x-4 mobile-text-sm text-gray-500">
                        <span>📝 {modeInfo.questionCount}题</span>
                        <span>⏱️ {modeInfo.duration}</span>
                        <span>🎯 {modeInfo.accuracy}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative mobile-content">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-700 mobile-text-sm">功能特色：</h4>
                      <div className="space-y-2">
                        {modeInfo.features.map((feature, index) => (
                          <div key={index} className="flex items-start mobile-text-sm text-gray-600">
                            <span className="text-green-500 mr-2 mt-0.5">✓</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      className={cn(
                        'w-full mt-6 mobile-button',
                        `bg-gradient-to-r ${modeInfo.color} hover:shadow-lg`
                      )}
                    >
                      选择{modeInfo.title}
                    </Button>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>

        {/* 测试说明 */}
        <div className="mt-8">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <CardContent className="mobile-content">
              <div className="text-center">
                <h3 className="font-semibold text-blue-800 mb-3 mobile-text-sm">测试建议</h3>
          <div className="mobile-text-sm text-blue-700 space-y-2">
            <p>• 请在安静的环境中完成测试，确保不被打扰</p>
            <p>• 选择最贴近真实想法的答案，不要过度思考</p>
            <p>• 首次测试建议选择快速版，了解基本类型</p>
            <p>• 如需深度分析，可选择专业完整版</p>
          </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const modeInfo = getTestModeInfo(selectedMode);

  return (
    <div className={cn('max-w-3xl mx-auto p-4 safe-area-container', className)}>
      {/* 移动端优化的进度条 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackToModeSelect}
            className="mobile-text-sm"
          >
            ← 返回选择
          </Button>
          <div className="flex items-center space-x-2">
            <span className="mobile-text-sm text-gray-600">
              {modeInfo.title}
            </span>
            <span className="mobile-text-sm font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={cn(
              'h-2 rounded-full transition-all duration-300 bg-gradient-to-r',
              modeInfo.color
            )}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* 问题卡片 */}
      <Card className={cn('mobile-card', isAnimating && 'opacity-50 scale-95')}>
        <CardHeader>
          <div className="text-center">
            <div className={cn(
              'w-12 h-12 mx-auto rounded-full flex items-center justify-center text-xl text-white mb-4 bg-gradient-to-r',
              modeInfo.color
            )}>
              {modeInfo.icon}
            </div>
            <h2 className="mobile-text-base font-semibold text-gray-800 leading-relaxed">
              {question?.question}
            </h2>
          </div>
        </CardHeader>

        <CardContent className="mobile-content">
          <div className="space-y-4">
            {/* 选项A */}
            <button
              onClick={() => handleAnswer('A')}
              className={cn(
                'w-full p-4 rounded-lg border-2 text-left transition-all duration-200 mobile-button',
                'hover:shadow-md active:scale-98',
                selectedAnswer === 'A'
                  ? `border-indigo-500 bg-gradient-to-r ${modeInfo.color} bg-opacity-10 shadow-md`
                  : 'border-gray-200 hover:border-indigo-300 bg-white'
              )}
            >
              <div className="flex items-start space-x-3">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
                  selectedAnswer === 'A'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                )}>
                  A
                </div>
                <span className={cn(
                  'mobile-text-sm leading-relaxed',
                  selectedAnswer === 'A' ? 'text-indigo-700 font-medium' : 'text-gray-700'
                )}>
                  {question?.options.A}
                </span>
              </div>
            </button>

            {/* 选项B */}
            <button
              onClick={() => handleAnswer('B')}
              className={cn(
                'w-full p-4 rounded-lg border-2 text-left transition-all duration-200 mobile-button',
                'hover:shadow-md active:scale-98',
                selectedAnswer === 'B'
                  ? `border-indigo-500 bg-gradient-to-r ${modeInfo.color} bg-opacity-10 shadow-md`
                  : 'border-gray-200 hover:border-indigo-300 bg-white'
              )}
            >
              <div className="flex items-start space-x-3">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
                  selectedAnswer === 'B'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                )}>
                  B
                </div>
                <span className={cn(
                  'mobile-text-sm leading-relaxed',
                  selectedAnswer === 'B' ? 'text-indigo-700 font-medium' : 'text-gray-700'
                )}>
                  {question?.options.B}
                </span>
              </div>
            </button>
          </div>

          {/* 导航按钮 */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0 || isAnimating}
              className="mobile-button"
            >
              上一题
            </Button>

            <div className="mobile-text-sm text-gray-500">
              {Math.round(progress)}% 完成
            </div>

            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!selectedAnswer || isAnimating}
              className={cn(
                'mobile-button bg-gradient-to-r',
                modeInfo.color
              )}
            >
              {currentQuestion === questions.length - 1 ? '完成测试' : '下一题'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 移动端友好的提示 */}
      <div className="mt-4 text-center">
        <p className="mobile-text-sm text-gray-500">
          选择最符合您真实想法的答案 • 无对错之分
        </p>
      </div>
    </div>
  );
};