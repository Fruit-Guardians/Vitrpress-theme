# 📖 教程

本章节提供详细的教程，帮助你从零开始掌握 Api-Finder。

## 🎯 入门教程

### 第一步：安装 Api-Finder

#### 使用 pip 安装
```bash
# 安装最新版本
pip install api-finder

# 安装指定版本
pip install api-finder==2.1.0

# 从源码安装
pip install git+https://github.com/api-finder/api-finder.git
```

#### 验证安装
```bash
# 检查版本
python -m api_finder --version

# 查看帮助
python -m api_finder --help
```

### 第二步：第一次扫描

#### 最简单的扫描
```bash
# 扫描单个目标
python -m api_finder -u https://httpbin.org

# 查看扫描结果
cat scan_results.json
```

#### 理解输出结果
```json
{
  "scan_info": {
    "target": "https://httpbin.org",
    "start_time": "2024-01-15T10:30:00Z",
    "end_time": "2024-01-15T10:35:00Z",
    "total_requests": 1000,
    "found_endpoints": 15
  },
  "endpoints": [
    {
      "url": "https://httpbin.org/get",
      "method": "GET",
      "status_code": 200,
      "response_time": 0.234,
      "content_length": 312,
      "content_type": "application/json"
    }
  ]
}
```

### 第三步：自定义扫描

#### 使用自定义字典
```bash
# 创建自定义字典
echo -e "api\nv1\nv2\nusers\nauth\nlogin" > my_wordlist.txt

# 使用自定义字典扫描
python -m api_finder -u https://httpbin.org -w my_wordlist.txt
```

#### 调整扫描参数
```bash
# 设置线程数和延迟
python -m api_finder -u https://httpbin.org -t 20 -d 0.5

# 设置超时时间
python -m api_finder -u https://httpbin.org --timeout 30
```

## 🔧 配置教程

### 创建配置文件

#### 基础配置文件
```yaml
# config/basic.yaml
scanner:
  threads: 10
  delay: 1.0
  timeout: 30
  user_agent: "Api-Finder/2.1.0"

wordlists:
  - "wordlists/common_api.txt"
  - "wordlists/rest_endpoints.txt"

output:
  format: "json"
  file: "scan_results.json"
  verbose: true

filters:
  status_codes: [200, 201, 202, 301, 302, 401, 403]
  min_content_length: 10
```

#### 使用配置文件
```bash
# 使用配置文件扫描
python -m api_finder --config config/basic.yaml -u https://httpbin.org
```

### 高级配置

#### 网络配置
```yaml
# config/network.yaml
network:
  proxy: "http://proxy.example.com:8080"
  headers:
    "User-Agent": "Mozilla/5.0 (compatible; Api-Finder)"
    "Accept": "application/json, text/plain, */*"
  
  ssl:
    verify: true
    ca_cert: "/path/to/ca.pem"
  
  retries: 3
  backoff_factor: 0.3
```

#### 认证配置
```yaml
# config/auth.yaml
auth:
  type: "bearer"
  token: "${API_TOKEN}"
  header: "Authorization"

# 或者使用 API Key
auth:
  type: "apikey"
  key: "${API_KEY}"
  location: "header"
  name: "X-API-Key"
```

## 🎯 实战教程

### 教程 1：扫描 REST API

#### 目标：发现 REST API 端点

```bash
# 步骤 1：基础扫描
python -m api_finder -u https://jsonplaceholder.typicode.com

# 步骤 2：使用 REST API 字典
python -m api_finder -u https://jsonplaceholder.typicode.com \
    -w wordlists/rest_api.txt

# 步骤 3：递归扫描
python -m api_finder -u https://jsonplaceholder.typicode.com \
    --recursive --max-depth 3
```

#### 分析结果
```json
{
  "endpoints": [
    {
      "url": "https://jsonplaceholder.typicode.com/posts",
      "method": "GET",
      "status_code": 200,
      "api_type": "REST",
      "resource": "posts"
    },
    {
      "url": "https://jsonplaceholder.typicode.com/users",
      "method": "GET", 
      "status_code": 200,
      "api_type": "REST",
      "resource": "users"
    }
  ]
}
```

### 教程 2：GraphQL API 发现

#### 目标：发现 GraphQL 端点

```bash
# 步骤 1：使用 GraphQL 字典
python -m api_finder -u https://api.github.com \
    -w wordlists/graphql.txt

# 步骤 2：GraphQL 内省查询
python -m api_finder -u https://api.github.com/graphql \
    --graphql-introspection

# 步骤 3：分析 Schema
python -m api_finder -u https://api.github.com/graphql \
    --graphql-schema-analysis
```

#### GraphQL 配置
```yaml
# config/graphql.yaml
graphql:
  enabled: true
  introspection: true
  schema_analysis: true
  query_depth_limit: 10
  
  custom_queries:
    - "query { __schema { types { name } } }"
    - "query { __type(name: \"User\") { fields { name type { name } } } }"
```

### 教程 3：移动应用 API 扫描

#### 目标：发现移动应用后端 API

```bash
# 步骤 1：使用移动 API 字典
python -m api_finder -u https://mobile-api.example.com \
    -w wordlists/mobile_api.txt

# 步骤 2：模拟移动设备
python -m api_finder -u https://mobile-api.example.com \
    -H "User-Agent: MyApp/1.0 (iOS 14.0)" \
    -H "X-Platform: iOS" \
    -H "X-App-Version: 1.0.0"

# 步骤 3：API 版本发现
python -m api_finder -u https://mobile-api.example.com \
    --api-version-discovery
```

#### 移动 API 配置
```yaml
# config/mobile.yaml
mobile:
  platforms: ["iOS", "Android"]
  app_versions: ["1.0.0", "1.1.0", "2.0.0"]
  
  headers:
    ios:
      "User-Agent": "MyApp/1.0 (iOS 14.0)"
      "X-Platform": "iOS"
    android:
      "User-Agent": "MyApp/1.0 (Android 11)"
      "X-Platform": "Android"

api_versions:
  patterns: ["v1", "v2", "v3", "api/v1", "api/v2"]
  discovery_methods: ["path", "header", "query"]
```

### 教程 4：微服务架构扫描

#### 目标：发现微服务端点

```bash
# 步骤 1：服务发现
python -m api_finder -u https://api.example.com \
    --service-discovery

# 步骤 2：批量扫描服务
python -m api_finder --targets-file services.txt \
    --microservices-mode

# 步骤 3：服务依赖分析
python -m api_finder --targets-file services.txt \
    --dependency-analysis
```

#### 微服务配置
```yaml
# config/microservices.yaml
microservices:
  discovery:
    consul:
      enabled: true
      url: "http://consul.example.com:8500"
    
    kubernetes:
      enabled: true
      namespace: "default"
      kubeconfig: "/path/to/kubeconfig"
  
  scanning:
    parallel_services: 5
    service_timeout: 60
    health_check: true

  patterns:
    service_names: ["user-service", "auth-service", "payment-service"]
    common_paths: ["/health", "/metrics", "/api/v1"]
```

## 🔐 安全测试教程

### 教程 5：OWASP API Top 10 检测

#### 目标：检测常见 API 安全问题

```bash
# 步骤 1：完整安全扫描
python -m api_finder -u https://vulnerable-api.example.com \
    --security-scan --owasp-api-top10

# 步骤 2：特定漏洞检测
python -m api_finder -u https://vulnerable-api.example.com \
    --check-bola --check-auth --check-data-exposure

# 步骤 3：生成安全报告
python -m api_finder -u https://vulnerable-api.example.com \
    --security-scan -o security_report.html --format html
```

#### 安全扫描配置
```yaml
# config/security.yaml
security:
  owasp_api_top10:
    enabled: true
    checks:
      - "broken_object_level_authorization"
      - "broken_user_authentication"
      - "excessive_data_exposure"
      - "lack_of_resources_rate_limiting"
      - "broken_function_level_authorization"
  
  custom_checks:
    sql_injection:
      enabled: true
      payloads_file: "payloads/sql_injection.txt"
    
    xss:
      enabled: true
      payloads_file: "payloads/xss.txt"
    
    command_injection:
      enabled: true
      payloads_file: "payloads/command_injection.txt"

  reporting:
    include_poc: true
    risk_assessment: true
    remediation_suggestions: true
```

### 教程 6：认证绕过测试

#### 目标：测试认证机制

```bash
# 步骤 1：无认证扫描
python -m api_finder -u https://api.example.com \
    --no-auth-scan

# 步骤 2：弱认证测试
python -m api_finder -u https://api.example.com \
    --weak-auth-test

# 步骤 3：权限提升测试
python -m api_finder -u https://api.example.com \
    --privilege-escalation-test
```

#### 认证测试配置
```yaml
# config/auth_testing.yaml
auth_testing:
  bypass_techniques:
    - "no_auth"
    - "weak_tokens"
    - "token_manipulation"
    - "header_injection"
  
  weak_credentials:
    usernames: ["admin", "user", "test", "guest"]
    passwords: ["password", "123456", "admin", "test"]
  
  token_tests:
    jwt_manipulation: true
    token_reuse: true
    token_expiration: true
    
  privilege_escalation:
    role_manipulation: true
    parameter_pollution: true
    method_override: true
```

## 📊 结果分析教程

### 教程 7：结果过滤和分析

#### 目标：有效分析扫描结果

```bash
# 步骤 1：基础过滤
python -m api_finder -u https://api.example.com \
    --status-codes 200,201,401,403 \
    --min-length 100

# 步骤 2：内容分析
python -m api_finder -u https://api.example.com \
    --content-analysis \
    --response-patterns patterns.txt

# 步骤 3：生成详细报告
python -m api_finder -u https://api.example.com \
    -o detailed_report.html --format html \
    --include-response-headers \
    --include-response-body
```

#### 分析配置
```yaml
# config/analysis.yaml
analysis:
  content_analysis:
    enabled: true
    patterns:
      - "api.*version"
      - "error.*message"
      - "debug.*info"
    
    json_analysis: true
    xml_analysis: true
    
  response_classification:
    success_codes: [200, 201, 202, 204]
    client_error_codes: [400, 401, 403, 404, 405]
    server_error_codes: [500, 501, 502, 503]
  
  statistical_analysis:
    response_time_analysis: true
    content_length_analysis: true
    status_code_distribution: true

reporting:
  charts: true
  statistics: true
  recommendations: true
```

### 教程 8：自动化报告生成

#### 目标：生成专业的扫描报告

```bash
# 步骤 1：HTML 报告
python -m api_finder -u https://api.example.com \
    -o report.html --format html \
    --template professional

# 步骤 2：PDF 报告
python -m api_finder -u https://api.example.com \
    -o report.pdf --format pdf \
    --include-executive-summary

# 步骤 3：多格式报告
python -m api_finder -u https://api.example.com \
    --multi-format-output \
    -o reports/scan_$(date +%Y%m%d)
```

#### 报告配置
```yaml
# config/reporting.yaml
reporting:
  html:
    template: "professional"
    include_charts: true
    include_statistics: true
    custom_css: "styles/custom.css"
  
  pdf:
    template: "executive"
    include_cover_page: true
    include_toc: true
    watermark: "CONFIDENTIAL"
  
  json:
    pretty_print: true
    include_raw_responses: false
    compress: true
  
  csv:
    delimiter: ","
    include_headers: true
    custom_fields: ["url", "method", "status_code", "response_time"]

executive_summary:
  include_risk_assessment: true
  include_recommendations: true
  include_compliance_status: true
```

## 🔌 插件开发教程

### 教程 9：开发自定义插件

#### 目标：创建自定义功能插件

```python
# plugins/custom_auth_plugin.py
from api_finder.plugins import Plugin
import requests

class CustomAuthPlugin(Plugin):
    """自定义认证插件"""
    
    def __init__(self, config):
        super().__init__(config)
        self.token = None
    
    def initialize(self):
        """插件初始化"""
        self.token = self._get_auth_token()
    
    def before_request(self, request):
        """请求前处理"""
        if self.token:
            request.headers['Authorization'] = f'Bearer {self.token}'
        return request
    
    def after_response(self, response):
        """响应后处理"""
        if response.status_code == 401:
            # Token 过期，重新获取
            self.token = self._get_auth_token()
        return response
    
    def _get_auth_token(self):
        """获取认证 Token"""
        auth_url = self.config.get('auth_url')
        credentials = {
            'username': self.config.get('username'),
            'password': self.config.get('password')
        }
        
        response = requests.post(auth_url, json=credentials)
        if response.status_code == 200:
            return response.json().get('access_token')
        return None
```

#### 插件配置
```yaml
# config/custom_plugin.yaml
plugins:
  custom_auth_plugin:
    enabled: true
    config:
      auth_url: "https://api.example.com/auth/login"
      username: "${AUTH_USERNAME}"
      password: "${AUTH_PASSWORD}"
      token_refresh_interval: 3600
```

#### 使用插件
```bash
# 使用自定义插件
python -m api_finder -u https://api.example.com \
    --config config/custom_plugin.yaml \
    --plugin-dir plugins/
```

### 教程 10：结果处理插件

#### 目标：自定义结果处理逻辑

```python
# plugins/result_processor_plugin.py
from api_finder.plugins import Plugin
import json
import sqlite3

class ResultProcessorPlugin(Plugin):
    """结果处理插件"""
    
    def __init__(self, config):
        super().__init__(config)
        self.db_path = config.get('db_path', 'results.db')
        self.init_database()
    
    def init_database(self):
        """初始化数据库"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS scan_results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                url TEXT NOT NULL,
                method TEXT NOT NULL,
                status_code INTEGER,
                response_time REAL,
                content_length INTEGER,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def process_result(self, result):
        """处理扫描结果"""
        # 保存到数据库
        self._save_to_database(result)
        
        # 发送通知
        if result.status_code in [200, 201]:
            self._send_notification(result)
        
        return result
    
    def _save_to_database(self, result):
        """保存结果到数据库"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO scan_results 
            (url, method, status_code, response_time, content_length)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            result.url,
            result.method,
            result.status_code,
            result.response_time,
            result.content_length
        ))
        
        conn.commit()
        conn.close()
    
    def _send_notification(self, result):
        """发送通知"""
        webhook_url = self.config.get('webhook_url')
        if webhook_url:
            payload = {
                'text': f'发现新端点: {result.url}',
                'status_code': result.status_code,
                'response_time': result.response_time
            }
            
            requests.post(webhook_url, json=payload)
```

## 🚀 高级技巧教程

### 教程 11：大规模扫描优化

#### 目标：优化大规模扫描性能

```bash
# 步骤 1：内存优化扫描
python -m api_finder --targets-file large_targets.txt \
    --memory-efficient \
    --batch-size 100 \
    --max-memory 1024

# 步骤 2：分布式扫描
python -m api_finder --targets-file targets.txt \
    --distributed-scan \
    --worker-nodes worker1,worker2,worker3

# 步骤 3：结果聚合
python -m api_finder --aggregate-results \
    --input-dir distributed_results/ \
    -o final_report.json
```

#### 大规模扫描配置
```yaml
# config/large_scale.yaml
large_scale:
  memory_optimization:
    enabled: true
    max_memory_mb: 1024
    batch_size: 100
    stream_processing: true
  
  distributed:
    enabled: true
    coordinator_url: "http://coordinator:8080"
    worker_nodes: ["worker1:8080", "worker2:8080"]
    load_balancing: "round_robin"
  
  performance:
    connection_pooling: true
    pool_size: 100
    keep_alive: true
    compression: true
  
  monitoring:
    metrics_enabled: true
    metrics_port: 9090
    health_check_interval: 30
```

### 教程 12：CI/CD 集成

#### 目标：集成到 CI/CD 流水线

```yaml
# .github/workflows/api-security-scan.yml
name: API Security Scan

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * *'  # 每天凌晨2点运行

jobs:
  api-scan:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.9'
    
    - name: Install Api-Finder
      run: |
        pip install api-finder
    
    - name: Run API Security Scan
      run: |
        python -m api_finder \
          -u ${{ secrets.TARGET_URL }} \
          --config .github/configs/security_scan.yaml \
          --security-scan \
          -o scan_results.json
      env:
        API_TOKEN: ${{ secrets.API_TOKEN }}
    
    - name: Upload scan results
      uses: actions/upload-artifact@v3
      with:
        name: api-scan-results
        path: scan_results.json
    
    - name: Security Gate
      run: |
        python scripts/security_gate.py scan_results.json
    
    - name: Notify on failure
      if: failure()
      uses: 8398a7/action-slack@v3
      with:
        status: failure
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

#### 安全门禁脚本
```python
# scripts/security_gate.py
import json
import sys

def check_security_issues(results_file):
    """检查安全问题"""
    with open(results_file, 'r') as f:
        results = json.load(f)
    
    high_risk_issues = 0
    medium_risk_issues = 0
    
    for endpoint in results.get('endpoints', []):
        security_issues = endpoint.get('security_issues', [])
        
        for issue in security_issues:
            if issue.get('severity') == 'high':
                high_risk_issues += 1
            elif issue.get('severity') == 'medium':
                medium_risk_issues += 1
    
    # 安全门禁规则
    if high_risk_issues > 0:
        print(f"❌ 发现 {high_risk_issues} 个高风险安全问题，构建失败")
        sys.exit(1)
    elif medium_risk_issues > 5:
        print(f"⚠️ 发现 {medium_risk_issues} 个中风险安全问题，超过阈值")
        sys.exit(1)
    else:
        print("✅ 安全检查通过")
        sys.exit(0)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python security_gate.py <results_file>")
        sys.exit(1)
    
    check_security_issues(sys.argv[1])
```

## 📚 最佳实践

### 扫描策略

1. **渐进式扫描**：从基础扫描开始，逐步增加复杂度
2. **目标分类**：根据目标类型选择合适的字典和配置
3. **结果验证**：手动验证重要发现
4. **定期扫描**：建立定期扫描机制

### 性能优化

1. **合理设置并发**：根据目标服务器性能调整线程数
2. **使用缓存**：启用缓存减少重复请求
3. **网络优化**：使用连接池和 Keep-Alive
4. **内存管理**：大规模扫描时启用内存优化

### 安全考虑

1. **授权扫描**：确保有扫描授权
2. **速率控制**：避免对目标造成影响
3. **数据保护**：妥善保护扫描结果
4. **合规性**：遵守相关法律法规

## 📖 相关资源

- [安装指南](/guide/installation) - 安装和配置
- [基本使用](/guide/basic-usage) - 基础功能
- [高级配置](/guide/advanced-config) - 高级功能
- [插件开发](/guide/plugin-development) - 插件开发
- [示例集合](/examples/) - 实用示例