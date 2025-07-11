import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { DatePicker } from '../ui/DatePicker';
import { AstrologyResult } from '../../types';
import { astrologyCalculator } from '../../utils/astrologyCalculator';
import { cn } from '../../utils/cn';

interface AstrologyTestProps {
  onComplete: (result: AstrologyResult) => void;
  className?: string;
}

export const AstrologyTest: React.FC<AstrologyTestProps> = ({
  onComplete,
  className
}) => {
  const [birthDate, setBirthDate] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!birthDate) {
      newErrors.birthDate = '请选择您的出生日期';
    } else {
      const date = new Date(birthDate);
      const now = new Date();
      if (date > now) {
        newErrors.birthDate = '出生日期不能是未来的日期';
      }
      if (date.getFullYear() < 1900) {
        newErrors.birthDate = '请输入有效的出生年份';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsCalculating(true);
    
    try {
      // 模拟计算延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result = astrologyCalculator.generateAstrologyResult(birthDate);
      onComplete(result);
    } catch (error) {
      console.error('星座分析计算失败:', error);
      setErrors({ general: '计算过程中出现错误，请稍后重试' });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className={cn('max-w-2xl mx-auto p-4', className)}>
      <Card className="relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/10 via-accent-500/5 to-primary-500/10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative">
          <CardHeader className="text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl">
                ✨
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  星座分析
                </h2>
                <p className="text-lg text-gray-600">
                  探索星空的奥秘，了解你的星座特质
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              {/* 介绍文字 */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">关于星座分析</h3>
                <p className="text-sm text-purple-700 leading-relaxed">
                  星座学是一门古老的智慧，通过分析天体运行对人格特质的影响，
                  帮助我们更好地了解自己的性格、优势和人生方向。
                  只需要您的出生日期，我们就能为您生成详细的星座分析报告。
                </p>
              </div>

              {/* 表单 */}
              <div className="space-y-4">
                <DatePicker
                  label="出生日期"
                  value={birthDate}
                  onChange={setBirthDate}
                  supportLunar={true}
                  error={errors.birthDate}
                  className="w-full"
                />

                {errors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-700">{errors.general}</p>
                  </div>
                )}
              </div>

              {/* 提交按钮 */}
              <div className="text-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={isCalculating}
                  className="px-12 py-4 text-lg relative"
                >
                  {isCalculating ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>星空计算中...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>🔮</span>
                      <span>开始星座分析</span>
                    </div>
                  )}
                </Button>
              </div>

              {/* 说明文字 */}
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-500">
                  分析将基于您的太阳星座进行
                </p>
                <div className="flex justify-center space-x-4 text-xs text-gray-400">
                  <span>🌟 性格特质</span>
                  <span>💫 运势分析</span>
                  <span>💝 兼容性测试</span>
                  <span>🍀 幸运元素</span>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* 星座符号装饰 */}
      <div className="mt-8 text-center">
        <div className="flex justify-center space-x-4 text-2xl opacity-60">
          <span>♈</span>
          <span>♉</span>
          <span>♊</span>
          <span>♋</span>
          <span>♌</span>
          <span>♍</span>
          <span>♎</span>
          <span>♏</span>
          <span>♐</span>
          <span>♑</span>
          <span>♒</span>
          <span>♓</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">十二星座守护着不同的人生智慧</p>
      </div>
    </div>
  );
};
