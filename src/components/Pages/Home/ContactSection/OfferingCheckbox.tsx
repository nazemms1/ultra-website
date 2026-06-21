'use client'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { ColoredSvg } from '@/components/shared/ColoredSvg'
import { selectionPillSx } from './constants'
import type { OfferingCheckboxProps } from './types'

export default function OfferingCheckbox({ label, checked, onChange }: OfferingCheckboxProps) {
  const theme = useTheme()

  return (
    <Box
      component="label"
      sx={{
        ...selectionPillSx(theme, checked),
        '& .MuiCheckbox-root': {
          p: 0,
          color: alpha(theme.palette.common.white, 0.25),
          '&.Mui-checked': {
            color: 'primary.main',
          },
        },
      }}
    >
      <Checkbox
        checked={checked}
        onChange={onChange}
        disableRipple
        size="small"
        checkedIcon={
          <ColoredSvg
            src="/images/contact/check-2.svg"
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
