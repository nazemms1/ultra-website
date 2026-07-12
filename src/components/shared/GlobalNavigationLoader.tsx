'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Box from '@mui/material/Box'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '@mui/material/styles'
import { paletteAlpha } from '@/lib/theme/paletteAlpha'
import { useNavigationLoading } from '@/providers/NavigationLoadingContext'
import {
  SPLASH_SPINNER_BOTTOM_ARC_PATH,
  SPLASH_SPINNER_ROTATE_DURATION_S,
  SPLASH_SPINNER_TOP_ARC_PATH,
  SPLASH_SPINNER_VIEWBOX,
} from './SplashScreen/spinnerPaths'

const LOGO_DISPLAY_SIZE = 64

export default function GlobalNavigationLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { isNavigating, startNavigation, finishNavigation } = useNavigationLoading()
  const theme = useTheme()

  const logoHeight =
    (LOGO_DISPLAY_SIZE * SPLASH_SPINNER_VIEWBOX.height) / SPLASH_SPINNER_VIEWBOX.width

  const topArcFill = `color-mix(in srgb, ${theme.palette.primary.lighter} 14%, ${theme.palette.text.primary})`
  const bottomArcFill = theme.palette.primary.darker

  // When the route settles, release the anchor-click pending slot
  useEffect(() => {
    if (isNavigating) {
      finishNavigation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams])

  // Intercept internal anchor clicks
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a')
      if (!anchor) return
      if (anchor.getAttribute('target') === '_blank' || anchor.hasAttribute('download')) return

      try {
        const targetUrl = new URL(anchor.href)
        const currentUrl = new URL(window.location.href)
        if (
          targetUrl.origin === currentUrl.origin &&
          (targetUrl.pathname !== currentUrl.pathname ||
            targetUrl.search !== currentUrl.search)
        ) {
          startNavigation()
        }
      } catch {
        // ignore malformed URLs
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [startNavigation])

  return (
    <AnimatePresence>
      {isNavigating && (
        <Box
          component={motion.div}
          key="nav-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            pointerEvents: 'none',
            backdropFilter: 'blur(24px) saturate(1.08) brightness(0.82)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.08) brightness(0.82)',
            bgcolor: paletteAlpha(theme.vars!.palette.background.default, 0.55),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component={motion.div}
            role="status"
            aria-label="Loading"
            animate={{ rotate: 360 }}
            transition={{
              duration: SPLASH_SPINNER_ROTATE_DURATION_S,
              repeat: Infinity,
              ease: 'linear',
            }}
            sx={{
              width: LOGO_DISPLAY_SIZE,
              height: logoHeight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              willChange: 'transform',
              filter: `drop-shadow(0 0 14px ${paletteAlpha(theme.palette.primary.main, 0.6)})`,
            }}
          >
            <Box
              component="svg"
              viewBox={`0 0 ${SPLASH_SPINNER_VIEWBOX.width} ${SPLASH_SPINNER_VIEWBOX.height}`}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
              sx={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
            >
              <path d={SPLASH_SPINNER_TOP_ARC_PATH} fill={topArcFill} />
              <path d={SPLASH_SPINNER_BOTTOM_ARC_PATH} fill={bottomArcFill} />
            </Box>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  )
}
