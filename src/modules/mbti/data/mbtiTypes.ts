// MBTI 16种人格类型详细数据
import { MBTIType } from '../types';

export interface MBTITypeData {
  type: MBTIType;
  name: string;
  nickname: string;
  description: string;
  cognitiveStack: string[];
  strengths: string[];
  challenges: string[];
  careers: string[];
  relationships: string[];
  personalityTraits: Array<{
    category: string;
    traits: string[];
  }>;
  growthAreas: string[];
  motivations: string[];
  stressors: string[];
  communicationStyle: string;
  decisionMaking: string;
  workStyle: string;
  percentage: number; // 人群占比
}

export const MBTI_TYPE_DATA: Record<MBTIType, MBTITypeData> = {
  INTJ: {
    type: 'INTJ',
    name: '建筑师',
    nickname: '策略家',
    description: '富有想象力和战略性的思想家，一切皆在计划之中。',
    cognitiveStack: ['Ni', 'Te', 'Fi', 'Se'],
    strengths: ['独立思考', '长远规划', '系统分析', '创新能力', '专注力强', '善于抽象思维'],
    challenges: ['过于理想化', '不善表达情感', '容易忽视细节', '社交困难', '过分批判', '缺乏耐心'],
    careers: ['科学家', '工程师', '建筑师', '战略顾问', '研究员', '软件开发', '投资分析师', '大学教授'],
    relationships: ['需要深度连接', '重视智力匹配', '不喜欢表面社交', '忠诚度高', '需要独立空间'],
    personalityTraits: [
      { category: '思维方式', traits: ['战略性思维', '系统化思考', '未来导向'] },
      { category: '行为特征', traits: ['独立自主', '目标导向', '完美主义'] },
      { category: '情感特征', traits: ['内敛深沉', '理性优先', '选择性社交'] }
    ],
    growthAreas: ['提升情商', '改善沟通技巧', '增强团队合作', '关注细节执行'],
    motivations: ['追求卓越', '实现愿景', '解决复杂问题', '获得专业认可'],
    stressors: ['被迫社交', '重复性工作', '缺乏自主权', '过度细节要求'],
    communicationStyle: '直接简洁，重视效率，偏好书面沟通',
    decisionMaking: '基于逻辑分析和长远考虑，决策速度较快',
    workStyle: '独立工作，重视结果，需要清晰的目标和自主权',
    percentage: 2.1
  },
  INTP: {
    type: 'INTP',
    name: '思想家',
    nickname: '逻辑学家',
    description: '具有创新精神的发明家，对知识有着不可抑制的渴望。',
    cognitiveStack: ['Ti', 'Ne', 'Si', 'Fe'],
    strengths: ['逻辑思维', '创新思考', '适应能力', '客观分析', '好奇心强', '善于理论建构'],
    challenges: ['缺乏耐心', '不善管理', '容易分心', '避免冲突', '拖延症', '忽视情感需求'],
    careers: ['研究员', '程序员', '哲学家', '数学家', '分析师', '科学家', '大学教授', '作家'],
    relationships: ['重视智力交流', '需要理解和支持', '不喜欢情感戏剧', '忠诚但独立'],
    personalityTraits: [
      { category: '思维方式', traits: ['理论导向', '逻辑推理', '创新思维'] },
      { category: '行为特征', traits: ['灵活适应', '探索精神', '独立自主'] },
      { category: '情感特征', traits: ['理性客观', '内向沉静', '选择性开放'] }
    ],
    growthAreas: ['提升执行力', '改善时间管理', '增强情感表达', '提高实用技能'],
    motivations: ['追求真理', '理解复杂概念', '创造新理论', '解决难题'],
    stressors: ['严格截止日期', '情感冲突', '繁琐细节', '强制社交'],
    communicationStyle: '精确理性，重视逻辑，倾向于深入讨论',
    decisionMaking: '基于逻辑分析，需要时间思考，重视一致性',
    workStyle: '独立研究，弹性时间，重视创新和理论',
    percentage: 3.3
  },
  ENTJ: {
    type: 'ENTJ',
    name: '指挥官',
    nickname: '领导者',
    description: '大胆、富有想象力、意志强烈的领导者，总能找到或创造解决方法。',
    cognitiveStack: ['Te', 'Ni', 'Se', 'Fi'],
    strengths: ['天生领导', '战略思维', '高效执行', '自信果断', '目标导向', '善于激励他人'],
    challenges: ['过于强势', '缺乏耐心', '忽视情感', '完美主义', '工作狂倾向', '难以接受批评'],
    careers: ['CEO', '管理顾问', '律师', '投资银行家', '企业家', '项目经理', '政治家', '军官'],
    relationships: ['寻求平等伙伴', '重视成长和发展', '直接沟通', '支持伴侣目标'],
    personalityTraits: [
      { category: '思维方式', traits: ['战略规划', '系统思考', '目标导向'] },
      { category: '行为特征', traits: ['主动出击', '果断决策', '高效执行'] },
      { category: '情感特征', traits: ['自信坚定', '热情外向', '追求卓越'] }
    ],
    growthAreas: ['提升同理心', '改善倾听技巧', '学会放松', '关注团队情感'],
    motivations: ['成就目标', '领导他人', '创造影响', '追求成功'],
    stressors: ['效率低下', '缺乏挑战', '被动等待', '情感复杂性'],
    communicationStyle: '直接有力，重视效率，善于说服',
    decisionMaking: '快速果断，基于逻辑和目标，承担责任',
    workStyle: '领导团队，追求结果，重视效率和质量',
    percentage: 2.7
  },
  ENTP: {
    type: 'ENTP',
    name: '辩论家',
    nickname: '发明家',
    description: '聪明好奇的思想家，不会拒绝任何智力上的挑战。',
    cognitiveStack: ['Ne', 'Ti', 'Fe', 'Si'],
    strengths: ['创新思维', '适应能力', '热情洋溢', '善于激励', '口才出众', '快速学习'],
    challenges: ['缺乏专注', '不善细节', '容易厌倦', '过于理想', '拖延症', '情绪化'],
    careers: ['创业者', '营销专家', '记者', '咨询师', '发明家', '演说家', '销售经理', '广告创意'],
    relationships: ['需要刺激和新鲜感', '重视智力交流', '支持伴侣成长', '不喜欢束缚'],
    personalityTraits: [
      { category: '思维方式', traits: ['创新导向', '可能性思维', '概念化思考'] },
      { category: '行为特征', traits: ['灵活变通', '主动探索', '善于辩论'] },
      { category: '情感特征', traits: ['热情开放', '乐观向上', '善于社交'] }
    ],
    growthAreas: ['提升专注力', '改善执行力', '增强纪律性', '关注细节'],
    motivations: ['探索新可能', '影响他人', '创造变革', '智力挑战'],
    stressors: ['单调重复', '严格规则', '缺乏自由', '过度批评'],
    communicationStyle: '富有表现力，善于辩论，重视创意交流',
    decisionMaking: '快速灵活，基于可能性，愿意冒险',
    workStyle: '创新导向，团队合作，重视自由和灵活性',
    percentage: 2.8
  },
  INFJ: {
    type: 'INFJ',
    name: '提倡者',
    nickname: '理想主义者',
    description: '安静而神秘，同时鼓舞人心且不知疲倦的理想主义者。',
    cognitiveStack: ['Ni', 'Fe', 'Ti', 'Se'],
    strengths: ['深度洞察', '富有同情心', '创造力强', '坚持原则', '善于启发他人', '长远视野'],
    challenges: ['过于敏感', '完美主义', '容易倦怠', '难以决断', '避免冲突', '过度理想化'],
    careers: ['心理咨询师', '作家', '教师', '社会工作者', '艺术家', '人力资源', '非营利组织', '宗教工作者'],
    relationships: ['深度情感连接', '重视精神契合', '忠诚专一', '需要理解和支持'],
    personalityTraits: [
      { category: '思维方式', traits: ['直觉洞察', '价值驱动', '未来导向'] },
      { category: '行为特征', traits: ['深度思考', '有条理', '目标明确'] },
      { category: '情感特征', traits: ['共情能力强', '内向深沉', '理想主义'] }
    ],
    growthAreas: ['设定界限', '提升自我照顾', '学会说不', '增强现实感'],
    motivations: ['帮助他人', '实现理想', '寻求意义', '个人成长'],
    stressors: ['人际冲突', '过度刺激', '价值观冲突', '缺乏独处时间'],
    communicationStyle: '深入有意义的对话，重视情感连接',
    decisionMaking: '基于价值观和直觉，需要时间思考',
    workStyle: '独立工作，重视使命感和意义',
    percentage: 1.5
  },
  INFP: {
    type: 'INFP',
    name: '调停者',
    nickname: '治疗师',
    description: '诗意、善良、利他的人，总是热切地为正当理由而努力。',
    cognitiveStack: ['Fi', 'Ne', 'Si', 'Te'],
    strengths: ['价值驱动', '创造力强', '适应能力', '忠诚可靠', '善于理解他人', '真诚正直'],
    challenges: ['过于理想化', '容易受伤', '缺乏实用性', '避免冲突', '拖延症', '过度自我批评'],
    careers: ['心理学家', '作家', '艺术家', '社会工作者', '教师', '音乐家', '记者', '翻译'],
    relationships: ['深度情感连接', '重视真实性', '支持伴侣成长', '需要理解和接纳'],
    personalityTraits: [
      { category: '思维方式', traits: ['价值导向', '创意思维', '可能性探索'] },
      { category: '行为特征', traits: ['灵活适应', '深度思考', '真诚表达'] },
      { category: '情感特征', traits: ['敏感细腻', '同理心强', '理想主义'] }
    ],
    growthAreas: ['提升实用技能', '增强自信', '学会自我肯定', '改善时间管理'],
    motivations: ['追求真实', '帮助他人', '表达创意', '个人成长'],
    stressors: ['价值观冲突', '过度批评', '缺乏自由', '人际紧张'],
    communicationStyle: '真诚深入，重视情感表达和理解',
    decisionMaking: '基于个人价值观，需要时间反思',
    workStyle: '独立创作，重视意义和灵活性',
    percentage: 4.4
  },
  ENFJ: {
    type: 'ENFJ',
    name: '主人公',
    nickname: '教师',
    description: '富有魅力、鼓舞人心的领导者，有着感化他人的能力。',
    cognitiveStack: ['Fe', 'Ni', 'Se', 'Ti'],
    strengths: ['善于激励', '富有同情心', '沟通能力强', '组织能力', '洞察他人需求', '天生领导力'],
    challenges: ['过于理想化', '容易倦怠', '过分敏感', '难以拒绝', '忽视自身需求', '过度操心'],
    careers: ['教师', '培训师', '心理咨询师', '人力资源', '政治家', '宗教领袖', '社会工作者', '媒体工作者'],
    relationships: ['支持伴侣成长', '重视情感连接', '善于解决冲突', '需要欣赏和肯定'],
    personalityTraits: [
      { category: '思维方式', traits: ['他人导向', '直觉洞察', '价值驱动'] },
      { category: '行为特征', traits: ['主动关怀', '组织协调', '激励他人'] },
      { category: '情感特征', traits: ['热情外向', '富有同情心', '理想主义'] }
    ],
    growthAreas: ['学会说不', '关注自身需求', '发展批判性思维', '管理情绪'],
    motivations: ['帮助他人成长', '创造和谐', '实现理想', '获得认可'],
    stressors: ['人际冲突', '被拒绝', '缺乏感激', '过度负担'],
    communicationStyle: '热情有感染力，善于激励和说服',
    decisionMaking: '考虑他人感受，基于价值观和直觉',
    workStyle: '团队合作，重视人际关系和共同目标',
    percentage: 2.5
  },
  ENFP: {
    type: 'ENFP',
    name: '竞选者',
    nickname: '激励者',
    description: '热情、有创造力、社交能力强的自由精神，总能找到理由微笑。',
    cognitiveStack: ['Ne', 'Fi', 'Te', 'Si'],
    strengths: ['热情洋溢', '创造力强', '社交能力', '适应能力', '善于启发他人', '乐观向上'],
    challenges: ['缺乏专注', '过于乐观', '容易分心', '不善细节', '情绪化', '拖延症'],
    careers: ['记者', '心理学家', '演员', '营销专家', '企业家', '教师', '艺术家', '公关专员'],
    relationships: ['需要情感连接', '重视成长和探索', '支持伴侣梦想', '不喜欢束缚'],
    personalityTraits: [
      { category: '思维方式', traits: ['可能性导向', '创意思维', '价值驱动'] },
      { category: '行为特征', traits: ['热情主动', '灵活变通', '善于表达'] },
      { category: '情感特征', traits: ['热情开放', '乐观向上', '富有同情心'] }
    ],
    growthAreas: ['提升专注力', '改善时间管理', '增强执行力', '学会坚持'],
    motivations: ['探索可能性', '帮助他人', '表达创意', '寻求自由'],
    stressors: ['单调重复', '严格规则', '缺乏认可', '人际冲突'],
    communicationStyle: '热情表达，善于倾听，重视情感交流',
    decisionMaking: '基于价值观和可能性，征求他人意见',
    workStyle: '团队合作，重视创意和人际关系',
    percentage: 8.1
  },
  ISTJ: {
    type: 'ISTJ',
    name: '物流师',
    nickname: '检查员',
    description: '实用主义的逻辑学家，忠诚可靠，不会放弃任何有价值的事业。',
    cognitiveStack: ['Si', 'Te', 'Fi', 'Ne'],
    strengths: ['责任心强', '注重细节', '组织能力', '忠诚可靠', '实用主义', '坚韧不拔'],
    challenges: ['抗拒变化', '过于严格', '缺乏灵活性', '不善表达', '过度保守', '工作狂倾向'],
    careers: ['会计师', '审计师', '银行家', '法官', '管理员', '工程师', '医生', '军官'],
    relationships: ['忠诚专一', '重视稳定', '实际支持', '需要时间建立信任'],
    personalityTraits: [
      { category: '思维方式', traits: ['细节导向', '逻辑思维', '传统价值'] },
      { category: '行为特征', traits: ['有条不紊', '责任心强', '坚持不懈'] },
      { category: '情感特征', traits: ['稳重可靠', '内向务实', '保守谨慎'] }
    ],
    growthAreas: ['增强灵活性', '改善沟通技巧', '拥抱变化', '表达情感'],
    motivations: ['履行责任', '维护秩序', '追求稳定', '获得认可'],
    stressors: ['突然变化', '时间压力', '不确定性', '违反规则'],
    communicationStyle: '清晰准确，重视事实和细节',
    decisionMaking: '基于经验和逻辑，谨慎考虑',
    workStyle: '按部就班，重视质量和准确性',
    percentage: 11.6
  },
  ISFJ: {
    type: 'ISFJ',
    name: '守护者',
    nickname: '保护者',
    description: '非常专注、温暖的守护者，时刻准备着保护爱着的人们。',
    cognitiveStack: ['Si', 'Fe', 'Ti', 'Ne'],
    strengths: ['关怀他人', '责任心强', '注重细节', '忠诚可靠', '善于倾听', '温暖体贴'],
    challenges: ['过于谦逊', '容易倦怠', '抗拒变化', '难以拒绝', '过度自我牺牲', '缺乏自信'],
    careers: ['护士', '教师', '社会工作者', '图书管理员', '人力资源', '心理咨询师', '秘书', '医生'],
    relationships: ['关怀体贴', '忠诚专一', '支持伴侣', '需要感激和认可'],
    personalityTraits: [
      { category: '思维方式', traits: ['他人导向', '细节关注', '传统价值'] },
      { category: '行为特征', traits: ['服务他人', '有条不紊', '默默奉献'] },
      { category: '情感特征', traits: ['温暖关怀', '内向敏感', '谦逊低调'] }
    ],
    growthAreas: ['提升自我主张', '学会说不', '增强自信', '关注自身需求'],
    motivations: ['帮助他人', '维护和谐', '履行责任', '获得感激'],
    stressors: ['人际冲突', '被忽视', '过度压力', '价值观冲突'],
    communicationStyle: '温和体贴，善于倾听，重视他人感受',
    decisionMaking: '考虑他人需求，基于价值观和经验',
    workStyle: '支持他人，重视和谐和服务',
    percentage: 13.8
  },
  ESTJ: {
    type: 'ESTJ',
    name: '总经理',
    nickname: '管理者',
    description: '出色的管理者，在管理事务或人员方面无与伦比。',
    cognitiveStack: ['Te', 'Si', 'Ne', 'Fi'],
    strengths: ['组织能力强', '责任心强', '实用主义', '决断力', '领导能力', '高效执行'],
    challenges: ['过于严格', '不够灵活', '忽视情感', '抗拒变化', '过度控制', '缺乏耐心'],
    careers: ['管理者', '银行家', '法官', '军官', '项目经理', '会计师', '警察', '政府官员'],
    relationships: ['重视承诺', '实际支持', '领导决策', '需要尊重和感激'],
    personalityTraits: [
      { category: '思维方式', traits: ['目标导向', '逻辑思维', '现实务实'] },
      { category: '行为特征', traits: ['主动领导', '高效执行', '组织协调'] },
      { category: '情感特征', traits: ['自信果断', '外向积极', '责任心强'] }
    ],
    growthAreas: ['增强灵活性', '提升同理心', '改善倾听', '关注创新'],
    motivations: ['实现目标', '维护秩序', '获得成就', '领导他人'],
    stressors: ['效率低下', '缺乏结构', '不确定性', '被质疑'],
    communicationStyle: '直接明确，重视效率和结果',
    decisionMaking: '快速果断，基于逻辑和经验',
    workStyle: '组织领导，重视效率和质量',
    percentage: 8.7
  },
  ESFJ: {
    type: 'ESFJ',
    name: '执政官',
    nickname: '供应者',
    description: '极有同情心、受欢迎、总是热心帮助他人的人。',
    cognitiveStack: ['Fe', 'Si', 'Ne', 'Ti'],
    strengths: ['关怀他人', '组织能力', '忠诚可靠', '实用主义', '善于合作', '热情友好'],
    challenges: ['过于敏感', '需要认可', '抗拒变化', '避免冲突', '过度操心', '缺乏自主性'],
    careers: ['教师', '护士', '销售代表', '人力资源', '社会工作者', '餐饮服务', '客服代表', '秘书'],
    relationships: ['关怀体贴', '忠诚专一', '支持伴侣', '重视和谐'],
    personalityTraits: [
      { category: '思维方式', traits: ['他人导向', '传统价值', '现实务实'] },
      { category: '行为特征', traits: ['服务他人', '组织协调', '热情参与'] },
      { category: '情感特征', traits: ['热情友好', '外向社交', '关怀体贴'] }
    ],
    growthAreas: ['增强独立性', '发展批判思维', '学会说不', '关注自身需求'],
    motivations: ['帮助他人', '获得认可', '维护和谐', '履行责任'],
    stressors: ['人际冲突', '被拒绝', '缺乏感激', '价值观冲突'],
    communicationStyle: '热情友好，善于倾听，重视情感连接',
    decisionMaking: '考虑他人感受，基于价值观和经验',
    workStyle: '团队合作，重视人际关系和服务',
    percentage: 12.3
  },
  ISTP: {
    type: 'ISTP',
    name: '鉴赏家',
    nickname: '工匠',
    description: '大胆而实际的实验家，擅长使用各种工具。',
    cognitiveStack: ['Ti', 'Se', 'Ni', 'Fe'],
    strengths: ['实用技能', '适应能力', '冷静理性', '独立自主', '解决问题', '动手能力强'],
    challenges: ['不善表达', '容易厌倦', '缺乏长远规划', '避免承诺', '情感表达困难', '过于独立'],
    careers: ['工程师', '技师', '飞行员', '外科医生', '运动员', '机械师', '软件开发', '消防员'],
    relationships: ['需要独立空间', '实际支持', '不善言辞', '忠诚但低调'],
    personalityTraits: [
      { category: '思维方式', traits: ['逻辑分析', '实用导向', '现实务实'] },
      { category: '行为特征', traits: ['独立自主', '灵活应变', '动手实践'] },
      { category: '情感特征', traits: ['冷静理性', '内向独立', '低调务实'] }
    ],
    growthAreas: ['提升沟通能力', '增强计划性', '表达情感', '建立承诺'],
    motivations: ['解决问题', '获得自由', '掌握技能', '实际成就'],
    stressors: ['情感压力', '长期承诺', '过度社交', '严格规则'],
    communicationStyle: '简洁实用，重视事实和逻辑',
    decisionMaking: '基于逻辑分析，快速适应',
    workStyle: '独立工作，重视实用性和技能',
    percentage: 5.4
  },
  ISFP: {
    type: 'ISFP',
    name: '探险家',
    nickname: '艺术家',
    description: '灵活、迷人的艺术家，时刻准备着探索新的可能性。',
    cognitiveStack: ['Fi', 'Se', 'Ni', 'Te'],
    strengths: ['艺术天赋', '适应能力', '关怀他人', '价值驱动', '真诚友好', '审美能力强'],
    challenges: ['过于敏感', '缺乏规划', '避免冲突', '容易受伤', '拖延症', '过度自我批评'],
    careers: ['艺术家', '设计师', '音乐家', '心理咨询师', '兽医', '摄影师', '作家', '治疗师'],
    relationships: ['深度情感连接', '支持伴侣', '需要理解', '重视真实性'],
    personalityTraits: [
      { category: '思维方式', traits: ['价值导向', '审美敏感', '个人化思考'] },
      { category: '行为特征', traits: ['灵活适应', '创意表达', '真诚友好'] },
      { category: '情感特征', traits: ['敏感细腻', '内向温和', '富有同情心'] }
    ],
    growthAreas: ['增强自信', '提升规划能力', '学会自我肯定', '改善沟通'],
    motivations: ['追求美感', '帮助他人', '表达真实', '个人成长'],
    stressors: ['人际冲突', '过度批评', '缺乏自由', '价值观冲突'],
    communicationStyle: '温和真诚，重视情感表达',
    decisionMaking: '基于个人价值观，需要时间思考',
    workStyle: '独立创作，重视美感和意义',
    percentage: 8.8
  },
  ESTP: {
    type: 'ESTP',
    name: '企业家',
    nickname: '表演者',
    description: '聪明、精力充沛、善于感知的人，真正享受生活在边缘的感觉。',
    cognitiveStack: ['Se', 'Ti', 'Fe', 'Ni'],
    strengths: ['适应能力强', '实用主义', '社交能力', '行动力', '解决问题', '乐观开朗'],
    challenges: ['缺乏耐心', '不善规划', '容易冲动', '避免理论', '注意力分散', '风险倾向'],
    careers: ['销售代表', '企业家', '演员', '运动员', '警察', '导游', '经纪人', '急救人员'],
    relationships: ['活泼有趣', '适应性强', '现实支持', '需要刺激和变化'],
    personalityTraits: [
      { category: '思维方式', traits: ['现实导向', '实用思考', '快速反应'] },
      { category: '行为特征', traits: ['主动出击', '灵活应变', '享受当下'] },
      { category: '情感特征', traits: ['乐观开朗', '外向活泼', '富有魅力'] }
    ],
    growthAreas: ['提升计划能力', '增强耐心', '深度思考', '长远规划'],
    motivations: ['享受生活', '获得自由', '实际成就', '社交互动'],
    stressors: ['长期规划', '理论学习', '孤独独处', '严格规则'],
    communicationStyle: '生动有趣，重视现实和行动',
    decisionMaking: '快速果断，基于现实情况',
    workStyle: '团队合作，重视行动和结果',
    percentage: 4.3
  },
  ESFP: {
    type: 'ESFP',
    name: '娱乐家',
    nickname: '表演者',
    description: '自发的、精力充沛、热情的人——生活在他们周围从不无聊。',
    cognitiveStack: ['Se', 'Fi', 'Te', 'Ni'],
    strengths: ['热情洋溢', '适应能力', '实用技能', '关怀他人', '乐观向上', '善于表达'],
    challenges: ['缺乏规划', '容易分心', '过于敏感', '避免冲突', '情绪化', '缺乏深度'],
    careers: ['演员', '教师', '销售代表', '社会工作者', '娱乐业', '导游', '心理咨询师', '护士'],
    relationships: ['热情关怀', '支持伴侣', '享受共同活动', '需要欣赏和肯定'],
    personalityTraits: [
      { category: '思维方式', traits: ['人际导向', '现实关注', '价值驱动'] },
      { category: '行为特征', traits: ['热情参与', '灵活应变', '享受当下'] },
      { category: '情感特征', traits: ['热情开朗', '外向友好', '富有同情心'] }
    ],
    growthAreas: ['提升规划能力', '增强深度思考', '学会坚持', '管理情绪'],
    motivations: ['帮助他人', '获得认可', '享受生活', '表达自我'],
    stressors: ['人际冲突', '缺乏自由', '过度批评', '孤独独处'],
    communicationStyle: '热情表达，善于倾听，重视情感连接',
    decisionMaking: '基于价值观和他人需求，征求意见',
    workStyle: '团队合作，重视人际关系和快乐',
    percentage: 7.3
  }
};