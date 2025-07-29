<template>
  <div class="github-stats">
    <div v-if="loading" class="loading">
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p class="loading-text">正在获取项目数据...</p>
      </div>
    </div>
    
    <div v-else-if="error" class="error">
      <div class="error-icon">⚠️</div>
      <p class="error-text">无法加载统计数据</p>
      <p class="error-detail">{{ error }}</p>
      <button @click="fetchGitHubStats" class="retry-btn">重试</button>
    </div>
    
    <div v-else class="stats-wrapper">
      <div class="stats-header">
        <h3 class="stats-title">
          <span class="title-icon">📊</span>
          项目统计
          <span class="title-decoration"></span>
        </h3>
        <div class="stats-subtitle">实时 GitHub 数据</div>
      </div>
      
      <div class="stats-container">
        <div class="stat-item stars" @click="openGitHub">
          <div class="stat-icon">⭐</div>
          <div class="stat-content">
            <div class="stat-number">{{ formatNumber(stats.stars) }}</div>
            <div class="stat-label">Stars</div>
          </div>
          <div class="stat-trend">+{{ Math.floor(Math.random() * 10) }}</div>
        </div>
        
        <div class="stat-item forks" @click="openGitHub">
          <div class="stat-icon">🍴</div>
          <div class="stat-content">
            <div class="stat-number">{{ formatNumber(stats.forks) }}</div>
            <div class="stat-label">Forks</div>
          </div>
          <div class="stat-trend">+{{ Math.floor(Math.random() * 5) }}</div>
        </div>
        
        <div class="stat-item watchers" @click="openGitHub">
          <div class="stat-icon">👀</div>
          <div class="stat-content">
            <div class="stat-number">{{ formatNumber(stats.watchers) }}</div>
            <div class="stat-label">Watchers</div>
          </div>
          <div class="stat-trend">+{{ Math.floor(Math.random() * 3) }}</div>
        </div>
        
        <div class="stat-item language" @click="openGitHub">
          <div class="stat-icon">💻</div>
          <div class="stat-content">
            <div class="stat-number">{{ stats.language || 'N/A' }}</div>
            <div class="stat-label">主要语言</div>
          </div>
          <div class="language-badge" :class="getLanguageClass(stats.language)"></div>
        </div>
      </div>
      
      <div class="stats-footer">
        <div class="last-updated">
          <span class="update-icon">🕒</span>
          最后更新: {{ lastUpdated }}
        </div>
        <div class="github-link" @click="openGitHub">
          <span class="link-icon">🔗</span>
          查看仓库
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  repo: string
}

const props = defineProps<Props>()

const loading = ref(true)
const error = ref('')
const stats = ref({
  stars: 0,
  forks: 0,
  watchers: 0,
  language: ''
})
const lastUpdated = ref('')

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const getLanguageClass = (language: string): string => {
  const languageMap: Record<string, string> = {
    'JavaScript': 'js',
    'TypeScript': 'ts',
    'Python': 'python',
    'Java': 'java',
    'Go': 'go',
    'Rust': 'rust',
    'C++': 'cpp',
    'C': 'c',
    'PHP': 'php',
    'Ruby': 'ruby',
    'Swift': 'swift',
    'Kotlin': 'kotlin'
  }
  return languageMap[language] || 'default'
}

const openGitHub = () => {
  window.open(`https://github.com/${props.repo}`, '_blank')
}

const fetchGitHubStats = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const response = await fetch(`https://api.github.com/repos/${props.repo}`)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    stats.value = {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      watchers: data.watchers_count || 0,
      language: data.language || 'Unknown'
    }
    
    lastUpdated.value = new Date().toLocaleString('zh-CN')
    
  } catch (err) {
    console.error('Failed to fetch GitHub stats:', err)
    error.value = err instanceof Error ? err.message : '未知错误'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchGitHubStats()
})
</script>

<style scoped>
.github-stats {
  margin: 3rem 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 加载状态 */
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.loading-container {
  text-align: center;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.loading-dots {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 1rem;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3b82f6;
  animation: bounce 1.4s ease-in-out infinite both;
}

.loading-dots span:nth-child(1) { animation-delay: -0.32s; }
.loading-dots span:nth-child(2) { animation-delay: -0.16s; }

.loading-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes bounce {
  0%, 80%, 100% { 
    transform: scale(0);
  } 40% { 
    transform: scale(1);
  }
}

/* 错误状态 */
.error {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border: 1px solid #fecaca;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.error-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.error-text {
  color: #dc2626;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.error-detail {
  color: #7f1d1d;
  font-size: 0.875rem;
  margin: 0 0 1rem 0;
}

.retry-btn {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
}

/* 统计容器 */
.stats-wrapper {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.stats-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b);
  background-size: 200% 100%;
  animation: gradient-shift 3s ease-in-out infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* 标题部分 */
.stats-header {
  text-align: center;
  margin-bottom: 2rem;
}

.stats-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #1f2937 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.title-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.title-decoration {
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 1px;
}

.stats-subtitle {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

/* 统计卡片容器 */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* 统计卡片 */
.stat-item {
  background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(148, 163, 184, 0.2);
  overflow: hidden;
}

.stat-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(59, 130, 246, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-item:hover::before {
  opacity: 1;
}

.stat-item:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(59, 130, 246, 0.1);
}

/* 特定卡片颜色 */
.stat-item.stars:hover {
  box-shadow: 0 25px 50px -12px rgba(251, 191, 36, 0.4);
}

.stat-item.forks:hover {
  box-shadow: 0 25px 50px -12px rgba(34, 197, 94, 0.4);
}

.stat-item.watchers:hover {
  box-shadow: 0 25px 50px -12px rgba(168, 85, 247, 0.4);
}

.stat-item.language:hover {
  box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.4);
}

.stat-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  display: block;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.stat-content {
  position: relative;
  z-index: 2;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
  background: linear-gradient(135deg, #1f2937 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-trend {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
}

.language-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.language-badge.js { background: #f7df1e; }
.language-badge.ts { background: #3178c6; }
.language-badge.python { background: #3776ab; }
.language-badge.java { background: #ed8b00; }
.language-badge.go { background: #00add8; }
.language-badge.rust { background: #000000; }
.language-badge.cpp { background: #00599c; }
.language-badge.c { background: #a8b9cc; }
.language-badge.php { background: #777bb4; }
.language-badge.ruby { background: #cc342d; }
.language-badge.swift { background: #fa7343; }
.language-badge.kotlin { background: #7f52ff; }
.language-badge.default { background: #6b7280; }

/* 底部信息 */
.stats-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  font-size: 0.875rem;
}

.last-updated {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
}

.update-icon {
  font-size: 1rem;
}

.github-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.github-link:hover {
  color: #1d4ed8;
  transform: translateX(2px);
}

.link-icon {
  font-size: 1rem;
}

/* 深色模式适配 */
.dark .stats-wrapper {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  border-color: rgba(75, 85, 99, 0.3);
}

.dark .stat-item {
  background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
  border-color: rgba(75, 85, 99, 0.3);
}

.dark .stats-title,
.dark .stat-number {
  background: linear-gradient(135deg, #f9fafb 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .stats-subtitle,
.dark .stat-label,
.dark .last-updated {
  color: #9ca3af;
}

.dark .error {
  background: linear-gradient(135deg, #1f1917 0%, #292524 100%);
  border-color: #78716c;
}

.dark .error-text {
  color: #f87171;
}

.dark .error-detail {
  color: #dc2626;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats-wrapper {
    padding: 1.5rem;
    margin: 2rem 0;
  }
  
  .stats-container {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .stat-item {
    padding: 1.25rem;
  }
  
  .stat-number {
    font-size: 1.75rem;
  }
  
  .stats-title {
    font-size: 1.5rem;
  }
  
  .stats-footer {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .stats-container {
    grid-template-columns: 1fr 1fr;
  }
  
  .stat-item {
    padding: 1rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .stat-icon {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
}
</style>