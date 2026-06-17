'use client'

import { ArrowRight } from 'lucide-react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ShimmerText from '@/components/shared/ShimmerText'
import { motion, Variants } from 'framer-motion'
import AnimatedButton from '@/components/shared/AnimatedButton'

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

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -250,
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
}

export default function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box
        component="video"
        autoPlay
        muted
        loop
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <Box component="source" src="/videos/hero.mp4" type="video/mp4" />
      </Box>

      <Box
        sx={theme => ({
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: `linear-gradient(to top, ${theme.palette.background.elevated} 0%, transparent 100%)`,
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
          px: { xs: 3, sm: 5, md: '80px' },
        })}
      >
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
          }}
        >
          <motion.div variants={itemVariants}>
            <Typography variant="h1" sx={{ mb: '10px', fontSize: 50, lineHeight: '78px' }}>
              WITH <ShimmerText sx={{ color: 'primary.main' }}>ULTRAWARES</ShimmerText>
              <br />
              COMES ULTRA
              <br />
              SOLUTIONS
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              sx={{ mb: 5, maxWidth: 625, color: 'text.secondary', fontSize: 25 }}
            >
              Ultrawares provides cutting-edge solutions for businesses wanting to optimize their
              operations and gain a competitive edge in an increasingly digital world.
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <AnimatedButton variant="primary" href="#services">
                Explore Services
              </AnimatedButton>
              <AnimatedButton
                variant="secondary"
                href="#contact"
                endIcon={<ArrowRight size={14} />}
              >
                Get In Touch
              </AnimatedButton>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  )
}
