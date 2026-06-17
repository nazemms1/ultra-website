'use client'

import Box from '@mui/material/Box'
import { motion } from 'framer-motion'

/**
 * MUI `Box` wrapped as a Framer Motion component so `style` accepts
 * `MotionValue`s (e.g. `x`, `y`, `opacity`, `clipPath`) while keeping the
 * `sx` prop for theme-driven layout.
 */
export const MotionBox = motion.create(Box)
