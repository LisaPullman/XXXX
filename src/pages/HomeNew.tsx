import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { useThemeStore } from '../stores/useThemeStore';

export const HomeNew: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();

  const modules = [
    {
      id: 'mbti',
      title: 'MBTI性格测评',
      icon: '🧠',
      description: '16种人格类型分析，深度了解你的性格特质、优势和发展方向',
      stats: ['⏱️ 10-15分钟', '📊 28题专业版', '🎯 16种人格类型'],
      gradient: 'from-blue-500 to-purple-600',
      bgGradient: 'from-blue-50 to-purple-50',
      route: '/mbti'
    },
    {
      id: 'astrology',
      title: '星座运势分析',
      icon: '⭐',
      description: '基于你的出生日期和时间，分析星座特质和运势走向',
      stats: ['⏱️ 5分钟', '📅 生日信息', '🌟 每日更新'],
      gradient: 'from-yellow-500 to-orange-600',
      bgGradient: 'from-yellow-50 to-orange-50',
      route: '/astrology'
    },
    {
      id: 'tarot',
      title: '塔罗牌占卜',
      icon: '🔮',
      description: '通过塔罗牌的神秘力量，探索你的过去、现在和未来',
      stats: ['⏱️ 10分钟', '🃏 3张牌', '✨ 深度解读'],
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50',
      route: '/tarot'
    },
    {
      id: 'bloodtype',
      title: '血型性格分析',
      icon: '🩸',
      description: '基于血型理论，分析你的性格倾向和行为特点',
      stats: ['⏱️ 3分钟', '🔬 血型选择', '📈 性格图谱'],
      gradient: 'from-red-500 to-rose-600',
      bgGradient: 'from-red-50 to-rose-50',
      route: '/bloodtype'
    },
    {
      id: 'palmistry',
      title: '手相面相分析',
      icon: '🤲',
      description: '通过手相面相特征，解读你的性格和命运走向',
      stats: ['⏱️ 8分钟', '📸 上传照片', '🔍 AI识别'],
      gradient: 'from-green-500 to-teal-600',
      bgGradient: 'from-green-50 to-teal-50',
      route: '/palmistry'
    },
    {
      id: 'iching',
      title: '易经八卦占卜',
      icon: '☯️',
      description: '运用古老的易经智慧，为你的人生问题提供指引',
      stats: ['⏱️ 12分钟', '🎲 投掷铜钱', '📜 古典解读'],
      gradient: 'from-gray-600 to-gray-800',
      bgGradient: 'from-gray-50 to-gray-100',
      route: '/iching'
    },
    {
      id: 'ai-master',
      title: 'AI综合大师',
      icon: '🤖',
      description: '融合所有测评结果，AI大师为您提供全方位的人生指导',
      stats: ['⏱️ 15分钟', '🧠 AI分析', '🎯 综合建议'],
      gradient: 'from-indigo-500 to-blue-600',
      bgGradient: 'from-indigo-50 to-blue-50',
      route: '/ai-master'
    },
    {
      id: 'meditation',
      title: '禅修教室',
      icon: '🧘‍♀️',
      description: '静心冥想空间，提供禅修音乐、经文诵读和心灵陪伴',
      stats: ['🎵 禅修音乐', '📿 经文诵读', '🤝 心灵陪伴'],
      gradient: 'from-emerald-500 to-cyan-600',
      bgGradient: 'from-emerald-50 to-cyan-50',
      route: '/meditation'
    }
  ];

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 渐变光晕 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>

        {/* 星光效果 */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <div
              key={`star-${i}`}
              className={`absolute rounded-full ${
                theme === 'dark' ? 'bg-white' : 'bg-purple-400'
              } animate-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                opacity: 0.3 + Math.random() * 0.7,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* 气泡效果 */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={`bubble-${i}`}
              className={`absolute rounded-full ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-purple-400/20 to-blue-400/20'
                  : 'bg-gradient-to-br from-purple-200/30 to-blue-200/30'
              } animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* 上升雪花效果 */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => {
            const animations = ['animate-snowfall-up', 'animate-snowfall-up-drift', 'animate-snowfall-up-gentle'];
            const snowflakes = ['❄', '❅', '❆', '✦', '✧', '✨', '⋆', '✩'];
            return (
              <div
                key={`snowflake-${i}`}
                className={`absolute ${
                  theme === 'dark' ? 'text-white/50' : 'text-blue-200/60'
                } pointer-events-none select-none ${
                  animations[i % 3]
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  fontSize: `${6 + Math.random() * 10}px`,
                  animationDelay: `${Math.random() * 12}s`,
                  animationDuration: `${8 + Math.random() * 6}s`
                }}
              >
                {snowflakes[Math.floor(Math.random() * snowflakes.length)]}
              </div>
            );
          })}
        </div>

        {/* 大雪花装饰 */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={`big-snowflake-${i}`}
              className={`absolute ${
                theme === 'dark' ? 'text-white/30' : 'text-blue-100/50'
              } pointer-events-none select-none animate-snowfall-up-gentle`}
              style={{
                left: `${Math.random() * 100}%`,
                fontSize: `${18 + Math.random() * 16}px`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            >
              {['❄', '❅', '❆'][Math.floor(Math.random() * 3)]}
            </div>
          ))}
        </div>

        {/* 微小星尘效果 */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={`stardust-${i}`}
              className={`absolute w-1 h-1 rounded-full ${
                theme === 'dark' ? 'bg-white/40' : 'bg-blue-300/50'
              } pointer-events-none animate-snowfall-up`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${10 + Math.random() * 8}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* 顶部导航 */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">✨</span>
              </div>
              <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>内在宇宙</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/login')}
                className={`${
                  theme === 'dark'
                    ? 'border-white/20 text-white hover:bg-white/10'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                登录
              </Button>
              <Button
                size="sm"
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                注册
              </Button>
            </div>
          </div>

          {/* 主标题区域 */}
          <div className="text-center mb-16">
            <div className="relative inline-block mb-8">
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  探索你的
                </span>
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  内在宇宙
                </span>
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
            </div>
            
            <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              融合科学心理测评与神秘命理艺术的一站式平台
              <br className="hidden sm:block" />
              为您开启深度的自我探索之旅，解锁人生密码
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                onClick={() => navigate('/mbti')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300"
              >
                🧠 开始探索
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/astrology')}
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full"
              >
                ✨ 查看运势
              </Button>
            </div>
          </div>

          {/* 七大模块卡片区域 */}
          <div className="mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              八大探索领域
            </h2>
            <p className={`text-lg text-center mb-12 max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              选择你感兴趣的测评类型，开启自我探索之旅
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {modules.map((module, index) => (
                <div
                  key={module.id}
                  className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl"
                  onClick={() => navigate(module.route)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* 卡片背景渐变 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.bgGradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    {/* 图标 */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${module.gradient} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {module.icon}
                    </div>
                    
                    {/* 标题 */}
                    <h3 className={`text-xl font-bold mb-3 transition-colors ${
                      theme === 'dark'
                        ? 'text-white group-hover:text-purple-300'
                        : 'text-gray-900 group-hover:text-purple-600'
                    }`}>
                      {module.title}
                    </h3>

                    {/* 描述 */}
                    <p className={`text-sm leading-relaxed mb-4 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {module.description}
                    </p>
                    
                    {/* 统计信息 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {module.stats.map((stat, statIndex) => (
                        <span
                          key={statIndex}
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            theme === 'dark'
                              ? 'bg-white/10 text-gray-300'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {stat}
                        </span>
                      ))}
                    </div>
                    
                    {/* 按钮 */}
                    <button className={`w-full py-2 px-4 bg-gradient-to-r ${module.gradient} text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200`}>
                      开始测评
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 底部统计信息 */}
          <div className="text-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>100,000+</div>
                <div className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>用户信赖</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>8</div>
                <div className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>专业领域</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>99.9%</div>
                <div className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>准确率</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
