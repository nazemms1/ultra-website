import { Server, Palette, Smartphone } from 'lucide-react'

export const SERVICES = [
  {
    id: 'vps',
    icon: Server,
    title: 'VPS Hosting',
    subtitle: 'High-performance infra',
    offerings: ['Hosting Consultation', 'Server Management', 'DDoS Protection'],
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
]

export const BASE_OFFERINGS = ['Hosting Consultation', 'Admin Dashboard']
