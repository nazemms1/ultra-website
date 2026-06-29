import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import ProjectDetailsPage from '@/components/Pages/ProjectDetails/ProjectDetailsPage'
import { getProjectById, PROJECT_DETAIL_IDS } from '@/components/Pages/ProjectDetails/data'
import { routing, type AppLocale } from '@/i18n/routing'

type ProjectDetailPageProps = {
  params: Promise<{ locale: string; id: string }>
}

export function generateStaticParams() {
  return routing.locales.flatMap(locale =>
    PROJECT_DETAIL_IDS.map(id => ({ locale, id })),
  )
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, id } = await params

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound()
  }

  setRequestLocale(locale as AppLocale)

  const project = getProjectById(id)
  if (!project) {
    notFound()
  }

  return <ProjectDetailsPage project={project} />
}
