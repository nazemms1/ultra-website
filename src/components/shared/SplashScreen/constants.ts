import type { Transition } from 'framer-motion'

/** Wave height profile (% of viewport) — left to right, cols 1–20. Matches Loading.png. */
export const COLUMN_HEIGHT_PROFILE = [
  45, 65, 60, 20, 25, 30, 25, 50, 60, 60, 50, 40, 50, 50, 45, 40, 35, 65, 70, 60,
] as const

export const SPLASH_Z_INDEX = 9999

export const DOOR_EXIT_EASE: Transition['ease'] = [0.76, 0, 0.24, 1]

export const DOOR_EXIT_TRANSITION: Transition = {
  duration: 0.95,
  ease: DOOR_EXIT_EASE,
}

export const SPINNER_EXIT_TRANSITION: Transition = {
  duration: 0.28,
  ease: 'easeOut',
}

export const COLUMN_BREATHE_TRANSITION: Transition = {
  duration: 4.8,
  repeat: Infinity,
  ease: 'easeInOut',
}
