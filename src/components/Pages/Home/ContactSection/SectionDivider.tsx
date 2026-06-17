'use client'

import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'

export default function SectionDivider() {
  const theme = useTheme()
  return (
    <Box
      sx={{
        height: '1px',
        bgcolor: alpha(theme.palette.primary.main, 0.1),
        my: '28px',
      }}
    />
  )
}
