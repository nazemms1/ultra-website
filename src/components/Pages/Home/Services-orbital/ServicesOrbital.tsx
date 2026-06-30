'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import OrbitalAccentRail from './OrbitalAccentRail'
import OrbitalCard from './OrbitalCard'
import OrbitalDeck from './OrbitalDeck'
import OrbitalEmblem from './OrbitalEmblem'
import { SERVICES } from './data'
import { useOrbitalPointerParallax } from './useOrbitalPointerParallax'
import AnimatedButton from '@/components/shared/AnimatedButton'
import { shouldDisableScrollVideo } from '../ScrollVideoStack/deviceUtils'

const EASE = [0.22, 1, 0.36, 1] as const
const PANEL_TRANSITION = { duration: 0.48, ease: EASE } as const
const LAYOUT_TRANSITION = { layout: { duration: 0.55, ease: EASE } } as const

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
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const theme = useTheme()
  const isRtl = theme.direction === 'rtl'

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const isMob = shouldDisableScrollVideo()
    setIsMobile(isMob)
    if (isMob) {
      setSelectedIndex(0)
    }
  }, [])

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

  useEffect(() => {
    if (!isMobile) return

    const interval = setInterval(() => {
      const container = scrollContainerRef.current
      if (!container) return

      const cardWidth = 270 + 24 // CARD_W + gap
      const maxScroll = container.scrollWidth - container.clientWidth
      let newScrollLeft = container.scrollLeft + cardWidth

      if (newScrollLeft >= maxScroll + 10) {
        newScrollLeft = 0
      }

      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      })
    }, 4500)

    return () => clearInterval(interval)
  }, [isMobile, orbitalItems.length])

  const activeIndex = hoveredIndex ?? selectedIndex
  const active = activeIndex !== null ? orbitalItems[activeIndex] : null
  const { offsetX, offsetY } = useOrbitalPointerParallax(sectionRef)

  const handleActivate = useCallback((index: number | null) => {
    if (index !== null) {
      setSelectedIndex(index)
    }
  }, [])

  const handleHover = useCallback((index: number | null) => {
    setHoveredIndex(index)
  }, [])

  if (data?.is_shown === false) return null

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="services"
      sx={() => {
        return {
          position: 'relative',
          py: { xs: 12, lg: 16 },
          pb: { xs: 14, lg: 20 },
          overflow: 'hidden',
        }
      }}
    >
      {isMobile ? (
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mb: 5,
              textAlign: 'center',
              alignItems: 'center',
              px: { xs: 3, sm: 5 },
            }}
          >
            {data?.title && (
              <Typography
                sx={{
                  mb: 2,
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

            {data?.subtitle && (
              <Typography
                component="h2"
                sx={{
                  mb: 2,
                  fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
                  fontSize: { xs: '2.1rem', sm: '2.6rem' },
                  textTransform: 'uppercase',
                  lineHeight: 1.18,
                  letterSpacing: '0.02em',
                  color: 'text.primary',
                }}
              >
                {data.subtitle}
              </Typography>
            )}

            {data?.description && (
              <Typography
                sx={{
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
          </Box>

          {/* Horizontal Scrolling Row of OrbitalCards */}
          <Box
            ref={scrollContainerRef}
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              px: { xs: 3, sm: 5 },
              pb: 4,
              pt: 2,
              width: '100%',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {orbitalItems.map((item, idx) => (
              <Box
                key={item.title}
                onClick={() => {
                  setSelectedIndex(idx)
                  const container = scrollContainerRef.current
                  if (container) {
                    const cardWidth = 270 + 24
                    container.scrollTo({
                      left: idx * cardWidth,
                      behavior: 'smooth',
                    })
                  }
                }}
                sx={{
                  flexShrink: 0,
                  scrollSnapAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <OrbitalCard
                  title={item.title}
                  description={item.cardDescription}
                  Icon={item.Icon}
                  selected={idx === selectedIndex}
                  active={true}
                />
              </Box>
            ))}
          </Box>

          {/* Active Detail Box (Inline details, no Modal) */}
          {active && (
            <Box
              sx={{
                mt: 3,
                mx: { xs: 3, sm: 5 },
                p: 3,
                background:
                  'linear-gradient(135deg, rgba(13, 241, 217, 0.05) 0%, rgba(18, 18, 18, 0.9) 100%)',
                boxShadow:
                  '0px 0px 0px 1px rgba(13, 241, 217, 0.15) inset, 0px 8px 32px rgba(0, 0, 0, 0.4)',
                borderRadius: '20px',
                display: 'flex',
                gap: 2.5,
                alignItems: 'flex-start',
              }}
            >
              <OrbitalAccentRail />

              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, minWidth: 0, flex: 1 }}
              >
                <Typography
                  component="h3"
                  sx={{
                    fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                  }}
                >
                  {active.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: '#C0C0C0',
                  }}
                >
                  {active.description}
                </Typography>

                {active.tools && active.tools.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2, mt: 1 }}>
                    {active.tools.map((tool: any) => (
                      <Box
                        key={tool.name}
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1,
                          borderRadius: '9999px',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          bgcolor: 'rgba(255, 255, 255, 0.03)',
                          px: 2,
                          py: '6px',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: '#C0C0C0',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'rgba(13, 241, 217, 0.08)',
                            border: '1px solid rgba(13, 241, 217, 0.3)',
                            color: 'primary.main',
                          },
                        }}
                      >
                        {tool.icon?.url && (
                          <Box
                            component="img"
                            src={tool.icon.url}
                            alt={tool.name}
                            sx={{
                              width: 14,
                              height: 14,
                              objectFit: 'contain',
                            }}
                          />
                        )}
                        {tool.name}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          )}

          {data?.button_is_shown !== false && (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <AnimatedButton
                variant="secondary"
                href="/services"
                sx={{
                  px: 4,
                  fontSize: 14,
                }}
              >
                {data?.button_text || 'View all services'}
              </AnimatedButton>
            </Box>
          )}
        </Box>
      ) : (
        <Grid
          container
          spacing={0}
          sx={{
            position: 'relative',
            zIndex: 1,
            alignItems: 'start',
          }}
        >
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: isRtl ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: EASE }}
              sx={{
                maxWidth: 576,
                ml: { xs: 'auto', lg: 8, xl: 'calc(max((100vw - 1920px) / 2 + 220px, 6px))' },
                pl: { xs: 3, sm: 5, md: 3, lg: 0 },
                pr: { xs: 3, sm: 5, md: 3, lg: 0 },
                mr: { xs: 'auto', lg: 0 },
              }}
            >
              <LayoutGroup>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {data ? (
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
                  )}

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
                                    sx={{
                                      width: 16,
                                      height: 16,
                                      objectFit: 'contain',
                                    }}
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

                  {data?.button_is_shown !== false && (
                    <Box
                      component={motion.div}
                      layout
                      transition={LAYOUT_TRANSITION}
                      sx={{ mt: 2 }}
                    >
                      <AnimatedButton
                        variant="secondary"
                        href="/services"
                        sx={{
                          px: { xs: 2, md: 4 },
                          fontSize: { xs: 12, md: 18 },
                        }}
                      >
                        {data?.button_text || 'View all services'}
                      </AnimatedButton>
                    </Box>
                  )}
                </Box>
              </LayoutGroup>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', lg: 'flex-end' },
                overflow: { xs: 'hidden', lg: 'visible' },
                mr: { lg: 0 },
              }}
            >
              <Box
                sx={{
                  transformOrigin: { xs: 'center', lg: 'center right' },
                  transform: {
                    xs: 'scale(0.56)',
                    sm: 'scale(0.74)',
                    lg: 'scale(0.9) translateX(50px)',
                    xl: 'scale(1) translateX(80px)',
                  },
                }}
              >
                <OrbitalDeck
                  items={orbitalItems}
                  onActivate={handleActivate}
                  onHover={handleHover}
                  activeIndex={activeIndex}
                  selectedIndex={selectedIndex}
                  eyeOffsetX={offsetX}
                  eyeOffsetY={offsetY}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}
