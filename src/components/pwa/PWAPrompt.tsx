import React, { useState, useEffect } from 'react';
import { usePWA, PWAUtils } from '../../hooks/usePWA';
import { cn } from '../../utils/cn';

interface PWAPromptProps {
  className?: string;
}

export const PWAPrompt: React.FC<PWAPromptProps> = ({ className }) => {
  const { 
    isInstallable, 
    isInstalled, 
    installPWA, 
    showInstallPrompt, 
    dismissInstallPrompt 
  } = usePWA();
  
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    setIsVisible(showInstallPrompt && !isInstalled);
  }, [showInstallPrompt, isInstalled]);

  const handleInstall = async () => {
    try {
      setIsLoading(true);
      await installPWA();
      setIsVisible(false);
    } catch (error) {
      console.error('安装失败:', error);
      // 如果自动安装失败，显示手动安装指导
      setShowInstructions(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    dismissInstallPrompt();
    setIsVisible(false);
  };

  const instructions = PWAUtils.getInstallInstructions();

  if (!isVisible && !showInstructions) {
    return null;
  }

  return (
    <>
      {/* 安装提示浮层 */}
      {isVisible && (
        <div className={cn(
          'fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm',
          'bg-white rounded-xl shadow-2xl border border-gray-200',
          'transform transition-all duration-300 ease-out',
          'mobile-safe-bottom',
          className
        )}>
          <div className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">🌟</span>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mobile-text-sm">
                  安装内在宇宙到桌面
                </h3>
                <p className="mt-1 text-gray-600 mobile-text-xs">
                  获得更快速度和原生应用体验
                </p>
                
                <div className="mt-3 flex space-x-2">
                  <button
                    onClick={handleInstall}
                    disabled={isLoading}
                    className={cn(
                      'flex-1 bg-primary-500 text-white px-3 py-2 rounded-lg',
                      'font-medium mobile-text-sm transition-colors',
                      'hover:bg-primary-600 focus:outline-none focus:ring-2',
                      'focus:ring-primary-500 focus:ring-offset-2',
                      'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        安装中...
                      </div>
                    ) : (
                      '立即安装'
                    )}
                  </button>
                  
                  <button
                    onClick={handleDismiss}
                    className={cn(
                      'px-3 py-2 text-gray-600 mobile-text-sm',
                      'hover:text-gray-800 transition-colors'
                    )}
                  >
                    稍后
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 手动安装指导浮层 */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 mobile-safe-bottom">
          <div className="bg-black bg-opacity-50 absolute inset-0" onClick={() => setShowInstructions(false)} />
          
          <div className="relative bg-white rounded-xl shadow-2xl max-w-sm w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {instructions.title}
              </h3>
              
              <p className="text-gray-600 mobile-text-sm mb-4">
                请按照以下步骤手动安装：
              </p>
              
              <div className="text-left space-y-3 mb-6">
                {instructions.steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center mobile-text-xs font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 mobile-text-sm flex-1">{step}</p>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setShowInstructions(false)}
                className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface PWABannerProps {
  className?: string;
}

export const PWABanner: React.FC<PWABannerProps> = ({ className }) => {
  const { isInstalled, isOffline } = usePWA();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 只在已安装且首次访问时显示欢迎横幅
    if (isInstalled && !localStorage.getItem('pwa-welcome-shown')) {
      setIsVisible(true);
      localStorage.setItem('pwa-welcome-shown', 'true');
      
      // 3秒后自动隐藏
      setTimeout(() => setIsVisible(false), 3000);
    }
  }, [isInstalled]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cn(
      'fixed top-4 left-4 right-4 z-40 mx-auto max-w-sm',
      'bg-green-500 text-white rounded-lg shadow-lg',
      'transform transition-all duration-300 ease-out',
      'mobile-safe-top',
      className
    )}>
      <div className="p-3 flex items-center space-x-3">
        <div className="flex-shrink-0">
          <span className="text-xl">✨</span>
        </div>
        <div className="flex-1">
          <p className="font-medium mobile-text-sm">
            欢迎使用内在宇宙应用！
          </p>
          <p className="mobile-text-xs opacity-90">
            享受更快速的原生体验
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 p-1 text-white hover:text-gray-200"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

interface OfflineIndicatorProps {
  className?: string;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ className }) => {
  const { isOffline } = usePWA();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOffline) {
      setIsVisible(true);
    } else {
      // 延迟隐藏，给用户看到连接恢复的提示
      const timer = setTimeout(() => setIsVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOffline]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cn(
      'fixed top-4 left-4 right-4 z-50 mx-auto max-w-sm',
      'rounded-lg shadow-lg text-white text-center py-2 px-4',
      'transition-all duration-300 ease-out mobile-safe-top',
      isOffline ? 'bg-orange-500' : 'bg-green-500',
      className
    )}>
      <div className="flex items-center justify-center space-x-2">
        <span className="text-sm">
          {isOffline ? '📶' : '✅'}
        </span>
        <span className="font-medium mobile-text-sm">
          {isOffline ? '离线模式' : '网络已恢复'}
        </span>
      </div>
    </div>
  );
};

interface UpdatePromptProps {
  className?: string;
}

export const UpdatePrompt: React.FC<UpdatePromptProps> = ({ className }) => {
  const { updateAvailable, updatePWA } = usePWA();
  const [isVisible, setIsVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsVisible(updateAvailable);
  }, [updateAvailable]);

  const handleUpdate = () => {
    setIsUpdating(true);
    updatePWA();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cn(
      'fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm',
      'bg-blue-500 text-white rounded-lg shadow-lg',
      'mobile-safe-bottom',
      className
    )}>
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <span className="text-xl">🔄</span>
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold mobile-text-sm mb-1">
              新版本可用
            </h3>
            <p className="mobile-text-xs opacity-90 mb-3">
              发现新功能和改进，建议立即更新
            </p>
            
            <div className="flex space-x-2">
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className={cn(
                  'bg-white text-blue-500 px-3 py-1.5 rounded',
                  'font-medium mobile-text-sm transition-colors',
                  'hover:bg-gray-100 disabled:opacity-50'
                )}
              >
                {isUpdating ? '更新中...' : '立即更新'}
              </button>
              
              <button
                onClick={() => setIsVisible(false)}
                className="text-white mobile-text-sm px-3 py-1.5 hover:text-gray-200"
              >
                稍后
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};