'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { motion } from 'framer-motion'
import ShimmerText from '@/components/shared/ShimmerText'
import { eyebrowBadgeSx, glowOrb } from '@/lib/theme/surfaces'

type PageHeroProps = {
  eyebrow: string
  title: React.ReactNode
  subtitle?: string
  videoSrc?: string
  height?: string | number
  align?: 'left' | 'center'
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 50, damping: 14 },
  },
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  videoSrc,
  height,
  align = 'center',
}: PageHeroProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        height: height || 'auto',
        minHeight: height ? 'auto' : { xs: 'auto', md: 'auto' },
        pt: { xs: '120px', md: '140px' },
        pb: { xs: 6, md: 8 },
        px: { xs: 3, md: 'max(80px, calc((100vw - 1920px) / 2 + 220px))' },
        overflow: 'hidden',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {videoSrc && (
        <Box
          component="video"
          autoPlay
          muted
          loop
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
          <source src={videoSrc} type="video/mp4" />
        </Box>
      )}

      {videoSrc && (
        <Box
          sx={theme => ({
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to top, ${theme.palette.background.default} 0%, ${alpha(theme.palette.background.default, 0.6)} 100%)`,
            zIndex: 1,
            pointerEvents: 'none',
          })}
        />
      )}

      {!videoSrc && (
        <>
          <Box sx={{ ...glowOrb, top: 0, right: '25%', width: 500, height: 500, opacity: 1 }} />
          <Box
            sx={{
              ...glowOrb,
              bottom: 80,
              left: '25%',
              width: 400,
              height: 400,
              opacity: 0.6,
            }}
          />
        </>
      )}

      <Stack
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        spacing={2.5}
        sx={{
          width: '100%',
          maxWidth: 1480,
          mx: 'auto',
          position: 'relative',
          zIndex: 2,
          alignItems: align === 'left' ? 'flex-start' : 'center',
          textAlign: align === 'left' ? 'left' : 'center',
        }}
      >
        <Box component={motion.div} variants={itemVariants}>
          {align === 'left' ? (
            <Box
              sx={{
                width: '100%',
                display: 'inline-flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: '1px',
                  background: 'rgba(13, 241, 217, 0.60)',
                  flexShrink: 0,
                }}
              />
              <Box
                sx={{
                  position: 'relative',
                  height: 16,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    color: 'var(--Color-primary-2, #0DF1D9)',
                    fontSize: 12,
                    fontFamily: '"Rajdhani", sans-serif',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    lineHeight: '16px',
                    letterSpacing: '8px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {eyebrow}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box sx={eyebrowBadgeSx}>{eyebrow}</Box>
          )}
        </Box>

        <Typography
          component={motion.h1}
          variants={itemVariants}
          variant="h2"
          sx={{
            fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
            fontWeight: 700,
            maxWidth: 900,
            fontSize: { xs: '32px', sm: '48px', md: '60px' },
            lineHeight: 1.15,
          }}
        >
          {title}
        </Typography>

        {subtitle ? (
          <Typography
            component={motion.p}
            variants={itemVariants}
            variant="body1"
            sx={{
              maxWidth: 1120,
              color: 'rgba(206, 250, 254, 0.60)',
              fontSize: { xs: '14px', md: '16px' },
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 400,
              lineHeight: '26px',
              letterSpacing: '0.015em',
            }}
          >
            {subtitle}
          </Typography>
        ) : null}
      </Stack>
    </Box>
  )
}

export { ShimmerText }
