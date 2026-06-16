import Box from '@mui/material/Box'
import Navbar from './Navbar/Navbar'
import FooterSection from './Footer/FooterSection'
import type { NavLabels } from './navLinks'

type AppShellProps = {
  children: React.ReactNode
  navLabels: NavLabels
}

export default function AppShell({ children, navLabels }: AppShellProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Navbar labels={navLabels} />
      <Box component="main" sx={{ flex: 1, pb: 6 }}>
        {children}
      </Box>
      <FooterSection />
    </Box>
  )
}
