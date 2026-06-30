'use client'

import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import type { SxProps, Theme } from '@mui/material/styles'
import { Link } from '@/i18n/routing'
import { glassButtonSx, ghostButtonSx, primaryButtonSx } from '@/lib/theme/surfaces'

type UltraButtonProps = {
  variant?: 'primary' | 'glass' | 'ghost'
  href?: string
  children: React.ReactNode
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  sx?: SxProps<Theme>
}

export default function UltraButton({
  variant = 'primary',
  href,
  children,
  startIcon,
  endIcon,
  onClick,
  type = 'button',
  disabled,
  sx,
}: UltraButtonProps) {
  const theme = useTheme()

  const variantSx =
    variant === 'primary'
      ? primaryButtonSx(theme)
      : variant === 'glass'
        ? glassButtonSx(theme)
        : ghostButtonSx(theme)

  const commonProps = {
    variant: 'contained' as const,
    startIcon,
    endIcon,
    disabled,
    sx: {
      minHeight: 50,
      ...variantSx,
      ...sx,
    },
  }

  if (href) {
    return (
      <Button {...commonProps} component={Link} href={href}>
        {children}
      </Button>
    )
  }

  return (
    <Button {...commonProps} type={type} onClick={onClick}>
      {children}
    </Button>
  )
}
