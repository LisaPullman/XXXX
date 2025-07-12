import { 
  MeditationCourse, 
  MeditationSession, 
  AmbientSound, 
  BreathingExercise,
  MeditationCategory,
  Achievement
} from '../types';

// 冥想课程数据
export const meditationCourses: MeditationCourse[] = [
  {
    id: 'mindfulness-basics',
    title: '正念冥想入门',
    description: '学习正念冥想的基础技巧，培养当下觉察的能力',
    instructor: '林静老师',
    duration: 30,
    difficulty: 'beginner',
    category: 'mindfulness',
    tags: ['入门', '正念', '觉察', '专注'],
    thumbnail: '🧘‍♀️',
    benefits: [
      '提高注意力集中度',
      '减少焦虑和压力',
      '改善情绪管理',
      '增强自我觉察'
    ],
    sessions: [
      {
        id: 'session-1',
        title: '认识正念',
        description: '了解什么是正念，学习基本的观察技巧',
        duration: 10,
        instructions: [
          '找一个安静舒适的地方坐下',
          '闭上眼睛，将注意力放在呼吸上',
          '观察呼吸的自然节奏，不要试图改变',
          '当思绪飘散时，温和地将注意力带回呼吸'
        ],
        focusPoints: ['呼吸觉察', '思绪观察', '当下体验'],
        preparation: ['选择安静环境', '穿着舒适', '关闭电子设备'],
        postSession: ['记录体验', '设定练习时间', '保持耐心']
      },
      {
        id: 'session-2',
        title: '身体扫描',
        description: '通过身体扫描练习培养身体觉察',
        duration: 15,
        instructions: [
          '躺下或舒适地坐着',
          '从头顶开始，逐一感受身体各部位',
          '注意任何感觉，不做判断',
          '如果某个部位有紧张，轻柔地呼吸进入该区域'
        ],
        focusPoints: ['身体觉察', '感受识别', '放松技巧'],
        preparation: ['准备瑜伽垫', '调整室温', '穿着宽松'],
        postSession: ['记录身体感受', '注意放松的部位', '计划下次练习']
      }
    ]
  },
  {
    id: 'stress-relief',
    title: '压力释放冥想',
    description: '专为缓解日常压力和焦虑设计的冥想练习',
    instructor: '王安老师',
    duration: 25,
    difficulty: 'beginner',
    category: 'stress_relief',
    tags: ['压力', '放松', '焦虑', '平静'],
    thumbnail: '🌊',
    benefits: [
      '快速缓解压力',
      '降低焦虑水平',
      '促进身心放松',
      '改善睡眠质量'
    ],
    sessions: [
      {
        id: 'stress-session-1',
        title: '深度放松法',
        description: '通过渐进式肌肉放松释放身体紧张',
        duration: 12,
        instructions: [
          '舒适地躺下，闭上眼睛',
          '从脚趾开始，依次紧张和放松身体各部位',
          '紧张5秒，然后完全放松',
          '感受紧张和放松的对比'
        ],
        focusPoints: ['肌肉放松', '紧张识别', '对比感受'],
        preparation: ['准备舒适的躺椅', '确保不被打扰', '调暗灯光'],
        postSession: ['缓慢起身', '保持放松状态', '记录感受变化']
      }
    ]
  },
  {
    id: 'sleep-meditation',
    title: '安眠冥想',
    description: '帮助您放松身心，获得深度睡眠的冥想练习',
    instructor: '月光导师',
    duration: 40,
    difficulty: 'beginner',
    category: 'sleep',
    tags: ['睡眠', '放松', '安静', '休息'],
    thumbnail: '🌙',
    benefits: [
      '改善睡眠质量',
      '缩短入睡时间',
      '减少夜间醒来',
      '提高睡眠深度'
    ],
    sessions: [
      {
        id: 'sleep-session-1',
        title: '睡前放松',
        description: '为睡眠做准备的温和放松练习',
        duration: 20,
        instructions: [
          '躺在床上，调整到最舒适的姿势',
          '做几次深呼吸，让身体沉入床铺',
          '想象自己在一个安全宁静的地方',
          '让思绪像云朵一样飘过，不要抓住它们'
        ],
        focusPoints: ['身体放松', '心理平静', '睡眠准备'],
        preparation: ['调整室温', '关闭强光', '准备睡眠环境'],
        postSession: ['保持放松', '避免看屏幕', '自然进入睡眠']
      }
    ]
  },
  {
    id: 'focus-enhancement',
    title: '专注力提升',
    description: '通过专注力训练提高工作和学习效率',
    instructor: '专注大师',
    duration: 20,
    difficulty: 'intermediate',
    category: 'focus',
    tags: ['专注', '效率', '工作', '学习'],
    thumbnail: '🎯',
    benefits: [
      '提高工作效率',
      '增强学习能力',
      '减少分心',
      '提升决策质量'
    ],
    sessions: [
      {
        id: 'focus-session-1',
        title: '单点专注',
        description: '通过专注单一对象来训练注意力',
        duration: 15,
        instructions: [
          '选择一个专注对象（如呼吸、烛火或声音）',
          '将全部注意力集中在这个对象上',
          '当注意力分散时，轻柔地将其带回',
          '逐渐延长专注的时间'
        ],
        focusPoints: ['注意力集中', '分心管理', '专注持续'],
        preparation: ['选择专注对象', '消除干扰', '设定练习时间'],
        postSession: ['评估专注质量', '记录进步', '应用到工作中']
      }
    ]
  }
];

// 环境音效数据
export const ambientSounds: AmbientSound[] = [
  {
    id: 'rain',
    name: '雨声',
    description: '温和的雨滴声，营造宁静的氛围',
    audioUrl: '/sounds/rain.mp3',
    category: 'nature',
    volume: 70,
    loop: true
  },
  {
    id: 'forest',
    name: '森林',
    description: '鸟鸣和风声的自然交响',
    audioUrl: '/sounds/forest.mp3',
    category: 'nature',
    volume: 60,
    loop: true
  },
  {
    id: 'ocean',
    name: '海浪',
    description: '舒缓的海浪拍打声',
    audioUrl: '/sounds/ocean.mp3',
    category: 'nature',
    volume: 65,
    loop: true
  },
  {
    id: 'singing-bowl',
    name: '颂钵',
    description: '西藏颂钵的神圣音频',
    audioUrl: '/sounds/singing-bowl.mp3',
    category: 'instrumental',
    volume: 50,
    loop: true
  },
  {
    id: 'binaural-alpha',
    name: 'α波双耳节拍',
    description: '促进放松的8-12Hz双耳节拍',
    audioUrl: '/sounds/binaural-alpha.mp3',
    category: 'binaural',
    volume: 40,
    loop: true
  },
  {
    id: 'silence',
    name: '纯静音',
    description: '完全的静音环境',
    audioUrl: '',
    category: 'silence',
    volume: 0,
    loop: true
  }
];

// 呼吸练习数据
export const breathingExercises: BreathingExercise[] = [
  {
    id: '4-7-8-breathing',
    name: '4-7-8呼吸法',
    description: '著名的安神呼吸技巧，有助于快速放松',
    pattern: {
      inhale: 4,
      hold: 7,
      exhale: 8,
      pause: 0
    },
    cycles: 4,
    totalDuration: 76,
    benefits: [
      '快速缓解焦虑',
      '改善睡眠质量',
      '降低血压',
      '平静心境'
    ],
    instructions: [
      '舒适地坐着，脊椎挺直',
      '用鼻子吸气4秒',
      '屏住呼吸7秒',
      '用嘴巴呼气8秒',
      '重复4个循环'
    ],
    visualization: '想象吸入平静的蓝色光芒，呼出所有紧张和压力'
  },
  {
    id: 'box-breathing',
    name: '方形呼吸',
    description: '四拍等长呼吸，用于提高专注力',
    pattern: {
      inhale: 4,
      hold: 4,
      exhale: 4,
      pause: 4
    },
    cycles: 8,
    totalDuration: 128,
    benefits: [
      '提高专注力',
      '增强自控力',
      '减少压力',
      '平衡神经系统'
    ],
    instructions: [
      '坐直，双脚平放地面',
      '吸气4秒',
      '屏气4秒',
      '呼气4秒',
      '停顿4秒',
      '重复8次'
    ],
    visualization: '想象在画一个完美的正方形，每条边代表呼吸的一个阶段'
  },
  {
    id: 'coherent-breathing',
    name: '相干呼吸',
    description: '5秒吸气5秒呼气，平衡自主神经系统',
    pattern: {
      inhale: 5,
      hold: 0,
      exhale: 5,
      pause: 0
    },
    cycles: 12,
    totalDuration: 120,
    benefits: [
      '平衡神经系统',
      '提高心率变异性',
      '增强情绪稳定性',
      '改善认知功能'
    ],
    instructions: [
      '找一个舒适的姿势',
      '缓慢吸气5秒',
      '缓慢呼气5秒',
      '保持呼吸的平稳和深度',
      '重复12个循环'
    ],
    visualization: '想象呼吸如波浪般平稳有规律地流动'
  }
];

// 成就系统数据
export const achievements: Achievement[] = [
  {
    id: 'first-session',
    title: '冥想初体验',
    description: '完成第一次冥想练习',
    icon: '🌱',
    unlockedAt: new Date(),
    category: 'milestone',
    requirement: '完成1次冥想'
  },
  {
    id: 'week-streak',
    title: '七日坚持',
    description: '连续七天进行冥想练习',
    icon: '🔥',
    unlockedAt: new Date(),
    category: 'streak',
    requirement: '连续7天冥想'
  },
  {
    id: 'hour-master',
    title: '一小时冥想师',
    description: '累计冥想时间达到60分钟',
    icon: '⏰',
    unlockedAt: new Date(),
    category: 'duration',
    requirement: '累计60分钟'
  },
  {
    id: 'course-complete',
    title: '课程毕业生',
    description: '完成第一个完整的冥想课程',
    icon: '🎓',
    unlockedAt: new Date(),
    category: 'course',
    requirement: '完成1个课程'
  },
  {
    id: 'mindful-month',
    title: '正念一月',
    description: '连续30天进行冥想练习',
    icon: '🏆',
    unlockedAt: new Date(),
    category: 'streak',
    requirement: '连续30天冥想'
  },
  {
    id: 'zen-master',
    title: '禅修大师',
    description: '累计冥想时间达到1000分钟',
    icon: '🧘‍♂️',
    unlockedAt: new Date(),
    category: 'duration',
    requirement: '累计1000分钟'
  }
];

// 冥想类别数据
export const meditationCategories = [
  {
    id: 'mindfulness',
    name: '正念冥想',
    description: '培养当下觉察，观察思绪和感受',
    icon: '🧠',
    color: 'from-blue-500 to-blue-600',
    benefits: ['提高专注力', '减少焦虑', '增强自我觉察']
  },
  {
    id: 'breathing',
    name: '呼吸冥想',
    description: '通过专注呼吸达到平静状态',
    icon: '🌬️',
    color: 'from-green-500 to-green-600',
    benefits: ['调节情绪', '降低血压', '改善睡眠']
  },
  {
    id: 'body_scan',
    name: '身体扫描',
    description: '系统性地感受身体各部位',
    icon: '🎯',
    color: 'from-purple-500 to-purple-600',
    benefits: ['释放紧张', '提高身体觉察', '深度放松']
  },
  {
    id: 'loving_kindness',
    name: '慈爱冥想',
    description: '培养对自己和他人的慈爱之心',
    icon: '💝',
    color: 'from-pink-500 to-pink-600',
    benefits: ['增强同理心', '改善人际关系', '提升幸福感']
  },
  {
    id: 'visualization',
    name: '观想冥想',
    description: '通过想象场景达到特定状态',
    icon: '🌈',
    color: 'from-indigo-500 to-indigo-600',
    benefits: ['增强创造力', '实现目标', '情绪调节']
  },
  {
    id: 'movement',
    name: '动态冥想',
    description: '结合身体动作的冥想练习',
    icon: '🕺',
    color: 'from-orange-500 to-orange-600',
    benefits: ['身心协调', '释放能量', '提高灵活性']
  },
  {
    id: 'sleep',
    name: '睡眠冥想',
    description: '帮助放松身心，改善睡眠质量',
    icon: '🌙',
    color: 'from-blue-600 to-indigo-700',
    benefits: ['改善睡眠', '缓解失眠', '深度休息']
  },
  {
    id: 'stress_relief',
    name: '压力释放',
    description: '专门针对压力和焦虑的冥想',
    icon: '🌊',
    color: 'from-teal-500 to-teal-600',
    benefits: ['缓解压力', '减少焦虑', '恢复平静']
  }
];

// 冥想引导语
export const meditationGuidances = {
  mindfulness: [
    "将注意力温和地带回到当下这一刻",
    "观察你的思绪，如同观察天空中飘过的云朵",
    "不要试图控制或改变什么，只是纯粹地觉察",
    "当你注意到走神时，温和地将注意力带回到呼吸上"
  ],
  breathing: [
    "感受空气流入鼻孔时的清凉",
    "让呼吸自然而然地发生，不要强迫",
    "每一次呼气，让紧张和压力随之离开身体",
    "用呼吸连接身体和心灵"
  ],
  body_scan: [
    "从头顶开始，慢慢感受身体的每一个部位",
    "注意任何感觉，温度，或者紧张的区域",
    "不要试图改变什么，只是观察和接纳",
    "让放松从头顶慢慢传遍全身"
  ],
  sleep: [
    "让身体完全沉入床铺中",
    "想象自己在一个安全温暖的地方",
    "让每一次呼气都带走白天的疲惫",
    "允许睡意自然地降临"
  ]
};

// 冥想数据库
export const meditationDatabase = {
  courses: meditationCourses,
  ambientSounds,
  breathingExercises,
  achievements,
  categories: meditationCategories,
  guidances: meditationGuidances
};