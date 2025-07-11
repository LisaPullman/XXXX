import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../stores/useAuthStore';
import { useAppStore } from '../stores/useAppStore';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();
  const { addNotification } = useAppStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      addNotification({
        type: 'error',
        title: '登录失败',
        message: '请填写邮箱和密码',
      });
      return;
    }

    try {
      await login(email, password);
      addNotification({
        type: 'success',
        title: '登录成功',
        message: '欢迎回到内在宇宙！',
      });
      navigate('/');
    } catch (error) {
      addNotification({
        type: 'error',
        title: '登录失败',
        message: error instanceof Error ? error.message : '登录过程中出现错误',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-secondary-200/30 to-accent-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-accent-200/20 to-primary-200/20 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6">
        <div className="w-full max-w-md">
          {/* 品牌标识区域 */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="relative inline-block mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl animate-glow">
                <span className="text-white text-2xl sm:text-3xl font-bold">宇</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold cosmic-text mb-2">
                内在宇宙
              </h1>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-1 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full"></div>
            </div>
            <p className="text-gray-700 text-base sm:text-lg font-medium">
              探索内心，发现真实的自己
            </p>
          </div>

          <Card variant="glass" className="backdrop-blur-xl shadow-2xl border-white/20 animate-fade-in-scale">
            <CardHeader>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">欢迎回来</h2>
                <p className="text-gray-600 text-sm">登录你的账户，继续探索之旅</p>
              </div>
            </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="email"
                type="email"
                label="邮箱地址"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入邮箱地址"
                variant="modern"
                size="lg"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                }
                required
              />

              <Input
                id="password"
                type="password"
                label="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                variant="modern"
                size="lg"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
                required
              />

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl flex items-center space-x-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                fullWidth
                loading={isLoading}
                className="shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
              >
                {isLoading ? '登录中...' : '登录账户'}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                还没有账户？{' '}
                <Link 
                  to="/register" 
                  className="text-primary-600 hover:text-primary-700 font-semibold hover:underline transition-colors"
                >
                  立即注册
                </Link>
              </p>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 backdrop-blur-sm rounded-full">
                    或使用第三方登录
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Button 
                  variant="outline" 
                  size="lg"
                  fullWidth
                  className="hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-3 text-green-500" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7c4.78-.75 8.44-4.9 8.44-9.9 0-5.53-4.5-10.02-10-10.02z"/>
                  </svg>
                  <span className="font-medium">微信一键登录</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* 底部装饰 */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            点击登录表示同意 {' '}
            <a href="#" className="text-primary-600 hover:underline">用户协议</a> 和 {' '}
            <a href="#" className="text-primary-600 hover:underline">隐私政策</a>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};
