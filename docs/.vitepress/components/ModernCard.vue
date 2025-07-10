<template>
  <div class="modern-card" :class="{ 'hover': hover }">
    <div class="card-icon" v-if="icon">
      <span class="icon">{{ icon }}</span>
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon?: string
  title: string
  description: string
  hover?: boolean
}

defineProps<Props>()
</script>

<style scoped>
.modern-card {
  background: rgb(255 255 255 / 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgb(229 231 235 / 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.modern-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.modern-card:hover::before {
  transform: scaleX(1);
}

.modern-card.hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgb(0 0 0 / 0.1);
}

.card-icon {
  margin-bottom: 1rem;
}

.icon {
  font-size: 2rem;
  display: block;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(17 24 39);
  margin: 0 0 0.5rem 0;
}

.card-description {
  color: rgb(107 114 128);
  line-height: 1.6;
  margin: 0;
}

/* 暗色模式 */
.dark .modern-card {
  background: rgb(17 24 39 / 0.8);
  border-color: rgb(55 65 81 / 0.5);
}

.dark .card-title {
  color: rgb(243 244 246);
}

.dark .card-description {
  color: rgb(156 163 175);
}
</style> 