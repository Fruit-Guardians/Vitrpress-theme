---
title: 模板功能详解
---

# 🛠️ Fruit-Guardians 模板功能详解

本章节将详细介绍 Fruit-Guardians 现代化 VitePress 模板的主要功能、内置组件、导航系统、搜索、主题定制、SEO优化等内容，帮助你快速掌握和高效使用本模板。

---

## 🚦 主要功能一览

- **现代化导航栏**：支持多级导航、图标、响应式菜单
- **侧边栏自动/手动配置**：支持多级目录、分组、折叠
- **全文本本地搜索**：内置高性能本地搜索，支持中文分词
- **明暗主题切换**：一键切换，自动适配系统主题
- **现代化首页**：支持英雄区、特性区、行动号召、卡片等
- **丰富的内置组件**：如 ModernCard、ModernButton、ModernLayout 等
- **SEO 优化**：自动生成 meta 标签、OG 标签、结构化数据
- **PWA 支持**：可选渐进式 Web 应用体验
- **一键部署**：支持 GitHub Pages、Vercel、Netlify 等

---

## 🧩 内置组件

### ModernCard
用于展示特性、功能、团队成员等，支持图标、标题、描述、插槽扩展。

```vue
<ModernCard icon="🚀" title="极速性能" description="基于Vite构建，页面加载极快" />
```

### ModernButton
现代化按钮，支持多种样式、尺寸、加载、禁用等状态。

```vue
<ModernButton variant="primary" size="md">立即体验</ModernButton>
```

### ModernLayout
自定义布局组件，内置现代化导航栏、页脚、主题切换。

---

## 🧭 导航与侧边栏

- **导航栏**：支持多级菜单、图标、外链、响应式折叠
- **侧边栏**：支持分组、折叠、自动/手动生成
- **返回顶部**：内置返回顶部按钮
- **移动端菜单**：自适应移动端，支持社交链接

---

## 🔍 智能搜索

- 内置本地全文搜索，支持中文分词
- 支持快捷键（如 `/` 快速唤起搜索）
- 搜索结果高亮、分组展示
- 可自定义搜索提示、无结果提示等

---

## 🌗 明暗主题

- 支持一键切换明暗主题
- 自动适配系统主题
- 可自定义主题色、渐变、圆角等
- 暗色模式下自动优化对比度

---

## 🎨 主题定制

- 支持 Tailwind CSS 变量和自定义 CSS 变量
- 可自定义主色、背景、圆角、阴影等
- 支持自定义首页布局、特性区、卡片样式
- 可扩展自定义 Vue 组件

---

## 📈 SEO 优化

- 自动生成 meta、OG、Twitter 标签
- 支持自定义页面标题、描述、关键词
- 支持结构化数据（JSON-LD）
- 适配主流搜索引擎

---

## 🚀 一键部署

- 支持静态托管（GitHub Pages、Vercel、Netlify、阿里云OSS等）
- 构建产物为纯静态 HTML，可直接上传
- 支持 PWA 配置，离线访问

---

## 📝 典型用法示例

### 添加新页面
1. 在 `docs/docc/` 下新建 `your-page.md`
2. 在 `.vitepress/config.ts` 的 sidebar/nav 中配置链接

### 自定义首页
- 编辑 `docs/index.md`，可自定义 hero、features、actions 等

### 扩展组件
- 在 `.vitepress/components/` 下添加自定义 Vue 组件
- 在 `theme/index.ts` 中自动注册

---

> Fruit-Guardians，助你轻松拥有高颜值、高性能的文档站点！
