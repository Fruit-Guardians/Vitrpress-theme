---
title: 组件示例
---

# 🎨 组件示例

本章节展示了 Fruit-Guardians 现代化 VitePress 模板中的各种组件和功能示例。

---

## 🧩 内置组件

### ModernCard 组件

<ModernCard 
  icon="🚀" 
  title="现代化卡片" 
  description="这是一个现代化的卡片组件，支持图标、标题和描述。"
/>

### ModernButton 组件

<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin: 1rem 0;">
  <ModernButton variant="primary" size="md">主要按钮</ModernButton>
  <ModernButton variant="secondary" size="md">次要按钮</ModernButton>
  <ModernButton variant="outline" size="md">轮廓按钮</ModernButton>
</div>

---

## 📝 代码演示组件

### 基础用法

<CodeDemo title="Vue 组件示例">
  <template #preview>
    <div style="text-align: center; padding: 2rem;">
      <h3>Hello Fruit-Guardians!</h3>
      <p>这是一个 Vue 组件示例</p>
    </div>
  </template>
  
  <template #code>
```vue
<template>
  <div>
    <h3>Hello Fruit-Guardians!</h3>
    <p>这是一个 Vue 组件示例</p>
  </div>
</template>

<script setup>
// 组件逻辑
</script>
```
  </template>
</CodeDemo>

### 交互式示例

<CodeDemo title="计数器组件" :tabs="[
  { name: 'preview', label: '预览' },
  { name: 'code', label: '代码' }
]">
  <template #preview>
    <div style="text-align: center; padding: 2rem;">
      <h3>计数器: {{ count }}</h3>
      <button @click="count++" style="padding: 0.5rem 1rem; margin: 0.5rem;">
        点击增加
      </button>
    </div>
  </template>
  
  <template #code>
```vue
<template>
  <div>
    <h3>计数器: {{ count }}</h3>
    <button @click="count++">
      点击增加
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
```
  </template>
</CodeDemo>

---

## 🎨 样式示例

### 现代化卡片样式

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
  <div class="modern-card">
    <h3>🎨 设计系统</h3>
    <p>采用现代化的设计语言，支持明暗主题切换，提供最佳阅读体验。</p>
  </div>
  
  <div class="modern-card">
    <h3>📱 响应式布局</h3>
    <p>完美适配桌面端、平板和移动端，随时随地访问文档。</p>
  </div>
  
  <div class="modern-card">
    <h3>⚡ 极速性能</h3>
    <p>基于 Vite 构建，支持按需加载，页面加载速度极快。</p>
  </div>
</div>

### 渐变背景

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
  <h3>渐变背景示例</h3>
  <p>这是一个渐变背景的示例，展示了现代化的视觉效果。</p>
</div>

---

## 📊 数据展示

### 特性对比表

| 特性 | Fruit-Guardians | 其他模板 |
|------|-----------------|----------|
| 现代化设计 | ✅ | ❌ |
| 响应式布局 | ✅ | ❌ |
| 暗色主题 | ✅ | ❌ |
| 性能优化 | ✅ | ❌ |
| 易于定制 | ✅ | ❌ |

### 进度展示

<div style="margin: 2rem 0;">
  <h4>项目完成度</h4>
  <div style="background: #f1f5f9; border-radius: 8px; height: 20px; overflow: hidden;">
    <div style="background: linear-gradient(90deg, #6366f1, #8b5cf6); height: 100%; width: 85%; border-radius: 8px;"></div>
  </div>
  <p style="margin-top: 0.5rem; color: var(--vp-c-text-2);">85% 完成</p>
</div>

---

## 🔧 交互功能

### 主题切换

<div style="text-align: center; padding: 2rem; border: 1px solid var(--vp-c-divider); border-radius: 12px; margin: 2rem 0;">
  <h3>主题切换演示</h3>
  <p>点击右上角的主题切换按钮来体验明暗主题切换功能。</p>
  <div style="margin-top: 1rem;">
    <button onclick="document.documentElement.classList.toggle('dark')" style="padding: 0.5rem 1rem; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: transparent; cursor: pointer;">
      切换主题
    </button>
  </div>
</div>

### 搜索功能

<div style="text-align: center; padding: 2rem; border: 1px solid var(--vp-c-divider); border-radius: 12px; margin: 2rem 0;">
  <h3>搜索功能演示</h3>
  <p>使用快捷键 <kbd>Ctrl</kbd> + <kbd>K</kbd> 或点击搜索图标来体验搜索功能。</p>
</div>

---

## 📱 响应式设计

### 移动端适配

<div style="border: 2px dashed var(--vp-c-divider); border-radius: 12px; padding: 2rem; margin: 2rem 0;">
  <h3>响应式设计测试</h3>
  <p>调整浏览器窗口大小来查看响应式设计效果：</p>
  <ul>
    <li>桌面端：完整布局，侧边栏显示</li>
    <li>平板端：自适应布局，导航折叠</li>
    <li>移动端：垂直布局，优化触摸交互</li>
  </ul>
</div>

---

## 🎯 最佳实践

### 组件使用建议

1. **保持一致性**：使用统一的组件和样式
2. **响应式优先**：确保在所有设备上都有良好的体验
3. **性能优化**：合理使用组件，避免过度渲染
4. **可访问性**：确保组件符合无障碍标准

### 自定义扩展

```vue
<!-- 自定义组件示例 -->
<template>
  <div class="custom-component">
    <slot name="header"></slot>
    <div class="content">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<style scoped>
.custom-component {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
}
</style>
```

---

> 这些示例展示了 Fruit-Guardians 模板的强大功能和灵活性。你可以基于这些组件构建出更加丰富和个性化的文档站点！ 