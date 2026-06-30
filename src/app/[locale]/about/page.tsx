import Box from '@mui/material/Box'
import PageHero from '@/components/shared/PageHero'
import AboutContent from '@/components/Pages/About/AboutContent'
import AboutTimeline from '@/components/Pages/About/AboutTimeline'
import CTASection from '@/components/Pages/Home/CTASection'
import { fetchAPI } from '@/lib/api'
import ContactSection from '@/components/Pages/Home/ContactSection'

type Props = {
  params: Promise<{ locale: string }>
}

function formatHeroTitle(text: string) {
  if (!text) return ''
  const targetWord = 'ULTRAWARES'
  const parts = text.split(new RegExp(`(${targetWord})`, 'gi'))
  return parts.map((part, index) =>
    part.toLowerCase() === targetWord.toLowerCase() ? (
      <Box key={index} component="span" sx={{ color: '#0DF1D9' }}>
        {part}
      </Box>
    ) : (
      part
    ),
  )
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params

  // Fetch page configuration, CTA content, and Contact content concurrently
  const [aboutData, startProjectData, contactUsData] = await Promise.all([
    fetchAPI('/api/about-us-data', locale),
    fetchAPI('/api/start-project-data', locale),
    fetchAPI('/api/contact-us-data', locale),
  ])

  // Fallbacks for layout
  const eyebrowText = aboutData?.header?.title || (locale === 'ar' ? 'من نحن' : 'ABOUT ULTRAWARES')

  const titleText = aboutData?.header?.subtitle ? (
    formatHeroTitle(aboutData.header.subtitle)
  ) : locale === 'ar' ? (
    <>
      من هي{' '}
      <Box component="span" sx={{ color: '#0DF1D9' }}>
        ULTRAWARES.
      </Box>{' '}
      تعرّف علينا.
    </>
  ) : (
    <>
      WHO IS{' '}
      <Box component="span" sx={{ color: '#0DF1D9' }}>
        ULTRAWARES.
      </Box>{' '}
      GET TO KNOW US.
    </>
  )

  const subtitleText =
    aboutData?.header?.description ||
    (locale === 'ar'
      ? 'تأسست Ultrawares في عام 2018 من قبل مهندسين سئموا من رؤية الأفكار الرائعة تموت في لجان العمل. نحن موزعون عبر منطقتين زمنيتين، ونقوم ببناء البرمجيات للفرق التي لا تملك ترف الانتظار.'
      : "Ultrawares was founded in 2018 by engineers who'd grown tired of watching great ideas die in committee. We distributed across 2 timezones, building software for teams who can't afford to wait.")

  const rawVideo = aboutData?.header?.video
  const videoSrc = (typeof rawVideo === 'string' ? rawVideo : rawVideo?.url) || undefined

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
      <AboutContent aboutData={aboutData} locale={locale} />
      <AboutTimeline statisticsData={aboutData?.statistics} locale={locale} />
      <CTASection data={startProjectData} />
      <ContactSection data={contactUsData} />
      
    </>
  )
}
