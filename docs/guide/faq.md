# ❓ 常见问题

这里收集了用户在使用 Api-Finder 过程中遇到的常见问题和解决方案。

## 🚀 安装和配置问题

### Q: 安装依赖时出现错误怎么办？

**A:** 常见的依赖安装问题及解决方案：

```bash
# 问题1: pip 版本过旧
pip install --upgrade pip

# 问题2: 网络连接问题
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple/

# 问题3: 权限问题（Windows）
pip install -r requirements.txt --user

# 问题4: Python版本不兼容
python --version  # 确保是 3.7+
```

### Q: 如何在 Windows 上安装？

**A:** Windows 安装步骤：

1. 安装 Python 3.7+ (从 python.org 下载)
2. 打开命令提示符（以管理员身份运行）
3. 执行安装命令：

```cmd
git clone https://github.com/jujubooom/Api-Finder.git
cd Api-Finder
pip install -r requirements.txt
```

### Q: macOS 上安装失败怎么办？

**A:** macOS 常见问题：

```bash
# 使用 Homebrew 安装 Python
brew install python3

# 如果遇到权限问题
sudo pip3 install -r requirements.txt

# 或者使用虚拟环境
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## 🔍 扫描问题

### Q: 扫描结果为空怎么办？

**A:** 可能的原因和解决方案：

1. **网站使用了反爬虫机制**
   ```bash
   # 使用随机User-Agent和延迟
   python main.py -u https://example.com -r -d 2
   ```

2. **需要认证才能访问**
   ```bash
   # 添加Cookie认证
   python main.py -u https://example.com -c "session=your_session"
   ```

3. **网站主要使用动态加载**
   ```bash
   # 增加超时时间，让页面充分加载
   python main.py -u https://example.com -t 60
   ```

4. **扫描规则不匹配**
   ```bash
   # 使用详细模式查看扫描过程
   python main.py -u https://example.com -v
   ```

### Q: 如何扫描需要登录的网站？

**A:** 获取和使用认证信息：

1. **获取Cookie**：
   - 在浏览器中登录网站
   - 按F12打开开发者工具
   - 在Network标签中查看请求头
   - 复制Cookie值

2. **使用Cookie扫描**：
   ```bash
   python main.py -u https://app.example.com -c "sessionid=abc123; csrftoken=xyz789"
   ```

3. **使用多个认证参数**：
   ```bash
   python main.py -u https://app.example.com \
     -c "session=abc123" \
     -H "Authorization: Bearer token123"
   ```

### Q: 扫描速度太慢怎么办？

**A:** 性能优化建议：

```bash
# 增加并发线程数
python main.py -u https://example.com --threads 10

# 减少延迟时间（注意不要太激进）
python main.py -u https://example.com -d 0.5

# 设置合适的超时时间
python main.py -u https://example.com -t 15

# 使用缓存（如果重复扫描）
python main.py -u https://example.com --cache
```

## 🌐 网络问题

### Q: 连接超时怎么办？

**A:** 网络连接问题解决：

```bash
# 增加超时时间
python main.py -u https://example.com -t 60

# 使用代理
python main.py -u https://example.com -p http://proxy:8080

# 重试机制
python main.py -u https://example.com --max-retries 5
```

### Q: 如何配置代理？

**A:** 各种代理配置方式：

```bash
# HTTP代理
python main.py -u https://example.com -p http://proxy:8080

# 带认证的HTTP代理
python main.py -u https://example.com -p http://user:pass@proxy:8080

# SOCKS5代理
python main.py -u https://example.com -p socks5://127.0.0.1:1080

# 系统代理
export http_proxy=http://proxy:8080
export https_proxy=http://proxy:8080
python main.py -u https://example.com
```

### Q: 被网站封IP怎么办？

**A:** 避免被封的策略：

```bash
# 使用代理轮换
python main.py -u https://example.com --proxy-rotation

# 增加请求延迟
python main.py -u https://example.com -d 3

# 使用随机User-Agent
python main.py -u https://example.com -r

# 模拟真实浏览器行为
python main.py -u https://example.com --realistic-mode
```

## 📊 输出问题

### Q: 输出文件格式不正确？

**A:** 输出格式问题解决：

```bash
# 指定正确的输出格式
python main.py -u https://example.com -f json -o results.json

# 检查文件扩展名和格式是否匹配
python main.py -u https://example.com -f csv -o results.csv

# 使用默认格式
python main.py -u https://example.com -o results.txt
```

### Q: 如何自定义输出格式？

**A:** 自定义输出示例：

```bash
# 只输出API端点
python main.py -u https://example.com --output-fields endpoint

# 包含更多信息
python main.py -u https://example.com --output-fields endpoint,method,source,confidence

# 过滤低置信度结果
python main.py -u https://example.com --min-confidence 0.8
```

## 🔧 配置问题

### Q: 如何修改默认配置？

**A:** 配置文件修改：

1. **创建配置文件**：
   ```bash
   cp config/settings.yaml.example config/settings.yaml
   ```

2. **修改配置**：
   ```yaml
   default:
     timeout: 30
     delay: 1.0
     output_format: "json"
   ```

3. **使用配置文件**：
   ```bash
   python main.py -u https://example.com --config config/settings.yaml
   ```

### Q: 如何添加自定义扫描规则？

**A:** 自定义规则添加：

1. **编辑规则文件**：
   ```yaml
   # config/custom_rules.yaml
   api_patterns:
     - pattern: '\/custom\/api\/[a-zA-Z0-9_\-\/]+'
       confidence: 0.9
       description: "Custom API pattern"
   ```

2. **使用自定义规则**：
   ```bash
   python main.py -u https://example.com --rules config/custom_rules.yaml
   ```

## 🐛 错误处理

### Q: 出现 SSL 证书错误？

**A:** SSL 问题解决：

```bash
# 忽略SSL证书验证（不推荐用于生产环境）
python main.py -u https://example.com --ignore-ssl

# 指定CA证书包
python main.py -u https://example.com --ca-bundle /path/to/ca-bundle.crt

# 使用系统证书
python main.py -u https://example.com --system-certs
```

### Q: 内存使用过高怎么办？

**A:** 内存优化方案：

```bash
# 限制最大文件大小
python main.py -u https://example.com --max-file-size 10MB

# 减少并发线程
python main.py -u https://example.com --threads 2

# 启用流式处理
python main.py -u https://example.com --streaming
```

### Q: 程序崩溃怎么办？

**A:** 调试和故障排除：

```bash
# 启用调试模式
python main.py -u https://example.com --debug

# 保存调试日志
python main.py -u https://example.com --debug --log-file debug.log

# 查看详细错误信息
python main.py -u https://example.com -v --traceback
```

## 📱 特殊场景

### Q: 如何扫描单页应用(SPA)？

**A:** SPA 扫描策略：

```bash
# 增加等待时间让JS充分执行
python main.py -u https://spa.example.com -t 60 --wait-js 10

# 模拟用户交互
python main.py -u https://spa.example.com --interactive-mode

# 扫描特定的JS框架
python main.py -u https://spa.example.com --framework react
```

### Q: 如何扫描移动端API？

**A:** 移动端扫描配置：

```bash
# 模拟移动设备
python main.py -u https://m.example.com -a phone

# 模拟微信浏览器
python main.py -u https://wx.example.com -a weixin

# 扫描APP的H5页面
python main.py -u https://app.example.com -a "App WebView"
```

## 🔒 安全问题

### Q: 如何确保扫描的合法性？

**A:** 合法使用指南：

1. **获得授权**：确保有权限扫描目标系统
2. **遵守法律**：了解并遵守当地法律法规
3. **负责任披露**：发现安全问题时负责任地报告
4. **避免破坏**：不要对目标系统造成损害

### Q: 如何保护扫描数据？

**A:** 数据保护措施：

```bash
# 加密输出文件
python main.py -u https://example.com --encrypt-output

# 不保存敏感信息
python main.py -u https://example.com --no-save-cookies

# 使用临时文件
python main.py -u https://example.com --temp-files
```

## 📞 获取帮助

如果以上解决方案都无法解决你的问题：

1. **查看日志**：检查详细的错误日志
2. **搜索Issues**：在GitHub上搜索类似问题
3. **提交Issue**：[创建新的Issue](https://github.com/jujubooom/Api-Finder/issues)
4. **参与讨论**：在[讨论区](https://github.com/jujubooom/Api-Finder/discussions)提问

### 提交Issue时请包含：

- 操作系统和Python版本
- Api-Finder版本
- 完整的错误信息
- 重现问题的步骤
- 相关的配置文件（去除敏感信息）

## 📚 相关资源

- [基本使用](/guide/basic-usage) - 基础功能介绍
- [高级配置](/guide/advanced-config) - 高级功能配置
- [使用示例](/examples/) - 实际应用案例
- [安全指南](/guide/security) - 安全最佳实践