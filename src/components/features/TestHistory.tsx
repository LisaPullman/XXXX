import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { useTestHistoryStore, TestHistory } from '../../stores/useTestHistoryStore';
import { cn } from '../../utils/cn';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface TestHistoryProps {
  className?: string;
}

export const TestHistoryComponent: React.FC<TestHistoryProps> = ({ className }) => {
  const [selectedType, setSelectedType] = useState<TestHistory['type'] | 'all'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'timeline' | 'stats'>('list');
  
  const {
    history,
    getTestsByType,
    getRecentTests,
    removeTestResult,
    getTestStats,
    getGrowthTrajectory,
    clearOldData
  } = useTestHistoryStore();

  const testTypeNames = {
    'mbti': 'MBTI人格测试',
    'astrology': '星座分析',
    'tarot': '塔罗占卜',
    'bloodtype': '血型分析',
    'palmistry': '手相面相',
    'iching': '易经占卜',
    'aimaster': 'AI大师',
    'meditation': '冥想记录'
  };

  const filteredTests = useMemo(() => {
    if (selectedType === 'all') {
      return getRecentTests(50);
    }
    return getTestsByType(selectedType);
  }, [selectedType, history, getTestsByType, getRecentTests]);

  const stats = useMemo(() => getTestStats(), [history, getTestStats]);

  const formatDate = (date: Date) => {
    return format(new Date(date), 'MM月dd日 HH:mm', { locale: zhCN });
  };

  const getTestIcon = (type: TestHistory['type']) => {
    const icons = {
      'mbti': '🧠',
      'astrology': '⭐',
      'tarot': '🃏',
      'bloodtype': '🩸',
      'palmistry': '✋',
      'iching': '☯️',
      'aimaster': '🤖',
      'meditation': '🧘'
    };
    return icons[type] || '📝';
  };

  const renderTestCard = (test: TestHistory) => (
    <div key={test.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="text-2xl">{getTestIcon(test.type)}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mobile-text-sm">
              {testTypeNames[test.type]}
            </h3>
            <p className="text-gray-500 mobile-text-xs mt-1">
              {formatDate(test.completedAt)}
            </p>
            
            {/* 显示测试结果摘要 */}
            <div className="mt-2">
              {test.type === 'mbti' && (
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mobile-text-xs font-medium">
                    {test.result.type}
                  </span>
                  {test.confidence && (
                    <span className="text-gray-600 mobile-text-xs">
                      准确度: {test.confidence}%
                    </span>
                  )}
                </div>
              )}
              
              {test.type === 'astrology' && (
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded mobile-text-xs font-medium">
                  {test.result.sign}
                </span>
              )}
              
              {test.mode && (
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded mobile-text-xs">
                  {test.mode === 'quick' ? '快速版' : '完整版'}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <Button
          onClick={() => removeTestResult(test.id)}
          variant="outline"
          size="sm"
          className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
        >
          删除
        </Button>
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="space-y-6">
      {/* 总体统计 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-700">{stats.totalTests}</div>
          <div className="text-blue-600 mobile-text-sm">总测试次数</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-700">{stats.testsThisMonth}</div>
          <div className="text-green-600 mobile-text-sm">本月测试</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-700">{stats.averageConfidence}%</div>
          <div className="text-purple-600 mobile-text-sm">平均准确度</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-700">{Object.keys(stats.testsByType).length}</div>
          <div className="text-orange-600 mobile-text-sm">测试类型</div>
        </div>
      </div>

      {/* 各类型测试统计 */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-4 mobile-text-base">测试类型分布</h3>
        <div className="space-y-3">
          {Object.entries(stats.testsByType).map(([type, count]) => (
            <div key={type} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getTestIcon(type as TestHistory['type'])}</span>
                <span className="text-gray-700 mobile-text-sm">
                  {testTypeNames[type as TestHistory['type']]}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(count / stats.totalTests) * 100}%` }}
                  />
                </div>
                <span className="text-gray-600 mobile-text-sm font-medium w-8 text-right">
                  {count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTimeline = () => {
    if (selectedType === 'all') {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>请选择特定的测试类型来查看成长轨迹</p>
        </div>
      );
    }

    const trajectory = getGrowthTrajectory(selectedType);
    
    if (trajectory.timeline.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>暂无该类型的测试记录</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* 趋势分析 */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2 mobile-text-sm">📈 成长趋势</h3>
          <ul className="space-y-1">
            {trajectory.trends.map((trend, index) => (
              <li key={index} className="text-blue-700 mobile-text-xs">
                • {trend}
              </li>
            ))}
          </ul>
        </div>

        {/* 时间轴 */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 mobile-text-base">🕒 测试时间轴</h3>
          <div className="space-y-4">
            {trajectory.timeline.map((entry, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full mt-2" />
                <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-900 mobile-text-sm">
                      {formatDate(entry.date)}
                    </span>
                    {entry.result.type && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mobile-text-xs">
                        {entry.result.type}
                      </span>
                    )}
                  </div>
                  {entry.changes.length > 0 && (
                    <div className="mt-2">
                      <p className="text-gray-600 mobile-text-xs mb-1">变化:</p>
                      <ul className="space-y-1">
                        {entry.changes.map((change, idx) => (
                          <li key={idx} className="text-gray-700 mobile-text-xs">
                            • {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className={cn('border-0 shadow-lg', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 mobile-text-lg">
            📚 测试历史
          </h2>
          <Button
            onClick={() => clearOldData(90)}
            variant="outline"
            size="sm"
            className="mobile-text-xs"
          >
            清理90天前数据
          </Button>
        </div>
        <p className="text-gray-600 mobile-text-sm">
          回顾你的测试历程，发现成长轨迹
        </p>
      </CardHeader>

      <CardContent>
        {/* 视图模式切换 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'list', label: '列表视图', icon: '📋' },
            { key: 'timeline', label: '时间轴', icon: '🕒' },
            { key: 'stats', label: '统计分析', icon: '📊' }
          ].map((mode) => (
            <Button
              key={mode.key}
              onClick={() => setViewMode(mode.key as any)}
              variant={viewMode === mode.key ? 'default' : 'outline'}
              size="sm"
              className="mobile-text-xs"
            >
              <span className="mr-1">{mode.icon}</span>
              {mode.label}
            </Button>
          ))}
        </div>

        {/* 类型筛选 */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            onClick={() => setSelectedType('all')}
            variant={selectedType === 'all' ? 'default' : 'outline'}
            size="sm"
            className="mobile-text-xs"
          >
            全部
          </Button>
          {Object.entries(testTypeNames).map(([type, name]) => (
            <Button
              key={type}
              onClick={() => setSelectedType(type as TestHistory['type'])}
              variant={selectedType === type ? 'default' : 'outline'}
              size="sm"
              className="mobile-text-xs"
            >
              <span className="mr-1">{getTestIcon(type as TestHistory['type'])}</span>
              {name}
            </Button>
          ))}
        </div>

        {/* 内容区域 */}
        <div className="min-h-96">
          {viewMode === 'list' && (
            <div className="space-y-4">
              {filteredTests.length > 0 ? (
                filteredTests.map(renderTestCard)
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">📝</div>
                  <p>暂无测试记录</p>
                  <p className="mobile-text-sm mt-2">完成一些测试后这里会显示历史记录</p>
                </div>
              )}
            </div>
          )}

          {viewMode === 'stats' && renderStats()}
          {viewMode === 'timeline' && renderTimeline()}
        </div>
      </CardContent>
    </Card>
  );
};