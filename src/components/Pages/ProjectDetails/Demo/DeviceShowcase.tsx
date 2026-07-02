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
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 930,
        mx: 'auto',
        filter: `drop-shadow(30px 20px 40px ${alpha(theme.palette.common.black, 0.45)})`,
      }}
    >
      {/* Mock Bezel (Background) */}
      <Box
        component="img"
        src="/images/web-desktop.png"
        alt="Laptop Mockup Frame"
        sx={{
          position: 'relative',
          width: '100%',
          height: 'auto',
          display: 'block',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Screenshot Image inside mock screen (Foreground) */}
      <Box
        sx={{
          position: 'absolute',
          top: '9.2%',
          bottom: '24.2%',
          left: '13.3%',
          right: '13.3%',
          overflowY: 'auto',
          bgcolor: 'common.black',
          zIndex: 2,
          borderRadius: '4px',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0.1)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '2px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(255, 255, 255, 0.3)',
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
            minHeight: '100%',
            display: 'block',
            objectFit: 'cover',
            objectPosition: 'top center',
          }}
        />
      </Box>
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
            overflowY: 'auto',
            bgcolor: 'background.paper',
            zIndex: 1,
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
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
