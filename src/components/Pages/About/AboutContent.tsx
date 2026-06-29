'use client'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'

interface AboutContentProps {
  aboutData: any
  locale: string
}

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
    transition: { type: 'spring' as const, stiffness: 60, damping: 14 },
  },
}

export default function AboutContent({ aboutData, locale }: AboutContentProps) {
  const items = [...(aboutData?.header?.items || [])]
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((item: any) => ({
      title: item.title,
      paragraphs: item.description
        ? item.description.split(/\r?\n/).filter((p: string) => p.trim() !== '')
        : []
    }))

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 'max(80px, calc((100vw - 1920px) / 2 + 160px))' },
        bgcolor: '#080A0A',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        sx={{ maxWidth: 1480, mx: 'auto' }}
      >
        <Stack spacing={{ xs: 6, md: 10 }}>
          {items.map((item: any, index: number) => (
            <Grid
              container
              key={index}
              spacing={{ xs: 3, md: 6 }}
              component={motion.div}
              variants={itemVariants}
              sx={{
                borderBottom: index < items.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                pb: { xs: 6, md: 8 },
              }}
            >
              {/* Left Column: Title */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography
                  sx={{
                    fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
                    fontSize: { xs: '20px', md: '28px' },
                    fontWeight: 700,
                    color: '#FAFAFA',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    lineHeight: 1.25,
                  }}
                >
                  {item.title}
                </Typography>
              </Grid>

              {/* Right Column: Paragraphs */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Stack spacing={2.5}>
                  {item.paragraphs.map((para: string, pIdx: number) => (
                    <Typography
                      key={pIdx}
                      sx={{
                        fontFamily: '"Rajdhani", sans-serif',
                        fontSize: { xs: '15px', md: '17px' },
                        fontWeight: 500,
                        color: 'rgba(255, 255, 255, 0.65)',
                        lineHeight: 1.6,
                      }}
                    >
                      {para}
                    </Typography>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
