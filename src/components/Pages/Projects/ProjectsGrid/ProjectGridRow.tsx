'use client'

import { ArrowUpRight } from 'lucide-react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  coverEdgeFade,
  hoverDescriptionSx,
  HOVER_TRANSITION,
  IMAGE_BLOCK_WIDTH,
  logoPlateSx,
  ROW_FLEX_GAP,
  rowGradient,
  titleSx,
  viewMoreButtonSx,
  type RowLayout,
} from './constants'
import type { ProjectGridItem } from './types'

type ProjectGridRowProps = {
  item: ProjectGridItem
  index: number
  layout: RowLayout
}

export default function ProjectGridRow({ item, index, layout }: ProjectGridRowProps) {
  const theme = useTheme()
  const t = useTranslations('ProjectsPage')
  const isReversed = index % 2 === 1
  const imageOnLeft = !isReversed

  return (
    <Box
      className="project-grid-row"
      sx={{
        position: 'relative',
        width: '100%',
        isolation: 'isolate',
        minHeight: { xs: 'auto', md: layout.hoverHeight },
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        transition: HOVER_TRANSITION,
        '&:hover': {
          '& .row-inner': {
            minHeight: { md: layout.hoverHeight },
            background: rowGradient(theme, layout.hoverGradient),
          },
          '& .cover-image': {
            filter: 'grayscale(0%)',
            opacity: layout.hoverImageOpacity,
          },
          '& .cover-fade': {
            opacity: 0.35,
          },
          '& .logo-flip': {
            transform: 'rotateX(180deg)',
            opacity: 1,
          },
          '& .row-title': {
            opacity: 1,
          },
          '& .hover-reveal-desc': {
            opacity: 1,
            maxHeight: 120,
            transform: 'translateY(0)',
          },
          '& .hover-reveal-cta': {
            opacity: 1,
            maxHeight: 80,
            transform: 'translateY(0)',
            pointerEvents: 'auto',
          },
        },
      }}
    >
      <Box
        className="row-inner"
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: isReversed ? 'row-reverse' : 'row',
          },
          alignItems: 'center',
          gap: { xs: 3, md: ROW_FLEX_GAP },
          width: '100%',
          minHeight: { xs: 'auto', md: layout.idleHeight },
          pr: { xs: 0, md: layout.pr },
          background: rowGradient(theme, layout.idleGradient),
          borderRadius: '4px',
          transition: HOVER_TRANSITION,
          overflow: 'hidden',
        }}
      >
        <Box
          className="image-block"
          sx={{
            position: 'relative',
            flexShrink: 0,
            width: { xs: '100%', md: IMAGE_BLOCK_WIDTH },
            maxWidth: { md: IMAGE_BLOCK_WIDTH },
            height: { xs: 220, md: 281 },
            overflow: 'hidden',
            transition: HOVER_TRANSITION,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '-16%',
              left: '-1%',
              width: '181%',
              height: '200%',
              overflow: 'hidden',
              transform: layout.flipImage ? 'scaleX(-1)' : 'none',
            }}
          >
            <Box
              component="img"
              className="cover-image"
              src={item.coverSrc}
              alt={item.coverAlt}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'grayscale(100%)',
                opacity: layout.idleImageOpacity,
                transition: HOVER_TRANSITION,
              }}
            />
          </Box>

          <Box
            className="cover-fade"
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              background: coverEdgeFade(theme, imageOnLeft),
              pointerEvents: 'none',
              transition: HOVER_TRANSITION,
            }}
          />

          <Box sx={logoPlateSx(theme)}>
            <Box
              className="logo-flip"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: item.logo.width,
                height: item.logo.height,
                transformStyle: 'preserve-3d',
                opacity: layout.logoOpacity,
                transition: HOVER_TRANSITION,
              }}
            >
              <Image
                src={item.logo.src}
                alt={item.logo.alt}
                width={item.logo.width}
                height={item.logo.height}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          className="text-block"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minWidth: 0,
            gap: { xs: 2, md: 2.5 },
            py: { xs: 2, md: 1 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 1, md: 1.25 },
              width: '100%',
            }}
          >
            <Typography
              className="row-title"
              sx={{
                ...titleSx,
                opacity: layout.titleOpacity,
                transition: HOVER_TRANSITION,
              }}
            >
              {item.title}
            </Typography>

            <Typography
              className="hover-reveal hover-reveal-desc"
              sx={{
                ...hoverDescriptionSx,
                opacity: 0,
                maxHeight: 0,
                overflow: 'hidden',
                transform: 'translateY(12px)',
                pointerEvents: 'none',
                transition: HOVER_TRANSITION,
              }}
            >
              {item.description}
            </Typography>
          </Box>

          <Box
            className="hover-reveal hover-reveal-cta"
            sx={{
              opacity: 0,
              maxHeight: 0,
              overflow: 'hidden',
              transform: 'translateY(20px)',
              pointerEvents: 'none',
              transition: HOVER_TRANSITION,
            }}
          >
            <Box component={Link} href={item.href} sx={viewMoreButtonSx}>
              {t('viewMore')}
              <ArrowUpRight size={20} color="currentColor" strokeWidth={1.75} />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            gap: 2,
            width: '100%',
            pb: 2,
          }}
        >
          <Typography sx={hoverDescriptionSx}>{item.description}</Typography>
          <Box component={Link} href={item.href} sx={viewMoreButtonSx}>
            {t('viewMore')}
            <ArrowUpRight size={20} color="currentColor" strokeWidth={1.75} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
