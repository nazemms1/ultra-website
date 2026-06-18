'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { ContactSubmitButtonProps } from './types'

export default function ContactSubmitButton({ disabled, onClick }: ContactSubmitButtonProps) {
  const theme = useTheme()

  return (
    <motion.div
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{ display: 'inline-flex' }}
    >
      <Box
        component="button"
        type="submit"
        disabled={disabled}
        onClick={onClick}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          minWidth: { xs: '100%', sm: 295 },
          height: 60,
          px: '52px',
          py: '18px',
          borderRadius: '9999px',
          border: 'none',
          cursor: disabled ? 'default' : 'pointer',
          bgcolor: alpha(theme.palette.common.white, 0.08),
          color: disabled ? alpha(theme.palette.text.primary, 0.3) : theme.palette.text.primary,
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 600,
          fontSize: '20px',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          transition: 'background-color 0.25s, color 0.25s',
          '&:hover:not(:disabled)': {
            bgcolor: alpha(theme.palette.common.white, 0.12),
          },
        }}
      >
        <Typography
          component="span"
          sx={{
            font: 'inherit',
            letterSpacing: 'inherit',
            textTransform: 'inherit',
          }}
        >
          Submit
        </Typography>
        <ArrowRight
          size={19}
          strokeWidth={2}
          color={
            disabled
              ? alpha(theme.palette.text.primary, 0.3)
              : (theme.palette.text.primary as string)
          }
        />
      </Box>
    </motion.div>
  )
}
