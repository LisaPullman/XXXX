import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AstrologyTest } from '../modules/astrology/components/AstrologyTest';
import { AstrologyResult as AstrologyResultComponent } from '../modules/astrology/components/AstrologyResult';
import { Button } from '../components/ui/Button';
import { AstrologyResult } from '../modules/astrology/types';
import { useAppStore } from '../stores/useAppStore';

type TestState = 'test' | 'result';

export const AstrologyPage: React.FC = () => {
  const [testState, setTestState] = useState<TestState>('test');
  const [testResult, setTestResult] = useState<AstrologyResult | null>(null);
  const { addNotification } = useAppStore();
  const navigate = useNavigate();

  const handleTestComplete = (result: AstrologyResult) => {
    setTestResult(result);
    setTestState('result');
    
    addNotification({
      type: 'success',
      title: '星座分析完成',
      message: `您的星座是${result.sunSign}，快来查看详细分析吧！`,
    });
  };

  const handleRetake = () => {
    setTestState('test');
    setTestResult(null);
  };

  const handleShare = () => {
    // TODO: 实现分享功能
    addNotification({
      type: 'info',
      title: '分享功能',
      message: '分享功能正在开发中...',
    });
  };

  const handleBackHome = () => {
    navigate('/');
  };

  if (testState === 'test') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-900 relative overflow-hidden">
        {/* 星空背景 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* 主要星星 */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse opacity-80"></div>
          <div className="absolute top-32 right-32 w-1 h-1 bg-yellow-200 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse opacity-70" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 right-20 w-1 h-1 bg-purple-200 rounded-full animate-pulse opacity-50" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-60 left-24 w-2 h-2 bg-white rounded-full animate-pulse opacity-90" style={{ animationDelay: '0.5s' }}></div>
          
          {/* 星座装饰 */}
          <div className="absolute top-1/4 right-1/4 opacity-10">
            <svg className="w-32 h-32 text-white animate-spin" style={{ animationDuration: '120s' }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          
          <div className="absolute bottom-1/4 left-1/4 opacity-5">
            <svg className="w-24 h-24 text-yellow-200 animate-spin" style={{ animationDuration: '180s' }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          
          {/* 流星效果 */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* 顶部导航 */}
          <div className="flex justify-between items-center mb-8 sm:mb-12">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBackHome}
              className="text-white hover:text-yellow-200 hover:bg-white/10"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回首页
            </Button>
            <div className="text-sm sm:text-base text-white/80 font-medium flex items-center space-x-2">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>星座分析</span>
            </div>
          </div>
          
          {/* 主标题区域 */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="relative inline-block mb-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-glow">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                星座分析
              </h1>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
            </div>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed px-4">
              通过出生时间和地点，精确计算你的星座信息
              <br className="hidden sm:block" />
              揭示天体运行对你性格和运势的影响
            </p>
          </div>

          <AstrologyTest onComplete={handleTestComplete} />
        </div>
      </div>
    );
  }

  if (testState === 'result' && testResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-900 relative overflow-hidden">
        {/* 星空背景 - 结果页面版本 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* 更多星星为结果页面增添氛围 */}
          <div className="absolute top-16 left-16 w-1 h-1 bg-white rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-28 right-28 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-pulse opacity-80" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-48 left-1/4 w-1 h-1 bg-blue-200 rounded-full animate-pulse opacity-50" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-32 right-16 w-2 h-2 bg-purple-200 rounded-full animate-pulse opacity-70" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-48 left-20 w-1 h-1 bg-white rounded-full animate-pulse opacity-90" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-72 right-1/3 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.8s' }}></div>
          
          {/* 星座符号装饰 */}
          <div className="absolute top-1/3 right-1/5 opacity-5">
            <svg className="w-40 h-40 text-yellow-200 animate-spin" style={{ animationDuration: '200s' }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          
          {/* 月亮装饰 */}
          <div className="absolute bottom-1/3 left-1/6 opacity-8">
            <svg className="w-28 h-28 text-blue-200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          </div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* 顶部导航 */}
          <div className="flex justify-between items-center mb-8 sm:mb-12">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBackHome}
              className="text-white hover:text-yellow-200 hover:bg-white/10"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回首页
            </Button>
            <div className="text-sm sm:text-base text-white/80 font-medium flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>分析结果</span>
            </div>
          </div>

          <AstrologyResultComponent
            result={testResult}
            onShare={handleShare}
            onRetake={handleRetake}
          />
        </div>
      </div>
    );
  }

  return null;
};
