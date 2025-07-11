import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'mystic' | 'glass' | 'gradient' | 'bordered';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  hover = true,
  padding = 'md',
  onClick,
}) => {
  const baseClasses = 'rounded-2xl border transition-all duration-300 relative overflow-hidden';
  
  const variants = {
    default: 'bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-700/50 shadow-xl backdrop-blur-sm',
    mystic: 'bg-gradient-to-br from-secondary-600 via-accent-600 to-primary-600 border-transparent text-white shadow-2xl',
    glass: 'bg-white/10 dark:bg-gray-800/10 border-white/20 dark:border-gray-700/20 backdrop-blur-xl shadow-xl',
    gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700 border-gradient-to-r border-primary-200 dark:border-gray-600 shadow-lg',
    bordered: 'bg-white dark:bg-gray-800 border-2 border-primary-200 dark:border-primary-700 shadow-lg',
  };
  
  const hoverClasses = hover ? 'hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]' : '';

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        baseClasses,
        variants[variant],
        hoverClasses,
        paddingClasses[padding],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* 装饰性背景元素 */}
      {variant === 'default' && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/30 to-secondary-100/30 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
      )}
      
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={cn('pb-4', className)}>
    {children}
  </div>
);

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => (
  <div className={cn('', className)}>
    {children}
  </div>
);

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => (
  <div className={cn('pt-4 border-t border-gray-200 dark:border-gray-700', className)}>
    {children}
  </div>
);