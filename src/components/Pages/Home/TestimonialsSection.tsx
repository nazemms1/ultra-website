'use client'

import { useState, useEffect, useRef } from 'react'
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

const ORBIT_RADIUS = 300
const INNER_RADIUS = 300

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
  const scrollRef = useRef<HTMLDivElement>(null)

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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const scrollLeft = container.scrollLeft
    const width = container.clientWidth
    if (width > 0) {
      const scrollIndex = Math.round(Math.abs(scrollLeft) / width)
      if (scrollIndex !== activeIndex && scrollIndex >= 0 && scrollIndex < testimonialsList.length) {
        setActiveIndex(scrollIndex)
      }
    }
  }

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth
      const multiplier = isRtl ? -1 : 1
      scrollRef.current.scrollTo({
        left: index * width * multiplier,
        behavior: 'smooth',
      })
      setActiveIndex(index)
    }
  }

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
        // color: '#fff',
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
            // backgroundColor: alpha(theme.palette.background.default, 0.6),
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
          {/* Horizontal scroll container with scroll snapping */}
          <Box
            ref={scrollRef}
            onScroll={handleScroll}
            sx={{
              display: 'flex',
              gap: '16px',
              width: '100%',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {testimonialsList.map((item, idx) => (
              <Box
                key={item.id}
                sx={{
                  flex: '0 0 100%',
                  scrollSnapAlign: 'center',
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
                  {[...Array(item.rating || 5)].map((_, i) => (
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
                  {item.text}
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
                      src={item.avatar}
                      alt={item.name}
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
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '11px',
                        fontFamily: isRtl ? "'Changa', sans-serif" : "'Rajdhani', sans-serif",
                        mt: '2px',
                      }}
                    >
                      {item.role}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Dots Indicator (Synced with Scroll) */}
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
                onClick={() => scrollToCard(idx)}
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
          <style>{`
            @keyframes orbitRotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }
            @keyframes avatarRotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>

          {/* Outer solid border */}
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
              width: 580,
              height: 580,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                left: 0,
                top: 0,
                borderRadius: 16777200,
                border: '1px rgba(18, 18, 18, 0.95) solid',
                pointerEvents: 'none',
              }}
            />

            <Box
              sx={{
                width: 540,
                height: 540,
                padding: '32px',
                background: 'radial-gradient(ellipse 70.71% 70.71% at 50.00% 50.00%, rgba(13, 241, 217, 0.65) 0%, rgba(18, 18, 18, 0.95) 70%)',
                boxShadow: '0px 0px 80px -10px rgba(1, 177, 177, 0.40), 0px 0px 0px 1px rgba(18, 18, 18, 0.95) inset',
                borderRadius: "100%",
                filter: 'blur(0px)',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                overflow: 'hidden',
                position: 'relative',
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
                    position: 'absolute',
                    top: '260px',
                    left: '100px',
                    width: '340px',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '16px',
                    display: 'flex',
                  }}
                >
                  {activeTestimonial.rating === undefined ? (
                    <Box
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '4px',
                        display: 'flex',
                        flexShrink: 0,
                      }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <Typography key={i} sx={{ color: '#0DF1D9', fontSize: 16, fontFamily: "'Inter', sans-serif", fontWeight: '400', lineHeight: 1.5 }}>
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
                          gap: '4px',
                          display: 'flex',
                          flexShrink: 0,
                        }}
                      >
                        {[...Array(activeTestimonial.rating)].map((_, i) => (
                          <Typography key={i} sx={{ color: '#0DF1D9', fontSize: 16, fontFamily: "'Inter', sans-serif", fontWeight: '400', lineHeight: 1.5 }}>
                            ★
                          </Typography>
                        ))}
                      </Box>
                    )
                  )}

                  <Typography
                    sx={{
                      width: '340px',
                      textAlign: 'center',
                      color: 'white',
                      fontSize: isRtl ? '16px' : '18px',
                      fontFamily: isRtl ? "'Changa', sans-serif" : "'Rajdhani', sans-serif",
                      fontWeight: isRtl ? '400' : '500',
                      lineHeight: '26px',
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
                      width: '235.30px',
                      height: '52.50px',
                      paddingTop: '8px',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      display: 'flex',
                      flexShrink: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: '14px',
                        fontFamily: isRtl ? "'Almarai', sans-serif" : "'Nulshock', sans-serif",
                        fontWeight: '700',
                        lineHeight: '21px',
                        letterSpacing: '1px',
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
                              fontSize: 13,
                              fontFamily: isRtl ? "'Changa', sans-serif" : "'Rajdhani', sans-serif",
                              fontWeight: '400',
                              textTransform: isRtl ? 'none' : 'uppercase',
                              lineHeight: '19.50px',
                              letterSpacing: '2px',
                              wordBreak: 'break-word',
                            }}
                          >
                            {activeTestimonial.role.split('·')[0]}·
                          </Typography>
                          <Typography
                            component="span"
                            sx={{
                              color: '#0DF1D9',
                              fontSize: 13,
                              fontFamily: isRtl ? "'Changa', sans-serif" : "'Rajdhani', sans-serif",
                              fontWeight: '400',
                              textTransform: isRtl ? 'none' : 'uppercase',
                              lineHeight: '19.50px',
                              letterSpacing: '2px',
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
                            fontSize: 13,
                            fontFamily: isRtl ? "'Changa', sans-serif" : "'Rajdhani', sans-serif",
                            fontWeight: '400',
                            textTransform: isRtl ? 'none' : 'uppercase',
                            lineHeight: '19.50px',
                            letterSpacing: '2px',
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
          </Box>

          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 20,
              pointerEvents: 'none',
              animation: 'orbitRotate 60s linear infinite',
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
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.20, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: 'absolute',
                          top: -42,
                          left: -42,
                          right: -42,
                          bottom: -42,
                          borderRadius: 32856678,
                          border: '1.96px #0DF1D9 solid',
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Outer rotating wrapper - browser CSS animation guarantees no sync loss */}
                  <div
                    style={{
                      position: 'relative',
                      width: 56,
                      height: 56,
                      animation: 'avatarRotate 60s linear infinite',
                    }}
                  >
                    {/* Inner wrapper - handles scale, shadow, padding, etc. */}
                    <motion.div
                      animate={{
                        scale: isActive ? 1.607 : 1,
                      }}
                      transition={{
                        scale: { type: 'spring', stiffness: 300, damping: 20 },
                      }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        padding: isActive ? 0 : 4,
                        background: isActive
                          ? 'rgba(255, 255, 255, 0)'
                          : alpha('#fff', 0.1),
                        transition: 'padding 0.3s ease, background 0.3s ease',
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          borderRadius: isActive ? 20971500 : '50%',
                          overflow: 'hidden',
                          position: 'relative',
                          bgcolor: '#000',
                          boxShadow: isActive
                            ? '0px 0px 40px rgba(13, 241, 217, 0.70), 0px 0px 0px 3.75px #0DF1D9'
                            : 'none',
                          transition: 'box-shadow 0.3s ease, border-radius 0.3s ease',
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
                  </div>
                </Box>
              )
            })}
          </div>
        </Box>
      )}
    </Box>
  )
}
