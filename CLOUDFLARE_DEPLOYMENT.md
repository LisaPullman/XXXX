# Cloudflare Pages 部署指南

## 🚀 快速部署

### 方法一：GitHub Actions 自动部署（推荐）

1. **设置 GitHub Secrets**
   
   在 GitHub 仓库设置中添加以下 Secrets：
   ```
   CLOUDFLARE_API_TOKEN=your_api_token_here
   CLOUDFLARE_ACCOUNT_ID=your_account_id_here
   ```

2. **获取 Cloudflare API Token**
   
   - 访问 [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - 点击 "Create Token"
   - 选择 "Cloudflare Pages:Edit" 模板
   - 配置权限：
     - Zone: Zone:Read, Zone:Edit
     - Account: Cloudflare Pages:Edit
   - 复制生成的 Token

3. **获取 Account ID**
   
   - 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 在右侧边栏找到 "Account ID"
   - 复制 Account ID

4. **推送代码触发部署**
   
   ```bash
   git add .
   git commit -m "feat: 配置 Cloudflare Pages 部署"
   git push origin main
   ```

### 方法二：手动部署

1. **安装 Wrangler CLI**
   
   ```bash
   npm install -g wrangler
   ```

2. **登录 Cloudflare**
   
   ```bash
   wrangler login
   ```

3. **运行部署脚本**
   
   ```bash
   ./scripts/deploy-cloudflare.sh
   ```

### 方法三：Cloudflare Pages 控制台部署

1. **连接 GitHub 仓库**
   
   - 访问 [Cloudflare Pages](https://dash.cloudflare.com/pages)
   - 点击 "Create a project"
   - 选择 "Connect to Git"
   - 选择您的 GitHub 仓库

2. **配置构建设置**
   
   ```
   Framework preset: None
   Build command: pnpm build
   Build output directory: dist
   Root directory: /
   ```

3. **环境变量设置**
   
   ```
   NODE_VERSION=18
   NPM_FLAGS=--prefer-offline --no-audit
   ```

## 📋 部署配置文件

### wrangler.toml
```toml
name = "inner-cosmos"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[env.production]
account_id = "YOUR_ACCOUNT_ID"
zone_id = "YOUR_ZONE_ID"

[env.production.vars]
NODE_ENV = "production"

pages_build_output_dir = "dist"
```

### pages.config.json
```json
{
  "build": {
    "command": "pnpm build",
    "destination": "dist",
    "root_dir": "."
  },
  "functions": {
    "directory": "functions",
    "node_compat": true
  }
}
```

## 🔧 高级配置

### 自定义域名

1. **添加域名**
   
   - 在 Cloudflare Pages 项目设置中
   - 点击 "Custom domains"
   - 添加您的域名

2. **配置 DNS**
   
   - 添加 CNAME 记录指向 `your-project.pages.dev`
   - 或使用 Cloudflare 的 DNS 服务

### 环境变量

在 Cloudflare Pages 项目设置中配置：

- `NODE_ENV=production`
- `VITE_API_URL=https://your-api-domain.com`
- 其他必要的环境变量

### 重定向规则

项目已配置 SPA 重定向规则：
```
/*    /index.html   200
```

## 🔍 故障排除

### 常见问题

1. **构建失败**
   
   - 检查 Node.js 版本是否为 18
   - 确认 pnpm 版本兼容性
   - 查看构建日志中的错误信息

2. **部署后页面空白**
   
   - 检查浏览器控制台错误
   - 确认资源路径正确
   - 验证 `_redirects` 文件配置

3. **API 请求失败**
   
   - 检查 CORS 配置
   - 确认 API 端点可访问
   - 验证环境变量设置

### 调试命令

```bash
# 本地预览构建结果
pnpm preview

# 检查构建产物
ls -la dist/

# 验证重定向规则
curl -I https://your-site.pages.dev/some-route
```

## 📊 性能优化

### 构建优化

- 代码分割：已配置 vendor chunks
- 资源压缩：使用 esbuild minify
- 缓存策略：静态资源长期缓存

### CDN 优化

- 自动全球 CDN 分发
- 边缘缓存优化
- 智能路由选择

## 🔗 相关链接

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)
- [GitHub Actions 集成](https://github.com/cloudflare/pages-action)

## 📞 支持

如果遇到部署问题，请：

1. 检查 [Cloudflare 状态页面](https://www.cloudflarestatus.com/)
2. 查看项目的 GitHub Actions 日志
3. 联系项目维护者

---

🎉 祝您部署成功！ 