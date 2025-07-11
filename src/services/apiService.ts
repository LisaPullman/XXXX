/**
 * API服务基础架构
 * 提供统一的HTTP请求接口和错误处理
 */

import { typedStorage } from '../utils/storage';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string>;
}

export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  requireAuth?: boolean;
}

export class ApiError extends Error {
  public status: number;
  public errors?: Record<string, string>;

  constructor(message: string, status: number, errors?: Record<string, string>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

/**
 * API服务类
 */
export class ApiService {
  private static instance: ApiService;
  private baseUrl: string;
  private defaultTimeout: number;

  private constructor() {
    // 在 Vite 中使用 import.meta.env 而不是 process.env
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
    this.defaultTimeout = 10000; // 10秒
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  /**
   * 获取认证头
   */
  private getAuthHeaders(): Record<string, string> {
    const token = typedStorage.getUserToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * 构建请求头
   */
  private buildHeaders(config: ApiRequestConfig): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...config.headers,
    };

    if (config.requireAuth) {
      Object.assign(headers, this.getAuthHeaders());
    }

    return headers;
  }

  /**
   * 处理响应
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    let data: any;
    try {
      data = isJson ? await response.json() : await response.text();
    } catch (error) {
      throw new ApiError('响应解析失败', response.status);
    }

    if (!response.ok) {
      throw new ApiError(
        data.message || `HTTP ${response.status}`,
        response.status,
        data.errors
      );
    }

    return data;
  }

  /**
   * 发送HTTP请求
   */
  async request<T = any>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      body,
      timeout = this.defaultTimeout,
      requireAuth = false,
    } = config;

    const url = `${this.baseUrl}${endpoint}`;
    const headers = this.buildHeaders(config);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return await this.handleResponse<T>(response);
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        throw error;
      }

      if (error.name === 'AbortError') {
        throw new ApiError('请求超时', 408);
      }

      throw new ApiError('网络错误', 0);
    }
  }

  /**
   * GET请求
   */
  async get<T = any>(endpoint: string, config: Omit<ApiRequestConfig, 'method'> = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  /**
   * POST请求
   */
  async post<T = any>(endpoint: string, body?: any, config: Omit<ApiRequestConfig, 'method' | 'body'> = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'POST', body });
  }

  /**
   * PUT请求
   */
  async put<T = any>(endpoint: string, body?: any, config: Omit<ApiRequestConfig, 'method' | 'body'> = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body });
  }

  /**
   * DELETE请求
   */
  async delete<T = any>(endpoint: string, config: Omit<ApiRequestConfig, 'method'> = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }

  /**
   * PATCH请求
   */
  async patch<T = any>(endpoint: string, body?: any, config: Omit<ApiRequestConfig, 'method' | 'body'> = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'PATCH', body });
  }
}

/**
 * 认证API服务
 */
export class AuthApiService {
  private api: ApiService;

  constructor() {
    this.api = ApiService.getInstance();
  }

  /**
   * 用户登录
   */
  async login(email: string, password: string): Promise<ApiResponse<{ user: any; token: string }>> {
    return this.api.post('/auth/login', { email, password });
  }

  /**
   * 用户注册
   */
  async register(userData: {
    email: string;
    password: string;
    username: string;
  }): Promise<ApiResponse<{ user: any; token: string }>> {
    return this.api.post('/auth/register', userData);
  }

  /**
   * 刷新令牌
   */
  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return this.api.post('/auth/refresh', {}, { requireAuth: true });
  }

  /**
   * 用户登出
   */
  async logout(): Promise<ApiResponse> {
    return this.api.post('/auth/logout', {}, { requireAuth: true });
  }

  /**
   * 忘记密码
   */
  async forgotPassword(email: string): Promise<ApiResponse> {
    return this.api.post('/auth/forgot-password', { email });
  }

  /**
   * 重置密码
   */
  async resetPassword(token: string, password: string): Promise<ApiResponse> {
    return this.api.post('/auth/reset-password', { token, password });
  }

  /**
   * 验证邮箱
   */
  async verifyEmail(token: string): Promise<ApiResponse> {
    return this.api.post('/auth/verify-email', { token });
  }

  /**
   * 获取当前用户信息
   */
  async getCurrentUser(): Promise<ApiResponse<any>> {
    return this.api.get('/auth/me', { requireAuth: true });
  }
}

/**
 * 用户API服务
 */
export class UserApiService {
  private api: ApiService;

  constructor() {
    this.api = ApiService.getInstance();
  }

  /**
   * 更新用户档案
   */
  async updateProfile(userData: any): Promise<ApiResponse<any>> {
    return this.api.put('/user/profile', userData, { requireAuth: true });
  }

  /**
   * 上传头像
   */
  async uploadAvatar(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.api.request('/user/avatar', {
      method: 'POST',
      body: formData,
      requireAuth: true,
      headers: {}, // 不设置Content-Type，让浏览器自动设置
    });
  }

  /**
   * 更改密码
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse> {
    return this.api.put('/user/password', {
      currentPassword,
      newPassword
    }, { requireAuth: true });
  }

  /**
   * 删除账户
   */
  async deleteAccount(password: string): Promise<ApiResponse> {
    return this.api.delete('/user/account', {
      requireAuth: true,
      body: { password }
    });
  }
}

/**
 * 测试结果API服务
 */
export class TestResultApiService {
  private api: ApiService;

  constructor() {
    this.api = ApiService.getInstance();
  }

  /**
   * 保存MBTI测试结果
   */
  async saveMBTIResult(result: any): Promise<ApiResponse<any>> {
    return this.api.post('/test-results/mbti', result, { requireAuth: true });
  }

  /**
   * 获取MBTI测试结果
   */
  async getMBTIResults(): Promise<ApiResponse<any[]>> {
    return this.api.get('/test-results/mbti', { requireAuth: true });
  }

  /**
   * 保存星座分析结果
   */
  async saveAstrologyResult(result: any): Promise<ApiResponse<any>> {
    return this.api.post('/test-results/astrology', result, { requireAuth: true });
  }

  /**
   * 获取星座分析结果
   */
  async getAstrologyResults(): Promise<ApiResponse<any[]>> {
    return this.api.get('/test-results/astrology', { requireAuth: true });
  }
}

// 导出服务实例
export const apiService = ApiService.getInstance();
export const authApi = new AuthApiService();
export const userApi = new UserApiService();
export const testResultApi = new TestResultApiService();
