'use client'

import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import { motion, useReducedMotion } from 'framer-motion'

export type SectionHeaderAlign = 'left' | 'center' | 'right'

export interface SectionHeaderProps {
  title: ReactNode
  subtitle?: ReactNode
  align?: SectionHeaderAlign
  sx?: SxProps<Theme>
}

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const
const VIEWPORT = { once: true, amount: 0.2 } as const

const alignSx: Record<SectionHeaderAlign, SxProps<Theme>> = {
  left: { textAlign: 'left' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
}

export default function SectionHeader({
  title,
  subtitle,
  align = 'center',
  sx,
}: SectionHeaderProps) {
  const reduceMotion = useReducedMotion()

  return (
    <Box
      component={motion.div}
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: REVEAL_EASE }}
      sx={[
        alignSx[align],
        {
          mb: { xs: 5, md: 6 },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Typography
        component="h2"
        variant="h2"
        sx={{
          color: 'text.primary',
          fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.625rem' },
          lineHeight: 1.15,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Typography>

      {subtitle ? (
        <Typography
          variant="body1"
          sx={{
            mt: { xs: 1.5, md: 2 },
            color: 'text.secondary',
            maxWidth: align === 'center' ? 640 : 'none',
            mx: align === 'center' ? 'auto' : undefined,
          }}
        >
          {subtitle}
        </Typography>
      ) : null}
    </Box>
  )
}
