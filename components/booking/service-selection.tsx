"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import type { ServiceCategory } from "@/types/service"
import { PlusCircle, MinusCircle, Star, Clock, Info, Sparkles } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"

interface ServiceSelectionProps {
  category: ServiceCategory
  onServiceToggle: (service: any, isSelected: boolean) => void
  selectedServices: any[]
  setSelectedServices: React.Dispatch<React.SetStateAction<any[]>>
}

export function ServiceSelection({
  category,
  onServiceToggle,
  selectedServices,
  setSelectedServices,
}: ServiceSelectionProps) {
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null)

  // Handle service selection
  const handleServiceSelect = (service: any) => {
    const isSelected = selectedServices.some((s) => s.id === service.id)

    if (isSelected) {
      // Remove service
      setSelectedServices((prev) => prev.filter((s) => s.id !== service.id))
    } else {
      // Add service with default values
      setSelectedServices((prev) => [
        ...prev,
        {
          ...service,
          selectedAddons: [],
          quantity: 1,
        },
      ])

      // Auto-expand the service when selected
      setExpandedServiceId(service.id)
    }

    onServiceToggle(service, !isSelected)
  }

  // Handle addon selection
  const handleAddonToggle = (serviceId: string, addon: any) => {
    setSelectedServices((prev) =>
      prev.map((service) => {
        if (service.id === serviceId) {
          const hasAddon = service.selectedAddons.some((a: any) => a.id === addon.id)

          if (hasAddon) {
            // Remove addon
            return {
              ...service,
              selectedAddons: service.selectedAddons.filter((a: any) => a.id !== addon.id),
            }
          } else {
            // Add addon with default quantity
            return {
              ...service,
              selectedAddons: [...service.selectedAddons, { ...addon, quantity: 1 }],
            }
          }
        }
        return service
      }),
    )
  }

  // Handle addon quantity change
  const handleAddonQuantityChange = (serviceId: string, addonId: string, quantity: number) => {
    setSelectedServices((prev) =>
      prev.map((service) => {
        if (service.id === serviceId) {
          return {
            ...service,
            selectedAddons: service.selectedAddons.map((addon: any) =>
              addon.id === addonId ? { ...addon, quantity } : addon,
            ),
          }
        }
        return service
      }),
    )
  }

  // Get recommendations based on selected addons
  const getRecommendations = (service: any) => {
    if (!service.selectedAddons || service.selectedAddons.length === 0) return []

    const selectedAddonIds = service.selectedAddons.map((addon: any) => addon.id)

    // Simple recommendation logic based on selected addons
    const recommendations = service.addons
      .filter((addon: any) => !selectedAddonIds.includes(addon.id))
      .map((addon: any) => {
        // Calculate a match score based on complementary services
        let matchScore = 0
        let reason = ""

        // Example recommendation logic
        if (service.selectedAddons.some((a: any) => a.id.includes("deep") && addon.id.includes("sanitize"))) {
          matchScore = 90
          reason = "Perfect complement to your deep cleaning selection"
        } else if (service.selectedAddons.some((a: any) => a.id.includes("premium") && addon.id.includes("premium"))) {
          matchScore = 85
          reason = "Enhance your premium service experience"
        } else if (selectedAddonIds.length >= 2 && addon.id.includes("discount")) {
          matchScore = 80
          reason = "Popular with your selected combination"
        } else {
          matchScore = 60
          reason = "Frequently added with your selections"
        }

        return {
          ...addon,
          matchScore,
          reason,
        }
      })
      .filter((addon: any) => addon.matchScore > 60) // Only show good matches
      .sort((a: any, b: any) => b.matchScore - a.matchScore) // Sort by match score
      .slice(0, 2) // Limit to top 2 recommendations

    return recommendations
  }

  return (
    <div className="space-y-6">
      {category.services.map((service) => {
        const isSelected = selectedServices.some((s) => s.id === service.id)
        const isExpanded = expandedServiceId === service.id
        const selectedService = selectedServices.find((s) => s.id === service.id)

        // Calculate service price including addons
        const addonPrice = selectedService?.selectedAddons
          ? selectedService.selectedAddons.reduce(
              (sum: number, addon: any) => sum + addon.price * (addon.quantity || 1),
              0,
            )
          : 0

        const totalServicePrice = service.price + addonPrice

        // Get recommendations for this service
        const recommendations = selectedService ? getRecommendations(selectedService) : []

        return (
          <Card
            key={service.id}
            className={`overflow-hidden transition-all duration-300 ${isSelected ? "border-primary shadow-md" : ""}`}
          >
            <div className="flex items-start p-4 cursor-pointer" onClick={() => handleServiceSelect(service)}>
              <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={service.image || "/placeholder.svg?height=80&width=80"}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-lg">{service.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{service.rating}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-medium">{formatPrice(service.price)}</div>
                    <Badge variant="outline" className="mt-1">
                      {service.type}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{service.description}</p>
              </div>

              <Checkbox
                checked={isSelected}
                className="ml-4 mt-1 h-5 w-5"
                onCheckedChange={() => handleServiceSelect(service)}
              />
            </div>

            {isSelected && (
              <div className="px-4 pb-4">
                <Separator className="my-2" />

                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setExpandedServiceId(isExpanded ? null : service.id)
                    }}
                  >
                    {isExpanded ? "Hide options" : "Show options"}
                  </Button>

                  {!isExpanded && addonPrice > 0 && (
                    <div className="text-sm text-muted-foreground">
                      {selectedService?.selectedAddons?.length} add-ons selected (+{formatPrice(addonPrice)})
                    </div>
                  )}
                </div>

                {isExpanded && (
                  <div className="mt-4 space-y-6">
                    {/* Add-ons section */}
                    <div>
                      <h4 className="font-medium mb-3">Available Add-ons</h4>
                      <div className="space-y-3">
                        {service.addons.map((addon) => {
                          const isAddonSelected = selectedService?.selectedAddons?.some((a: any) => a.id === addon.id)

                          const selectedAddon = selectedService?.selectedAddons?.find((a: any) => a.id === addon.id)

                          return (
                            <div
                              key={addon.id}
                              className={`border rounded-md p-3 transition-all ${
                                isAddonSelected ? "border-primary bg-primary/5" : ""
                              }`}
                            >
                              <div className="flex items-start">
                                <Checkbox
                                  checked={isAddonSelected}
                                  onCheckedChange={() => handleAddonToggle(service.id, addon)}
                                  className="mt-1"
                                />

                                <div className="ml-3 flex-1">
                                  <div className="flex justify-between">
                                    <div>
                                      <Label htmlFor={`addon-${addon.id}`} className="font-medium cursor-pointer">
                                        {addon.name}
                                      </Label>
                                      <p className="text-sm text-muted-foreground">{addon.description}</p>
                                    </div>
                                    <div className="text-right font-medium">{formatPrice(addon.price)}</div>
                                  </div>

                                  {isAddonSelected && (
                                    <div className="mt-2 flex items-center">
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-7 w-7 rounded-full"
                                        onClick={() =>
                                          handleAddonQuantityChange(
                                            service.id,
                                            addon.id,
                                            Math.max(1, (selectedAddon?.quantity || 1) - 1),
                                          )
                                        }
                                        disabled={(selectedAddon?.quantity || 1) <= 1}
                                      >
                                        <MinusCircle className="h-3 w-3" />
                                      </Button>

                                      <span className="mx-3 min-w-[1.5rem] text-center">
                                        {selectedAddon?.quantity || 1}
                                      </span>

                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-7 w-7 rounded-full"
                                        onClick={() =>
                                          handleAddonQuantityChange(
                                            service.id,
                                            addon.id,
                                            Math.min(10, (selectedAddon?.quantity || 1) + 1),
                                          )
                                        }
                                        disabled={(selectedAddon?.quantity || 1) >= 10}
                                      >
                                        <PlusCircle className="h-3 w-3" />
                                      </Button>

                                      <div className="ml-auto text-sm font-medium">
                                        {formatPrice(addon.price * (selectedAddon?.quantity || 1))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Recommendations section */}
                    {recommendations.length > 0 && (
                      <div className="mt-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="h-4 w-4 text-yellow-500" />
                          <h4 className="font-medium">Recommended for You</h4>
                        </div>

                        <div className="space-y-3">
                          {recommendations.map((addon: any) => {
                            const isAddonSelected = selectedService?.selectedAddons?.some((a: any) => a.id === addon.id)

                            return (
                              <motion.div
                                key={addon.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="border border-yellow-200 rounded-md p-3 bg-yellow-50/50"
                              >
                                <div className="flex items-start">
                                  <div className="flex-1">
                                    <div className="flex justify-between">
                                      <div>
                                        <div className="font-medium flex items-center gap-1">
                                          {addon.name}
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger>
                                                <Info className="h-3 w-3 text-muted-foreground" />
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <p className="max-w-xs text-xs">{addon.reason}</p>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{addon.description}</p>
                                        <p className="text-xs text-yellow-600 mt-1">{addon.reason}</p>
                                      </div>
                                      <div className="text-right font-medium">{formatPrice(addon.price)}</div>
                                    </div>
                                  </div>

                                  <Button
                                    size="sm"
                                    variant={isAddonSelected ? "outline" : "default"}
                                    className="ml-3 whitespace-nowrap"
                                    onClick={() => handleAddonToggle(service.id, addon)}
                                  >
                                    {isAddonSelected ? "Added" : "Add"}
                                  </Button>
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}
