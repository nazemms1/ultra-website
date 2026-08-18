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

/** One case study rendered as a full-viewport project panel. */
export interface ProjectItem {
  readonly id: string
  readonly title: string
  readonly description: string
  /** Destination for the "See full details" CTA. */
  readonly href: string
  readonly mockup: ProjectMockup
  readonly imageSide: ProjectImageSide
}
