/** Site-wide configuration */
export const siteConfig = {
  name: 'Ultrawares',
  tagline: 'Ultra Solutions',
  description:
    'Ultrawares provides cutting-edge solutions for businesses wanting to optimize their operations and gain a competitive edge.',
  contactEmail: 'hello@ultrawares.com',
} as const

export const host = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ultrawares.com'
