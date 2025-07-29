# 📄 输出格式

Api-Finder 支持多种输出格式，满足不同场景的需求。

## 🎯 支持的格式

### 标准格式

| 格式 | 扩展名 | 描述 | 用途 |
|------|--------|------|------|
| JSON | `.json` | 结构化数据格式 | API 集成、自动化处理 |
| XML | `.xml` | 标记语言格式 | 企业系统集成 |
| CSV | `.csv` | 表格数据格式 | 数据分析、Excel 导入 |
| HTML | `.html` | 网页格式 | 可视化报告 |
| TXT | `.txt` | 纯文本格式 | 简单查看、脚本处理 |
| YAML | `.yaml` | 人类可读格式 | 配置文件、文档 |

### 专业格式

| 格式 | 扩展名 | 描述 | 用途 |
|------|--------|------|------|
| PDF | `.pdf` | 便携文档格式 | 正式报告、存档 |
| DOCX | `.docx` | Word 文档格式 | 详细报告、文档 |
| XLSX | `.xlsx` | Excel 表格格式 | 数据分析、图表 |
| Markdown | `.md` | 标记文档格式 | 技术文档、GitHub |

## 📋 格式配置

### 基本配置

```yaml
output:
  format: "json"           # 输出格式
  file: "results.json"     # 输出文件
  pretty: true             # 美化输出
  encoding: "utf-8"        # 文件编码
```

### 多格式输出

```yaml
output:
  formats:
    - type: "json"
      file: "results.json"
      pretty: true
    - type: "html"
      file: "report.html"
      template: "detailed"
    - type: "csv"
      file: "data.csv"
      delimiter: ","
```

## 📊 JSON 格式

### 基本结构

```json
{
  "scan_info": {
    "target": "https://api.example.com",
    "start_time": "2024-01-15T10:30:00Z",
    "end_time": "2024-01-15T10:35:00Z",
    "duration": 300,
    "total_requests": 1500,
    "found_endpoints": 25
  },
  "endpoints": [
    {
      "url": "https://api.example.com/users",
      "method": "GET",
      "status_code": 200,
      "response_time": 0.245,
      "content_length": 1024,
      "content_type": "application/json",
      "headers": {
        "server": "nginx/1.18.0",
        "x-powered-by": "Express"
      },
      "response_body": "...",
      "discovered_at": "2024-01-15T10:31:15Z"
    }
  ],
  "statistics": {
    "status_codes": {
      "200": 15,
      "404": 1200,
      "403": 50,
      "500": 5
    },
    "response_times": {
      "min": 0.120,
      "max": 2.340,
      "avg": 0.456,
      "median": 0.380
    }
  }
}
```

### 配置选项

```yaml
output:
  format: "json"
  json:
    pretty: true              # 美化输出
    indent: 2                 # 缩进空格数
    sort_keys: true           # 排序键名
    include_headers: true     # 包含响应头
    include_body: false       # 包含响应体
    max_body_size: 1024       # 最大响应体大小
```

## 📄 CSV 格式

### 基本结构

```csv
URL,Method,Status Code,Response Time,Content Length,Content Type,Discovered At
https://api.example.com/users,GET,200,0.245,1024,application/json,2024-01-15T10:31:15Z
https://api.example.com/posts,GET,200,0.180,2048,application/json,2024-01-15T10:31:20Z
https://api.example.com/admin,GET,403,0.120,512,text/html,2024-01-15T10:31:25Z
```

### 配置选项

```yaml
output:
  format: "csv"
  csv:
    delimiter: ","            # 分隔符
    quote_char: "\""          # 引号字符
    include_headers: true     # 包含表头
    encoding: "utf-8"         # 文件编码
    columns:                  # 自定义列
      - "url"
      - "method"
      - "status_code"
      - "response_time"
```

## 🌐 HTML 格式

### 模板选择

```yaml
output:
  format: "html"
  html:
    template: "detailed"      # 模板类型
    theme: "dark"             # 主题
    include_charts: true      # 包含图表
    include_timeline: true    # 包含时间线
```

### 可用模板

#### 1. 简洁模板 (simple)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Api-Finder 扫描报告</title>
    <style>/* 简洁样式 */</style>
</head>
<body>
    <h1>扫描结果</h1>
    <table>
        <tr><th>URL</th><th>方法</th><th>状态码</th></tr>
        <!-- 结果行 -->
    </table>
</body>
</html>
```

#### 2. 详细模板 (detailed)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Api-Finder 详细报告</title>
    <link rel="stylesheet" href="styles.css">
    <script src="charts.js"></script>
</head>
<body>
    <header>
        <h1>API 发现报告</h1>
        <div class="summary">
            <!-- 扫描摘要 -->
        </div>
    </header>
    
    <main>
        <section class="statistics">
            <!-- 统计图表 -->
        </section>
        
        <section class="endpoints">
            <!-- 端点详情 -->
        </section>
        
        <section class="timeline">
            <!-- 发现时间线 -->
        </section>
    </main>
</body>
</html>
```

#### 3. 仪表板模板 (dashboard)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Api-Finder 仪表板</title>
    <link rel="stylesheet" href="dashboard.css">
    <script src="dashboard.js"></script>
</head>
<body>
    <div class="dashboard">
        <div class="metrics">
            <!-- 关键指标 -->
        </div>
        
        <div class="charts">
            <!-- 交互式图表 -->
        </div>
        
        <div class="data-table">
            <!-- 数据表格 -->
        </div>
    </div>
</body>
</html>
```

## 📑 XML 格式

### 基本结构

```xml
<?xml version="1.0" encoding="UTF-8"?>
<scan_results>
    <scan_info>
        <target>https://api.example.com</target>
        <start_time>2024-01-15T10:30:00Z</start_time>
        <end_time>2024-01-15T10:35:00Z</end_time>
        <duration>300</duration>
        <total_requests>1500</total_requests>
        <found_endpoints>25</found_endpoints>
    </scan_info>
    
    <endpoints>
        <endpoint>
            <url>https://api.example.com/users</url>
            <method>GET</method>
            <status_code>200</status_code>
            <response_time>0.245</response_time>
            <content_length>1024</content_length>
            <content_type>application/json</content_type>
            <discovered_at>2024-01-15T10:31:15Z</discovered_at>
        </endpoint>
    </endpoints>
    
    <statistics>
        <status_codes>
            <code value="200">15</code>
            <code value="404">1200</code>
            <code value="403">50</code>
        </status_codes>
    </statistics>
</scan_results>
```

### 配置选项

```yaml
output:
  format: "xml"
  xml:
    pretty: true              # 美化输出
    encoding: "utf-8"         # 文件编码
    declaration: true         # 包含 XML 声明
    root_element: "scan_results"  # 根元素名称
```

## 📝 文本格式

### 基本格式

```text
=== Api-Finder 扫描报告 ===

目标: https://api.example.com
开始时间: 2024-01-15 10:30:00
结束时间: 2024-01-15 10:35:00
扫描时长: 5分钟
总请求数: 1500
发现端点: 25

=== 发现的端点 ===

[1] GET https://api.example.com/users
    状态码: 200
    响应时间: 0.245s
    内容长度: 1024 bytes
    内容类型: application/json
    发现时间: 2024-01-15 10:31:15

[2] GET https://api.example.com/posts
    状态码: 200
    响应时间: 0.180s
    内容长度: 2048 bytes
    内容类型: application/json
    发现时间: 2024-01-15 10:31:20

=== 统计信息 ===

状态码分布:
  200: 15 (60%)
  404: 1200 (80%)
  403: 50 (3.3%)
  500: 5 (0.3%)

响应时间:
  最小值: 0.120s
  最大值: 2.340s
  平均值: 0.456s
  中位数: 0.380s
```

### 配置选项

```yaml
output:
  format: "txt"
  txt:
    encoding: "utf-8"         # 文件编码
    line_ending: "\n"         # 行结束符
    include_statistics: true  # 包含统计信息
    include_headers: false    # 包含响应头
    max_line_length: 80       # 最大行长度
```

## 📊 专业格式

### PDF 报告

```yaml
output:
  format: "pdf"
  pdf:
    template: "professional"  # 模板类型
    include_cover: true       # 包含封面
    include_toc: true         # 包含目录
    include_charts: true      # 包含图表
    page_size: "A4"           # 页面大小
    orientation: "portrait"   # 页面方向
```

### Excel 表格

```yaml
output:
  format: "xlsx"
  xlsx:
    sheets:                   # 多工作表
      - name: "Summary"
        type: "summary"
      - name: "Endpoints"
        type: "endpoints"
      - name: "Statistics"
        type: "statistics"
    include_charts: true      # 包含图表
    auto_filter: true         # 自动筛选
```

## 🔧 自定义格式

### 自定义模板

```python
# custom_formatter.py
from api_finder.output import BaseFormatter

class CustomFormatter(BaseFormatter):
    """自定义输出格式器"""
    
    def format(self, results):
        """格式化结果"""
        output = []
        
        # 自定义格式逻辑
        for endpoint in results.endpoints:
            line = f"{endpoint.method} {endpoint.url} -> {endpoint.status_code}"
            output.append(line)
        
        return "\n".join(output)
    
    def save(self, content, filepath):
        """保存到文件"""
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
```

### 注册自定义格式

```yaml
output:
  format: "custom"
  custom:
    formatter_class: "custom_formatter.CustomFormatter"
    options:
      delimiter: " | "
      include_timestamp: true
```

## 🎨 格式化选项

### 通用选项

```yaml
output:
  # 文件选项
  file: "results.{format}"    # 动态文件名
  overwrite: true             # 覆盖现有文件
  backup: false               # 备份现有文件
  
  # 内容选项
  include_metadata: true      # 包含元数据
  include_statistics: true    # 包含统计信息
  include_errors: false       # 包含错误信息
  
  # 过滤选项
  filter_status_codes: [200, 201, 202]  # 状态码过滤
  filter_content_types: ["application/json"]  # 内容类型过滤
  min_response_time: 0.1      # 最小响应时间
  max_response_time: 5.0      # 最大响应时间
```

### 压缩选项

```yaml
output:
  compression:
    enabled: true             # 启用压缩
    format: "gzip"            # 压缩格式 (gzip, zip, bz2)
    level: 6                  # 压缩级别 (1-9)
```

## 📤 输出示例

### 命令行使用

```bash
# JSON 格式
api-finder scan https://api.example.com --output results.json --format json

# HTML 报告
api-finder scan https://api.example.com --output report.html --format html --template detailed

# CSV 数据
api-finder scan https://api.example.com --output data.csv --format csv

# 多格式输出
api-finder scan https://api.example.com --output-dir results/ --formats json,html,csv
```

### 配置文件使用

```yaml
# config.yaml
scanner:
  target: "https://api.example.com"

output:
  formats:
    - type: "json"
      file: "results/scan_results.json"
      pretty: true
    - type: "html"
      file: "results/report.html"
      template: "dashboard"
    - type: "csv"
      file: "results/endpoints.csv"
      include_headers: true
```

### Python API 使用

```python
from api_finder import ApiScanner
from api_finder.output import JsonFormatter, HtmlFormatter

# 创建扫描器
scanner = ApiScanner()

# 执行扫描
results = scanner.scan("https://api.example.com")

# JSON 输出
json_formatter = JsonFormatter(pretty=True)
json_content = json_formatter.format(results)
json_formatter.save(json_content, "results.json")

# HTML 输出
html_formatter = HtmlFormatter(template="detailed")
html_content = html_formatter.format(results)
html_formatter.save(html_content, "report.html")
```

## 🔍 格式对比

### 性能对比

| 格式 | 文件大小 | 生成速度 | 可读性 | 处理难度 |
|------|----------|----------|--------|----------|
| JSON | 中等 | 快 | 中等 | 简单 |
| CSV | 小 | 快 | 高 | 简单 |
| XML | 大 | 中等 | 中等 | 中等 |
| HTML | 大 | 慢 | 高 | 复杂 |
| TXT | 小 | 快 | 高 | 简单 |
| PDF | 大 | 慢 | 高 | 复杂 |

### 使用场景

| 场景 | 推荐格式 | 原因 |
|------|----------|------|
| API 集成 | JSON | 结构化、易解析 |
| 数据分析 | CSV, XLSX | 表格格式、工具支持 |
| 报告展示 | HTML, PDF | 可视化、专业 |
| 脚本处理 | JSON, TXT | 编程友好 |
| 存档备份 | JSON, XML | 结构完整 |
| 快速查看 | TXT, CSV | 简单直观 |

## 📚 相关资源

- [配置参考](/guide/advanced-config) - 详细配置选项
- [API 参考](/api/index) - 编程接口
- [示例代码](/examples/) - 使用示例
- [故障排除](/guide/troubleshooting) - 常见问题