# 🎯 基本使用

本章节介绍 Api-Finder 的基本使用方法，帮助你快速上手。

## 🚀 快速开始

### 最简单的使用

```bash
# 扫描单个网站
python main.py -u https://example.com
```

### 常用参数

```bash
# 详细输出
python main.py -u https://example.com -v

# 指定输出文件
python main.py -u https://example.com -o results.json

# 使用代理
python main.py -u https://example.com -p http://proxy:8080

# 使用Cookie认证
python main.py -u https://example.com -c "session=abc123"
```

## 📋 命令行参数

### 必需参数

- `-u, --url` - 目标URL

### 可选参数

- `-o, --output` - 输出文件路径
- `-f, --format` - 输出格式 (txt, json, csv, html, xml, xlsx, md)
- `-p, --proxy` - 代理设置
- `-c, --cookie` - Cookie字符串
- `-a, --user-agent` - User-Agent设置
- `-t, --timeout` - 超时时间（秒）
- `-d, --delay` - 请求延迟（秒）
- `-v, --verbose` - 详细输出
- `-r, --random-agent` - 随机User-Agent
- `--update` - 更新扫描规则

## 💡 使用技巧

### 1. 批量扫描

```bash
# 从文件读取URL列表
python main.py -l urls.txt

# 扫描多个URL
python main.py -u https://site1.com -u https://site2.com
```

### 2. 结果过滤

```bash
# 只显示特定方法的API
python main.py -u https://example.com --methods GET,POST

# 过滤特定路径
python main.py -u https://example.com --include-path "/api/"
```

### 3. 性能优化

```bash
# 增加并发数
python main.py -u https://example.com --threads 10

# 设置合适的延迟
python main.py -u https://example.com -d 0.5
```

## 🔍 扫描结果解读

### 输出字段说明

- **Method** - HTTP方法 (GET, POST, PUT, DELETE等)
- **Endpoint** - API端点路径
- **Source** - 发现该API的源文件
- **Line** - 在源文件中的行号
- **Confidence** - 置信度 (0-1之间)

### 置信度说明

- **0.9-1.0** - 高置信度，很可能是真实API
- **0.7-0.9** - 中等置信度，需要进一步验证
- **0.5-0.7** - 低置信度，可能是误报

## 🛠️ 故障排除

### 常见问题

1. **连接超时**
   ```bash
   # 增加超时时间
   python main.py -u https://example.com -t 60
   ```

2. **被反爬虫拦截**
   ```bash
   # 使用随机User-Agent和延迟
   python main.py -u https://example.com -r -d 2
   ```

3. **需要认证的页面**
   ```bash
   # 添加认证Cookie
   python main.py -u https://example.com -c "session=your_session"
   ```

## 📚 相关资源

- [安装配置](/guide/installation) - 详细安装指南
- [高级配置](/guide/advanced-config) - 高级功能配置
- [使用示例](/examples/) - 更多实际案例
- [常见问题](/guide/faq) - 常见问题解答