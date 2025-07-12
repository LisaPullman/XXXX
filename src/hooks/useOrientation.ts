import { useState, useEffect } from 'react';

export interface OrientationInfo {
  isLandscape: boolean;
  isPortrait: boolean;
  angle: number;
  type: 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary';
}

export const useOrientation = () => {
  const [orientation, setOrientation] = useState<OrientationInfo>(() => {
    const getOrientationInfo = (): OrientationInfo => {
      const angle = (screen.orientation?.angle || window.orientation || 0) as number;
      const type = screen.orientation?.type || 'portrait-primary';
      
      return {
        isLandscape: Math.abs(angle) === 90,
        isPortrait: Math.abs(angle) === 0 || Math.abs(angle) === 180,
        angle,
        type: type as OrientationInfo['type']
      };
    };

    return getOrientationInfo();
  });

  useEffect(() => {
    const handleOrientationChange = () => {
      // 延迟获取，确保屏幕已完成旋转
      setTimeout(() => {
        const angle = (screen.orientation?.angle || window.orientation || 0) as number;
        const type = screen.orientation?.type || 'portrait-primary';
        
        setOrientation({
          isLandscape: Math.abs(angle) === 90,
          isPortrait: Math.abs(angle) === 0 || Math.abs(angle) === 180,
          angle,
          type: type as OrientationInfo['type']
        });
      }, 100);
    };

    // 现代浏览器支持
    if (screen.orientation) {
      screen.orientation.addEventListener('change', handleOrientationChange);
    }
    
    // 旧版浏览器支持
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      if (screen.orientation) {
        screen.orientation.removeEventListener('change', handleOrientationChange);
      }
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  const lockOrientation = async (lockType: OrientationLockType) => {
    try {
      if (screen.orientation && screen.orientation.lock) {
        await screen.orientation.lock(lockType);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('Orientation lock failed:', error);
      return false;
    }
  };

  const unlockOrientation = () => {
    try {
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
        return true;
      }
      return false;
    } catch (error) {
      console.warn('Orientation unlock failed:', error);
      return false;
    }
  };

  return {
    ...orientation,
    lockOrientation,
    unlockOrientation
  };
};