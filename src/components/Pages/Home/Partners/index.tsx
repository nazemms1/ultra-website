'use client'

import { useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useInView } from 'framer-motion'
import { bodyFontFamily } from '@/theme/typography'
import PartnerLogo from './PartnerLogo'

interface PartnersSectionProps {
  data?: {
    is_shown?: boolean
    title?: string
    items?: Array<{
      id: number
      title: string | null
      url: string | null
      normal_logo: { url: string }
      hover_logo: { url: string }
    }>
  }
}

export default function PartnersSection({ data }: PartnersSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 })

  if (data?.is_shown === false) return null

  const items = data?.items || []

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="partners"
      sx={{
        position: 'relative',
        width: '100%',
        py: { xs: 5, md: '42px' },
        px: { xs: 3, sm: 5, md: 'max(80px, calc((100vw - 1920px) / 2 + 220px))' },
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
          {data?.title || 'Our Partners'}
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
          {items.map((item, index) => {
            const partner = {
              id: String(item.id),
              name: item.title || `Partner ${item.id}`,
              cyanSrc: item.normal_logo?.url,
              colorSrc: item.hover_logo?.url,
              slotWidth: 188,
              slotHeight: 144,
            }
            return (
              <PartnerLogo key={partner.id} partner={partner} index={index} visible={isInView} />
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
