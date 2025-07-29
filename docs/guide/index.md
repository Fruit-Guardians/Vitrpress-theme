# 📖 用户指南

欢迎来到 Api-Finder 用户指南！这里包含了使用 Api-Finder 的完整指南和最佳实践。

## 🎯 什么是 Api-Finder？

Api-Finder 是一个专业的前端API发现工具，专为安全研究人员、渗透测试工程师和开发者设计。它能够：

- **🔍 自动发现API端点** - 智能分析前端代码，自动提取API接口信息
- **📱 支持多种设备** - 模拟不同设备和浏览器的访问行为  
- **🔐 认证扫描支持** - 支持Cookie认证，扫描需要登录的页面
- **📊 多格式输出** - 提供多种输出格式，便于后续分析和处理
- **🚀 高性能扫描** - 优化的扫描算法，快速高效地完成任务

## 🏗️ 工作原理

Api-Finder 通过以下步骤发现API端点：

```mermaid
graph TD
    A[输入目标URL] --> B[获取网页内容]
    B --> C[解析HTML结构]
    C --> D[提取JavaScript文件]
    D --> E[分析JS代码]
    E --> F[应用扫描规则]
    F --> G[提取API端点]
    G --> H[格式化输出]
```

### 扫描流程详解

1. **🌐 网页获取** - 使用配置的User-Agent和代理获取目标网页
2. **📄 内容解析** - 解析HTML结构，提取所有JavaScript文件链接
3. **🔍 代码分析** - 下载并分析JavaScript文件内容
4. **🎯 规则匹配** - 应用内置和自定义规则识别API模式
5. **📊 结果整理** - 去重、分类并格式化发现的API端点
6. **📤 输出结果** - 根据指定格式输出扫描结果

## 🎨 核心特性

### 🔍 智能API识别

Api-Finder 使用先进的模式匹配算法，能够识别多种API模式：

- **RESTful API** - `/api/users`, `/v1/products/{id}`
- **GraphQL端点** - `/graphql`, `/api/graphql`
- **WebSocket连接** - `ws://`, `wss://`
- **AJAX请求** - `$.ajax()`, `fetch()`, `axios()`
- **第三方API** - 各种云服务和第三方API调用

### 🌐 多种代理支持

支持多种网络配置：

```bash
# HTTP代理
python main.py -u https://example.com -p http://proxy:8080

# SOCKS5代理  
python main.py -u https://example.com -p socks5://proxy:1080

# 带认证的代理
python main.py -u https://example.com -p http://user:pass@proxy:8080
```

### 📱 设备模拟

模拟不同设备访问：

```bash
# 桌面浏览器
python main.py -u https://example.com -a desktop

# 移动设备
python main.py -u https://example.com -a phone

# 微信浏览器
python main.py -u https://example.com -a weixin

# 自定义User-Agent
python main.py -u https://example.com -a "Custom User Agent"
```

## 📊 输出格式

Api-Finder 支持多种输出格式，满足不同的使用场景：

### 📄 文本格式 (.txt)

```
=== Api-Finder 扫描结果 ===
目标: https://example.com
时间: 2025-01-27 10:30:00
发现API数量: 15

=== 发现的API端点 ===
GET  /api/users
POST /api/login
GET  /api/products
PUT  /api/users/{id}
DELETE /api/users/{id}
```

### 📋 JSON格式 (.json)

```json
{
  "scan_info": {
    "target": "https://example.com",
    "timestamp": "2025-01-27T10:30:00Z",
    "total_apis": 15,
    "scan_duration": "2.5s"
  },
  "apis": [
    {
      "method": "GET",
      "endpoint": "/api/users",
      "source_file": "main.js",
      "line_number": 125,
      "confidence": 0.95
    }
  ]
}
```

### 📊 CSV格式 (.csv)

```csv
Method,Endpoint,Source,Line,Confidence
GET,/api/users,main.js,125,0.95
POST,/api/login,auth.js,45,0.98
GET,/api/products,shop.js,78,0.92
```

### 🌐 HTML报告 (.html)

生成美观的HTML报告，包含：
- 📊 扫描统计图表
- 🔍 详细的API列表
- 📱 响应式设计
- 🎨 现代化界面

## 🛡️ 安全注意事项

### ⚠️ 使用须知

1. **合法使用** - 仅在授权的系统上使用此工具
2. **遵守法律** - 确保符合当地法律法规
3. **负责任披露** - 发现安全问题时负责任地报告
4. **频率控制** - 避免对目标系统造成过大负载

### 🔒 隐私保护

- Api-Finder 不会收集或上传任何扫描数据
- 所有处理都在本地进行
- 支持离线使用（除规则更新外）

## 🎯 最佳实践

### 📋 扫描前准备

1. **确认授权** - 确保有权限扫描目标系统
2. **了解目标** - 了解目标应用的技术栈
3. **配置代理** - 根据网络环境配置合适的代理
4. **选择时机** - 选择合适的时间进行扫描

### 🔧 配置优化

1. **调整超时** - 根据网络情况调整超时时间
2. **设置延迟** - 避免请求过于频繁
3. **选择格式** - 根据后续处理需求选择输出格式
4. **更新规则** - 定期更新扫描规则

## 📚 相关资源

- 🚀 [快速开始](/guide/getting-started) - 立即开始使用
- ⚙️ [安装配置](/guide/installation) - 详细安装指南
- 🎯 [基本使用](/guide/basic-usage) - 基础功能介绍
- 🔧 [高级配置](/guide/advanced-config) - 高级功能配置
- 💡 [使用示例](/examples/) - 实际应用案例
- 🔧 [API参考](/api/) - 开发者文档

## 🤝 获取帮助

如果你需要帮助：

1. 📖 查看本文档的其他章节
2. 🔍 搜索 [常见问题](/guide/faq)
3. 🐛 [提交Issue](https://github.com/jujubooom/Api-Finder/issues)
4. 💬 在 [讨论区](https://github.com/jujubooom/Api-Finder/discussions) 提问