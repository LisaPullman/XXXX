import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { UserProfile } from '../components/features/UserProfile';
import { CrossModuleAnalysis } from '../components/features/CrossModuleAnalysis';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { useTestHistoryStore } from '../stores/useTestHistoryStore';

export const AnalysisCenter: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'analysis' | 'overview'>('overview');
  const { history } = useTestHistoryStore();

  const completedModules = new Set(history.map(test => test.type));
  const moduleProgress = (completedModules.size / 8) * 100; // 8个模块

  const tabs = [
    { id: 'overview', label: '总览', icon: '📊' },
    { id: 'profile', label: '个人档案', icon: '👤' },
    { id: 'analysis', label: '关联分析', icon: '🔗' }
  ];

  const availableModules = [
    { id: 'mbti', name: 'MBTI', completed: completedModules.has('mbti') },
    { id: 'astrology', name: '星座', completed: completedModules.has('astrology') },
    { id: 'bloodtype', name: '血型', completed: completedModules.has('bloodtype') },
    { id: 'tarot', name: '塔罗', completed: completedModules.has('tarot') },
    { id: 'palmistry', name: '手相', completed: completedModules.has('palmistry') },
    { id: 'iching', name: '易经', completed: completedModules.has('iching') },
    { id: 'ai-master', name: 'AI大师', completed: completedModules.has('ai-master') },
    { id: 'meditation', name: '冥想', completed: completedModules.has('meditation') }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* 进度概览 */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">🎯 测试进度</h3>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>已完成 {completedModules.size}/8 个模块</span>
              <span>{Math.round(moduleProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${moduleProgress}%` }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {availableModules.map(module => (
              <div 
                key={module.id}
                className={`text-center p-2 rounded-lg text-xs ${
                  module.completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <div className="mb-1">{module.completed ? '✅' : '⭕'}</div>
                <div>{module.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 快速操作 */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">🚀 快速操作</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => setActiveTab('profile')}
              className="p-4 h-auto flex-col"
            >
              <span className="text-2xl mb-2">👤</span>
              <span>查看个人档案</span>
              <span className="text-xs opacity-75">成长轨迹和洞察</span>
            </Button>
            
            <Button 
              onClick={() => setActiveTab('analysis')}
              disabled={completedModules.size < 2}
              className="p-4 h-auto flex-col"
            >
              <span className="text-2xl mb-2">🔗</span>
              <span>关联分析</span>
              <span className="text-xs opacity-75">
                {completedModules.size < 2 ? '需要至少2个测试' : '深度关联洞察'}
              </span>
            </Button>
            
            <Button 
              onClick={() => navigate('/ai-master')}
              disabled={completedModules.size === 0}
              className="p-4 h-auto flex-col"
              variant="outline"
            >
              <span className="text-2xl mb-2">🤖</span>
              <span>AI大师分析</span>
              <span className="text-xs opacity-75">
                {completedModules.size === 0 ? '需要先完成测试' : '硅基流动AI驱动'}
              </span>
            </Button>
            
            <Button 
              onClick={() => navigate('/')}
              className="p-4 h-auto flex-col"
              variant="outline"
            >
              <span className="text-2xl mb-2">🏠</span>
              <span>返回首页</span>
              <span className="text-xs opacity-75">继续其他测试</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 最近活动 */}
      {history.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">📈 最近活动</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {history.slice(0, 5).map((test, index) => (
                <div key={test.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {test.type === 'mbti' ? 'MBTI人格测试' :
                         test.type === 'astrology' ? '星座分析' :
                         test.type === 'bloodtype' ? '血型分析' :
                         test.type === 'tarot' ? '塔罗占卜' :
                         test.type === 'palmistry' ? '手相面相' :
                         test.type === 'iching' ? '易经占卜' :
                         test.type === 'ai-master' ? 'AI大师' :
                         test.type === 'meditation' ? '冥想记录' : test.type}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(test.completedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  {test.confidence && (
                    <div className="text-xs text-gray-500">
                      准确度: {Math.round(test.confidence * 100)}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 头部 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">📊 分析中心</h1>
            <p className="text-lg text-gray-600">
              查看您的个人档案、测试历史和深度关联分析
            </p>
          </div>

          {/* 标签页导航 */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-white rounded-lg shadow-sm p-1">
              {tabs.map(tab => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  className="px-6 py-2 text-sm"
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>

          {/* 内容区域 */}
          <div className="min-h-96">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'profile' && <UserProfile />}
            {activeTab === 'analysis' && <CrossModuleAnalysis />}
          </div>
        </div>
      </div>
    </div>
  );
};