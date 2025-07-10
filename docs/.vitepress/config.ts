import { defineConfig } from 'vitepress'
//import { autoGenerateSidebar } from 'press-util'
import vite from './vite.config'
import theme from './theme'

export default defineConfig({
  base: '/',
  appearance: true,
  title: 'Fruit-Guardians | 现代化文档模板',
  description: '一个现代化、美观的VitePress文档模板，专为开发者打造',
  lastUpdated: true,
  
  // 标签页logo
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }], // chrome pwa
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'description', content: '现代化VitePress文档模板，专为开发者打造' }],
    ['meta', { property: 'og:title', content: 'Fruit-Guardians | 现代化文档模板' }],
    ['meta', { property: 'og:description', content: '一个现代化、美观的VitePress文档模板，专为开发者打造' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],
  
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
    // 现代化代码高亮主题
    theme: {
      light: 'github-light',
      dark: 'dracula'
    }
  },

  themeConfig: {
    logo: '/logo.png',
    lastUpdatedText: '最近更新于',
    // 2/3/4级标题均形成目录
    outline: [2, 4],
    outlineTitle: '目录',
    
    // 现代化导航
    nav: [
      {
        text: '🏠 首页',
        link: '/'
      },
      {
        text: '📚 文档',
        link: '/docc/',
        activeMatch: '/docc/'
      },
      {
        text: '🔍 监控系统',
        link: '/monitor/',
        activeMatch: '/monitor/'
      },
      {
        text: '💡 关于',
        link: '/about.md'
      }
    ],

    // 现代化侧边栏
    sidebar: {
      '/docc/': [
        {
          text: '📖 文档指南',
          items: [
            { text: '🚀 快速开始', link: '/docc/index.md' },
            { text: '🛠️ 核心工具', link: '/docc/BTools.md' },
            { text: '🎨 蓝图开发', link: '/docc/Blueprint.md' },
            { text: '📝 VitePress搭建', link: '/docc/Vitepress.md' },
            { text: '🐳 Docker部署', link: '/docc/docker.md' },
            { text: '🎨 样式风格', link: '/docc/style.md' },
            { text: '🎨 组件示例', link: '/docc/examples.md' },
            { text: '❓ 常见问题', link: '/docc/faq.md' },
            { text: '🤝 贡献指南', link: '/docc/contributing.md' },
          ]
        }
      ],

      '/monitor/': [
        {
          text: '🔍 监控系统',
          items: [
            { text: '📋 系统介绍', link: '/monitor/index.md' },
            { text: '🔬 代码分析', link: '/monitor/jiesao.md' }
          ]
        }
      ]
    },

    // 现代化社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Fruit-Guardians' },
      { icon: 'twitter', link: 'https://twitter.com/FruitGuardians' },
      { icon: 'discord', link: 'https://discord.gg/fruitguardians' }
    ],

    // 现代化页脚
    footer: {
      message: '基于 MIT 许可证发布',
      copyright: 'Copyright © 2025 Fruit-Guardians'
    },

    // 现代化搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    // 现代化编辑链接
    editLink: {
      pattern: 'https://github.com/Fruit-Guardians/Vitrpress-theme/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 现代化返回顶部
    // returnToTop: true,
    
    // 现代化移动端菜单
    // mobileMenu: {
    //   showSocialLinks: true
    // }
  },

  vite,
})