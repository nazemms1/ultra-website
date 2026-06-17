'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ArrowRight } from 'lucide-react'
import AnimatedButton from '@/components/shared/AnimatedButton'
import type { ProjectItem } from './types'

interface StaticProjectRowProps {
  readonly project: ProjectItem
}

/** Non-animated two-column row used when the user prefers reduced motion. */
export function StaticProjectRow({ project }: StaticProjectRowProps) {
  const imageFirst = project.imageSide === 'left'
  const isMobileMockup = project.mockup.kind === 'mobile'

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        alignItems: 'center',
        gap: { xs: 2.5, sm: 5, md: 8 },
      }}
    >
      <Box
        sx={{
          order: imageFirst ? 0 : 1,
          display: 'flex',
          justifyContent: 'center',
          minWidth: 0,
        }}
      >
        <Box
          component="img"
          src={project.mockup.src}
          alt={project.mockup.alt}
          loading="lazy"
          sx={{
            display: 'block',
            width: '100%',
            maxWidth: isMobileMockup
              ? { xs: 150, sm: 220, md: 300 }
              : { xs: 200, sm: 360, md: 480 },
            height: 'auto',
            objectFit: 'contain',
            background: 'transparent',
            transform: isMobileMockup ? 'rotate(3deg)' : 'none',
            filter: 'drop-shadow(0 30px 55px rgba(0, 0, 0, 0.55))',
          }}
        />
      </Box>

      <Box
        sx={{
          order: imageFirst ? 1 : 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: { xs: 2, md: 4 },
          minWidth: 0,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 1.5 } }}>
          <Typography
            component="h3"
            sx={{
              fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
              fontSize: { xs: '1rem', sm: '1.5rem', md: '1.875rem' },
              lineHeight: 1.1,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              color: 'text.primary',
            }}
          >
            {project.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: { xs: '0.75rem', sm: '0.95rem', md: '1.125rem' },
              lineHeight: { xs: 1.45, md: 1.65 },
              color: 'text.secondary',
              textAlign: 'justify',
            }}
          >
            {project.description}
          </Typography>
        </Box>

        <AnimatedButton
          variant="secondary"
          href={project.href}
          endIcon={<ArrowRight size={14} />}
          sx={{ px: { xs: 2, md: 4 }, fontSize: { xs: 12, md: 18 } }}
        >
          See full details
        </AnimatedButton>
      </Box>
    </Box>
  )
}
