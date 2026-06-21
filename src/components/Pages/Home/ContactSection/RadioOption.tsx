'use client'

import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { ColoredSvg } from '@/components/shared/ColoredSvg'
import { selectionPillSx } from './constants'
import type { RadioOptionProps } from './types'

export default function RadioOption({
  label,
  checked,
  onChange,
  name,
  disabled = false,
}: RadioOptionProps) {
  const theme = useTheme()

  return (
    <Box
      component="label"
      sx={{
        ...selectionPillSx(theme, checked),
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        pointerEvents: disabled ? 'none' : 'auto',
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
        disabled={disabled}
        disableRipple
        size="small"
        checkedIcon={
          <ColoredSvg
            src="/images/contact/check-1.svg"
            sx={{ color: 'primary.main' }}
            glyphPx={16}
          />
        }
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
