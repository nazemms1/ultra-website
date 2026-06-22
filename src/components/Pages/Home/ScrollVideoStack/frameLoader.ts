import {
  SCROLL_VIDEO_MANIFEST,
  SCROLL_VIDEO_PRELOAD_RADIUS,
  SCROLL_VIDEO_SPLASH_CONCURRENCY,
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

let cachedUrls: string[] | null = null
let splashPreloadPromise: Promise<string[] | null> | null = null
const frameImages = new Map<string, HTMLImageElement>()
const decodeWaiters = new Map<string, Promise<HTMLImageElement>>()

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let cursor = 0

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (true) {
      const index = cursor
      cursor += 1
      if (index >= items.length) break
      results[index] = await mapper(items[index], index)
    }
  })

  await Promise.all(workers)
  return results
}

async function decodeImage(url: string): Promise<HTMLImageElement> {
  const image = new Image()
  image.decoding = 'async'
  image.src = url

  if (typeof image.decode === 'function') {
    try {
      await image.decode()
    } catch {
      await new Promise<void>(resolve => {
        image.addEventListener('load', () => resolve(), { once: true })
        image.addEventListener('error', () => resolve(), { once: true })
      })
    }
  } else {
    await new Promise<void>(resolve => {
      if (image.complete) {
        resolve()
        return
      }
      image.addEventListener('load', () => resolve(), { once: true })
      image.addEventListener('error', () => resolve(), { once: true })
    })
  }

  return image
}

/** Returns a decoded image element cached in memory — safe for synchronous canvas draws. */
export function getCachedFrameImage(url: string): HTMLImageElement | null {
  return frameImages.get(url) ?? null
}

export function isFrameDecoded(url: string) {
  return frameImages.has(url)
}

export function ensureFrameImage(url: string): Promise<HTMLImageElement> {
  if (!url) {
    return Promise.reject(new Error('Missing frame url'))
  }

  const cached = frameImages.get(url)
  if (cached) return Promise.resolve(cached)

  const pending = decodeWaiters.get(url)
  if (pending) return pending

  const task = decodeImage(url)
    .then(image => {
      frameImages.set(url, image)
      return image
    })
    .finally(() => {
      decodeWaiters.delete(url)
    })

  decodeWaiters.set(url, task)
  return task
}

/** @deprecated Use getCachedFrameImage / ensureFrameImage */
export function ensureFrameDecoded(url: string): Promise<void> {
  return ensureFrameImage(url).then(() => undefined)
}

export function getCachedScrollFrameUrls(): string[] | null {
  return cachedUrls
}

export function resetFramePreloadCache() {
  cachedUrls = null
  splashPreloadPromise = null
  frameImages.clear()
  decodeWaiters.clear()
}

export async function preloadScrollFramesForSplash(): Promise<string[] | null> {
  if (cachedUrls) return cachedUrls
  if (splashPreloadPromise) return splashPreloadPromise

  splashPreloadPromise = (async () => {
    const manifest = await loadStaticFrameManifest()
    if (!manifest) return null

    const urls = buildFrameUrls(manifest)
    if (!urls.length) return null

    cachedUrls = urls

    const priority = new Set<number>([0, 1, urls.length - 1, urls.length - 2])
    const priorityUrls = [...priority].map(index => urls[index]).filter(Boolean)

    await mapWithConcurrency(priorityUrls, SCROLL_VIDEO_SPLASH_CONCURRENCY, url =>
      ensureFrameImage(url),
    )

    void mapWithConcurrency(urls, SCROLL_VIDEO_SPLASH_CONCURRENCY, url => ensureFrameImage(url))

    return urls
  })()

  return splashPreloadPromise
}

export function preloadFrameWindow(urls: string[], centerIndex: number) {
  if (urls.length === 0) return

  const start = Math.max(0, centerIndex - SCROLL_VIDEO_PRELOAD_RADIUS)
  const end = Math.min(urls.length - 1, centerIndex + SCROLL_VIDEO_PRELOAD_RADIUS)

  for (let index = start; index <= end; index += 1) {
    const url = urls[index]
    if (!url) continue
    void ensureFrameImage(url)
  }
}

export async function preloadFrameRange(urls: string[], startIndex: number, endIndex: number) {
  const start = Math.max(0, startIndex)
  const end = Math.min(urls.length - 1, endIndex)

  const slice = urls.slice(start, end + 1)
  await mapWithConcurrency(slice, SCROLL_VIDEO_SPLASH_CONCURRENCY, url => ensureFrameImage(url))
}

export async function tryLoadStaticFrameUrls(): Promise<string[] | null> {
  if (cachedUrls?.length) return cachedUrls

  const manifest = await loadStaticFrameManifest()
  if (!manifest) return null

  const urls = buildFrameUrls(manifest)
  if (!urls.length) return null

  cachedUrls = urls
  return urls
}
