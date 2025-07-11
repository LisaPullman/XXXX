import type { MBTIAnswer, MBTIDimensions, MBTIResult, MBTIType } from '../types';
import { MBTI_QUESTIONS } from '../data/mbtiQuestions';

/**
 * 计算MBTI结果
 */
export function calculateMBTIResult(answers: MBTIAnswer[]): MBTIResult {
  const dimensions = calculateDimensions(answers);
  const type = determineMBTIType(dimensions);
  const confidence = calculateConfidence(dimensions);

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
function calculateDimensions(answers: MBTIAnswer[]): MBTIDimensions {
  const scores = {
    EI: 0, // 正数倾向E(外向)，负数倾向I(内向)
    SN: 0, // 正数倾向N(直觉)，负数倾向S(感觉)
    TF: 0, // 正数倾向F(情感)，负数倾向T(思考)
    JP: 0, // 正数倾向P(知觉)，负数倾向J(判断)
  };

  answers.forEach(answer => {
    const question = MBTI_QUESTIONS.find(q => q.id === answer.questionId);
    if (!question) return;

    const weight = question.weight;
    const dimension = question.dimension;

    // 根据不同维度和选项计算得分
    switch (dimension) {
      case 'EI':
        // A选项倾向外向(E)，B选项倾向内向(I)
        scores.EI += answer.answer === 'A' ? weight : -weight;
        break;
      case 'SN':
        // A选项倾向感觉(S)，B选项倾向直觉(N)
        scores.SN += answer.answer === 'A' ? -weight : weight;
        break;
      case 'TF':
        // A选项倾向思考(T)，B选项倾向情感(F)
        scores.TF += answer.answer === 'A' ? -weight : weight;
        break;
      case 'JP':
        // A选项倾向判断(J)，B选项倾向知觉(P)
        scores.JP += answer.answer === 'A' ? -weight : weight;
        break;
    }
  });

  // 将得分标准化到-100到100的范围
  const maxScore = getMaxPossibleScore();
  
  return {
    EI: Math.round((scores.EI / maxScore.EI) * 100),
    SN: Math.round((scores.SN / maxScore.SN) * 100),
    TF: Math.round((scores.TF / maxScore.TF) * 100),
    JP: Math.round((scores.JP / maxScore.JP) * 100),
  };
}

/**
 * 获取各维度的最大可能得分
 */
function getMaxPossibleScore() {
  const maxScores = { EI: 0, SN: 0, TF: 0, JP: 0 };
  
  MBTI_QUESTIONS.forEach(question => {
    maxScores[question.dimension] += question.weight;
  });
  
  return maxScores;
}

/**
 * 根据维度得分确定MBTI类型
 */
function determineMBTIType(dimensions: MBTIDimensions): MBTIType {
  const e_or_i = dimensions.EI >= 0 ? 'E' : 'I';
  const s_or_n = dimensions.SN >= 0 ? 'N' : 'S';
  const t_or_f = dimensions.TF >= 0 ? 'F' : 'T';
  const j_or_p = dimensions.JP >= 0 ? 'P' : 'J';
  
  return `${e_or_i}${s_or_n}${t_or_f}${j_or_p}` as MBTIType;
}

/**
 * 计算结果的置信度
 */
function calculateConfidence(dimensions: MBTIDimensions): number {
  // 计算各维度的绝对值平均数，作为置信度指标
  const absValues = [
    Math.abs(dimensions.EI),
    Math.abs(dimensions.SN),
    Math.abs(dimensions.TF),
    Math.abs(dimensions.JP),
  ];
  
  const averageStrength = absValues.reduce((sum, val) => sum + val, 0) / 4;
  
  // 将0-100的强度转换为0-1的置信度
  return Math.min(averageStrength / 100, 1);
}

/**
 * 获取MBTI类型的详细描述
 */
export function getMBTITypeDescription(type: MBTIType): {
  name: string;
  nickname: string;
  description: string;
  strengths: string[];
  challenges: string[];
  careers: string[];
} {
  const descriptions = {
    INTJ: {
      name: '建筑师',
      nickname: '策略家',
      description: '富有想象力和战略性的思想家，一切皆在计划之中。',
      strengths: ['独立思考', '长远规划', '系统分析', '创新能力'],
      challenges: ['过于理想化', '不善表达情感', '容易忽视细节', '社交困难'],
      careers: ['科学家', '工程师', '建筑师', '战略顾问', '研究员']
    },
    INTP: {
      name: '思想家',
      nickname: '逻辑学家',
      description: '具有创新精神的发明家，对知识有着不可抑制的渴望。',
      strengths: ['逻辑思维', '创新思考', '适应能力', '客观分析'],
      challenges: ['缺乏耐心', '不善管理', '容易分心', '避免冲突'],
      careers: ['研究员', '程序员', '哲学家', '数学家', '分析师']
    },
    ENTJ: {
      name: '指挥官',
      nickname: '领导者',
      description: '大胆、富有想象力、意志强烈的领导者，总能找到或创造解决方法。',
      strengths: ['天生领导', '战略思维', '高效执行', '自信果断'],
      challenges: ['过于强势', '缺乏耐心', '忽视情感', '完美主义'],
      careers: ['CEO', '管理顾问', '律师', '投资银行家', '企业家']
    },
    ENTP: {
      name: '辩论家',
      nickname: '发明家',
      description: '聪明好奇的思想家，不会拒绝任何智力上的挑战。',
      strengths: ['创新思维', '适应能力', '热情洋溢', '善于激励'],
      challenges: ['缺乏专注', '不善细节', '容易厌倦', '过于理想'],
      careers: ['创业者', '营销专家', '记者', '咨询师', '发明家']
    },
    INFJ: {
      name: '提倡者',
      nickname: '理想主义者',
      description: '安静而神秘，同时鼓舞人心且不知疲倦的理想主义者。',
      strengths: ['深度洞察', '富有同情心', '创造力强', '坚持原则'],
      challenges: ['过于敏感', '完美主义', '容易倦怠', '难以决断'],
      careers: ['心理咨询师', '作家', '教师', '社会工作者', '艺术家']
    },
    INFP: {
      name: '调停者',
      nickname: '治疗师',
      description: '诗意、善良、利他的人，总是热切地为正当理由而努力。',
      strengths: ['价值驱动', '创造力强', '适应能力', '忠诚可靠'],
      challenges: ['过于理想化', '容易受伤', '缺乏实用性', '避免冲突'],
      careers: ['心理学家', '作家', '艺术家', '社会工作者', '教师']
    },
    ENFJ: {
      name: '主人公',
      nickname: '教师',
      description: '富有魅力、鼓舞人心的领导者，有着感化他人的能力。',
      strengths: ['善于激励', '富有同情心', '沟通能力强', '组织能力'],
      challenges: ['过于理想化', '容易倦怠', '过分敏感', '难以拒绝'],
      careers: ['教师', '培训师', '心理咨询师', '人力资源', '政治家']
    },
    ENFP: {
      name: '竞选者',
      nickname: '激励者',
      description: '热情、有创造力、社交能力强的自由精神，总能找到理由微笑。',
      strengths: ['热情洋溢', '创造力强', '社交能力', '适应能力'],
      challenges: ['缺乏专注', '过于乐观', '容易分心', '不善细节'],
      careers: ['记者', '心理学家', '演员', '营销专家', '企业家']
    },
    ISTJ: {
      name: '物流师',
      nickname: '检查员',
      description: '实用主义的逻辑学家，忠诚可靠，不会放弃任何有价值的事业。',
      strengths: ['责任心强', '注重细节', '组织能力', '忠诚可靠'],
      challenges: ['抗拒变化', '过于严格', '缺乏灵活性', '不善表达'],
      careers: ['会计师', '审计师', '银行家', '法官', '管理员']
    },
    ISFJ: {
      name: '守护者',
      nickname: '保护者',
      description: '非常专注、温暖的守护者，时刻准备着保护爱着的人们。',
      strengths: ['关怀他人', '责任心强', '注重细节', '忠诚可靠'],
      challenges: ['过于谦逊', '容易倦怠', '抗拒变化', '难以拒绝'],
      careers: ['护士', '教师', '社会工作者', '图书管理员', '人力资源']
    },
    ESTJ: {
      name: '总经理',
      nickname: '管理者',
      description: '出色的管理者，在管理事务或人员方面无与伦比。',
      strengths: ['组织能力强', '责任心强', '实用主义', '决断力'],
      challenges: ['过于严格', '不够灵活', '忽视情感', '抗拒变化'],
      careers: ['管理者', '银行家', '法官', '军官', '项目经理']
    },
    ESFJ: {
      name: '执政官',
      nickname: '供应者',
      description: '极有同情心、受欢迎、总是热心帮助他人的人。',
      strengths: ['关怀他人', '组织能力', '忠诚可靠', '实用主义'],
      challenges: ['过于敏感', '需要认可', '抗拒变化', '避免冲突'],
      careers: ['教师', '护士', '销售代表', '人力资源', '社会工作者']
    },
    ISTP: {
      name: '鉴赏家',
      nickname: '工匠',
      description: '大胆而实际的实验家，擅长使用各种工具。',
      strengths: ['实用技能', '适应能力', '冷静理性', '独立自主'],
      challenges: ['不善表达', '容易厌倦', '缺乏长远规划', '避免承诺'],
      careers: ['工程师', '技师', '飞行员', '外科医生', '运动员']
    },
    ISFP: {
      name: '探险家',
      nickname: '艺术家',
      description: '灵活、迷人的艺术家，时刻准备着探索新的可能性。',
      strengths: ['艺术天赋', '适应能力', '关怀他人', '价值驱动'],
      challenges: ['过于敏感', '缺乏规划', '避免冲突', '容易受伤'],
      careers: ['艺术家', '设计师', '音乐家', '心理咨询师', '兽医']
    },
    ESTP: {
      name: '企业家',
      nickname: '表演者',
      description: '聪明、精力充沛、善于感知的人，真正享受生活在边缘的感觉。',
      strengths: ['适应能力强', '实用主义', '社交能力', '行动力'],
      challenges: ['缺乏耐心', '不善规划', '容易冲动', '避免理论'],
      careers: ['销售代表', '企业家', '演员', '运动员', '警察']
    },
    ESFP: {
      name: '娱乐家',
      nickname: '表演者',
      description: '自发的、精力充沛、热情的人——生活在他们周围从不无聊。',
      strengths: ['热情洋溢', '适应能力', '实用技能', '关怀他人'],
      challenges: ['缺乏规划', '容易分心', '过于敏感', '避免冲突'],
      careers: ['演员', '教师', '销售代表', '社会工作者', '娱乐业']
    }
  };

  return descriptions[type];
}
