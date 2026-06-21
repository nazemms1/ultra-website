'use client'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { captchaBoxSx } from './constants'
import { ColoredSvg } from '@/components/shared/ColoredSvg'

type CaptchaBoxProps = {
  checked: boolean
  onToggle: () => void
}

export default function CaptchaBox({ checked, onToggle }: CaptchaBoxProps) {
  const theme = useTheme()

  return (
    <Box component="label" sx={captchaBoxSx(theme, checked)}>
      <Checkbox
        checked={checked}
        onChange={() => onToggle()}
        disableRipple
        size="small"
        checkedIcon={
          <ColoredSvg
            src="/images/contact/check-3.svg"
            sx={{ color: 'primary.main' }}
            glyphPx={20}
          />
        }
        sx={{
          p: 0,
          color: alpha(theme.palette.common.white, 0.25),
          '&.Mui-checked': {
            color: 'primary.main',
          },
        }}
      />
      <Typography
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '13px',
          letterSpacing: '0.05em',
          color: checked ? 'text.primary' : alpha(theme.palette.text.secondary, 0.75),
          transition: 'color 0.2s',
        }}
      >
        I am not a robot
      </Typography>
    </Box>
  )
}
