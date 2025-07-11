# 内在宇宙数据库设计方案

## 📋 数据库选择

### 推荐方案：MongoDB + Redis
- **主数据库**：MongoDB 6.0+（文档型数据库）
- **缓存层**：Redis 7.0+（内存数据库）
- **搜索引擎**：MongoDB Atlas Search（可选）

### 选择理由
1. **灵活的数据结构**：心理测试和星座数据结构复杂多变，MongoDB的文档模型更适合
2. **JSON原生支持**：前端数据可直接存储，减少转换成本
3. **水平扩展**：支持分片，适合用户数据增长
4. **丰富的查询能力**：支持复杂查询和聚合操作
5. **成熟的云服务**：MongoDB Atlas提供完整的云解决方案

## 🗂️ 数据模型设计

### 1. 用户模型 (users)
```javascript
{
  _id: ObjectId,
  // 基础信息
  email: String, // 邮箱 (唯一索引)
  username: String, // 用户名 (唯一索引)
  password: String, // 密码哈希
  avatar: String, // 头像URL
  
  // 个人信息
  profile: {
    gender: String, // 性别: 'male' | 'female' | 'other'
    birthDate: Date, // 出生日期
    birthTime: String, // 出生时间 "HH:mm"
    birthLocation: {
      city: String,
      province: String,
      country: String,
      latitude: Number,
      longitude: Number,
      timezone: String
    }
  },
  
  // 偏好设置
  preferences: {
    language: String, // 语言偏好
    timezone: String, // 时区
    notifications: {
      email: Boolean,
      daily: Boolean,
      analysis: Boolean
    },
    privacy: {
      profileVisible: Boolean,
      shareResults: Boolean,
      allowAnalytics: Boolean
    }
  },
  
  // 账户状态
  status: {
    isActive: Boolean,
    isEmailVerified: Boolean,
    isPremium: Boolean,
    subscriptionExpiry: Date,
    lastLoginAt: Date,
    loginCount: Number
  },
  
  // 安全相关
  security: {
    loginAttempts: Number,
    lockUntil: Date,
    passwordResetToken: String,
    passwordResetExpiry: Date,
    emailVerificationToken: String,
    refreshTokens: [String]
  },
  
  // 元数据
  metadata: {
    registrationSource: String, // 注册来源
    userAgent: String,
    ipAddress: String,
    referrer: String
  },
  
  // 时间戳
  createdAt: Date,
  updatedAt: Date
}
```

### 2. 测试结果模型 (test_results)
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // 关联用户
  
  // 测试基本信息
  testType: String, // 'mbti' | 'astrology' | 'bazi' | 'custom'
  testVersion: String, // 测试版本 "1.0.0"
  sessionId: String, // 会话ID
  
  // 测试数据
  testData: {
    questions: [{
      questionId: Number,
      question: String,
      selectedOption: String, // 'A' | 'B'
      responseTime: Number, // 响应时间(ms)
      timestamp: Date
    }],
    totalDuration: Number, // 总测试时长(ms)
    completionRate: Number // 完成率 0-1
  },
  
  // 测试结果
  result: {
    // MBTI结果
    mbti: {
      type: String, // 'INTJ' | 'ENFP' 等
      dimensions: {
        EI: Number, // -100 到 100
        SN: Number,
        TF: Number,
        JP: Number
      },
      confidence: Number, // 置信度 0-1
      description: String
    },
    
    // 星座结果
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
    
    // 通用结果字段
    score: Number, // 总分
    level: String, // 等级
    tags: [String], // 标签
    insights: [String] // 洞察
  },
  
  // 测试环境
  environment: {
    device: String, // 设备类型
    browser: String, // 浏览器
    os: String, // 操作系统
    screenResolution: String,
    timezone: String
  },
  
  // 状态
  status: {
    isCompleted: Boolean,
    isPublic: Boolean, // 是否公开
    isArchived: Boolean,
    shareCount: Number,
    viewCount: Number
  },
  
  // 时间戳
  startedAt: Date,
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. AI分析记录模型 (ai_analyses)
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // 关联用户
  testResultId: ObjectId, // 关联测试结果
  
  // 分析信息
  analysisType: String, // 'personality' | 'career' | 'relationship' | 'daily'
  prompt: String, // 分析提示词
  model: String, // AI模型 'gpt-3.5-turbo' | 'gpt-4'
  
  // 分析结果
  content: {
    summary: String, // 总结
    details: String, // 详细分析
    suggestions: [String], // 建议
    insights: [String], // 洞察
    keywords: [String], // 关键词
    scores: {
      accuracy: Number, // 准确度
      depth: Number, // 深度
      usefulness: Number // 有用性
    }
  },
  
  // 质量指标
  quality: {
    confidence: Number, // AI置信度
    relevance: Number, // 相关性
    coherence: Number, // 连贯性
    completeness: Number // 完整性
  },
  
  // 使用统计
  usage: {
    viewCount: Number,
    shareCount: Number,
    likeCount: Number,
    rating: Number, // 用户评分 1-5
    feedback: String
  },
  
  // 技术信息
  technical: {
    processingTime: Number, // 处理时间(ms)
    tokenCount: Number, // 消耗token数
    cost: Number, // 成本
    language: String // 语言
  },
  
  // 时间戳
  requestedAt: Date,
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. 用户会话模型 (user_sessions)
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // 关联用户
  
  // 会话信息
  sessionType: String, // 'chat' | 'consultation' | 'analysis'
  title: String, // 会话标题
  description: String, // 会话描述
  
  // 消息记录
  messages: [{
    id: String,
    type: String, // 'user' | 'ai' | 'system'
    content: String,
    attachments: [{
      type: String, // 'image' | 'file' | 'test_result'
      url: String,
      name: String,
      size: Number
    }],
    metadata: {
      model: String,
      tokenCount: Number,
      responseTime: Number
    },
    timestamp: Date
  }],
  
  // 会话状态
  status: {
    isActive: Boolean,
    isArchived: Boolean,
    isPinned: Boolean,
    messageCount: Number,
    lastActivity: Date
  },
  
  // 会话统计
  statistics: {
    totalMessages: Number,
    totalTokens: Number,
    totalCost: Number,
    averageResponseTime: Number,
    satisfaction: Number // 满意度评分
  },
  
  // 时间戳
  startedAt: Date,
  endedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. 系统配置模型 (system_configs)
```javascript
{
  _id: ObjectId,
  
  // 配置信息
  configType: String, // 'mbti' | 'astrology' | 'ai' | 'system'
  name: String, // 配置名称
  version: String, // 版本号
  
  // 配置内容
  config: {
    // MBTI配置
    mbti: {
      questions: [{
        id: Number,
        question: String,
        options: { A: String, B: String },
        dimension: String,
        weight: Number
      }],
      scoring: {
        thresholds: {
          strong: Number,
          moderate: Number,
          slight: Number
        }
      }
    },
    
    // 星座配置
    astrology: {
      signs: [{
        name: String,
        symbol: String,
        element: String,
        quality: String,
        dateRange: String,
        traits: Object
      }]
    },
    
    // AI配置
    ai: {
      models: [{
        name: String,
        endpoint: String,
        apiKey: String,
        maxTokens: Number,
        temperature: Number
      }],
      prompts: {
        personality: String,
        career: String,
        relationship: String
      }
    }
  },
  
  // 状态
  status: {
    isActive: Boolean,
    isDefault: Boolean,
    environment: String // 'development' | 'production'
  },
  
  // 时间戳
  createdAt: Date,
  updatedAt: Date
}
```

## 📊 数据库索引设计

### 主要索引
```javascript
// 用户表索引
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ username: 1 }, { unique: true })
db.users.createIndex({ "status.isActive": 1, createdAt: -1 })
db.users.createIndex({ "profile.birthDate": 1 })

// 测试结果表索引
db.test_results.createIndex({ userId: 1, testType: 1, completedAt: -1 })
db.test_results.createIndex({ testType: 1, "status.isCompleted": 1 })
db.test_results.createIndex({ "result.mbti.type": 1 })
db.test_results.createIndex({ "result.astrology.sunSign": 1 })

// AI分析表索引
db.ai_analyses.createIndex({ userId: 1, createdAt: -1 })
db.ai_analyses.createIndex({ testResultId: 1 })
db.ai_analyses.createIndex({ analysisType: 1, createdAt: -1 })

// 用户会话表索引
db.user_sessions.createIndex({ userId: 1, "status.isActive": 1 })
db.user_sessions.createIndex({ sessionType: 1, createdAt: -1 })

// 系统配置表索引
db.system_configs.createIndex({ configType: 1, "status.isActive": 1 })
```

### 复合索引
```javascript
// 用户活跃度分析
db.users.createIndex({ 
  "status.isActive": 1, 
  "status.lastLoginAt": -1, 
  "status.isPremium": 1 
})

// 测试结果查询优化
db.test_results.createIndex({ 
  userId: 1, 
  testType: 1, 
  "status.isCompleted": 1, 
  completedAt: -1 
})

// AI分析效果统计
db.ai_analyses.createIndex({ 
  analysisType: 1, 
  model: 1, 
  "quality.confidence": -1 
})
```

## 🔄 数据关系设计

### 关系图
```
User (1:N) TestResult
User (1:N) AIAnalysis
User (1:N) UserSession
TestResult (1:N) AIAnalysis
```

### 引用完整性
- 使用 `ObjectId` 进行关联
- 删除用户时级联删除相关数据
- 软删除重要数据，保留统计分析

## 🎯 数据分片策略

### 水平分片
```javascript
// 按用户ID分片
sh.shardCollection("inner_cosmos.users", { _id: "hashed" })

// 按用户ID和时间分片
sh.shardCollection("inner_cosmos.test_results", { userId: 1, createdAt: 1 })
sh.shardCollection("inner_cosmos.ai_analyses", { userId: 1, createdAt: 1 })
```

### 分片键选择
- **用户数据**：使用哈希分片，均匀分布
- **时间序列数据**：使用范围分片，便于查询
- **查询优化**：分片键包含在查询条件中

## 🚀 性能优化策略

### 1. 读写分离
```javascript
// 读操作配置
const readOptions = {
  readPreference: 'secondary',
  readConcern: { level: 'majority' }
}

// 写操作配置
const writeOptions = {
  writeConcern: { w: 'majority', j: true }
}
```

### 2. 缓存策略
```javascript
// Redis缓存配置
const cacheConfig = {
  // 用户信息缓存 (1小时)
  userProfile: { ttl: 3600 },
  
  // 测试结果缓存 (24小时)
  testResults: { ttl: 86400 },
  
  // AI分析缓存 (1周)
  aiAnalyses: { ttl: 604800 },
  
  // 系统配置缓存 (永久，手动刷新)
  systemConfigs: { ttl: -1 }
}
```

### 3. 查询优化
```javascript
// 使用聚合管道优化复杂查询
const pipeline = [
  { $match: { userId: ObjectId(userId) } },
  { $sort: { completedAt: -1 } },
  { $limit: 10 },
  { $lookup: {
    from: "ai_analyses",
    localField: "_id",
    foreignField: "testResultId",
    as: "analyses"
  }},
  { $project: {
    testType: 1,
    result: 1,
    completedAt: 1,
    analysisCount: { $size: "$analyses" }
  }}
]
```

## 📋 数据质量保证

### 1. 数据验证
```javascript
// Mongoose Schema验证
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email format'
    }
  },
  // 其他字段...
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
```

### 2. 数据清理
```javascript
// 定期清理过期数据
const cleanupTasks = [
  // 清理过期会话
  { 
    collection: 'user_sessions',
    condition: { 
      'status.isActive': false,
      updatedAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }
  },
  
  // 清理未完成的测试
  {
    collection: 'test_results',
    condition: {
      'status.isCompleted': false,
      startedAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    }
  }
]
```

这个数据库设计方案为内在宇宙项目提供了完整的数据存储解决方案，具有良好的可扩展性和性能表现。