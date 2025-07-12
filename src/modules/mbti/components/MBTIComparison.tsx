import React, { useState } from 'react';
import { MBTIType, MBTICompatibility } from '../types';
import { MBTI_TYPE_DATA } from '../data/mbtiTypes';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Select';

interface MBTIComparisonProps {
  userType: MBTIType;
  onClose?: () => void;
}

export const MBTIComparison: React.FC<MBTIComparisonProps> = ({ userType, onClose }) => {
  const [compareType, setCompareType] = useState<MBTIType>('INTJ');
  const [comparisonData, setComparisonData] = useState<MBTICompatibility | null>(null);

  const allTypes = Object.keys(MBTI_TYPE_DATA) as MBTIType[];
  const userTypeData = MBTI_TYPE_DATA[userType];
  const compareTypeData = MBTI_TYPE_DATA[compareType];

  const calculateCompatibility = (type1: MBTIType, type2: MBTIType): MBTICompatibility => {
    // 简化的兼容性计算逻辑
    const type1Data = MBTI_TYPE_DATA[type1];
    const type2Data = MBTI_TYPE_DATA[type2];
    
    // 基于认知功能的兼容性分析
    const cognitiveCompatibility = calculateCognitiveCompatibility(type1, type2);
    
    let compatibilityScore = 50; // 基础分数
    let relationshipType: 'ideal' | 'complement' | 'similar' | 'challenging' = 'similar';
    
    // 理想匹配 (对偶关系)
    const idealMatches: Record<string, string[]> = {
      'INTJ': ['ENFP', 'ENTP'],
      'INFJ': ['ENFP', 'ENTP'],
      'ENFJ': ['INFP', 'ISFP'],
      'ENFP': ['INTJ', 'INFJ'],
      // 添加更多匹配关系...
    };
    
    if (idealMatches[type1]?.includes(type2)) {
      compatibilityScore = 85 + Math.random() * 10;
      relationshipType = 'ideal';
    } else if (type1 === type2) {
      compatibilityScore = 70 + Math.random() * 10;
      relationshipType = 'similar';
    } else {
      compatibilityScore = 40 + Math.random() * 30;
      relationshipType = Math.random() > 0.5 ? 'complement' : 'challenging';
    }

    return {
      type: type2,
      compatibilityScore: Math.round(compatibilityScore),
      relationshipType,
      description: generateCompatibilityDescription(type1, type2, relationshipType),
      strengths: generateCompatibilityStrengths(type1, type2),
      challenges: generateCompatibilityChallenges(type1, type2),
      tips: generateCompatibilityTips(type1, type2)
    };
  };

  const calculateCognitiveCompatibility = (type1: MBTIType, type2: MBTIType): number => {
    // 基于认知功能的兼容性计算
    const stack1 = MBTI_TYPE_DATA[type1].cognitiveStack;
    const stack2 = MBTI_TYPE_DATA[type2].cognitiveStack;
    
    let compatibility = 0;
    // 简化的认知功能兼容性逻辑
    if (stack1[0] === stack2[1] || stack1[1] === stack2[0]) {
      compatibility += 30; // 主导功能和辅助功能互补
    }
    
    return compatibility;
  };

  const generateCompatibilityDescription = (type1: MBTIType, type2: MBTIType, relationshipType: string): string => {
    const descriptions = {
      ideal: '你们是天作之合！互补的认知功能让你们能够相互支持和成长。',
      complement: '你们的差异可以成为优势，通过理解和包容可以建立良好关系。',
      similar: '你们有相似的思维方式，容易理解彼此，但也需要注意避免过于相似。',
      challenging: '你们的差异较大，需要更多的耐心和理解，但也能带来成长机会。'
    };
    return descriptions[relationshipType as keyof typeof descriptions] || descriptions.similar;
  };

  const generateCompatibilityStrengths = (type1: MBTIType, type2: MBTIType): string[] => {
    const type1Data = MBTI_TYPE_DATA[type1];
    const type2Data = MBTI_TYPE_DATA[type2];
    
    const commonStrengths = type1Data.strengths.filter(s => type2Data.strengths.includes(s));
    const complementaryStrengths = [
      '互补的优势可以弥补彼此的不足',
      '不同的视角带来更全面的解决方案',
      '相互学习和成长的机会'
    ];
    
    return [...commonStrengths.slice(0, 2), ...complementaryStrengths.slice(0, 2)];
  };

  const generateCompatibilityChallenges = (type1: MBTIType, type2: MBTIType): string[] => {
    return [
      '沟通方式的差异需要相互适应',
      '决策过程可能存在分歧',
      '需要时间理解对方的思维方式',
      '在某些价值观上可能存在冲突'
    ];
  };

  const generateCompatibilityTips = (type1: MBTIType, type2: MBTIType): string[] => {
    return [
      '保持开放的沟通，理解对方的观点',
      '欣赏彼此的差异，将其视为成长机会',
      '在冲突时保持耐心，寻求共同点',
      '给对方足够的空间发挥自己的优势'
    ];
  };

  const handleCompare = () => {
    const compatibility = calculateCompatibility(userType, compareType);
    setComparisonData(compatibility);
  };

  const getCompatibilityColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">MBTI性格兼容性对比</h2>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                ×
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 用户类型卡片 */}
            <Card variant="outline">
              <CardHeader>
                <h3 className="text-lg font-semibold text-blue-600">
                  您的类型：{userType} - {userTypeData.name}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">{userTypeData.description}</p>
                  <div>
                    <h4 className="font-medium mb-2">核心优势：</h4>
                    <ul className="space-y-1">
                      {userTypeData.strengths.slice(0, 4).map((strength, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">认知功能栈：</h4>
                    <div className="flex space-x-2">
                      {userTypeData.cognitiveStack.map((func, index) => (
                        <span key={index} className={`px-2 py-1 text-xs rounded ${
                          index === 0 ? 'bg-blue-100 text-blue-800' :
                          index === 1 ? 'bg-green-100 text-green-800' :
                          index === 2 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {func}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 对比类型选择 */}
            <Card variant="outline">
              <CardHeader>
                <h3 className="text-lg font-semibold text-purple-600">
                  对比类型：{compareType} - {compareTypeData.name}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">选择对比类型：</label>
                    <Select
                      value={compareType}
                      onValueChange={(value) => setCompareType(value as MBTIType)}
                    >
                      {allTypes.map(type => (
                        <option key={type} value={type}>
                          {type} - {MBTI_TYPE_DATA[type].name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  
                  <p className="text-gray-600">{compareTypeData.description}</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">核心优势：</h4>
                    <ul className="space-y-1">
                      {compareTypeData.strengths.slice(0, 4).map((strength, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-center">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">认知功能栈：</h4>
                    <div className="flex space-x-2">
                      {compareTypeData.cognitiveStack.map((func, index) => (
                        <span key={index} className={`px-2 py-1 text-xs rounded ${
                          index === 0 ? 'bg-purple-100 text-purple-800' :
                          index === 1 ? 'bg-pink-100 text-pink-800' :
                          index === 2 ? 'bg-indigo-100 text-indigo-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {func}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 text-center">
            <Button onClick={handleCompare} className="px-8 py-3">
              分析兼容性
            </Button>
          </div>

          {/* 兼容性分析结果 */}
          {comparisonData && (
            <div className="mt-8">
              <Card variant="gradient">
                <CardHeader>
                  <h3 className="text-xl font-bold text-center">兼容性分析结果</h3>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className={`text-4xl font-bold mb-2 ${getCompatibilityColor(comparisonData.compatibilityScore)}`}>
                      {comparisonData.compatibilityScore}%
                    </div>
                    <div className="text-lg text-gray-600 mb-2">
                      关系类型：{comparisonData.relationshipType === 'ideal' ? '理想匹配' :
                                comparisonData.relationshipType === 'complement' ? '互补关系' :
                                comparisonData.relationshipType === 'similar' ? '相似关系' : '挑战关系'}
                    </div>
                    <p className="text-gray-700">{comparisonData.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-3">关系优势</h4>
                      <ul className="space-y-2">
                        {comparisonData.strengths.map((strength, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-1.5"></span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-orange-600 mb-3">潜在挑战</h4>
                      <ul className="space-y-2">
                        {comparisonData.challenges.map((challenge, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 mt-1.5"></span>
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-blue-600 mb-3">相处建议</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {comparisonData.tips.map((tip, index) => (
                        <div key={index} className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MBTIComparison;