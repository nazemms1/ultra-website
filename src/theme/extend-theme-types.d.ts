export declare module '@mui/material' {
  interface PaletteColorExtend {
    lighter: string
    darker: string
  }

  interface BackgroundExtend {
    card: string
    elevated: string
    appbar: string
    divider: string
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface PaletteColor extends PaletteColorExtend {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface SimplePaletteColorOptions extends PaletteColorExtend {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TypeBackground extends BackgroundExtend {}

  interface TypeText {
    tertiary: string
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    shape: Theme['shape'] & {
      borderRadiusPill: number | string
    }
  }

  interface ThemeOptions {
    shape?: ThemeOptions['shape'] & {
      borderRadiusPill?: number | string
    }
  }

  interface ThemeVars {
    typography: Theme['typography']
    transitions: Theme['transitions']
  }
}

export {}
