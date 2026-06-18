import { Server, Palette, Smartphone, Cat } from 'lucide-react'
import type { Service } from './types'

export const SERVICES: Service[] = [
  {
    id: 'vps',
    icon: Server,
    title: 'VPS Hosting',
    subtitle: 'High-performance infra',
    offerings: ['Housing Consultation', 'Server Management', 'DDoS Protection'],
  },
  {
    id: 'uiux',
    icon: Palette,
    title: 'UI / UX Design',
    subtitle: 'Pixel-grade interfaces',
    offerings: ['Design Audit', 'Prototype Review', 'Brand Identity'],
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Dev',
    subtitle: 'Native-feel apps',
    offerings: ['App Store Setup', 'Push Notifications', 'Admin Dashboard'],
  },
  {
    id: 'meow-cat',
    icon: Cat,
    title: 'Meow Cat',
    subtitle: 'Meow Meow Meow',
    offerings: ['Meow-1', 'Meow-2', 'Meow-3'],
  },
]

export const BASE_OFFERINGS = ['Housing Consultation', 'Admin Dashboard']
