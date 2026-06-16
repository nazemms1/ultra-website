'use client'

import { useEffect } from 'react'
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
  const isLoading = usePageAssetsReady({ minDurationMs, maxDurationMs })

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  return (
    <>
      {children}
      <SplashScreen isLoading={isLoading} />
    </>
  )
}
