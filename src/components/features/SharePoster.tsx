import React, { useRef, useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import type { MBTIResult } from '../../types';
import { getMBTITypeDescription } from '../../modules/mbti/utils/mbtiCalculator';
import { cn } from '../../utils/cn';

interface SharePosterProps {
  mbtiResult: MBTIResult;
  userProfile?: any;
  template?: 'cosmic' | 'minimal' | 'mystic';
  onGenerated?: (dataUrl: string) => void;
  className?: string;
}

export const SharePoster: React.FC<SharePosterProps> = ({
  mbtiResult,
  userProfile,
  template = 'cosmic',
  onGenerated,
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  
  const description = getMBTITypeDescription(mbtiResult.type);

  const generatePoster = async () => {
    if (!canvasRef.current) return;
    
    setIsGenerating(true);
    
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 设置画布尺寸 (适合社交媒体分享的比例)
      canvas.width = 800;
      canvas.height = 1200;

      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 根据模板绘制不同风格的海报
      switch (template) {
        case 'cosmic':
          await drawCosmicTemplate(ctx, canvas, mbtiResult, description, userProfile);
          break;
        case 'minimal':
          await drawMinimalTemplate(ctx, canvas, mbtiResult, description, userProfile);
          break;
        case 'mystic':
          await drawMysticTemplate(ctx, canvas, mbtiResult, description, userProfile);
          break;
      }

      // 生成图片URL
      const dataUrl = canvas.toDataURL('image/png', 0.9);
      setPosterUrl(dataUrl);
      onGenerated?.(dataUrl);
      
    } catch (error) {
      console.error('生成海报失败:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPoster = () => {
    if (!posterUrl) return;
    
    const link = document.createElement('a');
    link.download = `内在宇宙-${mbtiResult.type}-人格分析.png`;
    link.href = posterUrl;
    link.click();
  };

  const sharePoster = async () => {
    if (!posterUrl) return;

    try {
      // 检查是否支持Web Share API
      if (navigator.share && navigator.canShare) {
        // 将dataURL转换为Blob
        const response = await fetch(posterUrl);
        const blob = await response.blob();
        const file = new File([blob], `内在宇宙-${mbtiResult.type}.png`, { type: 'image/png' });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `我的MBTI人格类型是${mbtiResult.type}`,
            text: `${description.name} - ${description.description}`,
            files: [file]
          });
          return;
        }
      }

      // 降级方案：复制到剪贴板
      if (navigator.clipboard && window.ClipboardItem) {
        const response = await fetch(posterUrl);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        alert('海报已复制到剪贴板！');
      } else {
        // 最终降级方案：下载
        downloadPoster();
      }
    } catch (error) {
      console.error('分享失败:', error);
      downloadPoster();
    }
  };

  useEffect(() => {
    generatePoster();
  }, [mbtiResult, template]);

  return (
    <div className={cn('space-y-6', className)}>
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">分享你的人格分析</h3>
          <p className="text-gray-600">生成精美海报，分享到社交媒体</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 模板选择 */}
            <div className="flex space-x-2">
              {[
                { id: 'cosmic', name: '宇宙风格', emoji: '🌌' },
                { id: 'minimal', name: '简约风格', emoji: '✨' },
                { id: 'mystic', name: '神秘风格', emoji: '🔮' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => generatePoster()}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors',
                    template === t.id
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <span>{t.emoji}</span>
                  <span className="text-sm">{t.name}</span>
                </button>
              ))}
            </div>

            {/* 海报预览 */}
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="w-full max-w-sm mx-auto border rounded-lg shadow-lg"
                style={{ aspectRatio: '2/3' }}
              />
              
              {isGenerating && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">生成中...</p>
                  </div>
                </div>
              )}
            </div>

            {/* 操作按钮 */}
            <div className="flex space-x-3">
              <Button
                variant="primary"
                onClick={sharePoster}
                disabled={!posterUrl || isGenerating}
                className="flex-1"
              >
                📤 分享海报
              </Button>
              <Button
                variant="outline"
                onClick={downloadPoster}
                disabled={!posterUrl || isGenerating}
              >
                💾 下载
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 宇宙风格模板
async function drawCosmicTemplate(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  result: MBTIResult,
  description: any,
  userProfile?: any
) {
  const { width, height } = canvas;

  // 背景渐变
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#1e1b4b');
  gradient.addColorStop(0.5, '#312e81');
  gradient.addColorStop(1, '#1e40af');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // 添加星星效果
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height * 0.6;
    const size = Math.random() * 2 + 1;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // 主标题
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(result.type, width / 2, 200);

  // 副标题
  ctx.font = '24px Arial, sans-serif';
  ctx.fillText(description.name, width / 2, 250);

  // 描述文字
  ctx.font = '18px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  
  const maxWidth = width - 80;
  const words = description.description.split('');
  let line = '';
  let y = 320;
  
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i];
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && line !== '') {
      ctx.fillText(line, width / 2, y);
      line = words[i];
      y += 30;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, width / 2, y);

  // 底部品牌信息
  ctx.font = '16px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('内在宇宙 - 探索你的人格奥秘', width / 2, height - 50);
}

// 简约风格模板
async function drawMinimalTemplate(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  result: MBTIResult,
  description: any,
  userProfile?: any
) {
  const { width, height } = canvas;

  // 白色背景
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // 顶部色块
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, '#3b82f6');
  gradient.addColorStop(1, '#8b5cf6');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, 120);

  // 主标题
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 42px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(result.type, width / 2, 80);

  // 副标题
  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 28px Arial, sans-serif';
  ctx.fillText(description.name, width / 2, 200);

  // 描述
  ctx.font = '20px Arial, sans-serif';
  ctx.fillStyle = '#4b5563';
  
  const maxWidth = width - 80;
  const words = description.description.split('');
  let line = '';
  let y = 280;
  
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i];
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && line !== '') {
      ctx.fillText(line, width / 2, y);
      line = words[i];
      y += 35;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, width / 2, y);

  // 底部品牌
  ctx.font = '18px Arial, sans-serif';
  ctx.fillStyle = '#9ca3af';
  ctx.fillText('内在宇宙', width / 2, height - 50);
}

// 神秘风格模板
async function drawMysticTemplate(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  result: MBTIResult,
  description: any,
  userProfile?: any
) {
  const { width, height } = canvas;

  // 深色背景
  const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
  gradient.addColorStop(0, '#581c87');
  gradient.addColorStop(0.7, '#1e1b4b');
  gradient.addColorStop(1, '#000000');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // 神秘符号装饰
  ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(width / 2, 150, 80, 0, Math.PI * 2);
  ctx.stroke();

  // 主标题
  ctx.fillStyle = '#ffd700';
  ctx.font = 'bold 48px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(result.type, width / 2, 160);

  // 副标题
  ctx.fillStyle = '#e879f9';
  ctx.font = '26px Arial, sans-serif';
  ctx.fillText(description.name, width / 2, 220);

  // 描述
  ctx.font = '19px Arial, sans-serif';
  ctx.fillStyle = '#f3e8ff';
  
  const maxWidth = width - 80;
  const words = description.description.split('');
  let line = '';
  let y = 300;
  
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i];
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && line !== '') {
      ctx.fillText(line, width / 2, y);
      line = words[i];
      y += 32;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, width / 2, y);

  // 底部装饰
  ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
  ctx.font = '16px Arial, sans-serif';
  ctx.fillText('✨ 内在宇宙 ✨', width / 2, height - 50);
}
