import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../stores/useThemeStore';

export const TestLogin: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-8 transition-colors duration-300">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-900 dark:text-green-100">登录页面</h1>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
          >
            切换主题 ({theme})
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">测试登录页面</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">这是一个简化的登录页面，用于测试路由功能。</p>
          
          <div className="space-y-4">
            <button
              onClick={() => navigate('/')}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              返回首页
            </button>
            
            <button
              onClick={() => navigate('/mbti')}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              MBTI测试
            </button>
            
            <button
              onClick={() => navigate('/astrology')}
              className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              星座分析
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
