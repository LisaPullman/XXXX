# SQL目录总览

本目录包含内在宇宙项目的完整数据库设计方案和操作指南。

## 📁 文件结构

```
sql/
├── README.md                           # 本文档
├── DATABASE_DESIGN.md                  # 数据库设计方案
├── DATA_COLLECTION_GUIDELINES.md      # 数据收集存储注意事项
├── models.ts                          # Mongoose数据模型定义
├── database_operations.ts             # 数据库操作示例和最佳实践
├── init_database.sh                   # 数据库初始化脚本
└── migrations/                        # 数据库迁移文件（未来扩展）
```

## 🎯 核心文档说明

### 1. DATABASE_DESIGN.md
**完整的数据库设计方案**
- 数据库选择：MongoDB + Redis
- 数据模型设计：用户、测试结果、AI分析、用户会话、系统配置
- 索引优化策略
- 分片和性能优化
- 数据关系设计

### 2. DATA_COLLECTION_GUIDELINES.md
**数据收集存储注意事项**
- 数据隐私与安全
- 数据收集规范
- 存储安全要求
- 数据质量管理
- 合规性要求（GDPR等）
- 最佳实践总结

### 3. models.ts
**Mongoose数据模型定义**
- 完整的TypeScript接口定义
- Mongoose Schema配置
- 数据验证规则
- 中间件和实例方法
- 索引定义

### 4. database_operations.ts
**数据库操作示例和最佳实践**
- 用户管理操作
- 测试结果处理
- AI分析管理
- 批量操作
- 聚合查询
- 事务处理
- 性能优化

### 5. init_database.sh
**数据库初始化脚本**
- 自动化数据库创建
- 索引创建
- 系统配置初始化
- 管理员账户创建
- 数据完整性验证

## 🚀 快速开始

### 1. 数据库初始化
```bash
# 设置环境变量
export MONGODB_URI="mongodb://localhost:27017"
export ADMIN_EMAIL="admin@inner-cosmos.com"
export ADMIN_PASSWORD="your-secure-password"

# 运行初始化脚本
./init_database.sh
```

### 2. 在项目中使用
```typescript
// 导入数据模型
import { User, TestResult, AIAnalysis } from './sql/models';

// 导入服务类
import { UserService, TestResultService } from './sql/database_operations';

// 创建用户
const user = await UserService.createUser({
  email: 'user@example.com',
  username: 'testuser',
  password: 'password123'
});

// 创建测试
const test = await TestResultService.createTestResult({
  userId: user._id,
  testType: 'mbti',
  testVersion: '1.0.0'
});
```

## 📊 数据模型概述

### 核心数据模型
1. **User** - 用户信息
   - 基础信息、个人档案、偏好设置
   - 账户状态、安全信息、元数据

2. **TestResult** - 测试结果
   - 测试数据、结果分析、环境信息
   - 状态管理、统计数据

3. **AIAnalysis** - AI分析
   - 分析内容、质量指标、使用统计
   - 技术信息、成本跟踪

4. **UserSession** - 用户会话
   - 聊天记录、会话状态、统计信息
   - 消息管理、附件处理

5. **SystemConfig** - 系统配置
   - 测试配置、AI配置、系统设置
   - 版本管理、环境配置

### 数据关系
```
User (1:N) TestResult
User (1:N) AIAnalysis  
User (1:N) UserSession
TestResult (1:N) AIAnalysis
```

## 🔧 技术栈

### 数据库
- **MongoDB 6.0+** - 主数据库
- **Redis 7.0+** - 缓存层
- **Mongoose 7.0+** - ODM框架

### 特性
- ✅ 完整的TypeScript支持
- ✅ 数据验证和约束
- ✅ 索引优化
- ✅ 事务支持
- ✅ 聚合查询
- ✅ 性能优化
- ✅ 安全防护

## 📈 性能优化

### 1. 索引策略
- 单字段索引：email, username
- 复合索引：userId + testType + completedAt
- 文本索引：分析内容搜索
- 地理索引：位置信息查询

### 2. 查询优化
- 使用lean()提高查询性能
- 聚合管道优化
- 分页查询优化
- 缓存热点数据

### 3. 存储优化
- 数据压缩
- 分片配置
- 读写分离
- 连接池管理

## 🛡️ 安全措施

### 1. 数据安全
- 密码哈希存储
- 敏感信息加密
- API访问控制
- 请求限流

### 2. 隐私保护
- 数据匿名化
- 用户授权管理
- 数据访问审计
- GDPR合规

### 3. 系统安全
- 连接加密
- 参数验证
- 注入防护
- 异常处理

## 📋 开发指南

### 1. 数据模型扩展
```typescript
// 扩展现有模型
interface ExtendedUser extends IUser {
  customField: string;
}

// 添加新的模型
const CustomSchema = new Schema({
  // 字段定义
});
```

### 2. 添加新的操作
```typescript
// 继承现有服务
class CustomUserService extends UserService {
  static async customOperation() {
    // 自定义操作
  }
}
```

### 3. 数据迁移
```bash
# 创建迁移文件
./init_database.sh --migration create_new_field

# 运行迁移
./init_database.sh --migration up
```

## 🔍 监控与维护

### 1. 性能监控
- 慢查询日志
- 连接池状态
- 内存使用情况
- 索引效率分析

### 2. 数据清理
- 过期数据清理
- 索引碎片整理
- 日志轮转
- 备份验证

### 3. 健康检查
```javascript
// 数据库健康检查
const healthCheck = async () => {
  const dbStatus = await mongoose.connection.db.admin().ping();
  const userCount = await User.countDocuments();
  const testCount = await TestResult.countDocuments();
  
  return {
    database: dbStatus ? 'healthy' : 'unhealthy',
    users: userCount,
    tests: testCount,
    timestamp: new Date()
  };
};
```

## 🆘 故障排除

### 常见问题

1. **连接超时**
   - 检查MongoDB服务状态
   - 验证连接字符串
   - 检查网络连接

2. **索引问题**
   - 重建索引：`db.collection.reIndex()`
   - 查看索引使用：`db.collection.getIndexes()`
   - 分析查询计划：`query.explain()`

3. **性能问题**
   - 启用慢查询日志
   - 优化查询条件
   - 调整索引策略

### 获取帮助
- 查看MongoDB官方文档
- 检查Mongoose文档
- 联系技术支持团队

---

**注意事项：**
- 生产环境部署前请务必测试所有功能
- 定期备份数据库
- 保持数据库和依赖项的更新
- 遵守相关的数据保护法规

**版本信息：**
- 设计版本：1.0.0
- 最后更新：2025-01-10
- 兼容性：MongoDB 6.0+, Node.js 18+