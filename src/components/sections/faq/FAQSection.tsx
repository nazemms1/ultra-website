'use client'

import { useState, useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { Plus, Minus } from 'lucide-react'
import { glassSurface } from '@/lib/theme/surfaces'
import UltraButton from '@/components/shared/UltraButton'

const faqs = [
  {
    question: 'What makes Ultrawares VPS different from typical hosting?',
    answer:
      'Our VPS infrastructure is built for performance-first workloads — NVMe storage, dedicated vCPUs, and ultra-low latency networking that typical shared hosting simply cannot match.',
  },
  {
    question: 'Do you handle both UI/UX strategy and visual execution?',
    answer:
      'Yes. We cover the full design pipeline from user research and wireframing to pixel-perfect UI delivery and developer handoff, all under one roof.',
  },
  {
    question: 'Native, hybrid, or cross-platform — which path do you recommend?',
    answer:
      'It depends on your goals. We assess budget, performance needs, and audience before recommending a path. Most clients benefit from a cross-platform approach with native-level performance.',
  },
  {
    question: 'How are projects scoped and priced?',
    answer:
      'We start with a discovery session to define scope, then provide a fixed-price proposal. No surprises — just clear deliverables and timelines agreed upfront.',
  },
  {
    question: 'Can you operate across Syria and the UAE?',
    answer:
      'Absolutely. Our team is distributed across both regions, allowing us to serve clients locally while maintaining international delivery standards.',
  },
]

function FAQCard({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const shimmerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    const shimmer = shimmerRef.current
    const card = cardRef.current
    if (!shimmer || !card) return

    shimmer.style.transition = 'none'
    shimmer.style.left = '-100%'
    shimmer.getBoundingClientRect()
    shimmer.style.transition = 'left 3.5s ease'
    shimmer.style.left = '150%'

    card.style.transition = 'transform 0.3s ease'
    card.style.transform = 'translateY(-6px) scale(1.01)'
    card.classList.add('ultra-faq-card-hover')
  }

  const handleMouseLeave = () => {
    const shimmer = shimmerRef.current
    const card = cardRef.current
    if (!shimmer || !card) return
    shimmer.style.transition = 'none'
    shimmer.style.left = '-100%'

    card.classList.remove('ultra-faq-card-hover')
    card.style.transition = 'transform 0.3s ease'
    card.style.transform = 'translateY(0) scale(1)'
  }

  return (
    <Box
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setOpen(v => !v)}
      sx={theme => ({
        ...glassSurface(theme, { radius: '1.375rem' }),
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      })}
    >
      <Box
        ref={shimmerRef}
        sx={theme => ({
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '60%',
          height: '100%',
          background: `linear-gradient(105deg, transparent 30%, ${alpha(theme.palette.common.white, 0.03)} 50%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
        })}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
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
            transition: 'all 0.2s ease',
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
          zIndex: 1,
          maxHeight: open ? '300px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
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

export default function FAQSection() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        py: { xs: 10, md: 12 },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={theme => ({
          position: 'absolute',
          top: 0,
          right: '-320px',
          width: '558px',
          height: '861px',
          borderRadius: '9999px',
          background: `radial-gradient(70.71% 70.71% at 50% 50%, ${alpha(theme.palette.primary.main, 0.28)} 0%, ${alpha(theme.palette.primary.main, 0.06)} 50%, rgba(0,0,0,0) 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        })}
      />

      <Box
        sx={theme => ({
          position: 'absolute',
          top: '150px',
          left: '-380px',
          width: '777px',
          height: '777px',
          borderRadius: '9999px',
          background: `radial-gradient(70.71% 70.71% at 50% 50%, ${alpha(theme.palette.primary.main, 0.28)} 0%, ${alpha(theme.palette.primary.main, 0.06)} 50%, rgba(0,0,0,0) 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        })}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1120px',
          mx: 'auto',
          px: { xs: 3, lg: '40px' },
          width: '100%',
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 500,
            fontSize: '12px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'primary.main',
            textAlign: 'center',
            mb: '10px',
          }}
        >
          FAQ
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Ethnocentric Rg', sans-serif",
            fontWeight: 400,
            fontSize: { xs: '30px', md: '42px' },
            lineHeight: 1.1,
            letterSpacing: '1.5px',
            textAlign: 'center',
            color: 'text.primary',
            mb: '12px',
          }}
        >
          FREQUENTLY{' '}
          <Box component="span" sx={{ color: 'primary.main' }}>
            ASKED
          </Box>
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 400,
            fontSize: '14px',
            letterSpacing: '0.3px',
            color: 'text.tertiary',
            textAlign: 'center',
            mb: '48px',
          }}
        >
          Everything you need to know before we plug into your stack.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {faqs.map(faq => (
            <FAQCard key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </Box>

        <Box
          sx={theme => ({
            mt: '40px',
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            width: { xs: '100%', sm: '663px' },
            px: '20px',
            py: '16px',
            borderRadius: '12px',
            border: `1px solid ${alpha(theme.palette.common.white, 0.07)}`,
            background: alpha(theme.palette.background.default, 0.6),
          })}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Box
              sx={theme => ({
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: alpha(theme.palette.primary.main, 0.08),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: 'primary.main',
              })}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  fontSize: '14px',
                  color: 'text.primary',
                  lineHeight: '20px',
                }}
              >
                Still have questions?
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 400,
                  fontSize: '12px',
                  color: 'text.tertiary',
                  lineHeight: '18px',
                }}
              >
                Contact us now and we will answer you as soon as possible.
              </Typography>
            </Box>
          </Box>

          <UltraButton variant="primary" href="#contact">
            Contact Us
          </UltraButton>
        </Box>
      </Box>
    </Box>
  )
}
