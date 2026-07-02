'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import type { ContactSubmitButtonProps } from './types'

export default function ContactSubmitButton({
  disabled,
  onClick,
  label,
}: ContactSubmitButtonProps) {
  const theme = useTheme()
  const isRtl = theme.direction === 'rtl'

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
          bgcolor: disabled ? alpha(theme.palette.common.white, 0.08) : '#0DF1D9',
          color: disabled ? alpha(theme.palette.text.primary, 0.3) : '#060E10',
          boxShadow: disabled ? 'none' : '0px 0px 23.23px 0px #01B1B180',
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 600,
          fontSize: '20px',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          transition: 'background-color 0.25s, box-shadow 0.25s',
          '&:hover:not(:disabled)': {
            bgcolor: '#7FFFF4',
            boxShadow: '0px 0px 36px 0px #01B1B1B3',
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
          {label}
        </Typography>
        {isRtl ? (
          <ArrowLeft
            size={19}
            strokeWidth={2}
            color={disabled ? alpha(theme.palette.text.primary, 0.3) : '#060E10'}
          />
        ) : (
          <ArrowRight
            size={19}
            strokeWidth={2}
            color={disabled ? alpha(theme.palette.text.primary, 0.3) : '#060E10'}
          />
        )}
      </Box>
    </motion.div>
  )
}
