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
      xl: 1440,
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
          maxWidth: 1440,
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
  return createTheme(appTheme, { direction }) as Theme & CssVarsTheme
}
