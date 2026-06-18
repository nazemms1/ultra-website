export interface Phase {
  number: string
  title: string
  description: string
  tags: string[]
  imageUrl: string
}

export const PHASES: Phase[] = [
  {
    number: '01',
    title: 'Ideation',
    description:
      'We dig into your goals, users, and constraints — shaping a sharp concept and a clear product direction before a single pixel is drawn.',
    tags: ['Research', 'Strategy', 'Concept'],
    imageUrl: '/images/methodologies/1.png',
  },
  {
    number: '02',
    title: 'Building',
    description:
      'Designers and engineers move in lockstep, turning the concept into a living product through tight iteration loops and production-grade craft.',
    tags: ['Design', 'Engineering', 'Iteration'],
    imageUrl: '/images/methodologies/2.png',
  },
  {
    number: '03',
    title: 'Tracking',
    description:
      'Every build is measured against real signals — performance, quality and behaviour — so decisions stay grounded in evidence, not opinion.',
    tags: ['Metrics', 'QA', 'Insights'],
    imageUrl: '/images/methodologies/3.png',
  },
  {
    number: '04',
    title: 'Delivery',
    description:
      'We ship with confidence: zero-downtime deployments, clean handoffs and documentation that lets your team own the product from day one.',
    tags: ['Launch', 'Deploy', 'Handoff'],
    imageUrl: '/images/methodologies/4.png',
  },
  {
    number: '05',
    title: 'Support',
    description:
      'Launch is the starting line. We monitor, optimise and scale alongside you, keeping the product fast, resilient and ahead of demand.',
    tags: ['Monitor', 'Optimise', 'Scale'],
    imageUrl: '/images/methodologies/5.png',
  },
]
