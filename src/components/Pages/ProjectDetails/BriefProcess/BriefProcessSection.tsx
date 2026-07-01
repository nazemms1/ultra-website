'use client'

import Box from '@mui/material/Box'
import type { ProjectDetail } from '../types'
import { sectionShellSx } from '../constants'
import BriefArticle from './BriefArticle'
import MetricsSidebar from './MetricsSidebar'
import { briefArticlesSx, briefGridSx, briefSectionSx, metricsStickySx } from './constants'

type BriefProcessSectionProps = {
  project: ProjectDetail
}

export default function BriefProcessSection({ project }: BriefProcessSectionProps) {
  return (
    <Box component="section" sx={briefSectionSx}>
      <Box sx={sectionShellSx}>
        <Box sx={briefGridSx}>
          <Box sx={briefArticlesSx}>
            {project.brief.map((block, index) => (
              <BriefArticle key={block.number} block={block} index={index} />
            ))}
          </Box>

          <Box sx={metricsStickySx}>
            <MetricsSidebar metrics={project.metrics} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
