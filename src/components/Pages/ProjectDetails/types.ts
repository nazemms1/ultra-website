/** Logo shown inside the frosted hero card. */
export interface ProjectDetailLogo {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
}

/** Content for a single project detail page hero. */
export interface ProjectDetail {
  readonly id: string
  readonly title: string
  readonly metaCategory: string
  readonly year: string
  readonly shortDescription: string
  readonly websiteUrl?: string
  readonly logo: ProjectDetailLogo
}
