'use client'

import { useEffect } from 'react'
import { useNavigationLoading } from '@/providers/NavigationLoadingContext'

/**
 * Next.js Suspense loading boundary for the [locale] segment.
 * Mounts while server components are still streaming; unmounts once content is ready.
 * We signal the shared NavigationLoadingContext so the overlay stays up for the full duration.
 */
export default function Loading() {
  const { startNavigation, finishNavigation } = useNavigationLoading()

  useEffect(() => {
    startNavigation()
    return () => {
      finishNavigation()
    }
  }, [startNavigation, finishNavigation])

  // Rendering nothing — the overlay is handled by GlobalNavigationLoader
  return null
}
