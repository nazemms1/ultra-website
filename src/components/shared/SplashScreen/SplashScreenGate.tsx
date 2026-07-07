'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { SplashProvider, useMarkSplashComplete } from './SplashContext'
import SplashScreen from './SplashScreen'
import { useSplashDismissTiming } from './useSplashDismissTiming'

type SplashScreenGateProps = {
  children: React.ReactNode
  minDurationMs?: number
  maxDurationMs?: number
  /** Minimum splash idle time before exit (default 1600ms). */
  minDisplayMs?: number
  /** Pause after media ready before doors open (default 500ms). */
  postReadyHoldMs?: number
}

/**
 * Renders page content immediately (so media loads behind the overlay),
 * then dismisses the splash once fonts, videos, and images are ready.
 *
 * Rendering states:
 *   - Pre-hydration (SSR / before useEffect): cover div shown, SplashScreen not mounted
 *   - First visit, post-hydration: SplashScreen portal takes over from cover div atomically
 *   - Returning visit (splash_shown in sessionStorage): neither cover nor SplashScreen shown
 */
function SplashScreenGateInner({
  children,
  minDurationMs,
  maxDurationMs,
  minDisplayMs,
  postReadyHoldMs,
}: SplashScreenGateProps) {
  const markSplashComplete = useMarkSplashComplete()
  const { isSplashVisible } = useSplashDismissTiming({
    minDurationMs,
    maxDurationMs,
    minDisplayMs,
    postReadyHoldMs,
  })

  // 'pending'  – pre-hydration, show opaque cover div
  // 'showing'  – hydrated, first visit, SplashScreen portal active
  // 'done'     – splash already shown this session, skip everything
  type SplashState = 'pending' | 'showing' | 'done'
  const [splashState, setSplashState] = useState<SplashState>('pending')
  const [scrollLocked, setScrollLocked] = useState(true)
  // Prevent StrictMode double-effect from calling markSplashComplete twice
  const completedRef = useRef(false)

  useEffect(() => {
    if (sessionStorage.getItem('splash_shown') === 'true') {
      // Returning visitor — skip splash entirely
      setSplashState('done')
      setScrollLocked(false)
      if (!completedRef.current) {
        completedRef.current = true
        markSplashComplete()
      }
    } else {
      // First visit — transition from cover div to real SplashScreen atomically
      setSplashState('showing')
    }
  }, [markSplashComplete])

  const handleSplashExitComplete = useCallback(() => {
    sessionStorage.setItem('splash_shown', 'true')
    setSplashState('done')
    setScrollLocked(false)
    if (!completedRef.current) {
      completedRef.current = true
      markSplashComplete()
    }
  }, [markSplashComplete])

  useEffect(() => {
    if (scrollLocked && splashState !== 'done') {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [scrollLocked, splashState])

  return (
    <>
      {children}
      {splashState === 'pending' && (
        // Opaque cover rendered before portal is available — prevents blank hero flash.
        // Replaced atomically by SplashScreen once hydration confirms first visit.
        <div
          aria-hidden
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#121212',
            zIndex: 9999,
          }}
        />
      )}
      {splashState === 'showing' && (
        <SplashScreen isLoading={isSplashVisible} onExitComplete={handleSplashExitComplete} />
      )}
    </>
  )
}

export default function SplashScreenGate(props: SplashScreenGateProps) {
  return (
    <SplashProvider>
      <SplashScreenGateInner {...props} />
    </SplashProvider>
  )
}
