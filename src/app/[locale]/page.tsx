import HeroSection from '@/components/Pages/Home/HeroSection'
import HomeClientSections from '@/components/Pages/Home/HomeClientSections'
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
      <HomeClientSections
        partnersData={partnersData}
        servicesData={servicesData}
        statsData={statsData}
        portfoliosData={portfoliosData}
        methodologiesData={methodologiesData}
        reviewsData={reviewsData}
        ctaData={ctaData}
        faqsData={faqsData}
        stillHaveQuestionsData={stillHaveQuestionsData}
        contactUsData={contactUsData}
      />
    </>
  )
}
