import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

export const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-cosmic mb-2">服务条款</h1>
          <p className="text-gray-600">最后更新于: 2025年7月10日</p>
        </div>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">欢迎使用 内在宇宙！</h2>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>请仔细阅读以下服务条款。当您访问或使用我们的服务时，即表示您同意受这些条款的约束。</p>
            
            <h3>1. 服务描述</h3>
            <p>内在宇宙是一个提供个性化分析和指导的平台，融合了MBTI、星座、八字等多种工具。所有内容仅供参考和娱乐，不应被视为专业建议。</p>

            <h3>2. 用户账户</h3>
            <p>您需要注册一个账户才能访问我们的大部分服务。您有责任维护您账户信息的机密性，并对在您账户下发生的所有活动负责。</p>

            <h3>3. 用户行为准则</h3>
            <ul>
              <li>您同意不使用本服务从事任何非法或未经授权的活动。</li>
              <li>您不得骚扰、辱骂、伤害或歧视其他用户。</li>
              <li>您不得上传任何恶意软件或病毒。</li>
            </ul>

            <h3>4. 知识产权</h3>
            <p>本服务及其所有内容，包括但不限于文本、图形、logo和软件，均为内在宇宙的财产，并受版权法保护。</p>

            <h3>5. 免责声明</h3>
            <p>本服务按“现状”和“现有”基础提供。我们不保证服务将不间断、及时、安全或无错误。</p>

            <h3>6. 条款变更</h3>
            <p>我们保留随时修改这些条款的权利。所有变更将在此页面上发布。我们鼓励您定期查看本页面以了解任何更新。</p>

            <div className="mt-8 text-center">
              <Link to="/" className="text-primary-600 hover:text-primary-700 font-medium">
                返回首页
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
