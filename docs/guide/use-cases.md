# 🎯 使用案例

本章节展示 Api-Finder 在不同场景下的实际应用案例。

## 🔍 Web 应用安全测试

### 案例 1：电商网站 API 发现

**场景描述**：对一个电商网站进行安全评估，需要发现所有的 API 端点。

**目标网站**：`https://shop.example.com`

#### 扫描策略

```bash
# 1. 基础扫描 - 发现主要 API 端点
python main.py -u https://shop.example.com \
    -w wordlists/api_endpoints.txt \
    -t 10 \
    -d 1 \
    -o shop_basic_scan.json

# 2. 深度扫描 - 针对发现的 API 路径
python main.py -u https://shop.example.com/api \
    -w wordlists/ecommerce_api.txt \
    -t 5 \
    -d 2 \
    --recursive \
    -o shop_deep_scan.json

# 3. 参数模糊测试
python main.py -u https://shop.example.com/api/products \
    --fuzz-params \
    --param-wordlist wordlists/parameters.txt \
    -o shop_fuzz_scan.json
```

#### 配置文件

```yaml
# config/ecommerce_scan.yaml
scanner:
  threads: 10
  delay: 1.0
  timeout: 30
  
wordlists:
  - "wordlists/api_endpoints.txt"
  - "wordlists/ecommerce_api.txt"
  - "wordlists/rest_api.txt"

filters:
  status_codes: [200, 201, 202, 301, 302, 401, 403]
  min_content_length: 10
  exclude_extensions: [".css", ".js", ".png", ".jpg"]

output:
  format: "json"
  include_headers: true
  include_response_body: false

plugins:
  auth_plugin:
    enabled: true
    config:
      auth_type: "session"
      session_cookie: "PHPSESSID=abc123"
  
  filter_plugin:
    enabled: true
    config:
      allowed_status_codes: [200, 201, 401, 403]
```

#### 发现的端点示例

```json
{
  "endpoints": [
    {
      "url": "https://shop.example.com/api/products",
      "method": "GET",
      "status_code": 200,
      "response_time": 0.245,
      "content_length": 1024,
      "description": "产品列表 API"
    },
    {
      "url": "https://shop.example.com/api/users/profile",
      "method": "GET",
      "status_code": 401,
      "response_time": 0.123,
      "content_length": 45,
      "description": "用户资料 API（需要认证）"
    },
    {
      "url": "https://shop.example.com/api/admin/orders",
      "method": "GET",
      "status_code": 403,
      "response_time": 0.089,
      "content_length": 67,
      "description": "管理员订单 API（权限不足）"
    }
  ]
}
```

#### 安全发现

1. **未授权访问**：`/api/admin/debug` 返回 200，可能泄露敏感信息
2. **信息泄露**：`/api/users/list` 返回所有用户信息
3. **权限绕过**：`/api/v1/admin` 与 `/api/admin` 权限控制不一致

### 案例 2：移动应用后端 API 测试

**场景描述**：测试移动应用的后端 API，发现潜在的安全问题。

**目标**：`https://mobile-api.example.com`

#### 扫描命令

```bash
# 使用移动应用的 User-Agent
python main.py -u https://mobile-api.example.com \
    --user-agent "MyApp/1.0 (iOS 14.0)" \
    --header "X-API-Version: 2.0" \
    --header "X-Device-ID: 12345" \
    -w wordlists/mobile_api.txt \
    -o mobile_scan.json

# 版本扫描
python main.py -u https://mobile-api.example.com \
    --version-scan \
    --versions "v1,v2,v3,beta" \
    -o version_scan.json
```

#### 自定义字典

```text
# wordlists/mobile_api.txt
auth/login
auth/logout
auth/refresh
user/profile
user/settings
push/register
push/send
analytics/track
crash/report
update/check
config/app
```

## 🏢 企业内网渗透测试

### 案例 3：内网 Web 服务发现

**场景描述**：在获得内网访问权限后，发现内网中的 Web 服务和 API。

#### 批量扫描脚本

```bash
#!/bin/bash
# batch_scan.sh

# 内网 IP 段
networks=(
    "192.168.1.0/24"
    "10.0.0.0/24"
    "172.16.0.0/24"
)

# 常见端口
ports=(80 443 8080 8443 9000 9090)

for network in "${networks[@]}"; do
    for port in "${ports[@]}"; do
        echo "扫描 $network:$port"
        
        # 使用 nmap 发现活跃主机
        nmap -sn $network | grep -oP '(\d+\.){3}\d+' > active_hosts.txt
        
        # 对每个活跃主机进行 API 扫描
        while read host; do
            if curl -s --connect-timeout 5 http://$host:$port > /dev/null; then
                echo "发现服务: http://$host:$port"
                
                # 执行 API 扫描
                python main.py -u http://$host:$port \
                    -w wordlists/internal_api.txt \
                    -t 20 \
                    -d 0.5 \
                    -o "results/${host}_${port}_scan.json" \
                    --timeout 10
            fi
        done < active_hosts.txt
    done
done
```

#### 内网专用配置

```yaml
# config/internal_scan.yaml
scanner:
  threads: 20
  delay: 0.5
  timeout: 10
  follow_redirects: true

network:
  proxy: null  # 内网直连
  verify_ssl: false  # 内网可能使用自签名证书
  
wordlists:
  - "wordlists/internal_api.txt"
  - "wordlists/admin_panels.txt"
  - "wordlists/debug_endpoints.txt"

filters:
  status_codes: [200, 201, 301, 302, 401, 403, 500]
  exclude_content_types: ["text/css", "application/javascript"]

output:
  format: "html"
  template: "internal_report"
  include_screenshots: true
```

## 🔬 API 安全研究

### 案例 4：GraphQL API 发现

**场景描述**：发现和分析 GraphQL API 端点。

#### GraphQL 专用扫描

```bash
# 发现 GraphQL 端点
python main.py -u https://api.example.com \
    -w wordlists/graphql.txt \
    --method POST \
    --header "Content-Type: application/json" \
    --data '{"query": "{ __schema { types { name } } }"}' \
    -o graphql_discovery.json

# GraphQL 内省查询
python main.py -u https://api.example.com/graphql \
    --graphql-introspection \
    -o graphql_schema.json
```

#### GraphQL 字典

```text
# wordlists/graphql.txt
graphql
graphiql
graphql-playground
api/graphql
v1/graphql
v2/graphql
admin/graphql
```

### 案例 5：REST API 版本发现

**场景描述**：发现 API 的不同版本，寻找版本间的安全差异。

#### 版本扫描策略

```bash
# 多版本扫描
python main.py -u https://api.example.com \
    --version-discovery \
    --version-patterns "v{1-10},version{1-10},api/v{1-10}" \
    -w wordlists/api_endpoints.txt \
    -o version_discovery.json

# 比较不同版本的响应
python main.py -u https://api.example.com \
    --version-compare \
    --versions "v1,v2,v3" \
    --endpoint "/users" \
    -o version_comparison.json
```

## 🛡️ 安全合规检查

### 案例 6：OWASP API Top 10 检查

**场景描述**：根据 OWASP API Security Top 10 进行安全检查。

#### 自动化安全检查

```bash
# API1: 对象级授权失效
python main.py -u https://api.example.com \
    --check-bola \
    --user-contexts "user1:token1,user2:token2" \
    -o bola_check.json

# API2: 用户认证失效
python main.py -u https://api.example.com \
    --check-auth \
    --test-endpoints "/api/users,/api/admin" \
    -o auth_check.json

# API3: 数据暴露过度
python main.py -u https://api.example.com \
    --check-data-exposure \
    --sensitive-fields "password,ssn,credit_card" \
    -o data_exposure.json
```

#### 安全检查配置

```yaml
# config/security_check.yaml
security_checks:
  bola:
    enabled: true
    test_objects: ["1", "2", "admin", "../", "null"]
    
  authentication:
    enabled: true
    test_tokens: ["", "invalid", "expired"]
    
  data_exposure:
    enabled: true
    sensitive_patterns:
      - "password"
      - "token"
      - "secret"
      - "key"
      - "ssn"
      - "credit.*card"
    
  injection:
    enabled: true
    payloads:
      - "' OR 1=1 --"
      - "<script>alert(1)</script>"
      - "../../../etc/passwd"
```

## 📊 大规模扫描

### 案例 7：多目标批量扫描

**场景描述**：对多个目标进行批量 API 发现。

#### 批量扫描脚本

```python
#!/usr/bin/env python3
# batch_scanner.py

import json
import subprocess
import concurrent.futures
from datetime import datetime

def scan_target(target):
    """扫描单个目标"""
    print(f"开始扫描: {target}")
    
    cmd = [
        "python", "main.py",
        "-u", target,
        "-w", "wordlists/common_api.txt",
        "-t", "10",
        "-d", "1",
        "-o", f"results/{target.replace('://', '_').replace('/', '_')}.json",
        "--timeout", "30"
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=1800)
        return {
            "target": target,
            "status": "success" if result.returncode == 0 else "failed",
            "output": result.stdout,
            "error": result.stderr
        }
    except subprocess.TimeoutExpired:
        return {
            "target": target,
            "status": "timeout",
            "output": "",
            "error": "扫描超时"
        }
    except Exception as e:
        return {
            "target": target,
            "status": "error",
            "output": "",
            "error": str(e)
        }

def main():
    # 读取目标列表
    with open("targets.txt", "r") as f:
        targets = [line.strip() for line in f if line.strip()]
    
    print(f"开始批量扫描 {len(targets)} 个目标")
    
    # 并发扫描
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        results = list(executor.map(scan_target, targets))
    
    # 生成报告
    report = {
        "scan_time": datetime.now().isoformat(),
        "total_targets": len(targets),
        "results": results,
        "summary": {
            "success": len([r for r in results if r["status"] == "success"]),
            "failed": len([r for r in results if r["status"] == "failed"]),
            "timeout": len([r for r in results if r["status"] == "timeout"]),
            "error": len([r for r in results if r["status"] == "error"])
        }
    }
    
    with open("batch_scan_report.json", "w") as f:
        json.dump(report, f, indent=2)
    
    print("批量扫描完成，报告已保存到 batch_scan_report.json")

if __name__ == "__main__":
    main()
```

#### 目标列表

```text
# targets.txt
https://api1.example.com
https://api2.example.com
https://mobile.example.com
https://admin.example.com
https://beta.example.com
```

## 🔧 自定义扫描场景

### 案例 8：微服务架构扫描

**场景描述**：扫描微服务架构中的各个服务。

#### 微服务发现脚本

```bash
#!/bin/bash
# microservice_scan.sh

# 服务发现（假设使用 Consul）
consul_url="http://consul.example.com:8500"

# 获取所有服务
services=$(curl -s "$consul_url/v1/catalog/services" | jq -r 'keys[]')

for service in $services; do
    echo "发现服务: $service"
    
    # 获取服务实例
    instances=$(curl -s "$consul_url/v1/catalog/service/$service" | jq -r '.[] | "\(.ServiceAddress):\(.ServicePort)"')
    
    for instance in $instances; do
        echo "扫描实例: $instance"
        
        # 检查服务是否可访问
        if curl -s --connect-timeout 5 "http://$instance/health" > /dev/null; then
            # 执行 API 扫描
            python main.py -u "http://$instance" \
                -w "wordlists/microservice_api.txt" \
                -t 5 \
                -d 1 \
                -o "results/${service}_${instance//[:\/]/_}.json" \
                --header "X-Service-Name: $service"
        fi
    done
done
```

### 案例 9：容器化应用扫描

**场景描述**：扫描 Docker 容器中运行的应用。

#### Docker 环境扫描

```bash
# 发现运行中的容器
docker ps --format "table {{.Names}}\t{{.Ports}}" | grep -E "80|443|8080" > containers.txt

# 扫描每个容器
while read line; do
    container_name=$(echo $line | awk '{print $1}')
    ports=$(echo $line | awk '{print $2}')
    
    echo "扫描容器: $container_name"
    
    # 获取容器 IP
    container_ip=$(docker inspect $container_name | jq -r '.[0].NetworkSettings.IPAddress')
    
    if [ "$container_ip" != "null" ]; then
        # 扫描容器内的服务
        python main.py -u "http://$container_ip" \
            -w "wordlists/container_api.txt" \
            -t 10 \
            -d 0.5 \
            -o "results/container_${container_name}.json"
    fi
done < containers.txt
```

## 📈 结果分析和报告

### 案例 10：自动化报告生成

**场景描述**：自动分析扫描结果并生成详细报告。

#### 报告生成脚本

```python
#!/usr/bin/env python3
# generate_report.py

import json
import os
from datetime import datetime
from jinja2 import Template

def analyze_results(results_dir):
    """分析扫描结果"""
    all_endpoints = []
    security_issues = []
    
    for filename in os.listdir(results_dir):
        if filename.endswith('.json'):
            with open(os.path.join(results_dir, filename), 'r') as f:
                data = json.load(f)
                
                for endpoint in data.get('endpoints', []):
                    all_endpoints.append(endpoint)
                    
                    # 检查安全问题
                    if endpoint['status_code'] == 200:
                        if 'admin' in endpoint['url'].lower():
                            security_issues.append({
                                'type': 'Exposed Admin Interface',
                                'url': endpoint['url'],
                                'severity': 'High'
                            })
                        
                        if 'debug' in endpoint['url'].lower():
                            security_issues.append({
                                'type': 'Debug Interface Exposed',
                                'url': endpoint['url'],
                                'severity': 'Medium'
                            })
    
    return {
        'total_endpoints': len(all_endpoints),
        'unique_endpoints': len(set(ep['url'] for ep in all_endpoints)),
        'security_issues': security_issues,
        'endpoints_by_status': {},
        'scan_time': datetime.now().isoformat()
    }

def generate_html_report(analysis):
    """生成 HTML 报告"""
    template = Template("""
    <!DOCTYPE html>
    <html>
    <head>
        <title>API 扫描报告</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { background: #f4f4f4; padding: 20px; border-radius: 5px; }
            .section { margin: 20px 0; }
            .issue { padding: 10px; margin: 5px 0; border-radius: 3px; }
            .high { background: #ffebee; border-left: 4px solid #f44336; }
            .medium { background: #fff3e0; border-left: 4px solid #ff9800; }
            .low { background: #e8f5e8; border-left: 4px solid #4caf50; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>API 安全扫描报告</h1>
            <p>扫描时间: {{ analysis.scan_time }}</p>
            <p>发现端点: {{ analysis.total_endpoints }} 个</p>
            <p>安全问题: {{ analysis.security_issues|length }} 个</p>
        </div>
        
        <div class="section">
            <h2>安全问题</h2>
            {% for issue in analysis.security_issues %}
            <div class="issue {{ issue.severity.lower() }}">
                <strong>{{ issue.type }}</strong><br>
                URL: {{ issue.url }}<br>
                严重程度: {{ issue.severity }}
            </div>
            {% endfor %}
        </div>
    </body>
    </html>
    """)
    
    return template.render(analysis=analysis)

def main():
    results_dir = "results"
    analysis = analyze_results(results_dir)
    
    # 生成 HTML 报告
    html_report = generate_html_report(analysis)
    with open("scan_report.html", "w", encoding="utf-8") as f:
        f.write(html_report)
    
    print("报告已生成: scan_report.html")

if __name__ == "__main__":
    main()
```

## 🎯 最佳实践总结

### 扫描策略

1. **分层扫描**：从基础扫描到深度扫描
2. **目标分类**：根据目标类型选择合适的字典和配置
3. **时间控制**：合理设置延迟和超时时间
4. **结果验证**：对发现的端点进行手工验证

### 安全考虑

1. **授权确认**：确保有合法的测试授权
2. **影响评估**：评估扫描对目标系统的影响
3. **数据保护**：妥善保护扫描结果和敏感信息
4. **负责任披露**：发现安全问题时负责任地报告

### 效率优化

1. **并发控制**：根据目标系统调整并发数
2. **智能过滤**：使用过滤器减少无效结果
3. **缓存利用**：避免重复扫描相同目标
4. **资源监控**：监控扫描过程中的资源使用

## 📚 相关资源

- [基本使用](/guide/basic-usage) - 基础功能介绍
- [高级配置](/guide/advanced-config) - 高级功能配置
- [安全指南](/guide/security) - 安全使用指南
- [常见问题](/guide/faq) - 常见问题解答