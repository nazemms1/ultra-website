'use client'

import { useRef, useEffect, useState, memo, useCallback } from 'react'
import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import type { SxProps, Theme } from '@mui/material/styles'
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import OrbitalCard, { CARD_H, CARD_W } from './OrbitalCard'
import OrbitalEmblem from './OrbitalEmblem'
import { type ServiceItem } from './data'

// ─── Layout ──────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const
const R_DOT = 140
const R_CARD = R_DOT + 8 + CARD_W / 2
const DECK = (R_CARD + CARD_H / 2 + 40) * 2
const CENTER = DECK / 2

// How long (ms) to wait after becoming visible before starting the spin.
// Lets the entrance fade finish before the rAF loop kicks in.
const SPIN_DELAY_MS = 550

// ─── Types ───────────────────────────────────────────────────────────────────

interface OrbitalDeckProps {
  items: ServiceItem[]
  baseSpeed?: number
  onActivate: (index: number | null) => void
  onHover: (index: number | null) => void
  activeIndex: number | null
  selectedIndex: number | null
  eyeOffsetX: MotionValue<number>
  eyeOffsetY: MotionValue<number>
  isInView: boolean
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
  isInView,
}: OrbitalDeckProps) {
  const prefersReduced = useReducedMotion()
  const deckRef = useRef<HTMLDivElement>(null)

  // Local useInView with amount: 0.2 on deckRef so it triggers exactly when the deck itself is visible!
  const localIsInView = useInView(deckRef, { once: false, amount: 0.2 })

  // spin drives all spoke transforms via useTransform chains
  const spin = useMotionValue(0)
  const pausedRef = useRef(false)
  const speedRef = useRef(baseSpeed)

  // Delayed ready flag — gates the animation loop
  const [ready, setReady] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Delayed activation — waits for entrance animation to finish ──────
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (localIsInView) {
      timerRef.current = setTimeout(() => setReady(true), SPIN_DELAY_MS)
    } else {
      setReady(false)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [localIsInView])

  // ── Pause pointer interaction while the user is actively scrolling ───────
  // Only mounted while the deck is on-screen. This prevents hover-state
  // flooding through React during scroll without running a global scroll
  // listener for the whole page lifetime. The former scroll→spin-speed boost
  // was removed: accelerating the animation mid-scroll spiked frame cost
  // exactly when the browser was busiest, compounding the jank/freeze.
  useEffect(() => {
    if (prefersReduced || !localIsInView) return

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null

    const handleScroll = () => {
      if (deckRef.current && deckRef.current.style.pointerEvents !== 'none') {
        deckRef.current.style.pointerEvents = 'none'
      }
      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        if (deckRef.current) deckRef.current.style.pointerEvents = 'auto'
      }, 120) // restore interaction after 120ms of scroll pause
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
      if (deckRef.current) deckRef.current.style.pointerEvents = 'auto'
    }
  }, [prefersReduced, localIsInView])

  // ── Single animation frame — ambient spin only ───────────────────────────
  // Gated on `ready` (set only after the deck scrolls into view), so no spin
  // work happens while the section is off-screen.
  useAnimationFrame((_, delta) => {
    if (prefersReduced || !ready) return

    const dt = Math.min(delta, 64) / 1000
    const target = pausedRef.current ? 0 : baseSpeed
    const k = 1 - Math.exp(-dt * 6)
    speedRef.current += (target - speedRef.current) * k
    spin.set(spin.get() - speedRef.current * dt)
  })

  const pause = useCallback(() => { pausedRef.current = true }, [])
  const resume = useCallback(() => { pausedRef.current = false }, [])

  const handleHoverStartParent = useCallback((index: number) => {
    onHover(index)
    pause()
  }, [onHover, pause])

  const handleHoverEndParent = useCallback(() => {
    onHover(null)
    resume()
  }, [onHover, resume])

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <Box
      ref={deckRef}
      sx={{ position: 'relative', flexShrink: 0, width: DECK, height: DECK }}
      aria-label="Orbiting services"
    >
      <OrbitalCenter offsetX={eyeOffsetX} offsetY={eyeOffsetY} visible={isInView} />

      {items.map((service, i) => (
        <OrbitalSpoke
          key={service.title}
          spin={spin}
          service={service}
          index={i}
          isSelected={i === selectedIndex}
          isActive={i === activeIndex}
          onSelect={onActivate}
          onHoverStart={handleHoverStartParent}
          onHoverEnd={handleHoverEndParent}
          visible={localIsInView}
        />
      ))}

      {/* Side fade veil */}
      <Box
        aria-hidden
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: theme => theme.direction === 'rtl' ? '0 auto -10px 0' : '0 0 -10px auto',
          zIndex: 20,
          width: '0%',
          background: theme =>
            `linear-gradient(to ${theme.direction === 'rtl' ? 'left' : 'right'},
              transparent 0%,
              ${alpha(theme.palette.background.default, 0.65)} 55%,
              ${alpha(theme.palette.background.default, 0.95)} 100%)`,
          maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
        }}
      />
    </Box>
  )
}

// ─── OrbitalSpoke ─────────────────────────────────────────────────────────────

interface OrbitalSpokeProps {
  spin: MotionValue<number>
  service: ServiceItem
  index: number
  isSelected: boolean
  isActive: boolean
  onSelect: (index: number | null) => void
  onHoverStart: (index: number) => void
  onHoverEnd: () => void
  visible: boolean
}

const OrbitalSpoke = memo(function OrbitalSpoke({
  spin,
  service,
  index,
  isSelected,
  isActive,
  onSelect,
  onHoverStart,
  onHoverEnd,
  visible,
}: OrbitalSpokeProps) {
  const theme = useTheme()
  const primary = theme.palette.primary.main
  const { baseAngle } = service

  // Derived motion values — update on the GPU thread, no React re-render
  const spokeRotate = useTransform(spin, s => baseAngle + s)
  const cardCounterRot = useTransform(spin, s => -(baseAngle + s))

  const cardOpacity = useTransform(spin, s => {
    const angle = (((baseAngle + s) % 360) + 360) % 360
    const dist = Math.abs(angle - 180)
    return clamp((90 - dist) / 30, 0.001, 1)   // fade 60°–90° from back
  })
  const cardScale = useTransform(cardOpacity, o => 0.82 + 0.18 * o)

  return (
    // Outer div rotates the whole spoke arm
    <Box
      component={motion.div}
      sx={{
        position: 'absolute',
        left: CENTER,
        top: CENTER,
        width: 0,
        height: 0,
        transformOrigin: '0px 0px',
        willChange: 'transform',
      }}
      style={{ rotate: spokeRotate }}
    >
      {/* Glowing dot on the spoke */}
      <Box
        component={motion.div}
        aria-hidden
        initial={{ scale: 0 }}
        animate={visible ? { scale: 1 } : { scale: 0 }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 14,
          delay: visible ? 0.3 + index * 0.08 : 0,
        }}
        style={{ opacity: cardOpacity }}
        sx={{
          position: 'absolute',
          left: R_DOT,
          top: 0,
          width: 10,
          height: 10,
          ml: '-5px',
          mt: '-5px',
          borderRadius: '50%',
          bgcolor: 'primary.main',
          boxShadow: `0 0 10px 2px ${alpha(primary, 0.7)}`,
        }}
      />

      {/* Card wrapper — counter-rotates so the card stays upright.
          will-change is intentionally NOT set on these nested layers: only the
          outer spoke arm is GPU-promoted. Promoting every nested layer for all
          8 spokes created dozens of permanent composite layers and was the main
          cause of the GPU-memory blowup / tab crash on entering this section. */}
      <Box
        component={motion.div}
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 0,
          height: 0,
        }}
        style={{ opacity: cardOpacity }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: R_CARD,
            top: 0,
            width: CARD_W,
            height: CARD_H,
            ml: `${-CARD_W / 2.5}px`,
            mt: `${-CARD_H / 2}px`,
          }}
        >
          <Box
            component={motion.div}
            style={{
              rotate: cardCounterRot,
              scale: cardScale,
              transformOrigin: `${CARD_W / 2}px ${CARD_H / 2}px`,
            }}
          >
            <Box
              component={motion.div}
              initial={{ x: -60, opacity: 0.001 }}
              animate={visible ? { x: 0, opacity: 1 } : { x: -60, opacity: 0.001 }}
              transition={{
                type: 'tween',
                duration: 0.8,
                ease: EASE,
                delay: visible ? 0.8 + index * 0.12 : 0,
              }}
              sx={{ width: '100%', height: '100%' }}
            >
              <OrbitalCard
                title={service.title}
                description={service.cardDescription}
                Icon={service.Icon}
                tools={service.tools}
                selected={isSelected}
                active={isActive}
                onClick={useCallback(() => {
                  if (cardOpacity.get() >= 0.25) {
                    onSelect(index)
                  }
                }, [index, onSelect, cardOpacity])}
                onHoverStart={useCallback(() => {
                  if (cardOpacity.get() >= 0.25) {
                    onHoverStart(index)
                  }
                }, [index, onHoverStart, cardOpacity])}
                onHoverEnd={onHoverEnd}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
})

// ─── OrbitalCenter ────────────────────────────────────────────────────────────

interface OrbitalCenterProps {
  offsetX: MotionValue<number>
  offsetY: MotionValue<number>
  visible: boolean
}

function OrbitalCenter({ offsetX, offsetY, visible }: OrbitalCenterProps) {
  return (
    <Box
      sx={{
        pointerEvents: 'none',
        position: 'absolute',
        left: CENTER,
        top: CENTER,
        width: 0,
        height: 0,
      }}
    >
      <Ring
        diameter={384}
        sx={{
          borderColor: 'rgba(13, 241, 217, 0.35)',
        }}
        delay={0.2}
        visible={visible}
      />
      <Ring
        diameter={280}
        sx={{
          borderColor: 'rgba(13, 241, 217, 0.45)',
        }}
        delay={0.35}
        visible={visible}
      />
      <Ring
        diameter={200}
        sx={{
          borderColor: '#00E6D2',
        }}
        delay={0.5}
        visible={visible}
      />

      {/* Soft atmospheric light glow (pure light aura without solid background) */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.8, delay: visible ? 0.6 : 0 }}
        aria-hidden
        sx={{
          position: 'absolute',
          left: -250,
          top: -250,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 50% 50%, rgba(13, 241, 217, 0.20) 0%, rgba(13, 241, 217, 0.08) 40%, rgba(13, 241, 217, 0.01) 65%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      <Box
        component={motion.div}
        initial={{ scale: 0, opacity: 0 }}
        animate={visible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          delay: visible ? 0.7 : 0,
        }}
        sx={{ position: 'absolute', inset: 0 }}
      >
        <OrbitalEmblem offsetX={offsetX} offsetY={offsetY} />
      </Box>
    </Box>
  )
}

// ─── Ring ─────────────────────────────────────────────────────────────────────

function Ring({
  diameter,
  sx,
  delay = 0,
  visible,
}: {
  diameter: number
  sx?: SxProps<Theme>
  delay?: number
  visible: boolean
}) {
  return (
    <Box
      component={motion.div}
      initial={{ scale: 0.3, opacity: 0 }}
      animate={visible ? { scale: 1, opacity: 1 } : { scale: 0.3, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 90,
        damping: 15,
        delay: visible ? delay : 0,
      }}
      sx={{
        position: 'absolute',
        left: -diameter / 2,
        top: -diameter / 2,
        width: diameter,
        height: diameter,
        borderRadius: '50%',
        border: '1px solid',
        ...sx,
      }}
    />
  )
}

// ─── Util ─────────────────────────────────────────────────────────────────────

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
