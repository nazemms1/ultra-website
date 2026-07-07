'use client'

import type { AbstractIntlMessages } from 'next-intl'
import { NextIntlClientProvider } from 'next-intl'
import type { Locale } from 'next-intl'
import { SplashScreenGate } from '@/components/shared/SplashScreen'
import ThemeProvider from './Theme'
import { SmoothScroll } from './SmoothScroll'

type AppProvidersProps = {
  locale: Locale
  messages: AbstractIntlMessages
  children: React.ReactNode
}

export default function AppProviders({ locale, messages, children }: AppProvidersProps) {
  return (
    <ThemeProvider locale={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <SplashScreenGate>
            <SmoothScroll>{children}</SmoothScroll>
          </SplashScreenGate>
      </NextIntlClientProvider>
    </ThemeProvider>
  )
}
