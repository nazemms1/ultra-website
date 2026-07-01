'use client'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { Monitor, Smartphone, LayoutDashboard } from 'lucide-react'
import type { DemoView, DemoViewId } from '../types'
import { demoChipSx } from './constants'

const getLucideIconForView = (label: string) => {
  const titleLower = label.toLowerCase()
  const isMobile =
    titleLower.includes('تطبيق') ||
    titleLower.includes('mobile') ||
    titleLower.includes('app') ||
    titleLower.includes('موب') ||
    titleLower.includes('جوال') ||
    titleLower.includes('هاتف')
    
  const isAdmin =
    titleLower.includes('لوحة') ||
    titleLower.includes('admin') ||
    titleLower.includes('dashboard') ||
    titleLower.includes('تحكم') ||
    titleLower.includes('إدارة') ||
    titleLower.includes('اداره')

  if (isMobile) return Smartphone
  if (isAdmin) return LayoutDashboard
  return Monitor
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
        const Icon = getLucideIconForView(view.label)

        return (
          <Box
            key={view.id}
            component="button"
            type="button"
            onClick={() => onChange(view.id)}
            sx={{
              ...demoChipSx(theme, active),
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              height: 44,
              px: 2.5,
              whiteSpace: 'nowrap',
              width: 'auto',
              flexShrink: 0,
            }}
          >
            {view.icon ? (
              <Box
                component="img"
                src={view.icon}
                alt={`${view.label} icon`}
                sx={{
                  width: 20,
                  height: 20,
                  objectFit: 'contain',
                  flexShrink: 0,
                }}
              />
            ) : (
              Icon && <Icon size={18} color="currentColor" strokeWidth={1.75} sx={{ flexShrink: 0 }} />
            )}
            <Box
              component="span"
              sx={{
                fontSize: 14,
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              {view.label}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
