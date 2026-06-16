'use client'

import PageHero, { ShimmerText } from '@/components/shared/PageHero'
import ServicesOrbital from '@/components/sections/services-orbital/ServicesOrbital'
import Methodologies from '@/components/sections/methodologies/Methodologies'
import CTASection from '@/components/sections/cta/CTASection'

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Offerings"
        title={
          <>
            OUR <ShimmerText>SERVICES</ShimmerText>
          </>
        }
        subtitle="Explore how we implement modern technologies to build top-tier systems and interfaces."
      />
      <ServicesOrbital />
      <Methodologies />
      <CTASection />
    </>
  )
}
