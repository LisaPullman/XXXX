import { TarotCard, TarotSpread, TarotReading } from '../types';
import { allTarotCards, tarotSpreads } from '../data/tarotData';

// 塔罗牌解读算法类
export class TarotCalculator {
  
  /**
   * 抽取指定数量的塔罗牌
   * @param count 抽取数量
   * @param allowDuplicates 是否允许重复
   * @returns 抽取的牌和是否逆位
   */
  static drawCards(count: number, allowDuplicates: boolean = false): {
    card: TarotCard;
    isReversed: boolean;
  }[] {
    const availableCards = [...allTarotCards];
    const drawnCards: { card: TarotCard; isReversed: boolean }[] = [];
    
    for (let i = 0; i < count; i++) {
      if (availableCards.length === 0 && !allowDuplicates) {
        break;
      }
      
      const randomIndex = Math.floor(Math.random() * availableCards.length);
      const card = allowDuplicates ? 
        availableCards[randomIndex] : 
        availableCards.splice(randomIndex, 1)[0];
      
      const isReversed = Math.random() < 0.3; // 30% 概率逆位
      
      drawnCards.push({ card, isReversed });
    }
    
    return drawnCards;
  }

  /**
   * 为指定牌阵抽牌
   * @param spreadId 牌阵ID
   * @returns 完整的牌阵结果
   */
  static drawForSpread(spreadId: string): {
    spread: TarotSpread;
    cards: { position: string; card: TarotCard; isReversed: boolean }[];
  } | null {
    const spread = tarotSpreads.find(s => s.id === spreadId);
    if (!spread) return null;
    
    const drawnCards = this.drawCards(spread.positions.length);
    const cards = spread.positions.map((position, index) => ({
      position: position.id,
      card: drawnCards[index].card,
      isReversed: drawnCards[index].isReversed
    }));
    
    return { spread, cards };
  }

  /**
   * 生成塔罗解读
   * @param spread 牌阵
   * @param cards 抽到的牌
   * @param question 问题
   * @returns 解读结果
   */
  static generateInterpretation(
    spread: TarotSpread,
    cards: { position: string; card: TarotCard; isReversed: boolean }[],
    question?: string
  ): {
    overall: string;
    positions: { positionId: string; interpretation: string }[];
    advice: string;
    summary: string;
  } {
    const positions = cards.map(cardData => {
      const position = spread.positions.find(p => p.id === cardData.position);
      const { card, isReversed } = cardData;
      
      const meaning = isReversed ? card.reversed : card.upright;
      let interpretation = `${position?.name}：${card.name}${isReversed ? '（逆位）' : ''}\\n`;
      interpretation += `含义：${meaning.meaning}\\n`;
      
      // 根据牌阵类别添加相应的解读
      if (spread.category === 'love') {
        interpretation += `感情：${meaning.love}`;
      } else if (spread.category === 'career') {
        interpretation += `事业：${meaning.career}`;
      } else {
        interpretation += `建议：${meaning.advice}`;
      }
      
      return {
        positionId: cardData.position,
        interpretation
      };
    });

    // 生成整体解读
    const majorCards = cards.filter(c => c.card.type === 'major');
    const reversedCards = cards.filter(c => c.isReversed);
    
    let overall = '';
    if (majorCards.length > cards.length / 2) {
      overall += '这次解读中出现了较多大阿卡纳牌，表示命运和重要的人生课题正在影响你的状况。';
    }
    
    if (reversedCards.length > cards.length / 2) {
      overall += '较多逆位牌显示当前状况可能存在阻碍或需要内在反思。';
    } else {
      overall += '正位牌较多表示能量流动顺畅，是积极行动的好时机。';
    }

    // 生成建议
    const allAdvice = cards.map(c => {
      const meaning = c.isReversed ? c.card.reversed : c.card.upright;
      return meaning.advice;
    });
    const advice = `综合建议：${allAdvice[0]}，同时要注意${allAdvice[Math.floor(allAdvice.length / 2)]}。`;

    // 生成总结
    const keyCards = cards.slice(0, 2).map(c => c.card.name).join('和');
    const summary = `这次解读以${keyCards}为核心，${question ? `针对你关于"${question}"的问题，` : ''}塔罗牌指出了当前的状况和发展方向。记住，塔罗牌是指引，最终的选择权在你手中。`;

    return {
      overall,
      positions,
      advice,
      summary
    };
  }

  /**
   * 分析牌的元素分布
   * @param cards 牌组
   * @returns 元素分析
   */
  static analyzeElements(cards: TarotCard[]): {
    fire: number;
    water: number;
    air: number;
    earth: number;
    dominant: string;
    interpretation: string;
  } {
    const elements = { fire: 0, water: 0, air: 0, earth: 0 };
    
    cards.forEach(card => {
      if (card.element) {
        elements[card.element]++;
      }
    });

    const total = Object.values(elements).reduce((sum, count) => sum + count, 0);
    const dominant = Object.entries(elements).reduce((a, b) => elements[a[0]] > b[1] ? a : b)[0];
    
    const interpretations = {
      fire: '火元素占主导，表示热情、行动和创造力是当前的主要能量。',
      water: '水元素占主导，表示情感、直觉和精神层面是关注的重点。',
      air: '风元素占主导，表示思考、沟通和知识是当前的主要课题。',
      earth: '土元素占主导，表示实际、物质和稳定是现在需要关注的方面。'
    };

    return {
      ...elements,
      dominant,
      interpretation: interpretations[dominant as keyof typeof interpretations] || '元素分布均衡，各方面都需要平衡发展。'
    };
  }

  /**
   * 计算牌阵的数字学含义
   * @param cards 牌组
   * @returns 数字学分析
   */
  static calculateNumerology(cards: TarotCard[]): {
    total: number;
    reduced: number;
    meaning: string;
  } {
    const total = cards.reduce((sum, card) => {
      return sum + (card.number || 0);
    }, 0);
    
    // 数字归约
    let reduced = total;
    while (reduced > 9) {
      reduced = reduced.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }

    const meanings = {
      1: '新开始、领导力、独立',
      2: '合作、平衡、选择',
      3: '创造、沟通、成长',
      4: '稳定、建设、实用',
      5: '变化、自由、冒险',
      6: '和谐、责任、治愈',
      7: '精神、内省、神秘',
      8: '力量、成就、物质',
      9: '完成、智慧、人道主义'
    };

    return {
      total,
      reduced,
      meaning: meanings[reduced as keyof typeof meanings] || '超越物质的精神追求'
    };
  }

  /**
   * 生成每日指导
   * @param card 每日牌
   * @param isReversed 是否逆位
   * @returns 每日指导
   */
  static generateDailyGuidance(card: TarotCard, isReversed: boolean): {
    energy: string;
    focus: string;
    advice: string;
    affirmation: string;
  } {
    const meaning = isReversed ? card.reversed : card.upright;
    
    const energies = {
      major: isReversed ? '今天的能量可能有所阻滞，需要内在反思' : '今天有强大的宇宙能量支持你',
      minor: isReversed ? '今天在日常事务中可能遇到小挫折' : '今天的日常事务将顺利进行'
    };

    const focuses = {
      fire: '关注创造力和行动力',
      water: '关注情感和直觉',
      air: '关注思考和沟通',
      earth: '关注实际事务和稳定'
    };

    const affirmations = [
      '我相信自己的选择',
      '我拥有克服困难的智慧',
      '我开放地接受生活的指引',
      '我在变化中找到平衡',
      '我的直觉引导我走向正确的方向'
    ];

    return {
      energy: energies[card.type],
      focus: focuses[card.element || 'air'],
      advice: meaning.advice,
      affirmation: affirmations[Math.floor(Math.random() * affirmations.length)]
    };
  }

  /**
   * 获取牌的详细分析
   * @param card 塔罗牌
   * @param context 上下文（love, career, health, general）
   * @returns 详细分析
   */
  static getDetailedAnalysis(
    card: TarotCard, 
    context: 'love' | 'career' | 'health' | 'general' = 'general'
  ): {
    overview: string;
    positive: string[];
    negative: string[];
    advice: string;
    symbolism: string;
  } {
    const contextMeaning = {
      love: { upright: card.upright.love, reversed: card.reversed.love },
      career: { upright: card.upright.career, reversed: card.reversed.career },
      health: { upright: card.upright.health, reversed: card.reversed.health },
      general: { upright: card.upright.meaning, reversed: card.reversed.meaning }
    };

    return {
      overview: card.description,
      positive: card.upright.keywords,
      negative: card.reversed.keywords,
      advice: card.upright.advice,
      symbolism: card.symbolism.join('、')
    };
  }
}