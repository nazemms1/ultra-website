import PageHero from '@/components/shared/PageHero'
import ProjectsGrid from '@/components/Pages/Projects/ProjectsGrid/ProjectsGrid'
import { parsePortfoliosApiData } from '@/components/Pages/Projects/ProjectsGrid/data'
import { getLocale } from 'next-intl/server'
import { fetchAPI } from '@/lib/api'
import { getTranslations } from 'next-intl/server'
import Box from '@mui/material/Box'

type MediaField = string | { url?: string } | null | undefined

function resolveMediaUrl(value: MediaField): string | undefined {
  if (typeof value === 'string') return value
  return value?.url
}

export default async function ProjectsPage() {
  const locale = await getLocale()
  const t = await getTranslations('ProjectsPage')

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

