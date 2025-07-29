# 🔄 兼容性指南

## 📋 版本兼容性

### 支持的版本

#### 当前支持版本

| 版本 | 状态 | 支持期限 | 安全更新 |
|------|------|----------|----------|
| 2.2.x | 🟢 活跃开发 | 长期支持 | ✅ |
| 2.1.x | 🟡 维护模式 | 2024-12-31 | ✅ |
| 2.0.x | 🟡 维护模式 | 2024-06-30 | ✅ |
| 1.x.x | 🔴 已停止支持 | 已结束 | ❌ |

#### 版本生命周期

```mermaid
graph LR
    A[开发中] --> B[Beta测试]
    B --> C[正式发布]
    C --> D[活跃维护]
    D --> E[维护模式]
    E --> F[停止支持]
```

### Python 版本兼容性

#### 支持的 Python 版本

| Python 版本 | Api-Finder 2.2 | Api-Finder 2.1 | Api-Finder 2.0 |
|-------------|-----------------|-----------------|-----------------|
| 3.12 | ✅ 完全支持 | ✅ 完全支持 | ❌ 不支持 |
| 3.11 | ✅ 完全支持 | ✅ 完全支持 | ✅ 完全支持 |
| 3.10 | ✅ 完全支持 | ✅ 完全支持 | ✅ 完全支持 |
| 3.9 | ✅ 完全支持 | ✅ 完全支持 | ✅ 完全支持 |
| 3.8 | ⚠️ 基础支持 | ✅ 完全支持 | ✅ 完全支持 |
| 3.7 | ❌ 不支持 | ⚠️ 基础支持 | ✅ 完全支持 |

#### 版本要求说明

- **完全支持**: 所有功能正常工作，定期测试
- **基础支持**: 核心功能可用，部分高级功能可能不可用
- **不支持**: 不保证正常工作，不提供技术支持

### 操作系统兼容性

#### 支持的操作系统

| 操作系统 | 版本 | 状态 | 备注 |
|----------|------|------|------|
| **Linux** | Ubuntu 18.04+ | ✅ 完全支持 | 推荐使用 |
| | CentOS 7+ | ✅ 完全支持 | |
| | Debian 9+ | ✅ 完全支持 | |
| | Arch Linux | ✅ 完全支持 | |
| **Windows** | Windows 10+ | ✅ 完全支持 | |
| | Windows Server 2019+ | ✅ 完全支持 | |
| **macOS** | macOS 10.15+ | ✅ 完全支持 | |
| | macOS 11+ | ✅ 完全支持 | 推荐 |

#### 架构支持

| 架构 | Linux | Windows | macOS |
|------|-------|---------|-------|
| x86_64 | ✅ | ✅ | ✅ |
| ARM64 | ✅ | ⚠️ | ✅ |
| x86 | ⚠️ | ⚠️ | ❌ |

## 🔧 依赖兼容性

### 核心依赖

#### 必需依赖

```python
# requirements.txt
requests>=2.25.0,<3.0.0
urllib3>=1.26.0,<2.0.0
pyyaml>=5.4.0,<7.0.0
click>=8.0.0,<9.0.0
colorama>=0.4.4,<1.0.0
```

#### 可选依赖

```python
# requirements-optional.txt
# 高级功能
beautifulsoup4>=4.9.0,<5.0.0  # HTML 解析
lxml>=4.6.0,<5.0.0             # XML 解析
selenium>=4.0.0,<5.0.0         # 浏览器自动化

# 性能优化
aiohttp>=3.7.0,<4.0.0          # 异步 HTTP
uvloop>=0.15.0,<1.0.0          # 高性能事件循环

# 数据分析
pandas>=1.3.0,<2.0.0           # 数据处理
matplotlib>=3.4.0,<4.0.0       # 图表生成
```

### 依赖版本策略

#### 版本固定策略

```python
# 生产环境 - 固定版本
requests==2.28.1
urllib3==1.26.12
pyyaml==6.0

# 开发环境 - 兼容范围
requests>=2.25.0,<3.0.0
urllib3>=1.26.0,<2.0.0
pyyaml>=5.4.0,<7.0.0
```

#### 更新策略

- **主要版本**: 手动更新，充分测试
- **次要版本**: 定期更新，回归测试
- **补丁版本**: 自动更新，基础测试

## 🔄 向后兼容性

### API 兼容性

#### 稳定 API

以下 API 保证向后兼容：

```python
# 核心扫描 API
from api_finder import ApiScanner
scanner = ApiScanner()
results = scanner.scan(target_url)

# 配置 API
from api_finder.config import Config
config = Config.from_file('config.yaml')

# 结果处理 API
for endpoint in results.endpoints:
    print(endpoint.url, endpoint.status_code)
```

#### 实验性 API

以下 API 可能在未来版本中变更：

```python
# 实验性功能 - 可能变更
from api_finder.experimental import AIScanner
from api_finder.beta import AdvancedFilters
```

### 配置文件兼容性

#### 配置格式演进

```yaml
# v2.0 格式 - 仍然支持
scanner:
  threads: 10
  delay: 1.0

# v2.1 格式 - 推荐使用
scanner:
  basic:
    threads: 10
    delay: 1.0
  advanced:
    ai_enabled: false

# v2.2 格式 - 最新格式
scanner:
  engine: "basic"
  config:
    threads: 10
    delay: 1.0
  features:
    ai_prediction: false
    smart_filtering: true
```

#### 自动迁移

```python
# 配置自动迁移
from api_finder.config import ConfigMigrator

migrator = ConfigMigrator()
new_config = migrator.migrate_from_v20('old_config.yaml')
new_config.save('new_config.yaml')
```

## 🧪 兼容性测试

### 测试矩阵

#### 自动化测试

```yaml
# .github/workflows/compatibility.yml
strategy:
  matrix:
    python-version: ['3.8', '3.9', '3.10', '3.11', '3.12']
    os: [ubuntu-latest, windows-latest, macos-latest]
    api-finder-version: ['2.0.x', '2.1.x', '2.2.x']
```

#### 测试覆盖

| 测试类型 | 覆盖范围 | 频率 |
|----------|----------|------|
| 单元测试 | 核心功能 | 每次提交 |
| 集成测试 | API 兼容性 | 每日 |
| 兼容性测试 | 多版本环境 | 每周 |
| 性能测试 | 性能回归 | 每月 |

### 兼容性检查工具

#### 版本检查器

```python
# compatibility_checker.py
from api_finder.compat import CompatibilityChecker

checker = CompatibilityChecker()

# 检查 Python 版本
if not checker.check_python_version():
    print("Python 版本不兼容")

# 检查依赖版本
if not checker.check_dependencies():
    print("依赖版本冲突")

# 检查配置兼容性
if not checker.check_config('config.yaml'):
    print("配置文件需要迁移")
```

#### 环境诊断

```bash
# 环境诊断命令
api-finder diagnose

# 输出示例
✅ Python 3.10.8 (兼容)
✅ 操作系统: Ubuntu 20.04 (支持)
⚠️  requests 2.24.0 (建议升级到 2.28+)
❌ urllib3 2.0.1 (不兼容，需要 < 2.0.0)
```

## 🔧 兼容性问题解决

### 常见问题

#### Python 版本问题

```bash
# 问题：Python 版本过低
Error: Api-Finder requires Python 3.8+

# 解决方案
# 1. 升级 Python
sudo apt update
sudo apt install python3.10

# 2. 使用 pyenv 管理多版本
pyenv install 3.10.8
pyenv local 3.10.8
```

#### 依赖冲突

```bash
# 问题：依赖版本冲突
ERROR: pip's dependency resolver does not currently consider all the packages

# 解决方案
# 1. 使用虚拟环境
python -m venv api_finder_env
source api_finder_env/bin/activate

# 2. 强制重新安装
pip install --force-reinstall api-finder

# 3. 使用兼容版本
pip install "api-finder[compat]"
```

#### 配置迁移问题

```python
# 问题：旧配置格式不兼容
ConfigError: Unknown configuration key 'old_setting'

# 解决方案
from api_finder.config import migrate_config

# 自动迁移
migrate_config('old_config.yaml', 'new_config.yaml')

# 手动迁移
config = Config()
config.load_legacy('old_config.yaml')
config.save('new_config.yaml')
```

### 降级策略

#### 版本降级

```bash
# 降级到稳定版本
pip install api-finder==2.1.5

# 锁定版本
echo "api-finder==2.1.5" >> requirements.txt
```

#### 功能降级

```python
# 禁用新功能，使用兼容模式
config = Config()
config.compatibility_mode = True
config.disable_features(['ai_prediction', 'advanced_filters'])
```

## 📊 兼容性报告

### 版本兼容性矩阵

#### 功能兼容性

| 功能 | 2.0.x | 2.1.x | 2.2.x |
|------|-------|-------|-------|
| 基础扫描 | ✅ | ✅ | ✅ |
| 字典扫描 | ✅ | ✅ | ✅ |
| 模糊扫描 | ❌ | ✅ | ✅ |
| AI 预测 | ❌ | ❌ | ✅ |
| 批量扫描 | ⚠️ | ✅ | ✅ |

#### 配置兼容性

| 配置项 | 2.0.x | 2.1.x | 2.2.x | 迁移 |
|--------|-------|-------|-------|------|
| scanner.threads | ✅ | ✅ | ✅ | 无需 |
| scanner.delay | ✅ | ✅ | ✅ | 无需 |
| scanner.ai_enabled | ❌ | ✅ | ✅ | 自动 |
| scanner.engine | ❌ | ❌ | ✅ | 手动 |

### 性能兼容性

#### 性能基准

| 版本 | 扫描速度 | 内存使用 | CPU 使用 |
|------|----------|----------|----------|
| 2.0.x | 100% | 100% | 100% |
| 2.1.x | 120% | 95% | 105% |
| 2.2.x | 150% | 90% | 110% |

## 📚 相关资源

- [迁移指南](/guide/migration) - 版本迁移详细步骤
- [已知问题](/guide/known-issues) - 兼容性相关问题
- [安装指南](/guide/installation) - 环境配置要求
- [故障排除](/guide/troubleshooting) - 问题解决方案