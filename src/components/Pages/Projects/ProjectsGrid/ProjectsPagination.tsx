'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import Image from 'next/image'

type ProjectsPaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

type PageToken = number | 'ellipsis'

function buildPageTokens(currentPage: number, totalPages: number): PageToken[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const tokens: PageToken[] = [1]

  if (currentPage > 3) {
    tokens.push('ellipsis')
  }

  const middleStart = Math.max(2, currentPage - 1)
  const middleEnd = Math.min(totalPages - 1, currentPage + 1)

  for (let page = middleStart; page <= middleEnd; page += 1) {
    if (!tokens.includes(page)) {
      tokens.push(page)
    }
  }

  if (currentPage < totalPages - 2) {
    tokens.push('ellipsis')
  }

  if (!tokens.includes(totalPages)) {
    tokens.push(totalPages)
  }

  return tokens
}

export default function ProjectsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProjectsPaginationProps) {
  const theme = useTheme()

  if (totalPages <= 1) {
    return null
  }

  const pageTokens = buildPageTokens(currentPage, totalPages)

  const arrowButtonSx = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 37,
    p: 1.5,
    borderRadius: '100px',
    bgcolor: alpha(theme.palette.background.default, 0.2),
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    '&:disabled': {
      opacity: 0.35,
      cursor: 'default',
    },
    '&:not(:disabled):hover': {
      opacity: 0.85,
      transform: 'translateY(-1px)',
    },
  } as const

  const pageNumberSx = (active: boolean) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    p: '10px',
    borderRadius: '50%',
    cursor: active ? 'default' : 'pointer',
    bgcolor: active ? alpha(theme.palette.primary.light, 0.1) : 'transparent',
    transition: 'background-color 0.3s ease',
    '&:hover': active
      ? undefined
      : {
          bgcolor: alpha(theme.palette.primary.light, 0.05),
        },
  })

  const pageTextSx = {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 1,
    color: 'primary.light',
  } as const

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Box
        component="button"
        type="button"
        aria-label="Previous page"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        sx={arrowButtonSx}
      >
        <Image
          src="/icons/ArrowWrapper.svg"
          alt=""
          width={20}
          height={20}
          style={{ transform: 'rotate(180deg)' }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {pageTokens.map((token, index) => {
          if (token === 'ellipsis') {
            return (
              <Box
                key={`ellipsis-${index}`}
                sx={{
                  width: 30,
                  height: 3,
                  mx: 0.5,
                  bgcolor: alpha(theme.palette.primary.light, 0.35),
                  borderRadius: 1,
                }}
                aria-hidden
              />
            )
          }

          const isActive = token === currentPage

          return (
            <Box
              key={token}
              component={isActive ? 'div' : 'button'}
              type={isActive ? undefined : 'button'}
              onClick={isActive ? undefined : () => onPageChange(token)}
              sx={pageNumberSx(isActive)}
            >
              <Typography sx={pageTextSx}>{token}</Typography>
            </Box>
          )
        })}
      </Box>

      <Box
        component="button"
        type="button"
        aria-label="Next page"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        sx={arrowButtonSx}
      >
        <Image src="/icons/ArrowWrapper.svg" alt="" width={20} height={20} />
      </Box>
    </Box>
  )
}
