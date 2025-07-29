# 🔧 高级配置

本章节介绍 Api-Finder 的高级配置选项和自定义功能。

## ⚙️ 配置文件详解

### 全局配置 (config/settings.yaml)

```yaml
# 全局设置
default:
  timeout: 30                    # 默认超时时间（秒）
  delay: 1.0                    # 请求间隔（秒）
  max_retries: 3                # 最大重试次数
  output_format: "json"         # 默认输出格式
  threads: 5                    # 并发线程数
  
# 代理配置
proxy:
  enabled: false                # 是否启用代理
  url: ""                      # 代理URL
  rotation: false              # 是否轮换代理
  
# User-Agent配置
user_agent:
  random: false                 # 是否随机User-Agent
  type: "desktop"              # 默认类型
  custom: ""                   # 自定义User-Agent
  
# 输出配置
output:
  directory: "./results"        # 输出目录
  timestamp: true              # 文件名包含时间戳
  compression: false           # 是否压缩输出
  
# 日志配置
logging:
  level: "INFO"                # 日志级别
  file: "./logs/api-finder.log" # 日志文件
  max_size: "10MB"             # 最大日志文件大小
  backup_count: 5              # 保留的日志文件数量
```

### 扫描规则配置 (config/rules.yaml)

```yaml
# API模式规则
api_patterns:
  # RESTful API
  - pattern: '\/api\/[a-zA-Z0-9_\-\/{}]+'
    confidence: 0.9
    description: "RESTful API endpoints"
    methods: ["GET", "POST", "PUT", "DELETE"]
    
  # GraphQL
  - pattern: '\/graphql'
    confidence: 0.95
    description: "GraphQL endpoints"
    methods: ["POST"]
    
  # WebSocket
  - pattern: 'ws[s]?:\/\/[^\s"\'`]+'
    confidence: 0.8
    description: "WebSocket connections"
    
# JavaScript模式规则
javascript_patterns:
  # fetch API
  - pattern: 'fetch\s*\(\s*["\']([^"\']+)["\']'
    confidence: 0.85
    group: 1
    description: "Fetch API calls"
    
  # axios
  - pattern: 'axios\.[a-z]+\s*\(\s*["\']([^"\']+)["\']'
    confidence: 0.9
    group: 1
    description: "Axios HTTP calls"
    
  # jQuery AJAX
  - pattern: '\$\.ajax\s*\(\s*{\s*url\s*:\s*["\']([^"\']+)["\']'
    confidence: 0.8
    group: 1
    description: "jQuery AJAX calls"

# 排除规则
exclude_patterns:
  - pattern: '\.css$'
    description: "CSS files"
  - pattern: '\.png$|\.jpg$|\.gif$|\.svg$'
    description: "Image files"
  - pattern: 'data:image'
    description: "Data URLs"
```

## 🎯 自定义扫描规则

### 添加新的API模式

```yaml
# 在 rules.yaml 中添加
api_patterns:
  # 自定义API模式
  - pattern: '\/v[0-9]+\/[a-zA-Z0-9_\-\/]+'
    confidence: 0.85
    description: "Versioned API endpoints"
    methods: ["GET", "POST", "PUT", "DELETE"]
    
  # 微服务API
  - pattern: '\/microservice\/[a-zA-Z0-9_\-\/]+'
    confidence: 0.8
    description: "Microservice endpoints"
```

### 自定义JavaScript模式

```yaml
javascript_patterns:
  # 自定义框架API调用
  - pattern: 'customAPI\.[a-z]+\s*\(\s*["\']([^"\']+)["\']'
    confidence: 0.7
    group: 1
    description: "Custom API framework calls"
    
  # WebSocket连接
  - pattern: 'new\s+WebSocket\s*\(\s*["\']([^"\']+)["\']'
    confidence: 0.9
    group: 1
    description: "WebSocket connections"
```

## 🔌 插件系统

### 创建自定义插件

```python
# plugins/custom_analyzer.py
from api_finder.core.plugin import BasePlugin

class CustomAnalyzer(BasePlugin):
    def __init__(self):
        super().__init__()
        self.name = "Custom Analyzer"
        self.version = "1.0.0"
    
    def analyze(self, content, url):
        """自定义分析逻辑"""
        apis = []
        # 实现你的分析逻辑
        return apis
    
    def is_applicable(self, content_type):
        """判断插件是否适用"""
        return content_type == "application/javascript"
```

### 注册插件

```python
# config/plugins.py
from plugins.custom_analyzer import CustomAnalyzer

PLUGINS = [
    CustomAnalyzer(),
    # 其他插件...
]
```

## 🌐 高级网络配置

### 代理轮换

```yaml
# config/proxies.yaml
proxies:
  - url: "http://proxy1:8080"
    username: "user1"
    password: "pass1"
  - url: "http://proxy2:8080"
    username: "user2"
    password: "pass2"
  - url: "socks5://proxy3:1080"

rotation:
  enabled: true
  strategy: "round_robin"  # round_robin, random, failover
```

### SSL/TLS 配置

```yaml
ssl:
  verify: true              # 验证SSL证书
  cert_file: ""            # 客户端证书文件
  key_file: ""             # 客户端私钥文件
  ca_bundle: ""            # CA证书包
```

### 请求头自定义

```yaml
headers:
  default:
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    "Accept-Language": "en-US,en;q=0.5"
    "Accept-Encoding": "gzip, deflate"
    "Connection": "keep-alive"
    "Upgrade-Insecure-Requests": "1"
  
  custom:
    "X-Requested-With": "XMLHttpRequest"
    "X-Custom-Header": "CustomValue"
```

## 📊 输出自定义

### 自定义输出格式

```python
# formatters/custom_formatter.py
from api_finder.core.formatter import BaseFormatter

class CustomFormatter(BaseFormatter):
    def format(self, apis, scan_info):
        """自定义输出格式"""
        output = {
            "custom_format": "v1.0",
            "scan_time": scan_info.timestamp,
            "endpoints": []
        }
        
        for api in apis:
            output["endpoints"].append({
                "url": api.endpoint,
                "method": api.method,
                "confidence": api.confidence
            })
        
        return output
```

### 输出过滤器

```yaml
# config/filters.yaml
filters:
  # 置信度过滤
  confidence:
    min: 0.7
    max: 1.0
  
  # 方法过滤
  methods:
    include: ["GET", "POST", "PUT", "DELETE"]
    exclude: ["OPTIONS", "HEAD"]
  
  # 路径过滤
  paths:
    include_patterns:
      - "^/api/"
      - "^/v[0-9]+/"
    exclude_patterns:
      - "\.css$"
      - "\.js$"
      - "\.png$"
```

## 🔍 调试和监控

### 调试模式

```bash
# 启用调试模式
python main.py -u https://example.com --debug

# 保存调试信息
python main.py -u https://example.com --debug --save-debug debug_info.json
```

### 性能监控

```yaml
# config/monitoring.yaml
monitoring:
  enabled: true
  metrics:
    - "response_time"
    - "memory_usage"
    - "api_count"
    - "error_rate"
  
  export:
    format: "prometheus"
    endpoint: "http://localhost:9090/metrics"
```

### 日志配置

```yaml
logging:
  version: 1
  formatters:
    default:
      format: '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
  handlers:
    console:
      class: logging.StreamHandler
      level: INFO
      formatter: default
    file:
      class: logging.handlers.RotatingFileHandler
      level: DEBUG
      formatter: default
      filename: logs/api-finder.log
      maxBytes: 10485760
      backupCount: 5
  loggers:
    api_finder:
      level: DEBUG
      handlers: [console, file]
```

## 🚀 性能优化

### 并发配置

```yaml
performance:
  threads: 10               # 并发线程数
  connection_pool_size: 20  # 连接池大小
  max_connections: 100      # 最大连接数
  keep_alive: true         # 保持连接
```

### 缓存配置

```yaml
cache:
  enabled: true
  type: "memory"           # memory, redis, file
  ttl: 3600               # 缓存时间（秒）
  max_size: 1000          # 最大缓存条目数
```

### 内存优化

```yaml
memory:
  max_file_size: "50MB"    # 最大处理文件大小
  chunk_size: 8192        # 读取块大小
  gc_threshold: 1000      # 垃圾回收阈值
```

## 📚 相关资源

- [基本使用](/guide/basic-usage) - 基础功能介绍
- [安装配置](/guide/installation) - 安装指南
- [使用示例](/examples/) - 实际应用案例
- [API参考](/api/) - 开发者文档
- [安全指南](/guide/security) - 安全最佳实践