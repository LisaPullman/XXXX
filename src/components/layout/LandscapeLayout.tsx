import React, { ReactNode } from 'react';
import { useOrientation } from '../../hooks/useOrientation';
import { cn } from '../../utils/cn';

interface LandscapeWrapperProps {
  children: ReactNode;
  className?: string;
  showRotateHint?: boolean;
  optimizeForLandscape?: boolean;
}

export const LandscapeWrapper: React.FC<LandscapeWrapperProps> = ({
  children,
  className,
  showRotateHint = true,
  optimizeForLandscape = true
}) => {
  const { isLandscape, isPortrait } = useOrientation();

  return (
    <div className={cn(
      'min-h-screen transition-all duration-300',
      isLandscape && optimizeForLandscape && 'landscape-container',
      className
    )}>
      {children}
      
      {/* 横屏提示 */}
      {showRotateHint && isPortrait && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center landscape-hint">
          <div className="text-white text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 animate-bounce">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32zm-6.25-.77c-.59-.59-1.54-.59-2.12 0L1.75 8.11c-.59.59-.59 1.54 0 2.12l6.36 6.36c.59.59 1.54.59 2.12 0L16.59 10.23c.59-.59.59-1.54 0-2.12L10.23 1.75zm4.72 14.72l-4.72-4.72-4.72 4.72 4.72 4.72 4.72-4.72z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">建议横屏体验</h3>
            <p className="text-gray-300 mobile-text-sm">
              旋转设备以获得更好的视觉体验
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

interface OrientationIndicatorProps {
  className?: string;
  showAngle?: boolean;
}

export const OrientationIndicator: React.FC<OrientationIndicatorProps> = ({
  className,
  showAngle = false
}) => {
  const { isLandscape, isPortrait: _isPortrait, angle, type: _type } = useOrientation();

  return (
    <div className={cn(
      'fixed top-2 right-2 z-40 bg-black bg-opacity-50 text-white',
      'px-2 py-1 rounded text-xs font-mono',
      className
    )}>
      <div className="flex items-center space-x-2">
        <span className={cn(
          'w-2 h-2 rounded-full',
          isLandscape ? 'bg-green-400' : 'bg-blue-400'
        )} />
        <span>
          {isLandscape ? '横屏' : '竖屏'}
          {showAngle && ` (${angle}°)`}
        </span>
      </div>
    </div>
  );
};

interface AutoRotateContainerProps {
  children: ReactNode;
  className?: string;
  enableAutoRotate?: boolean;
  preferredOrientation?: 'portrait' | 'landscape' | 'auto';
}

export const AutoRotateContainer: React.FC<AutoRotateContainerProps> = ({
  children,
  className,
  enableAutoRotate = true,
  preferredOrientation = 'auto'
}) => {
  const { isLandscape, lockOrientation, unlockOrientation } = useOrientation();

  React.useEffect(() => {
    if (!enableAutoRotate) return;

    if (preferredOrientation === 'portrait' && isLandscape) {
      lockOrientation('portrait-primary');
    } else if (preferredOrientation === 'landscape' && !isLandscape) {
      lockOrientation('landscape-primary');
    } else if (preferredOrientation === 'auto') {
      unlockOrientation();
    }

    return () => {
      if (preferredOrientation !== 'auto') {
        unlockOrientation();
      }
    };
  }, [isLandscape, preferredOrientation, enableAutoRotate, lockOrientation, unlockOrientation]);

  return (
    <div className={cn(
      'transition-all duration-300',
      isLandscape ? 'landscape-mode' : 'portrait-mode',
      className
    )}>
      {children}
    </div>
  );
};

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  portraitCols?: number;
  landscapeCols?: number;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className,
  portraitCols = 1,
  landscapeCols = 2
}) => {
  const { isLandscape } = useOrientation();
  const cols = isLandscape ? landscapeCols : portraitCols;

  return (
    <div 
      className={cn(
        'grid gap-4 transition-all duration-300',
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`
      }}
    >
      {children}
    </div>
  );
};

interface LandscapeOptimizedLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  className?: string;
  sidebarWidth?: string;
}

export const LandscapeOptimizedLayout: React.FC<LandscapeOptimizedLayoutProps> = ({
  children,
  sidebar,
  className,
  sidebarWidth = '300px'
}) => {
  const { isLandscape } = useOrientation();

  if (!isLandscape) {
    return (
      <div className={className}>
        {sidebar && (
          <div className="mb-4">
            {sidebar}
          </div>
        )}
        <div>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'flex h-screen overflow-hidden',
      className
    )}>
      {sidebar && (
        <div 
          className="flex-shrink-0 overflow-y-auto"
          style={{ width: sidebarWidth }}
        >
          {sidebar}
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};