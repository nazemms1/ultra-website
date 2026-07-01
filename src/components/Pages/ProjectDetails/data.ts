import type { ProjectDetail } from './types'

const DENTA_SCREENSHOT = '/images/projects/denta-plans.png'
const ETIHAD_SCREENSHOT = '/images/projects/etihad.png'

const dentaDemoScreenshots = Array.from({ length: 5 }, (_, i) => ({
  id: `denta-shot-${i + 1}`,
  src: DENTA_SCREENSHOT,
  alt: `Denta Plans dashboard screenshot ${i + 1}`,
}))

const mobileDemoScreenshots = Array.from({ length: 5 }, (_, i) => ({
  id: `mobile-shot-${i + 1}`,
  src: ETIHAD_SCREENSHOT,
  alt: `Mobile app screenshot ${i + 1}`,
}))

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
    brief: [
      {
        number: '01',
        title: 'The brief',
        body: 'Denta Plan is an intelligent dashboard platform designed to streamline dental practice management. It offers real-time insights, appointment scheduling, patient records, billing, and inventory control, all integrated into a user-friendly interface. This system empowers dental professionals to optimize their workflows, enhance patient care, and improve operational efficiency through smart automation and data-driven decision-making.',
      },
      {
        number: '02',
        title: 'How we approached it',
        body: "We embedded a small, senior team alongside Nebula Labs for the duration. The first six weeks were spent stripping the problem to its core — interviewing operators, instrumenting the legacy system, and writing the spec we wished we'd been handed.\n\nWe embedded a small, senior team alongside Nebula Labs for the duration. The first six weeks were spent stripping the problem to its core — interviewing operators, instrumenting the legacy system, and writing the spec we wished we'd been handed.",
      },
      {
        number: '03',
        title: 'What shipped',
        body: "What shipped is not a prototype dressed for production. It's the production system, end-to-end, with the telemetry, runbooks, and on-call handoffs you'd expect from a team that intends to be measured on uptime.",
      },
    ],
    metrics: {
      successRate: 95.99,
      services: ['UI/UX Design', 'Realtime Systems', 'Platform Development'],
      tools: ['Figma', 'React', 'Laravel', 'Node.js'],
    },
    demoViews: [
      {
        id: 'mobile',
        label: 'Mobile App',
        device: 'mobile',
        screenshots: mobileDemoScreenshots,
      },
      {
        id: 'web',
        label: 'Web dashboard',
        device: 'desktop',
        screenshots: dentaDemoScreenshots,
      },
      {
        id: 'admin',
        label: 'Admin dashboard',
        device: 'desktop',
        screenshots: dentaDemoScreenshots,
      },
    ],
    relatedProjects: [
      {
        id: 'askonnect',
        title: 'Askonnect',
        description:
          'A dynamic platform for businesses to communicate and manage trade requests and tenders.',
        logo: {
          src: '/images/projects/askonnect.png',
          alt: 'Askonnect logo',
          width: 200,
          height: 87,
        },
      },
      {
        id: 'etihad',
        title: 'Etihad',
        description:
          'A comprehensive university app empowering students and faculty with seamless academic access.',
        logo: {
          src: '/images/projects/etihad.png',
          alt: 'Etihad University app',
          width: 200,
          height: 87,
        },
      },
    ],
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
    brief: [
      {
        number: '01',
        title: 'The brief',
        body: 'Etihad University Mobile empowers students and faculty with seamless access to academic resources, schedules, and campus news through a sleek, mobile-first experience.',
      },
      {
        number: '02',
        title: 'How we approached it',
        body: 'We mapped every student journey from enrollment to graduation, then designed flows that reduce friction for course registration, assignment tracking, and real-time notifications.',
      },
      {
        number: '03',
        title: 'What shipped',
        body: 'A production-ready iOS and Android application with offline support, push notifications, and an admin portal for faculty content management.',
      },
    ],
    metrics: {
      successRate: 92.4,
      services: ['UI/UX Design', 'Mobile Development', 'Platform Development'],
      tools: ['Figma', 'React Native', 'Node.js', 'Firebase'],
    },
    demoViews: [
      {
        id: 'mobile',
        label: 'Mobile App',
        device: 'mobile',
        screenshots: mobileDemoScreenshots,
      },
      {
        id: 'web',
        label: 'Web dashboard',
        device: 'desktop',
        screenshots: dentaDemoScreenshots,
      },
      {
        id: 'admin',
        label: 'Admin dashboard',
        device: 'desktop',
        screenshots: dentaDemoScreenshots,
      },
    ],
    relatedProjects: [
      {
        id: 'denta-plans',
        title: 'Denta Plan',
        description: 'A smart dashboard system for dental practice management.',
        logo: {
          src: '/images/projects/denta-plans-logo.png',
          alt: 'Denta Plans logo',
          width: 200,
          height: 87,
        },
      },
      {
        id: 'askonnect',
        title: 'Askonnect',
        description:
          'A dynamic platform for businesses to communicate and manage trade requests and tenders.',
        logo: {
          src: '/images/projects/askonnect.png',
          alt: 'Askonnect logo',
          width: 200,
          height: 87,
        },
      },
    ],
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
    brief: [
      {
        number: '01',
        title: 'The brief',
        body: 'Askonnect simplifies how businesses submit, track, and negotiate trade requests and tenders within a streamlined collaboration platform.',
      },
      {
        number: '02',
        title: 'How we approached it',
        body: 'We partnered with procurement teams to model complex bid workflows, then built real-time collaboration tools that accelerate decision-making across stakeholders.',
      },
      {
        number: '03',
        title: 'What shipped',
        body: 'A full-stack tender management platform with role-based access, document versioning, and analytics dashboards for bid performance.',
      },
    ],
    metrics: {
      successRate: 94.1,
      services: ['UI/UX Design', 'Realtime Systems', 'Platform Development'],
      tools: ['Figma', 'React', 'Laravel', 'Node.js'],
    },
    demoViews: [
      {
        id: 'mobile',
        label: 'Mobile App',
        device: 'mobile',
        screenshots: mobileDemoScreenshots,
      },
      {
        id: 'web',
        label: 'Web dashboard',
        device: 'desktop',
        screenshots: dentaDemoScreenshots,
      },
      {
        id: 'admin',
        label: 'Admin dashboard',
        device: 'desktop',
        screenshots: dentaDemoScreenshots,
      },
    ],
    relatedProjects: [
      {
        id: 'denta-plans',
        title: 'Denta Plan',
        description: 'A smart dashboard system for dental practice management.',
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
        description:
          'A comprehensive university app empowering students and faculty with seamless academic access.',
        logo: {
          src: '/images/projects/etihad.png',
          alt: 'Etihad University app',
          width: 200,
          height: 87,
        },
      },
    ],
  },
] as const

export const PROJECT_DETAIL_IDS = PROJECT_DETAILS.map(project => project.id)

export function getProjectById(id: string): ProjectDetail | undefined {
  return PROJECT_DETAILS.find(project => project.id === id)
}

export function parseProjectDetailApiData(apiData: any): ProjectDetail | null {
  if (!apiData || !apiData.id || !apiData.title) return null

  const id = String(apiData.id)
  const title = apiData.title || ''
  const subtitle = apiData.subtitle || ''
  const platform = apiData.platform || 'website'
  
  let metaCategory = 'Website'
  if (platform.toLowerCase() === 'mobileapp') {
    metaCategory = 'Mobile Application'
  } else if (platform.toLowerCase() === 'website') {
    metaCategory = 'Web Application'
  }

  const year = String(apiData.year || new Date().getFullYear())
  const websiteUrl = apiData.website_url || undefined

  const logoSrc = apiData.image?.url || ''

  const brief = Array.isArray(apiData.items)
    ? apiData.items.map((item: any, idx: number) => ({
        number: String(item.order || idx + 1).padStart(2, '0'),
        title: item.title || '',
        body: item.description || '',
      }))
    : []

  const successRate = apiData.feedback_percentage || 100
  const services = Array.isArray(apiData.services)
    ? apiData.services.map((s: any) => s.title || '')
    : []
  const tools = Array.isArray(apiData.used_tools)
    ? apiData.used_tools.map((t: any) => ({
        name: t.name || '',
        icon: t.icon?.url || '',
      }))
    : []

  const demoViews = Array.isArray(apiData.demos)
    ? apiData.demos.map((demo: any, idx: number) => {
        const title = demo.title || `Demo ${idx + 1}`
        const titleLower = title.toLowerCase()
        const isMobile =
          titleLower.includes('تطبيق') ||
          titleLower.includes('mobile') ||
          titleLower.includes('app') ||
          titleLower.includes('موب') ||
          titleLower.includes('جوال') ||
          titleLower.includes('هاتف')
          
        const isAdmin =
          titleLower.includes('لوحة') ||
          titleLower.includes('admin') ||
          titleLower.includes('dashboard') ||
          titleLower.includes('تحكم') ||
          titleLower.includes('إدارة') ||
          titleLower.includes('اداره')

        const device = isMobile ? 'mobile' : 'desktop'

        const screenshots = Array.isArray(demo.images)
          ? demo.images.map((img: any, imgIdx: number) => ({
              id: `${title}-shot-${imgIdx + 1}`,
              src: img.url || '',
              alt: `${title} screenshot ${imgIdx + 1}`,
            }))
          : []

        return {
          id: title,
          label: title,
          device,
          icon: demo.icon?.url || '',
          screenshots,
        }
      })
    : []

  return {
    id,
    title,
    metaCategory,
    year,
    shortDescription: subtitle,
    websiteUrl,
    logo: {
      src: logoSrc,
      alt: `${title} logo`,
      width: 200,
      height: 87,
    },
    brief,
    metrics: {
      successRate,
      services,
      tools,
    },
    demoViews,
    relatedProjects: [],
  }
}
