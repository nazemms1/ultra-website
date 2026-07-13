'use client'

import { useHashScroll } from './useHashScroll'
import ScrollVideoStack from '@/components/Pages/Home/ScrollVideoStack'
import PartnersSection from '@/components/Pages/Home/Partners'
import Stats from '@/components/Pages/Home/Stats/Stats'
import ServicesOrbital from '@/components/Pages/Home/Services-orbital/ServicesOrbital'
import Projects from '@/components/Pages/Home/Projects/Projects'
import Methodologies from '@/components/Pages/Home/Methodologies/Methodologies'
import TestimonialsSection from '@/components/Pages/Home/TestimonialsSection'
import CTASection from '@/components/Pages/Home/CTASection'
import FAQSection from '@/components/Pages/Home/Faqs'
import ContactSection from '@/components/Pages/Home/ContactSection'

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
