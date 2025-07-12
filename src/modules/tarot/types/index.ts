// 塔罗牌数据结构
export interface TarotCard {
  id: string;
  name: string;
  nameEn: string;
  type: 'major' | 'minor';
  number?: number; // 大阿卡纳：0-21，小阿卡纳：1-14
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles'; // 小阿卡纳的花色
  court?: 'page' | 'knight' | 'queen' | 'king'; // 宫廷牌
  element?: 'fire' | 'water' | 'air' | 'earth'; // 对应元素
  keywords: string[];
  description: string;
  upright: {
    meaning: string;
    keywords: string[];
    love: string;
    career: string;
    health: string;
    advice: string;
  };
  reversed: {
    meaning: string;
    keywords: string[];
    love: string;
    career: string;
    health: string;
    advice: string;
  };
  symbolism: string[];
  imageUrl?: string;
  emoji: string;
}

// 塔罗牌阵
export interface TarotSpread {
  id: string;
  name: string;
  description: string;
  positions: {
    id: string;
    name: string;
    description: string;
    x: number; // 相对位置 (0-100)
    y: number; // 相对位置 (0-100)
  }[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'love' | 'career' | 'general' | 'spiritual';
  emoji: string;
}

// 塔罗解读
export interface TarotReading {
  id: string;
  spread: TarotSpread;
  cards: {
    position: string;
    card: TarotCard;
    isReversed: boolean;
  }[];
  question?: string;
  interpretation: {
    overall: string;
    positions: {
      positionId: string;
      interpretation: string;
    }[];
    advice: string;
    summary: string;
  };
  timestamp: Date;
}

// 塔罗学习进度
export interface TarotLearning {
  cardId: string;
  masteryLevel: number; // 0-100
  timesStudied: number;
  lastStudied?: Date;
  notes?: string;
}

// 塔罗日记条目
export interface TarotJournalEntry {
  id: string;
  date: Date;
  question: string;
  cards: {
    card: TarotCard;
    isReversed: boolean;
    interpretation: string;
  }[];
  mood: string;
  outcome?: string;
  reflection?: string;
  tags: string[];
}

// 塔罗成就
export interface TarotAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: {
    type: 'readings_count' | 'cards_learned' | 'streak_days' | 'specific_card';
    value: number | string;
  };
  unlockedAt?: Date;
  progress: number; // 0-100
}

// 每日塔罗
export interface DailyTarot {
  date: string; // YYYY-MM-DD
  card: TarotCard;
  isReversed: boolean;
  message: string;
  energy: string;
  advice: string;
  reflection: string;
}