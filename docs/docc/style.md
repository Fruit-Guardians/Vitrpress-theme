---
title: 主题与样式定制
---

# 🎨 主题与样式定制

本章节将详细介绍如何自定义 Fruit-Guardians 现代化 VitePress 模板的主题色彩、样式、组件样式等，帮助你打造独特的文档站点风格。

---

## 🎨 主题色彩系统

### 基础色彩变量

在 `.vitepress/styles/index.css` 中定义主题色彩：

```css
:root {
  /* 主色调 */
  --vp-c-brand: #6366f1;
  --vp-c-brand-light: #818cf8;
  --vp-c-brand-lighter: #a5b4fc;
  --vp-c-brand-dark: #4f46e5;
  --vp-c-brand-darker: #3730a3;
  
  /* 背景色 */
  --vp-c-bg: #ffffff;
  --vp-c-bg-alt: #f8fafc;
  --vp-c-bg-elv: #ffffff;
  --vp-c-bg-soft: #f8fafc;
  
  /* 文字色 */
  --vp-c-text-1: #213547;
  --vp-c-text-2: #3e5a78;
  --vp-c-text-3: #5a7a8a;
  --vp-c-text-code: #476582;
  
  /* 边框色 */
  --vp-c-divider: #e2e8f0;
  --vp-c-divider-light: #f1f5f9;
  
  /* 特殊色 */
  --vp-c-green: #10b981;
  --vp-c-green-light: #34d399;
  --vp-c-green-lighter: #6ee7b7;
  --vp-c-green-dark: #059669;
  --vp-c-green-darker: #047857;
  
  --vp-c-yellow: #f59e0b;
  --vp-c-yellow-light: #fbbf24;
  --vp-c-yellow-lighter: #fcd34d;
  --vp-c-yellow-dark: #d97706;
  --vp-c-yellow-darker: #b45309;
  
  --vp-c-red: #ef4444;
  --vp-c-red-light: #f87171;
  --vp-c-red-lighter: #fca5a5;
  --vp-c-red-dark: #dc2626;
  --vp-c-red-darker: #b91c1c;
  
  --vp-c-purple: #8b5cf6;
  --vp-c-purple-light: #a78bfa;
  --vp-c-purple-lighter: #c4b5fd;
  --vp-c-purple-dark: #7c3aed;
  --vp-c-purple-darker: #6d28d9;
}
```

### 暗色主题色彩

```css
.dark {
  /* 主色调 */
  --vp-c-brand: #818cf8;
  --vp-c-brand-light: #a5b4fc;
  --vp-c-brand-lighter: #c7d2fe;
  --vp-c-brand-dark: #6366f1;
  --vp-c-brand-darker: #4f46e5;
  
  /* 背景色 */
  --vp-c-bg: #0f172a;
  --vp-c-bg-alt: #1e293b;
  --vp-c-bg-elv: #1e293b;
  --vp-c-bg-soft: #1e293b;
  
  /* 文字色 */
  --vp-c-text-1: #f1f5f9;
  --vp-c-text-2: #cbd5e1;
  --vp-c-text-3: #94a3b8;
  --vp-c-text-code: #cbd5e1;
  
  /* 边框色 */
  --vp-c-divider: #334155;
  --vp-c-divider-light: #475569;
}
```

---

## 🎯 自定义主题色

### 1. 修改主色调

```css
:root {
  /* 蓝色主题 */
  --vp-c-brand: #3b82f6;
  --vp-c-brand-light: #60a5fa;
  --vp-c-brand-lighter: #93c5fd;
  --vp-c-brand-dark: #2563eb;
  --vp-c-brand-darker: #1d4ed8;
}

/* 或者使用绿色主题 */
:root {
  --vp-c-brand: #10b981;
  --vp-c-brand-light: #34d399;
  --vp-c-brand-lighter: #6ee7b7;
  --vp-c-brand-dark: #059669;
  --vp-c-brand-darker: #047857;
}
```

### 2. 渐变色彩

```css
/* 渐变背景 */
.VPHome .container .main .VPHomeHero .container .text .title {
  background: linear-gradient(120deg, #6366f1, #8b5cf6, #06b6d4);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 按钮渐变 */
.VPButton.brand {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
}
```

---

## 🧩 组件样式定制

### 1. 卡片组件样式

```css
/* 现代化卡片 */
.modern-card {
  background: rgb(255 255 255 / 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgb(229 231 235 / 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.modern-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.modern-card:hover::before {
  transform: scaleX(1);
}

.modern-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgb(0 0 0 / 0.1);
}
```

### 2. 按钮组件样式

```css
/* 现代化按钮 */
.modern-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgb(99 102 241 / 0.3);
}
```

### 3. 导航栏样式

```css
/* 现代化导航栏 */
.VPNav {
  backdrop-filter: blur(12px);
  background: rgb(255 255 255 / 0.8);
  border-bottom: 1px solid rgb(229 231 235 / 0.5);
  transition: all 0.3s ease;
}

.dark .VPNav {
  background: rgb(17 24 39 / 0.8);
  border-bottom-color: rgb(55 65 81 / 0.5);
}
```

---

## 📱 响应式设计

### 1. 移动端优化

```css
/* 移动端导航 */
@media (max-width: 768px) {
  .VPNav .content {
    padding: 0 1rem;
  }
  
  .VPNav .content .content-body .content .nav {
    display: none;
  }
  
  .VPNav .content .content-body .content .appearance {
    margin-left: auto;
  }
}

/* 移动端首页 */
@media (max-width: 768px) {
  .VPHome .container .main .VPHomeHero .container .text .title {
    font-size: 2rem !important;
  }
  
  .VPHome .container .main .VPHomeHero .container .text .tagline {
    font-size: 1.1rem !important;
  }
}
```

### 2. 平板端优化

```css
@media (min-width: 769px) and (max-width: 1024px) {
  .VPHome .container .main .VPHomeFeatures .container .items {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

## 🎭 动画效果

### 1. 页面加载动画

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.VPHome .container .main .VPHomeHero {
  animation: fadeInUp 0.8s ease-out;
}
```

### 2. 悬停动画

```css
/* 卡片悬停效果 */
.VPHome .container .main .VPHomeFeatures .container .items .item {
  transition: all 0.3s ease;
}

.VPHome .container .main .VPHomeFeatures .container .items .item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgb(0 0 0 / 0.1);
}

/* 按钮悬停效果 */
.VPButton {
  transition: all 0.3s ease;
}

.VPButton:hover {
  transform: translateY(-2px);
  box-shadow: var(--vp-shadow-3);
}
```

---

## 🎨 自定义字体

### 1. 引入字体

```css
/* 引入 Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* 设置字体 */
:root {
  --vp-font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --vp-font-family-mono: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
}
```

### 2. 字体权重

```css
/* 标题字体 */
.VPHome .container .main .VPHomeHero .container .text .title {
  font-weight: 700;
  font-size: 3rem;
  line-height: 1.2;
}

/* 正文字体 */
.VPDoc .content .content-container .main .vp-doc {
  font-weight: 400;
  line-height: 1.6;
}
```

---

## 🎯 最佳实践

### 1. 色彩搭配
- 使用 HSL 色彩空间，便于调整
- 保持足够的对比度，确保可读性
- 遵循 WCAG 2.1 无障碍标准

### 2. 动画设计
- 动画时长控制在 200-400ms
- 使用 `ease-out` 缓动函数
- 避免过度动画，影响用户体验

### 3. 响应式设计
- 使用相对单位（rem、em、%）
- 设置断点：768px、1024px、1440px
- 测试不同设备和屏幕尺寸

### 4. 性能优化
- 使用 CSS 变量，便于主题切换
- 合理使用 `will-change` 属性
- 避免重绘和回流

---

## 🔧 调试技巧

### 1. 使用浏览器开发者工具
- 实时修改 CSS 变量
- 测试不同屏幕尺寸
- 检查性能问题

### 2. 使用 CSS 调试工具
```css
/* 调试边框 */
* {
  border: 1px solid red;
}

/* 调试网格 */
.debug-grid {
  background-image: linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

---

> Fruit-Guardians，助你轻松拥有高颜值、高性能的文档站点！
