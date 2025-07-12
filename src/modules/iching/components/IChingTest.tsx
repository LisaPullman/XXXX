import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { DivinationInput, DivinationMethod, IChingResult } from '../types';
import { IChingService } from '../services';
import { cn } from '../../../utils/cn';

interface IChingTestProps {
  onComplete: (result: IChingResult) => void;
  className?: string;
}

type Step = 'intro' | 'question' | 'method' | 'practice' | 'processing';

export const IChingTest: React.FC<IChingTestProps> = ({
  onComplete,
  className
}) => {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [input, setInput] = useState<DivinationInput>({
    question: '',
    method: 'three-coins',
    numbers: [],
    coins: [],
    yarrow: undefined
  });
  
  const [coinThrows, setCoinThrows] = useState<number>(0);
  const [currentThrow, setCurrentThrow] = useState<number>(0);
  const [throwResults, setThrowResults] = useState<string[]>([]);
  
  const divinationMethods = IChingService.getDivinationMethods();
  
  const steps = ['intro', 'question', 'method', 'practice', 'processing'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;
  
  // 每日一卦
  const [dailyHexagram, setDailyHexagram] = useState<any>(null);
  
  useEffect(() => {
    const daily = IChingService.getDailyHexagram();
    setDailyHexagram(daily);
  }, []);
  
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
      case 'question':
        if (!input.question || input.question.trim().length < 3) {
          newErrors.question = '问题至少需要3个字符';
        }
        break;
      case 'method':
        if (!input.method) {
          newErrors.method = '请选择占卜方式';
        }
        break;
      case 'practice':
        if (input.method === 'numbers' && input.numbers?.length !== 6) {
          newErrors.numbers = '请输入6个数字';
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
      const result = await IChingService.performDivination(input);
      onComplete(result);
    } catch (error) {
      console.error('占卜失败:', error);
      setErrors({ general: '占卜过程中出现错误，请稍后重试' });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCoinThrow = () => {
    const results = [];
    for (let i = 0; i < 3; i++) {
      results.push(Math.random() > 0.5 ? '正面' : '反面');
    }
    
    const newThrowResults = [...throwResults, results.join(', ')];
    setThrowResults(newThrowResults);
    setCurrentThrow(currentThrow + 1);
    
    if (currentThrow >= 5) {
      // 完成投币，准备提交
      setTimeout(() => {
        handleSubmit();
      }, 1000);
    }
  };
  
  const handleNumberInput = (index: number, value: string) => {
    const num = parseInt(value);
    if (isNaN(num) || num < 1 || num > 9) return;
    
    const newNumbers = [...(input.numbers || [])];
    newNumbers[index] = num;
    setInput({ ...input, numbers: newNumbers });
  };
  
  // 介绍页面
  if (currentStep === 'intro') {
    return (
      <div className={cn('max-w-2xl mx-auto p-4 safe-area-container', className)}>
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          
          <div className="relative">
            <CardHeader className="text-center mobile-content">
              <div className="space-y-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-2xl sm:text-3xl">
                  ☯️
                </div>
                <div>
                  <h2 className="mobile-text-lg font-bold text-gray-800 mb-2">
                    易经占卜
                  </h2>
                  <p className="mobile-text-sm text-gray-600">
                    探索古老的东方智慧，洞察人生的奥秘
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="mobile-content">
              <div className="space-y-6">
                {/* 今日一卦 */}
                {dailyHexagram && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                    <h3 className="font-semibold text-amber-800 mb-2 mobile-text-sm">今日一卦</h3>
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl sm:text-4xl">{dailyHexagram.hexagram.symbol}</div>
                      <div>
                        <h4 className="font-bold text-amber-700 mobile-text-sm">
                          {dailyHexagram.hexagram.chineseName}（{dailyHexagram.hexagram.name}）
                        </h4>
                        <p className="mobile-text-sm text-amber-600 mt-1">
                          {dailyHexagram.wisdom}
                        </p>
                        <p className="mobile-text-sm text-amber-600 mt-1">
                          {dailyHexagram.advice}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* 占卜说明 */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2 mobile-text-sm">关于易经占卜</h3>
                  <div className="mobile-text-sm text-blue-700 space-y-2">
                    <p>• 易经是中华文明的瑰宝，距今已有3000多年历史</p>
                    <p>• 通过64卦象反映宇宙万物的变化规律</p>
                    <p>• 占卜不是算命，而是帮助我们理解当前状况</p>
                    <p>• 结果仅供参考，真正的命运掌握在自己手中</p>
                  </div>
                </div>
                
                {/* 占卜准备 */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2 mobile-text-sm">占卜前的准备</h3>
                  <div className="mobile-text-sm text-green-700 space-y-2">
                    <p>• 保持内心平静，专注于要问的问题</p>
                    <p>• 问题要明确具体，避免模糊不清</p>
                    <p>• 带着虔诚的心态进行占卜</p>
                    <p>• 一天内不要对同一问题重复占卜</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setCurrentStep('question')}
                    className="px-8 py-3 mobile-text-base mobile-button"
                  >
                    开始占卜
                  </Button>
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
      <div className={cn('max-w-2xl mx-auto p-4 safe-area-container', className)}>
        <Card className="text-center">
          <CardContent className="py-12 sm:py-16 mobile-content">
            <div className="space-y-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-2xl sm:text-3xl animate-pulse">
                ☯️
              </div>
              <div>
                <h2 className="mobile-text-lg font-bold text-gray-800 mb-2">
                  {input.method === 'three-coins' ? '投币占卜中...' : 
                   input.method === 'yarrow-sticks' ? '蓍草推演中...' : 
                   input.method === 'numbers' ? '数字起卦中...' : '随机生成卦象中...'}
                </h2>
                <p className="text-gray-600 mobile-text-sm">
                  正在为您解读天机，请稍候...
                </p>
              </div>
              
              {/* 投币过程显示 */}
              {input.method === 'three-coins' && throwResults.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-700 mobile-text-sm">投币结果：</h3>
                  {throwResults.map((result, index) => (
                    <div key={index} className="mobile-text-sm text-gray-600">
                      第{index + 1}次：{result}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (currentThrow + 1) * 16.67)}%` }}
                ></div>
              </div>
              
              <div className="text-sm text-gray-500 space-y-1">
                <p>🔮 正在生成卦象...</p>
                <p>📊 正在分析爻辞...</p>
                <p>✨ 正在解读天机...</p>
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
          <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-center">
            {currentStep === 'question' && '提出问题'}
            {currentStep === 'method' && '选择占卜方式'}
            {currentStep === 'practice' && '进行占卜'}
          </h2>
        </CardHeader>
        
        <CardContent>
          {/* 问题输入 */}
          {currentStep === 'question' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-2xl mb-4">
                  ❓
                </div>
                <p className="text-gray-600">
                  请输入您要占卜的问题，问题要明确具体
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  您要占卜的问题
                </label>
                <textarea
                  value={input.question}
                  onChange={(e) => setInput({ ...input, question: e.target.value })}
                  placeholder="例如：我应该换工作吗？这段感情会有结果吗？..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  rows={4}
                />
                {errors.question && (
                  <p className="text-red-500 text-sm mt-1">{errors.question}</p>
                )}
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">💡 问题提示</h3>
                <div className="text-sm text-yellow-700 space-y-1">
                  <p>• 避免问是非题，多问"如何"、"为什么"</p>
                  <p>• 关注内心真正关心的问题</p>
                  <p>• 问题要具体，不要过于宽泛</p>
                  <p>• 带着学习的心态，而非纯粹的好奇</p>
                </div>
              </div>
            </div>
          )}
          
          {/* 占卜方式选择 */}
          {currentStep === 'method' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-2xl mb-4">
                  🎯
                </div>
                <p className="text-gray-600">
                  选择您偏好的占卜方式
                </p>
              </div>
              
              <div className="grid gap-4">
                {divinationMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setInput({ ...input, method: method.id })}
                    className={cn(
                      'border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md',
                      input.method === method.id
                        ? 'border-amber-500 bg-amber-50 shadow-md'
                        : 'border-gray-200 hover:border-amber-300'
                    )}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center text-xl',
                        input.method === method.id
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      )}>
                        {method.id === 'three-coins' ? '🪙' : 
                         method.id === 'yarrow-sticks' ? '🎋' : 
                         method.id === 'numbers' ? '🔢' : '🎲'}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {method.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {method.description}
                        </p>
                        <div className="flex space-x-4 text-xs">
                          <span className="text-gray-500">
                            难度：{method.difficulty}
                          </span>
                          <span className="text-gray-500">
                            准确性：{method.accuracy}
                          </span>
                          <span className="text-gray-500">
                            用时：{method.timeRequired}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {input.method && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    {divinationMethods.find(m => m.id === input.method)?.name}操作步骤
                  </h3>
                  <div className="text-sm text-blue-700 space-y-1">
                    {divinationMethods.find(m => m.id === input.method)?.instructions.map((step, index) => (
                      <p key={index}>• {step}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* 占卜实践 */}
          {currentStep === 'practice' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-2xl mb-4">
                  {input.method === 'three-coins' ? '🪙' : 
                   input.method === 'yarrow-sticks' ? '🎋' : 
                   input.method === 'numbers' ? '🔢' : '🎲'}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {divinationMethods.find(m => m.id === input.method)?.name}
                </h3>
                <p className="text-gray-600">
                  请按照说明进行占卜
                </p>
              </div>
              
              {/* 三钱法 */}
              {input.method === 'three-coins' && (
                <div className="text-center space-y-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-amber-800 mb-4">
                      请准备好三枚硬币，心中默念问题，然后点击开始投币
                    </p>
                    <p className="text-sm text-amber-600">
                      需要投币6次，每次投掷3枚硬币
                    </p>
                  </div>
                  
                  {currentThrow < 6 && (
                    <div>
                      <p className="text-lg font-semibold text-gray-700 mb-4">
                        第 {currentThrow + 1} 次投币
                      </p>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleCoinThrow}
                        className="px-8 py-3"
                      >
                        投币
                      </Button>
                    </div>
                  )}
                  
                  {throwResults.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-700 mb-2">投币记录：</h4>
                      {throwResults.map((result, index) => (
                        <div key={index} className="text-sm text-gray-600 mb-1">
                          第{index + 1}次：{result}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* 数字起卦 */}
              {input.method === 'numbers' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 mb-2">
                      请输入6个数字（1-9），可以是任意想到的数字
                    </p>
                    <p className="text-sm text-blue-600">
                      比如：生日、时间、电话号码等
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-3">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <div key={index} className="text-center">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          第{index + 1}个
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="9"
                          value={input.numbers?.[index] || ''}
                          onChange={(e) => handleNumberInput(index, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-center focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {errors.numbers && (
                    <p className="text-red-500 text-sm text-center">{errors.numbers}</p>
                  )}
                </div>
              )}
              
              {/* 随机起卦 */}
              {input.method === 'random' && (
                <div className="text-center space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-purple-800 mb-2">
                      请保持内心平静，专注于您的问题
                    </p>
                    <p className="text-sm text-purple-600">
                      系统将为您随机生成卦象
                    </p>
                  </div>
                  
                  <div className="text-lg text-gray-700">
                    准备就绪，点击下方按钮开始占卜
                  </div>
                </div>
              )}
              
              {/* 蓍草法 */}
              {input.method === 'yarrow-sticks' && (
                <div className="text-center space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 mb-2">
                      蓍草法是最传统的占卜方式
                    </p>
                    <p className="text-sm text-green-600">
                      系统将模拟蓍草占卜的完整过程
                    </p>
                  </div>
                  
                  <div className="text-lg text-gray-700">
                    请保持虔诚的心态，点击下方按钮开始
                  </div>
                </div>
              )}
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
              onClick={currentStep === 'practice' ? handleSubmit : handleNext}
              disabled={loading || (input.method === 'three-coins' && currentThrow < 6)}
            >
              {currentStep === 'practice' ? '开始占卜' : '下一步'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};