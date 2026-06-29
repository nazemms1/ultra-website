'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import Image from 'next/image'
import type { DemoScreenshot } from '../types'
import { screenshotPanelSx, screenshotThumbSx, screenshotTitleSx } from './constants'

type ScreenshotNavigatorProps = {
  screenshots: readonly DemoScreenshot[]
  activeIndex: number
  onSelect: (index: number) => void
}

export default function ScreenshotNavigator({
  screenshots,
  activeIndex,
  onSelect,
}: ScreenshotNavigatorProps) {
  const theme = useTheme()
  const thumbHeight = 86
  const thumbGap = 10
  const trackHeight = screenshots.length * thumbHeight + (screenshots.length - 1) * thumbGap
  const thumbOffset = activeIndex * (thumbHeight + thumbGap)
  const thumbRatio = trackHeight > 0 ? (thumbHeight / trackHeight) * 100 : 30
  const thumbTop = trackHeight > 0 ? (thumbOffset / trackHeight) * 100 : 0

  return (
    <Box sx={screenshotPanelSx}>
      <Typography sx={screenshotTitleSx}>Screenshots</Typography>

      <Box sx={{ display: 'flex', gap: 1.875, alignItems: 'flex-start' }}>
        <Box
          sx={{
            position: 'relative',
            width: 6,
            height: trackHeight,
            borderRadius: '50px',
            bgcolor: alpha(theme.palette.common.white, 0.2),
            opacity: 0.5,
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              insetInlineStart: 0,
              width: '100%',
              top: `${thumbTop}%`,
              height: `${thumbRatio}%`,
              borderRadius: 'inherit',
              bgcolor: 'primary.light',
              transition: 'top 0.35s ease, height 0.35s ease',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {screenshots.map((shot, index) => (
            <Box
              key={shot.id}
              component="button"
              type="button"
              onClick={() => onSelect(index)}
              sx={screenshotThumbSx(theme, index === activeIndex)}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="157px"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
