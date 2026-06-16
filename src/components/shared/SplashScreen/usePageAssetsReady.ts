'use client'

import { useEffect, useState } from 'react'
import { waitForPageMedia } from './waitForPageMedia'

type UsePageAssetsReadyOptions = {
  minDurationMs?: number
  maxDurationMs?: number
}

/** Returns `true` once fonts, critical assets, and in-DOM media have settled (or timed out). */
export function usePageAssetsReady(options: UsePageAssetsReadyOptions = {}): boolean {
  const { minDurationMs, maxDurationMs } = options
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    void waitForPageMedia({ minDurationMs, maxDurationMs }).finally(() => {
      if (!cancelled) setIsReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [maxDurationMs, minDurationMs])

  return isReady
}
