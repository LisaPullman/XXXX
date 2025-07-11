import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardHeader } from '../ui/Card';
import type { AIMessage } from '../../services/aiService';
import { aiService } from '../../services/aiService';
import { cn } from '../../utils/cn';

interface AIChatProps {
  context?: any;
  initialMessage?: string;
  className?: string;
}

export const AIChat: React.FC<AIChatProps> = ({ 
  context, 
  initialMessage,
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
      content: '💡 你可以问我：\n- 关于你的性格特质\n- 职业发展建议\n- 人际关系指导\n- 个人成长方向',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialMessage) {
      setMessages([{
        role: 'assistant',
        content: initialMessage,
        timestamp: new Date()
      }]);
    } else {
      // 默认欢迎消息
      setMessages([{
        role: 'assistant',
        content: '你好！我是你的AI导师"宇宙"。我可以帮你深入理解测评结果，回答关于性格、职业发展、人际关系等方面的问题。有什么想聊的吗？',
        timestamp: new Date()
      }]);
    }
  }, [initialMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: AIMessage = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await aiService.chat([...messages, userMessage], context);
      
      const assistantMessage: AIMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI对话失败:', error);
      const errorMessage: AIMessage = {
        role: 'assistant',
        content: '抱歉，我现在遇到了一些技术问题。请稍后再试，或者换个问题问我。',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className={cn('flex flex-col h-96', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">宇</span>
          </div>
          <div>
            <h3 className="font-semibold">AI导师 - 宇宙</h3>
            <p className="text-sm text-gray-500">
              {isLoading ? '正在思考...' : '在线'}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* 消息列表 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-lg px-4 py-2',
                  message.role === 'user'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                )}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                {message.timestamp && (
                  <p className={cn(
                    'text-xs mt-1',
                    message.role === 'user' 
                      ? 'text-primary-100' 
                      : 'text-gray-500'
                  )}>
                    {formatTime(message.timestamp)}
                  </p>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入你的问题..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              variant="primary"
            >
              发送
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            按 Enter 发送，Shift + Enter 换行
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
