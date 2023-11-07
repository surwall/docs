import { Sidebar } from '../types/sidebar'

export const code: Sidebar = [
  {
    text: "Languages",
    items: [
      { text: 'Overview', link: '/code/languages/overview.md' },
      { text: 'Python', link: '/code/languages/python.md' },
      { text: 'Java', link: '/code/languages/java.md' },
      { text: 'C', link: '/code/languages/c.md' },
    ],
    collapsed: true,
  },
  {

    text: 'DevOps',
    collapsed: true,
    items: [
      { text: 'docker', link: '/code/devops/docker-mastery.md' },
      { text: 'services', link: '/code/devops/services.md' },
      { text: 'processes', link: '/code/devops/processes.md' },
      { text: 'softwares', link: '/code/devops/softwares.md' },
      { text: 'vim', link: '/code/devops/vim.md' },
      { text: 'git', link: '/code/devops/git.md' },
      { text: 'shell', link: '/code/devops/shell.md' },
      { text: 'help system', link: '/code/devops/help-system.md' },
      { text: 'self host service', link: '/code/devops/self-host-services.md' },
      { text: 'user management', link: '/code/devops/user-management.md' },
      { text: 'file system', link: '/code/devops/file-system.md' },
      { text: 'Boot Setup Guide🚀', link: '/code/devops/boot_setup_guide/' },
      { text: 'Network Setup', link: '/code/devops/network-setup.md' }
    ],
  },
  {
    text: 'Android',
    collapsed: true,
    items: [{ text: 'env setup', link: '/code/android/toolchain.md' }],
  },
  {
    text: 'Data',
    collapsed: true,
    items: [{ text: 'web scraping', link: '/code/data/web-scraping.md' }],
  },

]
