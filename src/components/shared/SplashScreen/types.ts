export type SplashScreenProps = {
  isLoading: boolean
  onExitComplete?: () => void
}

export type SplashColumnProps = {
  heightPercent: number
  index: number
  showDivider?: boolean
}
