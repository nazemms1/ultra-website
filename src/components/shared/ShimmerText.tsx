'use client'

import Box from '@mui/material/Box'
import type { BoxProps } from '@mui/material/Box'

type ShimmerTextProps = BoxProps<'span'>

export default function ShimmerText({ sx, className, ...props }: ShimmerTextProps) {
  return (
    <Box
      component="span"
      className={['ultra-shimmer-text', className].filter(Boolean).join(' ')}
      sx={sx}
      {...props}
    />
  )
}
