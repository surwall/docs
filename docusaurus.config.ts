import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives";


const config: Config = {
  title: "Surwall's Blog",
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://surwall.netlify.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'surwall', // Usually your GitHub org/user name.
  // projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          beforeDefaultRemarkPlugins: [remarkGithubAdmonitionsToDirectives],
          path: 'docs',
          sidebarPath: './sidebars.ts',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      ({
        hashed: true,
        language: ["en", "zh"],

      })
    ]

  ],
  markdown: {
    mermaid: true,
  },
  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      hideOnScroll: true,
      title: 'Surwall',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        // blog
        { to: '/blog', label: 'BLOG', position: 'right' },
        {
          type: 'dropdown', label: 'Windows',
          items: [
            { type: 'docSidebar', sidebarId: 'winScriptSidebar', label: 'Windows Scripts' },
            { type: 'docSidebar', sidebarId: 'winGuiSidebar', label: 'Windows Gui Dev' },
            { type: 'docSidebar', sidebarId: 'winSetupSidebar', label: 'Windows Setup'}
          ]
        },
        {
          type: 'dropdown', label: 'Softwares',
          items: [
            {type: 'docSidebar', sidebarId: 'softwaresSidebar', label: 'Softwares'},
            {type: 'docSidebar', sidebarId: 'majorsoftwaresSidebar', label: 'Major Softwares'},
            {type: 'docSidebar', sidebarId: 'appsSidebar', label: 'Android Apps'},
          ]
        },
        {
          type: 'dropdown', label: 'Linux',
          items: [
            {type: 'docSidebar', sidebarId: 'linuxadminSidebar', label: 'Linux Administration'},
            {type: 'docSidebar', sidebarId: 'linuxdesktopSidebar', label: 'Linux Desktop'},
          ]
        },
        {
          type: 'docSidebar', sidebarId: 'englishSidebar', label: 'English'
        }
      ],
    },


    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/logo.jpg',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json', // your PWA manifest
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(37, 194, 160)',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#000',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: '/img/logo.jpg',
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: '/img/logo.jpg',
            color: 'rgb(37, 194, 160)',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            content: '/img/logo.jpg',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#000',
          },
        ],

        injectManifestConfig: {
          manifestTransforms: [
            //...
          ],
          modifyURLPrefix: {
            //...
          },
          // We already add regular static assets (HTML, images...) to be available offline
          // You can add more files according to your needs
          globPatterns: ['**/*.{pdf,docx,xlsx}'],
          // ...
        },
      },
    ],
  ]
};

export default config;
