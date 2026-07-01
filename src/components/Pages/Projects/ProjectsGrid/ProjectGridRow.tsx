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
  logoPlateSx,
  rowGradient,
  titleSx,
  viewMoreButtonSx,
  rowLayoutForIndex,
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
  const prevLayout = index > 0 ? rowLayoutForIndex(index - 1) : null

  return (
    <Box
      className="project-grid-row"
      sx={{
        position: 'relative',
        width: '100%',
        isolation: 'isolate',
        // Clamps layout heights perfectly during transition so rows don't bleed or overlap
        height: { xs: 'auto', md: layout.imageIdleHeight },
        marginTop: index > 0 && prevLayout ? { xs: 3, md: `${-0.15 * prevLayout.imageIdleHeight}px` } : 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        transition: HOVER_TRANSITION,
        '&:hover': {
          height: { md: layout.imageHoverHeight }, // Smooth accordion expand/collapse
          zIndex: 5,
          '& .row-inner': {
            height: { md: layout.imageHoverHeight },
          },
          '& .image-block': {
            width: { md: '100%' },
            maxWidth: { md: '100%' },
          },
          '& .text-block': {
            background: rowGradient(theme, layout.hoverGradient, imageOnLeft),
          },
          '& .cover-fade': {
            opacity: 0.25,
          },
          '& .logo-flip': {
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
        '&:hover + .project-grid-row': {
          marginTop: { md: `${-0.15 * layout.imageHoverHeight}px` },
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
          justifyContent: 'space-between',
          width: '100%',
          height: { xs: 'auto', md: layout.imageIdleHeight },
          background: 'transparent',
          overflow: 'visible',
          clipPath: {
            xs: 'none',
            md: imageOnLeft ? 'url(#row-clip-left)' : 'url(#row-clip-right)',
          },
          transition: HOVER_TRANSITION,
        }}
      >
        {/* FIX: Photographic Capsule Layout — Centered vertically, with overflow hidden to prevent bleed */}
        <Box
          className="image-block"
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            left: imageOnLeft ? 0 : 'auto',
            right: !imageOnLeft ? 0 : 'auto',
            top: 0,
            bottom: 0,
            transform: 'none',
            flexShrink: 0,
            width: { xs: '100%', md: '45%' },
            maxWidth: { md: '45%' },
            height: { xs: 240, md: '100%' },
            borderRadius: { xs: '24px', md: '40px' },
            overflow: 'hidden', // Prevents image frames from spilling over adjacent slots during resize
            zIndex: 2,
            transition: HOVER_TRANSITION,
          }}
        >
          {item.coverSrc && (
            <>
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
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
                  opacity: 0.5,
                  background: coverEdgeFade(theme, imageOnLeft),
                  pointerEvents: 'none',
                  transition: HOVER_TRANSITION,
                }}
              />
            </>
          )}

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

        {/* FIX: Text Container Tracks — Uses overflow: hidden to prevent gradient/shadow spilling over other rows */}
        <Box
          className="text-block"
          sx={{
            flex: 1,
            width: '100%',
            height: { xs: 'auto', md: '100%' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minWidth: 0,
            pl: imageOnLeft ? { xs: 3, md: '58%' } : { xs: 3, md: 10 },
            pr: !imageOnLeft ? { xs: 3, md: '58%' } : { xs: 3, md: 10 },
            py: { xs: 4, md: 2 },
            background: rowGradient(theme, layout.idleGradient, imageOnLeft),
            overflow: 'hidden', // Keeps the green shadow gradient cleanly bounded inside its own expanding box
            zIndex: 3,
            position: 'relative',
            transition: HOVER_TRANSITION,
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
              transform: 'translateY(14px)',
              pointerEvents: 'none',
              mt: 1.5,
              transition: HOVER_TRANSITION,
            }}
          >
            <Box component={Link} href={item.href} sx={viewMoreButtonSx}>
              {t('viewMore')}
              <ArrowUpRight size={18} color="currentColor" strokeWidth={1.75} />
            </Box>
          </Box>
        </Box>

        {/* Mobile Viewports Layer */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            gap: 2,
            width: '100%',
            px: 3,
            pb: 3,
          }}
        >
          <Typography sx={hoverDescriptionSx}>{item.description}</Typography>
          <Box component={Link} href={item.href} sx={viewMoreButtonSx}>
            {t('viewMore')}
            <ArrowUpRight size={18} color="currentColor" strokeWidth={1.75} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
