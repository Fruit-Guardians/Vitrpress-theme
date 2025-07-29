# 💡 使用示例

这里提供了 Api-Finder 的各种使用示例，帮助你快速掌握不同场景下的使用方法。

## 🌐 基础网站扫描

### 简单扫描

最基本的使用方式：

```bash
# 扫描单个网站
python main.py -u https://example.com
```

**输出示例：**
```
[INFO] 开始扫描: https://example.com
[INFO] 正在获取页面内容...
[INFO] 正在分析 JavaScript 文件...
[INFO] 发现 8 个API端点

🔍 发现的API端点:
┌─────────────────────────────────────────────────────────────┐
│ Method │ Endpoint                                            │
├─────────────────────────────────────────────────────────────┤
│ GET    │ /api/users                                          │
│ POST   │ /api/login                                          │
│ GET    │ /api/products                                       │
│ PUT    │ /api/users/{id}                                     │
│ DELETE │ /api/users/{id}                                     │
│ GET    │ /api/orders                                         │
│ POST   │ /api/orders                                         │
│ GET    │ /graphql                                            │
└─────────────────────────────────────────────────────────────┘

[SUCCESS] 扫描完成！发现 8 个API端点
```

### 详细输出模式

获取更多扫描信息：

```bash
# 启用详细输出
python main.py -u https://example.com -v
```

**输出示例：**
```
[INFO] Api-Finder v1.0.0 启动
[INFO] 目标URL: https://example.com
[INFO] User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
[INFO] 超时设置: 30秒
[INFO] 开始扫描...

[DEBUG] 正在获取主页面: https://example.com
[DEBUG] 响应状态码: 200
[DEBUG] 页面大小: 45.2 KB
[DEBUG] 发现 12 个 JavaScript 文件

[DEBUG] 分析文件: /static/js/main.js (125.4 KB)
[DEBUG] 在 main.js:45 发现: GET /api/users
[DEBUG] 在 main.js:78 发现: POST /api/login

[DEBUG] 分析文件: /static/js/app.js (89.7 KB)
[DEBUG] 在 app.js:156 发现: GET /api/products

[INFO] 扫描完成，共分析 12 个文件
[INFO] 发现 8 个唯一API端点
```

## 🔐 认证扫描示例

### 使用 Cookie 认证

扫描需要登录的页面：

```bash
# 使用单个Cookie
python main.py -u https://app.example.com -c "session=abc123"

# 使用多个Cookie
python main.py -u https://app.example.com -c "session=abc123; token=xyz789; user_id=12345"
```

### 获取 Cookie 的方法

1. **浏览器开发者工具**：
   - 打开目标网站并登录
   - 按 F12 打开开发者工具
   - 切换到 Network 标签
   - 刷新页面，查看请求头中的 Cookie

2. **使用 curl 获取**：
   ```bash
   curl -c cookies.txt -d "username=user&password=pass" https://example.com/login
   cat cookies.txt
   ```

### 认证扫描示例

```bash
# 扫描管理后台
python main.py -u https://admin.example.com -c "admin_session=xyz789" -v

# 扫描用户仪表板
python main.py -u https://dashboard.example.com -c "user_token=abc123; csrf_token=def456"
```

## 🌍 代理和网络配置

### HTTP 代理

```bash
# 使用HTTP代理
python main.py -u https://example.com -p http://proxy.example.com:8080

# 带认证的HTTP代理
python main.py -u https://example.com -p http://user:pass@proxy.example.com:8080
```

### SOCKS 代理

```bash
# 使用SOCKS5代理
python main.py -u https://example.com -p socks5://127.0.0.1:1080

# 使用SOCKS4代理
python main.py -u https://example.com -p socks4://127.0.0.1:1080
```

### Tor 网络

```bash
# 通过Tor网络扫描（需要先启动Tor）
python main.py -u https://example.com -p socks5://127.0.0.1:9050
```

## 📱 设备模拟

### 移动设备扫描

```bash
# 模拟iPhone
python main.py -u https://m.example.com -a phone

# 模拟Android设备
python main.py -u https://m.example.com -a "Mozilla/5.0 (Android 11; Mobile)"

# 模拟iPad
python main.py -u https://m.example.com -a tablet
```

### 微信浏览器

```bash
# 模拟微信内置浏览器
python main.py -u https://wx.example.com -a weixin

# 扫描微信小程序后端API
python main.py -u https://api.weixin.qq.com -a weixin -c "session_key=xxx"
```

### 随机 User-Agent

```bash
# 使用随机User-Agent
python main.py -u https://example.com -r

# 每次请求使用不同的User-Agent
python main.py -u https://example.com -r -v
```

## 📊 输出格式示例

### JSON 输出

```bash
# 输出到JSON文件
python main.py -u https://example.com -o results.json
```

**results.json 内容：**
```json
{
  "scan_info": {
    "target": "https://example.com",
    "timestamp": "2025-01-27T10:30:00Z",
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "total_apis": 8,
    "scan_duration": "3.2s",
    "files_analyzed": 12
  },
  "apis": [
    {
      "method": "GET",
      "endpoint": "/api/users",
      "source_file": "main.js",
      "line_number": 45,
      "confidence": 0.95,
      "full_url": "https://example.com/api/users"
    },
    {
      "method": "POST",
      "endpoint": "/api/login",
      "source_file": "auth.js",
      "line_number": 23,
      "confidence": 0.98,
      "full_url": "https://example.com/api/login"
    }
  ],
  "statistics": {
    "methods": {
      "GET": 4,
      "POST": 2,
      "PUT": 1,
      "DELETE": 1
    },
    "confidence_distribution": {
      "high": 6,
      "medium": 2,
      "low": 0
    }
  }
}
```

### CSV 输出

```bash
# 输出到CSV文件
python main.py -u https://example.com -o results.csv
```

**results.csv 内容：**
```csv
Method,Endpoint,Source,Line,Confidence,Full_URL
GET,/api/users,main.js,45,0.95,https://example.com/api/users
POST,/api/login,auth.js,23,0.98,https://example.com/api/login
GET,/api/products,shop.js,67,0.92,https://example.com/api/products
PUT,/api/users/{id},main.js,89,0.90,https://example.com/api/users/{id}
DELETE,/api/users/{id},main.js,95,0.88,https://example.com/api/users/{id}
```

### HTML 报告

```bash
# 生成HTML报告
python main.py -u https://example.com -o report.html
```

HTML报告包含：
- 📊 扫描统计图表
- 🔍 详细的API列表
- 📱 响应式设计
- 🎨 现代化界面
- 🔗 可点击的链接

### Excel 输出

```bash
# 输出到Excel文件（需要安装openpyxl）
pip install openpyxl
python main.py -u https://example.com -o results.xlsx
```

Excel文件包含多个工作表：
- **Summary** - 扫描摘要
- **APIs** - 详细API列表
- **Statistics** - 统计图表
- **Files** - 分析的文件列表

## 🎯 高级扫描技巧

### 批量扫描

```bash
# 创建目标列表文件
echo "https://example1.com" > targets.txt
echo "https://example2.com" >> targets.txt
echo "https://example3.com" >> targets.txt

# 批量扫描（需要自定义脚本）
for url in $(cat targets.txt); do
    python main.py -u "$url" -o "results_$(echo $url | sed 's/https:\/\///g' | sed 's/\//_/g').json"
done
```

### 深度扫描

```bash
# 增加超时时间进行深度扫描
python main.py -u https://example.com -t 60 -v

# 添加延迟避免被限制
python main.py -u https://example.com -d 2.0 -v
```

### 自定义规则扫描

```bash
# 强制更新规则后扫描
python main.py -u https://example.com -U -v

# 使用自定义规则文件
python main.py -u https://example.com --rules custom_rules.yaml
```

## 🔍 实际应用场景

### 1. 安全测试

```bash
# 渗透测试前的信息收集
python main.py -u https://target.com -c "session=xxx" -o pentest_apis.json -v

# 分析结果，寻找敏感API端点
grep -i "admin\|password\|token\|secret" pentest_apis.json
```

### 2. API 文档生成

```bash
# 扫描现有应用生成API清单
python main.py -u https://myapp.com -o api_inventory.html

# 用于API文档的基础数据
python main.py -u https://myapp.com -o api_list.json
```

### 3. 竞品分析

```bash
# 分析竞争对手的API结构
python main.py -u https://competitor.com -a phone -o competitor_apis.json

# 对比不同版本的API变化
python main.py -u https://competitor.com/v1 -o v1_apis.json
python main.py -u https://competitor.com/v2 -o v2_apis.json
```

### 4. 开发调试

```bash
# 检查开发环境的API暴露情况
python main.py -u https://dev.myapp.com -c "dev_session=xxx" -v

# 验证生产环境API安全性
python main.py -u https://prod.myapp.com -o prod_security_check.json
```

## 📈 性能优化

### 并发扫描

```bash
# 使用多线程加速扫描（自定义脚本）
python main.py -u https://example.com --threads 5 -v
```

### 缓存优化

```bash
# 启用缓存减少重复请求
python main.py -u https://example.com --cache -v

# 清除缓存
python main.py --clear-cache
```

## 🛡️ 安全最佳实践

### 1. 合法使用

```bash
# 仅扫描授权的目标
python main.py -u https://my-authorized-target.com

# 添加标识信息
python main.py -u https://example.com -a "Security-Test-Bot/1.0 (authorized-scan)"
```

### 2. 频率控制

```bash
# 添加请求延迟
python main.py -u https://example.com -d 3.0

# 设置合理的超时
python main.py -u https://example.com -t 15
```

### 3. 数据保护

```bash
# 输出到安全目录
python main.py -u https://example.com -o /secure/path/results.json

# 加密输出文件
python main.py -u https://example.com -o results.json
gpg -c results.json  # 加密文件
rm results.json      # 删除原文件
```

## 🎯 下一步

通过这些示例，你应该已经掌握了 Api-Finder 的基本和高级用法。接下来你可以：

1. 🔧 查看 [高级配置](/guide/advanced-config) 了解更多配置选项
2. 📊 学习 [输出格式](/guide/output-formats) 的详细说明
3. 🛡️ 阅读 [安全注意事项](/guide/security) 确保合规使用
4. 🔧 查看 [API参考](/api/) 了解开发者接口