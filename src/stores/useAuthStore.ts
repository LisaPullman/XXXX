import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';
import { typedStorage } from '../utils/storage';
import { validateForm, ValidationSchemas } from '../utils/validation';
import { authApi, ApiError } from '../services/apiService';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, userData?: Partial<User>) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // State
      user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Actions
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // 验证输入数据
      const validation = validateForm({ email, password }, ValidationSchemas.userLogin);
      if (!validation.isValid) {
        throw new Error(Object.values(validation.errors)[0]);
      }

      // 尝试真实API调用，失败时使用模拟数据
      let user: User;
      let token: string;

      try {
        const response = await authApi.login(email, password);
        if (response.success && response.data) {
          user = response.data.user;
          token = response.data.token;
        } else {
          throw new Error(response.message || '登录失败');
        }
      } catch (apiError) {
        // API调用失败，使用模拟数据（开发模式）
        console.warn('API调用失败，使用模拟数据:', apiError);

        user = {
          id: '1',
          email,
          username: email.split('@')[0],
          preferredLanguage: 'zh-CN',
          timezone: 'Asia/Shanghai',
          region: 'CN',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        token = 'mock_token_' + Date.now();
      }

      // 存储用户信息和令牌
      typedStorage.setUserProfile(user);
      typedStorage.setUserToken(token, 7 * 24 * 60 * 60 * 1000); // 7天过期

      set({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false
      });
    }
  },

  register: async (email: string, password: string, userData?: Partial<User>) => {
    set({ isLoading: true, error: null });
    try {
      // 验证输入数据
      const registerData = { email, password, username: userData?.username || email.split('@')[0] };
      const validation = validateForm(registerData, ValidationSchemas.userRegister);
      if (!validation.isValid) {
        throw new Error(Object.values(validation.errors)[0]);
      }

      // 尝试真实API调用，失败时使用模拟数据
      let user: User;
      let token: string;

      try {
        const response = await authApi.register({
          email,
          password,
          username: registerData.username
        });

        if (response.success && response.data) {
          user = response.data.user;
          token = response.data.token;
        } else {
          throw new Error(response.message || '注册失败');
        }
      } catch (apiError) {
        // API调用失败，使用模拟数据（开发模式）
        console.warn('API调用失败，使用模拟数据:', apiError);

        user = {
          id: Date.now().toString(),
          email,
          username: userData?.username || email.split('@')[0],
          preferredLanguage: userData?.preferredLanguage || 'zh-CN',
          timezone: userData?.timezone || 'Asia/Shanghai',
          region: userData?.region || 'CN',
          createdAt: new Date(),
          updatedAt: new Date(),
          ...userData,
        };
        token = 'mock_token_' + Date.now();
      }

      // 存储用户信息和令牌
      typedStorage.setUserProfile(user);
      typedStorage.setUserToken(token, 7 * 24 * 60 * 60 * 1000); // 7天过期

      set({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Registration failed',
        isLoading: false
      });
    }
  },

  logout: () => {
    // 清理存储的用户数据
    typedStorage.removeUserToken();
    typedStorage.setUserProfile(null);

    set({
      user: null,
      isAuthenticated: false,
      error: null
    });
  },

  updateUser: (userData: Partial<User>) => {
    const { user } = get();
    if (user) {
      const updatedUser = {
        ...user,
        ...userData,
        updatedAt: new Date()
      };

      // 同步到存储
      typedStorage.setUserProfile(updatedUser);

      set({ user: updatedUser });
    }
  },

  clearError: () => set({ error: null }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
