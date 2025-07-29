# 🔍 在线扫描器

<div class="scanner-container">
  <div class="scanner-header">
    <h2>🚀 Api-Finder 在线扫描器</h2>
    <p>快速扫描网站的API端点，无需安装任何软件</p>
  </div>

  <div class="scanner-form">
    <div class="form-group">
      <label for="target-url">🌐 目标URL</label>
      <input 
        type="url" 
        id="target-url" 
        placeholder="https://example.com"
        class="form-input"
      />
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="user-agent">📱 User-Agent</label>
        <select id="user-agent" class="form-select">
          <option value="desktop">🖥️ 桌面浏览器</option>
          <option value="mobile">📱 移动设备</option>
          <option value="tablet">📱 平板设备</option>
          <option value="weixin">💬 微信浏览器</option>
          <option value="custom">🔧 自定义</option>
        </select>
      </div>

      <div class="form-group">
        <label for="output-format">📊 输出格式</label>
        <select id="output-format" class="form-select">
          <option value="json">📋 JSON</option>
          <option value="csv">📊 CSV</option>
          <option value="html">🌐 HTML</option>
          <option value="txt">📄 文本</option>
        </select>
      </div>
    </div>

    <div class="form-group" id="custom-ua-group" style="display: none;">
      <label for="custom-ua">🔧 自定义 User-Agent</label>
      <input 
        type="text" 
        id="custom-ua" 
        placeholder="Mozilla/5.0 (Custom Agent)"
        class="form-input"
      />
    </div>

    <div class="form-group">
      <label for="cookies">🍪 Cookies (可选)</label>
      <textarea 
        id="cookies" 
        placeholder="session=abc123; token=xyz789"
        class="form-textarea"
        rows="3"
      ></textarea>
    </div>

    <div class="form-options">
      <label class="checkbox-label">
        <input type="checkbox" id="verbose-mode" />
        <span class="checkmark"></span>
        🔍 详细输出模式
      </label>
      
      <label class="checkbox-label">
        <input type="checkbox" id="ignore-ssl" />
        <span class="checkmark"></span>
        🔓 忽略SSL证书错误
      </label>
    </div>

    <div class="form-actions">
      <button id="scan-btn" class="btn-primary">
        🚀 开始扫描
      </button>
      <button id="clear-btn" class="btn-secondary">
        🗑️ 清空表单
      </button>
    </div>
  </div>

  <div id="loading" class="loading-container" style="display: none;">
    <div class="loading-spinner"></div>
    <p>正在扫描中，请稍候...</p>
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
  </div>

  <div id="results" class="results-container" style="display: none;">
    <div class="results-header">
      <h3>📊 扫描结果</h3>
      <div class="results-actions">
        <button id="download-btn" class="btn-download">📥 下载结果</button>
        <button id="copy-btn" class="btn-copy">📋 复制结果</button>
      </div>
    </div>
    
    <div class="results-stats">
      <div class="stat-card">
        <div class="stat-number" id="total-apis">0</div>
        <div class="stat-label">发现的API</div>
      </div>
      <div class="stat-card">
        <div class="stat-number" id="scan-time">0s</div>
        <div class="stat-label">扫描时间</div>
      </div>
      <div class="stat-card">
        <div class="stat-number" id="files-analyzed">0</div>
        <div class="stat-label">分析文件</div>
      </div>
    </div>

    <div class="results-content">
      <div class="results-tabs">
        <button class="tab-btn active" data-tab="list">📋 API列表</button>
        <button class="tab-btn" data-tab="chart">📊 统计图表</button>
        <button class="tab-btn" data-tab="raw">📄 原始数据</button>
      </div>

      <div id="tab-list" class="tab-content active">
        <div class="api-list" id="api-list">
          <!-- API列表将在这里显示 -->
        </div>
      </div>

      <div id="tab-chart" class="tab-content">
        <canvas id="methods-chart" width="400" height="200"></canvas>
      </div>

      <div id="tab-raw" class="tab-content">
        <pre id="raw-output" class="code-block"></pre>
      </div>
    </div>
  </div>

  <div id="error" class="error-container" style="display: none;">
    <div class="error-icon">⚠️</div>
    <div class="error-message" id="error-message"></div>
    <button id="retry-btn" class="btn-retry">🔄 重试</button>
  </div>
</div>

## 🛡️ 使用说明

### ⚠️ 重要提醒

- **合法使用**: 仅扫描你拥有或已获得授权的网站
- **遵守法律**: 确保你的使用符合当地法律法规
- **负责任披露**: 发现安全问题时请负责任地报告
- **频率限制**: 为避免对目标服务器造成负担，请合理控制扫描频率

### 📋 功能特性

- ✅ **无需安装** - 直接在浏览器中使用
- ✅ **多种格式** - 支持JSON、CSV、HTML、TXT输出
- ✅ **设备模拟** - 支持多种User-Agent
- ✅ **认证支持** - 支持Cookie认证
- ✅ **实时结果** - 实时显示扫描进度和结果
- ✅ **数据导出** - 支持下载和复制结果

### 🔧 使用步骤

1. **输入目标URL** - 在URL输入框中输入要扫描的网站地址
2. **选择配置** - 根据需要选择User-Agent和输出格式
3. **添加认证** - 如果需要，在Cookies字段中添加认证信息
4. **开始扫描** - 点击"开始扫描"按钮
5. **查看结果** - 扫描完成后查看发现的API端点
6. **导出数据** - 下载或复制扫描结果

### 📊 结果说明

扫描结果包含以下信息：

- **Method** - HTTP方法（GET、POST、PUT、DELETE等）
- **Endpoint** - API端点路径
- **Source** - 发现API的源文件
- **Confidence** - 置信度（0-1之间的数值）
- **Full URL** - 完整的API地址

## 🔗 相关链接

- 📖 [用户指南](/guide/) - 详细的使用指南
- 💡 [使用示例](/examples/) - 更多使用示例
- 🔧 [API参考](/api/) - 开发者文档
- 🐛 [问题反馈](https://github.com/jujubooom/Api-Finder/issues) - 报告问题或建议

<style>
.scanner-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.scanner-header {
  text-align: center;
  margin-bottom: 2rem;
}

.scanner-header h2 {
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}

.scanner-form {
  background: var(--vp-c-bg-soft);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.form-options {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
}

.checkbox-label input[type="checkbox"] {
  margin-right: 0.5rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-primary, .btn-secondary, .btn-download, .btn-copy, .btn-retry {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: var(--vp-c-brand-1);
  color: white;
}

.btn-primary:hover {
  background: var(--vp-c-brand-2);
}

.btn-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 2px solid var(--vp-c-border);
}

.btn-secondary:hover {
  background: var(--vp-c-bg-mute);
}

.loading-container {
  text-align: center;
  padding: 3rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  margin-bottom: 2rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--vp-c-border);
  border-top: 4px solid var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--vp-c-border);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 1rem;
}

.progress-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  width: 0%;
  animation: progress 3s ease-in-out infinite;
}

@keyframes progress {
  0% { width: 0%; }
  50% { width: 70%; }
  100% { width: 100%; }
}

.results-container {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.results-actions {
  display: flex;
  gap: 0.5rem;
}

.results-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  border: 2px solid var(--vp-c-border);
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.results-tabs {
  display: flex;
  border-bottom: 2px solid var(--vp-c-border);
  margin-bottom: 1.5rem;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  color: var(--vp-c-text-2);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
}

.tab-btn.active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

.api-list {
  max-height: 400px;
  overflow-y: auto;
}

.api-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  background: var(--vp-c-bg);
}

.api-method {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.8rem;
  color: white;
}

.method-get { background: #10b981; }
.method-post { background: #3b82f6; }
.method-put { background: #f59e0b; }
.method-delete { background: #ef4444; }

.api-endpoint {
  flex: 1;
  margin: 0 1rem;
  font-family: monospace;
  color: var(--vp-c-text-1);
}

.api-confidence {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.code-block {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  max-height: 400px;
  overflow-y: auto;
}

.error-container {
  text-align: center;
  padding: 2rem;
  background: #fef2f2;
  border: 2px solid #fecaca;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-message {
  color: #dc2626;
  font-weight: 600;
  margin-bottom: 1rem;
}

.btn-retry {
  background: #dc2626;
  color: white;
}

.btn-retry:hover {
  background: #b91c1c;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-options {
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .results-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .results-stats {
    grid-template-columns: 1fr;
  }
}
</style>

<script>
// 在线扫描器的JavaScript代码将在这里实现
// 注意：这是一个演示界面，实际的扫描功能需要后端API支持

document.addEventListener('DOMContentLoaded', function() {
  const userAgentSelect = document.getElementById('user-agent');
  const customUaGroup = document.getElementById('custom-ua-group');
  const scanBtn = document.getElementById('scan-btn');
  const clearBtn = document.getElementById('clear-btn');
  
  // User-Agent选择处理
  userAgentSelect.addEventListener('change', function() {
    if (this.value === 'custom') {
      customUaGroup.style.display = 'block';
    } else {
      customUaGroup.style.display = 'none';
    }
  });
  
  // 清空表单
  clearBtn.addEventListener('click', function() {
    document.getElementById('target-url').value = '';
    document.getElementById('cookies').value = '';
    document.getElementById('custom-ua').value = '';
    document.getElementById('verbose-mode').checked = false;
    document.getElementById('ignore-ssl').checked = false;
    userAgentSelect.value = 'desktop';
    customUaGroup.style.display = 'none';
  });
  
  // 扫描按钮处理
  scanBtn.addEventListener('click', function() {
    const targetUrl = document.getElementById('target-url').value;
    if (!targetUrl) {
      alert('请输入目标URL');
      return;
    }
    
    // 显示加载状态
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    
    // 模拟扫描过程（实际应用中需要调用后端API）
    setTimeout(() => {
      showMockResults();
    }, 3000);
  });
  
  // 显示模拟结果
  function showMockResults() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    
    // 更新统计数据
    document.getElementById('total-apis').textContent = '8';
    document.getElementById('scan-time').textContent = '3.2s';
    document.getElementById('files-analyzed').textContent = '12';
    
    // 显示API列表
    const apiList = document.getElementById('api-list');
    const mockApis = [
      { method: 'GET', endpoint: '/api/users', confidence: 0.95 },
      { method: 'POST', endpoint: '/api/login', confidence: 0.98 },
      { method: 'GET', endpoint: '/api/products', confidence: 0.92 },
      { method: 'PUT', endpoint: '/api/users/{id}', confidence: 0.90 },
      { method: 'DELETE', endpoint: '/api/users/{id}', confidence: 0.88 },
      { method: 'GET', endpoint: '/api/orders', confidence: 0.85 },
      { method: 'POST', endpoint: '/api/orders', confidence: 0.87 },
      { method: 'GET', endpoint: '/graphql', confidence: 0.99 }
    ];
    
    apiList.innerHTML = mockApis.map(api => `
      <div class="api-item">
        <span class="api-method method-${api.method.toLowerCase()}">${api.method}</span>
        <span class="api-endpoint">${api.endpoint}</span>
        <span class="api-confidence">${(api.confidence * 100).toFixed(0)}%</span>
      </div>
    `).join('');
    
    // 显示原始数据
    const rawOutput = document.getElementById('raw-output');
    rawOutput.textContent = JSON.stringify({
      scan_info: {
        target: document.getElementById('target-url').value,
        timestamp: new Date().toISOString(),
        total_apis: 8,
        scan_duration: "3.2s"
      },
      apis: mockApis
    }, null, 2);
  }
  
  // 标签页切换
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const tabName = this.dataset.tab;
      
      // 更新按钮状态
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // 更新内容显示
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(`tab-${tabName}`).classList.add('active');
    });
  });
});
</script>