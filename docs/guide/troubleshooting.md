# 🔧 故障排除

本页面提供常见问题的解决方案和故障排除指南。

## 🚨 常见错误

### 连接错误

#### 连接超时
```
Error: Connection timeout to https://example.com
```

**解决方案：**
1. 检查网络连接
2. 增加超时时间：`--timeout 60`
3. 检查目标是否可访问
4. 尝试使用代理：`-p http://proxy:8080`

#### 连接被拒绝
```
Error: Connection refused
```

**解决方案：**
1. 确认目标端口是否开放
2. 检查防火墙设置
3. 验证目标 URL 是否正确
4. 尝试不同的端口

#### SSL/TLS 错误
```
Error: SSL certificate verification failed
```

**解决方案：**
1. 跳过 SSL 验证：`--no-verify-ssl`
2. 使用自定义 CA 证书：`--ca-cert ca.pem`
3. 更新证书存储
4. 检查系统时间

### 认证错误

#### 401 未授权
```
Error: 401 Unauthorized
```

**解决方案：**
1. 检查认证凭据
2. 验证 Token 是否过期
3. 确认认证方式正确
4. 检查权限范围

#### 403 禁止访问
```
Error: 403 Forbidden
```

**解决方案：**
1. 检查用户权限
2. 验证 API Key 权限
3. 确认 IP 白名单
4. 检查速率限制

### 配置错误

#### 配置文件格式错误
```
Error: Invalid YAML format in config file
```

**解决方案：**
1. 验证 YAML 语法
2. 检查缩进格式
3. 确认特殊字符转义
4. 使用 YAML 验证工具

#### 字典文件不存在
```
Error: Wordlist file not found
```

**解决方案：**
1. 检查文件路径
2. 确认文件权限
3. 使用绝对路径
4. 验证文件格式

## 🔍 调试技巧

### 启用调试模式

```bash
# 基础调试
python main.py -u https://example.com --debug

# 详细日志
python main.py -u https://example.com --log-level DEBUG

# 保存调试日志
python main.py -u https://example.com --debug --log-file debug.log
```

### 网络诊断

```bash
# 测试连接
python main.py -u https://example.com --test-connection

# DNS 解析测试
python main.py -u https://example.com --test-dns

# 代理测试
python main.py -u https://example.com -p http://proxy:8080 --test-proxy
```

### 性能分析

```bash
# 启用性能分析
python main.py -u https://example.com --profile

# 内存使用监控
python main.py -u https://example.com --memory-monitor

# 请求统计
python main.py -u https://example.com --request-stats
```

## 🛠️ 性能优化

### 内存使用优化

#### 大量目标扫描
```bash
# 启用内存优化模式
python main.py --targets-file large_targets.txt --memory-efficient

# 分批处理
python main.py --targets-file targets.txt --batch-size 100

# 限制内存使用
python main.py -u https://example.com --max-memory 512  # MB
```

#### 大字典扫描
```bash
# 流式处理字典
python main.py -u https://example.com -w large_wordlist.txt --stream-wordlist

# 字典分片
python main.py -u https://example.com -w wordlist.txt --wordlist-chunk-size 1000
```

### 网络性能优化

#### 连接池配置
```bash
# 增加连接池大小
python main.py -u https://example.com --pool-size 100

# 启用连接复用
python main.py -u https://example.com --keep-alive

# 设置连接超时
python main.py -u https://example.com --pool-timeout 30
```

#### 并发控制
```bash
# 调整线程数
python main.py -u https://example.com -t 50

# 设置请求间隔
python main.py -u https://example.com -d 0.1

# 启用自适应延迟
python main.py -u https://example.com --adaptive-delay
```

### 缓存优化

```bash
# 启用响应缓存
python main.py -u https://example.com --enable-cache

# 设置缓存大小
python main.py -u https://example.com --cache-size 10000

# 持久化缓存
python main.py -u https://example.com --cache-file cache.db
```

## 🔧 配置问题

### 代理配置

#### HTTP 代理
```yaml
network:
  proxy: "http://proxy.example.com:8080"
  proxy_auth:
    username: "user"
    password: "pass"
```

#### SOCKS 代理
```yaml
network:
  proxy: "socks5://proxy.example.com:1080"
  proxy_timeout: 30
```

#### 代理链
```yaml
network:
  proxy_chain:
    - "http://proxy1:8080"
    - "socks5://proxy2:1080"
```

### SSL/TLS 配置

#### 自定义证书
```yaml
network:
  ssl:
    verify: true
    ca_cert: "/path/to/ca.pem"
    client_cert: "/path/to/client.pem"
    client_key: "/path/to/client.key"
```

#### 禁用 SSL 验证
```yaml
network:
  ssl:
    verify: false
    allow_insecure: true
```

### 认证配置

#### Bearer Token
```yaml
auth:
  type: "bearer"
  token: "${API_TOKEN}"
  header: "Authorization"
```

#### API Key
```yaml
auth:
  type: "apikey"
  key: "${API_KEY}"
  location: "header"  # header, query, cookie
  name: "X-API-Key"
```

#### Basic 认证
```yaml
auth:
  type: "basic"
  username: "${USERNAME}"
  password: "${PASSWORD}"
```

## 📊 输出问题

### 格式错误

#### JSON 格式问题
```bash
# 验证 JSON 输出
python main.py -u https://example.com -o results.json --validate-json

# 美化 JSON 输出
python main.py -u https://example.com -o results.json --pretty-json
```

#### HTML 报告问题
```bash
# 使用自定义模板
python main.py -u https://example.com -o report.html --template custom

# 包含完整响应
python main.py -u https://example.com -o report.html --include-full-response
```

### 文件权限问题

```bash
# 检查输出目录权限
ls -la output/

# 创建输出目录
mkdir -p output/reports

# 设置文件权限
chmod 755 output/
```

## 🔌 插件问题

### 插件加载失败

#### 检查插件路径
```python
import sys
print(sys.path)

# 添加插件路径
sys.path.append('/path/to/plugins')
```

#### 验证插件格式
```python
# plugins/example_plugin.py
from api_finder.plugins import Plugin

class ExamplePlugin(Plugin):
    def __init__(self, config):
        super().__init__(config)
    
    def before_request(self, request):
        return request
```

### 插件配置错误

```yaml
plugins:
  example_plugin:
    enabled: true
    config:
      parameter1: "value1"
      parameter2: 123
```

## 🚀 部署问题

### Docker 部署

#### 构建问题
```dockerfile
# 确保基础镜像正确
FROM python:3.9-slim

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# 安装 Python 依赖
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
```

#### 运行问题
```bash
# 检查容器日志
docker logs api-finder-container

# 进入容器调试
docker exec -it api-finder-container /bin/bash

# 挂载配置文件
docker run -v $(pwd)/config:/app/config api-finder
```

### Kubernetes 部署

#### 资源限制
```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "100m"
  limits:
    memory: "1Gi"
    cpu: "500m"
```

#### 存储配置
```yaml
volumeMounts:
- name: config-volume
  mountPath: /app/config
- name: results-volume
  mountPath: /app/results
```

## 📈 监控和日志

### 日志配置

```yaml
logging:
  level: "INFO"
  format: "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
  file: "api_finder.log"
  max_size: "10MB"
  backup_count: 5
```

### 监控指标

```bash
# 启用指标收集
python main.py -u https://example.com --enable-metrics

# 导出 Prometheus 指标
python main.py -u https://example.com --metrics-port 9090

# 健康检查端点
curl http://localhost:8080/health
```

### 告警配置

```yaml
alerts:
  error_rate:
    threshold: 0.1
    window: "5m"
    action: "webhook"
    url: "https://alerts.example.com/webhook"
  
  response_time:
    threshold: 5.0
    window: "1m"
    action: "email"
    recipients: ["admin@example.com"]
```

## 🔒 安全问题

### 敏感信息泄露

#### 环境变量使用
```bash
# 设置环境变量
export API_TOKEN="your_secret_token"
export DB_PASSWORD="your_db_password"

# 在配置中引用
python main.py -u https://example.com --config config.yaml
```

#### 配置文件加密
```bash
# 加密配置文件
gpg --symmetric --cipher-algo AES256 config.yaml

# 解密并使用
gpg --decrypt config.yaml.gpg | python main.py --config -
```

### 网络安全

#### VPN 配置
```bash
# 通过 VPN 扫描
openvpn --config client.ovpn &
python main.py -u https://internal.example.com
```

#### 防火墙规则
```bash
# 允许出站连接
iptables -A OUTPUT -p tcp --dport 80,443 -j ACCEPT

# 限制连接速率
iptables -A OUTPUT -p tcp --dport 80 -m limit --limit 10/sec -j ACCEPT
```

## 📞 获取帮助

### 社区支持

- **GitHub Issues**: [报告问题](https://github.com/api-finder/api-finder/issues)
- **讨论论坛**: [参与讨论](https://github.com/api-finder/api-finder/discussions)
- **文档**: [查看文档](/guide/)

### 商业支持

- **技术支持**: support@api-finder.com
- **培训服务**: training@api-finder.com
- **定制开发**: custom@api-finder.com

### 诊断信息收集

```bash
# 生成诊断报告
python main.py --generate-diagnostic-report

# 系统信息
python main.py --system-info

# 网络测试
python main.py --network-diagnostic
```

## 📚 相关资源

- [安装指南](/guide/installation) - 安装和配置
- [基本使用](/guide/basic-usage) - 基础功能
- [高级配置](/guide/advanced-config) - 高级功能
- [常见问题](/guide/faq) - 常见问题解答