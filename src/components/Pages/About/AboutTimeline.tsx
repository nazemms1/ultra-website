'use client'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'

interface AboutTimelineProps {
  statisticsData: any
  locale: string
}

export default function AboutTimeline({ statisticsData, locale }: AboutTimelineProps) {
  const years = [...(statisticsData?.years || [])]
    .sort((a, b) => parseInt(a.year) - parseInt(b.year))
    .map((y: any) => ({
      year: y.year,
      values: (y.values || []).map((val: any) => ({
        title: val.title,
        value: val.value,
        symbol: val.symbol,
      })),
    }))

  if (years.length === 0) return null

  const eyebrowText = statisticsData?.title || (locale === 'ar' ? 'مسارنا الزمني' : 'OUR TIMESTAMP')
  const titleText =
    statisticsData?.subtitle || (locale === 'ar' ? 'كيف تطورنا' : 'HOW WE DEVELOPED')

  return (
    <Box
      sx={{
        py: { xs: 8, md: 14 },
        px: { xs: 3, md: 'max(80px, calc((100vw - 1920px) / 2 + 160px))' },
        bgcolor: '#080A0A',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Glow Effects */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          width: 500,
          height: 500,
          background:
            'radial-gradient(circle, rgba(13, 241, 217, 0.04) 0%, rgba(13, 241, 217, 0) 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Stack spacing={10} sx={{ maxWidth: 1480, mx: 'auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Typography
            sx={{
              color: '#0DF1D9',
              fontSize: '12px',
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '4px',
            }}
          >
            {eyebrowText}
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
              fontSize: { xs: '28px', md: '44px' },
              fontWeight: 700,
              color: '#FAFAFA',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {titleText}
          </Typography>
        </Stack>

        {/* Timeline Grid Wrapper */}
        <Box sx={{ position: 'relative', py: 4 }}>
          {/* Vertical Line for Desktop */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background:
                'linear-gradient(to bottom, rgba(13, 241, 217, 0) 0%, rgba(13, 241, 217, 0.20) 15%, rgba(13, 241, 217, 0.20) 85%, rgba(13, 241, 217, 0) 100%)',
              transform: 'translateX(-50%)',
              display: { xs: 'none', md: 'block' },
            }}
          />

          {/* Vertical Line for Mobile */}
          <Box
            sx={{
              position: 'absolute',
              left: '16px',
              top: 0,
              bottom: 0,
              width: '2px',
              background:
                'linear-gradient(to bottom, rgba(13, 241, 217, 0) 0%, rgba(13, 241, 217, 0.20) 10%, rgba(13, 241, 217, 0.20) 90%, rgba(13, 241, 217, 0) 100%)',
              display: { xs: 'block', md: 'none' },
            }}
          />

          <Stack spacing={{ xs: 4, md: 12 }}>
            {years.map((item, index) => {
              const isEven = index % 2 === 0

              return (
                <Box key={item.year} sx={{ position: 'relative' }}>
                  {/* Central Node for Desktop */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: '21.18px',
                      height: '21.18px',
                      borderRadius: '50%',
                      bgcolor: '#0DF1D9',
                      boxShadow: '0 0 10px rgba(13, 241, 217, 0.6)',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 2,
                      display: { xs: 'none', md: 'block' },
                    }}
                  />

                  {/* Node for Mobile */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: '16px',
                      top: '24px',
                      width: '21.18px',
                      height: '21.18px',
                      borderRadius: '50%',
                      bgcolor: '#0DF1D9',
                      boxShadow: '0 0 10px rgba(13, 241, 217, 0.6)',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 2,
                      display: { xs: 'block', md: 'none' },
                    }}
                  />

                  {/* Desktop Layout */}
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    {/* Left Side */}
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0, x: -60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      sx={{
                        width: '50%',
                        pr: '68px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {isEven ? (
                        <Typography
                          sx={{
                            fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
                            fontSize: { md: '56px', lg: '72px' },
                            fontWeight: 700,
                            color: '#FAFAFA',
                            lineHeight: 1,
                          }}
                        >
                          {item.year}
                        </Typography>
                      ) : (
                        <Stack
                          direction="row"
                          spacing="40px"
                          sx={{ maxWidth: 520, justifyContent: 'flex-end', width: '100%' }}
                        >
                          {item.values.map((val: any, vIdx: number) => (
                            <Box key={vIdx} sx={{ textAlign: 'right', minWidth: '90px' }}>
                              <Typography
                                sx={{
                                  fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
                                  fontSize: { md: '26px', lg: '30px' },
                                  color: '#0DF1D9',
                                  fontWeight: 700,
                                  lineHeight: 1,
                                }}
                              >
                                {val.value}
                                {val.symbol}
                              </Typography>
                              <Typography
                                sx={{
                                  fontFamily: '"Rajdhani", sans-serif',
                                  fontSize: '11px',
                                  color: 'rgba(255, 255, 255, 0.45)',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                  mt: 1.5,
                                  lineHeight: 1.25,
                                  fontWeight: 600,
                                }}
                              >
                                {val.title}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>
                      )}
                    </Box>

                    {/* Right Side */}
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0, x: 60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      sx={{
                        width: '50%',
                        pl: '68px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                    >
                      {isEven ? (
                        <Stack
                          direction="row"
                          spacing="40px"
                          sx={{ maxWidth: 520, justifyContent: 'flex-start', width: '100%' }}
                        >
                          {item.values.map((val: any, vIdx: number) => (
                            <Box key={vIdx} sx={{ textAlign: 'left', minWidth: '90px' }}>
                              <Typography
                                sx={{
                                  fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
                                  fontSize: { md: '26px', lg: '30px' },
                                  color: '#0DF1D9',
                                  fontWeight: 700,
                                  lineHeight: 1,
                                }}
                              >
                                {val.value}
                                {val.symbol}
                              </Typography>
                              <Typography
                                sx={{
                                  fontFamily: '"Rajdhani", sans-serif',
                                  fontSize: '11px',
                                  color: 'rgba(255, 255, 255, 0.45)',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                  mt: 1.5,
                                  lineHeight: 1.25,
                                  fontWeight: 600,
                                }}
                              >
                                {val.title}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>
                      ) : (
                        <Typography
                          sx={{
                            fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
                            fontSize: { md: '56px', lg: '72px' },
                            fontWeight: 700,
                            color: '#FAFAFA',
                            lineHeight: 1,
                          }}
                        >
                          {item.year}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  {/* Mobile Layout */}
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6 }}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                      pl: 5,
                      pb: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
                        fontSize: '36px',
                        fontWeight: 700,
                        color: '#FAFAFA',
                        mb: 2,
                        lineHeight: 1,
                      }}
                    >
                      {item.year}
                    </Typography>
                    <Grid container spacing={2.5}>
                      {item.values.map((val: any, vIdx: number) => (
                        <Grid key={vIdx} size={{ xs: 6 }}>
                          <Typography
                            sx={{
                              fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
                              fontSize: '20px',
                              color: '#0DF1D9',
                              fontWeight: 700,
                              lineHeight: 1,
                            }}
                          >
                            {val.value}
                            {val.symbol}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: '"Rajdhani", sans-serif',
                              fontSize: '10px',
                              color: 'rgba(255, 255, 255, 0.45)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              mt: 0.75,
                              lineHeight: 1.2,
                              fontWeight: 600,
                            }}
                          >
                            {val.title}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              )
            })}
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
