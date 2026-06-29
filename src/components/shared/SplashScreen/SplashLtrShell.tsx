'use client'

import * as React from 'react'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { createAppTheme } from '@/theme'
import { getEmotionCacheOptions } from '@/theme/createEmotionCache'

let splashLtrCache: ReturnType<typeof createCache> | null = null

function getSplashLtrCache() {
  if (!splashLtrCache) {
    splashLtrCache = createCache({
      ...getEmotionCacheOptions('ltr'),
      key: 'mui-splash-ltr',
    })
  }
  return splashLtrCache
}

const splashLtrTheme = createAppTheme('ltr')

/** Isolates splash styles from the page RTL Emotion cache and MUI theme direction. */
export default function SplashLtrShell({ children }: React.PropsWithChildren) {
  const cache = React.useMemo(() => getSplashLtrCache(), [])

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={splashLtrTheme} defaultMode="dark" disableTransitionOnChange>
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  )
}
