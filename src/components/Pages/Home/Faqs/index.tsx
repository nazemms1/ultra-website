'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import SectionHeader from '@/components/shared/SectionHeader'
import AnimatedButton from '@/components/shared/AnimatedButton'
import FAQCard from './FAQCard'
import { cardGlassSurface } from '@/lib/theme/surfaces'

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

interface FAQSectionProps {
  data?: {
    is_shown?: boolean
    title?: string | null
    subtitle?: string | null
    description?: string | null
    items?: Array<{
      id: number
      order: number
      question: string
      answer: string
    }>
  }
  stillHaveQuestionsData?: {
    is_shown?: boolean
    title?: string | null
    description?: string | null
    button_text?: string | null
  } | null
}

export default function FAQSection({ data, stillHaveQuestionsData }: FAQSectionProps) {
  if (data?.is_shown === false) return null

  const items = data?.items || []
  const sortedItems = [...items].sort((a, b) => a.order - b.order)
  const mappedFaqs = sortedItems.map(item => ({
    question: item.question,
    answer: item.answer,
  }))

  const finalFaqs = mappedFaqs.length > 0 ? mappedFaqs : faqs

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
          maxWidth: 1440,
          mx: 'auto',
          px: { xs: 3, sm: 5, md: '80px' },
          width: '100%',
        }}
      >
        <SectionHeader
          align="center"
          title={
            data?.title ? (
              data.title
            ) : (
              <>
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    mb: 1.25,
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 500,
                    fontSize: '12px',
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                    color: 'primary.main',
                  }}
                >
                  FAQ
                </Box>
                FREQUENTLY{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>
                  ASKED
                </Box>
              </>
            )
          }
          subtitle={
            data ? (data.subtitle || undefined) : "Everything you need to know before we plug into your stack."
          }
          sx={{
            mb: 6,
            '& h2': {
              fontSize: { xs: '30px', md: '42px' },
              lineHeight: 1.1,
              letterSpacing: '1.5px',
            },
            '& .MuiTypography-body1': {
              color: 'text.tertiary',
              fontSize: '14px',
              letterSpacing: '0.3px',
            },
          }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {finalFaqs.map(faq => (
            <FAQCard key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </Box>

        {(!stillHaveQuestionsData || stillHaveQuestionsData.is_shown !== false) && (
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
              ...cardGlassSurface(theme, { radius: '1.375rem' }),
              px: '20px',
              py: '16px',
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
                    fontSize: '17px',
                    color: 'text.primary',
                    lineHeight: '25.50px',
                    wordWrap: 'break-word',
                  }}
                >
                  {stillHaveQuestionsData ? stillHaveQuestionsData.title : 'Still have questions?'}
                </Typography>
                {(!stillHaveQuestionsData || stillHaveQuestionsData.description) && (
                  <Typography
                    sx={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 400,
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.55)',
                      lineHeight: '18px',
                    }}
                  >
                    {stillHaveQuestionsData ? stillHaveQuestionsData.description : 'Contact us now and we will answer you as soon as possible.'}
                  </Typography>
                )}
              </Box>
            </Box>

            {(!stillHaveQuestionsData || stillHaveQuestionsData.button_text) && (
              <AnimatedButton variant="primary" href="#contact">
                {stillHaveQuestionsData ? stillHaveQuestionsData.button_text : 'Contact Us'}
              </AnimatedButton>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}
