import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { ThemeToggle } from '../components/ui/ThemeToggle';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-secondary-200/30 to-accent-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-accent-200/20 to-primary-200/20 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* 顶部导航区域 */}
          <div className="flex justify-between items-center mb-8 sm:mb-12">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">宇</span>
              </div>
              <span className="text-lg sm:text-xl font-semibold text-gray-800">内在宇宙</span>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle size="sm" />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/login')}
                className="hidden sm:inline-flex"
              >
                登录
              </Button>
            </div>
          </div>

          {/* 主标题区域 */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="relative inline-block mb-6">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                <span className="cosmic-text">内在宇宙</span>
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-1 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full"></div>
            </div>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
              探索你的内在宇宙：通过科学心理测评与神秘命理艺术的融合，
              <br className="hidden sm:block" />
              发现真实的自己，解锁人生密码
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/mbti')}
                className="w-full sm:w-auto group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  🧠 开始MBTI测试
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/astrology')}
                className="w-full sm:w-auto group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  ✨ 星座分析
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Button>
            </div>

            {/* 移动端登录按钮 */}
            <div className="mt-6 sm:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/login')}
                className="text-gray-600"
              >
                已有账户？立即登录
              </Button>
            </div>
          </div>

          {/* 功能卡片区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 px-4">
            <Card 
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/mbti')}
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-xl">
                    🧠
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                      MBTI 人格测试
                    </h3>
                    <p className="text-sm text-gray-500">16型人格深度分析</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  科学的心理学测评工具，通过28道专业题目，深度解析你的性格特质、
                  思维模式和行为偏好，为你的职业发展和人际关系提供指导。
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    心理学
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    性格分析
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/astrology')}
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-xl">
                    ✨
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-secondary-600 transition-colors">
                      星座分析
                    </h3>
                    <p className="text-sm text-gray-500">精准星盘解读</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  基于精确的出生时间和地点，计算你的太阳、月亮、上升星座，
                  分析天体运行对你的性格、运势和人生方向的影响。
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    占星学
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    运势分析
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="group md:col-span-2 xl:col-span-1 transform transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-white text-xl">
                    🤖
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-accent-600 transition-colors">
                      AI 深度解读
                    </h3>
                    <p className="text-sm text-gray-500">智能融合分析</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  结合MBTI和星座分析结果，运用人工智能技术进行融合解读，
                  为你提供个性化的成长建议和人生指导。
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    AI分析
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                    个性化
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 底部统计信息 */}
          <div className="mt-16 sm:mt-20 text-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold cosmic-text">16</div>
                <div className="text-sm text-gray-600 mt-1">人格类型</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold cosmic-text">12</div>
                <div className="text-sm text-gray-600 mt-1">星座分析</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold cosmic-text">AI</div>
                <div className="text-sm text-gray-600 mt-1">智能解读</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold cosmic-text">∞</div>
                <div className="text-sm text-gray-600 mt-1">探索可能</div>
              </div>
            </div>
          </div>

          {/* 页脚 */}
          <footer className="mt-20 sm:mt-24 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="max-w-4xl mx-auto px-4">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">宇</span>
                    </div>
                    <span className="font-medium">内在宇宙</span>
                  </div>
                  <span>©</span>
                  <span>2025</span>
                </div>
                
                <div className="flex items-center space-x-6 text-sm">
                  <a 
                    href="mailto:admin@foxai.edu.kg" 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center space-x-2 group"
                  >
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>admin@foxai.edu.kg</span>
                  </a>
                  
                  <div className="hidden sm:flex items-center space-x-4">
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      用户协议
                    </a>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      隐私政策
                    </a>
                  </div>
                </div>
              </div>
              
              {/* 移动端附加链接 */}
              <div className="sm:hidden mt-4 pt-4 border-t border-gray-200/30 dark:border-gray-700/30">
                <div className="flex justify-center space-x-6 text-sm">
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    用户协议
                  </a>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    隐私政策
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};