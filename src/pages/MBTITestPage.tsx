import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MBTITest } from '../components/features/MBTITest';
import { MBTIResultComponent } from '../components/features/MBTIResult';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import type { MBTIAnswer, MBTIResult as MBTIResultType } from '../types';
import { calculateMBTIResult } from '../utils/mbtiCalculator';
import { useAppStore } from '../stores/useAppStore';
import { useAuthStore } from '../stores/useAuthStore';

type TestState = 'intro' | 'testing' | 'result';

export const MBTITestPage: React.FC = () => {
  const [testState, setTestState] = useState<TestState>('intro');
  const [testResult, setTestResult] = useState<MBTIResultType | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const { addNotification } = useAppStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleStartTest = () => {
    setTestState('testing');
  };

  const handleTestComplete = (answers: MBTIAnswer[]) => {
    try {
      const result = calculateMBTIResult(answers);
      setTestResult(result);
      setTestState('result');
      
      addNotification({
        type: 'success',
        title: '测试完成',
        message: '恭喜您完成MBTI人格测试！',
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: '计算错误',
        message: '测试结果计算出现问题，请重新测试。',
      });
    }
  };

  const handleProgress = (current: number, total: number) => {
    setProgress({ current, total });
  };

  const handleShare = () => {
    // TODO: 实现分享功能
    addNotification({
      type: 'info',
      title: '分享功能',
      message: '分享功能正在开发中...',
    });
  };

  const handleRetake = () => {
    setTestState('intro');
    setTestResult(null);
    setProgress({ current: 0, total: 0 });
  };

  const handleBackHome = () => {
    navigate('/');
  };

  if (testState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary-200/30 to-accent-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            {/* 返回按钮 */}
            <div className="mb-6 sm:mb-8">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleBackHome}
                className="text-gray-600 hover:text-gray-800"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回首页
              </Button>
            </div>

            {/* 标题区域 */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="relative inline-block mb-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  <span className="cosmic-text">
                    MBTI 人格测试
                  </span>
                </h1>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              </div>
              <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed px-4">
                探索你的内在性格，了解你独特的思维方式和行为模式
              </p>
            </div>

            {/* 介绍卡片 */}
            <Card variant="glass" className="mb-8 sm:mb-12 animate-fade-in-scale" hover={false}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-lg">
                    🧠
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">关于MBTI测试</h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    MBTI（Myers-Briggs Type Indicator）是基于荣格心理类型理论开发的人格测评工具。
                    它通过四个维度来描述人格类型，帮助你更好地了解自己的性格特点。
                  </p>
                  
                  <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg text-gray-800 flex items-center">
                        <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xs mr-2">4</span>
                        测试维度
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                          <span className="text-sm sm:text-base"><strong>外向(E) vs 内向(I)</strong> - 能量来源</span>
                        </li>
                        <li className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                          <span className="text-sm sm:text-base"><strong>感觉(S) vs 直觉(N)</strong> - 信息收集</span>
                        </li>
                        <li className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
                          <span className="text-sm sm:text-base"><strong>思考(T) vs 情感(F)</strong> - 决策方式</span>
                        </li>
                        <li className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0"></div>
                          <span className="text-sm sm:text-base"><strong>判断(J) vs 知觉(P)</strong> - 生活方式</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg text-gray-800 flex items-center">
                        <span className="w-6 h-6 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-lg flex items-center justify-center text-white text-xs mr-2">✓</span>
                        测试说明
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm sm:text-base text-gray-700">共28道题目，预计用时5-8分钟</span>
                        </li>
                        <li className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm sm:text-base text-gray-700">请根据真实感受选择答案</span>
                        </li>
                        <li className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm sm:text-base text-gray-700">没有对错之分，只有适合与否</span>
                        </li>
                        <li className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm sm:text-base text-gray-700">建议在安静环境下完成测试</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 开始按钮 */}
            <div className="text-center">
              <Button 
                variant="gradient" 
                size="xl" 
                onClick={handleStartTest}
                className="px-8 sm:px-12 py-4 text-lg sm:text-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
              >
                <span className="flex items-center space-x-3">
                  <span>🚀</span>
                  <span>开始测试</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>免费测试</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>5-8分钟</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>科学准确</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (testState === 'testing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-tr from-secondary-200/20 to-accent-200/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* 顶部导航 */}
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBackHome}
              className="text-gray-600 hover:text-gray-800"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回首页
            </Button>
            <div className="text-sm sm:text-base text-gray-600 font-medium">
              MBTI 人格测试
            </div>
          </div>

          <MBTITest 
            onComplete={handleTestComplete}
            onProgress={handleProgress}
          />
        </div>
      </div>
    );
  }

  if (testState === 'result' && testResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* 顶部导航 */}
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBackHome}
              className="text-gray-600 hover:text-gray-800"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回首页
            </Button>
            <div className="text-sm sm:text-base text-gray-600 font-medium flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>测试结果</span>
            </div>
          </div>

          <MBTIResultComponent
            result={testResult}
            userProfile={user}
            onShare={handleShare}
            onRetake={handleRetake}
          />
        </div>
      </div>
    );
  }

  return null;
};
