import { Sidebar } from '../types/sidebar'

export const code: Sidebar = [
  {
    text: 'DevOps',
    items: [
      { text: 'docker', link: '/code/devops/docker-mastery.md' },
      { text: 'services', link: '/code/devops/services.md' },
      { text: 'processes', link: '/code/devops/processes.md' },
      { text: 'softwares', link: '/code/devops/softwares.md' },
      { text: 'vim', link: '/code/devops/vim.md' },
      { text: 'git', link: '/code/devops/git.md' },
      { text: 'shell', link: '/code/devops/shell.md' },
      { text: 'help system', link: '/code/devops/help-system.md' },
      {text: 'self host service', link: '/code/devops/self-host-services.md'},
      {text: 'user management', link: '/code/devops/user-management.md'},
      {text: 'file system', link: '/code/devops/file-system.md'},
    ],
  },
  {
    text: 'Android',
    items: [{ text: 'env setup', link: '/code/android/toolchain.md' }],
  },
  {
    text: 'Data',
    items: [{ text: 'web scraping', link: '/code/data/web-scraping.md' }],
  },
]
