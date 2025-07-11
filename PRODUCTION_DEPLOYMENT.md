# 内在宇宙生产环境部署完整指南

## 🎯 部署概览

本指南将帮助您将内在宇宙项目完整部署到生产环境，包括：
- ✅ 服务器环境配置
- ✅ 应用容器化部署
- ✅ 域名与SSL证书配置
- ✅ 监控与运维系统
- ✅ 安全防护配置

## 📋 部署前准备

### 1. 服务器要求
- **CPU**: 2核心以上
- **内存**: 4GB以上
- **存储**: 20GB以上SSD
- **操作系统**: Ubuntu 20.04 LTS
- **网络**: 公网IP，开放端口：22, 80, 443

### 2. 域名准备
- 注册域名（推荐：inner-cosmos.com）
- 配置DNS A记录指向服务器IP
- 等待DNS生效（5-30分钟）

### 3. 第三方服务
- **MongoDB Atlas**: 云数据库服务
- **OpenAI API**: AI功能支持
- **邮件服务**: SMTP配置（可选）

## 🚀 一键部署流程

### Step 1: 服务器初始化

```bash
# 1. 连接服务器
ssh root@your-server-ip

# 2. 克隆项目
git clone https://github.com/your-username/inner-cosmos.git
cd inner-cosmos

# 3. 运行安全配置脚本
sudo ./scripts/security-setup.sh

# 4. 重启服务器应用配置
sudo reboot
```

### Step 2: 环境配置

```bash
# 1. 重新连接服务器
ssh your-user@your-server-ip

# 2. 配置环境变量
cp .env.production .env
nano .env

# 3. 配置关键变量
# MONGODB_URI=mongodb+srv://...
# JWT_SECRET=your-32-char-secret
# OPENAI_API_KEY=sk-...
# REDIS_PASSWORD=your-redis-password
```

### Step 3: SSL证书配置

```bash
# 配置SSL证书
sudo ./scripts/ssl-setup.sh -d your-domain.com -e your-email@domain.com
```

### Step 4: 应用部署

```bash
# 一键部署应用
./deploy.sh deploy
```

### Step 5: 监控系统部署

```bash
# 部署监控系统
./scripts/monitoring-setup.sh deploy
```

### Step 6: 验证部署

```bash
# 健康检查
./deploy.sh health

# 监控系统检查
./scripts/monitoring-setup.sh health
```

## 🔧 详细配置说明

### 环境变量配置

```bash
# 数据库配置
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inner-cosmos

# JWT安全配置
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-characters

# OpenAI API
OPENAI_API_KEY=sk-your-openai-api-key

# Redis配置
REDIS_PASSWORD=your-strong-redis-password

# 邮件配置（可选）
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 域名配置

1. **DNS记录配置**：
   ```
   A记录: @ -> 服务器IP
   A记录: www -> 服务器IP
   ```

2. **SSL证书自动续期**：
   ```bash
   # 检查续期配置
   sudo certbot renew --dry-run
   ```

### 防火墙配置

```bash
# 查看防火墙状态
sudo ufw status

# 开放必要端口
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
```

## 📊 监控系统访问

部署完成后，您可以访问以下监控面板：

- **Grafana仪表板**: http://your-domain.com:3000
  - 用户名: admin
  - 密码: 在.env中配置的GRAFANA_PASSWORD

- **Prometheus**: http://your-domain.com:9090
- **AlertManager**: http://your-domain.com:9093

## 🔍 故障排除

### 常见问题

1. **容器启动失败**
   ```bash
   # 查看容器日志
   docker-compose logs backend
   
   # 检查环境变量
   cat .env
   ```

2. **SSL证书问题**
   ```bash
   # 重新获取证书
   sudo ./scripts/ssl-setup.sh -d your-domain.com -e your-email@domain.com
   ```

3. **数据库连接失败**
   ```bash
   # 测试数据库连接
   docker-compose exec backend npm run test:db
   ```

4. **监控服务异常**
   ```bash
   # 重启监控服务
   ./scripts/monitoring-setup.sh restart
   ```

### 日志查看

```bash
# 应用日志
./deploy.sh logs

# 监控日志
./scripts/monitoring-setup.sh logs

# 系统日志
sudo journalctl -u docker -f
```

## 🔄 日常维护

### 应用更新

```bash
# 拉取最新代码
git pull origin main

# 重新部署
./deploy.sh deploy
```

### 数据备份

```bash
# 创建备份
./deploy.sh backup

# 查看备份
ls backups/
```

### 监控告警

监控系统会在以下情况发送告警：
- 服务不可用
- CPU/内存使用率过高
- 磁盘空间不足
- API错误率过高
- SSL证书即将过期

## 📈 性能优化

### 服务器优化

```bash
# 增加文件描述符限制
echo "* soft nofile 65536" | sudo tee -a /etc/security/limits.conf
echo "* hard nofile 65536" | sudo tee -a /etc/security/limits.conf

# 优化内核参数
echo "net.core.somaxconn = 65535" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### 应用优化

- 使用CDN加速静态资源
- 配置Redis缓存
- 优化数据库查询
- 启用Gzip压缩

## 🛡️ 安全检查清单

- [ ] SSH密钥认证已配置
- [ ] 防火墙规则已设置
- [ ] SSL证书已安装
- [ ] 自动安全更新已启用
- [ ] Fail2Ban已配置
- [ ] 强密码策略已实施
- [ ] 定期备份已设置

## 📞 技术支持

如遇到部署问题：

1. 查看部署日志
2. 检查系统资源
3. 验证配置文件
4. 联系技术支持团队

---

**🎉 恭喜！您已成功部署内在宇宙到生产环境！**

现在您可以：
- 访问 https://your-domain.com 查看应用
- 访问监控面板查看系统状态
- 开始用户测试和反馈收集
