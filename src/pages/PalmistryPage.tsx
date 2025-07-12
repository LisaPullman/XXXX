import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useThemeStore } from '../stores/useThemeStore';
import { PalmistryTest, PalmistryResult } from '../modules/palmistry';
import { ReadingType } from '../modules/palmistry/types';

type ViewMode = 'intro' | 'test' | 'result';

export const PalmistryPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const [viewMode, setViewMode] = useState<ViewMode>('intro');
  const [selectedAnalysis, setSelectedAnalysis] = useState<ReadingType | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const palmLines = [
    {
      id: 'life',
      name: '生命线',
      description: '反映生命力、健康状况和人生重大变化',
      location: '从拇指与食指间延伸至手腕',
      meanings: [
        '线条清晰深长：生命力旺盛，身体健康',
        '线条浅短：体质较弱，需注意保养',
        '有分叉：人生有重大转折点',
        '有岛纹：某段时期健康需要关注'
      ],
      color: 'from-red-500 to-pink-600',
      icon: '❤️'
    },
    {
      id: 'wisdom',
      name: '智慧线',
      description: '显示智力水平、思维方式和学习能力',
      location: '从拇指与食指间横向延伸',
      meanings: [
        '线条直而长：逻辑思维强，理性分析能力好',
        '线条弯曲：富有想象力，创造性思维',
        '线条短：注重实际，不喜欢复杂思考',
        '有分叉：思维活跃，多才多艺'
      ],
      color: 'from-blue-500 to-indigo-600',
      icon: '🧠'
    },
    {
      id: 'emotion',
      name: '感情线',
      description: '反映情感状态、爱情观和人际关系',
      location: '从小指下方横向延伸',
      meanings: [
        '线条深长：感情丰富，重视爱情',
        '线条浅短：理性大于感性',
        '有分叉：感情复杂，多段恋情',
        '线条平直：感情稳定，专一'
      ],
      color: 'from-pink-500 to-rose-600',
      icon: '💕'
    },
    {
      id: 'career',
      name: '事业线',
      description: '显示事业发展、工作能力和成就',
      location: '从手腕中央向上延伸',
      meanings: [
        '线条清晰：事业运佳，工作顺利',
        '线条断续：事业有起伏变化',
        '多条平行线：多重事业发展',
        '线条模糊：事业方向不明确'
      ],
      color: 'from-green-500 to-emerald-600',
      icon: '💼'
    }
  ];

  const faceFeatures = [
    {
      id: 'forehead',
      name: '额头',
      description: '反映智慧、早年运势和思维能力',
      features: [
        '宽阔饱满：智慧高，思维敏捷',
        '窄小：思维较为局限',
        '有皱纹：思虑过多，压力大',
        '光滑：心境平和，运势顺利'
      ],
      icon: '🧠'
    },
    {
      id: 'eyes',
      name: '眼睛',
      description: '心灵之窗，反映性格和内心世界',
      features: [
        '大而有神：聪明伶俐，观察力强',
        '细长：心思细腻，善于思考',
        '圆润：性格开朗，待人真诚',
        '深邃：内心丰富，有神秘感'
      ],
      icon: '👁️'
    },
    {
      id: 'nose',
      name: '鼻子',
      description: '财运之宫，反映财富和事业运势',
      features: [
        '挺直饱满：财运佳，事业有成',
        '鼻头圆润：聚财能力强',
        '鼻梁高：自尊心强，有领导力',
        '鼻翼宽：善于理财，财运稳定'
      ],
      icon: '👃'
    },
    {
      id: 'mouth',
      name: '嘴巴',
      description: '反映表达能力、人际关系和晚年运势',
      features: [
        '嘴形端正：表达能力强，人缘好',
        '嘴角上扬：乐观开朗，福气好',
        '唇厚：重感情，有包容心',
        '唇薄：理性，表达能力强'
      ],
      icon: '👄'
    }
  ];

  const analysisTypes = [
    { id: 'palmistry' as ReadingType, name: '手相分析', icon: '🤲', description: '通过手掌纹路解读命运' },
    { id: 'face-reading' as ReadingType, name: '面相分析', icon: '👤', description: '通过面部特征分析性格' },
    { id: 'both' as ReadingType, name: '综合分析', icon: '🔍', description: '手相面相综合解读' }
  ];

  const handleStartAnalysis = () => {
    if (selectedAnalysis) {
      setViewMode('test');
    }
  };

  const handleAnalysisComplete = (result: any) => {
    setAnalysisResult(result);
    setViewMode('result');
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setSelectedAnalysis(null);
    setViewMode('intro');
  };

  const handleShare = () => {
    if (analysisResult) {
      const shareText = `我的${selectedAnalysis === 'palmistry' ? '手相' : selectedAnalysis === 'face-reading' ? '面相' : '手面相'}分析结果！来试试看吧！`;
      if (navigator.share) {
        navigator.share({
          title: '手相面相分析结果',
          text: shareText,
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(shareText);
        alert('分析结果已复制到剪贴板');
      }
    }
  };

  // 测试页面
  if (viewMode === 'test' && selectedAnalysis) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-green-900 to-slate-900'
          : 'bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50'
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
          <PalmistryTest
            readingType={selectedAnalysis}
            onComplete={handleAnalysisComplete}
          />
        </div>
      </div>
    );
  }

  // 结果页面
  if (viewMode === 'result' && analysisResult) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-green-900 to-slate-900'
          : 'bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <PalmistryResult
            result={analysisResult}
            onRetake={handleNewAnalysis}
            onShare={handleShare}
          />
        </div>
      </div>
    );
  }

  // 介绍页面
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-green-900 to-slate-900'
        : 'bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50'
    }`}>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 头部 */}
          <div className="text-center mb-12">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl ${
              theme === 'dark' ? 'bg-gradient-to-br from-green-500 to-teal-600' : 'bg-gradient-to-br from-green-500 to-teal-600'
            }`}>
              🤲
            </div>
            <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              手相面相分析
            </h1>
            <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              通过古老的相术智慧，解读手掌纹路与面部特征，洞察性格与命运
            </p>
          </div>

          {/* 分析类型选择 */}
          <div className={`rounded-2xl p-6 sm:p-8 mb-12 ${
            theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
          }`}>
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              选择分析类型
            </h2>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {analysisTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setSelectedAnalysis(type.id)}
                  className={`rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedAnalysis === type.id
                      ? theme === 'dark'
                        ? 'bg-gradient-to-br from-green-500 to-teal-600 text-white'
                        : 'bg-gradient-to-br from-green-500 to-teal-600 text-white'
                      : theme === 'dark'
                        ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                        : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg'
                  }`}
                >
                  <div className="text-4xl mb-4">{type.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{type.name}</h3>
                  <p className="text-sm opacity-90">{type.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                disabled={!selectedAnalysis}
                onClick={handleStartAnalysis}
                className={`bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-green-500/25 transform hover:-translate-y-1 transition-all duration-300 ${
                  !selectedAnalysis && 'opacity-50 cursor-not-allowed'
                }`}
              >
                开始分析
              </Button>
              <p className={`text-sm mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {selectedAnalysis ? '准备开始详细分析' : '请先选择分析类型'}
              </p>
            </div>
          </div>

          {/* 手相知识 */}
          <div className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              手相基础知识
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {palmLines.map((line, index) => (
                <div key={index} className={`rounded-xl p-6 ${
                  theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
                }`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 mr-4 rounded-full bg-gradient-to-br ${line.color} flex items-center justify-center text-xl`}>
                      {line.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {line.name}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {line.location}
                      </p>
                    </div>
                  </div>
                  <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {line.description}
                  </p>
                  <div className="space-y-2">
                    {line.meanings.map((meaning, idx) => (
                      <div key={idx} className={`text-xs p-2 rounded ${
                        theme === 'dark' ? 'bg-white/10' : 'bg-gray-50'
                      }`}>
                        {meaning}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 面相知识 */}
          <div className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              面相基础知识
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {faceFeatures.map((feature, index) => (
                <div key={index} className={`rounded-xl p-6 text-center ${
                  theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
                }`}>
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className={`font-bold text-lg mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {feature.name}
                  </h3>
                  <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.features.map((feat, idx) => (
                      <div key={idx} className={`text-xs p-2 rounded text-left ${
                        theme === 'dark' ? 'bg-white/10' : 'bg-gray-50'
                      }`}>
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 相术文化 */}
          <div className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              相术文化
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl ${
                  theme === 'dark' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  📜
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  历史渊源
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  相术起源于古代中国，有着数千年的历史传承，是中华传统文化的重要组成部分。
                </p>
              </div>

              <div className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl ${
                  theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                }`}>
                  🔬
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  现代应用
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  结合现代心理学和AI技术，相术分析可以作为了解自我性格特征的有趣方式。
                </p>
              </div>

              <div className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl ${
                  theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                }`}>
                  🎯
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  参考价值
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  相术分析仅供娱乐参考，真正的命运掌握在自己手中，积极努力才是成功的关键。
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
