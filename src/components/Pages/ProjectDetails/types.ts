/** Logo shown inside the frosted hero card. */
export interface ProjectDetailLogo {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
}

export interface BriefBlock {
  readonly number: string
  readonly title: string
  readonly body: string
}

export interface ProjectTool {
  readonly name: string
  readonly icon?: string
}

export interface ProjectMetrics {
  readonly successRate: number
  readonly services: readonly string[]
  readonly tools: readonly (string | ProjectTool)[]
}

export type DemoViewId = string

export interface DemoScreenshot {
  readonly id: string
  readonly src: string
  readonly alt: string
}

export interface DemoView {
  readonly id: DemoViewId
  readonly label: string
  readonly device: 'mobile' | 'desktop'
  readonly icon?: string
  readonly screenshots: readonly DemoScreenshot[]
}

export interface RelatedProjectCard {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly logo: ProjectDetailLogo
}

/** Content for a single project detail page. */
export interface ProjectDetail {
  readonly id: string
  readonly title: string
  readonly metaCategory: string
  readonly year: string
  readonly shortDescription: string
  readonly websiteUrl?: string
  readonly logo: ProjectDetailLogo
  readonly cover?: string | null
  readonly logoImage?: string | null
  readonly brief: readonly BriefBlock[]
  readonly metrics: ProjectMetrics
  readonly demoViews: readonly DemoView[]
  readonly relatedProjects: readonly RelatedProjectCard[]
}
