import { useState, useEffect, useRef, useCallback } from 'react';

export interface GestureConfig {
  minSwipeDistance?: number;
  maxSwipeTime?: number;
  preventScroll?: boolean;
}

export interface SwipeDirection {
  direction: 'left' | 'right' | 'up' | 'down';
  distance: number;
  velocity: number;
  duration: number;
}

export interface GestureHandlers {
  onSwipeLeft?: (gesture: SwipeDirection) => void;
  onSwipeRight?: (gesture: SwipeDirection) => void;
  onSwipeUp?: (gesture: SwipeDirection) => void;
  onSwipeDown?: (gesture: SwipeDirection) => void;
  onTap?: (event: Touch) => void;
  onLongPress?: (event: Touch) => void;
  onPinch?: (scale: number, event: TouchEvent) => void;
}

const defaultConfig: GestureConfig = {
  minSwipeDistance: 50,
  maxSwipeTime: 300,
  preventScroll: false,
};

export const useGestures = (
  handlers: GestureHandlers,
  config: GestureConfig = {}
) => {
  const mergedConfig = { ...defaultConfig, ...config };
  const touchStartRef = useRef<Touch | null>(null);
  const touchStartTimeRef = useRef<number>(0);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initialPinchDistance = useRef<number>(0);
  const [isGestureActive, setIsGestureActive] = useState(false);

  const calculateDistance = useCallback((touch1: Touch, touch2: Touch): number => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  }, []);

  const getPinchDistance = useCallback((touches: TouchList): number => {
    if (touches.length < 2) return 0;
    return calculateDistance(touches[0], touches[1]);
  }, [calculateDistance]);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    const touch = event.touches[0];
    touchStartRef.current = touch;
    touchStartTimeRef.current = Date.now();
    setIsGestureActive(true);

    if (mergedConfig.preventScroll) {
      event.preventDefault();
    }

    // 设置长按检测
    if (handlers.onLongPress) {
      longPressTimerRef.current = setTimeout(() => {
        if (touchStartRef.current) {
          handlers.onLongPress!(touchStartRef.current);
        }
      }, 500);
    }

    // 双指缩放检测
    if (event.touches.length === 2 && handlers.onPinch) {
      initialPinchDistance.current = getPinchDistance(event.touches);
    }
  }, [handlers, mergedConfig.preventScroll, getPinchDistance]);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!touchStartRef.current) return;

    // 清除长按定时器
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // 处理双指缩放
    if (event.touches.length === 2 && handlers.onPinch && initialPinchDistance.current > 0) {
      const currentDistance = getPinchDistance(event.touches);
      const scale = currentDistance / initialPinchDistance.current;
      handlers.onPinch(scale, event);
      return;
    }

    if (mergedConfig.preventScroll) {
      event.preventDefault();
    }
  }, [handlers, mergedConfig.preventScroll, getPinchDistance]);

  const handleTouchEnd = useCallback((event: TouchEvent) => {
    if (!touchStartRef.current) return;

    const touchEnd = event.changedTouches[0];
    const touchEndTime = Date.now();
    const duration = touchEndTime - touchStartTimeRef.current;
    
    // 清除长按定时器
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    const deltaX = touchEnd.clientX - touchStartRef.current.clientX;
    const deltaY = touchEnd.clientY - touchStartRef.current.clientY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const velocity = distance / duration;

    // 判断是否为点击
    if (distance < 10 && duration < 200 && handlers.onTap) {
      handlers.onTap(touchStartRef.current);
    }
    // 判断是否为滑动
    else if (
      distance >= mergedConfig.minSwipeDistance! && 
      duration <= mergedConfig.maxSwipeTime!
    ) {
      const swipeData: SwipeDirection = {
        direction: Math.abs(deltaX) > Math.abs(deltaY) 
          ? (deltaX > 0 ? 'right' : 'left')
          : (deltaY > 0 ? 'down' : 'up'),
        distance,
        velocity,
        duration
      };

      switch (swipeData.direction) {
        case 'left':
          handlers.onSwipeLeft?.(swipeData);
          break;
        case 'right':
          handlers.onSwipeRight?.(swipeData);
          break;
        case 'up':
          handlers.onSwipeUp?.(swipeData);
          break;
        case 'down':
          handlers.onSwipeDown?.(swipeData);
          break;
      }
    }

    touchStartRef.current = null;
    initialPinchDistance.current = 0;
    setIsGestureActive(false);
  }, [handlers, mergedConfig]);

  const gestureProps = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    style: {
      touchAction: mergedConfig.preventScroll ? 'none' : 'auto',
    }
  };

  return {
    gestureProps,
    isGestureActive
  };
};

// 高级手势Hook - 用于复杂组件
export const useAdvancedGestures = () => {
  const [gestureState, setGestureState] = useState({
    isPanning: false,
    isZooming: false,
    panOffset: { x: 0, y: 0 },
    zoomScale: 1,
  });

  const resetGestures = useCallback(() => {
    setGestureState({
      isPanning: false,
      isZooming: false,
      panOffset: { x: 0, y: 0 },
      zoomScale: 1,
    });
  }, []);

  return {
    gestureState,
    setGestureState,
    resetGestures
  };
};