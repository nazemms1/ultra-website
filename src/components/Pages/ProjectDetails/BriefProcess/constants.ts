import type { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import type { SxProps } from '@mui/material/styles'

/** Figma 4256:3981 — brief section shell */
export const briefSectionSx: SxProps<Theme> = {
  width: '100%',
  pb: { xs: 8, md: '92px' },
}

export const briefGridSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', lg: 'row' },
  gap: { xs: 6, lg: 8 },
  alignItems: 'flex-start',
  py: { xs: 6, md: 10 },
}

export const briefArticlesSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 4, md: '50px' },
  flex: 1,
  minWidth: 0,
  maxWidth: { lg: 832 },
}

export const briefNumberSx: SxProps<Theme> = {
  fontFamily: "'Ethnocentric Rg', sans-serif",
  fontSize: 36,
  lineHeight: '30px',
  color: theme => alpha(theme.palette.primary.light, 0.8),
  textAlign: 'center',
  flexShrink: 0,
  width: 90,
  p: 2.5,
  borderRadius: '15px',
}

export const briefCardSx: SxProps<Theme> = {
  flex: 1,
  minWidth: 0,
  p: 2.5,
  borderRadius: '25px',
  background: theme =>
    `linear-gradient(180deg, ${alpha(theme.palette.primary.light, 0.08)} 0%, ${alpha(theme.palette.common.black, 0)} 100%)`,
}

export const briefTitleSx: SxProps<Theme> = {
  fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
  fontSize: 28,
  fontWeight: 700,
  lineHeight: '40px',
  letterSpacing: '-0.03em',
  textTransform: 'uppercase',
  color: 'text.primary',
}

export const briefBodySx: SxProps<Theme> = {
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: 18,
  fontWeight: 400,
  lineHeight: '29.25px',
  color: theme => alpha(theme.palette.common.white, 0.7),
  pt: 2,
  whiteSpace: 'pre-wrap',
}

export const metricsStickySx: SxProps<Theme> = {
  position: { xs: 'relative', lg: 'sticky' },
  top: { lg: 24 },
  width: { xs: '100%', lg: 320 },
  flexShrink: 0,
  alignSelf: 'flex-start',
}

export const feedbackCardSx: SxProps<Theme> = {
  position: 'relative',
  p: '25px',
  borderRadius: '16px',
  border: theme => `1px solid ${alpha(theme.palette.primary.light, 0.3)}`,
  background: theme =>
    `linear-gradient(216.77deg, ${alpha(theme.palette.primary.light, 0.2)} 5.52%, ${alpha(theme.palette.primary.dark, 0)} 94.31%)`,
  overflow: 'hidden',
}

export const metaCardSx: SxProps<Theme> = {
  p: '25px',
  borderRadius: '16px',
  border: theme => `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  bgcolor: theme => alpha(theme.palette.common.white, 0.02),
  backdropFilter: 'blur(12px)',
}

export const metaLabelSx: SxProps<Theme> = {
  fontFamily: "'Nulshock', 'Rajdhani', sans-serif",
  fontSize: 11,
  fontWeight: 700,
  lineHeight: '16.5px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'primary.light',
}

export const toolPillSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  px: 1.5,
  py: 0.875,
  borderRadius: '100px',
  border: theme => `1px solid ${alpha(theme.palette.common.white, 0.15)}`,
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: '0.025em',
  color: theme => alpha(theme.palette.common.white, 0.8),
}
