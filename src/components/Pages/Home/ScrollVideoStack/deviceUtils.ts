export function shouldDisableScrollVideo(): boolean {
  if (typeof window === 'undefined') return false

  // 1. Screen size check: mobile or tablet devices are typically < 1024px
  const isSmallScreen = window.innerWidth < 1024

  // 2. User Agent check for mobile OS
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent,
  )

  // 3. Touch device check (standard touch capability check)
  const hasTouch = 'ontouchstart' in window || window.navigator.maxTouchPoints > 0

  return isSmallScreen || isMobileUA || hasTouch
}
