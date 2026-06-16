import {
  WAVE_AMPLITUDE,
  WAVE_COLUMN_PHASE,
  WAVE_CREST_SHIFT_PX,
  WAVE_SPEED_PRIMARY,
  WAVE_SPEED_SECONDARY,
  WAVE_SPEED_SWELL,
} from './constants'

export type ColumnWaveSample = {
  scaleY: number
  crestY: number
  glowOpacity: number
}

/**
 * Multi-layer sine composition — each column gets a phase offset so the
 * wave visibly travels across the 20-column grid like liquid slosh.
 */
export function sampleColumnWave(timeSeconds: number, columnIndex: number): ColumnWaveSample {
  const phase = columnIndex * WAVE_COLUMN_PHASE

  const primary = Math.sin(timeSeconds * WAVE_SPEED_PRIMARY + phase)
  const secondary = Math.sin(timeSeconds * WAVE_SPEED_SECONDARY - phase * 0.72) * 0.58
  const swell = Math.cos(timeSeconds * WAVE_SPEED_SWELL + phase * 0.41) * 0.42

  const composite = primary * 0.62 + secondary + swell
  const normalized = composite / 1.62

  return {
    scaleY: 1 + normalized * WAVE_AMPLITUDE,
    crestY: normalized * WAVE_CREST_SHIFT_PX,
    glowOpacity: 0.16 + (normalized + 1) * 0.07,
  }
}

export const COLUMN_WAVE_AT_REST: ColumnWaveSample = {
  scaleY: 1,
  crestY: 0,
  glowOpacity: 0.22,
}
