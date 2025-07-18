# GitHub Secrets 设置指南

## 🔑 需要设置的 Secrets

在您的 GitHub 仓库中设置以下 Secrets 以启用 Cloudflare Pages 自动部署：

### 1. CLOUDFLARE_ACCOUNT_ID
```
a87e5461cffaf741f46b7a6451142a2cad11a
```

### 2. CLOUDFLARE_API_TOKEN
您需要创建一个 Cloudflare API Token，步骤如下：

1. 访问 [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. 点击 "Create Token"
3. 选择 "Cloudflare Pages:Edit" 模板
4. 配置权限：
   - **Account**: `Cloudflare Pages:Edit`
   - **Zone**: `Zone:Read` (如果使用自定义域名)
5. 点击 "Continue to summary"
6. 点击 "Create Token"
7. 复制生成的 Token

## 📝 如何在 GitHub 中设置 Secrets

1. 打开您的 GitHub 仓库页面
2. 点击 "Settings" 标签
3. 在左侧菜单中选择 "Secrets and variables" > "Actions"
4. 点击 "New repository secret"
5. 添加以下两个 Secrets：

### Secret 1: CLOUDFLARE_ACCOUNT_ID
- **Name**: `CLOUDFLARE_ACCOUNT_ID`
- **Value**: `a87e5461cffaf741f46b7a6451142a2cad11a`

### Secret 2: CLOUDFLARE_API_TOKEN
- **Name**: `CLOUDFLARE_API_TOKEN`
- **Value**: `[您从 Cloudflare 复制的 API Token]`

## ✅ 验证设置

设置完成后，推送任何代码到 main 分支都会自动触发部署：

```bash
git add .
git commit -m "test: 触发 Cloudflare Pages 部署"
git push origin main
```

## 🔍 查看部署状态

1. 在 GitHub 仓库中点击 "Actions" 标签
2. 查看 "Deploy to Cloudflare Pages" 工作流状态
3. 点击具体的工作流运行查看详细日志

## 🌐 访问部署的网站

部署成功后，您可以通过以下方式访问：
- Cloudflare Pages 默认域名：`https://inner-cosmos.pages.dev`
- 或在 [Cloudflare Pages 控制台](https://dash.cloudflare.com/pages) 查看具体URL

## 📞 故障排除

如果部署失败，请检查：
1. API Token 权限是否正确
2. Account ID 是否正确
3. GitHub Actions 日志中的错误信息
4. Cloudflare Pages 控制台中的部署状态

---

⚠️ **重要提醒**：
- 请妥善保管您的 API Token，不要在代码中明文存储
- 如果 Token 泄露，请立即在 Cloudflare 控制台中撤销并重新创建 