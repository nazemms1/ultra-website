import { PROJECT_DETAILS } from '@/components/Pages/ProjectDetails/data'
import type { PortfoliosApiData, PortfoliosApiItem, ProjectGridItem } from './types'

const DENTA_COVER = '/images/projects/denta-cover.jpg'

function resolveMediaUrl(value: string | { url?: string } | null | undefined): string {
  if (!value) return ''
  return typeof value === 'string' ? value : (value.url ?? '')
}

function coverSrcForProject(id: string, fallback: string): string {
  if (id === 'denta-plans') return DENTA_COVER
  if (id === 'etihad') return '/images/projects/etihad.png'
  if (id === 'askonnect') return '/images/projects/askonnect.png'
  return fallback
}

function mapDetailToGridItem(detail: (typeof PROJECT_DETAILS)[number]): ProjectGridItem {
  const fallbackCover = detail.demoViews[0]?.screenshots[0]?.src ?? detail.logo.src

  return {
    id: detail.id,
    title: detail.title,
    description: detail.shortDescription,
    coverSrc: coverSrcForProject(detail.id, fallbackCover),
    coverAlt: `${detail.title} project cover`,
    logo: detail.logo,
    href: `/projects/${detail.id}`,
  }
}

function mapApiItemToGridItem(item: PortfoliosApiItem): ProjectGridItem | null {
  const id = item.id != null ? String(item.id) : ''
  const title = item.title?.trim()
  if (!id || !title) return null

  const coverSrc = resolveMediaUrl(item.cover_image)
  const logoSrc = resolveMediaUrl(item.logo) || coverSrc
  if (!coverSrc && !logoSrc) return null

  const description = item.short_description?.trim() || item.description?.trim() || ''

  return {
    id,
    title,
    description,
    coverSrc: coverSrc || logoSrc,
    coverAlt: title,
    logo: {
      src: logoSrc || coverSrc,
      alt: `${title} logo`,
      width: 200,
      height: 87,
    },
    href: `/projects/${id}`,
  }
}

export function parsePortfoliosApiData(value: unknown): PortfoliosApiData | null {
  if (!value || typeof value !== 'object') return null
  return value as PortfoliosApiData
}

export function resolveProjectGridItems(data?: PortfoliosApiData | null): ProjectGridItem[] {
  if (data?.items && data.items.length > 0) {
    return data.items
      .map(item => mapApiItemToGridItem(item))
      .filter((item): item is ProjectGridItem => item !== null)
  }

  return PROJECT_DETAILS.map(mapDetailToGridItem)
}
