'use client'

import { useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useInView } from 'framer-motion'
import { bodyFontFamily } from '@/theme/typography'
import { PARTNERS } from './data'
import PartnerLogo from './PartnerLogo'

export default function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 })

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="partners"
      sx={{
        position: 'relative',
        width: '100%',
        bgcolor: 'background.default',
        py: { xs: 5, md: '42px' },
        px: { xs: 3, sm: 5, md: '80px' },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          mx: 'auto',
          maxWidth: 1280,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, md: '15px' },
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontFamily: bodyFontFamily,
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '8px',
            textAlign: 'center',
            textTransform: 'uppercase',
            color: 'primary.main',
            width: '100%',
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          Our Partners
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 3, sm: 5, md: '100px' },
            width: '100%',
            minHeight: { xs: 200, md: 172 },
          }}
        >
          {PARTNERS.map((partner, index) => (
            <PartnerLogo key={partner.id} partner={partner} index={index} visible={isInView} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
