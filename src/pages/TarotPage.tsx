import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useThemeStore } from '../stores/useThemeStore';

export const TarotPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const [selectedSpread, setSelectedSpread] = useState<string | null>(null);

  const tarotSpreads = [
    {
      id: 'three-card',
      name: '三张牌占卜',
      description: '过去、现在、未来',
      cards: 3,
      time: '10分钟',
      difficulty: '初级',
      icon: '🃏'
    },
    {
      id: 'love',
      name: '爱情占卜',
      description: '感情状况与发展',
      cards: 5,
      time: '15分钟',
      difficulty: '中级',
      icon: '💕'
    },
    {
      id: 'career',
      name: '事业占卜',
      description: '职业发展与机遇',
      cards: 7,
      time: '20分钟',
      difficulty: '中级',
      icon: '💼'
    },
    {
      id: 'celtic-cross',
      name: '凯尔特十字',
      description: '全面人生解读',
      cards: 10,
      time: '30分钟',
      difficulty: '高级',
      icon: '✨'
    }
  ];

  const majorArcana = [
    { name: '愚者', number: 0, meaning: '新开始、冒险、纯真', element: '风' },
    { name: '魔术师', number: 1, meaning: '创造力、意志力、技能', element: '火' },
    { name: '女祭司', number: 2, meaning: '直觉、神秘、内在智慧', element: '水' },
    { name: '皇后', number: 3, meaning: '丰饶、母性、创造', element: '土' },
    { name: '皇帝', number: 4, meaning: '权威、稳定、控制', element: '火' },
    { name: '教皇', number: 5, meaning: '传统、精神指导、学习', element: '土' },
    { name: '恋人', number: 6, meaning: '爱情、选择、和谐', element: '风' },
    { name: '战车', number: 7, meaning: '胜利、意志、前进', element: '水' },
    { name: '力量', number: 8, meaning: '勇气、耐心、内在力量', element: '火' },
    { name: '隐者', number: 9, meaning: '内省、寻找、智慧', element: '土' },
    { name: '命运之轮', number: 10, meaning: '变化、命运、循环', element: '火' },
    { name: '正义', number: 11, meaning: '公正、平衡、真理', element: '风' },
    { name: '倒吊人', number: 12, meaning: '牺牲、等待、新视角', element: '水' },
    { name: '死神', number: 13, meaning: '转变、结束、重生', element: '水' },
    { name: '节制', number: 14, meaning: '平衡、调和、耐心', element: '火' },
    { name: '恶魔', number: 15, meaning: '束缚、诱惑、物质', element: '土' },
    { name: '塔', number: 16, meaning: '突变、破坏、启示', element: '火' },
    { name: '星星', number: 17, meaning: '希望、灵感、指引', element: '风' },
    { name: '月亮', number: 18, meaning: '幻象、潜意识、恐惧', element: '水' },
    { name: '太阳', number: 19, meaning: '成功、快乐、活力', element: '火' },
    { name: '审判', number: 20, meaning: '重生、觉醒、宽恕', element: '火' },
    { name: '世界', number: 21, meaning: '完成、成就、圆满', element: '土' }
  ];

  const getElementColor = (element: string) => {
    switch (element) {
      case '火': return 'from-red-500 to-orange-600';
      case '水': return 'from-blue-500 to-cyan-600';
      case '风': return 'from-yellow-500 to-amber-600';
      case '土': return 'from-green-500 to-emerald-600';
      default: return 'from-purple-500 to-pink-600';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
        : 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50'
    }`}>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 头部 */}
          <div className="text-center mb-12">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl ${
              theme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-pink-600' : 'bg-gradient-to-br from-purple-500 to-pink-600'
            }`}>
              🔮
            </div>
            <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              塔罗牌占卜
            </h1>
            <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              通过古老的塔罗牌智慧，探索内心深处的答案，指引人生方向
            </p>
          </div>

          {/* 占卜牌阵选择 */}
          <div className={`rounded-2xl p-6 sm:p-8 mb-12 ${
            theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
          }`}>
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              选择占卜牌阵
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {tarotSpreads.map((spread) => (
                <div
                  key={spread.id}
                  onClick={() => setSelectedSpread(spread.id)}
                  className={`rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedSpread === spread.id
                      ? theme === 'dark'
                        ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white'
                        : 'bg-gradient-to-br from-purple-500 to-pink-600 text-white'
                      : theme === 'dark'
                        ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                        : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg'
                  }`}
                >
                  <div className="text-4xl mb-4">{spread.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{spread.name}</h3>
                  <p className="text-sm mb-4 opacity-90">{spread.description}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>牌数:</span>
                      <span>{spread.cards}张</span>
                    </div>
                    <div className="flex justify-between">
                      <span>时间:</span>
                      <span>{spread.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>难度:</span>
                      <span>{spread.difficulty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                disabled={!selectedSpread}
                className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300 ${
                  !selectedSpread && 'opacity-50 cursor-not-allowed'
                }`}
              >
                开始占卜
              </Button>
              <p className={`text-sm mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {selectedSpread ? '静心冥想，准备接受塔罗的指引' : '请先选择一种占卜牌阵'}
              </p>
            </div>
          </div>

          {/* 大阿尔卡纳介绍 */}
          <div className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              大阿尔卡纳 (Major Arcana)
            </h2>
            <p className={`text-center mb-8 max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              大阿尔卡纳由22张牌组成，代表人生的重大主题和精神成长的旅程
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {majorArcana.map((card, index) => (
                <div key={index} className={`rounded-lg p-4 text-center transition-all duration-300 hover:scale-105 ${
                  theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl'
                }`}>
                  <div className={`w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-br ${getElementColor(card.element)} flex items-center justify-center text-white font-bold text-sm`}>
                    {card.number}
                  </div>
                  <h3 className={`font-bold text-sm mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {card.name}
                  </h3>
                  <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {card.meaning}
                  </p>
                  <div className={`text-xs mt-2 opacity-75 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {card.element}象
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 塔罗知识 */}
          <div className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              塔罗基础知识
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl ${
                  theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                }`}>
                  📚
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  塔罗历史
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  塔罗牌起源于15世纪的欧洲，最初用作纸牌游戏，后来发展成为占卜工具，融合了神秘学、心理学和象征学的智慧。
                </p>
              </div>

              <div className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl ${
                  theme === 'dark' ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-100 text-pink-600'
                }`}>
                  🎴
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  牌组构成
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  标准塔罗牌由78张牌组成：22张大阿尔卡纳代表人生重大主题，56张小阿尔卡纳代表日常生活的各个方面。
                </p>
              </div>

              <div className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl ${
                  theme === 'dark' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                }`}>
                  🔮
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  占卜原理
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  塔罗占卜通过随机抽取的牌面组合，结合占卜者的直觉和经验，为询问者提供洞察和指导。
                </p>
              </div>
            </div>
          </div>

          {/* 底部导航 */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className={`${
                theme === 'dark'
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              ← 返回首页
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
