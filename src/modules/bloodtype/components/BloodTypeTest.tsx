import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

interface BloodTypeTestProps {
  onComplete: (bloodType: 'A' | 'B' | 'O' | 'AB') => void;
  loading?: boolean;
}

const bloodTypes = [
  {
    type: 'A' as const,
    name: 'A型血',
    emoji: '🅰️',
    description: '谨慎细心，追求完美',
    color: 'from-red-400 to-pink-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    keywords: ['完美主义', '责任感', '谨慎', '细心']
  },
  {
    type: 'B' as const,
    name: 'B型血',
    emoji: '🅱️',
    description: '乐观开朗，富有创造力',
    color: 'from-blue-400 to-teal-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    keywords: ['乐观', '创造力', '自由', '活泼']
  },
  {
    type: 'O' as const,
    name: 'O型血',
    emoji: '⭕',
    description: '自信坚强，具有领导力',
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    keywords: ['领导力', '自信', '坚强', '果断']
  },
  {
    type: 'AB' as const,
    name: 'AB型血',
    emoji: '🆎',
    description: '复杂多变，思维敏捷',
    color: 'from-purple-400 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    keywords: ['复杂', '理性', '创造力', '神秘']
  }
];

export const BloodTypeTest: React.FC<BloodTypeTestProps> = ({ onComplete, loading = false }) => {
  const [selectedType, setSelectedType] = useState<'A' | 'B' | 'O' | 'AB' | null>(null);

  const handleSubmit = () => {
    if (selectedType) {
      onComplete(selectedType);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 safe-area-container">
      {/* 标题区域 */}
      <div className="text-center space-y-4 mobile-content">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-purple-600 rounded-full mb-4">
          <span className="text-2xl sm:text-3xl">🩸</span>
        </div>
        <h1 className="mobile-text-lg font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
          血型性格分析
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mobile-text-base">
          选择你的血型，深入了解你的性格特质与人生密码
        </p>
      </div>

      {/* 血型选择卡片 */}
      <div className="mobile-grid gap-4">
        {bloodTypes.map((bloodType) => (
          <Card
            key={bloodType.type}
            className={cn(
              'cursor-pointer transition-all duration-300 hover:scale-105 border-2',
              selectedType === bloodType.type
                ? `${bloodType.borderColor} shadow-lg ring-2 ring-opacity-50`
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300',
              bloodType.bgColor
            )}
            onClick={() => setSelectedType(bloodType.type)}
          >
            <CardHeader className="text-center pb-3 mobile-content">
              <div className="flex items-center justify-center space-x-3">
                <span className="text-3xl sm:text-4xl">{bloodType.emoji}</span>
                <div>
                  <h3 className={cn(
                    'mobile-text-base font-bold bg-gradient-to-r bg-clip-text text-transparent',
                    bloodType.color
                  )}>
                    {bloodType.name}
                  </h3>
                  <p className="mobile-text-sm text-gray-600 dark:text-gray-300">
                    {bloodType.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 mobile-content">
              <div className="flex flex-wrap gap-2 justify-center">
                {bloodType.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className={cn(
                      'px-2 py-1 rounded-full mobile-text-sm font-medium',
                      selectedType === bloodType.type
                        ? 'bg-white/80 text-gray-700'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                    )}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 血型选择提示 */}
      {!selectedType && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="text-center py-6 mobile-content">
            <div className="text-xl sm:text-2xl mb-3">💡</div>
            <h3 className="mobile-text-base font-semibold text-blue-900 dark:text-blue-100 mb-2">
              不确定自己的血型？
            </h3>
            <p className="text-blue-700 dark:text-blue-300 mobile-text-sm">
              血型通常可以通过医院体检或献血时获得，也可以根据父母血型进行推测
            </p>
          </CardContent>
        </Card>
      )}

      {/* 确认按钮 */}
      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={!selectedType || loading}
          variant="gradient"
          size="lg"
          className="px-6 py-3 mobile-button"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              分析中...
            </>
          ) : (
            <>
              <span className="mr-2">🔮</span>
              开始分析
            </>
          )}
        </Button>
      </div>

      {/* 血型知识小贴士 */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="mobile-content">
          <h3 className="mobile-text-base font-semibold text-gray-800 dark:text-gray-200">
            🧬 血型知识小贴士
          </h3>
        </CardHeader>
        <CardContent className="space-y-3 mobile-content">
          <div className="mobile-grid gap-4 mobile-text-sm">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700 dark:text-gray-300">血型分布</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• O型血：全球约46%</li>
                <li>• A型血：全球约40%</li>
                <li>• B型血：全球约11%</li>
                <li>• AB型血：全球约3%</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700 dark:text-gray-300">血型特点</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• 血型由基因决定</li>
                <li>• 影响身体健康倾向</li>
                <li>• 与性格有统计学关联</li>
                <li>• 在某些文化中很重要</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};