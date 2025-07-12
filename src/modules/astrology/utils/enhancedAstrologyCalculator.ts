import { ZodiacSign, AstrologyResult } from '../types';
import { ZODIAC_DATA } from '../data/zodiacData';

/**
 * 增强的星座计算工具
 * 提供更精确的计算和丰富的分析功能
 */
export class EnhancedAstrologyCalculator {
  private static instance: EnhancedAstrologyCalculator;
  
  public static getInstance(): EnhancedAstrologyCalculator {
    if (!EnhancedAstrologyCalculator.instance) {
      EnhancedAstrologyCalculator.instance = new EnhancedAstrologyCalculator();
    }
    return EnhancedAstrologyCalculator.instance;
  }

  /**
   * 根据出生日期和时间计算更精确的太阳星座
   * 考虑了星座边界的时间变化
   */
  calculateSunSign(birthDate: string, birthTime?: string): {
    sign: ZodiacSign;
    accuracy: number;
    boundary: boolean;
  } {
    const date = new Date(birthDate + (birthTime ? `T${birthTime}` : 'T12:00'));
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();

    // 更精确的星座日期范围，考虑时间因素
    const zodiacRanges = [
      { 
        sign: 'capricorn' as ZodiacSign, 
        start: { month: 12, day: 22, hour: 5 }, 
        end: { month: 1, day: 19, hour: 23 }
      },
      { 
        sign: 'aquarius' as ZodiacSign, 
        start: { month: 1, day: 20, hour: 0 }, 
        end: { month: 2, day: 18, hour: 23 }
      },
      { 
        sign: 'pisces' as ZodiacSign, 
        start: { month: 2, day: 19, hour: 0 }, 
        end: { month: 3, day: 20, hour: 23 }
      },
      { 
        sign: 'aries' as ZodiacSign, 
        start: { month: 3, day: 21, hour: 0 }, 
        end: { month: 4, day: 19, hour: 23 }
      },
      { 
        sign: 'taurus' as ZodiacSign, 
        start: { month: 4, day: 20, hour: 0 }, 
        end: { month: 5, day: 20, hour: 23 }
      },
      { 
        sign: 'gemini' as ZodiacSign, 
        start: { month: 5, day: 21, hour: 0 }, 
        end: { month: 6, day: 20, hour: 23 }
      },
      { 
        sign: 'cancer' as ZodiacSign, 
        start: { month: 6, day: 21, hour: 0 }, 
        end: { month: 7, day: 22, hour: 23 }
      },
      { 
        sign: 'leo' as ZodiacSign, 
        start: { month: 7, day: 23, hour: 0 }, 
        end: { month: 8, day: 22, hour: 23 }
      },
      { 
        sign: 'virgo' as ZodiacSign, 
        start: { month: 8, day: 23, hour: 0 }, 
        end: { month: 9, day: 22, hour: 23 }
      },
      { 
        sign: 'libra' as ZodiacSign, 
        start: { month: 9, day: 23, hour: 0 }, 
        end: { month: 10, day: 22, hour: 23 }
      },
      { 
        sign: 'scorpio' as ZodiacSign, 
        start: { month: 10, day: 23, hour: 0 }, 
        end: { month: 11, day: 21, hour: 23 }
      },
      { 
        sign: 'sagittarius' as ZodiacSign, 
        start: { month: 11, day: 22, hour: 0 }, 
        end: { month: 12, day: 21, hour: 23 }
      },
    ];

    for (const range of zodiacRanges) {
      if (this.isDateInRangeWithTime(month, day, hour, range.start, range.end)) {
        const accuracy = this.calculateBoundaryAccuracy(month, day, range.start, range.end);
        const boundary = accuracy < 0.9;
        
        return {
          sign: range.sign,
          accuracy,
          boundary
        };
      }
    }

    return {
      sign: 'capricorn',
      accuracy: 0.95,
      boundary: false
    };
  }

  /**
   * 计算星座兼容性
   */
  calculateCompatibility(sign1: ZodiacSign, sign2: ZodiacSign): {
    score: number;
    compatibility: 'excellent' | 'good' | 'fair' | 'challenging';
    description: string;
    details: {
      emotional: number;
      intellectual: number;
      physical: number;
      spiritual: number;
    };
  } {
    const elementMap = {
      'aries': 'fire', 'leo': 'fire', 'sagittarius': 'fire',
      'taurus': 'earth', 'virgo': 'earth', 'capricorn': 'earth',
      'gemini': 'air', 'libra': 'air', 'aquarius': 'air',
      'cancer': 'water', 'scorpio': 'water', 'pisces': 'water'
    };

    const modalityMap = {
      'aries': 'cardinal', 'cancer': 'cardinal', 'libra': 'cardinal', 'capricorn': 'cardinal',
      'taurus': 'fixed', 'leo': 'fixed', 'scorpio': 'fixed', 'aquarius': 'fixed',
      'gemini': 'mutable', 'virgo': 'mutable', 'sagittarius': 'mutable', 'pisces': 'mutable'
    };

    const element1 = elementMap[sign1];
    const element2 = elementMap[sign2];
    const modality1 = modalityMap[sign1];
    const modality2 = modalityMap[sign2];

    // 计算元素兼容性
    const elementScore = this.calculateElementCompatibility(element1, element2);
    
    // 计算模式兼容性
    const modalityScore = this.calculateModalityCompatibility(modality1, modality2);
    
    // 特殊星座配对
    const specialScore = this.calculateSpecialPairCompatibility(sign1, sign2);
    
    // 综合得分
    const overallScore = Math.round((elementScore * 0.4 + modalityScore * 0.3 + specialScore * 0.3));
    
    const compatibility = this.getCompatibilityLevel(overallScore);
    
    return {
      score: overallScore,
      compatibility,
      description: this.getCompatibilityDescription(compatibility, element1, element2),
      details: {
        emotional: this.calculateEmotionalCompatibility(sign1, sign2),
        intellectual: this.calculateIntellectualCompatibility(sign1, sign2),
        physical: this.calculatePhysicalCompatibility(sign1, sign2),
        spiritual: this.calculateSpiritualCompatibility(sign1, sign2)
      }
    };
  }

  /**
   * 生成个性化的星座运势
   */
  generatePersonalizedForecast(
    sign: ZodiacSign, 
    timeframe: 'daily' | 'weekly' | 'monthly',
    birthDate?: string
  ): {
    overall: string;
    love: string;
    career: string;
    health: string;
    finance: string;
    lucky: {
      color: string;
      number: number;
      direction: string;
      time: string;
    };
    advice: string[];
    warnings: string[];
  } {
    const signData = ZODIAC_DATA[sign];
    const seed = this.generateDateSeed(timeframe);
    const personalSeed = birthDate ? this.generatePersonalSeed(birthDate) : seed;
    
    return {
      overall: this.generateOverallForecast(signData, seed, personalSeed),
      love: this.generateLoveForecast(signData, seed, personalSeed),
      career: this.generateCareerForecast(signData, seed, personalSeed),
      health: this.generateHealthForecast(signData, seed, personalSeed),
      finance: this.generateFinanceForecast(signData, seed, personalSeed),
      lucky: this.generateLuckyElements(signData, seed, personalSeed),
      advice: this.generateAdvice(signData, seed, personalSeed),
      warnings: this.generateWarnings(signData, seed, personalSeed)
    };
  }

  /**
   * 分析星座与MBTI的关联性
   */
  analyzeZodiacMBTICorrelation(sign: ZodiacSign): {
    likelyMBTITypes: string[];
    traits: string[];
    explanation: string;
    compatibility: {
      thinking: number;
      feeling: number;
      extraversion: number;
      introversion: number;
    };
  } {
    const correlations = {
      'aries': {
        likelyMBTITypes: ['ESTP', 'ENTJ', 'ENFP'],
        traits: ['领导力', '冒险精神', '直接沟通', '行动导向'],
        explanation: '白羊座的火象能量与外向型人格特征高度匹配，特别是行动派的ESTP和领导型的ENTJ',
        compatibility: { thinking: 75, feeling: 60, extraversion: 85, introversion: 30 }
      },
      'taurus': {
        likelyMBTITypes: ['ISTJ', 'ISFJ', 'ESTJ'],
        traits: ['稳定性', '实用主义', '忠诚', '耐心'],
        explanation: '金牛座的土象特质与感知型人格的稳重务实非常相似，特别体现在ISTJ的可靠性上',
        compatibility: { thinking: 70, feeling: 65, extraversion: 45, introversion: 80 }
      },
      'gemini': {
        likelyMBTITypes: ['ENTP', 'ENFP', 'ESTP'],
        traits: ['好奇心', '适应性', '沟通能力', '多变性'],
        explanation: '双子座的风象特质与直觉型人格的灵活多变相呼应，特别是ENTP的创新思维',
        compatibility: { thinking: 80, feeling: 70, extraversion: 90, introversion: 35 }
      },
      'cancer': {
        likelyMBTITypes: ['ISFJ', 'INFJ', 'ESFJ'],
        traits: ['同理心', '保护欲', '情感丰富', '直觉敏锐'],
        explanation: '巨蟹座的水象能量与情感型人格的关爱天性完美匹配，特别体现在ISFJ的守护者特质',
        compatibility: { thinking: 40, feeling: 95, extraversion: 50, introversion: 75 }
      },
      'leo': {
        likelyMBTITypes: ['ESFP', 'ENFJ', 'ENTJ'],
        traits: ['自信', '表现力', '慷慨', '领导魅力'],
        explanation: '狮子座的火象魅力与外向感受型的表演天赋和领导能力相得益彰',
        compatibility: { thinking: 65, feeling: 85, extraversion: 95, introversion: 25 }
      },
      'virgo': {
        likelyMBTITypes: ['ISTJ', 'INTJ', 'ISFJ'],
        traits: ['完美主义', '分析能力', '服务精神', '细致入微'],
        explanation: '处女座的土象特质与思考型人格的逻辑分析和细致观察能力高度契合',
        compatibility: { thinking: 85, feeling: 60, extraversion: 40, introversion: 85 }
      },
      'libra': {
        likelyMBTITypes: ['ESFJ', 'ENFJ', 'ISFP'],
        traits: ['和谐', '外交能力', '审美', '平衡感'],
        explanation: '天秤座的风象特质与情感型人格的和谐追求和人际敏感度非常相符',
        compatibility: { thinking: 50, feeling: 90, extraversion: 75, introversion: 55 }
      },
      'scorpio': {
        likelyMBTITypes: ['INTJ', 'INFJ', 'ISTP'],
        traits: ['深度', '直觉', '神秘', '洞察力'],
        explanation: '天蝎座的水象深度与内向直觉型的洞察力和神秘气质完美匹配',
        compatibility: { thinking: 70, feeling: 80, extraversion: 30, introversion: 90 }
      },
      'sagittarius': {
        likelyMBTITypes: ['ENFP', 'ENTP', 'ESFP'],
        traits: ['探索精神', '乐观', '哲学思考', '自由'],
        explanation: '射手座的火象自由精神与外向直觉型的理想主义和探索欲望相呼应',
        compatibility: { thinking: 75, feeling: 70, extraversion: 85, introversion: 40 }
      },
      'capricorn': {
        likelyMBTITypes: ['ESTJ', 'ENTJ', 'ISTJ'],
        traits: ['责任感', '目标导向', '传统', '务实'],
        explanation: '摩羯座的土象务实与判断型人格的执行力和目标导向性非常匹配',
        compatibility: { thinking: 90, feeling: 45, extraversion: 60, introversion: 70 }
      },
      'aquarius': {
        likelyMBTITypes: ['INTP', 'ENTP', 'INFP'],
        traits: ['独立', '创新', '人道主义', '未来视角'],
        explanation: '水瓶座的风象革新精神与直觉思考型的原创思维和理想主义相符',
        compatibility: { thinking: 85, feeling: 65, extraversion: 60, introversion: 75 }
      },
      'pisces': {
        likelyMBTITypes: ['INFP', 'ISFP', 'INFJ'],
        traits: ['想象力', '同情心', '艺术性', '灵性'],
        explanation: '双鱼座的水象感性与内向情感型的理想主义和艺术天赋高度匹配',
        compatibility: { thinking: 35, feeling: 95, extraversion: 40, introversion: 85 }
      }
    };

    return correlations[sign];
  }

  /**
   * 生成星座发展建议
   */
  generateDevelopmentAdvice(sign: ZodiacSign): {
    strengths: string[];
    challenges: string[];
    growthAreas: string[];
    practicalTips: string[];
    soulGrowth: string[];
  } {
    const signData = ZODIAC_DATA[sign];
    
    const developmentMap = {
      'aries': {
        strengths: ['天生的领导能力', '勇于开拓新领域', '行动力超强', '乐观积极'],
        challenges: ['过于冲动', '缺乏耐心', '容易半途而废', '不够体贴他人感受'],
        growthAreas: ['培养耐心和毅力', '学会倾听他人', '提高情商', '完善计划能力'],
        practicalTips: ['每天冥想10分钟培养耐心', '在做决定前先数到10', '主动询问他人意见'],
        soulGrowth: ['学会放慢脚步感受生活', '培养同理心', '在行动中寻找内在平静']
      },
      'taurus': {
        strengths: ['稳定可靠', '实用主义', '艺术天赋', '忠诚品质'],
        challenges: ['过于固执', '抗拒变化', '物质主义', '行动缓慢'],
        growthAreas: ['拥抱变化', '培养灵活性', '减少物质依赖', '提高行动效率'],
        practicalTips: ['每周尝试一件新事物', '设定时间限制完成任务', '练习接受不同观点'],
        soulGrowth: ['在稳定中寻求成长', '通过艺术表达内在美', '学会放下控制欲']
      }
      // 可以继续添加其他星座...
    };

    return developmentMap[sign] || {
      strengths: ['独特的个人魅力'],
      challenges: ['需要进一步探索'],
      growthAreas: ['自我认知和发展'],
      practicalTips: ['保持开放心态'],
      soulGrowth: ['追求内在和谐']
    };
  }

  // 私有辅助方法
  private calculateBoundaryAccuracy(
    month: number, 
    day: number, 
    start: { month: number; day: number; hour: number }, 
    end: { month: number; day: number; hour: number }
  ): number {
    const isNearStartBoundary = (month === start.month && Math.abs(day - start.day) <= 1);
    const isNearEndBoundary = (month === end.month && Math.abs(day - end.day) <= 1);
    
    if (isNearStartBoundary || isNearEndBoundary) {
      return 0.75;
    }
    
    return 0.95;
  }

  private isDateInRangeWithTime(
    month: number, 
    day: number, 
    hour: number,
    start: { month: number; day: number; hour: number }, 
    end: { month: number; day: number; hour: number }
  ): boolean {
    if (start.month > end.month) {
      return (
        (month === start.month && (day > start.day || (day === start.day && hour >= start.hour))) ||
        (month > start.month) ||
        (month < end.month) ||
        (month === end.month && (day < end.day || (day === end.day && hour <= end.hour)))
      );
    }
    
    return (
      (month === start.month && (day > start.day || (day === start.day && hour >= start.hour))) ||
      (month > start.month && month < end.month) ||
      (month === end.month && (day < end.day || (day === end.day && hour <= end.hour)))
    );
  }

  private calculateElementCompatibility(element1: string, element2: string): number {
    const compatibility = {
      'fire-fire': 85, 'fire-air': 80, 'fire-earth': 60, 'fire-water': 45,
      'earth-earth': 85, 'earth-water': 75, 'earth-air': 55, 'earth-fire': 60,
      'air-air': 85, 'air-fire': 80, 'air-water': 50, 'air-earth': 55,
      'water-water': 85, 'water-earth': 75, 'water-fire': 45, 'water-air': 50
    };
    
    return compatibility[`${element1}-${element2}` as keyof typeof compatibility] || 50;
  }

  private calculateModalityCompatibility(modality1: string, modality2: string): number {
    if (modality1 === modality2) return 80;
    if ((modality1 === 'cardinal' && modality2 === 'mutable') || 
        (modality1 === 'mutable' && modality2 === 'cardinal')) return 70;
    return 60;
  }

  private calculateSpecialPairCompatibility(sign1: ZodiacSign, sign2: ZodiacSign): number {
    const specialPairs = {
      'aries-libra': 85, 'taurus-scorpio': 80, 'gemini-sagittarius': 85,
      'cancer-capricorn': 75, 'leo-aquarius': 70, 'virgo-pisces': 78
    };
    
    const key1 = `${sign1}-${sign2}`;
    const key2 = `${sign2}-${sign1}`;
    
    return specialPairs[key1 as keyof typeof specialPairs] || 
           specialPairs[key2 as keyof typeof specialPairs] || 65;
  }

  private getCompatibilityLevel(score: number): 'excellent' | 'good' | 'fair' | 'challenging' {
    if (score >= 80) return 'excellent';
    if (score >= 65) return 'good';
    if (score >= 50) return 'fair';
    return 'challenging';
  }

  private getCompatibilityDescription(
    level: 'excellent' | 'good' | 'fair' | 'challenging', 
    element1: string, 
    element2: string
  ): string {
    const descriptions = {
      excellent: `${element1}和${element2}元素的能量高度和谐，你们很容易理解彼此的内在动机`,
      good: `${element1}和${element2}元素形成很好的互补关系，能够相互支持和启发`,
      fair: `${element1}和${element2}元素需要更多的理解和适应，但有很好的成长潜力`,
      challenging: `${element1}和${element2}元素的差异较大，需要更多耐心和努力来建立和谐关系`
    };
    
    return descriptions[level];
  }

  private calculateEmotionalCompatibility(sign1: ZodiacSign, sign2: ZodiacSign): number {
    const emotionalElements = { water: 90, fire: 75, earth: 60, air: 70 };
    const element1 = this.getElement(sign1);
    const element2 = this.getElement(sign2);
    return Math.round((emotionalElements[element1] + emotionalElements[element2]) / 2);
  }

  private calculateIntellectualCompatibility(sign1: ZodiacSign, sign2: ZodiacSign): number {
    const intellectualElements = { air: 90, fire: 80, earth: 70, water: 65 };
    const element1 = this.getElement(sign1);
    const element2 = this.getElement(sign2);
    return Math.round((intellectualElements[element1] + intellectualElements[element2]) / 2);
  }

  private calculatePhysicalCompatibility(sign1: ZodiacSign, sign2: ZodiacSign): number {
    const physicalElements = { fire: 90, earth: 85, water: 70, air: 75 };
    const element1 = this.getElement(sign1);
    const element2 = this.getElement(sign2);
    return Math.round((physicalElements[element1] + physicalElements[element2]) / 2);
  }

  private calculateSpiritualCompatibility(sign1: ZodiacSign, sign2: ZodiacSign): number {
    const spiritualElements = { water: 90, air: 85, fire: 75, earth: 65 };
    const element1 = this.getElement(sign1);
    const element2 = this.getElement(sign2);
    return Math.round((spiritualElements[element1] + spiritualElements[element2]) / 2);
  }

  private getElement(sign: ZodiacSign): 'fire' | 'earth' | 'air' | 'water' {
    const elements = {
      'aries': 'fire', 'leo': 'fire', 'sagittarius': 'fire',
      'taurus': 'earth', 'virgo': 'earth', 'capricorn': 'earth',
      'gemini': 'air', 'libra': 'air', 'aquarius': 'air',
      'cancer': 'water', 'scorpio': 'water', 'pisces': 'water'
    };
    return elements[sign];
  }

  private generateDateSeed(timeframe: 'daily' | 'weekly' | 'monthly'): number {
    const now = new Date();
    switch (timeframe) {
      case 'daily': return now.getDate() + now.getMonth() * 31;
      case 'weekly': return Math.floor(now.getTime() / (7 * 24 * 60 * 60 * 1000));
      case 'monthly': return now.getMonth() + now.getFullYear() * 12;
    }
  }

  private generatePersonalSeed(birthDate: string): number {
    const date = new Date(birthDate);
    return date.getDate() + date.getMonth() * 31;
  }

  private generateOverallForecast(signData: any, seed: number, personalSeed: number): string {
    const themes = [
      `作为${signData.name}，你的${signData.element}能量今天特别活跃，适合发挥自然优势`,
      `宇宙能量与你的${signData.name}本质产生和谐共振，带来积极的变化`,
      `今天你的${signData.traits[0]}特质将成为最大的优势，好好利用这股能量`
    ];
    return themes[(seed + personalSeed) % themes.length];
  }

  private generateLoveForecast(signData: any, seed: number, personalSeed: number): string {
    const themes = [
      '感情运势稳定上升，真诚的表达将打动对方的心',
      '今天特别适合深度沟通，分享内心的真实想法',
      '爱情能量围绕着你，保持开放的心态迎接美好'
    ];
    return themes[(seed + personalSeed) % themes.length];
  }

  private generateCareerForecast(signData: any, seed: number, personalSeed: number): string {
    const themes = [
      '工作中的创意想法将得到认可，是展现才华的好时机',
      '团队合作运势佳，与同事的配合将产生1+1>2的效果',
      '今天适合主动承担挑战，你的能力将在困难中闪闪发光'
    ];
    return themes[(seed + personalSeed) % themes.length];
  }

  private generateHealthForecast(signData: any, seed: number, personalSeed: number): string {
    const themes = [
      '整体健康状况良好，适合进行适度的户外运动',
      '注意劳逸结合，给身心都留出休息的时间',
      '今天特别适合进行冥想或瑜伽，平衡内在能量'
    ];
    return themes[(seed + personalSeed) % themes.length];
  }

  private generateFinanceForecast(signData: any, seed: number, personalSeed: number): string {
    const themes = [
      '财运平稳上升，理性的投资决策将带来回报',
      '今天有机会发现新的收入来源，保持敏锐的观察力',
      '适合制定长期的财务规划，为未来做好准备'
    ];
    return themes[(seed + personalSeed) % themes.length];
  }

  private generateLuckyElements(signData: any, seed: number, personalSeed: number): {
    color: string;
    number: number;
    direction: string;
    time: string;
  } {
    const colors = signData.colors || ['红色', '蓝色', '绿色', '紫色', '金色'];
    const directions = ['东方', '南方', '西方', '北方', '东南', '西南', '东北', '西北'];
    const times = ['早晨6-9点', '上午9-12点', '下午1-4点', '傍晚5-8点', '夜晚8-11点'];
    
    const index = (seed + personalSeed) % colors.length;
    
    return {
      color: colors[index],
      number: (index % 9) + 1,
      direction: directions[index % directions.length],
      time: times[index % times.length]
    };
  }

  private generateAdvice(signData: any, seed: number, personalSeed: number): string[] {
    const advicePool = [
      '保持内心的平静，让直觉指引你的决定',
      '今天适合主动出击，不要等待机会自己来敲门',
      '与他人的交流中保持真诚，真实的你最有魅力',
      '给自己一些独处的时间，聆听内心的声音',
      '勇于表达自己的想法，你的观点很有价值'
    ];
    
    const selected = [];
    for (let i = 0; i < 3; i++) {
      selected.push(advicePool[(seed + personalSeed + i) % advicePool.length]);
    }
    
    return selected;
  }

  private generateWarnings(signData: any, seed: number, personalSeed: number): string[] {
    const warningPool = [
      '避免在情绪激动时做重要决定',
      '注意不要过度承诺，量力而行',
      '今天可能容易与人产生误解，多一些耐心',
      '避免冲动消费，理性对待金钱',
      '不要忽视身体发出的信号，适当休息'
    ];
    
    const selected = [];
    for (let i = 0; i < 2; i++) {
      selected.push(warningPool[(seed + personalSeed + i) % warningPool.length]);
    }
    
    return selected;
  }
}

// 保持原有的AstrologyCalculator作为向后兼容
export { AstrologyCalculator } from './astrologyCalculator';