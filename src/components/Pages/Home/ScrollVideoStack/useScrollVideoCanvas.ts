'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import { useAnimationFrame, type MotionValue } from 'framer-motion'
import {
  SCROLL_VIDEO_FRAME_COUNT,
  SCROLL_VIDEO_MAX_DPR,
  SCROLL_VIDEO_MAX_FRAME_WIDTH,
} from './constants'
import {
  captureVideoFrame,
  computeFrameSize,
  drawCrossfadedFrames,
  type FrameSize,
} from './canvasUtils'

type UseScrollVideoCanvasOptions = {
  progress: MotionValue<number>
  videoRef: RefObject<HTMLVideoElement | null>
  canvasRef: RefObject<HTMLCanvasElement | null>
  disabled?: boolean
}

export function useScrollVideoCanvas({
  progress,
  videoRef,
  canvasRef,
  disabled = false,
}: UseScrollVideoCanvasOptions) {
  const framesRef = useRef<ImageBitmap[]>([])
  const frameSizeRef = useRef<FrameSize>({ width: 0, height: 0 })
  const canvasSizeRef = useRef({ width: 0, height: 0 })
  const isActiveRef = useRef(true)
  const lastProgressRef = useRef(-1)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (disabled) return

    const video = videoRef.current
    if (!video) return

    let cancelled = false
    const extracted: ImageBitmap[] = []

    const extractFrames = async () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return

      const frameSize = computeFrameSize(
        video.videoWidth,
        video.videoHeight,
        SCROLL_VIDEO_MAX_FRAME_WIDTH,
      )
      frameSizeRef.current = frameSize

      video.pause()

      for (let i = 0; i < SCROLL_VIDEO_FRAME_COUNT; i += 1) {
        if (cancelled) return

        const time = (i / (SCROLL_VIDEO_FRAME_COUNT - 1)) * video.duration

        const bitmap = await captureVideoFrame(video, time, frameSize)
        if (cancelled) {
          bitmap.close()
          return
        }

        extracted.push(bitmap)
        framesRef.current = [...extracted]

        if (i === 0 || i === 1) {
          setIsReady(true)
          lastProgressRef.current = -1
        }

        await new Promise<void>(resolve => {
          requestAnimationFrame(() => resolve())
        })
      }

      if (!cancelled) {
        setIsReady(true)
      }
    }

    const onReady = () => {
      void extractFrames()
    }

    video.addEventListener('loadedmetadata', onReady)

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA && video.videoWidth > 0) {
      void extractFrames()
    }

    return () => {
      cancelled = true
      video.removeEventListener('loadedmetadata', onReady)
      framesRef.current.forEach(frame => frame.close())
      framesRef.current = []
      frameSizeRef.current = { width: 0, height: 0 }
      lastProgressRef.current = -1
      setIsReady(false)
    }
  }, [disabled, videoRef])

  useEffect(() => {
    if (disabled) return

    const canvas = canvasRef.current
    if (!canvas) return

    const syncCanvasSize = () => {
      const parent = canvas.parentElement
      if (!parent) return

      const dpr = Math.min(window.devicePixelRatio || 1, SCROLL_VIDEO_MAX_DPR)
      const width = Math.round(parent.clientWidth * dpr)
      const height = Math.round(parent.clientHeight * dpr)

      if (width <= 0 || height <= 0) return
      if (canvasSizeRef.current.width === width && canvasSizeRef.current.height === height) {
        return
      }

      canvas.width = width
      canvas.height = height
      canvasSizeRef.current = { width, height }
      lastProgressRef.current = -1
    }

    syncCanvasSize()

    const observer = new ResizeObserver(syncCanvasSize)
    observer.observe(canvas.parentElement ?? canvas)
    window.addEventListener('resize', syncCanvasSize)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncCanvasSize)
      canvasSizeRef.current = { width: 0, height: 0 }
    }
  }, [disabled, canvasRef, isReady])

  useEffect(() => {
    const onVisibilityChange = () => {
      isActiveRef.current = !document.hidden
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  useAnimationFrame(() => {
    if (disabled || !isReady || !isActiveRef.current) return

    const canvas = canvasRef.current
    const frames = framesRef.current
    if (!canvas || frames.length === 0) return

    const raw = progress.get()
    if (raw < 0 || raw > 1) return

    const clamped = Math.min(Math.max(raw, 0), 1)
    if (Math.abs(clamped - lastProgressRef.current) < 0.0001) return

    lastProgressRef.current = clamped

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    drawCrossfadedFrames(ctx, frames, clamped, canvas.width, canvas.height)
  })

  return { isReady }
}
