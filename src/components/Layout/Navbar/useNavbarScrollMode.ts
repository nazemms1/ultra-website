/* eslint-disable react-hooks/refs */
'use client'

import { useEffect, useRef, useState } from 'react'

export type NavbarScrollMode = 'top' | 'scroll-down' | 'scroll-up'

export type NavbarScrollState = {
  mode: NavbarScrollMode
  /** 1 = unified pill (top), 0 = three split pills */
  mergeProgress: number
  /** 0 = grouped & centered, 1 = spread to edges — animated smoothly */
  spreadProgress: number
}

const TOP_THRESHOLD = 1
const DIRECTION_DELTA = 4
/** Distance from top while scrolling — unified crossfades in/out */
const MERGE_ZONE = 120
const SPREAD_LERP = 0.11

function resolveMode(scrollY: number, delta: number, prevMode: NavbarScrollMode): NavbarScrollMode {
  if (scrollY <= TOP_THRESHOLD) return 'top'
  if (Math.abs(delta) < DIRECTION_DELTA) return prevMode
  return delta > 0 ? 'scroll-down' : 'scroll-up'
}

function resolveMergeProgress(scrollY: number): number {
  if (scrollY <= TOP_THRESHOLD) return 1
  return Math.max(0, Math.min(1, 1 - scrollY / MERGE_ZONE))
}

function resolveSpreadTarget(mode: NavbarScrollMode, mergeProgress: number): number {
  if (mode === 'scroll-down' || (mode === 'top' && mergeProgress < 0.99)) return 1
  return 0
}

function getInitialState(): NavbarScrollState {
  if (typeof window === 'undefined') {
    return { mode: 'top', mergeProgress: 1, spreadProgress: 0 }
  }

  const scrollY = window.scrollY
  const mode = scrollY > TOP_THRESHOLD ? 'scroll-down' : 'top'
  const mergeProgress = resolveMergeProgress(scrollY)
  const spreadProgress = resolveSpreadTarget(mode, mergeProgress)

  return { mode, mergeProgress, spreadProgress }
}

export function useNavbarScrollMode(): NavbarScrollState {
  const [state, setState] = useState<NavbarScrollState>(getInitialState)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const spreadRef = useRef(getInitialState().spreadProgress)
  const spreadTargetRef = useRef(spreadRef.current)
  const spreadRaf = useRef<number | null>(null)

  useEffect(() => {
    const target = resolveSpreadTarget(state.mode, state.mergeProgress)
    spreadTargetRef.current = target

    if (Math.abs(target - spreadRef.current) < 0.002) return

    const step = () => {
      const goal = spreadTargetRef.current
      const current = spreadRef.current
      const diff = goal - current

      if (Math.abs(diff) < 0.002) {
        spreadRef.current = goal
        setState(prev => (prev.spreadProgress === goal ? prev : { ...prev, spreadProgress: goal }))
        spreadRaf.current = null
        return
      }

      const next = current + diff * SPREAD_LERP
      spreadRef.current = next
      setState(prev => ({ ...prev, spreadProgress: next }))
      spreadRaf.current = requestAnimationFrame(step)
    }

    if (spreadRaf.current !== null) cancelAnimationFrame(spreadRaf.current)
    spreadRaf.current = requestAnimationFrame(step)

    return () => {
      if (spreadRaf.current !== null) cancelAnimationFrame(spreadRaf.current)
    }
  }, [state.mode, state.mergeProgress])

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const updateState = () => {
      const scrollY = window.scrollY
      const delta = scrollY - lastScrollY.current

      setState(prev => {
        const mode = resolveMode(scrollY, delta, prev.mode)
        const mergeProgress = resolveMergeProgress(scrollY)
        if (prev.mode === mode && prev.mergeProgress === mergeProgress) return prev
        return { ...prev, mode, mergeProgress }
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
