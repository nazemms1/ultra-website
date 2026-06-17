import type { MotionValue } from 'framer-motion'

/** Device frame the mockup is rendered in — drives aspect ratio + sizing. */
export type ProjectMockupKind = 'desktop' | 'mobile'

/** Which side of the row the device mockup sits on (text takes the other). */
export type ProjectImageSide = 'left' | 'right'

/** A single transparent device mockup shown for a project. */
export interface ProjectMockup {
  /** Public path to a PNG with a true alpha channel (no checkerboard fill). */
  readonly src: string
  readonly alt: string
  readonly kind: ProjectMockupKind
}

/** One case study rendered as a full-viewport scroll-jacked panel. */
export interface ProjectItem {
  readonly id: string
  readonly title: string
  readonly description: string
  /** Destination for the "See full details" CTA. */
  readonly href: string
  readonly mockup: ProjectMockup
  readonly imageSide: ProjectImageSide
}

/**
 * Scroll-progress windows (0–1) that drive a single panel's lifecycle.
 * `exit` is `null` for the final panel, which holds visible until the end.
 */
export interface PanelRanges {
  readonly enter: readonly [number, number]
  readonly exit: readonly [number, number] | null
}

/** Props for a scroll-linked project panel. */
export interface ProjectPanelProps {
  readonly project: ProjectItem
  readonly index: number
  readonly total: number
  /** Shared scroll progress (0–1) for the whole pinned section. */
  readonly progress: MotionValue<number>
}
