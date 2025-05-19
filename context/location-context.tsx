"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type LocationType = {
  city: string
  area?: string
}

type LocationContextType = {
  location: LocationType
  setLocation: (location: LocationType) => void
  isLocationModalOpen: boolean
  setIsLocationModalOpen: (isOpen: boolean) => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<LocationType>({ city: "Mumbai" })
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        isLocationModalOpen,
        setIsLocationModalOpen,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider")
  }
  return context
}
