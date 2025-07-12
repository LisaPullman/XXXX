/**
 * SiliconFlow API Service for AI-powered psychological analysis
 * 硅基流动 API 集成服务，用于AI心理分析
 */

// API Configuration
const SILICON_FLOW_CONFIG = {
  baseURL: 'https://api.siliconflow.cn/v1',
  apiKey: 'sk-gfgqiwgqsxzurzcgfbatascayzkbctguoskbnioxvjfyekeg',
  defaultModel: 'Qwen/QwQ-32B', // Best model for analytical reasoning
  fallbackModel: 'Qwen/Qwen2.5-7B-Instruct',
  maxTokens: 2048,
  temperature: 0.7
};

interface SiliconFlowMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface SiliconFlowRequest {
  model: string;
  messages: SiliconFlowMessage[];
  max_tokens?: number;
  temperature?: number;
  stream?: boolean;
}

interface SiliconFlowResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * SiliconFlow API Service Class
 */
export class SiliconFlowService {
  private static readonly config = SILICON_FLOW_CONFIG;

  /**
   * Make API call to SiliconFlow
   */
  private static async makeAPICall(request: SiliconFlowRequest): Promise<SiliconFlowResponse> {
    try {
      const response = await fetch(`${this.config.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: request.model,
          messages: request.messages,
          max_tokens: request.max_tokens || this.config.maxTokens,
          temperature: request.temperature || this.config.temperature,
          stream: false
        })
      });

      if (!response.ok) {
        // Try fallback model if primary model fails
        if (request.model === this.config.defaultModel) {
          console.warn('Primary model failed, trying fallback model...');
          return this.makeAPICall({
            ...request,
            model: this.config.fallbackModel
          });
        }
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      const data: SiliconFlowResponse = await response.json();
      return data;
    } catch (error) {
      console.error('SiliconFlow API error:', error);
      throw new Error(`AI分析服务暂时不可用: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  /**
   * Generate comprehensive psychological analysis
   */
  static async generatePsychologicalAnalysis(analysisData: {
    mbtiResult?: any;
    astrologyResult?: any;
    bloodTypeResult?: any;
    tarotResult?: any;
    palmistryResult?: any;
    ichingResult?: any;
    userGoals: string[];
    focusAreas: string[];
    analysisDepth: 'basic' | 'detailed' | 'comprehensive';
    communicationStyle: 'formal' | 'casual' | 'encouraging';
  }): Promise<string> {
    const systemPrompt = this.buildSystemPrompt(analysisData.communicationStyle);
    const userPrompt = this.buildAnalysisPrompt(analysisData);

    const request: SiliconFlowRequest = {
      model: this.config.defaultModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    };

    const response = await this.makeAPICall(request);
    return response.choices[0]?.message?.content || '分析生成失败，请稍后重试。';
  }

  /**
   * Generate conversational AI response
   */
  static async generateConversationResponse(
    conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
    userMessage: string,
    analysisContext: any
  ): Promise<string> {
    const systemPrompt = this.buildConversationSystemPrompt(analysisContext);
    
    const messages: SiliconFlowMessage[] = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content
      })),
      { role: 'user', content: userMessage }
    ];

    const request: SiliconFlowRequest = {
      model: this.config.defaultModel,
      messages,
      max_tokens: 1024,
      temperature: 0.8
    };

    const response = await this.makeAPICall(request);
    return response.choices[0]?.message?.content || '对不起，我现在无法回应。请稍后再试。';
  }

  /**
   * Generate cross-module analysis insights
   */
  static async generateCrossModuleInsights(
    testResults: Record<string, any>,
    analysisType: 'correlation' | 'pattern' | 'inconsistency' | 'insight'
  ): Promise<string> {
    const systemPrompt = `你是一名专业的心理分析师，擅长整合多种心理测试结果，发现其中的关联性、模式和洞察。
请基于提供的测试结果，生成深度的${analysisType === 'correlation' ? '关联分析' : 
analysisType === 'pattern' ? '模式识别' : 
analysisType === 'inconsistency' ? '差异分析' : '深度洞察'}。
分析应该专业、准确，同时通俗易懂。`;

    const userPrompt = `请分析以下测试结果，重点关注${analysisType === 'correlation' ? '不同测试间的关联性' : 
analysisType === 'pattern' ? '行为和特征模式' : 
analysisType === 'inconsistency' ? '结果间的差异和矛盾' : '深层次的心理洞察'}：

测试结果：
${JSON.stringify(testResults, null, 2)}

请提供：
1. 主要发现和洞察
2. 支持数据和证据
3. 实用的建议和行动计划
4. 可信度评估

格式要求：专业但易懂，条理清晰，具有指导价值。`;

    const request: SiliconFlowRequest = {
      model: this.config.defaultModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    };

    const response = await this.makeAPICall(request);
    return response.choices[0]?.message?.content || '分析生成失败，请稍后重试。';
  }

  /**
   * Generate personalized recommendations
   */
  static async generatePersonalizedRecommendations(
    userProfile: any,
    specificArea: 'career' | 'relationships' | 'personal_growth' | 'health' | 'general'
  ): Promise<string> {
    const systemPrompt = `你是一名经验丰富的人生导师，擅长基于心理分析为个人提供实用的建议和指导。
请根据用户的心理特征和需求，生成针对性的个人发展建议。`;

    const userPrompt = `用户资料：
${JSON.stringify(userProfile, null, 2)}

请为用户在${specificArea === 'career' ? '职业发展' : 
specificArea === 'relationships' ? '人际关系' : 
specificArea === 'personal_growth' ? '个人成长' : 
specificArea === 'health' ? '身心健康' : '综合发展'}方面提供个性化建议：

包括：
1. 基于其性格特征的优势分析
2. 需要关注的发展领域
3. 具体的行动建议（3-5条）
4. 预期效果和时间线
5. 注意事项和风险提醒

要求：建议要具体可执行，符合用户的性格特点，积极正面。`;

    const request: SiliconFlowRequest = {
      model: this.config.defaultModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    };

    const response = await this.makeAPICall(request);
    return response.choices[0]?.message?.content || '建议生成失败，请稍后重试。';
  }

  /**
   * Generate crisis intervention response
   */
  static async generateCrisisResponse(userMessage: string): Promise<string> {
    const systemPrompt = `你是一名专业的心理健康顾问，擅长识别和处理心理危机情况。
当用户表达负面情绪、自伤倾向或其他心理危机信号时，你需要：
1. 表达理解和支持
2. 提供immediate coping strategies
3. 建议寻求专业帮助
4. 提供心理健康资源信息
始终保持专业、同理心和积极的态度。`;

    const request: SiliconFlowRequest = {
      model: this.config.defaultModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.3 // Lower temperature for crisis situations
    };

    const response = await this.makeAPICall(request);
    return response.choices[0]?.message?.content || '我理解您现在的困难。建议您寻求专业心理健康支持。如果情况紧急，请联系当地心理健康热线。';
  }

  /**
   * Build system prompt for psychological analysis
   */
  private static buildSystemPrompt(communicationStyle: string): string {
    const basePrompt = `你是一名资深的心理分析师和人生导师，拥有丰富的心理学知识和实践经验。
你擅长整合多种心理测试结果，为用户提供深度的心理分析和个人发展指导。

你的分析特点：
- 科学严谨：基于心理学理论和测试结果进行分析
- 个性化：针对每个人的独特特征提供定制化建议
- 实用性：提供具体可行的行动建议
- 积极正面：关注优势和成长潜力
- 全面深入：从多个维度进行综合分析`;

    const styleAdditions = {
      formal: '请保持专业、正式的语调，使用准确的心理学术语。',
      casual: '请使用轻松、友好的语调，让用户感到亲切和放松。',
      encouraging: '请采用积极、鼓励的语调，激发用户的自信和动力。'
    };

    return basePrompt + '\n\n' + styleAdditions[communicationStyle as keyof typeof styleAdditions];
  }

  /**
   * Build analysis prompt from user data
   */
  private static buildAnalysisPrompt(analysisData: any): string {
    let prompt = '请基于以下多维度测试结果，为用户生成综合的心理分析报告：\n\n';

    // Add test results
    if (analysisData.mbtiResult) {
      prompt += `MBTI人格测试结果：\n${JSON.stringify(analysisData.mbtiResult, null, 2)}\n\n`;
    }

    if (analysisData.astrologyResult) {
      prompt += `星座分析结果：\n${JSON.stringify(analysisData.astrologyResult, null, 2)}\n\n`;
    }

    if (analysisData.bloodTypeResult) {
      prompt += `血型分析结果：\n${JSON.stringify(analysisData.bloodTypeResult, null, 2)}\n\n`;
    }

    if (analysisData.tarotResult) {
      prompt += `塔罗占卜结果：\n${JSON.stringify(analysisData.tarotResult, null, 2)}\n\n`;
    }

    if (analysisData.palmistryResult) {
      prompt += `手相面相结果：\n${JSON.stringify(analysisData.palmistryResult, null, 2)}\n\n`;
    }

    if (analysisData.ichingResult) {
      prompt += `易经占卜结果：\n${JSON.stringify(analysisData.ichingResult, null, 2)}\n\n`;
    }

    // Add user goals and preferences
    prompt += `用户目标：\n${analysisData.userGoals.join('\n- ')}\n\n`;
    prompt += `关注领域：\n${analysisData.focusAreas.join(', ')}\n\n`;
    prompt += `分析深度要求：${analysisData.analysisDepth}\n\n`;

    prompt += `请提供以下内容的分析报告：

1. **综合人格特征分析**
   - 核心性格特质
   - 行为倾向和决策风格
   - 情绪特征和压力应对

2. **优势与潜力发现**
   - 个人优势和天赋
   - 发展潜力和机会领域
   - 独特价值和贡献

3. **成长领域识别**
   - 需要提升的方面
   - 潜在挑战和限制
   - 发展建议和策略

4. **关联性分析**
   - 不同测试结果的一致性
   - 互补和冲突的特征
   - 综合解读和洞察

5. **个性化建议**
   - 针对用户目标的具体建议
   - 实用的行动计划
   - 实施步骤和时间安排

6. **未来发展方向**
   - 短期和长期目标建议
   - 职业发展路径
   - 生活改善建议

请确保分析内容：
- 基于科学的心理学理论
- 个性化且针对性强
- 积极正面且实用
- 条理清晰且易于理解
- 长度适中且信息丰富

总字数控制在2000-3000字之间。`;

    return prompt;
  }

  /**
   * Build conversation system prompt
   */
  private static buildConversationSystemPrompt(analysisContext: any): string {
    return `你是一名专业的AI心理顾问，正在与用户进行深度的心理咨询对话。

用户的心理分析档案：
${JSON.stringify(analysisContext, null, 2)}

对话指导原则：
1. 基于用户的心理特征进行个性化回应
2. 运用专业的心理学知识和技巧
3. 保持同理心和专业边界
4. 提供建设性的指导和支持
5. 识别并适当处理情绪危机信号
6. 鼓励用户的自我探索和成长

请以专业、温暖、支持性的方式回应用户，每次回应控制在200-400字之间。`;
  }

  /**
   * Check if API is available
   */
  static async checkAPIHealth(): Promise<boolean> {
    try {
      const testRequest: SiliconFlowRequest = {
        model: this.config.defaultModel,
        messages: [
          { role: 'user', content: '测试连接' }
        ],
        max_tokens: 10
      };

      await this.makeAPICall(testRequest);
      return true;
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  }

  /**
   * Get available models
   */
  static getAvailableModels(): string[] {
    return [
      this.config.defaultModel,
      this.config.fallbackModel,
      'Qwen/Qwen2.5-72B-Instruct',
      'Qwen/Qwen2-VL-72B-Instruct',
      'InternLM/InternLM2_5-20B-Chat',
      'GLM-4-9B-Chat'
    ];
  }

  /**
   * Get API usage statistics
   */
  static getAPIUsageStats() {
    // In a real implementation, this would track actual usage
    return {
      totalRequests: 0,
      totalTokens: 0,
      averageResponseTime: 0,
      errorRate: 0,
      lastRequestTime: null
    };
  }
}

export default SiliconFlowService;