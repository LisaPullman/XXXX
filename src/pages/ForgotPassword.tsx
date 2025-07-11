import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAppStore } from '../stores/useAppStore';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useAppStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement actual API call to send password reset email
    console.log('Password reset request for:', email);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    addNotification({
      type: 'success',
      title: '请求已发送',
      message: '如果该邮箱已注册，您将收到一封密码重置邮件。',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-cosmic mb-2">重置密码</h1>
          <p className="text-gray-600">我们将向您发送重置链接</p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-center">忘记密码</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="email"
                type="email"
                label="注册邮箱地址"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入您的邮箱地址"
                required
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                loading={isLoading}
              >
                发送重置链接
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                记起密码了？{' '}
                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  返回登录
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
