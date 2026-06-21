'use client'

import { Theme, SxProps, styled } from '@mui/material'

export type SvgColorProps = React.ComponentProps<'span'> & {
  src: string
  sx?: SxProps<Theme>
  /**
   * Fixed mask glyph size (px). Use with layout chrome icons so mixed SVG viewBoxes
   * render at the same visual weight (`layoutChromeIconGlyphPx`).
   */
  glyphPx?: number
}

function maskStyles(src: string) {
  return {
    mask: `url(${src}) no-repeat center / contain`,
    WebkitMask: `url(${src}) no-repeat center / contain`,
  }
}

export function ColoredSvg({ src, sx, glyphPx, ...other }: SvgColorProps) {
  const sizeSx =
    glyphPx != null
      ? {
          width: glyphPx,
          height: glyphPx,
          minWidth: glyphPx,
          minHeight: glyphPx,
        }
      : {}

  return <SvgRoot sx={[maskStyles(src), sizeSx, ...(Array.isArray(sx) ? sx : [sx])]} {...other} />
}

const SvgRoot = styled('span')(() => ({
  width: 24,
  height: 24,
  flexShrink: 0,
  display: 'inline-flex',
  backgroundColor: 'currentColor',
}))
