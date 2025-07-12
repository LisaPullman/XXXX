import React, { useState, useRef } from 'react';
import { useGestures } from '../../hooks/useGestures';
import { cn } from '../../utils/cn';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
  onLongPress?: () => void;
  swipeThreshold?: number;
  className?: string;
  enableSwipeToAction?: boolean;
  leftAction?: {
    icon: string;
    color: string;
    label: string;
  };
  rightAction?: {
    icon: string;
    color: string;
    label: string;
  };
}

export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onTap,
  onLongPress,
  swipeThreshold = 60,
  className,
  enableSwipeToAction = false,
  leftAction,
  rightAction
}) => {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [actionTriggered, setActionTriggered] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSwipe = (direction: 'left' | 'right', distance: number) => {
    if (enableSwipeToAction) {
      if (direction === 'left' && distance > swipeThreshold && rightAction) {
        setActionTriggered('right');
        setSwipeOffset(-100);
        setTimeout(() => {
          onSwipeLeft?.();
          resetCard();
        }, 200);
      } else if (direction === 'right' && distance > swipeThreshold && leftAction) {
        setActionTriggered('left');
        setSwipeOffset(100);
        setTimeout(() => {
          onSwipeRight?.();
          resetCard();
        }, 200);
      } else {
        // 弹回
        setSwipeOffset(0);
        setIsRevealed(false);
      }
    } else {
      // 普通滑动处理
      if (direction === 'left') {
        onSwipeLeft?.();
      } else {
        onSwipeRight?.();
      }
    }
  };

  const resetCard = () => {
    setSwipeOffset(0);
    setIsRevealed(false);
    setActionTriggered(null);
  };

  const { gestureProps, isGestureActive } = useGestures({
    onSwipeLeft: (gesture) => handleSwipe('left', gesture.distance),
    onSwipeRight: (gesture) => handleSwipe('right', gesture.distance),
    onSwipeUp: onSwipeUp,
    onSwipeDown: onSwipeDown,
    onTap: onTap,
    onLongPress: onLongPress,
  }, {
    minSwipeDistance: 20,
    maxSwipeTime: 500,
  });

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* 左侧动作背景 */}
      {enableSwipeToAction && leftAction && (
        <div 
          className={cn(
            'absolute inset-y-0 left-0 flex items-center justify-start pl-4 transition-all duration-200',
            leftAction.color,
            swipeOffset > 0 ? 'opacity-100' : 'opacity-0'
          )}
          style={{ width: Math.max(0, swipeOffset) }}
        >
          <div className="flex items-center space-x-2 text-white">
            <span className="text-xl">{leftAction.icon}</span>
            <span className="font-medium mobile-text-sm">{leftAction.label}</span>
          </div>
        </div>
      )}

      {/* 右侧动作背景 */}
      {enableSwipeToAction && rightAction && (
        <div 
          className={cn(
            'absolute inset-y-0 right-0 flex items-center justify-end pr-4 transition-all duration-200',
            rightAction.color,
            swipeOffset < 0 ? 'opacity-100' : 'opacity-0'
          )}
          style={{ width: Math.max(0, -swipeOffset) }}
        >
          <div className="flex items-center space-x-2 text-white">
            <span className="font-medium mobile-text-sm">{rightAction.label}</span>
            <span className="text-xl">{rightAction.icon}</span>
          </div>
        </div>
      )}

      {/* 主要内容 */}
      <div
        ref={cardRef}
        className={cn(
          'relative bg-white transition-transform duration-200 touch-friendly',
          isGestureActive && 'shadow-lg',
          actionTriggered && 'scale-95'
        )}
        style={{
          transform: enableSwipeToAction 
            ? `translateX(${swipeOffset}px)` 
            : 'translateX(0)'
        }}
        {...gestureProps}
      >
        {children}
      </div>
    </div>
  );
};

// 专门用于结果页面的手势支持组件
export const GestureResultCard: React.FC<{
  children: React.ReactNode;
  onNext?: () => void;
  onPrevious?: () => void;
  onShare?: () => void;
  onRetake?: () => void;
  className?: string;
}> = ({
  children,
  onNext,
  onPrevious,
  onShare,
  onRetake,
  className
}) => {
  const [hintVisible, setHintVisible] = useState(false);

  const showHint = (message: string) => {
    // 可以实现提示功能
    console.log('Gesture hint:', message);
  };

  const { gestureProps } = useGestures({
    onSwipeLeft: () => {
      if (onNext) {
        onNext();
        showHint('下一页');
      }
    },
    onSwipeRight: () => {
      if (onPrevious) {
        onPrevious();
        showHint('上一页');
      }
    },
    onSwipeUp: () => {
      if (onShare) {
        onShare();
        showHint('分享');
      }
    },
    onSwipeDown: () => {
      if (onRetake) {
        onRetake();
        showHint('重新测试');
      }
    },
  }, {
    minSwipeDistance: 100,
    maxSwipeTime: 400,
  });

  return (
    <div 
      className={cn('touch-friendly', className)}
      {...gestureProps}
    >
      {children}
      
      {/* 手势提示 */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center space-x-4 bg-gray-50 rounded-lg px-4 py-2">
          <div className="flex items-center space-x-1 mobile-text-sm text-gray-600">
            {onPrevious && <span>👈 上一页</span>}
            {onNext && <span>👉 下一页</span>}
            {onShare && <span>👆 分享</span>}
            {onRetake && <span>👇 重测</span>}
          </div>
        </div>
      </div>
    </div>
  );
};