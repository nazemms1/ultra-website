'use client'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { motion, useReducedMotion } from 'framer-motion'
import type { ProjectDetailLogo } from '../types'
import { logoCardSx, logoGlowSx } from './constants'

type ProjectLogoCardProps = {
  logo: ProjectDetailLogo
}

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 60, damping: 14, delay: 0.2 },
  },
}

export default function ProjectLogoCard({ logo }: ProjectLogoCardProps) {
  const theme = useTheme()
  const prefersReducedMotion = useReducedMotion()

  return (
    <Box
      component={motion.div}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        width: { xs: '100%', md: 'auto' },
      }}
    >
      <Box sx={logoGlowSx(theme)} aria-hidden />

      <Box
        component={motion.div}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -6, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        sx={{
          zIndex: 1,
          ...logoCardSx(theme),
        }}
      >
        <Box
          component="img"
          src={logo.src}
          alt={logo.alt}
          sx={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: 80,
            objectFit: 'contain',
          }}
        />
      </Box>
    </Box>
  )
}
