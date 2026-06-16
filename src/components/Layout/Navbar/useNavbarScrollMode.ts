'use client'

import { useEffect, useRef, useState } from 'react'

export type NavbarScrollMode = 'top' | 'scroll-down' | 'scroll-up'

export type NavbarScrollState = {
  mode: NavbarScrollMode
  /** 1 = fully merged (top), 0 = fully split */
  mergeProgress: number
}

const TOP_THRESHOLD = 1
const DIRECTION_DELTA = 4
const MERGE_ZONE = 80

function resolveMode(scrollY: number, delta: number, prevMode: NavbarScrollMode): NavbarScrollMode {
  if (scrollY <= TOP_THRESHOLD) return 'top'
  if (Math.abs(delta) < DIRECTION_DELTA) return prevMode
  return delta > 0 ? 'scroll-down' : 'scroll-up'
}

function resolveMergeProgress(scrollY: number, mode: NavbarScrollMode): number {
  if (scrollY <= TOP_THRESHOLD) return 1
  if (mode === 'scroll-down') return 0
  return Math.max(0, Math.min(1, 1 - scrollY / MERGE_ZONE))
}

function getInitialState(): NavbarScrollState {
  if (typeof window === 'undefined') {
    return { mode: 'top', mergeProgress: 1 }
  }

  const scrollY = window.scrollY
  const mode = scrollY > TOP_THRESHOLD ? 'scroll-down' : 'top'

  return {
    mode,
    mergeProgress: resolveMergeProgress(scrollY, mode),
  }
}

export function useNavbarScrollMode(): NavbarScrollState {
  const [state, setState] = useState<NavbarScrollState>(getInitialState)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const updateState = () => {
      const scrollY = window.scrollY
      const delta = scrollY - lastScrollY.current

      setState(prev => {
        const mode = resolveMode(scrollY, delta, prev.mode)
        const mergeProgress = resolveMergeProgress(scrollY, mode)
        if (prev.mode === mode && prev.mergeProgress === mergeProgress) return prev
        return { mode, mergeProgress }
      })

      lastScrollY.current = scrollY
      ticking.current = false
    }

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(updateState)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return state
}
