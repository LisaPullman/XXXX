import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  shareUrl: (data: ShareData) => string;
  isNative?: boolean;
}

interface ShareData {
  title: string;
  text: string;
  url: string;
  hashtags?: string[];
  image?: string;
}

interface EnhancedSocialShareProps {
  data: ShareData;
  className?: string;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icons' | 'buttons' | 'grid';
  onShare?: (platform: string, success: boolean) => void;
}

// 扩展的社交平台配置
const socialPlatforms: SocialPlatform[] = [
  {
    id: 'wechat',
    name: '微信',
    icon: '💬',
    color: 'bg-green-500 hover:bg-green-600',
    shareUrl: (_data) => {
      // 微信分享需要特殊处理，通常通过 JS SDK
      return `javascript:void(0)`;
    },
    isNative: true
  },
  {
    id: 'weibo',
    name: '微博',
    icon: '📝',
    color: 'bg-red-500 hover:bg-red-600',
    shareUrl: (data) => {
      const text = encodeURIComponent(`${data.title} ${data.text} ${data.hashtags?.map(t => `#${t}#`).join(' ') || ''}`);
      const url = encodeURIComponent(data.url);
      return `https://service.weibo.com/share/share.php?title=${text}&url=${url}`;
    }
  },
  {
    id: 'qq',
    name: 'QQ空间',
    icon: '🐧',
    color: 'bg-blue-600 hover:bg-blue-700',
    shareUrl: (data) => {
      const title = encodeURIComponent(data.title);
      const summary = encodeURIComponent(data.text);
      const url = encodeURIComponent(data.url);
      const pics = data.image ? encodeURIComponent(data.image) : '';
      return `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&summary=${summary}&pics=${pics}`;
    }
  },
  {
    id: 'douyin',
    name: '抖音',
    icon: '🎵',
    color: 'bg-black hover:bg-gray-800',
    shareUrl: (_data) => {
      // 抖音分享通常需要 App 调用
      return `javascript:void(0)`;
    },
    isNative: true
  },
  {
    id: 'xiaohongshu',
    name: '小红书',
    icon: '📕',
    color: 'bg-red-400 hover:bg-red-500',
    shareUrl: (_data) => {
      // 小红书分享需要特殊处理
      return `javascript:void(0)`;
    },
    isNative: true
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: '✈️',
    color: 'bg-blue-500 hover:bg-blue-600',
    shareUrl: (data) => {
      const text = encodeURIComponent(`${data.title}\n${data.text}\n${data.url}`);
      return `https://t.me/share/url?url=${encodeURIComponent(data.url)}&text=${text}`;
    }
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: '🐦',
    color: 'bg-sky-500 hover:bg-sky-600',
    shareUrl: (data) => {
      const text = encodeURIComponent(data.text);
      const url = encodeURIComponent(data.url);
      const hashtags = data.hashtags?.join(',') || '';
      return `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`;
    }
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '📘',
    color: 'bg-blue-700 hover:bg-blue-800',
    shareUrl: (data) => {
      const url = encodeURIComponent(data.url);
      return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    color: 'bg-blue-600 hover:bg-blue-700',
    shareUrl: (data) => {
      const url = encodeURIComponent(data.url);
      const title = encodeURIComponent(data.title);
      const summary = encodeURIComponent(data.text);
      return `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`;
    }
  },
  {
    id: 'copy',
    name: '复制链接',
    icon: '📋',
    color: 'bg-gray-500 hover:bg-gray-600',
    shareUrl: () => 'javascript:void(0)',
    isNative: true
  }
];

export const EnhancedSocialShare: React.FC<EnhancedSocialShareProps> = ({
  data,
  className,
  showLabels = true,
  size = 'md',
  variant = 'buttons',
  onShare
}) => {
  const [isWebShareSupported, setIsWebShareSupported] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  useEffect(() => {
    setIsWebShareSupported('share' in navigator);
  }, []);

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  const handleShare = async (platform: SocialPlatform) => {
    try {
      if (platform.id === 'copy') {
        await handleCopyLink();
        return;
      }

      if (platform.isNative) {
        await handleNativeShare(platform);
      } else {
        await handleWebShare(platform);
      }
      
      onShare?.(platform.id, true);
    } catch (error) {
      console.error('分享失败:', error);
      onShare?.(platform.id, false);
    }
  };

  const handleWebShare = async (platform: SocialPlatform) => {
    const shareUrl = platform.shareUrl(data);
    
    if (shareUrl === 'javascript:void(0)') {
      throw new Error('该平台不支持网页分享');
    }

    // 在新窗口打开分享链接
    const popup = window.open(
      shareUrl,
      'share',
      'width=600,height=400,resizable=yes,scrollbars=yes'
    );

    if (!popup) {
      // 如果弹窗被阻止，直接跳转
      window.location.href = shareUrl;
    }
  };

  const handleNativeShare = async (platform: SocialPlatform) => {
    if (platform.id === 'wechat') {
      await handleWeChatShare();
    } else if (platform.id === 'douyin') {
      await handleDouyinShare();
    } else if (platform.id === 'xiaohongshu') {
      await handleXiaohongshuShare();
    } else if (isWebShareSupported) {
      await handleNativeWebShare();
    } else {
      throw new Error('当前环境不支持原生分享');
    }
  };

  const handleNativeWebShare = async () => {
    if (!navigator.share) {
      throw new Error('浏览器不支持原生分享');
    }

    await navigator.share({
      title: data.title,
      text: data.text,
      url: data.url
    });
  };

  const handleWeChatShare = async () => {
    // 检查是否在微信环境
    const isWechat = /micromessenger/i.test(navigator.userAgent);
    
    if (isWechat) {
      // 在微信环境中，显示提示让用户点击右上角分享
      showWechatShareTip();
    } else {
      // 在其他环境中，尝试复制链接
      await handleCopyLink();
    }
  };

  const handleDouyinShare = async () => {
    // 尝试通过 URL Scheme 调起抖音
    const douyinUrl = `snssdk1128://share?text=${encodeURIComponent(data.text)}&url=${encodeURIComponent(data.url)}`;
    
    try {
      window.location.href = douyinUrl;
    } catch {
      // 如果失败，复制内容到剪贴板
      await handleCopyLink();
    }
  };

  const handleXiaohongshuShare = async () => {
    // 小红书没有公开的分享 API，复制内容到剪贴板
    const shareText = `${data.title}\n${data.text}\n${data.url}`;
    await navigator.clipboard.writeText(shareText);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(data.url);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (error) {
      // 降级处理：使用传统方法复制
      const textArea = document.createElement('textarea');
      textArea.value = data.url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    }
  };

  const showWechatShareTip = () => {
    // 显示微信分享提示
    const tip = document.createElement('div');
    tip.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        z-index: 9999;
        font-size: 16px;
      ">
        <div style="margin-bottom: 10px;">📤</div>
        <div>点击右上角菜单</div>
        <div>选择"分享给朋友"或"分享到朋友圈"</div>
      </div>
    `;
    
    document.body.appendChild(tip);
    setTimeout(() => {
      document.body.removeChild(tip);
    }, 3000);
  };

  const renderButton = (platform: SocialPlatform) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      sizeClasses[size],
      platform.color
    );

    const content = (
      <>
        <span className="text-white">{platform.icon}</span>
        {showLabels && variant === 'buttons' && (
          <span className="ml-2 text-white font-medium mobile-text-sm">
            {platform.name}
          </span>
        )}
      </>
    );

    if (variant === 'icons') {
      return (
        <button
          key={platform.id}
          onClick={() => handleShare(platform)}
          className={cn(baseClasses, 'rounded-full')}
          title={platform.name}
        >
          <span className="text-white">{platform.icon}</span>
        </button>
      );
    }

    if (variant === 'buttons') {
      return (
        <button
          key={platform.id}
          onClick={() => handleShare(platform)}
          className={cn(baseClasses, 'rounded-lg px-4 py-2')}
        >
          {content}
        </button>
      );
    }

    return (
      <button
        key={platform.id}
        onClick={() => handleShare(platform)}
        className={cn(
          baseClasses,
          'rounded-lg p-3 flex-col space-y-1',
          'hover:scale-105 transform'
        )}
      >
        <span className="text-white text-xl">{platform.icon}</span>
        {showLabels && (
          <span className="text-white mobile-text-xs font-medium">
            {platform.name}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className={cn('relative', className)}>
      {/* 原生分享按钮 */}
      {isWebShareSupported && (
        <div className="mb-4">
          <button
            onClick={() => handleNativeWebShare()}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <span>📤</span>
            <span>分享</span>
          </button>
        </div>
      )}

      {/* 社交平台分享 */}
      <div className={cn(
        'flex flex-wrap gap-3',
        variant === 'grid' && 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5',
        variant === 'icons' && 'justify-center',
        variant === 'buttons' && 'flex-col'
      )}>
        {socialPlatforms.map(renderButton)}
      </div>

      {/* 复制成功提示 */}
      {copiedToClipboard && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-lg mobile-text-sm font-medium animate-fade-in-out">
          ✅ 已复制到剪贴板
        </div>
      )}
    </div>
  );
};

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ShareData;
  className?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  data,
  className
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 mobile-safe-bottom">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      <div className={cn(
        'relative bg-white rounded-t-xl w-full max-w-md',
        'transform transition-transform duration-300',
        className
      )}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              分享测试结果
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <EnhancedSocialShare
            data={data}
            variant="grid"
            size="md"
            showLabels={true}
          />
        </div>
      </div>
    </div>
  );
};