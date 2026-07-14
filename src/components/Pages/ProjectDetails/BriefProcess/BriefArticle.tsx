'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import type { BriefBlock } from '../types'
import { briefBodySx, briefCardSx, briefNumberSx, briefTitleSx } from './constants'

type BriefArticleProps = {
  block: BriefBlock
  index: number
}

export default function BriefArticle({ block, index }: BriefArticleProps) {
  const theme = useTheme()
  return (
    <Box
      component={motion.article}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 50, damping: 14, delay: index * 0.08 }}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: { xs: '12px', sm: 3 },
        alignItems: 'flex-start',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <Typography
        component="span"
        sx={{
          ...briefNumberSx,
          width: { xs: '35px', sm: 90 },
          fontSize: { xs: 24, sm: 36 },
          px: { xs: 0, sm: 2.5 },
          py: { xs: 0, sm: 2.5 },
          lineHeight: { xs: '24px', sm: '30px' },
          flexShrink: 0,
        }}
      >
        {block.number}
      </Typography>

      <Box
        sx={{
          ...briefCardSx(theme),
          width: { xs: '292.34368896484375px', sm: '100%' },
          minHeight: { xs: '241.875px', sm: 'auto' },
          height: 'auto',
          borderRadius: { xs: '16.02px', sm: '25px' },
          p: { xs: '12.81px', sm: 2.5 },
          flex: { xs: 'none', sm: 1 },
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Typography
          component="h2"
          sx={{
            ...briefTitleSx,
            fontSize: { xs: 18, sm: 28 },
            lineHeight: { xs: '24px', sm: '40px' },
          }}
        >
          {block.title}
        </Typography>
        <Typography
          component="p"
          sx={{
            ...briefBodySx,
            fontSize: { xs: 14, sm: 18 },
            lineHeight: { xs: '22px', sm: '29.25px' },
            pt: { xs: 1, sm: 2 },
          }}
        >
          {block.body}
        </Typography>
      </Box>
    </Box>
  )
}
