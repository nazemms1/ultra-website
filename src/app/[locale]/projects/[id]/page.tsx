import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import ProjectDetailsPage from '@/components/Pages/ProjectDetails/ProjectDetailsPage'
import { parseProjectDetailApiData } from '@/components/Pages/ProjectDetails/data'
import { routing, type AppLocale } from '@/i18n/routing'
import { fetchAPI } from '@/lib/api'

type ProjectDetailPageProps = {
  params: Promise<{ locale: string; id: string }>
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, id } = await params

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound()
  }

  setRequestLocale(locale as AppLocale)

  const apiData = await fetchAPI(`/api/projects/${id}`, locale)
  if (!apiData) {
    notFound()
  }

  const project = parseProjectDetailApiData(apiData)
  if (!project) {
    notFound()
  }

  return <ProjectDetailsPage project={project} />
}
