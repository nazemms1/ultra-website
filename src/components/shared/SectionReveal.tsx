'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { type CSSProperties, type ReactNode } from 'react'

interface SectionRevealProps {
  children: ReactNode
  delay?: number
  yOffset?: number
  duration?: number
  once?: boolean
  className?: string
  style?: CSSProperties
}

export default function SectionReveal({
  children,
  delay = 0,
  yOffset = 50,
  duration = 0.7,
  once = true,
  className,
  style,
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.12 }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
