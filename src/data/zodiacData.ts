import { ZodiacSign, ZodiacInfo } from '../types';

export const ZODIAC_DATA: Record<ZodiacSign, ZodiacInfo> = {
  aries: {
    name: '白羊座',
    symbol: '♈',
    element: 'fire',
    quality: 'cardinal',
    rulingPlanet: '火星',
    dateRange: '3月21日 - 4月19日',
    description: '充满活力和冒险精神的开拓者，勇敢直率，总是充满热情地迎接新挑战。',
    traits: {
      positive: ['勇敢', '热情', '直率', '领导力强', '积极主动', '创新'],
      negative: ['冲动', '急躁', '自私', '缺乏耐心', '好争论']
    },
    compatibility: {
      best: ['leo', 'sagittarius'],
      good: ['gemini', 'aquarius'],
      challenging: ['cancer', 'capricorn']
    },
    luckyNumbers: [1, 8, 17],
    luckyColors: ['红色', '橙色'],
    career: ['企业家', '运动员', '军人', '销售', '领导者'],
    love: '在爱情中热情如火，喜欢主动追求，但需要学会耐心和包容。',
    health: '注意头部和面部健康，避免过度劳累，保持规律运动。'
  },

  taurus: {
    name: '金牛座',
    symbol: '♉',
    element: 'earth',
    quality: 'fixed',
    rulingPlanet: '金星',
    dateRange: '4月20日 - 5月20日',
    description: '稳重踏实的实用主义者，追求安全感和物质享受，有着坚定的意志力。',
    traits: {
      positive: ['稳重', '可靠', '耐心', '实用', '忠诚', '艺术天赋'],
      negative: ['固执', '贪婪', '懒惰', '占有欲强', '抗拒变化']
    },
    compatibility: {
      best: ['virgo', 'capricorn'],
      good: ['cancer', 'pisces'],
      challenging: ['leo', 'aquarius']
    },
    luckyNumbers: [2, 6, 9, 12, 24],
    luckyColors: ['绿色', '粉色'],
    career: ['银行家', '艺术家', '厨师', '园艺师', '建筑师'],
    love: '在感情中忠诚专一，但需要安全感，喜欢稳定长久的关系。',
    health: '注意喉咙和颈部健康，避免暴饮暴食，保持适度运动。'
  },

  gemini: {
    name: '双子座',
    symbol: '♊',
    element: 'air',
    quality: 'mutable',
    rulingPlanet: '水星',
    dateRange: '5月21日 - 6月20日',
    description: '机智灵活的沟通高手，好奇心强，善于学习和适应，具有双重性格。',
    traits: {
      positive: ['聪明', '机智', '适应力强', '沟通能力强', '好奇心强', '幽默'],
      negative: ['善变', '肤浅', '不专一', '神经质', '缺乏耐心']
    },
    compatibility: {
      best: ['libra', 'aquarius'],
      good: ['aries', 'leo'],
      challenging: ['virgo', 'pisces']
    },
    luckyNumbers: [5, 7, 14, 23],
    luckyColors: ['黄色', '银色'],
    career: ['记者', '作家', '教师', '销售', '翻译'],
    love: '在爱情中需要精神交流，喜欢有趣的伴侣，但容易三心二意。',
    health: '注意呼吸系统和神经系统健康，避免过度紧张。'
  },

  cancer: {
    name: '巨蟹座',
    symbol: '♋',
    element: 'water',
    quality: 'cardinal',
    rulingPlanet: '月亮',
    dateRange: '6月21日 - 7月22日',
    description: '温柔体贴的守护者，情感丰富，重视家庭，具有强烈的保护欲。',
    traits: {
      positive: ['温柔', '体贴', '忠诚', '直觉强', '保护欲强', '有同情心'],
      negative: ['情绪化', '敏感', '小心眼', '依赖性强', '容易受伤']
    },
    compatibility: {
      best: ['scorpio', 'pisces'],
      good: ['taurus', 'virgo'],
      challenging: ['aries', 'libra']
    },
    luckyNumbers: [2, 7, 11, 16, 20, 25],
    luckyColors: ['白色', '银色', '海蓝色'],
    career: ['护士', '教师', '心理咨询师', '厨师', '房地产'],
    love: '在感情中深情专一，需要安全感，善于照顾伴侣。',
    health: '注意胃部和消化系统健康，情绪管理很重要。'
  },

  leo: {
    name: '狮子座',
    symbol: '♌',
    element: 'fire',
    quality: 'fixed',
    rulingPlanet: '太阳',
    dateRange: '7月23日 - 8月22日',
    description: '自信高贵的王者，天生具有领导魅力，热爱表现，追求荣誉和赞美。',
    traits: {
      positive: ['自信', '慷慨', '热情', '领导力', '创造力', '忠诚'],
      negative: ['自大', '虚荣', '固执', '专制', '爱面子']
    },
    compatibility: {
      best: ['aries', 'sagittarius'],
      good: ['gemini', 'libra'],
      challenging: ['taurus', 'scorpio']
    },
    luckyNumbers: [1, 3, 10, 19],
    luckyColors: ['金色', '橙色'],
    career: ['演员', '导演', '管理者', '政治家', '艺术家'],
    love: '在爱情中热情浪漫，喜欢被崇拜，需要伴侣的赞美和支持。',
    health: '注意心脏和背部健康，保持积极乐观的心态。'
  },

  virgo: {
    name: '处女座',
    symbol: '♍',
    element: 'earth',
    quality: 'mutable',
    rulingPlanet: '水星',
    dateRange: '8月23日 - 9月22日',
    description: '完美主义的分析家，注重细节，追求完美，具有强烈的服务精神。',
    traits: {
      positive: ['细心', '勤奋', '可靠', '分析能力强', '有条理', '谦逊'],
      negative: ['挑剔', '焦虑', '完美主义', '保守', '缺乏自信']
    },
    compatibility: {
      best: ['taurus', 'capricorn'],
      good: ['cancer', 'scorpio'],
      challenging: ['gemini', 'sagittarius']
    },
    luckyNumbers: [3, 27, 35],
    luckyColors: ['深蓝色', '绿色'],
    career: ['医生', '会计师', '编辑', '研究员', '秘书'],
    love: '在感情中谨慎细心，需要时间建立信任，一旦投入就很专一。',
    health: '注意肠胃健康和神经系统，避免过度焦虑。'
  },

  libra: {
    name: '天秤座',
    symbol: '♎',
    element: 'air',
    quality: 'cardinal',
    rulingPlanet: '金星',
    dateRange: '9月23日 - 10月22日',
    description: '优雅和谐的外交家，追求平衡与美感，善于协调人际关系。',
    traits: {
      positive: ['优雅', '公正', '和谐', '外交能力', '艺术天赋', '善良'],
      negative: ['犹豫不决', '依赖性强', '肤浅', '避免冲突', '缺乏主见']
    },
    compatibility: {
      best: ['gemini', 'aquarius'],
      good: ['leo', 'sagittarius'],
      challenging: ['cancer', 'capricorn']
    },
    luckyNumbers: [6, 15, 24, 33, 42, 51],
    luckyColors: ['粉色', '淡蓝色'],
    career: ['律师', '外交官', '设计师', '艺术家', '咨询师'],
    love: '在爱情中追求浪漫和谐，需要精神上的共鸣，害怕孤独。',
    health: '注意肾脏和腰部健康，保持情绪平衡很重要。'
  },

  scorpio: {
    name: '天蝎座',
    symbol: '♏',
    element: 'water',
    quality: 'fixed',
    rulingPlanet: '冥王星',
    dateRange: '10月23日 - 11月21日',
    description: '神秘深邃的探索者，情感强烈，直觉敏锐，具有强大的意志力。',
    traits: {
      positive: ['深刻', '直觉强', '意志坚强', '忠诚', '神秘', '洞察力强'],
      negative: ['嫉妒', '报复心强', '固执', '极端', '占有欲强']
    },
    compatibility: {
      best: ['cancer', 'pisces'],
      good: ['virgo', 'capricorn'],
      challenging: ['leo', 'aquarius']
    },
    luckyNumbers: [4, 13, 22, 31],
    luckyColors: ['深红色', '黑色'],
    career: ['心理学家', '侦探', '外科医生', '研究员', '投资家'],
    love: '在感情中深情专一，但占有欲强，需要完全的信任和忠诚。',
    health: '注意生殖系统和排泄系统健康，情绪管理很重要。'
  },

  sagittarius: {
    name: '射手座',
    symbol: '♐',
    element: 'fire',
    quality: 'mutable',
    rulingPlanet: '木星',
    dateRange: '11月22日 - 12月21日',
    description: '自由奔放的哲学家，热爱冒险和探索，追求真理和智慧。',
    traits: {
      positive: ['乐观', '自由', '诚实', '哲学思维', '冒险精神', '幽默'],
      negative: ['不负责任', '缺乏耐心', '夸大', '不切实际', '逃避承诺']
    },
    compatibility: {
      best: ['aries', 'leo'],
      good: ['libra', 'aquarius'],
      challenging: ['virgo', 'pisces']
    },
    luckyNumbers: [3, 9, 15, 21, 27],
    luckyColors: ['紫色', '土耳其蓝'],
    career: ['教师', '哲学家', '旅行家', '出版商', '律师'],
    love: '在爱情中需要自由空间，害怕被束缚，喜欢有共同理想的伴侣。',
    health: '注意肝脏和大腿健康，避免过度放纵。'
  },

  capricorn: {
    name: '摩羯座',
    symbol: '♑',
    element: 'earth',
    quality: 'cardinal',
    rulingPlanet: '土星',
    dateRange: '12月22日 - 1月19日',
    description: '务实进取的成就者，有强烈的责任感和野心，追求成功和地位。',
    traits: {
      positive: ['务实', '有野心', '负责任', '耐心', '自律', '可靠'],
      negative: ['悲观', '固执', '保守', '冷漠', '过于严肃']
    },
    compatibility: {
      best: ['taurus', 'virgo'],
      good: ['scorpio', 'pisces'],
      challenging: ['aries', 'libra']
    },
    luckyNumbers: [8, 10, 26, 35],
    luckyColors: ['黑色', '深绿色'],
    career: ['CEO', '政府官员', '银行家', '建筑师', '工程师'],
    love: '在感情中认真负责，但表达较为含蓄，需要时间建立深度关系。',
    health: '注意骨骼和关节健康，避免过度工作。'
  },

  aquarius: {
    name: '水瓶座',
    symbol: '♒',
    element: 'air',
    quality: 'fixed',
    rulingPlanet: '天王星',
    dateRange: '1月20日 - 2月18日',
    description: '独立创新的理想主义者，思维前卫，重视友谊，追求人道主义。',
    traits: {
      positive: ['独立', '创新', '人道主义', '友善', '理想主义', '客观'],
      negative: ['冷漠', '固执', '叛逆', '不切实际', '情感疏离']
    },
    compatibility: {
      best: ['gemini', 'libra'],
      good: ['aries', 'sagittarius'],
      challenging: ['taurus', 'scorpio']
    },
    luckyNumbers: [4, 7, 11, 22, 29],
    luckyColors: ['蓝色', '银色'],
    career: ['科学家', '发明家', '社会工作者', 'IT专家', '占星师'],
    love: '在爱情中需要精神交流，重视友谊，但有时显得冷漠疏离。',
    health: '注意循环系统和小腿健康，保持社交活动。'
  },

  pisces: {
    name: '双鱼座',
    symbol: '♓',
    element: 'water',
    quality: 'mutable',
    rulingPlanet: '海王星',
    dateRange: '2月19日 - 3月20日',
    description: '梦幻浪漫的艺术家，情感丰富，富有同情心，具有强烈的直觉力。',
    traits: {
      positive: ['同情心强', '直觉敏锐', '艺术天赋', '温柔', '无私', '适应力强'],
      negative: ['逃避现实', '优柔寡断', '过于敏感', '容易受骗', '缺乏自信']
    },
    compatibility: {
      best: ['cancer', 'scorpio'],
      good: ['taurus', 'capricorn'],
      challenging: ['gemini', 'sagittarius']
    },
    luckyNumbers: [7, 16, 25, 34],
    luckyColors: ['海绿色', '紫色'],
    career: ['艺术家', '音乐家', '心理咨询师', '护士', '慈善工作者'],
    love: '在感情中浪漫多情，容易陷入幻想，需要理解和保护。',
    health: '注意足部和免疫系统健康，避免过度沉溺。'
  }
};
