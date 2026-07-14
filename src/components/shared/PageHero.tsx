'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import ShimmerText from '@/components/shared/ShimmerText'
import { eyebrowBadgeSx, glowOrb } from '@/lib/theme/surfaces'

type PageHeroProps = {
  eyebrow: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  videoSrc?: string
  height?: string | number
  align?: 'left' | 'center'
  aboveTitle?: React.ReactNode
  actions?: React.ReactNode
  children?: React.ReactNode
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
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
  aboveTitle,
  actions,
  children,
}: PageHeroProps) {
  const isRtl = useLocale() === 'ar'

  return (
    <Box
      sx={{
        position: 'relative',
        height: height || 'auto',
        minHeight: height ? 'auto' : { xs: 'auto', md: 'auto' },
        pt: { xs: '110px', md: '140px' },
        pb: { xs: 8, md: 8 },
        px: { xs: 3, md: 'max(80px, calc((100vw - 1920px) / 2 + 220px))' },
        overflow: 'hidden',
        bgcolor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        isolation: 'isolate',
      }}
    >
      {videoSrc && (
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          dir="ltr"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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
          dir="ltr"
          sx={theme => ({
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isRtl
              ? `linear-gradient(to top, ${theme.palette.background.default} 100%, ${alpha(theme.palette.background.default, 0.3)} 40%, ${theme.palette.background.default} 100%)`
              : `linear-gradient(to top, ${theme.palette.background.default} 0%, ${alpha(theme.palette.background.default, 0.3)} 60%, transparent 100%)`,
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
          alignItems: children ? 'stretch' : (align === 'left' ? 'flex-start' : 'center'),
          textAlign: children ? 'left' : (align === 'left' ? 'left' : 'center'),
        }}
      >
        {children ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              gap: { xs: 5, md: 0 },
              width: '100%',
            }}
          >
            <Stack
              spacing={2.5}
              sx={{
                maxWidth: { md: 695 },
                flex: 1,
                pr: { md: 5 },
                width: '100%',
              }}
            >
              {/* Mobile-only children (FlipLogoCard) - renders at the very top on mobile */}
              {children && (
                <Box
                  component={motion.div}
                  variants={itemVariants}
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    justifyContent: 'center',
                    width: '100%',
                    my: 1.5,
                  }}
                >
                  {children}
                </Box>
              )}

              {aboveTitle && (
                <Box
                  component={motion.div}
                  variants={itemVariants}
                  sx={{
                    mb: 1.5,
                    display: { xs: 'none', md: 'block' },
                  }}
                >
                  {aboveTitle}
                </Box>
              )}

              <Box component={motion.div} variants={itemVariants}>
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

              <Typography
                component={motion.h1}
                variants={itemVariants}
                variant="h2"
                sx={{
                  fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  fontWeight: 700,
                  fontSize: { xs: '32px', sm: '48px', md: '60px' },
                  lineHeight: 1.15,
                }}
              >
                {title}
              </Typography>

              {subtitle && (
                <Typography
                  component={motion.p}
                  variants={itemVariants}
                  variant="body1"
                  sx={{
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
              )}

              {actions && (
                <Box component={motion.div} variants={itemVariants}>
                  {actions}
                </Box>
              )}
            </Stack>

            {/* Desktop-only children (FlipLogoCard) */}
            <Box
              sx={{
                width: { xs: '100%', md: 'auto' },
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
              }}
            >
              {children}
            </Box>
          </Box>
        ) : (
          <>
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

            {actions && (
              <Box component={motion.div} variants={itemVariants}>
                {actions}
              </Box>
            )}
          </>
        )}
      </Stack>
    </Box>
  )
}

export { ShimmerText }
