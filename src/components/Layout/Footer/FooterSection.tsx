'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import { alpha, useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { glassSurface } from '@/lib/theme/surfaces'
import StatItem from '@/components/Pages/Home/Stats/StatItem'
import type { StatConfig } from '@/components/Pages/Home/Stats/types'
import { footerStats, legalLinks, serviceItems, usefulLinks } from './data'
import { footerBodySx, footerLinkSx, footerSectionTitleSx } from './constants'

// const CONTENT_MAX_WIDTH = 1120

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

export default function FooterSection({ data, statsData }: { data?: any; statsData?: any }) {
  const theme = useTheme()
  const params = useParams()
  const isAr = params?.locale === 'ar'
  const contactTitle = isAr ? 'اتصل بنا' : 'Contact Us'

  const hasApiData = !!data

  const showStats = statsData?.is_shown !== false

  const statsItems = statsData?.items || []
  const mappedFooterStats: StatConfig[] = statsItems.map((item: any, i: number) => ({
    value: Number(item.value) || 0,
    suffix: item.symbol || '',
    label: item.title,
    entranceDelay: i * 0.12,
    entranceDuration: 0.55,
    countDuration: Math.max(1.2, 2.0 - i * 0.3),
  }))

  const finalFooterStats: StatConfig[] =
    mappedFooterStats.length > 0 ? mappedFooterStats : footerStats

  const publicDataMap =
    data?.['public-data']?.reduce((acc: Record<string, any>, item: any) => {
      acc[item.key] = item.value
      return acc
    }, {}) || {}

  const getMediaUrl = (val: any) => {
    if (!val) return null
    if (typeof val === 'object' && val.url) return val.url
    return val
  }

  const bio = hasApiData
    ? publicDataMap.bio
    : 'We provide cutting-edge solutions for businesses seeking to optimize their operations.'
  const rawLogo = publicDataMap.logo
  const logoUrl = hasApiData ? getMediaUrl(rawLogo) : '/images/logo/logo-ultra.svg'

  const copyright = hasApiData
    ? publicDataMap.copyright_information
    : '© 2026 Ultrawares. All rights reserved.'
  const poweredBy = hasApiData ? publicDataMap.powered_by : null

  const rawVideo = publicDataMap.footer_video
  const videoUrl = getMediaUrl(rawVideo) || '/videos/footer.mp4'

  const address = hasApiData ? publicDataMap.address : null
  const mobile = hasApiData ? publicDataMap.mobile : null
  const phone = hasApiData ? publicDataMap.phone : null
  const email = hasApiData ? publicDataMap.email : null

  // const getSocialIcon = (key: string) => {
  //   const lowKey = key.toLowerCase()
  //   if (lowKey.includes('linkedin')) {
  //     return (
  //       <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
  //         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  //       </svg>
  //     )
  //   }
  //   if (lowKey.includes('github')) {
  //     return (
  //       <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
  //         <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  //       </svg>
  //     )
  //   }
  //   if (lowKey.includes('dribbble')) {
  //     return (
  //       <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
  //         <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm7.568 5.302c1.4 1.789 2.247 4.025 2.268 6.458-.203-.043-2.23-.457-4.293-.198-.09-.203-.188-.405-.293-.608 2.24-1.003 3.938-2.52 4.318-5.652zM12 2.163c2.503 0 4.797.88 6.593 2.345-.33 2.893-1.92 4.305-4.05 5.235-.855-1.575-1.8-3.06-2.82-4.425C13.313 4.65 12.668 3.36 12 2.163zM4.635 6.403c1.68-.045 3.195.315 4.56 1.035-1.05 1.365-1.98 2.85-2.775 4.425-2.25-.45-4.23-.12-4.5-.09.12-2.25 1.005-4.305 2.715-5.37zm-.72 7.275c.33-.015 2.55-.36 5.07.12-.18.585-.345 1.185-.48 1.8-1.98.615-3.72 1.605-5.22 2.91-.75-1.395-1.17-2.97-1.17-4.65 0-.18 0-.36.015-.54.42-.24 1.005-.48 1.785-.64zm2.58 7.02c1.155-1.125 2.7-2.01 4.455-2.58.75 2.325 1.05 4.5 1.14 5.25-2.55.855-5.37.48-7.35-1.23.6-.75 1.155-1.5 1.755-2.25zm8.25 2.37c-.09-.63-.36-2.7-1.05-4.875 1.68-.42 3.45-.27 4.2-.18-.6 2.55-2.25 4.65-4.65 5.805-.18-.585-.36-1.155-.5-1.75zM9.75 9.75c.96-1.5 1.95-2.94 2.97-4.275 1.05.33 2.07.75 3.045 1.245-1.155 1.245-2.25 2.58-3.27 3.96-.72-.615-1.455-1.2-2.205-1.74-.18-.06-.36-.12-.54-.19z" />
  //       </svg>
  //     )
  //   }
  //   if (lowKey.includes('facebook')) {
  //     return (
  //       <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
  //         <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
  //       </svg>
  //     )
  //   }
  //   if (lowKey.includes('instagram')) {
  //     return (
  //       <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
  //         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  //       </svg>
  //     )
  //   }
  //   if (lowKey.includes('youtube')) {
  //     return (
  //       <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
  //         <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  //       </svg>
  //     )
  //   }
  //   return (
  //     <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
  //       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  //     </svg>
  //   )
  // }

  const apiSocials = data?.['social-media'] || []
  const processedSocials: {
    href: string
    label: string
    iconUrl: string | null
    icon: ReactNode
  }[] = hasApiData
    ? apiSocials.map((item: any) => {
        const iconUrl = item.icon?.url || item.icon
        return {
          href: item.url || '#',
          label: item.title || 'Social',
          iconUrl: typeof iconUrl === 'string' ? iconUrl : null,
          icon: null,
        }
      })
    : socials.map(s => ({
        href: s.href,
        label: s.label,
        iconUrl: null,
        icon: s.icon,
      }))

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
        key={videoUrl}
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
        <source src={videoUrl} type="video/mp4" />
      </Box>

      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '0px 0px -100px 0px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          minHeight: { xs: 'auto', md: 695 },
          pt: { xs: 6, md: '72px' },
          px: { xs: 3, md: 'max(80px, calc((100vw - 1920px) / 2 + 160px))' },
          pb: { xs: 4, md: '40px' },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '100%', mx: 'auto', pt: { md: '64px' } }}>
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
          sx={{ width: '100%', maxWidth: '100%', mx: 'auto', flex: 1 }}
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
              {logoUrl && (
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
                    src={logoUrl}
                    alt="Ultrawares"
                    width={83}
                    height={42}
                    priority
                    style={{ display: 'block', objectFit: 'contain' }}
                  />
                </Box>
              )}
              {bio && (
                <Typography
                  sx={{
                    ...footerBodySx,
                    fontSize: '15px',
                    lineHeight: '26px',
                  }}
                >
                  {bio}
                </Typography>
              )}
              {processedSocials.length > 0 && (
                <Stack direction="row" spacing={1.5} sx={{ pt: 0.5 }}>
                  {processedSocials.map((social, idx) => (
                    <Box
                      key={`${social.label}-${idx}`}
                      component={Link}
                      href={social.href}
                      aria-label={social.label}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        ...(social.iconUrl
                          ? {
                              width: 'auto',
                              height: 'auto',
                              '&:hover': {
                                transform: 'translateY(-3px) scale(1.1)',
                              },
                            }
                          : {
                              width: 36,
                              height: 36,
                              borderRadius: '10px',
                              bgcolor: alpha(theme.palette.common.white, 0.03),
                              border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                              color: 'text.secondary',
                              '&:hover': {
                                borderColor: 'primary.main',
                                color: 'primary.main',
                                transform: 'translateY(-3px) scale(1.05)',
                                boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
                                bgcolor: alpha(theme.palette.primary.main, 0.08),
                              },
                            }),
                      }}
                    >
                      {social.iconUrl ? (
                        <Box
                          component="img"
                          src={social.iconUrl}
                          alt={social.label}
                          sx={{
                            width: 24,
                            height: 24,
                            objectFit: 'contain',
                          }}
                        />
                      ) : (
                        social.icon
                      )}
                    </Box>
                  ))}
                </Stack>
              )}
            </Stack>

            <Stack spacing={2} sx={{ width: { md: 192 } }}>
              <Typography variant="h5" sx={footerSectionTitleSx}>
                {isAr ? 'روابط مفيدة' : 'Useful Links'}
              </Typography>
              <Stack spacing={1.25} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {usefulLinks.map(link => {
                  let labelText: string = link.label
                  if (isAr) {
                    if (link.label === 'About Us') labelText = 'من نحن'
                    else if (link.label === 'Our services') labelText = 'خدماتنا'
                    else if (link.label === 'Our projects') labelText = 'مشاريعنا'
                    else if (link.label === 'Gallery') labelText = 'المعرض'
                    else if (link.label === 'Contact Us') labelText = 'تواصل معنا'
                  }
                  return (
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
                        {labelText}
                      </Box>
                    </Box>
                  )
                })}
              </Stack>
            </Stack>

            <Stack spacing={2} sx={{ width: { md: 174 } }}>
              <Typography variant="h5" sx={footerSectionTitleSx}>
                {isAr ? 'خدماتنا' : 'Services'}
              </Typography>
              <Stack spacing={1.25} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {serviceItems.map(item => {
                  let itemText: string = item
                  if (isAr) {
                    if (item === 'Business Analysis') itemText = 'تحليل الأعمال'
                    else if (item === 'Mobile & Web Eng.') itemText = 'هندسة الويب والموبايل'
                    else if (item === 'UI/UX Design') itemText = 'تصميم واجهات المستخدم'
                    else if (item === 'DevOps & Cloud') itemText = 'الحوسبة السحابية وDevOps'
                  }
                  return (
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
                      {itemText}
                    </Typography>
                  )
                })}
              </Stack>
            </Stack>

            {(address || mobile || phone || email) && (
              <Stack spacing={2} sx={{ width: { md: 220 } }}>
                <Typography variant="h5" sx={footerSectionTitleSx}>
                  {contactTitle}
                </Typography>
                <Stack spacing={1.25} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  {address && (
                    <Typography component="li" sx={{ ...footerBodySx, fontSize: '15px' }}>
                      {address}
                    </Typography>
                  )}
                  {phone && (
                    <Typography component="li" sx={{ ...footerBodySx, fontSize: '15px' }}>
                      {phone}
                    </Typography>
                  )}
                  {mobile && (
                    <Typography component="li" sx={{ ...footerBodySx, fontSize: '15px' }}>
                      {mobile}
                    </Typography>
                  )}
                  {email && (
                    <Box component="li">
                      <Box
                        component={Link}
                        href={`mailto:${email}`}
                        sx={{ ...footerLinkSx, fontSize: '15px' }}
                      >
                        {email}
                      </Box>
                    </Box>
                  )}
                </Stack>
              </Stack>
            )}
          </Stack>

          {showStats && (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                // style bypasses stylis-plugin-rtl so backdropFilter is never stripped in RTL
                style={{
                  backdropFilter: 'blur(26px) brightness(1.08) saturate(1.2)',
                  WebkitBackdropFilter: 'blur(26px) brightness(1.08) saturate(1.2)',
                }}
                sx={{
                  ...glassSurface(theme, { radius: '16px' }),
                  width: '100%',
                  color: '#0DF1D9',
                  maxWidth: '100%',
                  minHeight: { xs: 'auto', md: 120 },
                  overflow: 'hidden',
                }}
              >
                <Grid container sx={{ width: '100%' }}>
                  {finalFooterStats.map(stat => (
                    <StatItem key={stat.label} stat={stat} active />
                  ))}
                </Grid>
              </Box>
            </Box>
          )}
        </Stack>

        <Box sx={{ width: '100%', maxWidth: '100%', mx: 'auto', pt: { md: '48px' } }}>
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
            maxWidth: '100%',
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
            {copyright}
            {poweredBy && ` | Powered by ${poweredBy}`}
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
