'use client'

import dynamic from 'next/dynamic'
import { useHashScroll } from './useHashScroll'
import ServicesOrbital from '@/components/Pages/Home/Services-orbital/ServicesOrbital'

const ScrollVideoStack = dynamic(() => import('@/components/Pages/Home/ScrollVideoStack'), { ssr: false })
const PartnersSection  = dynamic(() => import('@/components/Pages/Home/Partners'),         { ssr: false })
const Stats            = dynamic(() => import('@/components/Pages/Home/Stats/Stats'),       { ssr: false })
const Projects         = dynamic(() => import('@/components/Pages/Home/Projects/Projects'), { ssr: false })
const Methodologies    = dynamic(() => import('@/components/Pages/Home/Methodologies/Methodologies'), { ssr: false })
const TestimonialsSection = dynamic(() => import('@/components/Pages/Home/TestimonialsSection'), { ssr: false, loading: () => null })
const CTASection       = dynamic(() => import('@/components/Pages/Home/CTASection'),        { ssr: false, loading: () => null })
const FAQSection       = dynamic(() => import('@/components/Pages/Home/Faqs'),              { ssr: false, loading: () => null })
const ContactSection   = dynamic(() => import('@/components/Pages/Home/ContactSection'),    { ssr: false, loading: () => null })

interface Props {
  partnersData: any
  servicesData: any
  statsData: any
  portfoliosData: any
  methodologiesData: any
  reviewsData: any
  ctaData: any
  faqsData: any
  stillHaveQuestionsData: any
  contactUsData: any
}

export default function HomeClientSections({
  partnersData,
  servicesData,
  statsData,
  portfoliosData,
  methodologiesData,
  reviewsData,
  ctaData,
  faqsData,
  stillHaveQuestionsData,
  contactUsData,
}: Props) {
  useHashScroll()

  return (
    <>
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
