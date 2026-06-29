'use client'

import { useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { highlightKeywords } from '@/components/shared/SectionHeader'

interface CTASectionProps {
  data?: {
    is_shown?: boolean
    title?: string | null
    description?: string | null
    button_text?: string | null
    video?: {
      url: string
    } | null
  }
}

export default function CTASection({ data }: CTASectionProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const isRtl = theme.direction === 'rtl'

  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      const card = cardRef.current
      if (!card) {
        rafId.current = requestAnimationFrame(tick)
        return
      }

      current.current.x = lerp(current.current.x, target.current.x, 0.1)
      current.current.y = lerp(current.current.y, target.current.y, 0.1)

      card.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`
      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const section = sectionRef.current
    if (!section) return
    const rect = section.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    target.current = { x: nx * 40, y: ny * 40 }

    // Update mouse coordinates relative to the card for the interactive hover light glow
    const card = cardRef.current
    if (card) {
      const cardRect = card.getBoundingClientRect()
      const x = e.clientX - cardRect.left
      const y = e.clientY - cardRect.top
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    }
  }

  const handleMouseLeave = () => {
    target.current = { x: 0, y: 0 }
    const card = cardRef.current
    if (card) {
      // Reset position to center when mouse leaves
      card.style.setProperty('--mouse-x', '-999px')
      card.style.setProperty('--mouse-y', '-999px')
    }
  }

  if (data?.is_shown === false) return null

  const renderTitle = (title?: string | null) => {
    if (!title) {
      return (
        <>
          Ready to build something{' '}
          <Box component="span" sx={{ color: '#0DF1D9' }}>
            ultra
          </Box>
          ?
        </>
      )
    }

    const words = title.trim().split(/\s+/)
    if (words.length === 0) return ''

    const highlightWords = (str: string) => {
      const parts = str.split(/(ultrawares|ultra|الترا)/gi)
      return parts.map((part, index) => {
        const lower = part.toLowerCase()
        if (lower === 'ultra' || lower === 'ultrawares' || part === 'الترا') {
          return (
            <Box component="span" key={index} sx={{ color: '#0DF1D9' }}>
              {part}
            </Box>
          )
        }
        return part
      })
    }

    if (words.length === 1) {
      return (
        <Box component="span" sx={{ color: '#0DF1D9' }}>
          {words[0]}
        </Box>
      )
    }

    const lastWord = words.pop() || ''
    const prefix = words.join(' ')

    return (
      <>
        {highlightWords(prefix)}{' '}
        <Box component="span" sx={{ color: '#0DF1D9' }}>
          {lastWord}
        </Box>
      </>
    )
  }

  const videoUrl =
    (typeof data?.video === 'string' ? data.video : data?.video?.url) ||
    '/videos/colorflow-animation.mp4'

  return (
    <Box
      ref={sectionRef}
      component="section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'relative',
        overflow: 'clip',
        height: '888px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      <Box
        sx={() => ({
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
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
          },
        })}
      />

      <Box
        ref={cardRef}
        sx={theme => ({
          position: 'relative',
          zIndex: 100,
          mx: { xs: 2, md: 4 },
          height: '60%',
          width: { xs: 'calc(100% - 32px)', md: 'calc(100% - 64px)' },
          maxWidth: 1120,
          p: { xs: '40px 24px', md: '150px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(20px) brightness(1.10) saturate(1.15)',
          WebkitBackdropFilter: 'blur(20px) brightness(1.08) saturate(1.15)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: [
            '0 8px 96px 0 rgba(0, 0, 0, 0.55)',
            `inset 1px 1px 0 0 ${alpha(theme.palette.common.white, 0.71)}`,
            `inset -1px -1px 0 0 rgba(0, 0, 0, 0.15)`,
          ].join(', '),
          backgroundClip: 'padding-box',
          borderRadius: '50px',
        })}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Title */}
          {(!data || data.title) && (
            <Typography
              component="h2"
              sx={{
                fontFamily: "'Nulshock', sans-serif",
                fontWeight: '700',
                fontSize: { xs: '26px', sm: '36px', md: '43.88px' }, // Exact Figma 43.88px
                lineHeight: '54.85px', // Exact Figma 54.85px
                color: '#ffffff',
                letterSpacing: '0.5px',
                m: 0,
                maxWidth: 760, // Figma width 760
              }}
            >
              {renderTitle(data?.title)}
            </Typography>
          )}

          {/* Subtitle */}
          {(!data || data.description) && (
            <Box sx={{ width: '100%', pt: '22px', pb: '2px' }}>
              <Typography
                sx={{
                  color: '#ffffff', // Figma color: white
                  fontSize: { xs: '16px', md: '20px' }, // Exact Figma 20px
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: '400',
                  lineHeight: '26px', // Exact Figma 26px
                  maxWidth: 680,
                  mx: 'auto',
                }}
              >
                {data
                  ? highlightKeywords(data.description ?? '')
                  : "Let's talk about your product, your users, and how Ultrawares can help you ship it."}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Button Container */}
        {(!data || data.button_text) && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              mt: '40px', // Figma top 40 offset
            }}
          >
            <Box
              component="a"
              href="#contact"
              sx={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '15.48px 30.97px', // Exact Figma padding values
                background: '#0DF1D9', // Figma background Color
                boxShadow: '0px 0px 23.22px rgba(1, 177, 177, 0.50)', // Exact Figma glow
                borderRadius: '100px', // Fully rounded pill shape
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 0px 32px rgba(13, 241, 217, 0.80)',
                  filter: 'brightness(1.1)',
                },
              }}
            >
              <Typography
                sx={{
                  color: '#121212', // Figma color
                  fontSize: '18px', // Exact Figma 18px
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  lineHeight: '18.58px', // Exact Figma 18.58px
                  letterSpacing: '0.62px', // Exact Figma 0.62px
                }}
              >
                {data ? data.button_text : 'Start a project'}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}
