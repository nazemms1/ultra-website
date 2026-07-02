'use client'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { motion, useReducedMotion } from 'framer-motion'
import type { ProjectDetail, ProjectDetailLogo } from '../types'
import { logoCardSx, logoGlowSx } from './constants'

type ProjectLogoCardProps = {
  logo: ProjectDetailLogo
  cover?: ProjectDetail['cover']
  logoImage?: ProjectDetail['logoImage']
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

export default function ProjectLogoCard({ logo, cover, logoImage }: ProjectLogoCardProps) {
  const theme = useTheme()
  const prefersReducedMotion = useReducedMotion()

  const displayLogoSrc = logoImage || logo.src

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

      {/* Flip card container */}
      <Box
        component={motion.div}
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, -6, 0] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }
        sx={{
          zIndex: 1,
          perspective: '1000px',
          width: { xs: '100%', sm: 286 },
          maxWidth: 286,
          minHeight: { xs: 140, sm: 170 },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            minHeight: { xs: 140, sm: 170 },
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'rotateY(180deg)',
            },
          }}
        >
          {/* Front face — logo */}
          <Box
            sx={{
              ...logoCardSx(theme),
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '40px',
              width: '100%',
              minHeight: { xs: 140, sm: 170 },
            }}
          >
            <Box
              component="img"
              src={displayLogoSrc}
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

          {/* Back face — same logo, flipped */}
          <Box
            sx={{
              ...logoCardSx(theme),
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '40px',
              width: '100%',
              minHeight: { xs: 140, sm: 170 },
            }}
          >
            <Box
              component="img"
              src={displayLogoSrc}
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
      </Box>
    </Box>
  )
}

