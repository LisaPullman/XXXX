export interface Hexagram {
  id: string;
  number: number;
  name: string;
  chineseName: string;
  symbol: string;
  upperTrigram: Trigram;
  lowerTrigram: Trigram;
  description: string;
  judgment: string;
  image: string;
  meaning: {
    general: string;
    love: string;
    career: string;
    health: string;
    finance: string;
    advice: string;
  };
  changingLines: {
    [key: number]: {
      text: string;
      meaning: string;
    };
  };
}

export interface Trigram {
  id: string;
  name: string;
  chineseName: string;
  symbol: string;
  lines: [boolean, boolean, boolean]; // true = yang (实线), false = yin (虚线)
  element: 'heaven' | 'earth' | 'thunder' | 'wind' | 'water' | 'fire' | 'mountain' | 'lake';
  direction: string;
  season: string;
  meaning: string;
}

export interface IChing {
  hexagram: Hexagram;
  changingLines: number[];
  resultingHexagram?: Hexagram;
  question?: string;
  timestamp: Date;
  method: DivinationMethod;
}

export interface IChingResult {
  id: string;
  timestamp: Date;
  question: string;
  method: DivinationMethod;
  originalHexagram: Hexagram;
  changingLines: number[];
  resultingHexagram?: Hexagram;
  interpretation: {
    overview: string;
    currentSituation: string;
    guidance: string;
    outcome: string;
    advice: string[];
  };
  confidence: number;
}

export interface DivinationInput {
  question: string;
  method: DivinationMethod;
  coins?: CoinThrow[];
  yarrow?: YarrowSticks;
  numbers?: number[];
}

export interface CoinThrow {
  throw: number;
  result: 'yin' | 'yang' | 'changingYin' | 'changingYang';
  value: number;
}

export interface YarrowSticks {
  sticks: number;
  divisions: number[];
}

export type DivinationMethod = 'three-coins' | 'yarrow-sticks' | 'numbers' | 'random';

export interface IChingSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  readings: IChingResult[];
  totalReadings: number;
}

export interface IChingHistory {
  sessions: IChingSession[];
  totalReadings: number;
  frequentHexagrams: { hexagram: Hexagram; count: number }[];
  insights: string[];
}

export interface IChingWisdom {
  quote: string;
  source: string;
  explanation: string;
  relevance: string;
}

export interface IChingStudy {
  hexagramId: string;
  studyNotes: string;
  personalInsights: string;
  dateStudied: Date;
  understanding: number; // 1-5 scale
}