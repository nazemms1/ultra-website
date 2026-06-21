import { alpha } from '@mui/material/styles'
import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { Minus, Plus } from 'lucide-react'
import { cardGlassSurface } from '@/lib/theme/surfaces'

export default function FAQCard({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <Box
      onClick={() => setOpen(v => !v)}
      className="faq-card-root"
      sx={theme => ({
        // ...glassSurface(theme, { radius: '1.375rem' }),
        ...cardGlassSurface(theme, { radius: '1.375rem' }),
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        // borderColor: alpha(theme.palette.primary.main, 0.25),
        // boxShadow: `0px 4px 20px 0px rgba(0, 0, 0, 0.4), 0px 0px 12px 0px ${alpha(theme.palette.primary.main, 0.1)}`,
        transition:
          'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          //   borderColor: alpha(theme.palette.primary.main, 0.8),
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          boxShadow: [
            `0px 0px 15px 0px ${alpha(theme.palette.primary.main, 0.5)}`,
            `0px 0px 30px 2px ${alpha(theme.palette.primary.main, 0.2)}`,
            `0px 12px 40px -10px rgba(0, 0, 0, 0.7)`,
          ].join(', '),
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-60%',
          width: '30%',
          height: '100%',
          background: `linear-gradient(90deg, transparent 0%, ${alpha(theme.palette.common.white, 0.08)} 50%, transparent 100%)`,
          transform: 'skewX(-20deg)',
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'none',
        },
        '&:hover::before': {
          left: '130%',
          transition: 'left 1.8s cubic-bezier(0.25, 1, 0.5, 1)',
        },
      })}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          px: { xs: '1.25rem', md: '1.75rem' },
          py: '1.375rem',
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 500,
            fontSize: '15px',
            lineHeight: '22px',
            letterSpacing: '0.2px',
            color: 'text.primary',
          }}
        >
          {question}
        </Typography>

        <Box
          sx={theme => ({
            flexShrink: 0,
            width: '30px',
            height: '30px',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'primary.main',
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
            backdropFilter: 'blur(33px)',
            WebkitBackdropFilter: 'blur(33px)',
            boxShadow: [
              `inset 1px 1px 16px 0px ${alpha(theme.palette.common.white, 0.13)}`,
              `inset -1px -1px 16px 0px ${alpha(theme.palette.common.white, 0.05)}`,
              '0px 57px 80px -20px rgba(0,0,0,0.30)',
            ].join(', '),
            transition:
              'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',

            '.faq-card-root:hover &': {
              transform: 'scale(1.08)',
              bgcolor: alpha(theme.palette.primary.main, 0.35),
              borderColor: alpha(theme.palette.primary.main, 1),
              boxShadow: [
                `0px 0px 15px 0px ${alpha(theme.palette.primary.main, 0.6)}`,
                `inset 1px 1px 10px 0px ${alpha(theme.palette.common.white, 0.2)}`,
              ].join(', '),
            },
          })}
        >
          {open ? (
            <Minus size={13} color="currentColor" />
          ) : (
            <Plus size={13} color="currentColor" />
          )}
        </Box>
      </Box>

      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          maxHeight: open ? '300px' : '0px',
          overflow: 'hidden',
          transition: theme =>
            theme.transitions.create('max-height', {
              duration: theme.transitions.duration.short,
              easing: theme.transitions.easing.sharp,
            }),
        }}
      >
        <Box
          sx={theme => ({
            height: '1px',
            background: alpha(theme.palette.common.white, 0.1),
            margin: '0 1.75rem',
          })}
        />
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '22px',
            letterSpacing: '0.2px',
            color: 'text.tertiary',
            px: { xs: '1.25rem', md: '1.75rem' },
            pt: '1rem',
            pb: '1.375rem',
          }}
        >
          {answer}
        </Typography>
      </Box>
    </Box>
  )
}
