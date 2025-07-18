#!/bin/bash

# 依赖更新脚本
# 确保所有依赖版本与技术栈规范一致

set -e

echo "🚀 内在宇宙项目 - 依赖更新脚本"
echo "=================================="

# 检查是否安装了pnpm
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm 未安装，正在安装..."
    npm install -g pnpm@latest
fi

# 检查Node.js版本
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_NODE_VERSION="18.20.0"

if [ "$(printf '%s\n' "$REQUIRED_NODE_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_NODE_VERSION" ]; then
    echo "⚠️  Node.js 版本过低: $NODE_VERSION (需要: >= $REQUIRED_NODE_VERSION)"
    echo "请升级 Node.js 到 18.20.x LTS 版本"
    exit 1
fi

echo "✅ Node.js 版本检查通过: $NODE_VERSION"

# 更新前端依赖
echo ""
echo "📦 更新前端依赖..."
echo "==================="

cd "$(dirname "$0")/.."

# 清理缓存
echo "🧹 清理缓存..."
rm -rf node_modules package-lock.json pnpm-lock.yaml

# 安装依赖
echo "📥 安装前端依赖..."
pnpm install

# 更新后端依赖
echo ""
echo "📦 更新后端依赖..."
echo "==================="

cd server

# 清理缓存
echo "🧹 清理后端缓存..."
rm -rf node_modules package-lock.json pnpm-lock.yaml

# 安装依赖
echo "📥 安装后端依赖..."
pnpm install

# 返回根目录
cd ..

# 运行依赖检查
echo ""
echo "🔍 运行依赖版本检查..."
echo "======================"
node scripts/check-dependencies.js

# 运行类型检查
echo ""
echo "🔍 运行TypeScript类型检查..."
echo "=========================="

echo "检查前端类型..."
pnpm run type-check

echo "检查后端类型..."
cd server
pnpm run build
cd ..

# 运行代码检查
echo ""
echo "🔍 运行代码质量检查..."
echo "===================="

echo "检查前端代码..."
pnpm run lint

echo "检查后端代码..."
cd server
pnpm run lint
cd ..

echo ""
echo "🎉 依赖更新完成！"
echo "================"
echo ""
echo "📋 下一步操作:"
echo "1. 运行 'pnpm run dev' 启动前端开发服务器"
echo "2. 运行 'cd server && pnpm run dev' 启动后端开发服务器"
echo "3. 检查应用是否正常运行"
echo ""
echo "🔧 如果遇到问题:"
echo "1. 检查 Node.js 版本是否为 18.20.x LTS"
echo "2. 确保 pnpm 版本为 9.x"
echo "3. 清理 node_modules 重新安装"
echo "4. 查看错误日志并修复类型错误"
