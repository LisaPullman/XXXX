import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useThemeStore } from '../stores/useThemeStore';

export const MeditationPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const meditationCategories = [
    {
      id: 'music',
      name: '禅修音乐',
      description: '静心音乐，帮助您进入冥想状态',
      icon: '🎵',
      features: ['自然音效', '白噪音', '颂钵音乐', '古典禅乐'],
      color: 'from-green-500 to-emerald-600',
      tracks: [
        { name: '森林晨曦', duration: '30分钟', type: '自然音效' },
        { name: '海浪轻抚', duration: '45分钟', type: '自然音效' },
        { name: '颂钵冥想', duration: '20分钟', type: '颂钵音乐' },
        { name: '禅院钟声', duration: '60分钟', type: '古典禅乐' }
      ]
    },
    {
      id: 'scripture',
      name: '经文诵读',
      description: '经典佛经和禅修文本的音频诵读',
      icon: '📿',
      features: ['心经诵读', '金刚经', '禅修指导', '正念练习'],
      color: 'from-amber-500 to-orange-600',
      tracks: [
        { name: '般若波罗蜜多心经', duration: '5分钟', type: '经文诵读' },
        { name: '金刚般若波罗蜜经', duration: '25分钟', type: '经文诵读' },
        { name: '正念呼吸指导', duration: '15分钟', type: '禅修指导' },
        { name: '慈心禅修练习', duration: '20分钟', type: '正念练习' }
      ]
    },
    {
      id: 'guidance',
      name: '冥想指导',
      description: '专业的冥想引导和正念练习',
      icon: '🧘‍♂️',
      features: ['呼吸冥想', '身体扫描', '慈心禅修', '观想练习'],
      color: 'from-blue-500 to-cyan-600',
      tracks: [
        { name: '初学者呼吸冥想', duration: '10分钟', type: '呼吸冥想' },
        { name: '全身放松扫描', duration: '25分钟', type: '身体扫描' },
        { name: '慈爱冥想练习', duration: '18分钟', type: '慈心禅修' },
        { name: '光明观想冥想', duration: '30分钟', type: '观想练习' }
      ]
    },
    {
      id: 'companion',
      name: '心灵陪伴',
      description: 'AI智能陪伴，提供个性化禅修建议',
      icon: '🤝',
      features: ['情绪疏导', '禅修建议', '心理支持', '个性化指导'],
      color: 'from-purple-500 to-pink-600',
      tracks: [
        { name: 'AI禅修导师', duration: '随时可用', type: '智能陪伴' },
        { name: '情绪调节助手', duration: '随时可用', type: '情绪疏导' },
        { name: '正念生活指导', duration: '随时可用', type: '生活指导' },
        { name: '个人禅修计划', duration: '定制化', type: '个性化指导' }
      ]
    }
  ];

  const meditationBenefits = [
    {
      title: '减压放松',
      description: '通过冥想练习，有效缓解日常压力和焦虑',
      icon: '😌',
      benefits: ['降低皮质醇水平', '缓解肌肉紧张', '改善睡眠质量', '提升情绪稳定性']
    },
    {
      title: '专注力提升',
      description: '训练注意力，提高工作和学习效率',
      icon: '🎯',
      benefits: ['增强注意力持续时间', '提高工作效率', '改善记忆力', '增强决策能力']
    },
    {
      title: '情绪管理',
      description: '培养情绪觉察能力，提升情商',
      icon: '💝',
      benefits: ['增强情绪觉察', '提升同理心', '改善人际关系', '培养慈悲心']
    },
    {
      title: '身心健康',
      description: '促进身心整体健康，提升生活质量',
      icon: '🌱',
      benefits: ['降低血压', '增强免疫力', '缓解慢性疼痛', '提升整体幸福感']
    }
  ];

  const meditationTechniques = [
    {
      name: '正念呼吸',
      description: '专注于呼吸的冥想技巧',
      steps: [
        '找一个安静舒适的地方坐下',
        '闭上眼睛，自然呼吸',
        '将注意力集中在呼吸上',
        '当思绪游离时，温和地回到呼吸'
      ],
      duration: '5-30分钟',
      difficulty: '初级',
      icon: '🌬️'
    },
    {
      name: '身体扫描',
      description: '系统性地觉察身体各部位的感受',
      steps: [
        '平躺或舒适地坐着',
        '从脚趾开始，逐步向上扫描',
        '觉察每个部位的感受',
        '不判断，只是观察和接纳'
      ],
      duration: '15-45分钟',
      difficulty: '中级',
      icon: '🔍'
    },
    {
      name: '慈心禅修',
      description: '培养对自己和他人的慈爱之心',
      steps: [
        '先对自己发送慈爱祝福',
        '扩展到亲近的人',
        '包括中性的人',
        '最后包括所有众生'
      ],
      duration: '10-30分钟',
      difficulty: '中级',
      icon: '💖'
    },
    {
      name: '观想冥想',
      description: '通过想象来培养特定的心理状态',
      steps: [
        '选择一个正面的意象',
        '在心中清晰地观想',
        '感受意象带来的感受',
        '让正面能量充满全身'
      ],
      duration: '15-40分钟',
      difficulty: '高级',
      icon: '✨'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900' 
        : 'bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50'
    }`}>
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 禅意光晕 */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* 飘动的莲花花瓣 */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`petal-${i}`}
            className={`absolute w-3 h-3 ${
              theme === 'dark' ? 'bg-emerald-400/30' : 'bg-emerald-300/50'
            } rounded-full animate-drift`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 头部 */}
          <div className="text-center mb-12">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl ${
              theme === 'dark' ? 'bg-gradient-to-br from-emerald-500 to-cyan-600' : 'bg-gradient-to-br from-emerald-500 to-cyan-600'
            }`}>
              🧘‍♀️
            </div>
            <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              禅修教室
            </h1>
            <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              在这里找到内心的宁静，通过禅修音乐、经文诵读和专业指导，开启心灵净化之旅
            </p>
          </div>

          {/* 禅修分类选择 */}
          <div className={`rounded-2xl p-6 sm:p-8 mb-12 ${
            theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
          }`}>
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              选择禅修类型
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {meditationCategories.map((category) => (
                <div 
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedCategory === category.id 
                      ? theme === 'dark' 
                        ? `bg-gradient-to-br ${category.color} text-white` 
                        : `bg-gradient-to-br ${category.color} text-white`
                      : theme === 'dark'
                        ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                        : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg'
                  }`}
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90 mb-4">{category.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    {category.features.map((feature, idx) => (
                      <div key={idx} className="text-xs px-2 py-1 rounded bg-white/20 text-center">
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                disabled={!selectedCategory}
                className={`bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-emerald-500/25 transform hover:-translate-y-1 transition-all duration-300 ${
                  !selectedCategory && 'opacity-50 cursor-not-allowed'
                }`}
              >
                开始禅修
              </Button>
              <p className={`text-sm mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {selectedCategory ? '静心准备，开始您的禅修之旅' : '请先选择一种禅修类型'}
              </p>
            </div>
          </div>

          {/* 禅修技巧 */}
          <div className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              禅修技巧指南
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {meditationTechniques.map((technique, index) => (
                <div key={index} className={`rounded-xl p-6 ${
                  theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
                }`}>
                  <div className="text-center mb-4">
                    <div className="text-3xl mb-3">{technique.icon}</div>
                    <h3 className={`font-bold text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {technique.name}
                    </h3>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {technique.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {technique.steps.map((step, idx) => (
                      <div key={idx} className={`text-xs p-2 rounded ${
                        theme === 'dark' ? 'bg-white/10' : 'bg-gray-50'
                      }`}>
                        {idx + 1}. {step}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <span className={`px-2 py-1 rounded ${
                      theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {technique.duration}
                    </span>
                    <span className={`px-2 py-1 rounded ${
                      technique.difficulty === '初级' 
                        ? theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                        : technique.difficulty === '中级'
                        ? theme === 'dark' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                        : theme === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
                    }`}>
                      {technique.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 禅修益处 */}
          <div className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              禅修的益处
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {meditationBenefits.map((benefit, index) => (
                <div key={index} className={`rounded-xl p-6 text-center ${
                  theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
                }`}>
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className={`font-bold text-lg mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {benefit.title}
                  </h3>
                  <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {benefit.description}
                  </p>
                  <div className="space-y-2">
                    {benefit.benefits.map((item, idx) => (
                      <div key={idx} className={`text-xs p-2 rounded ${
                        theme === 'dark' ? 'bg-white/10' : 'bg-gray-50'
                      }`}>
                        • {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 禅修音乐库 */}
          {selectedCategory && (
            <div className="mb-12">
              <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {meditationCategories.find(c => c.id === selectedCategory)?.name}音频库
              </h2>
              <div className={`rounded-2xl p-6 sm:p-8 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
              }`}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {meditationCategories.find(c => c.id === selectedCategory)?.tracks.map((track, index) => (
                    <div key={index} className={`rounded-lg p-4 transition-all duration-300 hover:scale-105 cursor-pointer ${
                      theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-50 hover:bg-gray-100'
                    }`}>
                      <div className="flex items-center mb-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                        }`}>
                          ▶️
                        </div>
                        <div>
                          <h4 className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {track.name}
                          </h4>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {track.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {track.duration}
                        </span>
                        <button className={`text-xs px-2 py-1 rounded ${
                          theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                        } transition-colors`}>
                          播放
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 禅修智慧 */}
          <div className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              禅修智慧
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl ${
                  theme === 'dark' ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'
                }`}>
                  🕉️
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  正念生活
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  将正念融入日常生活，在行走、进食、工作中保持觉察，让每一刻都成为修行的机会。
                </p>
              </div>

              <div className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl ${
                  theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  🌸
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  无常观照
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  观察万物的生灭变化，理解无常的本质，从而减少对事物的执着，获得内心的自由。
                </p>
              </div>

              <div className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl ${
                  theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                }`}>
                  💫
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  慈悲修行
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  培养对自己和他人的慈悲心，通过慈心禅修，化解内心的怨恨和愤怒，获得真正的平静。
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
