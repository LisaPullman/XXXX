import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { DatePicker } from '../components/ui/DatePicker';
import { LocationPicker } from '../components/ui/LocationPicker';
import { useAuthStore } from '../stores/useAuthStore';
import { useAppStore } from '../stores/useAppStore';
import type { LocationData } from '../types';

const steps = [
  { id: 1, title: '基础信息', fields: ['username', 'gender'] },
  { id: 2, title: '生日信息', fields: ['birthDate', 'birthTime'] },
  { id: 3, title: '出生地点', fields: ['birthLocation'] },
];

export const ProfileSetup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    gender: '' as 'male' | 'female' | 'other' | '',
    birthDate: '',
    birthTime: '',
    birthLocation: null as LocationData | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { user, updateUser } = useAuthStore();
  const { addNotification } = useAppStore();
  const navigate = useNavigate();

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (value: string) => {
    setFormData((prev) => ({ ...prev, birthDate: value }));
  };

  const handleLocationChange = (location: LocationData) => {
    setFormData((prev) => ({ ...prev, birthLocation: location }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.username.trim()) newErrors.username = '请输入昵称';
        if (!formData.gender) newErrors.gender = '请选择性别';
        break;
      case 2:
        if (!formData.birthDate) newErrors.birthDate = '请选择出生日期';
        if (!formData.birthTime) newErrors.birthTime = '请选择出生时间';
        break;
      case 3:
        if (!formData.birthLocation) newErrors.birthLocation = '请选择出生城市';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    try {
      // 转换数据格式以适配用户存储
      const userData = {
        username: formData.username,
        gender: formData.gender || undefined,
        birthDate: formData.birthDate,
        birthTime: formData.birthTime,
        birthLocation: formData.birthLocation ? {
          city: formData.birthLocation.city,
          province: formData.birthLocation.province,
          latitude: formData.birthLocation.latitude,
          longitude: formData.birthLocation.longitude,
        } : undefined,
      };

      updateUser(userData);
      addNotification({
        type: 'success',
        title: '档案已更新',
        message: '您的个人信息已成功保存！',
      });
      navigate('/dashboard');
    } catch (error) {
      addNotification({
        type: 'error',
        title: '更新失败',
        message: '保存您的信息时出错，请稍后再试。',
      });
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-center">完善您的个人档案</h2>
            <p className="text-center text-gray-500 mt-1">
              提供准确的信息有助于我们为您生成更精准的分析报告
            </p>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {currentStep === 1 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">第一步：基础信息</h3>
                  <div className="space-y-4">
                    <Input
                      label="昵称"
                      name="username"
                      value={formData.username || user?.username || ''}
                      onChange={handleChange}
                      error={errors.username}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">性别</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      >
                        <option value="">请选择</option>
                        <option value="male">男</option>
                        <option value="female">女</option>
                        <option value="other">其他</option>
                      </select>
                      {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                    </div>
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">第二步：生日信息</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DatePicker
                      label="出生日期"
                      value={formData.birthDate}
                      onChange={handleDateChange}
                      supportLunar={true}
                      error={errors.birthDate}
                    />
                    <Input
                      label="出生时间"
                      name="birthTime"
                      type="time"
                      value={formData.birthTime}
                      onChange={handleChange}
                      error={errors.birthTime}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    精确的出生时间有助于生成更准确的星盘和八字分析
                  </p>
                </div>
              )}
              {currentStep === 3 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">第三步：出生地点</h3>
                  <LocationPicker
                    label="出生城市"
                    value={formData.birthLocation}
                    onChange={handleLocationChange}
                    error={errors.birthLocation}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    精确的出生地点用于计算星盘中的宫位和八字的地支信息
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <div className="p-6 flex justify-between items-center">
            <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1}>
              上一步
            </Button>
            {currentStep < steps.length ? (
              <Button onClick={handleNext}>下一步</Button>
            ) : (
              <Button onClick={handleSubmit}>完成并提交</Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
