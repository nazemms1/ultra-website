'use client'

import { useCallback, useEffect, useState } from 'react'
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
  const [scrollLocked, setScrollLocked] = useState(true)

  useEffect(() => {
    document.body.style.overflow = scrollLocked ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [scrollLocked])

  const handleSplashExitComplete = useCallback(() => {
    setScrollLocked(false)
    markSplashComplete()
  }, [markSplashComplete])

  return (
    <>
      {children}
      <SplashScreen isLoading={isSplashVisible} onExitComplete={handleSplashExitComplete} />
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
