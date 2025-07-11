import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import type { MBTIResult } from '../../types';
import { getMBTITypeDescription } from '../../utils/mbtiCalculator';
import { cn } from '../../utils/cn';

interface SocialShareProps {
  mbtiResult: MBTIResult;
  posterUrl?: string;
  className?: string;
}

interface SharePlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  shareUrl: (url: string, text: string) => string;
}

const SHARE_PLATFORMS: SharePlatform[] = [
  {
    id: 'wechat',
    name: '微信',
    icon: '💬',
    color: 'bg-green-500',
    shareUrl: (url, text) => `weixin://dl/business/?t=${encodeURIComponent(text)}`
  },
  {
    id: 'weibo',
    name: '微博',
    icon: '📱',
    color: 'bg-red-500',
    shareUrl: (url, text) => `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`
  },
  {
    id: 'qq',
    name: 'QQ空间',
    icon: '🐧',
    color: 'bg-blue-500',
    shareUrl: (url, text) => `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`
  },
  {
    id: 'douyin',
    name: '抖音',
    icon: '🎵',
    color: 'bg-black',
    shareUrl: (url, text) => `snssdk1128://share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
  },
  {
    id: 'xiaohongshu',
    name: '小红书',
    icon: '📖',
    color: 'bg-red-400',
    shareUrl: (url, text) => `xhsdiscover://share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
  }
];

export const SocialShare: React.FC<SocialShareProps> = ({
  mbtiResult,
  posterUrl,
  className
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const description = getMBTITypeDescription(mbtiResult.type);

  // 生成分享文案
  const generateShareText = () => {
    const texts = [
      `我的MBTI人格类型是${mbtiResult.type}（${description.name}）！`,
      `${description.description}`,
      `你也来测测你的人格类型吧！`,
      `#内在宇宙 #MBTI人格测试 #${mbtiResult.type}`
    ];
    return texts.join('\n\n');
  };

  // 生成分享链接
  const generateShareUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/mbti?shared=${mbtiResult.type}`;
  };

  // 处理平台分享
  const handlePlatformShare = (platform: SharePlatform) => {
    const shareText = generateShareText();
    const shareUrl = generateShareUrl();
    const platformUrl = platform.shareUrl(shareUrl, shareText);

    // 尝试打开应用，如果失败则复制链接
    try {
      window.open(platformUrl, '_blank');
    } catch (error) {
      copyToClipboard(shareText + '\n\n' + shareUrl);
    }
  };

  // 复制到剪贴板
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      // 降级方案
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // 使用Web Share API
  const handleNativeShare = async () => {
    const shareText = generateShareText();
    const shareUrl = generateShareUrl();

    try {
      if (navigator.share) {
        const shareData: ShareData = {
          title: `我的MBTI人格类型：${mbtiResult.type}`,
          text: shareText,
          url: shareUrl
        };

        // 如果有海报，尝试分享图片
        if (posterUrl && navigator.canShare) {
          try {
            const response = await fetch(posterUrl);
            const blob = await response.blob();
            const file = new File([blob], `MBTI-${mbtiResult.type}.png`, { type: 'image/png' });
            
            if (navigator.canShare({ files: [file] })) {
              shareData.files = [file];
            }
          } catch (error) {
            console.log('无法分享图片，仅分享文本');
          }
        }

        await navigator.share(shareData);
      } else {
        // 降级到复制
        copyToClipboard(shareText + '\n\n' + shareUrl);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        copyToClipboard(shareText + '\n\n' + shareUrl);
      }
    }
  };

  // 保存图片到相册
  const saveToAlbum = async () => {
    if (!posterUrl) return;

    try {
      const response = await fetch(posterUrl);
      const blob = await response.blob();
      
      // 创建下载链接
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `内在宇宙-${mbtiResult.type}-人格分析.png`;
      link.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('保存图片失败:', error);
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">分享你的测试结果</h3>
          <p className="text-gray-600">让朋友们也了解你的人格特质</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* 分享文案预览 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">分享文案预览</h4>
              <div className="text-sm text-gray-700 whitespace-pre-line">
                {generateShareText()}
              </div>
            </div>

            {/* 快速分享按钮 */}
            <div className="space-y-3">
              <h4 className="font-medium">快速分享</h4>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="primary"
                  onClick={handleNativeShare}
                  className="flex items-center justify-center space-x-2"
                >
                  <span>📤</span>
                  <span>系统分享</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(generateShareText() + '\n\n' + generateShareUrl())}
                  className="flex items-center justify-center space-x-2"
                >
                  <span>{copySuccess ? '✅' : '📋'}</span>
                  <span>{copySuccess ? '已复制' : '复制链接'}</span>
                </Button>
              </div>
            </div>

            {/* 社交平台分享 */}
            <div className="space-y-3">
              <h4 className="font-medium">分享到社交平台</h4>
              <div className="grid grid-cols-3 gap-3">
                {SHARE_PLATFORMS.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => handlePlatformShare(platform)}
                    className={cn(
                      'flex flex-col items-center space-y-2 p-3 rounded-lg text-white transition-transform hover:scale-105',
                      platform.color
                    )}
                  >
                    <span className="text-2xl">{platform.icon}</span>
                    <span className="text-xs font-medium">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 海报操作 */}
            {posterUrl && (
              <div className="space-y-3">
                <h4 className="font-medium">海报操作</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={saveToAlbum}
                    className="flex items-center justify-center space-x-2"
                  >
                    <span>💾</span>
                    <span>保存图片</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (posterUrl) {
                        const link = document.createElement('a');
                        link.href = posterUrl;
                        link.target = '_blank';
                        link.click();
                      }
                    }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <span>👁️</span>
                    <span>预览大图</span>
                  </Button>
                </div>
              </div>
            )}

            {/* 分享提示 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-700">
                💡 <strong>分享小贴士：</strong>
                分享你的测试结果可以帮助朋友更好地了解你，也能邀请他们来体验我们的人格测试！
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
