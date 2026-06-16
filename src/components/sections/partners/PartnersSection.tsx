'use client'

import Image from 'next/image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect, useRef, useState } from 'react'
import { Handshake } from 'lucide-react'
 
const partners = [
  { name: 'Partner 1', logo: '/images/partners/partners-1.png' },
  { name: 'Partner 2', logo: '/images/partners/partners-2.png' },
  { name: 'Partner 3', logo: '/images/partners/partners-3.png' },
  { name: 'Partner 4', logo: '/images/partners/partners-4.png' },
]

export default function PartnersSection() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        position: 'relative',
        py: { xs: 6, md: 8 },
        px: { xs: 3, sm: 5, md: '80px' },
        mx: 'auto',
        maxWidth: 1440,
        height: '455px',
        width: '100%',
        overflow: 'hidden',
      }}
    >
       <Typography
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '8px',
          textAlign: 'center',
          textTransform: 'uppercase',
          color: 'primary.main',
          mb: 5,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        Our Partners
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '21px',
        }}
      >
        {partners.map((partner, i) => (
          <Box
            key={partner.name}
            sx={{
              width: '241.89px',
              height: '91.3px',
              position: 'relative',
              flexShrink: 0,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(12px)',
              transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image src={partner.logo} alt={partner.name} fill style={{ objectFit: 'contain' }} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
