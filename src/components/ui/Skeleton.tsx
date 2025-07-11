import React from 'react';
import { cn } from '../../utils/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'circular' | 'rectangular' | 'text' | 'button' | 'avatar' | 'card';
  animation?: 'pulse' | 'wave' | 'none';
  width?: string | number;
  height?: string | number;
  lines?: number; // 用于 text variant
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'default',
  animation = 'pulse',
  width,
  height,
  lines = 1
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-shimmer',
    none: ''
  };

  const variantClasses = {
    default: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    text: 'rounded h-4',
    button: 'rounded-xl h-10',
    avatar: 'rounded-full w-10 h-10',
    card: 'rounded-2xl'
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  // 文本骨架屏 - 多行支持
  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variantClasses.text,
              animationClasses[animation],
              index === lines - 1 && 'w-3/4' // 最后一行略短
            )}
            style={index === 0 ? style : undefined}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={style}
    />
  );
};

// 预设的骨架屏组件
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-6 space-y-4', className)}>
    <div className="flex items-center space-x-4">
      <Skeleton variant="avatar" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
    <Skeleton variant="rectangular" height="200px" />
    <Skeleton variant="text" lines={3} />
    <div className="flex space-x-2">
      <Skeleton variant="button" width="80px" />
      <Skeleton variant="button" width="100px" />
    </div>
  </div>
);

export const SkeletonList: React.FC<{ 
  className?: string; 
  items?: number;
}> = ({ className, items = 3 }) => (
  <div className={cn('space-y-4', className)}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex items-center space-x-4 p-4">
        <Skeleton variant="avatar" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </div>
        <Skeleton variant="button" width="60px" />
      </div>
    ))}
  </div>
);

export const SkeletonTable: React.FC<{ 
  className?: string;
  rows?: number;
  cols?: number;
}> = ({ className, rows = 5, cols = 4 }) => (
  <div className={cn('space-y-4', className)}>
    {/* 表头 */}
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: cols }).map((_, index) => (
        <Skeleton key={index} variant="text" height="20px" />
      ))}
    </div>
    
    {/* 表格行 */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols }).map((_, colIndex) => (
          <Skeleton key={colIndex} variant="text" height="16px" />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonForm: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('space-y-6', className)}>
    <div className="space-y-2">
      <Skeleton variant="text" width="100px" height="16px" />
      <Skeleton variant="rectangular" height="48px" />
    </div>
    <div className="space-y-2">
      <Skeleton variant="text" width="120px" height="16px" />
      <Skeleton variant="rectangular" height="48px" />
    </div>
    <div className="space-y-2">
      <Skeleton variant="text" width="80px" height="16px" />
      <Skeleton variant="rectangular" height="96px" />
    </div>
    <Skeleton variant="button" width="120px" height="48px" />
  </div>
);