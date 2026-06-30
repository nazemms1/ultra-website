'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import {
  descriptionSx,
  eyebrowRowSx,
  eyebrowRuleSx,
  eyebrowTextSx,
  frostOverlaySx,
  heroContainerSx,
  heroContentSx,
  heroSectionSx,
  titleSx,
  VIDEO_SRC,
  videoSx,
} from './constants'

type ProjectsHeroProps = {
  videoSrc?: string
}

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 50, damping: 14 },
  },
}

export default function ProjectsHero({ videoSrc = VIDEO_SRC }: ProjectsHeroProps) {
  const t = useTranslations('ProjectsPage')

  return (
    <Box component="section" sx={heroSectionSx} aria-labelledby="projects-hero-heading">
      <Box component="video" autoPlay muted loop playsInline aria-hidden sx={videoSx}>
        <source src={videoSrc} type="video/mp4" />
      </Box>

      <Box sx={frostOverlaySx} aria-hidden />

      <Box sx={heroContainerSx}>
        <Stack
          component={motion.div}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          spacing={1.5}
          sx={heroContentSx}
        >
          <Box component={motion.div} variants={itemVariants} sx={eyebrowRowSx}>
            <Box sx={eyebrowRuleSx} aria-hidden />
            <Typography component="p" sx={eyebrowTextSx}>
              {t('eyebrow')}
            </Typography>
          </Box>

          <Typography
            id="projects-hero-heading"
            component={motion.h1}
            variants={itemVariants}
            sx={titleSx}
          >
            {t('titleLine1')}
            <Box component="span" sx={{ color: 'primary.light' }}>
              {t('titleAccent')}
            </Box>
            {t('titleLine2')}
          </Typography>

          <Typography component={motion.p} variants={itemVariants} sx={descriptionSx}>
            {t('description')}
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}
