'use client'

import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import { motion, useReducedMotion } from 'framer-motion'

export type SectionHeaderAlign = 'left' | 'center' | 'right'

export interface SectionHeaderProps {
  title: ReactNode
  subtitle?: ReactNode
  description?: ReactNode
  align?: SectionHeaderAlign
  sx?: SxProps<Theme>
}

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const
const VIEWPORT = { once: true, amount: 0.2 } as const

const alignSx: Record<SectionHeaderAlign, SxProps<Theme>> = {
  left: { textAlign: 'left' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
}

export function highlightKeywords(text: string) {
  if (!text) return ''
  const parts = text.split(/(ultra|الترا)/gi)
  return parts.map((part, index) => {
    const lower = part.toLowerCase()
    if (lower === 'ultra' || part === 'الترا') {
      return (
        <Box component="span" key={index} sx={{ color: '#0DF1D9' }}>
          {part}
        </Box>
      )
    }
    return part
  })
}

export function formatSubtitleText(text: string) {
  if (!text) return ''
  const words = text.trim().split(/\s+/)
  if (words.length === 0) return ''

  if (words.length === 1) {
    return (
      <Box component="span" sx={{ color: '#0DF1D9' }}>
        {words[0]}
      </Box>
    )
  }

  const firstWord = words[0]
  const lastWord = words[words.length - 1]
  const middleWords = words.slice(1, -1).join(' ')

  return (
    <>
      <Box component="span" sx={{ color: '#FAFAFA' }}>
        {firstWord}
      </Box>
      {middleWords ? ` ${middleWords} ` : ' '}
      <Box component="span" sx={{ color: '#0DF1D9' }}>
        {lastWord}
      </Box>
    </>
  )
}

export function formatHeadingText(text: string) {
  if (!text) return ''
  const words = text.trim().split(/\s+/)
  if (words.length === 0) return ''

  const highlightWords = (str: string) => {
    const parts = str.split(/(ultrawares|ultra|الترا)/gi)
    return parts.map((part, index) => {
      const lower = part.toLowerCase()
      if (lower === 'ultra' || lower === 'ultrawares' || part === 'الترا') {
        return (
          <Box component="span" key={index} sx={{ color: '#0DF1D9' }}>
            {part}
          </Box>
        )
      }
      return part
    })
  }

  if (words.length === 1) {
    return (
      <Box component="span" sx={{ color: '#0DF1D9' }}>
        {words[0]}
      </Box>
    )
  }

  const lastWord = words.pop() || ''
  const prefix = words.join(' ')

  return (
    <>
      {highlightWords(prefix)}{' '}
      <Box component="span" sx={{ color: '#0DF1D9' }}>
        {lastWord}
      </Box>
    </>
  )
}

export default function SectionHeader({
  title,
  subtitle,
  description,
  align = 'center',
  sx,
}: SectionHeaderProps) {
  const reduceMotion = useReducedMotion()

  return (
    <Box
      component={motion.div}
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: REVEAL_EASE }}
      sx={[
        alignSx[align],
        {
          mb: { xs: 5, md: 6 },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {subtitle ? (
        <Typography
          sx={{
            mb: { xs: 1.5, md: 2 },
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: '24px',
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#0DF1D9',
            wordWrap: 'break-word',
            mx: align === 'center' ? 'auto' : undefined,
          }}
        >
          {subtitle}
        </Typography>
      ) : null}

      <Typography
        component="h2"
        sx={{
          color: '#FAFAFA',
          fontSize: { xs: '1.75rem', md: '43.88px' },
          fontFamily: "'Nulshock', 'Almarai', sans-serif !important",
          fontWeight: '700 !important',
          lineHeight: '52.66px',
          textTransform: 'uppercase',
          wordWrap: 'break-word',
        }}
      >
        {typeof title === 'string' ? formatHeadingText(title) : title}
      </Typography>
      {description ? (
        <Typography
          sx={{
            mt: { xs: 1.5, md: 2 },
            color: 'text.secondary',
            fontWeight: '400',
            fontSize: 18,
            maxWidth: align === 'center' ? 640 : 'none',
            mx: align === 'center' ? 'auto' : undefined,
          }}
        >
          {typeof description === 'string' ? highlightKeywords(description) : description}
        </Typography>
      ) : null}
    </Box>
  )
}
