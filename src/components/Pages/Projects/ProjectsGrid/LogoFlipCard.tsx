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
    padding: '0px',
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
        width: 200,
        height: 110,
        perspective: 1200,
        cursor: 'default',
        transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: 'translate(-50%, -50%) scale(1)',
        '.project-grid-row:hover &': {
          transform: 'translate(-50%, -50%) scale(1.06)',
        },
      }}
    >
      <Box
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
        <Box
          sx={faceStyle}
        >
          {item.logo.src ? (
            <Box
              component="img"
              src={item.logo.src}
              alt={item.logo.alt}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          ) : (
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{item.title}</span>
          )}
        </Box>

        {/* ── Back face ── */}
        <Box
          sx={{
            ...faceStyle,
            transform: 'rotateY(180deg)',
          }}
        >
          {item.logoFlip?.src ? (
            <Box
              component="img"
              src={item.logoFlip.src}
              alt={item.logoFlip.alt}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          ) : item.logo.src ? (
            <Box
              component="img"
              src={item.logo.src}
              alt={item.logo.alt}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          ) : (
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{item.title}</span>
          )}
        </Box>
      </Box>
    </Box>
  )
}

