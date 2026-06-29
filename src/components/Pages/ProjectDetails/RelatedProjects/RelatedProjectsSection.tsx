'use client'

import Box from '@mui/material/Box'
import { useTranslations } from 'next-intl'
import type { RelatedProjectCard as RelatedProjectCardType } from '../types'
import { sectionHeadingSx, sectionShellSx } from '../constants'
import RelatedProjectCard from './RelatedProjectCard'
import { relatedGridSx, relatedSectionSx } from './constants'

type RelatedProjectsSectionProps = {
  projects: readonly RelatedProjectCardType[]
}

export default function RelatedProjectsSection({ projects }: RelatedProjectsSectionProps) {
  const t = useTranslations('ProjectDetails')

  if (projects.length === 0) return null

  return (
    <Box component="section" sx={relatedSectionSx}>
      <Box sx={sectionShellSx}>
        <Box component="h2" sx={{ ...sectionHeadingSx, mb: { xs: 4, md: '39px' } }}>
          {t('moreProjects')}
        </Box>

        <Box sx={relatedGridSx}>
          {projects.map(project => (
            <RelatedProjectCard key={project.id} project={project} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
