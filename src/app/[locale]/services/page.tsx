import Box from '@mui/material/Box'
import PageHero from '@/components/shared/PageHero'
import ServicesCardStack from '@/components/Pages/Service/ServicesCardStack'
import CTASection from '@/components/Pages/Home/CTASection'
import { getLocale } from 'next-intl/server'
import { fetchAPI } from '@/lib/api'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params

  // Fetch services data and CTA content concurrently
  const [servicesData, startProjectData] = await Promise.all([
    fetchAPI('/api/services-data', locale),
    fetchAPI('/api/start-project-data', locale),
  ])

  const eyebrowText = servicesData?.title || 'OUR SERVICES'
  const titleText = servicesData?.subtitle ? (
    servicesData.subtitle
  ) : (
    <>
      WAYS WE PLUG IN
      <br />
      AND{' '}
      <Box component="span" sx={{ color: '#0DF1D9' }}>
        LEVEL YOU UP.
      </Box>
    </>
  )
  const subtitleText =
    servicesData?.description ||
    'Explore our six core practices and three engagement models designed to fit your unique challenges. Choose the approach that aligns with your needs, or reach out to us for personalized guidance.'
  const rawVideo = servicesData?.video
  const videoSrc =
    (typeof rawVideo === 'string' ? rawVideo : rawVideo?.url) ||
    '/videos/colorflow-animation (3).mp4'

  return (
    <>
      <PageHero
        align="left"
        height={504}
        videoSrc={videoSrc}
        eyebrow={eyebrowText}
        title={titleText}
        subtitle={subtitleText}
      />
      <ServicesCardStack data={servicesData} />
      <CTASection data={startProjectData} />
    </>
  )
}
