'use client'

import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { animate, useMotionValue, motion } from 'framer-motion'
import type { ProjectMetrics } from '../types'
import CornerBrackets from '../shared/CornerBrackets'
import { feedbackCardSx, metaCardSx, metaLabelSx, toolPillSx } from './constants'

type MetricsSidebarProps = {
  metrics: ProjectMetrics
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 60, damping: 14 },
  },
}

export default function MetricsSidebar({ metrics }: MetricsSidebarProps) {
  const theme = useTheme()
  const progressWidth = `${metrics.successRate}%`

  const count = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState('0.00')

  useEffect(() => {
    const controls = animate(count, metrics.successRate, {
      duration: 1.5,
      ease: 'easeOut',
      delay: 0.2,
      onUpdate: (latest) => {
        setDisplayValue(latest.toFixed(2))
      },
    })
    return () => controls.stop()
  }, [count, metrics.successRate])

  return (
    <Stack
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      direction="column"
      spacing={3}
      sx={{
        width: '100%',
      }}
    >
      <Box
        component={motion.div}
        variants={itemVariants}
        sx={feedbackCardSx(theme)}
      >
        <CornerBrackets inset={12} />
        <Typography sx={metaLabelSx}>Feedback</Typography>

        <Stack spacing={0.75} sx={{ pt: 2.5, pb: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography
              sx={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: alpha(theme.palette.common.white, 0.7),
              }}
            >
              Success
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Ethnocentric Rg', sans-serif",
                fontSize: 24,
                lineHeight: '32px',
                color: 'primary.light',
              }}
            >
              {displayValue}%
            </Typography>
          </Box>

          <Box
            sx={{
              height: 4,
              borderRadius: '100px',
              bgcolor: alpha(theme.palette.common.white, 0.1),
              overflow: 'hidden',
            }}
          >
            <Box
              component={motion.div}
              initial={{ width: 0 }}
              animate={{ width: progressWidth }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
              sx={{
                height: '100%',
                borderRadius: 'inherit',
                background: `linear-gradient(90deg, 
                  ${theme.palette.primary.light} 0%, 
                  ${alpha(theme.palette.primary.light, 0.6)} 25%, 
                  #ffffff 50%, 
                  ${alpha(theme.palette.primary.light, 0.6)} 75%, 
                  ${theme.palette.primary.light} 100%)`,
                backgroundSize: '200% 100%',
                boxShadow: `0 0 16px ${alpha(theme.palette.primary.light, 0.7)}`,
                animation: 'progressShimmer 2.5s linear infinite',
                '@keyframes progressShimmer': {
                  '0%': { backgroundPosition: '200% 0' },
                  '100%': { backgroundPosition: '-200% 0' },
                },
              }}
            />
          </Box>
        </Stack>
      </Box>

      <Box
        component={motion.div}
        variants={itemVariants}
        sx={metaCardSx(theme)}
      >
        <Typography sx={metaLabelSx}>Services Deployed</Typography>
        <Stack spacing={1.5} sx={{ pt: 2 }}>
          {metrics.services.map(service => (
            <Box key={service} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  bgcolor: 'primary.light',
                  flexShrink: 0,
                }}
              />
              <Typography
                sx={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'text.primary',
                }}
              >
                {service}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box
        component={motion.div}
        variants={itemVariants}
        sx={metaCardSx(theme)}
      >
        <Typography sx={metaLabelSx}>Used tools</Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            gap: 1.125,
            pt: 2,
            pb: 0.5,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {metrics.tools.map(tool => {
            const name = typeof tool === 'string' ? tool : tool.name
            const iconUrl = typeof tool === 'string' ? null : tool.icon

            return (
              <Box key={name} sx={{ ...toolPillSx, gap: 1, flexShrink: 0 }}>
                {iconUrl && (
                  <Box
                    component="img"
                    src={iconUrl}
                    alt={`${name} icon`}
                    sx={{
                      width: 16,
                      height: 16,
                      objectFit: 'contain',
                    }}
                  />
                )}
                <span style={{ whiteSpace: 'nowrap' }}>{name}</span>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Stack>
  )
}
