import PageHero from '@/components/shared/PageHero'
import ProjectsGrid from '@/components/Pages/Projects/ProjectsGrid/ProjectsGrid'
import { parsePortfoliosApiData } from '@/components/Pages/Projects/ProjectsGrid/data'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { fetchAPI } from '@/lib/api'
import Box from '@mui/material/Box'

type MediaField = string | { url?: string } | null | undefined

function resolveMediaUrl(value: MediaField): string | undefined {
  if (typeof value === 'string') return value
  return value?.url
}

type Props = {
  params: Promise<{ locale: string }>
}

export default async function ProjectsPage({ params }: Props) {
  // Locale must come from the URL segment — getLocale() falls back to the
  // default locale during static rendering, which broke /ar/projects.
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'ProjectsPage' })

  const [portfoliosData] = await Promise.all([fetchAPI('/api/portfolios-data', locale)])

  const videoSrc = resolveMediaUrl(portfoliosData?.video) ?? '/videos/colorflow-animation (3).mp4'

  const titleText = portfoliosData?.['main-section']?.title ? (
    portfoliosData['main-section'].title
  ) : (
    <>
      {t('titleLine1')}
      <Box component="span" sx={{ color: 'primary.light' }}>
        {t('titleAccent')}
      </Box>
      {t('titleLine2')}
    </>
  )

  const descriptionText = portfoliosData?.['main-section']?.description || t('description')

  return (
    <>
      <PageHero
        align="left"
        height={406}
        eyebrow={t('eyebrow')}
        title={titleText}
        subtitle={descriptionText}
        videoSrc={videoSrc}
      />
      <ProjectsGrid data={parsePortfoliosApiData(portfoliosData)} />
    </>
  )
}

