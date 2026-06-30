'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import SectionHeader from '@/components/shared/SectionHeader'
import AnimatedButton from '@/components/shared/AnimatedButton'
import FAQCard from './FAQCard'
import { cardGlassSurface } from '@/lib/theme/surfaces'

const faqs = [
  
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
  const theme = useTheme()
  const isRtl = theme.direction === 'rtl'

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
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: isRtl
            ? 'linear-gradient(to bottom, #121212 100%, rgba(18,18,18,0) 100%)'
            : 'linear-gradient(to bottom, #121212 0%, rgba(18,18,18,0) 100%)',
          zIndex: 0,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: isRtl
            ? 'linear-gradient(to top, #121212 100%, rgba(18,18,18,0) 100%)'
            : 'linear-gradient(to top, #121212 0%, rgba(18,18,18,0) 100%)',
          zIndex: 0,
          pointerEvents: 'none',
        },
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
          width: '100%',
          px: { xs: 3, sm: 5, md: 'max(80px, calc((100vw - 1920px) / 2 + 220px))' },
        }}
      >
        <SectionHeader
          align="center"
          subtitle={data?.title ?? 'Frequently Asked'}
          title={data?.subtitle ?? 'FREQUENTLY ASKED'}
          description={data?.description ?? undefined}
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
                    {stillHaveQuestionsData
                      ? stillHaveQuestionsData.description
                      : 'Contact us now and we will answer you as soon as possible.'}
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
