import type { PortfoliosApiData, PortfoliosApiItem, ProjectGridItem } from './types'

function resolveMediaUrl(value: string | { url?: string } | null | undefined): string {
  if (!value) return ''
  return typeof value === 'string' ? value : (value.url ?? '')
}

function mapApiItemToGridItem(item: PortfoliosApiItem): ProjectGridItem | null {
  const id = item.id != null ? String(item.id) : ''
  const title = item.title?.trim()
  if (!id || !title) return null

  const logoSrc = resolveMediaUrl(item.image) || resolveMediaUrl(item.logo) || ''
  const coverSrc = resolveMediaUrl(item.cover_image) || ''

  const description = item.subtitle?.trim() || item.short_description?.trim() || item.description?.trim() || ''

  return {
    id,
    title,
    description,
    coverSrc: coverSrc,
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
  if (data?.projects && data.projects.length > 0) {
    return data.projects
      .map(item => mapApiItemToGridItem(item))
      .filter((item): item is ProjectGridItem => item !== null)
  }

  if (data?.data && data.data.length > 0) {
    return data.data
      .map(item => mapApiItemToGridItem(item))
      .filter((item): item is ProjectGridItem => item !== null)
  }

  if (data?.items && data.items.length > 0) {
    return data.items
      .map(item => mapApiItemToGridItem(item))
      .filter((item): item is ProjectGridItem => item !== null)
  }

  return []
}
