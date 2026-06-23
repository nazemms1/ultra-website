'use client'

import { useCallback, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import OrbitalAccentRail from './OrbitalAccentRail'
import OrbitalDeck from './OrbitalDeck'
import { SERVICES } from './data'
import { useOrbitalPointerParallax } from './useOrbitalPointerParallax'
import AnimatedButton from '@/components/shared/AnimatedButton'

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
    description?: string | null
    button_is_shown?: boolean
    button_text?: string
    items?: Array<{
      id: number
      title: string
      description: string | null
      show_in_homepage: boolean
      icon: { url: string }
    }>
  }
}

export default function ServicesOrbital({ data }: ServicesOrbitalProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const itemsData = data?.items?.filter(item => item.show_in_homepage) || []
  const mappedItems = itemsData.map((item, i) => ({
    title: item.title,
    cardDescription: item.description || '',
    description: item.description || '',
    Icon: item.icon?.url,
    tags: [], // Tags can be populated later if added to API
    baseAngle: 112 + i * (360 / itemsData.length),
  }))

  // If no mappedItems, fallback to SERVICES from data or empty
  const orbitalItems = mappedItems.length > 0 ? mappedItems : SERVICES

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
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            sx={{
              maxWidth: 576,
              ml: { xs: 'auto', lg: 'calc((100vw - 1440px) / 2 + 80px)' },
              pl: { xs: 3, sm: 5, md: 0 },
              mr: { xs: 'auto', lg: 0 },
            }}
          >
            <LayoutGroup>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                  {data?.title || (
                    <>
                      Services built for{' '}
                      <Box component="span" sx={{ color: 'primary.main' }}>
                        ultra
                      </Box>{' '}
                      outcomes
                    </>
                  )}
                </Typography>

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

                      <Box sx={{ pl: '46px', display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
                        {active.tags?.map((tag: string) => (
                          <Box
                            key={tag}
                            sx={theme => ({
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 1,
                              borderRadius: '9999px',
                              border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                              px: 1.5,
                              py: '5px',
                              fontSize: '12px',
                              fontWeight: 400,
                              color: 'text.secondary',
                            })}
                          >
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                              }}
                            />
                            {tag}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                </AnimatePresence>

                {data?.button_is_shown !== false && (
                  <Box component={motion.div} layout transition={LAYOUT_TRANSITION} sx={{ mt: 2 }}>
                    <AnimatedButton
                      variant="secondary"
                      href="#services"
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
              mr: { lg: 'calc((100vw - 1440px) / -2)', xl: 0 },
            }}
          >
            <Box
              sx={{
                transformOrigin: { xs: 'center', lg: 'center right' },
                transform: {
                  xs: 'scale(0.56) translateX(50px)',
                  sm: 'scale(0.74) translateX(50px)',
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
    </Box>
  )
}
