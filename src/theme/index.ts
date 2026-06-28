import {
  createTheme,
  responsiveFontSizes,
  type CssVarsTheme,
  type Theme,
} from '@mui/material/styles'
import { ultraDarkPalette, ultraLightPalette } from '@/theme/palette'
import { appTypography, bodyFontFamily } from '@/theme/typography'

const theme = createTheme({
  typography: appTypography,
  cssVariables: {
    cssVarPrefix: 'ultra',
    colorSchemeSelector: 'class',
  },
  defaultColorScheme: 'dark',
  colorSchemes: {
    light: { palette: ultraLightPalette },
    dark: { palette: ultraDarkPalette },
  },
  shape: {
    borderRadius: 4,
    borderRadiusPill: 50,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1920,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: bodyFontFamily,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadiusPill,
          textTransform: 'uppercase',
          fontWeight: 600,
          letterSpacing: '0.7px',
          fontSize: '0.875rem',
          paddingTop: theme.spacing(1.5),
          paddingBottom: theme.spacing(1.5),
          paddingLeft: theme.spacing(4),
          paddingRight: theme.spacing(4),
        }),
      },
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthXl: {
          maxWidth: 1920,
          paddingLeft: 80,
          paddingRight: 80,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
  },
})

const appTheme = responsiveFontSizes(theme, {
  factor: 1.15,
  variants: ['h1', 'h2', 'h3'],
})

export default appTheme as Theme & CssVarsTheme

export function createAppTheme(direction: 'ltr' | 'rtl' = 'ltr') {
  if (direction === 'rtl') {
    const arabicDisplayFont = "'Almarai', sans-serif"
    const arabicBodyFont = "'Changa', sans-serif"
    return createTheme(appTheme, {
      direction,
      typography: {
        fontFamily: arabicBodyFont,
        h1: { fontFamily: arabicDisplayFont },
        h2: { fontFamily: arabicDisplayFont },
        h3: { fontFamily: arabicDisplayFont },
        h4: { fontFamily: arabicDisplayFont },
        h5: { fontFamily: arabicDisplayFont },
        h6: { fontFamily: arabicDisplayFont },
        body1: { fontFamily: arabicBodyFont },
        body2: { fontFamily: arabicBodyFont },
        caption: { fontFamily: arabicBodyFont },
        overline: { fontFamily: arabicBodyFont },
        button: { fontFamily: arabicBodyFont },
      },
    }) as Theme & CssVarsTheme
  }
  return createTheme(appTheme, { direction }) as Theme & CssVarsTheme
}
