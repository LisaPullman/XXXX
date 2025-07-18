import React from 'react';
import { cn } from '../../utils/cn';

interface WiseMasterAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isActive?: boolean;
  isThinking?: boolean;
  showAura?: boolean;
  className?: string;
}

export const WiseMasterAvatar: React.FC<WiseMasterAvatarProps> = ({
  size = 'md',
  isActive = false,
  isThinking = false,
  showAura = true,
  className
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };

  const emojiSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const eyePositions = {
    sm: { top: 'top-3', left: 'left-3', right: 'right-3' },
    md: { top: 'top-4', left: 'left-4', right: 'right-4' },
    lg: { top: 'top-5', left: 'left-5', right: 'right-5' },
    xl: { top: 'top-6', left: 'left-6', right: 'right-6' }
  };

  const lightSizes = {
    sm: { main: 'w-2 h-2', secondary: 'w-1.5 h-1.5' },
    md: { main: 'w-3 h-3', secondary: 'w-2 h-2' },
    lg: { main: 'w-4 h-4', secondary: 'w-3 h-3' },
    xl: { main: 'w-5 h-5', secondary: 'w-4 h-4' }
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      {/* 仙气外环 - 多层光环效果 */}
      {showAura && (
        <>
          <div className={cn(
            "absolute inset-0 rounded-full transition-all duration-2000",
            isActive || isThinking
              ? "bg-gradient-to-r from-yellow-400/50 via-orange-400/50 to-red-400/50 animate-pulse scale-125" 
              : "bg-gradient-to-r from-amber-400/30 via-yellow-400/30 to-orange-400/30 scale-115 animate-pulse"
          )} style={{ animationDuration: '3s' }}></div>
          
          <div className={cn(
            "absolute inset-0 rounded-full transition-all duration-3000",
            "bg-gradient-to-r from-white/20 via-yellow-200/20 to-orange-200/20 animate-pulse scale-110"
          )} style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        </>
      )}
      
      {/* 仙气粒子环绕 */}
      {showAura && (
        <>
          <div className="absolute inset-0 rounded-full animate-spin" style={{ animationDuration: '20s' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-80"></div>
            <div className="absolute top-1/4 right-0 transform translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-orange-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-1 h-1 bg-amber-300 rounded-full animate-ping opacity-70" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/4 left-0 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          <div className="absolute inset-0 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-white rounded-full animate-ping opacity-90" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-0.5 h-0.5 bg-yellow-200 rounded-full animate-ping opacity-80" style={{ animationDelay: '0.8s' }}></div>
            <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-orange-200 rounded-full animate-ping opacity-70" style={{ animationDelay: '1.3s' }}></div>
          </div>
        </>
      )}
      
      {/* 外圈装饰 - 仙气边框 */}
      <div className="absolute inset-1 rounded-full border-2 border-gradient-to-r from-yellow-400/60 to-orange-400/60 opacity-80 animate-pulse" style={{ animationDuration: '2s' }}></div>
      
      {/* 主体头像 */}
      <div className={cn(
        "relative w-full h-full rounded-full flex items-center justify-center transition-all duration-500",
        "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50",
        "border-2 border-amber-300/80 shadow-2xl",
        (isActive || isThinking) && "scale-105 shadow-amber-500/50"
      )} style={{ 
        boxShadow: isActive || isThinking 
          ? '0 0 40px rgba(251, 191, 36, 0.4), 0 0 80px rgba(251, 191, 36, 0.2)' 
          : '0 0 20px rgba(251, 191, 36, 0.3)'
      }}>
        {/* 智者形象 - 东方长者 */}
        <div className={cn(
          "font-bold text-amber-800 flex flex-col items-center justify-center relative",
          textSizes[size]
        )}>
          {/* 主要表情 - 东方长者形象 */}
          <div className={cn(
            emojiSizes[size],
            isThinking ? "animate-pulse" : "",
            "filter drop-shadow-lg"
          )} style={{
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1)) drop-shadow(0 0 10px rgba(251, 191, 36, 0.3))'
          }}>
            {isThinking ? '🧘‍♂️' : '👴🏻'}
          </div>
          
          {/* 长胡须装饰 */}
          {(size === 'md' || size === 'lg' || size === 'xl') && (
            <div className="absolute -bottom-1 text-amber-700 text-center animate-pulse" style={{ 
              fontSize: '0.4em',
              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
            }}>
              ⚊⚊⚊⚊⚊
            </div>
          )}
        </div>
        
        {/* 仙气眼睛闪烁效果 */}
        <div className={cn(
          "absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping",
          eyePositions[size].top,
          eyePositions[size].left
        )} style={{ 
          boxShadow: '0 0 6px rgba(34, 211, 238, 0.8)'
        }}></div>
        <div className={cn(
          "absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping",
          eyePositions[size].top,
          eyePositions[size].right
        )} style={{ 
          animationDelay: '0.5s',
          boxShadow: '0 0 6px rgba(34, 211, 238, 0.8)'
        }}></div>
        
        {/* 思考时的仙气旋转效果 */}
        {isThinking && (
          <div className="absolute inset-0 rounded-full border-2 border-yellow-400/60 animate-spin" style={{ 
            animationDuration: '3s',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)'
          }}></div>
        )}
      </div>
      
      {/* 仙气智慧光点 */}
      <div className={cn(
        "absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-90 animate-bounce",
        lightSizes[size].main
      )} style={{ 
        boxShadow: '0 0 12px rgba(251, 191, 36, 0.6)',
        animationDuration: '2s'
      }}></div>
      <div className={cn(
        "absolute -bottom-2 -left-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-80 animate-bounce",
        lightSizes[size].secondary
      )} style={{ 
        animationDelay: '0.3s',
        boxShadow: '0 0 10px rgba(251, 146, 60, 0.5)',
        animationDuration: '2.5s'
      }}></div>
      
      {/* 太极符号 - 慢慢旋转增加仙气 */}
      {(size === 'lg' || size === 'xl') && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-500 text-sm animate-spin opacity-80" style={{ 
          animationDuration: '12s',
          filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))'
        }}>
          ☯
        </div>
      )}
      
      {/* 仙气飘散效果 */}
      {isActive && (
        <>
          <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping opacity-80" style={{ 
            animationDelay: '0.2s',
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)'
          }}></div>
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-yellow-200 rounded-full animate-ping opacity-70" style={{ 
            animationDelay: '0.7s',
            boxShadow: '0 0 6px rgba(254, 240, 138, 0.7)'
          }}></div>
          <div className="absolute top-1/2 left-0 w-1 h-1 bg-amber-200 rounded-full animate-ping opacity-60" style={{ 
            animationDelay: '1s',
            boxShadow: '0 0 6px rgba(253, 230, 138, 0.6)'
          }}></div>
          <div className="absolute top-1/3 right-0 w-0.5 h-0.5 bg-orange-200 rounded-full animate-ping opacity-50" style={{ 
            animationDelay: '1.3s',
            boxShadow: '0 0 4px rgba(254, 215, 170, 0.5)'
          }}></div>
        </>
      )}
      
      {/* 东方智慧装饰 - 八卦符号 */}
      {(size === 'lg' || size === 'xl') && (
        <>
          <div className="absolute -top-1 -left-1 text-amber-500 text-xs opacity-70 animate-pulse" style={{ 
            animationDelay: '1s',
            filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.5))'
          }}>
            ⚊
          </div>
          <div className="absolute -bottom-1 -right-1 text-amber-500 text-xs opacity-70 animate-pulse" style={{ 
            animationDelay: '1.5s',
            filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.5))'
          }}>
            ⚋
          </div>
          <div className="absolute top-1/2 -left-2 text-amber-400 text-xs opacity-50 animate-pulse" style={{ 
            animationDelay: '2s',
            filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))'
          }}>
            ⚌
          </div>
          <div className="absolute top-1/2 -right-2 text-amber-400 text-xs opacity-50 animate-pulse" style={{ 
            animationDelay: '2.5s',
            filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))'
          }}>
            ⚍
          </div>
        </>
      )}
      
      {/* 仙气流动效果 */}
      {showAura && (
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" style={{ 
            animationDuration: '4s',
            transform: 'rotate(45deg) scale(1.5)'
          }}></div>
        </div>
      )}
    </div>
  );
};

export default WiseMasterAvatar; 