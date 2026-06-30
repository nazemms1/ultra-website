'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import type { RelatedProjectCard as RelatedProjectCardType } from '../types'
import CornerBrackets from '../shared/CornerBrackets'
import {
  relatedArrowSx,
  relatedCardSx,
  relatedDescriptionSx,
  relatedFooterSx,
  relatedLogoSlotSx,
  relatedTitleSx,
} from './constants'

type RelatedProjectCardProps = {
  project: RelatedProjectCardType
}

export default function RelatedProjectCard({ project }: RelatedProjectCardProps) {
  const theme = useTheme()
  const [hovered, setHovered] = useState(false)

  return (
    <Box
      component={Link}
      href={`/projects/${project.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      sx={relatedCardSx(theme, hovered)}
    >
      <CornerBrackets />

      <Box sx={relatedLogoSlotSx}>
        <Image
          src={project.logo.src}
          alt={project.logo.alt}
          width={project.logo.width}
          height={project.logo.height}
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </Box>

      <Box sx={relatedFooterSx}>
        <Box sx={{ flex: 1, minWidth: 0, position: 'relative', overflow: 'hidden' }}>
          <Typography sx={relatedTitleSx}>{project.title}</Typography>

          <AnimatePresence>
            {hovered ? (
              <Typography
                component={motion.p}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                sx={relatedDescriptionSx}
              >
                {project.description}
              </Typography>
            ) : null}
          </AnimatePresence>
        </Box>

        <Box sx={relatedArrowSx}>
          <ArrowUpRight size={20} color={theme.palette.primary.light} strokeWidth={2} />
        </Box>
      </Box>
    </Box>
  )
}
