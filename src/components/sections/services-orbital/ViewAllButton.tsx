'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { motion } from 'framer-motion'

interface ViewAllButtonProps {
  label?: string
  href?: string
  sx?: object
}

const EASE = [0.22, 1, 0.36, 1] as const

export default function ViewAllButton({
  label = 'View all services',
  href = '#services',
  sx,
}: ViewAllButtonProps) {
  return (
    <Box
      component={motion.a}
      href={href}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      sx={theme => ({
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: '9999px',
        border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
        bgcolor: 'transparent',
        px: 4,
        py: '15px',
        backdropFilter: 'blur(4px)',
        textDecoration: 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        '&:hover': {
          borderColor: alpha(theme.palette.common.white, 0.35),
          boxShadow: `0 0 28px ${alpha(theme.palette.primary.main, 0.18)}`,
        },
        ...sx,
      })}
    >
      <Box
        component={motion.span}
        aria-hidden
        initial="rest"
        variants={{
          rest: { width: '0%', opacity: 0 },
          hover: { width: '80%', opacity: 1 },
        }}
        transition={{ duration: 0.5, ease: EASE }}
        sx={theme => ({
          pointerEvents: 'none',
          position: 'absolute',
          inset: '0 auto 0 0',
          zIndex: 0,
          borderRadius: '9999px',
          background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.3)} 0%, ${alpha(theme.palette.primary.main, 0.12)} 65%, ${alpha(theme.palette.primary.main, 0)} 100%)`,
        })}
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
