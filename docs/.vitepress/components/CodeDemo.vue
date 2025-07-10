<template>
  <div class="code-demo">
    <div class="demo-header">
      <h3 class="demo-title">{{ title }}</h3>
      <div class="demo-actions">
        <button 
          v-for="tab in tabs" 
          :key="tab.name"
          :class="['tab-button', { active: activeTab === tab.name }]"
          @click="activeTab = tab.name"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
    
    <div class="demo-content">
      <div v-if="activeTab === 'preview'" class="preview-area">
        <slot name="preview"></slot>
      </div>
      
      <div v-if="activeTab === 'code'" class="code-area">
        <div class="code-header">
          <span class="code-label">代码</span>
          <button class="copy-button" @click="copyCode">
            {{ copied ? '已复制' : '复制' }}
          </button>
        </div>
        <div class="code-content">
          <slot name="code"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title?: string
  tabs?: Array<{ name: string; label: string }>
}

const props = withDefaults(defineProps<Props>(), {
  title: '代码演示',
  tabs: () => [
    { name: 'preview', label: '预览' },
    { name: 'code', label: '代码' }
  ]
})

const activeTab = ref('preview')
const copied = ref(false)

const copyCode = async () => {
  try {
    const codeElement = document.querySelector('.code-content pre code')
    if (codeElement) {
      await navigator.clipboard.writeText(codeElement.textContent || '')
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    }
  } catch (error) {
    console.error('复制失败:', error)
  }
}
</script>

<style scoped>
.code-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  margin: 1.5rem 0;
  background: var(--vp-c-bg);
}

.demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.demo-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.demo-actions {
  display: flex;
  gap: 0.5rem;
}

.tab-button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-button:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.tab-button.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.demo-content {
  padding: 1.5rem;
}

.preview-area {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.code-area {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.code-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.copy-button {
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-button:hover {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.code-content {
  padding: 1rem;
  background: var(--vp-c-bg);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .demo-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .demo-actions {
    width: 100%;
  }
  
  .tab-button {
    flex: 1;
    text-align: center;
  }
}
</style> 