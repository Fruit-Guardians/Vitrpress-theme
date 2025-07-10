<template>
  <div class="modern-layout">
    <!-- 现代化导航栏 -->
    <header class="modern-header">
      <div class="header-container">
        <div class="header-left">
          <router-link to="/" class="logo">
            <img src="/logo.png" alt="Fruit-Guardians" class="logo-img" />
            <span class="logo-text">Fruit-Guardians</span>
          </router-link>
        </div>
        
        <nav class="header-nav">
          <router-link 
            v-for="item in navItems" 
            :key="item.text"
            :to="item.link"
            class="nav-item"
            :class="{ active: isActive(item.link) }"
          >
            {{ item.text }}
          </router-link>
        </nav>
        
        <div class="header-right">
          <button class="theme-toggle" @click="toggleTheme">
            <span v-if="isDark" class="icon">🌙</span>
            <span v-else class="icon">☀️</span>
          </button>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="modern-main">
      <slot />
    </main>

    <!-- 现代化页脚 -->
    <footer class="modern-footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">Fruit-Guardians</h3>
            <p class="footer-description">
              现代化、美观的VitePress文档模板，专为开发者打造
            </p>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-subtitle">快速链接</h4>
            <ul class="footer-links">
              <li><router-link to="/docc/">文档</router-link></li>
              <li><router-link to="/monitor/">监控系统</router-link></li>
              <li><router-link to="/about.md">关于</router-link></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-subtitle">社区</h4>
            <ul class="footer-links">
              <li><a href="https://github.com/Fruit-Guardians" target="_blank">GitHub</a></li>
              <li><a href="https://twitter.com/FruitGuardians" target="_blank">Twitter</a></li>
              <li><a href="https://discord.gg/fruitguardians" target="_blank">Discord</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p class="footer-copyright">
            © 2025 Fruit-Guardians. 基于 MIT 许可证发布
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isDark = ref(false)

const navItems = [
  { text: '🏠 首页', link: '/' },
  { text: '📚 文档', link: '/docc/' },
  { text: '🔍 监控系统', link: '/monitor/' },
  { text: '💡 关于', link: '/about.md' }
]

const isActive = (link: string) => {
  return route.path.startsWith(link)
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>

<style scoped>
.modern-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 现代化导航栏 */
.modern-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgb(255 255 255 / 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgb(229 231 235 / 0.5);
  transition: all 0.3s ease;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.header-left .logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: rgb(17 24 39);
  font-weight: 600;
  font-size: 1.25rem;
}

.logo-img {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}

.header-nav {
  display: flex;
  gap: 2rem;
}

.nav-item {
  text-decoration: none;
  color: rgb(107 114 128);
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
}

.nav-item:hover {
  color: rgb(99 102 241);
}

.nav-item.active {
  color: rgb(99 102 241);
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -16px;
  left: 0;
  right: 0;
  height: 2px;
  background: rgb(99 102 241);
  border-radius: 1px;
}

.theme-toggle {
  background: transparent;
  border: 1px solid rgb(229 231 235);
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  background: rgb(243 244 246);
  transform: translateY(-1px);
}

/* 主要内容区域 */
.modern-main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  width: 100%;
}

/* 现代化页脚 */
.modern-footer {
  background: rgb(249 250 251);
  border-top: 1px solid rgb(229 231 235);
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(17 24 39);
  margin: 0;
}

.footer-description {
  color: rgb(107 114 128);
  line-height: 1.6;
  margin: 0;
}

.footer-subtitle {
  font-size: 1rem;
  font-weight: 600;
  color: rgb(17 24 39);
  margin: 0 0 0.5rem 0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links a {
  color: rgb(107 114 128);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: rgb(99 102 241);
}

.footer-bottom {
  border-top: 1px solid rgb(229 231 235);
  padding-top: 1rem;
  text-align: center;
}

.footer-copyright {
  color: rgb(107 114 128);
  margin: 0;
}

/* 暗色模式 */
.dark .modern-header {
  background: rgb(17 24 39 / 0.9);
  border-bottom-color: rgb(55 65 81 / 0.5);
}

.dark .header-left .logo {
  color: rgb(243 244 246);
}

.dark .nav-item {
  color: rgb(156 163 175);
}

.dark .nav-item:hover,
.dark .nav-item.active {
  color: rgb(129 140 248);
}

.dark .theme-toggle {
  border-color: rgb(75 85 99);
}

.dark .theme-toggle:hover {
  background: rgb(55 65 81);
}

.dark .modern-footer {
  background: rgb(17 24 39);
  border-top-color: rgb(55 65 81);
}

.dark .footer-title,
.dark .footer-subtitle {
  color: rgb(243 244 246);
}

.dark .footer-description,
.dark .footer-links a,
.dark .footer-copyright {
  color: rgb(156 163 175);
}

.dark .footer-links a:hover {
  color: rgb(129 140 248);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-nav {
    display: none;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style> 