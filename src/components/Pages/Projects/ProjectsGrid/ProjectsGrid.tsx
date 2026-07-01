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
    </Box>
  )
}
