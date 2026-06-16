import HeroSection from '@/components/Layout/HeroSection'
import PartnersSection from '@/components/sections/partners/PartnersSection'
import Stats from '@/components/sections/stats/Stats'
import CTASection from '@/components/sections/cta/CTASection'
import FAQSection from '@/components/sections/faq/FAQSection'
import ServicesOrbital from '@/components/sections/services-orbital/ServicesOrbital'
import Methodologies from '@/components/sections/methodologies/Methodologies'

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
