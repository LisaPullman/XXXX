import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeStore {
  theme: Theme;
  systemTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  setSystemTheme: (theme: 'light' | 'dark') => void;
  getResolvedTheme: () => 'light' | 'dark';
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'auto',
      systemTheme: 'light',
      
      setTheme: (theme) => {
        set({ theme });
        const resolvedTheme = theme === 'auto' ? get().systemTheme : theme;
        document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
      },
      
      setSystemTheme: (systemTheme) => {
        set({ systemTheme });
        const currentTheme = get().theme;
        if (currentTheme === 'auto') {
          document.documentElement.classList.toggle('dark', systemTheme === 'dark');
        }
      },
      
      getResolvedTheme: () => {
        const { theme, systemTheme } = get();
        return theme === 'auto' ? systemTheme : theme;
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);

// 系统主题检测
export const initializeTheme = () => {
  const { setSystemTheme, setTheme, theme } = useThemeStore.getState();
  
  // 检测系统主题
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const updateSystemTheme = (e: MediaQueryListEvent | MediaQueryList) => {
    setSystemTheme(e.matches ? 'dark' : 'light');
  };
  
  // 初始化系统主题
  updateSystemTheme(mediaQuery);
  
  // 监听系统主题变化
  mediaQuery.addEventListener('change', updateSystemTheme);
  
  // 应用当前主题
  const resolvedTheme = theme === 'auto' ? (mediaQuery.matches ? 'dark' : 'light') : theme;
  document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
  
  return () => {
    mediaQuery.removeEventListener('change', updateSystemTheme);
  };
};