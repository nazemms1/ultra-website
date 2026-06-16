'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import UltraButton from '@/components/shared/UltraButton'
import { glassSurface } from '@/lib/theme/surfaces'
import { navLinks, type NavLabels } from '@/components/Layout/navLinks'

type NavbarProps = {
  labels: NavLabels
}

export default function Navbar({ labels }: NavbarProps) {
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

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
          width: '100%',
          maxWidth: 1318,
          height: 68,
          ...glassSurface(theme, { tint: 0.04, radius: theme.shape.borderRadiusPill }),
          display: 'flex',
          alignItems: 'center',
          px: 3,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>
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
        </Box>

        <Stack
          direction="row"
          spacing={5}
          sx={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            display: { xs: 'none', md: 'flex' },
          }}
        >
          {navLinks.map(link => (
            <Box
              key={link.href}
              component={Link}
              href={link.href}
              sx={{
                fontWeight: 500,
                fontSize: '15px',
                letterSpacing: '0.4px',
                color: 'text.secondary',
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

        <Stack
          direction="row"
          spacing={1.5}
          sx={{ flex: '0 0 auto', ml: 'auto', alignItems: 'center' }}
        >
          <UltraButton
            variant="primary"
            href="/contact"
            sx={{ display: { xs: 'none', md: 'inline-flex' } }}
          >
            {labels.contact}
          </UltraButton>

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
        </Stack>
      </Box>

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
