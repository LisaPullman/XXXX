import { BloodTypeTestResult, BloodTypeCompatibilityResult, BloodTypeHealthRisk } from '../types';
import { bloodTypeDatabase, getBloodTypeCompatibility, getHealthRisk, getDailyAdvice } from '../data/bloodTypeData';

// 血型分析核心算法类
export class BloodTypeCalculator {
  
  /**
   * 根据血型获取完整的分析结果
   * @param bloodType 血型 ('A' | 'B' | 'O' | 'AB')
   * @returns 完整的血型分析结果
   */
  static analyzeBloodType(bloodType: 'A' | 'B' | 'O' | 'AB'): BloodTypeTestResult {
    const data = bloodTypeDatabase[bloodType];
    
    if (!data) {
      throw new Error(`Invalid blood type: ${bloodType}`);
    }

    return {
      bloodType: {
        type: data.type,
        name: data.name,
        emoji: data.emoji,
        description: data.description
      },
      personality: data.personality,
      career: data.career,
      health: data.health,
      lifestyle: data.lifestyle,
      relationships: data.relationships,
      compatibility: data.compatibility,
      dailyAdvice: data.dailyAdvice,
      motto: data.motto,
      color: data.color,
      gradient: data.gradient
    };
  }

  /**
   * 计算两个血型的配对指数
   * @param type1 第一个血型
   * @param type2 第二个血型
   * @returns 配对分析结果
   */
  static calculateCompatibility(
    type1: 'A' | 'B' | 'O' | 'AB',
    type2: 'A' | 'B' | 'O' | 'AB'
  ): BloodTypeCompatibilityResult {
    return getBloodTypeCompatibility(type1, type2);
  }

  /**
   * 获取健康风险评估
   * @param bloodType 血型
   * @returns 健康风险评估结果
   */
  static assessHealthRisk(bloodType: 'A' | 'B' | 'O' | 'AB'): BloodTypeHealthRisk {
    return getHealthRisk(bloodType);
  }

  /**
   * 获取每日建议
   * @param bloodType 血型
   * @returns 每日建议
   */
  static getDailyAdvice(bloodType: 'A' | 'B' | 'O' | 'AB'): string {
    return getDailyAdvice(bloodType);
  }

  /**
   * 根据性格特征推荐血型（趣味功能）
   * @param traits 性格特征关键词
   * @returns 最匹配的血型
   */
  static recommendBloodType(traits: string[]): {
    bloodType: 'A' | 'B' | 'O' | 'AB';
    confidence: number;
    reason: string;
  } {
    const scores = { A: 0, B: 0, O: 0, AB: 0 };
    
    traits.forEach(trait => {
      Object.entries(bloodTypeDatabase).forEach(([type, data]) => {
        if (data.personality.keywords.some(keyword => 
          keyword.toLowerCase().includes(trait.toLowerCase()) ||
          trait.toLowerCase().includes(keyword.toLowerCase())
        )) {
          scores[type as keyof typeof scores] += 1;
        }
      });
    });

    const maxScore = Math.max(...Object.values(scores));
    const recommendedType = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] as 'A' | 'B' | 'O' | 'AB';
    
    const confidence = maxScore / traits.length;
    const reason = `基于你的性格特征 ${traits.join('、')}，${bloodTypeDatabase[recommendedType].name} 的特征与你最为匹配。`;

    return {
      bloodType: recommendedType,
      confidence: Math.round(confidence * 100),
      reason
    };
  }

  /**
   * 生成血型分析报告摘要
   * @param bloodType 血型
   * @returns 分析报告摘要
   */
  static generateSummary(bloodType: 'A' | 'B' | 'O' | 'AB'): {
    personality: string;
    career: string;
    health: string;
    relationships: string;
    overall: string;
  } {
    const data = bloodTypeDatabase[bloodType];
    
    return {
      personality: `${data.name}的人${data.personality.core}主要特征包括${data.personality.keywords.slice(0, 3).join('、')}。`,
      career: `在职业发展上，${data.career.advice}`,
      health: `健康方面需要注意${data.health.diseases.slice(0, 2).join('、')}等疾病风险。`,
      relationships: `人际关系中，${data.relationships.communication}`,
      overall: `总体而言，${data.name}的人${data.motto}`
    };
  }

  /**
   * 计算血型稀有度
   * @param bloodType 血型
   * @returns 稀有度信息
   */
  static getBloodTypeRarity(bloodType: 'A' | 'B' | 'O' | 'AB'): {
    percentage: number;
    rank: number;
    description: string;
  } {
    const rarityData = {
      O: { percentage: 46, rank: 1, description: '最常见的血型' },
      A: { percentage: 40, rank: 2, description: '较常见的血型' },
      B: { percentage: 11, rank: 3, description: '相对少见的血型' },
      AB: { percentage: 3, rank: 4, description: '最稀有的血型' }
    };

    return rarityData[bloodType];
  }

  /**
   * 获取血型与星座的关联分析
   * @param bloodType 血型
   * @param zodiacSign 星座
   * @returns 关联分析结果
   */
  static analyzeBloodTypeZodiac(
    bloodType: 'A' | 'B' | 'O' | 'AB',
    zodiacSign: string
  ): {
    compatibility: number;
    description: string;
    advice: string;
  } {
    // 简化的血型-星座关联算法
    const bloodTypeScores = { A: 1, B: 2, O: 3, AB: 4 };
    const zodiacHash = zodiacSign.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const compatibility = ((bloodTypeScores[bloodType] * zodiacHash) % 100) + 1;
    
    let description = '';
    let advice = '';
    
    if (compatibility >= 80) {
      description = '你的血型与星座特质高度契合，性格表现会更加突出。';
      advice = '发挥你的天赋特质，但也要注意平衡发展。';
    } else if (compatibility >= 60) {
      description = '你的血型与星座特质相互影响，创造出独特的个性。';
      advice = '利用这种独特性，在人际关系中展现你的魅力。';
    } else {
      description = '你的血型与星座特质存在一定冲突，可能会有内心矛盾。';
      advice = '学会接受并平衡这些不同的特质，让它们成为你的优势。';
    }

    return { compatibility, description, advice };
  }

  /**
   * 生成血型运势
   * @param bloodType 血型
   * @param date 日期
   * @returns 运势信息
   */
  static generateFortune(bloodType: 'A' | 'B' | 'O' | 'AB', date: Date = new Date()): {
    overall: number;
    love: number;
    career: number;
    health: number;
    money: number;
    advice: string;
  } {
    const data = bloodTypeDatabase[bloodType];
    const seed = date.getTime() + bloodType.charCodeAt(0);
    
    // 使用简单的伪随机数生成器
    const random = (min: number, max: number) => {
      const x = Math.sin(seed) * 10000;
      const normalized = x - Math.floor(x);
      return Math.floor(normalized * (max - min + 1)) + min;
    };

    const fortune = {
      overall: random(60, 95),
      love: random(50, 100),
      career: random(55, 90),
      health: random(60, 95),
      money: random(45, 85),
      advice: data.dailyAdvice[date.getDate() % data.dailyAdvice.length]
    };

    return fortune;
  }
}