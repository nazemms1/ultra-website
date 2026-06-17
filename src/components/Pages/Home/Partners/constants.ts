import type { Transition } from 'framer-motion'

export const HOVER_SCALE = 1.03

export const HOVER_TRANSITION: Transition = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1],
}

export const REVEAL_STAGGER_S = 0.1

export const REVEAL_TRANSITION = 'opacity 0.6s ease, transform 0.6s ease'
