import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'modern' | 'glass' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const baseClasses = 'block w-full rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 placeholder:text-gray-400 dark:placeholder:text-gray-500';
  
  const variants = {
    default: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-primary-500 shadow-sm hover:shadow-md',
    modern: 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-primary-500 focus:bg-white dark:focus:bg-gray-800 shadow-sm hover:shadow-lg',
    glass: 'border-white/20 dark:border-gray-700/30 bg-white/10 dark:bg-gray-800/10 text-gray-900 dark:text-gray-100 focus:border-primary-400 focus:ring-primary-400 backdrop-blur-xl shadow-lg hover:shadow-xl',
    minimal: 'border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-0 rounded-none px-0'
  };
  
  const responsiveSizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-3 py-2.5 text-sm sm:px-4 sm:py-3 sm:text-base',
    lg: 'px-4 py-3 text-base sm:px-5 sm:py-4 sm:text-lg'
  };
  
  const errorClasses = error ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400 focus:border-red-500 focus:ring-red-500' : '';
  const iconPadding = icon ? (size === 'lg' ? 'pl-12' : size === 'sm' ? 'pl-8' : 'pl-10') : '';
  const iconSize = size === 'lg' ? 'w-5 h-5' : size === 'sm' ? 'w-4 h-4' : 'w-4 h-4';

  return (
    <div className="space-y-1">
      {label && (
        <label 
          htmlFor={props.id || props.name} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4">
            <span className={cn('text-gray-400 dark:text-gray-500 group-focus-within:text-primary-500 transition-colors', iconSize)}>
              {icon}
            </span>
          </div>
        )}
        <input
          className={cn(
            baseClasses,
            variants[variant],
            responsiveSizes[size],
            errorClasses,
            iconPadding,
            className
          )}
          {...props}
        />
        
        {/* 聚焦时的装饰效果 */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
