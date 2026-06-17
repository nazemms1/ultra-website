'use client'

import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'

type Props = {
  placeholder: string
  icon?: React.ElementType
  type?: string
  value: string
  onChange: (v: string) => void
}

export default function InputField({ placeholder, icon: Icon, type = 'text', value, onChange }: Props) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        px: '14px',
        py: '13px',
        borderRadius: '10px',
        border: `1px solid ${alpha(theme.palette.text.primary as string, 0.12)}`,
        bgcolor: theme.palette.background.elevated,
        transition: 'border-color 0.2s, box-shadow 0.2s',
        '&:focus-within': {
          borderColor: alpha(theme.palette.primary.main, 0.5),
          boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.07)}`,
        },
      }}
    >
      {Icon && (
        <Icon size={14} color={theme.palette.primary.main as string} strokeWidth={1.5} />
      )}
      <Box
        component="input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        sx={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '13px',
          letterSpacing: '0.02em',
          color: 'text.primary',
          '&::placeholder': {
            color: alpha(theme.palette.text.secondary as string, 0.45),
          },
        }}
      />
    </Box>
  )
}
