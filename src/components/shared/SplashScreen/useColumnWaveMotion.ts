'use client'

import { useAnimationFrame, useMotionValue, useReducedMotion } from 'framer-motion'
import { COLUMN_WAVE_AT_REST, sampleColumnWave } from './waveMotion'

export function useColumnWaveMotion(columnIndex: number) {
  const reducedMotion = useReducedMotion()
  const scaleY = useMotionValue(COLUMN_WAVE_AT_REST.scaleY)
  const crestY = useMotionValue(COLUMN_WAVE_AT_REST.crestY)
  const glowOpacity = useMotionValue(COLUMN_WAVE_AT_REST.glowOpacity)

  useAnimationFrame(timeMs => {
    if (reducedMotion) return

    const sample = sampleColumnWave(timeMs / 1000, columnIndex)
    scaleY.set(sample.scaleY)
    crestY.set(sample.crestY)
    glowOpacity.set(sample.glowOpacity)
  })

  return { scaleY, crestY, glowOpacity, reducedMotion }
}
