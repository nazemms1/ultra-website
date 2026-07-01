import ProjectsHero from '@/components/Pages/Projects/ProjectsHero/ProjectsHero'
import ProjectsGrid from '@/components/Pages/Projects/ProjectsGrid/ProjectsGrid'
import { parsePortfoliosApiData } from '@/components/Pages/Projects/ProjectsGrid/data'
import { getLocale } from 'next-intl/server'
import { fetchAPI } from '@/lib/api'

type MediaField = string | { url?: string } | null | undefined

function resolveMediaUrl(value: MediaField): string | undefined {
  if (typeof value === 'string') return value
  return value?.url
}

export default async function ProjectsPage() {
  const locale = await getLocale()

  const [portfoliosData] = await Promise.all([fetchAPI('/api/portfolios-data', locale)])

  const videoSrc = resolveMediaUrl(portfoliosData?.video) ?? '/videos/colorflow-animation (3).mp4'

  return (
    <>
      <ProjectsHero videoSrc={videoSrc} />
      <ProjectsGrid data={parsePortfoliosApiData(portfoliosData)} />
    </>
  )
}
