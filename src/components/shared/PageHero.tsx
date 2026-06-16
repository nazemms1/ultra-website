'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import ShimmerText from '@/components/shared/ShimmerText'
import { eyebrowBadgeSx, glowOrb } from '@/lib/theme/surfaces'

type PageHeroProps = {
  eyebrow: string
  title: React.ReactNode
  subtitle?: string
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 50, damping: 14 },
  },
}

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        pt: { xs: '140px', md: '160px' },
        pb: { xs: 6, md: 8 },
        px: { xs: 3, md: 6 },
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      <Box sx={{ ...glowOrb, top: 0, right: '25%', width: 500, height: 500, opacity: 1 }} />
      <Box
        sx={{
          ...glowOrb,
          bottom: 80,
          left: '25%',
          width: 400,
          height: 400,
          opacity: 0.6,
        }}
      />

      <Stack
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        spacing={2}
        sx={{
          maxWidth: 1280,
          mx: 'auto',
          position: 'relative',
          zIndex: 1,
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box component={motion.div} variants={itemVariants} sx={eyebrowBadgeSx}>
          {eyebrow}
        </Box>

        <Typography
          component={motion.h1}
          variants={itemVariants}
          variant="h2"
          sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', maxWidth: 900 }}
        >
          {title}
        </Typography>

        {subtitle ? (
          <Typography
            component={motion.p}
            variants={itemVariants}
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 620, textTransform: 'uppercase', letterSpacing: '0.06em' }}
          >
            {subtitle}
          </Typography>
        ) : null}
      </Stack>
    </Box>
  )
}

export { ShimmerText }
