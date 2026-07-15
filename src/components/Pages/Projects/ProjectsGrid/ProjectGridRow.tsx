'use client'

import { ArrowUpRight } from 'lucide-react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  coverEdgeFade,
  hoverDescriptionSx,
  HOVER_TRANSITION,
  rowGradient,
  titleSx,
  viewMoreButtonSx,
  rowLayoutForIndex,
  type RowLayout,
} from './constants'
import type { ProjectGridItem } from './types'
import LogoFlipCard from './LogoFlipCard'

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
        height: { xs: 'auto', md: layout.imageIdleHeight },
        marginTop: index > 0 ? { xs: 0, md: 0 } : 0,
        display: { xs: 'block', md: 'flex' },
        alignItems: { md: 'center' },
        justifyContent: { md: 'center' },
        overflow: { xs: 'visible', md: 'visible' },
        transform: 'scale(1)',
        transition: HOVER_TRANSITION,
        '&:hover': {
          transform: { md: 'scale(1.02)' },
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
          '& .cover-image': {
            transform: 'scale(1.06)',
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
          marginTop: { md: 0 },
        },
      }}
    >
      <Box
        className="row-inner"
        sx={{
          position: 'relative',
          display: { xs: 'none', md: 'flex' },
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
        {/* Image block */}
        <Box
          className="image-block"
          sx={{
            display: { xs: 'none', md: 'block' },
            position: { xs: 'relative', md: 'absolute' },
            left: imageOnLeft ? 0 : 'auto',
            right: !imageOnLeft ? 0 : 'auto',
            top: 0,
            bottom: 0,
            transform: 'none',
            flexShrink: 0,
            width: '100%',
            maxWidth: '100%',
            height: { xs: 220, sm: 300, md: '100%' },
            borderRadius: { xs: '20px', md: '40px' },
            overflow: 'hidden',
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
                    transformOrigin: 'center center',
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
        </Box>

        {/* LogoFlipCard — hidden on mobile, shown on md+ */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <LogoFlipCard item={item} imageOnLeft={imageOnLeft} />
        </Box>

        {/* Text block — desktop only (md+) */}
        <Box
          className="text-block"
          sx={{
            display: { xs: 'none', md: 'flex' },
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minWidth: 0,
            pl: imageOnLeft ? '58%' : 10,
            pr: !imageOnLeft ? '58%' : 10,
            py: 2,
            background: rowGradient(theme, layout.idleGradient, imageOnLeft),
            overflow: 'hidden',
            zIndex: 3,
            position: 'relative',
            transition: HOVER_TRANSITION,
          }}
        >
          {/* Mask overlay */}
          <Box
            component="img"
            src="/images/mask1.png"
            alt="mask"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 1,
              pointerEvents: 'none',
              opacity: 0.6,
              mixBlendMode: 'luminosity',
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.25,
              width: '100%',
              zIndex: 2,
              position: 'relative',
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
              zIndex: 2,
              position: 'relative',
              transition: HOVER_TRANSITION,
            }}
          >
            <Box component={Link} href={item.href} sx={viewMoreButtonSx}>
              {t('viewMore')}
              <ArrowUpRight size={18} color="currentColor" strokeWidth={1.75} />
            </Box>
          </Box>
        </Box>

      </Box>

      {/* Mobile card — xs only, outside row-inner */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, width: '100%' }}>
        <MobileCard item={item} t={t} />
      </Box>
    </Box>
  )
}

/* ─── Mobile Card ────────────────────────────────────────
   Collapsed: cover image + title
   Expanded:  + description + View More button
   Animation: 300ms ease-out
──────────────────────────────────────────────────────── */

function MobileCard({ item, t }: { item: ProjectGridItem; t: (key: string) => string }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Box
      onClick={() => setExpanded(prev => !prev)}
      sx={{ width: '100%', cursor: 'pointer' }}
    >
      {/* الجزء الأول: الصورة — ثابتة 149px دائماً */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 149,
          borderRadius: '20px 20px 0 0',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {item.coverSrc && (
          <Box
            component="img"
            src={item.coverSrc}
            alt={item.coverAlt}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.38)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '70%',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.98) 85%, #0a0a0a 100%)',
            pointerEvents: 'none',
          }}
        />
        {item.logo.src && (
          <Box
            component="img"
            src={item.logo.src}
            alt={item.logo.alt}
            sx={{
              position: 'absolute',
              top: '42%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 120,
              height: 70,
              objectFit: 'contain',
            }}
          />
        )}
        <Typography
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
            fontSize: 15,
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#fff',
            letterSpacing: '0.05em',
            lineHeight: 1,
          }}
        >
          {item.title}
        </Typography>
      </Box>

      {/* الجزء الثاني: التفاصيل — يظهر تحت الصورة عند النقر */}
      <motion.div
        initial={false}
        animate={expanded ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ overflow: 'hidden' }}
        onClick={e => e.stopPropagation()}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            pt: 2.5,
            pb: 2.5,
            px: 2,
            gap: 1.5,
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 13,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {item.description}
          </Typography>
          <Box
            component={Link}
            href={item.href}
            sx={{ ...viewMoreButtonSx, fontSize: 12, px: '20px', py: '8px', alignSelf: 'center' }}
          >
            {t('viewMore')}
            <ArrowUpRight size={14} color="currentColor" strokeWidth={1.75} />
          </Box>
        </Box>
      </motion.div>
    </Box>
  )
}
