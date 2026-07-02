'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
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

  return (
    <Stack
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      direction="row"
      spacing={3}
      sx={{
        width: '100%',
        overflowX: 'auto',
        pb: 1.5,
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '100px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: alpha(theme.palette.primary.light, 0.3),
          borderRadius: '100px',
          '&:hover': {
            background: alpha(theme.palette.primary.light, 0.5),
          },
        },
      }}
    >
      <Box
        component={motion.div}
        variants={itemVariants}
        sx={{
          ...feedbackCardSx,
          minWidth: 280,
          flexShrink: 0,
        }}
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
              {metrics.successRate.toFixed(2)}%
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
              sx={{
                height: '100%',
                width: progressWidth,
                borderRadius: 'inherit',
                bgcolor: 'primary.light',
                boxShadow: `0 0 16px ${alpha(theme.palette.primary.light, 0.7)}`,
              }}
            />
          </Box>
        </Stack>
      </Box>

      <Box
        component={motion.div}
        variants={itemVariants}
        sx={{
          ...metaCardSx,
          minWidth: 280,
          flexShrink: 0,
        }}
      >
        <Typography sx={metaLabelSx}>Services Deployed</Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            gap: 1.5,
            pt: 2,
            pb: 0.5,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {metrics.services.map(service => (
            <Box key={service} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
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
                  whiteSpace: 'nowrap',
                }}
              >
                {service}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        component={motion.div}
        variants={itemVariants}
        sx={{
          ...metaCardSx,
          minWidth: 280,
          flexShrink: 0,
        }}
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
