import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useThemeStore } from '../stores/useThemeStore';

export const IChingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const questionTypes = [
    { id: 'general', name: '综合运势', description: '整体运势和发展方向', icon: '🌟' },
    { id: 'career', name: '事业发展', description: '工作机遇和职业规划', icon: '💼' },
    { id: 'love', name: '感情婚姻', description: '爱情状况和婚姻运势', icon: '💕' },
    { id: 'wealth', name: '财运投资', description: '财富积累和投资方向', icon: '💰' },
    { id: 'health', name: '健康养生', description: '身体状况和养生建议', icon: '🏥' },
    { id: 'study', name: '学业考试', description: '学习进展和考试运势', icon: '📚' }
  ];

  const eightTrigrams = [
    {
      name: '乾',
      symbol: '☰',
      element: '天',
      nature: '刚健',
      meaning: '创造、领导、父亲',
      description: '代表天、创造力、领导能力，象征刚健不息的精神。',
      keywords: ['创新', '领导', '刚强', '进取']
    },
    {
      name: '坤',
      symbol: '☷',
      element: '地',
      nature: '柔顺',
      meaning: '包容、承载、母亲',
      description: '代表地、包容力、承载能力，象征柔顺厚德的品质。',
      keywords: ['包容', '稳重', '柔顺', '承载']
    },
    {
      name: '震',
      symbol: '☳',
      element: '雷',
      nature: '动',
      meaning: '震动、觉醒、长男',
      description: '代表雷、震动力、觉醒能力，象征奋发向上的动力。',
      keywords: ['震动', '觉醒', '奋发', '突破']
    },
    {
      name: '巽',
      symbol: '☴',
      element: '风',
      nature: '入',
      meaning: '渗透、温和、长女',
      description: '代表风、渗透力、温和性，象征循序渐进的智慧。',
      keywords: ['渗透', '温和', '灵活', '适应']
    },
    {
      name: '坎',
      symbol: '☵',
      element: '水',
      nature: '陷',
      meaning: '险难、智慧、中男',
      description: '代表水、险难、智慧，象征在困境中寻找出路的能力。',
      keywords: ['智慧', '险难', '流动', '深沉']
    },
    {
      name: '离',
      symbol: '☲',
      element: '火',
      nature: '丽',
      meaning: '光明、美丽、中女',
      description: '代表火、光明、美丽，象征照亮前路的智慧之光。',
      keywords: ['光明', '美丽', '热情', '文明']
    },
    {
      name: '艮',
      symbol: '☶',
      element: '山',
      nature: '止',
      meaning: '停止、稳定、少男',
      description: '代表山、停止、稳定，象征知止而后有定的智慧。',
      keywords: ['稳定', '停止', '坚实', '沉静']
    },
    {
      name: '兑',
      symbol: '☱',
      element: '泽',
      nature: '悦',
      meaning: '喜悦、交流、少女',
      description: '代表泽、喜悦、交流，象征和谐愉悦的人际关系。',
      keywords: ['喜悦', '交流', '和谐', '滋润']
    }
  ];

  const divinationMethods = [
    {
      id: 'coins',
      name: '铜钱占卜',
      description: '传统三枚铜钱投掷法',
      steps: ['准备三枚铜钱', '静心思考问题', '投掷六次得卦', '解读卦象含义'],
      time: '10-15分钟',
      difficulty: '简单',
      icon: '🪙'
    },
    {
      id: 'yarrow',
      name: '蓍草占卜',
      description: '古典五十根蓍草占卜法',
      steps: ['准备蓍草', '分组计算', '重复三次', '组成完整卦象'],
      time: '30-45分钟',
      difficulty: '复杂',
      icon: '🌾'
    },
    {
      id: 'digital',
      name: '数字占卜',
      description: '现代数字随机生成法',
      steps: ['输入问题', '生成随机数', '转换为卦象', '查看解读'],
      time: '5分钟',
      difficulty: '简单',
      icon: '🔢'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900'
        : 'bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100'
    }`}>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 头部 */}
          <div className="text-center mb-12">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl ${
              theme === 'dark' ? 'bg-gradient-to-br from-gray-600 to-gray-800' : 'bg-gradient-to-br from-gray-600 to-gray-800'
            }`}>
              ☯️
            </div>
            <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              易经八卦占卜
            </h1>
            <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              运用五千年易经智慧，通过八卦占卜为人生困惑指点迷津
            </p>
          </div>

          {/* 问题类型选择 */}
          <div className={`rounded-2xl p-6 sm:p-8 mb-12 ${
            theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
          }`}>
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              选择占卜问题
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
              {questionTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setSelectedQuestion(type.id)}
                  className={`rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedQuestion === type.id
                      ? theme === 'dark'
                        ? 'bg-gradient-to-br from-gray-600 to-gray-800 text-white'
                        : 'bg-gradient-to-br from-gray-600 to-gray-800 text-white'
                      : theme === 'dark'
                        ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                        : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg'
                  }`}
                >
                  <div className="text-3xl mb-3">{type.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{type.name}</h3>
                  <p className="text-sm opacity-90">{type.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                disabled={!selectedQuestion}
                className={`bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-gray-500/25 transform hover:-translate-y-1 transition-all duration-300 ${
                  !selectedQuestion && 'opacity-50 cursor-not-allowed'
                }`}
              >
                开始占卜
              </Button>
              <p className={`text-sm mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {selectedQuestion ? '静心思考，准备接受易经指引' : '请先选择要占卜的问题类型'}
              </p>
            </div>
          </div>

          {/* 八卦介绍 */}
          <div className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              八卦基础知识
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {eightTrigrams.map((trigram, index) => (
                <div key={index} className={`rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 ${
                  theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl'
                }`}>
                  <div className="text-4xl mb-3">{trigram.symbol}</div>
                  <h3 className={`font-bold text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {trigram.name}
                  </h3>
                  <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {trigram.element} · {trigram.nature}
                  </p>
                  <p className={`text-xs mb-3 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {trigram.description}
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {trigram.keywords.map((keyword, idx) => (
                      <span key={idx} className={`text-xs px-2 py-1 rounded-full ${
                        theme === 'dark' ? 'bg-white/20 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 占卜方法 */}
          <div className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              占卜方法
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {divinationMethods.map((method, index) => (
                <div key={index} className={`rounded-xl p-6 ${
                  theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
                }`}>
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{method.icon}</div>
                    <h3 className={`font-bold text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {method.name}
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {method.description}
                    </p>
                  </div>

                  <div className="space-y-3 mb-4">
                    {method.steps.map((step, idx) => (
                      <div key={idx} className={`flex items-center text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <div className={`w-6 h-6 mr-3 rounded-full flex items-center justify-center text-xs font-bold ${
                          theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {idx + 1}
                        </div>
                        {step}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className={`px-2 py-1 rounded ${
                      theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {method.time}
                    </span>
                    <span className={`px-2 py-1 rounded ${
                      method.difficulty === '简单'
                        ? theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                        : theme === 'dark' ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {method.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 易经智慧 */}
          <div className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              易经智慧
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl ${
                  theme === 'dark' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  📖
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  群经之首
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  易经被誉为"群经之首"，是中华文化的源头活水，包含着深刻的哲学思想和人生智慧。
                </p>
              </div>

              <div className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl ${
                  theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  ⚖️
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  阴阳平衡
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  易经强调阴阳平衡的重要性，教导我们在变化中寻找平衡，在对立中寻求统一。
                </p>
              </div>

              <div className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl ${
                  theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                }`}>
                  🔄
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  变化之道
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  "易"即变化，易经揭示了万物变化的规律，指导我们如何在变化中把握机遇。
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
