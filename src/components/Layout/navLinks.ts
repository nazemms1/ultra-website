export type NavLabels = {
  about: string
  services: string
  projects: string
  contact: string
}

export const navLinks = [
  { labelKey: 'about' as const, href: '/#about', sectionId: 'about' as const },
  { labelKey: 'services' as const, href: '/#services', sectionId: 'services' as const },
  { labelKey: 'projects' as const, href: '/#projects', sectionId: 'projects' as const },
]

export type SectionId = 'about' | 'services' | 'projects'
