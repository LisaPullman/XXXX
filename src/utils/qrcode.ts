/**
 * 简单的二维码生成工具
 * 基于QR Code算法的简化实现
 */

interface QRCodeOptions {
  size?: number;
  margin?: number;
  color?: string;
  backgroundColor?: string;
}

export class QRCodeGenerator {
  private static instance: QRCodeGenerator;
  
  public static getInstance(): QRCodeGenerator {
    if (!QRCodeGenerator.instance) {
      QRCodeGenerator.instance = new QRCodeGenerator();
    }
    return QRCodeGenerator.instance;
  }

  /**
   * 生成二维码Canvas
   */
  generateQRCode(
    text: string, 
    canvas: HTMLCanvasElement, 
    options: QRCodeOptions = {}
  ): void {
    const {
      size = 200,
      margin = 20,
      color = '#000000',
      backgroundColor = '#ffffff'
    } = options;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布尺寸
    canvas.width = size;
    canvas.height = size;

    // 清空画布并设置背景色
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, size, size);

    // 简化的二维码模式 - 生成一个模拟的二维码图案
    // 在实际项目中，应该使用专业的QR码库如 qrcode.js
    this.drawSimpleQRPattern(ctx, size, margin, color, text);
  }

  /**
   * 生成二维码数据URL
   */
  generateQRCodeDataURL(text: string, options: QRCodeOptions = {}): string {
    const canvas = document.createElement('canvas');
    this.generateQRCode(text, canvas, options);
    return canvas.toDataURL('image/png');
  }

  /**
   * 绘制简化的二维码图案
   * 注意：这是一个模拟实现，实际项目中应使用专业库
   */
  private drawSimpleQRPattern(
    ctx: CanvasRenderingContext2D,
    size: number,
    margin: number,
    color: string,
    text: string
  ): void {
    const moduleSize = (size - 2 * margin) / 25; // 25x25 模块网格
    ctx.fillStyle = color;

    // 生成基于文本的伪随机模式
    const pattern = this.generatePattern(text, 25);

    // 绘制定位标记（三个角落的大方块）
    this.drawFinderPattern(ctx, margin, margin, moduleSize);
    this.drawFinderPattern(ctx, margin + 18 * moduleSize, margin, moduleSize);
    this.drawFinderPattern(ctx, margin, margin + 18 * moduleSize, moduleSize);

    // 绘制数据模块
    for (let row = 0; row < 25; row++) {
      for (let col = 0; col < 25; col++) {
        // 跳过定位标记区域
        if (this.isFinderPatternArea(row, col)) continue;

        if (pattern[row][col]) {
          const x = margin + col * moduleSize;
          const y = margin + row * moduleSize;
          ctx.fillRect(x, y, moduleSize, moduleSize);
        }
      }
    }
  }

  /**
   * 绘制定位标记
   */
  private drawFinderPattern(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    moduleSize: number
  ): void {
    // 外框 7x7
    ctx.fillRect(x, y, 7 * moduleSize, 7 * moduleSize);
    
    // 内部白色 5x5
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + moduleSize, y + moduleSize, 5 * moduleSize, 5 * moduleSize);
    
    // 中心黑色 3x3
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + 2 * moduleSize, y + 2 * moduleSize, 3 * moduleSize, 3 * moduleSize);
  }

  /**
   * 检查是否为定位标记区域
   */
  private isFinderPatternArea(row: number, col: number): boolean {
    // 左上角
    if (row < 9 && col < 9) return true;
    // 右上角
    if (row < 9 && col > 15) return true;
    // 左下角
    if (row > 15 && col < 9) return true;
    
    return false;
  }

  /**
   * 基于文本生成伪随机模式
   */
  private generatePattern(text: string, size: number): boolean[][] {
    const pattern: boolean[][] = Array(size).fill(null).map(() => Array(size).fill(false));
    
    // 简单的哈希函数
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 转换为32位整数
    }

    // 使用哈希值作为种子生成模式
    let seed = Math.abs(hash);
    
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        // 线性同余生成器
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        pattern[row][col] = (seed % 100) < 45; // 约45%的填充率
      }
    }

    return pattern;
  }
}

/**
 * 便捷函数：生成二维码
 */
export function generateQRCode(
  text: string,
  canvas: HTMLCanvasElement,
  options?: QRCodeOptions
): void {
  const generator = QRCodeGenerator.getInstance();
  generator.generateQRCode(text, canvas, options);
}

/**
 * 便捷函数：生成二维码数据URL
 */
export function generateQRCodeDataURL(
  text: string,
  options?: QRCodeOptions
): string {
  const generator = QRCodeGenerator.getInstance();
  return generator.generateQRCodeDataURL(text, options);
}
