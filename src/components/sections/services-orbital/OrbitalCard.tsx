'use client'

import { useId, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import type { SxProps, Theme } from '@mui/material/styles'
import type { LucideIcon } from 'lucide-react'

export const CARD_W = 270
export const CARD_H = 150

const UNION_W = 268.968
const UNION_H = 144.231
const CARD_PATH =
  'M225.968 0C249.716 0 268.968 19.2518 268.968 43C268.968 58.8354 260.407 72.6697 247.662 80.1315C244.099 82.2174 241.5 85.8273 241.5 89.9557V124.963C241.5 135.658 232.155 144.231 220.75 144.231H20.75C9.34549 144.231 0 135.658 0 124.963V37C0 26.305 9.34549 17.7314 20.75 17.7314H186.085C189.283 17.7314 192.234 16.1478 194.406 13.8001C202.261 5.31383 213.493 0 225.968 0Z'

const ICON_SIZE = 64
const ICON_X = 194
const ICON_Y = 12
const TRANSITION = '0.3s ease-out'

interface OrbitalCardProps {
  title: string
  description: string
  Icon: LucideIcon
  onHoverStart?: () => void
  onHoverEnd?: () => void
  sx?: SxProps<Theme>
}

export default function OrbitalCard({
  title,
  description,
  Icon,
  onHoverStart,
  onHoverEnd,
  sx,
}: OrbitalCardProps) {
  const theme = useTheme()
  const primary = theme.palette.primary.main
  const primaryDarker = theme.palette.primary.darker
  const id = useId().replace(/:/g, '')
  const fillId = `orbital-card-fill-${id}`
  const strokeId = `orbital-card-stroke-${id}`
  const strokeHoverId = `orbital-card-stroke-hover-${id}`

  const [hovered, setHovered] = useState(false)

  const fillStart = alpha(theme.palette.background.card, 0.55)
  const fillMid = alpha(theme.palette.background.elevated, 0.62)
  const fillEnd = alpha(theme.palette.background.default, 0.7)

  const cardFilter = hovered
    ? `drop-shadow(0px 24px 40px rgba(0,0,0,0.55)) drop-shadow(0px 0px 52px ${alpha(primary, 0.6)})`
    : `drop-shadow(0px 20px 34px rgba(0,0,0,0.5)) drop-shadow(0px 0px 26px ${alpha(primaryDarker, 0.14)})`

  const handleHoverStart = () => {
    setHovered(true)
    onHoverStart?.()
  }

  const handleHoverEnd = () => {
    setHovered(false)
    onHoverEnd?.()
  }

  return (
    <Box
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        width: CARD_W,
        height: CARD_H,
        transformOrigin: '50% 55%',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        transition: `transform ${TRANSITION}`,
        ...sx,
      }}
    >
      <Box
        aria-hidden
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          left: '18px',
          top: '22px',
          width: 210,
          height: 112,
          borderRadius: '32px',
          bgcolor: alpha(primary, 0.15),
          filter: 'blur(40px)',
          opacity: hovered ? 1 : 0.4,
          transition: `opacity ${TRANSITION}`,
        }}
      />

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
          filter: cardFilter,
          transition: `filter ${TRANSITION}`,
        }}
      >
        <path d={CARD_PATH} fill={`url(#${fillId})`} />
        <path
          d={CARD_PATH}
          fill={primary}
          opacity={hovered ? 0.07 : 0}
          style={{ transition: `opacity ${TRANSITION}` }}
        />
        <path
          d={CARD_PATH}
          stroke={`url(#${strokeId})`}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          opacity={hovered ? 0 : 1}
          style={{ transition: `opacity ${TRANSITION}` }}
        />
        <path
          d={CARD_PATH}
          stroke={`url(#${strokeHoverId})`}
          strokeWidth={1.25}
          vectorEffect="non-scaling-stroke"
          opacity={hovered ? 1 : 0}
          style={{ transition: `opacity ${TRANSITION}` }}
        />
        <defs>
          <linearGradient
            id={fillId}
            x1="0"
            y1="17"
            x2="268"
            y2="144"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={fillStart} stopOpacity="1" />
            <stop offset="0.45" stopColor={fillMid} stopOpacity="1" />
            <stop offset="1" stopColor={fillEnd} stopOpacity="1" />
          </linearGradient>
          <linearGradient
            id={strokeId}
            x1="4"
            y1="0"
            x2={UNION_W}
            y2={UNION_H}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={theme.palette.common.white} stopOpacity="0.18" />
            <stop offset="0.5" stopColor={theme.palette.common.white} stopOpacity="0.06" />
            <stop offset="1" stopColor={theme.palette.common.white} stopOpacity="0.14" />
          </linearGradient>
          <linearGradient
            id={strokeHoverId}
            x1="4"
            y1="0"
            x2={UNION_W}
            y2={UNION_H}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={theme.palette.common.white} stopOpacity="0.5" />
            <stop offset="0.45" stopColor={primary} stopOpacity="0.6" />
            <stop offset="1" stopColor={primary} stopOpacity="0.45" />
          </linearGradient>
        </defs>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          left: ICON_X,
          top: ICON_Y,
          width: ICON_SIZE,
          height: ICON_SIZE,
          transform: hovered ? 'translate(7px, -7px)' : 'none',
          transition: `transform ${TRANSITION}`,
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
            backdropFilter: 'blur(24px)',
            bgcolor: alpha(theme.palette.background.elevated, 0.4),
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            borderColor: hovered ? alpha(primary, 0.6) : alpha(theme.palette.common.white, 0.12),
            boxShadow: hovered
              ? `inset 0px 4px 12px 0px ${alpha(theme.palette.common.white, 0.32)}, 0px 0px 42px 6px ${alpha(primary, 0.55)}`
              : `inset 0px 4px 10px 0px ${alpha(theme.palette.common.white, 0.22)}, 0px 0px 24px 0px ${alpha(primaryDarker, 0.4)}`,
            transition: `transform ${TRANSITION}, border-color ${TRANSITION}, box-shadow ${TRANSITION}`,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'primary.main',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
              transition: `transform ${TRANSITION}`,
            }}
          >
            <Icon size={26} color="currentColor" strokeWidth={1.6} />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          left: '26px',
          top: '36px',
          display: 'flex',
          width: 168,
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '9px',
        }}
      >
        <Typography
          component="h3"
          sx={{
            width: 160,
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: 1.375,
            letterSpacing: 0,
            textTransform: 'none',
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            width: '100%',
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: 0,
            textTransform: 'none',
            color: 'text.secondary',
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  )
}
