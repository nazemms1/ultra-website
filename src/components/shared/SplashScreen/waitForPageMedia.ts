import { SPLASH_CRITICAL_IMAGES, SPLASH_CRITICAL_VIDEOS } from './criticalAssets'
import { preloadScrollFramesForSplash } from '@/components/Pages/Home/ScrollVideoStack/frameLoader'
import { shouldDisableScrollVideo } from '@/components/Pages/Home/ScrollVideoStack/deviceUtils'

type WaitForPageMediaOptions = {
  /** Minimum time the splash stays visible even if assets resolve instantly. */
  minDurationMs?: number
  /** Hard cap — splash dismisses even if some assets fail or hang. */
  maxDurationMs?: number
  /** Idle period with no new DOM media before treating the tree as stable. */
  settleMs?: number
  /** Per-asset listener timeout (errors/timeouts resolve leniently). */
  perAssetTimeoutMs?: number
}

const DEFAULT_MIN_DURATION_MS = 900
const DEFAULT_MAX_DURATION_MS = 14_000
const DEFAULT_SETTLE_MS = 120
const DEFAULT_PER_ASSET_TIMEOUT_MS = 8_000
/** Resolve DOM wait when no img/video appears (e.g. lightweight routes). */
const DEFAULT_EMPTY_DOM_RESOLVE_MS = 2_500

/** `HTMLMediaElement.HAVE_CURRENT_DATA` — literal avoids SSR ReferenceError. */
const VIDEO_READY_STATE = 2

/** `HTMLMediaElement.NETWORK_NO_SOURCE` */
const VIDEO_NETWORK_NO_SOURCE = 3

function delay(ms: number): Promise<void> {
  return new Promise(resolve => {
    window.setTimeout(resolve, ms)
  })
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T | void> {
  return Promise.race([promise, delay(timeoutMs)])
}

async function isImageReady(img: HTMLImageElement): Promise<boolean> {
  if (!img.complete) return false
  if (img.naturalWidth === 0 && img.naturalHeight === 0) {
    return Boolean(img.currentSrc || img.src)
  }
  return true
}

async function isVideoReady(video: HTMLVideoElement): Promise<boolean> {
  return video.readyState >= VIDEO_READY_STATE || video.error !== null
}

async function waitForImageElement(img: HTMLImageElement, timeoutMs: number): Promise<void> {
  if (await isImageReady(img)) return Promise.resolve()

  return withTimeout(
    new Promise<void>(resolve => {
      const finish = () => resolve()
      img.addEventListener('load', finish, { once: true })
      img.addEventListener('error', finish, { once: true })
    }),
    timeoutMs,
  ).then(() => undefined)
}

async function waitForVideoElement(video: HTMLVideoElement, timeoutMs: number): Promise<void> {
  if (await isVideoReady(video)) return Promise.resolve()

  return withTimeout(
    new Promise<void>(resolve => {
      const finish = () => resolve()
      video.addEventListener('loadeddata', finish, { once: true })
      video.addEventListener('canplay', finish, { once: true })
      video.addEventListener('error', finish, { once: true })
      if (video.networkState === VIDEO_NETWORK_NO_SOURCE) {
        video.load()
      }
    }),
    timeoutMs,
  ).then(() => undefined)
}

async function preloadImage(src: string, timeoutMs: number): Promise<void> {
  return withTimeout(
    new Promise<void>(resolve => {
      const img = new Image()
      const finish = () => resolve()
      img.addEventListener('load', finish, { once: true })
      img.addEventListener('error', finish, { once: true })
      img.src = src
    }),
    timeoutMs,
  ).then(() => undefined)
}

async function preloadVideo(src: string, timeoutMs: number): Promise<void> {
  return withTimeout(
    new Promise<void>(resolve => {
      const video = document.createElement('video')
      video.preload = 'auto'
      video.muted = true
      video.playsInline = true
      const finish = () => resolve()
      video.addEventListener('loadeddata', finish, { once: true })
      video.addEventListener('canplay', finish, { once: true })
      video.addEventListener('error', finish, { once: true })
      video.src = src
      video.load()
    }),
    timeoutMs,
  ).then(() => undefined)
}

async function waitForCriticalAssets(timeoutMs: number): Promise<void> {
  const isMobile = shouldDisableScrollVideo()

  const tasks = [
    ...(!isMobile ? SPLASH_CRITICAL_VIDEOS.map(src => preloadVideo(src, timeoutMs)) : []),
    ...SPLASH_CRITICAL_IMAGES.map(src => preloadImage(src, timeoutMs)),
    ...(!isMobile ? [withTimeout(preloadScrollFramesForSplash(), timeoutMs)] : []),
  ]
  return Promise.all(tasks).then(() => undefined)
}

function collectDomMedia(root: ParentNode): {
  images: HTMLImageElement[]
  videos: HTMLVideoElement[]
} {
  const images = Array.from(root.querySelectorAll('img'))
  const videos = Array.from(root.querySelectorAll('video'))
  return { images, videos }
}

function waitForDomMedia(
  root: ParentNode,
  perAssetTimeoutMs: number,
  settleMs: number,
  emptyResolveMs: number,
): Promise<void> {
  return new Promise(resolve => {
    let settleTimer: number | undefined
    let emptyTimer: number | undefined

    const finish = () => {
      observer.disconnect()
      if (settleTimer !== undefined) window.clearTimeout(settleTimer)
      if (emptyTimer !== undefined) window.clearTimeout(emptyTimer)
      resolve()
    }

    const scheduleSettle = () => {
      if (settleTimer !== undefined) window.clearTimeout(settleTimer)
      settleTimer = window.setTimeout(finish, settleMs)
    }

    const check = () => {
      const { images, videos } = collectDomMedia(root)
      const pending: Promise<void>[] = []

      for (const img of images) {
        if (!isImageReady(img)) pending.push(waitForImageElement(img, perAssetTimeoutMs))
      }
      for (const video of videos) {
        if (!isVideoReady(video)) pending.push(waitForVideoElement(video, perAssetTimeoutMs))
      }

      if (pending.length === 0) {
        if (images.length + videos.length === 0) {
          if (emptyTimer === undefined) {
            emptyTimer = window.setTimeout(finish, emptyResolveMs)
          }
          return
        }

        if (emptyTimer !== undefined) {
          window.clearTimeout(emptyTimer)
          emptyTimer = undefined
        }
        scheduleSettle()
        return
      }

      if (emptyTimer !== undefined) {
        window.clearTimeout(emptyTimer)
        emptyTimer = undefined
      }

      void Promise.all(pending).then(scheduleSettle)
    }

    const observer = new MutationObserver(check)
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src'],
    })
    check()
  })
}

function waitForWindowLoad(): Promise<void> {
  if (document.readyState === 'complete') return Promise.resolve()
  return new Promise<void>(resolve => {
    window.addEventListener('load', () => resolve(), { once: true })
  })
}

/**
 * Resolves once fonts, critical assets, and in-DOM images/videos are ready
 * (or when maxDurationMs is reached).
 */
export async function waitForPageMedia(options: WaitForPageMediaOptions = {}): Promise<void> {
  if (typeof window === 'undefined') return

  const minDurationMs = options.minDurationMs ?? DEFAULT_MIN_DURATION_MS
  const maxDurationMs = options.maxDurationMs ?? DEFAULT_MAX_DURATION_MS
  const settleMs = options.settleMs ?? DEFAULT_SETTLE_MS
  const perAssetTimeoutMs = options.perAssetTimeoutMs ?? DEFAULT_PER_ASSET_TIMEOUT_MS

  const readiness = Promise.all([
    document.fonts.ready,
    waitForCriticalAssets(perAssetTimeoutMs),
    waitForDomMedia(document.body, perAssetTimeoutMs, settleMs, DEFAULT_EMPTY_DOM_RESOLVE_MS),
    waitForWindowLoad(),
  ])

  await Promise.race([Promise.all([readiness, delay(minDurationMs)]), delay(maxDurationMs)])
}
