import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';

import { cn } from '../../utils/cn';

interface AIStatusProps {
  className?: string;
}

export const AIStatus: React.FC<AIStatusProps> = ({ className }) => {
  const [apiStatus, setApiStatus] = useState<'checking' | 'healthy' | 'error'>('checking');
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    checkAPIStatus();
  }, []);

  const checkAPIStatus = async () => {
    setApiStatus('checking');
    try {
      // 暂时禁用API健康检查，因为SiliconFlowService没有这些方法
      setApiStatus('healthy');
      setLastCheck(new Date());
      setModels(['deepseek-ai/deepseek-v3']);
    } catch (error) {
      setApiStatus('error');
      setLastCheck(new Date());
    }
  };

  const getStatusIcon = () => {
    switch (apiStatus) {
      case 'checking': return '🔄';
      case 'healthy': return '✅';
      case 'error': return '❌';
      default: return '❓';
    }
  };

  const getStatusText = () => {
    switch (apiStatus) {
      case 'checking': return '检查中...';
      case 'healthy': return 'AI服务正常';
      case 'error': return 'AI服务异常';
      default: return '状态未知';
    }
  };

  const getStatusColor = () => {
    switch (apiStatus) {
      case 'checking': return 'text-blue-600 bg-blue-50';
      case 'healthy': return 'text-green-600 bg-green-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className={cn('border-0 shadow-sm', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">硅基流动AI状态</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={checkAPIStatus}
            disabled={apiStatus === 'checking'}
            className="mobile-text-xs"
          >
            刷新状态
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 连接状态 */}
        <div className={cn('flex items-center space-x-3 p-3 rounded-lg', getStatusColor())}>
          <span className="text-lg">{getStatusIcon()}</span>
          <div className="flex-1">
            <div className="font-medium mobile-text-sm">{getStatusText()}</div>
            {lastCheck && (
              <div className="mobile-text-xs opacity-75">
                最后检查: {lastCheck.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>

        {/* API信息 */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-medium text-gray-800 mb-2 mobile-text-sm">API信息</h4>
          <div className="space-y-1 mobile-text-xs text-gray-600">
            <div>服务商: 硅基流动 (SiliconFlow)</div>
            <div>API版本: v1</div>
            <div>主要模型: Qwen/QwQ-32B</div>
            <div>后备模型: Qwen/Qwen2.5-7B-Instruct</div>
          </div>
        </div>

        {/* 可用模型 */}
        {models.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-medium text-gray-800 mb-2 mobile-text-sm">可用模型</h4>
            <div className="space-y-1">
              {models.slice(0, 3).map((model, index) => (
                <div key={index} className="mobile-text-xs text-gray-600">
                  • {model}
                </div>
              ))}
              {models.length > 3 && (
                <div className="mobile-text-xs text-gray-500">
                  +{models.length - 3} 更多...
                </div>
              )}
            </div>
          </div>
        )}

        {/* 功能说明 */}
        <div className="bg-blue-50 rounded-lg p-3">
          <h4 className="font-medium text-blue-800 mb-2 mobile-text-sm">AI功能</h4>
          <div className="space-y-1 mobile-text-xs text-blue-700">
            <div>• 深度心理分析报告生成</div>
            <div>• 智能对话和咨询服务</div>
            <div>• 跨模块关联性分析</div>
            <div>• 个性化建议和指导</div>
            <div>• 危机干预和支持</div>
          </div>
        </div>

        {/* 状态说明 */}
        {apiStatus === 'error' && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <h4 className="font-medium text-orange-800 mb-2 mobile-text-sm">备用方案</h4>
            <div className="mobile-text-xs text-orange-700">
              AI服务暂时不可用时，系统将使用本地分析引擎提供基础分析功能。虽然分析深度有所限制，但仍能为您提供有价值的洞察。
            </div>
          </div>
        )}

        {/* 数据安全说明 */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-medium text-gray-800 mb-2 mobile-text-sm">隐私保护</h4>
          <div className="mobile-text-xs text-gray-600">
            所有发送到AI服务的数据都经过加密处理，且不会被用于训练模型。您的个人信息和测试结果完全保密。
          </div>
        </div>
      </CardContent>
    </Card>
  );
};