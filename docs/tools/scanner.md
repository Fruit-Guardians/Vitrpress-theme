# 🔧 扫描器工具

Api-Finder 提供了多种专业的扫描器工具，满足不同场景的 API 发现需求。

## 📋 工具概览

| 工具名称 | 功能描述 | 适用场景 | 复杂度 |
|----------|----------|----------|--------|
| [基础扫描器](#基础扫描器) | 标准 API 端点发现 | 常规扫描 | 简单 |
| [字典扫描器](#字典扫描器) | 基于字典的路径扫描 | 已知路径模式 | 简单 |
| [模糊扫描器](#模糊扫描器) | 智能模糊测试 | 未知 API 结构 | 中等 |
| [爬虫扫描器](#爬虫扫描器) | 深度链接爬取 | 完整站点分析 | 中等 |
| [智能扫描器](#智能扫描器) | AI 驱动的发现 | 复杂 API 架构 | 高 |
| [批量扫描器](#批量扫描器) | 多目标并行扫描 | 大规模扫描 | 高 |

## 🎯 基础扫描器

### 功能特性

- **快速扫描**: 高效的端点发现
- **多线程**: 并发请求处理
- **智能过滤**: 自动过滤无效响应
- **实时反馈**: 即时显示发现结果

### 使用方法

#### 命令行使用

```bash
# 基础扫描
api-finder scan https://api.example.com

# 指定线程数
api-finder scan https://api.example.com --threads 20

# 设置延迟
api-finder scan https://api.example.com --delay 0.5

# 设置超时
api-finder scan https://api.example.com --timeout 30
```

#### 配置文件

```yaml
# basic_scan.yaml
scanner:
  type: "basic"
  threads: 10
  delay: 1.0
  timeout: 30
  
target: "https://api.example.com"

output:
  format: "json"
  file: "basic_results.json"
```

#### Python API

```python
from api_finder import ApiScanner
from api_finder.config import Config

# 创建配置
config = Config({
    'scanner': {
        'type': 'basic',
        'threads': 10,
        'delay': 1.0
    }
})

# 执行扫描
scanner = ApiScanner(config)
results = scanner.scan("https://api.example.com")

print(f"发现 {len(results.endpoints)} 个端点")
```

## 📚 字典扫描器

### 功能特性

- **字典驱动**: 基于预定义路径字典
- **多字典支持**: 支持多个字典文件
- **自定义字典**: 支持用户自定义路径
- **智能组合**: 自动组合路径和参数

### 内置字典

#### 通用字典

```text
# common_paths.txt
api
v1
v2
admin
user
users
auth
login
logout
register
profile
settings
```

#### REST API 字典

```text
# rest_api.txt
/api/v1/users
/api/v1/posts
/api/v1/comments
/api/v1/auth/login
/api/v1/auth/logout
/api/v1/admin/users
/api/v1/admin/settings
```

#### GraphQL 字典

```text
# graphql.txt
/graphql
/graphiql
/api/graphql
/v1/graphql
/admin/graphql
```

### 使用方法

#### 命令行使用

```bash
# 使用内置字典
api-finder scan https://api.example.com --scanner wordlist --wordlist common

# 使用自定义字典
api-finder scan https://api.example.com --scanner wordlist --wordlist-file custom_paths.txt

# 使用多个字典
api-finder scan https://api.example.com --scanner wordlist --wordlist-files common_paths.txt,rest_api.txt
```

#### 配置文件

```yaml
# wordlist_scan.yaml
scanner:
  type: "wordlist"
  wordlists:
    - "common_paths.txt"
    - "rest_api.txt"
  custom_paths:
    - "/api/v1/custom"
    - "/admin/special"
  
target: "https://api.example.com"
```

#### Python API

```python
from api_finder.scanners import WordlistScanner

# 创建字典扫描器
wordlist = [
    "/api/v1/users",
    "/api/v1/posts",
    "/admin/users"
]

scanner = WordlistScanner(wordlist)
results = scanner.scan("https://api.example.com")

for endpoint in results:
    print(f"发现: {endpoint.url}")
```

### 自定义字典

#### 创建字典文件

```text
# my_custom_paths.txt
# 用户相关
/api/users
/api/user/{id}
/api/user/profile
/api/user/settings

# 认证相关
/auth/login
/auth/logout
/auth/refresh
/auth/verify

# 管理员相关
/admin/dashboard
/admin/users
/admin/settings
/admin/logs
```

#### 动态字典生成

```python
# generate_wordlist.py
def generate_api_paths(base_paths, versions, resources):
    """生成 API 路径字典"""
    paths = []
    
    for base in base_paths:
        for version in versions:
            for resource in resources:
                paths.append(f"/{base}/{version}/{resource}")
                paths.append(f"/{base}/{version}/{resource}/{{id}}")
    
    return paths

# 使用示例
base_paths = ["api", "rest", "service"]
versions = ["v1", "v2", "v3"]
resources = ["users", "posts", "comments", "orders"]

wordlist = generate_api_paths(base_paths, versions, resources)
print(f"生成了 {len(wordlist)} 个路径")
```

## 🔍 模糊扫描器

### 功能特性

- **智能模糊**: 基于模式的智能测试
- **参数发现**: 自动发现 API 参数
- **错误分析**: 分析错误响应模式
- **自适应调整**: 根据响应调整策略

### 模糊模式

#### 路径模糊

```python
# 路径模糊模式
path_patterns = [
    "/api/{resource}",
    "/api/v{version}/{resource}",
    "/{service}/api/{resource}",
    "/api/{resource}/{id}",
    "/api/{resource}/{id}/{action}"
]
```

#### 参数模糊

```python
# 参数模糊模式
param_patterns = [
    "?id={value}",
    "?user_id={value}",
    "?limit={value}&offset={value}",
    "?format={format}",
    "?api_key={key}"
]
```

#### HTTP 方法模糊

```python
# HTTP 方法组合
method_combinations = [
    ["GET"],
    ["GET", "POST"],
    ["GET", "POST", "PUT", "DELETE"],
    ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
]
```

### 使用方法

#### 命令行使用

```bash
# 基础模糊扫描
api-finder scan https://api.example.com --scanner fuzz

# 指定模糊深度
api-finder scan https://api.example.com --scanner fuzz --fuzz-depth 3

# 自定义模糊模式
api-finder scan https://api.example.com --scanner fuzz --fuzz-patterns patterns.txt
```

#### 配置文件

```yaml
# fuzz_scan.yaml
scanner:
  type: "fuzz"
  depth: 3
  patterns:
    - "/api/{resource}"
    - "/api/v{version}/{resource}"
  parameters:
    - "id"
    - "user_id"
    - "limit"
    - "offset"
  methods:
    - "GET"
    - "POST"
    - "PUT"
    - "DELETE"
```

#### Python API

```python
from api_finder.scanners import FuzzScanner

# 创建模糊扫描器
patterns = [
    "/api/{resource}",
    "/api/v{version}/{resource}"
]

scanner = FuzzScanner(patterns)
results = scanner.scan("https://api.example.com")

for endpoint in results:
    print(f"模糊发现: {endpoint.url}")
```

### 高级模糊技术

#### 智能参数推断

```python
# intelligent_fuzzer.py
class IntelligentFuzzer:
    def __init__(self):
        self.common_params = [
            "id", "user_id", "post_id", "comment_id",
            "limit", "offset", "page", "per_page",
            "sort", "order", "filter", "search",
            "format", "api_key", "token"
        ]
    
    def generate_param_combinations(self, base_url):
        """生成参数组合"""
        combinations = []
        
        # 单参数
        for param in self.common_params:
            combinations.append(f"{base_url}?{param}=test")
        
        # 双参数组合
        for i, param1 in enumerate(self.common_params):
            for param2 in self.common_params[i+1:]:
                combinations.append(f"{base_url}?{param1}=test&{param2}=test")
        
        return combinations
```

#### 响应模式分析

```python
# response_analyzer.py
class ResponseAnalyzer:
    def analyze_patterns(self, responses):
        """分析响应模式"""
        patterns = {
            'success_indicators': [],
            'error_indicators': [],
            'api_indicators': []
        }
        
        for response in responses:
            # 分析成功模式
            if response.status_code == 200:
                if 'application/json' in response.content_type:
                    patterns['api_indicators'].append(response.url)
            
            # 分析错误模式
            elif response.status_code in [400, 401, 403, 404]:
                patterns['error_indicators'].append({
                    'url': response.url,
                    'status': response.status_code,
                    'pattern': self.extract_error_pattern(response)
                })
        
        return patterns
```

## 🕷️ 爬虫扫描器

### 功能特性

- **深度爬取**: 递归发现链接
- **智能解析**: 解析 HTML、JavaScript
- **API 识别**: 自动识别 API 调用
- **去重处理**: 避免重复扫描

### 爬取策略

#### 广度优先

```python
# 广度优先爬取
crawler_config = {
    'strategy': 'breadth_first',
    'max_depth': 3,
    'max_pages': 1000,
    'follow_external': False
}
```

#### 深度优先

```python
# 深度优先爬取
crawler_config = {
    'strategy': 'depth_first',
    'max_depth': 5,
    'max_pages': 500,
    'focus_api': True
}
```

### 使用方法

#### 命令行使用

```bash
# 基础爬虫扫描
api-finder scan https://example.com --scanner crawler

# 设置爬取深度
api-finder scan https://example.com --scanner crawler --max-depth 3

# 限制页面数量
api-finder scan https://example.com --scanner crawler --max-pages 100
```

#### 配置文件

```yaml
# crawler_scan.yaml
scanner:
  type: "crawler"
  max_depth: 3
  max_pages: 1000
  follow_external: false
  extract_apis: true
  javascript_analysis: true
```

#### Python API

```python
from api_finder.scanners import CrawlerScanner

# 创建爬虫扫描器
scanner = CrawlerScanner()
scanner.set_max_depth(3)
scanner.set_max_pages(1000)

results = scanner.scan("https://example.com")

for endpoint in results:
    print(f"爬虫发现: {endpoint.url}")
```

### JavaScript 分析

#### API 调用提取

```python
# js_analyzer.py
import re

class JavaScriptAnalyzer:
    def __init__(self):
        self.api_patterns = [
            r'fetch\(["\']([^"\'])+["\']',
            r'axios\.get\(["\']([^"\'])+["\']',
            r'\.ajax\({[^}]*url:\s*["\']([^"\'])+["\']',
            r'XMLHttpRequest.*open\(["\'][^"\']["\'],\s*["\']([^"\'])+["\']'
        ]
    
    def extract_api_calls(self, js_content):
        """提取 JavaScript 中的 API 调用"""
        api_urls = []
        
        for pattern in self.api_patterns:
            matches = re.findall(pattern, js_content, re.IGNORECASE)
            api_urls.extend(matches)
        
        return list(set(api_urls))  # 去重
```

## 🤖 智能扫描器

### 功能特性

- **AI 驱动**: 机器学习算法
- **模式识别**: 自动识别 API 模式
- **自适应学习**: 根据结果调整策略
- **预测分析**: 预测可能的端点

### AI 模型

#### 端点预测模型

```python
# ai_predictor.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier

class EndpointPredictor:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()
        self.classifier = RandomForestClassifier()
        self.trained = False
    
    def train(self, known_endpoints, labels):
        """训练预测模型"""
        features = self.vectorizer.fit_transform(known_endpoints)
        self.classifier.fit(features, labels)
        self.trained = True
    
    def predict_endpoints(self, base_url):
        """预测可能的端点"""
        if not self.trained:
            return []
        
        candidates = self.generate_candidates(base_url)
        features = self.vectorizer.transform(candidates)
        predictions = self.classifier.predict_proba(features)
        
        # 返回高概率的端点
        high_prob_endpoints = []
        for i, prob in enumerate(predictions):
            if prob[1] > 0.7:  # 70% 以上概率
                high_prob_endpoints.append(candidates[i])
        
        return high_prob_endpoints
```

### 使用方法

#### 命令行使用

```bash
# 智能扫描
api-finder scan https://api.example.com --scanner intelligent

# 使用预训练模型
api-finder scan https://api.example.com --scanner intelligent --model pretrained.pkl

# 启用学习模式
api-finder scan https://api.example.com --scanner intelligent --learning-mode
```

#### 配置文件

```yaml
# intelligent_scan.yaml
scanner:
  type: "intelligent"
  model_path: "models/api_predictor.pkl"
  learning_mode: true
  confidence_threshold: 0.7
  max_predictions: 100
```

## 📊 批量扫描器

### 功能特性

- **多目标**: 同时扫描多个目标
- **负载均衡**: 智能分配扫描任务
- **结果聚合**: 统一处理扫描结果
- **进度监控**: 实时监控扫描进度

### 使用方法

#### 目标列表文件

```text
# targets.txt
https://api1.example.com
https://api2.example.com
https://api3.example.com
https://internal-api.company.com
https://staging-api.company.com
```

#### 命令行使用

```bash
# 批量扫描
api-finder batch-scan --targets targets.txt

# 并行扫描
api-finder batch-scan --targets targets.txt --parallel 5

# 输出到目录
api-finder batch-scan --targets targets.txt --output-dir batch_results/
```

#### 配置文件

```yaml
# batch_scan.yaml
batch:
  targets_file: "targets.txt"
  parallel_scans: 5
  output_directory: "batch_results"
  individual_reports: true
  summary_report: true

scanner:
  type: "basic"
  threads: 10
```

#### Python API

```python
from api_finder.scanners import BatchScanner

# 创建批量扫描器
targets = [
    "https://api1.example.com",
    "https://api2.example.com",
    "https://api3.example.com"
]

scanner = BatchScanner(targets, parallel=3)
results = scanner.scan_all()

for target, result in results.items():
    print(f"{target}: 发现 {len(result.endpoints)} 个端点")
```

### 结果聚合

#### 统计汇总

```python
# batch_aggregator.py
class BatchAggregator:
    def aggregate_results(self, batch_results):
        """聚合批量扫描结果"""
        summary = {
            'total_targets': len(batch_results),
            'total_endpoints': 0,
            'total_requests': 0,
            'success_rate': 0,
            'common_endpoints': [],
            'unique_endpoints': []
        }
        
        all_endpoints = []
        for target, result in batch_results.items():
            summary['total_endpoints'] += len(result.endpoints)
            summary['total_requests'] += result.statistics.total_requests
            all_endpoints.extend([ep.url for ep in result.endpoints])
        
        # 分析共同端点
        from collections import Counter
        endpoint_counts = Counter(all_endpoints)
        
        summary['common_endpoints'] = [
            ep for ep, count in endpoint_counts.items() 
            if count > len(batch_results) * 0.5
        ]
        
        return summary
```

## 🔧 扫描器配置

### 通用配置

```yaml
# scanner_config.yaml
scanner:
  # 基础设置
  type: "basic"              # 扫描器类型
  threads: 10                # 线程数
  delay: 1.0                 # 请求延迟（秒）
  timeout: 30                # 超时时间（秒）
  
  # 重试设置
  max_retries: 3             # 最大重试次数
  retry_delay: 2.0           # 重试延迟
  
  # 过滤设置
  filter_status_codes: [200, 201, 202, 400, 401, 403]
  filter_content_types: ["application/json", "application/xml"]
  
  # 输出设置
  verbose: true              # 详细输出
  progress_bar: true         # 显示进度条
  real_time_output: false    # 实时输出结果
```

### 高级配置

```yaml
# advanced_scanner_config.yaml
scanner:
  type: "intelligent"
  
  # AI 设置
  ai:
    model_path: "models/api_predictor.pkl"
    confidence_threshold: 0.7
    learning_mode: true
    training_data: "training/endpoints.json"
  
  # 性能优化
  performance:
    connection_pool_size: 100
    keep_alive: true
    compression: true
    cache_responses: true
  
  # 安全设置
  security:
    respect_robots_txt: true
    user_agent_rotation: true
    rate_limiting: true
    stealth_mode: false
```

## 📈 性能优化

### 并发优化

```python
# performance_optimizer.py
class PerformanceOptimizer:
    def optimize_threads(self, target_url, initial_threads=10):
        """优化线程数量"""
        best_threads = initial_threads
        best_rps = 0
        
        for threads in [5, 10, 20, 50, 100]:
            rps = self.benchmark_threads(target_url, threads)
            if rps > best_rps:
                best_rps = rps
                best_threads = threads
        
        return best_threads
    
    def benchmark_threads(self, target_url, threads):
        """基准测试线程性能"""
        # 实现基准测试逻辑
        pass
```

### 内存优化

```python
# memory_optimizer.py
class MemoryOptimizer:
    def __init__(self, max_memory_mb=1024):
        self.max_memory_mb = max_memory_mb
        self.response_cache = {}
    
    def optimize_cache(self):
        """优化响应缓存"""
        import psutil
        
        current_memory = psutil.Process().memory_info().rss / 1024 / 1024
        
        if current_memory > self.max_memory_mb:
            # 清理缓存
            self.response_cache.clear()
```

## 📚 相关资源

- [配置参考](/guide/advanced-config) - 详细配置选项
- [API 参考](/api/index) - 编程接口
- [插件开发](/guide/plugin-development) - 扩展功能
- [性能优化](/guide/performance) - 性能调优指南

<div class="scanner-container">
  <div class="scanner-header">
    <h2>🚀 Api-Finder 在线扫描器</h2>
    <p>快速扫描网站的API端点，无需安装任何软件</p>
  </div>

  <div class="scanner-form">
    <div class="form-group">
      <label for="target-url">🌐 目标URL</label>
      <input 
        type="url" 
        id="target-url" 
        placeholder="https://example.com"
        class="form-input"
      />
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="user-agent">📱 User-Agent</label>
        <select id="user-agent" class="form-select">
          <option value="desktop">🖥️ 桌面浏览器</option>
          <option value="mobile">📱 移动设备</option>
          <option value="tablet">📱 平板设备</option>
          <option value="weixin">💬 微信浏览器</option>
          <option value="custom">🔧 自定义</option>
        </select>
      </div>

      <div class="form-group">
        <label for="output-format">📊 输出格式</label>
        <select id="output-format" class="form-select">
          <option value="json">📋 JSON</option>
          <option value="csv">📊 CSV</option>
          <option value="html">🌐 HTML</option>
          <option value="txt">📄 文本</option>
        </select>
      </div>
    </div>

    <div class="form-group" id="custom-ua-group" style="display: none;">
      <label for="custom-ua">🔧 自定义 User-Agent</label>
      <input 
        type="text" 
        id="custom-ua" 
        placeholder="Mozilla/5.0 (Custom Agent)"
        class="form-input"
      />
    </div>

    <div class="form-group">
      <label for="cookies">🍪 Cookies (可选)</label>
      <textarea 
        id="cookies" 
        placeholder="session=abc123; token=xyz789"
        class="form-textarea"
        rows="3"
      ></textarea>
    </div>

    <div class="form-options">
      <label class="checkbox-label">
        <input type="checkbox" id="verbose-mode" />
        <span class="checkmark"></span>
        🔍 详细输出模式
      </label>
      
      <label class="checkbox-label">
        <input type="checkbox" id="ignore-ssl" />
        <span class="checkmark"></span>
        🔓 忽略SSL证书错误
      </label>
    </div>

    <div class="form-actions">
      <button id="scan-btn" class="btn-primary">
        🚀 开始扫描
      </button>
      <button id="clear-btn" class="btn-secondary">
        🗑️ 清空表单
      </button>
    </div>
  </div>

  <div id="loading" class="loading-container" style="display: none;">
    <div class="loading-spinner"></div>
    <p>正在扫描中，请稍候...</p>
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
  </div>

  <div id="results" class="results-container" style="display: none;">
    <div class="results-header">
      <h3>📊 扫描结果</h3>
      <div class="results-actions">
        <button id="download-btn" class="btn-download">📥 下载结果</button>
        <button id="copy-btn" class="btn-copy">📋 复制结果</button>
      </div>
    </div>
    
    <div class="results-stats">
      <div class="stat-card">
        <div class="stat-number" id="total-apis">0</div>
        <div class="stat-label">发现的API</div>
      </div>
      <div class="stat-card">
        <div class="stat-number" id="scan-time">0s</div>
        <div class="stat-label">扫描时间</div>
      </div>
      <div class="stat-card">
        <div class="stat-number" id="files-analyzed">0</div>
        <div class="stat-label">分析文件</div>
      </div>
    </div>

    <div class="results-content">
      <div class="results-tabs">
        <button class="tab-btn active" data-tab="list">📋 API列表</button>
        <button class="tab-btn" data-tab="chart">📊 统计图表</button>
        <button class="tab-btn" data-tab="raw">📄 原始数据</button>
      </div>

      <div id="tab-list" class="tab-content active">
        <div class="api-list" id="api-list">
          <!-- API列表将在这里显示 -->
        </div>
      </div>

      <div id="tab-chart" class="tab-content">
        <canvas id="methods-chart" width="400" height="200"></canvas>
      </div>

      <div id="tab-raw" class="tab-content">
        <pre id="raw-output" class="code-block"></pre>
      </div>
    </div>
  </div>

  <div id="error" class="error-container" style="display: none;">
    <div class="error-icon">⚠️</div>
    <div class="error-message" id="error-message"></div>
    <button id="retry-btn" class="btn-retry">🔄 重试</button>
  </div>
</div>

## 🛡️ 使用说明

### ⚠️ 重要提醒

- **合法使用**: 仅扫描你拥有或已获得授权的网站
- **遵守法律**: 确保你的使用符合当地法律法规
- **负责任披露**: 发现安全问题时请负责任地报告
- **频率限制**: 为避免对目标服务器造成负担，请合理控制扫描频率

### 📋 功能特性

- ✅ **无需安装** - 直接在浏览器中使用
- ✅ **多种格式** - 支持JSON、CSV、HTML、TXT输出
- ✅ **设备模拟** - 支持多种User-Agent
- ✅ **认证支持** - 支持Cookie认证
- ✅ **实时结果** - 实时显示扫描进度和结果
- ✅ **数据导出** - 支持下载和复制结果

### 🔧 使用步骤

1. **输入目标URL** - 在URL输入框中输入要扫描的网站地址
2. **选择配置** - 根据需要选择User-Agent和输出格式
3. **添加认证** - 如果需要，在Cookies字段中添加认证信息
4. **开始扫描** - 点击"开始扫描"按钮
5. **查看结果** - 扫描完成后查看发现的API端点
6. **导出数据** - 下载或复制扫描结果

### 📊 结果说明

扫描结果包含以下信息：

- **Method** - HTTP方法（GET、POST、PUT、DELETE等）
- **Endpoint** - API端点路径
- **Source** - 发现API的源文件
- **Confidence** - 置信度（0-1之间的数值）
- **Full URL** - 完整的API地址

## 🔗 相关链接

- 📖 [用户指南](/guide/) - 详细的使用指南
- 💡 [使用示例](/examples/) - 更多使用示例
- 🔧 [API参考](/api/) - 开发者文档
- 🐛 [问题反馈](https://github.com/jujubooom/Api-Finder/issues) - 报告问题或建议

<style>
.scanner-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.scanner-header {
  text-align: center;
  margin-bottom: 2rem;
}

.scanner-header h2 {
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}

.scanner-form {
  background: var(--vp-c-bg-soft);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.form-options {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
}

.checkbox-label input[type="checkbox"] {
  margin-right: 0.5rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-primary, .btn-secondary, .btn-download, .btn-copy, .btn-retry {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: var(--vp-c-brand-1);
  color: white;
}

.btn-primary:hover {
  background: var(--vp-c-brand-2);
}

.btn-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 2px solid var(--vp-c-border);
}

.btn-secondary:hover {
  background: var(--vp-c-bg-mute);
}

.loading-container {
  text-align: center;
  padding: 3rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  margin-bottom: 2rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--vp-c-border);
  border-top: 4px solid var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--vp-c-border);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 1rem;
}

.progress-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  width: 0%;
  animation: progress 3s ease-in-out infinite;
}

@keyframes progress {
  0% { width: 0%; }
  50% { width: 70%; }
  100% { width: 100%; }
}

.results-container {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.results-actions {
  display: flex;
  gap: 0.5rem;
}

.results-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  border: 2px solid var(--vp-c-border);
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.results-tabs {
  display: flex;
  border-bottom: 2px solid var(--vp-c-border);
  margin-bottom: 1.5rem;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  color: var(--vp-c-text-2);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
}

.tab-btn.active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

.api-list {
  max-height: 400px;
  overflow-y: auto;
}

.api-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  background: var(--vp-c-bg);
}

.api-method {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.8rem;
  color: white;
}

.method-get { background: #10b981; }
.method-post { background: #3b82f6; }
.method-put { background: #f59e0b; }
.method-delete { background: #ef4444; }

.api-endpoint {
  flex: 1;
  margin: 0 1rem;
  font-family: monospace;
  color: var(--vp-c-text-1);
}

.api-confidence {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.code-block {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  max-height: 400px;
  overflow-y: auto;
}

.error-container {
  text-align: center;
  padding: 2rem;
  background: #fef2f2;
  border: 2px solid #fecaca;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-message {
  color: #dc2626;
  font-weight: 600;
  margin-bottom: 1rem;
}

.btn-retry {
  background: #dc2626;
  color: white;
}

.btn-retry:hover {
  background: #b91c1c;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-options {
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .results-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .results-stats {
    grid-template-columns: 1fr;
  }
}
</style>

<script>
// 在线扫描器的JavaScript代码将在这里实现
// 注意：这是一个演示界面，实际的扫描功能需要后端API支持

// 确保只在客户端运行
if (typeof window !== 'undefined') {
document.addEventListener('DOMContentLoaded', function() {
  const userAgentSelect = document.getElementById('user-agent');
  const customUaGroup = document.getElementById('custom-ua-group');
  const scanBtn = document.getElementById('scan-btn');
  const clearBtn = document.getElementById('clear-btn');
  
  // User-Agent选择处理
  userAgentSelect.addEventListener('change', function() {
    if (this.value === 'custom') {
      customUaGroup.style.display = 'block';
    } else {
      customUaGroup.style.display = 'none';
    }
  });
  
  // 清空表单
  clearBtn.addEventListener('click', function() {
    document.getElementById('target-url').value = '';
    document.getElementById('cookies').value = '';
    document.getElementById('custom-ua').value = '';
    document.getElementById('verbose-mode').checked = false;
    document.getElementById('ignore-ssl').checked = false;
    userAgentSelect.value = 'desktop';
    customUaGroup.style.display = 'none';
  });
  
  // 扫描按钮处理
  scanBtn.addEventListener('click', function() {
    const targetUrl = document.getElementById('target-url').value;
    if (!targetUrl) {
      alert('请输入目标URL');
      return;
    }
    
    // 显示加载状态
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    
    // 模拟扫描过程（实际应用中需要调用后端API）
    setTimeout(() => {
      showMockResults();
    }, 3000);
  });
  
  // 显示模拟结果
  function showMockResults() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    
    // 更新统计数据
    document.getElementById('total-apis').textContent = '8';
    document.getElementById('scan-time').textContent = '3.2s';
    document.getElementById('files-analyzed').textContent = '12';
    
    // 显示API列表
    const apiList = document.getElementById('api-list');
    const mockApis = [
      { method: 'GET', endpoint: '/api/users', confidence: 0.95 },
      { method: 'POST', endpoint: '/api/login', confidence: 0.98 },
      { method: 'GET', endpoint: '/api/products', confidence: 0.92 },
      { method: 'PUT', endpoint: '/api/users/{id}', confidence: 0.90 },
      { method: 'DELETE', endpoint: '/api/users/{id}', confidence: 0.88 },
      { method: 'GET', endpoint: '/api/orders', confidence: 0.85 },
      { method: 'POST', endpoint: '/api/orders', confidence: 0.87 },
      { method: 'GET', endpoint: '/graphql', confidence: 0.99 }
    ];
    
    apiList.innerHTML = mockApis.map(api => `
      <div class="api-item">
        <span class="api-method method-${api.method.toLowerCase()}">${api.method}</span>
        <span class="api-endpoint">${api.endpoint}</span>
        <span class="api-confidence">${(api.confidence * 100).toFixed(0)}%</span>
      </div>
    `).join('');
    
    // 显示原始数据
    const rawOutput = document.getElementById('raw-output');
    rawOutput.textContent = JSON.stringify({
      scan_info: {
        target: document.getElementById('target-url').value,
        timestamp: new Date().toISOString(),
        total_apis: 8,
        scan_duration: "3.2s"
      },
      apis: mockApis
    }, null, 2);
  }
  
  // 标签页切换
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const tabName = this.dataset.tab;
      
      // 更新按钮状态
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // 更新内容显示
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(`tab-${tabName}`).classList.add('active');
    });
  });
});
} // 客户端检查结束
</script>