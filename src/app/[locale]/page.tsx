import HeroSection from '@/components/sections/HeroSection'
import PartnersSection from '@/components/Pages/Home/PartnersSection'
import Stats from '@/components/Pages/Home/Stats/Stats'
import CTASection from '@/components/Pages/Home/CTASection'
import FAQSection from '@/components/Pages/Home/FAQSection'
import ServicesOrbital from '@/components/Pages/Home/Services-orbital/ServicesOrbital'
import Methodologies from '@/components/Pages/Home/Methodologies/Methodologies'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <ServicesOrbital />
      <Stats />
      <Methodologies />
      <CTASection />
      <FAQSection />
    </>
  )
}
