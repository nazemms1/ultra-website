'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

type SplashContextValue = {
  isSplashComplete: boolean
  markSplashComplete: () => void
}

const SplashContext = createContext<SplashContextValue | null>(null)

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [isSplashComplete, setIsSplashComplete] = useState(false)
  const markSplashComplete = useCallback(() => setIsSplashComplete(true), [])

  const value = useMemo(
    () => ({ isSplashComplete, markSplashComplete }),
    [isSplashComplete, markSplashComplete],
  )

  return <SplashContext.Provider value={value}>{children}</SplashContext.Provider>
}

/** True once the splash exit animation has finished. Defaults to true outside SplashProvider. */
export function useSplashComplete() {
  const context = useContext(SplashContext)
  return context?.isSplashComplete ?? true
}

export function useMarkSplashComplete() {
  const context = useContext(SplashContext)
  if (!context) {
    throw new Error('useMarkSplashComplete must be used within SplashProvider')
  }
  return context.markSplashComplete
}
