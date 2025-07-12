import { Trigram, Hexagram } from '../types';

// 八卦数据
export const trigrams: Trigram[] = [
  {
    id: 'qian',
    name: 'Qian',
    chineseName: '乾',
    symbol: '☰',
    lines: [true, true, true],
    element: 'heaven',
    direction: '西北',
    season: '秋冬之交',
    meaning: '天，代表刚健、进取、领导力'
  },
  {
    id: 'kun',
    name: 'Kun',
    chineseName: '坤',
    symbol: '☷',
    lines: [false, false, false],
    element: 'earth',
    direction: '西南',
    season: '夏秋之交',
    meaning: '地，代表柔顺、包容、承载'
  },
  {
    id: 'zhen',
    name: 'Zhen',
    chineseName: '震',
    symbol: '☳',
    lines: [false, false, true],
    element: 'thunder',
    direction: '东',
    season: '春',
    meaning: '雷，代表震动、奋发、行动'
  },
  {
    id: 'xun',
    name: 'Xun',
    chineseName: '巽',
    symbol: '☴',
    lines: [true, false, false],
    element: 'wind',
    direction: '东南',
    season: '春夏之交',
    meaning: '风，代表柔和、渗透、顺从'
  },
  {
    id: 'kan',
    name: 'Kan',
    chineseName: '坎',
    symbol: '☵',
    lines: [false, true, false],
    element: 'water',
    direction: '北',
    season: '冬',
    meaning: '水，代表险难、流动、智慧'
  },
  {
    id: 'li',
    name: 'Li',
    chineseName: '离',
    symbol: '☲',
    lines: [true, false, true],
    element: 'fire',
    direction: '南',
    season: '夏',
    meaning: '火，代表光明、美丽、文明'
  },
  {
    id: 'gen',
    name: 'Gen',
    chineseName: '艮',
    symbol: '☶',
    lines: [true, true, false],
    element: 'mountain',
    direction: '东北',
    season: '冬春之交',
    meaning: '山，代表静止、稳定、思考'
  },
  {
    id: 'dui',
    name: 'Dui',
    chineseName: '兑',
    symbol: '☱',
    lines: [false, true, true],
    element: 'lake',
    direction: '西',
    season: '秋',
    meaning: '泽，代表喜悦、交流、收获'
  }
];

// 64卦数据（这里只展示前16卦，完整版本应包含全部64卦）
export const hexagrams: Hexagram[] = [
  {
    id: 'qian',
    number: 1,
    name: 'Qian',
    chineseName: '乾',
    symbol: '☰☰',
    upperTrigram: trigrams[0], // 乾
    lowerTrigram: trigrams[0], // 乾
    description: '天行健，君子以自强不息',
    judgment: '乾：元，亨，利，贞',
    image: '天行健，君子以自强不息',
    meaning: {
      general: '这是一个极其吉利的卦象，代表着天的力量和品质。象征着积极向上、刚健有力的精神状态。',
      love: '感情生活充满阳光，主动出击会有好结果。对于单身者来说，这是表白的好时机。',
      career: '事业运势极佳，是创业或者升职的好时机。你的才能会被充分认可和发挥。',
      health: '身体健康，精力充沛。是进行体育锻炼或健康养生的好时机。',
      finance: '财运亨通，投资理财会有不错的收益。但要注意不要过于冒险。',
      advice: '保持积极进取的态度，充分发挥自己的才能和潜力。'
    },
    changingLines: {
      1: {
        text: '初九：潜龙勿用',
        meaning: '时机未到，需要韬光养晦，积蓄力量'
      },
      2: {
        text: '九二：见龙在田，利见大人',
        meaning: '开始展现才能，寻求贵人相助'
      },
      3: {
        text: '九三：君子终日乾乾，夕惕若厉，无咎',
        meaning: '需要时刻保持警觉，勤奋努力'
      },
      4: {
        text: '九四：或跃在渊，无咎',
        meaning: '面临重要选择，需要谨慎决策'
      },
      5: {
        text: '九五：飞龙在天，利见大人',
        meaning: '达到人生巅峰，获得成功'
      },
      6: {
        text: '上九：亢龙有悔',
        meaning: '物极必反，需要适可而止'
      }
    }
  },
  {
    id: 'kun',
    number: 2,
    name: 'Kun',
    chineseName: '坤',
    symbol: '☷☷',
    upperTrigram: trigrams[1], // 坤
    lowerTrigram: trigrams[1], // 坤
    description: '地势坤，君子以厚德载物',
    judgment: '坤：元，亨，利牝马之贞',
    image: '地势坤，君子以厚德载物',
    meaning: {
      general: '代表柔顺、包容、承载的力量。象征着以柔克刚、厚德载物的智慧。',
      love: '感情中需要更多的包容和理解，以柔和的态度处理感情问题。',
      career: '适合从事服务性、辅助性的工作。通过默默奉献获得认可。',
      health: '注意阴性疾病的预防，保持心态平和，避免过度焦虑。',
      finance: '财运平稳，适合保守型投资。通过勤劳节俭积累财富。',
      advice: '发挥柔和包容的品质，通过德行感化他人。'
    },
    changingLines: {
      1: {
        text: '初六：履霜，坚冰至',
        meaning: '看到细微的征象，预防问题的发生'
      },
      2: {
        text: '六二：直，方，大，不习无不利',
        meaning: '保持正直方正的品格'
      },
      3: {
        text: '六三：含章可贞，或从王事，无成有终',
        meaning: '隐藏才华，等待时机'
      },
      4: {
        text: '六四：括囊，无咎，无誉',
        meaning: '谨慎行事，不求功名'
      },
      5: {
        text: '六五：黄裳，元吉',
        meaning: '以谦逊的态度获得成功'
      },
      6: {
        text: '上六：龙战于野，其血玄黄',
        meaning: '阴阳相争，需要平衡'
      }
    }
  },
  {
    id: 'zhun',
    number: 3,
    name: 'Zhun',
    chineseName: '屯',
    symbol: '☵☳',
    upperTrigram: trigrams[4], // 坎
    lowerTrigram: trigrams[2], // 震
    description: '云雷屯，君子以经纶',
    judgment: '屯：元，亨，利，贞。勿用，有攸往，利建侯',
    image: '云雷屯，君子以经纶',
    meaning: {
      general: '象征着事物的开始阶段，充满困难但也蕴含着机遇。需要耐心等待，积极准备。',
      love: '感情初期可能会遇到一些阻碍，需要双方共同努力克服困难。',
      career: '创业初期或新工作开始时会遇到困难，需要坚持不懈。',
      health: '身体可能处于调整阶段，注意休息和保养。',
      finance: '财运处于起步阶段，需要谨慎理财，避免大额投资。',
      advice: '在困难中坚持，为未来的发展打下坚实基础。'
    },
    changingLines: {
      1: {
        text: '初九：磐桓，利居贞，利建侯',
        meaning: '在困难中坚守原则，等待时机'
      },
      2: {
        text: '六二：屯如邅如，乘马班如',
        meaning: '进退两难，需要寻求帮助'
      },
      3: {
        text: '六三：既鹿无虞，惟入于林中',
        meaning: '盲目行动会迷失方向'
      },
      4: {
        text: '六四：乘马班如，求婚媾',
        meaning: '寻求合作伙伴，建立联盟'
      },
      5: {
        text: '九五：屯其膏，小贞吉，大贞凶',
        meaning: '小心谨慎，不要贪大求全'
      },
      6: {
        text: '上六：乘马班如，泣血涟如',
        meaning: '困难重重，需要坚强面对'
      }
    }
  },
  {
    id: 'meng',
    number: 4,
    name: 'Meng',
    chineseName: '蒙',
    symbol: '☶☵',
    upperTrigram: trigrams[6], // 艮
    lowerTrigram: trigrams[4], // 坎
    description: '山下出泉，蒙；君子以果行育德',
    judgment: '蒙：亨。匪我求童蒙，童蒙求我',
    image: '山下出泉，蒙；君子以果行育德',
    meaning: {
      general: '象征着蒙昧和启蒙，代表学习和教育的重要性。需要虚心求教，接受指导。',
      love: '感情中需要更多的沟通和理解，学会倾听对方的想法。',
      career: '适合从事教育、培训相关的工作。需要不断学习提升自己。',
      health: '注意脑部健康，多进行智力活动，保持头脑清晰。',
      finance: '理财需要学习专业知识，不要盲目投资。',
      advice: '保持谦逊的学习态度，虚心接受他人的指导。'
    },
    changingLines: {
      1: {
        text: '初六：发蒙，利用刑人',
        meaning: '通过纪律和规范来启蒙'
      },
      2: {
        text: '九二：包蒙吉，纳妇吉',
        meaning: '宽容地对待蒙昧，耐心教导'
      },
      3: {
        text: '六三：勿用娶女，见金夫，不有躬',
        meaning: '不要被表面现象迷惑'
      },
      4: {
        text: '六四：困蒙，吝',
        meaning: '固执己见会带来困扰'
      },
      5: {
        text: '六五：童蒙，吉',
        meaning: '保持纯真的心态去学习'
      },
      6: {
        text: '上九：击蒙，不利为寇',
        meaning: '严厉的教导要适度'
      }
    }
  },
  {
    id: 'xu',
    number: 5,
    name: 'Xu',
    chineseName: '需',
    symbol: '☰☵',
    upperTrigram: trigrams[0], // 乾
    lowerTrigram: trigrams[4], // 坎
    description: '云上于天，需；君子以饮食宴乐',
    judgment: '需：有孚，光亨，贞吉，利涉大川',
    image: '云上于天，需；君子以饮食宴乐',
    meaning: {
      general: '象征着等待和需求，代表在困难面前需要耐心等待时机。',
      love: '感情需要时间培养，不要急于求成，耐心等待对方的回应。',
      career: '事业发展需要等待适当的时机，不要盲目行动。',
      health: '身体处于恢复期，需要充足的休息和营养。',
      finance: '财运需要等待，不要急于投资，先做好准备。',
      advice: '在等待中充实自己，为未来的机遇做好准备。'
    },
    changingLines: {
      1: {
        text: '初九：需于郊，利用恒，无咎',
        meaning: '在安全的地方等待，保持恒心'
      },
      2: {
        text: '九二：需于沙，小有言，终吉',
        meaning: '可能会有小的争议，但最终会好转'
      },
      3: {
        text: '九三：需于泥，致寇至',
        meaning: '位置不当会招来麻烦'
      },
      4: {
        text: '六四：需于血，出自穴',
        meaning: '面临危险，需要脱离困境'
      },
      5: {
        text: '九五：需于酒食，贞吉',
        meaning: '在舒适的环境中等待'
      },
      6: {
        text: '上六：入于穴，有不速之客三人来',
        meaning: '意外的帮助会到来'
      }
    }
  },
  {
    id: 'song',
    number: 6,
    name: 'Song',
    chineseName: '讼',
    symbol: '☵☰',
    upperTrigram: trigrams[4], // 坎
    lowerTrigram: trigrams[0], // 乾
    description: '天与水违行，讼；君子以作事谋始',
    judgment: '讼：有孚，窒。惕中吉。终凶。利见大人，不利涉大川',
    image: '天与水违行，讼；君子以作事谋始',
    meaning: {
      general: '象征着争讼和冲突，代表意见分歧和对立。需要谨慎处理，避免激化矛盾。',
      love: '感情中可能会有争吵和误解，需要冷静沟通，寻求和解。',
      career: '工作中可能会遇到竞争和冲突，要保持理性，避免正面冲突。',
      health: '注意因为压力导致的身体不适，要学会释放压力。',
      finance: '可能会有财务纠纷，要谨慎处理金钱关系。',
      advice: '在冲突中保持理性，寻求和平解决的方法。'
    },
    changingLines: {
      1: {
        text: '初六：不永所事，小有言，终吉',
        meaning: '及时停止争端，避免扩大化'
      },
      2: {
        text: '九二：不克讼，归而逋',
        meaning: '避免争讼，选择退让'
      },
      3: {
        text: '六三：食旧德，贞厉，终吉',
        meaning: '凭借过去的德行度过难关'
      },
      4: {
        text: '九四：不克讼，复即命',
        meaning: '争讼不利，应该遵从命令'
      },
      5: {
        text: '九五：讼元吉',
        meaning: '通过公正的途径解决争端'
      },
      6: {
        text: '上九：或锡之鞶带，终朝三褫之',
        meaning: '争讼的胜利往往是短暂的'
      }
    }
  },
  {
    id: 'shi',
    number: 7,
    name: 'Shi',
    chineseName: '师',
    symbol: '☷☵',
    upperTrigram: trigrams[1], // 坤
    lowerTrigram: trigrams[4], // 坎
    description: '地中有水，师；君子以容民畜众',
    judgment: '师：贞，丈人，吉无咎',
    image: '地中有水，师；君子以容民畜众',
    meaning: {
      general: '象征着军队和组织，代表领导力和团队合作。需要有经验的领导者指导。',
      love: '感情中需要一方主导，建立稳定的关系模式。',
      career: '适合从事管理和领导工作，需要统筹规划和协调能力。',
      health: '身体需要系统性的调理，制定健康计划。',
      finance: '财务管理需要有计划，建立理财系统。',
      advice: '发挥领导才能，团结大家一起努力实现目标。'
    },
    changingLines: {
      1: {
        text: '初六：师出以律，否臧凶',
        meaning: '行动必须有纪律，否则会失败'
      },
      2: {
        text: '九二：在师中，吉无咎，王三锡命',
        meaning: '在团队中发挥核心作用'
      },
      3: {
        text: '六三：师或舆尸，凶',
        meaning: '指挥不当会导致失败'
      },
      4: {
        text: '六四：师左次，无咎',
        meaning: '战略性撤退，保存实力'
      },
      5: {
        text: '六五：田有禽，利执言，无咎',
        meaning: '抓住机会，但要谨慎行事'
      },
      6: {
        text: '上六：大君有命，开国承家',
        meaning: '获得重大成就，建立基业'
      }
    }
  },
  {
    id: 'bi',
    number: 8,
    name: 'Bi',
    chineseName: '比',
    symbol: '☵☷',
    upperTrigram: trigrams[4], // 坎
    lowerTrigram: trigrams[1], // 坤
    description: '地上有水，比；先王以建万国，亲诸侯',
    judgment: '比：吉。原筮元永贞，无咎',
    image: '地上有水，比；先王以建万国，亲诸侯',
    meaning: {
      general: '象征着团结和合作，代表和谐的人际关系。需要建立良好的人际网络。',
      love: '感情和谐，双方能够相互理解和支持。',
      career: '工作中需要团队合作，通过协作实现共同目标。',
      health: '身心和谐，保持良好的生活规律。',
      finance: '通过合作投资或合伙经营获得收益。',
      advice: '注重人际关系的建立和维护，团结合作共同发展。'
    },
    changingLines: {
      1: {
        text: '初六：有孚比之，无咎',
        meaning: '以诚相待，建立信任关系'
      },
      2: {
        text: '六二：比之自内，贞吉',
        meaning: '从内部建立和谐关系'
      },
      3: {
        text: '六三：比之匪人',
        meaning: '要选择合适的合作伙伴'
      },
      4: {
        text: '六四：外比之，贞吉',
        meaning: '与外界建立良好关系'
      },
      5: {
        text: '九五：显比，王用三驱',
        meaning: '以德服人，获得众人拥戴'
      },
      6: {
        text: '上六：比之无首，凶',
        meaning: '缺乏领导会导致混乱'
      }
    }
  }
];

// 获取八卦
export const getTrigramById = (id: string): Trigram | undefined => {
  return trigrams.find(trigram => trigram.id === id);
};

// 获取卦象
export const getHexagramById = (id: string): Hexagram | undefined => {
  return hexagrams.find(hexagram => hexagram.id === id);
};

// 获取卦象通过编号
export const getHexagramByNumber = (number: number): Hexagram | undefined => {
  return hexagrams.find(hexagram => hexagram.number === number);
};

// 根据八卦组合获取卦象
export const getHexagramByTrigrams = (upperTrigram: string, lowerTrigram: string): Hexagram | undefined => {
  return hexagrams.find(hexagram => 
    hexagram.upperTrigram.id === upperTrigram && 
    hexagram.lowerTrigram.id === lowerTrigram
  );
};

// 易经智慧语录
export const ichingWisdom = [
  {
    quote: "天行健，君子以自强不息",
    source: "乾卦",
    explanation: "天体运行刚健不息，君子应该效法天道，不断自我完善和进取",
    relevance: "鼓励我们要有积极向上的人生态度"
  },
  {
    quote: "地势坤，君子以厚德载物",
    source: "坤卦",
    explanation: "大地宽厚包容，君子应该以深厚的德行容纳万物",
    relevance: "教导我们要有宽容和包容的品格"
  },
  {
    quote: "穷则变，变则通，通则久",
    source: "系辞",
    explanation: "事物发展到极限就会变化，变化就会通达，通达就会持久",
    relevance: "启示我们要善于变通，适应环境的变化"
  },
  {
    quote: "同声相应，同气相求",
    source: "系辞",
    explanation: "相同的声音会产生共鸣，相同的气息会相互吸引",
    relevance: "说明志趣相投的人会自然地走到一起"
  },
  {
    quote: "积善之家，必有余庆",
    source: "系辞",
    explanation: "多做善事的家庭，必然会有更多的福报",
    relevance: "强调善有善报的道德法则"
  }
];

// 易经数据库
export const ichingDatabase = {
  trigrams,
  hexagrams,
  wisdom: ichingWisdom,
  getTrigramById,
  getHexagramById,
  getHexagramByNumber,
  getHexagramByTrigrams
};