'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { backLinkSx, backLinkTextSx } from './constants'

type BackLinkProps = {
  label: string
  href: string
}

const linkVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 16 },
  },
}

export default function BackLink({ label, href }: BackLinkProps) {
  const theme = useTheme()
  const isRtl = theme.direction === 'rtl'
  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft

  return (
    <Box component={motion.div} variants={linkVariants} initial="hidden" animate="visible">
      <Box
        component={Link}
        href={href}
        sx={{
          ...backLinkSx,
          color: 'text.primary',
        }}
      >
        <ArrowIcon size={16} color="currentColor" strokeWidth={2} />
        <Typography component="span" sx={backLinkTextSx}>
          {label}
        </Typography>
      </Box>
    </Box>
  )
}
