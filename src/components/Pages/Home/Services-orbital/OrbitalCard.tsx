'use client'

import { useId, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ElementType } from 'react'
import { motion } from 'framer-motion'

export const CARD_W = 270
export const CARD_H = 150

const UNION_W = 268.968
const UNION_H = 144.231

// Default stationary path
const CARD_PATH =
  'M225.968 0C249.716 0 268.968 19.2518 268.968 43C268.968 58.8354 260.407 72.6697 247.662 80.1315C244.099 82.2174 241.5 85.8273 241.5 89.9557V124.963C241.5 135.658 232.155 144.231 220.75 144.231H20.75C9.34549 144.231 0 135.658 0 124.963V37C0 26.305 9.34549 17.7314 20.75 17.7314H186.085C189.283 17.7314 192.234 16.1478 194.406 13.8001C202.261 5.31383 213.493 0 225.968 0Z'

// Morphed hover path where only the top-right outer circle translates smoothly by (+6, -6)
const HOVER_CARD_PATH =
  'M231.968 -6C255.716 -6 274.968 13.2518 274.968 37C274.968 52.8354 266.407 66.6697 253.662 74.1315C250.099 76.2174 243.3 84.0273 241.5 89.9557V124.963C241.5 135.658 232.155 144.231 220.75 144.231H20.75C9.34549 144.231 0 135.658 0 124.963V37C0 26.305 9.34549 17.7314 20.75 17.7314H186.085C190.483 16.5314 195.834 12.5478 200.406 7.8001C208.261 -0.68617 219.493 -6 231.968 -6Z'

const ICON_SIZE = 64
const ICON_X = 194
const ICON_Y = 12

// Uniform spring physics so elements stay completely locked together during transitions
const springTransition = {
  type: 'spring',
  stiffness: 220,
  damping: 20,
} as const

interface OrbitalCardProps {
  title: string
  description: string
  Icon: ElementType<{ size?: number; color?: string; strokeWidth?: number }> | string
  onHoverStart?: () => void
  onHoverEnd?: () => void
  onClick?: () => void
  selected?: boolean
  active?: boolean
  sx?: SxProps<Theme>
}

const MotionBox = motion.create(Box)

export default function OrbitalCard({
  title,
  description,
  Icon,
  onHoverStart,
  onHoverEnd,
  onClick,
  selected = false,
  active = false,
  sx,
}: OrbitalCardProps) {
  const theme = useTheme()
  const primary = theme.palette.primary.main
  const id = useId().replace(/:/g, '')
  const fillId = `orbital-card-fill-${id}`
  const strokeId = `orbital-card-stroke-${id}`
  const strokeHoverId = `orbital-card-stroke-hover-${id}`
  const [hovered, setHovered] = useState(false)
  const isDisplayingActive = active || hovered

  // Fully transparent fill — glass effect lives in border only
  const fillStart = 'transparent'
  const fillMid = 'transparent'
  const fillEnd = 'transparent'

  const cardVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.03 },
  }

  const iconContainerVariants = {
    rest: { x: 0, y: 0, scale: 1 },
    hover: { x: 6, y: -6, scale: 1.04 },
  }

  const handleHoverStart = () => {
    setHovered(true)
    onHoverStart?.()
  }

  const handleHoverEnd = () => {
    setHovered(false)
    onHoverEnd?.()
  }

  return (
    <MotionBox
      initial="rest"
      animate={isDisplayingActive ? 'hover' : 'rest'}
      variants={cardVariants}
      transition={springTransition}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onClick={onClick}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        width: CARD_W,
        height: CARD_H,
        transformOrigin: 'center center',
        isolation: 'isolate',
        ...sx,
      }}
    >
      {/* Morphing Background Plate */}
      <Box
        component="svg"
        width={UNION_W}
        height={UNION_H}
        viewBox={`0 0 ${UNION_W} ${UNION_H}`}
        fill="none"
        aria-hidden
        sx={{
          position: 'absolute',
          left: 0,
          top: '0.5px',
          overflow: 'visible',
          filter: `drop-shadow(0 4px 76px rgba(0,0,0,0.76))`,
        }}
      >
        <motion.path
          initial={false}
          d={CARD_PATH}
          animate={{ d: isDisplayingActive ? HOVER_CARD_PATH : CARD_PATH }}
          transition={springTransition}
          fill={`url(#${fillId})`}
        />

        <motion.path
          initial={false}
          d={CARD_PATH}
          animate={{
            d: isDisplayingActive ? HOVER_CARD_PATH : CARD_PATH,
            opacity: isDisplayingActive ? 0.04 : 0,
          }}
          transition={springTransition}
          fill={primary}
        />

        <motion.path
          initial={false}
          d={CARD_PATH}
          animate={{
            d: isDisplayingActive ? HOVER_CARD_PATH : CARD_PATH,
            opacity: isDisplayingActive ? 0 : 1,
          }}
          transition={springTransition}
          stroke={`url(#${strokeId})`}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />

        <motion.path
          initial={false}
          d={CARD_PATH}
          animate={{
            d: isDisplayingActive ? HOVER_CARD_PATH : CARD_PATH,
            opacity: isDisplayingActive ? 1 : 0,
          }}
          transition={springTransition}
          stroke={`url(#${strokeHoverId})`}
          strokeWidth={1.25}
          vectorEffect="non-scaling-stroke"
        />

        <defs>
          <linearGradient
            id={fillId}
            x1="0"
            y1={UNION_H}
            x2={UNION_W}
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={fillStart} stopOpacity="1" />
            <stop offset="0.45" stopColor={fillMid} stopOpacity="1" />
            <stop offset="1" stopColor={fillEnd} stopOpacity="1" />
          </linearGradient>

          <linearGradient
            id={strokeId}
            x1="0"
            y1={UNION_H}
            x2={UNION_W}
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={theme.palette.common.white} stopOpacity="0" />
            <stop offset="1.85" stopColor={theme.palette.common.white} stopOpacity="0.55" />
            <stop offset="0.85" stopColor={theme.palette.common.white} stopOpacity="0.45" />
            <stop offset="1" stopColor={theme.palette.common.white} stopOpacity="0" />
          </linearGradient>

          <linearGradient
            id={strokeHoverId}
            x1="0"
            y1={UNION_H}
            x2={UNION_W}
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={primary} stopOpacity="0.7" />
            <stop offset="0.15" stopColor={primary} stopOpacity="0" />
            <stop offset="0.38" stopColor={primary} stopOpacity="0" />
            <stop offset="0.62" stopColor={primary} stopOpacity="0" />
            <stop offset="0.85" stopColor={primary} stopOpacity="0.7" />
            <stop offset="1" stopColor={primary} stopOpacity="0" />
          </linearGradient>
        </defs>
      </Box>

      {selected && (
        <MotionBox
          layoutId="selection-indicator"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={springTransition}
          sx={{
            position: 'absolute',
            left: 20,
            top: 20,
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            boxShadow: `0 0 10px 2px ${alpha(primary, 0.6)}`,
            zIndex: 10,
          }}
        >
          <Box
            component={motion.div}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            sx={{
              position: 'absolute',
              inset: -4,
              borderRadius: '50%',
              border: `2px solid ${primary}`,
            }}
          />
        </MotionBox>
      )}

      <MotionBox
        variants={iconContainerVariants}
        transition={springTransition}
        sx={{
          position: 'absolute',
          left: ICON_X,
          top: ICON_Y,
          width: ICON_SIZE,
          height: ICON_SIZE,
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            border: '1px solid',
            backdropFilter: isDisplayingActive ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: isDisplayingActive ? 'blur(12px)' : 'none',
            backgroundColor: isDisplayingActive
              ? alpha(theme.palette.background.paper, 0.2)
              : 'transparent',
            borderColor: isDisplayingActive
              ? alpha(primary, 0.7)
              : alpha(theme.palette.common.white, 0.12),
            boxShadow: isDisplayingActive
              ? `inset 0px 3px 8px 0px ${alpha(theme.palette.common.white, 0.25)}, 0px 0px 32px 4px ${alpha(primary, 0.25)}`
              : 'none',
            transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDisplayingActive ? primary : alpha(primary, 0.85),
              transition: 'color 0.25s ease',
            }}
          >
            {typeof Icon === 'string' ? (
              <Box
                component="img"
                src={Icon}
                alt=""
                sx={{
                  width: 24,
                  height: 24,
                  objectFit: 'contain',
                }}
              />
            ) : (
              <Icon size={24} color="currentColor" strokeWidth={1.75} />
            )}
          </Box>
        </Box>
      </MotionBox>

      <Box
        sx={{
          position: 'absolute',
          left: '24px',
          top: '36px',
          display: 'flex',
          width: 168,
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '8px',
          zIndex: 1,
        }}
      >
        <Typography
          component="h3"
          sx={{
            width: 160,
            fontSize: '15px',
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: '0.2px',
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            width: '100%',
            fontSize: '11.5px',
            fontWeight: 400,
            lineHeight: 1.45,
            color: 'text.secondary',
            opacity: 0.85,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {description}
        </Typography>
      </Box>
    </MotionBox>
  )
}
