import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { PalmistryInput, ReadingType } from '../types';
import { PalmistryService } from '../services';
import { cn } from '../../../utils/cn';

interface PalmistryTestProps {
  onComplete: (result: any) => void;
  readingType: ReadingType;
  className?: string;
}

type Step = 'intro' | 'hand-shape' | 'palm-lines' | 'palm-mounts' | 'face-shape' | 'face-features' | 'processing';

export const PalmistryTest: React.FC<PalmistryTestProps> = ({
  onComplete,
  readingType,
  className
}) => {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [palmistryInput, setPalmistryInput] = useState<PalmistryInput>({
    handShape: {
      palmShape: '',
      fingerLength: '',
      palmWidth: ''
    },
    lines: {
      lifeLine: {
        length: '',
        depth: '',
        clarity: '',
        branches: false,
        islands: false
      },
      heartLine: {
        length: '',
        depth: '',
        clarity: '',
        branches: false,
        islands: false
      },
      headLine: {
        length: '',
        depth: '',
        clarity: '',
        branches: false,
        islands: false
      },
      fateLine: {
        length: '',
        depth: '',
        clarity: '',
        branches: false,
        islands: false
      }
    },
    mounts: {
      venus: '',
      jupiter: '',
      saturn: '',
      apollo: '',
      mercury: '',
      mars: '',
      luna: ''
    }
  });
  
  const [faceReadingInput, setFaceReadingInput] = useState({
    faceShape: {
      width: '',
      length: '',
      jawline: '',
      cheekbones: ''
    },
    features: {
      eyes: {
        shape: '',
        size: '',
        position: '',
        symmetry: ''
      },
      nose: {
        shape: '',
        size: '',
        position: '',
        symmetry: ''
      },
      mouth: {
        shape: '',
        size: '',
        position: '',
        symmetry: ''
      },
      eyebrows: {
        shape: '',
        size: '',
        position: '',
        symmetry: ''
      },
      ears: {
        shape: '',
        size: '',
        position: '',
        symmetry: ''
      }
    }
  });
  
  const presetOptions = PalmistryService.getPresetOptions();
  
  const steps = readingType === 'palmistry' 
    ? ['intro', 'hand-shape', 'palm-lines', 'palm-mounts', 'processing']
    : readingType === 'face-reading'
    ? ['intro', 'face-shape', 'face-features', 'processing']
    : ['intro', 'hand-shape', 'palm-lines', 'palm-mounts', 'face-shape', 'face-features', 'processing'];
  
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;
  
  const handleNext = () => {
    if (validateCurrentStep()) {
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < steps.length) {
        setCurrentStep(steps[nextIndex] as Step);
      } else {
        handleSubmit();
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
      case 'hand-shape':
        if (!palmistryInput.handShape.palmShape) {
          newErrors.palmShape = '请选择手掌形状';
        }
        if (!palmistryInput.handShape.fingerLength) {
          newErrors.fingerLength = '请选择手指长度';
        }
        if (!palmistryInput.handShape.palmWidth) {
          newErrors.palmWidth = '请选择手掌宽度';
        }
        break;
      case 'palm-lines':
        if (!palmistryInput.lines.lifeLine.length) {
          newErrors.lifeLine = '请描述生命线特征';
        }
        if (!palmistryInput.lines.heartLine.length) {
          newErrors.heartLine = '请描述感情线特征';
        }
        if (!palmistryInput.lines.headLine.length) {
          newErrors.headLine = '请描述智慧线特征';
        }
        break;
      case 'face-shape':
        if (!faceReadingInput.faceShape.width) {
          newErrors.faceWidth = '请选择面部宽度';
        }
        if (!faceReadingInput.faceShape.length) {
          newErrors.faceLength = '请选择面部长度';
        }
        break;
      case 'face-features':
        if (!faceReadingInput.features.eyes.size) {
          newErrors.eyes = '请描述眼部特征';
        }
        if (!faceReadingInput.features.nose.size) {
          newErrors.nose = '请描述鼻部特征';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    setLoading(true);
    setCurrentStep('processing');
    
    try {
      let result;
      
      if (readingType === 'palmistry') {
        result = await PalmistryService.performPalmistryReading(palmistryInput);
      } else if (readingType === 'face-reading') {
        result = await PalmistryService.performFaceReading(faceReadingInput);
      } else {
        result = await PalmistryService.performCombinedReading(palmistryInput, faceReadingInput);
      }
      
      onComplete(result);
    } catch (error) {
      console.error('分析失败:', error);
      setErrors({ general: '分析过程中出现错误，请稍后重试' });
    } finally {
      setLoading(false);
    }
  };
  
  if (currentStep === 'intro') {
    return (
      <div className={cn('max-w-2xl mx-auto p-4', className)}>
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-indigo-500/10"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          
          <div className="relative">
            <CardHeader className="text-center">
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-3xl">
                  👋
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {readingType === 'palmistry' ? '手相分析' : 
                     readingType === 'face-reading' ? '面相分析' : '手面相综合分析'}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {readingType === 'palmistry' ? '通过手掌纹理解读你的性格和命运' : 
                     readingType === 'face-reading' ? '通过面部特征分析你的性格特质' : 
                     '结合手相和面相，全面分析你的性格特征'}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">分析包含</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    {readingType === 'palmistry' && (
                      <>
                        <li>• 手型分析：了解你的基本性格类型</li>
                        <li>• 掌纹解读：生命线、感情线、智慧线、事业线</li>
                        <li>• 手掌丘位：各个区域的能量分析</li>
                        <li>• 综合建议：性格、事业、健康、感情指导</li>
                      </>
                    )}
                    {readingType === 'face-reading' && (
                      <>
                        <li>• 脸型分析：基本性格特征识别</li>
                        <li>• 五官解读：眼、鼻、口、眉、耳特征</li>
                        <li>• 面部比例：和谐度与性格关系</li>
                        <li>• 运势分析：事业、财运、感情预测</li>
                      </>
                    )}
                    {readingType === 'both' && (
                      <>
                        <li>• 手相全面分析：手型、掌纹、丘位</li>
                        <li>• 面相全面分析：脸型、五官、比例</li>
                        <li>• 一致性验证：手面相特征对比</li>
                        <li>• 综合建议：多维度性格分析</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                  <h3 className="font-semibold text-amber-800 mb-2">📝 填写指南</h3>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    请根据你的实际情况选择最符合的选项。如果不确定，可以选择"中等"或"正常"选项。
                    准确的描述有助于获得更精确的分析结果。
                  </p>
                </div>
                
                <div className="text-center">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setCurrentStep(steps[1] as Step)}
                    className="px-8 py-3 mobile-text-base mobile-button"
                  >
                    开始分析
                  </Button>
                </div>
                
                <div className="text-center mobile-text-sm text-gray-500">
                  预计需要时间：{readingType === 'both' ? '5-8' : '3-5'}分钟
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }
  
  if (currentStep === 'processing') {
    return (
      <div className={cn('max-w-2xl mx-auto p-4 safe-area-container', className)}>
        <Card className="text-center">
          <CardContent className="py-16">
            <div className="space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-3xl animate-pulse">
                🔮
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  正在分析中...
                </h2>
                <p className="text-gray-600">
                  请稍候，我们正在为您生成详细的分析报告
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                <p>🔍 正在分析您的特征...</p>
                <p>📊 正在生成个性化报告...</p>
                <p>✨ 即将完成...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className={cn('max-w-4xl mx-auto p-4 safe-area-container', className)}>
      {/* 进度条 */}
      <div className="mb-6 mobile-content">
        <div className="flex justify-between items-center mb-3">
          <span className="mobile-text-sm font-medium text-gray-700">
            步骤 {currentStepIndex + 1} / {steps.length}
          </span>
          <span className="mobile-text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <Card>
        <CardHeader className="mobile-content">
          <h2 className="mobile-text-lg font-semibold text-center">
            {currentStep === 'hand-shape' && '手型特征'}
            {currentStep === 'palm-lines' && '掌纹分析'}
            {currentStep === 'palm-mounts' && '手掌丘位'}
            {currentStep === 'face-shape' && '面部形状'}
            {currentStep === 'face-features' && '五官特征'}
          </h2>
        </CardHeader>
        
        <CardContent className="mobile-content">
          {/* 手型选择 */}
          {currentStep === 'hand-shape' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    手掌形状
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {presetOptions.handShapes.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setPalmistryInput(prev => ({
                          ...prev,
                          handShape: { ...prev.handShape, palmShape: option.value }
                        }))}
                        className={cn(
                          'p-3 rounded-lg border text-sm transition-colors',
                          palmistryInput.handShape.palmShape === option.value
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  {errors.palmShape && (
                    <p className="text-red-500 text-sm mt-1">{errors.palmShape}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    手指长度
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {presetOptions.fingerLengths.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setPalmistryInput(prev => ({
                          ...prev,
                          handShape: { ...prev.handShape, fingerLength: option.value }
                        }))}
                        className={cn(
                          'p-3 rounded-lg border text-sm transition-colors',
                          palmistryInput.handShape.fingerLength === option.value
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  {errors.fingerLength && (
                    <p className="text-red-500 text-sm mt-1">{errors.fingerLength}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  手掌宽度
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {presetOptions.palmWidths.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setPalmistryInput(prev => ({
                        ...prev,
                        handShape: { ...prev.handShape, palmWidth: option.value }
                      }))}
                      className={cn(
                        'p-3 rounded-lg border text-sm transition-colors',
                        palmistryInput.handShape.palmWidth === option.value
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {errors.palmWidth && (
                  <p className="text-red-500 text-sm mt-1">{errors.palmWidth}</p>
                )}
              </div>
            </div>
          )}
          
          {/* 掌纹分析 */}
          {currentStep === 'palm-lines' && (
            <div className="space-y-6">
              {Object.entries(palmistryInput.lines).map(([lineName, lineData]) => (
                <div key={lineName} className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-3">
                    {lineName === 'lifeLine' ? '生命线' :
                     lineName === 'heartLine' ? '感情线' :
                     lineName === 'headLine' ? '智慧线' : '事业线'}
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        长度
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {presetOptions.lineLengths.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setPalmistryInput(prev => ({
                              ...prev,
                              lines: {
                                ...prev.lines,
                                [lineName]: { ...prev.lines[lineName as keyof typeof prev.lines], length: option.value }
                              }
                            }))}
                            className={cn(
                              'p-2 rounded border text-xs transition-colors',
                              lineData.length === option.value
                                ? 'border-purple-500 bg-purple-50 text-purple-700'
                                : 'border-gray-200 hover:border-gray-300'
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        深度
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {presetOptions.lineDepths.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setPalmistryInput(prev => ({
                              ...prev,
                              lines: {
                                ...prev.lines,
                                [lineName]: { ...prev.lines[lineName as keyof typeof prev.lines], depth: option.value }
                              }
                            }))}
                            className={cn(
                              'p-2 rounded border text-xs transition-colors',
                              lineData.depth === option.value
                                ? 'border-purple-500 bg-purple-50 text-purple-700'
                                : 'border-gray-200 hover:border-gray-300'
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        清晰度
                      </label>
                      <div className="grid grid-cols-2 gap-1">
                        {presetOptions.lineClarity.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setPalmistryInput(prev => ({
                              ...prev,
                              lines: {
                                ...prev.lines,
                                [lineName]: { ...prev.lines[lineName as keyof typeof prev.lines], clarity: option.value }
                              }
                            }))}
                            className={cn(
                              'p-2 rounded border text-xs transition-colors',
                              lineData.clarity === option.value
                                ? 'border-purple-500 bg-purple-50 text-purple-700'
                                : 'border-gray-200 hover:border-gray-300'
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* 手掌丘位 */}
          {currentStep === 'palm-mounts' && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(palmistryInput.mounts).map(([mountName, development]) => (
                  <div key={mountName} className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-2">
                      {mountName === 'venus' ? '金星丘' :
                       mountName === 'jupiter' ? '木星丘' :
                       mountName === 'saturn' ? '土星丘' :
                       mountName === 'apollo' ? '太阳丘' :
                       mountName === 'mercury' ? '水星丘' :
                       mountName === 'mars' ? '火星丘' : '月亮丘'}
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {presetOptions.mountDevelopment.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setPalmistryInput(prev => ({
                            ...prev,
                            mounts: { ...prev.mounts, [mountName]: option.value }
                          }))}
                          className={cn(
                            'p-2 rounded border text-xs transition-colors',
                            development === option.value
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-200 hover:border-gray-300'
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 面部形状 */}
          {currentStep === 'face-shape' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    面部宽度
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {presetOptions.faceWidths.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFaceReadingInput(prev => ({
                          ...prev,
                          faceShape: { ...prev.faceShape, width: option.value }
                        }))}
                        className={cn(
                          'p-3 rounded-lg border text-sm transition-colors',
                          faceReadingInput.faceShape.width === option.value
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  {errors.faceWidth && (
                    <p className="text-red-500 text-sm mt-1">{errors.faceWidth}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    面部长度
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {presetOptions.faceLengths.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFaceReadingInput(prev => ({
                          ...prev,
                          faceShape: { ...prev.faceShape, length: option.value }
                        }))}
                        className={cn(
                          'p-3 rounded-lg border text-sm transition-colors',
                          faceReadingInput.faceShape.length === option.value
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  {errors.faceLength && (
                    <p className="text-red-500 text-sm mt-1">{errors.faceLength}</p>
                  )}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    下颌线条
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {presetOptions.jawlines.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFaceReadingInput(prev => ({
                          ...prev,
                          faceShape: { ...prev.faceShape, jawline: option.value }
                        }))}
                        className={cn(
                          'p-3 rounded-lg border text-sm transition-colors',
                          faceReadingInput.faceShape.jawline === option.value
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    颧骨
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {presetOptions.cheekbones.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFaceReadingInput(prev => ({
                          ...prev,
                          faceShape: { ...prev.faceShape, cheekbones: option.value }
                        }))}
                        className={cn(
                          'p-3 rounded-lg border text-sm transition-colors',
                          faceReadingInput.faceShape.cheekbones === option.value
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* 五官特征 */}
          {currentStep === 'face-features' && (
            <div className="space-y-6">
              {Object.entries(faceReadingInput.features).map(([featureName, featureData]) => (
                <div key={featureName} className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-3">
                    {featureName === 'eyes' ? '眼睛' :
                     featureName === 'nose' ? '鼻子' :
                     featureName === 'mouth' ? '嘴巴' :
                     featureName === 'eyebrows' ? '眉毛' : '耳朵'}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        大小
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {presetOptions.featureSizes.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setFaceReadingInput(prev => ({
                              ...prev,
                              features: {
                                ...prev.features,
                                [featureName]: { ...prev.features[featureName as keyof typeof prev.features], size: option.value }
                              }
                            }))}
                            className={cn(
                              'p-2 rounded border text-xs transition-colors',
                              featureData.size === option.value
                                ? 'border-purple-500 bg-purple-50 text-purple-700'
                                : 'border-gray-200 hover:border-gray-300'
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        对称性
                      </label>
                      <div className="grid grid-cols-2 gap-1">
                        {presetOptions.symmetry.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setFaceReadingInput(prev => ({
                              ...prev,
                              features: {
                                ...prev.features,
                                [featureName]: { ...prev.features[featureName as keyof typeof prev.features], symmetry: option.value }
                              }
                            }))}
                            className={cn(
                              'p-2 rounded border text-xs transition-colors',
                              featureData.symmetry === option.value
                                ? 'border-purple-500 bg-purple-50 text-purple-700'
                                : 'border-gray-200 hover:border-gray-300'
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
              disabled={currentStepIndex === 0}
            >
              上一步
            </Button>
            
            <div className="text-sm text-gray-500">
              {currentStepIndex + 1} / {steps.length}
            </div>
            
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={loading}
            >
              {currentStepIndex === steps.length - 1 ? '开始分析' : '下一步'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};