<template>
  <button 
    class="modern-button" 
    :class="[
      `btn-${variant}`,
      { 'btn-loading': loading, 'btn-disabled': disabled }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="loading-spinner"></span>
    <span v-if="icon" class="btn-icon">{{ icon }}</span>
    <span class="btn-text">
      <slot>{{ text }}</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  icon?: string
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.modern-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.modern-button:focus {
  outline: 2px solid rgb(99 102 241);
  outline-offset: 2px;
}

/* 尺寸变体 */
.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
}

.btn-md {
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1rem;
}

/* 样式变体 */
.btn-primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgb(99 102 241 / 0.3);
}

.btn-secondary {
  background: rgb(243 244 246);
  color: rgb(17 24 39);
  border: 1px solid rgb(229 231 235);
}

.btn-secondary:hover:not(:disabled) {
  background: rgb(229 231 235);
  transform: translateY(-1px);
}

.btn-outline {
  background: transparent;
  color: rgb(99 102 241);
  border: 2px solid rgb(99 102 241);
}

.btn-outline:hover:not(:disabled) {
  background: rgb(99 102 241);
  color: white;
  transform: translateY(-1px);
}

.btn-ghost {
  background: transparent;
  color: rgb(107 114 128);
}

.btn-ghost:hover:not(:disabled) {
  background: rgb(243 244 246);
  color: rgb(17 24 39);
}

/* 加载状态 */
.btn-loading {
  pointer-events: none;
}

.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 禁用状态 */
.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

/* 图标样式 */
.btn-icon {
  font-size: 1.1em;
}

/* 暗色模式 */
.dark .btn-secondary {
  background: rgb(55 65 81);
  color: rgb(243 244 246);
  border-color: rgb(75 85 99);
}

.dark .btn-secondary:hover:not(:disabled) {
  background: rgb(75 85 99);
}

.dark .btn-ghost {
  color: rgb(156 163 175);
}

.dark .btn-ghost:hover:not(:disabled) {
  background: rgb(55 65 81);
  color: rgb(243 244 246);
}
</style> 