'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'
import type { SxProps } from '@mui/material/styles'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import UltraButton from '@/components/shared/UltraButton'
import { glassPillSurface, glassSurface } from '@/lib/theme/surfaces'
import { navLinks, type NavLabels } from '@/components/Layout/navLinks'
import AnimatedButton from '@/components/shared/AnimatedButton'
import { useNavbarScrollMode } from './useNavbarScrollMode'

const MotionBox = motion.create(Box)

const LAYOUT_TRANSITION = {
  layout: { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const },
}

const SURFACE_TRANSITION =
  'background 0.45s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.45s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.45s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.45s cubic-bezier(0.4, 0, 0.2, 1), -webkit-backdrop-filter 0.45s cubic-bezier(0.4, 0, 0.2, 1), flex 0.45s cubic-bezier(0.4, 0, 0.2, 1), gap 0.45s cubic-bezier(0.4, 0, 0.2, 1), padding 0.45s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.45s cubic-bezier(0.4, 0, 0.2, 1)'

function navGlassPill(theme: Theme): SxProps<Theme> {
  return {
    ...glassPillSurface(theme),
    boxShadow: ['0px 4px 30px 0px rgba(0, 0, 0, 0.1)', '0 8px 32px 0 rgba(0, 0, 0, 0.37)'].join(
      ', ',
    ),
  }
}

function segmentPlainSx(): SxProps<Theme> {
  return {
    border: '1px solid transparent',
    boxShadow: 'none',
    bgcolor: 'transparent',
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none',
  }
}

type NavbarProps = {
  labels: NavLabels
}

export default function Navbar({ labels }: NavbarProps) {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const { mode, mergeProgress } = useNavbarScrollMode()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isUnified = !isDesktop || mergeProgress > 0.5
  const isScrollDown = mode === 'scroll-down'
  const isSplit = isDesktop && mergeProgress <= 0.5

  const navLinksStack = (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: '45px',
      }}
    >
      {navLinks.map(link => (
        <Box
          key={link.href}
          component={Link}
          href={link.href}
          sx={{
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: '20px',
            color: 'text.primary',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'color 0.2s ease',
            '&:hover': { color: 'primary.main' },
          }}
        >
          {labels[link.labelKey]}
        </Box>
      ))}
    </Stack>
  )

  const logo = (
    <Link href="/" aria-label="Ultra Home" style={{ display: 'flex', alignItems: 'center' }}>
      <Image
        src="/images/logo/logo-ultra.svg"
        alt="Ultrawares"
        width={83}
        height={42}
        priority
        style={{ objectFit: 'contain' }}
      />
    </Link>
  )

  const contactButton = (
    <AnimatedButton
      variant="primary"
      href="/contact"
      sx={{
        display: { xs: 'none', md: 'inline-flex' },
        minHeight: 42,
        maxHeight: 42,
        fontSize: '14px',
        letterSpacing: '0.62px',
        px: 2.5,
        py: 1.5,
      }}
    >
      {labels.contact}
    </AnimatedButton>
  )

  const segmentSx = (segment: 'logo' | 'nav' | 'cta'): SxProps<Theme> => {
    const sideFlex = isUnified ? 1 : 0

    return {
      display: segment === 'nav' ? { xs: 'none', md: 'flex' } : 'flex',
      alignItems: 'center',
      transition: SURFACE_TRANSITION,
      ...(segment === 'logo' && {
        flex: isUnified ? `${sideFlex} 1 0` : '0 0 auto',
        justifyContent: 'flex-start',
      }),
      ...(segment === 'nav' && {
        flex: '0 0 auto',
        justifyContent: 'center',
      }),
      ...(segment === 'cta' && {
        flex: isUnified ? `${sideFlex} 1 0` : '0 0 auto',
        justifyContent: 'flex-end',
      }),
      ...(isSplit
        ? {
            height: 68,
            ...navGlassPill(theme),
            ...(segment === 'logo' && { pl: '25px', pr: '25px', py: '13px' }),
            ...(segment === 'nav' && { px: '81px', py: '13px' }),
            ...(segment === 'cta' && { p: '13px' }),
          }
        : {
            height: 'auto',
            py: 0,
            px: 0,
            ...segmentPlainSx(),
          }),
    }
  }

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.appBar,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 2.5,
        px: 2,
      }}
    >
      <MotionBox
        layout
        transition={LAYOUT_TRANSITION}
        sx={{
          width: '100%',
          maxWidth: isUnified ? 1318 : 1298,
          display: 'flex',
          alignItems: 'center',
          transition: SURFACE_TRANSITION,
          ...(isUnified
            ? {
                height: 68,
                px: '25px',
                py: '13px',
                ...navGlassPill(theme),
              }
            : {
                px: '20px',
                justifyContent: isScrollDown ? 'space-between' : 'center',
                gap: isScrollDown ? 0 : '17px',
                height: 'auto',
                ...segmentPlainSx(),
              }),
        }}
      >
        <MotionBox layout transition={LAYOUT_TRANSITION} sx={segmentSx('logo')}>
          {logo}
        </MotionBox>

        <MotionBox layout transition={LAYOUT_TRANSITION} sx={segmentSx('nav')}>
          {navLinksStack}
        </MotionBox>

        <MotionBox layout transition={LAYOUT_TRANSITION} sx={segmentSx('cta')}>
          {contactButton}

          <IconButton
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(v => !v)}
            sx={{
              display: { xs: 'inline-flex', md: 'none' },
              width: 36,
              height: 36,
              bgcolor: theme =>
                `color-mix(in srgb, ${theme.palette.primary.main} 10%, transparent)`,
              border: theme =>
                `1px solid color-mix(in srgb, ${theme.palette.primary.main} 25%, transparent)`,
              color: 'primary.main',
            }}
          >
            {mobileOpen ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
          </IconButton>
        </MotionBox>
      </MotionBox>

      {mobileOpen ? (
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            mt: 1.25,
            width: '100%',
            maxWidth: 1318,
            ...glassSurface(theme, { tint: 0.06, radius: 24 }),
            p: '20px 24px',
            flexDirection: 'column',
          }}
        >
          {navLinks.map((link, index) => (
            <Box
              key={link.href}
              component={Link}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              sx={{
                fontWeight: 500,
                fontSize: '15px',
                letterSpacing: '0.5px',
                color: 'text.secondary',
                textDecoration: 'none',
                py: 1.625,
                borderBottom:
                  index < navLinks.length - 1
                    ? theme => `1px solid ${theme.palette.background.divider}`
                    : 'none',
              }}
            >
              {labels[link.labelKey]}
            </Box>
          ))}
          <Box sx={{ mt: 2 }}>
            <UltraButton variant="primary" href="/contact">
              {labels.contact}
            </UltraButton>
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}
