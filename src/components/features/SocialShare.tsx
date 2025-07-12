import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import type { MBTIResult } from '../../types';
import { getMBTITypeDescription } from '../../modules/mbti/utils/mbtiCalculator';
import { cn } from '../../utils/cn';
import { EnhancedSocialShare, ShareModal } from './EnhancedSocialShare';

interface SocialShareProps {
  mbtiResult: MBTIResult;
  posterUrl?: string;
  className?: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({
  mbtiResult,
  posterUrl,
  className
}) => {
  const [showModal, setShowModal] = useState(false);

  const generateShareText = () => {
    const description = getMBTITypeDescription(mbtiResult.type);
    return `🌟 我在内在宇宙完成了MBTI人格测试！

我的人格类型：${mbtiResult.type} - ${description.title}
特质：${description.traits.join(' • ')}
测试准确度：${Math.round(mbtiResult.confidence * 100)}%

快来测试你的人格类型吧！ #MBTI #人格测试 #内在宇宙`;
  };

  const generateShareUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/mbti?ref=share&type=${mbtiResult.type}`;
  };

  const shareData = {
    title: `我的MBTI人格类型：${mbtiResult.type}`,
    text: generateShareText(),
    url: generateShareUrl(),
    hashtags: ['MBTI', '人格测试', '内在宇宙', mbtiResult.type],
    image: posterUrl
  };

  return (
    <Card className={cn('border-0 shadow-lg', className)}>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900 mobile-text-base">
          📤 分享测试结果
        </h3>
        <p className="text-gray-600 mobile-text-sm">
          让朋友们也来了解你的人格类型
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 使用增强型社交分享组件 */}
        <EnhancedSocialShare
          data={shareData}
          variant="buttons"
          size="md"
          showLabels={true}
          onShare={(platform, success) => {
            console.log(`分享到${platform}：${success ? '成功' : '失败'}`);
          }}
        />

        {/* 分享模态框按钮 */}
        <Button
          onClick={() => setShowModal(true)}
          variant="outline"
          className="w-full"
        >
          <span className="mr-2">📱</span>
          更多分享选项
        </Button>

        {/* 分享模态框 */}
        <ShareModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          data={shareData}
        />
      </CardContent>
    </Card>
  );
};