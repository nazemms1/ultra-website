'use client'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { useTheme } from '@mui/material/styles'
import { contactFieldSx } from './constants'
import type { InputFieldProps } from './types'

export default function InputField({
  placeholder,
  icon: Icon,
  type = 'text',
  value,
  onChange,
}: InputFieldProps) {
  const theme = useTheme()

  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      slotProps={{
        input: {
          startAdornment: Icon ? (
            <InputAdornment position="start">
              <Icon size={16} color={theme.palette.primary.main} strokeWidth={1.5} />
            </InputAdornment>
          ) : undefined,
        },
      }}
      sx={contactFieldSx(theme)}
    />
  )
}
