import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { getDetailedMBTIAnalysis } from '../utils/mbtiCalculator';
import type { MBTIResult } from '../types';
import { cn } from '../../../utils/cn';

interface DetailedAnalysisProps {
  result: MBTIResult;
  className?: string;
}

export const DetailedAnalysis: React.FC<DetailedAnalysisProps> = ({
  result,
  className
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const analysis = getDetailedMBTIAnalysis(result);

  const tabs = [
    { id: 'overview', label: '概览', icon: '📊' },
    { id: 'development', label: '发展建议', icon: '🌱' },
    { id: 'relationships', label: '人际关系', icon: '❤️' },
    { id: 'career', label: '职业指导', icon: '💼' },
    { id: 'stress', label: '压力管理', icon: '🧘' },
    { id: 'growth', label: '成长领域', icon: '📈' },
    { id: 'daily', label: '日常贴士', icon: '💡' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {analysis.nickname} ({result.type})
        </h2>
        <p className="text-gray-600 mobile-text-sm leading-relaxed">
          {analysis.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2 mobile-text-sm">
            ✨ 核心特质
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.traits.map((trait, index) => (
              <span 
                key={index}
                className="bg-green-100 text-green-700 px-2 py-1 rounded mobile-text-xs"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2 mobile-text-sm">
            💪 优势领域
          </h3>
          <ul className="space-y-1">
            {analysis.strengths.slice(0, 4).map((strength, index) => (
              <li key={index} className="text-blue-700 mobile-text-xs">
                • {strength}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-orange-50 p-4 rounded-lg">
        <h3 className="font-semibold text-orange-800 mb-2 mobile-text-sm">
          ⚠️ 注意领域
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {analysis.weaknesses.map((weakness, index) => (
            <div key={index} className="text-orange-700 mobile-text-xs">
              • {weakness}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDevelopment = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
        <h3 className="font-semibold text-purple-800 mb-3 mobile-text-base">
          🎯 核心发展焦点
        </h3>
        <div className="bg-white p-4 rounded-lg border border-purple-100">
          <h4 className="font-medium text-purple-700 mb-2 mobile-text-sm">
            {analysis.personalityDevelopment.overallAdvice.focus}
          </h4>
          <div className="space-y-3">
            <div>
              <p className="text-gray-600 mobile-text-xs mb-2">🚀 实践方法：</p>
              <ul className="space-y-1 pl-4">
                {analysis.personalityDevelopment.overallAdvice.methods.map((method, index) => (
                  <li key={index} className="text-gray-700 mobile-text-xs">
                    • {method}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 p-3 rounded border-l-4 border-red-200">
              <p className="text-red-700 mobile-text-xs">
                ⚠️ {analysis.personalityDevelopment.overallAdvice.warning}
              </p>
            </div>
          </div>
        </div>
      </div>

      {analysis.personalityDevelopment.balancedDimensions.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-4 mobile-text-base">
            ⚖️ 平衡发展领域
          </h3>
          <div className="space-y-4">
            {analysis.personalityDevelopment.balancedDimensions.map((area, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2 mobile-text-sm">
                  {area.title}
                </h4>
                <p className="text-gray-600 mobile-text-xs mb-3">
                  {area.description}
                </p>
                <div className="space-y-1">
                  {area.suggestions.map((suggestion, idx) => (
                    <div key={idx} className="text-gray-700 mobile-text-xs">
                      • {suggestion}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderRelationships = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-3 mobile-text-sm">
            💚 关系优势
          </h3>
          <ul className="space-y-2">
            {analysis.relationshipAdvice.strengths.map((strength, index) => (
              <li key={index} className="text-green-700 mobile-text-xs">
                ✓ {strength}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="font-semibold text-orange-800 mb-3 mobile-text-sm">
            ⚡ 关系挑战
          </h3>
          <ul className="space-y-2">
            {analysis.relationshipAdvice.challenges.map((challenge, index) => (
              <li key={index} className="text-orange-700 mobile-text-xs">
                • {challenge}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-3 mobile-text-sm">
          💝 关系建议
        </h3>
        <div className="space-y-2">
          {analysis.relationshipAdvice.tips.map((tip, index) => (
            <div key={index} className="text-blue-700 mobile-text-xs">
              💡 {tip}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="font-semibold text-purple-800 mb-3 mobile-text-sm">
          💞 兼容性参考
        </h3>
        <div className="flex flex-wrap gap-2">
          {analysis.relationshipAdvice.compatibility.map((type, index) => (
            <span 
              key={index}
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full mobile-text-xs font-medium"
            >
              {type}
            </span>
          ))}
        </div>
        <p className="text-purple-600 mobile-text-xs mt-2">
          * 兼容性仅供参考，真正的关系需要双方的理解和努力
        </p>
      </div>
    </div>
  );

  const renderCareer = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-3 mobile-text-sm">
          🏢 理想工作环境
        </h3>
        <div className="flex flex-wrap gap-2">
          {analysis.careerGuidance.idealEnvironments.map((env, index) => (
            <span 
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded mobile-text-xs"
            >
              {env}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-3 mobile-text-sm">
          💼 工作风格
        </h3>
        <ul className="space-y-1">
          {analysis.careerGuidance.workStyle.map((style, index) => (
            <li key={index} className="text-green-700 mobile-text-xs">
              • {style}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="font-semibold text-purple-800 mb-3 mobile-text-sm">
          👑 领导风格
        </h3>
        <p className="text-purple-700 mobile-text-xs">
          {analysis.careerGuidance.leadershipStyle}
        </p>
      </div>

      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="font-semibold text-red-800 mb-3 mobile-text-sm">
          🚫 需要谨慎的职业
        </h3>
        <div className="space-y-1">
          {analysis.careerGuidance.avoidCareers.map((career, index) => (
            <div key={index} className="text-red-700 mobile-text-xs">
              • {career}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-orange-50 p-4 rounded-lg">
        <h3 className="font-semibold text-orange-800 mb-3 mobile-text-sm">
          📈 职业发展路径
        </h3>
        <p className="text-orange-700 mobile-text-xs">
          {analysis.careerGuidance.growthPath}
        </p>
      </div>
    </div>
  );

  const renderStress = () => (
    <div className="space-y-6">
      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="font-semibold text-red-800 mb-3 mobile-text-sm">
          ⚡ 压力触发因素
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {analysis.stressManagement.stressTriggers.map((trigger, index) => (
            <div key={index} className="text-red-700 mobile-text-xs">
              • {trigger}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-orange-50 p-4 rounded-lg">
        <h3 className="font-semibold text-orange-800 mb-3 mobile-text-sm">
          📡 压力信号
        </h3>
        <div className="space-y-1">
          {analysis.stressManagement.stressSignals.map((signal, index) => (
            <div key={index} className="text-orange-700 mobile-text-xs">
              • {signal}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-3 mobile-text-sm">
          🛡️ 应对策略
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {analysis.stressManagement.copingStrategies.map((strategy, index) => (
            <div key={index} className="text-green-700 mobile-text-xs">
              ✓ {strategy}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-3 mobile-text-sm">
          🧘 放松方法
        </h3>
        <div className="flex flex-wrap gap-2">
          {analysis.stressManagement.relaxationMethods.map((method, index) => (
            <span 
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded mobile-text-xs"
            >
              {method}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGrowth = () => (
    <div className="space-y-6">
      {analysis.growthAreas.length > 0 ? (
        analysis.growthAreas.map((area, index) => (
          <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-3 mobile-text-base">
              📈 {area.area}
            </h3>
            <p className="text-gray-700 mobile-text-sm mb-4">
              {area.description}
            </p>
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-700 mb-2 mobile-text-sm">
                💪 行动建议：
              </h4>
              <ul className="space-y-1">
                {area.actions.map((action, idx) => (
                  <li key={idx} className="text-gray-700 mobile-text-xs">
                    • {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="font-semibold text-green-800 mb-2 mobile-text-base">
            恭喜！你的测试结果很清晰
          </h3>
          <p className="text-green-700 mobile-text-sm">
            你对自己的人格类型有很好的认知，继续保持这种自我意识！
          </p>
        </div>
      )}

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-3 mobile-text-sm">
          🌟 持续成长建议
        </h3>
        <ul className="space-y-2">
          <li className="text-yellow-700 mobile-text-xs">
            • 定期进行自我反思，了解自己的变化和成长
          </li>
          <li className="text-yellow-700 mobile-text-xs">
            • 主动寻求反馈，从不同角度了解自己
          </li>
          <li className="text-yellow-700 mobile-text-xs">
            • 挑战自己的舒适区，尝试新的经历和技能
          </li>
          <li className="text-yellow-700 mobile-text-xs">
            • 保持开放心态，接受个人成长的可能性
          </li>
        </ul>
      </div>
    </div>
  );

  const renderDaily = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-4 mobile-text-base">
          💡 每日实践建议
        </h3>
        <div className="space-y-4">
          {analysis.dailyTips.map((tip, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-green-100">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold mobile-text-xs">
                    {index + 1}
                  </span>
                </div>
                <p className="text-gray-700 mobile-text-sm">
                  {tip}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="font-semibold text-purple-800 mb-3 mobile-text-sm">
          📅 建立习惯的建议
        </h3>
        <div className="space-y-2">
          <div className="text-purple-700 mobile-text-xs">
            • 从一个小习惯开始，逐步建立
          </div>
          <div className="text-purple-700 mobile-text-xs">
            • 每天固定时间进行，建立节奏感
          </div>
          <div className="text-purple-700 mobile-text-xs">
            • 记录进展，庆祝小的成就
          </div>
          <div className="text-purple-700 mobile-text-xs">
            • 与朋友分享，获得支持和鼓励
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'development': return renderDevelopment();
      case 'relationships': return renderRelationships();
      case 'career': return renderCareer();
      case 'stress': return renderStress();
      case 'growth': return renderGrowth();
      case 'daily': return renderDaily();
      default: return renderOverview();
    }
  };

  return (
    <Card className={cn('border-0 shadow-lg', className)}>
      <CardHeader>
        <h2 className="text-xl font-bold text-gray-900 mobile-text-lg">
          📊 详细分析报告
        </h2>
        <p className="text-gray-600 mobile-text-sm">
          深入了解你的人格特质和发展建议
        </p>
      </CardHeader>

      <CardContent>
        {/* 标签页导航 */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'mobile-text-xs px-3 py-2 h-auto',
                activeTab === tab.id && 'bg-primary-500 text-white'
              )}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </Button>
          ))}
        </div>

        {/* 内容区域 */}
        <div className="min-h-96">
          {renderContent()}
        </div>
      </CardContent>
    </Card>
  );
};