import PartnersSection from '@/components/Pages/Home/Partners'
import Stats from '@/components/Pages/Home/Stats/Stats'
import CTASection from '@/components/Pages/Home/CTASection'
import FAQSection from '@/components/Pages/Home/Faqs'
import ServicesOrbital from '@/components/Pages/Home/Services-orbital/ServicesOrbital'
import Methodologies from '@/components/Pages/Home/Methodologies/Methodologies'
import Projects from '@/components/Pages/Home/Projects/Projects'
import HeroSection from '@/components/Pages/Home/HeroSection'
import ContactSection from '@/components/Pages/Home/ContactSection'
import FloatingTestimonials from '@/components/Pages/Home/FloatingTestimonials'
import Box from '@mui/material/Box'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <ServicesOrbital />
      <Stats />
      <Projects />
      <Methodologies />
      {/* <Box sx={{ position: 'relative', width: '100%', height: 0, zIndex: 2 }}>
        <FloatingTestimonials />
      </Box> */}
      <CTASection />
      <FAQSection />
      <ContactSection />
    </>
  )
}
