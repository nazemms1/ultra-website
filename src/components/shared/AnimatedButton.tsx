'use client'

import Button, { type ButtonProps } from '@mui/material/Button'
import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import { motion, type Transition } from 'framer-motion'
import { forwardRef, useMemo, useState, type MouseEvent } from 'react'

const SWEEP_EASE = [0.22, 1, 0.36, 1] as const
const SWEEP_DURATION = 0.55

const hoverTransition: Transition = {
  duration: SWEEP_DURATION,
  ease: SWEEP_EASE,
}

export type AnimatedButtonVariant = 'primary' | 'secondary'

export type AnimatedButtonProps = Omit<ButtonProps, 'variant'> & {
  /** Visual style — primary solid sweep or secondary glass outline. */
  variant?: AnimatedButtonVariant
  /** Hover sweep fill for the primary variant. Defaults to theme white. */
  sweepColor?: string
  /** Base background for the primary variant. Defaults to theme primary.main. */
  baseColor?: string
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(function AnimatedButton(
  {
    variant = 'primary',
    sweepColor,
    baseColor,
    children,
    sx,
    disabled,
    onMouseEnter,
    onMouseLeave,
    ...buttonProps
  },
  ref,
) {
  const theme = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  const resolvedBaseColor = baseColor ?? theme.palette.primary.main
  const resolvedSweepColor = sweepColor ?? theme.palette.common.white
  const secondaryFill = alpha(theme.palette.common.white, 0.18)

  const backgroundVariants = useMemo(
    () => ({
      rest: { width: '0%' },
      hover: { width: '100%' },
    }),
    [],
  )

  const sweepBackgroundColor = variant === 'primary' ? resolvedSweepColor : secondaryFill

  const variantSx = useMemo(
    () =>
      variant === 'primary'
        ? {
            bgcolor: resolvedBaseColor,
            color: theme.palette.primary.contrastText,
            boxShadow: `0 0 23px ${alpha(theme.palette.primary.darker, 0.5)}`,
            '&:hover': {
              bgcolor: resolvedBaseColor,
              boxShadow: `0 0 36px ${alpha(theme.palette.primary.darker, 0.8)}`,
            },
          }
        : {
            bgcolor: 'transparent',
            color: 'text.primary',
            border: `1px solid ${alpha(theme.palette.common.white, 0.35)}`,
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            '&:hover': {
              bgcolor: 'transparent',
              borderColor: alpha(theme.palette.common.white, 0.45),
            },
          },
    [resolvedBaseColor, theme, variant],
  )

  const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      setIsHovered(true)
    }
    onMouseEnter?.(event)
  }

  const handleMouseLeave = (event: MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false)
    onMouseLeave?.(event)
  }

  return (
    <Button
      ref={ref}
      disabled={disabled}
      disableElevation
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...buttonProps}
      sx={[
        {
          position: 'relative',
          overflow: 'hidden',
          borderRadius: theme.shape.borderRadiusPill,
          textTransform: 'uppercase',
          fontWeight: 600,
          letterSpacing: '0.7px',
          minHeight: 42,
          fontSize: 18,
          p: theme => theme.spacing(1, 2.5),
          transition: 'transform 0.2s ease, box-shadow 0.3s ease',
          '&:active:not(:disabled)': {
            transform: 'scale(0.98)',
          },
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            position: 'relative',
            zIndex: 1,
          },
        },
        variantSx,
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <motion.span
        data-animated-bg
        aria-hidden
        initial="rest"
        animate={isHovered && !disabled ? 'hover' : 'rest'}
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
          borderRadius: theme.shape.borderRadiusPill,
          backgroundColor: sweepBackgroundColor,
        }}
      />

      <Box
        component="span"
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </Button>
  )
})

export default AnimatedButton
