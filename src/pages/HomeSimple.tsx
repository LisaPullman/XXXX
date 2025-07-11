import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomeSimple: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 relative overflow-hidden">
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* 顶部导航区域 */}
          <div className="flex justify-between items-center mb-8 sm:mb-12">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">宇</span>
              </div>
              <span className="text-lg sm:text-xl font-semibold text-gray-800">内在宇宙</span>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => navigate('/login')}
                className="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50"
              >
                登录
              </button>
            </div>
          </div>

          {/* 主标题区域 */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="relative inline-block mb-6">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                  内在宇宙
                </span>
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-1 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full"></div>
            </div>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              融合科学心理测评与神秘命理艺术，为您开启一场深度的自我探索之旅
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => navigate('/mbti')}
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-medium text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                开始MBTI测试
              </button>
              <button 
                onClick={() => navigate('/astrology')}
                className="px-8 py-4 bg-gradient-to-r from-secondary-600 to-accent-600 text-white rounded-xl font-medium text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                星座分析
              </button>
            </div>
          </div>

          {/* 功能卡片区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">🧠</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">MBTI人格测试</h3>
              <p className="text-gray-600 leading-relaxed">
                通过28道专业题目，深度分析您的性格类型，了解自己的行为模式和思维方式
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">星座分析</h3>
              <p className="text-gray-600 leading-relaxed">
                基于您的出生日期，提供详细的星座特质分析和个性化解读
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">AI深度解读</h3>
              <p className="text-gray-600 leading-relaxed">
                结合测试结果，AI为您提供个性化的深度分析和生活建议
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
