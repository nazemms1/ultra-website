'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import type { DemoScreenshot } from '../types'

type DeviceShowcaseProps = {
  device: 'mobile' | 'desktop'
  screenshot: DemoScreenshot
  index: number
}

function LaptopFrame({ screenshot }: { screenshot: DemoScreenshot }) {
  const theme = useTheme()

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 930, mx: 'auto' }}>
      <Box
        sx={{
          position: 'relative',
          mx: 'auto',
          width: '100%',
          maxWidth: 754,
          borderRadius: '26px 26px 4px 4px',
          border: `2px solid ${alpha(theme.palette.common.white, 0.15)}`,
          bgcolor: '#1a202c',
          p: '5px',
          boxShadow: `0 40px 80px ${alpha(theme.palette.common.black, 0.55)}`,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 10',
            borderRadius: '20px 20px 2px 2px',
            overflow: 'hidden',
            bgcolor: 'common.black',
          }}
        >
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            fill
            sizes="(max-width: 900px) 90vw, 720px"
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
            priority
          />
        </Box>
      </Box>

      <Box
        sx={{
          mx: 'auto',
          mt: '-2px',
          width: '100%',
          maxWidth: 930,
          height: 14,
          borderRadius: '2px 2px 0 0',
          background: `linear-gradient(180deg, #a3acb1 0%, ${alpha(theme.palette.common.white, 0.35)} 100%)`,
        }}
      />
    </Box>
  )
}

function PhoneFrame({ screenshot, index }: { screenshot: DemoScreenshot; index: number }) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 245,
        filter: `drop-shadow(76px 25px 64px ${alpha(theme.palette.primary.dark, 0.15)})`,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '245 / 496',
          borderRadius: '32px',
          border: `3px solid ${alpha(theme.palette.common.white, 0.2)}`,
          bgcolor: '#e8eef2',
          p: '10px',
          boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.common.white, 0.35)}`,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 72,
            height: 22,
            borderRadius: '12px',
            bgcolor: alpha(theme.palette.common.black, 0.85),
            zIndex: 2,
          }}
        />

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '22px',
            overflow: 'hidden',
            bgcolor: 'background.paper',
          }}
        >
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            fill
            sizes="245px"
            style={{ objectFit: 'cover' }}
          />

          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: alpha(theme.palette.background.default, 0.35),
              opacity: screenshot.src.includes('etihad') ? 0 : 0.65,
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Ethnocentric Rg', sans-serif",
                fontSize: 64,
                color: alpha(theme.palette.primary.light, 0.35),
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default function DeviceShowcase({ device, screenshot, index }: DeviceShowcaseProps) {
  return (
    <AnimatePresence mode="wait">
      <Box
        key={`${device}-${screenshot.id}`}
        component={motion.div}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        {device === 'mobile' ? (
          <PhoneFrame screenshot={screenshot} index={index} />
        ) : (
          <LaptopFrame screenshot={screenshot} />
        )}
      </Box>
    </AnimatePresence>
  )
}
