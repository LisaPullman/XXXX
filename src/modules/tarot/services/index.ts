import { TarotCard, TarotSpread, TarotReading, DailyTarot } from '../types';
import { TarotCalculator } from '../utils/tarotCalculator';
import { allTarotCards, tarotSpreads, getDailyCard } from '../data/tarotData';

// 塔罗牌服务类
export class TarotService {
  
  /**
   * 获取所有塔罗牌
   * @returns Promise<TarotCard[]>
   */
  static async getAllCards(): Promise<TarotCard[]> {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      return allTarotCards;
    } catch (error) {
      throw new Error(`获取塔罗牌失败: ${error}`);
    }
  }

  /**
   * 获取所有牌阵
   * @returns Promise<TarotSpread[]>
   */
  static async getAllSpreads(): Promise<TarotSpread[]> {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      return tarotSpreads;
    } catch (error) {
      throw new Error(`获取牌阵失败: ${error}`);
    }
  }

  /**
   * 根据类型获取牌
   * @param type 牌类型
   * @returns Promise<TarotCard[]>
   */
  static async getCardsByType(type: 'major' | 'minor'): Promise<TarotCard[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      return allTarotCards.filter(card => card.type === type);
    } catch (error) {
      throw new Error(`获取${type}牌失败: ${error}`);
    }
  }

  /**
   * 根据花色获取牌
   * @param suit 花色
   * @returns Promise<TarotCard[]>
   */
  static async getCardsBySuit(suit: 'wands' | 'cups' | 'swords' | 'pentacles'): Promise<TarotCard[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      return allTarotCards.filter(card => card.suit === suit);
    } catch (error) {
      throw new Error(`获取${suit}花色牌失败: ${error}`);
    }
  }

  /**
   * 进行塔罗占卜
   * @param spreadId 牌阵ID
   * @param question 问题
   * @returns Promise<TarotReading>
   */
  static async performReading(spreadId: string, question?: string): Promise<TarotReading> {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const result = TarotCalculator.drawForSpread(spreadId);
      if (!result) {
        throw new Error('牌阵不存在');
      }

      const interpretation = TarotCalculator.generateInterpretation(
        result.spread,
        result.cards,
        question
      );

      const reading: TarotReading = {
        id: `reading-${Date.now()}`,
        spread: result.spread,
        cards: result.cards,
        question,
        interpretation,
        timestamp: new Date()
      };

      return reading;
    } catch (error) {
      throw new Error(`塔罗占卜失败: ${error}`);
    }
  }

  /**
   * 获取每日塔罗
   * @param date 日期
   * @returns Promise<DailyTarot>
   */
  static async getDailyTarot(date: Date = new Date()): Promise<DailyTarot> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const { card, isReversed } = getDailyCard(date);
      const guidance = TarotCalculator.generateDailyGuidance(card, isReversed);
      
      const dailyTarot: DailyTarot = {
        date: date.toISOString().split('T')[0],
        card,
        isReversed,
        message: `今日塔罗：${card.name}${isReversed ? '（逆位）' : ''}`,
        energy: guidance.energy,
        advice: guidance.advice,
        reflection: guidance.affirmation
      };

      return dailyTarot;
    } catch (error) {
      throw new Error(`获取每日塔罗失败: ${error}`);
    }
  }

  /**
   * 抽取单张牌
   * @param question 问题
   * @returns Promise<占卜结果>
   */
  static async drawSingleCard(question?: string): Promise<{
    card: TarotCard;
    isReversed: boolean;
    interpretation: string;
    advice: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const [result] = TarotCalculator.drawCards(1);
      const { card, isReversed } = result;
      const meaning = isReversed ? card.reversed : card.upright;
      
      let interpretation = `${card.name}${isReversed ? '（逆位）' : ''}\\n`;
      interpretation += `含义：${meaning.meaning}\\n`;
      interpretation += `关键词：${meaning.keywords.join('、')}`;
      
      return {
        card,
        isReversed,
        interpretation,
        advice: meaning.advice
      };
    } catch (error) {
      throw new Error(`单张牌占卜失败: ${error}`);
    }
  }

  /**
   * 获取牌的详细信息
   * @param cardId 牌ID
   * @returns Promise<TarotCard>
   */
  static async getCardDetails(cardId: string): Promise<TarotCard | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      const card = allTarotCards.find(c => c.id === cardId);
      return card || null;
    } catch (error) {
      throw new Error(`获取牌详情失败: ${error}`);
    }
  }

  /**
   * 进行Yes/No占卜
   * @param question 问题
   * @returns Promise<Yes/No结果>
   */
  static async yesNoReading(question: string): Promise<{
    answer: 'yes' | 'no' | 'maybe';
    card: TarotCard;
    isReversed: boolean;
    explanation: string;
    confidence: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    try {
      const [result] = TarotCalculator.drawCards(1);
      const { card, isReversed } = result;
      
      // 基于牌的特性和正逆位判断Yes/No
      let answer: 'yes' | 'no' | 'maybe';
      let confidence: number;
      
      if (card.type === 'major') {
        // 大阿卡纳牌能量强烈
        if (!isReversed) {
          answer = 'yes';
          confidence = 85;
        } else {
          answer = 'no';
          confidence = 75;
        }
      } else {
        // 小阿卡纳牌
        const positiveCards = ['ace', '3', '6', '9', '10'];
        const isPositive = positiveCards.some(pos => card.id.includes(pos));
        
        if (isPositive && !isReversed) {
          answer = 'yes';
          confidence = 70;
        } else if (!isPositive && isReversed) {
          answer = 'no';
          confidence = 65;
        } else {
          answer = 'maybe';
          confidence = 50;
        }
      }
      
      const explanation = `${card.name}${isReversed ? '（逆位）' : ''}显示${answer === 'yes' ? '积极' : answer === 'no' ? '消极' : '中性'}的能量。${isReversed ? card.reversed.meaning : card.upright.meaning}`;
      
      return {
        answer,
        card,
        isReversed,
        explanation,
        confidence
      };
    } catch (error) {
      throw new Error(`Yes/No占卜失败: ${error}`);
    }
  }

  /**
   * 获取学习建议
   * @param level 水平（beginner, intermediate, advanced）
   * @returns Promise<学习建议>
   */
  static async getLearningAdvice(level: 'beginner' | 'intermediate' | 'advanced'): Promise<{
    recommendedCards: TarotCard[];
    studyPlan: string[];
    exercises: string[];
    tips: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    try {
      const advice = {
        beginner: {
          cards: allTarotCards.filter(c => c.type === 'major').slice(0, 5),
          plan: [
            '从大阿卡纳的前5张牌开始学习',
            '每天抽一张牌进行冥想',
            '记录每张牌的第一印象',
            '学习基本的三张牌牌阵'
          ],
          exercises: [
            '每日一卡练习',
            '牌意冥想',
            '符号解读',
            '个人牌意日记'
          ],
          tips: [
            '不要急于记忆所有牌意',
            '相信你的直觉感受',
            '多观察牌面的视觉元素',
            '从简单的问题开始练习'
          ]
        },
        intermediate: {
          cards: allTarotCards.filter(c => c.type === 'major'),
          plan: [
            '掌握完整的大阿卡纳',
            '学习小阿卡纳的基本含义',
            '练习多种牌阵',
            '学习牌与牌之间的关联'
          ],
          exercises: [
            '凯尔特十字牌阵',
            '月相牌阵',
            '关系分析牌阵',
            '生命之树牌阵'
          ],
          tips: [
            '注意牌的相互关系',
            '学习元素和数字的含义',
            '练习讲述牌的故事',
            '开始为他人占卜'
          ]
        },
        advanced: {
          cards: allTarotCards,
          plan: [
            '掌握全部78张牌',
            '创造个人的解读风格',
            '学习高级牌阵',
            '深入研究塔罗历史和象征'
          ],
          exercises: [
            '自创牌阵',
            '深度心理分析',
            '时间线占卜',
            '灵性指导咨询'
          ],
          tips: [
            '发展个人的解读系统',
            '研究不同的塔罗牌版本',
            '将塔罗与其他占卜系统结合',
            '建立专业的咨询服务'
          ]
        }
      };

      return {
        recommendedCards: advice[level].cards,
        studyPlan: advice[level].plan,
        exercises: advice[level].exercises,
        tips: advice[level].tips
      };
    } catch (error) {
      throw new Error(`获取学习建议失败: ${error}`);
    }
  }

  /**
   * 分析牌阵统计
   * @param readings 解读历史
   * @returns Promise<统计分析>
   */
  static async analyzeReadingStats(readings: TarotReading[]): Promise<{
    totalReadings: number;
    favoriteSpread: string;
    mostDrawnCard: string;
    elementDistribution: { [key: string]: number };
    accuracy: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const totalReadings = readings.length;
      
      // 统计最常用的牌阵
      const spreadCount: { [key: string]: number } = {};
      readings.forEach(reading => {
        spreadCount[reading.spread.name] = (spreadCount[reading.spread.name] || 0) + 1;
      });
      const favoriteSpread = Object.entries(spreadCount)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || '';

      // 统计最常抽到的牌
      const cardCount: { [key: string]: number } = {};
      readings.forEach(reading => {
        reading.cards.forEach(({ card }) => {
          cardCount[card.name] = (cardCount[card.name] || 0) + 1;
        });
      });
      const mostDrawnCard = Object.entries(cardCount)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || '';

      // 元素分布
      const elementDistribution: { [key: string]: number } = {};
      readings.forEach(reading => {
        reading.cards.forEach(({ card }) => {
          if (card.element) {
            elementDistribution[card.element] = (elementDistribution[card.element] || 0) + 1;
          }
        });
      });

      // 模拟准确度（实际应该基于用户反馈）
      const accuracy = Math.floor(Math.random() * 20) + 75; // 75-95%

      return {
        totalReadings,
        favoriteSpread,
        mostDrawnCard,
        elementDistribution,
        accuracy
      };
    } catch (error) {
      throw new Error(`分析统计失败: ${error}`);
    }
  }
}