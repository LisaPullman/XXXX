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
  temperature: 0.7,
  // TTS 配置
  ttsModel: 'FunAudioLLM/CosyVoice2-0.5B',
  ttsVoice: 'FunAudioLLM/CosyVoice2-0.5B:benjamin', // 沉稳男声，适合智者
  ttsSpeed: 0.9, // 稍慢的语速，更有智者风范
  ttsGain: 2.0   // 稍微增强音量
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

// TTS 请求接口
interface TTSRequest {
  model: string;
  input: string;
  voice: string;
  response_format?: 'mp3' | 'opus' | 'wav' | 'pcm';
  speed?: number;
  gain?: number;
}

/**
 * SiliconFlow API Service Class
 */
class SiliconFlowService {
  private static instance: SiliconFlowService;
  private apiKey: string;
  private baseURL: string;
  private currentAudio: HTMLAudioElement | null = null;
  private currentAudioUrl: string | null = null;

  private constructor() {
    this.apiKey = SILICON_FLOW_CONFIG.apiKey;
    this.baseURL = SILICON_FLOW_CONFIG.baseURL;
  }

  public static getInstance(): SiliconFlowService {
    if (!SiliconFlowService.instance) {
      SiliconFlowService.instance = new SiliconFlowService();
    }
    return SiliconFlowService.instance;
  }

  /**
   * 文本转语音 - 智者语音
   * @param text 要转换的文本
   * @param options 可选配置
   * @returns Promise<Blob> 音频数据
   */
  async textToSpeech(
    text: string, 
    options: {
      voice?: string;
      speed?: number;
      gain?: number;
      format?: 'mp3' | 'opus' | 'wav' | 'pcm';
    } = {}
  ): Promise<Blob> {
    const requestData: TTSRequest = {
      model: SILICON_FLOW_CONFIG.ttsModel,
      input: text,
      voice: options.voice || SILICON_FLOW_CONFIG.ttsVoice,
      response_format: options.format || 'mp3',
      speed: options.speed || SILICON_FLOW_CONFIG.ttsSpeed,
      gain: options.gain || SILICON_FLOW_CONFIG.ttsGain
    };

    try {
      const response = await fetch(`${this.baseURL}/audio/speech`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`TTS API request failed: ${response.status} ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      return audioBlob;
    } catch (error) {
      console.error('TTS conversion failed:', error);
      throw new Error('智者语音转换失败，请稍后重试');
    }
  }

  /**
   * 停止当前播放的音频
   */
  stopCurrentAudio(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }

    if (this.currentAudioUrl) {
      URL.revokeObjectURL(this.currentAudioUrl);
      this.currentAudioUrl = null;
    }
  }

  /**
   * 检查是否有音频正在播放
   */
  isPlaying(): boolean {
    return this.currentAudio !== null && !this.currentAudio.paused;
  }

  /**
   * 播放音频
   * @param audioBlob 音频数据
   * @returns Promise<void>
   */
  async playAudio(audioBlob: Blob): Promise<void> {
    try {
      // 停止当前播放的音频
      this.stopCurrentAudio();

      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      // 保存引用以便控制
      this.currentAudio = audio;
      this.currentAudioUrl = audioUrl;

      // 设置音频属性
      audio.volume = 0.8; // 适中的音量
      audio.preload = 'auto';

      return new Promise((resolve, reject) => {
        audio.onended = () => {
          // 播放结束时清理
          if (this.currentAudio === audio) {
            this.currentAudio = null;
          }
          if (this.currentAudioUrl === audioUrl) {
            URL.revokeObjectURL(audioUrl);
            this.currentAudioUrl = null;
          }
          resolve();
        };

        audio.onerror = (e) => {
          console.error('Audio playback error:', e);
          // 错误时清理
          if (this.currentAudio === audio) {
            this.currentAudio = null;
          }
          if (this.currentAudioUrl === audioUrl) {
            URL.revokeObjectURL(audioUrl);
            this.currentAudioUrl = null;
          }
          reject(new Error('音频播放失败'));
        };

        audio.oncanplaythrough = () => {
          audio.play().catch(reject);
        };

        // 加载音频
        audio.load();
      });
    } catch (error) {
      console.error('Audio playback failed:', error);
      throw new Error('音频播放失败');
    }
  }

  /**
   * 智者语音回复 - 将文本转换为语音并播放
   * @param text 智者的回复文本
   * @param options 可选配置
   * @returns Promise<{ audioBlob: Blob; play: () => Promise<void>; stop: () => void }>
   */
  async speakAsWiseMaster(
    text: string,
    options: {
      voice?: string;
      speed?: number;
      gain?: number;
      autoPlay?: boolean;
    } = {}
  ): Promise<{ audioBlob: Blob; play: () => Promise<void>; stop: () => void }> {
    // 清理文本，确保只播报纯文字内容
    const cleanText = this.enhanceTextForSpeech(text);

    // 如果清理后的文本为空或过短，使用默认文本
    if (!cleanText || cleanText.trim().length < 2) {
      console.warn('文本清理后为空，使用默认文本');
      const defaultText = '智者正在为您思考。';
      const audioBlob = await this.textToSpeech(defaultText, {
        voice: options.voice || SILICON_FLOW_CONFIG.ttsVoice,
        speed: options.speed || SILICON_FLOW_CONFIG.ttsSpeed,
        gain: options.gain || SILICON_FLOW_CONFIG.ttsGain,
        format: 'mp3'
      });

      const playFunction = async () => {
        await this.playAudio(audioBlob);
      };

      const stopFunction = () => {
        this.stopCurrentAudio();
      };

      if (options.autoPlay !== false) {
        await playFunction();
      }

      return {
        audioBlob,
        play: playFunction,
        stop: stopFunction
      };
    }

    const audioBlob = await this.textToSpeech(cleanText, {
      voice: options.voice || SILICON_FLOW_CONFIG.ttsVoice,
      speed: options.speed || SILICON_FLOW_CONFIG.ttsSpeed,
      gain: options.gain || SILICON_FLOW_CONFIG.ttsGain,
      format: 'mp3'
    });

    const playFunction = async () => {
      await this.playAudio(audioBlob);
    };

    const stopFunction = () => {
      this.stopCurrentAudio();
    };

    // 如果设置了自动播放，立即播放
    if (options.autoPlay !== false) {
      await playFunction();
    }

    return {
      audioBlob,
      play: playFunction,
      stop: stopFunction
    };
  }

  /**
   * 清理并优化文本以获得更好的语音效果
   * @param text 原始文本
   * @returns 清理后的纯文本
   */
  private enhanceTextForSpeech(text: string): string {
    let cleanText = text;

    // 第一步：移除所有markdown格式标记
    cleanText = cleanText.replace(/\*\*(.*?)\*\*/g, '$1'); // 粗体 **text**
    cleanText = cleanText.replace(/\*(.*?)\*/g, '$1'); // 斜体 *text*
    cleanText = cleanText.replace(/__(.*?)__/g, '$1'); // 下划线粗体 __text__
    cleanText = cleanText.replace(/_(.*?)_/g, '$1'); // 下划线斜体 _text_
    cleanText = cleanText.replace(/`(.*?)`/g, '$1'); // 行内代码 `code`
    cleanText = cleanText.replace(/```[\s\S]*?```/g, ''); // 代码块
    cleanText = cleanText.replace(/~~(.*?)~~/g, '$1'); // 删除线 ~~text~~

    // 第二步：移除各种括号和特殊符号
    cleanText = cleanText.replace(/[【】〖〗〔〕［］]/g, ''); // 中文方括号
    cleanText = cleanText.replace(/\[.*?\]/g, ''); // 英文方括号及内容
    cleanText = cleanText.replace(/\{.*?\}/g, ''); // 花括号及内容
    cleanText = cleanText.replace(/\<.*?\>/g, ''); // 尖括号及内容（如HTML标签）
    cleanText = cleanText.replace(/（.*?）/g, ''); // 中文圆括号内容（通常是注释）
    cleanText = cleanText.replace(/\(.*?\)/g, ''); // 英文圆括号内容

    // 第三步：移除特殊转义符和控制字符
    cleanText = cleanText.replace(/\\n/g, ' '); // 换行符
    cleanText = cleanText.replace(/\\t/g, ' '); // 制表符
    cleanText = cleanText.replace(/\\r/g, ' '); // 回车符
    cleanText = cleanText.replace(/\\/g, ''); // 反斜杠
    cleanText = cleanText.replace(/&nbsp;/g, ' '); // HTML空格
    cleanText = cleanText.replace(/&amp;/g, '和'); // HTML &符号
    cleanText = cleanText.replace(/&lt;/g, '小于'); // HTML <
    cleanText = cleanText.replace(/&gt;/g, '大于'); // HTML >
    cleanText = cleanText.replace(/&quot;/g, '"'); // HTML 引号

    // 第四步：移除链接和邮箱
    cleanText = cleanText.replace(/https?:\/\/[^\s]+/g, ''); // HTTP链接
    cleanText = cleanText.replace(/www\.[^\s]+/g, ''); // www链接
    cleanText = cleanText.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, ''); // 邮箱

    // 第五步：移除数字编号和列表符号
    cleanText = cleanText.replace(/^\d+\.\s*/gm, ''); // 数字列表 1. 2. 3.
    cleanText = cleanText.replace(/^[-*+]\s*/gm, ''); // 无序列表 - * +
    cleanText = cleanText.replace(/^>\s*/gm, ''); // 引用符号 >

    // 第六步：清理多余的空白字符
    cleanText = cleanText.replace(/\s+/g, ' '); // 多个空格合并为一个
    cleanText = cleanText.replace(/^\s+|\s+$/g, ''); // 去除首尾空格
    cleanText = cleanText.replace(/\n\s*\n/g, '\n'); // 多个换行合并

    // 第七步：移除纯符号行
    cleanText = cleanText.replace(/^[^\u4e00-\u9fa5a-zA-Z0-9]+$/gm, ''); // 移除只包含符号的行

    // 第八步：确保文本适合语音播报
    // 替换一些不适合语音的符号
    cleanText = cleanText.replace(/\.\.\./g, '，停顿，'); // 省略号
    cleanText = cleanText.replace(/—/g, '，'); // 破折号
    cleanText = cleanText.replace(/–/g, '，'); // 短破折号
    cleanText = cleanText.replace(/"/g, ''); // 左双引号
    cleanText = cleanText.replace(/"/g, ''); // 右双引号
    cleanText = cleanText.replace(/'/g, ''); // 左单引号
    cleanText = cleanText.replace(/'/g, ''); // 右单引号

    // 第九步：最终清理
    cleanText = cleanText.replace(/\s+/g, ' ').trim(); // 再次清理空格

    // 第十步：长度限制（保持完整句子）
    if (cleanText.length > 150) {
      // 找到最后一个句号、问号或感叹号的位置
      const lastPunctuation = Math.max(
        cleanText.lastIndexOf('。', 150),
        cleanText.lastIndexOf('？', 150),
        cleanText.lastIndexOf('！', 150)
      );

      if (lastPunctuation > 50) {
        cleanText = cleanText.substring(0, lastPunctuation + 1);
      } else {
        cleanText = cleanText.substring(0, 150) + '。';
      }
    }

    // 确保文本不为空
    if (!cleanText || cleanText.trim().length === 0) {
      cleanText = '智者正在思考中。';
    }

    // 开发环境下显示文本清理对比
    if (process.env.NODE_ENV === 'development') {
      console.group('🔊 TTS文本清理');
      console.log('原始文本:', text);
      console.log('清理后文本:', cleanText);
      console.log('字符数:', `${text.length} → ${cleanText.length}`);
      console.groupEnd();
    }

    return cleanText;
  }

  /**
   * Make API call to SiliconFlow
   */
  private static async makeAPICall(request: SiliconFlowRequest): Promise<SiliconFlowResponse> {
    try {
      const response = await fetch(`${SILICON_FLOW_CONFIG.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SILICON_FLOW_CONFIG.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: request.model,
          messages: request.messages,
          max_tokens: request.max_tokens || SILICON_FLOW_CONFIG.maxTokens,
          temperature: request.temperature || SILICON_FLOW_CONFIG.temperature,
          stream: false
        })
      });

      if (!response.ok) {
        // 如果主模型失败，尝试备用模型
        if (request.model === SILICON_FLOW_CONFIG.defaultModel) {
          return await this.makeAPICall({
            ...request,
            model: SILICON_FLOW_CONFIG.fallbackModel
          });
        }
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('SiliconFlow API call failed:', error);
      throw error;
    }
  }

  /**
   * 生成AI聊天回复
   * @param messages 消息历史
   * @param options 可选配置
   * @returns Promise<string> AI回复
   */
  static async generateChatResponse(
    messages: SiliconFlowMessage[],
    options: {
      model?: string;
      maxTokens?: number;
      temperature?: number;
    } = {}
  ): Promise<string> {
    const request: SiliconFlowRequest = {
      model: options.model || SILICON_FLOW_CONFIG.defaultModel,
      messages,
      max_tokens: options.maxTokens || SILICON_FLOW_CONFIG.maxTokens,
      temperature: options.temperature || SILICON_FLOW_CONFIG.temperature
    };

    try {
      const response = await this.makeAPICall(request);
      return response.choices[0]?.message?.content || '抱歉，我现在无法回复，请稍后重试。';
    } catch (error) {
      console.error('Chat response generation failed:', error);
      return '抱歉，我现在无法回复，请稍后重试。';
    }
  }

  /**
   * 生成MBTI分析
   * @param answers 答案数组
   * @param userInfo 用户信息
   * @returns Promise<string> MBTI分析结果
   */
  static async generateMBTIAnalysis(
    answers: number[],
    userInfo?: Record<string, any>
  ): Promise<string> {
    const messages: SiliconFlowMessage[] = [
      {
        role: 'system',
        content: `你是一位专业的MBTI心理分析师。基于用户的测试答案，生成详细的MBTI分析报告。
        
请分析用户的性格类型，并提供：
1. MBTI类型判断（如INTJ、ENFP等）
2. 性格特征详细描述
3. 优势与劣势分析
4. 职业发展建议
5. 人际关系指导
6. 个人成长建议

请用温和、专业的语调，避免过于学术化的表达。`
      },
      {
        role: 'user',
        content: `请基于以下MBTI测试答案生成分析报告：
        
答案数组：${JSON.stringify(answers)}
用户信息：${userInfo ? JSON.stringify(userInfo) : '未提供'}

请提供详细的MBTI分析。`
      }
    ];

    const request: SiliconFlowRequest = {
      model: SILICON_FLOW_CONFIG.defaultModel,
      messages,
      max_tokens: SILICON_FLOW_CONFIG.maxTokens,
      temperature: SILICON_FLOW_CONFIG.temperature
    };

    try {
      const response = await this.makeAPICall(request);
      return response.choices[0]?.message?.content || '分析生成失败，请重试';
    } catch (error) {
      console.error('MBTI分析生成失败:', error);
      return '抱歉，分析生成失败，请稍后重试。';
    }
  }

  /**
   * 生成星座分析
   * @param zodiacSign 星座
   * @param birthDate 出生日期
   * @param userInfo 用户信息
   * @returns Promise<string> 星座分析结果
   */
  static async generateAstrologyAnalysis(
    zodiacSign: string,
    birthDate: string,
    userInfo?: Record<string, any>
  ): Promise<string> {
    const messages: SiliconFlowMessage[] = [
      {
        role: 'system',
        content: `你是一位专业的占星师，擅长星座性格分析和运势预测。
        
请基于用户的星座信息，生成详细的星座分析报告，包括：
1. 星座性格特征
2. 优势与天赋
3. 感情特质
4. 事业发展
5. 健康建议
6. 近期运势

请用神秘而温和的语调，富有诗意和启发性。`
      },
      {
        role: 'user',
        content: `请为${zodiacSign}座生成详细分析：
        
出生日期：${birthDate}
用户信息：${userInfo ? JSON.stringify(userInfo) : '未提供'}

请提供全面的星座分析和运势指导。`
      }
    ];

    const request: SiliconFlowRequest = {
      model: SILICON_FLOW_CONFIG.defaultModel,
      messages,
      max_tokens: SILICON_FLOW_CONFIG.maxTokens,
      temperature: SILICON_FLOW_CONFIG.temperature
    };

    try {
      const response = await this.makeAPICall(request);
      return response.choices[0]?.message?.content || '分析生成失败，请重试';
    } catch (error) {
      console.error('星座分析生成失败:', error);
      return '抱歉，分析生成失败，请稍后重试。';
    }
  }

  /**
   * 生成塔罗牌解读
   * @param cards 抽取的卡牌
   * @param question 问题
   * @param userInfo 用户信息
   * @returns Promise<string> 塔罗牌解读
   */
  static async generateTarotReading(
    cards: Array<{ name: string; meaning: string; position: string }>,
    question: string,
    userInfo?: Record<string, any>
  ): Promise<string> {
    const messages: SiliconFlowMessage[] = [
      {
        role: 'system',
        content: `你是一位资深的塔罗牌解读师，拥有深厚的神秘学知识。
        
请基于用户抽取的塔罗牌，生成详细的解读报告，包括：
1. 每张牌的含义解析
2. 牌面组合的深层寓意
3. 对用户问题的具体回答
4. 未来趋势预测
5. 行动建议

请用神秘而富有智慧的语调，充满象征性和启发性。`
      },
      {
        role: 'user',
        content: `请解读以下塔罗牌：
        
问题：${question}
抽取的牌：${JSON.stringify(cards)}
用户信息：${userInfo ? JSON.stringify(userInfo) : '未提供'}

请提供深入的塔罗牌解读。`
      }
    ];

    const request: SiliconFlowRequest = {
      model: SILICON_FLOW_CONFIG.defaultModel,
      messages,
      max_tokens: SILICON_FLOW_CONFIG.maxTokens,
      temperature: SILICON_FLOW_CONFIG.temperature
    };

    try {
      const response = await this.makeAPICall(request);
      return response.choices[0]?.message?.content || '解读生成失败，请重试';
    } catch (error) {
      console.error('塔罗牌解读生成失败:', error);
      return '抱歉，解读生成失败，请稍后重试。';
    }
  }

  /**
   * 生成易经八卦解读
   * @param hexagram 卦象
   * @param question 问题
   * @param userInfo 用户信息
   * @returns Promise<string> 易经解读
   */
  static async generateIChingReading(
    hexagram: { name: string; symbol: string; meaning: string },
    question: string,
    userInfo?: Record<string, any>
  ): Promise<string> {
    const messages: SiliconFlowMessage[] = [
      {
        role: 'system',
        content: `你是一位精通易经的智者，深谙阴阳五行之道。
        
请基于用户得到的卦象，生成详细的易经解读，包括：
1. 卦象含义解析
2. 卦辞爻辞解读
3. 对用户问题的指导
4. 吉凶判断
5. 行动建议
6. 人生哲理

请用古朴典雅的语调，富含哲理和智慧。`
      },
      {
        role: 'user',
        content: `请解读以下卦象：
        
问题：${question}
卦象：${JSON.stringify(hexagram)}
用户信息：${userInfo ? JSON.stringify(userInfo) : '未提供'}

请提供深入的易经解读。`
      }
    ];

    const request: SiliconFlowRequest = {
      model: SILICON_FLOW_CONFIG.defaultModel,
      messages,
      max_tokens: SILICON_FLOW_CONFIG.maxTokens,
      temperature: SILICON_FLOW_CONFIG.temperature
    };

    try {
      const response = await this.makeAPICall(request);
      return response.choices[0]?.message?.content || '解读生成失败，请重试';
    } catch (error) {
      console.error('易经解读生成失败:', error);
      return '抱歉，解读生成失败，请稍后重试。';
    }
  }

  /**
   * 生成综合心理分析
   * @param allResults 所有测试结果
   * @param userInfo 用户信息
   * @returns Promise<string> 综合分析
   */
  static async generateComprehensiveAnalysis(
    allResults: Record<string, any>,
    userInfo?: Record<string, any>
  ): Promise<string> {
    const messages: SiliconFlowMessage[] = [
      {
        role: 'system',
        content: `你是一位综合心理分析专家，能够整合多种测试结果，提供全面的人格分析。
        
请基于用户的所有测试结果，生成综合分析报告，包括：
1. 性格特征综合分析
2. 多维度人格画像
3. 优势与潜能发掘
4. 发展建议与规划
5. 生活指导与建议
6. 未来发展趋势

请用专业而温和的语调，提供深入而实用的建议。`
      },
      {
        role: 'user',
        content: `请基于以下所有测试结果生成综合分析：
        
测试结果：${JSON.stringify(allResults)}
用户信息：${userInfo ? JSON.stringify(userInfo) : '未提供'}

请提供全面的综合心理分析。`
      }
    ];

    const request: SiliconFlowRequest = {
      model: SILICON_FLOW_CONFIG.defaultModel,
      messages,
      max_tokens: SILICON_FLOW_CONFIG.maxTokens,
      temperature: SILICON_FLOW_CONFIG.temperature
    };

    try {
      const response = await this.makeAPICall(request);
      return response.choices[0]?.message?.content || '分析生成失败，请重试';
    } catch (error) {
      console.error('综合分析生成失败:', error);
      return '抱歉，分析生成失败，请稍后重试。';
    }
  }

  /**
   * 获取可用的TTS音色列表
   * @returns 音色列表
   */
  getAvailableVoices(): Array<{ id: string; name: string; description: string; gender: string }> {
    return [
      {
        id: 'FunAudioLLM/CosyVoice2-0.5B:benjamin',
        name: '智者·沉稳',
        description: '低沉稳重的男声，适合智者形象',
        gender: 'male'
      },
      {
        id: 'FunAudioLLM/CosyVoice2-0.5B:charles',
        name: '智者·磁性',
        description: '磁性深沉的男声，富有魅力',
        gender: 'male'
      },
      {
        id: 'FunAudioLLM/CosyVoice2-0.5B:alex',
        name: '智者·温和',
        description: '温和沉稳的男声，平易近人',
        gender: 'male'
      },
      {
        id: 'FunAudioLLM/CosyVoice2-0.5B:anna',
        name: '智者·温柔',
        description: '沉稳温柔的女声，慈祥和蔼',
        gender: 'female'
      }
    ];
  }
}

export default SiliconFlowService.getInstance();