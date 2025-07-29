import { defineConfig } from 'vitepress'
import markdownItTaskCheckbox from 'markdown-it-task-checkbox'
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid'

export default defineConfig({
  lang: 'zh-CN',
  title: "Api-Finder",
  description: "一个强大的前端API端点发现和扫描工具",

  // #region fav
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: 'api-finder,api-discovery,frontend-scanner,security-tool,penetration-testing,api-endpoints,web-scanner' }],
    ['meta', { name: 'author', content: 'jujubooom' }],
    ['meta', { property: 'og:title', content: 'Api-Finder | 前端API发现工具' }],
    ['meta', { property: 'og:description', content: '一个强大的前端API端点发现和扫描工具' }],
    ['meta', { property: 'og:type', content: 'website' }],
  ],
  // #endregion fav

  base: '/',

  //启用深色模式
  appearance: 'dark',

  //markdown配置
  markdown: {
    //行号显示
    lineNumbers: true,

    // toc显示一级标题
    toc: { level: [1, 2, 3] },

    // 使用 `!!code` 防止转换
    codeTransformers: [
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ],

    // 开启图片懒加载
    image: {
      lazyLoading: true
    },

    config: (md) => {
      // 组件插入h1标题下
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options)
        if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`
        return htmlResult
      }

      // 代码组中添加图片
      md.use((md) => {
        const defaultRender = md.render
        md.render = (...args) => {
          const [content, env] = args
          const currentLang = env?.localeIndex || 'root'
          const isHomePage = env?.path === '/' || env?.relativePath === 'index.md'

          if (isHomePage) {
            return defaultRender.apply(md, args)
          }
          
          let defaultContent = defaultRender.apply(md, args)
          
          if (currentLang === 'root') {
            defaultContent = defaultContent.replace(/NOTE/g, '提醒')
              .replace(/TIP/g, '建议')
              .replace(/IMPORTANT/g, '重要')
              .replace(/WARNING/g, '警告')
              .replace(/CAUTION/g, '注意')
          }
          
          return defaultContent
        }

        // 获取原始的 fence 渲染规则
        const defaultFence = md.renderer.rules.fence?.bind(md.renderer.rules) ?? ((...args) => args[0][args[1]].content)

        // 重写 fence 渲染规则
        md.renderer.rules.fence = (tokens, idx, options, env, self) => {
          const token = tokens[idx]
          const info = token.info.trim()

          // 判断是否为 md:img 类型的代码块
          if (info.includes('md:img')) {
            return `<div class="rendered-md">${md.render(token.content)}</div>`
          }

          return defaultFence(tokens, idx, options, env, self)
        }
      })

      md.use(groupIconMdPlugin) //代码组图标
      md.use(markdownItTaskCheckbox) //todo
      md.use(MermaidMarkdown)
    }
  },

  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          ts: localIconLoader(import.meta.url, '../public/svg/typescript.svg'),
          md: localIconLoader(import.meta.url, '../public/svg/md.svg'),
          css: localIconLoader(import.meta.url, '../public/svg/css.svg'),
          js: 'logos:javascript',
          python: 'logos:python',
          json: 'logos:json',
        },
      }),
      [MermaidPlugin()]
    ] as any,
    optimizeDeps: {
      include: ['mermaid'],
    },
    ssr: {
      noExternal: ['mermaid'],
    },
  },

  lastUpdated: true,

  //主题配置
  themeConfig: {
    //左上角logo
    logo: '/logo.png',

    //编辑本页
    editLink: {
      pattern: 'https://github.com/jujubooom/Api-Finder/edit/main/docs/:path',
      text: '在GitHub编辑本页'
    },

    //上次更新时间
    lastUpdated: {
      text: '上次更新时间',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      },
    },

    //导航栏
    nav: [
      { text: '首页', link: '/' },
      {
        text: '📖 文档',
        items: [
          {
            text: '快速开始',
            items: [
              { text: '快速上手', link: '/getting-started' },
              { text: '安装配置', link: '/guide/installation' },
            ],
          },
          {
            text: '用户指南',
            items: [
              { text: '用户指南', link: '/guide/' },
              { text: '使用示例', link: '/examples/' },
              { text: 'API参考', link: '/api/' },
            ],
          },
        ],
      },
      {
        text: '🛠️ 工具',
        items: [
          { text: '在线扫描器', link: '/tools/scanner' },
          { text: '结果分析器', link: '/tools/analyzer' },
          { text: '规则编辑器', link: '/tools/rule-editor' },
        ],
      },
      {
        text: '🔗 链接',
        items: [
          { text: 'GitHub', link: 'https://github.com/jujubooom/Api-Finder' },
          { text: '问题反馈', link: 'https://github.com/jujubooom/Api-Finder/issues' },
          { text: '贡献指南', link: '/contributing' },
        ],
      },
    ],

    //侧边栏
    sidebar: {
      '/guide/': [
        {
          text: '快速开始',
          collapsed: false,
          items: [
            { text: '快速上手', link: '/getting-started' },
            { text: '安装配置', link: '/guide/installation' },
          ],
        },
        {
          text: '用户指南',
          collapsed: false,
          items: [
            { text: '用户指南', link: '/guide/' },
            { text: '使用示例', link: '/examples/' },
          ],
        },
        {
          text: 'API参考',
          collapsed: false,
          items: [
            { text: 'API参考', link: '/api/' },
            { text: '命令行接口', link: '/api/cli' },
            { text: '配置文件', link: '/api/config' },
          ],
        },
      ],
      '/examples/': [
        {
          text: '使用示例',
          collapsed: false,
          items: [
            { text: '基础示例', link: '/examples/' },
            { text: '高级用法', link: '/examples/advanced' },
            { text: '实战案例', link: '/examples/cases' },
          ],
        },
      ],
      '/tools/': [
        {
          text: '在线工具',
          collapsed: false,
          items: [
            { text: '在线扫描器', link: '/tools/scanner' },
            { text: '结果分析器', link: '/tools/analyzer' },
            { text: '规则编辑器', link: '/tools/rule-editor' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API参考',
          collapsed: false,
          items: [
            { text: 'API概览', link: '/api/' },
            { text: '命令行接口', link: '/api/cli' },
            { text: '配置文件', link: '/api/config' },
            { text: '输出格式', link: '/api/output' },
          ],
        },
      ],
    },

    //社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jujubooom/Api-Finder' },
    ],

    //手机端深浅模式文字修改
    darkModeSwitchLabel: '深浅模式',

    //页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2023-${new Date().getFullYear()} Api-Finder`,
    },

    //侧边栏文字更改(移动端)
    sidebarMenuLabel: '目录',

    //返回顶部文字修改(移动端)
    returnToTopLabel: '返回顶部',

    //大纲显示2-3级标题
    outline: {
      level: [2, 3],
      label: '当前页大纲'
    },

    //自定义上下页名
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    //本地搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
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
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },
  },
})