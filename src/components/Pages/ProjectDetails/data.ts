import type { ProjectDetail } from './types'

export const PROJECT_DETAILS: readonly ProjectDetail[] = [
  {
    id: 'denta-plans',
    title: 'Denta Plan',
    metaCategory: 'Website',
    year: '2025',
    shortDescription: 'A smart dashboard system for dental practice management.',
    websiteUrl: 'https://dentaplans.com',
    logo: {
      src: '/images/projects/denta-plans-logo.png',
      alt: 'Denta Plans logo',
      width: 200,
      height: 87,
    },
  },
  {
    id: 'etihad',
    title: 'Etihad',
    metaCategory: 'Mobile App',
    year: '2024',
    shortDescription:
      'A comprehensive university app empowering students and faculty with seamless academic access.',
    logo: {
      src: '/images/projects/etihad.png',
      alt: 'Etihad University app',
      width: 200,
      height: 87,
    },
  },
  {
    id: 'askonnect',
    title: 'Askonnect',
    metaCategory: 'Platform',
    year: '2024',
    shortDescription:
      'A dynamic platform for businesses to communicate and manage trade requests and tenders.',
    logo: {
      src: '/images/projects/askonnect.png',
      alt: 'Askonnect platform',
      width: 200,
      height: 87,
    },
  },
] as const

export const PROJECT_DETAIL_IDS = PROJECT_DETAILS.map(project => project.id)

export function getProjectById(id: string): ProjectDetail | undefined {
  return PROJECT_DETAILS.find(project => project.id === id)
}
