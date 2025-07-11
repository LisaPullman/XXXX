import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import type { MBTIAnswer } from '../../types';
import { MBTI_QUESTIONS } from '../../data/mbtiQuestions';
import { cn } from '../../utils/cn';

interface MBTITestProps {
  onComplete: (answers: MBTIAnswer[]) => void;
  onProgress?: (current: number, total: number) => void;
}

export const MBTITest: React.FC<MBTITestProps> = ({ onComplete, onProgress }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<MBTIAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const question = MBTI_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / MBTI_QUESTIONS.length) * 100;

  useEffect(() => {
    onProgress?.(currentQuestion + 1, MBTI_QUESTIONS.length);
  }, [currentQuestion, onProgress]);

  const handleAnswer = (answer: 'A' | 'B') => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newAnswer: MBTIAnswer = {
      questionId: question.id,
      answer: selectedAnswer,
      timestamp: new Date(),
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < MBTI_QUESTIONS.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnimating(false);
      }, 300);
    } else {
      onComplete(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev - 1);
        const prevAnswer = answers[currentQuestion - 1];
        setSelectedAnswer(prevAnswer?.answer || null);
        setAnswers(prev => prev.slice(0, -1));
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      {/* Progress Bar */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm sm:text-base font-medium text-gray-700">
            问题 <span className="text-primary-600 font-bold">{currentQuestion + 1}</span> / {MBTI_QUESTIONS.length}
          </span>
          <span className="text-sm sm:text-base font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
          <div 
            className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 h-3 rounded-full transition-all duration-700 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          >
            <div className="h-full bg-gradient-to-r from-white/30 to-transparent rounded-full"></div>
          </div>
        </div>
        <div className="mt-2 text-xs sm:text-sm text-gray-500 text-center">
          预计剩余时间: {Math.ceil((MBTI_QUESTIONS.length - currentQuestion - 1) * 0.5)} 分钟
        </div>
      </div>

      {/* Question Card */}
      <Card 
        variant="glass" 
        className={cn(
          "transition-all duration-300 mb-6 sm:mb-8",
          isAnimating && "opacity-50 transform scale-95"
        )}
        hover={false}
      >
        <CardHeader>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto">
              <span className="text-white text-2xl sm:text-3xl font-bold">{currentQuestion + 1}</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 leading-relaxed px-2">
              {question.question}
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 sm:space-y-6">
            {/* Option A */}
            <button
              onClick={() => handleAnswer('A')}
              className={cn(
                "w-full p-4 sm:p-6 text-left rounded-xl border-2 transition-all duration-300 group",
                "hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                selectedAnswer === 'A'
                  ? "border-primary-500 bg-gradient-to-r from-primary-50 to-primary-100 shadow-lg transform scale-[1.02]"
                  : "border-gray-200 dark:border-gray-600 hover:border-primary-300 bg-white dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/20"
              )}
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className={cn(
                  "flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all duration-300",
                  selectedAnswer === 'A'
                    ? "bg-primary-500 text-white shadow-lg scale-110"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-primary-200 group-hover:text-primary-700"
                )}>
                  A
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 flex-1">
                  {question.options.A}
                </p>
                {selectedAnswer === 'A' && (
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>

            {/* Option B */}
            <button
              onClick={() => handleAnswer('B')}
              className={cn(
                "w-full p-4 sm:p-6 text-left rounded-xl border-2 transition-all duration-300 group",
                "hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
                "focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2",
                selectedAnswer === 'B'
                  ? "border-secondary-500 bg-gradient-to-r from-secondary-50 to-secondary-100 shadow-lg transform scale-[1.02]"
                  : "border-gray-200 dark:border-gray-600 hover:border-secondary-300 bg-white dark:bg-gray-800 hover:bg-secondary-50 dark:hover:bg-secondary-900/20"
              )}
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className={cn(
                  "flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all duration-300",
                  selectedAnswer === 'B'
                    ? "bg-secondary-500 text-white shadow-lg scale-110"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-secondary-200 group-hover:text-secondary-700"
                )}>
                  B
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 flex-1">
                  {question.options.B}
                </p>
                {selectedAnswer === 'B' && (
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              variant="outline"
              size="md"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              上一题
            </Button>
            
            <div className="flex-1 text-center order-1 sm:order-2">
              <p className="text-sm text-gray-500">
                请选择更符合你的选项
              </p>
            </div>
            
            <Button
              variant={selectedAnswer ? "gradient" : "ghost"}
              size="md"
              onClick={handleNext}
              disabled={!selectedAnswer}
              className={cn(
                "w-full sm:w-auto order-3 font-semibold",
                selectedAnswer && "shadow-lg hover:shadow-xl transform hover:scale-105"
              )}
            >
              {currentQuestion === MBTI_QUESTIONS.length - 1 ? (
                <>
                  <span>完成测试</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </>
              ) : (
                <>
                  <span>下一题</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dimension Hint */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          当前测试维度: <span className="font-medium text-primary-600">
            {question.dimension === 'EI' && '外向性 vs 内向性'}
            {question.dimension === 'SN' && '感觉 vs 直觉'}
            {question.dimension === 'TF' && '思考 vs 情感'}
            {question.dimension === 'JP' && '判断 vs 知觉'}
          </span>
        </p>
      </div>
    </div>
  );
};
