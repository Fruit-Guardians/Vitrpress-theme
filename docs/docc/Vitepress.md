---
title: VitePress 快速上手与进阶
---

# 🚀 VitePress 快速上手与进阶

本章节将详细介绍如何使用 Fruit-Guardians 现代化 VitePress 模板快速搭建文档站点，包括环境准备、配置说明、部署方法以及常见问题解决方案。

---

## 📋 环境准备

### 前置要求
- **Node.js**：版本 18.0.0 或更高
- **包管理器**：npm、yarn 或 pnpm
- **Git**：用于版本控制

### 检查环境
```bash
node --version  # 应 >= 18.0.0
npm --version   # 应 >= 8.0.0
```

---

## 🛠️ 快速开始

### 1. 克隆模板
```bash
git clone https://github.com/Fruit-Guardians/Vitrpress-theme.git
cd Vitrpress-theme
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 访问站点
打开浏览器访问 `http://localhost:5173`

---

## ⚙️ 配置说明

### 基础配置
编辑 `.vitepress/config.ts`：

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '你的项目名称',
  description: '项目描述',
  themeConfig: {
    // 导航栏配置
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/docc/' }
    ],
    
    // 侧边栏配置
    sidebar: {
      '/docc/': [
        { text: '快速开始', link: '/docc/index.md' },
        { text: '功能详解', link: '/docc/features.md' }
      ]
    },
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username' }
    ]
  }
})
```

### 主题定制
编辑 `.vitepress/styles/index.css`：

```css
:root {
  --vp-c-brand: #6366f1;
  --vp-c-brand-light: #818cf8;
  --vp-c-brand-lighter: #a5b4fc;
  --vp-c-brand-dark: #4f46e5;
  --vp-c-brand-darker: #3730a3;
}
```

---

## 🚀 部署指南

### GitHub Pages
1. 推送代码到 GitHub
2. 在仓库设置中启用 GitHub Pages
3. 选择 `gh-pages` 分支或 `docs` 目录

### Vercel
1. 连接 GitHub 仓库到 Vercel
2. 构建命令：`npm run build`
3. 输出目录：`docs/.vitepress/dist`

### Netlify
1. 连接 GitHub 仓库到 Netlify
2. 构建命令：`npm run build`
3. 发布目录：`docs/.vitepress/dist`

### 阿里云 OSS
```bash
npm run build
# 将 docs/.vitepress/dist 目录上传到 OSS
```

---

## 🎨 自定义主题

### 添加自定义组件
1. 在 `.vitepress/components/` 下创建 Vue 组件
2. 组件会自动全局注册
3. 在 Markdown 中直接使用

### 自定义布局
1. 在 `.vitepress/layout/` 下创建布局组件
2. 在 `theme/index.ts` 中引入
3. 配置为默认布局

### 样式定制
- 使用 Tailwind CSS 类名
- 自定义 CSS 变量
- 支持暗色模式

---

## 🔧 常见问题

### Q: 如何添加新页面？
A: 在 `docs/` 下新建 `.md` 文件，在 `config.ts` 中配置导航和侧边栏。

### Q: 如何自定义首页？
A: 编辑 `docs/index.md`，使用 VitePress 的首页布局语法。

### Q: 如何添加搜索功能？
A: 在 `config.ts` 中配置 `search` 选项，支持本地搜索。

### Q: 如何优化 SEO？
A: 在 `config.ts` 的 `head` 中添加 meta 标签，VitePress 会自动生成基础 SEO 信息。

### Q: 如何添加图片？
A: 将图片放在 `docs/public/` 目录下，在 Markdown 中使用 `/图片名.png` 引用。

---

## 📚 进阶技巧

### 1. 使用 Vue 组件
```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">点击次数: {{ count }}</button>
</template>
```

### 2. 自定义样式
```vue
<style scoped>
.custom-style {
  color: var(--vp-c-brand);
}
</style>
```

### 3. 使用 Markdown 扩展
- 支持 GitHub 风格警告框
- 支持代码高亮
- 支持数学公式（需配置插件）

---

## 🎯 最佳实践

1. **文档结构**：按功能或章节组织文档
2. **组件复用**：将常用 UI 封装为组件
3. **主题统一**：使用 CSS 变量管理主题
4. **性能优化**：合理使用图片懒加载
5. **SEO 友好**：为每个页面添加合适的标题和描述

---

> Fruit-Guardians，助你轻松拥有高颜值、高性能的文档站点！
