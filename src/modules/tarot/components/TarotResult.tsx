import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';
import { TarotReading } from '../types';

interface TarotResultProps {
  reading: TarotReading;
  onNewReading: () => void;
  onShare?: () => void;
}

export const TarotResult: React.FC<TarotResultProps> = ({
  reading,
  onNewReading,
  onShare
}) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const getCardPosition = (positionId: string) => {
    return reading.spread.positions.find(p => p.id === positionId);
  };

  const getCardData = (positionId: string) => {
    return reading.cards.find(c => c.position === positionId);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* 占卜结果头部 */}
      <Card className="border-2 border-purple-200 dark:border-purple-800">
        <CardContent className="text-center py-8">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4">
              <span className="text-4xl">{reading.spread.emoji}</span>
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {reading.spread.name}
            </h1>
            {reading.question && (
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">
                "{reading.question}"
              </p>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              占卜时间：{reading.timestamp.toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 牌阵展示 */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            🎴 牌阵展示
          </h3>
        </CardHeader>
        <CardContent>
          <div className="relative min-h-96 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-8">
            {reading.cards.map((cardData) => {
              const position = getCardPosition(cardData.position);
              if (!position) return null;

              return (
                <div
                  key={cardData.position}
                  className={cn(
                    'absolute cursor-pointer transition-all duration-300 hover:scale-110',
                    selectedCard === cardData.position && 'ring-2 ring-purple-500 ring-offset-2'
                  )}
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => setSelectedCard(
                    selectedCard === cardData.position ? null : cardData.position
                  )}
                >
                  {/* 塔罗牌 */}
                  <div className={cn(
                    'w-20 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg shadow-lg flex flex-col items-center justify-center text-white relative',
                    cardData.isReversed && 'transform rotate-180'
                  )}>
                    <span className="text-2xl mb-1">{cardData.card.emoji}</span>
                    <span className="text-xs text-center px-1 leading-tight">
                      {cardData.card.name}
                    </span>
                    {cardData.isReversed && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs">
                        R
                      </div>
                    )}
                  </div>
                  
                  {/* 位置标签 */}
                  <div className="mt-2 text-center">
                    <div className="bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-xs font-medium shadow-md">
                      {position.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
            点击牌面查看详细解读
          </p>
        </CardContent>
      </Card>

      {/* 选中牌的详细信息 */}
      {selectedCard && (
        <Card className="border-2 border-purple-300 dark:border-purple-700">
          <CardHeader>
            <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200">
              🔍 牌面详解
            </h3>
          </CardHeader>
          <CardContent>
            {(() => {
              const cardData = getCardData(selectedCard);
              const position = getCardPosition(selectedCard);
              if (!cardData || !position) return null;

              const meaning = cardData.isReversed ? cardData.card.reversed : cardData.card.upright;
              
              return (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      'w-16 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white text-xl',
                      cardData.isReversed && 'transform rotate-180'
                    )}>
                      {cardData.card.emoji}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        {cardData.card.name}
                        {cardData.isReversed && <span className="text-red-500 ml-2">（逆位）</span>}
                      </h4>
                      <p className="text-purple-600 dark:text-purple-400 font-medium">
                        {position.name}：{position.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        基本含义
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {meaning.meaning}
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        关键词
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {meaning.keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className={cn(
                              'px-2 py-1 rounded-full text-xs font-medium',
                              cardData.isReversed
                                ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                                : 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                            )}
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      指导建议
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {meaning.advice}
                    </p>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* 整体解读 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              🌟 整体解读
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {reading.interpretation.overall}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              💡 指导建议
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {reading.interpretation.advice}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 各位置详细解读 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            📝 位置解读
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? '收起' : '展开'}详细解读
          </Button>
        </CardHeader>
        {showDetails && (
          <CardContent>
            <div className="space-y-4">
              {reading.interpretation.positions.map((positionInterpretation, index) => {
                const position = getCardPosition(positionInterpretation.positionId);
                const cardData = getCardData(positionInterpretation.positionId);
                
                return (
                  <div
                    key={positionInterpretation.positionId}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-lg">{cardData?.card.emoji}</span>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {position?.name}
                      </h4>
                      {cardData?.isReversed && (
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-full text-xs">
                          逆位
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
                      {positionInterpretation.interpretation}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        )}
      </Card>

      {/* 总结 */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200">
            ✨ 解读总结
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-purple-700 dark:text-purple-300 leading-relaxed">
            {reading.interpretation.summary}
          </p>
        </CardContent>
      </Card>

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onShare}
          variant="outline"
          size="lg"
          className="flex items-center space-x-2"
        >
          <span>📤</span>
          <span>分享结果</span>
        </Button>
        <Button
          onClick={onNewReading}
          variant="primary"
          size="lg"
          className="flex items-center space-x-2"
        >
          <span>🔮</span>
          <span>新的占卜</span>
        </Button>
      </div>

      {/* 反思提示 */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="py-6">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
            🤔 反思时间
          </h3>
          <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
            <p>• 这次解读中哪些信息让你产生了共鸣？</p>
            <p>• 你准备如何运用这些指引到实际生活中？</p>
            <p>• 有什么新的思考角度或发现吗？</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};