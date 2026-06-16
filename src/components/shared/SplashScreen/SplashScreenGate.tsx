'use client'

import { useEffect, useState } from 'react'
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
export default function SplashScreenGate({
  children,
  minDurationMs,
  maxDurationMs,
  minDisplayMs,
  postReadyHoldMs,
}: SplashScreenGateProps) {
  const { isSplashVisible } = useSplashDismissTiming({
    minDurationMs,
    maxDurationMs,
    minDisplayMs,
    postReadyHoldMs,
  })
  const [scrollLocked, setScrollLocked] = useState(true)

  useEffect(() => {
    if (isSplashVisible) setScrollLocked(true)
  }, [isSplashVisible])

  useEffect(() => {
    document.body.style.overflow = scrollLocked ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [scrollLocked])

  return (
    <>
      {children}
      <SplashScreen isLoading={isSplashVisible} onExitComplete={() => setScrollLocked(false)} />
    </>
  )
}
