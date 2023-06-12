import { defineConfig } from 'vitepress'
import { websites, math, code } from './sidebars'
import mathjax3 from 'markdown-it-mathjax3'

const customElements = ['mjx-container']


// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "Surwall's Blog",
  description: 'A VitePress Site',
  lastUpdated: true,
  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(mathjax3)
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag),
      },
    },
  },
  head: [
    [
      'link',
      { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' },
    ],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    docFooter: { prev: '上一页', next: '下一页' },
    search: {
      provider: 'algolia',
      options: {
        appId: 'Z1XLFKCKDN',
        apiKey: '4af158a7baf52e79afea28560a0f8252',
        indexName: 'xuchaoyin',
      },
    },
    returnToTopLabel: '回到顶部',
    outline: {
      label: '本页目录',
      level: 'deep',
    },
    lastUpdatedText: '上次更新时间',
    logo: '/logo.jpg',
    editLink: {
      text: '编辑此页面',
      pattern: 'https://github.com/surwall/docs/edit/master/:path',
    },
    nav: [
      // { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' },
    ],

    // 侧边栏匹配
    sidebar: {
      '/websites': websites,
      '/math': math,
      '/code': code,
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/surwall' }],
  },
})
