'use client'

import  { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { motion, AnimatePresence } from 'framer-motion'
import { alpha, useTheme } from '@mui/material/styles'
import Image from 'next/image'
 

interface TestimonialItem {
  id: number
  name: string
  role: string
  text: string
  avatar: string
  rating?: number | null
}

 const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: 'SOPHIA ORTEGA',
    role: 'CHIEF DESIGN OFFICER · HALCYON',
    text: 'Pixel-tight, performance-obsessed, and remarkably calm under pressure. They turned our roadmap into a real product faster than we thought was possible.',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
  {
    id: 2,
    name: 'MARCUS CHEN',
    role: 'CTO · NEXUS CORP',
    text: 'Working with Ultrawares was a game-changer. Their technical expertise and attention to detail ensured our platform launched flawlessly.',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 3,
    name: 'ELENA RODRIGUEZ',
    role: 'FOUNDER · SPARK INNOVATION',
    text: 'The team at Ultrawares doesn’t just build software; they build exceptional digital experiences. Truly a partner in every sense.',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 4,
    name: 'JAMES WILSON',
    role: 'VP ENGINEERING · ACME INC',
    text: 'Unparalleled dedication to quality. The communication was transparent, and the delivery was on time and exceeded our expectations.',
    avatar: 'https://i.pravatar.cc/150?img=33',
  },
  {
    id: 5,
    name: 'AISHA PATEL',
    role: 'PRODUCT MANAGER · ZENITH',
    text: 'Their design-driven approach and engineering rigor resulted in a product that our users absolutely love. Highly recommended!',
    avatar: 'https://i.pravatar.cc/150?img=20',
  },
  {
    id: 6,
    name: 'LUCAS VANT',
    role: 'HEAD OF GROWTH · LUMINA',
    text: 'Working with Ultrawares was the best decision for our rebranding. They seamlessly blended aesthetics with top-tier performance.',
    avatar: 'https://i.pravatar.cc/150?img=60',
  },
]

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

  if (data?.is_shown === false) return null

  const items = data?.items?.filter(item => item.show_in_homepage) || []
  const mappedTestimonials: TestimonialItem[] = items.map((item, index) => ({
    id: item.id,
    name: item.name,
    role: item.position || '',
    text: item.comment,
    avatar: item.image?.url || '',
    rating: item.rating,
  }))

  const testimonialsList: TestimonialItem[] = mappedTestimonials.length > 0 ? mappedTestimonials : TESTIMONIALS
  const activeTestimonial = testimonialsList[activeIndex] || testimonialsList[0]

  const getAvatarPosition = (index: number) => {
    const angleOffset = Math.PI / 2 // 90 degrees
    const angle = (index / testimonialsList.length) * 2 * Math.PI + angleOffset
    
    const x = Math.sin(angle) * ORBIT_RADIUS
    const y = Math.cos(angle) * ORBIT_RADIUS

    return { x, y }
  }

  if (!activeTestimonial) return null

  const videoUrl = (typeof data?.video === 'string' ? data.video : data?.video?.url) || "/videos/bg-video.webm"

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
        color: '#fff'
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
              background: `linear-gradient(to bottom, ${theme.palette.background.default} 0%, transparent 100%)`,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '180px',
              background: `linear-gradient(to top, ${theme.palette.background.default} 0%, transparent 100%)`,
            },
          })}
        />
      )}
      <Box sx={{ textAlign: 'center', mb: 8, zIndex: 2 }}>
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 500,
            fontSize: '12px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'primary.main',
            mb: '16px',
          }}
        >
          {data ? data.subtitle : "Voices from the field"}
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
            fontWeight: 400,
            fontSize: { xs: '28px', md: '40px' },
            lineHeight: 1.1,
            letterSpacing: '1.5px',
            color: 'text.primary',
            textTransform: 'uppercase'
          }}
        >
          {data?.title ? (
            data.title
          ) : (
            <>
              What <Box component="span" sx={{ color: 'primary.main' }}>Customers</Box> Say About Us
            </>
          )}
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'relative',
          width: ORBIT_RADIUS * 2 + 100,
          height: ORBIT_RADIUS * 2 + 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 4,
          zIndex: 2
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
            background: 'radial-gradient(ellipse 70.71% 70.71% at 50.00% 50.00%, rgba(13, 241, 217, 0.12) 0%, rgba(18, 18, 18, 0.95) 70%)',
            boxShadow: '0px 0px 80px -10px rgba(1, 177, 177, 0.40), 0px 0px 0px 1px rgba(13, 241, 217, 0.30) inset',
            borderRadius: '50%',
            filter: 'blur(0px)',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'inline-flex',
            zIndex: 10,
          }}
        >
          <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <Box sx={{ position: 'absolute', left: 220, top: 70, width: 8, height: 8, transform: 'translate(-50%, -50%)' }}>
              <Box sx={{ width: '100%', height: '100%', position: 'relative', opacity: 0.96, background: 'var(--Color-primary-2, #0DF1D9)', borderRadius: '50%' }} />
            </Box>
            
            <Box sx={{ position: 'absolute', left: 120, top: 90, width: 6, height: 6, transform: 'translate(-50%, -50%)' }}>
              <Box sx={{ width: '100%', height: '100%', position: 'relative', opacity: 0.96, background: 'var(--Color-primary-2, #0DF1D9)', borderRadius: '50%' }} />
            </Box>
            
            <Box sx={{ position: 'absolute', left: 320, top: 90, width: 6, height: 6, transform: 'translate(-50%, -50%)' }}>
              <Box sx={{ width: '100%', height: '100%', position: 'relative', opacity: 0.96, background: 'var(--Color-primary-2, #0DF1D9)', borderRadius: '50%' }} />
            </Box>
            
            <Box sx={{ position: 'absolute', left: 70, top: 170, width: 6, height: 6, transform: 'translate(-50%, -50%)' }}>
              <Box sx={{ width: '100%', height: '100%', position: 'relative', opacity: 0.6, background: 'var(--Color-primary-2, #0DF1D9)', borderRadius: '50%' }} />
            </Box>
            
            <Box sx={{ position: 'absolute', left: 370, top: 170, width: 6, height: 6, transform: 'translate(-50%, -50%)' }}>
              <Box sx={{ width: '100%', height: '100%', position: 'relative', opacity: 0.6, background: 'var(--Color-primary-2, #0DF1D9)', borderRadius: '50%' }} />
            </Box>
            
            <Box sx={{ position: 'absolute', left: 90, top: 310, width: 5, height: 5, transform: 'translate(-50%, -50%)' }}>
              <Box sx={{ width: '100%', height: '100%', position: 'relative', opacity: 0.4, background: 'var(--Color-primary-2, #0DF1D9)', borderRadius: '50%' }} />
            </Box>
            
            <Box sx={{ position: 'absolute', left: 350, top: 310, width: 5, height: 5, transform: 'translate(-50%, -50%)' }}>
              <Box sx={{ width: '100%', height: '100%', position: 'relative', opacity: 0.4, background: 'var(--Color-primary-2, #0DF1D9)', borderRadius: '50%' }} />
            </Box>
            
            <Box sx={{ position: 'absolute', left: 220, top: 370, width: 4, height: 4, transform: 'translate(-50%, -50%)' }}>
              <Box sx={{ width: '100%', height: '100%', position: 'relative', opacity: 0.3, background: 'var(--Color-primary-2, #0DF1D9)', borderRadius: '50%' }} />
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
                height: 256.50,
                maxWidth: 340,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 16,
                display: 'inline-flex'
              }}
            >
              <Box sx={{ width: 36, height: 28, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box component="img" src="/icons/QuoteMark.svg" alt="Quote" sx={{ width: 48, height: 48, transform: 'rotate(180deg)' }} />
              </Box>
              
              {activeTestimonial.rating === undefined ? (
                /* Fallback for local mock data without rating property */
                <Box sx={{ justifyContent: 'flex-start', alignItems: 'flex-start', gap: '4px', display: 'inline-flex' }}>
                  {[...Array(5)].map((_, i) => (
                    <Box key={i} sx={{ width: 13.33, height: 24, position: 'relative' }}>
                      <Typography sx={{ left: -1, top: -2, position: 'absolute', textAlign: 'center', color: '#0DF1D9', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: '24px', wordBreak: 'break-word' }}>★</Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                /* Dynamic rating from backend (number or null) */
                activeTestimonial.rating !== null && activeTestimonial.rating > 0 && (
                  <Box sx={{ justifyContent: 'flex-start', alignItems: 'flex-start', gap: '4px', display: 'inline-flex' }}>
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <Box key={i} sx={{ width: 13.33, height: 24, position: 'relative' }}>
                        <Typography sx={{ left: -1, top: -2, position: 'absolute', textAlign: 'center', color: '#0DF1D9', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: '24px', wordBreak: 'break-word' }}>★</Typography>
                      </Box>
                    ))}
                  </Box>
                )
              )}
              
              <Typography sx={{ width: 340, textAlign: 'center', color: 'white', fontSize: 18, fontFamily: 'Rajdhani', fontWeight: '500', lineHeight: '26px', wordBreak: 'break-word' }}>
                {activeTestimonial.text}
              </Typography>
              
              <Box sx={{ width: 235.30, height: 52.50, pt: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: '4px', display: 'flex' }}>
                <Box sx={{ width: 155.84, height: 21, position: 'relative' }}>
                  <Typography sx={{ left: 1, top: 0, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Nulshock, sans-serif', fontWeight: '700', lineHeight: '21px', letterSpacing: 1, wordBreak: 'break-word', width: '100%' }}>
                    {activeTestimonial.name}
                  </Typography>
                </Box>
                <Box sx={{ width: 235.30, height: 19.50, position: 'relative' }}>
                  <Box sx={{ left: 1, top: -0.50, position: 'absolute', textAlign: 'center', width: '100%' }}>
                    {activeTestimonial.role.includes('·') ? (
                      <>
                        <Typography component="span" sx={{ color: 'rgba(255, 255, 255, 0.60)', fontSize: 13, fontFamily: 'Rajdhani', fontWeight: '400', textTransform: 'uppercase', lineHeight: '19.50px', letterSpacing: 2, wordBreak: 'break-word' }}>
                          {activeTestimonial.role.split('·')[0]}· 
                        </Typography>
                        <Typography component="span" sx={{ color: '#0DF1D9', fontSize: 13, fontFamily: 'Rajdhani', fontWeight: '400', textTransform: 'uppercase', lineHeight: '19.50px', letterSpacing: 2, wordBreak: 'break-word' }}>
                          {activeTestimonial.role.split('·')[1]}
                        </Typography>
                      </>
                    ) : (
                      <Typography component="span" sx={{ color: 'rgba(255, 255, 255, 0.60)', fontSize: 13, fontFamily: 'Rajdhani', fontWeight: '400', textTransform: 'uppercase', lineHeight: '19.50px', letterSpacing: 2, wordBreak: 'break-word' }}>
                        {activeTestimonial.role}
                      </Typography>
                    )}
                  </Box>
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
                    rotate: { repeat: Infinity, duration: 60, ease: 'linear' }
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
    </Box>
  )
}
