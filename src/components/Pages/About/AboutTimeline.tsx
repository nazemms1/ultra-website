'use client'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function parseNumericValue(raw: string | number): { numeric: number; prefix: string; suffix: string } {
  const str = String(raw).trim()
  const match = str.match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/)
  if (!match) return { numeric: 0, prefix: '', suffix: str }
  return { numeric: parseFloat(match[2]), prefix: match[1], suffix: match[3] }
}

interface AnimatedCounterProps {
  value: string | number
  symbol?: string
  sx?: object
}

function AnimatedCounter({ value, symbol = '', sx }: AnimatedCounterProps) {
  const { numeric, prefix, suffix } = parseNumericValue(value)
  const isDecimal = !Number.isInteger(numeric)

  const motionVal = useMotionValue(0)
  const displayed = useTransform(motionVal, v =>
    prefix + (isDecimal ? v.toFixed(1) : Math.round(v).toString()) + suffix + symbol
  )
  const [hovered, setHovered] = useState(false)
  const controlRef = useRef<ReturnType<typeof animate> | null>(null)
  const hasRunRef = useRef(false)
  const containerRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-80px' })

  const runAnimation = () => {
    if (controlRef.current) controlRef.current.stop()
    motionVal.set(0)
    controlRef.current = animate(motionVal, numeric, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    })
  }

  useEffect(() => {
    if (isInView && !hasRunRef.current) {
      hasRunRef.current = true
      const t = setTimeout(runAnimation, 200)
      return () => clearTimeout(t)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  const handleMouseEnter = () => {
    setHovered(true)
    runAnimation()
  }

  const handleMouseLeave = () => setHovered(false)

  return (
    <Typography
      component="span"
       ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        display: 'inline-block',
        cursor: 'default',
        transition: 'filter 0.2s ease',
        filter: hovered ? 'drop-shadow(0 0 8px rgba(13,241,217,0.7))' : 'none',
        ...sx,
      }}
    >
      <motion.span  >{displayed}</motion.span>
    </Typography>
  )
}

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
        px: { xs: '20px', md: 'max(80px, calc((100vw - 1920px) / 2 + 220px))' },
        bgcolor: '#121212',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          width: 500,
          height: 500,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Stack spacing={10} sx={{ maxWidth: '100%', mx: 'auto', position: 'relative', zIndex: 1 }}>
        <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Typography
            component="div"
            sx={{
              color: '#0DF1D9',
              fontSize: { xs: '13px', md: '14px' },
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '4px',
            }}
          >
            {eyebrowText}
          </Typography>
          <Typography
            component="div"
            variant="h2"
            sx={{
              fontSize: { xs: '28px', md: '44px' },
              fontWeight: 700,
              color: '#FAFAFA',
              textTransform: 'uppercase',
            }}
          >
            {titleText}
          </Typography>
        </Stack>

        <Box sx={{ position: 'relative', py: 4 }}>
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

                  <Box
                    sx={{
                      position: 'absolute',
                      left: '50%',
                      bottom: '-14px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      bgcolor: '#0DF1D9',
                      boxShadow: '0 0 10px rgba(13, 241, 217, 0.6)',
                      transform: 'translate(-50%, 0)',
                      zIndex: 2,
                      display: { xs: 'block', md: 'none' },
                    }}
                  />

                  <Box
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
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
                          component="div"
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
                              <AnimatedCounter
                                value={val.value}
                                symbol={val.symbol}
                                sx={{
                                  fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
                                  fontSize: { md: '40px', lg: '52px' },
                                  color: '#0DF1D9',
                                  fontWeight: 700,
                                  lineHeight: 1,
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: '14px',
                                  color: 'rgba(255, 255, 255, 0.45)',
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
                              <AnimatedCounter
                                value={val.value}
                                symbol={val.symbol}
                                sx={{
                                  fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
                                  fontSize: { md: '40px', lg: '52px' },
                                  color: '#0DF1D9',
                                  fontWeight: 700,
                                  lineHeight: 1,
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: '14px',
                                  color: 'rgba(255, 255, 255, 0.45)',
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
                          component="div"
                           sx={{
                            fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
                            fontSize: { md: '56px', lg: '72px' },
                            // fontWeight: 700,
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
                      display: { xs: 'flex', md: 'none' },
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      pb: 6,
                    }}
                  >
                    <Typography
                      component="div"
                      sx={{
                        fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
                        fontSize: '52px',
                        fontWeight: 700,
                        color: '#FAFAFA',
                        mb: 2.5,
                        lineHeight: 1,
                      }}
                    >
                      {item.year}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={3}
                      sx={{ justifyContent: 'center', flexWrap: 'wrap' }}
                    >
                      {item.values.map((val: any, vIdx: number) => (
                        <Box key={vIdx} sx={{ textAlign: 'center', minWidth: '70px' }}>
                          <AnimatedCounter
                            value={val.value}
                            symbol={val.symbol}
                            sx={{
                              fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
                              fontSize: '26px',
                              color: '#0DF1D9',
                              fontWeight: 700,
                              lineHeight: 1,
                            }}
                          />
                          <Typography
                            sx={{
                              fontFamily: '"Rajdhani", sans-serif',
                              fontSize: '9px',
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
                        </Box>
                      ))}
                    </Stack>
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
