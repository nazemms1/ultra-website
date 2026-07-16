'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useHashScroll } from './useHashScroll'
import { useSectionScroll } from '@/lib/SectionScrollContext'
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

/** User signals that mean the below-fold sections will be needed soon. */
const DEFER_TRIGGER_EVENTS = ['pointerdown', 'pointermove', 'wheel', 'touchstart', 'keydown'] as const

/**
 * Defers mounting of the sections after the ScrollVideoStack until they can
 * possibly be seen: first user interaction, an in-page anchor / pending
 * section scroll targeting them, or the viewport approaching the sentinel.
 * Cuts the initial JS/network work roughly in half without any visual change.
 */
function useDeferredBelowFoldSections() {
  const [ready, setReady] = useState(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const { getPendingSectionId } = useSectionScroll()

  // NOTE: this effect must run before useHashScroll's effect, which strips
  // the hash from the URL — HomeClientSections calls this hook first.
  useEffect(() => {
    if (ready) return

    const trigger = () => setReady(true)

    // Direct load of /#section, or a section scroll pending from another page.
    if (window.location.hash || getPendingSectionId()) {
      trigger()
      return
    }

    const options: AddEventListenerOptions = { once: true, passive: true, capture: true }
    DEFER_TRIGGER_EVENTS.forEach(event => window.addEventListener(event, trigger, options))

    // Safety net for scrolls that fire no input events (e.g. programmatic).
    let observer: IntersectionObserver | null = null
    if (sentinelRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) trigger()
        },
        { rootMargin: '1200px 0px' },
      )
      observer.observe(sentinelRef.current)
    }

    return () => {
      DEFER_TRIGGER_EVENTS.forEach(event => window.removeEventListener(event, trigger, options))
      observer?.disconnect()
    }
  }, [ready, getPendingSectionId])

  // In-page anchor clicks (e.g. hero's "Get In Touch" → #contact) can land
  // before the deferred chunk has mounted — poll for the target, then scroll.
  useEffect(() => {
    const pollRef = { id: 0 }

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null
      const anchor = target?.closest?.('a[href^="#"]')
      if (!anchor) return
      const id = (anchor.getAttribute('href') ?? '').slice(1)
      if (!id || document.getElementById(id)) return

      event.preventDefault()
      setReady(true)
      window.clearInterval(pollRef.id)
      let tries = 0
      pollRef.id = window.setInterval(() => {
        const el = document.getElementById(id)
        if (el) {
          window.clearInterval(pollRef.id)
          el.scrollIntoView({ behavior: 'smooth' })
        } else if (++tries >= 100) {
          window.clearInterval(pollRef.id)
        }
      }, 50)
    }

    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.clearInterval(pollRef.id)
    }
  }, [])

  return { ready, sentinelRef }
}

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
  const { ready: belowFoldReady, sentinelRef } = useDeferredBelowFoldSections()
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
      <div ref={sentinelRef} aria-hidden />
      {belowFoldReady && (
        <>
          <TestimonialsSection data={reviewsData} />
          <CTASection data={ctaData} />
          <FAQSection data={faqsData} stillHaveQuestionsData={stillHaveQuestionsData} />
          <ContactSection data={contactUsData} />
        </>
      )}
    </>
  )
}
