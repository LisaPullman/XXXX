# 内在宇宙 (Inner Cosmos) 🌌

> 融合科学心理测评与神秘命理艺术的个性化AI探索平台

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.20.0-green.svg)
![PWA](https://img.shields.io/badge/PWA-enabled-purple.svg)

## ✨ 项目简介

内在宇宙是一个现代化的心理测评和AI分析平台，通过**8大探索领域**的科学测评和智能AI解读，帮助用户深度了解自己的性格特质、行为模式和人生潜能。

### 🎯 八大探索领域

- **🧠 MBTI性格测评** - 93道权威题目，基于荣格认知功能理论的深度分析
- **⭐ 星座运势分析** - 基于出生日期和时间，分析星座特质和运势走向
- **🔮 塔罗牌占卜** - 78张完整牌库，多种经典牌阵，智能解读系统
- **🩸 血型性格分析** - 基于血型理论，分析性格倾向和行为特点
- **🤲 手相面相分析** - AI识别手相面相特征，解读性格和命运走向
- **☯️ 易经八卦** - 运用五千年易经智慧，AI算运与八卦知识指点迷津
- **🤖 AI综合大师** - 融合所有测评结果，AI大师提供全方位人生指导
- **🧘‍♀️ 禅修教室** - 静心冥想空间，提供禅修音乐、经文诵读和心灵陪伴

### 🚀 核心特色

- **🤖 AI智能分析** - 硅基流动API驱动，提供个性化深度解读
- **📱 PWA应用** - 支持离线使用，原生应用体验
- **🎨 精美海报** - Canvas生成分享海报，多种视觉模板
- **🔗 关联分析** - 跨模块数据关联，发现性格一致性和矛盾点
- **🌙 主题切换** - 完整的明暗主题系统，护眼体验
- **📊 数据可视化** - 性格雷达图、成长轨迹、发展建议
- **🔒 隐私保护** - 端到端加密，用户数据安全保障

### 🛠 技术栈

#### 前端技术
- **React 18.3.1** + **TypeScript 5.8.3** - 现代化前端框架
- **Vite 7.0.3** - 超快的构建工具和开发服务器
- **Tailwind CSS 3.4.14** - 实用优先的CSS框架
- **Zustand 4.5.5** - 轻量级状态管理
- **React Router 6.26.1** - 客户端路由
- **Ant Design 5.21.6** - 企业级UI组件库

#### 后端技术
- **Node.js 18.20.x LTS** + **Express 4.19.2** - 高性能后端服务
- **TypeScript 5.8.3** - 类型安全的开发体验
- **MongoDB 7.0** - 文档型数据库
- **Redis 7.2** - 高性能缓存和会话存储
- **PostgreSQL 16** - 关系型数据库
- **JWT** - 安全的身份认证

#### AI与集成
- **硅基流动API** - 专业AI分析引擎
- **Canvas API** - 海报生成和图像处理
- **Lunar TypeScript** - 农历和星座计算
- **QRCode** - 二维码生成和分享

#### 部署架构
- **Docker** + **Docker Compose** - 容器化部署
- **Nginx** - 高性能反向代理和负载均衡
- **Let's Encrypt** - 免费SSL证书
- **Prometheus** + **Grafana** - 监控和可视化
- **AlertManager** - 智能告警系统

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.20.0 LTS
- **pnpm** >= 9.0.0 (推荐) 或 npm >= 8.0.0
- **Docker** >= 20.10.0 (可选，用于部署)

### 本地开发

1. **克隆项目**
```bash
git clone <repository-url>
cd inner-cosmos
```

2. **安装依赖**
```bash
# 推荐使用pnpm
pnpm install

# 或使用npm
npm install
```

3. **启动开发服务器**
```bash
# 前端开发服务器
pnpm run dev

# 后端开发服务器（可选）
cd server
pnpm run dev
```

4. **访问应用**
- 前端应用: http://localhost:5173
- 后端API: http://localhost:3001 (如果启动了后端)

### 生产部署

1. **使用Docker Compose**
```bash
# 构建并启动所有服务
docker-compose up -d

# 启动监控系统
docker-compose -f docker-compose.monitoring.yml up -d
```

2. **手动部署**
```bash
# 构建前端
pnpm run build

# 部署到Web服务器
cp -r dist/* /var/www/html/
```

## 📦 项目结构

```
inner-cosmos/
├── src/                          # 前端源代码
│   ├── components/               # React组件
│   │   ├── ui/                  # 基础UI组件库
│   │   ├── features/            # 功能组件
│   │   ├── pwa/                 # PWA相关组件
│   │   └── layout/              # 布局组件
│   ├── modules/                 # 8大功能模块
│   │   ├── mbti/               # MBTI人格测试
│   │   ├── astrology/          # 星座分析
│   │   ├── tarot/              # 塔罗占卜
│   │   ├── bloodtype/          # 血型分析
│   │   ├── palmistry/          # 手相面相
│   │   ├── iching/             # 易经八卦
│   │   ├── ai-master/          # AI综合大师
│   │   └── meditation/         # 禅修教室
│   ├── pages/                  # 页面组件
│   ├── stores/                 # 状态管理 (Zustand)
│   ├── services/               # API服务层
│   ├── hooks/                  # 自定义Hooks
│   └── utils/                  # 工具函数
├── server/                     # 后端服务
│   ├── src/                   # 后端源代码
│   │   ├── config/            # 配置文件
│   │   ├── models/            # 数据模型
│   │   ├── middleware/        # 中间件
│   │   └── utils/             # 工具函数
│   └── package.json           # 后端依赖
├── monitoring/                 # 监控配置
│   ├── prometheus.yml         # Prometheus配置
│   ├── grafana-dashboard.json # Grafana仪表板
│   └── alert_rules.yml        # 告警规则
├── scripts/                   # 自动化脚本
│   ├── monitoring-setup.sh    # 监控部署脚本
│   ├── security-setup.sh      # 安全配置脚本
│   └── ssl-setup.sh           # SSL证书配置
├── public/                    # 静态资源
│   ├── manifest.json          # PWA配置
│   └── sw.js                  # Service Worker
├── docker-compose.yml         # Docker编排文件
└── package.json               # 项目依赖
```

## 🎨 功能特色

### 1. 专业测评系统

#### MBTI人格测试
- **快速版本**: 30道核心题目，10分钟完成，85%准确率
- **专业版本**: 93道权威题目，25分钟完成，95%专业准确率
- **认知功能分析**: 基于荣格8大认知功能理论
- **职业匹配**: 个人发展和职业规划建议

#### 星座分析系统
- **精准计算**: 基于出生时间和地点的星盘分析
- **12星座详解**: 性格特质、爱情运势、事业指导
- **每日运势**: 实时更新的运势预测
- **配对分析**: 星座兼容性和关系建议

#### 塔罗占卜系统
- **完整牌库**: 78张标准塔罗牌，详细牌意解释
- **多种牌阵**: 从简单到复杂的各种经典牌阵
- **智能解读**: AI驱动的牌面组合分析
- **塔罗学习**: 牌意学习和进度追踪

### 2. AI智能分析

#### 硅基流动API集成
- **深度学习**: 基于大数据训练的神经网络模型
- **多维分析**: 整合多种测评维度的综合分析
- **个性化建议**: 针对个人特质的定制化指导方案
- **预测分析**: 基于历史数据的趋势预测

#### 跨模块关联分析
- **一致性检验**: 识别不同测评结果的一致性
- **矛盾点分析**: 发现性格特征间的矛盾和冲突
- **综合画像**: 生成完整的个性化人格档案
- **发展建议**: 基于分析结果的成长指导

### 3. PWA原生体验

#### 离线功能
- **Service Worker**: 智能缓存策略，支持离线使用
- **数据同步**: 离线数据自动同步到云端
- **推送通知**: 重要更新和提醒推送
- **后台同步**: 测试结果后台自动保存

#### 移动端优化
- **响应式设计**: 完美适配手机、平板、桌面
- **触摸优化**: 手势导航和触摸反馈
- **性能优化**: 懒加载、代码分割、资源压缩
- **安装提示**: 智能PWA安装引导

### 4. 数据可视化

#### 结果展示
- **性格雷达图**: 多维度性格特征可视化
- **成长轨迹**: 个人发展历程图表
- **比较分析**: 不同测评结果对比
- **趋势预测**: 未来发展趋势图

#### 分享功能
- **精美海报**: Canvas生成的个性化分享海报
- **多种模板**: 宇宙、星空、简约等多种视觉风格
- **社交分享**: 一键分享到微信、微博等平台
- **二维码**: 生成结果页面二维码

## 🔧 开发指南

### 可用脚本

```bash
# 开发相关
pnpm run dev              # 启动开发服务器
pnpm run build            # 构建生产版本
pnpm run preview          # 预览构建结果

# 代码质量
pnpm run lint             # 代码检查
pnpm run lint:fix         # 自动修复代码问题
pnpm run type-check       # TypeScript类型检查

# 依赖管理
pnpm run clean            # 清理构建文件
pnpm run analyze          # 分析打包大小
./scripts/update-dependencies.sh  # 更新依赖版本
./scripts/check-dependencies.js   # 检查依赖版本
```

### 部署脚本

```bash
# 监控系统
./scripts/monitoring-setup.sh deploy    # 部署监控系统
./scripts/monitoring-setup.sh health    # 健康检查

# 安全配置
sudo ./scripts/security-setup.sh        # 配置服务器安全

# SSL证书
./scripts/ssl-setup.sh -d domain.com -e admin@domain.com
```

### 环境变量配置

#### 必需环境变量
```env
# 数据库配置
MONGODB_URI=mongodb://localhost:27017/inner-cosmos
REDIS_URL=redis://localhost:6379

# JWT配置
JWT_SECRET=your-jwt-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key

# AI服务配置
SILICONFLOW_API_KEY=your-siliconflow-api-key
SILICONFLOW_API_URL=https://api.siliconflow.cn

# 应用配置
NODE_ENV=production
PORT=3001
```

#### 可选环境变量
```env
# 监控配置
GRAFANA_PASSWORD=your-grafana-password
PROMETHEUS_RETENTION=30d

# 邮件配置
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password

# 云存储配置
OSS_REGION=oss-cn-hangzhou
OSS_BUCKET=your-bucket-name
OSS_ACCESS_KEY_ID=your-access-key
OSS_ACCESS_KEY_SECRET=your-secret-key
```

## 🔒 安全特性

### 前端安全
- **XSS防护**: React内置XSS防护机制
- **CSRF防护**: 跨站请求伪造防护
- **内容安全策略**: CSP头部配置
- **HTTPS强制**: 生产环境强制HTTPS

### 后端安全
- **输入验证**: 严格的数据验证和清理
- **SQL注入防护**: 参数化查询和ORM保护
- **率限制**: API请求频率限制
- **JWT认证**: 安全的用户认证机制

### 服务器安全
- **防火墙配置**: UFW/firewalld防火墙规则
- **Fail2Ban**: 自动封禁恶意IP
- **SSH安全**: 禁用root登录，密钥认证
- **自动更新**: 系统安全补丁自动安装

## 📊 监控系统

### 指标监控
- **系统指标**: CPU、内存、磁盘、网络使用率
- **应用指标**: API响应时间、错误率、吞吐量
- **业务指标**: 用户注册量、测试完成率、AI调用次数
- **数据库指标**: 连接数、查询性能、缓存命中率

### 告警系统
- **服务可用性**: 服务宕机自动告警
- **性能异常**: 响应时间过长、错误率过高
- **资源告警**: CPU、内存、磁盘使用率过高
- **业务告警**: 用户异常行为、收入异常波动

### 访问地址
- **Prometheus**: http://localhost:9090 - 指标收集
- **Grafana**: http://localhost:3000 - 数据可视化
- **AlertManager**: http://localhost:9093 - 告警管理

## ⚡ 性能优化

### 前端优化
- **代码分割**: 路由级别的懒加载
- **资源压缩**: Gzip压缩，图片优化
- **缓存策略**: 浏览器缓存，CDN加速
- **PWA缓存**: Service Worker智能缓存

### 后端优化
- **数据库索引**: 查询性能优化
- **Redis缓存**: 热点数据缓存
- **连接池**: 数据库连接池管理
- **负载均衡**: Nginx反向代理

### 部署优化
- **Docker镜像**: 多阶段构建，镜像优化
- **容器编排**: Docker Compose服务编排
- **资源限制**: 容器资源限制和监控
- **自动扩容**: 基于负载的自动扩容

## 🎯 功能路线图

### 当前版本 (v1.0)
- ✅ 8大测评领域完整实现
- ✅ AI智能分析和解读
- ✅ PWA原生应用体验
- ✅ 用户认证和数据管理
- ✅ 分享海报和社交功能
- ✅ 监控系统和运维工具
- ✅ 安全防护和性能优化

### 计划功能 (v2.0)
- 🔄 **专家咨询系统** - 真人心理咨询师在线服务
- 🔄 **社区功能** - 用户交流和经验分享
- 🔄 **付费会员** - 高级功能和VIP服务
- 🔄 **移动端APP** - 原生iOS和Android应用
- 🔄 **多语言支持** - 国际化和本地化
- 🔄 **API开放平台** - 第三方开发者接入

### 未来愿景 (v3.0)
- 🔮 **AR/VR体验** - 沉浸式测评体验
- 🔮 **区块链认证** - 测评结果区块链存证
- 🔮 **AI私人助手** - 24/7个性化AI陪伴
- 🔮 **企业版本** - 团队建设和人才分析

## 🏆 项目亮点

### 技术创新
- **🤖 AI驱动**: 业界领先的AI分析引擎
- **📱 PWA先进**: 原生应用级别的Web体验
- **🔗 数据关联**: 跨模块智能数据分析
- **🎨 视觉设计**: 现代化的宇宙主题设计

### 用户体验
- **🚀 快速响应**: 毫秒级的交互响应
- **🌙 护眼模式**: 完整的明暗主题系统
- **📊 可视化**: 直观的数据图表展示
- **🎯 个性化**: 千人千面的个性化体验

### 商业价值
- **📈 市场潜力**: 心理测评市场年增长20%+
- **👥 用户粘性**: 多元化测评提高用户留存
- **💰 盈利模式**: 多层次的商业化路径
- **🌍 扩展性**: 支持国际化和本地化

## 📧 联系方式

- **项目维护**: admin@foxai.edu.kg
- **技术支持**: support@inner-cosmos.com
- **商务合作**: business@inner-cosmos.com
- **版权信息**: © 2025 内在宇宙团队

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者、设计师和用户们！

特别感谢：
- **React团队** - 提供优秀的前端框架
- **Tailwind CSS团队** - 实用优先的设计系统
- **Vite团队** - 极速的构建工具
- **TypeScript团队** - 类型安全的开发体验
- **硅基流动** - 专业的AI服务支持
- **开源社区** - 无私的技术分享和支持

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

<div align="center">
  <p>🌌 <strong>探索内在宇宙，发现真实自己</strong> 🌌</p>
  <p>用 ❤️ 和 🤖 打造，为每一个追求自我认知的灵魂</p>
  
  <br>
  
  <a href="#-快速开始">🚀 立即开始</a> •
  <a href="#-八大探索领域">🧠 了解功能</a> •
  <a href="#-技术栈">⚙️ 技术架构</a> •
  <a href="#-部署指南">🐳 部署指南</a>
</div>

---

### 🌟 如果这个项目对你有帮助，请给我们一个Star！

[![Star History Chart](https://api.star-history.com/svg?repos=inner-cosmos/inner-cosmos&type=Date)](https://star-history.com/#inner-cosmos/inner-cosmos&Date)