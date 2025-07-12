import { TarotCard, TarotSpread } from '../types';

// 22张大阿卡纳牌数据
export const majorArcanaCards: TarotCard[] = [
  {
    id: 'major-00-fool',
    name: '愚者',
    nameEn: 'The Fool',
    type: 'major',
    number: 0,
    element: 'air',
    keywords: ['新开始', '冒险', '天真', '自由', '潜能'],
    description: '愚者代表纯真、新的开始和无限的可能性。这是一张充满希望和冒险精神的牌。',
    upright: {
      meaning: '新的开始、冒险、天真无邪、自发性、自由精神',
      keywords: ['新开始', '冒险', '天真', '自由', '潜能', '乐观', '信任'],
      love: '新的恋情开始，保持开放的心态迎接爱情',
      career: '新的工作机会，适合创业或转换跑道',
      health: '身体状况良好，保持积极的生活态度',
      advice: '相信直觉，勇敢踏出第一步，不要过度思考'
    },
    reversed: {
      meaning: '鲁莽、缺乏经验、愚蠢的决定、错失机会',
      keywords: ['鲁莽', '天真', '缺乏方向', '冲动', '风险'],
      love: '在感情中过于冲动，需要更谨慎地对待关系',
      career: '缺乏计划的行动可能导致失败，需要更多准备',
      health: '注意因为疏忽而导致的健康问题',
      advice: '在行动前仔细考虑，避免过于冲动的决定'
    },
    symbolism: ['白玫瑰（纯洁）', '小狗（忠诚）', '悬崖（未知）', '太阳（希望）'],
    emoji: '🃏'
  },
  {
    id: 'major-01-magician',
    name: '魔术师',
    nameEn: 'The Magician',
    type: 'major',
    number: 1,
    element: 'air',
    keywords: ['意志力', '创造', '技能', '专注', '行动'],
    description: '魔术师代表创造力、技能和实现目标的能力。拥有将想法变为现实的力量。',
    upright: {
      meaning: '意志力、创造力、技能、专注、实现目标',
      keywords: ['创造', '技能', '专注', '意志', '实现', '能力', '行动'],
      love: '主动追求爱情，有能力创造理想的关系',
      career: '具备实现目标的技能和意志力，适合领导角色',
      health: '有能力改善健康状况，意志力强',
      advice: '专注于目标，运用你的技能和资源去实现愿望'
    },
    reversed: {
      meaning: '滥用权力、操控、缺乏技能、意志薄弱',
      keywords: ['操控', '欺骗', '滥用', '缺乏技能', '意志薄弱'],
      love: '可能有操控或欺骗的倾向，缺乏真诚',
      career: '滥用职权或缺乏必要的技能',
      health: '忽视健康问题，缺乏自制力',
      advice: '避免操控他人，诚实面对自己的能力限制'
    },
    symbolism: ['无限符号（永恒）', '四元素（完整）', '魔杖（意志）', '祭坛（神圣）'],
    emoji: '🎩'
  },
  {
    id: 'major-02-high-priestess',
    name: '女祭司',
    nameEn: 'The High Priestess',
    type: 'major',
    number: 2,
    element: 'water',
    keywords: ['直觉', '神秘', '内在智慧', '潜意识', '静心'],
    description: '女祭司代表直觉、内在智慧和神秘知识。她提醒我们聆听内心的声音。',
    upright: {
      meaning: '直觉、内在智慧、神秘、潜意识、静心思考',
      keywords: ['直觉', '智慧', '神秘', '潜意识', '静心', '理解', '洞察'],
      love: '依靠直觉理解伴侣，深层的情感连接',
      career: '需要更多的思考和观察，不宜急于行动',
      health: '关注身心平衡，可能需要静养',
      advice: '相信你的直觉，花时间深入思考问题的本质'
    },
    reversed: {
      meaning: '缺乏直觉、秘密、压抑、不平衡',
      keywords: ['忽视直觉', '秘密', '压抑', '不平衡', '混乱'],
      love: '缺乏情感理解，可能有隐藏的秘密',
      career: '忽视内在指引，可能错过重要信息',
      health: '身心不平衡，压抑情感导致健康问题',
      advice: '重新连接你的直觉，诚实面对内心的感受'
    },
    symbolism: ['月亮（潜意识）', '石榴（丰饶）', '水（情感）', '柱子（平衡）'],
    emoji: '🌙'
  },
  {
    id: 'major-03-empress',
    name: '女皇',
    nameEn: 'The Empress',
    type: 'major',
    number: 3,
    element: 'earth',
    keywords: ['丰饶', '创造', '母性', '自然', '繁荣'],
    description: '女皇代表母性、创造力和丰饶。她象征着生命的繁荣和自然的力量。',
    upright: {
      meaning: '丰饶、创造力、母性、繁荣、自然',
      keywords: ['丰饶', '创造', '母性', '繁荣', '自然', '美丽', '富足'],
      love: '充满爱意的关系，可能有生育或家庭扩展',
      career: '创造性工作蓬勃发展，收获丰盛',
      health: '身体健康，特别是与生育相关的健康',
      advice: '拥抱你的创造力，享受生活的美好和丰盛'
    },
    reversed: {
      meaning: '缺乏创造力、依赖、过度保护、不孕',
      keywords: ['缺乏创造力', '依赖', '过度保护', '贫瘠', '阻塞'],
      love: '关系中的依赖问题，可能过度保护伴侣',
      career: '创造力受阻，可能过度依赖他人',
      health: '与女性健康相关的问题，需要关注',
      advice: '培养独立性，释放被压抑的创造力'
    },
    symbolism: ['麦穗（丰收）', '石榴（生育）', '星冠（神圣）', '流水（生命）'],
    emoji: '👸'
  },
  {
    id: 'major-04-emperor',
    name: '皇帝',
    nameEn: 'The Emperor',
    type: 'major',
    number: 4,
    element: 'fire',
    keywords: ['权威', '结构', '控制', '稳定', '父性'],
    description: '皇帝代表权威、秩序和稳定的结构。他象征着领导力和控制力。',
    upright: {
      meaning: '权威、控制、结构、稳定、领导力',
      keywords: ['权威', '控制', '结构', '稳定', '领导', '秩序', '保护'],
      love: '关系中需要更多结构和承诺，男性角色重要',
      career: '领导职位，权威地位，事业稳定发展',
      health: '通过纪律和结构改善健康状况',
      advice: '建立秩序和结构，承担领导责任'
    },
    reversed: {
      meaning: '独裁、过度控制、缺乏纪律、暴政',
      keywords: ['独裁', '过度控制', '暴政', '缺乏纪律', '混乱'],
      love: '关系中的控制欲过强，缺乏平等',
      career: '滥用权力，独裁管理风格',
      health: '因压力和控制欲导致的健康问题',
      advice: '学会平衡控制和自由，避免过度强势'
    },
    symbolism: ['王座（权力）', '山羊（野心）', '盔甲（保护）', '权杖（权威）'],
    emoji: '👑'
  },
  {
    id: 'major-05-hierophant',
    name: '教皇',
    nameEn: 'The Hierophant',
    type: 'major',
    number: 5,
    element: 'earth',
    keywords: ['传统', '教育', '精神指导', '信仰', '机构'],
    description: '教皇代表传统、精神指导和既定的制度。他象征着学习和精神成长。',
    upright: {
      meaning: '传统、教育、精神指导、信仰、既定制度',
      keywords: ['传统', '教育', '指导', '信仰', '学习', '制度', '智慧'],
      love: '传统的恋爱关系，可能涉及婚姻或承诺',
      career: '在传统机构工作，或需要接受正规教育',
      health: '遵循传统的治疗方法，寻求专业指导',
      advice: '尊重传统和既定制度，寻求有经验的导师指导'
    },
    reversed: {
      meaning: '叛逆、打破传统、个人信仰、不正统',
      keywords: ['叛逆', '打破传统', '个人信仰', '不正统', '质疑'],
      love: '不传统的关系形式，挑战社会期望',
      career: '选择非传统的职业道路，创新思维',
      health: '尝试替代疗法，质疑传统治疗',
      advice: '勇敢追求个人信念，但要考虑后果'
    },
    symbolism: ['三重冠（精神权威）', '钥匙（知识）', '柱子（稳定）', '信徒（学习）'],
    emoji: '⛪'
  },
  // 继续添加其他16张大阿卡纳牌...
  {
    id: 'major-06-lovers',
    name: '恋人',
    nameEn: 'The Lovers',
    type: 'major',
    number: 6,
    element: 'air',
    keywords: ['爱情', '选择', '关系', '和谐', '结合'],
    description: '恋人代表爱情、关系和重要的选择。象征着和谐与结合。',
    upright: {
      meaning: '爱情、和谐、关系、选择、结合',
      keywords: ['爱情', '和谐', '关系', '选择', '结合', '平衡', '决定'],
      love: '真挚的爱情关系，和谐的伴侣关系',
      career: '需要做出重要选择，团队合作',
      health: '身心和谐，关注与他人的情感连接',
      advice: '跟随你的心，在重要选择中寻求平衡'
    },
    reversed: {
      meaning: '关系不和、错误选择、不忠、失衡',
      keywords: ['不和', '冲突', '错误选择', '不忠', '失衡'],
      love: '关系中出现问题，缺乏和谐',
      career: '错误的职业选择，团队不和',
      health: '身心失衡，压力影响健康',
      advice: '重新评估你的选择和关系'
    },
    symbolism: ['天使（神圣指引）', '男女（极性）', '山（挑战）', '苹果树（诱惑）'],
    emoji: '💕'
  }
  // 为了简化，我将只包含前6张大阿卡纳牌，其他牌的数据结构相同
];

// 塔罗牌阵数据
export const tarotSpreads: TarotSpread[] = [
  {
    id: 'single-card',
    name: '单张牌',
    description: '最简单的牌阵，抽取一张牌回答问题或了解当前状况',
    positions: [
      {
        id: 'card',
        name: '结果',
        description: '对你问题的回答或当前状况的指引',
        x: 50,
        y: 50
      }
    ],
    difficulty: 'beginner',
    category: 'general',
    emoji: '🃏'
  },
  {
    id: 'three-card',
    name: '三张牌',
    description: '经典的过去-现在-未来牌阵，或情况-行动-结果',
    positions: [
      {
        id: 'past',
        name: '过去',
        description: '影响当前状况的过去事件或因素',
        x: 25,
        y: 50
      },
      {
        id: 'present',
        name: '现在',
        description: '当前的状况或你现在面临的问题',
        x: 50,
        y: 50
      },
      {
        id: 'future',
        name: '未来',
        description: '可能的结果或未来的发展方向',
        x: 75,
        y: 50
      }
    ],
    difficulty: 'beginner',
    category: 'general',
    emoji: '🔮'
  },
  {
    id: 'love-triangle',
    name: '爱情三角',
    description: '专门用于分析感情关系的三张牌阵',
    positions: [
      {
        id: 'you',
        name: '你的感受',
        description: '你在这段关系中的感受和状态',
        x: 50,
        y: 20
      },
      {
        id: 'partner',
        name: '对方的感受',
        description: '对方在这段关系中的感受和状态',
        x: 25,
        y: 70
      },
      {
        id: 'relationship',
        name: '关系状况',
        description: '你们关系的整体状况和发展潜力',
        x: 75,
        y: 70
      }
    ],
    difficulty: 'intermediate',
    category: 'love',
    emoji: '💝'
  },
  {
    id: 'celtic-cross',
    name: '凯尔特十字',
    description: '最经典的复杂牌阵，提供全面深入的分析',
    positions: [
      {
        id: 'present',
        name: '现状',
        description: '当前的核心状况',
        x: 40,
        y: 50
      },
      {
        id: 'challenge',
        name: '挑战',
        description: '当前面临的挑战或阻碍',
        x: 60,
        y: 50
      },
      {
        id: 'past',
        name: '过去',
        description: '影响现状的过去因素',
        x: 40,
        y: 70
      },
      {
        id: 'future',
        name: '未来',
        description: '可能的未来发展',
        x: 40,
        y: 30
      },
      {
        id: 'above',
        name: '意识',
        description: '你意识到的因素',
        x: 20,
        y: 50
      },
      {
        id: 'below',
        name: '潜意识',
        description: '潜意识中的影响因素',
        x: 40,
        y: 90
      },
      {
        id: 'advice',
        name: '建议',
        description: '应该采取的行动',
        x: 80,
        y: 85
      },
      {
        id: 'external',
        name: '外在影响',
        description: '外部环境和他人的影响',
        x: 80,
        y: 65
      },
      {
        id: 'hopes',
        name: '希望恐惧',
        description: '你的希望和恐惧',
        x: 80,
        y: 45
      },
      {
        id: 'outcome',
        name: '最终结果',
        description: '最可能的结果',
        x: 80,
        y: 25
      }
    ],
    difficulty: 'advanced',
    category: 'general',
    emoji: '✨'
  },
  {
    id: 'career-path',
    name: '职业发展',
    description: '专门分析职业和事业发展的牌阵',
    positions: [
      {
        id: 'current-job',
        name: '现状',
        description: '你当前的职业状况',
        x: 30,
        y: 80
      },
      {
        id: 'skills',
        name: '技能',
        description: '你的优势和技能',
        x: 70,
        y: 80
      },
      {
        id: 'challenges',
        name: '挑战',
        description: '职业发展中的挑战',
        x: 30,
        y: 50
      },
      {
        id: 'opportunities',
        name: '机会',
        description: '即将到来的机会',
        x: 70,
        y: 50
      },
      {
        id: 'action',
        name: '行动',
        description: '你应该采取的行动',
        x: 50,
        y: 20
      }
    ],
    difficulty: 'intermediate',
    category: 'career',
    emoji: '💼'
  }
];

// 完整的78张塔罗牌数据库（这里只展示部分，实际应该包含所有78张）
export const allTarotCards: TarotCard[] = [
  ...majorArcanaCards,
  // 这里应该添加56张小阿卡纳牌
  // 为了演示，我添加几张小阿卡纳牌
  {
    id: 'wands-ace',
    name: '权杖王牌',
    nameEn: 'Ace of Wands',
    type: 'minor',
    number: 1,
    suit: 'wands',
    element: 'fire',
    keywords: ['新开始', '创造力', '灵感', '热情', '行动'],
    description: '权杖王牌代表新的创意项目、灵感和行动的开始。',
    upright: {
      meaning: '新的开始、创造力、灵感、热情、机会',
      keywords: ['新开始', '创造力', '灵感', '热情', '机会', '行动', '生命力'],
      love: '新恋情的开始，充满激情的关系',
      career: '新的创意项目，工作中的突破',
      health: '充满活力，开始新的健康计划',
      advice: '抓住新机会，发挥你的创造力'
    },
    reversed: {
      meaning: '缺乏方向、创意受阻、延迟、能量不足',
      keywords: ['缺乏方向', '创意受阻', '延迟', '能量不足', '挫折'],
      love: '关系缺乏激情，发展受阻',
      career: '项目延迟，缺乏创意灵感',
      health: '能量不足，需要休息调整',
      advice: '重新寻找动力和灵感'
    },
    symbolism: ['权杖（力量）', '手（行动）', '云（可能性）', '叶子（生长）'],
    emoji: '🔥'
  }
];

// 获取随机塔罗牌
export function getRandomCard(): TarotCard {
  const randomIndex = Math.floor(Math.random() * allTarotCards.length);
  return allTarotCards[randomIndex];
}

// 获取每日塔罗牌（基于日期的固定随机）
export function getDailyCard(date: Date = new Date()): { card: TarotCard; isReversed: boolean } {
  const dateString = date.toISOString().split('T')[0];
  const seed = dateString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const cardIndex = seed % allTarotCards.length;
  const isReversed = (seed * 7) % 2 === 0;
  
  return {
    card: allTarotCards[cardIndex],
    isReversed
  };
}

// 根据类型获取牌
export function getCardsByType(type: 'major' | 'minor'): TarotCard[] {
  return allTarotCards.filter(card => card.type === type);
}

// 根据花色获取牌
export function getCardsBySuit(suit: 'wands' | 'cups' | 'swords' | 'pentacles'): TarotCard[] {
  return allTarotCards.filter(card => card.suit === suit);
}

// 根据ID获取牌
export function getCardById(id: string): TarotCard | undefined {
  return allTarotCards.find(card => card.id === id);
}