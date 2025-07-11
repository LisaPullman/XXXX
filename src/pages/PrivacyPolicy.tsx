import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-cosmic mb-2">隐私政策</h1>
          <p className="text-gray-600">最后更新于: 2025年7月10日</p>
        </div>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">我们如何保护您的隐私</h2>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>本隐私政策描述了当您使用我们的服务时，我们如何收集、使用和披露您的信息。</p>
            
            <h3>1. 我们收集的信息</h3>
            <p>我们收集您在注册和使用服务时提供的信息，例如：</p>
            <ul>
              <li>个人身份信息：姓名、电子邮件地址。</li>
              <li>个人资料信息：出生日期、出生地点、性别等用于生成分析报告的信息。</li>
              <li>使用数据：您与服务交互的信息。</li>
            </ul>

            <h3>2. 我们如何使用您的信息</h3>
            <p>我们使用您的信息来：</p>
            <ul>
              <li>提供、运营和维护我们的服务。</li>
              <li>为您生成个性化的分析报告。</li>
              <li>与您沟通，包括回复您的请求和发送服务相关通知。</li>
              <li>改进我们的服务和开发新功能。</li>
            </ul>

            <h3>3. 信息共享与披露</h3>
            <p>我们不会将您的个人信息出售给第三方。我们仅在以下情况下共享您的信息：</p>
            <ul>
              <li>经您同意。</li>
              <li>为遵守法律义务。</li>
              <li>为保护我们的权利和财产。</li>
              <li>与帮助我们运营服务的第三方服务提供商共享（例如，云存储、API服务）。</li>
            </ul>

            <h3>4. 数据安全</h3>
            <p>我们采取合理的措施保护您的信息安全，但没有任何电子传输或存储方法是100%安全的。</p>

            <h3>5. 您的权利</h3>
            <p>根据您所在的地区，您可能拥有访问、更正或删除您个人信息的权利。</p>

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
