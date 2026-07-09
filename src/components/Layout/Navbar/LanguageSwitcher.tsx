'use client'

import { useState, useRef } from 'react'
import Box from '@mui/material/Box'
import Popper from '@mui/material/Popper'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { alpha, useTheme } from '@mui/material/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useRouter, usePathname } from '@/i18n/routing'
import { useParams } from 'next/navigation'

const LOCALES = [
  { code: 'en', label: 'ENGLISH' },
  { code: 'ar', label: 'العربية' },
] as const

export default function LanguageSwitcher() {
  const theme = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const currentLocale = (params?.locale as string) ?? 'en'

  const handleToggle = () => setOpen(prev => !prev)
  const handleClose = () => setOpen(false)

  const handleSelect = (locale: string) => {
    setOpen(false)
    router.replace(pathname, { locale })
  }

  return (
    <>
      <Box
        component="button"
        ref={anchorRef}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          px: '6px',
          py: '6px',
          border: 'none',
          bgcolor: 'transparent',
          color: 'text.primary',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.5px',
          outline: 'none',
          transition: 'color 0.2s ease',
          '&:hover': {
            color: 'primary.main',
          },
        }}
      >
        <Box
          component="svg"
          aria-hidden
          width="18"
          height="18"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          sx={{ flexShrink: 0, stroke: 'currentColor' }}
        >
          <path d="M1.51758 9.10354C1.51758 13.2934 4.91392 16.6897 9.10378 16.6897C13.2936 16.6897 16.69 13.2934 16.69 9.10354C16.69 4.91368 13.2936 1.51733 9.10378 1.51733C4.91392 1.51733 1.51758 4.91368 1.51758 9.10354Z" strokeWidth="1.01149" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.8625 1.55518C9.8625 1.55518 12.1384 4.55173 12.1384 9.10345C12.1384 13.6552 9.8625 16.6517 9.8625 16.6517M8.34526 16.6517C8.34526 16.6517 6.0694 13.6552 6.0694 9.10345C6.0694 4.55173 8.34526 1.55518 8.34526 1.55518M1.99561 11.7586H16.2122M1.99561 6.44828H16.2122" strokeWidth="1.01149" strokeLinecap="round" strokeLinejoin="round"/>
        </Box>
        <Box component="span" sx={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px' }}>
          {currentLocale.toUpperCase()}
        </Box>
        <KeyboardArrowDownIcon
          sx={{
            fontSize: '14px',
            color: 'inherit',
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </Box>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        disablePortal={false}
        style={{ zIndex: 9999 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: 'top right' }} timeout={180}>
            <Paper
              elevation={0}
              sx={{
                mt: '10px',
                borderRadius: '16px',
                bgcolor: alpha(theme.palette.background.paper, 0.7),
                backdropFilter: 'blur(26px) brightness(1.08) saturate(1.2)',
                WebkitBackdropFilter: 'blur(26px) brightness(1.08) saturate(1.2)',
                border: 'none',
                boxShadow: [
                  '0 4px 41px 0 rgba(0, 0, 0, 0.41)',
                  `inset 1px 1px 0 0 ${alpha(theme.palette.common.white, 0.45)}`,
                  `inset -1px -1px 0 0 ${alpha(theme.palette.common.white, 0.06)}`,
                ].join(', '),
                overflow: 'hidden',
                minWidth: '140px',
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Box sx={{ py: '8px' }}>
                  {LOCALES.map(({ code, label }) => (
                    <Box
                      key={code}
                      component="button"
                      onClick={() => handleSelect(code)}
                      sx={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'center',
                        px: '20px',
                        py: '12px',
                        border: 'none',
                        bgcolor: 'transparent',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: '14px',
                        fontWeight: code === currentLocale ? 700 : 500,
                        color: code === currentLocale ? 'primary.main' : 'text.primary',
                        transition: 'color 0.2s ease, background-color 0.2s ease',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.08),
                          color: 'primary.main',
                        },
                      }}
                    >
                      {label}
                    </Box>
                  ))}
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}
