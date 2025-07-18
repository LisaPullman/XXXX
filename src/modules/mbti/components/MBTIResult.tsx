import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import type { MBTIResult, CognitiveFunctions } from '../types';
import { getMBTITypeDescription, getDetailedMBTIAnalysis } from '../utils/mbtiCalculator';
import { AIAnalysis } from '../../../components/features/AIAnalysis';
import { AIChat } from '../../../components/features/AIChat';
import { SharePoster } from '../../../components/features/SharePoster';
import { SocialShare } from '../../../components/features/SocialShare';
import { cn } from '../../../utils/cn';

interface MBTIResultProps {
  result: MBTIResult;
  userProfile?: any;
  onShare?: () => void;
  onRetake?: () => void;
}

type TabType = 'overview' | 'cognitive' | 'ai-analysis' | 'ai-chat' | 'share';

export const MBTIResult: React.FC<MBTIResultProps> = ({
  result,
  userProfile,
  onShare,
  onRetake
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const description = getMBTITypeDescription(result.type as any);
  const detailedAnalysis = getDetailedMBTIAnalysis(result);
  const confidencePercentage = result.confidence;

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
    { id: 'cognitive' as TabType, label: '认知功能', icon: '🧠' },
    { id: 'ai-analysis' as TabType, label: 'AI深度解读', icon: '🤖' },
    { id: 'ai-chat' as TabType, label: 'AI对话', icon: '💬' },
    { id: 'share' as TabType, label: '分享结果', icon: '📤' },
  ];

  const handlePosterGenerated = (dataUrl: string) => {
    setPosterUrl(dataUrl);
  };

  const getFunctionName = (func: string): string => {
    const names: Record<string, string> = {
      'Ni': '内向直觉',
      'Ne': '外向直觉',
      'Si': '内向感觉',
      'Se': '外向感觉',
      'Ti': '内向思考',
      'Te': '外向思考',
      'Fi': '内向情感',
      'Fe': '外向情感'
    };
    return names[func] || func;
  };

  const getFunctionDescription = (func: string): string => {
    const descriptions: Record<string, string> = {
      'Ni': '专注于内在的洞察和预见，善于发现深层模式和未来可能性',
      'Ne': '探索外部世界的各种可能性，富有创意和灵感',
      'Si': '依靠过往经验和传统方法，注重细节和稳定性',
      'Se': '敏锐感知当下环境，善于应对现实情况',
      'Ti': '追求逻辑一致性和内在理解，独立分析思考',
      'Te': '关注效率和结果，善于组织和管理',
      'Fi': '基于个人价值观和深层情感做决定',
      'Fe': '关注他人情感和群体和谐，善于理解他人'
    };
    return descriptions[func] || '';
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 safe-area-container">
      {/* 主要结果卡片 */}
      <Card variant="mystic" className="text-center">
        <CardHeader className="mobile-content">
          <div className="space-y-4">
            <div className="text-4xl sm:text-6xl font-bold text-white">
              {result.type}
            </div>
            <div className="space-y-2">
              <h1 className="mobile-text-lg font-bold text-white">
                {description.name}
              </h1>
              <p className="mobile-text-base text-white/90">
                {description.nickname}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mobile-content">
          <p className="mobile-text-base text-white/80 leading-relaxed">
            {description.description}
          </p>
          <div className="mt-4 mobile-text-sm text-white/70">
            置信度: {confidencePercentage}%
          </div>
        </CardContent>
      </Card>

      {/* 标签页导航 */}
      <div className="flex justify-center px-2">
        <div className="flex bg-white rounded-lg p-1 shadow-lg w-full max-w-lg overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-md transition-all duration-200 mobile-button touch-friendly flex-1 justify-center min-w-0',
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              <span className="text-sm sm:text-base">{tab.icon}</span>
              <span className="font-medium mobile-text-sm truncate">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 标签页内容 */}
      {activeTab === 'overview' && (
        <>
          {/* 维度分析 */}
          <Card>
            <CardHeader className="mobile-content">
              <h2 className="mobile-text-lg font-semibold">维度分析</h2>
            </CardHeader>
            <CardContent className="mobile-content">
              <div className="space-y-6">
                {(Object.keys(result.dimensions) as Array<keyof typeof result.dimensions>).map((dimension) => {
                  const info = getDimensionLabel(dimension);
                  return (
                    <div key={dimension} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium mobile-text-base">{info.primary}</span>
                        <span className="mobile-text-sm text-gray-500">{info.strength}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 sm:h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${info.strength}%` }}
                        ></div>
                      </div>
                      <p className="mobile-text-sm text-gray-600 leading-relaxed">{info.description}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === 'cognitive' && result.cognitiveFunctions && (
        <>
          {/* 认知功能堆栈 */}
          {result.functionStack && (
            <Card>
              <CardHeader className="mobile-content">
                <h2 className="mobile-text-lg font-semibold flex items-center">
                  <span className="mr-2">🧠</span>
                  认知功能堆栈
                </h2>
              </CardHeader>
              <CardContent className="mobile-content">
                <div className="space-y-4">
                  {result.functionStack.map((func, index) => {
                    const strength = result.cognitiveFunctions?.[func as keyof CognitiveFunctions] || 0;
                    const role = ['主导功能', '辅助功能', '第三功能', '劣势功能'][index];
                    const colors = ['from-green-500 to-blue-500', 'from-blue-500 to-purple-500', 'from-purple-500 to-pink-500', 'from-gray-400 to-gray-600'];
                    
                    return (
                      <div key={func} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium mobile-text-base">
                            {func} - {role}
                          </span>
                          <span className="mobile-text-sm text-gray-500">{strength}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`bg-gradient-to-r ${colors[index]} h-3 rounded-full transition-all duration-1000`}
                            style={{ width: `${strength}%` }}
                          ></div>
                        </div>
                        <p className="mobile-text-sm text-gray-600">
                          {getFunctionDescription(func)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* 认知功能详细分析 */}
          <Card>
            <CardHeader className="mobile-content">
              <h2 className="mobile-text-lg font-semibold flex items-center">
                <span className="mr-2">📈</span>
                八项认知功能强度
              </h2>
            </CardHeader>
            <CardContent className="mobile-content">
              <div className="grid gap-4">
                {Object.entries(result.cognitiveFunctions).map(([func, strength]) => (
                  <div key={func} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium mobile-text-base">
                        {func} - {getFunctionName(func)}
                      </span>
                      <span className="mobile-text-sm text-gray-500">{strength}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${strength}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* 类型变化和发展水平 */}
          {(result.typeVariation || result.developmentLevel || result.reliability) && (
            <Card>
              <CardHeader className="mobile-content">
                <h2 className="mobile-text-lg font-semibold flex items-center">
                  <span className="mr-2">🎯</span>
                  测试质量分析
                </h2>
              </CardHeader>
              <CardContent className="mobile-content">
                <div className="grid md:grid-cols-3 gap-6">
                  {result.typeVariation && (
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl mb-2">
                        {result.typeVariation === 'clear' ? '🎯' : result.typeVariation === 'moderate' ? '🎳' : '🎲'}
                      </div>
                      <h3 className="font-semibold mobile-text-sm text-blue-800 mb-1">类型确定性</h3>
                      <p className="mobile-text-sm text-blue-600">
                        {result.typeVariation === 'clear' ? '清晰明确' : 
                         result.typeVariation === 'moderate' ? '中等程度' : '轻微倾向'}
                      </p>
                    </div>
                  )}
                  
                  {result.developmentLevel && (
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl mb-2">
                        {result.developmentLevel === 'mature' ? '🌳' : 
                         result.developmentLevel === 'established' ? '🌿' : '🌱'}
                      </div>
                      <h3 className="font-semibold mobile-text-sm text-green-800 mb-1">发展水平</h3>
                      <p className="mobile-text-sm text-green-600">
                        {result.developmentLevel === 'mature' ? '成熟完善' : 
                         result.developmentLevel === 'established' ? '基本确立' : '发展中'}
                      </p>
                    </div>
                  )}
                  
                  {result.reliability && (
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl mb-2">📊</div>
                      <h3 className="font-semibold mobile-text-sm text-purple-800 mb-1">测试可靠性</h3>
                      <p className="mobile-text-sm text-purple-600">{result.reliability}%</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
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
        <div className="space-y-6 mobile-content">
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
