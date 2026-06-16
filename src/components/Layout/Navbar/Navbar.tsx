'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'
import type { SxProps } from '@mui/material/styles'
import Image from 'next/image'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import UltraButton from '@/components/shared/UltraButton'
import { glassPillSurface, glassSurface } from '@/lib/theme/surfaces'
import { navLinks, type NavLabels } from '@/components/Layout/navLinks'
import AnimatedButton from '@/components/shared/AnimatedButton'
import { useNavbarScrollMode } from './useNavbarScrollMode'

/** Crossfade unified ↔ split */
const SHAPE_MS = 520
const SHAPE_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'
const shapeTransition = `opacity ${SHAPE_MS}ms ${SHAPE_EASE}, transform ${SHAPE_MS}ms ${SHAPE_EASE}, visibility ${SHAPE_MS}ms, filter ${SHAPE_MS}ms ${SHAPE_EASE}`

const NAV_HEIGHT = 68
const SPLIT_MAX_WIDTH = 1298
const UNIFIED_MAX_WIDTH = 1318
const GROUPED_GAP = 17

const lerp = (from: number, to: number, t: number) => from + (to - from) * t

function navGlassPill(theme: Theme): SxProps<Theme> {
  return {
    ...glassPillSurface(theme),
    boxShadow: ['0px 4px 30px 0px rgba(0, 0, 0, 0.1)', '0 8px 32px 0 rgba(0, 0, 0, 0.37)'].join(
      ', ',
    ),
  }
}

function easeInOutQuart(t: number) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
}

type NavbarProps = {
  labels: NavLabels
}

export default function Navbar({ labels }: NavbarProps) {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const { mergeProgress, spreadProgress } = useNavbarScrollMode()
  const [mobileOpen, setMobileOpen] = useState(false)

  const t = isDesktop ? easeInOutQuart(Math.max(0, Math.min(1, mergeProgress))) : 1
  const splitOpacity = 1 - t
  const unifiedOpacity = t
  /** 1 = logo/cta at edges, 0 = grouped & centered around nav */
  const spread = isDesktop ? Math.max(0, Math.min(1, spreadProgress)) : 0

  const outerSpacerSx: SxProps<Theme> = {
    flexGrow: 1 - spread,
    flexShrink: 1,
    flexBasis: 0,
    minWidth: 0,
    alignSelf: 'stretch',
    pointerEvents: 'none',
  }

  const innerSpacerSx: SxProps<Theme> = {
    flexGrow: spread,
    flexShrink: 1,
    flexBasis: `${(1 - spread) * GROUPED_GAP}px`,
    minWidth: 0,
    maxWidth: spread > 0.01 ? 'none' : `${GROUPED_GAP}px`,
    alignSelf: 'stretch',
    pointerEvents: 'none',
  }

  const navLinksStack = (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', gap: '45px' }}>
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

  const mobileMenuButton = (
    <IconButton
      aria-label="Toggle menu"
      onClick={() => setMobileOpen(v => !v)}
      sx={{
        display: { xs: 'inline-flex', md: 'none' },
        width: 36,
        height: 36,
        bgcolor: theme => `color-mix(in srgb, ${theme.palette.primary.main} 10%, transparent)`,
        border: theme =>
          `1px solid color-mix(in srgb, ${theme.palette.primary.main} 25%, transparent)`,
        color: 'primary.main',
      }}
    >
      {mobileOpen ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
    </IconButton>
  )

  const splitPillSx = (segment: 'logo' | 'nav' | 'cta'): SxProps<Theme> => ({
    display: segment === 'nav' ? { xs: 'none', md: 'flex' } : 'flex',
    alignItems: 'center',
    height: NAV_HEIGHT,
    flexShrink: 0,
    transition: shapeTransition,
    opacity: splitOpacity,
    transform: `scale(${lerp(0.97, 1, splitOpacity)}) translateY(${lerp(6, 0, splitOpacity)}px)`,
    visibility: splitOpacity < 0.02 ? 'hidden' : 'visible',
    ...(segment === 'logo' && { pl: '25px', pr: '25px', py: '13px' }),
    ...(segment === 'nav' && { px: '81px', py: '13px' }),
    ...(segment === 'cta' && { p: '13px' }),
    ...navGlassPill(theme),
    willChange: 'opacity, transform',
  })

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
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: UNIFIED_MAX_WIDTH,
          height: NAV_HEIGHT,
        }}
      >
        {/* Split layer — 3 pills (scroll-down: spread | scroll-up: grouped) */}
        {isDesktop ? (
          <Box
            aria-hidden={unifiedOpacity > 0.95}
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              px: '20px',
              pointerEvents: t > 0.45 ? 'none' : 'auto',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: SPLIT_MAX_WIDTH,
              }}
            >
              <Box aria-hidden sx={outerSpacerSx} />
              <Box sx={splitPillSx('logo')}>{logo}</Box>
              <Box aria-hidden sx={innerSpacerSx} />
              <Box sx={splitPillSx('nav')}>{navLinksStack}</Box>
              <Box aria-hidden sx={innerSpacerSx} />
              <Box sx={splitPillSx('cta')}>{contactButton}</Box>
              <Box aria-hidden sx={outerSpacerSx} />
            </Box>
          </Box>
        ) : null}

        {/* Unified layer — single pill at scroll offset 0 */}
        <Box
          aria-hidden={isDesktop && unifiedOpacity < 0.05}
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: NAV_HEIGHT,
            px: '25px',
            py: '13px',
            opacity: isDesktop ? unifiedOpacity : 1,
            transform: `scale(${lerp(0.97, 1, unifiedOpacity)}) translateY(${lerp(6, 0, unifiedOpacity)}px)`,
            visibility: isDesktop && unifiedOpacity < 0.02 ? 'hidden' : 'visible',
            pointerEvents: isDesktop && t < 0.55 ? 'none' : 'auto',
            transition: shapeTransition,
            willChange: 'opacity, transform',
            ...navGlassPill(theme),
          }}
        >
          <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{logo}</Box>

          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
            }}
          >
            {navLinksStack}
          </Box>

          <Box
            sx={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            {contactButton}
            {mobileMenuButton}
          </Box>
        </Box>
      </Box>

      {mobileOpen ? (
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            mt: 1.25,
            width: '100%',
            maxWidth: UNIFIED_MAX_WIDTH,
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
