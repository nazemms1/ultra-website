'use client'

import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import OrbitalCard from './Services-orbital/OrbitalCard'

interface TestimonialData {
  text: string
  avatar: string
  top: string | number
  left?: string | number
  right?: string | number
}

const TESTIMONIALS: TestimonialData[] = [
  {
    text: 'Ultrawares transformed our vision into a seamless, scalable platform that exceeded all expectations.',
    avatar: '/images/contact/avatar-1.png',
    top: -150,
    left: '5%',
  },
  {
    text: 'Ultrawares transformed our vision into a seamless, scalable platform that exceeded all expectations.',
    avatar: '/images/contact/avatar-2.png',
    top: -50,
    left: '50%',
  },
  {
    text: 'Ultrawares transformed our vision into a seamless, scalable platform that exceeded all expectations.',
    avatar: '/images/contact/avatar-3.png',
    top: -100,
    right: '5%',
  },
]

export default function FloatingTestimonials() {
  const theme = useTheme()
  const primary = theme.palette.primary.main

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 0,
        pointerEvents: 'none',
        zIndex: 0,
        display: { xs: 'none', md: 'block' },
      }}
    >
      {TESTIMONIALS.map((t, i) => {
        const AvatarIcon = ({ size }: any) => (
          <img 
            src={t.avatar} 
            alt="avatar"
            style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }} 
            onError={(e: any) => { e.target.style.display = 'none' }}
          />
        )

        return (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              top: t.top,
              ...(t.left ? { left: t.left } : {}),
              ...(t.right ? { right: t.right } : {}),
              transform: t.left === '50%' ? 'translateX(-50%)' : 'none',
              zIndex: 0,
            }}
          >
            <OrbitalCard
              title=""
              description={`"${t.text}"`}
              Icon={AvatarIcon as any}
            />
          </Box>
        )
      })}
    </Box>
  )
}
