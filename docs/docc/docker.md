---
title: 部署与上线指南
---

# 🚀 部署与上线指南

本章节将详细介绍如何将 Fruit-Guardians 现代化 VitePress 模板部署到各种平台，包括 Docker 部署、静态托管、CDN 加速等方案。

---

## 📦 Docker 部署

### 1. 创建 Dockerfile

在项目根目录创建 `Dockerfile`：

```dockerfile
# 使用官方 Node.js 镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 使用 nginx 镜像作为基础镜像
FROM nginx:alpine

# 复制构建产物到 nginx 目录
COPY --from=0 /app/docs/.vitepress/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
```

### 2. 创建 nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # 处理 SPA 路由
        location / {
            try_files $uri $uri/ /index.html;
        }

        # 静态资源缓存
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### 3. 构建和运行

```bash
# 构建镜像
docker build -t fruit-guardians-docs .

# 运行容器
docker run -d -p 80:80 --name docs-site fruit-guardians-docs
```

---

## 🌐 静态托管部署

### GitHub Pages

1. **推送代码到 GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **启用 GitHub Pages**
   - 进入仓库设置
   - 找到 "Pages" 选项
   - 选择 "Deploy from a branch"
   - 选择 `main` 分支和 `/docs` 目录

3. **配置构建脚本**
在 `package.json` 中添加：
```json
{
  "scripts": {
    "deploy": "npm run build && touch docs/.vitepress/dist/.nojekyll"
  }
}
```

### Vercel

1. **连接 GitHub 仓库**
2. **配置构建设置**：
   - Build Command: `npm run build`
   - Output Directory: `docs/.vitepress/dist`
   - Install Command: `npm install`

### Netlify

1. **连接 GitHub 仓库**
2. **配置构建设置**：
   - Build command: `npm run build`
   - Publish directory: `docs/.vitepress/dist`

### 阿里云 OSS

1. **构建项目**
```bash
npm run build
```

2. **上传到 OSS**
```bash
# 使用 ossutil 工具
ossutil cp -r docs/.vitepress/dist oss://your-bucket-name/
```

---

## 🔧 环境变量配置

### 创建 .env 文件

```env
# 站点配置
VITE_SITE_TITLE=Fruit-Guardians Docs
VITE_SITE_DESCRIPTION=现代化VitePress文档模板
VITE_SITE_URL=https://your-domain.com

# 构建配置
VITE_BUILD_BASE=/
VITE_BUILD_OUT_DIR=docs/.vitepress/dist
```

### 在 config.ts 中使用

```typescript
export default defineConfig({
  title: process.env.VITE_SITE_TITLE || 'Fruit-Guardians',
  description: process.env.VITE_SITE_DESCRIPTION || '现代化VitePress文档模板',
  base: process.env.VITE_BUILD_BASE || '/',
  // ... 其他配置
})
```

---

## 📈 性能优化

### 1. 图片优化
- 使用 WebP 格式
- 启用图片懒加载
- 配置合适的缓存策略

### 2. 代码分割
- VitePress 自动进行代码分割
- 按需加载组件和页面

### 3. CDN 加速
- 配置 CDN 域名
- 启用 Gzip 压缩
- 设置缓存策略

---

## 🔍 监控与分析

### 1. 添加 Google Analytics

在 `config.ts` 的 `head` 中添加：

```typescript
head: [
  [
    'script',
    {
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'
    }
  ],
  [
    'script',
    {},
    "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'GA_MEASUREMENT_ID');"
  ]
]
```

### 2. 添加百度统计

```typescript
head: [
  [
    'script',
    {},
    "var _hmt = _hmt || []; (function() { var hm = document.createElement('script'); hm.src = 'https://hm.baidu.com/hm.js?YOUR_SITE_ID'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(hm, s); })();"
  ]
]
```

---

## 🛡️ 安全配置

### 1. HTTPS 配置
- 启用 HTTPS 强制跳转
- 配置 HSTS 头
- 使用安全的 CSP 策略

### 2. 安全头配置

在 nginx 配置中添加：

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

---

## 🔄 自动化部署

### GitHub Actions

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/.vitepress/dist
```

---

## 🎯 最佳实践

1. **环境分离**：开发、测试、生产环境使用不同配置
2. **缓存策略**：合理配置静态资源缓存
3. **监控告警**：设置站点可用性监控
4. **备份策略**：定期备份构建产物和配置
5. **回滚机制**：保留历史版本，支持快速回滚

---

> Fruit-Guardians，助你轻松拥有高颜值、高性能的文档站点！
