import type { MBTIAnswer, MBTIDimensions, MBTIResult, MBTIType } from '../types';
import { getQuestionsByMode, TestMode } from '../data/mbtiQuestions';

/**
 * 计算MBTI结果
 */
export function calculateMBTIResult(answers: MBTIAnswer[], mode: TestMode = 'quick'): MBTIResult {
  const dimensions = calculateDimensions(answers, mode);
  const type = determineMBTIType(dimensions);
  const confidence = calculateConfidence(dimensions, mode);

  return {
    type,
    dimensions,
    confidence,
    completedAt: new Date(),
  };
}

/**
 * 计算各维度得分
 */
function calculateDimensions(answers: MBTIAnswer[], mode: TestMode = 'quick'): MBTIDimensions {
  const scores = {
    EI: 0, // 正数倾向E(外向)，负数倾向I(内向)
    SN: 0, // 正数倾向N(直觉)，负数倾向S(感觉)
    TF: 0, // 正数倾向F(情感)，负数倾向T(思考)
    JP: 0, // 正数倾向P(知觉)，负数倾向J(判断)
  };

  const questions = getQuestionsByMode(mode);

  answers.forEach((answer) => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;

    const scoring = question.scoring[answer.answer];
    const weight = question.weight || 1;

    switch (question.dimension) {
      case 'EI':
        scores.EI += scoring === 'E' ? weight : -weight;
        break;
      case 'SN':
        scores.SN += scoring === 'N' ? weight : -weight;
        break;
      case 'TF':
        scores.TF += scoring === 'F' ? weight : -weight;
        break;
      case 'JP':
        scores.JP += scoring === 'P' ? weight : -weight;
        break;
    }
  });

  // 计算百分比 (0-100)
  const totalQuestions = {
    EI: questions.filter(q => q.dimension === 'EI').length,
    SN: questions.filter(q => q.dimension === 'SN').length,
    TF: questions.filter(q => q.dimension === 'TF').length,
    JP: questions.filter(q => q.dimension === 'JP').length,
  };

  return {
    E: Math.max(0, Math.round(((scores.EI / totalQuestions.EI) + 1) * 50)),
    I: Math.max(0, Math.round(((-scores.EI / totalQuestions.EI) + 1) * 50)),
    S: Math.max(0, Math.round(((-scores.SN / totalQuestions.SN) + 1) * 50)),
    N: Math.max(0, Math.round(((scores.SN / totalQuestions.SN) + 1) * 50)),
    T: Math.max(0, Math.round(((-scores.TF / totalQuestions.TF) + 1) * 50)),
    F: Math.max(0, Math.round(((scores.TF / totalQuestions.TF) + 1) * 50)),
    J: Math.max(0, Math.round(((-scores.JP / totalQuestions.JP) + 1) * 50)),
    P: Math.max(0, Math.round(((scores.JP / totalQuestions.JP) + 1) * 50)),
  };
}

/**
 * 根据维度得分确定MBTI类型
 */
function determineMBTIType(dimensions: MBTIDimensions): MBTIType {
  const e_or_i = dimensions.E > dimensions.I ? 'E' : 'I';
  const s_or_n = dimensions.S > dimensions.N ? 'S' : 'N';
  const t_or_f = dimensions.T > dimensions.F ? 'T' : 'F';
  const j_or_p = dimensions.J > dimensions.P ? 'J' : 'P';
  
  return `${e_or_i}${s_or_n}${t_or_f}${j_or_p}` as MBTIType;
}

/**
 * 计算结果的置信度
 */
function calculateConfidence(dimensions: MBTIDimensions, mode: TestMode = 'quick'): number {
  // 计算各维度的确定性
  const eiConfidence = Math.abs(dimensions.E - dimensions.I) / 100;
  const snConfidence = Math.abs(dimensions.S - dimensions.N) / 100;
  const tfConfidence = Math.abs(dimensions.T - dimensions.F) / 100;
  const jpConfidence = Math.abs(dimensions.J - dimensions.P) / 100;
  
  const averageConfidence = (eiConfidence + snConfidence + tfConfidence + jpConfidence) / 4;
  
  // 根据测试模式调整置信度
  const modeMultiplier = mode === 'complete' ? 1.0 : 0.85;
  
  return Math.round(averageConfidence * modeMultiplier * 100);
}

/**
 * 获取详细的MBTI分析和建议
 */
export function getDetailedMBTIAnalysis(result: MBTIResult) {
  const description = getMBTITypeDescription(result.type);
  
  return {
    ...description,
    personalityDevelopment: getPersonalityDevelopment(result),
    relationshipAdvice: getRelationshipAdvice(result.type),
    careerGuidance: getCareerGuidance(result.type),
    stressManagement: getStressManagement(result.type),
    growthAreas: getGrowthAreas(result),
    compatibilityInsights: getCompatibilityInsights(result.type),
    dailyTips: getDailyTips(result.type)
  };
}

/**
 * 获取个性发展建议
 */
function getPersonalityDevelopment(result: MBTIResult) {
  const { type, dimensions } = result;
  const weakDimensions = [];
  
  // 识别需要发展的维度
  if (Math.abs(dimensions.E - dimensions.I) < 10) {
    weakDimensions.push('EI');
  }
  if (Math.abs(dimensions.S - dimensions.N) < 10) {
    weakDimensions.push('SN');
  }
  if (Math.abs(dimensions.T - dimensions.F) < 10) {
    weakDimensions.push('TF');
  }
  if (Math.abs(dimensions.J - dimensions.P) < 10) {
    weakDimensions.push('JP');
  }

  const developmentAreas = {
    'EI': {
      title: '社交平衡',
      description: '你在内向和外向之间表现较为平衡，这是一个优势',
      suggestions: ['在需要独处时给自己时间', '在社交场合中适度表达', '学会读懂社交信号']
    },
    'SN': {
      title: '信息处理',
      description: '你在实感和直觉之间有良好的平衡',
      suggestions: ['既关注细节也考虑大局', '在创新和实用之间找平衡', '培养多角度思考能力']
    },
    'TF': {
      title: '决策方式',
      description: '你能同时运用逻辑和情感进行决策',
      suggestions: ['在分析问题时考虑人的因素', '在情感决策时加入理性思考', '学会权衡不同价值观']
    },
    'JP': {
      title: '生活方式',
      description: '你在计划性和灵活性之间取得平衡',
      suggestions: ['既要有计划也要保持灵活', '学会适时调整期望', '培养适应变化的能力']
    }
  };

  return {
    balancedDimensions: weakDimensions.map(dim => developmentAreas[dim]),
    overallAdvice: getOverallDevelopmentAdvice(type)
  };
}

/**
 * 获取整体发展建议
 */
function getOverallDevelopmentAdvice(type: MBTIType) {
  const advice = {
    'INTJ': {
      focus: '培养人际关系和情感表达',
      methods: ['主动与他人分享想法', '关注团队协作', '练习同理心'],
      warning: '避免过度完美主义和孤立自己'
    },
    'INFJ': {
      focus: '建立健康边界和自我关爱',
      methods: ['学会说不', '定期独处充电', '关注自身需求'],
      warning: '避免过度牺牲自己和情感消耗'
    },
    'ISTJ': {
      focus: '拥抱变化和创新思维',
      methods: ['尝试新的做事方法', '接受不确定性', '培养创造力'],
      warning: '避免过度固执和抗拒改变'
    },
    'ISFJ': {
      focus: '提升自信和自我倡导',
      methods: ['表达个人需求', '接受赞美', '培养自我价值感'],
      warning: '避免过度取悦他人和忽视自己'
    },
    'INFP': {
      focus: '提升实践能力和目标实现',
      methods: ['制定具体计划', '设定可达成目标', '培养执行力'],
      warning: '避免过度理想化和拖延'
    },
    'INTP': {
      focus: '加强人际沟通和情感连接',
      methods: ['主动关心他人', '表达感受', '参与团队活动'],
      warning: '避免过度分析和忽视情感'
    },
    'ESTP': {
      focus: '发展长远规划和深度思考',
      methods: ['设定长期目标', '深入学习', '培养耐心'],
      warning: '避免冲动决策和浅尝辄止'
    },
    'ESFP': {
      focus: '提升计划性和逻辑思维',
      methods: ['制定时间表', '分析问题根源', '培养组织能力'],
      warning: '避免过度情绪化和缺乏规划'
    },
    'ENFP': {
      focus: '增强专注力和执行力',
      methods: ['一次专注一个项目', '建立日常习惯', '完成开始的事情'],
      warning: '避免三心二意和半途而废'
    },
    'ENTP': {
      focus: '提升细节关注和跟进能力',
      methods: ['关注实施细节', '跟进项目进展', '培养耐心'],
      warning: '避免忽视细节和缺乏跟进'
    },
    'ESTJ': {
      focus: '培养灵活性和创新思维',
      methods: ['接受不同观点', '尝试新方法', '培养同理心'],
      warning: '避免过度控制和固执己见'
    },
    'ESFJ': {
      focus: '增强独立性和批判思维',
      methods: ['独立做决定', '质疑传统做法', '关注个人成长'],
      warning: '避免过度依赖他人认同'
    },
    'ENFJ': {
      focus: '关注自身需求和设立边界',
      methods: ['定期自我反思', '表达个人需求', '学会拒绝'],
      warning: '避免过度关注他人而忽视自己'
    },
    'ENTJ': {
      focus: '培养耐心和情感智慧',
      methods: ['倾听他人想法', '考虑情感因素', '培养同理心'],
      warning: '避免过度专制和忽视他人感受'
    },
    'ISTP': {
      focus: '加强沟通表达和团队合作',
      methods: ['主动分享观点', '参与团队讨论', '表达感受'],
      warning: '避免过度独立和沟通不足'
    },
    'ISFP': {
      focus: '提升自信表达和目标设定',
      methods: ['表达个人观点', '设定明确目标', '寻求支持'],
      warning: '避免过度谦逊和缺乏方向'
    }
  };

  return advice[type] || advice['INTJ'];
}

/**
 * 获取人际关系建议
 */
function getRelationshipAdvice(type: MBTIType) {
  const relationshipAdvice = {
    'INTJ': {
      strengths: ['深度思考', '忠诚可靠', '独立自主'],
      challenges: ['情感表达', '社交需求', '过度批判'],
      tips: ['学会表达感受', '主动关心伴侣', '接受不完美'],
      compatibility: ['ENFP', 'ENTP', 'INFJ', 'INFP']
    },
    'INFJ': {
      strengths: ['深刻理解', '关爱体贴', '忠诚专一'],
      challenges: ['过度敏感', '需要独处', '完美期待'],
      tips: ['设立健康边界', '表达真实需求', '接受不完美'],
      compatibility: ['ENTP', 'ENFP', 'INTJ', 'INFP']
    },
    // ... 可以继续添加其他类型
  };

  return relationshipAdvice[type] || {
    strengths: ['独特的个人魅力'],
    challenges: ['需要更多了解'],
    tips: ['保持开放沟通'],
    compatibility: ['开放探索各种可能']
  };
}

/**
 * 获取职业指导
 */
function getCareerGuidance(type: MBTIType) {
  const careerGuidance = {
    'INTJ': {
      idealEnvironments: ['独立工作空间', '创新型企业', '战略规划部门'],
      workStyle: ['需要自主权', '长期项目', '深度工作'],
      leadershipStyle: '战略型领导，专注长远规划',
      avoidCareers: ['纯销售工作', '重复性工作', '高度社交工作'],
      growthPath: ['技术专家→项目经理→战略顾问→企业高管']
    },
    'INFJ': {
      idealEnvironments: ['非营利组织', '教育机构', '咨询公司'],
      workStyle: ['有意义的工作', '帮助他人', '创造性项目'],
      leadershipStyle: '启发型领导，关注人的发展',
      avoidCareers: ['高压销售', '纯逻辑分析', '冷漠环境'],
      growthPath: ['个人贡献者→团队主管→项目经理→组织发展']
    }
    // ... 可以继续添加其他类型
  };

  return careerGuidance[type] || {
    idealEnvironments: ['支持性环境'],
    workStyle: ['发挥个人优势'],
    leadershipStyle: '适合的领导风格',
    avoidCareers: ['不匹配的工作'],
    growthPath: ['个性化发展路径']
  };
}

/**
 * 获取压力管理建议
 */
function getStressManagement(type: MBTIType) {
  const stressManagement = {
    'INTJ': {
      stressTriggers: ['被微管理', '太多社交', '计划被打乱', '肤浅对话'],
      stressSignals: ['变得更加孤僻', '过度批判', '完美主义加剧'],
      copingStrategies: ['独处时间', '重新规划', '深度思考', '系统性解决问题'],
      relaxationMethods: ['阅读', '散步', '听音乐', '策略游戏']
    },
    'INFJ': {
      stressTriggers: ['冲突环境', '过度刺激', '价值观冲突', '时间压力'],
      stressSignals: ['情绪波动', '社交回避', '过度担心'],
      copingStrategies: ['冥想', '写日记', '创意表达', '寻求支持'],
      relaxationMethods: ['自然环境', '艺术创作', '瑜伽', '音乐']
    }
    // ... 可以继续添加其他类型
  };

  return stressManagement[type] || {
    stressTriggers: ['常见压力源'],
    stressSignals: ['压力表现'],
    copingStrategies: ['应对方法'],
    relaxationMethods: ['放松技巧']
  };
}

/**
 * 获取成长领域
 */
function getGrowthAreas(result: MBTIResult) {
  const { type, dimensions, confidence } = result;
  
  const growthAreas = [];
  
  // 基于置信度分析
  if (confidence < 70) {
    growthAreas.push({
      area: '自我认知',
      description: '你的测试结果显示一些不确定性，建议深入了解自己',
      actions: ['自我反思', '寻求反馈', '尝试不同体验', '重新测试']
    });
  }

  // 基于维度平衡分析
  const balanceThreshold = 15;
  
  if (Math.abs(dimensions.E - dimensions.I) < balanceThreshold) {
    growthAreas.push({
      area: '社交平衡',
      description: '发展在不同社交情境中的适应能力',
      actions: ['练习公开演讲', '培养深度对话技巧', '学会独处', '扩展社交圈']
    });
  }

  return growthAreas;
}

/**
 * 获取兼容性洞察
 */
function getCompatibilityInsights(type: MBTIType) {
  const insights = {
    bestMatches: [],
    challengingMatches: [],
    friendshipCompatibility: [],
    workCompatibility: []
  };

  // 这里可以根据MBTI理论添加具体的兼容性分析
  return insights;
}

/**
 * 获取日常贴士
 */
function getDailyTips(type: MBTIType) {
  const tips = {
    'INTJ': [
      '每天安排1-2小时的独处时间进行深度思考',
      '设定清晰的长期目标，并制定实现步骤',
      '主动与一个人进行有意义的对话',
      '尝试一个新的学习项目或技能'
    ],
    'INFJ': [
      '写下三件今天感激的事情',
      '花时间在自然环境中放松',
      '与信任的朋友分享内心想法',
      '从事一项有意义的创造性活动'
    ]
    // ... 可以继续添加其他类型
  };

  return tips[type] || [
    '保持开放和好奇的心态',
    '关注个人成长和发展',
    '与他人建立真诚的连接',
    '追求有意义的目标'
  ];
}

/**
 * 获取MBTI类型描述
 */
export function getMBTITypeDescription(type: MBTIType) {
  const descriptions: Record<MBTIType, any> = {
    'INTJ': {
      name: '建筑师',
      nickname: '建筑师',
      description: '具有原创性思想的独立思考者，对自己的愿景有着坚定不移的信念。',
      traits: ['独立', '战略性', '富有想象力', '坚定'],
      strengths: ['长期规划', '独立工作', '创新思维', '高标准'],
      weaknesses: ['过于批判', '过分独立', '忽视细节', '完美主义'],
      career: ['科学家', '工程师', '咨询师', '项目经理'],
      famous: ['埃隆·马斯克', '牛顿', '尼采']
    },
    'INFJ': {
      name: '提倡者',
      nickname: '提倡者',
      description: '富有理想主义和责任感，致力于帮助他人实现潜能。',
      traits: ['理想主义', '有组织', '富有洞察力', '关爱他人'],
      strengths: ['深刻洞察', '富有同情心', '坚持理想', '鼓舞他人'],
      weaknesses: ['过于敏感', '极度私人', '完美主义', '容易倦怠'],
      career: ['心理咨询师', '作家', '教师', '社会工作者'],
      famous: ['甘地', '马丁·路德·金', '柏拉图']
    },
    'ISTJ': {
      name: '物流师',
      nickname: '检查员',
      description: '务实的现实主义者，忠于传统，具有强烈的责任感。',
      traits: ['务实', '认真', '可靠', '有责任感'],
      strengths: ['组织能力', '可靠性', '坚持性', '诚实正直'],
      weaknesses: ['过分保守', '判断性强', '责备自己', '抗拒改变'],
      career: ['会计师', '医生', '律师', '工程师'],
      famous: ['华盛顿', '巴菲特', '德鲁克']
    },
    'ISFJ': {
      name: '守护者',
      nickname: '保护者',
      description: '温暖贴心的守护者，时刻准备保护所爱的人。',
      traits: ['热心', '负责任', '勤奋', '忠诚'],
      strengths: ['支持他人', '可靠可信', '耐心', '想象力'],
      weaknesses: ['谦逊过度', '承受压力', '情绪化', '利他主义'],
      career: ['教师', '医务人员', '咨询师', '社工'],
      famous: ['德蕾莎修女', '罗斯福夫人', '安妮公主']
    },
    'INFP': {
      name: '调停者',
      nickname: '治愈者',
      description: '富有诗意、善良和利他主义精神，总是热切地寻求帮助好的事业。',
      traits: ['理想主义', '忠诚', '适应性强', '好奇'],
      strengths: ['同情心', '创造性', '开放思想', '灵活性'],
      weaknesses: ['过于理想化', '过于利他', '情绪化', '难以了解'],
      career: ['作家', '艺术家', '心理学家', '社会工作者'],
      famous: ['莎士比亚', '安徒生', '弗吉尼亚·伍尔夫']
    },
    'INTP': {
      name: '逻辑学家',
      nickname: '思想家',
      description: '具有创新精神的发明家，渴望知识，富有独特的见解。',
      traits: ['逻辑', '抽象', '独立', '好奇'],
      strengths: ['分析性思维', '客观性', '创造性', '开放性'],
      weaknesses: ['过于抽象', '不敏感', '不专心', '不耐烦'],
      career: ['科学家', '哲学家', '建筑师', '程序员'],
      famous: ['爱因斯坦', '达尔文', '苏格拉底']
    },
    'ESTP': {
      name: '企业家',
      nickname: '实干家',
      description: '聪明、精力充沛和感知敏锐，真正享受生活在边缘的感觉。',
      traits: ['外向', '感知', '灵活', '宽容'],
      strengths: ['大胆', '理性实用', '原创', '感知力'],
      weaknesses: ['敏感', '冲动', '竞争性', '易分心'],
      career: ['销售代表', '运动员', '演艺人员', '企业家'],
      famous: ['唐纳德·特朗普', '麦当娜', '欧内斯特·海明威']
    },
    'ESFP': {
      name: '娱乐家',
      nickname: '表演者',
      description: '自发的、精力充沛和热情的人，生活对他们来说从不枯燥。',
      traits: ['外向', '友善', '人情味', '接受性'],
      strengths: ['大胆', '审美感', '实用性', '人际技巧'],
      weaknesses: ['敏感', '冲突厌恶', '缺乏长远规划', '难以集中'],
      career: ['艺人', '销售', '咨询师', '儿童工作者'],
      famous: ['玛丽莲·梦露', '猫王', '威尔·史密斯']
    },
    'ENFP': {
      name: '竞选者',
      nickname: '鼓舞者',
      description: '热情、有创造力和社交能力强的自由精神，总能找到笑的理由。',
      traits: ['热情', '独立', '精力充沛', '富有同情心'],
      strengths: ['好奇心', '观察力', '精力充沛', '优秀沟通技巧'],
      weaknesses: ['缺乏专注力', '想得太多', '情绪化', '独立性强'],
      career: ['记者', '演员', '咨询师', '政治家'],
      famous: ['罗宾·威廉姆斯', '威尔·史密斯', '奥普拉']
    },
    'ENTP': {
      name: '辩论家',
      nickname: '发明家',
      description: '聪明又好奇的思想家，不能抗拒智力上的挑战。',
      traits: ['机智', '聪明', '善于表达', '精力充沛'],
      strengths: ['知识渊博', '思维敏捷', '原创', '优秀的头脑风暴者'],
      weaknesses: ['争论不休', '不敏感', '不专心', '难以集中'],
      career: ['律师', '心理学家', '发明家', '科学家'],
      famous: ['托马斯·爱迪生', '苏格拉底', '沃尔特·迪斯尼']
    },
    'ESTJ': {
      name: '总经理',
      nickname: '监督者',
      description: '出色的管理才能，在管理事情或人的时候势不可挡。',
      traits: ['实际', '现实', '果断', '迅速行动'],
      strengths: ['专注', '精力充沛', '自信', '坚强意志'],
      weaknesses: ['固执', '不容忍', '不耐烦', '傲慢'],
      career: ['CEO', '法官', '教师', '银行家'],
      famous: ['史蒂夫·乔布斯', '约翰·洛克菲勒', '林登·约翰逊']
    },
    'ESFJ': {
      name: '执政官',
      nickname: '支持者',
      description: '极富同情心、受欢迎和和谐的合作者，总是渴望帮助他人。',
      traits: ['温暖友善', '有责任心', '合作', '和谐'],
      strengths: ['实用技能', '强烈的责任感', '忠诚', '敏感体贴'],
      weaknesses: ['担心社会地位', '难以创新', '脆弱的自尊', '过分批评自己'],
      career: ['教师', '社会工作者', '护士', '办公室经理'],
      famous: ['泰勒·斯威夫特', '比尔·克林顿', '惠特尼·休斯顿']
    },
    'ENFJ': {
      name: '主人公',
      nickname: '给予者',
      description: '富有魅力鼓舞人心的领导者，有迷惑听众的能力。',
      traits: ['魅力四射', '敏感', '利他', '领导力'],
      strengths: ['宽容', '可靠', '魅力', '利他主义'],
      weaknesses: ['过于理想化', '过于敏感', '犹豫不决', '自我牺牲'],
      career: ['教师', '咨询师', '宗教工作者', '销售代表'],
      famous: ['奥普拉·温弗瑞', '巴拉克·奥巴马', '马丁·路德·金']
    },
    'ENTJ': {
      name: '指挥官',
      nickname: '执行者',
      description: '大胆、富有想象力和意志强大的领导者，总是寻找或开创解决方法。',
      traits: ['自信', '意志坚强', '战略思维', '魅力四射'],
      strengths: ['高效', '精力充沛', '自信', '坚强意志'],
      weaknesses: ['固执', '不宽容', '不耐烦', '傲慢'],
      career: ['CEO', '律师', '系统分析师', '企业家'],
      famous: ['史蒂夫·乔布斯', '拿破仑', '玛格丽特·撒切尔']
    },
    'ISFP': {
      name: '探险家',
      nickname: '艺术家',
      description: '灵活、迷人的艺术家，时刻准备探索新的可能性。',
      traits: ['温和', '敏感', '友善', '谦逊'],
      strengths: ['魅力', '敏感他人', '想象力', '充满激情'],
      weaknesses: ['过分敏感', '不喜欢抽象思维', '承受压力', '独立性强'],
      career: ['艺术家', '音乐家', '设计师', '护士'],
      famous: ['鲍勃·迪伦', '迈克尔·杰克逊', '普林斯']
    },
    'ISTP': {
      name: '鉴赏家',
      nickname: '工匠',
      description: '大胆而实际的实验家，掌握各种工具的使用方法。',
      traits: ['宽容', '灵活', '安静', '冷静'],
      strengths: ['乐观积极', '富有创造性', '实际', '自发'],
      weaknesses: ['固执', '不敏感', '极度私人', '容易厌倦'],
      career: ['机械师', '工程师', '法医', '飞行员'],
      famous: ['汤姆·克鲁斯', '丹尼尔·克雷格', '斯嘉丽·约翰逊']
    }
  };

  return descriptions[type] || descriptions['INTJ']; // 默认返回INTJ
}