import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import type { MBTIResult } from '../../types';
import { getMBTITypeDescription } from '../../utils/mbtiCalculator';
import { AIAnalysis } from './AIAnalysis';
import { AIChat } from './AIChat';
import { SharePoster } from './SharePoster';
import { SocialShare } from './SocialShare';
import { cn } from '../../utils/cn';

interface MBTIResultProps {
  result: MBTIResult;
  userProfile?: any;
  onShare?: () => void;
  onRetake?: () => void;
}

type TabType = 'overview' | 'ai-analysis' | 'ai-chat' | 'share';

export const MBTIResultComponent: React.FC<MBTIResultProps> = ({
  result,
  userProfile,
  onShare,
  onRetake
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const description = getMBTITypeDescription(result.type);
  const confidencePercentage = Math.round(result.confidence * 100);

  const getDimensionLabel = (dimension: keyof typeof result.dimensions) => {
    const value = result.dimensions[dimension];
    const absValue = Math.abs(value);
    
    switch (dimension) {
      case 'EI':
        return {
          primary: value >= 0 ? 'E - 外向' : 'I - 内向',
          secondary: value >= 0 ? 'I - 内向' : 'E - 外向',
          strength: absValue,
          description: value >= 0 
            ? '你倾向于从外部世界获得能量，喜欢与人交往'
            : '你倾向于从内心世界获得能量，喜欢独处思考'
        };
      case 'SN':
        return {
          primary: value >= 0 ? 'N - 直觉' : 'S - 感觉',
          secondary: value >= 0 ? 'S - 感觉' : 'N - 直觉',
          strength: absValue,
          description: value >= 0
            ? '你更关注可能性和整体概念，富有想象力'
            : '你更关注具体事实和细节，注重实际经验'
        };
      case 'TF':
        return {
          primary: value >= 0 ? 'F - 情感' : 'T - 思考',
          secondary: value >= 0 ? 'T - 思考' : 'F - 情感',
          strength: absValue,
          description: value >= 0
            ? '你在决策时更重视价值观和对他人的影响'
            : '你在决策时更重视逻辑分析和客观标准'
        };
      case 'JP':
        return {
          primary: value >= 0 ? 'P - 知觉' : 'J - 判断',
          secondary: value >= 0 ? 'J - 判断' : 'P - 知觉',
          strength: absValue,
          description: value >= 0
            ? '你喜欢保持灵活性，适应变化'
            : '你喜欢有计划和结构，追求确定性'
        };
      default:
        return { primary: '', secondary: '', strength: 0, description: '' };
    }
  };

  const tabs = [
    { id: 'overview' as TabType, label: '基础分析', icon: '📊' },
    { id: 'ai-analysis' as TabType, label: 'AI深度解读', icon: '🤖' },
    { id: 'ai-chat' as TabType, label: 'AI对话', icon: '💬' },
    { id: 'share' as TabType, label: '分享结果', icon: '📤' },
  ];

  const handlePosterGenerated = (dataUrl: string) => {
    setPosterUrl(dataUrl);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* 主要结果卡片 */}
      <Card variant="mystic" className="text-center">
        <CardHeader>
          <div className="space-y-4">
            <div className="text-6xl font-bold text-white">
              {result.type}
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white">
                {description.name}
              </h1>
              <p className="text-xl text-white/90">
                {description.nickname}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-white/80 leading-relaxed">
            {description.description}
          </p>
          <div className="mt-4 text-sm text-white/70">
            置信度: {confidencePercentage}%
          </div>
        </CardContent>
      </Card>

      {/* 标签页导航 */}
      <div className="flex justify-center">
        <div className="flex bg-white rounded-lg p-1 shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200',
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              <span>{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 标签页内容 */}
      {activeTab === 'overview' && (
        <>
          {/* 维度分析 */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">维度分析</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {(Object.keys(result.dimensions) as Array<keyof typeof result.dimensions>).map((dimension) => {
                  const info = getDimensionLabel(dimension);
                  return (
                    <div key={dimension} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-lg">{info.primary}</span>
                        <span className="text-sm text-gray-500">{info.strength}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${info.strength}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === 'ai-analysis' && (
        <AIAnalysis
          mbtiResult={result}
          userProfile={userProfile}
        />
      )}

      {activeTab === 'ai-chat' && (
        <AIChat
          context={{ mbtiResult: result, userProfile }}
          initialMessage={`你好！我看到你的MBTI类型是${result.type}（${description.name}）。作为这种人格类型，你一定有很多独特的特质和想法。有什么关于性格、职业发展或人际关系的问题想要探讨吗？`}
        />
      )}

      {activeTab === 'share' && (
        <div className="space-y-6">
          <SharePoster
            mbtiResult={result}
            userProfile={userProfile}
            onGenerated={handlePosterGenerated}
          />
          <SocialShare
            mbtiResult={result}
            posterUrl={posterUrl}
          />
        </div>
      )}

          {/* 优势特质 */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-green-700">优势特质</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {description.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-orange-700">发展建议</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {description.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* 职业建议 */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">适合的职业方向</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {description.careers.map((career, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="primary" size="lg" onClick={onShare}>
          分享我的结果
        </Button>
        <Button variant="outline" size="lg" onClick={onRetake}>
          重新测试
        </Button>
      </div>
    </div>
  );
};
