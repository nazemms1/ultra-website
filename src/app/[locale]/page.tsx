import PartnersSection from '@/components/Pages/Home/Partners'
import Stats from '@/components/Pages/Home/Stats/Stats'
import CTASection from '@/components/Pages/Home/CTASection'
import FAQSection from '@/components/Pages/Home/Faqs'
import ServicesOrbital from '@/components/Pages/Home/Services-orbital/ServicesOrbital'
import Methodologies from '@/components/Pages/Home/Methodologies/Methodologies'
import Projects from '@/components/Pages/Home/Projects/Projects'
import HeroSection from '@/components/Pages/Home/HeroSection'
import ContactSection from '@/components/Pages/Home/ContactSection'
import ScrollVideoStack from '@/components/Pages/Home/ScrollVideoStack'
import TestimonialsSection from '@/components/Pages/Home/TestimonialsSection'

import { getLocale } from 'next-intl/server'
import { fetchAPI } from '@/lib/api'

export default async function HomePage() {
  const locale = await getLocale()

  const [heroData, partnersData, servicesData] = await Promise.all([
    fetchAPI('/api/hero-section', locale),
    fetchAPI('/api/partners-data', locale),
    fetchAPI('/api/services-data', locale),
  ])

  return (
    <>
      <HeroSection data={heroData} />
      <ScrollVideoStack>
        <PartnersSection data={partnersData} />
        <ServicesOrbital data={servicesData} />
        <Stats />
        <Projects />
        <Methodologies />
      </ScrollVideoStack>
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
      <ContactSection />
    </>
  )
}
