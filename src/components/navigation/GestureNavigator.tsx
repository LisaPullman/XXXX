import React, { useState, useRef, useEffect } from 'react';
import { useGestures } from '../../hooks/useGestures';
import { cn } from '../../utils/cn';

interface GestureNavigatorProps {
  children: React.ReactNode[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  enableSwipe?: boolean;
  enableBounce?: boolean;
  className?: string;
}

export const GestureNavigator: React.FC<GestureNavigatorProps> = ({
  children,
  currentIndex,
  onIndexChange,
  enableSwipe = true,
  enableBounce = true,
  className
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSwipeLeft = () => {
    if (!enableSwipe || isTransitioning) return;
    
    const nextIndex = currentIndex + 1;
    if (nextIndex < children.length) {
      setIsTransitioning(true);
      onIndexChange(nextIndex);
    } else if (enableBounce) {
      // 反弹效果
      setSwipeOffset(-20);
      setTimeout(() => setSwipeOffset(0), 200);
    }
  };

  const handleSwipeRight = () => {
    if (!enableSwipe || isTransitioning) return;
    
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setIsTransitioning(true);
      onIndexChange(prevIndex);
    } else if (enableBounce) {
      // 反弹效果
      setSwipeOffset(20);
      setTimeout(() => setSwipeOffset(0), 200);
    }
  };

  const { gestureProps } = useGestures({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
  }, {
    minSwipeDistance: 80,
    maxSwipeTime: 400,
  });

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div 
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      {...gestureProps}
    >
      <div 
        className="flex transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(${-currentIndex * 100 + swipeOffset}%)`,
        }}
      >
        {children.map((child, index) => (
          <div 
            key={index}
            className="w-full flex-shrink-0"
            style={{ minHeight: '100%' }}
          >
            {child}
          </div>
        ))}
      </div>
      
      {/* 导航指示器 */}
      {children.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => onIndexChange(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-200',
                index === currentIndex 
                  ? 'bg-primary-500 w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};