// 血型分析数据
export interface BloodTypeData {
  type: 'A' | 'B' | 'O' | 'AB';
  name: string;
  emoji: string;
  description: string;
  personality: {
    positive: string[];
    negative: string[];
    core: string;
    keywords: string[];
  };
  career: {
    suitable: string[];
    unsuitable: string[];
    advice: string;
  };
  health: {
    strengths: string[];
    weaknesses: string[];
    diseases: string[];
    advice: string[];
  };
  lifestyle: {
    diet: string[];
    exercise: string[];
    stress: string[];
  };
  relationships: {
    love: string;
    friendship: string;
    family: string;
    communication: string;
  };
  compatibility: {
    [key: string]: {
      score: number;
      description: string;
      advice: string;
    };
  };
  dailyAdvice: string[];
  motto: string;
  color: string;
  gradient: string;
}

export const bloodTypeDatabase: Record<string, BloodTypeData> = {
  'A': {
    type: 'A',
    name: 'A型血',
    emoji: '🅰️',
    description: 'A型血的人通常性格内向、谨慎、追求完美，具有强烈的责任感和团队精神。',
    personality: {
      positive: [
        '认真负责，做事一丝不苟',
        '善于合作，具有团队精神',
        '细心谨慎，考虑周全',
        '有耐心，能够坚持到底',
        '善解人意，体贴他人',
        '追求完美，标准较高',
        '忠诚可靠，值得信赖'
      ],
      negative: [
        '容易焦虑，压力承受能力较弱',
        '过于谨慎，缺乏冒险精神',
        '固执己见，不易改变观点',
        '容易钻牛角尖，过分纠结',
        '情绪波动较大，易受外界影响',
        '缺乏自信，容易自我怀疑',
        '过分在意他人看法'
      ],
      core: 'A型血的人是完美主义者，注重细节，有强烈的责任感和集体意识。',
      keywords: ['完美主义', '责任感', '谨慎', '细心', '团队合作', '内向', '敏感']
    },
    career: {
      suitable: [
        '会计师、审计师',
        '医生、护士',
        '教师、研究员',
        '设计师、编辑',
        '律师、法官',
        '工程师、技术员',
        '行政管理、人事'
      ],
      unsuitable: [
        '销售、市场推广',
        '投资、股票交易',
        '高风险创业',
        '娱乐表演',
        '极限运动教练'
      ],
      advice: 'A型血的人适合从事需要细心、耐心和责任感的工作，应该发挥自己的完美主义特质，在稳定的环境中施展才华。'
    },
    health: {
      strengths: [
        '免疫系统较强',
        '适应能力好',
        '消化系统相对健康',
        '新陈代谢稳定'
      ],
      weaknesses: [
        '容易患心血管疾病',
        '血液粘稠度较高',
        '易患胃病',
        '压力性疾病风险高'
      ],
      diseases: [
        '冠心病',
        '高血压',
        '糖尿病',
        '胃溃疡',
        '焦虑症',
        '抑郁症'
      ],
      advice: [
        '定期检查心血管健康',
        '控制血脂和血压',
        '学会压力管理',
        '保持规律作息',
        '适度运动，避免过度劳累',
        '多吃新鲜蔬菜水果'
      ]
    },
    lifestyle: {
      diet: [
        '多食用新鲜蔬菜和水果',
        '选择低脂肪、高纤维食物',
        '适量摄入优质蛋白质',
        '避免过多红肉和高胆固醇食物',
        '多喝水，保持血液循环',
        '规律进餐，避免暴饮暴食'
      ],
      exercise: [
        '适合中低强度有氧运动',
        '推荐瑜伽、太极拳',
        '游泳、慢跑',
        '避免过于激烈的运动',
        '重视运动前后的拉伸',
        '保持运动的规律性'
      ],
      stress: [
        '学会放松技巧',
        '培养兴趣爱好',
        '保持良好的人际关系',
        '适当的独处时间',
        '避免过度完美主义',
        '寻求专业帮助'
      ]
    },
    relationships: {
      love: 'A型血的人在爱情中忠诚专一，但容易因为过分谨慎而错失良机。建议主动表达感情，学会适度放松。',
      friendship: '善于维护友谊，但朋友圈相对固定。重视深度交往，不喜欢浅层社交。',
      family: '家庭责任感强，是可靠的家庭成员。容易为家人承担过多压力。',
      communication: '沟通时注重细节，但有时过于含蓄。建议直接表达需求和感受。'
    },
    compatibility: {
      'A': {
        score: 85,
        description: '同类型的默契配合，能够相互理解和支持。',
        advice: '注意不要过于相似而缺乏激情，要学会制造惊喜。'
      },
      'B': {
        score: 60,
        description: '性格互补，B型的活泼可以带动A型的积极性。',
        advice: '需要更多的耐心和包容，学会欣赏对方的不同。'
      },
      'O': {
        score: 75,
        description: 'O型的领导力与A型的执行力形成良好配合。',
        advice: 'A型要学会适当表达意见，O型要尊重A型的谨慎。'
      },
      'AB': {
        score: 70,
        description: 'AB型的理性与A型的感性形成互补。',
        advice: '需要增加沟通，AB型要更加主动表达情感。'
      }
    },
    dailyAdvice: [
      '今天记得给自己一些宽松的时间，不要过于追求完美。',
      '尝试一些新的活动，打破常规的生活模式。',
      '主动与朋友联系，分享你的想法和感受。',
      '关注自己的身体健康，定期检查血压和血脂。',
      '学会说"不"，不要承担过多的责任。',
      '培养一个能够放松心情的兴趣爱好。'
    ],
    motto: '细致入微，追求完美，用心生活每一天。',
    color: '#FF6B6B',
    gradient: 'from-red-400 to-pink-500'
  },
  'B': {
    type: 'B',
    name: 'B型血',
    emoji: '🅱️',
    description: 'B型血的人通常性格外向、乐观、富有创造力，喜欢自由自在的生活方式。',
    personality: {
      positive: [
        '乐观开朗，积极向上',
        '富有创造力和想象力',
        '适应能力强，灵活变通',
        '直率真诚，不拐弯抹角',
        '独立自主，不依赖他人',
        '兴趣广泛，好奇心强',
        '善于交际，人缘较好'
      ],
      negative: [
        '容易三分钟热度',
        '缺乏耐心和持久力',
        '我行我素，不太合群',
        '情绪化，容易冲动',
        '不太注重细节',
        '缺乏计划性',
        '有时显得自私'
      ],
      core: 'B型血的人是天生的乐观主义者，喜欢自由，富有创造力和冒险精神。',
      keywords: ['乐观', '创造力', '自由', '直率', '灵活', '独立', '冒险']
    },
    career: {
      suitable: [
        '艺术家、设计师',
        '记者、编剧',
        '销售、市场营销',
        '导游、主持人',
        '创业者、企业家',
        '心理咨询师',
        '自由职业者'
      ],
      unsuitable: [
        '会计、审计',
        '档案管理',
        '流水线工作',
        '严格按规章制度的工作',
        '需要长期坐办公室的工作'
      ],
      advice: 'B型血的人适合从事富有创造性和变化性的工作，需要一定的自由度和发挥空间。'
    },
    health: {
      strengths: [
        '抵抗力较强',
        '恢复能力快',
        '适应环境能力强',
        '心理调节能力好'
      ],
      weaknesses: [
        '容易患感染性疾病',
        '消化系统相对敏感',
        '容易食物中毒',
        '免疫系统容易过敏'
      ],
      diseases: [
        '肺炎',
        '支气管炎',
        '胃肠炎',
        '过敏性疾病',
        '皮肤病',
        '关节炎'
      ],
      advice: [
        '注意个人卫生',
        '避免在人群密集处长时间停留',
        '注意饮食卫生',
        '增强体质锻炼',
        '保持良好的生活习惯',
        '及时治疗感染'
      ]
    },
    lifestyle: {
      diet: [
        '多样化饮食，均衡营养',
        '新鲜食材，避免过期食品',
        '适量摄入乳制品',
        '多吃绿叶蔬菜',
        '控制辛辣刺激性食物',
        '保持饮食规律'
      ],
      exercise: [
        '适合多样化的运动',
        '推荐团体运动',
        '户外活动',
        '定期更换运动方式',
        '避免单调重复的运动',
        '注重运动的趣味性'
      ],
      stress: [
        '通过运动释放压力',
        '培养多种兴趣爱好',
        '与朋友交流',
        '旅行和探索',
        '创作和艺术活动',
        '保持乐观心态'
      ]
    },
    relationships: {
      love: 'B型血的人在爱情中热情主动，但容易喜新厌旧。需要学会专一和深入经营感情。',
      friendship: '朋友众多，但深交的朋友相对较少。善于活跃气氛，是聚会的开心果。',
      family: '家庭关系相对轻松，但有时会因为太过自我而忽略家人感受。',
      communication: '沟通直接坦率，但有时会因为过于直接而伤害他人。'
    },
    compatibility: {
      'A': {
        score: 60,
        description: '性格互补，但差异较大，需要磨合。',
        advice: '学会欣赏A型的细心，A型也要理解B型的自由天性。'
      },
      'B': {
        score: 70,
        description: '相似的性格，容易产生共鸣，但也容易冲突。',
        advice: '要学会轮流主导，避免都太过自我。'
      },
      'O': {
        score: 80,
        description: '很好的配合，O型的稳定与B型的活泼相得益彰。',
        advice: '保持各自的特色，相互学习和支持。'
      },
      'AB': {
        score: 65,
        description: 'AB型的理性可以平衡B型的感性。',
        advice: 'B型要学会更多理性思考，AB型要更加开放。'
      }
    },
    dailyAdvice: [
      '今天尝试坚持完成一件事情，培养耐心和专注力。',
      '多关注身边人的感受，不要只顾自己。',
      '制定一个简单的计划，并努力执行。',
      '注意饮食卫生，避免肠胃不适。',
      '与老朋友联系，深化友谊。',
      '学习一些新技能，满足你的好奇心。'
    ],
    motto: '自由自在，创造精彩，每一天都是新的开始。',
    color: '#4ECDC4',
    gradient: 'from-teal-400 to-blue-500'
  },
  'O': {
    type: 'O',
    name: 'O型血',
    emoji: '⭕',
    description: 'O型血的人通常性格坚强、自信、具有领导力，是天生的领导者和组织者。',
    personality: {
      positive: [
        '自信坚强，意志力强',
        '具有领导力和组织能力',
        '目标明确，执行力强',
        '勇敢果断，不畏困难',
        '责任心强，可以依赖',
        '适应能力强，抗压能力好',
        '乐于助人，有正义感'
      ],
      negative: [
        '容易固执己见',
        '有时过于强势',
        '缺乏耐心，急躁',
        '情绪控制能力较弱',
        '不太善于倾听他人',
        '容易冲动行事',
        '有时显得霸道'
      ],
      core: 'O型血的人是天生的领导者，自信坚强，具有强烈的目标导向和执行力。',
      keywords: ['领导力', '自信', '坚强', '果断', '责任心', '目标导向', '执行力']
    },
    career: {
      suitable: [
        '管理者、CEO',
        '企业家、创业者',
        '律师、法官',
        '军人、警察',
        '医生、外科医生',
        '销售总监',
        '体育教练'
      ],
      unsuitable: [
        '需要长期细致工作',
        '单调重复的工作',
        '需要高度服从的工作',
        '过于复杂的技术工作',
        '需要极度耐心的工作'
      ],
      advice: 'O型血的人适合从事具有挑战性和领导性的工作，需要有发挥领导才能的空间。'
    },
    health: {
      strengths: [
        '体质强健',
        '恢复能力强',
        '抗病能力好',
        '新陈代谢旺盛'
      ],
      weaknesses: [
        '容易患胃肠疾病',
        '幽门螺杆菌感染率高',
        '容易患皮肤病',
        '情绪性疾病风险高'
      ],
      diseases: [
        '胃溃疡',
        '十二指肠溃疡',
        '胃炎',
        '皮肤癌',
        '肾癌',
        '抑郁症'
      ],
      advice: [
        '注意胃部健康',
        '定期检查幽门螺杆菌',
        '学会情绪管理',
        '避免过度劳累',
        '注意皮肤防护',
        '及时寻求心理帮助'
      ]
    },
    lifestyle: {
      diet: [
        '多吃易消化的食物',
        '避免过于刺激的食物',
        '规律进餐',
        '适量摄入蛋白质',
        '多喝温开水',
        '避免暴饮暴食'
      ],
      exercise: [
        '适合高强度运动',
        '推荐力量训练',
        '团体竞技运动',
        '户外探险活动',
        '定期更换运动项目',
        '注重运动后的恢复'
      ],
      stress: [
        '通过运动释放压力',
        '学会深呼吸',
        '培养冥想习惯',
        '与信任的人交流',
        '设定合理目标',
        '学会放松技巧'
      ]
    },
    relationships: {
      love: 'O型血的人在爱情中热情主动，但有时过于强势。需要学会倾听和妥协。',
      friendship: '朋友信任度高，是可以依靠的朋友。但有时会因为过于直接而伤害他人。',
      family: '家庭责任感强，是家庭的支柱。但要注意不要过于专制。',
      communication: '沟通直接有效，但需要学会更加温和和耐心。'
    },
    compatibility: {
      'A': {
        score: 75,
        description: '很好的配合，O型的领导力与A型的执行力互补。',
        advice: 'O型要尊重A型的谨慎，A型要学会表达自己的想法。'
      },
      'B': {
        score: 80,
        description: '充满活力的组合，相互激励和支持。',
        advice: '要学会协调，避免都想主导的情况。'
      },
      'O': {
        score: 65,
        description: '都有强烈的主导欲，容易产生冲突。',
        advice: '要学会轮流主导，相互尊重和妥协。'
      },
      'AB': {
        score: 70,
        description: 'AB型的理性可以平衡O型的冲动。',
        advice: 'O型要学会更多思考，AB型要更加坚决。'
      }
    },
    dailyAdvice: [
      '今天练习倾听他人的意见，不要急于表达自己的观点。',
      '关注胃部健康，避免空腹或过饱。',
      '学会放慢节奏，给自己一些思考时间。',
      '与团队成员多沟通，了解他们的需求。',
      '尝试一些放松的活动，如瑜伽或冥想。',
      '表达感谢和欣赏，增进人际关系。'
    ],
    motto: '勇敢前行，领导未来，用行动证明一切。',
    color: '#FF9500',
    gradient: 'from-orange-400 to-red-500'
  },
  'AB': {
    type: 'AB',
    name: 'AB型血',
    emoji: '🆎',
    description: 'AB型血的人通常性格复杂多变，既有A型的谨慎，又有B型的活泼，是最神秘的血型。',
    personality: {
      positive: [
        '思维敏捷，智商较高',
        '多才多艺，兴趣广泛',
        '适应能力强，灵活变通',
        '客观理性，判断力强',
        '创造力强，想象力丰富',
        '善于分析，逻辑思维强',
        '包容性强，理解力好'
      ],
      negative: [
        '情绪多变，难以捉摸',
        '内心矛盾，纠结复杂',
        '缺乏持久力，容易放弃',
        '过于理性，缺乏热情',
        '不太合群，显得孤独',
        '犹豫不决，难以选择',
        '容易钻牛角尖'
      ],
      core: 'AB型血的人是复杂的矛盾体，既理性又感性，既独立又需要认同。',
      keywords: ['复杂', '矛盾', '理性', '创造力', '多变', '聪明', '神秘']
    },
    career: {
      suitable: [
        '研究员、科学家',
        '艺术家、音乐家',
        '作家、编剧',
        '心理学家、咨询师',
        'IT工程师、程序员',
        '策划师、分析师',
        '自由职业者'
      ],
      unsuitable: [
        '需要长期团队合作',
        '高压力的销售工作',
        '单调重复的工作',
        '需要强烈社交的工作',
        '过于规范化的工作'
      ],
      advice: 'AB型血的人适合从事需要创造力和分析能力的工作，最好能有一定的独立性。'
    },
    health: {
      strengths: [
        '适应能力强',
        '免疫系统相对平衡',
        '抗压能力较好',
        '身体调节能力强'
      ],
      weaknesses: [
        '容易患认知障碍',
        '记忆力衰退风险高',
        '精神疾病风险高',
        '心理健康问题多'
      ],
      diseases: [
        '认知障碍',
        '记忆力衰退',
        '精神分裂症',
        '抑郁症',
        '焦虑症',
        '强迫症'
      ],
      advice: [
        '注重心理健康',
        '定期进行记忆力训练',
        '保持良好的作息',
        '学会压力管理',
        '培养稳定的人际关系',
        '及时寻求专业帮助'
      ]
    },
    lifestyle: {
      diet: [
        '均衡营养，多样化饮食',
        '多吃健脑食物',
        '适量摄入omega-3',
        '避免过度刺激性食物',
        '规律饮食',
        '适量补充维生素'
      ],
      exercise: [
        '适合多样化的运动',
        '推荐瑜伽、太极',
        '游泳、慢跑',
        '脑力训练',
        '避免过于激烈的运动',
        '注重运动的持续性'
      ],
      stress: [
        '学会冥想',
        '培养稳定的兴趣爱好',
        '写日记记录情绪',
        '寻求专业心理帮助',
        '建立支持网络',
        '学会接受不完美'
      ]
    },
    relationships: {
      love: 'AB型血的人在爱情中复杂多变，既渴望理解又害怕受伤。需要耐心的伴侣。',
      friendship: '朋友不多但都是深交，善于倾听和分析。有时会因为过于理性而显得冷漠。',
      family: '家庭关系相对平淡，但内心深处很在乎家人。需要更多的情感表达。',
      communication: '沟通深度好，但有时过于复杂。建议简化表达，增加情感色彩。'
    },
    compatibility: {
      'A': {
        score: 70,
        description: 'AB型的理性与A型的感性形成互补。',
        advice: 'AB型要更加表达情感，A型要理解AB型的复杂性。'
      },
      'B': {
        score: 65,
        description: 'AB型的理性可以平衡B型的感性。',
        advice: 'AB型要学会更加开放，B型要更加理性。'
      },
      'O': {
        score: 70,
        description: 'AB型的理性可以平衡O型的冲动。',
        advice: 'AB型要更加坚决，O型要更加耐心。'
      },
      'AB': {
        score: 75,
        description: '相互理解的组合，能够深度交流。',
        advice: '要避免都过于理性，需要增加情感交流。'
      }
    },
    dailyAdvice: [
      '今天试着简化复杂的想法，用更直接的方式表达。',
      '多关注自己的情绪变化，学会情绪管理。',
      '与朋友深度交流，分享你的内心世界。',
      '做一些创造性的活动，发挥你的天赋。',
      '注意大脑健康，进行一些脑力训练。',
      '学会接受不完美，给自己一些宽容。'
    ],
    motto: '在复杂中寻找简单，在矛盾中寻找平衡。',
    color: '#9B59B6',
    gradient: 'from-purple-400 to-pink-500'
  }
};

// 血型配对分析
export interface BloodTypeMatch {
  type1: string;
  type2: string;
  score: number;
  category: '完美配对' | '不错配对' | '一般配对' | '需要努力';
  description: string;
  strengths: string[];
  challenges: string[];
  advice: string;
}

// 获取血型配对分析
export function getBloodTypeCompatibility(type1: string, type2: string): BloodTypeMatch {
  const data1 = bloodTypeDatabase[type1];
  const data2 = bloodTypeDatabase[type2];
  
  const compatibility = data1.compatibility[type2];
  
  let category: '完美配对' | '不错配对' | '一般配对' | '需要努力';
  if (compatibility.score >= 80) category = '完美配对';
  else if (compatibility.score >= 70) category = '不错配对';
  else if (compatibility.score >= 60) category = '一般配对';
  else category = '需要努力';

  return {
    type1,
    type2,
    score: compatibility.score,
    category,
    description: compatibility.description,
    strengths: [
      `${data1.name}的${data1.personality.positive[0]}`,
      `${data2.name}的${data2.personality.positive[0]}`,
      '相互理解和支持',
      '能够互相学习'
    ],
    challenges: [
      `${data1.name}的${data1.personality.negative[0]}`,
      `${data2.name}的${data2.personality.negative[0]}`,
      '沟通方式差异',
      '需要更多磨合'
    ],
    advice: compatibility.advice
  };
}

// 获取每日建议
export function getDailyAdvice(bloodType: string): string {
  const data = bloodTypeDatabase[bloodType];
  const today = new Date();
  const dayIndex = today.getDate() % data.dailyAdvice.length;
  return data.dailyAdvice[dayIndex];
}

// 健康风险评估
export function getHealthRisk(bloodType: string): {
  level: 'low' | 'medium' | 'high';
  diseases: string[];
  advice: string[];
} {
  const data = bloodTypeDatabase[bloodType];
  
  let level: 'low' | 'medium' | 'high';
  if (data.health.diseases.length <= 3) level = 'low';
  else if (data.health.diseases.length <= 5) level = 'medium';
  else level = 'high';

  return {
    level,
    diseases: data.health.diseases,
    advice: data.health.advice
  };
}