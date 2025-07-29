# 🚀 快速开始

欢迎使用 Api-Finder！这个指南将帮助你快速上手这个强大的前端API发现工具。

## 📋 系统要求

在开始之前，请确保你的系统满足以下要求：

- **Python 3.7+** - 推荐使用 Python 3.8 或更高版本
- **pip** - Python 包管理器
- **网络连接** - 用于下载依赖和更新规则

## 📦 安装

### 方法一：从源码安装

```bash
# 克隆项目
git clone https://github.com/jujubooom/Api-Finder.git
cd Api-Finder

# 安装依赖
pip install -r requirements.txt

# 可选：安装Excel输出支持
pip install openpyxl
```

### 方法二：使用 pip 安装（即将支持）

```bash
# 从 PyPI 安装（开发中）
pip install api-finder
```

## 🎯 第一次使用

### 基本扫描

最简单的使用方式是扫描一个网站：

```bash
python main.py -u https://example.com
```

这将：
- 扫描 `https://example.com` 网站
- 自动发现API端点
- 在终端显示结果

### 查看帮助

查看所有可用选项：

```bash
python main.py -h
```

## 🔧 常用命令

### 基础扫描命令

```bash
# 扫描单个网站
python main.py -u https://example.com

# 静默模式（只显示发现的API）
python main.py -u https://example.com -s

# 详细输出模式
python main.py -u https://example.com -v
```

### 认证扫描

```bash
# 使用Cookie进行认证扫描
python main.py -u https://example.com -c "session=abc123; token=xyz789"

# 使用自定义User-Agent
python main.py -u https://example.com -a "Mozilla/5.0 (Custom Agent)"
```

### 输出到文件

```bash
# 输出到文本文件
python main.py -u https://example.com -o results.txt

# 输出到JSON文件
python main.py -u https://example.com -o results.json

# 输出到Excel文件
python main.py -u https://example.com -o results.xlsx
```

## 📊 输出示例

### 终端输出

```
[INFO] 开始扫描: https://example.com
[INFO] 发现 15 个API端点

🔍 发现的API端点:
┌─────────────────────────────────────────────────────────────┐
│ API端点                                                      │
├─────────────────────────────────────────────────────────────┤
│ GET  /api/users                                             │
│ POST /api/login                                             │
│ GET  /api/products                                          │
│ PUT  /api/users/{id}                                        │
│ DELETE /api/users/{id}                                      │
└─────────────────────────────────────────────────────────────┘

[SUCCESS] 扫描完成！发现 15 个API端点
```

### JSON输出格式

```json
{
  "scan_info": {
    "target": "https://example.com",
    "timestamp": "2025-01-27T10:30:00Z",
    "total_apis": 15
  },
  "apis": [
    {
      "method": "GET",
      "endpoint": "/api/users",
      "source": "main.js:125",
      "confidence": 0.95
    },
    {
      "method": "POST", 
      "endpoint": "/api/login",
      "source": "auth.js:45",
      "confidence": 0.98
    }
  ]
}
```

## 🎯 下一步

现在你已经成功运行了第一次扫描！接下来你可以：

1. 📖 阅读 [基本使用指南](/guide/basic-usage) 了解更多功能
2. ⚙️ 查看 [安装配置](/guide/installation) 进行详细配置
3. 🔧 学习 [高级配置](/guide/advanced-config) 自定义扫描行为
4. 💡 查看 [使用示例](/examples/) 了解实际应用场景

## ❓ 遇到问题？

如果在使用过程中遇到问题：

1. 📖 查看 [常见问题](/guide/faq) 
2. 🐛 [提交Issue](https://github.com/jujubooom/Api-Finder/issues)
3. 💬 在 [讨论区](https://github.com/jujubooom/Api-Finder/discussions) 寻求帮助

## 🎉 恭喜！

你已经成功开始使用 Api-Finder！这个工具将帮助你高效地发现和分析前端API端点。