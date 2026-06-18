'use client'

import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { selectionPillSx } from './constants'
import type { RadioOptionProps } from './types'

export default function RadioOption({ label, checked, onChange, name }: RadioOptionProps) {
  const theme = useTheme()

  return (
    <Box
      component="label"
      sx={{
        ...selectionPillSx(theme, checked),
        '& .MuiRadio-root': {
          p: 0,
          color: alpha(theme.palette.common.white, 0.25),
          '&.Mui-checked': {
            color: 'primary.main',
          },
        },
      }}
    >
      <Radio
        checked={checked}
        onChange={onChange}
        name={name}
        value={label}
        disableRipple
        size="small"
      />
      <Typography
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '15px',
          fontWeight: 500,
          letterSpacing: '0.02em',
          color: checked ? 'text.primary' : alpha(theme.palette.text.primary, 0.65),
          transition: 'color 0.2s',
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}
