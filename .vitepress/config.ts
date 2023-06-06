import { defineConfig } from 'vitepress'
import {websites,math, code} from './sidebars'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Surwall's Blog",
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
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

    socialLinks: [{ icon: 'github', link: 'https://github.com/surwall'}
  ],
  },
})
