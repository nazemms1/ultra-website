/** Base height profile (% of viewport) — left to right, cols 1–20. Matches Loading.png / Figma. */
export const COLUMN_HEIGHT_PROFILE = [
  45, 65, 60, 20, 25, 30, 25, 50, 60, 60, 50, 40, 50, 50, 45, 40, 35, 65, 70, 60,
] as const

export const COLUMN_COUNT = COLUMN_HEIGHT_PROFILE.length

/** Primary wave traveling across columns (rad/s). */
export const WAVE_SPEED_PRIMARY = 0.72

/** Secondary ripple — faster, opposite drift for organic liquid feel. */
export const WAVE_SPEED_SECONDARY = 1.24

/** Slow global swell beneath the surface. */
export const WAVE_SPEED_SWELL = 0.38

/** Phase offset between adjacent columns (radians). Controls wave wavelength. */
export const WAVE_COLUMN_PHASE = 0.52

/** Peak scale deviation from base height (0.14 ≈ ±14% liquid rise/fall). */
export const WAVE_AMPLITUDE = 0.14

/** Vertical crest shimmer range in px. */
export const WAVE_CREST_SHIFT_PX = 6

export const SPLASH_Z_INDEX = 9999

export const DOOR_EXIT_EASE = [0.76, 0, 0.24, 1] as const

export const DOOR_EXIT_TRANSITION = {
  duration: 0.95,
  ease: DOOR_EXIT_EASE,
} as const

export const SPINNER_EXIT_TRANSITION = {
  duration: 0.28,
  ease: 'easeOut',
} as const

export const AMBIENT_PULSE_TRANSITION = {
  duration: 5.6,
  repeat: Infinity,
  ease: 'easeInOut',
} as const
