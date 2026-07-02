'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import { Link2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ProjectDetail } from '../types'
import BackLink from './BackLink'
import ProjectLogoCard from './ProjectLogoCard'
import PageHero from '@/components/shared/PageHero'
import { visitButtonSx } from './constants'

type ProjectDetailsHeroProps = {
  project: ProjectDetail
}

const DEFAULT_VIDEO_SRC = '/videos/colorflow-animation (3).mp4'

export default function ProjectDetailsHero({ project }: ProjectDetailsHeroProps) {
  const theme = useTheme()
  const t = useTranslations('ProjectDetails')

  const metaLabel = `${project.metaCategory} · ${project.year}`
  const videoSrc = project.backgroundVideo || DEFAULT_VIDEO_SRC

  const actions = (
    <Stack direction="row" spacing={2} useFlexGap sx={{ gap: 2, pt: 1, flexWrap: 'wrap' }}>
      {project.websiteUrl && (
        <Box
          component="a"
          href={project.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={visitButtonSx}
        >
          {t('visitWebsite')}
          <Link2 size={20} color="currentColor" strokeWidth={1.75} />
        </Box>
      )}

      {project.googlePlayUrl && (
        <Box
          component="a"
          href={project.googlePlayUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={visitButtonSx}
        >
          {t('googlePlay')}
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M3.25 2.302A2.001 2.001 0 0 0 2 4.07v15.86c0 .736.4 1.403 1.25 1.768l9.888-9.888L3.25 2.302zm11.233 7.81L18.06 7.64c.54-.37.94-.09.94.57v7.58c0 .66-.4.94-.94.57l-3.577-2.472-1.393-1.393 1.393-1.393zm-1.345-1.345L5.385 3.39c.47-.32 1.05-.33 1.58-.04l7.568 5.214-1.395 1.394zm1.395 6.467l-7.568 5.214c-.53.29-1.11.28-1.58-.04l7.753-5.378 1.395 1.394z"/>
            </svg>
          </Box>
        </Box>
      )}

      {project.appleStoreUrl && (
        <Box
          component="a"
          href={project.appleStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={visitButtonSx}
        >
          {t('appStore')}
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.71-1.16 1.85-1.02 2.96 1.1.09 2.23-.57 2.95-1.39z"/>
            </svg>
          </Box>
        </Box>
      )}
    </Stack>
  )

  return (
    <PageHero
      eyebrow={metaLabel}
      title={project.title}
      subtitle={project.shortDescription}
      videoSrc={videoSrc}
      aboveTitle={<BackLink label={t('backToProjects')} href="/projects" />}
      actions={actions}
    >
      <ProjectLogoCard logo={project.logo} cover={project.cover} logoImage={project.logoImage} />
    </PageHero>
  )
}

