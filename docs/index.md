---
layout: home
hero:
  name: "Fruit-Guardians"
  text: "现代化文档模板"
  tagline: 专为开发者打造的现代化、美观的VitePress文档模板，提供最佳的用户体验和开发体验
  image:
    src: /logo.png
    alt: Fruit-Guardians Logo
  actions:
    - theme: brand
      text: 快速开始
      link: /docc/
    - theme: alt
      text: 查看源码
      link: https://github.com/Fruit-Guardians/Vitrpress-theme
    - theme: alt
      text: 在线预览
      link: https://fruit-guardians.github.io

features:
  - icon: 🚀
    title: 快速上手
    details: 基于VitePress构建，开箱即用，零配置即可获得现代化文档站点
  - icon: 🎨
    title: 美观设计
    details: 采用现代化设计语言，支持明暗主题切换，提供最佳阅读体验
  - icon: 📱
    title: 响应式布局
    details: 完美适配桌面端、平板和移动端，随时随地访问文档
  - icon: ⚡
    title: 极速性能
    details: 基于Vite构建，支持按需加载，页面加载速度极快
  - icon: 🔍
    title: 智能搜索
    details: 内置全文搜索功能，快速定位所需内容
  - icon: 🛠️
    title: 易于定制
    details: 模块化设计，支持主题定制和功能扩展
---
## 🎯 为什么选择 Fruit-Guardians？

Fruit-Guardians 是一个专为现代开发者打造的 VitePress 文档模板。我们致力于提供最佳的文档编写和阅读体验。

> 利用AI生成了一些md文档，仅作为展示功能

### ✨ 核心特性

- **🚀 开箱即用** - 零配置即可获得现代化文档站点
- **🎨 美观设计** - 采用现代化设计语言，支持明暗主题
- **📱 响应式布局** - 完美适配各种设备
- **⚡ 极速性能** - 基于 Vite 构建，加载速度极快
- **🔍 智能搜索** - 内置全文搜索功能
- **🛠️ 易于定制** - 模块化设计，支持扩展

### 🛠️ 技术栈

- **VitePress** - 现代化的静态站点生成器
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Element Plus** - Vue 3 组件库

### 📦 快速开始

```bash
# 克隆项目
git clone https://github.com/Fruit-Guardians/Vitrpress-theme.git

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 🎨 自定义主题

Fruit-Guardians 提供了丰富的主题定制选项：

```css
:root {
  --vp-c-brand: #6366f1;
  --vp-c-brand-light: #818cf8;
  --vp-c-brand-lighter: #a5b4fc;
  --vp-c-brand-dark: #4f46e5;
  --vp-c-brand-darker: #3730a3;
}
```

### 📚 文档结构

```
docs/
├── .vitepress/
│   ├── config.ts          # VitePress 配置
│   ├── theme/             # 主题定制
│   ├── styles/            # 样式文件
│   └── components/        # 自定义组件
├── docc/                  # 文档内容
├── monitor/               # 监控系统文档
└── public/                # 静态资源
```
### 🤝 贡献指南

我们欢迎所有形式的贡献！无论是报告 bug、提出新功能建议，还是提交代码，我们都非常感激。

### 📄 许可证

本项目基于 [MIT 许可证](https://github.com/Fruit-Guardians/Vitrpress-theme/blob/main/LICENSE) 发布。

---

<div class="vp-raw">
  <div class="modern-card">
    <h3>🎉 开始使用</h3>
    <p>立即开始构建您的现代化文档站点！</p>
    <a href="/docc/" class="modern-button">查看文档</a>
  </div>
</div>

<style>
.modern-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  margin: 2rem 0;
}

.modern-card h3 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.modern-card p {
  margin: 0 0 1.5rem 0;
  opacity: 0.9;
}

.modern-button {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.modern-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
```
