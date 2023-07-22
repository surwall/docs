import { Sidebar } from '../types/sidebar'

export const code: Sidebar = [
  {
    text: 'DevOps',
    items: [
      { text: 'docker', link: '/code/devops/docker-mastery.md' },
      { text: 'services', link: '/code/devops/services.md' },
      { text: 'processes', link: '/code/devops/processes.md' },
      { text: 'softwares', link: '/code/devops/softwares.md' },
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
