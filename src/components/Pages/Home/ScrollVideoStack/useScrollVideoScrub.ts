'use client'

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion'
import { SCROLL_VIDEO_CONTENT_OPACITY, SCROLL_VIDEO_EDGE_FADE } from './constants'
import {
  ensureFrameDecoded,
  getCachedScrollFrameUrls,
  preloadFrameWindow,
  tryLoadStaticFrameUrls,
} from './frameLoader'

type UseScrollVideoScrubOptions = {
  progress: MotionValue<number>
  frameRef: RefObject<HTMLImageElement | null>
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
  const scaled = clampProgress(value) * (count - 1)
  return Math.min(Math.round(scaled), count - 1)
}

function assignFrameSrc(image: HTMLImageElement | null, url: string) {
  if (!image || !url) return
  if (image.src.endsWith(url)) return
  image.src = url
}

export function useScrollVideoScrub({
  progress,
  frameRef,
  disabled = false,
}: UseScrollVideoScrubOptions) {
  const [isReady, setIsReady] = useState(false)
  const frameCountRef = useRef(0)
  const frameUrlsRef = useRef<string[]>([])
  const displayedIndexRef = useRef(-1)
  const pendingIndexRef = useRef(-1)

  const layerOpacity = useTransform(
    progress,
    value => edgeFadeFactor(value) * SCROLL_VIDEO_CONTENT_OPACITY,
  )

  const showFrame = useCallback(
    async (index: number) => {
      const urls = frameUrlsRef.current
      const url = urls[index]
      if (!url) return

      pendingIndexRef.current = index
      preloadFrameWindow(urls, index)

      await ensureFrameDecoded(url)

      if (pendingIndexRef.current !== index) return

      assignFrameSrc(frameRef.current, url)
      displayedIndexRef.current = index
    },
    [frameRef],
  )

  const syncToProgress = useCallback(
    (value: number) => {
      const count = frameCountRef.current
      if (count < 1) return

      const index = frameIndexFromProgress(value, count)
      if (index === displayedIndexRef.current) return

      void showFrame(index)
    },
    [showFrame],
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
      displayedIndexRef.current = -1
      pendingIndexRef.current = -1

      await showFrame(frameIndexFromProgress(progress.get(), urls.length))
      if (!cancelled) setIsReady(true)
    }

    void bootstrap()

    return () => {
      cancelled = true
      frameCountRef.current = 0
      frameUrlsRef.current = []
      displayedIndexRef.current = -1
      pendingIndexRef.current = -1
      setIsReady(false)
    }
  }, [disabled, progress, frameRef, showFrame])

  useMotionValueEvent(progress, 'change', syncToProgress)

  return { isReady, layerOpacity }
}
