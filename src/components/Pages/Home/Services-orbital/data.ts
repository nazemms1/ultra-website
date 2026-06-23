import {
  BarChart3,
  Cloud,
  Code2,
  Cpu,
  Database,
  PenTool,
  Smartphone,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'

export interface ServiceItem {
  /** Short label used in the orbital card. */
  title: string
  /** Compact description shown inside the orbital card. */
  cardDescription: string
  /** Long-form copy shown in the left active panel. */
  description: string
  /** Glyph rendered inside the card's circular glass icon well. */
  Icon: LucideIcon | string
  /** Tech / discipline chips shown beneath the active description. */
  tags: string[]
  /**
   * Starting position on the orbit, in degrees, measured clockwise from the
   * east (3 o'clock) axis. 0° sits inside the right-hand shadow zone.
   */
  baseAngle: number
}

export const SERVICES: ServiceItem[] = [
  {
    title: 'Mobile & Web Engineering',
    cardDescription: 'High-performance apps and web platforms built to scale.',
    description:
      'We specialize in crafting robust, high-performance applications and web platforms that are thoughtfully engineered to evolve seamlessly with your business needs. Our solutions emphasize seamless scalability and resilience, ensuring your systems maintain optimal reliability and responsiveness even as demand grows. By integrating intuitive design principles and advanced technologies, we create user-friendly experiences that drive engagement and efficiency, empowering your business to thrive in dynamic markets.',
    Icon: Smartphone,
    tags: ['React', 'Flutter'],
    baseAngle: 112,
  },
  {
    title: 'Business Analysis',
    cardDescription: 'Turning goals into clear strategies and measurable outcomes.',
    description:
      'We translate ambitious business goals into clear, actionable strategies grounded in real data. Through discovery workshops, stakeholder alignment and rigorous requirement mapping, we de-risk every initiative before a single line of code is written. The result is a measurable roadmap that keeps engineering, design and leadership moving in the same direction toward outcomes that matter.',
    Icon: BarChart3,
    tags: ['Discovery', 'Roadmapping'],
    baseAngle: 157,
  },
  {
    title: 'Cloud & DevOps',
    cardDescription: 'Reliable infrastructure and deployment that scale with you.',
    description:
      'We design resilient cloud infrastructure and automated delivery pipelines that scale effortlessly with demand. From infrastructure-as-code and containerized workloads to zero-downtime deployments and observability, we give your teams the confidence to ship faster while keeping systems secure, cost-efficient and always available.',
    Icon: Cloud,
    tags: ['AWS', 'CI/CD'],
    baseAngle: 203,
  },
  {
    title: 'UI/UX Design',
    cardDescription: 'Intuitive, accessible interfaces crafted to delight and convert.',
    description:
      'We craft intuitive, accessible interfaces that turn complex products into effortless experiences. Grounded in research and a cohesive design system, every flow is shaped to delight users while driving the metrics your business cares about — from activation to retention and conversion.',
    Icon: PenTool,
    tags: ['Figma', 'Design Systems'],
    baseAngle: 248,
  },
  {
    title: 'AI & Automation',
    cardDescription: 'Intelligent workflows that eliminate friction and scale impact.',
    description:
      "We build AI-powered systems and automation pipelines that remove bottlenecks and multiply your team's capacity. From custom machine learning models and LLM integrations to end-to-end workflow automation, we help you move faster, reduce errors, and unlock insights that were previously out of reach.",
    Icon: Cpu,
    tags: ['LLMs', 'Automation'],
    baseAngle: 293,
  },
  {
    title: 'Data Engineering',
    cardDescription: 'Pipelines and platforms that turn raw data into decisions.',
    description:
      "We architect scalable data pipelines, warehouses, and analytics platforms that give your team reliable, real-time access to the metrics that matter. Whether you're consolidating scattered sources or building a modern lakehouse from scratch, we ensure your data is clean, trusted, and ready to power decisions.",
    Icon: Database,
    tags: ['ETL', 'Analytics'],
    baseAngle: 338,
  },
  {
    title: 'Growth & Digital Strategy',
    cardDescription: 'Data-driven strategies that accelerate sustainable growth.',
    description:
      'We combine product thinking with marketing execution to build growth engines that compound over time. From funnel analysis and conversion optimisation to channel strategy and retention modelling, we help you acquire the right users, keep them engaged, and turn them into advocates.',
    Icon: TrendingUp,
    tags: ['SEO', 'CRO'],
    baseAngle: 23,
  },
  {
    title: 'Custom Software',
    cardDescription: 'Bespoke solutions engineered precisely to your requirements.',
    description:
      'When off-the-shelf falls short, we design and build software that fits your exact workflows, data structures, and scale requirements. From internal tools and integrations to full-product development, every line of code is purpose-built to solve your specific problem with precision and longevity in mind.',
    Icon: Code2,
    tags: ['Architecture', 'APIs'],
    baseAngle: 68,
  },
]

/** Default active service shown when nothing is hovered. */
export const DEFAULT_SERVICE_INDEX = 0
