'use client'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { Monitor, Smartphone, LayoutDashboard } from 'lucide-react'
import type { DemoView, DemoViewId } from '../types'
import { demoChipSx } from './constants'

const VIEW_ICONS: Record<DemoViewId, typeof Smartphone> = {
  mobile: Smartphone,
  web: Monitor,
  admin: LayoutDashboard,
}

type DemoFilterChipsProps = {
  views: readonly DemoView[]
  activeViewId: DemoViewId
  onChange: (id: DemoViewId) => void
}

export default function DemoFilterChips({ views, activeViewId, onChange }: DemoFilterChipsProps) {
  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.125 }}>
      {views.map(view => {
        const active = view.id === activeViewId
        const Icon = VIEW_ICONS[view.id]

        return (
          <Box
            key={view.id}
            component="button"
            type="button"
            onClick={() => onChange(view.id)}
            sx={demoChipSx(theme, active)}
          >
            <Icon size={14} color="currentColor" strokeWidth={1.75} />
            {view.label}
          </Box>
        )
      })}
    </Box>
  )
}
