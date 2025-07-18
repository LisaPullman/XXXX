import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useThemeStore } from '../stores/useThemeStore';
import BaguaResultSVG from '../components/bagua/BaguaResultSVG';

interface SharedResult {
  id: string;
  hexagram: string;
  conclusion: string;
  userQuestion: string;
  interpretation: string;
  advice: string;
  createdAt: string;
}

export const BaguaResultSharePage: React.FC = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const [result, setResult] = useState<SharedResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟从服务器获取分享结果
    // 在实际应用中，这里应该调用API获取结果
    const mockResult: SharedResult = {
      id: resultId || '',
      hexagram: '乾卦',
      conclusion: '天行健，君子以自强不息。您的问题将在坚持和努力中得到解决。',
      userQuestion: '我的事业发展方向如何？',
      interpretation: '乾卦象征天，代表刚健不息的精神。此卦提示您要保持积极进取的态度。',
      advice: '建议您在当前情况下保持自信和决心，勇于面对挑战。同时要注意平衡，避免过于刚硬。',
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      setResult(mockResult);
      setLoading(false);
    }, 1000);
  }, [resultId]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-amber-900 via-orange-900 to-red-900'
          : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'
      }`}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className={`text-lg ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
            正在加载算运结果...
          </p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-amber-900 via-orange-900 to-red-900'
          : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'
      }`}>
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h1 className={`text-2xl font-bold mb-4 ${
            theme === 'dark' ? 'text-amber-100' : 'text-amber-900'
          }`}>
            结果不存在
          </h1>
          <p className={`mb-6 ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
            抱歉，您访问的算运结果不存在或已过期
          </p>
          <Button
            onClick={() => navigate('/iching')}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
          >
            重新算运
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-amber-900 via-orange-900 to-red-900'
        : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'
    }`}>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 头部 */}
          <div className="text-center mb-8">
            <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-amber-100' : 'text-amber-900'
            }`}>
              易经算运结果
            </h1>
            <p className={`text-lg ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
              来自智者的指引
            </p>
          </div>

          {/* 结果展示 */}
          <div className={`rounded-2xl p-8 mb-6 ${
            theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
          }`}>
            <div className="text-center mb-6">
              <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                {result.hexagram}
              </h2>
              <div className="text-6xl mb-4">☯️</div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                  问题
                </h3>
                <p className={`leading-relaxed ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                  {result.userQuestion}
                </p>
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                  卦象解读
                </h3>
                <p className={`leading-relaxed ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                  {result.interpretation}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                智者建议
              </h3>
              <p className={`leading-relaxed ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                {result.advice}
              </p>
            </div>

            <div className="pt-6 border-t border-amber-300/30">
              <h3 className={`text-xl font-bold mb-3 text-center ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                总结
              </h3>
              <p className={`text-lg leading-relaxed text-center ${theme === 'dark' ? 'text-amber-200' : 'text-amber-700'}`}>
                {result.conclusion}
              </p>
            </div>
          </div>

          {/* SVG结果图片 */}
          <div className="mb-8">
            <h3 className={`text-xl font-bold mb-4 text-center ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
              分享图片
            </h3>
            <BaguaResultSVG
              hexagram={result.hexagram}
              conclusion={result.conclusion}
              userQuestion={result.userQuestion}
            />
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => navigate('/bagua/ai-divination')}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-3"
            >
              👴🏻 我也要算运
            </Button>
            <Button
              onClick={() => navigate('/bagua/knowledge')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3"
            >
              📚 学习八卦知识
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className={`${
                theme === 'dark'
                  ? 'border-amber-300/30 text-amber-200 hover:bg-amber-500/10'
                  : 'border-amber-600 text-amber-700 hover:bg-amber-50'
              }`}
            >
              🏠 返回首页
            </Button>
          </div>

          {/* 底部信息 */}
          <div className="text-center mt-8">
            <p className={`text-sm ${theme === 'dark' ? 'text-amber-300/70' : 'text-amber-600/70'}`}>
              算运时间：{new Date(result.createdAt).toLocaleString('zh-CN')}
            </p>
            <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-amber-300/70' : 'text-amber-600/70'}`}>
              内在宇宙 · 易经智慧 · 为您指引人生方向
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
