import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import type { MBTIResult } from '../../types';
import type { AIAnalysisResponse } from '../../services/aiService';
import { aiService } from '../../services/aiService';
import { cn } from '../../utils/cn';

interface AIAnalysisProps {
  mbtiResult: MBTIResult;
  userProfile?: any;
  className?: string;
}

export const AIAnalysis: React.FC<AIAnalysisProps> = ({ 
  mbtiResult, 
  userProfile,
  className 
}) => {
  const [analysis, setAnalysis] = useState<AIAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleAnalyze();
  }, [mbtiResult]);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await aiService.analyzeMBTIResult(mbtiResult, userProfile);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '分析失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    handleAnalyze();
  };

  if (loading) {
    return (
      <Card className={cn('', className)}>
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            {/* 智者思考动画 */}
            <div className="relative mx-auto w-20 h-20">
              {/* 光环效果 */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/30 via-orange-400/30 to-red-400/30 animate-pulse scale-110"></div>
              
              {/* 主体头像 */}
              <div className="relative w-full h-full rounded-full flex items-center justify-center transition-all duration-500 bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 border-2 border-amber-300 shadow-xl">
                {/* 智者表情 */}
                <div className="text-4xl animate-pulse">👴🏻</div>
                
                {/* 眼睛闪烁效果 */}
                <div className="absolute top-6 left-6 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping"></div>
                <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
              
              {/* 智慧光点 */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-75 animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-orange-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-amber-800">智者正在深思...</h3>
              <p className="text-amber-700">
                正在运用五千年智慧分析您的性格特质
              </p>
            </div>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn('border-red-200', className)}>
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-2xl">⚠️</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-red-700">分析失败</h3>
              <p className="text-red-600">{error}</p>
            </div>
            <Button variant="outline" onClick={handleRegenerate}>
              重新生成
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* AI分析主卡片 */}
      <Card variant="glass" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary-500/10 to-accent-500/10 rounded-full -translate-y-16 translate-x-16"></div>
        
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* 智者头像 */}
              <div className="relative w-16 h-16">
                {/* 光环效果 */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 animate-pulse scale-110"></div>
                
                {/* 主体头像 */}
                <div className="relative w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 border-2 border-amber-300 shadow-lg">
                  {/* 智者表情 */}
                  <div className="text-2xl">👴🏻</div>
                  
                  {/* 眼睛闪烁效果 */}
                  <div className="absolute top-4 left-4 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
                  <div className="absolute top-4 right-4 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                </div>
                
                {/* 智慧光点 */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-75 animate-bounce"></div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-amber-800">智者深度解读</h3>
                <p className="text-sm text-amber-700">
                  基于您的{mbtiResult.type}人格类型 · 智慧置信度 {Math.round((analysis.confidence || 0.8) * 100)}%
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleRegenerate} className="text-amber-600 hover:text-amber-800">
              重新解读
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                🤖 AI深度解读
              </h3>
              <p className="text-sm text-gray-500">
                基于你的{mbtiResult.type}人格类型
              </p>
            </div>

            <div className="prose prose-sm max-w-none">
              <h4 className="text-base font-semibold text-gray-800 mb-3">📖 性格解读</h4>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {analysis.analysis}
              </div>
            </div>

            {analysis.suggestions.length > 0 && (
              <div>
                <h4 className="text-base font-semibold text-gray-800 mb-3">💡 成长建议</h4>
                <ul className="space-y-2">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 text-sm mt-0.5">▶</span>
                      <span className="text-gray-700 text-sm">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.keywords.length > 0 && (
              <div>
                <h4 className="text-base font-semibold text-gray-800 mb-3">🏷️ 关键特质</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm rounded-full border border-blue-200"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 建议和相关话题 */}
      {(analysis.suggestions.length > 0 || (analysis.relatedTopics && analysis.relatedTopics.length > 0)) && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* 个性化建议 */}
          {analysis.suggestions.length > 0 && (
            <Card>
              <CardHeader>
                <h4 className="text-lg font-semibold text-green-700">💡 个性化建议</h4>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-600 text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* 相关话题 */}
          {analysis.relatedTopics && analysis.relatedTopics.length > 0 && (
            <Card>
              <CardHeader>
                <h4 className="text-lg font-semibold text-blue-700">🔗 相关话题</h4>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysis.relatedTopics?.map((topic, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer hover:bg-blue-200 transition-colors"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  点击话题标签可以进一步探讨相关内容
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* 互动提示 */}
      <Card className="bg-gradient-to-r from-secondary-100 to-accent-100 border-secondary-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">💬</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-secondary-800">
                想要更深入的分析？
              </p>
              <p className="text-xs text-secondary-600">
                你可以继续与AI导师对话，探讨职业发展、人际关系等话题
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
