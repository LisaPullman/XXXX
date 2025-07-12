import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Select';
import { cn } from '../../../utils/cn';
import { BloodTypeCompatibilityResult } from '../types';

interface BloodTypeCompatibilityProps {
  onAnalyze: (type1: 'A' | 'B' | 'O' | 'AB', type2: 'A' | 'B' | 'O' | 'AB') => void;
  result?: BloodTypeCompatibilityResult;
  loading?: boolean;
}

const bloodTypeOptions = [
  { value: 'A', label: '🅰️ A型血', color: 'from-red-400 to-pink-500' },
  { value: 'B', label: '🅱️ B型血', color: 'from-blue-400 to-teal-500' },
  { value: 'O', label: '⭕ O型血', color: 'from-orange-400 to-red-500' },
  { value: 'AB', label: '🆎 AB型血', color: 'from-purple-400 to-pink-500' }
];

export const BloodTypeCompatibility: React.FC<BloodTypeCompatibilityProps> = ({
  onAnalyze,
  result,
  loading = false
}) => {
  const [type1, setType1] = useState<'A' | 'B' | 'O' | 'AB' | ''>('');
  const [type2, setType2] = useState<'A' | 'B' | 'O' | 'AB' | ''>('');

  const handleAnalyze = () => {
    if (type1 && type2) {
      onAnalyze(type1, type2);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-blue-600 dark:text-blue-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-400 to-green-600';
    if (score >= 70) return 'from-blue-400 to-blue-600';
    if (score >= 60) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case '完美配对': return '💕';
      case '不错配对': return '😊';
      case '一般配对': return '🤝';
      case '需要努力': return '💪';
      default: return '❓';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* 标题 */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-4">
          <span className="text-3xl">💕</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          血型配对分析
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          探索不同血型之间的相处之道与配对指数
        </p>
      </div>

      {/* 血型选择 */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            🎯 选择血型进行配对分析
          </h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                第一个血型
              </label>
              <Select
                value={type1}
                onValueChange={(value) => setType1(value as 'A' | 'B' | 'O' | 'AB')}
                placeholder="请选择血型"
              >
                {bloodTypeOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                第二个血型
              </label>
              <Select
                value={type2}
                onValueChange={(value) => setType2(value as 'A' | 'B' | 'O' | 'AB')}
                placeholder="请选择血型"
              >
                {bloodTypeOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleAnalyze}
              disabled={!type1 || !type2 || loading}
              variant="gradient"
              size="lg"
              className="px-8"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  分析中...
                </>
              ) : (
                <>
                  <span className="mr-2">🔍</span>
                  开始配对分析
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 配对结果 */}
      {result && (
        <div className="space-y-6">
          {/* 配对总览 */}
          <Card className="border-2 border-purple-200 dark:border-purple-800">
            <CardContent className="text-center py-8">
              <div className="mb-6">
                <div className="flex justify-center items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl">
                      {result.type1 === 'A' ? '🅰️' : result.type1 === 'B' ? '🅱️' : result.type1 === 'O' ? '⭕' : '🆎'}
                    </span>
                    <span className="text-xl font-bold">{result.type1}型</span>
                  </div>
                  <div className="text-2xl">💕</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl">
                      {result.type2 === 'A' ? '🅰️' : result.type2 === 'B' ? '🅱️' : result.type2 === 'O' ? '⭕' : '🆎'}
                    </span>
                    <span className="text-xl font-bold">{result.type2}型</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className={cn(
                    'inline-flex items-center justify-center w-24 h-24 rounded-full mb-3',
                    `bg-gradient-to-br ${getScoreGradient(result.score)}`
                  )}>
                    <span className="text-3xl font-bold text-white">
                      {result.score}%
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl">{getCategoryEmoji(result.category)}</span>
                    <span className={cn(
                      'text-xl font-semibold',
                      getScoreColor(result.score)
                    )}>
                      {result.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border">
                <p className="text-gray-700 dark:text-gray-300">
                  {result.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 配对详情 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 配对优势 */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                  ✨ 配对优势
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1 flex-shrink-0">•</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {strength}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 需要注意 */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                  ⚠️ 需要注意
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {challenge}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* 相处建议 */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200">
                💡 相处建议
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                {result.advice}
              </p>
            </CardContent>
          </Card>

          {/* 配对等级说明 */}
          <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                📊 配对等级说明
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">💕</span>
                    <span className="font-medium text-green-700 dark:text-green-300">完美配对 (80-100%)</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 ml-6">
                    天生一对，相处融洽，能够相互理解和支持
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-500">😊</span>
                    <span className="font-medium text-blue-700 dark:text-blue-300">不错配对 (70-79%)</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 ml-6">
                    相处愉快，有共同话题，需要一些磨合
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">🤝</span>
                    <span className="font-medium text-yellow-700 dark:text-yellow-300">一般配对 (60-69%)</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 ml-6">
                    平淡但稳定，需要更多沟通和理解
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500">💪</span>
                    <span className="font-medium text-red-700 dark:text-red-300">需要努力 (60%以下)</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 ml-6">
                    性格差异较大，需要更多的包容和努力
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 血型配对矩阵 */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            📈 血型配对矩阵
          </h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-800">
                    配对
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-800">
                    🅰️ A型
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-800">
                    🅱️ B型
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-800">
                    ⭕ O型
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-800">
                    🆎 AB型
                  </th>
                </tr>
              </thead>
              <tbody>
                {bloodTypeOptions.map((rowType) => (
                  <tr key={rowType.value}>
                    <td className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-50 dark:bg-gray-900 font-medium">
                      {rowType.label}
                    </td>
                    {bloodTypeOptions.map((colType) => {
                      const compatibilityScores = {
                        'A-A': 85, 'A-B': 60, 'A-O': 75, 'A-AB': 70,
                        'B-A': 60, 'B-B': 70, 'B-O': 80, 'B-AB': 65,
                        'O-A': 75, 'O-B': 80, 'O-O': 65, 'O-AB': 70,
                        'AB-A': 70, 'AB-B': 65, 'AB-O': 70, 'AB-AB': 75
                      };
                      const score = compatibilityScores[`${rowType.value}-${colType.value}` as keyof typeof compatibilityScores];
                      return (
                        <td key={colType.value} className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                          <span className={cn('font-medium', getScoreColor(score))}>
                            {score}%
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};