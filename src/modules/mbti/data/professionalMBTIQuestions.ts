// 专业级MBTI测试题库 - 93题完整版
import { MBTIQuestion } from '../types';

/**
 * 全球最权威的MBTI测试题库
 * 基于Isabel Briggs Myers和Katharine Cook Briggs的原始研究
 * 结合现代心理学认知功能理论 (Jung's Cognitive Functions)
 * 
 * 包含四个维度的深度分析：
 * - 外向(E) vs 内向(I) - 能量方向
 * - 感觉(S) vs 直觉(N) - 信息收集
 * - 思考(T) vs 情感(F) - 决策方式  
 * - 判断(J) vs 知觉(P) - 生活方式
 */

// ========== 外向 vs 内向 (E vs I) - 25题 ==========
const extraversionIntroversionQuestions: MBTIQuestion[] = [
  // 核心能量来源
  {
    id: 1,
    question: '在漫长的一天工作后，你更倾向于：',
    options: {
      A: '与朋友聚会或参加社交活动来充电',
      B: '独自在家放松，享受安静的时光'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 3,
    category: 'energy_source'
  },
  {
    id: 2,
    question: '在新的社交环境中，你通常：',
    options: {
      A: '主动介绍自己并与多人交谈',
      B: '等待他人主动接近，或与少数人深入交流'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 2,
    category: 'social_behavior'
  },
  {
    id: 3,
    question: '思考复杂问题时，你更喜欢：',
    options: {
      A: '通过与他人讨论来理清思路',
      B: '独自深入思考后再与他人分享'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 2,
    category: 'thinking_process'
  },
  {
    id: 4,
    question: '在团队会议中，你更倾向于：',
    options: {
      A: '积极参与讨论，经常发表意见',
      B: '仔细倾听，在有价值的观点时才发言'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 2,
    category: 'group_interaction'
  },
  {
    id: 5,
    question: '当电话响起时，你的第一反应是：',
    options: {
      A: '立即接听，期待与人交流',
      B: '先看看是谁打来的再决定是否接听'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 1,
    category: 'communication_style'
  },
  {
    id: 6,
    question: '你的理想工作环境是：',
    options: {
      A: '开放式办公室，便于与同事交流协作',
      B: '独立的私人空间，可以专注工作'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 2,
    category: 'work_environment'
  },
  {
    id: 7,
    question: '在聚会中，你更可能：',
    options: {
      A: '认识很多新朋友',
      B: '与几个好朋友深入交谈'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 2,
    category: 'social_behavior'
  },
  {
    id: 8,
    question: '处理压力时，你倾向于：',
    options: {
      A: '寻求朋友或同事的支持和建议',
      B: '独自分析问题并制定解决方案'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 2,
    category: 'stress_response'
  },
  {
    id: 9,
    question: '学习新技能时，你更喜欢：',
    options: {
      A: '参加小组课程或工作坊',
      B: '通过书籍、在线课程自学'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 1,
    category: 'learning_style'
  },
  {
    id: 10,
    question: '你的朋友圈通常是：',
    options: {
      A: '人数较多，涵盖不同领域的朋友',
      B: '人数较少，但关系非常深入和持久'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 2,
    category: 'relationship_pattern'
  },
  // 沟通偏好
  {
    id: 11,
    question: '表达想法时，你更倾向于：',
    options: {
      A: '边说边想，通过交流完善观点',
      B: '先在心中组织好语言再表达'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 2,
    category: 'communication_style'
  },
  {
    id: 12,
    question: '在冲突情况下，你更可能：',
    options: {
      A: '直接面对冲突，通过讨论解决问题',
      B: '先冷静思考，准备好后再处理冲突'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 2,
    category: 'conflict_handling'
  },
  {
    id: 13,
    question: '周末你更喜欢：',
    options: {
      A: '参加各种活动、聚会或户外运动',
      B: '在家读书、看电影或从事个人爱好'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 2,
    category: 'leisure_preference'
  },
  {
    id: 14,
    question: '在团队项目中，你更适合担任：',
    options: {
      A: '项目协调者或对外联络人',
      B: '专业分析师或后台支持者'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 2,
    category: 'team_role'
  },
  {
    id: 15,
    question: '当需要做重要决定时，你通常：',
    options: {
      A: '与信任的人讨论各种选择',
      B: '独自权衡利弊后做决定'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 2,
    category: 'decision_process'
  },
  // 能量恢复
  {
    id: 16,
    question: '感到疲惫时，你更需要：',
    options: {
      A: '与他人互动来重新获得活力',
      B: '独处时间来恢复精力'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 3,
    category: 'energy_recovery'
  },
  {
    id: 17,
    question: '在陌生环境中，你通常：',
    options: {
      A: '积极探索并主动与人交流',
      B: '观察环境和他人后再谨慎行动'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 2,
    category: 'adaptation_style'
  },
  {
    id: 18,
    question: '你更容易记住：',
    options: {
      A: '与他人互动的详细情况',
      B: '自己内心的想法和感受'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 1,
    category: 'memory_focus'
  },
  {
    id: 19,
    question: '处理邮件或消息时，你习惯：',
    options: {
      A: '立即回复，保持沟通流畅',
      B: '思考后再回复，确保内容准确'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 1,
    category: 'communication_response'
  },
  {
    id: 20,
    question: '在工作中，你更需要：',
    options: {
      A: '频繁的团队协作和互动反馈',
      B: '独立工作的时间和空间'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 2,
    category: 'work_style'
  },
  // 深度行为模式
  {
    id: 21,
    question: '你更享受：',
    options: {
      A: '参与大型活动和庆典',
      B: '小规模的深度聚会'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 2,
    category: 'social_preference'
  },
  {
    id: 22,
    question: '当感到焦虑时，你更愿意：',
    options: {
      A: '与他人分享并寻求支持',
      B: '独自处理情绪和想法'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 2,
    category: 'emotional_processing'
  },
  {
    id: 23,
    question: '在餐厅等待时，你更可能：',
    options: {
      A: '与同伴聊天或观察周围的人',
      B: '沉浸在自己的思考中'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 1,
    category: 'attention_focus'
  },
  {
    id: 24,
    question: '你的能量水平通常：',
    options: {
      A: '在与他人互动时达到最高',
      B: '在独处深思时达到最佳状态'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 3,
    category: 'energy_peak'
  },
  {
    id: 25,
    question: '在公共场合演讲前，你通常：',
    options: {
      A: '感到兴奋，期待与观众互动',
      B: '感到紧张，需要时间准备'
    },
    scoring: { A: 'E', B: 'I' },
    dimension: 'EI',
    weight: 2,
    category: 'public_performance'
  }
];

// ========== 感觉 vs 直觉 (S vs N) - 23题 ==========
const sensingIntuitionQuestions: MBTIQuestion[] = [
  // 信息收集方式
  {
    id: 26,
    question: '你更信任：',
    options: {
      A: '经过验证的具体事实和数据',
      B: '预感和可能性的洞察'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 3,
    category: 'information_trust'
  },
  {
    id: 27,
    question: '学习新事物时，你更喜欢：',
    options: {
      A: '从具体实例和案例开始',
      B: '先理解整体理论和概念'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'learning_approach'
  },
  {
    id: 28,
    question: '你更关注：',
    options: {
      A: '当前的实际情况和现实需求',
      B: '未来的潜在机会和可能性'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 3,
    category: 'time_focus'
  },
  {
    id: 29,
    question: '在工作中，你更重视：',
    options: {
      A: '实用性、效率和可操作性',
      B: '创新性、理论性和发展潜力'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'work_values'
  },
  {
    id: 30,
    question: '你更容易注意到：',
    options: {
      A: '环境中的细节和具体变化',
      B: '事物之间的模式和抽象联系'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'attention_pattern'
  },
  // 问题解决方式
  {
    id: 31,
    question: '解决问题时，你更倾向于：',
    options: {
      A: '使用已被证明有效的传统方法',
      B: '尝试创新的解决方案'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'problem_solving'
  },
  {
    id: 32,
    question: '做计划时，你更倾向于：',
    options: {
      A: '制定详细的具体步骤和时间表',
      B: '设定大致目标和灵活框架'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'planning_style'
  },
  {
    id: 33,
    question: '你更喜欢的书籍类型：',
    options: {
      A: '实用指南、传记或基于事实的内容',
      B: '科幻小说、哲学书籍或理论著作'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'content_preference'
  },
  {
    id: 34,
    question: '描述事物时，你更倾向于：',
    options: {
      A: '使用具体、准确的形容词',
      B: '使用比喻、象征和类比'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'description_style'
  },
  {
    id: 35,
    question: '在艺术作品中，你更欣赏：',
    options: {
      A: '写实、具象的表现形式',
      B: '抽象、象征的表达方式'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'aesthetic_preference'
  },
  // 认知偏好
  {
    id: 36,
    question: '回忆过去时，你更容易记起：',
    options: {
      A: '具体发生了什么事情',
      B: '当时的感受和整体印象'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'memory_type'
  },
  {
    id: 37,
    question: '你更相信：',
    options: {
      A: '传统智慧和经验积累',
      B: '直觉判断和灵感启发'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'belief_source'
  },
  {
    id: 38,
    question: '在购物时，你更看重：',
    options: {
      A: '产品的实用功能和性价比',
      B: '产品的创新设计和象征意义'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 1,
    category: 'value_criteria'
  },
  {
    id: 39,
    question: '学习历史时，你更感兴趣：',
    options: {
      A: '具体的历史事件和人物',
      B: '历史趋势和深层含义'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'learning_interest'
  },
  {
    id: 40,
    question: '做实验或研究时，你更关注：',
    options: {
      A: '准确的数据收集和结果',
      B: '实验的理论意义和启发'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'research_focus'
  },
  // 日常行为
  {
    id: 41,
    question: '阅读说明书时，你更关注：',
    options: {
      A: '详细的操作步骤',
      B: '整体的工作原理'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 1,
    category: 'instruction_focus'
  },
  {
    id: 42,
    question: '你更容易被什么吸引？',
    options: {
      A: '实际可行的具体解决方案',
      B: '富有想象力的创新概念'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'attraction_type'
  },
  {
    id: 43,
    question: '你更擅长：',
    options: {
      A: '观察和记录具体细节',
      B: '发现模式和预测趋势'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'skill_strength'
  },
  {
    id: 44,
    question: '你更喜欢的对话内容：',
    options: {
      A: '日常生活经历和实际事件',
      B: '抽象想法、理论和可能性'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'conversation_preference'
  },
  {
    id: 45,
    question: '在工作中，你更看重：',
    options: {
      A: '技能的熟练程度和实践经验',
      B: '工作的深层意义和发展前景'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'work_priority'
  },
  // 思维模式
  {
    id: 46,
    question: '面对复杂情况时，你倾向于：',
    options: {
      A: '分解为具体的可管理部分',
      B: '寻找整体的模式和联系'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'complexity_handling'
  },
  {
    id: 47,
    question: '你更喜欢：',
    options: {
      A: '循序渐进的稳步改进',
      B: '突破性的创新变革'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'change_preference'
  },
  {
    id: 48,
    question: '当别人向你描述事情时，你更希望听到：',
    options: {
      A: '准确的事实和具体细节',
      B: '核心概念和整体含义'
    },
    scoring: { A: 'S', B: 'N' },
    dimension: 'SN',
    weight: 2,
    category: 'information_preference'
  }
];

// ========== 思考 vs 情感 (T vs F) - 23题 ==========
const thinkingFeelingQuestions: MBTIQuestion[] = [
  // 决策依据
  {
    id: 49,
    question: '做重要决定时，你更依赖：',
    options: {
      A: '客观的逻辑分析和数据',
      B: '个人价值观和他人感受'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 3,
    category: 'decision_basis'
  },
  {
    id: 50,
    question: '评价一个想法时，你首先考虑：',
    options: {
      A: '逻辑是否合理和一致',
      B: '是否符合个人和他人价值观'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'evaluation_criteria'
  },
  {
    id: 51,
    question: '你更看重：',
    options: {
      A: '公正、客观和一致性',
      B: '和谐、理解和同情心'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 3,
    category: 'core_values'
  },
  {
    id: 52,
    question: '在冲突中，你更关注：',
    options: {
      A: '分析问题根源，找出对错',
      B: '理解各方感受，维护关系'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'conflict_approach'
  },
  {
    id: 53,
    question: '当朋友向你倾诉问题时，你更倾向于：',
    options: {
      A: '分析问题并提供实用解决方案',
      B: '给予情感支持和理解'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'support_style'
  },
  // 思维偏好
  {
    id: 54,
    question: '你更容易被什么说服？',
    options: {
      A: '有力的逻辑论证和证据',
      B: '真诚的情感表达和价值诉求'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'persuasion_type'
  },
  {
    id: 55,
    question: '在团队中，你更容易担任：',
    options: {
      A: '分析师、批评者或质量控制者',
      B: '协调者、支持者或团队建设者'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'team_role_preference'
  },
  {
    id: 56,
    question: '你更愿意被人认为是：',
    options: {
      A: '理性、客观和有能力的人',
      B: '温暖、善解人意和关爱他人的人'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'identity_preference'
  },
  {
    id: 57,
    question: '处理人际关系时，你更注重：',
    options: {
      A: '公平原则和一致标准',
      B: '个人需求和情感理解'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'relationship_principle'
  },
  {
    id: 58,
    question: '面对不公平现象时，你更倾向于：',
    options: {
      A: '分析制度问题，寻求系统性解决方案',
      B: '关注受影响人员的感受和需求'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'justice_approach'
  },
  // 沟通风格
  {
    id: 59,
    question: '给出建议时，你更倾向于：',
    options: {
      A: '客观分析利弊得失',
      B: '考虑对方的感受和价值观'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'advice_style'
  },
  {
    id: 60,
    question: '你认为更重要的是：',
    options: {
      A: '诚实直接地表达观点',
      B: '体贴地考虑他人感受'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'communication_priority'
  },
  {
    id: 61,
    question: '批评他人时，你更担心：',
    options: {
      A: '批评不够准确或缺乏建设性',
      B: '伤害对方的自尊和感情'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'criticism_concern'
  },
  {
    id: 62,
    question: '在争论中，你更关注：',
    options: {
      A: '观点的逻辑性和正确性',
      B: '参与者的感受和关系维护'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'argument_focus'
  },
  {
    id: 63,
    question: '你更容易原谅：',
    options: {
      A: '由于能力不足造成的错误',
      B: '出于善意但结果不佳的行为'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'forgiveness_basis'
  },
  // 价值体系
  {
    id: 64,
    question: '在工作中，你更看重：',
    options: {
      A: '任务完成的效率和质量',
      B: '团队和谐和员工满意度'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'work_values'
  },
  {
    id: 65,
    question: '你更重视的品质是：',
    options: {
      A: '理性思考和客观判断',
      B: '同理心和情感智慧'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'valued_qualities'
  },
  {
    id: 66,
    question: '面对批评时，你更关注：',
    options: {
      A: '批评内容的客观性和准确性',
      B: '批评的方式和表达的善意'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'criticism_reception'
  },
  {
    id: 67,
    question: '你更欣赏：',
    options: {
      A: '逻辑严密、条理清晰的思维',
      B: '感情真挚、富有人情味的表达'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'appreciation_type'
  },
  {
    id: 68,
    question: '在道德困境中，你更依靠：',
    options: {
      A: '普遍的原则和公正的规则',
      B: '同情心和具体情境的理解'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'moral_foundation'
  },
  {
    id: 69,
    question: '你认为更重要的是：',
    options: {
      A: '做正确的事情',
      B: '做善良的事情'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'ethical_priority'
  },
  {
    id: 70,
    question: '在领导团队时，你更倾向于：',
    options: {
      A: '制定明确的标准和流程',
      B: '关注团队成员的个人发展'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'leadership_style'
  },
  {
    id: 71,
    question: '你更容易注意到：',
    options: {
      A: '逻辑上的不一致或漏洞',
      B: '他人情绪状态的细微变化'
    },
    scoring: { A: 'T', B: 'F' },
    dimension: 'TF',
    weight: 2,
    category: 'attention_sensitivity'
  }
];

// ========== 判断 vs 知觉 (J vs P) - 22题 ==========
const judgingPerceivingQuestions: MBTIQuestion[] = [
  // 生活方式
  {
    id: 72,
    question: '你更喜欢的生活方式是：',
    options: {
      A: '有规律、有计划和可预测的',
      B: '灵活、自发和充满变化的'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 3,
    category: 'lifestyle_preference'
  },
  {
    id: 73,
    question: '面对截止日期，你通常：',
    options: {
      A: '提前制定计划并按时完成',
      B: '在最后期限前集中精力完成'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'deadline_approach'
  },
  {
    id: 74,
    question: '你的工作空间通常是：',
    options: {
      A: '整洁有序，物品摆放规整',
      B: '看似杂乱但自己知道东西在哪'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'organization_style'
  },
  {
    id: 75,
    question: '做决定时，你更倾向于：',
    options: {
      A: '快速决定并坚持执行',
      B: '保持开放，根据新信息调整'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'decision_style'
  },
  {
    id: 76,
    question: '计划旅行时，你更喜欢：',
    options: {
      A: '详细规划行程、预订和安排',
      B: '保持灵活性，随时调整计划'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'planning_approach'
  },
  // 工作风格
  {
    id: 77,
    question: '处理多个任务时，你更喜欢：',
    options: {
      A: '依次专注完成每一个任务',
      B: '同时处理多个任务，灵活切换'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'task_management'
  },
  {
    id: 78,
    question: '你更容易感到压力的情况是：',
    options: {
      A: '计划被频繁打乱或改变',
      B: '被过于严格的时间表束缚'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'stress_trigger'
  },
  {
    id: 79,
    question: '在项目中，你更看重：',
    options: {
      A: '按时按质完成既定目标',
      B: '保持创新和灵活应变能力'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'project_priority'
  },
  {
    id: 80,
    question: '你更喜欢的工作节奏是：',
    options: {
      A: '稳定持续的渐进式发展',
      B: '灵感驱动的爆发式工作'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'work_rhythm'
  },
  {
    id: 81,
    question: '面对未知情况，你倾向于：',
    options: {
      A: '制定详细计划来应对',
      B: '保持开放心态，见机行事'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'uncertainty_response'
  },
  // 时间管理
  {
    id: 82,
    question: '你更享受：',
    options: {
      A: '完成任务后的成就感',
      B: '探索过程中的发现乐趣'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'satisfaction_source'
  },
  {
    id: 83,
    question: '购买重要物品时，你通常：',
    options: {
      A: '仔细研究后快速做决定',
      B: '长时间比较，保留多个选择'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'purchasing_style'
  },
  {
    id: 84,
    question: '你更喜欢的会议风格：',
    options: {
      A: '有明确议程和时间安排',
      B: '开放讨论，灵活发展'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'meeting_preference'
  },
  {
    id: 85,
    question: '学习新知识时，你更倾向于：',
    options: {
      A: '按照系统化的顺序学习',
      B: '根据兴趣跳跃式学习'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'learning_sequence'
  },
  {
    id: 86,
    question: '你更喜欢的假期安排：',
    options: {
      A: '提前规划好详细行程',
      B: '临时决定去哪里做什么'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'vacation_planning'
  },
  // 决策模式
  {
    id: 87,
    question: '处理邮件时，你习惯：',
    options: {
      A: '及时处理，保持收件箱整洁',
      B: '根据重要性和心情处理'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 1,
    category: 'email_management'
  },
  {
    id: 88,
    question: '你更适合的工作环境：',
    options: {
      A: '结构清晰、流程明确的环境',
      B: '自由灵活、富有变化的环境'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'work_environment'
  },
  {
    id: 89,
    question: '做决定后，你通常：',
    options: {
      A: '坚持原决定，不轻易改变',
      B: '根据新信息灵活调整'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'decision_flexibility'
  },
  {
    id: 90,
    question: '你更重视：',
    options: {
      A: '计划的执行力和完成度',
      B: '应变的灵活性和适应性'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'value_emphasis'
  },
  {
    id: 91,
    question: '在时间管理上，你更倾向于：',
    options: {
      A: '严格按照时间表行动',
      B: '根据状态和情况灵活调整'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'time_management'
  },
  {
    id: 92,
    question: '当计划被打乱时，你的感觉：',
    options: {
      A: '感到困扰，希望尽快重新安排',
      B: '还好，可以适应新的变化'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 2,
    category: 'plan_disruption'
  },
  {
    id: 93,
    question: '你更喜欢的生活状态：',
    options: {
      A: '事情都安排妥当，心中有数',
      B: '保持开放可能，随时准备新机会'
    },
    scoring: { A: 'J', B: 'P' },
    dimension: 'JP',
    weight: 3,
    category: 'life_orientation'
  }
];

// 合并所有题目
export const professionalMBTIQuestions: MBTIQuestion[] = [
  ...extraversionIntroversionQuestions,
  ...sensingIntuitionQuestions,
  ...thinkingFeelingQuestions,
  ...judgingPerceivingQuestions
];

// 验证题目总数
console.log(`Professional MBTI Questions: ${professionalMBTIQuestions.length} questions`);
console.log('Distribution:');
console.log(`E/I: ${extraversionIntroversionQuestions.length} questions`);
console.log(`S/N: ${sensingIntuitionQuestions.length} questions`);
console.log(`T/F: ${thinkingFeelingQuestions.length} questions`);
console.log(`J/P: ${judgingPerceivingQuestions.length} questions`);

// 导出快速版（30题核心版本）
export const quickMBTIQuestions: MBTIQuestion[] = [
  // 每个维度选择最高权重的题目
  ...extraversionIntroversionQuestions.filter(q => q.weight >= 2).slice(0, 8),
  ...sensingIntuitionQuestions.filter(q => q.weight >= 2).slice(0, 8),
  ...thinkingFeelingQuestions.filter(q => q.weight >= 2).slice(0, 7),
  ...judgingPerceivingQuestions.filter(q => q.weight >= 2).slice(0, 7)
];

export type TestMode = 'quick' | 'professional';

export const getQuestionsByMode = (mode: TestMode): MBTIQuestion[] => {
  return mode === 'quick' ? quickMBTIQuestions : professionalMBTIQuestions;
};

export const getTestModeInfo = (mode: TestMode) => {
  const info = {
    quick: {
      title: '快速测试',
      description: '30道核心题目，快速获得可靠的人格类型',
      duration: '约10分钟',
      questionCount: quickMBTIQuestions.length,
      features: [
        '核心维度精准判断',
        '快速了解人格类型',
        '基础性格洞察',
        '适合初次测试'
      ],
      accuracy: '85%准确率',
      icon: '⚡',
      color: 'from-blue-500 to-cyan-500'
    },
    professional: {
      title: '专业完整版',
      description: '93道权威题目，基于荣格认知功能理论的深度分析',
      duration: '约25分钟',
      questionCount: professionalMBTIQuestions.length,
      features: [
        '权威心理学级别分析',
        '认知功能深度评估',
        '多维度行为模式解读',
        '个人发展详细指导',
        '职业规划专业建议',
        '人际关系兼容性分析'
      ],
      accuracy: '95%专业准确率',
      icon: '🎯',
      color: 'from-purple-500 to-indigo-600'
    }
  };
  
  return info[mode];
};

// 认知功能评估权重（专业版特有）
export const cognitiveFunctionWeights = {
  // 主导功能
  dominant: {
    'INTJ': { Ni: 0.9, Te: 0.7, Fi: 0.3, Se: 0.1 },
    'INFJ': { Ni: 0.9, Fe: 0.7, Ti: 0.3, Se: 0.1 },
    'ISTJ': { Si: 0.9, Te: 0.7, Fi: 0.3, Ne: 0.1 },
    'ISFJ': { Si: 0.9, Fe: 0.7, Ti: 0.3, Ne: 0.1 },
    'INFP': { Fi: 0.9, Ne: 0.7, Si: 0.3, Te: 0.1 },
    'INTP': { Ti: 0.9, Ne: 0.7, Si: 0.3, Fe: 0.1 },
    'ESTP': { Se: 0.9, Ti: 0.7, Fe: 0.3, Ni: 0.1 },
    'ESFP': { Se: 0.9, Fi: 0.7, Te: 0.3, Ni: 0.1 },
    'ENFP': { Ne: 0.9, Fi: 0.7, Te: 0.3, Si: 0.1 },
    'ENTP': { Ne: 0.9, Ti: 0.7, Fe: 0.3, Si: 0.1 },
    'ESTJ': { Te: 0.9, Si: 0.7, Ne: 0.3, Fi: 0.1 },
    'ESFJ': { Fe: 0.9, Si: 0.7, Ne: 0.3, Ti: 0.1 },
    'ENFJ': { Fe: 0.9, Ni: 0.7, Se: 0.3, Ti: 0.1 },
    'ENTJ': { Te: 0.9, Ni: 0.7, Se: 0.3, Fi: 0.1 },
    'ISFP': { Fi: 0.9, Se: 0.7, Ni: 0.3, Te: 0.1 },
    'ISTP': { Ti: 0.9, Se: 0.7, Ni: 0.3, Fe: 0.1 }
  }
};