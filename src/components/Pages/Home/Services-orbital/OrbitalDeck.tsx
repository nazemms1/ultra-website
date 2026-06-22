'use client'

import { useRef } from 'react'
import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import type { SxProps, Theme } from '@mui/material/styles'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'framer-motion'
import OrbitalCard, { CARD_H, CARD_W } from './OrbitalCard'
import OrbitalEmblem from './OrbitalEmblem'
import { SERVICES, type ServiceItem } from './data'

const R_DOT = 134
const R_CARD = R_DOT + 8 + CARD_W / 2
const DECK = (R_CARD + CARD_H / 2 + 40) * 2
const CENTER = DECK / 2

interface OrbitalDeckProps {
  baseSpeed?: number
  onActivate: (index: number | null) => void
  onHover: (index: number | null) => void
  activeIndex: number | null
  selectedIndex: number | null
  eyeOffsetX: MotionValue<number>
  eyeOffsetY: MotionValue<number>
}

export default function OrbitalDeck({
  baseSpeed = 7,
  onActivate,
  onHover,
  activeIndex,
  selectedIndex,
  eyeOffsetX,
  eyeOffsetY,
}: OrbitalDeckProps) {
  const prefersReduced = useReducedMotion()
  const spin = useMotionValue(0)
  const pausedRef = useRef(false)
  const speedRef = useRef(baseSpeed)

  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  })

  useAnimationFrame((_, delta) => {
    if (prefersReduced) return
    const dt = Math.min(delta, 64) / 1000

    const boost = (Math.min(Math.abs(smoothVelocity.get()), 4000) / 4000) * baseSpeed * 2.5
    const target = pausedRef.current ? 0 : baseSpeed + boost

    const k = 1 - Math.exp(-dt * 6)
    speedRef.current += (target - speedRef.current) * k
    spin.set(spin.get() - speedRef.current * dt)
  })

  const pause = () => {
    pausedRef.current = true
  }
  const resume = () => {
    pausedRef.current = false
  }

  return (
    <Box
      sx={{
        position: 'relative',
        flexShrink: 0,
        width: DECK,
        height: DECK,
      }}
      aria-label="Orbiting services"
    >
      <Box
        aria-hidden
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 640,
          height: 640,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
        }}
      />

      <OrbitalCenter offsetX={eyeOffsetX} offsetY={eyeOffsetY} />

      {SERVICES.map((service, i) => (
        <OrbitalSpoke
          key={service.title}
          spin={spin}
          service={service}
          isSelected={i === selectedIndex}
          isActive={i === activeIndex}
          onSelect={() => onActivate(i)}
          onHoverStart={() => {
            onHover(i)
            pause()
          }}
          onHoverEnd={() => {
            onHover(null)
            resume()
          }}
        />
      ))}

      <Box
        aria-hidden
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: '0 0 -120px auto',
          zIndex: 20,
          width: '40%',
          background: theme =>
            `linear-gradient(to right, transparent 0%, ${alpha(theme.palette.background.default, 0.65)} 55%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
          maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
        }}
      />
    </Box>
  )
}

interface OrbitalSpokeProps {
  spin: MotionValue<number>
  service: ServiceItem
  isSelected: boolean
  isActive: boolean
  onSelect: () => void
  onHoverStart: () => void
  onHoverEnd: () => void
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
  const theme = useTheme()
  const primary = theme.palette.primary.main
  const { baseAngle } = service

  const spokeRotate = useTransform(spin, s => baseAngle + s)
  const cardCounterRotate = useTransform(spin, s => -(baseAngle + s))

  const cardOpacity = useTransform(spin, s => {
    const a = (((baseAngle + s) % 360) + 360) % 360
    const d = Math.abs(a - 180)

    const FADE_START = 60
    const FADE_END = 90
    return clamp((FADE_END - d) / (FADE_END - FADE_START), 0, 1)
  })
  const cardScale = useTransform(cardOpacity, o => 0.82 + 0.18 * o)
  const cardPointer = useTransform(cardOpacity, o => (o < 0.25 ? 'none' : 'auto'))

  return (
    <Box
      component={motion.div}
      sx={{
        position: 'absolute',
        left: CENTER,
        top: CENTER,
        width: 0,
        height: 0,
        transformOrigin: '0px 0px',
      }}
      style={{ rotate: spokeRotate }}
    >
      <Box
        component={motion.div}
        aria-hidden
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

      <Box
        component={motion.div}
        sx={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0 }}
        style={{ opacity: cardOpacity }}
      >
        <Box
          component={motion.div}
          sx={{
            position: 'absolute',
            left: R_CARD,
            top: 0,
            width: CARD_W,
            height: CARD_H,
            ml: `${-CARD_W / 2}px`,
            mt: `${-CARD_H / 2}px`,
          }}
          style={{ pointerEvents: cardPointer }}
        >
          <Box
            component={motion.div}
            style={{
              rotate: cardCounterRotate,
              scale: cardScale,
              transformOrigin: `${CARD_W / 2}px ${CARD_H / 2}px`,
            }}
          >
            <OrbitalCard
              title={service.title}
              description={service.cardDescription}
              Icon={service.Icon}
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

interface OrbitalCenterProps {
  offsetX: MotionValue<number>
  offsetY: MotionValue<number>
}

function OrbitalCenter({ offsetX, offsetY }: OrbitalCenterProps) {
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
      <Ring diameter={320} sx={{ borderColor: '#244D59' }} />
      <Ring diameter={268} sx={{ borderColor: '#2A5A68' }} />
      <Ring
        diameter={200}
        sx={{
          borderColor: '#00E6D2',
          boxShadow: `inset 0 0 30px ${alpha('#00E6D2', 0.14)}`,
        }}
      />

      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          left: -200,
          top: -200,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse 70.71% 70.71% at 50% 50%, rgba(13,241,217,0.18) 0%, rgba(18,18,18,0) 65%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <OrbitalEmblem offsetX={offsetX} offsetY={offsetY} />
    </Box>
  )
}

function Ring({ diameter, sx }: { diameter: number; sx?: SxProps<Theme> }) {
  return (
    <Box
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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
