'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface DeferredSectionProps {
  children: ReactNode
  /**
   * Approximate height of the real section. The placeholder reserves this
   * space so deferring the mount never causes layout shift while scrolling.
   */
  estimatedHeight: number | string
  /**
   * How far before the viewport the section should mount. Generous by default
   * so the placeholder→content swap always happens off-screen (no visible CLS)
   * and the JS chunk is fetched before the user reaches it.
   */
  rootMargin?: string
  /**
   * Anchor id exposed on the placeholder while the section is unmounted, so
   * in-page links (e.g. /#contact) can still resolve and scroll to it. Once
   * mounted, the real section's own id takes over.
   */
  id?: string
}

/**
 * Mounts its children only when the user scrolls near them. Unmounted sections
 * are represented by a fixed-height placeholder (never `display: none`), so
 * initial JS execution/hydration cost is deferred without introducing CLS.
 */
export default function DeferredSection({
  children,
  estimatedHeight,
  rootMargin = '1200px 0px',
  id,
}: DeferredSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (mounted) return
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setMounted(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMounted(true)
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [mounted, rootMargin])

  return (
    <div
      ref={ref}
      id={mounted ? undefined : id}
      style={mounted ? undefined : { minHeight: estimatedHeight }}
      aria-busy={!mounted}
    >
      {mounted ? children : null}
    </div>
  )
}
