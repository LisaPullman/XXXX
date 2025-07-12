import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { cn } from '../../../utils/cn';
import { TarotSpread, TarotReading as TarotReadingType } from '../types';

interface TarotReadingProps {
  spreads: TarotSpread[];
  onReading: (spreadId: string, question?: string) => void;
  loading?: boolean;
}

const difficultyColors = {
  beginner: 'from-green-400 to-green-600',
  intermediate: 'from-yellow-400 to-yellow-600',
  advanced: 'from-red-400 to-red-600'
};

const difficultyLabels = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级'
};

const categoryEmojis = {
  love: '💕',
  career: '💼',
  general: '🔮',
  spiritual: '✨'
};

const categoryLabels = {
  love: '感情',
  career: '事业',
  general: '综合',
  spiritual: '灵性'
};

export const TarotReading: React.FC<TarotReadingProps> = ({
  spreads,
  onReading,
  loading = false
}) => {
  const [selectedSpread, setSelectedSpread] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [category, setCategory] = useState<string>('all');

  const filteredSpreads = category === 'all' 
    ? spreads 
    : spreads.filter(spread => spread.category === category);

  const handleReading = () => {
    if (selectedSpread) {
      onReading(selectedSpread, question.trim() || undefined);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 safe-area-container">
      {/* 标题区域 */}
      <div className="text-center space-y-4 mobile-content">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4">
          <span className="text-2xl sm:text-3xl">🔮</span>
        </div>
        <h1 className="mobile-text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          塔罗占卜
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mobile-text-base">
          选择牌阵，提出问题，让塔罗牌为你指引方向
        </p>
      </div>

      {/* 问题输入 */}
      <Card>
        <CardHeader className="mobile-content">
          <h3 className="mobile-text-base font-semibold text-gray-800 dark:text-gray-200">
            💭 提出你的问题
          </h3>
        </CardHeader>
        <CardContent className="mobile-content">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="请输入你想要询问的问题（可选）"
            className="text-center mobile-input"
          />
          <p className="mobile-text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            提出具体明确的问题有助于获得更准确的解读
          </p>
        </CardContent>
      </Card>

      {/* 类别筛选 */}
      <div className="flex flex-wrap justify-center gap-2 mobile-content">
        <Button
          variant={category === 'all' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setCategory('all')}
          className="mobile-button"
        >
          全部
        </Button>
        {Object.entries(categoryLabels).map(([cat, label]) => (
          <Button
            key={cat}
            variant={category === cat ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setCategory(cat)}
            className="flex items-center space-x-1 mobile-button"
          >
            <span>{categoryEmojis[cat as keyof typeof categoryEmojis]}</span>
            <span>{label}</span>
          </Button>
        ))}
      </div>

      {/* 牌阵选择 */}
      <div className="mobile-grid gap-4">
        {filteredSpreads.map((spread) => (
          <Card
            key={spread.id}
            className={cn(
              'cursor-pointer transition-all duration-300 hover:scale-105 border-2',
              selectedSpread === spread.id
                ? 'border-purple-500 dark:border-purple-400 shadow-lg ring-2 ring-purple-200 dark:ring-purple-800'
                : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600',
              'relative overflow-hidden'
            )}
            onClick={() => setSelectedSpread(spread.id)}
          >
            <CardHeader className="relative mobile-content">
              {/* 难度标签 */}
              <div className={cn(
                'absolute top-2 right-2 px-2 py-1 rounded-full mobile-text-sm font-medium text-white',
                `bg-gradient-to-r ${difficultyColors[spread.difficulty]}`
              )}>
                {difficultyLabels[spread.difficulty]}
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-2xl sm:text-3xl">{spread.emoji}</span>
                <div>
                  <h3 className="mobile-text-base font-bold text-gray-800 dark:text-gray-200">
                    {spread.name}
                  </h3>
                  <div className="flex items-center space-x-1 mobile-text-sm text-gray-600 dark:text-gray-400">
                    <span>{categoryEmojis[spread.category]}</span>
                    <span>{categoryLabels[spread.category]}</span>
                    <span>•</span>
                    <span>{spread.positions.length}张牌</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="mobile-content">
              <p className="mobile-text-sm text-gray-600 dark:text-gray-300 mb-4">
                {spread.description}
              </p>
              
              {/* 牌位预览 */}
              <div className="relative h-24 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg overflow-hidden">
                {spread.positions.map((position, index) => (
                  <div
                    key={position.id}
                    className="absolute w-3 h-4 bg-purple-400 dark:bg-purple-600 rounded-sm transform -rotate-12"
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      transform: `translate(-50%, -50%) rotate(${index * 5 - 10}deg)`,
                      zIndex: spread.positions.length - index
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 开始占卜按钮 */}
      <div className="flex justify-center">
        <Button
          onClick={handleReading}
          disabled={!selectedSpread || loading}
          variant="gradient"
          size="lg"
          className="px-6 py-3 mobile-button"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              正在占卜...
            </>
          ) : (
            <>
              <span className="mr-2">🌟</span>
              开始占卜
            </>
          )}
        </Button>
      </div>

      {/* 占卜须知 */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
        <CardContent className="py-6 mobile-content">
          <h3 className="mobile-text-base font-semibold text-purple-900 dark:text-purple-100 mb-3">
            📜 占卜须知
          </h3>
          <div className="mobile-grid gap-4 mobile-text-sm">
            <div className="space-y-2">
              <h4 className="font-medium text-purple-800 dark:text-purple-200">心态准备</h4>
              <ul className="space-y-1 text-purple-700 dark:text-purple-300">
                <li>• 保持开放和真诚的心态</li>
                <li>• 专注于你的问题</li>
                <li>• 相信你的直觉感受</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-purple-800 dark:text-purple-200">解读建议</h4>
              <ul className="space-y-1 text-purple-700 dark:text-purple-300">
                <li>• 塔罗是指引，不是绝对预言</li>
                <li>• 关注牌的象征意义</li>
                <li>• 结合直觉理解牌意</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};