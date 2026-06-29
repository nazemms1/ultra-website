import Box from '@mui/material/Box'
import PageHero from '@/components/shared/PageHero'
import GalleryContent from '@/components/Pages/Gallery/GalleryContent'
import CTASection from '@/components/Pages/Home/CTASection'
import { fetchAPI } from '@/lib/api'

type Props = {
  params: Promise<{ locale: string }>
}

function formatHeroTitle(text: string) {
  if (!text) return ''
  const words = text.trim().split(/\s+/)
  if (words.length <= 1) return text

  const lastWord = words.pop() || ''
  const prefix = words.join(' ')

  return (
    <>
      {prefix}{' '}
      <Box component="span" sx={{ color: '#0DF1D9' }}>
        {lastWord}
      </Box>
    </>
  )
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params

  // Fetch page configuration and CTA content
  const [galleryData, startProjectData] = await Promise.all([
    fetchAPI('/api/gallery-data', locale),
    fetchAPI('/api/start-project-data', locale),
  ])

  // Fallbacks for layout
  const eyebrowText = galleryData?.title || (locale === 'ar' ? 'روائعنا' : 'OUR GALLERY')
  
  const titleText = galleryData?.subtitle 
    ? formatHeroTitle(galleryData.subtitle) 
    : (
      locale === 'ar' ? (
        <>
          استكشف اللحظات التي{' '}
          <Box component="span" sx={{ color: '#0DF1D9' }}>
            التقطناها
          </Box>
        </>
      ) : (
        <>
          OUR PARTICIPATIONS IN THE{' '}
          <Box component="span" sx={{ color: '#0DF1D9' }}>
            BIG EVENTS
          </Box>
        </>
      )
    )

  const subtitleText = galleryData?.description || (
    locale === 'ar' 
      ? 'رحلة بصرية لمشاركتنا وفعالياتنا وأبرز محطاتنا.' 
      : 'A visual journey of our events, participations, and milestones.'
  )

  const rawVideo = galleryData?.video
  const videoSrc = (typeof rawVideo === 'string' ? rawVideo : rawVideo?.url) || undefined

  // Fetch initial (page 1) images for all gallery groups concurrently
  const items = galleryData?.items || []
  const initialImagesMap: Record<number, any> = {}

  await Promise.all(
    items.map(async (item: any) => {
      const res = await fetchAPI(`/api/gallery-items/${item.id}/images`, locale)
      if (res) {
        initialImagesMap[item.id] = res
      }
    })
  )

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
      <GalleryContent
        galleryData={galleryData || { title: eyebrowText, subtitle: '', description: subtitleText, items: [] }}
        initialImagesMap={initialImagesMap}
        locale={locale}
      />
      <CTASection data={startProjectData} />
    </>
  )
}
