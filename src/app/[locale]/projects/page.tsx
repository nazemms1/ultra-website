'use client'

import PageHero, { ShimmerText } from '@/components/shared/PageHero'
import Portfolio from '@/components/sections/Portfolio'
import CTASection from '@/components/sections/cta/CTASection'

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title={
          <>
            OUR <ShimmerText>PROJECTS</ShimmerText>
          </>
        }
        subtitle="Selected builds that showcase our engineering craft and design precision."
      />
      <Portfolio />
      <CTASection />
    </>
  )
}
