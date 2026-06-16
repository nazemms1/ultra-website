'use client'

import { useEffect, useState } from 'react'
import SplashScreen from './SplashScreen'
import { usePageAssetsReady } from './usePageAssetsReady'

type SplashScreenGateProps = {
  children: React.ReactNode
  minDurationMs?: number
  maxDurationMs?: number
}

/**
 * Renders page content immediately (so media loads behind the overlay),
 * then dismisses the splash once fonts, videos, and images are ready.
 */
export default function SplashScreenGate({
  children,
  minDurationMs,
  maxDurationMs,
}: SplashScreenGateProps) {
  const assetsReady = usePageAssetsReady({ minDurationMs, maxDurationMs })
  const [scrollLocked, setScrollLocked] = useState(true)

  useEffect(() => {
    if (!assetsReady) setScrollLocked(true)
  }, [assetsReady])

  useEffect(() => {
    document.body.style.overflow = scrollLocked ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [scrollLocked])

  return (
    <>
      {children}
      <SplashScreen
        isLoading={!assetsReady}
        onExitComplete={() => setScrollLocked(false)}
      />
    </>
  )
}
