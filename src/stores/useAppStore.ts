import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Notification } from '../types';
import { typedStorage } from '../utils/storage';

interface AppState {
  language: 'zh-CN' | 'en-US';
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  notifications: Notification[];
}

// 移除本地Notification定义，使用types中的定义

interface AppActions {
  setLanguage: (language: 'zh-CN' | 'en-US') => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  loadSettings: () => void;
  saveSettings: () => void;
}

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      // State
      language: 'zh-CN',
      theme: 'system',
      sidebarOpen: false,
      notifications: [],

      // Actions
      setLanguage: (language) => {
        set({ language });
        get().saveSettings();
      },

      setTheme: (theme) => {
        set({ theme });
        get().saveSettings();
      },
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  addNotification: (notification) => {
    const id = Date.now().toString();
    const newNotification: Notification = {
      ...notification,
      id,
    };

    set((state) => ({
      notifications: [...state.notifications, newNotification]
    }));

    // Auto remove notification after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        get().removeNotification(id);
      }, notification.duration || 5000);
    }
  },

  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),

  clearNotifications: () => set({ notifications: [] }),

  loadSettings: () => {
    const settings = typedStorage.getAppSettings();
    if (settings) {
      set({
        language: settings.language || 'zh-CN',
        theme: settings.theme || 'system'
      });
    }
  },

  saveSettings: () => {
    const { language, theme } = get();
    typedStorage.setAppSettings({ language, theme });
  },
}),
{
  name: 'app-storage',
  partialize: (state) => ({
    language: state.language,
    theme: state.theme
  }),
}
));
