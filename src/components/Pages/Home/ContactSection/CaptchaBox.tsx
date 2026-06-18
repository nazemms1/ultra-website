'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { captchaBoxSx } from './constants'

type CaptchaBoxProps = {
  checked: boolean
  onToggle: () => void
}

export default function CaptchaBox({ checked, onToggle }: CaptchaBoxProps) {
  const theme = useTheme()

  return (
    <Box component="button" type="button" onClick={onToggle} sx={captchaBoxSx(theme)}>
      <Box
        sx={{
          width: 18,
          height: 18,
          borderRadius: '4px',
          border: `1.5px solid ${
            checked ? theme.palette.primary.main : alpha(theme.palette.common.white, 0.25)
          }`,
          bgcolor: checked ? theme.palette.primary.main : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.2s',
        }}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
            <polyline
              points="1,4 3.5,6.5 9,1"
              stroke={theme.palette.primary.contrastText}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </Box>
      <Typography
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '13px',
          letterSpacing: '0.05em',
          color: alpha(theme.palette.text.secondary, 0.75),
        }}
      >
        I am not a robot
      </Typography>
    </Box>
  )
}
