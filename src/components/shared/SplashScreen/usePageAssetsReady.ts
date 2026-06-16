'use client'

import { useEffect, useState } from 'react'
import { waitForPageMedia } from './waitForPageMedia'

type UsePageAssetsReadyOptions = {
  minDurationMs?: number
  maxDurationMs?: number
}

export function usePageAssetsReady(options: UsePageAssetsReadyOptions = {}): boolean {
  const { minDurationMs, maxDurationMs } = options
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    void waitForPageMedia({ minDurationMs, maxDurationMs }).finally(() => {
      if (!cancelled) setIsLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [maxDurationMs, minDurationMs])

  return isLoading
}
