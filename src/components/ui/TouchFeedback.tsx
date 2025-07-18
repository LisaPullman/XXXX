import React, { useState } from 'react';
import { cn } from '../../utils/cn';

interface TouchFeedbackProps {
  children: React.ReactNode;
  className?: string;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  feedback?: 'scale' | 'opacity' | 'glow' | 'ripple';
  intensity?: 'light' | 'medium' | 'strong';
}

export const TouchFeedback: React.FC<TouchFeedbackProps> = ({
  children,
  className,
  onTouchStart,
  onTouchEnd,
  onClick,
  disabled = false,
  feedback = 'scale',
  intensity = 'medium'
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const intensityClasses = {
    light: {
      scale: 'active:scale-[0.98]',
      opacity: 'active:opacity-80',
      glow: 'active:shadow-lg',
      ripple: '',
    },
    medium: {
      scale: 'active:scale-[0.96]',
      opacity: 'active:opacity-70',
      glow: 'active:shadow-xl',
      ripple: '',
    },
    strong: {
      scale: 'active:scale-[0.94]',
      opacity: 'active:opacity-60',
      glow: 'active:shadow-2xl',
      ripple: '',
    }
  };

  const feedbackClasses = cn(
    'transition-all duration-150 ease-out',
    !disabled && intensityClasses[intensity][feedback],
    disabled && 'opacity-50 cursor-not-allowed'
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    
    setIsPressed(true);
    onTouchStart?.();

    // 涟漪效果
    if (feedback === 'ripple') {
      const rect = e.currentTarget.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      const id = Date.now();
      
      setRipples(prev => [...prev, { x, y, id }]);
      
      // 清除涟漪
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== id));
      }, 600);
    }
  };

  const handleTouchEnd = () => {
    if (disabled) return;
    
    setIsPressed(false);
    onTouchEnd?.();
  };

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        feedbackClasses,
        isPressed && feedback === 'glow' && 'shadow-xl',
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={handleClick}
    >
      {children}
      
      {/* 涟漪效果 */}
      {feedback === 'ripple' && ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ping pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </div>
  );
};

// 预设的触摸反馈组件
export const TouchableCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}> = ({ children, className, onClick, disabled }) => (
  <TouchFeedback
    onClick={onClick}
    disabled={disabled}
    feedback="scale"
    intensity="light"
    className={cn('cursor-pointer', className)}
  >
    {children}
  </TouchFeedback>
);

export const TouchableButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'scale' | 'ripple';
}> = ({ children, className, onClick, disabled, variant = 'scale' }) => (
  <TouchFeedback
    onClick={onClick}
    disabled={disabled}
    feedback={variant}
    intensity="medium"
    className={cn('cursor-pointer', className)}
  >
    {children}
  </TouchFeedback>
);