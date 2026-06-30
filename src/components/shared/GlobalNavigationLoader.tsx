'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Box from '@mui/material/Box'
import { AnimatePresence, motion } from 'framer-motion'

export default function GlobalNavigationLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)
  const [progress, setProgress] = useState(0)

  // Reset progress and hide loader on page load completion
  useEffect(() => {
    if (isNavigating) {
      setProgress(100)
      const timer = setTimeout(() => {
        setIsNavigating(false)
        setProgress(0)
      }, 400) // allow transition to finish
      return () => clearTimeout(timer)
    }
  }, [pathname, searchParams])

  // Trickle progress while navigating
  useEffect(() => {
    if (isNavigating && progress < 90) {
      const timer = setTimeout(() => {
        setProgress(prev => {
          const diff = Math.random() * 8 + 2
          return Math.min(prev + diff, 90)
        })
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [isNavigating, progress])

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a')

      if (!anchor) return

      const target = anchor.getAttribute('target')
      if (target === '_blank' || anchor.hasAttribute('download')) {
        return
      }

      const targetHref = anchor.href
      const currentHref = window.location.href

      try {
        const targetUrl = new URL(targetHref)
        const currentUrl = new URL(currentHref)

        // Only intercept internal links with same origin
        if (targetUrl.origin === currentUrl.origin) {
          // If the pathname or search parameters are different (ignoring hash shifts)
          if (
            targetUrl.pathname !== currentUrl.pathname ||
            targetUrl.search !== currentUrl.search
          ) {
            setIsNavigating(true)
            setProgress(15) // start at 15%
          }
        }
      } catch (e) {
        // Fallback
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => {
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return (
    <AnimatePresence>
      {isNavigating && (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '3px',
            zIndex: 99999,
            pointerEvents: 'none',
          }}
        >
          <Box
            component={motion.div}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 70, damping: 20 }}
            sx={{
              height: '100%',
              bgcolor: '#0DF1D9',
              boxShadow: '0 0 8px #0DF1D9, 0 0 15px rgba(13, 241, 217, 0.6)',
            }}
          />
        </Box>
      )}
    </AnimatePresence>
  )
}
