import type { TypographyVariantsOptions } from '@mui/material/styles'

export const displayFontFamily = "'Ethnocentric Rg', 'Rajdhani', sans-serif"
export const bodyFontFamily = "'Rajdhani', sans-serif"

export const appTypography: TypographyVariantsOptions = {
  fontFamily: bodyFontFamily,
  h1: {
    fontFamily: displayFontFamily,
    fontWeight: 400,
    fontSize: '2.5rem',
    lineHeight: 1.4,
    letterSpacing: '0.6px',
  },
  h2: {
    fontFamily: displayFontFamily,
    fontWeight: 400,
    fontSize: '2rem',
    lineHeight: 1.35,
    letterSpacing: '0.5px',
  },
  h3: {
    fontFamily: displayFontFamily,
    fontWeight: 400,
    fontSize: '1.5rem',
    lineHeight: 1.35,
    letterSpacing: '0.4px',
  },
  h4: {
    fontFamily: displayFontFamily,
    fontWeight: 400,
    fontSize: '1.25rem',
    lineHeight: 1.4,
  },
  h5: {
    fontFamily: displayFontFamily,
    fontWeight: 400,
    fontSize: '1.125rem',
    lineHeight: 1.4,
  },
  h6: {
    fontFamily: bodyFontFamily,
    fontWeight: 600,
    fontSize: '1rem',
    letterSpacing: '0.7px',
    textTransform: 'uppercase',
  },
  body1: {
    fontFamily: bodyFontFamily,
    fontWeight: 400,
    fontSize: '0.9375rem',
    lineHeight: 1.6,
    letterSpacing: '0.4px',
  },
  body2: {
    fontFamily: bodyFontFamily,
    fontWeight: 400,
    fontSize: '0.8125rem',
    lineHeight: 1.5,
    letterSpacing: '0.3px',
  },
  caption: {
    fontFamily: bodyFontFamily,
    fontSize: '0.6875rem',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
  },
  overline: {
    fontFamily: bodyFontFamily,
    fontSize: '0.625rem',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  button: {
    fontFamily: bodyFontFamily,
    fontWeight: 600,
    fontSize: '0.875rem',
    letterSpacing: '0.7px',
    textTransform: 'uppercase',
  },
}
