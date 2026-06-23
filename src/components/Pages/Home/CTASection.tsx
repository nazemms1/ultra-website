'use client'

import { useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import AnimatedButton from '@/components/shared/AnimatedButton'

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
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '698px',
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
        <source src="/videos/colorflow-animation.mp4" type="video/mp4" />
      </video>

      <Box
        sx={theme => ({
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
            background: `linear-gradient(to bottom, ${theme.palette.background.default} 0%, transparent 100%)`,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '180px',
            background: `linear-gradient(to top, ${theme.palette.background.default} 0%, transparent 100%)`,
          },
        })}
      />

      <Box
        ref={cardRef}
        sx={theme => ({
          position: 'relative',
          zIndex: 3,
          mx: { xs: 3, md: 'auto' },
          width: '100%',
          maxWidth: 922,
          height: { xs: 'auto', md: 418 },
          minHeight: { xs: 320, md: 418 },
          overflow: 'hidden',
          px: { xs: 4, md: 10 },
          py: { xs: 6, md: 0 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 2, md: 3 },
          textAlign: 'center',
          willChange: 'transform',
          boxShadow: `inset 0 0 24px ${alpha(theme.palette.common.black, 0.03)}`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          backdropFilter: 'blur(10px) brightness(1.08) saturate(1.15)',
          WebkitBackdropFilter: 'blur(10px) brightness(1.08) saturate(1.15)',
          backgroundClip: 'padding-box',
          borderRadius: '50px',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            background: `linear-gradient(160deg, ${alpha(theme.palette.common.white, 0.025)} 0%, transparent 45%)`,
          },
        })}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 1.5, md: 2 },
            width: '100%',
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontFamily: "'Ethnocentric Rg', sans-serif",
              fontWeight: 700,
              fontSize: { xs: '28px', sm: '34px', md: '40px' },
              lineHeight: 1.15,
              letterSpacing: { xs: '1px', md: '1.5px' },
              textTransform: 'uppercase',
              color: 'text.primary',
              m: 0,
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
              fontSize: { xs: '15px', md: '16px' },
              lineHeight: 1.5,
              letterSpacing: '0.3px',
              color: 'text.secondary',
              maxWidth: 520,
              mx: 'auto',
              m: 0,
            }}
          >
            Let&apos;s talk about your product, your users, and how Ultrawares can help you ship it.
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            mt: { xs: 1, md: 2 },
          }}
        >
          <AnimatedButton variant="primary" href="#contact">
            Start a Project
          </AnimatedButton>
        </Box>
      </Box>
    </Box>
  )
}
