import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Modal } from '../../../components/ui/Modal';
import { cn } from '../../../utils/cn';
import { TarotCard } from '../types';

interface TarotLibraryProps {
  cards: TarotCard[];
  onCardSelect?: (card: TarotCard) => void;
}

export const TarotLibrary: React.FC<TarotLibraryProps> = ({
  cards,
  onCardSelect
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'major' | 'minor'>('all');
  const [filterSuit, setFilterSuit] = useState<'all' | 'wands' | 'cups' | 'swords' | 'pentacles'>('all');
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           card.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           card.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = filterType === 'all' || card.type === filterType;
      const matchesSuit = filterSuit === 'all' || card.suit === filterSuit;
      
      return matchesSearch && matchesType && matchesSuit;
    });
  }, [cards, searchTerm, filterType, filterSuit]);

  const suitEmojis = {
    wands: '🔥',
    cups: '💧',
    swords: '⚔️',
    pentacles: '⭐'
  };

  const suitNames = {
    wands: '权杖',
    cups: '圣杯',
    swords: '宝剑',
    pentacles: '星币'
  };

  const elementColors = {
    fire: 'from-red-400 to-orange-500',
    water: 'from-blue-400 to-cyan-500',
    air: 'from-yellow-400 to-yellow-500',
    earth: 'from-green-400 to-emerald-500'
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* 标题 */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4">
          <span className="text-3xl">📚</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          塔罗牌库
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          探索78张塔罗牌的深层含义与智慧
        </p>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索牌名、关键词..."
                className="w-full"
              />
            </div>
            <Select
              value={filterType}
              onValueChange={(value) => setFilterType(value as any)}
            >
              <Select.Option value="all">所有类型</Select.Option>
              <Select.Option value="major">大阿卡纳</Select.Option>
              <Select.Option value="minor">小阿卡纳</Select.Option>
            </Select>
            <Select
              value={filterSuit}
              onValueChange={(value) => setFilterSuit(value as any)}
              disabled={filterType !== 'minor'}
            >
              <Select.Option value="all">所有花色</Select.Option>
              <Select.Option value="wands">权杖</Select.Option>
              <Select.Option value="cups">圣杯</Select.Option>
              <Select.Option value="swords">宝剑</Select.Option>
              <Select.Option value="pentacles">星币</Select.Option>
            </Select>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              找到 {filteredCards.length} 张牌
            </div>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                网格
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                列表
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 牌库展示 */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredCards.map((card) => (
            <Card
              key={card.id}
              className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => setSelectedCard(card)}
            >
              <CardContent className="p-4 text-center">
                <div className={cn(
                  'w-full h-32 rounded-lg mb-3 flex flex-col items-center justify-center text-white text-2xl font-bold',
                  card.element ? `bg-gradient-to-br ${elementColors[card.element]}` : 'bg-gradient-to-br from-purple-500 to-pink-500'
                )}>
                  <span className="text-3xl mb-1">{card.emoji}</span>
                  {card.type === 'minor' && card.suit && (
                    <span className="text-lg">{suitEmojis[card.suit]}</span>
                  )}
                </div>
                
                <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-1">
                  {card.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {card.nameEn}
                </p>
                
                <div className="flex flex-wrap gap-1 justify-center">
                  {card.keywords.slice(0, 2).map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCards.map((card) => (
            <Card
              key={card.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-md"
              onClick={() => setSelectedCard(card)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    'w-16 h-20 rounded-lg flex items-center justify-center text-white text-xl',
                    card.element ? `bg-gradient-to-br ${elementColors[card.element]}` : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  )}>
                    {card.emoji}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-bold text-gray-800 dark:text-gray-200">
                        {card.name}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {card.nameEn}
                      </span>
                      {card.type === 'major' && (
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-xs">
                          大阿卡纳
                        </span>
                      )}
                      {card.suit && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs">
                          {suitEmojis[card.suit]} {suitNames[card.suit]}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {card.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {card.keywords.slice(0, 5).map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-full text-xs"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 牌详情模态框 */}
      {selectedCard && (
        <Modal
          isOpen={!!selectedCard}
          onClose={() => setSelectedCard(null)}
          title={selectedCard.name}
          size="lg"
        >
          <div className="space-y-6">
            {/* 牌面展示 */}
            <div className="text-center">
              <div className={cn(
                'w-32 h-44 mx-auto rounded-lg flex flex-col items-center justify-center text-white text-4xl font-bold mb-4',
                selectedCard.element ? `bg-gradient-to-br ${elementColors[selectedCard.element]}` : 'bg-gradient-to-br from-purple-500 to-pink-500'
              )}>
                <span className="text-5xl mb-2">{selectedCard.emoji}</span>
                {selectedCard.suit && (
                  <span className="text-2xl">{suitEmojis[selectedCard.suit]}</span>
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                {selectedCard.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                {selectedCard.nameEn}
              </p>
              
              <div className="flex justify-center space-x-2 mb-4">
                <span className={cn(
                  'px-3 py-1 rounded-full text-sm font-medium',
                  selectedCard.type === 'major' 
                    ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                    : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                )}>
                  {selectedCard.type === 'major' ? '大阿卡纳' : '小阿卡纳'}
                </span>
                {selectedCard.suit && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                    {suitNames[selectedCard.suit]}
                  </span>
                )}
                {selectedCard.element && (
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm">
                    {selectedCard.element === 'fire' ? '火' : 
                     selectedCard.element === 'water' ? '水' :
                     selectedCard.element === 'air' ? '风' : '土'}元素
                  </span>
                )}
              </div>
            </div>

            {/* 基本信息 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                基本含义
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedCard.description}
              </p>
            </div>

            {/* 正位含义 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                  ✨ 正位含义
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {selectedCard.upright.meaning}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {selectedCard.upright.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-pink-600 dark:text-pink-400">爱情：</span>
                      <span className="text-gray-600 dark:text-gray-400">{selectedCard.upright.love}</span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-600 dark:text-blue-400">事业：</span>
                      <span className="text-gray-600 dark:text-gray-400">{selectedCard.upright.career}</span>
                    </div>
                    <div>
                      <span className="font-medium text-green-600 dark:text-green-400">健康：</span>
                      <span className="text-gray-600 dark:text-gray-400">{selectedCard.upright.health}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 逆位含义 */}
              <div>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">
                  🔄 逆位含义
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {selectedCard.reversed.meaning}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {selectedCard.reversed.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-full text-xs"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-pink-600 dark:text-pink-400">爱情：</span>
                      <span className="text-gray-600 dark:text-gray-400">{selectedCard.reversed.love}</span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-600 dark:text-blue-400">事业：</span>
                      <span className="text-gray-600 dark:text-gray-400">{selectedCard.reversed.career}</span>
                    </div>
                    <div>
                      <span className="font-medium text-green-600 dark:text-green-400">健康：</span>
                      <span className="text-gray-600 dark:text-gray-400">{selectedCard.reversed.health}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 象征意义 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                🔍 象征意义
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedCard.symbolism.map((symbol, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-full text-sm"
                  >
                    {symbol}
                  </span>
                ))}
              </div>
            </div>

            {/* 建议 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">
                💡 指导建议
              </h3>
              <p className="text-purple-700 dark:text-purple-300 text-sm">
                {selectedCard.upright.advice}
              </p>
            </div>

            {/* 操作按钮 */}
            {onCardSelect && (
              <div className="text-center">
                <Button
                  onClick={() => {
                    onCardSelect(selectedCard);
                    setSelectedCard(null);
                  }}
                  variant="primary"
                  size="lg"
                >
                  选择此牌
                </Button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};