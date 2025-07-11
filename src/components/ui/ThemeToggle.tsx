import React from 'react';
import { useThemeStore } from '../../stores/useThemeStore';
import { cn } from '../../utils/cn';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className,
  size = 'md'
}) => {
  const { theme, setTheme, getResolvedTheme } = useThemeStore();
  const resolvedTheme = getResolvedTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('auto');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'light') {
      return (
        <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    } else if (theme === 'dark') {
      return (
        <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    } else {
      return (
        <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    }
  };

  const getTooltip = () => {
    if (theme === 'light') return '切换到深色模式';
    if (theme === 'dark') return '跟随系统';
    return '切换到浅色模式';
  };

  return (
    <div className="relative group">
      <button
        onClick={handleThemeChange}
        className={cn(
          'flex items-center justify-center rounded-xl transition-all duration-300',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          'active:scale-95',
          sizeClasses[size],
          className
        )}
        title={getTooltip()}
        aria-label={getTooltip()}
      >
        <div className={cn(
          'transition-all duration-300',
          'text-gray-600 dark:text-gray-400',
          'group-hover:text-primary-600 dark:group-hover:text-primary-400',
          resolvedTheme === 'dark' && theme === 'auto' && 'text-blue-500'
        )}>
          {getIcon()}
        </div>
      </button>
      
      {/* 状态指示器 */}
      <div className={cn(
        'absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 transition-all duration-300',
        theme === 'light' && 'bg-yellow-400',
        theme === 'dark' && 'bg-indigo-500',
        theme === 'auto' && resolvedTheme === 'light' && 'bg-blue-400',
        theme === 'auto' && resolvedTheme === 'dark' && 'bg-purple-500'
      )} />
      
      {/* 工具提示 */}
      <div className={cn(
        'absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2',
        'px-3 py-1 text-sm font-medium text-white bg-gray-900 rounded-lg',
        'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
        'pointer-events-none whitespace-nowrap z-50'
      )}>
        {getTooltip()}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
};