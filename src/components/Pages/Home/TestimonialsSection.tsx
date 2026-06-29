'use client'

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { motion, AnimatePresence } from 'framer-motion'
import { alpha, useTheme } from '@mui/material/styles'
import Image from 'next/image'
import SectionHeader from '@/components/shared/SectionHeader'
import { shouldDisableScrollVideo } from './ScrollVideoStack/deviceUtils'

interface TestimonialItem {
  id: number
  name: string
  role: string
  text: string
  avatar: string
  rating?: number | null
}

const ORBIT_RADIUS = 280
const INNER_RADIUS = 200

interface TestimonialsSectionProps {
  data?: {
    is_shown?: boolean
    title?: string | null
    subtitle?: string | null
    video?: string | { url: string } | null
    items?: Array<{
      id: number
      name: string
      position: string
      comment: string
      rating?: number | null
      show_in_homepage: boolean
      image: {
        url: string
      }
    }>
  }
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const theme = useTheme()
  const primary = theme.palette.primary.main
  const isRtl = theme.direction === 'rtl'

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(shouldDisableScrollVideo())
  }, [])

  if (data?.is_shown === false) return null

  const items = data?.items?.filter(item => item.show_in_homepage) || []
  const mappedTestimonials: TestimonialItem[] = items.map(item => ({
    id: item.id,
    name: item.name,
    role: item.position || '',
    text: item.comment,
    avatar: item.image?.url || '',
    rating: item.rating,
  }))

  const testimonialsList: TestimonialItem[] = mappedTestimonials
  const activeTestimonial = testimonialsList[activeIndex] || testimonialsList[0]

  const getAvatarPosition = (index: number) => {
    const angleOffset = Math.PI / 2 // 90 degrees
    const angle = (index / testimonialsList.length) * 2 * Math.PI + angleOffset

    const x = Math.sin(angle) * ORBIT_RADIUS
    const y = Math.cos(angle) * ORBIT_RADIUS

    return { x, y }
  }

  if (!activeTestimonial) return null

  const videoUrl =
    (typeof data?.video === 'string' ? data.video : data?.video?.url) || '/videos/bg-video.webm'

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        py: { xs: 10, md: 15 },
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff',
      }}
    >
      {videoUrl && (
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src={videoUrl} type={videoUrl.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
        </Box>
      )}

      {videoUrl && (
        <Box
          sx={theme => ({
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
            backgroundColor: alpha(theme.palette.background.default, 0.6),
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '180px',
              background: 'linear-gradient(to bottom, #121212 0%, rgba(18,18,18,0) 100%)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '180px',
              background: 'linear-gradient(to top, #121212 0%, rgba(18,18,18,0) 100%)',
            },
          })}
        />
      )}
      <Box sx={{ zIndex: 2 }}>
        <SectionHeader
          title={data?.title ?? 'What Customers Say About Us'}
          subtitle={data?.subtitle ?? 'Voices from the field'}
          align="center"
        />
      </Box>

      {isMobile ? (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 'min(90vw, 480px)',
            mt: 4,
            px: 2,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              p: { xs: 3.5, sm: 4.5 },
              background: 'linear-gradient(135deg, rgba(13, 241, 217, 0.08) 0%, rgba(18, 18, 18, 0.85) 100%)',
              boxShadow: '0px 0px 0px 1px rgba(13, 241, 217, 0.2) inset, 0px 8px 32px rgba(0, 0, 0, 0.5)',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2.5,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.8,
              }}
            >
              <Box
                component="img"
                src="/icons/QuoteMark.svg"
                alt="Quote"
                sx={{
                  width: 32,
                  height: 32,
                  transform: isRtl ? 'none' : 'rotate(180deg)',
                }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: '4px',
              }}
            >
              {[...Array(activeTestimonial.rating || 5)].map((_, i) => (
                <Typography key={i} sx={{ color: '#0DF1D9', fontSize: 16, lineHeight: 1 }}>
                  ★
                </Typography>
              ))}
            </Box>

            <Typography
              sx={{
                textAlign: 'center',
                color: 'white',
                fontSize: isRtl ? '14px' : '15px',
                fontFamily: isRtl ? "'Changa', sans-serif" : "'Rajdhani', sans-serif",
                fontWeight: isRtl ? '400' : '500',
                lineHeight: 1.6,
                wordBreak: 'break-word',
                px: 1,
              }}
            >
              {activeTestimonial.text}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mt: 1,
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: `2px solid ${primary}`,
                  boxShadow: `0 0 10px ${alpha(primary, 0.4)}`,
                  flexShrink: 0,
                }}
              >
                <Image
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography
                  sx={{
                    color: 'white',
                    fontSize: '14px',
                    fontFamily: isRtl ? "'Almarai', sans-serif" : "'Nulshock', sans-serif",
                    fontWeight: '700',
                    lineHeight: '1.2',
                  }}
                >
                  {activeTestimonial.name}
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '11px',
                    fontFamily: isRtl ? "'Changa', sans-serif" : "'Rajdhani', sans-serif",
                    mt: '2px',
                  }}
                >
                  {activeTestimonial.role}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              mt: 3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {testimonialsList.map((_, idx) => (
              <Box
                key={idx}
                onClick={() => setActiveIndex(idx)}
                sx={{
                  width: idx === activeIndex ? 20 : 8,
                  height: 8,
                  borderRadius: '4px',
                  backgroundColor: idx === activeIndex ? primary : 'rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              />
            ))}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            position: 'relative',
            width: ORBIT_RADIUS * 2 + 100,
            height: ORBIT_RADIUS * 2 + 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 4,
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: ORBIT_RADIUS * 2 + 80,
              height: ORBIT_RADIUS * 2 + 80,
              borderRadius: '50%',
              border: `1px solid ${alpha(primary, 0.15)}`,
              zIndex: 0,
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              width: INNER_RADIUS * 2 + 40,
              height: INNER_RADIUS * 2 + 40,
              padding: '32px',
              background:
                'radial-gradient(ellipse 100% 60% at center top, rgba(13, 241, 217, 0.45) 0%, rgba(8, 15, 15, 0.75) 70%, rgba(5, 10, 10, 0.55) 100%)',
              boxShadow: '0px 0px 0px 1px rgba(13, 241, 217, 0.25) inset',
              borderRadius: '50%',
              filter: 'blur(0px)',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              overflow: 'hidden',
              zIndex: 10,
            }}
          >
            <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: 70,
                  width: 8,
                  height: 8,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    opacity: 0.96,
                    background: 'var(--Color-primary-2, #0DF1D9)',
                    borderRadius: '50%',
                  }}
                />
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  left: '27%',
                  top: 90,
                  width: 6,
                  height: 6,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    opacity: 0.96,
                    background: 'var(--Color-primary-2, #0DF1D9)',
                    borderRadius: '50%',
                  }}
                />
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  left: '73%',
                  top: 90,
                  width: 6,
                  height: 6,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    opacity: 0.96,
                    background: 'var(--Color-primary-2, #0DF1D9)',
                    borderRadius: '50%',
                  }}
                />
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  left: '16%',
                  top: 170,
                  width: 6,
                  height: 6,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    opacity: 0.6,
                    background: 'var(--Color-primary-2, #0DF1D9)',
                    borderRadius: '50%',
                  }}
                />
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  left: '84%',
                  top: 170,
                  width: 6,
                  height: 6,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    opacity: 0.6,
                    background: 'var(--Color-primary-2, #0DF1D9)',
                    borderRadius: '50%',
                  }}
                />
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  left: '20%',
                  top: 310,
                  width: 5,
                  height: 5,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    opacity: 0.4,
                    background: 'var(--Color-primary-2, #0DF1D9)',
                    borderRadius: '50%',
                  }}
                />
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  left: '80%',
                  top: 310,
                  width: 5,
                  height: 5,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    opacity: 0.4,
                    background: 'var(--Color-primary-2, #0DF1D9)',
                    borderRadius: '50%',
                  }}
                />
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: 370,
                  width: 4,
                  height: 4,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    opacity: 0.3,
                    background: 'var(--Color-primary-2, #0DF1D9)',
                    borderRadius: '50%',
                  }}
                />
              </Box>
            </Box>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{
                  width: '100%',
                  maxWidth: 280,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: isRtl ? 6 : 10,
                  display: 'flex',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Box
                    component="img"
                    src="/icons/QuoteMark.svg"
                    alt="Quote"
                    sx={{
                      width: isRtl ? 28 : 36,
                      height: isRtl ? 28 : 36,
                      transform: isRtl ? 'none' : 'rotate(180deg)',
                    }}
                  />
                </Box>

                {activeTestimonial.rating === undefined ? (
                  <Box
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '3px',
                      display: 'flex',
                      flexShrink: 0,
                    }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Typography key={i} sx={{ color: '#0DF1D9', fontSize: 14, lineHeight: 1 }}>
                        ★
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  activeTestimonial.rating !== null &&
                  activeTestimonial.rating > 0 && (
                    <Box
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '3px',
                        display: 'flex',
                        flexShrink: 0,
                      }}
                    >
                      {[...Array(activeTestimonial.rating)].map((_, i) => (
                        <Typography key={i} sx={{ color: '#0DF1D9', fontSize: 14, lineHeight: 1 }}>
                          ★
                        </Typography>
                      ))}
                    </Box>
                  )
                )}

                <Typography
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    color: 'white',
                    fontSize: isRtl ? 12 : 14,
                    fontFamily: isRtl ? "'Changa', sans-serif" : "'Rajdhani', sans-serif",
                    fontWeight: isRtl ? '400' : '500',
                    lineHeight: isRtl ? 1.6 : 1.5,
                    letterSpacing: isRtl ? 0 : undefined,
                    wordBreak: 'break-word',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: isRtl ? 4 : 5,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {activeTestimonial.text}
                </Typography>

                <Box
                  sx={{
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    display: 'flex',
                    flexShrink: 0,
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: isRtl ? 13 : 13,
                      fontFamily: isRtl ? "'Almarai', sans-serif" : "'Nulshock', sans-serif",
                      fontWeight: '700',
                      lineHeight: '21px',
                      letterSpacing: isRtl ? 0 : 1,
                      wordBreak: 'break-word',
                      width: '100%',
                    }}
                  >
                    {activeTestimonial.name}
                  </Typography>
                  <Box sx={{ textAlign: 'center', width: '100%' }}>
                    {activeTestimonial.role.includes('·') ? (
                      <>
                        <Typography
                          component="span"
                          sx={{
                            color: 'rgba(255,255,255,0.60)',
                            fontSize: 11,
                            fontFamily: isRtl ? "'Changa', sans-serif" : "'Rajdhani', sans-serif",
                            fontWeight: '400',
                            textTransform: isRtl ? 'none' : 'uppercase',
                            letterSpacing: isRtl ? 0 : 1.5,
                            wordBreak: 'break-word',
                          }}
                        >
                          {activeTestimonial.role.split('·')[0]}·
                        </Typography>
                        <Typography
                          component="span"
                          sx={{
                            color: '#0DF1D9',
                            fontSize: 11,
                            fontFamily: isRtl ? "'Changa', sans-serif" : "'Rajdhani', sans-serif",
                            fontWeight: '400',
                            textTransform: isRtl ? 'none' : 'uppercase',
                            letterSpacing: isRtl ? 0 : 1.5,
                            wordBreak: 'break-word',
                          }}
                        >
                          {activeTestimonial.role.split('·')[1]}
                        </Typography>
                      </>
                    ) : (
                      <Typography
                        component="span"
                        sx={{
                          color: 'rgba(255,255,255,0.60)',
                          fontSize: 11,
                          fontFamily: isRtl ? "'Changa', sans-serif" : "'Rajdhani', sans-serif",
                          fontWeight: '400',
                          textTransform: isRtl ? 'none' : 'uppercase',
                          letterSpacing: isRtl ? 0 : 1.5,
                          wordBreak: 'break-word',
                        }}
                      >
                        {activeTestimonial.role}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </motion.div>
            </AnimatePresence>
          </Box>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 20,
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: ORBIT_RADIUS * 2,
                height: ORBIT_RADIUS * 2,
                borderRadius: '50%',
                border: `1px dashed ${alpha(primary, 0.2)}`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />

            {testimonialsList.map((_, i) => {
              const angle = (i / testimonialsList.length) * 2 * Math.PI + Math.PI / 2
              const x = Math.sin(angle) * ORBIT_RADIUS
              const y = Math.cos(angle) * ORBIT_RADIUS
              return (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    bgcolor: primary,
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                />
              )
            })}

            {testimonialsList.map((testimonial, idx) => {
              const { x, y } = getAvatarPosition(idx)
              const isActive = idx === activeIndex

              return (
                <Box
                  key={testimonial.id}
                  onClick={() => setActiveIndex(idx)}
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                  }}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.2 : 1,
                      rotate: 360,
                    }}
                    transition={{
                      scale: { type: 'spring', stiffness: 300, damping: 20 },
                      rotate: { repeat: Infinity, duration: 60, ease: 'linear' },
                    }}
                    style={{
                      position: 'relative',
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      padding: 4,
                      background: isActive
                        ? `linear-gradient(135deg, ${primary}, transparent)`
                        : alpha('#fff', 0.1),
                      boxShadow: isActive ? `0 0 20px ${alpha(primary, 0.6)}` : 'none',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        position: 'relative',
                        bgcolor: '#000',
                      }}
                    >
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        style={{
                          objectFit: 'cover',
                          opacity: isActive ? 1 : 0.6,
                          transition: 'opacity 0.3s ease',
                        }}
                      />
                    </Box>
                  </motion.div>
                </Box>
              )
            })}
          </motion.div>
        </Box>
      )}
    </Box>
  )
}
