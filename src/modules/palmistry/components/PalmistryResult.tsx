import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { PalmistryResult, FaceReadingResult, ReadingSession } from '../types';
import { cn } from '../../../utils/cn';

interface PalmistryResultProps {
  result: PalmistryResult | FaceReadingResult | ReadingSession;
  onRetake?: () => void;
  onShare?: () => void;
  className?: string;
}

type TabType = 'overview' | 'details' | 'advice' | 'combined';

export const PalmistryResultComponent: React.FC<PalmistryResultProps> = ({
  result,
  onRetake,
  onShare,
  className
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  // 判断结果类型
  const isSession = 'type' in result;
  const isPalmistryResult = !isSession && 'handShape' in result;
  const isFaceReadingResult = !isSession && 'faceShape' in result;
  
  const palmistryResult = isSession 
    ? (result as ReadingSession).palmistryResult 
    : isPalmistryResult 
    ? (result as PalmistryResult) 
    : null;
    
  const faceReadingResult = isSession 
    ? (result as ReadingSession).faceReadingResult 
    : isFaceReadingResult 
    ? (result as FaceReadingResult) 
    : null;
    
  const combinedAnalysis = isSession ? (result as ReadingSession).combinedAnalysis : null;
  
  const tabs = [
    { id: 'overview' as TabType, label: '概览', icon: '📊' },
    { id: 'details' as TabType, label: '详细分析', icon: '🔍' },
    { id: 'advice' as TabType, label: '建议指导', icon: '💡' },
    ...(combinedAnalysis ? [{ id: 'combined' as TabType, label: '综合分析', icon: '🎯' }] : [])
  ];
  
  const getMainPersonality = () => {
    if (palmistryResult) return palmistryResult.overallPersonality;
    if (faceReadingResult) return faceReadingResult.overallPersonality;
    return null;
  };
  
  const getConfidence = () => {
    if (palmistryResult && faceReadingResult) {
      return Math.round((palmistryResult.confidence + faceReadingResult.confidence) / 2 * 100);
    }
    if (palmistryResult) return Math.round(palmistryResult.confidence * 100);
    if (faceReadingResult) return Math.round(faceReadingResult.confidence * 100);
    return 0;
  };
  
  const getTitle = () => {
    if (palmistryResult && faceReadingResult) return '手面相综合分析';
    if (palmistryResult) return '手相分析结果';
    if (faceReadingResult) return '面相分析结果';
    return '分析结果';
  };
  
  const mainPersonality = getMainPersonality();
  const confidence = getConfidence();
  
  return (
    <div className={cn('max-w-4xl mx-auto p-4 space-y-6', className)}>
      {/* 主要结果卡片 */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-indigo-500/10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-16 translate-x-16"></div>
        
        <CardHeader className="relative text-center">
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-3xl">
              {palmistryResult && faceReadingResult ? '🤲' : palmistryResult ? '👋' : '👤'}
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-800">
                {getTitle()}
              </h1>
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">分析准确度</span>
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {confidence}%
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(
                    palmistryResult?.timestamp || 
                    faceReadingResult?.timestamp || 
                    (result as ReadingSession).startTime
                  ).toLocaleString('zh-CN')}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="relative">
          {mainPersonality && (
            <div className="text-center">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {mainPersonality.traits.slice(0, 3).join('、')}是你的主要性格特征。
                你在{mainPersonality.career.slice(0, 2).join('、')}等领域有很好的发展潜力。
              </p>
              <div className="flex justify-center flex-wrap gap-2">
                {mainPersonality.traits.slice(0, 6).map((trait, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}
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
                  ? 'bg-purple-500 text-white shadow-md'
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
      {activeTab === 'overview' && mainPersonality && (
        <div className="space-y-6">
          {/* 性格特质 */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-green-700">✨ 优势特质</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mainPersonality.strengths.map((strength, index) => (
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
                <h3 className="text-xl font-semibold text-orange-700">⚠️ 发展建议</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mainPersonality.challenges.map((challenge, index) => (
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
              <h3 className="text-xl font-semibold">💼 适合的职业方向</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mainPersonality.career.map((career, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* 生活指导 */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-pink-700">💕 感情生活</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{mainPersonality.relationships}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-purple-700">🍀 运势健康</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-gray-700">{mainPersonality.health}</p>
                  <p className="text-gray-700">{mainPersonality.fortune}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      
      {activeTab === 'details' && (
        <div className="space-y-6">
          {/* 手相详细分析 */}
          {palmistryResult && (
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">👋 手相分析</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">手型特征</h4>
                    <p className="text-blue-700 text-sm">
                      {palmistryResult.handShape.chineseName} - {palmistryResult.handShape.description}
                    </p>
                  </div>
                  
                  {palmistryResult.dominantLines.length > 0 && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">主要线条</h4>
                      <div className="space-y-2">
                        {palmistryResult.dominantLines.map((line, index) => (
                          <div key={index} className="text-green-700 text-sm">
                            <span className="font-medium">{line.chineseName}</span>: {line.interpretation.personality}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {palmistryResult.mounts.length > 0 && (
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">手掌丘位</h4>
                      <div className="space-y-2">
                        {palmistryResult.mounts.map((mount, index) => (
                          <div key={index} className="text-purple-700 text-sm">
                            <span className="font-medium">{mount.chineseName}</span>: {mount.interpretation.meaning}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* 面相详细分析 */}
          {faceReadingResult && (
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">👤 面相分析</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-pink-50 rounded-lg p-4">
                    <h4 className="font-semibold text-pink-800 mb-2">脸型特征</h4>
                    <p className="text-pink-700 text-sm">
                      {faceReadingResult.faceShape.chineseName} - {faceReadingResult.faceShape.description}
                    </p>
                  </div>
                  
                  {faceReadingResult.features.length > 0 && (
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <h4 className="font-semibold text-indigo-800 mb-2">五官特征</h4>
                      <div className="space-y-2">
                        {faceReadingResult.features.map((feature, index) => (
                          <div key={index} className="text-indigo-700 text-sm">
                            <span className="font-medium">{feature.chineseName}</span>: {feature.interpretation.personality.join('、')}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
      
      {activeTab === 'advice' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">💡 个性化建议</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {palmistryResult?.advice.map((advice, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-blue-800">{advice}</p>
                  </div>
                ))}
                {faceReadingResult?.advice.map((advice, index) => (
                  <div key={index} className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-green-800">{advice}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === 'combined' && combinedAnalysis && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">🎯 综合分析</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">一致性评估</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${combinedAnalysis.consistency}%` }}
                      ></div>
                    </div>
                    <span className="text-purple-700 font-bold">{combinedAnalysis.consistency}%</span>
                  </div>
                  <p className="text-purple-700 text-sm mt-2">{combinedAnalysis.overallAssessment}</p>
                </div>
                
                {combinedAnalysis.reinforcingAspects.length > 0 && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">强化特征</h4>
                    <ul className="space-y-1">
                      {combinedAnalysis.reinforcingAspects.map((aspect, index) => (
                        <li key={index} className="text-green-700 text-sm flex items-start space-x-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>{aspect}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {combinedAnalysis.conflictingAspects.length > 0 && (
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">需要平衡的方面</h4>
                    <ul className="space-y-1">
                      {combinedAnalysis.conflictingAspects.map((aspect, index) => (
                        <li key={index} className="text-orange-700 text-sm flex items-start space-x-2">
                          <span className="text-orange-500 mt-1">⚠</span>
                          <span>{aspect}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">综合建议</h4>
                  <div className="space-y-2">
                    {combinedAnalysis.advice.map((advice, index) => (
                      <p key={index} className="text-purple-700 text-sm">• {advice}</p>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="primary" size="lg" onClick={onShare}>
          分享我的分析结果
        </Button>
        <Button variant="outline" size="lg" onClick={onRetake}>
          重新分析
        </Button>
      </div>
    </div>
  );
};