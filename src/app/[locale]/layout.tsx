import type { Metadata } from 'next'
import { Rajdhani } from 'next/font/google'
import { hasLocale } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { InitColorSchemeScript } from '@mui/material'
import AppShell from '@/components/Layout/AppShell'
import AppProviders from '@/providers/AppProviders'
import { routing, type AppLocale } from '@/i18n/routing'
import { host, siteConfig } from '@/config'

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

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={rajdhani.className}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <InitColorSchemeScript attribute="class" defaultMode="dark" />
        <AppProviders locale={locale as AppLocale} messages={messages}>
          <AppShell navLabels={navLabels}>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  )
}
