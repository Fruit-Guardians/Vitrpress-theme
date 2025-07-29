# 🛡️ 安全指南

本章节介绍使用 Api-Finder 时的安全注意事项和最佳实践。

## ⚠️ 重要声明

### 合法使用原则

Api-Finder 是一个用于安全研究和开发测试的工具。使用时必须遵守以下原则：

1. **仅在授权系统上使用** - 只能扫描你拥有或已获得明确授权的系统
2. **遵守法律法规** - 确保使用符合当地法律法规要求
3. **负责任披露** - 发现安全问题时应负责任地报告给相关方
4. **避免造成损害** - 不得对目标系统造成任何形式的损害

### 法律风险提示

- 未经授权扫描他人系统可能构成违法行为
- 不同国家和地区的法律法规可能不同
- 使用前请咨询相关法律专家
- 用户需自行承担使用风险

## 🔒 安全使用指南

### 1. 获得适当授权

在使用 Api-Finder 之前，确保你有合法权限：

```bash
# ✅ 正确：扫描自己的网站
python main.py -u https://my-website.com

# ✅ 正确：在渗透测试项目中使用（已获得书面授权）
python main.py -u https://client-website.com

# ❌ 错误：未经授权扫描他人网站
python main.py -u https://random-website.com
```

### 2. 控制扫描强度

避免对目标系统造成过大负载：

```bash
# 设置合理的延迟
python main.py -u https://example.com -d 2

# 限制并发数
python main.py -u https://example.com --threads 2

# 设置超时时间
python main.py -u https://example.com -t 30
```

### 3. 保护敏感信息

```bash
# 不在命令行中暴露敏感信息
# ❌ 错误：在命令行中直接写Cookie
python main.py -u https://example.com -c "session=secret123"

# ✅ 正确：从文件读取
python main.py -u https://example.com --cookie-file cookies.txt

# ✅ 正确：使用环境变量
export API_COOKIE="session=secret123"
python main.py -u https://example.com --cookie-env API_COOKIE
```

## 🔐 数据保护

### 输出文件安全

```bash
# 加密输出文件
python main.py -u https://example.com --encrypt-output --password mypassword

# 设置文件权限（Linux/macOS）
python main.py -u https://example.com -o results.json
chmod 600 results.json

# 使用临时目录
python main.py -u https://example.com --temp-dir /secure/temp/
```

### 日志安全

```yaml
# config/logging.yaml
logging:
  # 不记录敏感信息
  sanitize_logs: true
  
  # 日志文件权限
  file_permissions: "600"
  
  # 自动清理旧日志
  auto_cleanup: true
  retention_days: 7
```

### 网络安全

```bash
# 使用安全的代理
python main.py -u https://example.com -p https://secure-proxy:8080

# 验证SSL证书
python main.py -u https://example.com --verify-ssl

# 使用安全的DNS
python main.py -u https://example.com --dns-server 1.1.1.1
```

## 🚨 风险评估

### 扫描前评估

在开始扫描前，评估以下风险：

1. **法律风险**
   - 是否有明确的授权文件？
   - 是否符合当地法律法规？
   - 是否在授权范围内？

2. **技术风险**
   - 目标系统是否有防护措施？
   - 扫描是否可能触发安全告警？
   - 是否可能影响系统正常运行？

3. **业务风险**
   - 扫描时间是否合适？
   - 是否会影响业务运营？
   - 是否有应急预案？

### 风险缓解措施

```bash
# 使用只读模式
python main.py -u https://example.com --read-only

# 限制扫描范围
python main.py -u https://example.com --scope "/api/*"

# 设置扫描窗口
python main.py -u https://example.com --time-window "02:00-04:00"

# 启用安全模式
python main.py -u https://example.com --safe-mode
```

## 🛡️ 防护绕过注意事项

### 反爬虫机制

了解常见的反爬虫机制，避免触发：

```bash
# 模拟真实用户行为
python main.py -u https://example.com --realistic-mode

# 使用浏览器指纹
python main.py -u https://example.com --browser-fingerprint

# 随机化请求模式
python main.py -u https://example.com --randomize-requests
```

### WAF 检测

避免触发 Web 应用防火墙：

```bash
# 使用低调模式
python main.py -u https://example.com --stealth-mode

# 分散请求时间
python main.py -u https://example.com --distributed-scan

# 使用白名单IP（如果可能）
python main.py -u https://example.com --whitelist-ip
```

## 📊 合规性检查

### 扫描记录

保持详细的扫描记录：

```yaml
# config/audit.yaml
audit:
  enabled: true
  log_file: "audit.log"
  include_fields:
    - timestamp
    - target_url
    - user_id
    - authorization_ref
    - scan_parameters
    - results_summary
```

### 授权验证

```bash
# 验证授权文件
python main.py -u https://example.com --auth-file authorization.pdf

# 记录授权信息
python main.py -u https://example.com --auth-ref "PENTEST-2025-001"

# 生成合规报告
python main.py -u https://example.com --compliance-report
```

## 🔍 负责任披露

### 发现安全问题时

1. **立即停止扫描**
2. **记录详细信息**
3. **联系相关负责人**
4. **提供修复建议**
5. **跟进修复进度**

### 报告模板

```markdown
# 安全问题报告

## 基本信息
- 发现时间: 2025-01-27
- 影响系统: https://example.com
- 风险等级: 中等
- 发现工具: Api-Finder v1.0.0

## 问题描述
[详细描述发现的安全问题]

## 影响评估
[评估可能的安全影响]

## 修复建议
[提供具体的修复建议]

## 联系信息
[提供联系方式以便跟进]
```

## 🚀 最佳实践

### 扫描前准备

1. **制定扫描计划**
   - 明确扫描目标和范围
   - 确定扫描时间窗口
   - 准备应急响应预案

2. **技术准备**
   - 配置合适的扫描参数
   - 准备必要的认证信息
   - 设置监控和告警

3. **团队协调**
   - 通知相关技术团队
   - 确保有技术支持
   - 建立沟通渠道

### 扫描过程中

1. **实时监控**
   - 监控扫描进度
   - 观察系统响应
   - 及时调整参数

2. **异常处理**
   - 发现异常立即停止
   - 记录异常情况
   - 分析原因并调整

### 扫描后处理

1. **结果分析**
   - 仔细分析扫描结果
   - 验证发现的问题
   - 评估安全风险

2. **报告生成**
   - 生成详细报告
   - 提供修复建议
   - 制定后续计划

## 📞 紧急联系

如果在使用过程中遇到安全问题：

1. **立即停止扫描**
2. **保存相关证据**
3. **联系项目维护者**
4. **报告安全问题**

### 联系方式

- **安全问题报告**: security@api-finder.com
- **GitHub Issues**: [提交安全问题](https://github.com/jujubooom/Api-Finder/security)
- **紧急联系**: [安全响应团队](mailto:security-team@api-finder.com)

## 📚 相关资源

- [基本使用](/guide/basic-usage) - 基础功能介绍
- [高级配置](/guide/advanced-config) - 高级功能配置
- [常见问题](/guide/faq) - 常见问题解答
- [法律声明](/legal) - 详细法律条款