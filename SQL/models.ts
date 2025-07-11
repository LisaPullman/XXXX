// MongoDB Mongoose 模型定义
// 用于内在宇宙项目的数据模型

import mongoose, { Schema, Document } from 'mongoose';

// ===========================================
// 接口定义
// ===========================================

// 用户接口
export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  avatar?: string;
  profile: {
    gender?: 'male' | 'female' | 'other';
    birthDate?: Date;
    birthTime?: string;
    birthLocation?: {
      city?: string;
      province?: string;
      country?: string;
      latitude?: number;
      longitude?: number;
      timezone?: string;
    };
  };
  preferences: {
    language: string;
    timezone: string;
    notifications: {
      email: boolean;
      daily: boolean;
      analysis: boolean;
    };
    privacy: {
      profileVisible: boolean;
      shareResults: boolean;
      allowAnalytics: boolean;
    };
  };
  status: {
    isActive: boolean;
    isEmailVerified: boolean;
    isPremium: boolean;
    subscriptionExpiry?: Date;
    lastLoginAt?: Date;
    loginCount: number;
  };
  security: {
    loginAttempts: number;
    lockUntil?: Date;
    passwordResetToken?: string;
    passwordResetExpiry?: Date;
    emailVerificationToken?: string;
    refreshTokens: string[];
  };
  metadata: {
    registrationSource?: string;
    userAgent?: string;
    ipAddress?: string;
    referrer?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// 测试结果接口
export interface ITestResult extends Document {
  userId: mongoose.Types.ObjectId;
  testType: 'mbti' | 'astrology' | 'bazi' | 'custom';
  testVersion: string;
  sessionId: string;
  testData: {
    questions: Array<{
      questionId: number;
      question: string;
      selectedOption: 'A' | 'B';
      responseTime: number;
      timestamp: Date;
    }>;
    totalDuration: number;
    completionRate: number;
  };
  result: {
    mbti?: {
      type: string;
      dimensions: {
        EI: number;
        SN: number;
        TF: number;
        JP: number;
      };
      confidence: number;
      description: string;
    };
    astrology?: {
      sunSign: string;
      element: string;
      quality: string;
      rulingPlanet: string;
      traits: string[];
      compatibility: string[];
      luckyNumbers: number[];
      luckyColors: string[];
    };
    score?: number;
    level?: string;
    tags?: string[];
    insights?: string[];
  };
  environment: {
    device?: string;
    browser?: string;
    os?: string;
    screenResolution?: string;
    timezone?: string;
  };
  status: {
    isCompleted: boolean;
    isPublic: boolean;
    isArchived: boolean;
    shareCount: number;
    viewCount: number;
  };
  startedAt: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// AI分析接口
export interface IAIAnalysis extends Document {
  userId: mongoose.Types.ObjectId;
  testResultId: mongoose.Types.ObjectId;
  analysisType: 'personality' | 'career' | 'relationship' | 'daily';
  prompt: string;
  model: string;
  content: {
    summary: string;
    details: string;
    suggestions: string[];
    insights: string[];
    keywords: string[];
    scores: {
      accuracy: number;
      depth: number;
      usefulness: number;
    };
  };
  quality: {
    confidence: number;
    relevance: number;
    coherence: number;
    completeness: number;
  };
  usage: {
    viewCount: number;
    shareCount: number;
    likeCount: number;
    rating?: number;
    feedback?: string;
  };
  technical: {
    processingTime: number;
    tokenCount: number;
    cost: number;
    language: string;
  };
  requestedAt: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 用户会话接口
export interface IUserSession extends Document {
  userId: mongoose.Types.ObjectId;
  sessionType: 'chat' | 'consultation' | 'analysis';
  title: string;
  description?: string;
  messages: Array<{
    id: string;
    type: 'user' | 'ai' | 'system';
    content: string;
    attachments?: Array<{
      type: 'image' | 'file' | 'test_result';
      url: string;
      name: string;
      size: number;
    }>;
    metadata?: {
      model?: string;
      tokenCount?: number;
      responseTime?: number;
    };
    timestamp: Date;
  }>;
  status: {
    isActive: boolean;
    isArchived: boolean;
    isPinned: boolean;
    messageCount: number;
    lastActivity: Date;
  };
  statistics: {
    totalMessages: number;
    totalTokens: number;
    totalCost: number;
    averageResponseTime: number;
    satisfaction?: number;
  };
  startedAt: Date;
  endedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 系统配置接口
export interface ISystemConfig extends Document {
  configType: 'mbti' | 'astrology' | 'ai' | 'system';
  name: string;
  version: string;
  config: any;
  status: {
    isActive: boolean;
    isDefault: boolean;
    environment: 'development' | 'production';
  };
  createdAt: Date;
  updatedAt: Date;
}

// ===========================================
// Schema 定义
// ===========================================

// 用户Schema
const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email format'
    }
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
    validate: {
      validator: function(v: string) {
        return /^[a-zA-Z0-9_]+$/.test(v);
      },
      message: 'Username can only contain letters, numbers, and underscores'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: ''
  },
  profile: {
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      default: null
    },
    birthDate: {
      type: Date,
      default: null
    },
    birthTime: {
      type: String,
      default: null,
      validate: {
        validator: function(v: string) {
          return !v || /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
        },
        message: 'Invalid time format (HH:MM)'
      }
    },
    birthLocation: {
      city: String,
      province: String,
      country: String,
      latitude: Number,
      longitude: Number,
      timezone: String
    }
  },
  preferences: {
    language: {
      type: String,
      default: 'zh-CN'
    },
    timezone: {
      type: String,
      default: 'Asia/Shanghai'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      daily: {
        type: Boolean,
        default: false
      },
      analysis: {
        type: Boolean,
        default: true
      }
    },
    privacy: {
      profileVisible: {
        type: Boolean,
        default: true
      },
      shareResults: {
        type: Boolean,
        default: false
      },
      allowAnalytics: {
        type: Boolean,
        default: true
      }
    }
  },
  status: {
    isActive: {
      type: Boolean,
      default: true
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    isPremium: {
      type: Boolean,
      default: false
    },
    subscriptionExpiry: {
      type: Date,
      default: null
    },
    lastLoginAt: {
      type: Date,
      default: null
    },
    loginCount: {
      type: Number,
      default: 0
    }
  },
  security: {
    loginAttempts: {
      type: Number,
      default: 0
    },
    lockUntil: {
      type: Date,
      default: null
    },
    passwordResetToken: {
      type: String,
      default: null
    },
    passwordResetExpiry: {
      type: Date,
      default: null
    },
    emailVerificationToken: {
      type: String,
      default: null
    },
    refreshTokens: [{
      type: String
    }]
  },
  metadata: {
    registrationSource: String,
    userAgent: String,
    ipAddress: String,
    referrer: String
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      delete ret.security;
      return ret;
    }
  }
});

// 测试结果Schema
const TestResultSchema = new Schema<ITestResult>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  testType: {
    type: String,
    required: true,
    enum: ['mbti', 'astrology', 'bazi', 'custom']
  },
  testVersion: {
    type: String,
    required: true,
    default: '1.0.0'
  },
  sessionId: {
    type: String,
    required: true
  },
  testData: {
    questions: [{
      questionId: Number,
      question: String,
      selectedOption: {
        type: String,
        enum: ['A', 'B']
      },
      responseTime: Number,
      timestamp: Date
    }],
    totalDuration: {
      type: Number,
      default: 0
    },
    completionRate: {
      type: Number,
      min: 0,
      max: 1,
      default: 0
    }
  },
  result: {
    mbti: {
      type: {
        type: String,
        validate: {
          validator: function(v: string) {
            return /^[IE][SN][TF][JP]$/.test(v);
          },
          message: 'Invalid MBTI type format'
        }
      },
      dimensions: {
        EI: {
          type: Number,
          min: -100,
          max: 100
        },
        SN: {
          type: Number,
          min: -100,
          max: 100
        },
        TF: {
          type: Number,
          min: -100,
          max: 100
        },
        JP: {
          type: Number,
          min: -100,
          max: 100
        }
      },
      confidence: {
        type: Number,
        min: 0,
        max: 1
      },
      description: String
    },
    astrology: {
      sunSign: String,
      element: String,
      quality: String,
      rulingPlanet: String,
      traits: [String],
      compatibility: [String],
      luckyNumbers: [Number],
      luckyColors: [String]
    },
    score: Number,
    level: String,
    tags: [String],
    insights: [String]
  },
  environment: {
    device: String,
    browser: String,
    os: String,
    screenResolution: String,
    timezone: String
  },
  status: {
    isCompleted: {
      type: Boolean,
      default: false
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    isArchived: {
      type: Boolean,
      default: false
    },
    shareCount: {
      type: Number,
      default: 0
    },
    viewCount: {
      type: Number,
      default: 0
    }
  },
  startedAt: {
    type: Date,
    required: true
  },
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// AI分析Schema
const AIAnalysisSchema = new Schema<IAIAnalysis>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  testResultId: {
    type: Schema.Types.ObjectId,
    ref: 'TestResult',
    required: true
  },
  analysisType: {
    type: String,
    required: true,
    enum: ['personality', 'career', 'relationship', 'daily']
  },
  prompt: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  content: {
    summary: {
      type: String,
      required: true
    },
    details: {
      type: String,
      required: true
    },
    suggestions: [String],
    insights: [String],
    keywords: [String],
    scores: {
      accuracy: {
        type: Number,
        min: 0,
        max: 100
      },
      depth: {
        type: Number,
        min: 0,
        max: 100
      },
      usefulness: {
        type: Number,
        min: 0,
        max: 100
      }
    }
  },
  quality: {
    confidence: {
      type: Number,
      min: 0,
      max: 1
    },
    relevance: {
      type: Number,
      min: 0,
      max: 1
    },
    coherence: {
      type: Number,
      min: 0,
      max: 1
    },
    completeness: {
      type: Number,
      min: 0,
      max: 1
    }
  },
  usage: {
    viewCount: {
      type: Number,
      default: 0
    },
    shareCount: {
      type: Number,
      default: 0
    },
    likeCount: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    feedback: String
  },
  technical: {
    processingTime: {
      type: Number,
      required: true
    },
    tokenCount: {
      type: Number,
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    language: {
      type: String,
      required: true
    }
  },
  requestedAt: {
    type: Date,
    required: true
  },
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// 用户会话Schema
const UserSessionSchema = new Schema<IUserSession>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionType: {
    type: String,
    required: true,
    enum: ['chat', 'consultation', 'analysis']
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  messages: [{
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['user', 'ai', 'system']
    },
    content: {
      type: String,
      required: true
    },
    attachments: [{
      type: {
        type: String,
        enum: ['image', 'file', 'test_result']
      },
      url: String,
      name: String,
      size: Number
    }],
    metadata: {
      model: String,
      tokenCount: Number,
      responseTime: Number
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    isActive: {
      type: Boolean,
      default: true
    },
    isArchived: {
      type: Boolean,
      default: false
    },
    isPinned: {
      type: Boolean,
      default: false
    },
    messageCount: {
      type: Number,
      default: 0
    },
    lastActivity: {
      type: Date,
      default: Date.now
    }
  },
  statistics: {
    totalMessages: {
      type: Number,
      default: 0
    },
    totalTokens: {
      type: Number,
      default: 0
    },
    totalCost: {
      type: Number,
      default: 0
    },
    averageResponseTime: {
      type: Number,
      default: 0
    },
    satisfaction: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  startedAt: {
    type: Date,
    required: true
  },
  endedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// 系统配置Schema
const SystemConfigSchema = new Schema<ISystemConfig>({
  configType: {
    type: String,
    required: true,
    enum: ['mbti', 'astrology', 'ai', 'system']
  },
  name: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  config: {
    type: Schema.Types.Mixed,
    required: true
  },
  status: {
    isActive: {
      type: Boolean,
      default: true
    },
    isDefault: {
      type: Boolean,
      default: false
    },
    environment: {
      type: String,
      enum: ['development', 'production'],
      default: 'production'
    }
  }
}, {
  timestamps: true
});

// ===========================================
// 中间件和方法
// ===========================================

// 用户模型中间件
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    // 密码加密会在业务逻辑中处理
  }
  next();
});

// 测试结果模型方法
TestResultSchema.methods.calculateScore = function() {
  // 计算测试分数的逻辑
  return this.result.score || 0;
};

// AI分析模型方法
AIAnalysisSchema.methods.updateQuality = function(qualityData: any) {
  this.quality = { ...this.quality, ...qualityData };
  return this.save();
};

// 用户会话模型方法
UserSessionSchema.methods.addMessage = function(message: any) {
  this.messages.push(message);
  this.status.messageCount = this.messages.length;
  this.status.lastActivity = new Date();
  return this.save();
};

// ===========================================
// 模型导出
// ===========================================

export const User = mongoose.model<IUser>('User', UserSchema);
export const TestResult = mongoose.model<ITestResult>('TestResult', TestResultSchema);
export const AIAnalysis = mongoose.model<IAIAnalysis>('AIAnalysis', AIAnalysisSchema);
export const UserSession = mongoose.model<IUserSession>('UserSession', UserSessionSchema);
export const SystemConfig = mongoose.model<ISystemConfig>('SystemConfig', SystemConfigSchema);

// 默认导出
export default {
  User,
  TestResult,
  AIAnalysis,
  UserSession,
  SystemConfig
};