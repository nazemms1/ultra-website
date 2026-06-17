'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { AnimatePresence, motion } from 'framer-motion'
import OrbitalDeck from './OrbitalDeck'
import ViewAllButton from './ViewAllButton'
import { DEFAULT_SERVICE_INDEX, SERVICES } from './data'

const EASE = [0.22, 1, 0.36, 1] as const

export default function ServicesOrbital() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const isHovered = activeIndex !== null
  const active = SERVICES[activeIndex ?? DEFAULT_SERVICE_INDEX]

  return (
    <Box
      component="section"
      id="services"
      sx={{
        position: 'relative',
        py: { xs: 12, lg: 16 },
        overflow: 'clip',
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          position: 'relative',
          zIndex: 1,
          alignItems: 'center',
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                component={motion.div}
                animate={{ y: isHovered ? 0 : 160 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
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
                    fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
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

                <Box
                  component={motion.div}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 24,
                  }}
                  transition={{ duration: 0.5, ease: EASE }}
                  sx={{
                    mt: 5,
                    display: 'flex',
                    gap: 2.5,
                    pointerEvents: isHovered ? 'auto' : 'none',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      mt: 1,
                      display: { xs: 'none', sm: 'block' },
                      width: '10px',
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      sx={theme => ({
                        position: 'absolute',
                        left: '50%',
                        top: 0,
                        width: 10,
                        height: 10,
                        transform: 'translateX(-50%)',
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        boxShadow: `0 0 10px 2px ${alpha(theme.palette.primary.main, 0.7)}`,
                      })}
                    />
                    <Box
                      sx={theme => ({
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        top: '10px',
                        width: '3px',
                        transform: 'translateX(-50%)',
                        background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.4)}, transparent)`,
                      })}
                    />
                  </Box>

                  <Box>
                    <AnimatePresence mode="wait">
                      <Box
                        component={motion.div}
                        key={active.title}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.28, ease: EASE }}
                      >
                        <Typography
                          component="h3"
                          sx={{
                            mb: 1.5,
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
                        <Box sx={{ mt: 2.5, display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
                          {active.tags.map(tag => (
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
                    </AnimatePresence>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mt: 5 }}>
                <ViewAllButton />
              </Box>
            </Box>
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
                  xs: 'scale(0.56)',
                  sm: 'scale(0.74)',
                  lg: 'scale(0.9)',
                  xl: 'scale(1)',
                },
              }}
            >
              <OrbitalDeck onActivate={setActiveIndex} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
