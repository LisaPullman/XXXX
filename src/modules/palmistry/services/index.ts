import { 
  PalmistryInput, 
  FaceReadingInput, 
  PalmistryResult, 
  FaceReadingResult,
  ReadingSession,
  ReadingType
} from '../types';
import { PalmistryCalculator } from '../utils/palmistryCalculator';

export class PalmistryService {
  // 执行手相分析
  static async performPalmistryReading(input: PalmistryInput): Promise<PalmistryResult> {
    // 模拟分析延迟
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const result = PalmistryCalculator.generatePalmistryResult(input);
      
      // 保存到本地存储
      this.saveResult('palmistry', result);
      
      return result;
    } catch (error) {
      console.error('手相分析失败:', error);
      throw new Error('手相分析过程中出现错误');
    }
  }
  
  // 执行面相分析
  static async performFaceReading(input: FaceReadingInput): Promise<FaceReadingResult> {
    // 模拟分析延迟
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const result = PalmistryCalculator.generateFaceReadingResult(input);
      
      // 保存到本地存储
      this.saveResult('face-reading', result);
      
      return result;
    } catch (error) {
      console.error('面相分析失败:', error);
      throw new Error('面相分析过程中出现错误');
    }
  }
  
  // 执行综合分析
  static async performCombinedReading(
    palmistryInput: PalmistryInput,
    faceReadingInput: FaceReadingInput
  ): Promise<ReadingSession> {
    try {
      const [palmistryResult, faceReadingResult] = await Promise.all([
        this.performPalmistryReading(palmistryInput),
        this.performFaceReading(faceReadingInput)
      ]);
      
      const session = PalmistryCalculator.createReadingSession(
        'both',
        palmistryResult,
        faceReadingResult
      );
      
      // 保存会话
      this.saveSession(session);
      
      return session;
    } catch (error) {
      console.error('综合分析失败:', error);
      throw new Error('综合分析过程中出现错误');
    }
  }
  
  // 获取历史记录
  static getHistory(type?: ReadingType): ReadingSession[] {
    try {
      const sessions = JSON.parse(localStorage.getItem('palmistry-sessions') || '[]');
      
      if (type) {
        return sessions.filter((session: ReadingSession) => session.type === type);
      }
      
      return sessions;
    } catch (error) {
      console.error('获取历史记录失败:', error);
      return [];
    }
  }
  
  // 获取单个会话
  static getSession(sessionId: string): ReadingSession | null {
    try {
      const sessions = this.getHistory();
      return sessions.find(session => session.id === sessionId) || null;
    } catch (error) {
      console.error('获取会话失败:', error);
      return null;
    }
  }
  
  // 删除会话
  static deleteSession(sessionId: string): boolean {
    try {
      const sessions = this.getHistory();
      const filteredSessions = sessions.filter(session => session.id !== sessionId);
      
      localStorage.setItem('palmistry-sessions', JSON.stringify(filteredSessions));
      return true;
    } catch (error) {
      console.error('删除会话失败:', error);
      return false;
    }
  }
  
  // 清空历史记录
  static clearHistory(): boolean {
    try {
      localStorage.removeItem('palmistry-sessions');
      localStorage.removeItem('palmistry-results');
      localStorage.removeItem('face-reading-results');
      return true;
    } catch (error) {
      console.error('清空历史记录失败:', error);
      return false;
    }
  }
  
  // 导出结果
  static exportResult(sessionId: string): string {
    const session = this.getSession(sessionId);
    if (!session) {
      throw new Error('会话不存在');
    }
    
    const exportData = {
      ...session,
      exportTime: new Date().toISOString(),
      version: '1.0'
    };
    
    return JSON.stringify(exportData, null, 2);
  }
  
  // 获取统计信息
  static getStatistics() {
    const sessions = this.getHistory();
    
    return {
      totalSessions: sessions.length,
      palmistryOnly: sessions.filter(s => s.type === 'palmistry').length,
      faceReadingOnly: sessions.filter(s => s.type === 'face-reading').length,
      combinedReadings: sessions.filter(s => s.type === 'both').length,
      mostRecentSession: sessions.length > 0 ? sessions[sessions.length - 1] : null,
      averageConfidence: this.calculateAverageConfidence(sessions)
    };
  }
  
  // 私有方法
  private static saveResult(type: 'palmistry' | 'face-reading', result: PalmistryResult | FaceReadingResult) {
    try {
      const key = `${type}-results`;
      const results = JSON.parse(localStorage.getItem(key) || '[]');
      results.push(result);
      
      // 只保留最近50个结果
      if (results.length > 50) {
        results.splice(0, results.length - 50);
      }
      
      localStorage.setItem(key, JSON.stringify(results));
    } catch (error) {
      console.error('保存结果失败:', error);
    }
  }
  
  private static saveSession(session: ReadingSession) {
    try {
      const sessions = this.getHistory();
      sessions.push(session);
      
      // 只保留最近30个会话
      if (sessions.length > 30) {
        sessions.splice(0, sessions.length - 30);
      }
      
      localStorage.setItem('palmistry-sessions', JSON.stringify(sessions));
    } catch (error) {
      console.error('保存会话失败:', error);
    }
  }
  
  private static calculateAverageConfidence(sessions: ReadingSession[]): number {
    if (sessions.length === 0) return 0;
    
    let totalConfidence = 0;
    let count = 0;
    
    sessions.forEach(session => {
      if (session.palmistryResult) {
        totalConfidence += session.palmistryResult.confidence;
        count++;
      }
      if (session.faceReadingResult) {
        totalConfidence += session.faceReadingResult.confidence;
        count++;
      }
    });
    
    return count > 0 ? totalConfidence / count : 0;
  }
  
  // 数据验证
  static validatePalmistryInput(input: PalmistryInput): string[] {
    const errors: string[] = [];
    
    if (!input.handShape.palmShape) {
      errors.push('请选择手掌形状');
    }
    
    if (!input.handShape.fingerLength) {
      errors.push('请选择手指长度');
    }
    
    if (!input.handShape.palmWidth) {
      errors.push('请选择手掌宽度');
    }
    
    // 验证线条信息
    const requiredLines = ['lifeLine', 'heartLine', 'headLine'];
    requiredLines.forEach(line => {
      const lineData = input.lines[line as keyof typeof input.lines];
      if (!lineData.length || !lineData.depth || !lineData.clarity) {
        errors.push(`请完整填写${line}信息`);
      }
    });
    
    return errors;
  }
  
  static validateFaceReadingInput(input: FaceReadingInput): string[] {
    const errors: string[] = [];
    
    if (!input.faceShape.width) {
      errors.push('请选择面部宽度');
    }
    
    if (!input.faceShape.length) {
      errors.push('请选择面部长度');
    }
    
    // 验证面部特征
    const requiredFeatures = ['eyes', 'nose', 'mouth'];
    requiredFeatures.forEach(feature => {
      const featureData = input.features[feature as keyof typeof input.features];
      if (!featureData.shape || !featureData.size) {
        errors.push(`请完整填写${feature}特征`);
      }
    });
    
    return errors;
  }
  
  // 获取预设选项
  static getPresetOptions() {
    return {
      handShapes: [
        { value: 'square', label: '方形' },
        { value: 'rectangle', label: '长方形' },
        { value: 'oval', label: '椭圆形' },
        { value: 'round', label: '圆形' }
      ],
      fingerLengths: [
        { value: 'short', label: '短' },
        { value: 'medium', label: '中等' },
        { value: 'long', label: '长' }
      ],
      palmWidths: [
        { value: 'narrow', label: '窄' },
        { value: 'medium', label: '中等' },
        { value: 'wide', label: '宽' }
      ],
      lineLengths: [
        { value: 'short', label: '短' },
        { value: 'medium', label: '中等' },
        { value: 'long', label: '长' }
      ],
      lineDepths: [
        { value: 'shallow', label: '浅' },
        { value: 'medium', label: '中等' },
        { value: 'deep', label: '深' }
      ],
      lineClarity: [
        { value: 'clear', label: '清晰' },
        { value: 'broken', label: '断续' },
        { value: 'chained', label: '链状' },
        { value: 'faint', label: '模糊' }
      ],
      mountDevelopment: [
        { value: 'underdeveloped', label: '不发达' },
        { value: 'normal', label: '正常' },
        { value: 'overdeveloped', label: '过度发达' }
      ],
      faceWidths: [
        { value: 'narrow', label: '窄' },
        { value: 'medium', label: '中等' },
        { value: 'wide', label: '宽' }
      ],
      faceLengths: [
        { value: 'short', label: '短' },
        { value: 'medium', label: '中等' },
        { value: 'long', label: '长' }
      ],
      jawlines: [
        { value: 'sharp', label: '尖' },
        { value: 'round', label: '圆' },
        { value: 'square', label: '方' }
      ],
      cheekbones: [
        { value: 'prominent', label: '突出' },
        { value: 'medium', label: '中等' },
        { value: 'subtle', label: '平缓' }
      ],
      featureSizes: [
        { value: 'small', label: '小' },
        { value: 'medium', label: '中等' },
        { value: 'large', label: '大' }
      ],
      symmetry: [
        { value: 'symmetrical', label: '对称' },
        { value: 'asymmetrical', label: '不对称' }
      ]
    };
  }
}