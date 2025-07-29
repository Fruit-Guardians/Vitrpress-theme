# 性能优化指南

本指南将帮助您优化 Api-Finder 的性能，提高扫描效率和资源利用率。

## 概述

Api-Finder 的性能优化涉及多个方面：
- 网络配置优化
- 内存使用优化
- 并发控制
- 缓存策略
- 输出优化

## 网络性能优化

### 连接池配置

```yaml
# config.yaml
network:
  connection_pool:
    max_connections: 100
    max_connections_per_host: 20
    keep_alive: true
    timeout: 30
```

### 请求超时设置

```yaml
network:
  timeouts:
    connect: 10
    read: 30
    total: 60
```

### DNS 优化

```yaml
network:
  dns:
    cache_size: 1000
    cache_ttl: 300
    servers:
      - "8.8.8.8"
      - "1.1.1.1"
```

## 并发控制

### 线程池配置

```yaml
performance:
  threads:
    max_workers: 50
    queue_size: 1000
    timeout: 300
```

### 速率限制

```yaml
performance:
  rate_limit:
    requests_per_second: 100
    burst_size: 200
    delay_between_requests: 0.01
```

## 内存优化

### 缓存配置

```yaml
cache:
  enabled: true
  max_size: "512MB"
  ttl: 3600
  cleanup_interval: 300
```

### 批处理设置

```yaml
performance:
  batch:
    size: 1000
    flush_interval: 60
    max_memory: "256MB"
```

## 扫描优化

### 智能扫描

```yaml
scanner:
  intelligent:
    enabled: true
    learning_rate: 0.1
    min_confidence: 0.8
    adaptive_timeout: true
```

### 过滤优化

```yaml
filters:
  early_filtering: true
  status_codes:
    skip: [404, 403, 500]
  content_types:
    include: ["application/json", "text/html"]
```

## 输出优化

### 流式输出

```yaml
output:
  streaming: true
  buffer_size: 8192
  compression: true
```

### 格式优化

```yaml
output:
  format: "json"
  minimal: true
  exclude_fields: ["raw_response", "headers"]
```

## 监控和分析

### 性能指标

```python
from api_finder import ApiScanner, PerformanceMonitor

scanner = ApiScanner()
monitor = PerformanceMonitor()

# 启用监控
scanner.enable_monitoring(monitor)

# 执行扫描
results = scanner.scan("https://api.example.com")

# 获取性能报告
report = monitor.get_report()
print(f"扫描时间: {report.total_time}s")
print(f"请求数量: {report.total_requests}")
print(f"平均响应时间: {report.avg_response_time}ms")
```

### 资源使用监控

```python
# 内存使用监控
memory_usage = monitor.get_memory_usage()
print(f"内存使用: {memory_usage.current}MB")
print(f"峰值内存: {memory_usage.peak}MB")

# CPU 使用监控
cpu_usage = monitor.get_cpu_usage()
print(f"CPU 使用率: {cpu_usage.average}%")
```

## 性能调优建议

### 基础优化

1. **合理设置并发数**
   ```bash
   # 根据目标服务器性能调整
   api-finder scan --threads 20 --rate-limit 50 https://api.example.com
   ```

2. **启用缓存**
   ```bash
   api-finder scan --cache --cache-size 512MB https://api.example.com
   ```

3. **使用过滤器**
   ```bash
   api-finder scan --filter-status 200,201,202 https://api.example.com
   ```

### 高级优化

1. **自定义扫描策略**
   ```python
   from api_finder import CustomScanner
   
   class OptimizedScanner(CustomScanner):
       def should_scan_endpoint(self, endpoint):
           # 自定义扫描逻辑
           if endpoint.path.endswith('.css'):
               return False
           return True
   ```

2. **动态调整参数**
   ```python
   scanner = ApiScanner()
   
   # 根据响应时间动态调整
   if avg_response_time > 1000:
       scanner.set_rate_limit(10)
   else:
       scanner.set_rate_limit(100)
   ```

## 性能基准测试

### 测试环境

```yaml
benchmark:
  target: "https://api.example.com"
  duration: 300  # 5分钟
  threads: [10, 20, 50, 100]
  rate_limits: [10, 50, 100, 200]
```

### 基准测试结果

| 线程数 | 速率限制 | 总请求数 | 成功率 | 平均响应时间 |
|--------|----------|----------|--------|--------------|
| 10     | 50       | 15,000   | 99.8%  | 120ms        |
| 20     | 100      | 30,000   | 99.5%  | 150ms        |
| 50     | 200      | 60,000   | 98.2%  | 200ms        |

### 性能瓶颈分析

1. **网络瓶颈**
   - 症状：高延迟，低吞吐量
   - 解决：优化网络配置，使用CDN

2. **内存瓶颈**
   - 症状：内存使用持续增长
   - 解决：启用流式处理，减少缓存

3. **CPU瓶颈**
   - 症状：CPU使用率持续100%
   - 解决：减少并发数，优化算法

## 最佳实践

### 生产环境配置

```yaml
# production.yaml
performance:
  threads: 30
  rate_limit: 100
  timeout: 30
  
cache:
  enabled: true
  max_size: "1GB"
  
output:
  streaming: true
  compression: true
  
monitoring:
  enabled: true
  metrics_interval: 60
```

### 监控告警

```yaml
alerts:
  memory_usage:
    threshold: 80%
    action: "reduce_cache_size"
  
  response_time:
    threshold: 5000ms
    action: "reduce_rate_limit"
  
  error_rate:
    threshold: 5%
    action: "pause_scanning"
```

## 故障排除

### 常见性能问题

1. **扫描速度慢**
   ```bash
   # 检查网络延迟
   api-finder test-network --target https://api.example.com
   
   # 增加并发数
   api-finder scan --threads 50 https://api.example.com
   ```

2. **内存使用过高**
   ```bash
   # 启用流式处理
   api-finder scan --streaming --no-cache https://api.example.com
   ```

3. **频繁超时**
   ```bash
   # 增加超时时间
   api-finder scan --timeout 60 https://api.example.com
   ```

### 性能诊断工具

```bash
# 性能分析
api-finder profile --duration 60 https://api.example.com

# 内存分析
api-finder memory-profile --output memory-report.json

# 网络分析
api-finder network-test --verbose https://api.example.com
```

## 相关资源

- [配置参考](/guide/advanced-config) - 详细配置选项
- [监控指南](/monitor/) - 监控和告警配置
- [故障排除](/guide/troubleshooting) - 问题解决方案
- [API 参考](/api/index) - 性能相关API