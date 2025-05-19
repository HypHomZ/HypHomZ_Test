import type { LucideIcon } from "lucide-react"

export interface ServiceOption {
  id: string
  name: string
  price: number
  description?: string
}

export interface ServiceAddon {
  id: string
  name: string
  price: number
  description?: string
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  image: string
  rating: number
  duration: string
  type: string
  options?: ServiceOption[]
  addons: ServiceAddon[]
}

export interface ServiceCategory {
  id: string
  name: string
  icon: LucideIcon
  services: Service[]
}
