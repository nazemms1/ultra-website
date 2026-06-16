'use client'

import Box from '@mui/material/Box'
import type { BoxProps } from '@mui/material/Box'

type SectionShellProps = BoxProps & {
  id?: string
}

export default function SectionShell({ id, children, sx, ...props }: SectionShellProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        position: 'relative',
        py: { xs: 10, md: 12 },
        px: { xs: 3, md: 6 },
        overflow: 'hidden',
        bgcolor: 'background.default',
        ...sx,
      }}
      {...props}
    >
      <Box sx={{ maxWidth: 1280, mx: 'auto', width: '100%', position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  )
}
