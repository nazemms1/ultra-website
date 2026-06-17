'use client'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

type Props = {
  direction: 'left' | 'right'
  onClick: () => void
}

export default function ScrollArrow({ direction, onClick }: Props) {
  const theme = useTheme()
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 28,
        height: 28,
        flexShrink: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.primary.main,
        opacity: 0.7,
        transition: 'opacity 0.2s',
        '&:hover': { opacity: 1 },
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{ transform: direction === 'left' ? 'rotate(180deg)' : 'none' }}
      >
        <polyline
          points="2,4 8,8 2,12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <polyline
          points="8,4 14,8 8,12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </Box>
  )
}
