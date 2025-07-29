# 🐛 已知问题

## 📋 问题分类

### 🔴 严重问题

#### 数据丢失风险

**问题**: 在某些情况下扫描结果可能丢失
- **影响版本**: 2.1.0 - 2.1.3
- **触发条件**: 扫描过程中系统异常关闭
- **状态**: 🔧 已在 2.1.4 修复
- **临时解决方案**: 启用自动保存功能

```yaml
# 临时解决方案
output:
  auto_save: true
  save_interval: 100  # 每100个结果保存一次
```

**问题**: 大文件输出时内存溢出
- **影响版本**: 所有版本
- **触发条件**: 扫描结果超过 10万条
- **状态**: 🔄 正在修复中
- **临时解决方案**: 分批输出或使用流式输出

```python
# 临时解决方案
config = Config()
config.output.streaming = True
config.output.batch_size = 1000
```

### 🟡 中等问题

#### 性能问题

**问题**: 高并发时 CPU 使用率过高
- **影响版本**: 2.0.x, 2.1.x
- **触发条件**: 线程数超过 50
- **状态**: 🔄 计划在 2.3.0 优化
- **临时解决方案**: 限制线程数

```bash
# 临时解决方案
api-finder scan target.com --threads 20  # 不要超过 20
```

**问题**: 某些网站扫描速度异常缓慢
- **影响版本**: 所有版本
- **触发条件**: 目标网站使用 Cloudflare 防护
- **状态**: 🔄 正在研究解决方案
- **临时解决方案**: 增加延迟和使用代理

```yaml
# 临时解决方案
scanner:
  delay: 2.0
  user_agent_rotation: true
network:
  proxy: "http://proxy.example.com:8080"
```

#### 兼容性问题

**问题**: Windows 路径处理错误
- **影响版本**: 2.1.0 - 2.1.2
- **触发条件**: 配置文件路径包含中文
- **状态**: 🔧 已在 2.1.3 修复
- **临时解决方案**: 使用英文路径

**问题**: macOS 上某些依赖安装失败
- **影响版本**: 2.2.0+
- **触发条件**: macOS Big Sur 以下版本
- **状态**: 🔄 正在修复中
- **临时解决方案**: 手动安装依赖

```bash
# 临时解决方案
brew install libxml2 libxslt
pip install lxml --global-option=build_ext --global-option="-I/usr/local/include/libxml2"
```

### 🟢 轻微问题

#### 界面问题

**问题**: 进度条在某些终端显示异常
- **影响版本**: 所有版本
- **触发条件**: 使用 Windows CMD
- **状态**: 🔄 低优先级
- **临时解决方案**: 禁用进度条

```bash
# 临时解决方案
api-finder scan target.com --no-progress
```

**问题**: 彩色输出在某些环境下不正常
- **影响版本**: 所有版本
- **触发条件**: 不支持 ANSI 颜色的终端
- **状态**: 🔄 低优先级
- **临时解决方案**: 禁用彩色输出

```bash
# 临时解决方案
api-finder scan target.com --no-color
```

## 🔧 版本特定问题

### 2.2.x 系列

#### 2.2.0

**新功能问题**:
- AI 预测功能在某些情况下准确率较低
- 智能过滤可能误过滤有效端点
- 新的配置格式向后兼容性问题

**解决方案**:
```yaml
# 禁用有问题的新功能
scanner:
  ai_prediction: false
  smart_filtering: false
```

#### 2.2.1

**修复问题**:
- ✅ 修复了 AI 预测的内存泄漏
- ✅ 改进了智能过滤算法
- ⚠️ 仍存在配置迁移问题

**新增问题**:
- 批量扫描时进度显示不准确
- 某些插件与新版本不兼容

### 2.1.x 系列

#### 2.1.5 (推荐版本)

**稳定性**:
- ✅ 修复了大部分已知问题
- ✅ 性能优化完成
- ✅ 兼容性良好

**已知问题**:
- 模糊扫描功能仍有改进空间
- 大规模扫描时内存使用较高

#### 2.1.0 - 2.1.4

**主要问题**:
- 数据丢失风险 (已修复)
- 配置文件解析错误 (已修复)
- 网络连接不稳定 (已修复)

### 2.0.x 系列

#### 2.0.x (维护模式)

**限制**:
- 不支持新功能
- 仅提供安全更新
- 建议升级到 2.1.x

**已知问题**:
- 不支持现代 Python 版本 (3.10+)
- 某些网站扫描失败
- 输出格式选项有限

## 🔍 问题诊断

### 诊断工具

#### 内置诊断

```bash
# 运行诊断
api-finder diagnose

# 详细诊断
api-finder diagnose --verbose

# 导出诊断报告
api-finder diagnose --export diagnosis.json
```

#### 日志分析

```bash
# 启用详细日志
api-finder scan target.com --log-level DEBUG --log-file debug.log

# 分析日志
grep "ERROR\|CRITICAL" debug.log
```

#### 环境检查

```python
# environment_check.py
from api_finder.utils import EnvironmentChecker

checker = EnvironmentChecker()
report = checker.generate_report()

print("Python 版本:", report.python_version)
print("依赖状态:", report.dependencies)
print("系统信息:", report.system_info)
```

### 常见错误模式

#### 网络相关错误

```python
# 错误模式 1: 连接超时
ConnectionError: HTTPSConnectionPool(host='example.com', port=443)

# 解决方案
config.network.timeout = 60
config.network.retries = 5
```

```python
# 错误模式 2: SSL 证书错误
SSLError: [SSL: CERTIFICATE_VERIFY_FAILED]

# 解决方案
config.network.ssl_verify = False  # 仅用于测试
```

#### 配置相关错误

```python
# 错误模式 3: 配置文件格式错误
ConfigError: Invalid YAML format in config.yaml

# 解决方案
# 使用配置验证工具
api-finder validate-config config.yaml
```

#### 内存相关错误

```python
# 错误模式 4: 内存不足
MemoryError: Unable to allocate array

# 解决方案
config.performance.max_memory = "1GB"
config.output.streaming = True
```

## 🛠️ 解决方案

### 通用解决方案

#### 环境重置

```bash
# 完全重置环境
pip uninstall api-finder
pip cache purge
pip install api-finder

# 重置配置
rm -rf ~/.api-finder/
api-finder init
```

#### 依赖修复

```bash
# 修复依赖冲突
pip install --force-reinstall api-finder

# 使用兼容版本
pip install "api-finder[compat]"

# 手动安装依赖
pip install -r requirements-fixed.txt
```

### 特定问题解决方案

#### 扫描失败

```python
# 问题：扫描无结果
# 解决方案：调整扫描参数
config = Config()
config.scanner.threads = 5  # 降低并发
config.scanner.delay = 2.0  # 增加延迟
config.scanner.timeout = 60  # 增加超时
```

#### 输出问题

```python
# 问题：输出格式错误
# 解决方案：指定正确格式
config.output.format = "json"
config.output.encoding = "utf-8"
```

#### 性能问题

```python
# 问题：扫描速度慢
# 解决方案：优化配置
config.performance.connection_pool = 100
config.performance.keep_alive = True
config.scanner.threads = 20
```

## 📊 问题统计

### 问题分布

| 类别 | 严重 | 中等 | 轻微 | 总计 |
|------|------|------|------|------|
| 网络问题 | 2 | 5 | 3 | 10 |
| 配置问题 | 1 | 3 | 2 | 6 |
| 性能问题 | 1 | 4 | 1 | 6 |
| 兼容性问题 | 0 | 3 | 2 | 5 |
| 界面问题 | 0 | 1 | 4 | 5 |

### 修复进度

| 版本 | 新增问题 | 修复问题 | 遗留问题 |
|------|----------|----------|----------|
| 2.2.1 | 3 | 5 | 15 |
| 2.2.0 | 8 | 2 | 17 |
| 2.1.5 | 1 | 7 | 11 |
| 2.1.4 | 2 | 4 | 17 |

## 🔄 问题报告

### 报告流程

#### 1. 问题确认

- 确认问题可重现
- 收集错误信息
- 检查已知问题列表

#### 2. 信息收集

```bash
# 收集系统信息
api-finder diagnose --export system_info.json

# 收集日志
api-finder scan target.com --log-level DEBUG --log-file error.log
```

#### 3. 提交报告

**GitHub Issue 模板**:

```markdown
## 问题描述
简要描述遇到的问题

## 环境信息
- Api-Finder 版本: 
- Python 版本: 
- 操作系统: 

## 重现步骤
1. 
2. 
3. 

## 期望行为
描述期望的正确行为

## 实际行为
描述实际发生的情况

## 错误日志
```
粘贴相关错误日志
```

## 附加信息
其他可能有用的信息
```

### 优先级定义

| 优先级 | 定义 | 响应时间 |
|--------|------|----------|
| P0 - 严重 | 数据丢失、安全问题 | 24小时 |
| P1 - 高 | 功能无法使用 | 3天 |
| P2 - 中 | 功能受限 | 1周 |
| P3 - 低 | 体验问题 | 1个月 |

## 📚 相关资源

- [故障排除](/guide/troubleshooting) - 详细故障排除指南
- [兼容性指南](/guide/compatibility) - 版本兼容性信息
- [迁移指南](/guide/migration) - 版本迁移步骤
- [GitHub Issues](https://github.com/api-finder/api-finder/issues) - 问题追踪