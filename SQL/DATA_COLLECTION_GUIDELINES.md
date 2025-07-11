# 数据收集存储注意事项

## 🔒 数据隐私与安全

### 1. 用户隐私保护
- **最小化原则**：只收集必要的用户数据，避免过度收集
- **明确告知**：在收集前明确告知用户数据用途和处理方式
- **用户控制**：提供数据查看、修改、删除的权限
- **匿名化处理**：在数据分析时对敏感信息进行匿名化处理

### 2. 敏感数据加密
```javascript
// 密码加密
const bcrypt = require('bcrypt');
const saltRounds = 12;

// 加密存储
const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

// 验证密码
const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
```

### 3. 数据传输安全
- **HTTPS通信**：所有API请求必须使用HTTPS
- **API密钥管理**：定期轮换API密钥，避免硬编码
- **请求签名**：重要操作使用请求签名验证
- **访问控制**：实施严格的访问控制和权限管理

## 📊 数据收集规范

### 1. 用户数据收集
```javascript
// 用户注册数据收集
const collectUserRegistrationData = {
  required: {
    email: 'string',          // 必需：用户邮箱
    username: 'string',       // 必需：用户名
    password: 'string'        // 必需：密码
  },
  optional: {
    avatar: 'string',         // 可选：头像URL
    referrer: 'string',       // 可选：推荐人
    source: 'string'          // 可选：注册来源
  },
  automatic: {
    ipAddress: 'string',      // 自动：IP地址
    userAgent: 'string',      // 自动：用户代理
    registrationTime: 'date', // 自动：注册时间
    deviceFingerprint: 'string' // 自动：设备指纹
  }
};
```

### 2. 测试数据收集
```javascript
// MBTI测试数据收集
const collectMBTITestData = {
  sessionTracking: {
    sessionId: 'string',      // 会话ID
    startTime: 'date',        // 开始时间
    endTime: 'date',          // 结束时间
    duration: 'number'        // 测试时长
  },
  questionResponses: {
    questionId: 'number',     // 题目ID
    selectedOption: 'string', // 选择的选项
    responseTime: 'number',   // 响应时间
    isSkipped: 'boolean',     // 是否跳过
    changeCount: 'number'     // 修改次数
  },
  environmentData: {
    deviceType: 'string',     // 设备类型
    browserInfo: 'string',    // 浏览器信息
    screenResolution: 'string', // 屏幕分辨率
    timezone: 'string'        // 时区
  }
};
```

### 3. AI分析数据收集
```javascript
// AI分析数据收集
const collectAIAnalysisData = {
  input: {
    userId: 'ObjectId',       // 用户ID
    testResultId: 'ObjectId', // 测试结果ID
    analysisType: 'string',   // 分析类型
    prompt: 'string',         // 分析提示
    model: 'string'           // 使用的AI模型
  },
  output: {
    content: 'string',        // 分析内容
    confidence: 'number',     // 置信度
    processingTime: 'number', // 处理时间
    tokenCount: 'number',     // Token消耗
    cost: 'number'            // 成本
  },
  quality: {
    accuracy: 'number',       // 准确性评分
    relevance: 'number',      // 相关性评分
    userRating: 'number',     // 用户评分
    feedback: 'string'        // 用户反馈
  }
};
```

## 🛡️ 数据存储最佳实践

### 1. 数据库安全配置
```javascript
// MongoDB连接安全配置
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,          // 连接池大小
  serverSelectionTimeoutMS: 5000, // 服务器选择超时
  socketTimeoutMS: 45000,   // Socket超时
  family: 4,                // 使用IPv4
  authSource: 'admin',      // 认证数据库
  ssl: true,                // 启用SSL
  sslValidate: true,        // SSL验证
  sslCA: process.env.SSL_CA // SSL证书
};
```

### 2. 数据验证与清理
```javascript
// 输入数据验证
const validateUserInput = (data) => {
  const sanitized = {
    email: validator.isEmail(data.email) ? data.email.toLowerCase() : null,
    username: validator.isAlphanumeric(data.username) ? data.username : null,
    age: validator.isInt(data.age, { min: 13, max: 120 }) ? data.age : null
  };
  
  // 移除XSS风险
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = validator.escape(sanitized[key]);
    }
  });
  
  return sanitized;
};
```

### 3. 数据备份策略
```javascript
// 自动备份配置
const backupConfig = {
  schedule: '0 2 * * *',    // 每天凌晨2点备份
  retention: {
    daily: 7,               // 保留7天日备份
    weekly: 4,              // 保留4周备份
    monthly: 12             // 保留12个月备份
  },
  encryption: true,         // 备份加密
  compression: true,        // 备份压缩
  offsite: true            // 异地备份
};
```

## 📈 数据质量管理

### 1. 数据完整性检查
```javascript
// 数据完整性验证
const validateDataIntegrity = async () => {
  const checks = [
    // 检查必需字段
    {
      name: 'required_fields',
      query: { $or: [{ email: null }, { username: null }] },
      collection: 'users'
    },
    // 检查数据格式
    {
      name: 'email_format',
      query: { email: { $not: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ } },
      collection: 'users'
    },
    // 检查关联完整性
    {
      name: 'orphaned_results',
      query: { userId: { $nin: await User.distinct('_id') } },
      collection: 'test_results'
    }
  ];
  
  const results = await Promise.all(
    checks.map(check => db.collection(check.collection).countDocuments(check.query))
  );
  
  return checks.map((check, index) => ({
    check: check.name,
    issues: results[index]
  }));
};
```

### 2. 数据清理任务
```javascript
// 定期数据清理
const cleanupTasks = [
  {
    name: 'expired_sessions',
    interval: '0 0 * * *',   // 每天执行
    action: async () => {
      const expiredDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return await UserSession.deleteMany({
        'status.isActive': false,
        updatedAt: { $lt: expiredDate }
      });
    }
  },
  {
    name: 'incomplete_tests',
    interval: '0 2 * * *',   // 每天凌晨2点
    action: async () => {
      const expiredDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return await TestResult.deleteMany({
        'status.isCompleted': false,
        startedAt: { $lt: expiredDate }
      });
    }
  }
];
```

## 🔄 数据迁移与版本控制

### 1. 数据迁移脚本
```javascript
// 数据迁移示例
const migration_v1_to_v2 = {
  version: '2.0.0',
  description: '添加用户偏好设置',
  up: async () => {
    const users = await User.find({});
    for (const user of users) {
      if (!user.preferences) {
        user.preferences = {
          language: 'zh-CN',
          timezone: 'Asia/Shanghai',
          notifications: {
            email: true,
            daily: false,
            analysis: true
          }
        };
        await user.save();
      }
    }
  },
  down: async () => {
    await User.updateMany({}, { $unset: { preferences: 1 } });
  }
};
```

### 2. 版本兼容性处理
```javascript
// 版本兼容性检查
const checkVersionCompatibility = (data) => {
  const currentVersion = '2.0.0';
  const dataVersion = data.version || '1.0.0';
  
  if (semver.lt(dataVersion, currentVersion)) {
    // 需要数据迁移
    return {
      compatible: false,
      migrationNeeded: true,
      fromVersion: dataVersion,
      toVersion: currentVersion
    };
  }
  
  return { compatible: true };
};
```

## 🚨 错误处理与监控

### 1. 数据操作错误处理
```javascript
// 统一错误处理
const handleDatabaseError = (error) => {
  const errorMap = {
    11000: 'DUPLICATE_KEY',      // 重复键错误
    11001: 'DUPLICATE_KEY',      // 重复键错误
    2: 'BAD_VALUE',              // 错误值
    5: 'GRAPH_CONTAINS_CYCLE',   // 图包含循环
    13: 'UNAUTHORIZED',          // 未授权
    18: 'AUTH_FAILED',           // 认证失败
    50: 'EXCEEDED_TIME_LIMIT'    // 超时
  };
  
  const errorType = errorMap[error.code] || 'UNKNOWN_ERROR';
  
  // 记录错误
  logger.error('Database operation failed', {
    error: error.message,
    code: error.code,
    type: errorType,
    stack: error.stack
  });
  
  // 返回用户友好的错误信息
  return {
    success: false,
    error: errorType,
    message: getErrorMessage(errorType)
  };
};
```

### 2. 性能监控
```javascript
// 查询性能监控
const monitorQueryPerformance = (query, collection) => {
  const startTime = Date.now();
  
  return query.then(result => {
    const duration = Date.now() - startTime;
    
    // 记录慢查询
    if (duration > 1000) {
      logger.warn('Slow query detected', {
        collection,
        duration,
        query: query.getQuery(),
        explain: query.explain()
      });
    }
    
    return result;
  });
};
```

## 📋 合规性要求

### 1. GDPR合规
```javascript
// 数据主体权利实现
const gdprCompliance = {
  // 数据访问权
  accessData: async (userId) => {
    const userData = await User.findById(userId);
    const testResults = await TestResult.find({ userId });
    const aiAnalyses = await AIAnalysis.find({ userId });
    
    return {
      profile: userData,
      testResults,
      aiAnalyses,
      exportedAt: new Date()
    };
  },
  
  // 数据删除权
  deleteData: async (userId) => {
    await Promise.all([
      User.findByIdAndDelete(userId),
      TestResult.deleteMany({ userId }),
      AIAnalysis.deleteMany({ userId }),
      UserSession.deleteMany({ userId })
    ]);
  },
  
  // 数据修正权
  rectifyData: async (userId, corrections) => {
    return await User.findByIdAndUpdate(userId, corrections, { new: true });
  }
};
```

### 2. 数据保留政策
```javascript
// 数据保留配置
const retentionPolicy = {
  userProfiles: {
    active: -1,           // 活跃用户：永久保留
    inactive: 365 * 2,    // 非活跃用户：2年
    deleted: 30           // 已删除用户：30天软删除
  },
  testResults: {
    completed: 365 * 5,   // 完成的测试：5年
    incomplete: 7         // 未完成的测试：7天
  },
  aiAnalyses: {
    personal: 365 * 3,    // 个人分析：3年
    anonymous: 365 * 10   // 匿名分析：10年
  },
  logs: {
    application: 90,      // 应用日志：90天
    security: 365,        // 安全日志：1年
    audit: 365 * 7        // 审计日志：7年
  }
};
```

## 🎯 数据分析注意事项

### 1. 统计分析规范
```javascript
// 匿名化统计
const generateAnonymousStats = async () => {
  const pipeline = [
    { $match: { 'status.isActive': true } },
    { $group: {
      _id: '$result.mbti.type',
      count: { $sum: 1 },
      avgAge: { $avg: '$profile.age' },
      genderDistribution: {
        $push: '$profile.gender'
      }
    }},
    { $project: {
      _id: 0,
      mbtiType: '$_id',
      count: 1,
      avgAge: { $round: ['$avgAge', 0] },
      demographics: {
        male: { $size: { $filter: { input: '$genderDistribution', cond: { $eq: ['$$this', 'male'] } } } },
        female: { $size: { $filter: { input: '$genderDistribution', cond: { $eq: ['$$this', 'female'] } } } }
      }
    }}
  ];
  
  return await TestResult.aggregate(pipeline);
};
```

### 2. 数据脱敏处理
```javascript
// 数据脱敏函数
const anonymizeData = (data) => {
  return {
    ...data,
    email: data.email ? data.email.replace(/(.{2}).*@/, '$1***@') : null,
    username: data.username ? data.username.replace(/(.{2}).*/, '$1***') : null,
    ipAddress: data.ipAddress ? data.ipAddress.replace(/\d+$/, 'xxx') : null,
    phone: data.phone ? data.phone.replace(/\d{4}$/, '****') : null
  };
};
```

## 💡 最佳实践总结

### 1. 数据收集原则
- ✅ 明确目的：明确数据收集的具体用途
- ✅ 最小化收集：只收集必要的数据
- ✅ 透明告知：向用户说明数据用途
- ✅ 用户控制：给用户数据控制权
- ✅ 安全存储：加密存储敏感数据

### 2. 存储安全要求
- ✅ 访问控制：实施严格的访问控制
- ✅ 数据加密：传输和存储全程加密
- ✅ 定期备份：建立可靠的备份机制
- ✅ 监控告警：实时监控异常访问
- ✅ 审计日志：记录所有数据操作

### 3. 数据质量保证
- ✅ 输入验证：严格验证所有输入数据
- ✅ 格式标准：统一数据格式标准
- ✅ 完整性检查：定期检查数据完整性
- ✅ 清理维护：定期清理过期数据
- ✅ 版本管理：管理数据结构版本变化

### 4. 合规性要求
- ✅ 隐私保护：遵守相关隐私法规
- ✅ 数据权利：实现用户数据权利
- ✅ 保留政策：建立数据保留策略
- ✅ 跨境传输：符合跨境数据传输要求
- ✅ 定期审计：定期进行合规性审计

这些注意事项将帮助您构建一个安全、合规、高质量的数据管理系统。