'use client'

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion'
import { drawCoverFrame, getMaskCanvasContext, syncCanvasToViewport } from './canvasUtils'
import {
  SCROLL_VIDEO_CONTENT_OPACITY,
  SCROLL_VIDEO_EDGE_FADE,
  SCROLL_VIDEO_PRELOAD_RADIUS,
} from './constants'
import {
  ensureFrameImage,
  getCachedFrameImage,
  getCachedScrollFrameUrls,
  preloadFrameRange,
  preloadFrameWindow,
  tryLoadStaticFrameUrls,
} from './frameLoader'

type UseScrollVideoScrubOptions = {
  progress: MotionValue<number>
  canvasRef: RefObject<HTMLCanvasElement | null>
  viewportRef: RefObject<HTMLElement | null>
  disabled?: boolean
}

function clampProgress(value: number) {
  return Math.min(Math.max(value, 0), 1)
}

function edgeFadeFactor(value: number) {
  if (value < 0 || value > 1) return 0

  if (value < SCROLL_VIDEO_EDGE_FADE) {
    return value / SCROLL_VIDEO_EDGE_FADE
  }

  if (value > 1 - SCROLL_VIDEO_EDGE_FADE) {
    return (1 - value) / SCROLL_VIDEO_EDGE_FADE
  }

  return 1
}

function frameIndexFromProgress(value: number, count: number) {
  if (count <= 1) return 0
  return Math.min(Math.floor(clampProgress(value) * (count - 1)), count - 1)
}

function readDevicePixelRatio() {
  if (typeof window === 'undefined') return 1
  return Math.min(window.devicePixelRatio || 1, 2)
}

export function useScrollVideoScrub({
  progress,
  canvasRef,
  viewportRef,
  disabled = false,
}: UseScrollVideoScrubOptions) {
  const [isReady, setIsReady] = useState(false)
  const frameCountRef = useRef(0)
  const frameUrlsRef = useRef<string[]>([])
  const paintedIndexRef = useRef(-1)
  const latestProgressRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const viewportSizeRef = useRef<{ width: number; height: number } | null>(null)

  const layerOpacity = useTransform(
    progress,
    value => edgeFadeFactor(value) * SCROLL_VIDEO_CONTENT_OPACITY,
  )

  const paintFrame = useCallback(
    (value: number, force = false) => {
      const canvas = canvasRef.current
      const viewport = viewportRef.current
      if (!canvas || !viewport) return

      const count = frameCountRef.current
      const urls = frameUrlsRef.current
      if (count < 1) return

      const index = frameIndexFromProgress(value, count)
      if (!force && index === paintedIndexRef.current) return

      const url = urls[index]
      const image = url ? getCachedFrameImage(url) : null
      if (!image) {
        preloadFrameWindow(urls, index)
        void ensureFrameImage(url).then(loaded => {
          if (!loaded) return
          if (frameIndexFromProgress(latestProgressRef.current, count) === index) {
            // eslint-disable-next-line react-hooks/immutability
            paintFrame(latestProgressRef.current, true)
          }
        })
        return
      }

      const dpr = readDevicePixelRatio()
      let size: { width: number; height: number } | null = null

      if (viewportSizeRef.current) {
        const width = Math.round(viewportSizeRef.current.width * dpr)
        const height = Math.round(viewportSizeRef.current.height * dpr)
        if (width > 0 && height > 0) {
          if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width
            canvas.height = height
          }
          size = { width, height }
        }
      }

      if (!size) {
        size = syncCanvasToViewport(canvas, viewport, dpr)
      }
      if (!size) return

      if (!ctxRef.current) {
        ctxRef.current = getMaskCanvasContext(canvas)
      }

      drawCoverFrame(ctxRef.current, image, size.width, size.height)
      paintedIndexRef.current = index
      preloadFrameWindow(urls, index)
    },
    [canvasRef, viewportRef],
  )

  const schedulePaint = useCallback(
    (value: number) => {
      latestProgressRef.current = value

      if (rafRef.current !== null) return

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        paintFrame(latestProgressRef.current)
      })
    },
    [paintFrame],
  )

  useEffect(() => {
    if (disabled) return

    let cancelled = false

    const bootstrap = async () => {
      const cached = getCachedScrollFrameUrls()
      const urls = cached?.length ? cached : await tryLoadStaticFrameUrls()
      if (cancelled || !urls?.length) return

      frameCountRef.current = urls.length
      frameUrlsRef.current = urls
      paintedIndexRef.current = -1

      const initialIndex = frameIndexFromProgress(progress.get(), urls.length)
      await preloadFrameRange(
        urls,
        initialIndex - SCROLL_VIDEO_PRELOAD_RADIUS,
        initialIndex + SCROLL_VIDEO_PRELOAD_RADIUS,
      )

      if (cancelled) return

      latestProgressRef.current = progress.get()
      if (!cancelled) setIsReady(true)
    }

    void bootstrap()

    return () => {
      cancelled = true
      frameCountRef.current = 0
      frameUrlsRef.current = []
      paintedIndexRef.current = -1
      ctxRef.current = null
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      setIsReady(false)
    }
  }, [disabled, progress])

  useEffect(() => {
    if (disabled || !isReady) return

    paintedIndexRef.current = -1
    paintFrame(progress.get(), true)
  }, [disabled, isReady, paintFrame, progress])

  useEffect(() => {
    if (disabled) return

    const viewport = viewportRef.current
    if (!viewport) return

    const observer = new ResizeObserver(entries => {
      const entry = entries[0]
      if (entry) {
        viewportSizeRef.current = {
          width: entry.target.clientWidth,
          height: entry.target.clientHeight,
        }
      }
      paintedIndexRef.current = -1
      paintFrame(latestProgressRef.current, true)
    })

    observer.observe(viewport)
    return () => observer.disconnect()
  }, [disabled, viewportRef, paintFrame])

  useMotionValueEvent(progress, 'change', schedulePaint)

  return { isReady, layerOpacity }
}
