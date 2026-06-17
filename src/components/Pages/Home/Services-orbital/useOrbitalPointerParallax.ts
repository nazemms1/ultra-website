'use client'

import { useEffect, type RefObject } from 'react'
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'

export const PARALLAX_MAX = 10
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

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const halfW = rect.width / 2
      const halfH = rect.height / 2

      if (halfW === 0 || halfH === 0) return

      normalizedX.set(clamp((event.clientX - centerX) / halfW, -1, 1))
      normalizedY.set(clamp((event.clientY - centerY) / halfH, -1, 1))
    }

    const handlePointerLeave = () => {
      normalizedX.set(0)
      normalizedY.set(0)
    }

    container.addEventListener('pointermove', handlePointerMove)
    container.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      container.removeEventListener('pointermove', handlePointerMove)
      container.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [containerRef, normalizedX, normalizedY, prefersReduced])

  return { offsetX, offsetY }
}
