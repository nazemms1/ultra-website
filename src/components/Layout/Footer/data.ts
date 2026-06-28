import { siteConfig } from '@/config'
import type { StatConfig } from '@/components/Pages/Home/Stats/types'

export const usefulLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our services', href: '/services' },
  { label: 'Our projects', href: '/projects' },
  { label: 'Contact Us', href: '/contact' },
] as const

export const serviceItems = [
  'Business Analysis',
  'Mobile & Web Eng.',
  'UI/UX Design',
  'DevOps & Cloud',
] as const

export const officeLocations = [
  { label: 'Syria Office', value: 'Damascus, Syria' },
  { label: 'UAE Office', value: 'Dubai, United Arab Emirates' },
] as const

export const footerStats: StatConfig[] = [
  {
    value: 120,
    suffix: '+',
    label: 'Projects Shipped',
    entranceDelay: 0,
    entranceDuration: 0.55,
    countDuration: 2.0,
  },
  {
    value: 45,
    suffix: '+',
    label: 'Happy Clients',
    entranceDelay: 0.12,
    entranceDuration: 0.55,
    countDuration: 1.7,
  },
  {
    value: 8,
    suffix: '+',
    label: 'Years of Craft',
    entranceDelay: 0.24,
    entranceDuration: 0.55,
    countDuration: 1.4,
  },
  {
    value: 99,
    suffix: '%',
    label: 'Retention Rate',
    entranceDelay: 0.36,
    entranceDuration: 0.55,
    countDuration: 1.2,
  },
]

export const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] as const

export const footerContactEmail = siteConfig.contactEmail
