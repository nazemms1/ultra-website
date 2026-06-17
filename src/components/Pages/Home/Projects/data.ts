import type { ProjectItem } from './types'

export const PROJECTS: readonly ProjectItem[] = [
  {
    id: 'denta-plans',
    title: 'Denta Plans',
    description:
      'Denta Plans is an intuitive dashboard tailored for dental professionals, enabling them to design, customize, and oversee comprehensive treatment plans for each patient. It streamlines the process of applying various dental procedures, tracking progress, and ensuring personalized care, all within a user-friendly interface that enhances efficiency and patient outcomes.',
    href: '#projects',
    mockup: {
      src: '/images/projects/denta-plans.png',
      alt: 'Denta Plans treatment dashboard shown on a laptop',
      kind: 'desktop',
    },
    imageSide: 'left',
  },
  {
    id: 'etihad',
    title: 'Etihad',
    description:
      'Etihad University Mobile is a comprehensive app designed to empower students and faculty with seamless access to academic resources, schedules, and campus news. It offers intuitive tools for course registration, assignment tracking, and real-time notifications, all within a sleek interface that enhances the educational experience on the go.',
    href: '#projects',
    mockup: {
      src: '/images/projects/etihad.png',
      alt: 'Etihad University app shown on a smartphone',
      kind: 'mobile',
    },
    imageSide: 'right',
  },
  {
    id: 'askonnect',
    title: 'Askonnect',
    description:
      'Askonnect is a dynamic platform designed for businesses to efficiently communicate and manage trade requests and tenders. It simplifies the process of submitting, tracking, and negotiating bids, all within a streamlined interface that fosters collaboration and accelerates decision-making.',
    href: '#projects',
    mockup: {
      src: '/images/projects/askonnect.png',
      alt: 'Askonnect tender management platform shown on a laptop',
      kind: 'desktop',
    },
    imageSide: 'left',
  },
] as const
