# 🔄 迁移指南

本指南帮助你从旧版本的 Api-Finder 迁移到新版本。

## 📋 版本兼容性

### 支持的迁移路径

| 源版本 | 目标版本 | 迁移复杂度 | 自动迁移 |
|--------|----------|------------|----------|
| 1.x → 2.0 | 2.0+ | 高 | 部分支持 |
| 2.0 → 2.1 | 2.1+ | 低 | 完全支持 |
| 2.1 → 2.2 | 2.2+ | 低 | 完全支持 |

## 🚀 从 1.x 迁移到 2.0

### 重大变更

#### 1. 配置文件格式变更

**旧格式 (1.x):**
```ini
[scanner]
threads = 10
delay = 1.0
timeout = 30

[output]
format = json
file = results.json
```

**新格式 (2.0+):**
```yaml
scanner:
  threads: 10
  delay: 1.0
  timeout: 30

output:
  format: "json"
  file: "results.json"
```

#### 2. 命令行参数变更

| 1.x 参数 | 2.0+ 参数 | 说明 |
|----------|-----------|------|
| `-t` | `--threads` | 线程数 |
| `-d` | `--delay` | 延迟时间 |
| `-o` | `--output` | 输出文件 |
| `-w` | `--wordlist` | 字典文件 |
| `-p` | `--proxy` | 代理设置 |

#### 3. API 接口变更

**旧 API (1.x):**
```python
from api_finder import Scanner

scanner = Scanner(target="https://example.com")
results = scanner.scan()
```

**新 API (2.0+):**
```python
from api_finder import ApiScanner
from api_finder.config import Config

config = Config.from_file("config.yaml")
scanner = ApiScanner(config)
results = scanner.scan("https://example.com")
```

### 自动迁移工具

#### 配置文件迁移

```bash
# 迁移配置文件
python -m api_finder.migrate --config old_config.ini --output new_config.yaml

# 验证迁移结果
python -m api_finder.migrate --validate new_config.yaml
```

#### 脚本迁移

```bash
# 迁移 Python 脚本
python -m api_finder.migrate --script old_script.py --output new_script.py

# 批量迁移
python -m api_finder.migrate --directory scripts/ --output migrated_scripts/
```

### 手动迁移步骤

#### 步骤 1：备份现有配置

```bash
# 备份配置文件
cp config.ini config.ini.backup

# 备份自定义脚本
cp -r scripts/ scripts_backup/
```

#### 步骤 2：安装新版本

```bash
# 卸载旧版本
pip uninstall api-finder

# 安装新版本
pip install api-finder>=2.0.0
```

#### 步骤 3：转换配置文件

```python
# migrate_config.py
import configparser
import yaml

def migrate_config(old_config_path, new_config_path):
    """迁移配置文件从 INI 到 YAML"""
    
    # 读取旧配置
    config = configparser.ConfigParser()
    config.read(old_config_path)
    
    # 转换为新格式
    new_config = {
        'scanner': {
            'threads': config.getint('scanner', 'threads', fallback=10),
            'delay': config.getfloat('scanner', 'delay', fallback=1.0),
            'timeout': config.getint('scanner', 'timeout', fallback=30),
        },
        'output': {
            'format': config.get('output', 'format', fallback='json'),
            'file': config.get('output', 'file', fallback='results.json'),
        }
    }
    
    # 保存新配置
    with open(new_config_path, 'w') as f:
        yaml.dump(new_config, f, default_flow_style=False)

# 使用示例
migrate_config('config.ini', 'config.yaml')
```

#### 步骤 4：更新脚本

```python
# 旧脚本 (1.x)
from api_finder import Scanner

def old_scan():
    scanner = Scanner(target="https://example.com")
    scanner.set_threads(10)
    scanner.set_delay(1.0)
    results = scanner.scan()
    return results

# 新脚本 (2.0+)
from api_finder import ApiScanner
from api_finder.config import Config

def new_scan():
    config = Config({
        'scanner': {
            'threads': 10,
            'delay': 1.0
        }
    })
    scanner = ApiScanner(config)
    results = scanner.scan("https://example.com")
    return results
```

## 🔄 从 2.0 迁移到 2.1

### 新增功能

#### 1. 插件系统

```yaml
# 新增插件配置
plugins:
  auth_plugin:
    enabled: true
    config:
      auth_type: "bearer"
      token: "${API_TOKEN}"
```

#### 2. 高级过滤器

```yaml
# 新增过滤器配置
filters:
  advanced:
    response_time_threshold: 5.0
    content_analysis: true
    pattern_matching: true
```

#### 3. 安全扫描

```yaml
# 新增安全扫描配置
security:
  owasp_api_top10: true
  custom_checks: true
```

### 迁移步骤

#### 自动迁移

```bash
# 自动升级配置
python -m api_finder.migrate --from-version 2.0 --to-version 2.1 --config config.yaml
```

#### 手动更新

```yaml
# 在现有配置中添加新功能
scanner:
  threads: 10
  delay: 1.0
  timeout: 30

# 新增部分
plugins:
  enabled: []

security:
  enabled: false

advanced_filters:
  enabled: false
```

## 🔄 从 2.1 迁移到 2.2

### 新增功能

#### 1. 分布式扫描

```yaml
distributed:
  enabled: false
  coordinator_url: ""
  worker_nodes: []
```

#### 2. 实时监控

```yaml
monitoring:
  enabled: false
  metrics_port: 9090
  health_check: true
```

#### 3. 云集成

```yaml
cloud:
  provider: ""
  credentials: ""
  storage: ""
```

### 迁移步骤

```bash
# 自动迁移到最新版本
python -m api_finder.migrate --auto-upgrade --config config.yaml
```

## 🛠️ 迁移工具

### 配置验证器

```python
# validate_config.py
from api_finder.config import Config
from api_finder.migrate import ConfigValidator

def validate_migrated_config(config_path):
    """验证迁移后的配置文件"""
    
    validator = ConfigValidator()
    
    try:
        config = Config.from_file(config_path)
        issues = validator.validate(config)
        
        if not issues:
            print("✅ 配置文件验证通过")
            return True
        else:
            print("❌ 配置文件存在问题:")
            for issue in issues:
                print(f"  - {issue}")
            return False
            
    except Exception as e:
        print(f"❌ 配置文件格式错误: {e}")
        return False

# 使用示例
validate_migrated_config('config.yaml')
```

### 兼容性检查器

```python
# compatibility_check.py
from api_finder.migrate import CompatibilityChecker

def check_compatibility(old_version, new_version):
    """检查版本兼容性"""
    
    checker = CompatibilityChecker()
    result = checker.check(old_version, new_version)
    
    print(f"从 {old_version} 迁移到 {new_version}:")
    print(f"兼容性: {'✅ 兼容' if result.compatible else '❌ 不兼容'}")
    
    if result.breaking_changes:
        print("重大变更:")
        for change in result.breaking_changes:
            print(f"  - {change}")
    
    if result.deprecated_features:
        print("已弃用功能:")
        for feature in result.deprecated_features:
            print(f"  - {feature}")
    
    return result

# 使用示例
check_compatibility("1.5.0", "2.1.0")
```

## 🔧 故障排除

### 常见迁移问题

#### 1. 配置文件格式错误

**问题:** YAML 语法错误
```
Error: Invalid YAML format
```

**解决方案:**
```bash
# 验证 YAML 语法
python -c "import yaml; yaml.safe_load(open('config.yaml'))"

# 使用在线 YAML 验证器
# https://yamlchecker.com/
```

#### 2. 依赖版本冲突

**问题:** 依赖包版本不兼容
```
Error: Package version conflict
```

**解决方案:**
```bash
# 创建新的虚拟环境
python -m venv api_finder_v2
source api_finder_v2/bin/activate  # Linux/Mac
# 或
api_finder_v2\Scripts\activate  # Windows

# 安装新版本
pip install api-finder>=2.0.0
```

#### 3. API 接口变更

**问题:** 旧 API 调用失败
```
AttributeError: 'Scanner' object has no attribute 'set_threads'
```

**解决方案:**
```python
# 更新 API 调用
# 旧方式
# scanner.set_threads(10)

# 新方式
config = Config({'scanner': {'threads': 10}})
scanner = ApiScanner(config)
```

### 回滚策略

#### 1. 配置回滚

```bash
# 恢复备份配置
cp config.ini.backup config.ini

# 重新安装旧版本
pip install api-finder==1.5.0
```

#### 2. 数据回滚

```bash
# 恢复旧格式结果
python -m api_finder.migrate --rollback --results results_v2.json --output results_v1.json
```

## 📋 迁移检查清单

### 迁移前准备

- [ ] 备份现有配置文件
- [ ] 备份自定义脚本
- [ ] 记录当前版本号
- [ ] 测试现有功能
- [ ] 准备测试数据

### 迁移过程

- [ ] 安装新版本
- [ ] 转换配置文件
- [ ] 更新脚本代码
- [ ] 验证配置格式
- [ ] 测试基本功能

### 迁移后验证

- [ ] 功能完整性测试
- [ ] 性能对比测试
- [ ] 结果格式验证
- [ ] 错误处理测试
- [ ] 文档更新

## 📞 获取帮助

### 迁移支持

- **迁移指南**: [详细文档](/guide/migration)
- **社区支持**: [GitHub Discussions](https://github.com/api-finder/api-finder/discussions)
- **技术支持**: migration-support@api-finder.com

### 常见问题

- [迁移 FAQ](/guide/faq#migration)
- [兼容性矩阵](/guide/compatibility)
- [已知问题](/guide/known-issues)

## 📚 相关资源

- [版本历史](/guide/changelog) - 版本变更记录
- [配置参考](/guide/advanced-config) - 配置文件详解
- [API 参考](/api/index) - API 接口文档
- [故障排除](/guide/troubleshooting) - 问题解决方案