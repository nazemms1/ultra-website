import type { StatConfig } from './types'

export const STATS: StatConfig[] = [
  {
    value: 120,
    suffix: '+',
    label: 'Projects shipped',
    entranceDelay: 0,
    entranceDuration: 0.65,
    countDuration: 2.6,
  },
  {
    value: 45,
    suffix: '+',
    label: 'Happy clients',
    entranceDelay: 0.18,
    entranceDuration: 0.75,
    countDuration: 2.1,
  },
  {
    value: 8,
    suffix: '+',
    label: 'Years of craft',
    entranceDelay: 0.34,
    entranceDuration: 0.85,
    countDuration: 1.55,
  },
  {
    value: 99,
    suffix: '%',
    label: 'Retention rate',
    entranceDelay: 0.52,
    entranceDuration: 0.95,
    countDuration: 2.9,
  },
]
