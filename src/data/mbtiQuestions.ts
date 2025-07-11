import type { MBTIQuestion } from '../types';

export const MBTI_QUESTIONS: MBTIQuestion[] = [
  // EI 维度 (外向 vs 内向)
  {
    id: 1,
    question: "在聚会中，你更倾向于：",
    options: {
      A: "主动与很多人交谈，成为焦点",
      B: "与少数几个人深入交流"
    },
    dimension: 'EI',
    weight: 3
  },
  {
    id: 2,
    question: "当你需要充电时，你更喜欢：",
    options: {
      A: "和朋友出去玩，参加社交活动",
      B: "独自待着，做自己喜欢的事情"
    },
    dimension: 'EI',
    weight: 3
  },
  {
    id: 3,
    question: "在工作中，你更喜欢：",
    options: {
      A: "团队合作，集体讨论",
      B: "独立工作，专注思考"
    },
    dimension: 'EI',
    weight: 2
  },
  {
    id: 4,
    question: "面对新环境时，你通常：",
    options: {
      A: "很快适应，主动结识新朋友",
      B: "需要时间观察，谨慎地融入"
    },
    dimension: 'EI',
    weight: 2
  },
  {
    id: 5,
    question: "你更容易被以下哪种描述：",
    options: {
      A: "外向、健谈、精力充沛",
      B: "内敛、深思、专注"
    },
    dimension: 'EI',
    weight: 3
  },
  {
    id: 6,
    question: "在做决定时，你更倾向于：",
    options: {
      A: "和别人讨论，听取多方意见",
      B: "自己仔细思考，独立决定"
    },
    dimension: 'EI',
    weight: 2
  },
  {
    id: 7,
    question: "你的朋友圈通常是：",
    options: {
      A: "很大，认识很多人",
      B: "较小，但关系很深"
    },
    dimension: 'EI',
    weight: 2
  },

  // SN 维度 (感觉 vs 直觉)
  {
    id: 8,
    question: "你更关注：",
    options: {
      A: "具体的事实和细节",
      B: "整体的概念和可能性"
    },
    dimension: 'SN',
    weight: 3
  },
  {
    id: 9,
    question: "学习新知识时，你更喜欢：",
    options: {
      A: "从具体例子开始，逐步理解",
      B: "先了解整体框架，再填充细节"
    },
    dimension: 'SN',
    weight: 3
  },
  {
    id: 10,
    question: "你更信任：",
    options: {
      A: "经验和已被证实的方法",
      B: "直觉和创新的想法"
    },
    dimension: 'SN',
    weight: 3
  },
  {
    id: 11,
    question: "在工作中，你更擅长：",
    options: {
      A: "处理具体的、实际的任务",
      B: "构思创新的、概念性的方案"
    },
    dimension: 'SN',
    weight: 2
  },
  {
    id: 12,
    question: "你更喜欢的对话内容是：",
    options: {
      A: "具体的事件、经历和事实",
      B: "抽象的想法、理论和可能性"
    },
    dimension: 'SN',
    weight: 2
  },
  {
    id: 13,
    question: "面对问题时，你更倾向于：",
    options: {
      A: "寻找已有的、成熟的解决方案",
      B: "探索新的、创造性的解决方法"
    },
    dimension: 'SN',
    weight: 2
  },
  {
    id: 14,
    question: "你更容易注意到：",
    options: {
      A: "环境中的具体细节",
      B: "事物之间的关联和模式"
    },
    dimension: 'SN',
    weight: 2
  },

  // TF 维度 (思考 vs 情感)
  {
    id: 15,
    question: "做决定时，你更重视：",
    options: {
      A: "逻辑分析和客观标准",
      B: "价值观念和对他人的影响"
    },
    dimension: 'TF',
    weight: 3
  },
  {
    id: 16,
    question: "你更容易被以下哪种说服：",
    options: {
      A: "逻辑清晰的论证",
      B: "情感真挚的表达"
    },
    dimension: 'TF',
    weight: 3
  },
  {
    id: 17,
    question: "在冲突中，你更倾向于：",
    options: {
      A: "坚持原则，据理力争",
      B: "考虑感受，寻求和谐"
    },
    dimension: 'TF',
    weight: 3
  },
  {
    id: 18,
    question: "评价一个决定时，你更看重：",
    options: {
      A: "是否符合逻辑和效率",
      B: "是否考虑了所有人的感受"
    },
    dimension: 'TF',
    weight: 2
  },
  {
    id: 19,
    question: "你更容易：",
    options: {
      A: "保持客观，不被情绪影响",
      B: "感同身受，理解他人情感"
    },
    dimension: 'TF',
    weight: 2
  },
  {
    id: 20,
    question: "在团队中，你更倾向于：",
    options: {
      A: "关注任务完成和效率",
      B: "关注团队和谐和成员感受"
    },
    dimension: 'TF',
    weight: 2
  },
  {
    id: 21,
    question: "你更重视：",
    options: {
      A: "公平和一致性",
      B: "仁慈和个人情况"
    },
    dimension: 'TF',
    weight: 2
  },

  // JP 维度 (判断 vs 知觉)
  {
    id: 22,
    question: "你更喜欢：",
    options: {
      A: "有明确的计划和时间表",
      B: "保持灵活，随机应变"
    },
    dimension: 'JP',
    weight: 3
  },
  {
    id: 23,
    question: "面对截止日期，你通常：",
    options: {
      A: "提前完成，避免最后时刻的压力",
      B: "在截止日期前完成，享受最后的冲刺"
    },
    dimension: 'JP',
    weight: 3
  },
  {
    id: 24,
    question: "你的工作风格更像：",
    options: {
      A: "有条不紊，按部就班",
      B: "灵活多变，适应性强"
    },
    dimension: 'JP',
    weight: 3
  },
  {
    id: 25,
    question: "做决定时，你更倾向于：",
    options: {
      A: "尽快决定，然后执行",
      B: "保持开放，收集更多信息"
    },
    dimension: 'JP',
    weight: 2
  },
  {
    id: 26,
    question: "你更喜欢的生活方式是：",
    options: {
      A: "有规律、可预测的",
      B: "多样化、充满变化的"
    },
    dimension: 'JP',
    weight: 2
  },
  {
    id: 27,
    question: "在项目中，你更倾向于：",
    options: {
      A: "制定详细计划，严格执行",
      B: "边做边调整，灵活应对"
    },
    dimension: 'JP',
    weight: 2
  },
  {
    id: 28,
    question: "你更容易感到满足当：",
    options: {
      A: "事情按计划进行，有明确结果",
      B: "保持多种选择，探索新可能"
    },
    dimension: 'JP',
    weight: 2
  }
];
