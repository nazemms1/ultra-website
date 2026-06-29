'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { motion, type Transition } from 'framer-motion'
import { useState } from 'react'

interface ViewAllButtonProps {
  label?: string
  href?: string
  sx?: object
}

const SWEEP_EASE = [0.22, 1, 0.36, 1] as const
const SWEEP_DURATION = 0.55

const hoverTransition: Transition = {
  duration: SWEEP_DURATION,
  ease: SWEEP_EASE,
}

const backgroundVariants = {
  rest: { width: '0%' },
  hover: { width: '100%' },
}

export default function ViewAllButton({
  label = 'View all services',
  href = '/services',
  sx,
}: ViewAllButtonProps) {
  const theme = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const secondaryFill = alpha(theme.palette.common.white, 0.18)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Box
      component="a"
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={theme => ({
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: '9999px',
        border: `1px solid ${alpha(theme.palette.common.white, 0.35)}`,
        bgcolor: 'transparent',
        px: 4,
        py: '15px',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        textDecoration: 'none',
        transition: 'border-color 0.3s ease, transform 0.2s ease',
        '&:hover': {
          bgcolor: 'transparent',
          borderColor: alpha(theme.palette.common.white, 0.45),
        },
        '&:active': {
          transform: 'scale(0.98)',
        },
        ...sx,
      })}
    >
      <motion.span
        aria-hidden
        initial="rest"
        animate={isHovered ? 'hover' : 'rest'}
        variants={backgroundVariants}
        transition={hoverTransition}
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 0,
          display: 'block',
          borderRadius: 9999,
          backgroundColor: secondaryFill,
        }}
      />

      <Typography
        component="span"
        sx={{
          position: 'relative',
          zIndex: 1,
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '15px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: 'text.primary',
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}
