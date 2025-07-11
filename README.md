# 内在宇宙 (Inner Cosmos) 🌌

> 一个融合科学心理测评与神秘命理艺术的个性化探索平台

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)

## ✨ 项目简介

内在宇宙是一个现代化的心理测评和星座分析平台，通过科学的MBTI人格测试和精准的星座分析，帮助用户深度了解自己的性格特质、行为模式和潜在可能。

### 🎯 核心功能

- **🧠 MBTI人格测试** - 28道专业题目，16型人格深度分析
- **✨ 星座分析** - 基于出生时间地点的精确星盘计算
- **🤖 AI深度解读** - 融合测试结果的个性化分析
- **🎨 分享海报** - 精美的结果分享功能
- **🌙 深色模式** - 完整的主题切换系统
- **📱 移动优先** - 完全响应式的用户界面

### 🛠 技术栈

#### 前端技术
- **React 18** + **TypeScript** - 现代化前端框架 (稳定版本)
- **Vite 7** - 超快的构建工具
- **Tailwind CSS 3.4** - 实用优先的CSS框架 (稳定版本)
- **Zustand 4** - 轻量级状态管理
- **React Router 6** - 客户端路由

#### 后端技术
- **Node.js** + **Express** - 高性能后端服务
- **TypeScript** - 类型安全的开发体验
- **MongoDB** - 文档型数据库
- **Redis** - 高性能缓存
- **JWT** - 安全的身份认证

#### 部署架构
- **Docker** + **Docker Compose** - 容器化部署
- **Nginx** - 高性能反向代理
- **SSL/TLS** - 端到端加密
- **PM2** - 进程管理

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0

### 本地开发

1. **克隆项目**
```bash
git clone <repository-url>
cd inner-cosmos
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问应用**
- 前端应用: http://localhost:5173 或 http://localhost:5174 (如果5173被占用)

### 项目特色

- ✅ **兼容性优化** - 使用React 18和Tailwind CSS 3.4稳定版本
- ✅ **开箱即用** - 无需后端配置即可体验完整功能
- ✅ **模拟数据** - 内置模拟API，支持离线开发
- ✅ **响应式设计** - 完美适配桌面和移动设备
- ✅ **主题切换** - 支持明暗主题自动切换

### 环境变量配置

#### 必需环境变量
```env
# 数据库配置
MONGODB_URI=mongodb://localhost:27017/inner-cosmos
REDIS_URL=redis://localhost:6379

# JWT配置
JWT_SECRET=your-jwt-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key

# OpenAI配置
OPENAI_API_KEY=your-openai-api-key

# 应用配置
NODE_ENV=development
PORT=3001
```

#### 可选环境变量
```env
# Redis密码
REDIS_PASSWORD=your-redis-password

# 监控配置
GRAFANA_PASSWORD=your-grafana-password

# 邮件配置 (如需要)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password
```

## 📦 项目结构

```
inner-cosmos/
├── src/                          # 前端源代码
│   ├── components/               # React组件
│   │   └── ui/                  # 基础UI组件 (Button, Card, Input等)
│   ├── pages/                   # 页面组件
│   │   ├── Home.tsx             # 首页
│   │   ├── Login.tsx            # 登录页
│   │   ├── MBTITestPage.tsx     # MBTI测试页
│   │   └── AstrologyPage.tsx    # 星座分析页
│   ├── stores/                  # 状态管理 (Zustand)
│   │   ├── useAuthStore.ts      # 用户认证状态
│   │   ├── useAppStore.ts       # 应用全局状态
│   │   └── useThemeStore.ts     # 主题状态
│   ├── utils/                   # 工具函数
│   ├── types/                   # TypeScript类型定义
│   └── services/                # API服务层
├── public/                      # 静态资源
├── dist/                        # 构建输出
├── tailwind.config.js           # Tailwind CSS配置
├── vite.config.ts               # Vite配置
└── package.json                 # 项目依赖
```

## 🎨 UI组件库

项目包含完整的现代化UI组件库：

### 基础组件
- **Button** - 6种变体，完全响应式
- **Input** - 4种风格，支持图标和验证
- **Card** - 5种变体，支持hover效果
- **Select** - 下拉选择，键盘导航支持
- **Modal** - 可配置弹窗系统

### 高级组件
- **Toast** - 现代化通知系统
- **Skeleton** - 骨架屏加载效果
- **ThemeToggle** - 主题切换器
- **TouchFeedback** - 移动端触摸反馈

### 设计特色
- 🎨 **OKLCH色彩空间** - 科学准确的色彩感知
- 🌌 **宇宙主题** - 一致的星空视觉语言
- ✨ **玻璃拟态** - 现代化的视觉效果
- 📱 **移动优先** - 完全响应式设计

## 🔧 开发指南

### 可用脚本

```bash
# 开发
npm run dev              # 启动开发服务器 (Vite)
npm run preview          # 预览构建结果

# 构建
npm run build            # 构建生产版本
npm run build:prod       # 构建生产版本 (优化)

# 代码质量
npm run lint             # 代码检查
npm run lint:fix         # 自动修复代码问题  
npm run type-check       # TypeScript类型检查

# 维护
npm run clean            # 清理构建文件
npm run analyze          # 分析打包大小
```

### 开发环境说明

这是一个**前端单页应用**项目，当前版本专注于：

- 🎨 **UI/UX设计** - 完整的用户界面和交互体验
- 🧠 **MBTI测试逻辑** - 完整的心理测评算法
- ✨ **星座分析功能** - 基于日期的星座分析
- 📱 **响应式设计** - 移动端和桌面端适配
- 🌙 **主题系统** - 完整的明暗主题切换

### 技术特色

- **类型安全** - 完整的TypeScript支持
- **状态管理** - 使用Zustand进行轻量级状态管理  
- **样式系统** - Tailwind CSS 3.4提供实用优先的样式
- **构建优化** - Vite提供极快的开发和构建体验
- **代码规范** - ESLint + TypeScript保证代码质量

### 代码规范

- **ESLint** - 代码质量检查
- **TypeScript** - 类型安全
- **Prettier** - 代码格式化 (推荐配置)

### 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## ⚡ 性能优化

### 已实现的优化

- ⚡ **Vite构建** - 极速的开发和构建体验
- 🔄 **代码分割** - 按路由自动分割，减少初始加载
- 🗜 **资源优化** - 自动压缩和优化静态资源
- 📱 **移动优化** - 移动端优先的性能调优
- 🎯 **按需加载** - 组件和页面的懒加载
- 🧮 **状态优化** - Zustand轻量级状态管理

## 🔒 安全特性

### 前端安全

- 🛡 **XSS防护** - React内置XSS防护
- 🔒 **HTTPS支持** - 生产环境强制HTTPS
- 📊 **数据验证** - 客户端输入验证
- 🔐 **安全存储** - 敏感数据加密存储

## 🎯 功能路线图

### 当前版本 (v1.0)
- ✅ 完整的UI组件库
- ✅ MBTI人格测试
- ✅ 星座分析功能
- ✅ 用户认证系统
- ✅ 主题切换系统
- ✅ 响应式设计

### 计划功能 (v2.0)
- 🔄 后端API集成
- 🔄 数据持久化
- 🔄 用户个人资料
- 🔄 测试结果历史
- 🔄 社交分享功能
- 🔄 AI深度分析

## 📧 联系方式

- **项目维护**: admin@foxai.edu.kg
- **版权信息**: © 2025 内在宇宙团队

## 🚀 快速体验

想要立即体验内在宇宙？

1. **在线体验** - 访问部署的演示站点 (如果可用)
2. **本地运行** - 按照上方的快速开始指南

### 功能亮点

- 🧠 **专业MBTI测试** - 28题科学评估，获得你的16型人格
- ✨ **精准星座分析** - 输入生日获得个性化星座解读  
- 🎨 **现代化界面** - 精美的UI设计和流畅的用户体验
- 📱 **完美适配** - 无论手机还是电脑都有最佳体验
- 🌙 **主题切换** - 支持亮色/暗色/自动主题

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和设计师们！

特别感谢：
- React 团队提供的优秀框架
- Tailwind CSS 团队的设计系统  
- Vite 团队的构建工具
- TypeScript 团队的类型系统
- 所有开源贡献者的无私奉献

---

<div align="center">
  <p>用 ❤️ 打造，为探索内心宇宙的每一个人</p>
  <p>🌌 内在宇宙 - 发现真实的自己 🌌</p>
  
  <br>
  
  <a href="#-快速开始">🚀 立即开始</a> •
  <a href="#-项目简介">📖 了解更多</a> •
  <a href="#-贡献指南">🤝 参与贡献</a>
</div>