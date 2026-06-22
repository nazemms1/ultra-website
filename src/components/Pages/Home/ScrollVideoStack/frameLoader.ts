import {
  SCROLL_VIDEO_FRAME_LOAD_CONCURRENCY,
  SCROLL_VIDEO_MANIFEST,
  SCROLL_VIDEO_PRELOAD_RADIUS,
} from './constants'
import type { FrameManifest } from './types'

function resolvePadLength(manifest: FrameManifest) {
  if (manifest.padLength && manifest.padLength > 0) {
    return manifest.padLength
  }

  const start = manifest.indexStart ?? 0
  const lastIndex = start + manifest.frameCount - 1
  return Math.max(3, String(lastIndex).length)
}

export function buildFrameUrls(manifest: FrameManifest): string[] {
  const start = manifest.indexStart ?? 0
  const padLength = resolvePadLength(manifest)

  return Array.from({ length: manifest.frameCount }, (_, index) => {
    const fileIndex = index + start
    const padded = String(fileIndex).padStart(padLength, '0')
    return `${manifest.basePath}/frame-${padded}.webp`
  })
}

export async function loadStaticFrameManifest(): Promise<FrameManifest | null> {
  try {
    const response = await fetch(SCROLL_VIDEO_MANIFEST, { cache: 'no-store' })
    if (!response.ok) return null

    const manifest = (await response.json()) as FrameManifest
    if (!manifest.frameCount || !manifest.basePath) return null

    return manifest
  } catch {
    return null
  }
}

const preloaded = new Set<string>()

export function preloadFrameWindow(urls: string[], centerIndex: number) {
  if (urls.length === 0) return

  const start = Math.max(0, centerIndex - SCROLL_VIDEO_PRELOAD_RADIUS)
  const end = Math.min(urls.length - 1, centerIndex + SCROLL_VIDEO_PRELOAD_RADIUS)

  for (let index = start; index <= end; index += 1) {
    const url = urls[index]
    if (!url || preloaded.has(url)) continue

    preloaded.add(url)
    const image = new Image()
    image.decoding = 'async'
    image.src = url
  }
}

export async function tryLoadStaticFrameUrls(): Promise<string[] | null> {
  const manifest = await loadStaticFrameManifest()
  if (!manifest) return null

  const urls = buildFrameUrls(manifest)
  return urls.length > 0 ? urls : null
}

export function resetFramePreloadCache() {
  preloaded.clear()
}
