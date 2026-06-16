export type NavLabels = {
  about: string
  services: string
  projects: string
  contact: string
}

export const navLinks = [
  { labelKey: 'about' as const, href: '/about' },
  { labelKey: 'services' as const, href: '/services' },
  { labelKey: 'projects' as const, href: '/projects' },
]
