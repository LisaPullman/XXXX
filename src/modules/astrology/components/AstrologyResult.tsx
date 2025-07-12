import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { AstrologyResult as AstrologyResultType, ZodiacSign } from '../types';
import { astrologyCalculator } from '../utils/astrologyCalculator';
import { cn } from '../../../utils/cn';

interface AstrologyResultProps {
  result: AstrologyResultType;
  onRetake?: () => void;
  onShare?: () => void;
  className?: string;
}

type TabType = 'overview' | 'compatibility' | 'horoscope';

export const AstrologyResult: React.FC<AstrologyResultProps> = ({
  result,
  onRetake,
  onShare,
  className
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [compatibilitySign, setCompatibilitySign] = useState<ZodiacSign>('aries');
  
  const zodiacInfo = astrologyCalculator.getZodiacInfo(result.sunSign);
  const dailyHoroscope = astrologyCalculator.getDailyHoroscope(result.sunSign);
  const compatibility = astrologyCalculator.calculateCompatibility(result.sunSign, compatibilitySign);

  const tabs = [
    { id: 'overview' as TabType, label: '星座概览', icon: '⭐' },
    { id: 'compatibility' as TabType, label: '配对分析', icon: '💕' },
    { id: 'horoscope' as TabType, label: '今日运势', icon: '🔮' },
  ];

  const elementColors = {
    fire: 'from-red-500 to-orange-500',
    earth: 'from-green-500 to-yellow-500',
    air: 'from-blue-500 to-cyan-500',
    water: 'from-blue-600 to-purple-600'
  };

  const elementEmojis = {
    fire: '🔥',
    earth: '🌍',
    air: '💨',
    water: '🌊'
  };

  const qualityDescriptions = {
    cardinal: '开创型 - 善于开始新事物',
    fixed: '固定型 - 坚持不懈，意志坚定',
    mutable: '变动型 - 适应性强，灵活变通'
  };

  const zodiacSigns: { sign: ZodiacSign; name: string; symbol: string }[] = [
    { sign: 'aries', name: '白羊座', symbol: '♈' },
    { sign: 'taurus', name: '金牛座', symbol: '♉' },
    { sign: 'gemini', name: '双子座', symbol: '♊' },
    { sign: 'cancer', name: '巨蟹座', symbol: '♋' },
    { sign: 'leo', name: '狮子座', symbol: '♌' },
    { sign: 'virgo', name: '处女座', symbol: '♍' },
    { sign: 'libra', name: '天秤座', symbol: '♎' },
    { sign: 'scorpio', name: '天蝎座', symbol: '♏' },
    { sign: 'sagittarius', name: '射手座', symbol: '♐' },
    { sign: 'capricorn', name: '摩羯座', symbol: '♑' },
    { sign: 'aquarius', name: '水瓶座', symbol: '♒' },
    { sign: 'pisces', name: '双鱼座', symbol: '♓' }
  ];

  return (
    <div className={cn('max-w-4xl mx-auto p-4 space-y-6', className)}>
      {/* 主要结果卡片 */}
      <Card className="relative overflow-hidden">
        <div className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-10',
          elementColors[result.element]
        )}></div>
        
        <CardHeader className="relative text-center">
          <div className="space-y-4">
            <div className="text-6xl">{zodiacInfo.symbol}</div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-800">
                {zodiacInfo.name}
              </h1>
              <p className="text-lg text-gray-600">
                {zodiacInfo.dateRange}
              </p>
            </div>
            <div className="flex justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <span>{elementEmojis[result.element]}</span>
                <span className="font-medium">{result.element === 'fire' ? '火' : result.element === 'earth' ? '土' : result.element === 'air' ? '风' : '水'}象星座</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>🪐</span>
                <span className="font-medium">守护星：{result.rulingPlanet}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="relative">
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            {zodiacInfo.description}
          </p>
        </CardContent>
      </Card>

      {/* 标签页导航 */}
      <div className="flex justify-center">
        <div className="flex bg-white rounded-lg p-1 shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200',
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              <span>{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 标签页内容 */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 性格特质 */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-green-700">✨ 正面特质</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {zodiacInfo.traits.positive.map((trait, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{trait}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-orange-700">⚠️ 需要注意</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {zodiacInfo.traits.negative.map((trait, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>{trait}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* 个性化特质 */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">🎯 个性化分析</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.traits.map((trait, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    • {trait}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 幸运元素 */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-purple-700">🍀 幸运数字</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.luckyNumbers.map((number, index) => (
                    <span 
                      key={index}
                      className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold"
                    >
                      {number}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-pink-700">🎨 幸运颜色</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.luckyColors.map((color, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'compatibility' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">💕 星座配对分析</h3>
              <p className="text-gray-600">选择另一个星座，查看你们的兼容性</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 星座选择器 */}
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {zodiacSigns.map((zodiac) => (
                    <button
                      key={zodiac.sign}
                      onClick={() => setCompatibilitySign(zodiac.sign)}
                      className={cn(
                        'flex flex-col items-center p-3 rounded-lg border transition-colors',
                        compatibilitySign === zodiac.sign
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <span className="text-2xl">{zodiac.symbol}</span>
                      <span className="text-xs font-medium">{zodiac.name}</span>
                    </button>
                  ))}
                </div>

                {/* 兼容性结果 */}
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 border border-pink-200">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="text-4xl">{zodiacInfo.symbol}</div>
                      <div className="text-2xl">💕</div>
                      <div className="text-4xl">{zodiacSigns.find(z => z.sign === compatibilitySign)?.symbol}</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-gray-800">
                        兼容度：{compatibility.score}%
                      </div>
                      <div className={cn(
                        'inline-block px-3 py-1 rounded-full text-sm font-medium',
                        compatibility.level === 'excellent' && 'bg-green-100 text-green-700',
                        compatibility.level === 'good' && 'bg-blue-100 text-blue-700',
                        compatibility.level === 'average' && 'bg-yellow-100 text-yellow-700',
                        compatibility.level === 'challenging' && 'bg-red-100 text-red-700'
                      )}>
                        {compatibility.level === 'excellent' && '完美匹配'}
                        {compatibility.level === 'good' && '很好匹配'}
                        {compatibility.level === 'average' && '一般匹配'}
                        {compatibility.level === 'challenging' && '需要努力'}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {compatibility.description}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'horoscope' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">🔮 今日运势</h3>
              <p className="text-gray-600">{new Date().toLocaleDateString('zh-CN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">💫 整体运势</h4>
                    <p className="text-blue-700 text-sm">{dailyHoroscope.overall}</p>
                  </div>
                  
                  <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                    <h4 className="font-semibold text-pink-800 mb-2">💖 爱情运势</h4>
                    <p className="text-pink-700 text-sm">{dailyHoroscope.love}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">💼 事业运势</h4>
                    <p className="text-green-700 text-sm">{dailyHoroscope.career}</p>
                  </div>
                  
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-2">🏃 健康运势</h4>
                    <p className="text-orange-700 text-sm">{dailyHoroscope.health}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-yellow-800">🍀 今日幸运</h4>
                    <p className="text-yellow-700 text-sm">
                      幸运颜色：{dailyHoroscope.luckyColor} | 幸运数字：{dailyHoroscope.luckyNumber}
                    </p>
                  </div>
                  <div className="text-3xl">✨</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="primary" size="lg" onClick={onShare}>
          分享我的星座
        </Button>
        <Button variant="outline" size="lg" onClick={onRetake}>
          重新分析
        </Button>
      </div>
    </div>
  );
};
