'use client'

import React, { useCallback, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { AnimatePresence, motion } from 'framer-motion'
import OrbitalAccentRail from './OrbitalAccentRail'
import OrbitalDeck from './OrbitalDeck'
import { SERVICES } from './data'
import { useOrbitalPointerParallax } from './useOrbitalPointerParallax'
import AnimatedButton from '@/components/shared/AnimatedButton'

const EASE = [0.22, 1, 0.36, 1] as const
const SLIDE_EASE = [0.16, 1.1, 0.3, 1] as const
const PANEL_TRANSITION = { duration: 0.48, ease: EASE } as const

const panelVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

interface ServicesOrbitalProps {
  data?: {
    is_shown?: boolean
    title?: string
    subtitle?: string | null
    description?: string | null
    button_is_shown?: boolean
    button_text?: string
    items?: Array<{
      id: number
      title: string
      description: string | null
      show_in_homepage: boolean
      icon: { url: string }
      tools?: Array<{
        id: number
        name: string
        icon?: { url: string }
      }>
    }>
  }
}

export default function ServicesOrbital({ data }: ServicesOrbitalProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const theme = useTheme()
  const isRtl = theme.direction === 'rtl'

  const itemsData = data?.items || []
  const mappedItems = itemsData.map((item, i) => ({
    title: item.title,
    cardDescription: item.description || '',
    description: item.description || '',
    Icon: item.icon?.url,
    tools: item.tools || [],
    tags: [],
    baseAngle: 112 + i * (360 / itemsData.length),
  }))

  const orbitalItems =
    mappedItems.length > 0
      ? mappedItems
      : SERVICES.map(s => ({
          ...s,
          tools: s.tags.map((t, idx) => ({
            id: idx,
            name: t,
          })),
        }))

  const activeIndex = hoveredIndex ?? selectedIndex
  const active = activeIndex !== null ? orbitalItems[activeIndex] : null
  const { offsetX, offsetY } = useOrbitalPointerParallax(sectionRef)

  const handleActivate = useCallback((index: number | null) => {
    if (index !== null) {
      setSelectedIndex(prev => (prev === index ? null : index))
    }
  }, [])

  const handleHover = useCallback((index: number | null) => {
    setHoveredIndex(index)
  }, [])

  if (data?.is_shown === false) return null

  // ── Shared header content ────────────────────────────────────────────────────
  const headerContent = data ? (
    <>
      {data.title && (
        <Typography
          sx={{
            mb: 3,
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '14px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.5em',
            color: 'primary.main',
          }}
        >
          {data.title}
        </Typography>
      )}

      {data.subtitle && (
        <Typography
          component="h2"
          sx={{
            mb: 1.5,
            fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
            fontSize: { xs: '2.1rem', sm: '2.6rem', lg: '2.85rem' },
            textTransform: 'uppercase',
            lineHeight: 1.18,
            letterSpacing: '0.02em',
            color: 'text.primary',
          }}
        >
          {data.subtitle}
        </Typography>
      )}

      {data.description && (
        <Typography
          sx={{
            mb: 3,
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: { xs: '18px', md: '22px' },
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'primary.main',
          }}
        >
          {data.description}
        </Typography>
      )}
    </>
  ) : (
    <>
      <Typography
        sx={{
          mb: 3,
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '14px',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.5em',
          color: 'primary.main',
        }}
      >
        What we do
      </Typography>

      <Typography
        component="h2"
        sx={{
          fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
          fontSize: { xs: '2.1rem', sm: '2.6rem', lg: '2.85rem' },
          textTransform: 'uppercase',
          lineHeight: 1.18,
          letterSpacing: '0.02em',
          color: 'text.primary',
        }}
      >
        Services built for{' '}
        <Box component="span" sx={{ color: 'primary.main' }}>
          ultra
        </Box>{' '}
        outcomes
      </Typography>
    </>
  )

  // ── Shared detail panel ──────────────────────────────────────────────────────
  const detailPanel = (
    <AnimatePresence initial={false} mode="popLayout">
      {active && (
        <Box
          component={motion.div}
          key={active.title}
          variants={panelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={PANEL_TRANSITION}
          sx={{ mt: 2.5, display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '31px' }}>
            <OrbitalAccentRail />

            <Box
              sx={{
                display: 'flex',
                minWidth: 0,
                flex: 1,
                flexDirection: 'column',
                gap: '11px',
              }}
            >
              <Typography
                component="h3"
                sx={{
                  fontSize: '20px',
                  fontWeight: 500,
                  letterSpacing: 0,
                  color: 'text.primary',
                }}
              >
                {active.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: 400,
                  lineHeight: 1.625,
                  color: 'text.secondary',
                }}
              >
                {active.description}
              </Typography>
            </Box>
          </Box>

          {active.tools && active.tools.length > 0 && (
            <Box sx={{ pl: '46px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {active.tools.map((tool: any) => (
                <Box
                  key={tool.name}
                  sx={theme => ({
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.2,
                    borderRadius: '9999px',
                    border: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
                    bgcolor: 'rgba(255, 255, 255, 0.03)',
                    px: 2.2,
                    py: '8px',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'text.secondary',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(13, 241, 217, 0.08)',
                      border: '1px solid rgba(13, 241, 217, 0.3)',
                      color: 'primary.main',
                    },
                  })}
                >
                  {tool.icon?.url && (
                    <Box
                      component="img"
                      src={tool.icon.url}
                      alt={tool.name}
                      sx={{ width: 16, height: 16, objectFit: 'contain' }}
                    />
                  )}
                  {tool.name}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
    </AnimatePresence>
  )

  // ── OrbitalDeck widget (shared) ──────────────────────────────────────────────
  const orbitalDeck = (
    <OrbitalDeck
      items={orbitalItems}
      onActivate={handleActivate}
      onHover={handleHover}
      activeIndex={activeIndex}
      selectedIndex={selectedIndex}
      eyeOffsetX={offsetX}
      eyeOffsetY={offsetY}
    />
  )

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="services"
      sx={{
        position: 'relative',
        py: { xs: 12, lg: 16 },
        pb: { xs: 14, lg: 20 },
        overflow: 'hidden',
      }}
    >
      {/* ── Mobile layout (< lg) ─────────────────────────────────────────────── */}
      <Box sx={{ display: { xs: 'flex', lg: 'none' }, flexDirection: 'column', width: '100%' }}>
        {/* Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: SLIDE_EASE }}
          sx={{
            px: { xs: 3, sm: 5 },
            mb: 4,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {headerContent}
        </Box>

        {/* Orbital deck — shifted to the right */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              transformOrigin: 'center right',
              transform: { xs: 'scale(0.72) translateX(30%)', sm: 'scale(0.88) translateX(28%)' },
            }}
          >
            {orbitalDeck}
          </Box>
        </Box>

        {/* Detail panel revealed on card click */}
        <Box sx={{ px: { xs: 3, sm: 5 }, mt: 2 }}>
          {detailPanel}
        </Box>

        {data?.button_is_shown !== false && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <AnimatedButton
              variant="secondary"
              href="/services"
              sx={{ px: 4, fontSize: 14 }}
            >
              {data?.button_text || 'View all services'}
            </AnimatedButton>
          </Box>
        )}
      </Box>

      {/* ── Desktop layout (≥ lg) ─────────────────────────────────────────────── */}
      <Grid
        container
        spacing={0}
        sx={{
          display: { xs: 'none', lg: 'flex' },
          position: 'relative',
          zIndex: 1,
          alignItems: 'start',
        }}
      >
        <Grid size={{ lg: 6 }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: isRtl ? 80 : -80, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, ease: SLIDE_EASE }}
            sx={{
              maxWidth: 576,
              ml: { lg: 8, xl: 'calc(max((100vw - 1920px) / 2 + 220px, 6px))' },
              pl: { md: 3, lg: 0 },
              pr: { md: 3, lg: 0 },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {headerContent}

              {detailPanel}

              {data?.button_is_shown !== false && (
                <Box sx={{ mt: 2 }}>
                  <AnimatedButton
                    variant="secondary"
                    href="/services"
                    sx={{ px: 4, fontSize: 18 }}
                  >
                    {data?.button_text || 'View all services'}
                  </AnimatedButton>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>

        <Grid size={{ lg: 6 }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              overflow: 'visible',
            }}
          >
            <Box
              sx={{
                transformOrigin: 'center right',
                transform: {
                  lg: 'scale(0.9) translateX(50px) translateY(-120px)',
                  xl: 'scale(1) translateX(80px) translateY(-120px)',
                },
              }}
            >
              {orbitalDeck}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
