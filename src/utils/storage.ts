/**
 * 本地存储工具
 * 提供类型安全的本地存储操作
 */

export interface StorageOptions {
  encrypt?: boolean;
  expiry?: number; // 过期时间（毫秒）
}

export interface StorageItem<T> {
  value: T;
  timestamp: number;
  expiry?: number;
}

/**
 * 本地存储管理器
 */
export class StorageManager {
  private static instance: StorageManager;
  private prefix: string;

  private constructor(prefix = 'inner_cosmos_') {
    this.prefix = prefix;
  }

  public static getInstance(prefix?: string): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager(prefix);
    }
    return StorageManager.instance;
  }

  /**
   * 生成完整的存储键名
   */
  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  /**
   * 检查项目是否过期
   */
  private isExpired(item: StorageItem<any>): boolean {
    if (!item.expiry) return false;
    return Date.now() > item.timestamp + item.expiry;
  }

  /**
   * 简单的加密/解密（仅用于基本保护，不适用于敏感数据）
   */
  private encrypt(data: string): string {
    return btoa(encodeURIComponent(data));
  }

  private decrypt(data: string): string {
    try {
      return decodeURIComponent(atob(data));
    } catch {
      return data; // 如果解密失败，返回原数据
    }
  }

  /**
   * 存储数据
   */
  set<T>(key: string, value: T, options: StorageOptions = {}): boolean {
    try {
      const item: StorageItem<T> = {
        value,
        timestamp: Date.now(),
        expiry: options.expiry
      };

      let serialized = JSON.stringify(item);
      
      if (options.encrypt) {
        serialized = this.encrypt(serialized);
      }

      localStorage.setItem(this.getKey(key), serialized);
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  }

  /**
   * 获取数据
   */
  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const stored = localStorage.getItem(this.getKey(key));
      if (!stored) return defaultValue || null;

      let data = stored;
      
      // 尝试解密
      try {
        data = this.decrypt(stored);
      } catch {
        // 如果解密失败，使用原数据
      }

      const item: StorageItem<T> = JSON.parse(data);

      // 检查是否过期
      if (this.isExpired(item)) {
        this.remove(key);
        return defaultValue || null;
      }

      return item.value;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue || null;
    }
  }

  /**
   * 移除数据
   */
  remove(key: string): boolean {
    try {
      localStorage.removeItem(this.getKey(key));
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  }

  /**
   * 清空所有数据
   */
  clear(): boolean {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }

  /**
   * 检查键是否存在
   */
  has(key: string): boolean {
    return localStorage.getItem(this.getKey(key)) !== null;
  }

  /**
   * 获取所有键
   */
  keys(): string[] {
    const keys = Object.keys(localStorage);
    return keys
      .filter(key => key.startsWith(this.prefix))
      .map(key => key.substring(this.prefix.length));
  }

  /**
   * 获取存储大小（字节）
   */
  size(): number {
    let total = 0;
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        const value = localStorage.getItem(key);
        if (value) {
          total += key.length + value.length;
        }
      }
    });
    return total;
  }

  /**
   * 批量操作
   */
  batch(operations: Array<{
    type: 'set' | 'remove';
    key: string;
    value?: any;
    options?: StorageOptions;
  }>): boolean {
    try {
      operations.forEach(op => {
        switch (op.type) {
          case 'set':
            this.set(op.key, op.value, op.options);
            break;
          case 'remove':
            this.remove(op.key);
            break;
        }
      });
      return true;
    } catch (error) {
      console.error('Storage batch error:', error);
      return false;
    }
  }
}

/**
 * 预定义的存储键
 */
export const StorageKeys = {
  // 用户相关
  USER_TOKEN: 'user_token',
  USER_PROFILE: 'user_profile',
  USER_PREFERENCES: 'user_preferences',
  
  // 测试结果
  MBTI_RESULT: 'mbti_result',
  ASTROLOGY_RESULT: 'astrology_result',
  
  // 应用设置
  APP_SETTINGS: 'app_settings',
  THEME: 'theme',
  LANGUAGE: 'language',
  
  // 缓存
  CACHE_TIMESTAMP: 'cache_timestamp',
  API_CACHE: 'api_cache',
  
  // 临时数据
  TEMP_FORM_DATA: 'temp_form_data',
  DRAFT_DATA: 'draft_data'
} as const;

/**
 * 类型安全的存储操作
 */
export class TypedStorage {
  private storage: StorageManager;

  constructor(storage: StorageManager) {
    this.storage = storage;
  }

  // 用户令牌
  setUserToken(token: string, expiry?: number): boolean {
    return this.storage.set(StorageKeys.USER_TOKEN, token, { 
      encrypt: true, 
      expiry 
    });
  }

  getUserToken(): string | null {
    return this.storage.get<string>(StorageKeys.USER_TOKEN);
  }

  removeUserToken(): boolean {
    return this.storage.remove(StorageKeys.USER_TOKEN);
  }

  // 用户档案
  setUserProfile(profile: any): boolean {
    return this.storage.set(StorageKeys.USER_PROFILE, profile);
  }

  getUserProfile(): any | null {
    return this.storage.get(StorageKeys.USER_PROFILE);
  }

  // MBTI结果
  setMBTIResult(result: any): boolean {
    return this.storage.set(StorageKeys.MBTI_RESULT, result);
  }

  getMBTIResult(): any | null {
    return this.storage.get(StorageKeys.MBTI_RESULT);
  }

  // 星座结果
  setAstrologyResult(result: any): boolean {
    return this.storage.set(StorageKeys.ASTROLOGY_RESULT, result);
  }

  getAstrologyResult(): any | null {
    return this.storage.get(StorageKeys.ASTROLOGY_RESULT);
  }

  // 应用设置
  setAppSettings(settings: any): boolean {
    return this.storage.set(StorageKeys.APP_SETTINGS, settings);
  }

  getAppSettings(): any | null {
    return this.storage.get(StorageKeys.APP_SETTINGS, {
      theme: 'light',
      language: 'zh-CN',
      notifications: true
    });
  }

  // 临时表单数据
  setTempFormData(formId: string, data: any): boolean {
    return this.storage.set(`${StorageKeys.TEMP_FORM_DATA}_${formId}`, data, {
      expiry: 24 * 60 * 60 * 1000 // 24小时过期
    });
  }

  getTempFormData(formId: string): any | null {
    return this.storage.get(`${StorageKeys.TEMP_FORM_DATA}_${formId}`);
  }

  removeTempFormData(formId: string): boolean {
    return this.storage.remove(`${StorageKeys.TEMP_FORM_DATA}_${formId}`);
  }
}

// 导出单例实例
export const storage = StorageManager.getInstance();
export const typedStorage = new TypedStorage(storage);

/**
 * 便捷函数
 */
export const setItem = <T>(key: string, value: T, options?: StorageOptions) => 
  storage.set(key, value, options);

export const getItem = <T>(key: string, defaultValue?: T) => 
  storage.get<T>(key, defaultValue);

export const removeItem = (key: string) => 
  storage.remove(key);

export const clearStorage = () => 
  storage.clear();
