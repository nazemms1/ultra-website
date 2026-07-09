'use client'

import { useEffect } from 'react'

export function useHashScroll() {
  useEffect(() => {
    // Capture hash immediately before anything can clear it
    const hash = window.location.hash.slice(1)
    if (!hash) return

    // Remove from URL right away so the browser doesn't do its own instant jump
    window.history.replaceState(null, '', window.location.pathname + window.location.search)

    let tries = 0
    const poll = setInterval(() => {
      tries++
      const el = document.getElementById(hash)
      if (el) {
        clearInterval(poll)
        el.scrollIntoView({ behavior: 'smooth' })
      } else if (tries >= 60) {
        // 60 × 100ms = 6 seconds max
        clearInterval(poll)
      }
    }, 100)

    return () => clearInterval(poll)
  }, [])
}
