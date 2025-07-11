import { ZodiacSign, AstrologyResult } from '../types';
import { ZODIAC_DATA } from '../data/zodiacData';

/**
 * 星座计算工具
 */
export class AstrologyCalculator {
  private static instance: AstrologyCalculator;
  
  public static getInstance(): AstrologyCalculator {
    if (!AstrologyCalculator.instance) {
      AstrologyCalculator.instance = new AstrologyCalculator();
    }
    return AstrologyCalculator.instance;
  }

  /**
   * 根据出生日期计算太阳星座
   */
  calculateSunSign(birthDate: string): ZodiacSign {
    const date = new Date(birthDate);
    const month = date.getMonth() + 1; // JavaScript月份从0开始
    const day = date.getDate();

    // 星座日期范围（使用标准西方占星学日期）
    const zodiacRanges = [
      { sign: 'capricorn' as ZodiacSign, start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
      { sign: 'aquarius' as ZodiacSign, start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
      { sign: 'pisces' as ZodiacSign, start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
      { sign: 'aries' as ZodiacSign, start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
      { sign: 'taurus' as ZodiacSign, start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
      { sign: 'gemini' as ZodiacSign, start: { month: 5, day: 21 }, end: { month: 6, day: 20 } },
      { sign: 'cancer' as ZodiacSign, start: { month: 6, day: 21 }, end: { month: 7, day: 22 } },
      { sign: 'leo' as ZodiacSign, start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
      { sign: 'virgo' as ZodiacSign, start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
      { sign: 'libra' as ZodiacSign, start: { month: 9, day: 23 }, end: { month: 10, day: 22 } },
      { sign: 'scorpio' as ZodiacSign, start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
      { sign: 'sagittarius' as ZodiacSign, start: { month: 11, day: 22 }, end: { month: 12, day: 21 } },
    ];

    for (const range of zodiacRanges) {
      if (this.isDateInRange(month, day, range.start, range.end)) {
        return range.sign;
      }
    }

    // 默认返回摩羯座（不应该到达这里）
    return 'capricorn';
  }

  /**
   * 检查日期是否在指定范围内
   */
  private isDateInRange(
    month: number, 
    day: number, 
    start: { month: number; day: number }, 
    end: { month: number; day: number }
  ): boolean {
    // 处理跨年的情况（如摩羯座）
    if (start.month > end.month) {
      return (
        (month === start.month && day >= start.day) ||
        (month === end.month && day <= end.day) ||
        (month > start.month || month < end.month)
      );
    } else {
      return (
        (month === start.month && day >= start.day) ||
        (month === end.month && day <= end.day) ||
        (month > start.month && month < end.month)
      );
    }
  }

  /**
   * 生成完整的星座分析结果
   */
  generateAstrologyResult(birthDate: string): AstrologyResult {
    const sunSign = this.calculateSunSign(birthDate);
    const zodiacInfo = ZODIAC_DATA[sunSign];

    // 生成个性化的特质描述
    const traits = this.generatePersonalizedTraits(zodiacInfo);
    
    // 生成兼容星座
    const compatibility = zodiacInfo.compatibility.best.concat(zodiacInfo.compatibility.good);

    return {
      sunSign,
      element: zodiacInfo.element,
      quality: zodiacInfo.quality,
      rulingPlanet: zodiacInfo.rulingPlanet,
      birthDate,
      traits,
      compatibility,
      luckyNumbers: zodiacInfo.luckyNumbers,
      luckyColors: zodiacInfo.luckyColors,
      completedAt: new Date()
    };
  }

  /**
   * 生成个性化特质描述
   */
  private generatePersonalizedTraits(zodiacInfo: any): string[] {
    const traits = [];
    
    // 添加正面特质
    traits.push(`你具有${zodiacInfo.traits.positive.slice(0, 3).join('、')}的特质`);
    
    // 添加元素特质
    const elementTraits = {
      fire: '你充满热情和活力，喜欢冒险和挑战',
      earth: '你务实稳重，注重安全感和物质基础',
      air: '你思维敏捷，善于沟通和社交',
      water: '你情感丰富，直觉敏锐，富有同情心'
    };
    traits.push(elementTraits[zodiacInfo.element]);

    // 添加品质特质
    const qualityTraits = {
      cardinal: '你是天生的领导者，善于开创新局面',
      fixed: '你意志坚定，有持久力，但有时过于固执',
      mutable: '你适应能力强，灵活变通，但有时缺乏专注'
    };
    traits.push(qualityTraits[zodiacInfo.quality]);

    // 添加职业建议
    traits.push(`在职业方面，你适合从事${zodiacInfo.career.slice(0, 2).join('或')}等工作`);

    return traits;
  }

  /**
   * 计算星座兼容性
   */
  calculateCompatibility(sign1: ZodiacSign, sign2: ZodiacSign): {
    score: number;
    level: 'excellent' | 'good' | 'average' | 'challenging';
    description: string;
  } {
    const zodiac1 = ZODIAC_DATA[sign1];
    const zodiac2 = ZODIAC_DATA[sign2];

    let score = 50; // 基础分数
    let level: 'excellent' | 'good' | 'average' | 'challenging' = 'average';

    // 检查兼容性等级
    if (zodiac1.compatibility.best.includes(sign2)) {
      score = 90;
      level = 'excellent';
    } else if (zodiac1.compatibility.good.includes(sign2)) {
      score = 75;
      level = 'good';
    } else if (zodiac1.compatibility.challenging.includes(sign2)) {
      score = 30;
      level = 'challenging';
    }

    // 元素兼容性调整
    if (zodiac1.element === zodiac2.element) {
      score += 10; // 同元素加分
    } else if (this.areElementsCompatible(zodiac1.element, zodiac2.element)) {
      score += 5; // 兼容元素加分
    }

    // 品质兼容性调整
    if (zodiac1.quality === zodiac2.quality) {
      score += 5;
    }

    // 确保分数在合理范围内
    score = Math.min(100, Math.max(0, score));

    const descriptions = {
      excellent: '你们是天作之合，在各方面都非常契合，能够相互理解和支持。',
      good: '你们有很好的兼容性，虽然偶有分歧，但总体和谐。',
      average: '你们的关系需要更多的理解和包容，通过努力可以建立良好关系。',
      challenging: '你们的性格差异较大，需要更多的耐心和妥协才能和谐相处。'
    };

    return {
      score,
      level,
      description: descriptions[level]
    };
  }

  /**
   * 检查元素是否兼容
   */
  private areElementsCompatible(element1: string, element2: string): boolean {
    const compatiblePairs = [
      ['fire', 'air'],
      ['earth', 'water']
    ];

    return compatiblePairs.some(pair => 
      (pair.includes(element1) && pair.includes(element2))
    );
  }

  /**
   * 获取星座详细信息
   */
  getZodiacInfo(sign: ZodiacSign) {
    return ZODIAC_DATA[sign];
  }

  /**
   * 获取今日运势（简化版）
   */
  getDailyHoroscope(sign: ZodiacSign): {
    overall: string;
    love: string;
    career: string;
    health: string;
    luckyColor: string;
    luckyNumber: number;
  } {
    const zodiacInfo = ZODIAC_DATA[sign];
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    
    // 使用日期作为种子生成伪随机运势
    const seed = dayOfYear + sign.length;
    
    const overallMessages = [
      '今天是充满机遇的一天，保持积极的心态。',
      '今天适合专注于重要的事情，避免分心。',
      '今天可能会有意外的惊喜，保持开放的心态。',
      '今天是反思和规划的好时机。',
      '今天的能量很强，适合推进重要项目。'
    ];

    const loveMessages = [
      '单身者可能会遇到有趣的人，已有伴侣的关系会更加稳定。',
      '今天适合表达感情，诚实的沟通会带来好结果。',
      '在感情中保持耐心，避免冲动的决定。',
      '今天是增进感情的好时机，可以安排浪漫的活动。',
      '关注伴侣的需求，给予更多的关心和支持。'
    ];

    const careerMessages = [
      '工作中可能会有新的机会出现，要积极把握。',
      '今天适合团队合作，集体的力量会带来成功。',
      '专注于细节，认真完成手头的工作。',
      '今天可能会收到重要的消息或反馈。',
      '保持创新思维，尝试新的方法和想法。'
    ];

    const healthMessages = [
      '注意休息，避免过度劳累。',
      '今天适合进行轻松的运动，如散步或瑜伽。',
      '保持良好的饮食习惯，多喝水。',
      '关注心理健康，保持积极乐观的心态。',
      '今天的精力充沛，可以尝试新的健身活动。'
    ];

    return {
      overall: overallMessages[seed % overallMessages.length],
      love: loveMessages[seed % loveMessages.length],
      career: careerMessages[seed % careerMessages.length],
      health: healthMessages[seed % healthMessages.length],
      luckyColor: zodiacInfo.luckyColors[seed % zodiacInfo.luckyColors.length],
      luckyNumber: zodiacInfo.luckyNumbers[seed % zodiacInfo.luckyNumbers.length]
    };
  }
}

// 导出单例实例
export const astrologyCalculator = AstrologyCalculator.getInstance();
