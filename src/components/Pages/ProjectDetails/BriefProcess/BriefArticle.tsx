'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import type { BriefBlock } from '../types'
import {
  briefBodySx,
  briefCardSx,
  briefNumberSx,
  briefTitleSx,
} from './constants'

type BriefArticleProps = {
  block: BriefBlock
  index: number
}

export default function BriefArticle({ block, index }: BriefArticleProps) {
  return (
    <Box
      component={motion.article}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 50, damping: 14, delay: index * 0.08 }}
      sx={{ display: 'flex', gap: { xs: 2, sm: 3 }, alignItems: 'flex-start', width: '100%' }}
    >
      <Typography component="span" sx={briefNumberSx}>
        {block.number}
      </Typography>

      <Box sx={briefCardSx}>
        <Typography component="h2" sx={briefTitleSx}>
          {block.title}
        </Typography>
        <Typography component="p" sx={briefBodySx}>
          {block.body}
        </Typography>
      </Box>
    </Box>
  )
}
