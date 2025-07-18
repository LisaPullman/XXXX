import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { WiseMasterAvatar } from '../components/ui/WiseMasterAvatar';
import { useThemeStore } from '../stores/useThemeStore';
import siliconFlowService from '../services/siliconFlowService';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface DivinationResult {
  id: string;
  question: string;
  messages: ChatMessage[];
  conclusion: string;
  hexagram: string;
  interpretation: string;
  advice: string;
  createdAt: Date;
}

export const BaguaAIDivinationPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const [currentStep, setCurrentStep] = useState<'intro' | 'chat' | 'result'>('intro');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roundCount, setRoundCount] = useState(0);
  const [userQuestion, setUserQuestion] = useState('');
  const [result, setResult] = useState<DivinationResult | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 语音播报相关状态
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);

  const maxRounds = 5;

  // 智者的开场白
  const sageIntroduction = {
    role: 'assistant' as const,
    content: '欢迎来到易经智慧殿堂，我是通晓古今的智者。在这里，我将运用五千年易经智慧为您指点迷津。请告诉我，您心中有什么困惑需要解答？无论是事业发展、感情婚姻、财运投资，还是人生方向，我都将为您详细分析。',
    timestamp: new Date()
  };

  useEffect(() => {
    if (currentStep === 'chat' && messages.length === 0) {
      setMessages([sageIntroduction]);
    }
  }, [currentStep]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 定期检查播放状态，确保UI状态与实际播放状态同步
  useEffect(() => {
    const checkPlayingStatus = () => {
      const actuallyPlaying = siliconFlowService.isPlaying();
      if (!actuallyPlaying && isPlaying) {
        // 如果实际没有播放但UI显示正在播放，则同步状态
        setIsPlaying(false);
        setCurrentPlayingId(null);
      }
    };

    const interval = setInterval(checkPlayingStatus, 1000); // 每秒检查一次
    return () => clearInterval(interval);
  }, [isPlaying]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 播放智者语音
  const playWiseMasterVoice = async (text: string, messageId: string) => {
    if (isPlaying || !voiceEnabled) return;

    try {
      setIsPlaying(true);
      setCurrentPlayingId(messageId);

      // 使用硅基流动TTS，智者专用音色
      const audioControl = await siliconFlowService.speakAsWiseMaster(text, {
        voice: 'FunAudioLLM/CosyVoice2-0.5B:benjamin', // 低沉男声，适合智者
        speed: 0.85, // 稍慢的语速，更有智者风范
        gain: 1.5,   // 适中的音量
        autoPlay: true
      });

      // 音频播放完成后自动清理状态
      // 注意：autoPlay为true时，speakAsWiseMaster会等待播放完成
    } catch (error) {
      console.error('智者语音播放失败:', error);
    } finally {
      setIsPlaying(false);
      setCurrentPlayingId(null);
    }
  };

  // 停止当前播放
  const stopCurrentVoice = () => {
    try {
      // 调用服务的停止方法
      siliconFlowService.stopCurrentAudio();
    } catch (error) {
      console.error('停止语音播放失败:', error);
    } finally {
      setIsPlaying(false);
      setCurrentPlayingId(null);
    }
  };

  // 单独播放消息语音（不自动播放，返回控制对象）
  const playMessageVoice = async (text: string, messageId: string) => {
    if (isPlaying) {
      // 如果正在播放同一条消息，则停止
      if (currentPlayingId === messageId) {
        stopCurrentVoice();
        return;
      }
      // 如果正在播放其他消息，先停止
      stopCurrentVoice();
    }

    if (!voiceEnabled) return;

    try {
      setIsPlaying(true);
      setCurrentPlayingId(messageId);

      // 使用硅基流动TTS，智者专用音色
      await siliconFlowService.speakAsWiseMaster(text, {
        voice: 'FunAudioLLM/CosyVoice2-0.5B:benjamin',
        speed: 0.85,
        gain: 1.5,
        autoPlay: true
      });
    } catch (error) {
      console.error('智者语音播放失败:', error);
    } finally {
      setIsPlaying(false);
      setCurrentPlayingId(null);
    }
  };

  const startDivination = () => {
    setCurrentStep('chat');
    setMessages([sageIntroduction]);
    setRoundCount(0);

    // 如果启用语音，播放开场白
    if (voiceEnabled) {
      setTimeout(() => {
        playWiseMasterVoice(sageIntroduction.content, 'intro');
      }, 1000);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    // 如果是第一条用户消息，记录为问题
    if (roundCount === 0) {
      setUserQuestion(inputMessage.trim());
    }

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setRoundCount(prev => prev + 1);

    try {
      // 调用硅基流动API
      const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer sk-gfgqiwgqsxzurzcgfbatascayzkbctguoskbnioxvjfyekeg',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-ai/deepseek-v3',
          messages: [
            {
              role: 'system',
              content: `你是一位精通易经八卦的古代智者，具有以下特征：
1. 说话风格古朴典雅，但不过分文言，现代人能理解
2. 深谙易经智慧，能结合八卦原理分析问题
3. 善于从多个角度分析问题，给出实用建议
4. 语言温和有力，富有哲理
5. 每次回复控制在150字以内，简洁有力
6. 当前是第${roundCount + 1}轮对话，总共最多5轮
7. 如果是最后一轮（第5轮），需要给出总结性的建议和结论

请根据用户的问题，运用易经智慧给出指导。`
            },
            ...messages.map(msg => ({
              role: msg.role === 'assistant' ? 'assistant' : 'user',
              content: msg.content
            })),
            {
              role: 'user',
              content: inputMessage.trim()
            }
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('API调用失败');
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || '智者正在深思，请稍后再试...';

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // 如果启用语音，播放智者回复
      if (voiceEnabled) {
        setTimeout(() => {
          playWiseMasterVoice(aiResponse, assistantMessage.timestamp.getTime().toString());
        }, 500); // 稍微延迟，让消息先显示
      }

      // 如果达到最大轮数，生成最终结果
      if (roundCount >= maxRounds - 1) {
        setTimeout(() => {
          generateFinalResult([...messages, userMessage, assistantMessage]);
        }, voiceEnabled ? 3000 : 1000); // 如果有语音，给更多时间播放
      }

    } catch (error) {
      console.error('AI对话失败:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: '抱歉，智者暂时无法回应，请稍后再试。在此期间，您可以静心思考，答案或许就在心中。',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFinalResult = async (finalMessages: ChatMessage[]) => {
    setIsLoading(true);
    
    try {
      // 生成最终结论
      const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer sk-gfgqiwgqsxzurzcgfbatascayzkbctguoskbnioxvjfyekeg',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-ai/deepseek-v3',
          messages: [
            {
              role: 'system',
              content: `基于以上对话，请生成一个完整的易经算命结果，包含：
1. 对应的卦象（从64卦中选择最合适的）
2. 卦象解释（100字以内）
3. 具体建议（150字以内）
4. 总结性结论（100字以内）

请以JSON格式返回：
{
  "hexagram": "卦名",
  "interpretation": "卦象解释",
  "advice": "具体建议", 
  "conclusion": "总结结论"
}`
            },
            ...finalMessages.map(msg => ({
              role: msg.role === 'assistant' ? 'assistant' : 'user',
              content: msg.content
            }))
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      const data = await response.json();
      const resultText = data.choices[0]?.message?.content || '';
      
      let parsedResult;
      try {
        parsedResult = JSON.parse(resultText);
      } catch {
        // 如果解析失败，使用默认结果
        parsedResult = {
          hexagram: "乾卦",
          interpretation: "乾卦象征天，代表刚健不息的精神。此卦提示您要保持积极进取的态度。",
          advice: "建议您在当前情况下保持自信和决心，勇于面对挑战。同时要注意平衡，避免过于刚硬。",
          conclusion: "天行健，君子以自强不息。您的问题将在坚持和努力中得到解决。"
        };
      }

      const finalResult: DivinationResult = {
        id: Date.now().toString(),
        question: userQuestion,
        messages: finalMessages,
        conclusion: parsedResult.conclusion,
        hexagram: parsedResult.hexagram,
        interpretation: parsedResult.interpretation,
        advice: parsedResult.advice,
        createdAt: new Date()
      };

      setResult(finalResult);
      setCurrentStep('result');

    } catch (error) {
      console.error('生成结果失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const shareResult = () => {
    if (!result) return;
    
    // 生成分享链接
    const shareUrl = `${window.location.origin}/bagua/result/${result.id}`;
    
    // 分享到微信朋友圈（实际应用中需要微信SDK）
    if (navigator.share) {
      navigator.share({
        title: '易经AI算运结果',
        text: `我刚刚通过易经AI算运得到了${result.hexagram}的指引：${result.conclusion}`,
        url: shareUrl
      });
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('分享链接已复制到剪贴板');
      });
    }
  };

  if (currentStep === 'intro') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-amber-900 via-orange-900 to-red-900'
          : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* 智者形象 */}
            <div className="flex justify-center mb-8">
              <WiseMasterAvatar 
                size="xl" 
                isActive={true}
                showAura={true}
                className="shadow-2xl"
              />
            </div>

            <h1 className={`text-4xl sm:text-5xl font-bold mb-6 ${
              theme === 'dark' ? 'text-amber-100' : 'text-amber-900'
            }`}>
              AI智者算运
            </h1>

            <p className={`text-lg sm:text-xl mb-8 leading-relaxed ${
              theme === 'dark' ? 'text-amber-200' : 'text-amber-700'
            }`}>
              我是通晓古今的智者，将运用五千年易经智慧为您指点迷津。
              <br />
              无论是事业发展、感情婚姻、财运投资，还是人生方向，
              <br />
              我都将通过深度对话为您详细分析。
            </p>

            <div className={`rounded-2xl p-8 mb-8 ${
              theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
            }`}>
              <h2 className={`text-2xl font-bold mb-4 ${
                theme === 'dark' ? 'text-amber-100' : 'text-amber-900'
              }`}>
                算运流程
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl ${
                    theme === 'dark' ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-600'
                  }`}>
                    💭
                  </div>
                  <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                    提出问题
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                    向智者提出您的困惑和问题
                  </p>
                </div>
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl ${
                    theme === 'dark' ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-600'
                  }`}>
                    💬
                  </div>
                  <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                    深度对话
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                    与智者进行5轮深度对话
                  </p>
                </div>
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl ${
                    theme === 'dark' ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-600'
                  }`}>
                    📜
                  </div>
                  <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                    获得指引
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                    获得卦象解读和人生建议
                  </p>
                </div>
              </div>
            </div>

            {/* 语音设置 */}
            <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700">
              <div className="flex items-center justify-center space-x-3">
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                  🔊 智者语音播报
                </span>
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                    voiceEnabled
                      ? 'bg-amber-500'
                      : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      voiceEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-xs ${theme === 'dark' ? 'text-amber-300' : 'text-amber-600'}`}>
                  {voiceEnabled ? '已开启' : '已关闭'}
                </span>
              </div>
              {voiceEnabled && (
                <p className={`text-xs text-center mt-2 ${theme === 'dark' ? 'text-amber-300' : 'text-amber-600'}`}>
                  智者将用沉稳的声音为您解答疑惑
                </p>
              )}
            </div>

            <Button
              size="lg"
              onClick={startDivination}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-amber-500/25 transform hover:-translate-y-1 transition-all duration-300"
            >
              🧘‍♂️ 开始与智者对话
            </Button>

            <div className="mt-8">
              <Button
                variant="outline"
                onClick={() => navigate('/iching')}
                className={`${
                  theme === 'dark'
                    ? 'border-amber-300/30 text-amber-200 hover:bg-amber-500/10'
                    : 'border-amber-600 text-amber-700 hover:bg-amber-50'
                }`}
              >
                ← 返回八卦首页
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'chat') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-amber-900 via-orange-900 to-red-900'
          : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* 头部信息 */}
            <div className="text-center mb-6">
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <WiseMasterAvatar
                  size="sm"
                  isActive={isLoading}
                  isThinking={isLoading}
                  showAura={false}
                />
                <span className={`font-bold ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                  与智者对话
                </span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  theme === 'dark' ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-600'
                }`}>
                  {roundCount}/{maxRounds}轮
                </span>
              </div>

              {/* 语音控制栏 */}
              <div className="flex items-center justify-center gap-3 mt-4">
                {/* 语音开关 */}
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    voiceEnabled
                      ? 'bg-amber-500 text-white shadow-lg'
                      : theme === 'dark'
                      ? 'bg-white/10 text-amber-200 hover:bg-white/20'
                      : 'bg-white/60 text-amber-700 hover:bg-white/80'
                  }`}
                  title={voiceEnabled ? '关闭智者语音' : '开启智者语音'}
                >
                  {voiceEnabled ? '🔊' : '🔇'}
                  <span>{voiceEnabled ? '语音已开启' : '开启语音'}</span>
                </button>

                {/* 停止播放按钮 */}
                {isPlaying && (
                  <button
                    onClick={stopCurrentVoice}
                    className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all"
                    title="停止播放"
                  >
                    ⏹️
                    <span>停止播放</span>
                  </button>
                )}

                {/* 重新开始按钮 */}
                <button
                  onClick={() => {
                    setCurrentStep('intro');
                    setMessages([]);
                    setRoundCount(0);
                    setUserQuestion('');
                    setResult(null);
                    stopCurrentVoice();
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    theme === 'dark'
                      ? 'bg-white/10 text-amber-200 hover:bg-white/20'
                      : 'bg-white/60 text-amber-700 hover:bg-white/80'
                  }`}
                  title="重新开始对话"
                >
                  🔄
                  <span>重新开始</span>
                </button>
              </div>
            </div>

            {/* 聊天区域 */}
            <div className={`rounded-2xl p-6 mb-6 h-96 overflow-y-auto ${
              theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
            }`}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? theme === 'dark'
                          ? 'bg-amber-500 text-white'
                          : 'bg-amber-500 text-white'
                        : theme === 'dark'
                          ? 'bg-white/20 text-amber-100'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {message.role === 'assistant' && (
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">👴🏻</span>
                            <span className="text-sm font-medium opacity-80">智者</span>
                          </div>
                          {/* 语音播放按钮 */}
                          <button
                            onClick={() => playMessageVoice(message.content, message.timestamp.getTime().toString())}
                            className={`p-1 rounded-full text-xs transition-all ${
                              currentPlayingId === message.timestamp.getTime().toString()
                                ? 'bg-red-500 text-white animate-pulse hover:bg-red-600'
                                : 'hover:bg-amber-500 hover:text-white'
                            } ${
                              theme === 'dark'
                                ? 'text-amber-200'
                                : 'text-gray-600'
                            }`}
                            title={
                              currentPlayingId === message.timestamp.getTime().toString()
                                ? '点击停止播放'
                                : '播放语音'
                            }
                          >
                            {currentPlayingId === message.timestamp.getTime().toString() ? '⏹️' : '▶️'}
                          </button>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-2 opacity-60`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      theme === 'dark' ? 'bg-white/20 text-amber-100' : 'bg-gray-100 text-gray-800'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">👴🏻</span>
                        <span className="text-sm font-medium opacity-80">智者正在思考...</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <span className="ml-2 text-sm">智者正在深思...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* 输入区域 */}
            {roundCount < maxRounds && (
              <div className={`rounded-2xl p-4 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
              }`}>
                <div className="flex gap-3">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={roundCount === 0 ? "请描述您的困惑或问题..." : "继续与智者对话..."}
                    className={`flex-1 px-4 py-3 rounded-xl border-none outline-none resize-none ${
                      theme === 'dark'
                        ? 'bg-white/10 text-amber-100 placeholder-amber-300/50'
                        : 'bg-gray-50 text-gray-800 placeholder-gray-500'
                    }`}
                    rows={2}
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl"
                  >
                    发送
                  </Button>
                </div>
                <p className={`text-xs mt-2 text-center ${
                  theme === 'dark' ? 'text-amber-300/70' : 'text-amber-600/70'
                }`}>
                  按 Enter 发送，Shift + Enter 换行
                </p>
              </div>
            )}

            {/* 进度提示 */}
            {roundCount >= maxRounds && !isLoading && (
              <div className={`text-center py-6 rounded-2xl ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
              }`}>
                <p className={`text-lg font-medium ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                  对话已完成，智者正在为您生成最终的卦象指引...
                </p>
                <div className="mt-4">
                  <div className="w-8 h-8 mx-auto border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'result' && result) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-amber-900 via-orange-900 to-red-900'
          : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* 头部 */}
            <div className="text-center mb-8">
              <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${
                theme === 'dark' ? 'text-amber-100' : 'text-amber-900'
              }`}>
                算运结果
              </h1>
              <p className={`text-lg ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                智者已为您解读卦象，请细心领悟
              </p>
            </div>

            {/* 卦象结果 */}
            <div className={`rounded-2xl p-8 mb-6 ${
              theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
            }`}>
              <div className="text-center mb-6">
                <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                  {result.hexagram}
                </h2>
                <div className="text-6xl mb-4">☯️</div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                    卦象解读
                  </h3>
                  <p className={`leading-relaxed ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                    {result.interpretation}
                  </p>
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                    智者建议
                  </h3>
                  <p className={`leading-relaxed ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                    {result.advice}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-amber-300/30">
                <h3 className={`text-xl font-bold mb-3 text-center ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                  总结
                </h3>
                <p className={`text-lg leading-relaxed text-center ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                  {result.conclusion}
                </p>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={shareResult}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3"
              >
                📱 分享到朋友圈
              </Button>
              <Button
                onClick={() => {
                  setCurrentStep('intro');
                  setMessages([]);
                  setRoundCount(0);
                  setUserQuestion('');
                  setResult(null);
                }}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-3"
              >
                🔄 重新算运
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/iching')}
                className={`${
                  theme === 'dark'
                    ? 'border-amber-300/30 text-amber-200 hover:bg-amber-500/10'
                    : 'border-amber-600 text-amber-700 hover:bg-amber-50'
                }`}
              >
                ← 返回首页
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
