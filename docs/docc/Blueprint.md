---
title: 项目结构与扩展
---

# 🏗️ 项目结构与扩展

本章节介绍 Fruit-Guardians 现代化 VitePress 模板的目录结构、扩展方式，以及如何添加自定义页面和组件，帮助你灵活定制和扩展你的文档站点。

---

## 📦 目录结构说明

```text
docs/
├── .vitepress/         # 配置与主题定制
│   ├── config.ts       # 站点配置
│   ├── theme/          # 主题扩展
│   ├── styles/         # 全局样式
│   ├── components/     # 通用组件
│   └── layout/         # 自定义布局
├── docc/               # 文档内容（本目录）
├── monitor/            # 监控系统文档（示例）
└── public/             # 静态资源
```

- `.vitepress/`：VitePress 配置、主题、样式、组件等全部集中于此，便于统一管理和扩展。
- `docc/`：主文档内容目录，建议按功能或章节拆分多个 Markdown 文件。
- `public/`：静态资源目录，放置 logo、图片、manifest 等。

---

## 🧩 扩展方式

### 1. 添加自定义页面
- 在 `docs/docc/` 下新建 `your-page.md`
- 在 `.vitepress/config.ts` 的 sidebar/nav 中配置链接

### 2. 扩展自定义组件
- 在 `.vitepress/components/` 下添加 Vue 组件（如 `MyComponent.vue`）
- 组件会自动全局注册，可直接在 Markdown 中使用

### 3. 自定义布局
- 在 `.vitepress/layout/` 下添加自定义布局组件
- 在 `theme/index.ts` 中引入并配置

### 4. 主题变量与样式
- 编辑 `.vitepress/styles/index.css`，自定义主题色、圆角、阴影等
- 支持 Tailwind CSS 与自定义 CSS 变量

---

## 📝 典型扩展示例

### 新增 FAQ 页面
1. 新建 `docs/docc/faq.md`
2. 在 `config.ts` 的 sidebar 添加：
   ```js
   sidebar: {
     '/docc/': [
       { text: '常见问题', link: '/docc/faq.md' }
     ]
   }
   ```

### 添加自定义卡片组件
1. 新建 `.vitepress/components/FaqCard.vue`
2. 在 `faq.md` 中直接使用：
   ```vue
   <FaqCard question="如何自定义主题？" answer="只需修改 .vitepress/styles/index.css 即可。" />
   ```

---

## 💡 最佳实践
- 结构清晰，按功能拆分文档
- 组件复用，提升开发效率
- 主题变量集中管理，便于全局风格统一
- 善用 Markdown 与 Vue 组件混用，提升页面表现力

---

> Fruit-Guardians，助你轻松拥有高颜值、高性能的文档站点！
