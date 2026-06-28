'use client'

import { ArrowRight } from 'lucide-react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ShimmerText from '@/components/shared/ShimmerText'
import { useSplashComplete } from '@/components/shared/SplashScreen'
import { motion, Variants } from 'framer-motion'
import AnimatedButton from '@/components/shared/AnimatedButton'
import { useTheme } from '@mui/material/styles'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
}

const makeItemVariants = (isRtl: boolean): Variants => ({
  hidden: {
    opacity: 0,
    x: isRtl ? 0 : -250,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 12,
    },
  },
})

interface HeroSectionProps {
  data?: {
    title?: string
    description?: string | null
    explore_button_label?: string
    get_in_touch_button_label?: string
    background_video?: {
      url: string
    }
  }
}
export default function HeroSection({ data }: HeroSectionProps) {
  const splashComplete = useSplashComplete()
  const theme = useTheme()
  const isRtl = theme.direction === 'rtl'
  const itemVariants = makeItemVariants(isRtl)

  const renderTitle = (title?: string) => {
    if (!title) {
      return (
        <>
          WITH <ShimmerText sx={{ color: 'primary.light' }}>ULTRAWARES</ShimmerText>
          <br />
          COMES ULTRA
          <br />
          SOLUTIONS
        </>
      )
    }

    const upperTitle = title.toUpperCase().trim()

    // English Match
    if (upperTitle.includes('WITH ULTRAWARES COMES ULTRA SOLUTIONS') || upperTitle === 'WITH ULTRAWARES COMES ULTRA SOLUTIONS') {
      return (
        <>
          WITH <ShimmerText sx={{ color: 'primary.light' }}>ULTRAWARES</ShimmerText>
          <br />
          COMES ULTRA
          <br />
          SOLUTIONS
        </>
      )
    }

    // Arabic Match (e.g. if title has ULTRAWARES and solutions/comes)
    if (title.includes('ULTRAWARES') && (title.includes('الحلول') || title.includes('تأتي'))) {
      return (
        <>
          مع <ShimmerText sx={{ color: 'primary.light' }}>ULTRAWARES</ShimmerText>
          <br />
          تأتي الحلول
          <br />
          القصوى
        </>
      )
    }

    // Generic formatter for titles containing ULTRAWARES
    if (upperTitle.includes('ULTRAWARES')) {
      const parts = title.split(/(ULTRAWARES)/i)
      return (
        <>
          {parts.map((part, index) => {
            if (part.toUpperCase() === 'ULTRAWARES') {
              return <ShimmerText key={index} sx={{ color: 'primary.light' }}>{part}</ShimmerText>
            }
            return part
          })}
        </>
      )
    }

    return title
  }

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {(!data || data.background_video?.url) && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            height: '100%',
            width: '100%',
            overflow: 'hidden',
            zIndex: 0,
          }}
        >
          <Box
            component="video"
            autoPlay
            muted
            loop
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <Box component="source" src={data?.background_video?.url || "/videos/hero.mp4"} type="video/mp4" />
          </Box>
        </Box>
      )}

      <Box
        sx={theme => ({
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          background: isRtl
            ? 'linear-gradient(to top, #121212 100%, rgba(18,18,18,0) 100%)'
            : 'linear-gradient(to top, #121212 0%, rgba(18,18,18,0) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        })}
      />

      <Box
        sx={theme => ({
          position: 'relative',
          zIndex: 2,
          flex: 1,
          display: 'flex',
          alignItems: 'flex-start',
          pt: '160px',
          maxWidth: theme.breakpoints.values.xl,
          mx: 'auto',
          width: '100%',
          minWidth: 0,
          px: { xs: 3, sm: 5, md: '80px' },
        })}
      >
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={splashComplete ? 'visible' : 'hidden'}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'start',
            width: '100%',
          }}
        >
          {(!data || data.title) && (
            <motion.div variants={itemVariants}>
              <Typography
                variant="h1"
                sx={theme => ({
                  mb: '10px',
                  fontSize: { lg: theme.typography.pxToRem(50) },
                  lineHeight: '78px',
                })}
              >
                {renderTitle(data?.title)}
              </Typography>
            </motion.div>
          )}

          {(!data || data.description) && (
            <motion.div variants={itemVariants}>
              <Typography
                variant="body1"
                sx={{ mb: 5, maxWidth: 625, color: 'text.secondary', fontSize: 25 }}
              >
                {data ? data.description : 'Ultrawares provides cutting-edge solutions for businesses wanting to optimize their operations and gain a competitive edge in an increasingly digital world.'}
              </Typography>
            </motion.div>
          )}

          {(!data || data.explore_button_label || data.get_in_touch_button_label) && (
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                {(!data || data.explore_button_label) && (
                  <AnimatedButton variant="primary" href="#services">
                    {data ? data.explore_button_label : 'Explore Services'}
                  </AnimatedButton>
                )}
                {(!data || data.get_in_touch_button_label) && (
                  <AnimatedButton
                    variant="secondary"
                    href="#contact"
                    endIcon={<ArrowRight size={14} />}
                  >
                    {data ? data.get_in_touch_button_label : 'Get In Touch'}
                  </AnimatedButton>
                )}
              </Box>
            </motion.div>
          )}
        </Box>
      </Box>
    </Box>
  )
}
