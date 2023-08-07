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
      //  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    ],
    // [
    //   'link',
    //   {
    //     href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css',
    //     rel: 'stylesheet',
    //     crossorigin: 'anonymous',
    //   },
    // ],
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
