'use client'

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion'
import { drawCoverFrame, getMaskCanvasContext, syncCanvasToViewport } from './canvasUtils'
import {
  SCROLL_VIDEO_CONTENT_OPACITY,
  SCROLL_VIDEO_EDGE_FADE,
  SCROLL_VIDEO_FALLBACK_SRC,
  SCROLL_VIDEO_SRC,
} from './constants'

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
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const durationRef = useRef(0)
  const latestProgressRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const viewportSizeRef = useRef<{ width: number; height: number } | null>(null)

  const layerOpacity = useTransform(
    progress,
    value => edgeFadeFactor(value) * SCROLL_VIDEO_CONTENT_OPACITY,
  )

  const paintFrame = useCallback(() => {
    const canvas = canvasRef.current
    const viewport = viewportRef.current
    const video = videoRef.current
    if (!canvas || !viewport || !video || durationRef.current <= 0) return

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

    drawCoverFrame(ctxRef.current, video, size.width, size.height)
  }, [canvasRef, viewportRef])

  const scheduleSeekAndPaint = useCallback(
    (value: number) => {
      if (disabled) return
      latestProgressRef.current = value

      const video = videoRef.current
      const duration = durationRef.current
      if (video && duration > 0) {
        const targetTime = clampProgress(value) * duration
        if (Math.abs(video.currentTime - targetTime) > 0.001) {
          if ('fastSeek' in video && typeof (video as { fastSeek?: (t: number) => void }).fastSeek === 'function') {
            ;(video as { fastSeek: (t: number) => void }).fastSeek(targetTime)
          } else {
            video.currentTime = targetTime
          }
        }
      }

      if (rafRef.current !== null) return

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        paintFrame()
      })
    },
    [disabled, paintFrame],
  )

  useEffect(() => {
    if (disabled) return

    let cancelled = false
    const video = document.createElement('video')
    video.setAttribute('playsinline', 'true')
    video.setAttribute('preload', 'auto')
    video.muted = true

    videoRef.current = video

    const handleLoadedMetadata = () => {
      if (cancelled) return
      durationRef.current = video.duration || 0
      setIsReady(true)
      scheduleSeekAndPaint(progress.get())
    }

    const handleError = () => {
      if (cancelled) return
      if (video.src !== SCROLL_VIDEO_FALLBACK_SRC) {
        video.src = SCROLL_VIDEO_FALLBACK_SRC
        video.load()
      }
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('seeked', paintFrame)
    video.addEventListener('error', handleError)

    video.src = SCROLL_VIDEO_SRC
    video.load()

    return () => {
      cancelled = true
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('seeked', paintFrame)
      video.removeEventListener('error', handleError)
      video.pause()
      video.src = ''
      videoRef.current = null
      durationRef.current = 0
      setIsReady(false)
    }
  }, [disabled, progress, scheduleSeekAndPaint, paintFrame])

  useEffect(() => {
    if (disabled || !isReady) return
    scheduleSeekAndPaint(progress.get())
  }, [disabled, isReady, progress, scheduleSeekAndPaint])

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
      paintFrame()
    })

    observer.observe(viewport)
    return () => observer.disconnect()
  }, [disabled, viewportRef, paintFrame])

  useMotionValueEvent(progress, 'change', scheduleSeekAndPaint)

  return { isReady, layerOpacity }
}
