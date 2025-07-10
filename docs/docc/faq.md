---
title: 常见问题解答
---

# ❓ 常见问题解答

本章节收集了使用 Fruit-Guardians 现代化 VitePress 模板时遇到的常见问题及其解决方案。

---

## 🚀 快速开始相关

### Q: 如何快速启动项目？
A: 确保已安装 Node.js 18+，然后运行：
```bash
git clone https://github.com/Fruit-Guardians/Vitrpress-theme.git
cd Vitrpress-theme
npm install
npm run dev
```

### Q: 启动时出现依赖错误怎么办？
A: 尝试以下步骤：
1. 删除 `node_modules` 和 `package-lock.json`
2. 重新安装：`npm install`
3. 如果还有问题，尝试：`npm cache clean --force`

### Q: 端口 5173 被占用怎么办？
A: VitePress 会自动寻找可用端口，或者可以手动指定：
```bash
npm run dev -- --port 3000
```

---

## 🎨 主题定制相关

### Q: 如何修改主题色？
A: 编辑 `.vitepress/styles/index.css`：
```css
:root {
  --vp-c-brand: #你的颜色;
  --vp-c-brand-light: #你的浅色;
  --vp-c-brand-dark: #你的深色;
}
```

### Q: 如何添加自定义 CSS？
A: 在 `.vitepress/styles/index.css` 中添加：
```css
/* 你的自定义样式 */
.custom-class {
  color: var(--vp-c-brand);
}
```

### Q: 如何修改首页布局？
A: 编辑 `docs/index.md`，可以自定义 hero、features、actions 等部分。

---

## 📝 内容管理相关

### Q: 如何添加新页面？
A: 
1. 在 `docs/` 下创建 `.md` 文件
2. 在 `.vitepress/config.ts` 中配置导航和侧边栏

### Q: 如何添加图片？
A: 将图片放在 `docs/public/` 目录下，在 Markdown 中使用：
```markdown
![图片描述](/图片名.png)
```

### Q: 如何添加代码高亮？
A: 在代码块中指定语言：
```markdown
```javascript
console.log('Hello World');
```
```

---

## 🔧 配置相关

### Q: 如何修改站点标题？
A: 编辑 `.vitepress/config.ts`：
```typescript
export default defineConfig({
  title: '你的站点标题',
  description: '你的站点描述'
})
```

### Q: 如何添加导航菜单？
A: 在 `config.ts` 的 `themeConfig.nav` 中配置：
```typescript
nav: [
  { text: '首页', link: '/' },
  { text: '文档', link: '/docc/' }
]
```

### Q: 如何配置侧边栏？
A: 在 `config.ts` 的 `themeConfig.sidebar` 中配置：
```typescript
sidebar: {
  '/docc/': [
    { text: '快速开始', link: '/docc/index.md' },
    { text: '功能详解', link: '/docc/features.md' }
  ]
}
```

---

## 🚀 部署相关

### Q: 如何部署到 GitHub Pages？
A: 
1. 推送代码到 GitHub
2. 在仓库设置中启用 GitHub Pages
3. 选择 `gh-pages` 分支或 `docs` 目录

### Q: 如何部署到 Vercel？
A: 
1. 连接 GitHub 仓库到 Vercel
2. 构建命令：`npm run build`
3. 输出目录：`docs/.vitepress/dist`

### Q: 构建失败怎么办？
A: 
1. 检查 Node.js 版本是否 >= 18
2. 检查依赖是否正确安装
3. 查看构建日志中的具体错误信息

---

## 🔍 搜索相关

### Q: 如何启用搜索功能？
A: 在 `config.ts` 中配置：
```typescript
export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local'
    }
  }
})
```

### Q: 搜索不工作怎么办？
A: 
1. 确保已正确配置搜索选项
2. 检查是否有语法错误
3. 尝试重新构建项目

---

## 🎯 性能相关

### Q: 如何优化加载速度？
A: 
1. 压缩图片，使用 WebP 格式
2. 减少不必要的依赖
3. 使用 CDN 加速静态资源
4. 启用 Gzip 压缩

### Q: 如何减少构建时间？
A: 
1. 使用 `npm run clean` 清理缓存
2. 检查是否有不必要的文件
3. 优化图片和静态资源

---

## 🛠️ 开发相关

### Q: 如何添加自定义组件？
A: 
1. 在 `.vitepress/components/` 下创建 Vue 组件
2. 组件会自动全局注册
3. 在 Markdown 中直接使用

### Q: 如何调试样式问题？
A: 
1. 使用浏览器开发者工具
2. 检查 CSS 变量是否正确
3. 确认样式优先级

### Q: 如何添加 TypeScript 支持？
A: 项目已内置 TypeScript 支持，可以直接使用 `.ts` 和 `.vue` 文件。

---

## 📱 移动端相关

### Q: 移动端显示异常怎么办？
A: 
1. 检查响应式设计
2. 测试不同屏幕尺寸
3. 优化移动端样式

### Q: 如何优化移动端体验？
A: 
1. 使用相对单位（rem、em）
2. 优化触摸交互
3. 减少不必要的动画

---

## 🔒 安全相关

### Q: 如何添加 HTTPS？
A: 
1. 在部署平台启用 HTTPS
2. 配置安全头
3. 使用 CSP 策略

### Q: 如何防止 XSS 攻击？
A: 
1. 避免在 Markdown 中插入不安全的 HTML
2. 使用 VitePress 内置的安全机制
3. 定期更新依赖包

---

## 📞 获取帮助

如果以上问题无法解决，你可以：

1. **查看官方文档**：[VitePress 官方文档](https://vitepress.dev/)
2. **提交 Issue**：[GitHub Issues](https://github.com/Fruit-Guardians/Vitrpress-theme/issues)
3. **社区讨论**：[GitHub Discussions](https://github.com/Fruit-Guardians/Vitrpress-theme/discussions)

---

> 如果你有其他问题，欢迎在 GitHub 上提交 Issue 或参与讨论！ 