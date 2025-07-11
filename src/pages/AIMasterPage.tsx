import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useThemeStore } from '../stores/useThemeStore';

export const AIMasterPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const aiServices = [
    {
      id: 'comprehensive',
      name: '综合分析',
      description: '整合所有测评结果的全面分析',
      features: ['MBTI性格', '星座特质', '血型分析', '综合建议'],
      time: '20分钟',
      accuracy: '95%',
      icon: '🧠',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'career',
      name: '职业规划',
      description: '基于性格特质的职业发展建议',
      features: ['职业匹配', '发展路径', '技能建议', '薪资预测'],
      time: '15分钟',
      accuracy: '92%',
      icon: '💼',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'relationship',
      name: '人际关系',
      description: '分析人际交往模式和改善建议',
      features: ['社交风格', '沟通技巧', '关系建议', '冲突处理'],
      time: '12分钟',
      accuracy: '90%',
      icon: '🤝',
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 'growth',
      name: '个人成长',
      description: '制定个性化的自我提升计划',
      features: ['成长方向', '学习建议', '习惯养成', '目标设定'],
      time: '18分钟',
      accuracy: '93%',
      icon: '🚀',
      color: 'from-purple-500 to-violet-600'
    }
  ];

  const aiCapabilities = [
    {
      name: '深度学习',
      description: '基于大数据训练的神经网络模型',
      icon: '🧠',
      details: [
        '处理超过100万份测评数据',
        '识别复杂的性格模式',
        '预测行为倾向',
        '持续学习优化'
      ]
    },
    {
      name: '多维分析',
      description: '整合多种测评维度的综合分析',
      icon: '📊',
      details: [
        '性格类型分析',
        '星座特质解读',
        '血型性格特征',
        '相术特征识别'
      ]
    },
    {
      name: '个性化建议',
      description: '针对个人特质的定制化指导方案',
      icon: '🎯',
      details: [
        '职业发展建议',
        '人际关系指导',
        '学习方法推荐',
        '生活方式建议'
      ]
    },
    {
      name: '预测分析',
      description: '基于历史数据的趋势预测',
      icon: '🔮',
      details: [
        '性格发展趋势',
        '职业成功概率',
        '关系匹配度',
        '潜能发掘方向'
      ]
    }
  ];

  const analysisSteps = [
    {
      step: 1,
      title: '数据收集',
      description: '整合您的所有测评结果',
      icon: '📥',
      details: 'AI系统会收集您在平台上的所有测评数据，包括MBTI、星座、血型等信息。'
    },
    {
      step: 2,
      title: '模式识别',
      description: '识别性格特征和行为模式',
      icon: '🔍',
      details: '运用深度学习算法分析您的性格特征，识别独特的行为模式和思维方式。'
    },
    {
      step: 3,
      title: '综合分析',
      description: '多维度交叉分析和验证',
      icon: '⚡',
      details: '将不同维度的分析结果进行交叉验证，确保分析的准确性和一致性。'
    },
    {
      step: 4,
      title: '生成报告',
      description: '输出个性化的分析报告',
      icon: '📋',
      details: '生成详细的个性化报告，包含性格分析、发展建议和行动计划。'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900'
        : 'bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50'
    }`}>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 头部 */}
          <div className="text-center mb-12">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl ${
              theme === 'dark' ? 'bg-gradient-to-br from-indigo-500 to-blue-600' : 'bg-gradient-to-br from-indigo-500 to-blue-600'
            }`}>
              🤖
            </div>
            <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              AI综合大师
            </h1>
            <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              融合人工智能与心理学的前沿技术，为您提供最专业的个性化分析与指导
            </p>
          </div>

          {/* AI服务选择 */}
          <div className={`rounded-2xl p-6 sm:p-8 mb-12 ${
            theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
          }`}>
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              选择AI分析服务
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {aiServices.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedService === service.id
                      ? theme === 'dark'
                        ? `bg-gradient-to-br ${service.color} text-white`
                        : `bg-gradient-to-br ${service.color} text-white`
                      : theme === 'dark'
                        ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                        : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg'
                  }`}
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{service.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                    <p className="text-sm opacity-90 mb-4">{service.description}</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="text-xs px-2 py-1 rounded bg-white/20 text-center">
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between text-xs">
                    <span>⏱️ {service.time}</span>
                    <span>🎯 {service.accuracy}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                disabled={!selectedService}
                className={`bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-indigo-500/25 transform hover:-translate-y-1 transition-all duration-300 ${
                  !selectedService && 'opacity-50 cursor-not-allowed'
                }`}
              >
                开始AI分析
              </Button>
              <p className={`text-sm mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {selectedService ? '点击开始专业的AI分析' : '请先选择一种AI分析服务'}
              </p>
            </div>
          </div>

          {/* AI能力介绍 */}
          <div className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              AI核心能力
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiCapabilities.map((capability, index) => (
                <div key={index} className={`rounded-xl p-6 text-center ${
                  theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
                }`}>
                  <div className="text-4xl mb-4">{capability.icon}</div>
                  <h3 className={`font-bold text-lg mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {capability.name}
                  </h3>
                  <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {capability.description}
                  </p>
                  <div className="space-y-2">
                    {capability.details.map((detail, idx) => (
                      <div key={idx} className={`text-xs p-2 rounded ${
                        theme === 'dark' ? 'bg-white/10' : 'bg-gray-50'
                      }`}>
                        • {detail}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 分析流程 */}
          <div className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              AI分析流程
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {analysisSteps.map((step, index) => (
                <div key={index} className={`rounded-xl p-6 ${
                  theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
                }`}>
                  <div className="text-center mb-4">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center text-xl ${
                      theme === 'dark' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                    }`}>
                      {step.icon}
                    </div>
                    <div className={`text-sm font-bold mb-1 ${
                      theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                    }`}>
                      步骤 {step.step}
                    </div>
                    <h3 className={`font-bold text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {step.description}
                    </p>
                  </div>
                  <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {step.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 技术优势 */}
          <div className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              技术优势
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl ${
                  theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  ⚡
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  高速处理
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  采用最新的GPU加速技术，能够在几分钟内完成复杂的性格分析，大大提升用户体验。
                </p>
              </div>

              <div className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl ${
                  theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                }`}>
                  🎯
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  精准分析
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  基于大数据训练的深度学习模型，分析准确率高达95%以上，为您提供可靠的分析结果。
                </p>
              </div>

              <div className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl ${
                  theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                }`}>
                  🔒
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  隐私保护
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  采用端到端加密技术，确保您的个人数据安全，所有分析过程都在安全环境中进行。
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
