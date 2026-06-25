'use client'

import Box from '@mui/material/Box'
import PageHero from '@/components/shared/PageHero'
import ServicesCardStack from '@/components/Pages/Service/ServicesCardStack'
import CTASection from '@/components/Pages/Home/CTASection'

export default function ServicesPage() {
  return (
    <>
      <PageHero
        align="left"
        height={504}
        videoSrc="/videos/colorflow-animation (3).mp4"
        eyebrow="OUR SERVICES"
        title={
          <>
            WAYS WE PLUG IN
            <br />
            AND{' '}
            <Box component="span" sx={{ color: '#0DF1D9' }}>
              LEVEL YOU UP.
            </Box>
          </>
        }
        subtitle="Explore our six core practices and three engagement models designed to fit your unique challenges. Choose the approach that aligns with your needs, or reach out to us for personalized guidance."
      />
      <ServicesCardStack />
      <CTASection />
    </>
  )
}
