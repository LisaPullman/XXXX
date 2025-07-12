import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';
import { BloodTypeTestResult } from '../types';

interface BloodTypeResultProps {
  result: BloodTypeTestResult;
  onRestart: () => void;
  onShare?: () => void;
}

export const BloodTypeResult: React.FC<BloodTypeResultProps> = ({
  result,
  onRestart,
  onShare
}) => {
  const [activeTab, setActiveTab] = useState<'personality' | 'career' | 'health' | 'relationships'>('personality');

  const tabs = [
    { id: 'personality', label: '性格特质', icon: '🧠' },
    { id: 'career', label: '职业发展', icon: '💼' },
    { id: 'health', label: '健康建议', icon: '💊' },
    { id: 'relationships', label: '人际关系', icon: '👥' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreWidth = (score: number) => `${score}%`;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* 血型结果头部 */}
      <Card className={cn('border-2', result.gradient.replace('from-', 'border-').replace(' to-', '').split('-').slice(0, 2).join('-'))}>
        <CardContent className="text-center py-8">
          <div className="mb-6">
            <div className={cn(
              'inline-flex items-center justify-center w-24 h-24 rounded-full mb-4',
              `bg-gradient-to-br ${result.gradient}`
            )}>
              <span className="text-4xl">{result.bloodType.emoji}</span>
            </div>
            <h1 className={cn(
              'text-3xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent',
              result.gradient
            )}>
              {result.bloodType.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {result.bloodType.description}
            </p>
          </div>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              💫 专属座右铭
            </h3>
            <p className="text-gray-700 dark:text-gray-300 italic">
              "{result.motto}"
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 标签导航 */}
      <div className="flex flex-wrap gap-2 justify-center">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab(tab.id as any)}
            className="flex items-center space-x-2"
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </Button>
        ))}
      </div>

      {/* 性格特质页面 */}
      {activeTab === 'personality' && (
        <div className="space-y-6">
          {/* 核心特质 */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                🌟 核心特质
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {result.personality.core}
              </p>
              <div className="flex flex-wrap gap-2">
                {result.personality.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className={cn(
                      'px-3 py-1 rounded-full text-sm font-medium',
                      `bg-gradient-to-r ${result.gradient} text-white`
                    )}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 优势特质 */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">
                ✨ 优势特质
              </h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.personality.positive.map((trait, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{trait}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* 需要改进的地方 */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-200">
                🔧 成长空间
              </h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.personality.negative.map((trait, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{trait}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 职业发展页面 */}
      {activeTab === 'career' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200">
                💼 职业建议
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {result.career.advice}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                  ✅ 适合职业
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.career.suitable.map((job, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{job}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
                  ⚠️ 不太适合
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.career.unsuitable.map((job, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{job}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 健康建议页面 */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200">
                💊 健康建议
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-green-700 dark:text-green-300">健康优势</h4>
                  <ul className="space-y-1">
                    {result.health.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1 text-sm">•</span>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-orange-700 dark:text-orange-300">注意事项</h4>
                  <ul className="space-y-1">
                    {result.health.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-orange-500 mt-1 text-sm">•</span>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
                ⚠️ 疾病风险
              </h3>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  以下疾病风险相对较高，建议定期体检：
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.health.diseases.map((disease, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded text-sm"
                    >
                      {disease}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">预防建议</h4>
                <ul className="space-y-1">
                  {result.health.advice.map((advice, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1 text-sm">•</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{advice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 人际关系页面 */}
      {activeTab === 'relationships' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-pink-800 dark:text-pink-200">
                  💕 恋爱关系
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {result.relationships.love}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                  🤝 友谊关系
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {result.relationships.friendship}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                  👨‍👩‍👧‍👦 家庭关系
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {result.relationships.family}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                  💬 沟通方式
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {result.relationships.communication}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 血型配对 */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200">
                💝 血型配对指数
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(result.compatibility).map(([type, compat]) => (
                  <div key={type} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 w-20">
                      <span className="text-lg">{type === 'A' ? '🅰️' : type === 'B' ? '🅱️' : type === 'O' ? '⭕' : '🆎'}</span>
                      <span className="font-medium">{type}型</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={cn(
                              'h-2 rounded-full transition-all duration-500',
                              compat.score >= 80 ? 'bg-green-500' :
                              compat.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            )}
                            style={{ width: getScoreWidth(compat.score) }}
                          />
                        </div>
                        <span className={cn('text-sm font-medium', getScoreColor(compat.score))}>
                          {compat.score}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {compat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 每日建议 */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader>
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200">
            🌅 今日建议
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700 dark:text-blue-300">
            {result.dailyAdvice[new Date().getDate() % result.dailyAdvice.length]}
          </p>
        </CardContent>
      </Card>

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onShare}
          variant="outline"
          size="lg"
          className="flex items-center space-x-2"
        >
          <span>📤</span>
          <span>分享结果</span>
        </Button>
        <Button
          onClick={onRestart}
          variant="primary"
          size="lg"
          className="flex items-center space-x-2"
        >
          <span>🔄</span>
          <span>重新测试</span>
        </Button>
      </div>
    </div>
  );
};