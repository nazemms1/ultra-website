'use client'

import { useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import AnimatedButton from '@/components/shared/AnimatedButton'
import { cardGlassSurface } from '@/lib/theme/surfaces'

export default function CTASection() {
  const cardRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

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

      card.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`
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
  }

  const handleMouseLeave = () => {
    target.current = { x: 0, y: 0 }
  }

  return (
    <Box
      ref={sectionRef}
      component="section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={theme => ({
        position: 'relative',
        overflow: 'hidden',
        height: '698px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: `linear-gradient(to bottom, ${theme.palette.background.default} 0%, transparent 100%)`,
          zIndex: 2,
          pointerEvents: 'none',
        },

        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: `linear-gradient(to top, ${theme.palette.background.default} 0%, transparent 100%)`,
          zIndex: 2,
          pointerEvents: 'none',
        },
      })}
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
          zIndex: 0,
        }}
      >
        <source src="/videos/colorflow-animation.mp4" type="video/mp4" />
      </video>

      <Box
        sx={theme => ({
          position: 'absolute',
          inset: 0,
          // background: alpha(theme.palette.background.default, 0.2),
          zIndex: 1,
        })}
      />

      <Box
        ref={cardRef}
        sx={theme => ({
          position: 'relative',
          zIndex: 3,
          mx: { xs: 3, md: 'auto' },
          width: { xs: '100%', md: '922px' },
          height: { md: '418px' },
          borderRadius: '50px',
          px: { xs: '40px', md: '80px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          willChange: 'transform',
           backdropFilter: 'blur(20px) saturate(1.4)',
           border: `1px solid ${alpha(theme.palette.primary.darker, 0.3)}`,
        ...cardGlassSurface
        })}
      >
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 500,
            fontSize: '12px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'primary.main',
            mb: '10px',
          }}
        >
          Let&apos;s build together
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Ethnocentric Rg', sans-serif",
            fontWeight: 400,
            fontSize: { xs: '28px', md: '40px' },
            lineHeight: 1.1,
            letterSpacing: '1.5px',
            color: 'text.primary',
            mb: '12px',
          }}
        >
          READY TO BUILD SOMETHING{' '}
          <Box component="span" sx={{ color: 'primary.main' }}>
            ULTRA?
          </Box>
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 400,
            fontSize: '14px',
            letterSpacing: '0.3px',
            color: 'text.secondary',
            mb: '36px',
            mx: 'auto',
          }}
        >
          Let&apos;s talk about your product, your users, and how Ultrawares can help you ship it.
        </Typography>

        <AnimatedButton variant="primary" href="#contact">
          Start a Project
        </AnimatedButton>
      </Box>
    </Box>
  )
}
