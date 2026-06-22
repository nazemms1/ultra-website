'use client'

import { useRef } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useInView } from 'framer-motion'
import StatItem from './StatItem'
import { STATS } from './data'

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 })

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="stats"
      sx={() => {
        return {
          position: 'relative',
          width: '100%',
          pt: { xs: 5, md: '60px' },
          pb: { xs: 6, md: 8 },
          overflow: 'hidden',
        }
      }}
    >
      <Grid
        container
        spacing={{ xs: 4, md: 4 }}
        sx={{
          maxWidth: 1440,
          mx: 'auto',
          px: { xs: 3, sm: 5, md: '80px' },
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {STATS.map(stat => (
          <StatItem key={stat.label} stat={stat} active={isInView} />
        ))}
      </Grid>
    </Box>
  )
}
