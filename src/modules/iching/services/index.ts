import { 
  DivinationInput, 
  IChingResult, 
  IChingSession, 
  DivinationMethod,
  IChingHistory,
  IChingStudy
} from '../types';
import { IChingCalculator } from '../utils/ichingCalculator';
import { ichingDatabase } from '../data/ichingData';

export class IChingService {
  // 执行易经占卜
  static async performDivination(input: DivinationInput): Promise<IChingResult> {
    // 模拟占卜过程的延迟
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const result = IChingCalculator.generateIChingResult(input);
      
      // 保存结果到本地存储
      this.saveResult(result);
      
      return result;
    } catch (error) {
      console.error('易经占卜失败:', error);
      throw new Error('占卜过程中出现错误');
    }
  }
  
  // 获取每日一卦
  static getDailyHexagram() {
    try {
      const today = new Date().toDateString();
      const cached = localStorage.getItem(`iching-daily-${today}`);
      
      if (cached) {
        return JSON.parse(cached);
      }
      
      const daily = IChingCalculator.getDailyHexagram();
      localStorage.setItem(`iching-daily-${today}`, JSON.stringify(daily));
      
      return daily;
    } catch (error) {
      console.error('获取每日一卦失败:', error);
      return IChingCalculator.getDailyHexagram();
    }
  }
  
  // 开始新的占卜会话
  static startSession(): IChingSession {
    const session: IChingSession = {
      id: this.generateId(),
      startTime: new Date(),
      readings: [],
      totalReadings: 0
    };
    
    this.saveSession(session);
    return session;
  }
  
  // 结束占卜会话
  static endSession(sessionId: string): IChingSession | null {
    const session = this.getSession(sessionId);
    if (session) {
      session.endTime = new Date();
      this.saveSession(session);
    }
    return session;
  }
  
  // 添加占卜结果到会话
  static addResultToSession(sessionId: string, result: IChingResult): IChingSession | null {
    const session = this.getSession(sessionId);
    if (session) {
      session.readings.push(result);
      session.totalReadings = session.readings.length;
      this.saveSession(session);
    }
    return session;
  }
  
  // 获取占卜历史
  static getHistory(): IChingHistory {
    try {
      const sessions = this.getAllSessions();
      const allReadings = sessions.flatMap(session => session.readings);
      
      // 统计最常见的卦象
      const hexagramCounts = new Map<string, number>();
      allReadings.forEach(reading => {
        const hexagramId = reading.originalHexagram.id;
        hexagramCounts.set(hexagramId, (hexagramCounts.get(hexagramId) || 0) + 1);
      });
      
      const frequentHexagrams = Array.from(hexagramCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([hexagramId, count]) => ({
          hexagram: ichingDatabase.getHexagramById(hexagramId)!,
          count
        }));
      
      // 生成洞察
      const insights = this.generateInsights(allReadings);
      
      return {
        sessions,
        totalReadings: allReadings.length,
        frequentHexagrams,
        insights
      };
    } catch (error) {
      console.error('获取占卜历史失败:', error);
      return {
        sessions: [],
        totalReadings: 0,
        frequentHexagrams: [],
        insights: []
      };
    }
  }
  
  // 获取单个占卜结果
  static getResult(resultId: string): IChingResult | null {
    try {
      const results = this.getAllResults();
      return results.find(result => result.id === resultId) || null;
    } catch (error) {
      console.error('获取占卜结果失败:', error);
      return null;
    }
  }
  
  // 获取占卜会话
  static getSession(sessionId: string): IChingSession | null {
    try {
      const sessions = this.getAllSessions();
      return sessions.find(session => session.id === sessionId) || null;
    } catch (error) {
      console.error('获取占卜会话失败:', error);
      return null;
    }
  }
  
  // 删除占卜结果
  static deleteResult(resultId: string): boolean {
    try {
      const results = this.getAllResults();
      const filteredResults = results.filter(result => result.id !== resultId);
      
      localStorage.setItem('iching-results', JSON.stringify(filteredResults));
      return true;
    } catch (error) {
      console.error('删除占卜结果失败:', error);
      return false;
    }
  }
  
  // 保存学习笔记
  static saveStudyNote(hexagramId: string, note: IChingStudy): boolean {
    try {
      const notes = this.getStudyNotes();
      const existingIndex = notes.findIndex(n => n.hexagramId === hexagramId);
      
      if (existingIndex >= 0) {
        notes[existingIndex] = note;
      } else {
        notes.push(note);
      }
      
      localStorage.setItem('iching-study-notes', JSON.stringify(notes));
      return true;
    } catch (error) {
      console.error('保存学习笔记失败:', error);
      return false;
    }
  }
  
  // 获取学习笔记
  static getStudyNotes(): IChingStudy[] {
    try {
      const notes = localStorage.getItem('iching-study-notes');
      return notes ? JSON.parse(notes) : [];
    } catch (error) {
      console.error('获取学习笔记失败:', error);
      return [];
    }
  }
  
  // 获取卦象学习内容
  static getHexagramStudy(hexagramId: string) {
    return IChingCalculator.getHexagramStudy(hexagramId);
  }
  
  // 获取所有卦象
  static getAllHexagrams() {
    return ichingDatabase.hexagrams;
  }
  
  // 获取所有八卦
  static getAllTrigrams() {
    return ichingDatabase.trigrams;
  }
  
  // 获取易经智慧
  static getWisdom() {
    return ichingDatabase.wisdom;
  }
  
  // 获取统计信息
  static getStatistics() {
    const history = this.getHistory();
    const stats = IChingCalculator.getHexagramStats();
    
    return {
      ...stats,
      userStats: {
        totalReadings: history.totalReadings,
        totalSessions: history.sessions.length,
        averageReadingsPerSession: history.sessions.length > 0 
          ? Math.round(history.totalReadings / history.sessions.length) 
          : 0,
        mostFrequentHexagram: history.frequentHexagrams[0] || null,
        studyNotes: this.getStudyNotes().length
      }
    };
  }
  
  // 导出占卜记录
  static exportHistory(): string {
    const history = this.getHistory();
    const exportData = {
      ...history,
      exportTime: new Date().toISOString(),
      version: '1.0'
    };
    
    return JSON.stringify(exportData, null, 2);
  }
  
  // 清空历史记录
  static clearHistory(): boolean {
    try {
      localStorage.removeItem('iching-results');
      localStorage.removeItem('iching-sessions');
      localStorage.removeItem('iching-study-notes');
      
      // 清除每日一卦缓存
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('iching-daily-')) {
          localStorage.removeItem(key);
        }
      });
      
      return true;
    } catch (error) {
      console.error('清空历史记录失败:', error);
      return false;
    }
  }
  
  // 数据验证
  static validateDivinationInput(input: DivinationInput): string[] {
    const errors: string[] = [];
    
    if (!input.question || input.question.trim().length < 3) {
      errors.push('问题至少需要3个字符');
    }
    
    if (!input.method) {
      errors.push('请选择占卜方式');
    }
    
    if (input.method === 'numbers' && (!input.numbers || input.numbers.length !== 6)) {
      errors.push('数字起卦需要6个数字');
    }
    
    return errors;
  }
  
  // 获取占卜方式说明
  static getDivinationMethods() {
    return [
      {
        id: 'three-coins' as DivinationMethod,
        name: '三钱法',
        description: '用三枚硬币投掷六次，最传统的占卜方式',
        difficulty: '简单',
        accuracy: '高',
        timeRequired: '5-10分钟',
        instructions: [
          '准备三枚相同的硬币',
          '心中默念问题，保持专注',
          '同时投掷三枚硬币',
          '记录结果（正面为阳，反面为阴）',
          '重复六次，从下到上构成卦象'
        ]
      },
      {
        id: 'yarrow-sticks' as DivinationMethod,
        name: '蓍草法',
        description: '古代最正统的占卜方式，需要49根蓍草',
        difficulty: '困难',
        accuracy: '最高',
        timeRequired: '30-60分钟',
        instructions: [
          '准备49根蓍草（或细竹签）',
          '心中默念问题，保持虔诚',
          '通过复杂的分组和计算过程',
          '得出每一爻的阴阳属性',
          '重复六次构成完整卦象'
        ]
      },
      {
        id: 'numbers' as DivinationMethod,
        name: '数字起卦',
        description: '用数字进行占卜，简单快捷',
        difficulty: '简单',
        accuracy: '中等',
        timeRequired: '1-2分钟',
        instructions: [
          '心中默念问题',
          '随意想出6个数字（1-9）',
          '或者使用时间、事物等数字',
          '系统会自动转换为卦象',
          '适合现代人快速占卜'
        ]
      },
      {
        id: 'random' as DivinationMethod,
        name: '随机起卦',
        description: '完全随机生成卦象，适合初学者',
        difficulty: '最简单',
        accuracy: '中等',
        timeRequired: '即时',
        instructions: [
          '心中默念问题',
          '保持专注和虔诚',
          '点击开始即可获得卦象',
          '系统会随机生成卦象',
          '适合快速获得指导'
        ]
      }
    ];
  }
  
  // 私有方法
  private static saveResult(result: IChingResult) {
    try {
      const results = this.getAllResults();
      results.push(result);
      
      // 只保留最近100个结果
      if (results.length > 100) {
        results.splice(0, results.length - 100);
      }
      
      localStorage.setItem('iching-results', JSON.stringify(results));
    } catch (error) {
      console.error('保存占卜结果失败:', error);
    }
  }
  
  private static saveSession(session: IChingSession) {
    try {
      const sessions = this.getAllSessions();
      const existingIndex = sessions.findIndex(s => s.id === session.id);
      
      if (existingIndex >= 0) {
        sessions[existingIndex] = session;
      } else {
        sessions.push(session);
      }
      
      // 只保留最近20个会话
      if (sessions.length > 20) {
        sessions.splice(0, sessions.length - 20);
      }
      
      localStorage.setItem('iching-sessions', JSON.stringify(sessions));
    } catch (error) {
      console.error('保存占卜会话失败:', error);
    }
  }
  
  private static getAllResults(): IChingResult[] {
    try {
      const results = localStorage.getItem('iching-results');
      return results ? JSON.parse(results) : [];
    } catch (error) {
      console.error('获取占卜结果失败:', error);
      return [];
    }
  }
  
  private static getAllSessions(): IChingSession[] {
    try {
      const sessions = localStorage.getItem('iching-sessions');
      return sessions ? JSON.parse(sessions) : [];
    } catch (error) {
      console.error('获取占卜会话失败:', error);
      return [];
    }
  }
  
  private static generateInsights(readings: IChingResult[]): string[] {
    const insights: string[] = [];
    
    if (readings.length === 0) {
      return ['还没有占卜记录，开始您的第一次占卜吧！'];
    }
    
    // 分析最常见的主题
    const questionWords = readings.flatMap(r => 
      r.question.split(/\s+|[，。！？]/).filter(w => w.length > 1)
    );
    const wordCounts = new Map<string, number>();
    questionWords.forEach(word => {
      wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    });
    
    const topWords = Array.from(wordCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([word]) => word);
    
    if (topWords.length > 0) {
      insights.push(`您最关心的话题是：${topWords.join('、')}`);
    }
    
    // 分析占卜频率
    const now = new Date();
    const recentReadings = readings.filter(r => {
      const readingDate = new Date(r.timestamp);
      const diffDays = Math.floor((now.getTime() - readingDate.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    });
    
    if (recentReadings.length > 3) {
      insights.push('您最近占卜频繁，可能内心有较多困惑，建议多加思考和沉淀。');
    }
    
    // 分析置信度
    const avgConfidence = readings.reduce((sum, r) => sum + r.confidence, 0) / readings.length;
    if (avgConfidence > 0.8) {
      insights.push('您的占卜结果置信度较高，说明问题明确，内心状态稳定。');
    } else if (avgConfidence < 0.6) {
      insights.push('建议在占卜前花更多时间思考问题，保持内心平静。');
    }
    
    return insights;
  }
  
  private static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}