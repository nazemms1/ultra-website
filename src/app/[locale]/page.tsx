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

  const [
    heroData,
    partnersData,
    servicesData,
    statsData,
    ctaData,
    faqsData,
    stillHaveQuestionsData,
    methodologiesData,
    reviewsData,
    portfoliosData,
    contactUsData,
  ] = await Promise.all([
    fetchAPI('/api/hero-section', locale),
    fetchAPI('/api/partners-data', locale),
    fetchAPI('/api/services-data', locale),
    fetchAPI('/api/statisitcs-data', locale),
    fetchAPI('/api/start-project-data', locale),
    fetchAPI('/api/faqs-data', locale),
    fetchAPI('/api/still-have-questions-data', locale),
    fetchAPI('/api/methodologies-data', locale),
    fetchAPI('/api/reviews-data', locale),
    fetchAPI('/api/portfolios-data', locale),
    fetchAPI('/api/contact-us-data', locale),
  ])

  return (
    <>
      <HeroSection data={heroData} />
      <ScrollVideoStack>
        {partnersData?.is_shown !== false && (
          <div id="about">
            <PartnersSection data={partnersData} />
          </div>
        )}
        {servicesData?.is_shown !== false && (
          <div id="services">
            <ServicesOrbital data={servicesData} />
          </div>
        )}
        <Stats data={statsData} />
        {portfoliosData?.is_shown !== false && (
          <div id="projects">
            <Projects data={portfoliosData} />
          </div>
        )}
        <Methodologies data={methodologiesData} />
      </ScrollVideoStack>
      <TestimonialsSection data={reviewsData} />
      <CTASection data={ctaData} />
      <FAQSection data={faqsData} stillHaveQuestionsData={stillHaveQuestionsData} />
      <ContactSection data={contactUsData} />
    </>
  )
}
