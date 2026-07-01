import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

type CornerBracketsProps = {
  inset?: number
  size?: number
}

/** Teal L-shaped corner accents — Figma Corners-TL/TR/BL/BR */
export default function CornerBrackets({ inset = 13, size = 12 }: CornerBracketsProps) {
  const theme = useTheme()
  const color = theme.palette.primary.light

  const cornerBase = {
    position: 'absolute' as const,
    width: size,
    height: size,
    pointerEvents: 'none' as const,
  }

  return (
    <>
      <Box
        sx={{
          ...cornerBase,
          top: inset,
          insetInlineStart: inset,
          borderTop: `1px solid ${color}`,
          borderInlineStart: `1px solid ${color}`,
        }}
      />
      <Box
        sx={{
          ...cornerBase,
          top: inset,
          insetInlineEnd: inset,
          borderTop: `1px solid ${color}`,
          borderInlineEnd: `1px solid ${color}`,
        }}
      />
      <Box
        sx={{
          ...cornerBase,
          bottom: inset,
          insetInlineStart: inset,
          borderBottom: `1px solid ${color}`,
          borderInlineStart: `1px solid ${color}`,
        }}
      />
      <Box
        sx={{
          ...cornerBase,
          bottom: inset,
          insetInlineEnd: inset,
          borderBottom: `1px solid ${color}`,
          borderInlineEnd: `1px solid ${color}`,
        }}
      />
    </>
  )
}
