/**
 * Ultrawares palette — sourced from Figma ULTRAWARES website design.
 * Dark scheme is active; light is derived for future theme switcher.
 */
export const ultraDarkPalette = {
  divider: 'rgba(13, 241, 217, 0.14)',
  primary: {
    lighter: '#7FFFF4',
    light: '#3DF5E8',
    main: '#0DF1D9',
    dark: '#04C4AE',
    darker: '#01B1B1',
    contrastText: '#060E10',
  },
  secondary: {
    lighter: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(255, 255, 255, 0.18)',
    main: 'rgba(255, 255, 255, 0.55)',
    dark: 'rgba(255, 255, 255, 0.35)',
    darker: 'rgba(255, 255, 255, 0.25)',
    contrastText: '#060E10',
  },
  background: {
    default: '#060E10',
    paper: '#0B1820',
    card: '#0B1820',
    elevated: '#121A22',
    appbar: 'rgba(255, 255, 255, 0.04)',
    divider: 'rgba(255, 255, 255, 0.06)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.55)',
    tertiary: 'rgba(255, 255, 255, 0.35)',
  },
  error: {
    lighter: '#FFB4B4',
    light: '#FF8888',
    main: '#FF6B6B',
    dark: '#E05555',
    darker: '#C04444',
    contrastText: '#FFFFFF',
  },
} as const

/** Light scheme — inverted surfaces, darker teal for contrast on light bg */
export const ultraLightPalette = {
  divider: 'rgba(6, 14, 16, 0.12)',
  primary: {
    lighter: '#E6FFFC',
    light: '#5EF5E8',
    main: '#0AB8A5',
    dark: '#088F80',
    darker: '#066B60',
    contrastText: '#FFFFFF',
  },
  secondary: {
    lighter: '#E8ECEE',
    light: '#C5CED2',
    main: '#5A6B72',
    dark: '#3D4A50',
    darker: '#243036',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F2FAFA',
    paper: '#FFFFFF',
    card: '#FFFFFF',
    elevated: '#E8F4F4',
    appbar: 'rgba(255, 255, 255, 0.85)',
    divider: 'rgba(6, 14, 16, 0.08)',
  },
  text: {
    primary: '#060E10',
    secondary: 'rgba(6, 14, 16, 0.65)',
    tertiary: 'rgba(6, 14, 16, 0.45)',
  },
  error: {
    lighter: '#FFEBEE',
    light: '#EF9A9A',
    main: '#D32F2F',
    dark: '#C62828',
    darker: '#B71C1C',
    contrastText: '#FFFFFF',
  },
} as const
