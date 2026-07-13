'use client'

import { useRef, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import type { SxProps, Theme } from '@mui/material/styles'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import OrbitalCard, { CARD_H, CARD_W } from './OrbitalCard'
import OrbitalEmblem from './OrbitalEmblem'
import { type ServiceItem } from './data'

// ─── Layout ──────────────────────────────────────────────────────────────────

const R_DOT    = 140
const R_CARD   = R_DOT + 8 + CARD_W / 2
const DECK     = (R_CARD + CARD_H / 2 + 40) * 2
const CENTER   = DECK / 2

// How long (ms) to wait after becoming visible before starting the spin.
// Lets the entrance fade finish before the rAF loop kicks in.
const SPIN_DELAY_MS = 550

// ─── Types ───────────────────────────────────────────────────────────────────

interface OrbitalDeckProps {
  items:         ServiceItem[]
  baseSpeed?:    number
  onActivate:    (index: number | null) => void
  onHover:       (index: number | null) => void
  activeIndex:   number | null
  selectedIndex: number | null
  eyeOffsetX:    MotionValue<number>
  eyeOffsetY:    MotionValue<number>
}

// ─── OrbitalDeck ─────────────────────────────────────────────────────────────

export default function OrbitalDeck({
  items,
  baseSpeed = 7,
  onActivate,
  onHover,
  activeIndex,
  selectedIndex,
  eyeOffsetX,
  eyeOffsetY,
}: OrbitalDeckProps) {
  const prefersReduced = useReducedMotion()
  const deckRef        = useRef<HTMLDivElement>(null)

  // spin drives all spoke transforms via useTransform chains
  const spin     = useMotionValue(0)
  const pausedRef = useRef(false)
  const speedRef  = useRef(baseSpeed)

  // Visibility + delayed ready flag — gates the animation loop
  const [visible, setVisible] = useState(false)
  const [ready,   setReady]   = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Scroll velocity — sampled inside the single rAF below (no second loop)
  const scrollVelRef   = useRef(0)
  const lastScrollYRef = useRef(0)
  const lastScrollTRef = useRef(0)

  // ── 1. Visibility observer ──────────────────────────────────────────────
  useEffect(() => {
    const el = deckRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // ── 2. Delayed activation — waits for entrance animation to finish ──────
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (visible) {
      timerRef.current = setTimeout(() => setReady(true), SPIN_DELAY_MS)
    } else {
      setReady(false)
      scrollVelRef.current = 0
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [visible])

  // ── 3. Single animation frame — spin + scroll velocity in one loop ──────
  useAnimationFrame((_, delta) => {
    if (prefersReduced || !ready) return

    const dt = Math.min(delta, 64) / 1000

    // Sample scroll velocity (replaces the old second rAF loop)
    const now = performance.now()
    const scrollDt = now - lastScrollTRef.current
    if (scrollDt > 0) {
      const dy  = window.scrollY - lastScrollYRef.current
      const raw = Math.abs(dy / scrollDt) * 1000
      scrollVelRef.current   += (raw - scrollVelRef.current) * 0.15
      lastScrollYRef.current  = window.scrollY
      lastScrollTRef.current  = now
    }

    // Speed with scroll boost, smoothed via exponential decay
    const boost  = (Math.min(scrollVelRef.current, 4000) / 4000) * baseSpeed * 2.5
    const target = pausedRef.current ? 0 : baseSpeed + boost
    const k      = 1 - Math.exp(-dt * 6)
    speedRef.current += (target - speedRef.current) * k
    spin.set(spin.get() - speedRef.current * dt)
  })

  const pause  = () => { pausedRef.current = true  }
  const resume = () => { pausedRef.current = false }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <Box
      ref={deckRef}
      sx={{ position: 'relative', flexShrink: 0, width: DECK, height: DECK }}
      aria-label="Orbiting services"
    >
      <OrbitalCenter offsetX={eyeOffsetX} offsetY={eyeOffsetY} />

      {items.map((service, i) => (
        <OrbitalSpoke
          key={service.title}
          spin={spin}
          service={service}
          isSelected={i === selectedIndex}
          isActive={i === activeIndex}
          onSelect={     () => onActivate(i)}
          onHoverStart={ () => { onHover(i);    pause()  }}
          onHoverEnd={   () => { onHover(null); resume() }}
        />
      ))}

      {/* Right-side fade veil */}
      <Box
        aria-hidden
        sx={{
          pointerEvents: 'none',
          position:      'absolute',
          inset:         '0 0 -10px auto',
          zIndex:        20,
          width:         '0%',
          background: theme =>
            `linear-gradient(to right,
              transparent 0%,
              ${alpha(theme.palette.background.default, 0.65)} 55%,
              ${alpha(theme.palette.background.default, 0.95)} 100%)`,
          maskImage:         'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
          WebkitMaskImage:   'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
        }}
      />
    </Box>
  )
}

// ─── OrbitalSpoke ─────────────────────────────────────────────────────────────

interface OrbitalSpokeProps {
  spin:         MotionValue<number>
  service:      ServiceItem
  isSelected:   boolean
  isActive:     boolean
  onSelect:     () => void
  onHoverStart: () => void
  onHoverEnd:   () => void
}

function OrbitalSpoke({
  spin,
  service,
  isSelected,
  isActive,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: OrbitalSpokeProps) {
  const theme   = useTheme()
  const primary = theme.palette.primary.main
  const { baseAngle } = service

  // Derived motion values — update on the GPU thread, no React re-render
  const spokeRotate     = useTransform(spin, s => baseAngle + s)
  const cardCounterRot  = useTransform(spin, s => -(baseAngle + s))

  const cardOpacity = useTransform(spin, s => {
    const angle = (((baseAngle + s) % 360) + 360) % 360
    const dist  = Math.abs(angle - 180)
    return clamp((90 - dist) / 30, 0, 1)   // fade 60°–90° from back
  })
  const cardScale   = useTransform(cardOpacity, o => 0.82 + 0.18 * o)
  const cardPointer = useTransform(cardOpacity, o => (o < 0.25 ? 'none' : 'auto'))

  return (
    // Outer div rotates the whole spoke arm
    <Box
      component={motion.div}
      sx={{
        position:        'absolute',
        left:            CENTER,
        top:             CENTER,
        width:           0,
        height:          0,
        transformOrigin: '0px 0px',
        willChange:      'transform',
      }}
      style={{ rotate: spokeRotate }}
    >
      {/* Glowing dot on the spoke */}
      <Box
        component={motion.div}
        aria-hidden
        style={{ opacity: cardOpacity }}
        sx={{
          position:     'absolute',
          left:         R_DOT,
          top:          0,
          width:        10,
          height:       10,
          ml:           '-5px',
          mt:           '-5px',
          borderRadius: '50%',
          bgcolor:      'primary.main',
          boxShadow:    `0 0 10px 2px ${alpha(primary, 0.7)}`,
        }}
      />

      {/* Card wrapper — counter-rotates so the card stays upright */}
      <Box
        component={motion.div}
        sx={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0 }}
        style={{ opacity: cardOpacity }}
      >
        <Box
          component={motion.div}
          sx={{
            position: 'absolute',
            left:     R_CARD,
            top:      0,
            width:    CARD_W,
            height:   CARD_H,
            ml:       `${-CARD_W / 2.5}px`,
            mt:       `${-CARD_H / 2}px`,
          }}
          style={{ pointerEvents: cardPointer }}
        >
          <Box
            component={motion.div}
            style={{
              rotate:          cardCounterRot,
              scale:           cardScale,
              transformOrigin: `${CARD_W / 2}px ${CARD_H / 2}px`,
              willChange:      'transform',
            }}
          >
            <OrbitalCard
              title={service.title}
              description={service.cardDescription}
              Icon={service.Icon}
              tools={service.tools}
              selected={isSelected}
              active={isActive}
              onClick={onSelect}
              onHoverStart={onHoverStart}
              onHoverEnd={onHoverEnd}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

// ─── OrbitalCenter ────────────────────────────────────────────────────────────

interface OrbitalCenterProps {
  offsetX: MotionValue<number>
  offsetY: MotionValue<number>
}

function OrbitalCenter({ offsetX, offsetY }: OrbitalCenterProps) {
  return (
    <Box
      sx={{
        pointerEvents: 'none',
        position:      'absolute',
        left:          CENTER,
        top:           CENTER,
        width:         0,
        height:        0,
      }}
    >
      <Ring diameter={384} sx={{ borderColor: '#244D59' }} />
      <Ring diameter={280} sx={{ borderColor: '#2A5A68' }} />
      <Ring
        diameter={200}
        sx={{
          borderColor: '#00E6D2',
          boxShadow:
            `inset 0 0 30px ${alpha('#00E6D2', 0.2)}, 0 0 40px ${alpha('#00E6D2', 0.2)}`,
        }}
      />

      {/* Central radial glow */}
      <Box
        aria-hidden
        sx={{
          position:     'absolute',
          left:         -200,
          top:          -200,
          width:        400,
          height:       400,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse 70.71% 70.71% at 50% 50%, rgba(13,241,217,0.18) 0%, rgba(18,18,18,0) 65%)',
          filter:        'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <OrbitalEmblem offsetX={offsetX} offsetY={offsetY} />
    </Box>
  )
}

// ─── Ring ─────────────────────────────────────────────────────────────────────

function Ring({ diameter, sx }: { diameter: number; sx?: SxProps<Theme> }) {
  return (
    <Box
      sx={{
        position:     'absolute',
        left:         -diameter / 2,
        top:          -diameter / 2,
        width:        diameter,
        height:       diameter,
        borderRadius: '50%',
        border:       '1px solid',
        ...sx,
      }}
    />
  )
}

// ─── Util ─────────────────────────────────────────────────────────────────────

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
