import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useThemeStore } from '../stores/useThemeStore';
import { 
  BloodTypeTest, 
  BloodTypeResult, 
  BloodTypeCompatibility,
  BloodTypeService
} from '../modules/bloodtype';
import { BloodTypeTestResult, BloodTypeCompatibilityResult } from '../modules/bloodtype/types';

type ViewMode = 'intro' | 'test' | 'result' | 'compatibility';

export const BloodTypePage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const [viewMode, setViewMode] = useState<ViewMode>('intro');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BloodTypeTestResult | null>(null);
  const [compatibilityResult, setCompatibilityResult] = useState<BloodTypeCompatibilityResult | null>(null);

  const handleBloodTypeTest = async (bloodType: 'A' | 'B' | 'O' | 'AB') => {
    setLoading(true);
    try {
      const testResult = await BloodTypeService.analyzeBloodType(bloodType);
      setResult(testResult);
      setViewMode('result');
    } catch (error) {
      console.error('血型分析失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompatibilityTest = async (type1: 'A' | 'B' | 'O' | 'AB', type2: 'A' | 'B' | 'O' | 'AB') => {
    setLoading(true);
    try {
      const compatResult = await BloodTypeService.analyzeCompatibility(type1, type2);
      setCompatibilityResult(compatResult);
    } catch (error) {
      console.error('配对分析失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setResult(null);
    setCompatibilityResult(null);
    setViewMode('intro');
  };

  const handleShare = () => {
    if (result) {
      const shareText = `我的血型分析结果：${result.bloodType.name}\\n${result.personality.core}\\n来测试你的血型性格吧！`;
      if (navigator.share) {
        navigator.share({
          title: '血型性格分析',
          text: shareText,
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(shareText);
        alert('分析结果已复制到剪贴板');
      }
    }
  };

  // 介绍页面
  if (viewMode === 'intro') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-red-900 to-slate-900'
          : 'bg-gradient-to-br from-red-50 via-rose-50 to-pink-50'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            {/* 头部 */}
            <div className="text-center mb-12">
              <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-5xl ${
                theme === 'dark' ? 'bg-gradient-to-br from-red-500 to-rose-600' : 'bg-gradient-to-br from-red-500 to-rose-600'
              }`}>
                🩸
              </div>
              <h1 className={`text-4xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent`}>
                血型性格分析
              </h1>
              <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                基于血型心理学理论，深入探索不同血型的性格特征、职业倾向与人际关系模式
              </p>
            </div>

            {/* 功能选择 */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className={`rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                theme === 'dark' 
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20' 
                  : 'bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl'
              }`}
              onClick={() => setViewMode('test')}>
                <div className="text-6xl mb-4">🧬</div>
                <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  血型性格测试
                </h3>
                <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  选择你的血型，获得详细的性格分析、职业建议和健康指导
                </p>
                <div className="flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-xs">
                    性格特质
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs">
                    职业指导
                  </span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-xs">
                    健康建议
                  </span>
                </div>
              </div>

              <div className={`rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                theme === 'dark' 
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20' 
                  : 'bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl'
              }`}
              onClick={() => setViewMode('compatibility')}>
                <div className="text-6xl mb-4">💕</div>
                <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  血型配对分析
                </h3>
                <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  分析不同血型之间的相处模式，了解配对指数和相处建议
                </p>
                <div className="flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 rounded-full text-xs">
                    配对指数
                  </span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full text-xs">
                    相处建议
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full text-xs">
                    关系分析
                  </span>
                </div>
              </div>
            </div>

            {/* 特色功能 */}
            <div className={`rounded-2xl p-8 mb-12 ${
              theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
            }`}>
              <h2 className={`text-2xl font-bold text-center mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                ✨ 特色功能
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl ${
                    theme === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
                  }`}>
                    🧠
                  </div>
                  <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    性格深度分析
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    全面解析优势特质和成长空间
                  </p>
                </div>
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl ${
                    theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    💼
                  </div>
                  <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    职业发展建议
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    基于血型特质的职业指导
                  </p>
                </div>
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl ${
                    theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                  }`}>
                    💊
                  </div>
                  <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    健康风险评估
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    专业的健康建议和预防措施
                  </p>
                </div>
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl ${
                    theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                  }`}>
                    👥
                  </div>
                  <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    人际关系指导
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    深入了解人际相处之道
                  </p>
                </div>
              </div>
            </div>

            {/* 血型分布统计 */}
            <div className={`rounded-2xl p-8 mb-12 ${
              theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
            }`}>
              <h2 className={`text-2xl font-bold text-center mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                🌍 全球血型分布
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">⭕</div>
                  <h3 className={`font-bold text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    O型血
                  </h3>
                  <p className={`text-2xl font-bold text-orange-500 mb-1`}>46%</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    最常见血型
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🅰️</div>
                  <h3 className={`font-bold text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    A型血
                  </h3>
                  <p className={`text-2xl font-bold text-red-500 mb-1`}>40%</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    较为常见
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🅱️</div>
                  <h3 className={`font-bold text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    B型血
                  </h3>
                  <p className={`text-2xl font-bold text-blue-500 mb-1`}>11%</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    相对少见
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🆎</div>
                  <h3 className={`font-bold text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    AB型血
                  </h3>
                  <p className={`text-2xl font-bold text-purple-500 mb-1`}>3%</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    最稀有血型
                  </p>
                </div>
              </div>
            </div>

            {/* 底部导航 */}
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className={`${
                  theme === 'dark'
                    ? 'border-white/20 text-white hover:bg-white/10'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                ← 返回首页
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 血型测试页面
  if (viewMode === 'test') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-red-900 to-slate-900'
          : 'bg-gradient-to-br from-red-50 via-rose-50 to-pink-50'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setViewMode('intro')}
              className={`${
                theme === 'dark'
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              ← 返回
            </Button>
          </div>
          <BloodTypeTest 
            onComplete={handleBloodTypeTest}
            loading={loading}
          />
        </div>
      </div>
    );
  }

  // 血型分析结果页面
  if (viewMode === 'result' && result) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-red-900 to-slate-900'
          : 'bg-gradient-to-br from-red-50 via-rose-50 to-pink-50'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <BloodTypeResult 
            result={result}
            onRestart={handleRestart}
            onShare={handleShare}
          />
        </div>
      </div>
    );
  }

  // 血型配对页面
  if (viewMode === 'compatibility') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-red-900 to-slate-900'
          : 'bg-gradient-to-br from-red-50 via-rose-50 to-pink-50'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setViewMode('intro')}
              className={`${
                theme === 'dark'
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              ← 返回
            </Button>
          </div>
          <BloodTypeCompatibility 
            onAnalyze={handleCompatibilityTest}
            result={compatibilityResult}
            loading={loading}
          />
        </div>
      </div>
    );
  }

  return null;
};