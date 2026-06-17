import { Activity, Blocks, Lightbulb, LifeBuoy, Rocket, type LucideIcon } from 'lucide-react'

export interface Phase {
  /** Two-digit phase number used in the big watermark + "Phase 01" label. */
  number: string
  /** Phase name shown as the card title and timeline tick. */
  title: string
  /** Descriptive copy for the card body. */
  description: string
  /** Short discipline chips under the description. */
  tags: string[]
  /** Glyph rendered inside the holographic illustration. */
  Icon: LucideIcon
}

export const PHASES: Phase[] = [
  {
    number: '01',
    title: 'Ideation',
    description:
      'We dig into your goals, users, and constraints — shaping a sharp concept and a clear product direction before a single pixel is drawn.',
    tags: ['Research', 'Strategy', 'Concept'],
    Icon: Lightbulb,
  },
  {
    number: '02',
    title: 'Building',
    description:
      'Designers and engineers move in lockstep, turning the concept into a living product through tight iteration loops and production-grade craft.',
    tags: ['Design', 'Engineering', 'Iteration'],
    Icon: Blocks,
  },
  {
    number: '03',
    title: 'Tracking',
    description:
      'Every build is measured against real signals — performance, quality and behaviour — so decisions stay grounded in evidence, not opinion.',
    tags: ['Metrics', 'QA', 'Insights'],
    Icon: Activity,
  },
  {
    number: '04',
    title: 'Delivery',
    description:
      'We ship with confidence: zero-downtime deployments, clean handoffs and documentation that lets your team own the product from day one.',
    tags: ['Launch', 'Deploy', 'Handoff'],
    Icon: Rocket,
  },
  {
    number: '05',
    title: 'Support',
    description:
      'Launch is the starting line. We monitor, optimise and scale alongside you, keeping the product fast, resilient and ahead of demand.',
    tags: ['Monitor', 'Optimise', 'Scale'],
    Icon: LifeBuoy,
  },
]
