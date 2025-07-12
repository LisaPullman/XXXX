import { 
  DivinationInput, 
  IChingResult, 
  DivinationMethod, 
  CoinThrow, 
  Hexagram 
} from '../types';
import { ichingDatabase } from '../data/ichingData';

export class IChingCalculator {
  // 进行易经占卜
  static generateIChingResult(input: DivinationInput): IChingResult {
    const { question, method } = input;
    
    // 生成卦象
    const { hexagram, changingLines } = this.generateHexagram(method, input);
    
    // 生成变卦（如果有动爻）
    const resultingHexagram = changingLines.length > 0 
      ? this.generateResultingHexagram(hexagram, changingLines)
      : undefined;
    
    // 生成解释
    const interpretation = this.generateInterpretation(
      question, 
      hexagram, 
      changingLines, 
      resultingHexagram
    );
    
    // 计算置信度
    const confidence = this.calculateConfidence(method, changingLines);
    
    return {
      id: this.generateId(),
      timestamp: new Date(),
      question,
      method,
      originalHexagram: hexagram,
      changingLines,
      resultingHexagram,
      interpretation,
      confidence
    };
  }
  
  // 生成卦象
  private static generateHexagram(method: DivinationMethod, input: DivinationInput) {
    let lines: number[] = [];
    let changingLines: number[] = [];
    
    switch (method) {
      case 'three-coins':
        const coinResults = this.simulateCoinThrows();
        lines = coinResults.map(result => result.value);
        changingLines = coinResults
          .map((result, index) => result.result.includes('changing') ? index + 1 : null)
          .filter(line => line !== null) as number[];
        break;
        
      case 'yarrow-sticks':
        const yarrowResults = this.simulateYarrowSticks();
        lines = yarrowResults.lines;
        changingLines = yarrowResults.changingLines;
        break;
        
      case 'numbers':
        if (input.numbers && input.numbers.length === 6) {
          lines = input.numbers.map(num => (num % 2 === 0 ? 8 : 9));
          changingLines = input.numbers
            .map((num, index) => (num === 6 || num === 9) ? index + 1 : null)
            .filter(line => line !== null) as number[];
        } else {
          lines = this.generateRandomLines();
          changingLines = this.generateRandomChangingLines();
        }
        break;
        
      case 'random':
      default:
        lines = this.generateRandomLines();
        changingLines = this.generateRandomChangingLines();
        break;
    }
    
    // 根据爻线确定卦象
    const hexagram = this.determineHexagram(lines);
    
    return { hexagram, changingLines };
  }
  
  // 模拟投币
  private static simulateCoinThrows(): CoinThrow[] {
    const throws: CoinThrow[] = [];
    
    for (let i = 0; i < 6; i++) {
      const coins = [
        Math.random() > 0.5 ? 3 : 2, // 正面3分，反面2分
        Math.random() > 0.5 ? 3 : 2,
        Math.random() > 0.5 ? 3 : 2
      ];
      
      const total = coins.reduce((sum, coin) => sum + coin, 0);
      
      let result: CoinThrow['result'];
      let value: number;
      
      switch (total) {
        case 6: // 三个反面
          result = 'changingYin';
          value = 6;
          break;
        case 7: // 两反一正
          result = 'yang';
          value = 7;
          break;
        case 8: // 两正一反
          result = 'yin';
          value = 8;
          break;
        case 9: // 三个正面
          result = 'changingYang';
          value = 9;
          break;
        default:
          result = 'yin';
          value = 8;
      }
      
      throws.push({
        throw: i + 1,
        result,
        value
      });
    }
    
    return throws;
  }
  
  // 模拟蓍草占卜
  private static simulateYarrowSticks() {
    const lines: number[] = [];
    const changingLines: number[] = [];
    
    for (let i = 0; i < 6; i++) {
      // 简化的蓍草算法
      const remainder = Math.floor(Math.random() * 4) + 6; // 6, 7, 8, 9
      lines.push(remainder);
      
      if (remainder === 6 || remainder === 9) {
        changingLines.push(i + 1);
      }
    }
    
    return { lines, changingLines };
  }
  
  // 生成随机爻线
  private static generateRandomLines(): number[] {
    const lines: number[] = [];
    for (let i = 0; i < 6; i++) {
      lines.push(Math.random() > 0.5 ? 9 : 8); // 9为阳，8为阴
    }
    return lines;
  }
  
  // 生成随机动爻
  private static generateRandomChangingLines(): number[] {
    const changingLines: number[] = [];
    const changeCount = Math.floor(Math.random() * 3); // 0-2个动爻
    
    for (let i = 0; i < changeCount; i++) {
      const line = Math.floor(Math.random() * 6) + 1;
      if (!changingLines.includes(line)) {
        changingLines.push(line);
      }
    }
    
    return changingLines.sort((a, b) => a - b);
  }
  
  // 根据爻线确定卦象
  private static determineHexagram(lines: number[]): Hexagram {
    // 将数字转换为阴阳
    const binaryLines = lines.map(line => line % 2 === 1); // 奇数为阳，偶数为阴
    
    // 确定上下卦
    const upperTrigram = this.getTrigramFromLines(binaryLines.slice(3, 6));
    const lowerTrigram = this.getTrigramFromLines(binaryLines.slice(0, 3));
    
    // 查找对应的卦象
    const hexagram = ichingDatabase.getHexagramByTrigrams(upperTrigram.id, lowerTrigram.id);
    
    return hexagram || ichingDatabase.hexagrams[0]; // 默认返回第一个卦
  }
  
  // 根据爻线获取八卦
  private static getTrigramFromLines(lines: boolean[]) {
    const trigrams = ichingDatabase.trigrams;
    
    for (const trigram of trigrams) {
      if (this.arraysEqual(trigram.lines, lines)) {
        return trigram;
      }
    }
    
    return trigrams[0]; // 默认返回第一个八卦
  }
  
  // 比较数组是否相等
  private static arraysEqual(arr1: boolean[], arr2: boolean[]): boolean {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((val, index) => val === arr2[index]);
  }
  
  // 生成变卦
  private static generateResultingHexagram(originalHexagram: Hexagram, changingLines: number[]): Hexagram {
    if (changingLines.length === 0) return originalHexagram;
    
    // 简化处理：根据动爻数量和位置选择相关卦象
    const changeCount = changingLines.length;
    const hexagrams = ichingDatabase.hexagrams;
    
    // 基于原卦的编号和动爻生成新卦
    const newNumber = (originalHexagram.number + changeCount) % hexagrams.length;
    
    return ichingDatabase.getHexagramByNumber(newNumber + 1) || hexagrams[0];
  }
  
  // 生成解释
  private static generateInterpretation(
    question: string, 
    hexagram: Hexagram, 
    changingLines: number[], 
    resultingHexagram?: Hexagram
  ) {
    const interpretation = {
      overview: this.generateOverview(hexagram, changingLines),
      currentSituation: this.generateCurrentSituation(hexagram, question),
      guidance: this.generateGuidance(hexagram, changingLines),
      outcome: this.generateOutcome(hexagram, resultingHexagram),
      advice: this.generateAdvice(hexagram, changingLines)
    };
    
    return interpretation;
  }
  
  // 生成概述
  private static generateOverview(hexagram: Hexagram, changingLines: number[]): string {
    const changingText = changingLines.length > 0 
      ? `有${changingLines.length}个动爻（${changingLines.join('、')}爻），表示事情正在发生变化。`
      : '没有动爻，表示情况相对稳定。';
      
    return `你得到了${hexagram.chineseName}卦（${hexagram.name}）。${hexagram.description}。${changingText}`;
  }
  
  // 生成当前情况
  private static generateCurrentSituation(hexagram: Hexagram, question: string): string {
    const situations = [
      `关于"${question}"的问题，${hexagram.chineseName}卦显示${hexagram.meaning.general}`,
      `当前的情况符合${hexagram.chineseName}卦的特征：${hexagram.judgment}`,
      `${hexagram.image}这个卦象提示你要${hexagram.meaning.advice}`
    ];
    
    return situations[Math.floor(Math.random() * situations.length)];
  }
  
  // 生成指导
  private static generateGuidance(hexagram: Hexagram, changingLines: number[]): string {
    let guidance = `${hexagram.chineseName}卦的指导意义是：${hexagram.meaning.general}`;
    
    if (changingLines.length > 0) {
      const changingLine = changingLines[0];
      const lineText = hexagram.changingLines[changingLine];
      if (lineText) {
        guidance += `特别要注意${changingLine}爻："${lineText.text}"，意思是${lineText.meaning}。`;
      }
    }
    
    return guidance;
  }
  
  // 生成结果
  private static generateOutcome(hexagram: Hexagram, resultingHexagram?: Hexagram): string {
    if (resultingHexagram) {
      return `事情的发展趋势是从${hexagram.chineseName}卦转向${resultingHexagram.chineseName}卦。这意味着${resultingHexagram.meaning.general}`;
    }
    
    return `按照${hexagram.chineseName}卦的发展规律，${hexagram.meaning.general}`;
  }
  
  // 生成建议
  private static generateAdvice(hexagram: Hexagram, changingLines: number[]): string[] {
    const advice = [
      hexagram.meaning.advice,
      `在行动上：${hexagram.meaning.career}`,
      `在人际关系上：${hexagram.meaning.love}`,
      `在健康方面：${hexagram.meaning.health}`,
      `在财务方面：${hexagram.meaning.finance}`
    ];
    
    if (changingLines.length > 0) {
      advice.push('由于有动爻，情况会发生变化，要随时准备调整策略。');
    } else {
      advice.push('当前情况相对稳定，可以按既定计划进行。');
    }
    
    return advice;
  }
  
  // 计算置信度
  private static calculateConfidence(method: DivinationMethod, changingLines: number[]): number {
    let confidence = 0.7; // 基础置信度
    
    // 根据占卜方法调整
    switch (method) {
      case 'three-coins':
        confidence += 0.15;
        break;
      case 'yarrow-sticks':
        confidence += 0.2;
        break;
      case 'numbers':
        confidence += 0.1;
        break;
      case 'random':
      default:
        confidence += 0.05;
        break;
    }
    
    // 根据动爻数量调整
    if (changingLines.length === 0) {
      confidence += 0.1; // 无动爻比较稳定
    } else if (changingLines.length <= 2) {
      confidence += 0.05; // 少量动爻
    } else {
      confidence -= 0.05; // 太多动爻可能混乱
    }
    
    return Math.min(confidence, 1.0);
  }
  
  // 获取每日一卦
  static getDailyHexagram(): { hexagram: Hexagram; wisdom: string; advice: string } {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    
    const hexagramIndex = dayOfYear % ichingDatabase.hexagrams.length;
    const hexagram = ichingDatabase.hexagrams[hexagramIndex];
    
    const wisdomIndex = dayOfYear % ichingDatabase.wisdom.length;
    const wisdom = ichingDatabase.wisdom[wisdomIndex].quote;
    
    const advice = `今日宜：${hexagram.meaning.advice}`;
    
    return { hexagram, wisdom, advice };
  }
  
  // 获取卦象学习内容
  static getHexagramStudy(hexagramId: string) {
    const hexagram = ichingDatabase.getHexagramById(hexagramId);
    if (!hexagram) return null;
    
    return {
      hexagram,
      structure: {
        upperTrigram: hexagram.upperTrigram,
        lowerTrigram: hexagram.lowerTrigram,
        meaning: `${hexagram.upperTrigram.chineseName}上${hexagram.lowerTrigram.chineseName}下，${hexagram.description}`
      },
      analysis: {
        judgment: hexagram.judgment,
        image: hexagram.image,
        generalMeaning: hexagram.meaning.general
      },
      applications: {
        love: hexagram.meaning.love,
        career: hexagram.meaning.career,
        health: hexagram.meaning.health,
        finance: hexagram.meaning.finance
      },
      changingLines: hexagram.changingLines
    };
  }
  
  // 辅助方法
  private static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  
  // 获取卦象统计
  static getHexagramStats() {
    return {
      totalHexagrams: ichingDatabase.hexagrams.length,
      totalTrigrams: ichingDatabase.trigrams.length,
      categories: {
        heaven: ichingDatabase.hexagrams.filter(h => h.upperTrigram.element === 'heaven' || h.lowerTrigram.element === 'heaven').length,
        earth: ichingDatabase.hexagrams.filter(h => h.upperTrigram.element === 'earth' || h.lowerTrigram.element === 'earth').length,
        water: ichingDatabase.hexagrams.filter(h => h.upperTrigram.element === 'water' || h.lowerTrigram.element === 'water').length,
        fire: ichingDatabase.hexagrams.filter(h => h.upperTrigram.element === 'fire' || h.lowerTrigram.element === 'fire').length,
        thunder: ichingDatabase.hexagrams.filter(h => h.upperTrigram.element === 'thunder' || h.lowerTrigram.element === 'thunder').length,
        wind: ichingDatabase.hexagrams.filter(h => h.upperTrigram.element === 'wind' || h.lowerTrigram.element === 'wind').length,
        mountain: ichingDatabase.hexagrams.filter(h => h.upperTrigram.element === 'mountain' || h.lowerTrigram.element === 'mountain').length,
        lake: ichingDatabase.hexagrams.filter(h => h.upperTrigram.element === 'lake' || h.lowerTrigram.element === 'lake').length
      }
    };
  }
}