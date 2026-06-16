import { siteConfig } from '@/config'

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

export const footerStats = [
  { value: '120+', label: 'Projects Shipped' },
  { value: '45+', label: 'Happy Clients' },
  { value: '8+', label: 'Years of Craft' },
  { value: '99%', label: 'Retention Rate' },
] as const

export const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] as const

export const footerContactEmail = siteConfig.contactEmail
