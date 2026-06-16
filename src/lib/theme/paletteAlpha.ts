import { alpha } from '@mui/material/styles'

/**
 * Same role as MUI `alpha(color, opacity)` when the color comes from the theme palette.
 * With `cssVariables`, palette tokens are often `var(--palette-...)` strings; MUI `alpha()`
 * only supports #rgb, hsl(), etc., and logs a warning otherwise.
 * Uses `color-mix` for CSS variables (see also `src/lib/theme/glow.ts`).
 */
export function paletteAlpha(color: string, opacity: number): string {
  if (color.startsWith('var(')) {
    return `color-mix(in srgb, ${color} ${Math.round(opacity * 100)}%, transparent)`
  }
  return alpha(color, opacity)
}
