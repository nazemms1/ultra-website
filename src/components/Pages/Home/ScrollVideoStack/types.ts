export type FrameManifest = {
  frameCount: number
  basePath: string
  /** First file index in frame-NNN.webp filenames (ffmpeg defaults to 1). */
  indexStart?: number
  /** Zero-pad width for frame filenames (e.g. 6 → frame-000042.webp). */
  padLength?: number
  hasAlpha?: boolean
  quality?: number
  width?: number
  height?: number
}

export type FrameSize = {
  width: number
  height: number
}
