import { alpha } from '@mui/material/styles'
import { useState } from 'react'
import { Box, Typography, Collapse } from '@mui/material'
import { Minus, Plus } from 'lucide-react'
import { cardGlassSurface } from '@/lib/theme/surfaces'

export default function FAQCard({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <Box
      onClick={() => setOpen(v => !v)}
      className="faq-card-root"
      sx={theme => ({
        ...cardGlassSurface(theme, { radius: '1.375rem' }),
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition:
          'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
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
            fontWeight: 600,
            fontSize: '19px',
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
            border: '1px solid transparent',
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            backdropFilter: 'blur(20px) brightness(1.08) saturate(1.15)',
            WebkitBackdropFilter: 'blur(20px) brightness(1.08) saturate(1.15)',
            boxShadow: [
              `inset 1px 1px 0 0 ${alpha(theme.palette.primary.main, 0.5)}`,
              `inset -1px -1px 0 0 ${alpha(theme.palette.primary.main, 0.5)}`,
            ].join(', '),
            transition:
              'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
            '.faq-card-root:hover &': {
              transform: 'scale(1.08)',
              bgcolor: alpha(theme.palette.primary.main, 0.125),
              boxShadow: [
                `inset 1px 1px 0 0 ${alpha(theme.palette.primary.main, 0.5)}`,
                `0 8px 96px 0 ${alpha(theme.palette.common.white, 0.25)}`,
                `inset -1px -1px 0 0 ${alpha(theme.palette.primary.main, 0.5)}`,
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

      <Collapse in={open}>
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
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
              fontSize: '16px',
              lineHeight: '27.20px',
              letterSpacing: '0.2px',
              color: 'rgba(255, 255, 255, 0.70)',
              px: { xs: '1.25rem', md: '1.75rem' },
              pt: '1rem',
              pb: '1.375rem',
            }}
          >
            {answer}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  )
}
