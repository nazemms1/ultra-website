export type NavLabels = {
  about: string
  services: string
  projects: string
  contact: string
  gallery: string
}

export const navLinks = [
  { labelKey: 'about' as const, href: '/#about', sectionId: 'about' as const },
  { labelKey: 'services' as const, href: '/#services', sectionId: 'services' as const },
  { labelKey: 'projects' as const, href: '/#projects', sectionId: 'projects' as const },
  { labelKey: 'gallery' as const, href: '/gallery', sectionId: 'gallery' as const },
]

export type SectionId = 'about' | 'services' | 'projects' | 'gallery'
