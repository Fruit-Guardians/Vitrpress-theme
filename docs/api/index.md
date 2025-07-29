# 🔧 API 参考

Api-Finder 提供了完整的 Python API，支持程序化使用和集成。

## 📋 目录

- [核心 API](#核心-api)
- [配置 API](#配置-api)
- [网络 API](#网络-api)
- [输出 API](#输出-api)
- [扫描器 API](#扫描器-api)
- [插件 API](#插件-api)
- [工具 API](#工具-api)
- [统计 API](#统计-api)
- [异常处理](#异常处理)

## 🎯 核心 API

### ApiScanner

主要的扫描器类，提供 API 发现功能。

```python
class ApiScanner:
    """API 扫描器主类"""
    
    def __init__(self, config: Config = None):
        """
        初始化扫描器
        
        Args:
            config: 配置对象，如果为 None 则使用默认配置
        """
        pass
    
    def scan(self, target: str, **kwargs) -> ScanResult:
        """
        执行 API 扫描
        
        Args:
            target: 目标 URL
            **kwargs: 额外的扫描参数
            
        Returns:
            ScanResult: 扫描结果对象
            
        Raises:
            ScanError: 扫描过程中的错误
            ConfigError: 配置错误
        """
        pass
    
    def scan_async(self, target: str, **kwargs) -> AsyncIterator[Endpoint]:
        """
        异步扫描，实时返回发现的端点
        
        Args:
            target: 目标 URL
            **kwargs: 额外的扫描参数
            
        Yields:
            Endpoint: 发现的端点
        """
        pass
    
    def add_plugin(self, plugin: Plugin) -> None:
        """
        添加插件
        
        Args:
            plugin: 插件实例
        """
        pass
    
    def remove_plugin(self, plugin_name: str) -> None:
        """
        移除插件
        
        Args:
            plugin_name: 插件名称
        """
        pass
    
    def get_statistics(self) -> Statistics:
        """
        获取扫描统计信息
        
        Returns:
            Statistics: 统计信息对象
        """
        pass
```

#### 使用示例

```python
from api_finder import ApiScanner
from api_finder.config import Config

# 基本使用
scanner = ApiScanner()
results = scanner.scan("https://api.example.com")

# 使用自定义配置
config = Config({
    'scanner': {
        'threads': 20,
        'delay': 0.5,
        'timeout': 30
    }
})
scanner = ApiScanner(config)
results = scanner.scan("https://api.example.com")

# 异步扫描
async for endpoint in scanner.scan_async("https://api.example.com"):
    print(f"发现端点: {endpoint.url}")
```

### ScanResult

扫描结果容器类。

```python
class ScanResult:
    """扫描结果类"""
    
    def __init__(self):
        self.target: str = ""
        self.start_time: datetime = None
        self.end_time: datetime = None
        self.endpoints: List[Endpoint] = []
        self.statistics: Statistics = None
        self.errors: List[ScanError] = []
    
    @property
    def duration(self) -> float:
        """扫描持续时间（秒）"""
        pass
    
    @property
    def total_endpoints(self) -> int:
        """发现的端点总数"""
        pass
    
    def filter_by_status(self, status_codes: List[int]) -> List[Endpoint]:
        """
        按状态码过滤端点
        
        Args:
            status_codes: 状态码列表
            
        Returns:
            List[Endpoint]: 过滤后的端点列表
        """
        pass
    
    def filter_by_method(self, methods: List[str]) -> List[Endpoint]:
        """
        按 HTTP 方法过滤端点
        
        Args:
            methods: HTTP 方法列表
            
        Returns:
            List[Endpoint]: 过滤后的端点列表
        """
        pass
    
    def to_dict(self) -> dict:
        """转换为字典格式"""
        pass
    
    def to_json(self, pretty: bool = False) -> str:
        """转换为 JSON 格式"""
        pass
```

### Endpoint

API 端点信息类。

```python
class Endpoint:
    """API 端点类"""
    
    def __init__(self, url: str, method: str = "GET"):
        self.url: str = url
        self.method: str = method
        self.status_code: int = None
        self.response_time: float = None
        self.content_length: int = None
        self.content_type: str = None
        self.headers: dict = {}
        self.response_body: str = None
        self.discovered_at: datetime = None
        self.metadata: dict = {}
    
    @property
    def is_successful(self) -> bool:
        """是否为成功响应（2xx 状态码）"""
        pass
    
    @property
    def is_api_endpoint(self) -> bool:
        """是否为 API 端点（基于内容类型判断）"""
        pass
    
    def to_dict(self) -> dict:
        """转换为字典格式"""
        pass
    
    def __str__(self) -> str:
        return f"{self.method} {self.url} -> {self.status_code}"
```

## ⚙️ 配置 API

### Config

配置管理类。

```python
class Config:
    """配置管理类"""
    
    def __init__(self, config_dict: dict = None):
        """
        初始化配置
        
        Args:
            config_dict: 配置字典
        """
        pass
    
    @classmethod
    def from_file(cls, filepath: str) -> 'Config':
        """
        从文件加载配置
        
        Args:
            filepath: 配置文件路径
            
        Returns:
            Config: 配置对象
        """
        pass
    
    @classmethod
    def from_dict(cls, config_dict: dict) -> 'Config':
        """
        从字典创建配置
        
        Args:
            config_dict: 配置字典
            
        Returns:
            Config: 配置对象
        """
        pass
    
    def get(self, key: str, default=None):
        """
        获取配置值
        
        Args:
            key: 配置键（支持点号分隔的嵌套键）
            default: 默认值
            
        Returns:
            配置值
        """
        pass
    
    def set(self, key: str, value) -> None:
        """
        设置配置值
        
        Args:
            key: 配置键
            value: 配置值
        """
        pass
    
    def update(self, config_dict: dict) -> None:
        """
        更新配置
        
        Args:
            config_dict: 配置字典
        """
        pass
    
    def validate(self) -> List[str]:
        """
        验证配置
        
        Returns:
            List[str]: 验证错误列表
        """
        pass
    
    def to_dict(self) -> dict:
        """转换为字典"""
        pass
    
    def save(self, filepath: str) -> None:
        """
        保存配置到文件
        
        Args:
            filepath: 文件路径
        """
        pass
```

#### 使用示例

```python
from api_finder.config import Config

# 从文件加载
config = Config.from_file("config.yaml")

# 从字典创建
config = Config.from_dict({
    'scanner': {
        'threads': 10,
        'delay': 1.0
    }
})

# 获取配置值
threads = config.get('scanner.threads', 5)

# 设置配置值
config.set('scanner.timeout', 30)

# 验证配置
errors = config.validate()
if errors:
    print("配置错误:", errors)
```

## 🌐 网络 API

### HttpClient

HTTP 客户端类。

```python
class HttpClient:
    """HTTP 客户端"""
    
    def __init__(self, config: Config = None):
        """
        初始化 HTTP 客户端
        
        Args:
            config: 配置对象
        """
        pass
    
    def request(self, method: str, url: str, **kwargs) -> Response:
        """
        发送 HTTP 请求
        
        Args:
            method: HTTP 方法
            url: 请求 URL
            **kwargs: 额外的请求参数
            
        Returns:
            Response: 响应对象
        """
        pass
    
    def get(self, url: str, **kwargs) -> Response:
        """发送 GET 请求"""
        pass
    
    def post(self, url: str, **kwargs) -> Response:
        """发送 POST 请求"""
        pass
    
    def put(self, url: str, **kwargs) -> Response:
        """发送 PUT 请求"""
        pass
    
    def delete(self, url: str, **kwargs) -> Response:
        """发送 DELETE 请求"""
        pass
    
    def set_proxy(self, proxy: str) -> None:
        """
        设置代理
        
        Args:
            proxy: 代理地址
        """
        pass
    
    def set_headers(self, headers: dict) -> None:
        """
        设置默认请求头
        
        Args:
            headers: 请求头字典
        """
        pass
    
    def set_timeout(self, timeout: float) -> None:
        """
        设置超时时间
        
        Args:
            timeout: 超时时间（秒）
        """
        pass
```

### Response

HTTP 响应类。

```python
class Response:
    """HTTP 响应类"""
    
    def __init__(self, status_code: int, headers: dict, content: bytes):
        self.status_code: int = status_code
        self.headers: dict = headers
        self.content: bytes = content
        self.response_time: float = None
        self.url: str = None
    
    @property
    def text(self) -> str:
        """响应文本内容"""
        pass
    
    @property
    def json(self) -> dict:
        """响应 JSON 内容"""
        pass
    
    @property
    def content_type(self) -> str:
        """内容类型"""
        pass
    
    @property
    def content_length(self) -> int:
        """内容长度"""
        pass
    
    @property
    def is_successful(self) -> bool:
        """是否为成功响应"""
        pass
    
    def to_dict(self) -> dict:
        """转换为字典"""
        pass
```

## 📤 输出 API

### OutputFormatter

输出格式器基类。

```python
class OutputFormatter:
    """输出格式器基类"""
    
    def format(self, results: ScanResult) -> str:
        """
        格式化扫描结果
        
        Args:
            results: 扫描结果
            
        Returns:
            str: 格式化后的内容
        """
        raise NotImplementedError
    
    def save(self, content: str, filepath: str) -> None:
        """
        保存内容到文件
        
        Args:
            content: 内容
            filepath: 文件路径
        """
        pass
```

### JsonFormatter

JSON 格式器。

```python
class JsonFormatter(OutputFormatter):
    """JSON 格式器"""
    
    def __init__(self, pretty: bool = False, indent: int = 2):
        """
        初始化 JSON 格式器
        
        Args:
            pretty: 是否美化输出
            indent: 缩进空格数
        """
        pass
    
    def format(self, results: ScanResult) -> str:
        """格式化为 JSON"""
        pass
```

### HtmlFormatter

HTML 格式器。

```python
class HtmlFormatter(OutputFormatter):
    """HTML 格式器"""
    
    def __init__(self, template: str = "default", theme: str = "light"):
        """
        初始化 HTML 格式器
        
        Args:
            template: 模板名称
            theme: 主题名称
        """
        pass
    
    def format(self, results: ScanResult) -> str:
        """格式化为 HTML"""
        pass
    
    def set_template(self, template: str) -> None:
        """设置模板"""
        pass
```

### CsvFormatter

CSV 格式器。

```python
class CsvFormatter(OutputFormatter):
    """CSV 格式器"""
    
    def __init__(self, delimiter: str = ",", include_headers: bool = True):
        """
        初始化 CSV 格式器
        
        Args:
            delimiter: 分隔符
            include_headers: 是否包含表头
        """
        pass
    
    def format(self, results: ScanResult) -> str:
        """格式化为 CSV"""
        pass
```

## 🔍 扫描器 API

### WordlistScanner

字典扫描器。

```python
class WordlistScanner:
    """字典扫描器"""
    
    def __init__(self, wordlist: List[str], config: Config = None):
        """
        初始化字典扫描器
        
        Args:
            wordlist: 字典列表
            config: 配置对象
        """
        pass
    
    def scan(self, target: str) -> Iterator[Endpoint]:
        """
        执行字典扫描
        
        Args:
            target: 目标 URL
            
        Yields:
            Endpoint: 发现的端点
        """
        pass
    
    def load_wordlist(self, filepath: str) -> None:
        """
        加载字典文件
        
        Args:
            filepath: 字典文件路径
        """
        pass
```

### FuzzScanner

模糊扫描器。

```python
class FuzzScanner:
    """模糊扫描器"""
    
    def __init__(self, patterns: List[str], config: Config = None):
        """
        初始化模糊扫描器
        
        Args:
            patterns: 模糊模式列表
            config: 配置对象
        """
        pass
    
    def scan(self, target: str) -> Iterator[Endpoint]:
        """
        执行模糊扫描
        
        Args:
            target: 目标 URL
            
        Yields:
            Endpoint: 发现的端点
        """
        pass
    
    def add_pattern(self, pattern: str) -> None:
        """
        添加模糊模式
        
        Args:
            pattern: 模糊模式
        """
        pass
```

### CrawlerScanner

爬虫扫描器。

```python
class CrawlerScanner:
    """爬虫扫描器"""
    
    def __init__(self, config: Config = None):
        """
        初始化爬虫扫描器
        
        Args:
            config: 配置对象
        """
        pass
    
    def scan(self, target: str, max_depth: int = 3) -> Iterator[Endpoint]:
        """
        执行爬虫扫描
        
        Args:
            target: 目标 URL
            max_depth: 最大爬取深度
            
        Yields:
            Endpoint: 发现的端点
        """
        pass
    
    def set_max_depth(self, depth: int) -> None:
        """
        设置最大爬取深度
        
        Args:
            depth: 深度值
        """
        pass
```

## 🔌 插件 API

### Plugin

插件基类。

```python
class Plugin:
    """插件基类"""
    
    def __init__(self, name: str):
        """
        初始化插件
        
        Args:
            name: 插件名称
        """
        self.name = name
        self.enabled = True
    
    def on_scan_start(self, target: str) -> None:
        """扫描开始时调用"""
        pass
    
    def on_scan_end(self, results: ScanResult) -> None:
        """扫描结束时调用"""
        pass
    
    def on_endpoint_found(self, endpoint: Endpoint) -> Endpoint:
        """
        发现端点时调用
        
        Args:
            endpoint: 发现的端点
            
        Returns:
            Endpoint: 处理后的端点
        """
        return endpoint
    
    def on_request_sent(self, request: dict) -> dict:
        """
        发送请求前调用
        
        Args:
            request: 请求信息
            
        Returns:
            dict: 处理后的请求信息
        """
        return request
    
    def on_response_received(self, response: Response) -> Response:
        """
        接收响应后调用
        
        Args:
            response: 响应对象
            
        Returns:
            Response: 处理后的响应对象
        """
        return response
```

### PluginManager

插件管理器。

```python
class PluginManager:
    """插件管理器"""
    
    def __init__(self):
        self.plugins: List[Plugin] = []
    
    def register(self, plugin: Plugin) -> None:
        """
        注册插件
        
        Args:
            plugin: 插件实例
        """
        pass
    
    def unregister(self, plugin_name: str) -> None:
        """
        注销插件
        
        Args:
            plugin_name: 插件名称
        """
        pass
    
    def get_plugin(self, name: str) -> Plugin:
        """
        获取插件
        
        Args:
            name: 插件名称
            
        Returns:
            Plugin: 插件实例
        """
        pass
    
    def list_plugins(self) -> List[str]:
        """
        列出所有插件
        
        Returns:
            List[str]: 插件名称列表
        """
        pass
    
    def enable_plugin(self, name: str) -> None:
        """启用插件"""
        pass
    
    def disable_plugin(self, name: str) -> None:
        """禁用插件"""
        pass
```

## 🛠️ 工具 API

### UrlUtils

URL 工具类。

```python
class UrlUtils:
    """URL 工具类"""
    
    @staticmethod
    def normalize(url: str) -> str:
        """
        标准化 URL
        
        Args:
            url: 原始 URL
            
        Returns:
            str: 标准化后的 URL
        """
        pass
    
    @staticmethod
    def join(base: str, path: str) -> str:
        """
        连接 URL 路径
        
        Args:
            base: 基础 URL
            path: 路径
            
        Returns:
            str: 完整 URL
        """
        pass
    
    @staticmethod
    def parse(url: str) -> dict:
        """
        解析 URL
        
        Args:
            url: URL 字符串
            
        Returns:
            dict: URL 组件字典
        """
        pass
    
    @staticmethod
    def is_valid(url: str) -> bool:
        """
        验证 URL 是否有效
        
        Args:
            url: URL 字符串
            
        Returns:
            bool: 是否有效
        """
        pass
```

### FileUtils

文件工具类。

```python
class FileUtils:
    """文件工具类"""
    
    @staticmethod
    def read_lines(filepath: str) -> List[str]:
        """
        读取文件行
        
        Args:
            filepath: 文件路径
            
        Returns:
            List[str]: 行列表
        """
        pass
    
    @staticmethod
    def write_lines(filepath: str, lines: List[str]) -> None:
        """
        写入文件行
        
        Args:
            filepath: 文件路径
            lines: 行列表
        """
        pass
    
    @staticmethod
    def ensure_dir(dirpath: str) -> None:
        """
        确保目录存在
        
        Args:
            dirpath: 目录路径
        """
        pass
    
    @staticmethod
    def get_extension(filepath: str) -> str:
        """
        获取文件扩展名
        
        Args:
            filepath: 文件路径
            
        Returns:
            str: 扩展名
        """
        pass
```

## 📊 统计 API

### Statistics

统计信息类。

```python
class Statistics:
    """统计信息类"""
    
    def __init__(self):
        self.total_requests: int = 0
        self.successful_requests: int = 0
        self.failed_requests: int = 0
        self.status_codes: dict = {}
        self.response_times: List[float] = []
        self.content_types: dict = {}
        self.start_time: datetime = None
        self.end_time: datetime = None
    
    @property
    def duration(self) -> float:
        """扫描持续时间"""
        pass
    
    @property
    def success_rate(self) -> float:
        """成功率"""
        pass
    
    @property
    def avg_response_time(self) -> float:
        """平均响应时间"""
        pass
    
    @property
    def requests_per_second(self) -> float:
        """每秒请求数"""
        pass
    
    def add_request(self, endpoint: Endpoint) -> None:
        """
        添加请求统计
        
        Args:
            endpoint: 端点信息
        """
        pass
    
    def to_dict(self) -> dict:
        """转换为字典"""
        pass
```

## ❌ 异常处理

### 自定义异常

```python
class ApiFinderError(Exception):
    """Api-Finder 基础异常"""
    pass

class ConfigError(ApiFinderError):
    """配置错误"""
    pass

class ScanError(ApiFinderError):
    """扫描错误"""
    pass

class NetworkError(ApiFinderError):
    """网络错误"""
    pass

class PluginError(ApiFinderError):
    """插件错误"""
    pass

class OutputError(ApiFinderError):
    """输出错误"""
    pass
```

### 异常处理示例

```python
from api_finder import ApiScanner
from api_finder.exceptions import ScanError, ConfigError

try:
    scanner = ApiScanner()
    results = scanner.scan("https://api.example.com")
except ConfigError as e:
    print(f"配置错误: {e}")
except ScanError as e:
    print(f"扫描错误: {e}")
except Exception as e:
    print(f"未知错误: {e}")
```

## 📝 完整使用示例

```python
from api_finder import ApiScanner
from api_finder.config import Config
from api_finder.output import JsonFormatter, HtmlFormatter
from api_finder.plugins import AuthPlugin, FilterPlugin

# 1. 创建配置
config = Config({
    'scanner': {
        'threads': 20,
        'delay': 0.5,
        'timeout': 30
    },
    'network': {
        'proxy': 'http://proxy.example.com:8080',
        'headers': {
            'User-Agent': 'Api-Finder/2.1.0'
        }
    }
})

# 2. 创建扫描器
scanner = ApiScanner(config)

# 3. 添加插件
auth_plugin = AuthPlugin(token="your-api-token")
filter_plugin = FilterPlugin(status_codes=[200, 201, 202])
scanner.add_plugin(auth_plugin)
scanner.add_plugin(filter_plugin)

# 4. 执行扫描
try:
    results = scanner.scan("https://api.example.com")
    
    # 5. 输出结果
    # JSON 格式
    json_formatter = JsonFormatter(pretty=True)
    json_content = json_formatter.format(results)
    json_formatter.save(json_content, "results.json")
    
    # HTML 报告
    html_formatter = HtmlFormatter(template="detailed")
    html_content = html_formatter.format(results)
    html_formatter.save(html_content, "report.html")
    
    # 6. 打印统计信息
    stats = scanner.get_statistics()
    print(f"扫描完成:")
    print(f"  总请求数: {stats.total_requests}")
    print(f"  发现端点: {results.total_endpoints}")
    print(f"  成功率: {stats.success_rate:.2%}")
    print(f"  平均响应时间: {stats.avg_response_time:.3f}s")
    
except Exception as e:
    print(f"扫描失败: {e}")
```

## 📚 相关资源

- [配置参考](/guide/advanced-config) - 详细配置选项
- [插件开发](/guide/plugin-development) - 插件开发指南
- [输出格式](/guide/output-formats) - 输出格式说明
- [示例代码](/examples/) - 更多使用示例