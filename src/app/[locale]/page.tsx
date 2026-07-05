import dynamic from 'next/dynamic'
import HeroSection from '@/components/Pages/Home/HeroSection'
import { getLocale } from 'next-intl/server'
import { fetchAPI } from '@/lib/api'

// Lazy-load everything below the fold to reduce initial JS bundle
const ScrollVideoStack = dynamic(() => import('@/components/Pages/Home/ScrollVideoStack'), {
  ssr: false,
})
const PartnersSection = dynamic(() => import('@/components/Pages/Home/Partners'), { ssr: false })
const Stats = dynamic(() => import('@/components/Pages/Home/Stats/Stats'), { ssr: false })
const ServicesOrbital = dynamic(
  () => import('@/components/Pages/Home/Services-orbital/ServicesOrbital'),
  { ssr: false },
)
const Projects = dynamic(() => import('@/components/Pages/Home/Projects/Projects'), { ssr: false })
const Methodologies = dynamic(
  () => import('@/components/Pages/Home/Methodologies/Methodologies'),
  { ssr: false },
)
const TestimonialsSection = dynamic(
  () => import('@/components/Pages/Home/TestimonialsSection'),
  { ssr: false },
)
const CTASection = dynamic(() => import('@/components/Pages/Home/CTASection'), { ssr: false })
const FAQSection = dynamic(() => import('@/components/Pages/Home/Faqs'), { ssr: false })
const ContactSection = dynamic(() => import('@/components/Pages/Home/ContactSection'), {
  ssr: false,
})
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
