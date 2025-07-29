# ⚙️ 安装配置

本章节将详细介绍如何安装和配置 Api-Finder，确保你能够顺利使用所有功能。

## 📋 系统要求

### 最低要求

- **操作系统**: Windows 7+, macOS 10.12+, Linux (Ubuntu 16.04+)
- **Python**: 3.7 或更高版本
- **内存**: 512MB RAM
- **存储**: 100MB 可用空间
- **网络**: 互联网连接（用于下载依赖和更新规则）

### 推荐配置

- **操作系统**: Windows 10+, macOS 11+, Linux (Ubuntu 20.04+)
- **Python**: 3.9 或更高版本
- **内存**: 2GB RAM
- **存储**: 1GB 可用空间
- **网络**: 稳定的互联网连接

## 📦 安装方式

### 方法一：从 GitHub 安装（推荐）

```bash
# 1. 克隆项目
git clone https://github.com/jujubooom/Api-Finder.git

# 2. 进入项目目录
cd Api-Finder

# 3. 安装依赖
pip install -r requirements.txt

# 4. 验证安装
python main.py --version
```

### 方法二：下载压缩包

1. 访问 [GitHub Releases](https://github.com/jujubooom/Api-Finder/releases)
2. 下载最新版本的源码压缩包
3. 解压到本地目录
4. 按照方法一的步骤 3-4 继续安装

### 方法三：使用 pip 安装（开发中）

```bash
# 从 PyPI 安装（即将支持）
pip install api-finder

# 验证安装
api-finder --version
```

## 🔧 依赖管理

### 核心依赖

Api-Finder 的核心依赖包括：

```txt
requests>=2.28.0
beautifulsoup4>=4.11.0
lxml>=4.9.0
pyyaml>=6.0
colorama>=0.4.5
tqdm>=4.64.0
```

### 可选依赖

根据需要安装额外功能：

```bash
# Excel 输出支持
pip install openpyxl>=3.0.0

# 高级 HTML 解析
pip install html5lib>=1.1

# 性能优化
pip install ujson>=5.0.0

# 代理支持增强
pip install requests[socks]>=2.28.0
```

### 开发依赖

如果你想参与开发：

```bash
# 安装开发依赖
pip install -r requirements-dev.txt

# 包含测试、代码检查等工具
pytest>=7.0.0
black>=22.0.0
flake8>=5.0.0
mypy>=0.991
```

## ⚙️ 配置文件

### 配置文件位置

Api-Finder 使用 YAML 格式的配置文件：

```
Api-Finder/
├── config/
│   ├── rules.yaml          # 扫描规则配置
│   ├── settings.yaml       # 全局设置（可选）
│   └── user-agents.yaml    # User-Agent 配置
```

### 全局设置 (settings.yaml)

创建全局配置文件：

```yaml
# settings.yaml
default:
  timeout: 30                    # 默认超时时间（秒）
  delay: 1.0                    # 请求间隔（秒）
  max_retries: 3                # 最大重试次数
  output_format: "json"         # 默认输出格式
  
proxy:
  enabled: false                # 是否启用代理
  url: ""                      # 代理URL
  
user_agent:
  random: false                 # 是否随机User-Agent
  type: "desktop"              # 默认User-Agent类型
  
output:
  directory: "./results"        # 输出目录
  timestamp: true              # 是否在文件名中包含时间戳
  
logging:
  level: "INFO"                # 日志级别
  file: "./logs/api-finder.log" # 日志文件路径
```

### 扫描规则配置

查看和修改扫描规则：

```yaml
# rules.yaml
api_patterns:
  # RESTful API 模式
  - pattern: '\/api\/[a-zA-Z0-9_\-\/{}]+'
    confidence: 0.9
    description: "RESTful API endpoints"
    
  # GraphQL 端点
  - pattern: '\/graphql'
    confidence: 0.95
    description: "GraphQL endpoints"
    
  # WebSocket 连接
  - pattern: 'ws[s]?:\/\/[^\s"\'`]+'
    confidence: 0.8
    description: "WebSocket connections"

javascript_patterns:
  # fetch API 调用
  - pattern: 'fetch\s*\(\s*["\']([^"\']+)["\']'
    confidence: 0.85
    group: 1
    
  # axios 调用
  - pattern: 'axios\.[get|post|put|delete]+\s*\(\s*["\']([^"\']+)["\']'
    confidence: 0.9
    group: 1
```

## 🌐 网络配置

### 代理设置

#### HTTP 代理

```bash
# 命令行指定
python main.py -u https://example.com -p http://proxy:8080

# 带认证的代理
python main.py -u https://example.com -p http://user:pass@proxy:8080
```

#### SOCKS 代理

```bash
# SOCKS5 代理
python main.py -u https://example.com -p socks5://proxy:1080

# SOCKS4 代理
python main.py -u https://example.com -p socks4://proxy:1080
```

#### 环境变量配置

```bash
# 设置环境变量
export HTTP_PROXY=http://proxy:8080
export HTTPS_PROXY=http://proxy:8080
export SOCKS_PROXY=socks5://proxy:1080

# 运行 Api-Finder
python main.py -u https://example.com
```

### SSL/TLS 配置

```bash
# 忽略 SSL 证书验证（不推荐用于生产环境）
python main.py -u https://example.com --ignore-ssl

# 指定 CA 证书文件
python main.py -u https://example.com --ca-cert /path/to/cert.pem
```

## 📱 User-Agent 配置

### 预设 User-Agent

```bash
# 桌面浏览器
python main.py -u https://example.com -a desktop

# 移动设备
python main.py -u https://example.com -a phone

# 平板设备
python main.py -u https://example.com -a tablet

# 微信浏览器
python main.py -u https://example.com -a weixin

# 随机 User-Agent
python main.py -u https://example.com -r
```

### 自定义 User-Agent

```bash
# 指定自定义 User-Agent
python main.py -u https://example.com -a "Mozilla/5.0 (Custom Agent)"
```

### User-Agent 配置文件

编辑 `config/user-agents.yaml`：

```yaml
desktop:
  - "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  - "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
  
mobile:
  - "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15"
  - "Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0"
  
weixin:
  - "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 MicroMessenger/8.0.0"
```

## 📊 输出配置

### 输出目录设置

```bash
# 指定输出目录
python main.py -u https://example.com -o /path/to/output/results.json

# 使用相对路径
python main.py -u https://example.com -o ./results/scan_results.json
```

### 文件命名规则

```bash
# 自动添加时间戳
python main.py -u https://example.com -o results.json
# 输出: results_20250127_103000.json

# 自定义文件名
python main.py -u https://example.com -o "scan_$(date +%Y%m%d).json"
```

## 🔄 自动更新配置

### 规则更新

```bash
# 强制更新规则
python main.py -U

# 检查规则版本
python main.py --check-rules

# 禁用自动更新
python main.py -u https://example.com --no-update
```

### 更新源配置

在 `settings.yaml` 中配置：

```yaml
update:
  enabled: true
  source: "https://raw.githubusercontent.com/jujubooom/Api-Finder/main/config/rules.yaml"
  check_interval: 86400  # 24小时检查一次
  auto_update: false     # 是否自动更新
```

## 🐛 故障排除

### 常见问题

#### 1. 依赖安装失败

```bash
# 升级 pip
python -m pip install --upgrade pip

# 使用国内镜像源
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple/
```

#### 2. 网络连接问题

```bash
# 测试网络连接
python -c "import requests; print(requests.get('https://httpbin.org/ip').json())"

# 使用代理测试
python -c "import requests; print(requests.get('https://httpbin.org/ip', proxies={'http': 'http://proxy:8080'}).json())"
```

#### 3. 权限问题

```bash
# Linux/macOS 权限问题
sudo chown -R $USER:$USER Api-Finder/
chmod +x main.py

# Windows 权限问题
# 以管理员身份运行命令提示符
```

### 日志调试

```bash
# 启用详细日志
python main.py -u https://example.com -v

# 启用调试模式
python main.py -u https://example.com --debug

# 保存日志到文件
python main.py -u https://example.com -v > debug.log 2>&1
```

## ✅ 验证安装

运行以下命令验证安装是否成功：

```bash
# 检查版本
python main.py --version

# 运行测试扫描
python main.py -u https://httpbin.org/html -v

# 检查配置
python main.py --check-config
```

如果所有命令都能正常运行，说明安装配置成功！

## 🎯 下一步

安装配置完成后，你可以：

1. 📖 阅读 [基本使用指南](/guide/basic-usage)
2. 🔧 查看 [高级配置](/guide/advanced-config)
3. 💡 查看 [使用示例](/examples/)
4. 🛡️ 了解 [安全注意事项](/guide/security)