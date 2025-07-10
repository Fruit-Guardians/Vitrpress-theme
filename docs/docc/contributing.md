---
title: 贡献指南
---

# 🤝 贡献指南

感谢你考虑为 Fruit-Guardians 现代化 VitePress 模板项目做出贡献！我们欢迎所有形式的贡献，包括但不限于报告 bug、提出新功能建议、改进文档、提交代码等。

---

## 🎯 贡献方式

### 🐛 报告 Bug
如果你发现了 bug，请：
1. 在 [GitHub Issues](https://github.com/Fruit-Guardians/Vitrpress-theme/issues) 中搜索是否已有相关报告
2. 如果没有，请创建新的 Issue，并包含：
   - 详细的 bug 描述
   - 重现步骤
   - 期望行为和实际行为
   - 环境信息（操作系统、Node.js 版本等）

### 💡 提出新功能建议
如果你有新功能想法，请：
1. 在 [GitHub Discussions](https://github.com/Fruit-Guardians/Vitrpress-theme/discussions) 中讨论
2. 或者创建 Feature Request Issue
3. 详细描述功能需求和使用场景

### 📝 改进文档
文档改进包括：
- 修正错误或过时的信息
- 添加缺失的说明
- 改进文档结构和可读性
- 翻译文档到其他语言

### 🔧 提交代码
如果你想提交代码，请遵循以下流程：

---

## 🚀 开发环境设置

### 1. Fork 项目
1. 访问 [项目主页](https://github.com/Fruit-Guardians/Vitrpress-theme)
2. 点击右上角的 "Fork" 按钮
3. 克隆你的 fork 到本地

### 2. 安装依赖
```bash
git clone https://github.com/你的用户名/Vitrpress-theme.git
cd Vitrpress-theme
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 创建功能分支
```bash
git checkout -b feature/your-feature-name
```

---

## 📋 代码规范

### 代码风格
- 使用 **TypeScript** 进行类型检查
- 遵循 **ESLint** 规则
- 使用 **Prettier** 格式化代码
- 遵循 **Vue 3** 组合式 API 风格

### 提交信息规范
使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```bash
# 功能新增
feat: 添加新的主题定制选项

# Bug 修复
fix: 修复移动端导航显示问题

# 文档更新
docs: 更新快速开始指南

# 样式改进
style: 优化按钮悬停效果

# 重构
refactor: 重构主题配置逻辑

# 测试
test: 添加组件单元测试

# 构建
build: 更新依赖包版本
```

### 分支命名规范
- `feature/功能名称` - 新功能
- `fix/问题描述` - Bug 修复
- `docs/文档类型` - 文档更新
- `style/样式类型` - 样式改进
- `refactor/重构内容` - 代码重构

---

## 🔄 提交流程

### 1. 提交代码
```bash
# 添加修改的文件
git add .

# 提交代码
git commit -m "feat: 添加新的主题定制选项"

# 推送到你的 fork
git push origin feature/your-feature-name
```

### 2. 创建 Pull Request
1. 访问你的 fork 页面
2. 点击 "Compare & pull request"
3. 填写 PR 标题和描述
4. 等待代码审查

### 3. 代码审查
- 所有代码都需要经过审查
- 审查者可能会要求修改
- 请及时响应审查意见

---

## 📝 文档贡献

### 文档结构
```
docs/
├── docc/              # 主要文档
│   ├── index.md       # 快速开始
│   ├── faq.md         # 常见问题
│   ├── contributing.md # 贡献指南
│   └── ...
├── monitor/           # 示例文档
└── public/            # 静态资源
```

### 文档规范
- 使用清晰的标题层级
- 添加适当的 emoji 图标
- 包含代码示例
- 保持内容简洁明了

---

## 🧪 测试指南

### 运行测试
```bash
# 代码检查
npm run lint

# 类型检查
npm run type-check

# 构建测试
npm run build
```

### 测试要求
- 新功能需要包含测试
- 修复 bug 需要添加回归测试
- 确保所有测试通过

---

## 🎨 设计贡献

### 设计原则
- 保持简洁现代的设计风格
- 确保良好的可访问性
- 支持明暗主题切换
- 响应式设计

### 样式规范
- 使用 CSS 变量管理主题
- 遵循 Tailwind CSS 设计系统
- 保持一致的间距和圆角
- 优化动画和过渡效果

---

## 📋 Issue 模板

### Bug 报告模板
```markdown
## Bug 描述
简要描述 bug

## 重现步骤
1. 步骤 1
2. 步骤 2
3. 步骤 3

## 期望行为
描述期望的行为

## 实际行为
描述实际的行为

## 环境信息
- 操作系统：
- Node.js 版本：
- 浏览器：
- 其他相关信息：
```

### 功能请求模板
```markdown
## 功能描述
详细描述新功能

## 使用场景
描述功能的使用场景

## 实现建议
如果有实现建议，请提供

## 其他信息
其他相关信息
```

---

## 🏆 贡献者

感谢所有为项目做出贡献的开发者！

### 如何成为贡献者
- 提交有效的 Pull Request
- 积极参与 Issue 讨论
- 帮助其他用户解决问题
- 改进项目文档

### 贡献者权益
- 在项目 README 中列出名字
- 获得项目维护者的感谢
- 参与项目决策讨论

---

## 📞 联系我们

如果你有任何问题或建议，欢迎：

- **提交 Issue**：[GitHub Issues](https://github.com/Fruit-Guardians/Vitrpress-theme/issues)
- **参与讨论**：[GitHub Discussions](https://github.com/Fruit-Guardians/Vitrpress-theme/discussions)
- **发送邮件**：通过 GitHub 联系我们

---

## 📄 许可证

通过贡献代码，你同意你的贡献将在 [MIT 许可证](https://github.com/Fruit-Guardians/Vitrpress-theme/blob/main/LICENSE) 下发布。

---

> 感谢你的贡献，让我们一起让 Fruit-Guardians 变得更好！ 