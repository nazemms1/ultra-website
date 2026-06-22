'use client'

import Image from 'next/image'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import { alpha, useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { glassSurface, statLabelSx, statNumberSx } from '@/lib/theme/surfaces'
import { footerStats, legalLinks, serviceItems, usefulLinks } from './data'
import { footerBodySx, footerLinkSx, footerSectionTitleSx } from './constants'

const CONTENT_MAX_WIDTH = 1120

const socials = [
  {
    href: '#',
    label: 'X',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'LinkedIn',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'GitHub',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'Dribbble',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm7.568 5.302c1.4 1.789 2.247 4.025 2.268 6.458-.203-.043-2.23-.457-4.293-.198-.09-.203-.188-.405-.293-.608 2.24-1.003 3.938-2.52 4.318-5.652zM12 2.163c2.503 0 4.797.88 6.593 2.345-.33 2.893-1.92 4.305-4.05 5.235-.855-1.575-1.8-3.06-2.82-4.425C13.313 4.65 12.668 3.36 12 2.163zM4.635 6.403c1.68-.045 3.195.315 4.56 1.035-1.05 1.365-1.98 2.85-2.775 4.425-2.25-.45-4.23-.12-4.5-.09.12-2.25 1.005-4.305 2.715-5.37zm-.72 7.275c.33-.015 2.55-.36 5.07.12-.18.585-.345 1.185-.48 1.8-1.98.615-3.72 1.605-5.22 2.91-.75-1.395-1.17-2.97-1.17-4.65 0-.18 0-.36.015-.54.42-.24 1.005-.48 1.785-.64zm2.58 7.02c1.155-1.125 2.7-2.01 4.455-2.58.75 2.325 1.05 4.5 1.14 5.25-2.55.855-5.37.48-7.35-1.23.6-.75 1.155-1.5 1.755-2.25zm8.25 2.37c-.09-.63-.36-2.7-1.05-4.875 1.68-.42 3.45-.27 4.2-.18-.6 2.55-2.25 4.65-4.65 5.805-.18-.585-.36-1.155-.5-1.75zM9.75 9.75c.96-1.5 1.95-2.94 2.97-4.275 1.05.33 2.07.75 3.045 1.245-1.155 1.245-2.25 2.58-3.27 3.96-.72-.615-1.455-1.2-2.205-1.74-.18-.06-.36-.12-.54-.19z" />
      </svg>
    ),
  },
] as const

export default function FooterSection() {
  const theme = useTheme()

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        zIndex: 1,
        isolation: 'isolate',
        width: '100%',
        minHeight: { xs: 'auto', md: 695 },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '140px',
          background: `linear-gradient(to bottom, ${theme.palette.background.default} 0%, transparent 100%)`,
          zIndex: 2,
          pointerEvents: 'none',
        },
      }}
    >
      <Box
        component="video"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      >
        <source src="/videos/footer.mp4" type="video/mp4" />
      </Box>

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          minHeight: { xs: 'auto', md: 695 },
          pt: { xs: 6, md: '72px' },
          px: { xs: 3, md: '80px' },
          pb: { xs: 4, md: '40px' },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: CONTENT_MAX_WIDTH, mx: 'auto', pt: { md: '64px' } }}>
          <Box
            sx={{
              height: '1px',
              width: '100%',
              backgroundImage: theme =>
                `linear-gradient(90deg, ${alpha(theme.palette.common.black, 0)} 0%, ${alpha(theme.palette.primary.main, 0.3)} 30%, ${alpha(theme.palette.primary.main, 0.3)} 70%, ${alpha(theme.palette.common.black, 0)} 100%)`,
            }}
          />
        </Box>

        <Stack
          spacing={{ xs: 5, md: '36px' }}
          sx={{ width: '100%', maxWidth: CONTENT_MAX_WIDTH, mx: 'auto', flex: 1 }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 5, md: 0 }}
            sx={{
              pt: { md: '56px' },
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Stack spacing={2.5} sx={{ maxWidth: { md: 260 }, width: '100%' }}>
              <Box
                component={Link}
                href="/"
                sx={{
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    filter: `drop-shadow(0 0 12px ${alpha(theme.palette.primary.main, 0.6)}) brightness(1.2)`,
                  },
                }}
              >
                <Image
                  src="/images/logo/logo-ultra.svg"
                  alt="Ultrawares"
                  width={83}
                  height={42}
                  priority
                  style={{ display: 'block' }}
                />
              </Box>
              <Typography
                sx={{
                  ...footerBodySx,
                  fontSize: '15px',
                  lineHeight: '26px',
                }}
              >
                We provide cutting-edge solutions for businesses seeking to optimize their
                operations.
              </Typography>
              <Stack direction="row" spacing={1.5} sx={{ pt: 0.5 }}>
                {socials.map(social => (
                  <Box
                    key={social.label}
                    component={Link}
                    href={social.href}
                    aria-label={social.label}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                      borderRadius: '10px',
                      bgcolor: alpha(theme.palette.common.white, 0.03),
                      border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                      color: 'text.secondary',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        transform: 'translateY(-3px) scale(1.05)',
                        boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    {social.icon}
                  </Box>
                ))}
              </Stack>
            </Stack>

            <Stack spacing={2} sx={{ width: { md: 192 } }}>
              <Typography variant="h5" sx={footerSectionTitleSx}>
                Useful Links
              </Typography>
              <Stack spacing={1.25} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {usefulLinks.map(link => (
                  <Box key={link.href} component="li">
                    <Box
                      component={Link}
                      href={link.href}
                      sx={{
                        ...footerLinkSx,
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 500,
                      }}
                    >
                      {link.label}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Stack>

            <Stack spacing={2} sx={{ width: { md: 174 } }}>
              <Typography variant="h5" sx={footerSectionTitleSx}>
                Services
              </Typography>
              <Stack spacing={1.25} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {serviceItems.map(item => (
                  <Typography
                    key={item}
                    component="li"
                    sx={{
                      ...footerBodySx,
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              sx={{
                ...glassSurface(theme, { radius: '16px' }),
                width: '100%',
                maxWidth: CONTENT_MAX_WIDTH,
                minHeight: { xs: 'auto', md: 120 },
                overflow: 'hidden',
              }}
            >
              <Grid container>
                {footerStats.map(stat => (
                  <Grid
                    key={stat.label}
                    size={{ xs: 6, md: 3 }}
                    sx={{
                      py: { xs: 2.5, md: '28px' },
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'default',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        '& .stat-number': {
                          textShadow: `0 0 24px ${alpha(theme.palette.primary.main, 0.6)}`,
                          transform: 'scale(1.05)',
                        },
                        '& .stat-label': {
                          color: 'primary.main',
                        },
                      },
                    }}
                  >
                    <Typography
                      className="stat-number"
                      component="span"
                      sx={{
                        ...statNumberSx,
                        fontSize: { xs: 28, md: 36 },
                        lineHeight: { xs: '32px', md: '36px' },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      className="stat-label"
                      sx={{
                        ...statLabelSx,
                        mt: 1,
                        fontSize: '12px',
                        lineHeight: '18px',
                        letterSpacing: '2px',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Stack>

        <Box sx={{ width: '100%', maxWidth: CONTENT_MAX_WIDTH, mx: 'auto', pt: { md: '48px' } }}>
          <Box
            sx={{
              height: '1px',
              width: '100%',
              bgcolor: alpha(theme.palette.common.white, 0.07),
            }}
          />
        </Box>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: CONTENT_MAX_WIDTH,
            mx: 'auto',
            pt: { xs: 3, md: '28px' },
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              lineHeight: '21px',
              letterSpacing: '0.4px',
              color: 'text.tertiary',
            }}
          >
            © 2026 Ultrawares. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3.5} sx={{ flexWrap: 'wrap' }}>
            {legalLinks.map(item => (
              <Box
                key={item}
                component={Link}
                href="#"
                sx={{
                  fontSize: '14px',
                  lineHeight: '21px',
                  color: 'text.tertiary',
                  ...footerLinkSx,
                }}
              >
                {item}
              </Box>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
