'use client'

import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import { useTranslations } from 'next-intl'
import type { ProjectDetail, DemoViewId } from '../types'
import { sectionHeadingSx, sectionShellSx } from '../constants'
import DemoFilterChips from './DemoFilterChips'
import ScreenshotNavigator from './ScreenshotNavigator'
import DeviceShowcase from './DeviceShowcase'
import { demoHeaderSx, demoSectionSx, demoStageSx } from './constants'

type ProjectDemoSectionProps = {
  project: ProjectDetail
}

export default function ProjectDemoSection({ project }: ProjectDemoSectionProps) {
  const t = useTranslations('ProjectDetails')
  const [activeViewId, setActiveViewId] = useState<DemoViewId>(project.demoViews[0]?.id ?? 'web')
  const [activeShotIndex, setActiveShotIndex] = useState(0)

  const activeView = useMemo(
    () => project.demoViews.find(view => view.id === activeViewId) ?? project.demoViews[0],
    [activeViewId, project.demoViews],
  )

  const handleViewChange = (id: DemoViewId) => {
    setActiveViewId(id)
    setActiveShotIndex(0)
  }

  if (!activeView) return null

  const activeScreenshot = activeView.screenshots[activeShotIndex] ?? activeView.screenshots[0]

  return (
    <Box component="section" sx={demoSectionSx}>
      <Box sx={sectionShellSx}>
        <Box sx={demoHeaderSx}>
          <Box component="h2" sx={sectionHeadingSx}>
            {t('demo')}
          </Box>
          <DemoFilterChips
            views={project.demoViews}
            activeViewId={activeView.id}
            onChange={handleViewChange}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 3 },
            alignItems: { xs: 'stretch', md: 'flex-start' },
          }}
        >
          <ScreenshotNavigator
            screenshots={activeView.screenshots}
            activeIndex={activeShotIndex}
            onSelect={setActiveShotIndex}
          />

          <Box sx={demoStageSx}>
            {activeScreenshot ? (
              <DeviceShowcase
                device={activeView.device}
                screenshot={activeScreenshot}
                index={activeShotIndex}
              />
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
