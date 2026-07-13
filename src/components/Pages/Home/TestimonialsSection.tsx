'use client'

import { useState, useRef, useEffect, memo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { motion, AnimatePresence } from 'framer-motion'
import { alpha, useTheme } from '@mui/material/styles'
import Image from 'next/image'
import SectionHeader from '@/components/shared/SectionHeader'
import { glassSurface } from '@/lib/theme/surfaces'

interface TestimonialItem {
  id: number
  name: string
  role: string
  text: string
  avatar: string
  rating?: number | null
}

const ORBIT_RADIUS = 360
const INNER_RADIUS = 360

const OrbitStyles = memo(function OrbitStyles() {
  return (
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
  )
})

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

  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const avatarsContainerRef = useRef<HTMLDivElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current
        if (!video) return
        if (entry.isIntersecting) {
          video.currentTime = 0
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(section)
    return () => observer.disconnect()
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

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    if (testimonialsList.length > 1) {
      timerRef.current = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % testimonialsList.length)
      }, 5000)
    }
  }

  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [testimonialsList.length])

  // Scroll active avatar to center on mobile
  useEffect(() => {
    if (avatarsContainerRef.current) {
      const container = avatarsContainerRef.current
      const activeChild = container.children[activeIndex] as HTMLElement
      if (activeChild) {
        const containerWidth = container.clientWidth
        const childLeft = activeChild.offsetLeft
        const childWidth = activeChild.clientWidth
        container.scrollTo({
          left: childLeft - containerWidth / 2 + childWidth / 2,
          behavior: 'smooth',
        })
      }
    }
  }, [activeIndex])

  const handleAvatarClick = (index: number) => {
    setActiveIndex(index)
    resetTimer()
  }

  const getAvatarPosition = (index: number) => {
    const angleOffset = Math.PI / 2 // 90 degrees
    const angle = (index / testimonialsList.length) * 2 * Math.PI + angleOffset

    const x = Math.sin(angle) * ORBIT_RADIUS
    const y = Math.cos(angle) * ORBIT_RADIUS

    return { x, y }
  }

  if (!activeTestimonial) return null

  const videoUrl = (typeof data?.video === 'string' ? data.video : data?.video?.url) || '/videos/bg-video.webm'

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        pt: { xs: 20, md: 15 },
        pb: { xs: 10, md: 15 },
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Desktop only: background video */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="none"
        style={{
          display: 'none',
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        className="desktop-only-video"
      >
        <source src={videoUrl} type={videoUrl.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
      </video>

      {/* gradient overlays for desktop video */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '120px',
            background: 'linear-gradient(to bottom, rgba(18,18,18,0.7) 0%, rgba(18,18,18,0) 100%)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '120px',
            background: 'linear-gradient(to top, rgba(18,18,18,0.7) 0%, rgba(18,18,18,0) 100%)',
          },
        }}
      />

      <Box sx={{ zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <SectionHeader
          title={data?.title ?? 'What Customers Say About Us'}
          subtitle={data?.subtitle ?? 'Voices from the field'}
          align="center"
        />
      </Box>

      {/* Mobile Layout (Pure CSS flow) */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'relative',
          width: '100%',
          mt: 4,
          zIndex: 200,
          flexDirection: 'column',
          alignItems: 'center',
          px: 3,
          gap: 3,
        }}
      >
           <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: '100%',
              px: '18%',
              pt: '42%',
              pb: '42%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
             <Box
              component="img"
              src="/icons/Container.svg"
              alt=""
              sx={{
                position: 'absolute',
                top: '-15.66%',
                bottom: '-15.66%',
                left: '-19.44%',
                right: '-19.44%',
                width: '138.88%',
                height: '131.32%',
                objectFit: 'fill',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* Inner column */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}
            >

              {/* Logo above comment text */}
              <Box
                component="img"
                src="/icons/Frame 202.svg"
                alt="Ultra logo"
                sx={{ width: 84, height: 84, objectFit: 'contain', opacity: 0.85, mb: 1 }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  style={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
                >
                  <Typography
                    sx={{
                      alignSelf: 'stretch',
                      textAlign: 'center',
                      color: '#fff',
                      fontSize: isRtl ? '15px' : '16px',
                      fontFamily: isRtl ? "'Changa', sans-serif" : "'Rajdhani', sans-serif",
                      fontWeight: isRtl ? 400 : 500,
                      lineHeight: '26px',
                      wordBreak: 'break-word',
                      mb: '22px',
                      top: 10,
                    }}
                  >
                    {activeTestimonial.text}
                  </Typography>

                  {/* Stars — Figma: fontSize 16, Inter, color #0DF1D9, gap 4 */}
                  <Box sx={{ display: 'flex', gap: '4px', alignItems: 'flex-start', mb: '8px' }}>
                    {[...Array(activeTestimonial.rating ?? 5)].map((_, i) => (
                      <Typography key={i} sx={{ color: '#0DF1D9', fontSize: 16, fontFamily: 'Inter, sans-serif', fontWeight: 400, lineHeight: '24px' }}>★</Typography>
                    ))}
                  </Box>

                  {/* Name block — Figma: paddingTop 8, gap 4 */}
                  <Box sx={{ width: 235.3, pt: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    {/* Name — Figma: Nulshock 700, 14px, letterSpacing 1, lineHeight 21 */}
                    <Typography
                      sx={{
                        textAlign: 'center',
                        color: '#fff',
                        fontSize: '14px',
                        fontFamily: isRtl ? "'Almarai', sans-serif" : "'Nulshock', sans-serif",
                        fontWeight: 700,
                        lineHeight: '21px',
                        letterSpacing: '1px',
                        wordBreak: 'break-word',
                      }}
                    >
                      {activeTestimonial.name}
                    </Typography>

                    {/* Role — Figma: Rajdhani 400, 13px, uppercase, letterSpacing 2, lineHeight 19.5 */}
                    <Box sx={{ textAlign: 'center', width: '100%' }}>
                      {activeTestimonial.role.includes('·') ? (
                        <>
                          <Typography component="span" sx={{ color: 'rgba(255,255,255,0.60)', fontSize: 13, fontFamily: isRtl ? "'Changa', sans-serif" : "'Rajdhani', sans-serif", fontWeight: 400, textTransform: isRtl ? 'none' : 'uppercase', lineHeight: '19.5px', letterSpacing: '2px', wordBreak: 'break-word' }}>
                            {activeTestimonial.role.split('·')[0]}·{' '}
                          </Typography>
                          <Typography component="span" sx={{ color: '#0DF1D9', fontSize: 13, fontFamily: isRtl ? "'Changa', sans-serif" : "'Rajdhani', sans-serif", fontWeight: 400, textTransform: isRtl ? 'none' : 'uppercase', lineHeight: '19.5px', letterSpacing: '2px', wordBreak: 'break-word' }}>
                            {activeTestimonial.role.split('·')[1]}
                          </Typography>
                        </>
                      ) : (
                        <Typography component="span" sx={{ color: 'rgba(255,255,255,0.60)', fontSize: 13, fontFamily: isRtl ? "'Changa', sans-serif" : "'Rajdhani', sans-serif", fontWeight: 400, textTransform: isRtl ? 'none' : 'uppercase', lineHeight: '19.5px', letterSpacing: '2px', wordBreak: 'break-word' }}>
                          {activeTestimonial.role}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Box>

          {/* ── Avatar row — outside the card ── */}
          <Box
            ref={avatarsContainerRef}
            sx={{
              display: 'flex',
              gap: '16px',
              overflowX: 'auto',
              width: '100%',
              justifyContent: testimonialsList.length > 4 ? 'flex-start' : 'center',
              alignItems: 'center',
              py: 2,
              px: 2,
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {testimonialsList.map((item, idx) => {
              const isActive = idx === activeIndex
              return (
                <Box
                  key={item.id}
                  onClick={() => handleAvatarClick(idx)}
                  sx={{
                    position: 'relative',
                    width: isActive ? 76 : 60,
                    height: isActive ? 76 : 60,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: `2px solid ${isActive ? primary : alpha(primary, 0.18)}`,
                    boxShadow: isActive
                      ? `0 0 0 3px ${alpha(primary, 0.25)}, 0 0 20px ${alpha(primary, 0.55)}`
                      : 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    sizes="76px"
                    style={{
                      objectFit: 'cover',
                      opacity: isActive ? 1 : 0.45,
                      transition: 'opacity 0.3s ease',
                    }}
                  />
                </Box>
              )
            })}
          </Box>
        </Box>

        {/* Desktop Layout (Orbiting structure) */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            position: 'relative',
            width: ORBIT_RADIUS * 2 + 100,
            height: ORBIT_RADIUS * 2 + 100,
            alignItems: 'center',
            justifyContent: 'center',
            mt: 4,
            zIndex: 'auto',
          }}
        >
          <OrbitStyles />

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
              width: 640,
              height: 640,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 200,
              direction: 'ltr',
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
                width: 600,
                height: 600,
                padding: '32px',
                background: 'radial-gradient(circle at 50% 50%, rgba(13, 241, 217, 0.60) 0%, rgba(13, 241, 217, 0.35) 20%, transparent 75%)',
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
                    top: '305px',
                    left: '80px',
                    width: '440px',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '12px',
                    display: 'flex',
                  }}
                >
                  <Typography
                    sx={{
                      width: '440px',
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
                      height: 'auto',
                      paddingTop: '4px',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      display: 'flex',
                      flexShrink: 0,
                    }}
                  >
                    {/* Stars block placed directly above the name */}
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
              zIndex: 200,
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
                  onClick={() => handleAvatarClick(idx)}
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
                          top: -43,
                          left: -43,
                          right: -43,
                          bottom: -43,
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
                      width: 64,
                      height: 64,
                      animation: 'avatarRotate 60s linear infinite',
                    }}
                  >
                     <motion.div
                      animate={{
                        scale: isActive ? 1.5625 : 1,
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
                          sizes="100px"
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
      </Box>
   
  )
}
