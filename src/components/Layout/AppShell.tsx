/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box'
import Navbar from './Navbar/Navbar'
import FooterSection from './Footer/FooterSection'
import type { NavLabels } from './navLinks'
import { SectionScrollProvider } from '@/lib/SectionScrollContext'

type AppShellProps = {
  children: React.ReactNode
  navLabels: NavLabels
  footerData?: any
  statsData?: any
  navSectionsVisibility?: {
    about: boolean
    services: boolean
    projects: boolean
    gallery?: boolean
  }
}

export default function AppShell({
  children,
  navLabels,
  footerData,
  statsData,
  navSectionsVisibility,
}: AppShellProps) {
  return (
    <SectionScrollProvider>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          color: 'text.primary',
          overflowX: 'clip',
        }}
      >
        <Navbar labels={navLabels} sectionsVisibility={navSectionsVisibility} />
        <Box component="main" sx={{ flex: 1, pb: 6, width: '100%', overflowX: 'clip' }}>
          {children}
        </Box>
        <FooterSection data={footerData} statsData={statsData} />
      </Box>
    </SectionScrollProvider>
  )
}
