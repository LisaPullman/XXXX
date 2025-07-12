import { 
  AnalysisRequest, 
  ComprehensiveAnalysis, 
  AIConversation, 
  AIMessage, 
  AICoachingSession,
  AIPersonality,
  ModuleType
} from '../types';
import { AIAnalysisEngine } from '../utils/aiAnalysisEngine';
import { aiMasterDatabase } from '../data/aiMasterData';
// import SiliconFlowService from '../../../services/siliconFlowService'; // 暂时注释掉

export class AIMasterService {
  // 执行综合分析 (暂时简化版本)
  static async performComprehensiveAnalysis(request: AnalysisRequest): Promise<ComprehensiveAnalysis> {
    // 模拟AI分析过程的延迟
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    try {
      const analysis = AIAnalysisEngine.generateComprehensiveAnalysis(request);
      
      // 保存分析结果
      this.saveAnalysis(analysis);
      
      return analysis;
    } catch (error) {
      console.error('AI综合分析失败:', error);
      throw new Error('分析过程中出现错误');
    }
  }
  
  // 开始AI对话
  static async startAIConversation(
    analysisId: string, 
    personalityType: string = 'wisdom-guide',
    initialMessage?: string
  ): Promise<AIConversation> {
    const analysis = this.getAnalysis(analysisId);
    if (!analysis) {
      throw new Error('分析结果不存在');
    }
    
    const personality = this.getAIPersonality(personalityType);
    const conversation: AIConversation = {
      id: this.generateId(),
      timestamp: new Date(),
      analysisId,
      messages: [],
      context: {
        userProfile: analysis,
        conversationGoals: [],
        currentFocus: 'general'
      }
    };
    
    // 添加AI的开场消息
    const openingMessage = initialMessage || this.generateOpeningMessage(analysis, personality);
    conversation.messages.push({
      id: this.generateId(),
      timestamp: new Date(),
      sender: 'ai',
      content: openingMessage,
      messageType: 'text',
      metadata: {
        confidence: 0.9,
        sources: ['analysis'],
        relatedInsights: analysis.aiInsights.keyFindings.slice(0, 2)
      }
    });
    
    // 保存对话
    this.saveConversation(conversation);
    
    return conversation;
  }
  
  // 发送消息到AI对话
  static async sendMessageToAI(
    conversationId: string, 
    userMessage: string
  ): Promise<AIMessage> {
    const conversation = this.getConversation(conversationId);
    if (!conversation) {
      throw new Error('对话不存在');
    }
    
    // 添加用户消息
    const userMsg: AIMessage = {
      id: this.generateId(),
      timestamp: new Date(),
      sender: 'user',
      content: userMessage,
      messageType: 'text'
    };
    conversation.messages.push(userMsg);
    
    try {
      // 检查是否需要危机干预
      const crisisKeywords = ['自杀', '自残', '死亡', '结束生命', '活不下去', '没有希望'];
      const needsCrisisIntervention = crisisKeywords.some(keyword => 
        userMessage.toLowerCase().includes(keyword)
      );
      
      let aiResponseContent = '';
      
      if (needsCrisisIntervention) {
        // 使用专门的危机干预AI响应
        aiResponseContent = await SiliconFlowService.generateCrisisResponse(userMessage);
      } else {
        // 构建对话历史
        const conversationHistory = conversation.messages
          .slice(-10) // 只取最近10条消息
          .map(msg => ({
            role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
            content: msg.content
          }));
        
        // 使用硅基流动API生成AI回复
        aiResponseContent = await SiliconFlowService.generateConversationResponse(
          conversationHistory,
          userMessage,
          conversation.context.userProfile
        );
      }
      
      // 创建AI回复消息
      const aiResponse: AIMessage = {
        id: this.generateId(),
        timestamp: new Date(),
        sender: 'ai',
        content: aiResponseContent,
        messageType: needsCrisisIntervention ? 'crisis_support' : 'text',
        metadata: {
          confidence: 0.9,
          sources: ['siliconflow_ai', 'analysis'],
          relatedInsights: conversation.context.userProfile?.aiInsights?.keyFindings?.slice(0, 2) || [],
          isAIGenerated: true
        }
      };
      
      conversation.messages.push(aiResponse);
      
      // 更新对话
      this.saveConversation(conversation);
      
      return aiResponse;
    } catch (error) {
      console.error('AI对话生成失败:', error);
      
      // 回退到本地生成的回复
      const fallbackResponse = this.generateAIResponse(userMessage, conversation);
      fallbackResponse.metadata = {
        ...fallbackResponse.metadata,
        isAIGenerated: false,
        fallbackReason: 'api_error'
      };
      
      conversation.messages.push(fallbackResponse);
      this.saveConversation(conversation);
      
      return fallbackResponse;
    }
  }
  
  // 开始AI指导会话
  static async startCoachingSession(
    analysisId: string,
    sessionType: AICoachingSession['sessionType'],
    objectives: string[]
  ): Promise<AICoachingSession> {
    const session: AICoachingSession = {
      id: this.generateId(),
      timestamp: new Date(),
      userId: 'current-user', // 在实际应用中应该是真实的用户ID
      analysisId,
      sessionType,
      duration: 0,
      objectives,
      outcomes: [],
      nextSteps: [],
      satisfaction: 0
    };
    
    this.saveCoachingSession(session);
    return session;
  }
  
  // 获取AI人格列表
  static getAIPersonalities(): AIPersonality[] {
    return aiMasterDatabase.personalities;
  }
  
  // 获取特定AI人格
  static getAIPersonality(id: string): AIPersonality {
    const personality = aiMasterDatabase.personalities.find(p => 
      p.name.includes(id) || p.specialties.some(s => s.includes(id))
    );
    return personality || aiMasterDatabase.personalities[0];
  }
  
  // 获取分析历史
  static getAnalysisHistory(): ComprehensiveAnalysis[] {
    try {
      const analyses = localStorage.getItem('ai-master-analyses');
      return analyses ? JSON.parse(analyses) : [];
    } catch (error) {
      console.error('获取分析历史失败:', error);
      return [];
    }
  }
  
  // 获取单个分析
  static getAnalysis(analysisId: string): ComprehensiveAnalysis | null {
    const analyses = this.getAnalysisHistory();
    return analyses.find(analysis => analysis.id === analysisId) || null;
  }
  
  // 获取对话历史
  static getConversationHistory(): AIConversation[] {
    try {
      const conversations = localStorage.getItem('ai-master-conversations');
      return conversations ? JSON.parse(conversations) : [];
    } catch (error) {
      console.error('获取对话历史失败:', error);
      return [];
    }
  }
  
  // 获取单个对话
  static getConversation(conversationId: string): AIConversation | null {
    const conversations = this.getConversationHistory();
    return conversations.find(conv => conv.id === conversationId) || null;
  }
  
  // 获取指导会话历史
  static getCoachingHistory(): AICoachingSession[] {
    try {
      const sessions = localStorage.getItem('ai-master-coaching');
      return sessions ? JSON.parse(sessions) : [];
    } catch (error) {
      console.error('获取指导历史失败:', error);
      return [];
    }
  }
  
  // 删除分析
  static deleteAnalysis(analysisId: string): boolean {
    try {
      const analyses = this.getAnalysisHistory();
      const filteredAnalyses = analyses.filter(analysis => analysis.id !== analysisId);
      
      localStorage.setItem('ai-master-analyses', JSON.stringify(filteredAnalyses));
      
      // 同时删除相关的对话
      const conversations = this.getConversationHistory();
      const filteredConversations = conversations.filter(conv => conv.analysisId !== analysisId);
      localStorage.setItem('ai-master-conversations', JSON.stringify(filteredConversations));
      
      return true;
    } catch (error) {
      console.error('删除分析失败:', error);
      return false;
    }
  }
  
  // 导出分析报告
  static exportAnalysis(analysisId: string): string {
    const analysis = this.getAnalysis(analysisId);
    if (!analysis) {
      throw new Error('分析不存在');
    }
    
    const exportData = {
      ...analysis,
      exportTime: new Date().toISOString(),
      version: '1.0'
    };
    
    return JSON.stringify(exportData, null, 2);
  }
  
  // 获取统计信息
  static getStatistics() {
    const analyses = this.getAnalysisHistory();
    const conversations = this.getConversationHistory();
    const sessions = this.getCoachingHistory();
    
    // 分析模块使用情况
    const moduleUsage = new Map<ModuleType, number>();
    analyses.forEach(analysis => {
      Object.keys(analysis.inputData).forEach(key => {
        if (key !== 'userInput') {
          const moduleType = key.replace('Result', '') as ModuleType;
          moduleUsage.set(moduleType, (moduleUsage.get(moduleType) || 0) + 1);
        }
      });
    });
    
    // 计算平均分数
    const avgOverallScore = analyses.length > 0 
      ? analyses.reduce((sum, a) => sum + a.analysis.overallScore, 0) / analyses.length 
      : 0;
    
    const avgConfidence = analyses.length > 0
      ? analyses.reduce((sum, a) => sum + a.analysis.confidence, 0) / analyses.length
      : 0;
    
    return {
      totalAnalyses: analyses.length,
      totalConversations: conversations.length,
      totalCoachingSessions: sessions.length,
      averageOverallScore: Math.round(avgOverallScore),
      averageConfidence: Math.round(avgConfidence * 100),
      moduleUsage: Object.fromEntries(moduleUsage),
      mostRecentAnalysis: analyses.length > 0 ? analyses[analyses.length - 1] : null,
      improvementTrends: this.calculateImprovementTrends(analyses)
    };
  }
  
  // 清空所有数据
  static clearAllData(): boolean {
    try {
      localStorage.removeItem('ai-master-analyses');
      localStorage.removeItem('ai-master-conversations');
      localStorage.removeItem('ai-master-coaching');
      return true;
    } catch (error) {
      console.error('清空数据失败:', error);
      return false;
    }
  }
  
  // 验证分析请求
  static validateAnalysisRequest(request: AnalysisRequest): string[] {
    const errors: string[] = [];
    
    if (!request.includeModules || request.includeModules.length === 0) {
      errors.push('请至少选择一个分析模块');
    }
    
    if (!request.userInput.goals || request.userInput.goals.length === 0) {
      errors.push('请至少设定一个目标');
    }
    
    if (!request.userInput.preferences.analysisDepth) {
      errors.push('请选择分析深度');
    }
    
    // 检查是否有对应的测试结果
    request.includeModules.forEach(module => {
      const resultKey = `${module}Result`;
      if (!request.existingResults[module]) {
        errors.push(`缺少${module}模块的测试结果`);
      }
    });
    
    return errors;
  }
  
  // 获取推荐的分析配置
  static getRecommendedAnalysisConfig(userProfile?: any) {
    return {
      includeModules: ['mbti', 'astrology', 'bloodtype'] as ModuleType[],
      userInput: {
        basicInfo: {
          age: userProfile?.age,
          gender: userProfile?.gender,
          occupation: userProfile?.occupation
        },
        goals: [],
        concerns: [],
        interests: [],
        preferences: {
          analysisDepth: 'detailed' as const,
          focusAreas: ['career', 'relationships', 'personal_growth'],
          communicationStyle: 'encouraging' as const
        }
      },
      existingResults: {}
    };
  }
  
  // 私有方法
  private static saveAnalysis(analysis: ComprehensiveAnalysis) {
    try {
      const analyses = this.getAnalysisHistory();
      analyses.push(analysis);
      
      // 只保留最近20个分析
      if (analyses.length > 20) {
        analyses.splice(0, analyses.length - 20);
      }
      
      localStorage.setItem('ai-master-analyses', JSON.stringify(analyses));
    } catch (error) {
      console.error('保存分析失败:', error);
    }
  }
  
  private static saveConversation(conversation: AIConversation) {
    try {
      const conversations = this.getConversationHistory();
      const existingIndex = conversations.findIndex(c => c.id === conversation.id);
      
      if (existingIndex >= 0) {
        conversations[existingIndex] = conversation;
      } else {
        conversations.push(conversation);
      }
      
      // 只保留最近50个对话
      if (conversations.length > 50) {
        conversations.splice(0, conversations.length - 50);
      }
      
      localStorage.setItem('ai-master-conversations', JSON.stringify(conversations));
    } catch (error) {
      console.error('保存对话失败:', error);
    }
  }
  
  private static saveCoachingSession(session: AICoachingSession) {
    try {
      const sessions = this.getCoachingHistory();
      const existingIndex = sessions.findIndex(s => s.id === session.id);
      
      if (existingIndex >= 0) {
        sessions[existingIndex] = session;
      } else {
        sessions.push(session);
      }
      
      localStorage.setItem('ai-master-coaching', JSON.stringify(sessions));
    } catch (error) {
      console.error('保存指导会话失败:', error);
    }
  }
  
  private static generateOpeningMessage(analysis: ComprehensiveAnalysis, personality: AIPersonality): string {
    const coreTraits = analysis.analysis.personalityProfile.coreTraits.slice(0, 3).join('、');
    const topDimension = analysis.analysis.dimensions.reduce((max, dim) => 
      dim.score > max.score ? dim : max
    );
    
    const openings = [
      `您好！我是您的${personality.name}。通过分析，我看到您是一个${coreTraits}的人，在${topDimension.name}方面表现突出。让我们一起探索您的内在潜力吧！`,
      `很高兴与您相遇！根据您的综合分析，您具有${coreTraits}的特质。作为您的${personality.name}，我将帮助您更好地了解自己，实现成长目标。`,
      `欢迎来到AI大师分析！我注意到您在${topDimension.name}方面有着出色的表现，这是很宝贵的品质。让我们深入探讨如何发挥您的优势吧。`
    ];
    
    return openings[Math.floor(Math.random() * openings.length)];
  }
  
  private static generateAIResponse(userMessage: string, conversation: AIConversation): AIMessage {
    const analysis = conversation.context.userProfile;
    const messageWords = userMessage.toLowerCase().split(/\s+/);
    
    let responseContent = '';
    let messageType: AIMessage['messageType'] = 'text';
    let confidence = 0.8;
    
    // 基于关键词生成回复
    if (messageWords.some(word => ['职业', '工作', '事业', '升职'].includes(word))) {
      responseContent = this.generateCareerAdvice(analysis);
      messageType = 'recommendation';
      confidence = 0.9;
    } else if (messageWords.some(word => ['感情', '恋爱', '关系', '交往'].includes(word))) {
      responseContent = this.generateRelationshipAdvice(analysis);
      messageType = 'recommendation';
      confidence = 0.85;
    } else if (messageWords.some(word => ['焦虑', '压力', '烦恼', '困扰'].includes(word))) {
      responseContent = this.generateWellnessAdvice(analysis);
      messageType = 'recommendation';
      confidence = 0.9;
    } else if (messageWords.some(word => ['怎么', '如何', '建议', '方法'].includes(word))) {
      responseContent = this.generateActionAdvice(analysis, userMessage);
      messageType = 'recommendation';
      confidence = 0.85;
    } else {
      responseContent = this.generateGeneralResponse(analysis, userMessage);
      messageType = 'text';
      confidence = 0.7;
    }
    
    return {
      id: this.generateId(),
      timestamp: new Date(),
      sender: 'ai',
      content: responseContent,
      messageType,
      metadata: {
        confidence,
        sources: ['analysis', 'conversation_context'],
        relatedInsights: analysis.aiInsights.keyFindings.slice(0, 2)
      }
    };
  }
  
  private static generateCareerAdvice(analysis: ComprehensiveAnalysis): string {
    const careerGuidance = analysis.aiInsights.careerGuidance;
    const strengths = analysis.analysis.personalityProfile.strengths.slice(0, 2);
    
    return `基于您的性格分析，我看到您的优势在于${strengths.join('和')}。在职业发展方面，${careerGuidance[0]}。同时，${careerGuidance[1] || '建议您继续发挥自己的特长，在适合的环境中成长'}。您还有什么具体的职业问题想要探讨吗？`;
  }
  
  private static generateRelationshipAdvice(analysis: ComprehensiveAnalysis): string {
    const relationshipAdvice = analysis.aiInsights.relationshipAdvice;
    const communicationStyle = analysis.analysis.personalityProfile.communicationStyle;
    
    return `在人际关系方面，您的沟通风格是${communicationStyle}。${relationshipAdvice[0]}。建议您${relationshipAdvice[1] || '在关系中保持真诚，这是建立深度连接的基础'}。您在人际交往中遇到了什么具体的挑战吗？`;
  }
  
  private static generateWellnessAdvice(analysis: ComprehensiveAnalysis): string {
    const wellnessRecommendations = analysis.aiInsights.wellnessRecommendations;
    const stressResponse = analysis.analysis.personalityProfile.stressResponse;
    
    return `我理解您的困扰。根据您的性格特征，您面对压力时${stressResponse}。建议您${wellnessRecommendations[0]}。同时，${wellnessRecommendations[1] || '保持规律的作息和适当的运动对您会很有帮助'}。您愿意分享更多关于您现在面临的具体压力吗？`;
  }
  
  private static generateActionAdvice(analysis: ComprehensiveAnalysis, userMessage: string): string {
    const actionPlans = analysis.actionPlans;
    const personalizedAdvice = analysis.aiInsights.personalizedAdvice;
    
    if (actionPlans.length > 0) {
      const relevantPlan = actionPlans[0];
      return `关于您的问题，我建议您可以从以下方面入手：${relevantPlan.steps[0]}。具体来说，${personalizedAdvice[0]}。这是一个循序渐进的过程，您可以先从小的改变开始。您觉得哪个建议对您来说最实用？`;
    } else {
      return `基于您的性格特征，${personalizedAdvice[0]}。我建议您先明确具体的目标，然后制定可行的行动计划。您能告诉我更多关于您想要改善的具体方面吗？`;
    }
  }
  
  private static generateGeneralResponse(analysis: ComprehensiveAnalysis, userMessage: string): string {
    const keyFindings = analysis.aiInsights.keyFindings;
    const summary = analysis.aiInsights.summary;
    
    const responses = [
      `我理解您的想法。${summary}。${keyFindings[0]}，这为您提供了很好的基础。您还有什么想要深入了解的方面吗？`,
      `这是一个很好的问题。根据您的分析结果，${keyFindings[1] || keyFindings[0]}。我们可以进一步探讨这个话题。您希望从哪个角度来看待这个问题？`,
      `感谢您的分享。您的性格特征显示出很多积极的方面。${summary}。让我们一起思考如何将这些优势应用到您关心的问题上。`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  private static calculateImprovementTrends(analyses: ComprehensiveAnalysis[]) {
    if (analyses.length < 2) return {};
    
    // 简化的趋势计算
    const recentAnalyses = analyses.slice(-5); // 最近5次分析
    const firstAnalysis = recentAnalyses[0];
    const lastAnalysis = recentAnalyses[recentAnalyses.length - 1];
    
    return {
      overallScoreChange: lastAnalysis.analysis.overallScore - firstAnalysis.analysis.overallScore,
      confidenceChange: lastAnalysis.analysis.confidence - firstAnalysis.analysis.confidence,
      trend: lastAnalysis.analysis.overallScore > firstAnalysis.analysis.overallScore ? 'improving' : 'stable'
    };
  }
  
  private static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}