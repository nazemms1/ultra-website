'use client'

import { useRef, useEffect, useState, memo, useCallback } from 'react'
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

const EASE = [0.22, 1, 0.36, 1] as const
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
  isInView:      boolean
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
  const deckRef        = useRef<HTMLDivElement>(null)

  // spin drives all spoke transforms via useTransform chains
  const spin     = useMotionValue(0)
  const pausedRef = useRef(false)
  const speedRef  = useRef(baseSpeed)

  // Delayed ready flag — gates the animation loop
  const [ready,   setReady]   = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Scroll velocity ref — populated by a passive window scroll listener to avoid layout thrashing
  const scrollVelRef = useRef(0)

  // ── Delayed activation — waits for entrance animation to finish ──────
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (isInView) {
      timerRef.current = setTimeout(() => setReady(true), SPIN_DELAY_MS)
    } else {
      setReady(false)
      scrollVelRef.current = 0
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isInView])

  // ── 3. Passive scroll handler to capture scroll velocity ────────────────
  useEffect(() => {
    if (prefersReduced) return

    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0
    let lastScrollTime = performance.now()
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null

    const handleScroll = () => {
      const now = performance.now()
      const scrollDt = now - lastScrollTime
      const currentScrollY = window.scrollY

      // Disable pointer events temporarily during active scroll to prevent hover state flooding in React
      if (deckRef.current && deckRef.current.style.pointerEvents !== 'none') {
        deckRef.current.style.pointerEvents = 'none'
      }

      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        if (deckRef.current) {
          deckRef.current.style.pointerEvents = 'auto'
        }
      }, 120) // restore interaction after 120ms of scroll pause

      if (scrollDt > 0) {
        const dy = currentScrollY - lastScrollY
        // Convert px/ms to px/sec
        const raw = Math.abs(dy / scrollDt) * 1000
        // Smooth out scroll velocity transitions
        scrollVelRef.current += (raw - scrollVelRef.current) * 0.18
      }
      lastScrollY = currentScrollY
      lastScrollTime = now
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [prefersReduced])

  // ── 4. Single animation frame — spin + scroll velocity decay in one loop ──
  useAnimationFrame((_, delta) => {
    if (prefersReduced || !ready) return

    const dt = Math.min(delta, 64) / 1000

    // Speed with scroll boost, smoothed via exponential decay
    const boost  = (Math.min(scrollVelRef.current, 4000) / 4000) * baseSpeed * 2.5
    const target = pausedRef.current ? 0 : baseSpeed + boost
    const k      = 1 - Math.exp(-dt * 6)
    speedRef.current += (target - speedRef.current) * k
    spin.set(spin.get() - speedRef.current * dt)

    // Decay the scroll velocity over time so it returns to 0 when scrolling stops
    scrollVelRef.current += (0 - scrollVelRef.current) * (1 - Math.exp(-dt * 3))
  })

  const pause  = useCallback(() => { pausedRef.current = true  }, [])
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
          visible={isInView}
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
  index:        number
  isSelected:   boolean
  isActive:     boolean
  onSelect:     (index: number | null) => void
  onHoverStart: (index: number) => void
  onHoverEnd:   () => void
  visible:      boolean
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
  const theme   = useTheme()
  const primary = theme.palette.primary.main
  const { baseAngle } = service

  // Derived motion values — update on the GPU thread, no React re-render
  const spokeRotate     = useTransform(spin, s => baseAngle + s)
  const cardCounterRot  = useTransform(spin, s => -(baseAngle + s))

  const cardOpacity = useTransform(spin, s => {
    const angle = (((baseAngle + s) % 360) + 360) % 360
    const dist  = Math.abs(angle - 180)
    return clamp((90 - dist) / 30, 0.001, 1)   // fade 60°–90° from back
  })
  const cardScale   = useTransform(cardOpacity, o => 0.82 + 0.18 * o)

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
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          willChange: 'transform, opacity',
        }}
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
            willChange: 'transform, opacity',
          }}
        >
          <Box
            component={motion.div}
            style={{
              rotate:          cardCounterRot,
              scale:           cardScale,
              transformOrigin: `${CARD_W / 2}px ${CARD_H / 2}px`,
              willChange:      'transform, opacity',
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
        position:      'absolute',
        left:          CENTER,
        top:           CENTER,
        width:         0,
        height:        0,
      }}
    >
      <Ring diameter={384} sx={{ borderColor: '#244D59' }} delay={0.2} visible={visible} />
      <Ring diameter={280} sx={{ borderColor: '#2A5A68' }} delay={0.35} visible={visible} />
      <Ring
        diameter={200}
        sx={{
          borderColor: '#00E6D2',
          boxShadow:
            `inset 0 0 30px ${alpha('#00E6D2', 0.2)}, 0 0 40px ${alpha('#00E6D2', 0.2)}`,
        }}
        delay={0.5}
        visible={visible}
      />

      {/* Central radial glow */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.8, delay: visible ? 0.6 : 0 }}
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
