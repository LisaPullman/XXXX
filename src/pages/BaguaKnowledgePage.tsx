import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useThemeStore } from '../stores/useThemeStore';

export const BaguaKnowledgePage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const [selectedCategory, setSelectedCategory] = useState('basics');

  const categories = [
    { id: 'basics', name: '八卦基础', icon: '☯️' },
    { id: 'hexagrams', name: '64卦详解', icon: '📖' },
    { id: 'wisdom', name: '智慧语录', icon: '💎' },
    { id: 'modern', name: '现代应用', icon: '🌟' }
  ];

  const baguaBasics = [
    {
      name: '乾',
      symbol: '☰',
      element: '天',
      nature: '刚健',
      meaning: '创造、领导、父亲',
      description: '乾卦代表天，象征刚健不息的精神。在人格上表现为积极进取、勇于创新、具有领导能力。乾卦教导我们要自强不息，勇于承担责任。',
      keywords: ['创新', '领导', '刚强', '进取'],
      modernApplication: '适合创业者、领导者，在事业发展中要保持积极主动的态度。',
      lifeGuidance: '培养自信心，勇于面对挑战，但要避免过于刚硬，学会适度的柔和。'
    },
    {
      name: '坤',
      symbol: '☷',
      element: '地',
      nature: '柔顺',
      meaning: '包容、承载、母亲',
      description: '坤卦代表地，象征柔顺厚德的品质。在人格上表现为包容宽厚、善于合作、具有承载能力。坤卦教导我们要厚德载物，以柔克刚。',
      keywords: ['包容', '稳重', '柔顺', '承载'],
      modernApplication: '适合团队合作、服务行业，在人际关系中要保持包容和理解。',
      lifeGuidance: '培养耐心和包容心，学会在适当的时候退让，但要坚持自己的原则。'
    },
    {
      name: '震',
      symbol: '☳',
      element: '雷',
      nature: '动',
      meaning: '震动、觉醒、长男',
      description: '震卦代表雷，象征奋发向上的动力。在人格上表现为行动力强、敢于突破、具有开拓精神。震卦教导我们要勇于行动，把握机遇。',
      keywords: ['震动', '觉醒', '奋发', '突破'],
      modernApplication: '适合需要创新突破的工作，在变革中要保持敏锐的洞察力。',
      lifeGuidance: '保持行动力，但要避免冲动，在行动前要深思熟虑。'
    },
    {
      name: '巽',
      symbol: '☴',
      element: '风',
      nature: '入',
      meaning: '渗透、温和、长女',
      description: '巽卦代表风，象征循序渐进的智慧。在人格上表现为温和细致、善于沟通、具有渗透力。巽卦教导我们要以柔制刚，循序渐进。',
      keywords: ['渗透', '温和', '灵活', '适应'],
      modernApplication: '适合教育、咨询、公关等需要耐心和技巧的工作。',
      lifeGuidance: '培养耐心和细致，学会在适当的时候坚持，在必要时灵活变通。'
    },
    {
      name: '坎',
      symbol: '☵',
      element: '水',
      nature: '陷',
      meaning: '险难、智慧、中男',
      description: '坎卦代表水，象征在困境中寻找出路的能力。在人格上表现为智慧深沉、善于应变、具有韧性。坎卦教导我们要在困难中保持冷静。',
      keywords: ['智慧', '险难', '流动', '深沉'],
      modernApplication: '适合处理复杂问题、危机管理等需要智慧和冷静的工作。',
      lifeGuidance: '在困难面前保持冷静，用智慧化解危机，但要避免过于消极。'
    },
    {
      name: '离',
      symbol: '☲',
      element: '火',
      nature: '丽',
      meaning: '光明、美丽、中女',
      description: '离卦代表火，象征照亮前路的智慧之光。在人格上表现为热情开朗、富有魅力、具有感染力。离卦教导我们要保持内心的光明。',
      keywords: ['光明', '美丽', '热情', '文明'],
      modernApplication: '适合艺术、传媒、教育等需要表达和感染力的工作。',
      lifeGuidance: '保持积极乐观的心态，用自己的光芒照亮他人，但要避免过于张扬。'
    },
    {
      name: '艮',
      symbol: '☶',
      element: '山',
      nature: '止',
      meaning: '停止、稳定、少男',
      description: '艮卦代表山，象征知止而后有定的智慧。在人格上表现为稳重踏实、善于思考、具有定力。艮卦教导我们要知道适可而止。',
      keywords: ['稳定', '停止', '坚实', '沉静'],
      modernApplication: '适合需要专注和深度思考的工作，在决策时要保持冷静。',
      lifeGuidance: '培养专注力和定力，学会在适当的时候停下来思考，但要避免过于保守。'
    },
    {
      name: '兑',
      symbol: '☱',
      element: '泽',
      nature: '悦',
      meaning: '喜悦、交流、少女',
      description: '兑卦代表泽，象征和谐愉悦的人际关系。在人格上表现为善于交流、富有亲和力、具有感染力。兑卦教导我们要保持喜悦的心境。',
      keywords: ['喜悦', '交流', '和谐', '滋润'],
      modernApplication: '适合销售、客服、公关等需要良好人际关系的工作。',
      lifeGuidance: '保持乐观开朗的心态，善于与人交流，但要避免过于轻浮。'
    }
  ];

  const wisdomQuotes = [
    {
      quote: "天行健，君子以自强不息",
      source: "乾卦·象传",
      meaning: "天体运行刚健有力，君子应该效法天道，自强不息地努力奋斗。",
      modernInterpretation: "在现代社会中，我们要保持积极进取的精神，不断提升自己，面对困难不退缩。"
    },
    {
      quote: "地势坤，君子以厚德载物",
      source: "坤卦·象传",
      meaning: "大地的气势厚实和顺，君子应该效法大地，以深厚的德行承载万物。",
      modernInterpretation: "要培养宽容包容的品格，用德行感化他人，承担起应有的责任。"
    },
    {
      quote: "穷则变，变则通，通则久",
      source: "系辞下传",
      meaning: "事物发展到极点就会发生变化，变化了就能通达，通达了就能长久。",
      modernInterpretation: "当遇到困境时，要善于变通，寻找新的出路，这样才能获得长远的发展。"
    },
    {
      quote: "一阴一阳之谓道",
      source: "系辞上传",
      meaning: "阴阳交替变化就是道的体现，万物都在阴阳变化中生成发展。",
      modernInterpretation: "世界是对立统一的，要学会在矛盾中寻找平衡，在变化中把握规律。"
    },
    {
      quote: "知进退存亡而不失其正者，其唯圣人乎",
      source: "乾卦·文言传",
      meaning: "能够知道进退存亡的时机而不失去正道的，大概只有圣人吧。",
      modernInterpretation: "要有敏锐的判断力，知道什么时候该进，什么时候该退，始终坚持正确的原则。"
    },
    {
      quote: "君子终日乾乾，夕惕若厉，无咎",
      source: "乾卦·九三",
      meaning: "君子整天勤奋努力，晚上也保持警惕，这样就不会有过失。",
      modernInterpretation: "要保持持续的努力和警觉，时刻反省自己，这样才能避免错误。"
    }
  ];

  const modernApplications = [
    {
      title: "商业决策中的易经智慧",
      description: "运用阴阳平衡的理念指导企业管理，在竞争与合作中寻找平衡点。",
      examples: [
        "产品策略：刚柔并济，既要有创新突破，也要稳扎稳打",
        "团队管理：因人而异，发挥每个人的特长",
        "市场策略：顺势而为，在变化中寻找机遇"
      ]
    },
    {
      title: "人际关系中的八卦智慧",
      description: "运用八卦的特质理解不同性格的人，改善人际关系。",
      examples: [
        "乾型人格：直接沟通，给予挑战和成长机会",
        "坤型人格：耐心倾听，提供支持和理解",
        "震型人格：给予行动空间，避免过多约束"
      ]
    },
    {
      title: "个人成长中的易经指导",
      description: "运用易经的变化哲学指导个人发展和生活规划。",
      examples: [
        "职业发展：根据自身特质选择合适的发展方向",
        "学习成长：在变化中保持学习的心态",
        "生活平衡：在工作与生活中寻找平衡点"
      ]
    }
  ];

  const renderContent = () => {
    switch (selectedCategory) {
      case 'basics':
        return (
          <div className="grid gap-6">
            {baguaBasics.map((bagua, index) => (
              <div key={index} className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className="flex items-start gap-6">
                  <div className="text-center">
                    <div className="text-6xl mb-2">{bagua.symbol}</div>
                    <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                      {bagua.name}
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                      {bagua.element} · {bagua.nature}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                      {bagua.meaning}
                    </h4>
                    <p className={`mb-4 leading-relaxed ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                      {bagua.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                          现代应用
                        </h5>
                        <p className={`text-sm ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                          {bagua.modernApplication}
                        </p>
                      </div>
                      <div>
                        <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                          人生指导
                        </h5>
                        <p className={`text-sm ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                          {bagua.lifeGuidance}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {bagua.keywords.map((keyword, idx) => (
                        <span key={idx} className={`text-xs px-3 py-1 rounded-full ${
                          theme === 'dark' ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'wisdom':
        return (
          <div className="grid gap-6">
            {wisdomQuotes.map((quote, index) => (
              <div key={index} className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className="text-center mb-4">
                  <blockquote className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                    "{quote.quote}"
                  </blockquote>
                  <cite className={`text-sm ${theme === 'dark' ? 'text-amber-300' : 'text-amber-600'}`}>
                    —— {quote.source}
                  </cite>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                      古典含义
                    </h4>
                    <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                      {quote.meaning}
                    </p>
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                      现代启示
                    </h4>
                    <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                      {quote.modernInterpretation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'modern':
        return (
          <div className="grid gap-6">
            {modernApplications.map((app, index) => (
              <div key={index} className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                  {app.title}
                </h3>
                <p className={`mb-4 leading-relaxed ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                  {app.description}
                </p>
                <div className="space-y-2">
                  {app.examples.map((example, idx) => (
                    <div key={idx} className={`flex items-start gap-3 text-sm ${
                      theme === 'dark' ? 'text-amber-200' : 'text-amber-700'
                    }`}>
                      <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        theme === 'dark' ? 'bg-amber-400' : 'bg-amber-500'
                      }`}></span>
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className={`text-center py-12 ${
            theme === 'dark' ? 'text-amber-200' : 'text-amber-700'
          }`}>
            <p>64卦详解功能正在开发中，敬请期待...</p>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-amber-900 via-orange-900 to-red-900'
        : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'
    }`}>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 头部 */}
          <div className="text-center mb-8">
            <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-amber-100' : 'text-amber-900'
            }`}>
              八卦知识库
            </h1>
            <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-amber-200' : 'text-amber-700'
            }`}>
              深入了解易经八卦的智慧，掌握古代哲学的精髓
            </p>
          </div>

          {/* 分类导航 */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? theme === 'dark'
                      ? 'bg-amber-500 text-white shadow-lg'
                      : 'bg-amber-500 text-white shadow-lg'
                    : theme === 'dark'
                      ? 'bg-white/10 text-amber-200 hover:bg-white/20'
                      : 'bg-white/80 text-amber-700 hover:bg-white shadow-lg'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>

          {/* 内容区域 */}
          <div className="mb-8">
            {renderContent()}
          </div>

          {/* 底部导航 */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => navigate('/iching')}
              className={`mr-4 ${
                theme === 'dark'
                  ? 'border-amber-300/30 text-amber-200 hover:bg-amber-500/10'
                  : 'border-amber-600 text-amber-700 hover:bg-amber-50'
              }`}
            >
              ← 返回八卦首页
            </Button>
            <Button
              onClick={() => navigate('/bagua/ai-divination')}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
            >
              体验AI算运 →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
