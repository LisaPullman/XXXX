import { 
  PalmLine, 
  PalmMount, 
  HandShape, 
  FaceFeature, 
  FaceShape 
} from '../types';

// 手掌形状数据
export const handShapes: HandShape[] = [
  {
    id: 'earth-hand',
    name: 'Earth Hand',
    chineseName: '土型手',
    description: '方形手掌，手指较短，结实有力',
    characteristics: {
      palmShape: 'square',
      fingerLength: 'short',
      palmWidth: 'wide'
    },
    personality: {
      traits: ['实用主义', '可靠稳重', '脚踏实地', '注重细节', '保守传统'],
      strengths: ['执行力强', '责任心强', '耐力持久', '值得信赖', '专注专业'],
      challenges: ['缺乏创新', '过于保守', '适应性差', '表达能力有限', '容易固执'],
      career: ['工程师', '建筑师', '农业专家', '手工艺人', '财务管理', '制造业'],
      relationships: '忠诚可靠的伴侣，但需要学会表达情感和浪漫'
    }
  },
  {
    id: 'air-hand',
    name: 'Air Hand',
    chineseName: '风型手',
    description: '方形手掌，手指修长，关节明显',
    characteristics: {
      palmShape: 'square',
      fingerLength: 'long',
      palmWidth: 'medium'
    },
    personality: {
      traits: ['智慧理性', '善于沟通', '思维敏捷', '好奇心强', '适应力强'],
      strengths: ['分析能力强', '沟通技巧好', '学习能力强', '思维灵活', '客观理性'],
      challenges: ['情感表达困难', '过度理性', '缺乏持久力', '容易分心', '犹豫不决'],
      career: ['教师', '作家', '律师', '咨询师', '研究员', '媒体工作者'],
      relationships: '需要智慧交流的伴侣，重视精神层面的连接'
    }
  },
  {
    id: 'fire-hand',
    name: 'Fire Hand',
    chineseName: '火型手',
    description: '长形手掌，手指较短，充满活力',
    characteristics: {
      palmShape: 'rectangle',
      fingerLength: 'short',
      palmWidth: 'narrow'
    },
    personality: {
      traits: ['热情积极', '行动力强', '领导才能', '自信勇敢', '创新求变'],
      strengths: ['执行力强', '领导能力', '创新思维', '适应变化', '激励他人'],
      challenges: ['易冲动', '缺乏耐心', '过于自信', '容易忽略细节', '情绪波动大'],
      career: ['企业家', '销售经理', '演艺人员', '运动员', '创意设计师', '市场营销'],
      relationships: '需要激情和冒险的感情，但要学会控制脾气'
    }
  },
  {
    id: 'water-hand',
    name: 'Water Hand',
    chineseName: '水型手',
    description: '长形手掌，手指修长，柔软灵活',
    characteristics: {
      palmShape: 'oval',
      fingerLength: 'long',
      palmWidth: 'narrow'
    },
    personality: {
      traits: ['敏感细腻', '富有同情心', '创造力强', '直觉敏锐', '情感丰富'],
      strengths: ['艺术天赋', '同理心强', '创造力强', '直觉准确', '情感智慧'],
      challenges: ['过于敏感', '情绪不稳定', '决策困难', '易受影响', '缺乏实用性'],
      career: ['艺术家', '心理咨询师', '护理人员', '音乐家', '设计师', '社会工作者'],
      relationships: '深情且浪漫，需要理解和支持的伴侣'
    }
  }
];

// 手掌线条数据
export const palmLines: PalmLine[] = [
  {
    id: 'life-line',
    name: 'Life Line',
    chineseName: '生命线',
    description: '环绕拇指根部的弧形线条，代表生命力和健康状况',
    characteristics: {
      length: 'long',
      depth: 'deep',
      clarity: 'clear',
      branches: false,
      islands: false
    },
    interpretation: {
      positive: ['生命力旺盛', '身体健康', '精力充沛', '长寿征象', '恢复力强'],
      negative: ['体质较弱', '容易疲劳', '需要注意健康', '生活压力大', '缺乏运动'],
      career: '适合需要体力和耐力的工作，如运动、户外作业等',
      health: '整体健康状况良好，但需要注意劳逸结合',
      relationships: '在感情中能够给予伴侣安全感和支持',
      personality: '积极乐观，热爱生活，有强烈的生存意志'
    }
  },
  {
    id: 'heart-line',
    name: 'Heart Line',
    chineseName: '感情线',
    description: '从小指下方延伸的横线，代表情感和人际关系',
    characteristics: {
      length: 'long',
      depth: 'deep',
      clarity: 'clear',
      branches: true,
      islands: false
    },
    interpretation: {
      positive: ['情感丰富', '善于表达', '人际关系好', '忠诚专一', '富有同情心'],
      negative: ['过于敏感', '情绪波动大', '在感情中易受伤', '过分依赖他人', '嫉妒心强'],
      career: '适合需要与人交往的工作，如销售、教育、咨询等',
      health: '心血管系统较好，但要注意情绪管理',
      relationships: '重视感情，渴望真挚的爱情，但可能过于理想化',
      personality: '感情丰富，善解人意，但有时过于感性'
    }
  },
  {
    id: 'head-line',
    name: 'Head Line',
    chineseName: '智慧线',
    description: '从拇指和食指之间延伸的横线，代表思维和智慧',
    characteristics: {
      length: 'long',
      depth: 'deep',
      clarity: 'clear',
      branches: false,
      islands: false
    },
    interpretation: {
      positive: ['思维敏捷', '逻辑清晰', '学习能力强', '分析能力好', '决策果断'],
      negative: ['过度思虑', '缺乏直觉', '过于理性', '决策犹豫', '容易钻牛角尖'],
      career: '适合需要智力和分析能力的工作，如研究、分析、策划等',
      health: '大脑功能良好，但要注意精神压力',
      relationships: '在感情中较为理性，需要智慧的交流',
      personality: '理性务实，善于思考，但有时过于严肃'
    }
  },
  {
    id: 'fate-line',
    name: 'Fate Line',
    chineseName: '事业线',
    description: '从手腕向上延伸的垂直线条，代表事业和人生道路',
    characteristics: {
      length: 'long',
      depth: 'deep',
      clarity: 'clear',
      branches: false,
      islands: false
    },
    interpretation: {
      positive: ['事业心强', '目标明确', '责任感强', '成功机会大', '人生规划清晰'],
      negative: ['工作压力大', '过于追求成功', '忽略其他方面', '容易工作狂', '缺乏灵活性'],
      career: '有强烈的事业心，适合管理和领导岗位',
      health: '要注意工作与休息的平衡，避免过度疲劳',
      relationships: '可能因为专注事业而忽略感情生活',
      personality: '有追求，有理想，但要注意生活平衡'
    }
  }
];

// 手掌丘位数据
export const palmMounts: PalmMount[] = [
  {
    id: 'venus-mount',
    name: 'Mount of Venus',
    chineseName: '金星丘',
    location: '拇指根部的肉垫',
    description: '代表爱情、美感和生命力',
    characteristics: {
      development: 'normal',
      firmness: 'medium'
    },
    interpretation: {
      meaning: '爱情、美感、艺术天赋和生命力的象征',
      personality: ['热情洋溢', '富有魅力', '艺术天赋', '社交能力强', '生命力旺盛'],
      career: '适合艺术、娱乐、美容、社交等相关行业',
      strengths: ['吸引力强', '艺术鉴赏力', '社交技巧', '生活情趣', '情感表达'],
      challenges: ['过于感性', '容易冲动', '缺乏理性', '感情用事', '追求享乐']
    }
  },
  {
    id: 'jupiter-mount',
    name: 'Mount of Jupiter',
    chineseName: '木星丘',
    location: '食指根部',
    description: '代表领导力、野心和权力欲',
    characteristics: {
      development: 'normal',
      firmness: 'medium'
    },
    interpretation: {
      meaning: '领导力、野心、权力和成功欲望的象征',
      personality: ['领导才能', '野心勃勃', '自信满满', '权力欲强', '成功导向'],
      career: '适合管理、领导、政治、企业家等职位',
      strengths: ['领导能力', '决策能力', '组织能力', '目标导向', '影响力'],
      challenges: ['过于自信', '独断专行', '缺乏耐心', '压力过大', '忽略他人']
    }
  },
  {
    id: 'saturn-mount',
    name: 'Mount of Saturn',
    chineseName: '土星丘',
    location: '中指根部',
    description: '代表责任感、纪律和深度思考',
    characteristics: {
      development: 'normal',
      firmness: 'medium'
    },
    interpretation: {
      meaning: '责任感、纪律、深度思考和严肃态度的象征',
      personality: ['责任心强', '严谨细致', '深度思考', '自我约束', '重视纪律'],
      career: '适合研究、学术、法律、会计等需要专业知识的工作',
      strengths: ['专业能力', '责任心', '分析能力', '持久力', '可靠性'],
      challenges: ['过于严肃', '缺乏灵活性', '社交困难', '压抑情感', '过度保守']
    }
  },
  {
    id: 'apollo-mount',
    name: 'Mount of Apollo',
    chineseName: '太阳丘',
    location: '无名指根部',
    description: '代表创造力、艺术才能和成功',
    characteristics: {
      development: 'normal',
      firmness: 'medium'
    },
    interpretation: {
      meaning: '创造力、艺术才能、成功和名声的象征',
      personality: ['创造力强', '艺术天赋', '乐观开朗', '追求成功', '喜欢表现'],
      career: '适合艺术、创意、娱乐、设计等创造性工作',
      strengths: ['创新能力', '艺术天赋', '乐观态度', '表现力', '审美能力'],
      challenges: ['过于理想化', '缺乏实用性', '情绪波动', '过度表现', '忽略细节']
    }
  },
  {
    id: 'mercury-mount',
    name: 'Mount of Mercury',
    chineseName: '水星丘',
    location: '小指根部',
    description: '代表沟通能力、商业头脑和适应性',
    characteristics: {
      development: 'normal',
      firmness: 'medium'
    },
    interpretation: {
      meaning: '沟通能力、商业头脑、适应性和灵活性的象征',
      personality: ['沟通能力强', '商业头脑', '适应性强', '机智灵活', '学习能力强'],
      career: '适合销售、商业、传媒、教育等需要沟通的工作',
      strengths: ['沟通技巧', '商业嗅觉', '适应能力', '学习能力', '人际关系'],
      challenges: ['过于圆滑', '缺乏深度', '容易分心', '不够专注', '过度依赖他人']
    }
  }
];

// 面部形状数据
export const faceShapes: FaceShape[] = [
  {
    id: 'oval-face',
    name: 'Oval Face',
    chineseName: '椭圆脸',
    description: '面部轮廓呈椭圆形，比例协调',
    characteristics: {
      width: 'medium',
      length: 'medium',
      jawline: 'round',
      cheekbones: 'medium'
    },
    personality: {
      traits: ['平衡协调', '理性温和', '适应性强', '人际关系好', '情绪稳定'],
      strengths: ['协调能力', '平衡感', '适应性', '人际技巧', '情绪管理'],
      challenges: ['缺乏特色', '过于中庸', '决策犹豫', '缺乏冒险精神', '容易妥协'],
      career: ['管理者', '协调员', '外交官', '咨询师', '教育工作者'],
      compatibility: ['与各种性格的人都能相处融洽']
    }
  },
  {
    id: 'round-face',
    name: 'Round Face',
    chineseName: '圆脸',
    description: '面部轮廓圆润，宽度和长度接近',
    characteristics: {
      width: 'wide',
      length: 'short',
      jawline: 'round',
      cheekbones: 'subtle'
    },
    personality: {
      traits: ['友善亲切', '乐观开朗', '善于沟通', '富有同情心', '生活态度积极'],
      strengths: ['亲和力强', '乐观心态', '沟通能力', '同理心', '生活情趣'],
      challenges: ['过于乐观', '缺乏深度', '决策困难', '容易受影响', '缺乏毅力'],
      career: ['服务业', '销售', '教育', '娱乐', '社会工作'],
      compatibility: ['适合与性格开朗的人交往']
    }
  },
  {
    id: 'square-face',
    name: 'Square Face',
    chineseName: '方脸',
    description: '面部轮廓方正，下颌线条明显',
    characteristics: {
      width: 'wide',
      length: 'medium',
      jawline: 'square',
      cheekbones: 'prominent'
    },
    personality: {
      traits: ['意志坚强', '执行力强', '可靠稳重', '责任心强', '决策果断'],
      strengths: ['执行能力', '意志力', '可靠性', '责任感', '决策能力'],
      challenges: ['过于固执', '缺乏灵活性', '表达困难', '情感压抑', '过度严肃'],
      career: ['管理者', '工程师', '军人', '法官', '企业家'],
      compatibility: ['需要理解和支持的伴侣']
    }
  },
  {
    id: 'heart-face',
    name: 'Heart Face',
    chineseName: '心形脸',
    description: '额头宽阔，下巴尖细，呈心形',
    characteristics: {
      width: 'wide',
      length: 'medium',
      jawline: 'sharp',
      cheekbones: 'prominent'
    },
    personality: {
      traits: ['智慧聪颖', '创造力强', '表达能力强', '独立自主', '追求完美'],
      strengths: ['智慧', '创造力', '表达能力', '独立性', '完美主义'],
      challenges: ['过于挑剔', '情绪波动', '压力过大', '人际关系复杂', '过度敏感'],
      career: ['创意工作', '艺术家', '作家', '设计师', '研究员'],
      compatibility: ['需要智慧和创造力的伴侣']
    }
  },
  {
    id: 'long-face',
    name: 'Long Face',
    chineseName: '长脸',
    description: '面部长度明显大于宽度',
    characteristics: {
      width: 'narrow',
      length: 'long',
      jawline: 'sharp',
      cheekbones: 'subtle'
    },
    personality: {
      traits: ['深思熟虑', '理性分析', '专注专业', '目标明确', '内敛稳重'],
      strengths: ['分析能力', '专注力', '专业能力', '目标导向', '稳重性'],
      challenges: ['过于严肃', '社交困难', '情感表达困难', '过度理性', '缺乏幽默'],
      career: ['学者', '研究员', '专业技术人员', '分析师', '顾问'],
      compatibility: ['需要理解和耐心的伴侣']
    }
  }
];

// 面部特征数据
export const faceFeatures: FaceFeature[] = [
  {
    id: 'eyes-large',
    name: 'Large Eyes',
    chineseName: '大眼睛',
    description: '眼睛较大，炯炯有神',
    characteristics: {
      shape: 'round',
      size: 'large',
      position: 'normal',
      symmetry: 'symmetrical'
    },
    interpretation: {
      personality: ['富有表现力', '情感丰富', '善于观察', '直觉敏锐', '富有同情心'],
      career: ['艺术家', '演员', '心理咨询师', '教师', '设计师'],
      health: '视力较好，但要注意眼部护理',
      relationships: '情感表达能力强，容易获得他人好感',
      fortune: '人际关系良好，容易得到贵人相助'
    }
  },
  {
    id: 'nose-straight',
    name: 'Straight Nose',
    chineseName: '直鼻',
    description: '鼻梁挺直，鼻形端正',
    characteristics: {
      shape: 'straight',
      size: 'medium',
      position: 'normal',
      symmetry: 'symmetrical'
    },
    interpretation: {
      personality: ['正直诚实', '意志坚强', '责任心强', '自尊心强', '追求完美'],
      career: ['法官', '医生', '教师', '公务员', '企业管理'],
      health: '呼吸系统良好，整体健康状况佳',
      relationships: '在感情中较为理性，重视原则',
      fortune: '财运稳定，适合正当经营'
    }
  },
  {
    id: 'mouth-medium',
    name: 'Medium Mouth',
    chineseName: '中等嘴型',
    description: '嘴型大小适中，唇形协调',
    characteristics: {
      shape: 'normal',
      size: 'medium',
      position: 'normal',
      symmetry: 'symmetrical'
    },
    interpretation: {
      personality: ['表达能力适中', '性格平和', '善于沟通', '理性感性并重', '适应性强'],
      career: ['销售', '客服', '教育', '咨询', '管理'],
      health: '消化系统良好，注意饮食均衡',
      relationships: '在感情中表达适度，容易维持关系',
      fortune: '财运平稳，收入稳定'
    }
  },
  {
    id: 'eyebrows-thick',
    name: 'Thick Eyebrows',
    chineseName: '浓眉',
    description: '眉毛浓密，形状清晰',
    characteristics: {
      shape: 'thick',
      size: 'large',
      position: 'normal',
      symmetry: 'symmetrical'
    },
    interpretation: {
      personality: ['个性鲜明', '意志坚强', '执行力强', '保护欲强', '责任心重'],
      career: ['军人', '警察', '企业家', '运动员', '管理者'],
      health: '精力充沛，但要注意控制情绪',
      relationships: '在感情中较为主动，具有保护欲',
      fortune: '事业运较好，容易获得成功'
    }
  },
  {
    id: 'ears-medium',
    name: 'Medium Ears',
    chineseName: '中等耳型',
    description: '耳朵大小适中，形状端正',
    characteristics: {
      shape: 'normal',
      size: 'medium',
      position: 'normal',
      symmetry: 'symmetrical'
    },
    interpretation: {
      personality: ['平衡稳重', '善于倾听', '理解能力强', '适应性好', '人际关系佳'],
      career: ['顾问', '心理师', '教师', '外交官', '调解员'],
      health: '听力正常，神经系统健康',
      relationships: '善于倾听和理解伴侣',
      fortune: '财运平稳，适合稳健投资'
    }
  }
];

// 手相面相综合数据库
export const palmistryDatabase = {
  handShapes,
  palmLines,
  palmMounts,
  faceShapes,
  faceFeatures
};