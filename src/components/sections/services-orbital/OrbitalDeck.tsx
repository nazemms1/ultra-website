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
import { SERVICES, type ServiceItem } from './data'

const R_DOT = 134
const R_CARD = R_DOT + 8 + CARD_W / 2  
 const DECK = (R_CARD + CARD_H / 2 + 40) * 2  
const CENTER = DECK / 2

const EMBLEM_PATH_A =
  'M8.9231 14.8325C9.48125 19.1045 12.5182 34.5605 18.9041 32.5765C26.2257 30.3845 28.5076 17.6325 29.2299 11.0725C29.7716 7.39251 35.1889 7.92051 34.9591 11.6485C34.7457 12.8325 34.4338 14.0005 34.1218 15.1685C32.1355 22.4005 27.9494 33.8405 19.2653 35.2005C10.3513 36.4325 9.13649 20.8165 8.9231 14.8325Z'
const EMBLEM_PATH_B =
  'M25.4876 18.7845C26.3084 14.3205 27.5068 2.92848 21.3835 1.80848C13.159 0.784479 6.72394 10.0485 3.4243 16.3205C2.98106 17.1845 1.88118 17.5365 0.994708 17.1045C0.0425729 16.6245 -0.28575 15.4725 0.272399 14.5925C4.55701 7.76045 12.486 -1.67952 21.7447 0.256478C28.9185 2.19248 26.8829 13.5205 25.4876 18.7845Z'

interface OrbitalDeckProps {
  baseSpeed?: number
  onActivate: (index: number | null) => void
}

export default function OrbitalDeck({ baseSpeed = 7, onActivate }: OrbitalDeckProps) {
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

      <OrbitalCenter />

      {SERVICES.map((service, i) => (
        <OrbitalSpoke
          key={service.title}
          spin={spin}
          service={service}
          onHoverStart={() => {
            onActivate(i)
            pause()
          }}
          onHoverEnd={() => {
            onActivate(null)
            resume()
          }}
        />
      ))}

       <Box
        aria-hidden
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: '0 0 0 auto',
          zIndex: 20,
          width: '40%',
          background: `linear-gradient(to right, transparent 0%, rgba(18,18,18,0.65) 55%, rgba(18,18,18,0.95) 100%)`,
        }}
      />
    </Box>
  )
}

interface OrbitalSpokeProps {
  spin: MotionValue<number>
  service: ServiceItem
  onHoverStart: () => void
  onHoverEnd: () => void
}

function OrbitalSpoke({ spin, service, onHoverStart, onHoverEnd }: OrbitalSpokeProps) {
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
              onHoverStart={onHoverStart}
              onHoverEnd={onHoverEnd}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const SECTION_BG = '#121212'

function OrbitalCenter() {
  const theme = useTheme()
  const primary = theme.palette.primary.main
  const bgDefault = SECTION_BG

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
          background: 'radial-gradient(ellipse 70.71% 70.71% at 50% 50%, rgba(13,241,217,0.18) 0%, rgba(18,18,18,0) 65%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          left: -40,
          top: -40,
          width: 80,
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="svg"
          width={64}
          height={66}
          viewBox="0 0 35 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          sx={{ filter: `drop-shadow(0 0 18px ${alpha(primary, 0.65)})` }}
        >
          <path d={EMBLEM_PATH_A} fill={primary} />
          <path d={EMBLEM_PATH_B} fill={theme.palette.secondary.main} />
        </Box>
      </Box>
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
