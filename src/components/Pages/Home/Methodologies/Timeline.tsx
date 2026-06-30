'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { motion, useMotionTemplate, useTransform, type MotionValue } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface TimelineProps {
  labels: string[]
  progress: MotionValue<number>
  onSeek: (index: number) => void
}

export default function Timeline({ labels, progress, onSeek }: TimelineProps) {
  const t = useTranslations('Methodologies')
  const theme = useTheme()
  const primary = theme.palette.primary.main
  const total = labels.length
  const fillWidth = useMotionTemplate`${useTransform(progress, p => p * 100)}%`

  return (
    <Box sx={{ width: '100%', px: 'max(8px, calc((100vw - 1920px) / 2 + 220px))' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.25em',
            color: 'text.secondary',
          }}
        >
          {t('scrollToAdvance')}
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.25em',
            color: 'text.secondary',
          }}
        >
          {t('phases', { total })}
        </Typography>
      </Box>

      <Box
        sx={t => ({
          position: 'relative',
          mt: 1.5,
          height: '2px',
          width: '100%',
          overflow: 'hidden',
          borderRadius: '9999px',
          bgcolor: alpha(t.palette.common.white, 0.08),
        })}
      >
        <Box
          component={motion.div}
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            borderRadius: '9999px',
            bgcolor: 'primary.main',
            boxShadow: `0 0 10px ${alpha(primary, 0.7)}`,
          }}
          style={{ width: fillWidth }}
        />
      </Box>

      <Box
        sx={{
          mt: 1.5,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        {labels.map((label, i) => (
          <TimelineTick
            key={label}
            label={label}
            index={i}
            total={total}
            progress={progress}
            onSeek={onSeek}
            ariaLabel={t('goToPhase', { label })}
          />
        ))}
      </Box>
    </Box>
  )
}

function TimelineTick({
  label,
  index,
  total,
  progress,
  onSeek,
  ariaLabel,
}: {
  label: string
  index: number
  total: number
  progress: MotionValue<number>
  onSeek: (index: number) => void
  ariaLabel: string
}) {
  const theme = useTheme()
  const primary = theme.palette.primary.main

  const dist = useTransform(progress, p => Math.abs(index - p * (total - 1)))
  const opacity = useTransform(dist, d => 0.35 + 0.65 * Math.max(0, 1 - d))
  const dotScale = useTransform(dist, d => 1 + 0.35 * Math.max(0, 1 - d))
  const glow = useTransform(dist, d =>
    d < 0.5 ? `0 0 12px 2px ${alpha(primary, 0.7)}` : `0 0 0 ${alpha(primary, 0)}`,
  )

  return (
    <Box
      component={motion.button}
      type="button"
      onClick={() => onSeek(index)}
      style={{ opacity }}
      sx={{
        display: 'flex',
        flexShrink: 0,
        cursor: 'pointer',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        border: 'none',
        bgcolor: 'transparent',
        outline: 'none',
        p: 0,
        '&:hover [data-timeline-label]': { color: 'primary.main' },
      }}
      aria-label={ariaLabel}
    >
      <Box
        component={motion.span}
        sx={{
          display: 'block',
          width: 10,
          height: 10,
          borderRadius: '50%',
          bgcolor: 'primary.main',
        }}
        style={{ scale: dotScale, boxShadow: glow }}
      />
      <Typography
        data-timeline-label
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '11px',
          letterSpacing: '0.18em',
          color: 'text.primary',
          capitalize: 'uppercase',
          transition: 'color 0.2s',
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}
