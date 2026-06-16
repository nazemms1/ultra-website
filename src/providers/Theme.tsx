'use client'

import * as React from 'react'
import { CssBaseline, GlobalStyles } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import type { Locale } from 'next-intl'
import globalStyles from '@/theme/global'
import { createAppTheme } from '@/theme'
import { getEmotionCacheOptions } from '@/theme/createEmotionCache'

function MuiThemeShell({ locale, children }: { locale: Locale } & React.PropsWithChildren) {
  const direction = locale === 'ar' ? 'rtl' : 'ltr'
  const theme = React.useMemo(() => createAppTheme(direction), [direction])

  return (
    <MuiThemeProvider theme={theme} defaultMode="dark" disableTransitionOnChange>
      <CssBaseline enableColorScheme />
      <GlobalStyles styles={globalStyles()} />
      {children}
    </MuiThemeProvider>
  )
}

export default function ThemeProvider({
  locale,
  children,
}: { locale: Locale } & React.PropsWithChildren) {
  const direction = locale === 'ar' ? 'rtl' : 'ltr'
  const cacheOptions = React.useMemo(() => getEmotionCacheOptions(direction), [direction])

  return (
    <AppRouterCacheProvider options={cacheOptions}>
      <MuiThemeShell locale={locale}>{children}</MuiThemeShell>
    </AppRouterCacheProvider>
  )
}
