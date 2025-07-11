import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../stores/useAuthStore';
import { useAppStore } from '../stores/useAppStore';

export const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, isLoading, error } = useAuthStore();
  const { addNotification } = useAppStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      addNotification({
        type: 'error',
        title: '注册失败',
        message: '两次输入的密码不一致',
      });
      return;
    }

    try {
      await register(email, password, { username });
      addNotification({
        type: 'success',
        title: '注册成功',
        message: '欢迎加入内在宇宙！已为您自动登录。',
      });
      navigate('/');
    } catch (error) {
      addNotification({
        type: 'error',
        title: '注册失败',
        message: error instanceof Error ? error.message : '注册过程中出现错误',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent-200/30 to-primary-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary-200/30 to-accent-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-primary-200/20 to-secondary-200/20 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6">
        <div className="w-full max-w-md">
          {/* 品牌标识区域 */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="relative inline-block mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl animate-glow">
                <span className="text-white text-2xl sm:text-3xl font-bold">宇</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold cosmic-text mb-2">
                内在宇宙
              </h1>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-1 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full"></div>
            </div>
            <p className="text-gray-700 text-base sm:text-lg font-medium">
              开启你的内心探索之旅
            </p>
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-cosmic mb-2">创建账户</h1>
          <p className="text-gray-600">开启你的内在探索之旅</p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-center">注册</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="username"
                type="text"
                label="用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入用户名"
                required
              />
              <Input
                id="email"
                type="email"
                label="邮箱地址"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入邮箱地址"
                required
              />
              <Input
                id="password"
                type="password"
                label="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                required
              />
              <Input
                id="confirmPassword"
                type="password"
                label="确认密码"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="请再次输入密码"
                required
              />

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                loading={isLoading}
              >
                立即注册
              </Button>

              <div className="text-center text-xs text-gray-500 mt-4">
                注册即表示您同意我们的
                <Link to="/terms-of-service" className="text-primary-600 hover:underline">
                  服务条款
                </Link>
                和
                <Link to="/privacy-policy" className="text-primary-600 hover:underline">
                  隐私政策
                </Link>
                。
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                已经有账户了？{' '}
                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  直接登录
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
