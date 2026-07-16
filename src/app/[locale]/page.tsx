import HeroSection from '@/components/Pages/Home/HeroSection'
import HomeClientSections from '@/components/Pages/Home/HomeClientSections'
import { setRequestLocale } from 'next-intl/server'
import { fetchAPI } from '@/lib/api'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  // Locale must come from the URL segment — getLocale() falls back to the
  // default locale during static rendering, so /ar could render in English.
  const { locale } = await params
  setRequestLocale(locale)

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
