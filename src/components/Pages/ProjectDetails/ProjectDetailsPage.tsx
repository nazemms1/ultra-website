'use client'

import Box from '@mui/material/Box'
import type { ProjectDetail } from './types'
import ProjectDetailsHero from './Hero/ProjectDetailsHero'
import BriefProcessSection from './BriefProcess/BriefProcessSection'
import ProjectDemoSection from './Demo/ProjectDemoSection'
import RelatedProjectsSection from './RelatedProjects/RelatedProjectsSection'

type ProjectDetailsPageProps = {
  project: ProjectDetail
}

export default function ProjectDetailsPage({ project }: ProjectDetailsPageProps) {
  return (
    <Box component="main" sx={{ bgcolor: 'background.default' }}>
      <ProjectDetailsHero project={project} />
      <BriefProcessSection project={project} />
      <ProjectDemoSection project={project} />
      <RelatedProjectsSection projects={project.relatedProjects} />
    </Box>
  )
}
