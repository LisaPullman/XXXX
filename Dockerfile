# 多阶段构建 - 前端构建阶段
FROM node:18-alpine AS frontend-builder

# 设置工作目录
WORKDIR /app

# 复制前端依赖文件
COPY package*.json ./

# 安装依赖 (包括开发依赖，因为构建需要)
RUN npm ci

# 复制前端源代码
COPY . .

# 构建前端应用
RUN npm run build

# 后端运行阶段
FROM node:18-alpine AS backend

# 安装必要的系统依赖 (包括curl用于健康检查)
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    curl \
    && rm -rf /var/cache/apk/*

# 创建应用用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# 设置工作目录
WORKDIR /app

# 复制后端依赖文件
COPY server/package*.json ./server/
WORKDIR /app/server

# 安装后端依赖
RUN npm ci --only=production

# 复制后端源代码
COPY server/ .

# 构建后端应用
RUN npm run build

# 创建必要的目录
RUN mkdir -p /app/logs /app/uploads && chown -R nodejs:nodejs /app

# 切换到应用用户
USER nodejs

# 暴露端口
EXPOSE 3001

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1

# 启动应用
CMD ["npm", "start"]
