import React from 'react';

interface BaguaResultSVGProps {
  hexagram: string;
  conclusion: string;
  userQuestion: string;
  width?: number;
  height?: number;
}

export const BaguaResultSVG: React.FC<BaguaResultSVGProps> = ({
  hexagram,
  conclusion,
  userQuestion,
  width = 600,
  height = 800
}) => {
  // 生成SVG字符串
  const generateSVG = () => {
    const svgContent = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FEF3C7;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#FDE68A;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#F59E0B;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:#FFFFFF;stop-opacity:0.7" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.1"/>
          </filter>
        </defs>
        
        <!-- 背景 -->
        <rect width="100%" height="100%" fill="url(#backgroundGradient)"/>
        
        <!-- 装饰性八卦图案 -->
        <g opacity="0.1">
          <circle cx="300" cy="150" r="80" fill="none" stroke="#92400E" stroke-width="2"/>
          <circle cx="300" cy="150" r="30" fill="#92400E"/>
          <path d="M 300 120 A 15 15 0 0 1 300 150 A 15 15 0 0 0 300 180 A 30 30 0 0 1 300 120" fill="#FEF3C7"/>
          <circle cx="300" cy="135" r="7" fill="#FEF3C7"/>
          <circle cx="300" cy="165" r="7" fill="#92400E"/>
        </g>
        
        <!-- 主卡片 -->
        <rect x="50" y="250" width="500" height="500" rx="20" ry="20" fill="url(#cardGradient)" filter="url(#shadow)"/>
        
        <!-- 标题 -->
        <text x="300" y="100" text-anchor="middle" font-family="serif" font-size="32" font-weight="bold" fill="#92400E">
          易经AI算运结果
        </text>
        
        <!-- 卦象名称 -->
        <text x="300" y="320" text-anchor="middle" font-family="serif" font-size="36" font-weight="bold" fill="#92400E">
          ${hexagram}
        </text>
        
        <!-- 太极符号 -->
        <text x="300" y="380" text-anchor="middle" font-size="48">☯️</text>
        
        <!-- 问题标题 -->
        <text x="300" y="430" text-anchor="middle" font-family="serif" font-size="18" font-weight="bold" fill="#92400E">
          您的问题
        </text>
        
        <!-- 用户问题 -->
        <foreignObject x="80" y="440" width="440" height="60">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: serif; font-size: 14px; color: #451A03; text-align: center; line-height: 1.5; padding: 10px;">
            ${userQuestion.length > 80 ? userQuestion.substring(0, 80) + '...' : userQuestion}
          </div>
        </foreignObject>
        
        <!-- 结论标题 -->
        <text x="300" y="530" text-anchor="middle" font-family="serif" font-size="18" font-weight="bold" fill="#92400E">
          智者指引
        </text>
        
        <!-- 结论内容 -->
        <foreignObject x="80" y="540" width="440" height="120">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: serif; font-size: 14px; color: #451A03; text-align: center; line-height: 1.6; padding: 10px;">
            ${conclusion.length > 150 ? conclusion.substring(0, 150) + '...' : conclusion}
          </div>
        </foreignObject>
        
        <!-- 底部装饰 -->
        <line x1="100" y1="680" x2="500" y2="680" stroke="#D97706" stroke-width="2"/>
        
        <!-- 网站标识 -->
        <text x="300" y="710" text-anchor="middle" font-family="serif" font-size="14" fill="#92400E">
          内在宇宙 · 易经智慧
        </text>
        
        <!-- 二维码占位 -->
        <rect x="480" y="680" width="60" height="60" rx="5" ry="5" fill="#FFFFFF" stroke="#D97706" stroke-width="1"/>
        <text x="510" y="705" text-anchor="middle" font-size="10" fill="#92400E">扫码</text>
        <text x="510" y="720" text-anchor="middle" font-size="10" fill="#92400E">体验</text>
        
        <!-- 时间戳 -->
        <text x="300" y="780" text-anchor="middle" font-family="serif" font-size="12" fill="#92400E" opacity="0.7">
          ${new Date().toLocaleDateString('zh-CN')}
        </text>
      </svg>
    `;
    
    return svgContent;
  };

  // 下载SVG文件
  const downloadSVG = () => {
    const svgContent = generateSVG();
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `易经算运结果_${hexagram}_${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 转换为PNG并下载
  const downloadPNG = () => {
    const svgContent = generateSVG();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    canvas.width = width;
    canvas.height = height;
    
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const pngUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = pngUrl;
          link.download = `易经算运结果_${hexagram}_${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(pngUrl);
        }
      }, 'image/png');
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  };

  // 分享到微信朋友圈
  const shareToWechat = () => {
    const svgContent = generateSVG();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    canvas.width = width;
    canvas.height = height;
    
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          // 在实际应用中，这里需要调用微信SDK
          // 目前先复制分享文本到剪贴板
          const shareText = `我刚刚通过易经AI算运得到了${hexagram}的指引：${conclusion.substring(0, 50)}...`;
          navigator.clipboard.writeText(shareText).then(() => {
            alert('分享内容已复制到剪贴板，请在微信中粘贴分享');
          });
        }
      }, 'image/png');
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  };

  return (
    <div className="space-y-4">
      {/* SVG预览 */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <div 
          dangerouslySetInnerHTML={{ __html: generateSVG() }}
          className="w-full"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
      
      {/* 操作按钮 */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={downloadSVG}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          📄 下载SVG
        </button>
        <button
          onClick={downloadPNG}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          🖼️ 下载PNG
        </button>
        <button
          onClick={shareToWechat}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          📱 分享微信
        </button>
      </div>
    </div>
  );
};

// 生成分享链接的工具函数
export const generateShareLink = (resultId: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/bagua/result/${resultId}`;
};

// 生成二维码的工具函数（需要安装qrcode库）
export const generateQRCode = async (_text: string): Promise<string> => {
  // 这里应该使用qrcode库生成二维码
  // 暂时返回占位符
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
};

export default BaguaResultSVG;
