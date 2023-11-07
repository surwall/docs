import { defineConfig } from 'vitepress'
import { websites, math, code } from './sidebars'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "Surwall's Blog",
  description: 'A VitePress Site',
  lastUpdated: true,
  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
    math: true,
    theme: 'one-dark-pro'
  },
  head: [
    [
      'link',
      { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' },
    ],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // docFooter: { prev: '上一页', next: '下一页' },
    search: {
      provider: 'algolia',
      options: {
        appId: 'Z1XLFKCKDN',
        apiKey: '4af158a7baf52e79afea28560a0f8252',
        indexName: 'xuchaoyin',
      },
    },
    // returnToTopLabel: '回到顶部',
    outline: {
      // label: '本页目录',
      level: 'deep',
    },
    // lastUpdatedText: '上次更新时间',
    logo: '/logo.jpg',
    editLink: {
      // text: '编辑此页面',
      pattern: 'https://github.com/surwall/docs/edit/main/:path',
    },
    nav: [
      { text: 'economics', link: '/economics' },
      { text: 'code', link: '/code/' },
      { text: 'math', link: '/math/' },
      {
        text: 'misc',
        items: [
          { text: 'mac setup', link: '/misc/mac-setup.md' },
          {
            text: 'windows setup',
            link: '/code/devops/boot_setup_guide/index.md#windows-setup',
          },
          { text: 'mathjax', link: '/misc/mathjax.md' },
        ],
      },
    ],

    // 侧边栏匹配
    sidebar: {
      '/websites': websites,
      '/math': math,
      '/code': code,
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/surwall' }],
  },

  // no need for vite.config.ts
  vite: {},
})
