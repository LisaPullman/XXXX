# 创建 Cloudflare API Token 详细指南

## 🔑 什么是 API Token？

API Token 是用于授权访问 Cloudflare 服务的安全凭证。与您提供的 Account ID (`a87e5461cffaf741f46b7a6451142a2cad11a`) 不同，API Token 是一个长字符串，用于身份验证。

## 📋 创建步骤

### 1. 登录 Cloudflare Dashboard
- 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
- 使用您的账户 `lorin7322@gmail.com` 登录

### 2. 进入 API Tokens 页面
- 点击右上角的用户头像
- 选择 "My Profile"
- 点击 "API Tokens" 标签
- 或直接访问：[https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)

### 3. 创建新的 API Token
- 点击 "Create Token" 按钮
- 在模板列表中找到 "Cloudflare Pages:Edit"
- 点击该模板旁边的 "Use template" 按钮

### 4. 配置 Token 权限
系统会自动填充以下权限，请确认：

**Account permissions:**
- `Cloudflare Pages:Edit`

**Zone permissions:**
- `Zone:Read` (如果您计划使用自定义域名)

**Account resources:**
- `Include - All accounts` 或选择特定账户

### 5. 设置 Token 限制（可选但推荐）
- **Client IP Address Filtering**: 可以留空或添加您的服务器IP
- **TTL (Time to Live)**: 建议设置过期时间，如1年

### 6. 生成 Token
- 点击 "Continue to summary"
- 检查权限摘要
- 点击 "Create Token"

### 7. 复制 Token
⚠️ **重要**: Token 只会显示一次，请立即复制并安全保存！

Token 格式类似于：
```
1234567890abcdef1234567890abcdef12345678
```

## 🔧 在 GitHub 中设置 Secrets

复制 Token 后，在 GitHub 仓库中设置：

1. 访问 [GitHub 仓库设置](https://github.com/LisaPullman/XXXX/settings/secrets/actions)
2. 点击 "New repository secret"
3. 添加两个 Secrets：

**Secret 1:**
- Name: `CLOUDFLARE_ACCOUNT_ID`
- Value: `a87e5461cffaf741f46b7a6451142a2cad11a`

**Secret 2:**
- Name: `CLOUDFLARE_API_TOKEN`
- Value: `[您刚刚复制的 API Token]`

## ✅ 验证 Token 有效性

您可以使用以下命令验证 Token 是否有效：

```bash
curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
     -H "Authorization: Bearer YOUR_API_TOKEN" \
     -H "Content-Type: application/json"
```

成功的响应应该包含：
```json
{
  "success": true,
  "result": {
    "id": "token_id",
    "status": "active"
  }
}
```

## 🚀 测试部署

设置完 Secrets 后，推送代码测试自动部署：

```bash
# 创建一个空提交来触发部署
git commit --allow-empty -m "test: 触发 Cloudflare Pages 部署"
git push origin main
```

## 🔍 常见问题

### Q: Token 创建失败？
A: 确保您的 Cloudflare 账户有足够的权限，并且已经验证了邮箱。

### Q: 找不到 "Cloudflare Pages:Edit" 模板？
A: 这可能是因为您的账户还没有 Cloudflare Pages 权限。请先在 Cloudflare Dashboard 中访问 Pages 部分。

### Q: Token 权限不足？
A: 确保 Token 包含 `Cloudflare Pages:Edit` 权限，如果使用自定义域名，还需要 `Zone:Read` 权限。

## 📞 需要帮助？

如果在创建过程中遇到问题，请：
1. 检查 Cloudflare 账户状态
2. 确认邮箱已验证
3. 查看 Cloudflare 文档：[API Token 文档](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)

---

⚠️ **安全提醒**：
- 请妥善保管您的 API Token
- 不要在代码中明文存储 Token
- 定期轮换 Token 以提高安全性
- 如果 Token 泄露，立即在 Cloudflare 控制台中撤销 