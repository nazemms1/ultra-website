import type { Metadata } from 'next'
import { Rajdhani } from 'next/font/google'
import { hasLocale } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import AppShell from '@/components/Layout/AppShell'
import AppProviders from '@/providers/AppProviders'
import { routing, type AppLocale } from '@/i18n/routing'
import { host, siteConfig } from '@/config'
import { fetchAPI } from '@/lib/api'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale: locale as AppLocale, namespace: 'LocaleLayout' })

  return {
    title: {
      template: `%s | ${siteConfig.name}`,
      default: t('title'),
    },
    description: t('description'),
    metadataBase: new URL(host),
    icons: {
      icon: '/images/logo/logo-ultra.svg',
      shortcut: '/images/logo/logo-ultra.svg',
      apple: '/images/logo/logo-ultra.svg',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: host,
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  }
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages({ locale: locale as AppLocale })
  const tNav = await getTranslations({ locale: locale as AppLocale, namespace: 'Navigation' })
  const navLabels = {
    about: tNav('about'),
    services: tNav('services'),
    projects: tNav('projects'),
    contact: tNav('contact'),
  }

  const [footerData, statsData, partnersData, servicesData, portfoliosData] = await Promise.all([
    fetchAPI('/api/footer-data', locale),
    fetchAPI('/api/statisitcs-data', locale),
    fetchAPI('/api/partners-data', locale),
    fetchAPI('/api/services-data', locale),
    fetchAPI('/api/portfolios-data', locale),
  ])

  const isArabic = locale === 'ar'

  return (
    <html
      lang={locale}
      dir={isArabic ? 'rtl' : 'ltr'}
      className={rajdhani.className}
      suppressHydrationWarning
      style={{ scrollBehavior: 'smooth' }}
    >
      <body suppressHydrationWarning>
        <AppProviders locale={locale as AppLocale} messages={messages}>
          <AppShell
            navLabels={navLabels}
            footerData={footerData}
            statsData={statsData}
            navSectionsVisibility={{
              about: partnersData?.is_shown !== false,
              services: servicesData?.is_shown !== false,
              projects: portfoliosData?.is_shown !== false,
            }}
          >
            {children}
          </AppShell>
        </AppProviders>
      </body>
    </html>
  )
}
