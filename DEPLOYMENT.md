# 内在宇宙项目部署指南

## 📋 部署概览

本文档详细说明如何将内在宇宙项目部署到生产环境。项目采用Docker容器化部署，支持自动化部署和监控。

## 🛠 系统要求

### 服务器配置
- **CPU**: 2核心以上
- **内存**: 4GB以上
- **存储**: 20GB以上SSD
- **操作系统**: Ubuntu 20.04 LTS 或 CentOS 8
- **网络**: 公网IP，开放80、443、22端口

### 软件依赖
- Docker 20.10+
- Docker Compose 2.0+
- Git
- Nginx (可选，已包含在容器中)

## 🚀 快速部署

### 1. 服务器准备

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 安装Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 启动Docker服务
sudo systemctl start docker
sudo systemctl enable docker

# 将当前用户添加到docker组
sudo usermod -aG docker $USER
```

### 2. 克隆项目

```bash
# 克隆项目代码
git clone https://github.com/your-username/inner-cosmos.git
cd inner-cosmos

# 切换到生产分支（如果有）
git checkout main
```

### 3. 配置环境变量

```bash
# 复制环境变量模板
cp .env.production .env

# 编辑环境变量文件
nano .env
```

**重要配置项**：
- `MONGODB_URI`: MongoDB连接字符串（推荐使用MongoDB Atlas）
- `JWT_SECRET`: JWT密钥（至少32位随机字符串）
- `OPENAI_API_KEY`: OpenAI API密钥
- `REDIS_PASSWORD`: Redis密码

### 4. 部署应用

```bash
# 一键部署
./deploy.sh deploy

# 或者分步部署
./deploy.sh build    # 构建镜像
./deploy.sh deploy   # 部署应用
```

### 5. 验证部署

```bash
# 检查服务状态
./deploy.sh health

# 查看日志
./deploy.sh logs

# 检查容器状态
docker-compose ps
```

## 🔧 详细配置

### MongoDB Atlas配置

1. 注册MongoDB Atlas账号
2. 创建免费集群
3. 配置网络访问（添加服务器IP）
4. 创建数据库用户
5. 获取连接字符串

### SSL证书配置

```bash
# 使用Let's Encrypt免费证书
sudo apt install certbot

# 获取证书
sudo certbot certonly --standalone -d your-domain.com

# 复制证书到项目目录
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ./ssl/cert.pem
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ./ssl/key.pem
sudo chown $USER:$USER ./ssl/*
```

### 域名配置

1. 购买域名
2. 配置DNS A记录指向服务器IP
3. 等待DNS生效（通常5-30分钟）

## 📊 监控与维护

### 查看应用状态

```bash
# 查看容器状态
docker-compose ps

# 查看资源使用情况
docker stats

# 查看应用日志
./deploy.sh logs
```

### 备份数据

```bash
# 创建备份
./deploy.sh backup

# 备份文件位置
ls backups/
```

### 更新应用

```bash
# 拉取最新代码
git pull origin main

# 重新部署
./deploy.sh deploy
```

### 故障排除

```bash
# 重启服务
./deploy.sh restart

# 停止服务
./deploy.sh stop

# 清理Docker资源
./deploy.sh cleanup

# 查看详细日志
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 🔒 安全配置

### 防火墙设置

```bash
# 安装ufw
sudo apt install ufw

# 配置防火墙规则
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 定期更新

```bash
# 创建更新脚本
cat > update.sh << 'EOF'
#!/bin/bash
cd /path/to/inner-cosmos
git pull origin main
./deploy.sh deploy
EOF

# 设置定时任务（每周日凌晨2点更新）
crontab -e
# 添加: 0 2 * * 0 /path/to/update.sh
```

## 📈 性能优化

### 服务器优化

```bash
# 增加文件描述符限制
echo "* soft nofile 65536" >> /etc/security/limits.conf
echo "* hard nofile 65536" >> /etc/security/limits.conf

# 优化内核参数
echo "net.core.somaxconn = 65535" >> /etc/sysctl.conf
echo "net.ipv4.tcp_max_syn_backlog = 65535" >> /etc/sysctl.conf
sysctl -p
```

### 数据库优化

- 使用MongoDB Atlas的性能监控
- 配置适当的索引
- 定期清理过期数据

## 🆘 常见问题

### Q: 容器启动失败
A: 检查环境变量配置，查看容器日志

### Q: 无法访问应用
A: 检查防火墙设置，确认域名DNS解析

### Q: 数据库连接失败
A: 检查MongoDB连接字符串，确认网络访问权限

### Q: SSL证书问题
A: 检查证书文件路径，确认证书有效期

## 📞 技术支持

如遇到部署问题，请：

1. 查看应用日志：`./deploy.sh logs`
2. 检查系统资源：`htop`, `df -h`
3. 查看Docker状态：`docker-compose ps`
4. 联系技术支持团队

---

**注意**: 生产环境部署前请务必测试所有功能，确保数据安全。
