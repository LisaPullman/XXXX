#!/bin/bash

# Cloudflare Pages 部署脚本
# 使用方法: ./scripts/deploy-cloudflare.sh

set -e

echo "🚀 开始部署到 Cloudflare Pages..."

# 检查是否安装了必要的依赖
if ! command -v pnpm &> /dev/null; then
    echo "❌ 错误: 请先安装 pnpm"
    exit 1
fi

# 检查是否安装了 wrangler
if ! command -v wrangler &> /dev/null; then
    echo "📦 安装 Wrangler CLI..."
    npm install -g wrangler
fi

# 清理之前的构建
echo "🧹 清理之前的构建..."
rm -rf dist

# 安装依赖
echo "📦 安装依赖..."
pnpm install --frozen-lockfile

# 类型检查
echo "🔍 类型检查..."
pnpm type-check

# 代码检查
echo "🔍 代码检查..."
pnpm lint

# 构建项目
echo "🏗️  构建项目..."
pnpm build

# 检查构建结果
if [ ! -d "dist" ]; then
    echo "❌ 构建失败: dist 目录不存在"
    exit 1
fi

echo "✅ 构建完成!"
echo "📊 构建统计:"
echo "  - 文件数量: $(find dist -type f | wc -l)"
echo "  - 总大小: $(du -sh dist | cut -f1)"

# 部署到 Cloudflare Pages
echo "🚀 部署到 Cloudflare Pages..."

# 如果有 wrangler.toml 配置，使用 wrangler 部署
if [ -f "wrangler.toml" ]; then
    echo "使用 wrangler 部署..."
    wrangler pages deploy dist --project-name inner-cosmos
else
    echo "⚠️  未找到 wrangler.toml 配置文件"
    echo "请手动上传 dist 目录到 Cloudflare Pages"
    echo "或者配置 wrangler.toml 文件"
fi

echo "🎉 部署完成!"
echo ""
echo "📝 后续步骤:"
echo "1. 访问 Cloudflare Pages 控制台确认部署状态"
echo "2. 如果是首次部署，请配置自定义域名"
echo "3. 检查部署的网站是否正常工作"
echo ""
echo "🔗 有用的链接:"
echo "- Cloudflare Pages 控制台: https://dash.cloudflare.com/pages"
echo "- 部署文档: https://developers.cloudflare.com/pages/" 