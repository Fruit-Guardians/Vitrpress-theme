# 📖 API 参考

本章节提供 Api-Finder 的完整 API 参考文档。

## 🚀 核心 API

### ApiScanner 类

主要的扫描器类，提供核心扫描功能。

```python
from api_finder import ApiScanner

class ApiScanner:
    def __init__(self, config: dict = None):
        """
        初始化 API 扫描器
        
        Args:
            config (dict): 配置字典
        """
        pass
    
    def scan(self, target: str, **kwargs) -> ScanResult:
        """
        执行 API 扫描
        
        Args:
            target (str): 目标 URL
            **kwargs: 扫描选项
            
        Returns:
            ScanResult: 扫描结果对象
        """
        pass
```

#### 初始化参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `config` | dict | None | 配置字典 |
| `timeout` | int | 30 | 请求超时时间（秒） |
| `max_retries` | int | 3 | 最大重试次数 |
| `user_agent` | str | 默认UA | 用户代理字符串 |

#### 扫描方法

```python
# 基本扫描
result = scanner.scan("https://example.com")

# 带参数扫描
result = scanner.scan(
    target="https://example.com",
    wordlist="custom.txt",
    threads=10,
    delay=1.0
)
```

### ScanResult 类

扫描结果容器类。

```python
class ScanResult:
    def __init__(self):
        self.endpoints = []      # 发现的端点列表
        self.statistics = {}     # 扫描统计信息
        self.errors = []         # 错误列表
        self.metadata = {}       # 元数据
    
    def to_dict(self) -> dict:
        """转换为字典格式"""
        pass
    
    def to_json(self, indent: int = 2) -> str:
        """转换为 JSON 格式"""
        pass
    
    def save(self, filename: str, format: str = "json"):
        """保存结果到文件"""
        pass
```

#### 结果属性

| 属性 | 类型 | 描述 |
|------|------|------|
| `endpoints` | List[Endpoint] | 发现的 API 端点 |
| `statistics` | dict | 扫描统计信息 |
| `errors` | List[Error] | 扫描过程中的错误 |
| `metadata` | dict | 扫描元数据 |

### Endpoint 类

API 端点信息类。

```python
class Endpoint:
    def __init__(self, url: str, method: str = "GET"):
        self.url = url           # 端点 URL
        self.method = method     # HTTP 方法
        self.status_code = None  # 响应状态码
        self.response_time = 0   # 响应时间
        self.content_length = 0  # 内容长度
        self.headers = {}        # 响应头
        self.parameters = []     # 参数列表
        self.description = ""    # 端点描述
```

## 🔧 配置 API

### ConfigManager 类

配置管理器类。

```python
from api_finder.config import ConfigManager

class ConfigManager:
    def __init__(self, config_file: str = None):
        """
        初始化配置管理器
        
        Args:
            config_file (str): 配置文件路径
        """
        pass
    
    def load_config(self, file_path: str) -> dict:
        """加载配置文件"""
        pass
    
    def save_config(self, config: dict, file_path: str):
        """保存配置到文件"""
        pass
    
    def get(self, key: str, default=None):
        """获取配置值"""
        pass
    
    def set(self, key: str, value):
        """设置配置值"""
        pass
```

#### 配置方法

```python
# 创建配置管理器
config = ConfigManager("config.yaml")

# 获取配置值
timeout = config.get("network.timeout", 30)
threads = config.get("scanner.threads", 5)

# 设置配置值
config.set("scanner.delay", 2.0)
config.set("output.format", "json")

# 保存配置
config.save_config(config.data, "new_config.yaml")
```

## 🌐 网络 API

### HttpClient 类

HTTP 客户端类。

```python
from api_finder.network import HttpClient

class HttpClient:
    def __init__(self, **kwargs):
        """
        初始化 HTTP 客户端
        
        Args:
            timeout (int): 超时时间
            verify_ssl (bool): 是否验证 SSL
            proxy (str): 代理设置
            headers (dict): 默认请求头
        """
        pass
    
    def get(self, url: str, **kwargs) -> Response:
        """发送 GET 请求"""
        pass
    
    def post(self, url: str, data=None, **kwargs) -> Response:
        """发送 POST 请求"""
        pass
    
    def request(self, method: str, url: str, **kwargs) -> Response:
        """发送自定义请求"""
        pass
```

#### 请求方法

```python
# 创建客户端
client = HttpClient(
    timeout=30,
    verify_ssl=True,
    proxy="http://proxy:8080"
)

# 发送请求
response = client.get("https://example.com/api/users")
response = client.post("https://example.com/api/login", 
                      data={"username": "test", "password": "test"})

# 自定义请求
response = client.request("PUT", "https://example.com/api/users/1",
                         json={"name": "Updated Name"})
```

### Response 类

HTTP 响应类。

```python
class Response:
    def __init__(self, response):
        self.status_code = response.status_code
        self.headers = response.headers
        self.content = response.content
        self.text = response.text
        self.url = response.url
        self.elapsed = response.elapsed
    
    def json(self) -> dict:
        """解析 JSON 响应"""
        pass
    
    def is_success(self) -> bool:
        """检查是否成功响应"""
        pass
```

## 📝 输出 API

### OutputFormatter 类

输出格式化器基类。

```python
from api_finder.output import OutputFormatter

class OutputFormatter:
    def format(self, result: ScanResult) -> str:
        """格式化扫描结果"""
        raise NotImplementedError
    
    def save(self, result: ScanResult, filename: str):
        """保存格式化结果"""
        pass
```

### JsonFormatter 类

JSON 格式化器。

```python
from api_finder.output import JsonFormatter

class JsonFormatter(OutputFormatter):
    def __init__(self, indent: int = 2, sort_keys: bool = True):
        self.indent = indent
        self.sort_keys = sort_keys
    
    def format(self, result: ScanResult) -> str:
        """格式化为 JSON"""
        pass
```

### HtmlFormatter 类

HTML 格式化器。

```python
from api_finder.output import HtmlFormatter

class HtmlFormatter(OutputFormatter):
    def __init__(self, template: str = None, theme: str = "default"):
        self.template = template
        self.theme = theme
    
    def format(self, result: ScanResult) -> str:
        """格式化为 HTML"""
        pass
```

#### 使用示例

```python
# JSON 输出
json_formatter = JsonFormatter(indent=4)
json_output = json_formatter.format(scan_result)
json_formatter.save(scan_result, "results.json")

# HTML 输出
html_formatter = HtmlFormatter(theme="dark")
html_output = html_formatter.format(scan_result)
html_formatter.save(scan_result, "report.html")
```

## 🔍 扫描器 API

### WordlistScanner 类

字典扫描器。

```python
from api_finder.scanners import WordlistScanner

class WordlistScanner:
    def __init__(self, wordlist: str, **kwargs):
        """
        初始化字典扫描器
        
        Args:
            wordlist (str): 字典文件路径
            **kwargs: 扫描选项
        """
        pass
    
    def scan(self, target: str) -> List[Endpoint]:
        """执行字典扫描"""
        pass
```

### FuzzScanner 类

模糊测试扫描器。

```python
from api_finder.scanners import FuzzScanner

class FuzzScanner:
    def __init__(self, patterns: List[str], **kwargs):
        """
        初始化模糊测试扫描器
        
        Args:
            patterns (List[str]): 模糊测试模式
            **kwargs: 扫描选项
        """
        pass
    
    def scan(self, target: str) -> List[Endpoint]:
        """执行模糊测试扫描"""
        pass
```

### CrawlerScanner 类

爬虫扫描器。

```python
from api_finder.scanners import CrawlerScanner

class CrawlerScanner:
    def __init__(self, max_depth: int = 3, **kwargs):
        """
        初始化爬虫扫描器
        
        Args:
            max_depth (int): 最大爬取深度
            **kwargs: 扫描选项
        """
        pass
    
    def scan(self, target: str) -> List[Endpoint]:
        """执行爬虫扫描"""
        pass
```

## 🔌 插件 API

### Plugin 基类

插件基类。

```python
from api_finder.plugins import Plugin

class Plugin:
    def __init__(self, name: str, version: str = "1.0.0"):
        self.name = name
        self.version = version
        self.enabled = True
    
    def initialize(self, config: dict):
        """初始化插件"""
        pass
    
    def pre_scan(self, target: str, options: dict):
        """扫描前钩子"""
        pass
    
    def post_scan(self, result: ScanResult):
        """扫描后钩子"""
        pass
    
    def process_endpoint(self, endpoint: Endpoint):
        """处理端点钩子"""
        pass
```

### PluginManager 类

插件管理器。

```python
from api_finder.plugins import PluginManager

class PluginManager:
    def __init__(self):
        self.plugins = {}
    
    def load_plugin(self, plugin_path: str):
        """加载插件"""
        pass
    
    def enable_plugin(self, plugin_name: str):
        """启用插件"""
        pass
    
    def disable_plugin(self, plugin_name: str):
        """禁用插件"""
        pass
    
    def execute_hook(self, hook_name: str, *args, **kwargs):
        """执行钩子"""
        pass
```

#### 插件示例

```python
# 自定义插件
class CustomPlugin(Plugin):
    def __init__(self):
        super().__init__("custom_plugin", "1.0.0")
    
    def pre_scan(self, target: str, options: dict):
        print(f"开始扫描: {target}")
    
    def post_scan(self, result: ScanResult):
        print(f"扫描完成，发现 {len(result.endpoints)} 个端点")

# 使用插件
plugin_manager = PluginManager()
plugin_manager.load_plugin("plugins/custom_plugin.py")
plugin_manager.enable_plugin("custom_plugin")
```

## 🛠️ 工具 API

### UrlUtils 类

URL 工具类。

```python
from api_finder.utils import UrlUtils

class UrlUtils:
    @staticmethod
    def normalize_url(url: str) -> str:
        """标准化 URL"""
        pass
    
    @staticmethod
    def join_url(base: str, path: str) -> str:
        """拼接 URL"""
        pass
    
    @staticmethod
    def parse_url(url: str) -> dict:
        """解析 URL"""
        pass
    
    @staticmethod
    def is_valid_url(url: str) -> bool:
        """验证 URL 有效性"""
        pass
```

### FileUtils 类

文件工具类。

```python
from api_finder.utils import FileUtils

class FileUtils:
    @staticmethod
    def read_wordlist(file_path: str) -> List[str]:
        """读取字典文件"""
        pass
    
    @staticmethod
    def save_json(data: dict, file_path: str):
        """保存 JSON 文件"""
        pass
    
    @staticmethod
    def load_json(file_path: str) -> dict:
        """加载 JSON 文件"""
        pass
    
    @staticmethod
    def ensure_dir(dir_path: str):
        """确保目录存在"""
        pass
```

## 📊 统计 API

### Statistics 类

统计信息类。

```python
from api_finder.stats import Statistics

class Statistics:
    def __init__(self):
        self.start_time = None
        self.end_time = None
        self.total_requests = 0
        self.successful_requests = 0
        self.failed_requests = 0
        self.endpoints_found = 0
        self.response_times = []
    
    def start_timer(self):
        """开始计时"""
        pass
    
    def stop_timer(self):
        """停止计时"""
        pass
    
    def add_request(self, success: bool, response_time: float):
        """添加请求统计"""
        pass
    
    def get_summary(self) -> dict:
        """获取统计摘要"""
        pass
```

## 🚨 异常 API

### 自定义异常

```python
from api_finder.exceptions import (
    ApiFinderException,
    ConfigurationError,
    NetworkError,
    ScannerError,
    PluginError
)

class ApiFinderException(Exception):
    """基础异常类"""
    pass

class ConfigurationError(ApiFinderException):
    """配置错误"""
    pass

class NetworkError(ApiFinderException):
    """网络错误"""
    pass

class ScannerError(ApiFinderException):
    """扫描器错误"""
    pass

class PluginError(ApiFinderException):
    """插件错误"""
    pass
```

## 📚 使用示例

### 完整示例

```python
from api_finder import ApiScanner
from api_finder.config import ConfigManager
from api_finder.output import JsonFormatter, HtmlFormatter
from api_finder.plugins import PluginManager

# 1. 配置管理
config = ConfigManager("config.yaml")
config.set("scanner.threads", 10)
config.set("scanner.delay", 1.0)

# 2. 插件管理
plugin_manager = PluginManager()
plugin_manager.load_plugin("plugins/auth_plugin.py")
plugin_manager.enable_plugin("auth_plugin")

# 3. 创建扫描器
scanner = ApiScanner(config=config.data)

# 4. 执行扫描
result = scanner.scan(
    target="https://api.example.com",
    wordlist="wordlists/api_endpoints.txt",
    threads=10,
    delay=1.0
)

# 5. 处理结果
print(f"发现 {len(result.endpoints)} 个 API 端点")

# 6. 输出结果
json_formatter = JsonFormatter(indent=2)
json_formatter.save(result, "results.json")

html_formatter = HtmlFormatter(theme="dark")
html_formatter.save(result, "report.html")

# 7. 统计信息
stats = result.statistics
print(f"扫描耗时: {stats['duration']} 秒")
print(f"成功请求: {stats['successful_requests']}")
print(f"失败请求: {stats['failed_requests']}")
```

## 📖 相关文档

- [基本使用](/guide/basic-usage) - 基础功能介绍
- [高级配置](/guide/advanced-config) - 高级功能配置
- [插件开发](/guide/plugin-development) - 插件开发指南
- [常见问题](/guide/faq) - 常见问题解答