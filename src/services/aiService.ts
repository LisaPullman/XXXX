import type { MBTIResult } from '../types';

// 定义 AI 分析的响应类型
export interface AIAnalysisResponse {
  analysis: string;
  suggestions: string[];
  keywords: string[];
  confidence?: number;
  relatedTopics?: string[];
}

export interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  role?: 'user' | 'assistant';
}

class AIService {
  private apiKey: string = '';
  private baseUrl: string = 'https://api.openai.com/v1';

  constructor() {
    // 在实际应用中，这应该从环境变量获取
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
  }

  // 设置 API 密钥
  setApiKey(key: string) {
    this.apiKey = key;
  }

  // 验证 API 密钥是否有效
  async validateApiKey(): Promise<boolean> {
    if (!this.apiKey) return false;
    
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  // 生成 MBTI 结果的 AI 分析
  async analyzeMBTIResult(result: MBTIResult, userContext?: {
    age?: number;
    occupation?: string;
    interests?: string[];
  }): Promise<AIAnalysisResponse> {
    // 如果没有 API 密钥，返回模拟数据
    if (!this.apiKey) {
      return this.getMockMBTIAnalysis(result);
    }

    try {
      const prompt = this.buildMBTIAnalysisPrompt(result, userContext);
      
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `你是一位专业的心理分析师，专门分析MBTI人格类型。请用温暖、专业且易懂的语言提供深度分析。`,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 1500,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || '';

      return this.parseAIResponse(aiResponse);
    } catch (error) {
      console.error('AI分析失败:', error);
      // 如果API调用失败，返回模拟数据
      return this.getMockMBTIAnalysis(result);
    }
  }

  // 构建MBTI分析的提示词
  private buildMBTIAnalysisPrompt(result: MBTIResult, userContext?: {
    age?: number;
    occupation?: string;
    interests?: string[];
  }): string {
    let prompt = `请分析以下MBTI测试结果：

人格类型: ${result.type}

各维度得分:
- 外向性(E) vs 内向性(I): ${result.dimensions.EI > 0 ? result.dimensions.EI + '%' : Math.abs(result.dimensions.EI) + '%'}
- 感觉(S) vs 直觉(N): ${result.dimensions.SN > 0 ? result.dimensions.SN + '%' : Math.abs(result.dimensions.SN) + '%'}
- 思考(T) vs 情感(F): ${result.dimensions.TF > 0 ? result.dimensions.TF + '%' : Math.abs(result.dimensions.TF) + '%'}
- 判断(J) vs 感知(P): ${result.dimensions.JP > 0 ? result.dimensions.JP + '%' : Math.abs(result.dimensions.JP) + '%'}

置信度: ${Math.round(result.confidence * 100)}%`;

    if (userContext) {
      prompt += `\n\n用户背景信息:`;
      if (userContext.age) prompt += `\n- 年龄: ${userContext.age}岁`;
      if (userContext.occupation) prompt += `\n- 职业: ${userContext.occupation}`;
      if (userContext.interests?.length) prompt += `\n- 兴趣爱好: ${userContext.interests.join(', ')}`;
    }

    prompt += `\n\n请提供：
1. 深度性格分析（300-500字）
2. 3-5个具体的个人发展建议
3. 5-8个关键特质关键词

请用JSON格式回复：
{
  "analysis": "详细的性格分析...",
  "suggestions": ["建议1", "建议2", "建议3"],
  "keywords": ["关键词1", "关键词2", "关键词3"]
}`;

    return prompt;
  }

  // 解析AI响应
  private parseAIResponse(response: string): AIAnalysisResponse {
    try {
      // 尝试解析JSON响应
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          analysis: parsed.analysis || '',
          suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
          keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
        };
      }
    } catch (error) {
      console.error('解析AI响应失败:', error);
    }

    // 如果JSON解析失败，尝试文本解析
    return {
      analysis: response,
      suggestions: [],
      keywords: [],
    };
  }

  // 获取模拟MBTI分析（用于演示或API不可用时）
  private getMockMBTIAnalysis(result: MBTIResult): AIAnalysisResponse {
    const mockAnalyses: Record<string, AIAnalysisResponse> = {
      INTJ: {
        analysis: `作为INTJ（建筑师），您是一个充满想象力且意志坚定的思想家，对自己的目标有着清晰的规划。您善于独立思考，具有强烈的内在动机和追求完美的倾向。您的直觉能力让您能够看到事物的潜在可能性，而您的理性思维则帮助您制定切实可行的计划。在人际关系中，您可能会显得有些冷漠，但实际上您只是更注重深度而非广度的交往。您天生具有领导才能，但更倾向于在幕后发挥影响力。`,
        suggestions: [
          '培养更多的人际交往技巧，学会更好地表达自己的想法',
          '定期反思自己的目标，确保它们仍然符合你的价值观',
          '尝试在完美主义和实用主义之间找到平衡',
          '主动寻求他人的反馈，避免陷入思维盲区',
          '培养耐心，学会欣赏过程而不只是结果'
        ],
        keywords: ['独立思考', '战略规划', '创新思维', '完美主义', '内在动机', '长远vision', '深度思考', '效率至上']
      },
      // 可以添加更多类型的模拟分析...
    };

    return mockAnalyses[result.type] || {
      analysis: `您的人格类型是${result.type}，这表明您具有独特的性格特征和认知模式。基于您的测试结果，您在不同维度上展现出了平衡的特质，这为您在各种情况下提供了适应性和灵活性。`,
      suggestions: [
        '继续发展您的优势特质',
        '关注个人成长和自我完善',
        '保持开放的心态面对新挑战',
        '寻求平衡的生活方式',
        '建立支持性的社交网络'
      ],
      keywords: ['适应性', '平衡发展', '个人成长', '灵活性', '自我认知']
    };
  }

  // AI 聊天功能
  async chat(messages: AIMessage[], context?: any): Promise<string> {
    // 如果没有 API 密钥，返回模拟回复
    if (!this.apiKey) {
      return this.getMockChatResponse(messages);
    }

    try {
      const systemPrompt = `你是一位专业的心理咨询师和生活指导师，名字叫"智慧导师"。你具有丰富的心理学知识，特别精通MBTI、星座学、八字等多种人格分析方法。

你的特点：
- 温暖、耐心、善于倾听
- 能够结合多种心理学理论提供深度分析
- 擅长给出实用的生活建议
- 语言亲切自然，富有同理心
- 总是从积极正面的角度引导用户

请用温暖、专业且易懂的语言与用户对话。`;

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map(msg => ({
              role: msg.type === 'user' ? 'user' : 'assistant',
              content: msg.content,
            })),
          ],
          temperature: 0.8,
          max_tokens: 800,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || '抱歉，我现在无法回应，请稍后再试。';
    } catch (error) {
      console.error('AI聊天失败:', error);
      return this.getMockChatResponse(messages);
    }
  }

  // 获取模拟聊天回复
  private getMockChatResponse(messages: AIMessage[]): string {
    const mockResponses = [
      '我理解您的感受。从心理学角度来看，这是很正常的反应。让我们一起来分析一下这个情况...',
      '根据您提到的情况，我建议您可以尝试从以下几个角度来思考这个问题...',
      '这确实是一个有趣的问题。结合MBTI理论，我们可以看到...',
      '您的想法很有道理。从个人成长的角度来说，我认为...',
      '感谢您的分享。我能感受到您对这个问题的重视。让我给您一些建议...'
    ];

    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
  }

  // 生成每日运势
  async generateDailyFortune(userProfile: {
    mbtiType?: string;
    birthDate?: string;
    astroSign?: string;
  }): Promise<{
    overall: string;
    love: string;
    career: string;
    health: string;
    luckyColor: string;
    luckyNumber: number;
  }> {
    // 这里可以集成真实的运势算法或API
    // 目前返回模拟数据
    return {
      overall: '今天是充满机会的一天，保持积极的心态会为您带来意想不到的收获。',
      love: '感情方面运势平稳，已有伴侣的你们关系和谐，单身的朋友可能会遇到有趣的人。',
      career: '工作中可能会遇到新的挑战，但这正是展现您能力的好机会。',
      health: '注意休息，保持规律的作息时间，适当运动有助于提升精力。',
      luckyColor: '蓝色',
      luckyNumber: 7
    };
  }
}

// 导出单例实例
export const aiService = new AIService();
