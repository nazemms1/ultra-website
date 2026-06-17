import PartnersSection from '@/components/Pages/Home/Partners'
import Stats from '@/components/Pages/Home/Stats/Stats'
import CTASection from '@/components/Pages/Home/CTASection'
import FAQSection from '@/components/Pages/Home/FAQSection'
import ServicesOrbital from '@/components/Pages/Home/Services-orbital/ServicesOrbital'
import Methodologies from '@/components/Pages/Home/Methodologies/Methodologies'
import Projects from '@/components/Pages/Home/Projects/Projects'
import HeroSection from '@/components/Pages/Home/HeroSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <ServicesOrbital />
      <Stats />
      <Projects />
      <Methodologies />
      <CTASection />
      <FAQSection />
    </>
  )
}
