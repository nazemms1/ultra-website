'use client'

import { useEffect, type RefObject } from 'react'
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'

export const PARALLAX_MAX = 6
export const PARALLAX_SPRING = { stiffness: 120, damping: 20, mass: 0.6 } as const

export interface OrbitalPointerParallax {
  offsetX: MotionValue<number>
  offsetY: MotionValue<number>
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function useOrbitalPointerParallax(
  containerRef: RefObject<HTMLElement | null>,
): OrbitalPointerParallax {
  const prefersReduced = useReducedMotion()
  const normalizedX = useMotionValue(0)
  const normalizedY = useMotionValue(0)

  const springX = useSpring(normalizedX, PARALLAX_SPRING)
  const springY = useSpring(normalizedY, PARALLAX_SPRING)

  const offsetX = useTransform(springX, [-1, 1], [-PARALLAX_MAX, PARALLAX_MAX])
  const offsetY = useTransform(springY, [-1, 1], [-PARALLAX_MAX, PARALLAX_MAX])

  useEffect(() => {
    const container = containerRef.current
    if (!container || prefersReduced) return

    let rafId: number | null = null
    let pendingX = 0
    let pendingY = 0

    const flush = () => {
      rafId = null
      const rect = container.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const halfW = rect.width / 2
      const halfH = rect.height / 2

      normalizedX.set(clamp((pendingX - centerX) / halfW, -1, 1))
      normalizedY.set(clamp((pendingY - centerY) / halfH, -1, 1))
    }

    const handlePointerMove = (event: PointerEvent) => {
      pendingX = event.clientX
      pendingY = event.clientY
      if (rafId === null) rafId = requestAnimationFrame(flush)
    }

    const handlePointerLeave = () => {
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null }
      normalizedX.set(0)
      normalizedY.set(0)
    }

    container.addEventListener('pointermove', handlePointerMove, { passive: true })
    container.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      container.removeEventListener('pointermove', handlePointerMove)
      container.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [containerRef, normalizedX, normalizedY, prefersReduced])

  return { offsetX, offsetY }
}
