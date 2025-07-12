import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { AnalysisRequest, ModuleType, ComprehensiveAnalysis } from '../types';
import { AIMasterService } from '../services';
import { cn } from '../../../utils/cn';

interface AIMasterTestProps {
  onComplete: (result: ComprehensiveAnalysis) => void;
  availableResults?: {
    [key in ModuleType]?: any;
  };
  className?: string;
}

type Step = 'intro' | 'modules' | 'goals' | 'preferences' | 'review' | 'processing';

export const AIMasterTest: React.FC<AIMasterTestProps> = ({
  onComplete,
  availableResults = {},
  className
}) => {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [request, setRequest] = useState<AnalysisRequest>({
    includeModules: [],
    userInput: {
      basicInfo: {},
      goals: [],
      concerns: [],
      interests: [],
      preferences: {
        analysisDepth: 'detailed',
        focusAreas: [],
        communicationStyle: 'encouraging'
      }
    },
    existingResults: availableResults
  });
  
  const steps = ['intro', 'modules', 'goals', 'preferences', 'review', 'processing'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;
  
  const moduleOptions = [
    { 
      id: 'mbti' as ModuleType, 
      name: 'MBTI性格测试', 
      description: '16种人格类型分析',
      icon: '🧠',
      available: !!availableResults.mbti,
      weight: 'high'
    },
    { 
      id: 'astrology' as ModuleType, 
      name: '星座分析', 
      description: '基于出生日期的星座特征',
      icon: '⭐',
      available: !!availableResults.astrology,
      weight: 'medium'
    },
    { 
      id: 'bloodtype' as ModuleType, 
      name: '血型分析', 
      description: '血型与性格的关系',
      icon: '🩸',
      available: !!availableResults.bloodtype,
      weight: 'medium'
    },
    { 
      id: 'tarot' as ModuleType, 
      name: '塔罗占卜', 
      description: '塔罗牌的智慧指引',
      icon: '🔮',
      available: !!availableResults.tarot,
      weight: 'medium'
    },
    { 
      id: 'palmistry' as ModuleType, 
      name: '手相面相', 
      description: '手相和面相的分析',
      icon: '🤲',
      available: !!availableResults.palmistry,
      weight: 'low'
    },
    { 
      id: 'iching' as ModuleType, 
      name: '易经占卜', 
      description: '古老的易经智慧',
      icon: '☯️',
      available: !!availableResults.iching,
      weight: 'low'
    }
  ];
  
  const focusAreaOptions = [
    { id: 'career', name: '事业发展', icon: '💼', description: '职业规划和发展方向' },
    { id: 'relationships', name: '人际关系', icon: '💕', description: '社交和情感关系' },
    { id: 'personal_growth', name: '个人成长', icon: '🌱', description: '自我提升和发展' },
    { id: 'health', name: '身心健康', icon: '🏥', description: '身体和心理健康' },
    { id: 'finance', name: '财务状况', icon: '💰', description: '理财和财富积累' },
    { id: 'creativity', name: '创造力', icon: '🎨', description: '艺术和创新能力' },
    { id: 'spirituality', name: '精神追求', icon: '🙏', description: '哲学和精神层面' },
    { id: 'lifestyle', name: '生活方式', icon: '🏠', description: '日常生活和习惯' }
  ];
  
  useEffect(() => {
    // 自动选择可用的模块
    const availableModules = moduleOptions
      .filter(module => module.available)
      .map(module => module.id);
    
    if (availableModules.length > 0 && request.includeModules.length === 0) {
      setRequest(prev => ({
        ...prev,
        includeModules: availableModules
      }));
    }
  }, [availableResults]);
  
  const handleNext = () => {
    if (validateCurrentStep()) {
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < steps.length) {
        setCurrentStep(steps[nextIndex] as Step);
      }
    }
  };
  
  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex] as Step);
    }
  };
  
  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (currentStep) {
      case 'modules':
        if (request.includeModules.length === 0) {
          newErrors.modules = '请至少选择一个分析模块';
        }
        break;
      case 'goals':
        if (request.userInput.goals.length === 0) {
          newErrors.goals = '请至少设定一个目标';
        }
        break;
      case 'preferences':
        if (request.userInput.preferences.focusAreas.length === 0) {
          newErrors.focusAreas = '请至少选择一个关注领域';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    
    setLoading(true);
    setCurrentStep('processing');
    
    try {
      const result = await AIMasterService.performComprehensiveAnalysis(request);
      onComplete(result);
    } catch (error) {
      console.error('AI分析失败:', error);
      setErrors({ general: '分析过程中出现错误，请稍后重试' });
    } finally {
      setLoading(false);
    }
  };
  
  const handleModuleToggle = (moduleId: ModuleType) => {
    setRequest(prev => ({
      ...prev,
      includeModules: prev.includeModules.includes(moduleId)
        ? prev.includeModules.filter(id => id !== moduleId)
        : [...prev.includeModules, moduleId]
    }));
  };
  
  const handleGoalAdd = (goal: string) => {
    if (goal.trim() && !request.userInput.goals.includes(goal.trim())) {
      setRequest(prev => ({
        ...prev,
        userInput: {
          ...prev.userInput,
          goals: [...prev.userInput.goals, goal.trim()]
        }
      }));
    }
  };
  
  const handleGoalRemove = (index: number) => {
    setRequest(prev => ({
      ...prev,
      userInput: {
        ...prev.userInput,
        goals: prev.userInput.goals.filter((_, i) => i !== index)
      }
    }));
  };
  
  const handleFocusAreaToggle = (areaId: string) => {
    setRequest(prev => ({
      ...prev,
      userInput: {
        ...prev.userInput,
        preferences: {
          ...prev.userInput.preferences,
          focusAreas: prev.userInput.preferences.focusAreas.includes(areaId)
            ? prev.userInput.preferences.focusAreas.filter(id => id !== areaId)
            : [...prev.userInput.preferences.focusAreas, areaId]
        }
      }
    }));
  };
  
  // 介绍页面
  if (currentStep === 'intro') {
    return (
      <div className={cn('max-w-2xl mx-auto p-4 safe-area-container', className)}>
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          
          <div className="relative">
            <CardHeader className="text-center mobile-content">
              <div className="space-y-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-2xl sm:text-3xl">
                  🤖
                </div>
                <div>
                  <h2 className="mobile-text-lg font-bold text-gray-800 mb-2">
                    AI大师分析
                  </h2>
                  <p className="mobile-text-sm text-gray-600">
                    融合多维度数据，生成专属的深度人格洞察
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="mobile-content">
              <div className="space-y-6">
                {/* AI分析介绍 */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                  <h3 className="font-semibold text-indigo-800 mb-2 mobile-text-sm">AI大师的能力</h3>
                  <div className="mobile-text-sm text-indigo-700 space-y-2">
                    <p>• 整合多个测试结果，生成综合性格分析</p>
                    <p>• 识别性格特征间的一致性和矛盾点</p>
                    <p>• 提供个性化的发展建议和行动计划</p>
                    <p>• 支持智能对话，深度探讨个人问题</p>
                  </div>
                </div>
                
                {/* 可用模块展示 */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">可用的分析模块</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {moduleOptions.filter(m => m.available).map(module => (
                      <div key={module.id} className="flex items-center space-x-2 text-sm text-green-700">
                        <span>{module.icon}</span>
                        <span>{module.name}</span>
                        <span className="text-green-500">✓</span>
                      </div>
                    ))}
                  </div>
                  {moduleOptions.filter(m => m.available).length === 0 && (
                    <p className="text-sm text-orange-600">
                      建议先完成一些基础测试，获得更准确的分析结果
                    </p>
                  )}
                </div>
                
                {/* 分析流程 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">分析流程</h3>
                  <div className="text-sm text-blue-700 space-y-2">
                    <p>1. 选择要整合的分析模块</p>
                    <p>2. 设定个人目标和关注点</p>
                    <p>3. 配置分析偏好设置</p>
                    <p>4. AI生成综合分析报告</p>
                    <p>5. 开启智能对话深度探讨</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setCurrentStep('modules')}
                    className="px-12 py-4 text-lg"
                    disabled={moduleOptions.filter(m => m.available).length === 0}
                  >
                    开始AI分析
                  </Button>
                  {moduleOptions.filter(m => m.available).length === 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      请先完成其他模块的测试
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }
  
  // 处理中页面
  if (currentStep === 'processing') {
    return (
      <div className={cn('max-w-2xl mx-auto p-4', className)}>
        <Card className="text-center">
          <CardContent className="py-16">
            <div className="space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-3xl animate-pulse">
                🤖
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  AI大师分析中...
                </h2>
                <p className="text-gray-600">
                  正在深度分析您的多维度数据，生成专属洞察
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-center space-x-4 text-sm">
                  {request.includeModules.map(moduleId => {
                    const module = moduleOptions.find(m => m.id === moduleId);
                    return (
                      <div key={moduleId} className="flex items-center space-x-1">
                        <span>{module?.icon}</span>
                        <span className="text-gray-600">{module?.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
              
              <div className="text-sm text-gray-500 space-y-1">
                <p>🔍 正在整合多维度数据...</p>
                <p>🧠 AI正在生成深度洞察...</p>
                <p>📊 正在制定个性化建议...</p>
                <p>✨ 即将完成综合分析...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className={cn('max-w-4xl mx-auto p-4', className)}>
      {/* 进度条 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-700">
            步骤 {currentStepIndex + 1} / {steps.length}
          </span>
          <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-center">
            {currentStep === 'modules' && '选择分析模块'}
            {currentStep === 'goals' && '设定个人目标'}
            {currentStep === 'preferences' && '分析偏好设置'}
            {currentStep === 'review' && '确认分析配置'}
          </h2>
        </CardHeader>
        
        <CardContent>
          {/* 模块选择 */}
          {currentStep === 'modules' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-2xl mb-4">
                  📊
                </div>
                <p className="text-gray-600">
                  选择要整合分析的模块，建议选择多个模块获得更全面的洞察
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {moduleOptions.map(module => (
                  <div
                    key={module.id}
                    onClick={() => module.available && handleModuleToggle(module.id)}
                    className={cn(
                      'border rounded-lg p-4 transition-all duration-200',
                      module.available 
                        ? 'cursor-pointer hover:shadow-md' 
                        : 'opacity-50 cursor-not-allowed',
                      request.includeModules.includes(module.id)
                        ? 'border-indigo-500 bg-indigo-50 shadow-md'
                        : 'border-gray-200 hover:border-indigo-300'
                    )}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center text-xl',
                        request.includeModules.includes(module.id)
                          ? 'bg-indigo-500 text-white'
                          : module.available
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-gray-50 text-gray-400'
                      )}>
                        {module.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-lg text-gray-800">
                            {module.name}
                          </h3>
                          {!module.available && (
                            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                              未完成
                            </span>
                          )}
                          {request.includeModules.includes(module.id) && (
                            <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
                              已选择
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          {module.description}
                        </p>
                        <div className="mt-2 text-xs text-gray-500">
                          权重：{module.weight === 'high' ? '高' : module.weight === 'medium' ? '中' : '低'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {errors.modules && (
                <p className="text-red-500 text-sm text-center">{errors.modules}</p>
              )}
            </div>
          )}
          
          {/* 目标设定 */}
          {currentStep === 'goals' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-2xl mb-4">
                  🎯
                </div>
                <p className="text-gray-600">
                  告诉AI您希望通过分析实现什么目标，这将帮助生成更针对性的建议
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  个人目标
                </label>
                <div className="space-y-3">
                  {request.userInput.goals.map((goal, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="flex-1 p-3 bg-gray-50 rounded-lg text-gray-700">
                        {goal}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGoalRemove(index)}
                      >
                        移除
                      </Button>
                    </div>
                  ))}
                  
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="例如：提升领导力、改善人际关系、找到人生方向..."
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleGoalAdd((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                        handleGoalAdd(input.value);
                        input.value = '';
                      }}
                    >
                      添加
                    </Button>
                  </div>
                </div>
                
                {errors.goals && (
                  <p className="text-red-500 text-sm mt-1">{errors.goals}</p>
                )}
              </div>
              
              {/* 预设目标建议 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-2">常见目标建议</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    '了解自己的性格特征',
                    '找到适合的职业方向',
                    '提升人际交往能力',
                    '改善情感关系',
                    '增强自信心',
                    '管理压力和情绪',
                    '制定人生规划',
                    '发现个人优势'
                  ].map(suggestion => (
                    <button
                      key={suggestion}
                      onClick={() => handleGoalAdd(suggestion)}
                      className="text-left p-2 bg-white rounded border hover:border-indigo-300 hover:bg-indigo-50 text-sm transition-colors"
                      disabled={request.userInput.goals.includes(suggestion)}
                    >
                      + {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* 偏好设置 */}
          {currentStep === 'preferences' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-2xl mb-4">
                  ⚙️
                </div>
                <p className="text-gray-600">
                  设置分析的深度和关注领域，个性化您的AI分析体验
                </p>
              </div>
              
              {/* 分析深度 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  分析深度
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'basic', name: '基础分析', desc: '快速概览' },
                    { value: 'detailed', name: '详细分析', desc: '深入解读' },
                    { value: 'comprehensive', name: '全面分析', desc: '最全面' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setRequest(prev => ({
                        ...prev,
                        userInput: {
                          ...prev.userInput,
                          preferences: {
                            ...prev.userInput.preferences,
                            analysisDepth: option.value as any
                          }
                        }
                      }))}
                      className={cn(
                        'p-3 rounded-lg border text-center transition-colors',
                        request.userInput.preferences.analysisDepth === option.value
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-indigo-300'
                      )}
                    >
                      <div className="font-medium">{option.name}</div>
                      <div className="text-sm text-gray-500">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 关注领域 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  重点关注领域
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {focusAreaOptions.map(area => (
                    <button
                      key={area.id}
                      onClick={() => handleFocusAreaToggle(area.id)}
                      className={cn(
                        'p-3 rounded-lg border text-center transition-colors',
                        request.userInput.preferences.focusAreas.includes(area.id)
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-indigo-300'
                      )}
                    >
                      <div className="text-2xl mb-1">{area.icon}</div>
                      <div className="font-medium text-sm">{area.name}</div>
                      <div className="text-xs text-gray-500">{area.description}</div>
                    </button>
                  ))}
                </div>
                
                {errors.focusAreas && (
                  <p className="text-red-500 text-sm mt-1">{errors.focusAreas}</p>
                )}
              </div>
              
              {/* 沟通风格 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  AI沟通风格
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'formal', name: '正式专业', desc: '严谨准确' },
                    { value: 'casual', name: '轻松随和', desc: '友好亲切' },
                    { value: 'encouraging', name: '积极鼓励', desc: '正面激励' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setRequest(prev => ({
                        ...prev,
                        userInput: {
                          ...prev.userInput,
                          preferences: {
                            ...prev.userInput.preferences,
                            communicationStyle: option.value as any
                          }
                        }
                      }))}
                      className={cn(
                        'p-3 rounded-lg border text-center transition-colors',
                        request.userInput.preferences.communicationStyle === option.value
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-indigo-300'
                      )}
                    >
                      <div className="font-medium">{option.name}</div>
                      <div className="text-sm text-gray-500">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* 确认页面 */}
          {currentStep === 'review' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-2xl mb-4">
                  ✅
                </div>
                <p className="text-gray-600">
                  请确认您的分析配置，确保所有设置符合您的需求
                </p>
              </div>
              
              <div className="space-y-4">
                {/* 选择的模块 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">分析模块</h3>
                  <div className="flex flex-wrap gap-2">
                    {request.includeModules.map(moduleId => {
                      const module = moduleOptions.find(m => m.id === moduleId);
                      return (
                        <span key={moduleId} className="inline-flex items-center space-x-1 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                          <span>{module?.icon}</span>
                          <span>{module?.name}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
                
                {/* 设定的目标 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">个人目标</h3>
                  <div className="space-y-1">
                    {request.userInput.goals.map((goal, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        • {goal}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 分析设置 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">分析设置</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>分析深度：{
                      request.userInput.preferences.analysisDepth === 'basic' ? '基础分析' :
                      request.userInput.preferences.analysisDepth === 'detailed' ? '详细分析' : '全面分析'
                    }</div>
                    <div>沟通风格：{
                      request.userInput.preferences.communicationStyle === 'formal' ? '正式专业' :
                      request.userInput.preferences.communicationStyle === 'casual' ? '轻松随和' : '积极鼓励'
                    }</div>
                    <div>关注领域：{request.userInput.preferences.focusAreas.map(areaId => {
                      const area = focusAreaOptions.find(a => a.id === areaId);
                      return area?.name;
                    }).join('、')}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {errors.general && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700">{errors.general}</p>
            </div>
          )}
          
          {/* 导航按钮 */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStepIndex === 0 || loading}
            >
              上一步
            </Button>
            
            <div className="text-sm text-gray-500">
              {currentStepIndex + 1} / {steps.length}
            </div>
            
            <Button
              variant="primary"
              onClick={currentStep === 'review' ? handleSubmit : handleNext}
              disabled={loading}
            >
              {currentStep === 'review' ? '开始AI分析' : '下一步'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};