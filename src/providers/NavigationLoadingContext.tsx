'use client'

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

type NavigationLoadingContextValue = {
  /** True while a page transition is in progress. */
  isNavigating: boolean
  /** Call when a link click initiates navigation. */
  startNavigation: () => void
  /** Call when the new page content is fully mounted and ready. */
  finishNavigation: () => void
}

const NavigationLoadingContext = createContext<NavigationLoadingContextValue | null>(null)

export function NavigationLoadingProvider({ children }: { children: React.ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false)
  // Track how many "loading" signals are active (anchor click + loading.tsx mount)
  const pendingRef = useRef(0)

  const startNavigation = useCallback(() => {
    pendingRef.current += 1
    setIsNavigating(true)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  const finishNavigation = useCallback(() => {
    pendingRef.current = Math.max(0, pendingRef.current - 1)
    if (pendingRef.current === 0) {
      setIsNavigating(false)
    }
  }, [])

  const value = useMemo(
    () => ({ isNavigating, startNavigation, finishNavigation }),
    [isNavigating, startNavigation, finishNavigation],
  )

  return (
    <NavigationLoadingContext.Provider value={value}>
      {children}
    </NavigationLoadingContext.Provider>
  )
}

export function useNavigationLoading() {
  const ctx = useContext(NavigationLoadingContext)
  if (!ctx) throw new Error('useNavigationLoading must be used within NavigationLoadingProvider')
  return ctx
}
