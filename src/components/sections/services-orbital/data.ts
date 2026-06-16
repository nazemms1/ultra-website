import { BarChart3, Cloud, PenTool, Smartphone, type LucideIcon } from 'lucide-react'

export interface ServiceItem {
  /** Short label used in the orbital card. */
  title: string
  /** Compact description shown inside the orbital card. */
  cardDescription: string
  /** Long-form copy shown in the left active panel. */
  description: string
  /** Glyph rendered inside the card's circular glass icon well. */
  Icon: LucideIcon
  /** Tech / discipline chips shown beneath the active description. */
  tags: string[]
  /**
   * Starting position on the orbit, in degrees, measured clockwise from the
   * east (3 o'clock) axis. 0° sits inside the right-hand shadow zone.
   */
  baseAngle: number
}

/**
 * Four services distributed every 90° around the orbit. One slot (0°) always
 * sits in the right-hand shadow zone so a card is perpetually plunging under
 * and re-emerging from the occlusion mask.
 */
export const SERVICES: ServiceItem[] = [
  {
    title: 'Mobile & Web Engineering',
    cardDescription: 'High-performance apps and web platforms built to scale.',
    description:
      'We specialize in crafting robust, high-performance applications and web platforms that are thoughtfully engineered to evolve seamlessly with your business needs. Our solutions emphasize seamless scalability and resilience, ensuring your systems maintain optimal reliability and responsiveness even as demand grows. By integrating intuitive design principles and advanced technologies, we create user-friendly experiences that drive engagement and efficiency, empowering your business to thrive in dynamic markets.',
    Icon: Smartphone,
    tags: ['React', 'Flutter'],
    baseAngle: 180,
  },
  {
    title: 'Business Analysis',
    cardDescription: 'Turning goals into clear strategies and measurable outcomes.',
    description:
      'We translate ambitious business goals into clear, actionable strategies grounded in real data. Through discovery workshops, stakeholder alignment and rigorous requirement mapping, we de-risk every initiative before a single line of code is written. The result is a measurable roadmap that keeps engineering, design and leadership moving in the same direction toward outcomes that matter.',
    Icon: BarChart3,
    tags: ['Discovery', 'Roadmapping'],
    baseAngle: 270,
  },
  {
    title: 'Cloud & DevOps',
    cardDescription: 'Reliable infrastructure and deployment that scale with you.',
    description:
      'We design resilient cloud infrastructure and automated delivery pipelines that scale effortlessly with demand. From infrastructure-as-code and containerized workloads to zero-downtime deployments and observability, we give your teams the confidence to ship faster while keeping systems secure, cost-efficient and always available.',
    Icon: Cloud,
    tags: ['AWS', 'CI/CD'],
    baseAngle: 0,
  },
  {
    title: 'UI/UX Design',
    cardDescription: 'Intuitive, accessible interfaces crafted to delight and convert.',
    description:
      'We craft intuitive, accessible interfaces that turn complex products into effortless experiences. Grounded in research and a cohesive design system, every flow is shaped to delight users while driving the metrics your business cares about — from activation to retention and conversion.',
    Icon: PenTool,
    tags: ['Figma', 'Design Systems'],
    baseAngle: 90,
  },
]

/** Default active service shown when nothing is hovered. */
export const DEFAULT_SERVICE_INDEX = 0
