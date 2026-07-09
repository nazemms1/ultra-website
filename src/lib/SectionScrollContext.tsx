'use client'

import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import { usePathname } from '@/i18n/routing'

interface SectionScrollContextValue {
  scrollToSection: (sectionId: string) => void
  requestScrollAfterNav: (sectionId: string) => void
}

const SectionScrollContext = createContext<SectionScrollContextValue>({
  scrollToSection: () => {},
  requestScrollAfterNav: () => {},
})

export function useSectionScroll() {
  return useContext(SectionScrollContext)
}

export function SectionScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const pendingRef = useRef<string | null>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopPoll = useCallback(() => {
    if (pollRef.current !== null) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
  }, [])

  const startPoll = useCallback(
    (sectionId: string) => {
      stopPoll()
      let tries = 0
      pollRef.current = setInterval(() => {
        const el = document.getElementById(sectionId)
        if (el) {
          stopPoll()
          pendingRef.current = null
          el.scrollIntoView({ behavior: 'smooth' })
        } else if (++tries >= 100) {
          // 100 × 50ms = 5s timeout
          stopPoll()
          pendingRef.current = null
        }
      }, 50)
    },
    [stopPoll],
  )

  // Every time pathname changes, check if there's a pending scroll
  useEffect(() => {
    const sectionId = pendingRef.current
    if (!sectionId) return
    startPoll(sectionId)
    return stopPoll
  }, [pathname, startPoll, stopPoll])

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const el = document.getElementById(sectionId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else {
        // Not on page yet — will be picked up by the pathname useEffect
        pendingRef.current = sectionId
        startPoll(sectionId)
      }
    },
    [startPoll],
  )

  const requestScrollAfterNav = useCallback((sectionId: string) => {
    pendingRef.current = sectionId
  }, [])

  return (
    <SectionScrollContext.Provider value={{ scrollToSection, requestScrollAfterNav }}>
      {children}
    </SectionScrollContext.Provider>
  )
}
