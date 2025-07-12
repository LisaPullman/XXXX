import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useThemeStore } from '../stores/useThemeStore';
import { 
  TarotReading, 
  TarotResult, 
  TarotLibrary,
  TarotService
} from '../modules/tarot';
import { TarotSpread, TarotReading as TarotReadingType, TarotCard, DailyTarot } from '../modules/tarot/types';

type ViewMode = 'intro' | 'reading' | 'result' | 'library' | 'daily';

export const TarotPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const [viewMode, setViewMode] = useState<ViewMode>('intro');
  const [loading, setLoading] = useState(false);
  const [spreads, setSpreads] = useState<TarotSpread[]>([]);
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [readingResult, setReadingResult] = useState<TarotReadingType | null>(null);
  const [dailyTarot, setDailyTarot] = useState<DailyTarot | null>(null);

  // 初始化数据
  useEffect(() => {
    const initializeData = async () => {
      try {
        const [spreadsData, cardsData, dailyData] = await Promise.all([
          TarotService.getAllSpreads(),
          TarotService.getAllCards(),
          TarotService.getDailyTarot()
        ]);
        setSpreads(spreadsData);
        setCards(cardsData);
        setDailyTarot(dailyData);
      } catch (error) {
        console.error('加载塔罗数据失败:', error);
      }
    };

    initializeData();
  }, []);

  const handleReading = async (spreadId: string, question?: string) => {
    setLoading(true);
    try {
      const result = await TarotService.performReading(spreadId, question);
      setReadingResult(result);
      setViewMode('result');
    } catch (error) {
      console.error('塔罗占卜失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewReading = () => {
    setReadingResult(null);
    setViewMode('intro');
  };

  const handleShare = () => {
    if (readingResult) {
      const shareText = `我的塔罗占卜结果：${readingResult.spread.name}\\n${readingResult.interpretation.summary}\\n来试试塔罗占卜吧！`;
      if (navigator.share) {
        navigator.share({
          title: '塔罗占卜结果',
          text: shareText,
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(shareText);
        alert('占卜结果已复制到剪贴板');
      }
    }
  };

  // 介绍页面
  if (viewMode === 'intro') {
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
              <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-5xl ${
                theme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-pink-600' : 'bg-gradient-to-br from-purple-500 to-pink-600'
              }`}>
                🔮
              </div>
              <h1 className={`text-4xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}>
                塔罗占卜
              </h1>
              <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                通过古老的塔罗牌智慧，探索内心深处的答案，指引人生方向
              </p>
            </div>

            {/* 每日塔罗 */}
            {dailyTarot && (
              <div className={`rounded-2xl p-6 mb-12 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
              }`}>
                <h2 className={`text-2xl font-bold text-center mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  🌅 今日塔罗
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                  <div className={`w-32 h-44 rounded-lg flex flex-col items-center justify-center text-white text-3xl font-bold ${
                    dailyTarot.isReversed ? 'transform rotate-180' : ''
                  } bg-gradient-to-br from-purple-600 to-pink-600`}>
                    <span className="text-4xl mb-2">{dailyTarot.card.emoji}</span>
                    <span className="text-sm text-center px-2">{dailyTarot.card.name}</span>
                    {dailyTarot.isReversed && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs">
                        R
                      </div>
                    )}
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {dailyTarot.card.name}{dailyTarot.isReversed ? ' (逆位)' : ''}
                    </h3>
                    <p className={`mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {dailyTarot.energy}
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {dailyTarot.advice}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 功能选择 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className={`rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                theme === 'dark' 
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20' 
                  : 'bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl'
              }`}
              onClick={() => setViewMode('reading')}>
                <div className="text-6xl mb-4">🎴</div>
                <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  塔罗占卜
                </h3>
                <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  选择牌阵，进行专业的塔罗占卜，获得人生指引
                </p>
                <div className="flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full text-xs">
                    多种牌阵
                  </span>
                  <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 rounded-full text-xs">
                    智能解读
                  </span>
                </div>
              </div>

              <div className={`rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                theme === 'dark' 
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20' 
                  : 'bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl'
              }`}
              onClick={() => setViewMode('library')}>
                <div className="text-6xl mb-4">📚</div>
                <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  塔罗牌库
                </h3>
                <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  浏览78张完整塔罗牌，学习牌意和象征含义
                </p>
                <div className="flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full text-xs">
                    完整牌库
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs">
                    详细解释
                  </span>
                </div>
              </div>

              <div className={`rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                theme === 'dark' 
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20' 
                  : 'bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl'
              }`}
              onClick={() => setViewMode('daily')}>
                <div className="text-6xl mb-4">🌟</div>
                <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  每日指引
                </h3>
                <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  获取每日塔罗指引，了解今天的能量和建议
                </p>
                <div className="flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-full text-xs">
                    每日更新
                  </span>
                  <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-xs">
                    能量指引
                  </span>
                </div>
              </div>
            </div>

            {/* 特色介绍 */}
            <div className={`rounded-2xl p-8 mb-12 ${
              theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
            }`}>
              <h2 className={`text-2xl font-bold text-center mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                ✨ 专业特色
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl ${
                    theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                  }`}>
                    🎴
                  </div>
                  <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    完整牌库
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    78张标准塔罗牌，包含详细牌意解释
                  </p>
                </div>
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl ${
                    theme === 'dark' ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-100 text-pink-600'
                  }`}>
                    🔮
                  </div>
                  <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    多种牌阵
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    从简单到复杂的各种经典牌阵
                  </p>
                </div>
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl ${
                    theme === 'dark' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                  }`}>
                    🧠
                  </div>
                  <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    智能解读
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    基于传统塔罗理论的智能解读系统
                  </p>
                </div>
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl ${
                    theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    📖
                  </div>
                  <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    学习指导
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    深入了解塔罗的象征意义和历史
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
  }

  // 占卜页面
  if (viewMode === 'reading') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
          : 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setViewMode('intro')}
              className={`${
                theme === 'dark'
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              ← 返回
            </Button>
          </div>
          <TarotReading 
            spreads={spreads}
            onReading={handleReading}
            loading={loading}
          />
        </div>
      </div>
    );
  }

  // 占卜结果页面
  if (viewMode === 'result' && readingResult) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
          : 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <TarotResult 
            reading={readingResult}
            onNewReading={handleNewReading}
            onShare={handleShare}
          />
        </div>
      </div>
    );
  }

  // 牌库页面
  if (viewMode === 'library') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
          : 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setViewMode('intro')}
              className={`${
                theme === 'dark'
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              ← 返回
            </Button>
          </div>
          <TarotLibrary cards={cards} />
        </div>
      </div>
    );
  }

  return null;
};