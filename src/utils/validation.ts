/**
 * 表单验证工具
 */

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
  message?: string;
}

export interface ValidationSchema {
  [key: string]: ValidationRule[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * 验证单个字段
 */
export function validateField(value: any, rules: ValidationRule[]): string | null {
  for (const rule of rules) {
    // 必填验证
    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return rule.message || '此字段为必填项';
    }

    // 如果值为空且不是必填，跳过其他验证
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      continue;
    }

    // 最小长度验证
    if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
      return rule.message || `最少需要${rule.minLength}个字符`;
    }

    // 最大长度验证
    if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
      return rule.message || `最多允许${rule.maxLength}个字符`;
    }

    // 正则表达式验证
    if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      return rule.message || '格式不正确';
    }

    // 自定义验证
    if (rule.custom) {
      const customError = rule.custom(value);
      if (customError) {
        return customError;
      }
    }
  }

  return null;
}

/**
 * 验证整个表单
 */
export function validateForm(data: Record<string, any>, schema: ValidationSchema): ValidationResult {
  const errors: Record<string, string> = {};

  for (const [field, rules] of Object.entries(schema)) {
    const error = validateField(data[field], rules);
    if (error) {
      errors[field] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * 常用验证规则
 */
export const ValidationRules = {
  // 邮箱验证
  email: (message?: string): ValidationRule => ({
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: message || '请输入有效的邮箱地址'
  }),

  // 密码验证
  password: (minLength = 6, message?: string): ValidationRule => ({
    minLength,
    pattern: /^(?=.*[a-zA-Z])(?=.*\d)/,
    message: message || `密码至少${minLength}位，包含字母和数字`
  }),

  // 手机号验证
  phone: (message?: string): ValidationRule => ({
    pattern: /^1[3-9]\d{9}$/,
    message: message || '请输入有效的手机号码'
  }),

  // 用户名验证
  username: (message?: string): ValidationRule => ({
    minLength: 2,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9\u4e00-\u9fa5_-]+$/,
    message: message || '用户名2-20位，支持中英文、数字、下划线和连字符'
  }),

  // 日期验证
  date: (message?: string): ValidationRule => ({
    custom: (value: string) => {
      if (!value) return null;
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return message || '请输入有效的日期';
      }
      if (date > new Date()) {
        return '日期不能是未来时间';
      }
      if (date.getFullYear() < 1900) {
        return '请输入有效的年份';
      }
      return null;
    }
  }),

  // 时间验证
  time: (message?: string): ValidationRule => ({
    pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
    message: message || '请输入有效的时间格式 (HH:MM)'
  }),

  // 年龄验证
  age: (min = 0, max = 150, message?: string): ValidationRule => ({
    custom: (value: number) => {
      if (typeof value !== 'number' || isNaN(value)) {
        return '请输入有效的年龄';
      }
      if (value < min || value > max) {
        return message || `年龄应在${min}-${max}岁之间`;
      }
      return null;
    }
  }),

  // 必填验证
  required: (message?: string): ValidationRule => ({
    required: true,
    message: message || '此字段为必填项'
  }),

  // 长度验证
  length: (min?: number, max?: number, message?: string): ValidationRule => ({
    minLength: min,
    maxLength: max,
    message: message || (min && max ? `长度应在${min}-${max}个字符之间` : 
                       min ? `至少需要${min}个字符` : 
                       max ? `最多允许${max}个字符` : '长度不符合要求')
  }),

  // 确认密码验证
  confirmPassword: (originalPassword: string, message?: string): ValidationRule => ({
    custom: (value: string) => {
      if (value !== originalPassword) {
        return message || '两次输入的密码不一致';
      }
      return null;
    }
  }),

  // URL验证
  url: (message?: string): ValidationRule => ({
    pattern: /^https?:\/\/.+/,
    message: message || '请输入有效的URL地址'
  }),

  // 数字验证
  number: (min?: number, max?: number, message?: string): ValidationRule => ({
    custom: (value: any) => {
      const num = Number(value);
      if (isNaN(num)) {
        return '请输入有效的数字';
      }
      if (min !== undefined && num < min) {
        return message || `数值不能小于${min}`;
      }
      if (max !== undefined && num > max) {
        return message || `数值不能大于${max}`;
      }
      return null;
    }
  }),

  // 身份证验证
  idCard: (message?: string): ValidationRule => ({
    pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    message: message || '请输入有效的身份证号码'
  })
};

/**
 * 常用表单验证模式
 */
export const ValidationSchemas = {
  // 用户注册
  userRegister: {
    email: [ValidationRules.required(), ValidationRules.email()],
    password: [ValidationRules.required(), ValidationRules.password()],
    username: [ValidationRules.required(), ValidationRules.username()]
  },

  // 用户登录
  userLogin: {
    email: [ValidationRules.required(), ValidationRules.email()],
    password: [ValidationRules.required()]
  },

  // 用户档案
  userProfile: {
    username: [ValidationRules.required(), ValidationRules.username()],
    gender: [ValidationRules.required()],
    birthDate: [ValidationRules.required(), ValidationRules.date()],
    birthTime: [ValidationRules.time()]
  },

  // 忘记密码
  forgotPassword: {
    email: [ValidationRules.required(), ValidationRules.email()]
  },

  // 重置密码
  resetPassword: {
    password: [ValidationRules.required(), ValidationRules.password()],
    confirmPassword: [ValidationRules.required()]
  }
};

/**
 * 实时验证Hook辅助函数
 */
export function createValidator(schema: ValidationSchema) {
  return {
    validate: (data: Record<string, any>) => validateForm(data, schema),
    validateField: (field: string, value: any) => {
      const rules = schema[field];
      if (!rules) return null;
      return validateField(value, rules);
    }
  };
}
