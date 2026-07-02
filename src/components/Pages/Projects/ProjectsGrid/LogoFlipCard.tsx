'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import Image from 'next/image'
import type { ProjectGridItem } from './types'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { glassSurface } from '@/lib/theme/surfaces'

type LogoFlipCardProps = {
  item: ProjectGridItem
  imageOnLeft: boolean
}

export default function LogoFlipCard({ item, imageOnLeft }: LogoFlipCardProps) {
  const theme = useTheme()
  const rotateY   = useMotionValue(0)
  const cardScale = useMotionValue(1)

  const frontOpacity = useTransform(rotateY, [0, 89, 90, 180], [1, 1, 0, 0])
  const backOpacity  = useTransform(rotateY, [0, 89, 90, 180], [0, 0, 1, 1])

  function onEnter() {
    animate(cardScale, 1.06, { duration: 0.18, ease: 'easeOut' })
    animate(rotateY,   180,  { duration: 0.65, ease: [0.4, 0, 0.2, 1] })
  }

  function onLeave() {
    animate(cardScale, 1,   { duration: 0.2,  ease: 'easeIn' })
    animate(rotateY,   0,   { duration: 0.65, ease: [0.4, 0, 0.2, 1] })
  }

  const faceStyle = {
    ...glassSurface(theme, { radius: '16px', tint: 0.06 }),
    position: 'absolute',
    inset: 0,
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    overflow: 'hidden',
    padding: '12px',
  }

  return (
    <motion.div
      onHoverStart={onEnter}
      onHoverEnd={onLeave}
      style={{
        scale: cardScale,
        position: 'absolute',
        top: '50%',
        left: imageOnLeft ? '22.5%' : 'auto',
        right: !imageOnLeft ? '22.5%' : 'auto',
        translateY: '-50%',
        translateX: '-50%',
        zIndex: 10,
        width: 200,
        height: 110,
        perspective: 1200,
        cursor: 'default',
      }}
    >
      <motion.div
        style={{
          rotateY,
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        {/* ── Front face — logo image ── */}
        <Box
          component={motion.div}
          style={{ opacity: frontOpacity }}
          sx={faceStyle}
        >
          {item.logo.src ? (
            <Image
              src={item.logo.src}
              alt={item.logo.alt}
              width={item.logo.width}
              height={item.logo.height}
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          ) : (
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{item.title}</span>
          )}
        </Box>

        {/* ── Back face — same logo, flipped ── */}
        <Box
          component={motion.div}
          style={{ opacity: backOpacity, rotateY: 180 }}
          sx={faceStyle}
        >
          {item.logo.src ? (
            <Image
              src={item.logo.src}
              alt={item.logo.alt}
              width={item.logo.width}
              height={item.logo.height}
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          ) : (
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{item.title}</span>
          )}
        </Box>
      </motion.div>
    </motion.div>
  )
}

