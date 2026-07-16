'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ReactNode } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
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
    : isAr
      ? 'نقدم حلولاً متطورة للشركات الساعية إلى تحسين عملياتها.'
      : 'We provide cutting-edge solutions for businesses seeking to optimize their operations.'
  const rawLogo = publicDataMap.logo
  const logoUrl = hasApiData ? getMediaUrl(rawLogo) : '/images/logo/logo-ultra.svg'

  const copyright = hasApiData
    ? (publicDataMap.copyright_information || '').trim()
    : isAr
      ? '© 2026 Ultrawares. جميع الحقوق محفوظة.'
      : '© 2026 Ultrawares. All rights reserved.'
  const poweredBy = hasApiData ? publicDataMap.powered_by : null

  const rawVideo = publicDataMap.footer_video
  const videoUrl = getMediaUrl(rawVideo) || '/videos/footer.mp4'

  const address = hasApiData ? publicDataMap.address : null
  const mobile = hasApiData ? publicDataMap.mobile : null
  const phone = hasApiData ? publicDataMap.phone : null
  const email = hasApiData ? publicDataMap.email : null

  const footerTextObj = publicDataMap.footer_text
  const showFooterText = !!(
    hasApiData &&
    footerTextObj &&
    (footerTextObj.show_text_in_footer === true ||
      footerTextObj.show_text_in_footer === 'true' ||
      footerTextObj.show_text_in_footer === 1 ||
      footerTextObj.show_text_in_footer === '1') &&
    footerTextObj.text
  )
  const footerText = footerTextObj?.text || ''

  
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
          background: isAr
              ? `linear-gradient(to bottom, ${theme.palette.background.default} 0%, transparent 100%), linear-gradient(to top, ${theme.palette.background.default} 0%, transparent 100%)`
              : `linear-gradient(to bottom, ${theme.palette.background.default} 0%, transparent 100%)`,
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
        preload="none"
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
          px: { xs: 3, md: 'max(80px, calc((100vw - 1920px) / 2 + 220px))' },
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
            spacing={{ xs: 4, md: 0 }}
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

            {/* Useful Links + Services side by side on mobile */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: { xs: 4, md: 0 },
                justifyContent: { xs: 'flex-start', md: 'space-between' },
                width: { xs: '100%', md: 'auto' },
                flexWrap: 'nowrap',
              }}
            >
            <Stack spacing={2} sx={{ width: { xs: '50%', md: 192 } }}>
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

            <Stack spacing={2} sx={{ width: { xs: '50%', md: 174 } }}>
              <Typography variant="h5" sx={footerSectionTitleSx}>
                {isAr ? 'خدماتنا' : 'Services'}
              </Typography>
              <Stack spacing={1.25} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {(hasApiData && data?.services?.length > 0
                  ? data.services.slice(0, 4).map((s: any) => s.title || s.name || s)
                  : serviceItems
                ).map((item: string) => {
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
            </Box>

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

          {showFooterText ? (
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                backdropFilter: 'var(--parent-backdrop-filter)',
                WebkitBackdropFilter: 'var(--parent-backdrop-filter)',
              }}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
                '--parent-backdrop-filter': 'blur(26px) brightness(1.08) saturate(1.2)',
                ...glassSurface(theme, { radius: '16px' }),
                background: glassSurface(theme, { radius: '16px' }).background,
                border: glassSurface(theme, { radius: '16px' }).border,
                backgroundClip: 'padding-box',
                borderRadius: '16px',
                boxShadow: glassSurface(theme, { radius: '16px' }).boxShadow,
                py: { xs: 3, md: 4 },
                px: { xs: 3, md: 4 },
              }}
            >
              <Typography
                sx={{
                  color: '#0DF1D9',
                  fontSize: { xs: '16px', md: '20px' },
                  fontWeight: 500,
                  lineHeight: 1.6,
                  whiteSpace: 'pre-line',
                }}
              >
                {footerText}
              </Typography>
            </Box>
          ) : (
            showStats && (
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  backdropFilter: 'var(--parent-backdrop-filter)',
                  WebkitBackdropFilter: 'var(--parent-backdrop-filter)',
                }}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: 'repeat(2, 161px)', md: 'repeat(4, 1fr)' },
                  justifyContent: { xs: 'center', md: 'stretch' },
                  gap: { xs: 1.5, md: 0 },
                  width: '100%',
                  '--parent-backdrop-filter': {
                    xs: 'none',
                    md: 'blur(26px) brightness(1.08) saturate(1.2)',
                  },
                  ...glassSurface(theme, { radius: '16px' }),
                  background: {
                    xs: 'none',
                    md: glassSurface(theme, { radius: '16px' }).background,
                  },
                  border: {
                    xs: 'none',
                    md: glassSurface(theme, { radius: '16px' }).border,
                  },
                  backgroundClip: {
                    xs: 'unset',
                    md: 'padding-box',
                  },
                  borderRadius: {
                    xs: '0px',
                    md: '16px',
                  },
                  boxShadow: {
                    xs: 'none',
                    md: glassSurface(theme, { radius: '16px' }).boxShadow,
                  },
                  py: { xs: 0, md: 3 },
                  px: { xs: 0, md: 2 },
                }}
              >
                {finalFooterStats.map((stat, i) => (
                  <Box
                    key={stat.label}
                    component={motion.div}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      backdropFilter: 'var(--child-backdrop-filter)',
                      WebkitBackdropFilter: 'var(--child-backdrop-filter)',
                    }}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: { xs: '161px', md: '100%' },
                      height: { xs: '74.88888549804688px', md: 'auto' },
                      py: { xs: 0, md: 1 },
                      px: { xs: 0, md: 1 },
                      p: { xs: '14.69px', md: 'unset' },
                      color: '#0DF1D9',
                      '--child-backdrop-filter': {
                        xs: 'blur(26px) brightness(1.08) saturate(1.2)',
                        md: 'none',
                      },
                      ...glassSurface(theme, { radius: '14.69px' }),
                      background: {
                        xs: glassSurface(theme, { radius: '14.69px' }).background,
                        md: 'transparent',
                      },
                      border: {
                        xs: glassSurface(theme, { radius: '14.69px' }).border,
                        md: 'none',
                      },
                      backgroundClip: {
                        xs: 'padding-box',
                        md: 'unset',
                      },
                      borderRadius: {
                        xs: '14.69px',
                        md: '0px',
                      },
                      boxShadow: {
                        xs: glassSurface(theme, { radius: '14.69px' }).boxShadow,
                        md: 'none',
                      },
                      borderInlineEnd: 'none',
                      '& .stat-number': {
                        fontSize: { xs: '18px', md: '54.85px' },
                        lineHeight: { xs: '20px', md: '82.275px' },
                        color: '#0DF1D9',
                      },
                      '& .stat-label': {
                        fontSize: { xs: '8px', md: '14px' },
                        lineHeight: { xs: '10px', md: '20px' },
                        color: 'text.secondary',
                        mt: 0,
                      },
                    }}
                  >
                    <StatItem stat={stat} active />
                  </Box>
                ))}
              </Box>
            )
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
            {poweredBy && (
              <>
                {' | Powered by '}
                {typeof poweredBy === 'object' && poweredBy.url ? (
                  <Box
                    component="a"
                    href={poweredBy.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'text.tertiary', '&:hover': { color: 'primary.main' } }}
                  >
                    {poweredBy.title || poweredBy.url}
                  </Box>
                ) : (
                  String(poweredBy)
                )}
              </>
            )}
          </Typography>
          <Stack direction="row" spacing={3.5} sx={{ flexWrap: 'wrap' }}>
            {legalLinks.map(item => {
              let legalText: string = item
              if (isAr) {
                if (item === 'Privacy Policy') legalText = 'سياسة الخصوصية'
                else if (item === 'Terms of Service') legalText = 'شروط الخدمة'
                else if (item === 'Cookie Policy') legalText = 'سياسة ملفات تعريف الارتباط'
              }
              return (
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
                  {legalText}
                </Box>
              )
            })}
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
