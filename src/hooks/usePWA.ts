import { useState, useEffect } from 'react';

interface PWAInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAHookReturn {
  isInstallable: boolean;
  isInstalled: boolean;
  isOffline: boolean;
  installPWA: () => Promise<void>;
  updateAvailable: boolean;
  updatePWA: () => void;
  showInstallPrompt: boolean;
  dismissInstallPrompt: () => void;
}

export const usePWA = (): PWAHookReturn => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState<PWAInstallPrompt | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  // 检测 PWA 安装状态
  useEffect(() => {
    // 检查是否已经安装为 PWA
    const checkInstallStatus = () => {
      const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
      const isInWebAppMode = (window.navigator as any).standalone === true;
      setIsInstalled(isInStandaloneMode || isInWebAppMode);
    };

    checkInstallStatus();

    // 监听显示模式变化
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = () => checkInstallStatus();
    
    if (mediaQuery.addListener) {
      mediaQuery.addListener(handleDisplayModeChange);
    } else {
      mediaQuery.addEventListener('change', handleDisplayModeChange);
    }

    return () => {
      if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleDisplayModeChange);
      } else {
        mediaQuery.removeEventListener('change', handleDisplayModeChange);
      }
    };
  }, []);

  // 注册 Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          console.log('Service Worker 注册成功');
          setRegistration(reg);

          // 检查更新
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setUpdateAvailable(true);
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('Service Worker 注册失败:', error);
        });

      // 监听 Service Worker 控制器变化
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }, []);

  // 监听安装提示事件
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as any);
      setIsInstallable(true);
      
      // 延迟显示安装提示（避免过于突兀）
      setTimeout(() => {
        if (!isInstalled) {
          setShowInstallPrompt(true);
        }
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isInstalled]);

  // 监听网络状态
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 安装 PWA
  const installPWA = async (): Promise<void> => {
    if (!installPrompt) {
      throw new Error('安装提示不可用');
    }

    try {
      await installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('用户接受了安装提示');
        setIsInstalled(true);
      } else {
        console.log('用户拒绝了安装提示');
      }
      
      setInstallPrompt(null);
      setIsInstallable(false);
      setShowInstallPrompt(false);
    } catch (error) {
      console.error('安装 PWA 失败:', error);
      throw error;
    }
  };

  // 更新 PWA
  const updatePWA = (): void => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  // 关闭安装提示
  const dismissInstallPrompt = (): void => {
    setShowInstallPrompt(false);
    // 记住用户的选择，避免频繁提示
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // 检查是否应该显示安装提示
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    
    if (dismissed && parseInt(dismissed) > oneDayAgo) {
      setShowInstallPrompt(false);
    }
  }, []);

  return {
    isInstallable,
    isInstalled,
    isOffline,
    installPWA,
    updateAvailable,
    updatePWA,
    showInstallPrompt,
    dismissInstallPrompt
  };
};

// PWA 工具函数
export const PWAUtils = {
  // 发送消息到 Service Worker
  sendMessageToSW: (message: any) => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(message);
    }
  },

  // 缓存测试结果
  cacheTestResult: (result: any) => {
    PWAUtils.sendMessageToSW({
      type: 'CACHE_TEST_RESULT',
      payload: result
    });
  },

  // 检查网络状态
  isOnline: () => navigator.onLine,

  // 获取安装状态
  getInstallStatus: () => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isWebApp = (window.navigator as any).standalone === true;
    return {
      isInstalled: isStandalone || isWebApp,
      isStandalone,
      isWebApp
    };
  },

  // 检查设备类型
  getDeviceInfo: () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isMobile = isIOS || isAndroid || /mobile/.test(userAgent);
    
    return {
      isIOS,
      isAndroid,
      isMobile,
      isDesktop: !isMobile
    };
  },

  // 显示安装指导
  getInstallInstructions: () => {
    const { isIOS, isAndroid } = PWAUtils.getDeviceInfo();
    
    if (isIOS) {
      return {
        title: '安装到主屏幕',
        steps: [
          '点击底部的"分享"按钮 📤',
          '向下滚动并选择"添加到主屏幕"',
          '点击"添加"完成安装'
        ]
      };
    } else if (isAndroid) {
      return {
        title: '安装应用',
        steps: [
          '点击浏览器菜单（⋮）',
          '选择"安装应用"或"添加到主屏幕"',
          '点击"安装"完成安装'
        ]
      };
    } else {
      return {
        title: '安装桌面应用',
        steps: [
          '点击地址栏右侧的安装图标',
          '或者点击浏览器菜单中的"安装"',
          '确认安装以获得原生应用体验'
        ]
      };
    }
  }
};