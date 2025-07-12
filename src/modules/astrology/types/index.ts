// 星座分析模块的TypeScript类型定义
export type ZodiacSign = 
  | 'aries' | 'taurus' | 'gemini' | 'cancer' 
  | 'leo' | 'virgo' | 'libra' | 'scorpio' 
  | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

export type Planet = 
  | 'sun' | 'moon' | 'mercury' | 'venus' | 'mars' 
  | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto';

export type Element = 'fire' | 'earth' | 'air' | 'water';
export type Quality = 'cardinal' | 'fixed' | 'mutable';

export interface ZodiacInfo {
  sign: ZodiacSign;
  name: string;
  symbol: string;
  element: Element;
  quality: Quality;
  rulingPlanet: Planet;
  dates: {
    start: { month: number; day: number };
    end: { month: number; day: number };
  };
  description: string;
  traits: {
    positive: string[];
    negative: string[];
  };
  compatibility: {
    best: ZodiacSign[];
    good: ZodiacSign[];
    challenging: ZodiacSign[];
  };
  colors: string[];
  stones: string[];
  luckyNumbers: number[];
  bodyParts: string[];
  keywords: string[];
}

export interface PlanetaryPosition {
  planet: Planet;
  sign: ZodiacSign;
  degree: number;
  minute: number;
  house: number;
  retrograde: boolean;
  aspects: Aspect[];
}

export interface Aspect {
  planet1: Planet;
  planet2: Planet;
  type: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile' | 'quincunx';
  degree: number;
  orb: number;
  applying: boolean;
}

export interface House {
  number: number;
  sign: ZodiacSign;
  cusp: number;
  planets: Planet[];
  ruler: Planet;
  meaning: string;
}

export interface BirthChart {
  id: string;
  userId?: string;
  birthDate: Date;
  birthTime: string;
  birthLocation: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
  };
  sunSign: ZodiacSign;
  moonSign: ZodiacSign;
  ascendant: ZodiacSign;
  midheaven: ZodiacSign;
  planetaryPositions: PlanetaryPosition[];
  houses: House[];
  aspects: Aspect[];
  dominantElement: Element;
  dominantQuality: Quality;
  chartRuler: Planet;
  createdAt: Date;
}

export interface AstrologyResult {
  id: string;
  userId?: string;
  birthChart: BirthChart;
  personality: PersonalityAnalysis;
  love: LoveAnalysis;
  career: CareerAnalysis;
  health: HealthAnalysis;
  fortune: FortuneAnalysis;
  currentTransits: Transit[];
  recommendations: string[];
  completedAt: Date;
}

export interface PersonalityAnalysis {
  overview: string;
  strengths: string[];
  challenges: string[];
  motivations: string[];
  fears: string[];
  communicationStyle: string;
  emotionalNature: string;
  mentalApproach: string;
  physicalExpression: string;
}

export interface LoveAnalysis {
  romanticStyle: string;
  idealPartner: string;
  relationshipChallenges: string[];
  compatibleSigns: ZodiacSign[];
  loveAdvice: string[];
  venusSignInfluence: string;
  marsSignInfluence: string;
}

export interface CareerAnalysis {
  workStyle: string;
  idealCareers: string[];
  workEnvironment: string;
  leadershipStyle: string;
  careerChallenges: string[];
  success: string[];
  midheaven: string;
}

export interface HealthAnalysis {
  constitution: string;
  healthStrengths: string[];
  vulnerabilities: string[];
  stressManagement: string[];
  fitnessRecommendations: string[];
  nutritionAdvice: string[];
}

export interface FortuneAnalysis {
  generalFortune: string;
  luckyPeriods: string[];
  challengingPeriods: string[];
  opportunities: string[];
  warnings: string[];
  jupiterInfluence: string;
  saturnInfluence: string;
}

export interface Transit {
  planet: Planet;
  type: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile';
  natalPlanet: Planet;
  startDate: Date;
  endDate: Date;
  peakDate: Date;
  influence: string;
  intensity: number; // 1-10
  area: 'love' | 'career' | 'health' | 'finance' | 'family' | 'spirituality';
}

export interface Horoscope {
  sign: ZodiacSign;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  date: Date;
  overall: HoroscopeSection;
  love: HoroscopeSection;
  career: HoroscopeSection;
  health: HoroscopeSection;
  finance: HoroscopeSection;
  family: HoroscopeSection;
  spirituality: HoroscopeSection;
  luckyNumbers: number[];
  luckyColors: string[];
  luckyStones: string[];
  warnings: string[];
  advice: string[];
}

export interface HoroscopeSection {
  rating: number; // 1-5 stars
  description: string;
  highlights: string[];
  challenges: string[];
  advice: string[];
}

export interface ZodiacCompatibility {
  sign1: ZodiacSign;
  sign2: ZodiacSign;
  overallCompatibility: number; // 0-100
  loveCompatibility: number;
  friendshipCompatibility: number;
  businessCompatibility: number;
  elementalHarmony: number;
  qualityHarmony: number;
  planetaryHarmony: number;
  strengths: string[];
  challenges: string[];
  advice: string[];
  famousCouples: string[];
}

export interface LunarPhase {
  phase: 'new' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full' | 'waning-gibbous' | 'third-quarter' | 'waning-crescent';
  date: Date;
  illumination: number; // 0-100%
  sign: ZodiacSign;
  influence: string;
  recommendations: string[];
  manifestationPower: number; // 1-10
  emotionalInfluence: number; // 1-10
}

export interface AstrologyEvent {
  id: string;
  name: string;
  type: 'eclipse' | 'retrograde' | 'new-moon' | 'full-moon' | 'planetary-alignment' | 'season-change';
  date: Date;
  duration?: number; // in days
  affectedSigns: ZodiacSign[];
  influence: string;
  recommendations: string[];
  intensity: number; // 1-10
}

export interface PersonalizedForecast {
  userId: string;
  birthChart: BirthChart;
  period: 'week' | 'month' | 'quarter' | 'year';
  startDate: Date;
  endDate: Date;
  keyThemes: string[];
  majorTransits: Transit[];
  opportunities: string[];
  challenges: string[];
  advice: string[];
  luckyDates: Date[];
  importantDates: Date[];
  monthlyBreakdown?: MonthlyForecast[];
}

export interface MonthlyForecast {
  month: number;
  year: number;
  theme: string;
  highlights: string[];
  challenges: string[];
  advice: string[];
  luckyDates: number[];
  importantTransits: Transit[];
}

export interface AstrologyPreference {
  userId: string;
  preferredSigns: ZodiacSign[];
  interests: ('personality' | 'love' | 'career' | 'health' | 'finance' | 'spirituality')[];
  notifications: {
    dailyHoroscope: boolean;
    weeklyHoroscope: boolean;
    monthlyHoroscope: boolean;
    majorTransits: boolean;
    lunarPhases: boolean;
    astrologicalEvents: boolean;
  };
  timezone: string;
  language: string;
}