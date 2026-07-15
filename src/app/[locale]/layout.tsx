import type { Metadata } from 'next'
import { Rajdhani } from 'next/font/google'
import { hasLocale } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import AppShell from '@/components/Layout/AppShell'
import AppProviders from '@/providers/AppProviders'
import { routing, type AppLocale } from '@/i18n/routing'
import { host, siteConfig } from '@/config'
import { fetchAPI } from '@/lib/api'
import GlobalNavigationLoader from '@/components/shared/GlobalNavigationLoader'

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
    gallery: tNav('gallery'),
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
      <head>
        {/* Preconnect to font origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preconnect to backend API for faster image/data loading */}
        <link rel="preconnect" href="https://newwebsite-dev-back.ultrawares.com" />
        <link rel="dns-prefetch" href="https://newwebsite-dev-back.ultrawares.com" />
        {/* Preload critical custom fonts */}
        <link rel="preload" as="font" href="/fonts/Nulshock Bd.otf" type="font/otf" crossOrigin="anonymous" />
        {isArabic && (
          <>
            <link rel="preload" as="font" href="/fonts/Almarai-Bold.ttf" type="font/ttf" crossOrigin="anonymous" />
            <link rel="preload" as="font" href="/fonts/Changa-Regular.ttf" type="font/ttf" crossOrigin="anonymous" />
          </>
        )}
      </head>
      <body suppressHydrationWarning>
        <AppProviders locale={locale as AppLocale} messages={messages}>
          <Suspense fallback={null}>
            <GlobalNavigationLoader />
          </Suspense>
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
