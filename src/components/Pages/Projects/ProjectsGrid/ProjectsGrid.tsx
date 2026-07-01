'use client'

import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import ProjectGridRow from './ProjectGridRow'
import ProjectsPagination from './ProjectsPagination'
import {
  ITEMS_PER_PAGE,
  marginWrapperSx,
  panelSx,
  rowLayoutForIndex,
  rowsListSx,
  sectionSx,
} from './constants'
import { resolveProjectGridItems } from './data'
import type { PortfoliosApiData } from './types'

type ProjectsGridProps = {
  data?: PortfoliosApiData | null
}

export default function ProjectsGrid({ data }: ProjectsGridProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const items = useMemo(() => resolveProjectGridItems(data), [data])

  if (data?.is_shown === false || items.length === 0) {
    return null
  }

  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const pageOffset = (safePage - 1) * ITEMS_PER_PAGE
  const pageItems = items.slice(pageOffset, pageOffset + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <Box component="section" id="projects-grid" sx={sectionSx}>
      <Box sx={marginWrapperSx}>
        <Box sx={panelSx}>
          <Box sx={rowsListSx}>
            {pageItems.map((item, index) => {
              const globalIndex = pageOffset + index

              return (
                <ProjectGridRow
                  key={item.id}
                  item={item}
                  index={globalIndex}
                  layout={rowLayoutForIndex(globalIndex)}
                />
              )
            })}
          </Box>
        </Box>
      </Box>

      <ProjectsPagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* SVG Clip Paths for Projects Rows (Bottleneck layouts) */}
      <svg width="0" height="0" style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <clipPath id="row-clip-left" clipPathUnits="objectBoundingBox">
            <path d="M 0.05,0 L 0.45,0 C 0.5,0 0.5,0.15 0.55,0.15 L 0.95,0.15 Q 1,0.15 1,0.2 L 1,0.8 Q 1,0.85 0.95,0.85 L 0.55,0.85 C 0.5,0.85 0.5,1 0.45,1 L 0.05,1 Q 0,1 0,0.95 L 0,0.05 Q 0,0 0.05,0 Z" />
          </clipPath>
          <clipPath id="row-clip-right" clipPathUnits="objectBoundingBox">
            <path d="M 0.05,0.15 L 0.45,0.15 C 0.5,0.15 0.5,0 0.55,0 L 0.95,0 Q 1,0 1,0.05 L 1,0.95 Q 1,1 0.95,1 L 0.55,1 C 0.5,1 0.5,0.85 0.45,0.85 L 0.05,0.85 Q 0,0.85 0,0.8 L 0,0.2 Q 0,0.15 0.05,0.15 Z" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  )
}
