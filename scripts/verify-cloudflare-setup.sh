#!/bin/bash

# Cloudflare 配置验证脚本
# 使用方法: ./scripts/verify-cloudflare-setup.sh [API_TOKEN]

set -e

echo "🔍 验证 Cloudflare Pages 配置..."

# 检查参数
if [ -z "$1" ]; then
    echo "使用方法: $0 <API_TOKEN>"
    echo "示例: $0 your_api_token_here"
    exit 1
fi

API_TOKEN="$1"
ACCOUNT_ID="a87e5461cffaf741f46b7a6451142a2cad11a"

echo "📋 配置信息:"
echo "  Account ID: $ACCOUNT_ID"
echo "  API Token: ${API_TOKEN:0:10}...${API_TOKEN: -10}"
echo ""

# 验证 API Token
echo "🔐 验证 API Token..."
response=$(curl -s -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json")

if echo "$response" | grep -q '"success":true'; then
    echo "✅ API Token 验证成功!"
    
    # 提取 Token ID
    token_id=$(echo "$response" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    echo "  Token ID: $token_id"
else
    echo "❌ API Token 验证失败!"
    echo "响应: $response"
    exit 1
fi

# 验证账户访问权限
echo ""
echo "🏢 验证账户访问权限..."
account_response=$(curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID" \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json")

if echo "$account_response" | grep -q '"success":true'; then
    echo "✅ 账户访问权限验证成功!"
    
    # 提取账户名称
    account_name=$(echo "$account_response" | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
    echo "  账户名称: $account_name"
else
    echo "❌ 账户访问权限验证失败!"
    echo "响应: $account_response"
    exit 1
fi

# 检查 Cloudflare Pages 权限
echo ""
echo "📄 检查 Cloudflare Pages 权限..."
pages_response=$(curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects" \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json")

if echo "$pages_response" | grep -q '"success":true'; then
    echo "✅ Cloudflare Pages 权限验证成功!"
    
    # 检查是否已有项目
    project_count=$(echo "$pages_response" | grep -o '"result":\[.*\]' | grep -o '"name":"[^"]*"' | wc -l)
    echo "  现有项目数量: $project_count"
    
    if [ "$project_count" -gt 0 ]; then
        echo "  现有项目:"
        echo "$pages_response" | grep -o '"name":"[^"]*"' | cut -d'"' -f4 | sed 's/^/    - /'
    fi
else
    echo "❌ Cloudflare Pages 权限验证失败!"
    echo "响应: $pages_response"
    exit 1
fi

echo ""
echo "🎉 所有验证通过!"
echo ""
echo "📝 下一步操作:"
echo "1. 在 GitHub 仓库中设置以下 Secrets:"
echo "   - CLOUDFLARE_ACCOUNT_ID: $ACCOUNT_ID"
echo "   - CLOUDFLARE_API_TOKEN: $API_TOKEN"
echo ""
echo "2. 推送代码触发自动部署:"
echo "   git commit --allow-empty -m 'test: 触发 Cloudflare Pages 部署'"
echo "   git push origin main"
echo ""
echo "3. 查看部署状态:"
echo "   - GitHub Actions: https://github.com/LisaPullman/XXXX/actions"
echo "   - Cloudflare Pages: https://dash.cloudflare.com/pages"
echo ""
echo "🔗 直接设置 GitHub Secrets:"
echo "   https://github.com/LisaPullman/XXXX/settings/secrets/actions" 