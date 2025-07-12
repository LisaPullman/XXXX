import { AIPersonality, PersonalityDimension, LifeArea, InsightCategory } from '../types';

// AI大师人格
export const aiPersonalities: AIPersonality[] = [
  {
    name: '智慧导师',
    description: '深谙东西方心理学和哲学，擅长深度分析和人生指导',
    specialties: ['深度心理分析', '人生规划', '哲学思辨', '智慧指导'],
    communicationStyle: '深邃而温和，善于启发思考，语言富有哲理',
    avatar: '🧙‍♂️',
    prompt: '作为一位融合东西方智慧的导师，我将结合现代心理学和传统智慧，为您提供深度的人格分析和人生指导。我会用温和而深邃的方式，启发您思考人生的意义和方向。'
  },
  {
    name: '心理咨询师',
    description: '专业的心理咨询背景，善于情感支持和心理疏导',
    specialties: ['情感分析', '压力管理', '自我认知', '心理健康'],
    communicationStyle: '温暖包容，善于倾听，给予专业的心理支持',
    avatar: '👩‍⚕️',
    prompt: '作为一位专业的心理咨询师，我将基于科学的心理学理论和丰富的咨询经验，帮助您更好地了解自己，处理情感困扰，建立健康的心理状态。'
  },
  {
    name: '生活教练',
    description: '专注于实用性指导，帮助制定具体的行动计划',
    specialties: ['目标设定', '行动计划', '习惯养成', '效率提升'],
    communicationStyle: '积极务实，注重可执行性，善于激励和督促',
    avatar: '🏃‍♀️',
    prompt: '作为您的生活教练，我将帮助您将分析结果转化为具体的行动计划。我们会一起设定目标，制定策略，并建立可持续的好习惯来实现您的人生愿景。'
  },
  {
    name: '职场导师',
    description: '专业的职业发展指导，擅长职场规划和技能提升',
    specialties: ['职业规划', '技能发展', '领导力', '职场人际'],
    communicationStyle: '专业犀利，注重实效，善于职场策略分析',
    avatar: '💼',
    prompt: '作为您的职场导师，我将基于您的性格特质和能力优势，为您提供专业的职业发展建议，帮助您在职场中发挥最大潜力，实现职业成功。'
  },
  {
    name: '情感顾问',
    description: '专注于人际关系和情感问题，提供关系指导',
    specialties: ['情感关系', '沟通技巧', '人际交往', '婚恋指导'],
    communicationStyle: '温柔细腻，善解人意，注重情感共鸣',
    avatar: '💕',
    prompt: '作为您的情感顾问，我将帮助您理解自己的情感模式，改善人际关系，建立更健康和谐的感情生活。让我们一起探索爱与被爱的艺术。'
  }
];

// 性格维度定义
export const personalityDimensions: PersonalityDimension[] = [
  {
    id: 'extraversion',
    name: '外向性',
    score: 0,
    description: '社交倾向和能量来源',
    insights: [
      '外向性高的人从与他人互动中获得能量',
      '内向性高的人更喜欢独处和深度思考',
      '平衡的外向性意味着能够灵活适应不同社交场合'
    ]
  },
  {
    id: 'agreeableness',
    name: '宜人性',
    score: 0,
    description: '合作和信任倾向',
    insights: [
      '高宜人性的人更容易信任他人，乐于合作',
      '低宜人性的人更加独立，善于竞争',
      '适度的宜人性有助于建立良好的人际关系'
    ]
  },
  {
    id: 'conscientiousness',
    name: '尽责性',
    score: 0,
    description: '自我控制和目标导向',
    insights: [
      '高尽责性的人有强烈的责任感和自律性',
      '低尽责性的人更加灵活和随性',
      '尽责性与学业和职业成功密切相关'
    ]
  },
  {
    id: 'emotional_stability',
    name: '情绪稳定性',
    score: 0,
    description: '情绪调节和抗压能力',
    insights: [
      '高情绪稳定性的人能够很好地管理压力',
      '低情绪稳定性的人情感更加丰富敏感',
      '情绪稳定性影响心理健康和人际关系'
    ]
  },
  {
    id: 'openness',
    name: '开放性',
    score: 0,
    description: '创新和体验接受度',
    insights: [
      '高开放性的人喜欢新体验和创新思维',
      '低开放性的人更偏好传统和稳定',
      '开放性与创造力和学习能力相关'
    ]
  },
  {
    id: 'intuition',
    name: '直觉力',
    score: 0,
    description: '洞察和预感能力',
    insights: [
      '高直觉力的人善于把握事物的本质',
      '直觉力帮助我们做出快速决策',
      '直觉与理性思维的平衡很重要'
    ]
  },
  {
    id: 'empathy',
    name: '共情能力',
    score: 0,
    description: '理解他人情感的能力',
    insights: [
      '高共情能力有助于建立深度的人际关系',
      '共情能力是领导力的重要组成部分',
      '过度共情可能导致情感负担'
    ]
  },
  {
    id: 'resilience',
    name: '韧性',
    score: 0,
    description: '面对挫折的恢复能力',
    insights: [
      '高韧性的人能够从困难中快速恢复',
      '韧性可以通过练习和经历得到提升',
      '韧性是成功和幸福的重要预测因子'
    ]
  }
];

// 生活领域定义
export const lifeAreas: LifeArea[] = [
  {
    id: 'career',
    name: '事业发展',
    score: 0,
    analysis: '',
    recommendations: [],
    challenges: [],
    opportunities: []
  },
  {
    id: 'relationships',
    name: '人际关系',
    score: 0,
    analysis: '',
    recommendations: [],
    challenges: [],
    opportunities: []
  },
  {
    id: 'health',
    name: '身心健康',
    score: 0,
    analysis: '',
    recommendations: [],
    challenges: [],
    opportunities: []
  },
  {
    id: 'personal_growth',
    name: '个人成长',
    score: 0,
    analysis: '',
    recommendations: [],
    challenges: [],
    opportunities: []
  },
  {
    id: 'finance',
    name: '财务状况',
    score: 0,
    analysis: '',
    recommendations: [],
    challenges: [],
    opportunities: []
  },
  {
    id: 'creativity',
    name: '创造力',
    score: 0,
    analysis: '',
    recommendations: [],
    challenges: [],
    opportunities: []
  },
  {
    id: 'spirituality',
    name: '精神追求',
    score: 0,
    analysis: '',
    recommendations: [],
    challenges: [],
    opportunities: []
  },
  {
    id: 'lifestyle',
    name: '生活方式',
    score: 0,
    analysis: '',
    recommendations: [],
    challenges: [],
    opportunities: []
  }
];

// 洞察类别
export const insightCategories: InsightCategory[] = [
  {
    id: 'core_personality',
    name: '核心人格',
    description: '最基本的性格特征和行为模式',
    insights: [],
    weight: 0.25
  },
  {
    id: 'behavioral_patterns',
    name: '行为模式',
    description: '典型的行为习惯和反应方式',
    insights: [],
    weight: 0.20
  },
  {
    id: 'emotional_landscape',
    name: '情感特征',
    description: '情绪表达和管理方式',
    insights: [],
    weight: 0.20
  },
  {
    id: 'cognitive_style',
    name: '认知风格',
    description: '思维方式和决策模式',
    insights: [],
    weight: 0.15
  },
  {
    id: 'social_dynamics',
    name: '社交特征',
    description: '人际交往和沟通风格',
    insights: [],
    weight: 0.15
  },
  {
    id: 'growth_potential',
    name: '成长潜力',
    description: '发展方向和提升空间',
    insights: [],
    weight: 0.05
  }
];

// 性格特质映射表
export const traitMappings = {
  mbti: {
    'INTJ': {
      extraversion: 30,
      agreeableness: 45,
      conscientiousness: 85,
      emotional_stability: 70,
      openness: 90,
      intuition: 95,
      empathy: 60,
      resilience: 80
    },
    'ENTJ': {
      extraversion: 85,
      agreeableness: 40,
      conscientiousness: 90,
      emotional_stability: 75,
      openness: 85,
      intuition: 85,
      empathy: 55,
      resilience: 85
    },
    'INFP': {
      extraversion: 25,
      agreeableness: 85,
      conscientiousness: 55,
      emotional_stability: 50,
      openness: 95,
      intuition: 90,
      empathy: 95,
      resilience: 60
    },
    'ENFP': {
      extraversion: 90,
      agreeableness: 80,
      conscientiousness: 50,
      emotional_stability: 60,
      openness: 95,
      intuition: 95,
      empathy: 90,
      resilience: 70
    }
    // 可以继续添加其他MBTI类型
  },
  astrology: {
    'aries': {
      extraversion: 85,
      agreeableness: 50,
      conscientiousness: 70,
      emotional_stability: 75,
      openness: 80,
      intuition: 70,
      empathy: 60,
      resilience: 85
    },
    'cancer': {
      extraversion: 40,
      agreeableness: 85,
      conscientiousness: 75,
      emotional_stability: 45,
      openness: 60,
      intuition: 85,
      empathy: 95,
      resilience: 60
    }
    // 可以继续添加其他星座
  },
  bloodtype: {
    'A': {
      extraversion: 45,
      agreeableness: 80,
      conscientiousness: 85,
      emotional_stability: 60,
      openness: 70,
      intuition: 65,
      empathy: 85,
      resilience: 65
    },
    'B': {
      extraversion: 75,
      agreeableness: 60,
      conscientiousness: 55,
      emotional_stability: 70,
      openness: 90,
      intuition: 80,
      empathy: 70,
      resilience: 75
    },
    'O': {
      extraversion: 80,
      agreeableness: 65,
      conscientiousness: 70,
      emotional_stability: 80,
      openness: 75,
      intuition: 70,
      empathy: 70,
      resilience: 85
    },
    'AB': {
      extraversion: 60,
      agreeableness: 70,
      conscientiousness: 65,
      emotional_stability: 55,
      openness: 85,
      intuition: 85,
      empathy: 80,
      resilience: 65
    }
  }
};

// 通用建议模板
export const adviceTemplates = {
  career: {
    high_conscientiousness: [
      '您的高度自律性使您在需要严谨和持续努力的职业中表现出色',
      '考虑担任需要规划和组织能力的管理职位',
      '您适合从事需要长期承诺和专业精神的工作'
    ],
    high_openness: [
      '您的创新思维使您在创意和技术领域具有优势',
      '考虑探索新兴行业和前沿领域',
      '您可能在需要创新和变化的环境中茁壮成长'
    ],
    high_extraversion: [
      '您的社交能力使您在团队合作和客户服务方面表现出色',
      '考虑销售、市场营销或公共关系等职业',
      '您适合在人际互动频繁的环境中工作'
    ]
  },
  relationships: {
    high_empathy: [
      '您的高共情能力使您成为很好的倾听者和支持者',
      '在人际关系中要注意情感边界，避免过度投入',
      '您的理解能力有助于建立深度的情感连接'
    ],
    high_agreeableness: [
      '您的合作精神使您在团队中受欢迎',
      '学会在必要时坚持自己的立场和需求',
      '您的和善天性有助于化解冲突'
    ]
  },
  personal_growth: {
    low_emotional_stability: [
      '学习情绪管理技巧，如冥想和正念练习',
      '建立健康的压力应对机制',
      '考虑寻求专业的心理支持'
    ],
    high_resilience: [
      '您的强韧性是宝贵的资产，继续保持',
      '可以成为他人的榜样和支持者',
      '利用您的恢复能力去挑战更大的目标'
    ]
  }
};

// 行动计划模板
export const actionPlanTemplates = {
  personal_development: {
    title: '个人发展计划',
    description: '基于您的性格特征制定的全面发展方案',
    category: 'personal',
    priority: 'high',
    timeline: '3-6个月',
    steps: [
      '进行深度自我反思，明确价值观和目标',
      '识别并发挥个人优势',
      '制定技能提升计划',
      '建立定期回顾和调整机制'
    ],
    metrics: [
      '每月完成自我评估',
      '设定并追踪3个核心目标',
      '获得来自他人的反馈'
    ],
    resources: [
      '性格发展书籍和课程',
      '专业发展工具和测评',
      '导师指导和同伴支持'
    ]
  },
  career_advancement: {
    title: '职业发展规划',
    description: '结合性格优势的职业成长路径',
    category: 'career',
    priority: 'high',
    timeline: '6-12个月',
    steps: [
      '明确职业目标和发展方向',
      '识别所需技能和资源',
      '制定学习和实践计划',
      '建立行业网络和关系'
    ],
    metrics: [
      '获得新技能认证',
      '扩展职业网络',
      '获得晋升或新机会'
    ],
    resources: [
      '行业培训和认证',
      '专业网络和协会',
      '职业导师和教练'
    ]
  }
};

export const aiMasterDatabase = {
  personalities: aiPersonalities,
  dimensions: personalityDimensions,
  lifeAreas,
  insightCategories,
  traitMappings,
  adviceTemplates,
  actionPlanTemplates
};