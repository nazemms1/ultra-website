'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { AnimatePresence, motion } from 'framer-motion'
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
            '&:hover img': {
              transform: 'translateY(calc(-100% + 56.25%))',
              transition: 'transform 4s ease-in-out',
            },
            '& img': {
              transition: 'transform 1s ease-in-out',
            },
          }}
        >
            <Box
              component="img"
              src={screenshot.src}
              alt={screenshot.alt}
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
                objectPosition: 'top center',
                transform: 'translateY(0)',
              }}
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
          mx: 'auto',
          filter: `drop-shadow(30px 20px 40px ${alpha(theme.palette.common.black, 0.45)})`,
        }}
      >
        {/* Screenshot Image inside mock screen */}
        <Box
          sx={{
            position: 'absolute',
            top: '2.5%',
            bottom: '2.5%',
            left: '5.2%',
            right: '5.2%',
            borderRadius: '32px',
            overflow: 'hidden',
            bgcolor: 'background.paper',
            zIndex: 1,
          }}
        >
          <Box
            component="img"
            src={screenshot.src}
            alt={screenshot.alt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        {/* Mock Bezel on top */}
        <Box
          component="img"
          src="/images/mobile-mock.png"
          alt="Mobile Mockup Frame"
          sx={{
            position: 'relative',
            width: '100%',
            height: 'auto',
            display: 'block',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />
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
