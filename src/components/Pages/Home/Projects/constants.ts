import type { PanelRanges } from './types'

/**
 * Master timeline (all values are scroll progress, 0 = section pinned at top,
 * 1 = section fully scrolled). Phases are derived from these anchors so the
 * sequence stays in sync no matter how many projects `data.ts` holds.
 */

/** The whole pinned wrapper fades in over this window — and reverses on the way out the top. */
export const SECTION_FADE_IN: readonly [number, number] = [0, 0.04]

/** Phase 0: title rises + fades in from the bottom. */
export const TITLE_RISE: readonly [number, number] = [0, 0.1]

/** Title fades back out as the first project collapses open over it. */
export const TITLE_FADE_OUT: readonly [number, number] = [0.12, 0.26]

/** "Our Portfolio" label slides from the title block to the pinned section top. */
export const LABEL_PIN: readonly [number, number] = TITLE_FADE_OUT

/** Point at which the first project begins to reveal — projects own [START, 1]. */
const TIMELINE_START = 0.12

/** Fraction of each project's segment spent entering (and the previous one exiting). */
const ENTER_FRACTION = 0.5

/**
 * Resolve the enter/exit scroll windows for a given panel.
 *
 * Each project owns an equal slice of `[TIMELINE_START, 1]`. A project exits
 * over the exact same window in which the next one enters, so the outgoing
 * card splits apart while the incoming card slides up to overlay it.
 */
export function getPanelRanges(index: number, total: number): PanelRanges {
  const segment = (1 - TIMELINE_START) / total
  const segmentStart = TIMELINE_START + index * segment
  const segmentEnd = segmentStart + segment
  const enterDuration = segment * ENTER_FRACTION
  const isLast = index === total - 1

  return {
    enter: [segmentStart, segmentStart + enterDuration],
    exit: isLast ? null : [segmentEnd, segmentEnd + enterDuration],
  }
}

export const CLIP_CLOSED = 'inset(50% 0% 50% 0%)'
export const CLIP_OPEN = 'inset(0% 0% 0% 0%)'

/** Peak blur (px) applied to a card while it is entering or exiting. */
export const BLUR_MAX = 12
