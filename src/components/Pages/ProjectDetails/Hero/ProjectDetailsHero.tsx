'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { Link2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ProjectDetail } from '../types'
import BackLink from './BackLink'
import ProjectLogoCard from './ProjectLogoCard'
import {
  descriptionSx,
  heroContainerSx,
  heroSectionSx,
  metaTagSx,
  titleSx,
  visitButtonSx,
} from './constants'

const VIDEO_SRC = '/videos/colorflow-animation (3).mp4'

type ProjectDetailsHeroProps = {
  project: ProjectDetail
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

export default function ProjectDetailsHero({ project }: ProjectDetailsHeroProps) {
  const theme = useTheme()
  const t = useTranslations('ProjectDetails')

  const metaLabel = `${project.metaCategory} · ${project.year}`

  return (
    <Box component="section" sx={heroSectionSx}>
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.5,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: `linear-gradient(180deg, ${alpha(theme.palette.background.default, 0.35)} 0%, ${alpha(theme.palette.background.default, 0.75)} 55%, ${theme.palette.background.default} 100%)`,
        }}
        aria-hidden
      />

      <Box sx={heroContainerSx}>
        <BackLink label={t('backToProjects')} href="/projects" />

        <Box
          component={motion.div}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: { xs: 5, md: 0 },
            pt: { xs: 4, md: 10 },
            width: '100%',
          }}
        >
          <Stack
            spacing={{ xs: 3, md: 3.75 }}
            sx={{
              maxWidth: { md: 695 },
              flex: 1,
              pb: { md: 5 },
              pr: { md: 5 },
            }}
          >
            <Stack spacing={{ xs: 1.5, md: 1.5 }}>
              <Typography component={motion.p} variants={itemVariants} sx={metaTagSx}>
                {metaLabel}
              </Typography>

              <Typography component={motion.h1} variants={itemVariants} sx={titleSx}>
                {project.title}
              </Typography>

              <Typography component={motion.p} variants={itemVariants} sx={descriptionSx}>
                {project.shortDescription}
              </Typography>
            </Stack>

            {project.websiteUrl ? (
              <Box component={motion.div} variants={itemVariants}>
                <Box
                  component="a"
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={visitButtonSx}
                >
                  {t('visitWebsite')}
                  <Link2 size={24} color="currentColor" strokeWidth={1.75} />
                </Box>
              </Box>
            ) : null}
          </Stack>

          <ProjectLogoCard logo={project.logo} cover={project.cover} logoImage={project.logoImage} />
        </Box>
      </Box>
    </Box>
  )
}
