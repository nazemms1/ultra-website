'use client'

import { useRef } from 'react'
import Box from '@mui/material/Box'
import { useInView } from 'framer-motion'
import StatItem from './StatItem'
import { STATS } from './data'

interface StatsProps {
  data?: {
    is_shown?: boolean
    title?: string | null
    items?: Array<{
      title: string
      value: number
      symbol: string
    }>
  }
}

export default function Stats({ data }: StatsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 })

  if (data?.is_shown === false) return null

  const items = data?.items || []
  const mappedStats = items.map((item, i) => ({
    value: item.value,
    suffix: item.symbol || '',
    label: item.title,
    entranceDelay: i * 0.18,
    entranceDuration: 0.65 + i * 0.1,
    countDuration: Math.max(1.5, 2.6 - i * 0.4),
  }))

  const statsList = mappedStats.length > 0 ? mappedStats : STATS

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="stats"
      sx={{
        position: 'relative',
        width: '100%',
        mt: { xs: -6, md: -8 },
        pt: { xs: 7, md: '52px' },
        pb: { xs: 6, md: 8 },
        overflow: { xs: 'hidden', md: 'visible' },
      }}
    >
      <Box
        sx={theme => ({
          maxWidth: theme.breakpoints.values.xl,
          mx: 'auto',
          px: { xs: 3, sm: 5, md: 'max(80px, calc((100vw - 1920px) / 2 + 220px))' },
          display: { xs: 'grid', md: 'flex' },
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' },
          flexDirection: { md: 'row' },
          flexWrap: { md: 'nowrap' },
          justifyContent: { md: 'center' },
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: { xs: 4, md: 4 },
          pb: { xs: 2, md: 0 },
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        })}
      >
        {statsList.map(stat => (
          <StatItem key={stat.label} stat={stat} active={isInView} />
        ))}
      </Box>
    </Box>
  )
}
