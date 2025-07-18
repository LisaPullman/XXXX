import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { WiseMasterAvatar } from '../components/ui/WiseMasterAvatar';
import { useThemeStore } from '../stores/useThemeStore';

export const IChingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [baguaRotation, setBaguaRotation] = useState(0);

  // 八卦图旋转动画
  useEffect(() => {
    const interval = setInterval(() => {
      setBaguaRotation(prev => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

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
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-amber-900 via-orange-900 to-red-900'
        : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'
    }`}>
      {/* 八卦图背景 */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div
          className="w-96 h-96 transform transition-transform duration-100"
          style={{ transform: `rotate(${baguaRotation}deg)` }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {/* 外圆 */}
            <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="2"/>

            {/* 太极图 */}
            <circle cx="200" cy="200" r="60" fill="currentColor"/>
            <path d="M 200 140 A 30 30 0 0 1 200 200 A 30 30 0 0 0 200 260 A 60 60 0 0 1 200 140" fill="white"/>
            <circle cx="200" cy="170" r="15" fill="white"/>
            <circle cx="200" cy="230" r="15" fill="currentColor"/>

            {/* 八卦符号 */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
              const trigrams = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷'];
              const x = 200 + 130 * Math.cos((angle - 90) * Math.PI / 180);
              const y = 200 + 130 * Math.sin((angle - 90) * Math.PI / 180);
              return (
                <text
                  key={index}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="24"
                  fill="currentColor"
                >
                  {trigrams[index]}
                </text>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 头部 */}
          <div className="text-center mb-12">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-5xl ${
              theme === 'dark' ? 'bg-gradient-to-br from-amber-600 to-orange-700' : 'bg-gradient-to-br from-amber-400 to-orange-500'
            } shadow-2xl`}>
              ☯️
            </div>
            <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-amber-100' : 'text-amber-900'
            }`}>
              易经八卦
            </h1>
            <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-amber-200' : 'text-amber-700'
            }`}>
              探索五千年易经智慧，通过AI算运与古典知识指引人生方向
            </p>
          </div>

          {/* 主要功能模块 */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* AI算运模块 */}
            <div
              className={`group relative rounded-2xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20'
                  : 'bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl'
              }`}
              onClick={() => navigate('/bagua/ai-divination')}
            >
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <WiseMasterAvatar 
                    size="lg" 
                    isActive={true}
                    showAura={true}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h2 className={`text-2xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-amber-100' : 'text-amber-900'
                }`}>
                  AI算运
                </h2>
                <p className={`mb-6 leading-relaxed ${
                  theme === 'dark' ? 'text-amber-200' : 'text-amber-700'
                }`}>
                  与AI智者对话，通过古老的易经智慧为您解答人生疑惑，预测运势走向
                </p>
                <div className="flex justify-center space-x-4 text-sm">
                  <span className={`px-3 py-1 rounded-full ${
                    theme === 'dark' ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-600'
                  }`}>
                    • 智者对话
                  </span>
                  <span className={`px-3 py-1 rounded-full ${
                    theme === 'dark' ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-600'
                  }`}>
                    • 运势预测
                  </span>
                  <span className={`px-3 py-1 rounded-full ${
                    theme === 'dark' ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-600'
                  }`}>
                    • 结果分享
                  </span>
                </div>
              </div>
            </div>

            {/* 八卦知识模块 */}
            <div
              className={`group relative rounded-2xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20'
                  : 'bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl'
              }`}
              onClick={() => navigate('/bagua/knowledge')}
            >
              <div className="text-center">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                    : 'bg-gradient-to-br from-blue-400 to-purple-500'
                } shadow-lg group-hover:shadow-xl transition-shadow`}>
                  📚
                </div>
                <h2 className={`text-2xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-amber-100' : 'text-amber-900'
                }`}>
                  八卦知识
                </h2>
                <p className={`mb-6 leading-relaxed ${
                  theme === 'dark' ? 'text-amber-200' : 'text-amber-700'
                }`}>
                  深入学习易经八卦的奥秘，了解64卦的含义，掌握古代智慧的精髓
                </p>
                <div className="flex justify-center space-x-4 text-sm">
                  <span className={`px-3 py-1 rounded-full ${
                    theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                  }`}>
                    • 64卦详解
                  </span>
                  <span className={`px-3 py-1 rounded-full ${
                    theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                  }`}>
                    • 智慧语录
                  </span>
                  <span className={`px-3 py-1 rounded-full ${
                    theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                  }`}>
                    • 现代应用
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 易经智慧介绍 */}
          <div className={`rounded-2xl p-6 sm:p-8 mb-12 ${
            theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
          }`}>
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-amber-100' : 'text-amber-900'
            }`}>
              易经智慧
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl ${
                  theme === 'dark' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  📖
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                  群经之首
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                  易经被誉为"群经之首"，是中华文化的源头活水，包含着深刻的哲学思想和人生智慧。
                </p>
              </div>

              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl ${
                  theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  ⚖️
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                  阴阳平衡
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                  易经强调阴阳平衡的重要性，教导我们在变化中寻找平衡，在对立中寻求统一。
                </p>
              </div>

              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl ${
                  theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                }`}>
                  🔄
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                  变化之道
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
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
                  ? 'border-amber-300/30 text-amber-200 hover:bg-amber-500/10'
                  : 'border-amber-600 text-amber-700 hover:bg-amber-50'
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
