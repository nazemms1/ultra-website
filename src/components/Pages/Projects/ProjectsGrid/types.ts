export type ProjectGridLogo = {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
}

export type ProjectGridItem = {
  readonly id: string
  readonly title: string
  readonly description: string
  /** Full-bleed photographic cover for the image block (Figma 1176510173) */
  readonly coverSrc: string
  readonly coverAlt: string
  readonly logo: ProjectGridLogo
  readonly href: string
}

export type PortfoliosApiItem = {
  readonly id?: string | number
  readonly title?: string
  readonly description?: string
  readonly short_description?: string
  readonly subtitle?: string
  readonly cover_image?: string | { url?: string }
  readonly logo?: string | { url?: string }
  readonly image?: string | { url?: string } | null
}

export type PortfoliosApiData = {
  readonly is_shown?: boolean
  readonly items?: readonly PortfoliosApiItem[]
  readonly data?: readonly PortfoliosApiItem[]
  readonly projects?: readonly PortfoliosApiItem[]
}
