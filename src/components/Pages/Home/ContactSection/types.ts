import type { LucideIcon } from 'lucide-react'

export interface Service {
  id: string
  icon: any
  title: string
  subtitle: string
  offerings?: string[]
  sub_services?: Array<{ id: number; title: string }>
}

export type ConsultationType = 'online' | 'onsite'
export type Region = 'syria' | 'uae'

export interface ServiceCardProps {
  service: Service
  selected: boolean
  onSelect: () => void
}

export interface ServiceCarouselProps {
  services: Service[]
  selectedService: string | null
  onSelect: (id: string) => void
}

export interface OfferingCheckboxProps {
  label: string
  checked: boolean
  onChange: () => void
}

export interface RadioOptionProps {
  label: string
  checked: boolean
  onChange: () => void
  name: string
  disabled?: boolean
}

export interface InputFieldProps {
  placeholder: string
  icon?: LucideIcon
  type?: string
  value: string
  onChange: (value: string) => void
}

export interface ContactSubmitButtonProps {
  disabled: boolean
  onClick?: () => void
  label: string
}
