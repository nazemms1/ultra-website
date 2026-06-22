'use client'

import { useEffect, useState } from 'react'
import { MIN_SPLASH_DISPLAY_MS, SPLASH_POST_READY_HOLD_MS } from './constants'
import { usePageAssetsReady } from './usePageAssetsReady'

type UseSplashDismissTimingOptions = {
  minDurationMs?: number
  maxDurationMs?: number
  minDisplayMs?: number
  postReadyHoldMs?: number
}

/**
 * Keeps the splash visible until media is ready AND minimum display/hold timers
 * elapse, so the accordion exit always plays even when assets load instantly.
 */
export function useSplashDismissTiming(options: UseSplashDismissTimingOptions = {}) {
  const {
    minDurationMs,
    maxDurationMs,
    minDisplayMs = MIN_SPLASH_DISPLAY_MS,
    postReadyHoldMs = SPLASH_POST_READY_HOLD_MS,
  } = options

  const assetsReady = usePageAssetsReady({ minDurationMs, maxDurationMs })
  const [minDisplayComplete, setMinDisplayComplete] = useState(false)
  const [postReadyHoldComplete, setPostReadyHoldComplete] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setMinDisplayComplete(true), minDisplayMs)
    return () => window.clearTimeout(timer)
  }, [minDisplayMs])

  useEffect(() => {
    if (!assetsReady) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPostReadyHoldComplete(false)
      return
    }

    const timer = window.setTimeout(() => setPostReadyHoldComplete(true), postReadyHoldMs)
    return () => window.clearTimeout(timer)
  }, [assetsReady, postReadyHoldMs])

  const isSplashVisible = !minDisplayComplete || !assetsReady || !postReadyHoldComplete

  return { isSplashVisible }
}
