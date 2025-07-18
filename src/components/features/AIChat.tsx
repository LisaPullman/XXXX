import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { WiseMasterAvatar } from '../ui/WiseMasterAvatar';
import type { AIMessage } from '../../services/aiService';
import { aiService } from '../../services/aiService';
import siliconFlowService from '../../services/siliconFlowService';
import { cn } from '../../utils/cn';

interface AIChatProps {
  context?: any;
  initialMessage?: string;
  className?: string;
}

export const AIChat: React.FC<AIChatProps> = ({
  context,
  initialMessage: _initialMessage,
  className
}) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: '你好！我是你的专属AI心理分析师。我可以基于你的MBTI测试结果为你提供个性化的指导和建议。有什么想聊的吗？',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'ai',
      content: '💡 你可以问我：\\n- 关于你的性格特质\\n- 职业发展建议\\n- 人际关系指导\\n- 个人成长方向',
      timestamp: new Date(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await aiService.chat([...messages, userMessage], context);
      
      const aiMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);

      // 如果启用了语音，自动播放AI回复
      if (voiceEnabled) {
        await playMessageAudio(response, aiMessage.id);
      }
    } catch (error) {
      console.error('AI回复失败:', error);
      const errorMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: '抱歉，我现在无法回复，请稍后重试。',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const playMessageAudio = async (text: string, messageId: string) => {
    if (isPlaying) return;

    try {
      setIsPlaying(true);
      setCurrentPlayingId(messageId);

      await siliconFlowService.speakAsWiseMaster(text, {
        autoPlay: true,
        speed: 0.9,
        gain: 2.0
      });
    } catch (error) {
      console.error('语音播放失败:', error);
    } finally {
      setIsPlaying(false);
      setCurrentPlayingId(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageContent = (content: string) => {
    return content.split('\\n').map((line, index) => (
      <div key={index} className="mb-1">
        {line}
      </div>
    ));
  };

  return (
    <Card className={cn('flex flex-col h-[600px]', className)}>
      <CardHeader className="flex-shrink-0 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <WiseMasterAvatar 
              size="md" 
              isActive={isLoading}
              isThinking={isLoading}
              showAura={true}
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI智者</h3>
              <p className="text-sm text-gray-500">
                {isLoading ? '正在思考...' : '在线'}
              </p>
            </div>
          </div>
          
          {/* 语音控制按钮 */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={cn(
                "p-2 rounded-full",
                voiceEnabled 
                  ? "text-amber-600 bg-amber-50 hover:bg-amber-100" 
                  : "text-gray-400 hover:text-gray-600"
              )}
              title={voiceEnabled ? "关闭语音" : "开启语音"}
            >
              {voiceEnabled ? '🔊' : '🔇'}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4">
        {/* 消息列表 */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.type === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] p-3 rounded-lg',
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                )}
              >
                <div className="flex items-start gap-2">
                  {message.type === 'ai' && (
                    <WiseMasterAvatar 
                      size="sm" 
                      isActive={currentPlayingId === message.id && isPlaying}
                      isThinking={currentPlayingId === message.id && isPlaying}
                      showAura={false}
                    />
                  )}
                  <div className="flex-1">
                    <div className="text-sm">
                      {formatMessageContent(message.content)}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                      {message.type === 'ai' && (
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => playMessageAudio(message.content, message.id)}
                            disabled={isPlaying}
                            className="p-1 h-6 w-6 text-xs opacity-70 hover:opacity-100"
                            title="播放语音"
                          >
                            {currentPlayingId === message.id && isPlaying ? '⏸️' : '🔊'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* 加载指示器 */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-gray-100">
                <div className="flex items-center gap-2">
                  <WiseMasterAvatar 
                    size="sm" 
                    isActive={true}
                    isThinking={true}
                    showAura={false}
                  />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* 输入框 */}
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="请输入你的问题..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2"
          >
            {isLoading ? '发送中...' : '发送'}
          </Button>
        </div>

        {/* 语音状态提示 */}
        {voiceEnabled && (
          <div className="mt-2 text-xs text-amber-600 flex items-center gap-1">
            <span>🔊</span>
            <span>智者语音已启用</span>
            {isPlaying && <span className="animate-pulse">正在播放...</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
