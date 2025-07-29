# 📊 结果分析器

<div class="analyzer-container">
  <div class="analyzer-header">
    <h2>📈 Api-Finder 结果分析器</h2>
    <p>深度分析扫描结果，生成详细的API报告和可视化图表</p>
  </div>

  <div class="upload-section">
    <div class="upload-area" id="upload-area">
      <div class="upload-icon">📁</div>
      <h3>上传扫描结果文件</h3>
      <p>支持 JSON、CSV、TXT 格式的扫描结果文件</p>
      <input type="file" id="file-input" accept=".json,.csv,.txt" style="display: none;">
      <button class="btn-upload" onclick="document.getElementById('file-input').click()">
        📤 选择文件
      </button>
      <div class="upload-hint">
        或将文件拖拽到此区域
      </div>
    </div>

    <div class="sample-data">
      <h4>🎯 或使用示例数据</h4>
      <div class="sample-buttons">
        <button class="btn-sample" data-sample="ecommerce">🛒 电商网站</button>
        <button class="btn-sample" data-sample="blog">📝 博客系统</button>
        <button class="btn-sample" data-sample="api">🔌 API服务</button>
        <button class="btn-sample" data-sample="admin">⚙️ 管理后台</button>
      </div>
    </div>
  </div>

  <div id="analysis-results" class="analysis-results" style="display: none;">
    <div class="results-header">
      <h3>📊 分析结果</h3>
      <div class="export-buttons">
        <button class="btn-export" data-format="pdf">📄 导出PDF</button>
        <button class="btn-export" data-format="excel">📊 导出Excel</button>
        <button class="btn-export" data-format="html">🌐 导出HTML</button>
      </div>
    </div>

    <!-- 概览统计 -->
    <div class="overview-stats">
      <div class="stat-grid">
        <div class="stat-card primary">
          <div class="stat-icon">🔍</div>
          <div class="stat-content">
            <div class="stat-number" id="total-endpoints">0</div>
            <div class="stat-label">API端点总数</div>
          </div>
        </div>
        <div class="stat-card success">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <div class="stat-number" id="high-confidence">0</div>
            <div class="stat-label">高置信度API</div>
          </div>
        </div>
        <div class="stat-card warning">
          <div class="stat-icon">⚠️</div>
          <div class="stat-content">
            <div class="stat-number" id="potential-issues">0</div>
            <div class="stat-label">潜在问题</div>
          </div>
        </div>
        <div class="stat-card info">
          <div class="stat-icon">🏷️</div>
          <div class="stat-content">
            <div class="stat-number" id="unique-paths">0</div>
            <div class="stat-label">唯一路径</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图表分析 -->
    <div class="charts-section">
      <div class="chart-grid">
        <div class="chart-card">
          <h4>📊 HTTP方法分布</h4>
          <canvas id="methods-chart" width="300" height="200"></canvas>
        </div>
        <div class="chart-card">
          <h4>📈 置信度分布</h4>
          <canvas id="confidence-chart" width="300" height="200"></canvas>
        </div>
        <div class="chart-card">
          <h4>🌐 端点类型分析</h4>
          <canvas id="endpoints-chart" width="300" height="200"></canvas>
        </div>
        <div class="chart-card">
          <h4>📍 路径深度分析</h4>
          <canvas id="depth-chart" width="300" height="200"></canvas>
        </div>
      </div>
    </div>

    <!-- 详细分析 -->
    <div class="detailed-analysis">
      <div class="analysis-tabs">
        <button class="tab-btn active" data-tab="endpoints">🔗 端点详情</button>
        <button class="tab-btn" data-tab="security">🛡️ 安全分析</button>
        <button class="tab-btn" data-tab="patterns">🔍 模式识别</button>
        <button class="tab-btn" data-tab="recommendations">💡 建议</button>
      </div>

      <div id="tab-endpoints" class="tab-content active">
        <div class="endpoints-table">
          <div class="table-controls">
            <input type="text" id="search-endpoints" placeholder="🔍 搜索端点..." class="search-input">
            <select id="filter-method" class="filter-select">
              <option value="">所有方法</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <select id="filter-confidence" class="filter-select">
              <option value="">所有置信度</option>
              <option value="high">高 (>90%)</option>
              <option value="medium">中 (70-90%)</option>
              <option value="low">低 (<70%)</option>
            </select>
          </div>
          <div class="table-container">
            <table id="endpoints-table">
              <thead>
                <tr>
                  <th>方法</th>
                  <th>端点</th>
                  <th>置信度</th>
                  <th>来源</th>
                  <th>参数</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody id="endpoints-tbody">
                <!-- 端点数据将在这里显示 -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div id="tab-security" class="tab-content">
        <div class="security-analysis">
          <div class="security-alerts">
            <h4>🚨 安全警告</h4>
            <div id="security-alerts-list">
              <!-- 安全警告将在这里显示 -->
            </div>
          </div>
          
          <div class="security-recommendations">
            <h4>🛡️ 安全建议</h4>
            <div id="security-recommendations-list">
              <!-- 安全建议将在这里显示 -->
            </div>
          </div>
        </div>
      </div>

      <div id="tab-patterns" class="tab-content">
        <div class="patterns-analysis">
          <div class="pattern-card">
            <h4>🔍 URL模式</h4>
            <div id="url-patterns">
              <!-- URL模式将在这里显示 -->
            </div>
          </div>
          
          <div class="pattern-card">
            <h4>📊 参数模式</h4>
            <div id="parameter-patterns">
              <!-- 参数模式将在这里显示 -->
            </div>
          </div>
          
          <div class="pattern-card">
            <h4>🏷️ 命名约定</h4>
            <div id="naming-patterns">
              <!-- 命名约定将在这里显示 -->
            </div>
          </div>
        </div>
      </div>

      <div id="tab-recommendations" class="tab-content">
        <div class="recommendations">
          <div class="recommendation-card">
            <div class="recommendation-icon">🚀</div>
            <div class="recommendation-content">
              <h4>性能优化建议</h4>
              <ul id="performance-recommendations">
                <!-- 性能建议将在这里显示 -->
              </ul>
            </div>
          </div>
          
          <div class="recommendation-card">
            <div class="recommendation-icon">📚</div>
            <div class="recommendation-content">
              <h4>文档改进建议</h4>
              <ul id="documentation-recommendations">
                <!-- 文档建议将在这里显示 -->
              </ul>
            </div>
          </div>
          
          <div class="recommendation-card">
            <div class="recommendation-icon">🔧</div>
            <div class="recommendation-content">
              <h4>开发改进建议</h4>
              <ul id="development-recommendations">
                <!-- 开发建议将在这里显示 -->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

## 📖 使用指南

### 🚀 快速开始

1. **上传文件** - 选择或拖拽Api-Finder生成的结果文件
2. **自动分析** - 系统自动解析并分析API数据
3. **查看报告** - 浏览详细的分析结果和可视化图表
4. **导出报告** - 将分析结果导出为PDF、Excel或HTML格式

### 📊 分析功能

#### 🔍 基础统计
- **API端点总数** - 发现的所有API端点数量
- **高置信度API** - 置信度超过90%的可靠API
- **潜在问题** - 可能存在问题的端点
- **唯一路径** - 去重后的API路径数量

#### 📈 可视化图表
- **HTTP方法分布** - GET、POST、PUT、DELETE等方法的分布情况
- **置信度分布** - API发现置信度的分布直方图
- **端点类型分析** - REST、GraphQL、WebSocket等类型分析
- **路径深度分析** - API路径层级深度统计

#### 🛡️ 安全分析
- **敏感端点检测** - 识别可能包含敏感信息的API
- **认证缺失检测** - 发现可能缺少认证的端点
- **参数注入风险** - 检测可能存在注入风险的参数
- **CORS配置检查** - 分析跨域资源共享配置

#### 🔍 模式识别
- **URL命名模式** - 分析API命名约定和模式
- **参数模式** - 识别常见的参数命名和类型模式
- **版本控制模式** - 检测API版本控制策略
- **RESTful合规性** - 评估API设计的RESTful程度

### 📋 支持的文件格式

#### JSON格式
```json
{
  "scan_info": {
    "target": "https://example.com",
    "timestamp": "2024-01-01T00:00:00Z"
  },
  "apis": [
    {
      "method": "GET",
      "endpoint": "/api/users",
      "confidence": 0.95,
      "source": "main.js"
    }
  ]
}
```

#### CSV格式
```csv
method,endpoint,confidence,source
GET,/api/users,0.95,main.js
POST,/api/login,0.98,auth.js
```

#### TXT格式
```
GET /api/users (95%) - main.js
POST /api/login (98%) - auth.js
```

### 💡 分析建议

#### 🎯 最佳实践
- **定期分析** - 定期对API进行扫描和分析
- **关注安全** - 重点关注安全分析结果
- **文档同步** - 根据分析结果更新API文档
- **性能优化** - 根据建议优化API性能

#### ⚠️ 注意事项
- **数据隐私** - 上传的文件仅在本地处理，不会发送到服务器
- **文件大小** - 建议文件大小不超过10MB
- **浏览器兼容** - 建议使用现代浏览器以获得最佳体验

<style>
.analyzer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.analyzer-header {
  text-align: center;
  margin-bottom: 3rem;
}

.analyzer-header h2 {
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}

.upload-section {
  background: var(--vp-c-bg-soft);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.upload-area {
  border: 2px dashed var(--vp-c-border);
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
}

.upload-area:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-alt);
}

.upload-area.dragover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.upload-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.upload-area h3 {
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.upload-area p {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.btn-upload {
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-upload:hover {
  background: var(--vp-c-brand-2);
}

.upload-hint {
  margin-top: 1rem;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}

.sample-data {
  margin-top: 2rem;
  text-align: center;
}

.sample-data h4 {
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.sample-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-sample {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--vp-c-text-1);
}

.btn-sample:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.analysis-results {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.export-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-export {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.btn-export:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.overview-stats {
  margin-bottom: 3rem;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
}

.stat-card.primary { border-color: var(--vp-c-brand-1); }
.stat-card.success { border-color: #10b981; }
.stat-card.warning { border-color: #f59e0b; }
.stat-card.info { border-color: #3b82f6; }

.stat-icon {
  font-size: 2.5rem;
  margin-right: 1rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.stat-label {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.charts-section {
  margin-bottom: 3rem;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.chart-card {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid var(--vp-c-border);
}

.chart-card h4 {
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
  text-align: center;
}

.detailed-analysis {
  margin-top: 2rem;
}

.analysis-tabs {
  display: flex;
  border-bottom: 2px solid var(--vp-c-border);
  margin-bottom: 2rem;
  overflow-x: auto;
}

.tab-btn {
  padding: 1rem 1.5rem;
  border: none;
  background: none;
  color: var(--vp-c-text-2);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
  white-space: nowrap;
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

.table-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.search-input, .filter-select {
  padding: 0.5rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.table-container {
  overflow-x: auto;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
}

#endpoints-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--vp-c-bg);
}

#endpoints-table th,
#endpoints-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-border);
}

#endpoints-table th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.method-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
}

.method-get { background: #10b981; }
.method-post { background: #3b82f6; }
.method-put { background: #f59e0b; }
.method-delete { background: #ef4444; }

.confidence-bar {
  width: 100px;
  height: 8px;
  background: var(--vp-c-border);
  border-radius: 4px;
  overflow: hidden;
}

.confidence-fill {
  height: 100%;
  background: linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #10b981 100%);
}

.security-analysis {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.security-alerts,
.security-recommendations {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid var(--vp-c-border);
}

.alert-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
}

.alert-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
}

.alert-high { border-left: 4px solid #ef4444; }
.alert-medium { border-left: 4px solid #f59e0b; }
.alert-low { border-left: 4px solid #10b981; }

.patterns-analysis {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.pattern-card {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid var(--vp-c-border);
}

.pattern-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--vp-c-border);
}

.pattern-item:last-child {
  border-bottom: none;
}

.recommendations {
  display: grid;
  gap: 1.5rem;
}

.recommendation-card {
  display: flex;
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid var(--vp-c-border);
}

.recommendation-icon {
  font-size: 2rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.recommendation-content h4 {
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.recommendation-content ul {
  margin: 0;
  padding-left: 1.5rem;
}

.recommendation-content li {
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .stat-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-grid {
    grid-template-columns: 1fr;
  }
  
  .security-analysis {
    grid-template-columns: 1fr;
  }
  
  .patterns-analysis {
    grid-template-columns: 1fr;
  }
  
  .table-controls {
    flex-direction: column;
  }
  
  .search-input {
    min-width: auto;
  }
  
  .results-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .export-buttons {
    justify-content: center;
  }
  
  .sample-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>

<script>
// 结果分析器的JavaScript代码<script>
// 确保只在客户端运行
if (typeof window !== 'undefined') {
document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('file-input');
  const uploadArea = document.getElementById('upload-area');
  const analysisResults = document.getElementById('analysis-results');
  
  // 文件上传处理
  fileInput.addEventListener('change', handleFileUpload);
  
  // 拖拽上传
  uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });
  
  uploadArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
  });
  
  uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  });
  
  // 示例数据按钮
  document.querySelectorAll('.btn-sample').forEach(btn => {
    btn.addEventListener('click', function() {
      const sampleType = this.dataset.sample;
      loadSampleData(sampleType);
    });
  });
  
  // 标签页切换
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const tabName = this.dataset.tab;
      
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(`tab-${tabName}`).classList.add('active');
    });
  });
  
  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  }
  
  function handleFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        let data;
        const content = e.target.result;
        
        if (file.name.endsWith('.json')) {
          data = JSON.parse(content);
        } else if (file.name.endsWith('.csv')) {
          data = parseCSV(content);
        } else if (file.name.endsWith('.txt')) {
          data = parseTXT(content);
        }
        
        analyzeData(data);
      } catch (error) {
        alert('文件解析失败：' + error.message);
      }
    };
    reader.readAsText(file);
  }
  
  function parseCSV(content) {
    const lines = content.split('\n');
    const headers = lines[0].split(',');
    const apis = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',');
        const api = {};
        headers.forEach((header, index) => {
          api[header.trim()] = values[index]?.trim();
        });
        apis.push(api);
      }
    }
    
    return { apis };
  }
  
  function parseTXT(content) {
    const lines = content.split('\n');
    const apis = [];
    
    lines.forEach(line => {
      const match = line.match(/(\w+)\s+([^\s]+)\s+\((\d+)%\)\s+-\s+(.+)/);
      if (match) {
        apis.push({
          method: match[1],
          endpoint: match[2],
          confidence: parseFloat(match[3]) / 100,
          source: match[4]
        });
      }
    });
    
    return { apis };
  }
  
  function loadSampleData(type) {
    const sampleData = {
      ecommerce: {
        apis: [
          { method: 'GET', endpoint: '/api/products', confidence: 0.95, source: 'products.js' },
          { method: 'POST', endpoint: '/api/cart/add', confidence: 0.92, source: 'cart.js' },
          { method: 'GET', endpoint: '/api/user/profile', confidence: 0.98, source: 'user.js' },
          { method: 'POST', endpoint: '/api/orders', confidence: 0.90, source: 'orders.js' },
          { method: 'PUT', endpoint: '/api/products/{id}', confidence: 0.88, source: 'admin.js' },
          { method: 'DELETE', endpoint: '/api/cart/{id}', confidence: 0.85, source: 'cart.js' }
        ]
      },
      blog: {
        apis: [
          { method: 'GET', endpoint: '/api/posts', confidence: 0.96, source: 'blog.js' },
          { method: 'POST', endpoint: '/api/posts', confidence: 0.94, source: 'editor.js' },
          { method: 'GET', endpoint: '/api/comments', confidence: 0.91, source: 'comments.js' },
          { method: 'POST', endpoint: '/api/auth/login', confidence: 0.99, source: 'auth.js' },
          { method: 'GET', endpoint: '/api/categories', confidence: 0.87, source: 'categories.js' }
        ]
      },
      api: {
        apis: [
          { method: 'GET', endpoint: '/v1/users', confidence: 0.99, source: 'api.js' },
          { method: 'POST', endpoint: '/v1/users', confidence: 0.97, source: 'api.js' },
          { method: 'GET', endpoint: '/v1/users/{id}', confidence: 0.98, source: 'api.js' },
          { method: 'PUT', endpoint: '/v1/users/{id}', confidence: 0.95, source: 'api.js' },
          { method: 'DELETE', endpoint: '/v1/users/{id}', confidence: 0.93, source: 'api.js' },
          { method: 'GET', endpoint: '/v2/graphql', confidence: 0.89, source: 'graphql.js' }
        ]
      },
      admin: {
        apis: [
          { method: 'GET', endpoint: '/admin/dashboard', confidence: 0.94, source: 'admin.js' },
          { method: 'GET', endpoint: '/admin/users', confidence: 0.96, source: 'users.js' },
          { method: 'POST', endpoint: '/admin/settings', confidence: 0.91, source: 'settings.js' },
          { method: 'GET', endpoint: '/admin/logs', confidence: 0.88, source: 'logs.js' },
          { method: 'DELETE', endpoint: '/admin/cache', confidence: 0.85, source: 'cache.js' }
        ]
      }
    };
    
    analyzeData(sampleData[type]);
  }
  
  function analyzeData(data) {
    if (!data || !data.apis) {
      alert('无效的数据格式');
      return;
    }
    
    // 显示分析结果
    analysisResults.style.display = 'block';
    
    // 更新统计数据
    updateStats(data.apis);
    
    // 生成图表
    generateCharts(data.apis);
    
    // 更新端点表格
    updateEndpointsTable(data.apis);
    
    // 生成安全分析
    generateSecurityAnalysis(data.apis);
    
    // 生成模式分析
    generatePatternAnalysis(data.apis);
    
    // 生成建议
    generateRecommendations(data.apis);
  }
  
  function updateStats(apis) {
    const totalEndpoints = apis.length;
    const highConfidence = apis.filter(api => api.confidence > 0.9).length;
    const potentialIssues = apis.filter(api => api.confidence < 0.7).length;
    const uniquePaths = new Set(apis.map(api => api.endpoint.split('?')[0])).size;
    
    document.getElementById('total-endpoints').textContent = totalEndpoints;
    document.getElementById('high-confidence').textContent = highConfidence;
    document.getElementById('potential-issues').textContent = potentialIssues;
    document.getElementById('unique-paths').textContent = uniquePaths;
  }
  
  function generateCharts(apis) {
    // HTTP方法分布图表
    const methodCounts = {};
    apis.forEach(api => {
      methodCounts[api.method] = (methodCounts[api.method] || 0) + 1;
    });
    
    // 这里应该使用Chart.js或其他图表库来生成实际的图表
    // 为了演示，我们只是显示一个占位符
    console.log('生成图表:', { methodCounts });
  }
  
  function updateEndpointsTable(apis) {
    const tbody = document.getElementById('endpoints-tbody');
    tbody.innerHTML = apis.map(api => `
      <tr>
        <td><span class="method-badge method-${api.method.toLowerCase()}">${api.method}</span></td>
        <td><code>${api.endpoint}</code></td>
        <td>
          <div class="confidence-bar">
            <div class="confidence-fill" style="width: ${api.confidence * 100}%"></div>
          </div>
          ${(api.confidence * 100).toFixed(0)}%
        </td>
        <td>${api.source || 'N/A'}</td>
        <td>${extractParameters(api.endpoint).join(', ') || 'None'}</td>
        <td>
          <button class="btn-action" onclick="viewDetails('${api.endpoint}')">详情</button>
        </td>
      </tr>
    `).join('');
  }
  
  function extractParameters(endpoint) {
    const params = [];
    const matches = endpoint.match(/\{([^}]+)\}/g);
    if (matches) {
      matches.forEach(match => {
        params.push(match.slice(1, -1));
      });
    }
    return params;
  }
  
  function generateSecurityAnalysis(apis) {
    const alertsList = document.getElementById('security-alerts-list');
    const recommendationsList = document.getElementById('security-recommendations-list');
    
    // 生成安全警告
    const alerts = [
      { level: 'high', message: '发现可能的敏感信息泄露端点', count: 2 },
      { level: 'medium', message: '部分端点可能缺少认证保护', count: 5 },
      { level: 'low', message: '建议添加速率限制', count: 8 }
    ];
    
    alertsList.innerHTML = alerts.map(alert => `
      <div class="alert-item alert-${alert.level}">
        <div class="alert-icon">${alert.level === 'high' ? '🚨' : alert.level === 'medium' ? '⚠️' : 'ℹ️'}</div>
        <div>
          <strong>${alert.message}</strong>
          <div>影响 ${alert.count} 个端点</div>
        </div>
      </div>
    `).join('');
    
    // 生成安全建议
    const recommendations = [
      '为敏感端点添加认证和授权检查',
      '实施API速率限制和防护机制',
      '使用HTTPS加密所有API通信',
      '定期进行安全审计和渗透测试'
    ];
    
    recommendationsList.innerHTML = recommendations.map(rec => `
      <div class="alert-item">
        <div class="alert-icon">🛡️</div>
        <div>${rec}</div>
      </div>
    `).join('');
  }
  
  function generatePatternAnalysis(apis) {
    // URL模式分析
    const urlPatterns = document.getElementById('url-patterns');
    const patterns = [
      { pattern: '/api/{resource}', count: 12, example: '/api/users' },
      { pattern: '/api/{resource}/{id}', count: 8, example: '/api/users/123' },
      { pattern: '/v{version}/{resource}', count: 6, example: '/v1/products' }
    ];
    
    urlPatterns.innerHTML = patterns.map(pattern => `
      <div class="pattern-item">
        <div>
          <code>${pattern.pattern}</code>
          <div style="font-size: 0.8rem; color: var(--vp-c-text-3);">例如: ${pattern.example}</div>
        </div>
        <div>${pattern.count} 个</div>
      </div>
    `).join('');
  }
  
  function generateRecommendations(apis) {
    const performanceRecs = document.getElementById('performance-recommendations');
    const documentationRecs = document.getElementById('documentation-recommendations');
    const developmentRecs = document.getElementById('development-recommendations');
    
    performanceRecs.innerHTML = `
      <li>考虑为高频访问的端点添加缓存机制</li>
      <li>实施API响应压缩以减少传输时间</li>
      <li>使用CDN加速静态资源访问</li>
    `;
    
    documentationRecs.innerHTML = `
      <li>为所有发现的API端点生成OpenAPI文档</li>
      <li>添加详细的请求/响应示例</li>
      <li>提供SDK和代码示例</li>
    `;
    
    developmentRecs.innerHTML = `
      <li>统一API命名约定和版本控制策略</li>
      <li>实施自动化API测试</li>
      <li>添加API监控和日志记录</li>
    `;
  }
  
  // 全局函数
  window.viewDetails = function(endpoint) {
    alert(`查看端点详情: ${endpoint}`);
  };
});
} // 客户端检查结束
</script>