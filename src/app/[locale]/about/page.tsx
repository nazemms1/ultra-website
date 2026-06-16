'use client'

import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import PageHero, { ShimmerText } from '@/components/shared/PageHero'
import PartnersSection from '@/components/sections/partners/PartnersSection'
import CTASection from '@/components/sections/cta/CTASection'
import { cardSurface, glassSurface } from '@/lib/theme/surfaces'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 60, damping: 12 },
  },
}

const values = [
  {
    title: 'INNOVATION',
    description:
      'We continuously push the boundaries of digital engineering, delivering ahead-of-time solutions to keep you competitive.',
  },
  {
    title: 'EXECUTION',
    description:
      'Our methodologies emphasize rapid, precise shipping of products with microsecond performance and bulletproof reliability.',
  },
  {
    title: 'PARTNERSHIP',
    description:
      'We act as an extension of your own team, aligning our goals with yours to create long-term shared value.',
  },
]

export default function AboutPage() {
  const theme = useTheme()

  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title={
          <>
            BEHIND THE <ShimmerText>ULTRA</ShimmerText> SOLUTIONS
          </>
        }
        subtitle="We are a group of specialized engineers, product strategists, and designers dedicated to elevating corporate systems to the ultra level."
      />

      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 3, lg: 5 }, pb: 12 }}
      >
        <Grid container spacing={6} sx={{ mb: 16, alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack component={motion.div} variants={itemVariants} spacing={3}>
              <Typography variant="h3" color="primary.main" sx={{ textTransform: 'uppercase' }}>
                Our Philosophy
              </Typography>
              <Typography variant="body1" color="text.secondary">
                At Ultrawares, we believe that software should not just run; it should fly. Every
                line of code we write and every layout we ship is optimized for extreme throughput
                and efficiency.
              </Typography>
              <Typography variant="body2" color="text.tertiary">
                We leverage modern architectural paradigms — from high-performance microservices and
                serverless infrastructure to reactive, responsive user interfaces.
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component={motion.div}
              variants={itemVariants}
              sx={{
                position: 'relative',
                p: 4,
                ...glassSurface(theme, { tint: 0.02, radius: '30px' }),
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -12,
                  left: -12,
                  width: 32,
                  height: 32,
                  borderTop: 2,
                  borderLeft: 2,
                  borderColor: 'primary.main',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -12,
                  right: -12,
                  width: 32,
                  height: 32,
                  borderBottom: 2,
                  borderRight: 2,
                  borderColor: 'primary.main',
                }}
              />
              <Typography variant="h4" sx={{ mb: 2, textTransform: 'uppercase' }}>
                Our Vision
              </Typography>
              <Typography variant="body2" color="text.secondary">
                To empower regional and international enterprises with top-tier technology
                infrastructure that turns complex workflows into effortless systems.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Stack spacing={8} sx={{ mb: 16 }}>
          <Typography variant="h2" sx={{ textTransform: 'uppercase', textAlign: 'center' }}>
            OUR CORE <ShimmerText>VALUES</ShimmerText>
          </Typography>

          <Grid container spacing={4}>
            {values.map(value => (
              <Grid key={value.title} size={{ xs: 12, md: 4 }}>
                <Stack
                  component={motion.div}
                  variants={itemVariants}
                  sx={theme => ({
                    ...cardSurface(theme),
                    p: 4,
                    height: '100%',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      borderColor: alpha(theme.palette.primary.main, 0.4),
                      boxShadow: `0 0 35px ${alpha(theme.palette.primary.main, 0.1)}`,
                    },
                  })}
                >
                  <Typography variant="h3" color="primary.main" sx={{ mb: 2, fontSize: '1.25rem' }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                  <Box
                    sx={{
                      mt: 4,
                      height: 4,
                      width: 48,
                      bgcolor: 'background.divider',
                      transition: 'background-color 0.3s ease',
                      '.MuiStack-root:hover > &': { bgcolor: 'primary.main' },
                    }}
                  />
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>

      <PartnersSection />
      <CTASection />
    </>
  )
}
