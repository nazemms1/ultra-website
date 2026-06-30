'use client'

import Box from '@mui/material/Box'
import SplashSpinner from '@/components/shared/SplashScreen/SplashSpinner'

export default function Loading() {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: '#121212',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SplashSpinner size={120} />
    </Box>
  )
}
