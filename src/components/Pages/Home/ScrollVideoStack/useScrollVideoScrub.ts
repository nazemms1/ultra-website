'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import { useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion'
import { preloadFrameWindow, resetFramePreloadCache, tryLoadStaticFrameUrls } from './frameLoader'
import type { FrameIndices } from './types'

type UseScrollVideoScrubOptions = {
  progress: MotionValue<number>
  baseRef: RefObject<HTMLImageElement | null>
  overlayRef: RefObject<HTMLImageElement | null>
  disabled?: boolean
}

function clampProgress(value: number) {
  return Math.min(Math.max(value, 0), 1)
}

function indicesFromProgress(value: number, count: number): FrameIndices {
  if (count <= 1) {
    return { base: 0, overlay: 0 }
  }

  const scaled = clampProgress(value) * (count - 1)
  const base = Math.min(Math.floor(scaled), count - 1)
  const overlay = Math.min(base + 1, count - 1)

  return { base, overlay }
}

function setImageSrc(image: HTMLImageElement | null, url: string) {
  if (!image || !url) return
  if (image.src.endsWith(url)) return
  image.src = url
}

export function useScrollVideoScrub({
  progress,
  baseRef,
  overlayRef,
  disabled = false,
}: UseScrollVideoScrubOptions) {
  const [isReady, setIsReady] = useState(false)
  const [hasMultipleFrames, setHasMultipleFrames] = useState(false)
  const frameCountRef = useRef(0)
  const frameUrlsRef = useRef<string[]>([])
  const lastBaseRef = useRef(-1)

  const blendOpacity = useTransform(progress, value => {
    const count = frameCountRef.current
    if (count < 2) return 0
    const scaled = clampProgress(value) * (count - 1)
    return scaled - Math.floor(scaled)
  })

  const applyFramePair = (base: number, overlay: number) => {
    const urls = frameUrlsRef.current
    if (!urls.length) return

    setImageSrc(baseRef.current, urls[base] ?? '')
    setImageSrc(overlayRef.current, urls[overlay] ?? urls[base] ?? '')
    preloadFrameWindow(urls, base)
  }

  const syncToProgress = (value: number) => {
    const count = frameCountRef.current
    if (count < 1) return

    const { base, overlay } = indicesFromProgress(value, count)
    if (base === lastBaseRef.current) return

    lastBaseRef.current = base
    applyFramePair(base, overlay)
  }

  useEffect(() => {
    if (disabled) return

    let cancelled = false

    const bootstrap = async () => {
      const urls = await tryLoadStaticFrameUrls()
      if (cancelled || !urls?.length) return

      frameCountRef.current = urls.length
      frameUrlsRef.current = urls
      setHasMultipleFrames(urls.length > 1)
      lastBaseRef.current = -1

      setIsReady(true)
      syncToProgress(progress.get())
    }

    void bootstrap()

    return () => {
      cancelled = true
      frameCountRef.current = 0
      frameUrlsRef.current = []
      setHasMultipleFrames(false)
      lastBaseRef.current = -1
      resetFramePreloadCache()
      setIsReady(false)
    }
  }, [disabled, progress, baseRef, overlayRef])

  useMotionValueEvent(progress, 'change', syncToProgress)

  return {
    isReady,
    blendOpacity,
    showOverlay: hasMultipleFrames,
  }
}
