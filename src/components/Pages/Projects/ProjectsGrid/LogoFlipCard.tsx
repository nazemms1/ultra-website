'use client'

import { useEffect, useRef } from 'react'
import type { ProjectGridItem } from './types'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { cardGlassSurface } from '@/lib/theme/surfaces'

type LogoFlipCardProps = {
  item: ProjectGridItem
  imageOnLeft: boolean
}

// Peek: rotate to this angle and back to hint the card is flippable
const PEEK_ANGLE = 38 // degrees
const PEEK_DELAY_MS = 1800   // wait after mount before first peek
const PEEK_DURATION_MS = 520 // time to reach peak angle
const PEEK_HOLD_MS = 180     // hold at peak
const PEEK_RETURN_MS = 420   // return to 0
const PEEK_INTERVAL_MS = 6000 // repeat every N ms

export default function LogoFlipCard({ item, imageOnLeft }: LogoFlipCardProps) {
  const theme = useTheme()
  const innerRef = useRef<HTMLDivElement>(null)

  // CSS-driven peek animation using Web Animations API — zero React re-renders
  useEffect(() => {
    const el = innerRef.current
    if (!el) return

    let timeoutId: ReturnType<typeof setTimeout>
    let intervalId: ReturnType<typeof setInterval>
    let cancelled = false

    const peek = () => {
      if (cancelled || !el) return
      const anim = el.animate(
        [
          { transform: 'rotateY(0deg)' },
          { transform: `rotateY(${PEEK_ANGLE}deg)`, offset: PEEK_DURATION_MS / (PEEK_DURATION_MS + PEEK_HOLD_MS + PEEK_RETURN_MS) },
          { transform: `rotateY(${PEEK_ANGLE}deg)`, offset: (PEEK_DURATION_MS + PEEK_HOLD_MS) / (PEEK_DURATION_MS + PEEK_HOLD_MS + PEEK_RETURN_MS) },
          { transform: 'rotateY(0deg)' },
        ],
        {
          duration: PEEK_DURATION_MS + PEEK_HOLD_MS + PEEK_RETURN_MS,
          easing: 'ease-in-out',
          fill: 'none',
        },
      )
      // Don't peek while the row is being hovered (CSS transition takes over)
      el.closest('.project-grid-row')?.addEventListener('mouseenter', () => anim.cancel(), { once: true })
    }

    timeoutId = setTimeout(() => {
      peek()
      intervalId = setInterval(peek, PEEK_INTERVAL_MS)
    }, PEEK_DELAY_MS)

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [])

  const faceStyle = {
    ...cardGlassSurface(theme, { radius: '40px' }),
    position: 'absolute',
    inset: 0,
    borderRadius: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    overflow: 'hidden',
    padding: '15.36px',
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: imageOnLeft ? '22.5%' : 'auto',
        right: !imageOnLeft ? '22.5%' : 'auto',
        translateY: '-50%',
        translateX: '-50%',
        zIndex: 10,
        width: 286,
        height: 170,
        perspective: 1200,
        cursor: 'default',
        transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: 'translate(-50%, -50%) scale(1)',
        '.project-grid-row:hover &': {
          transform: 'translate(-50%, -50%) scale(1.06)',
        },
      }}
    >
      {/* Subtle pulsing glow ring to draw attention */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: -6,
          borderRadius: '46px',
          border: '1.5px solid rgba(13, 241, 217, 0.22)',
          pointerEvents: 'none',
          animation: 'logoFlipPulse 3s ease-in-out infinite',
          '@keyframes logoFlipPulse': {
            '0%, 100%': { opacity: 0.18, boxShadow: '0 0 0px rgba(13,241,217,0)' },
            '50%': { opacity: 0.65, boxShadow: '0 0 14px rgba(13,241,217,0.22)' },
          },
        }}
      />

      <Box
        ref={innerRef}
        className="logo-flip-card-inner"
        sx={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          position: 'relative',
          transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
          '.project-grid-row:hover &': {
            transform: 'rotateY(180deg)',
          },
        }}
      >
        {/* ── Front face ── */}
        <Box sx={faceStyle}>
          {item.logo.src ? (
            <Box
              component="img"
              src={item.logo.src}
              alt={item.logo.alt}
              sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ) : (
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{item.title}</span>
          )}
        </Box>

        {/* ── Back face ── */}
        <Box sx={{ ...faceStyle, transform: 'rotateY(180deg)' }}>
          {item.logoFlip?.src ? (
            <Box
              component="img"
              src={item.logoFlip.src}
              alt={item.logoFlip.alt}
              sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ) : item.logo.src ? (
            <Box
              component="img"
              src={item.logo.src}
              alt={item.logo.alt}
              sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ) : (
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{item.title}</span>
          )}
        </Box>
      </Box>
    </Box>
  )
}

