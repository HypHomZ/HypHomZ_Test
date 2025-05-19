"use client"

import { useState } from "react"
import Image from "next/image"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useCart, type CartItem } from "@/context/cart-context"
import { formatPrice } from "@/lib/utils"
import { v4 as uuidv4 } from "uuid"
import { MinusCircle, PlusCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

interface ServiceOption {
  id: string
  name: string
  price: number
  description?: string
}

interface ServiceVariant {
  id: string
  name: string
  description: string
  price: number
  options?: ServiceOption[]
}

interface ServiceDetailProps {
  id: string
  name: string
  description: string
  image: string
  variants: ServiceVariant[]
  addons?: {
    id: string
    name: string
    price: number
    description?: string
  }[]
}

export function ServiceDetail({ id, name, description, image, variants, addons = [] }: ServiceDetailProps) {
  const { addItem, openCart } = useCart()

  const [selectedVariant, setSelectedVariant] = useState<ServiceVariant>(variants[0])
  const [selectedOptions, setSelectedOptions] = useState<Record<string, ServiceOption>>({})
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [quantity, setQuantity] = useState(1)
  const [priceBreakdown, setPriceBreakdown] = useState<
    { label: string; price: number; type: "base" | "option" | "addon" | "discount" }[]
  >([{ label: variants[0].name, price: variants[0].price, type: "base" }])

  const handleVariantChange = (variantId: string) => {
    const variant = variants.find((v) => v.id === variantId)
    if (variant) {
      setSelectedVariant(variant)
      // Reset options when variant changes
      setSelectedOptions({})
      // Update price breakdown
      setPriceBreakdown([{ label: variant.name, price: variant.price, type: "base" }])
    }
  }

  const handleOptionChange = (optionGroupId: string, optionId: string) => {
    const option = selectedVariant.options?.find((o) => o.id === optionId)
    if (option) {
      setSelectedOptions((prev) => ({
        ...prev,
        [optionGroupId]: option,
      }))

      // Update price breakdown
      updatePriceBreakdown()
    }
  }

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons((prev) => {
      const newAddons = prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]

      // Update price breakdown after state update
      setTimeout(() => updatePriceBreakdown(), 0)

      return newAddons
    })
  }

  const updatePriceBreakdown = () => {
    const breakdown: { label: string; price: number; type: "base" | "option" | "addon" | "discount" }[] = [
      { label: selectedVariant.name, price: selectedVariant.price, type: "base" },
    ]

    // Add selected options
    Object.entries(selectedOptions).forEach(([name, option]) => {
      if (option.price !== 0) {
        const type = option.price < 0 ? "discount" : "option"
        breakdown.push({
          label: `${name}: ${option.name}`,
          price: option.price,
          type,
        })
      }
    })

    // Add selected addons
    selectedAddons.forEach((addonId) => {
      const addon = addons.find((a) => a.id === addonId)
      if (addon) {
        breakdown.push({
          label: `Add-on: ${addon.name}`,
          price: addon.price,
          type: "addon",
        })
      }
    })

    // Add quantity if more than 1
    if (quantity > 1) {
      const baseTotal = calculateBaseTotal()
      breakdown.push({
        label: `Quantity (×${quantity})`,
        price: baseTotal * (quantity - 1),
        type: "option",
      })
    }

    setPriceBreakdown(breakdown)
  }

  const calculateBaseTotal = () => {
    let total = selectedVariant.price

    // Add option prices
    Object.values(selectedOptions).forEach((option) => {
      total += option.price
    })

    // Add addon prices
    selectedAddons.forEach((addonId) => {
      const addon = addons.find((a) => a.id === addonId)
      if (addon) {
        total += addon.price
      }
    })

    return total
  }

  const calculateTotalPrice = () => {
    return calculateBaseTotal() * quantity
  }

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 10))
    // Update price breakdown after state update
    setTimeout(() => updatePriceBreakdown(), 0)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1))
    // Update price breakdown after state update
    setTimeout(() => updatePriceBreakdown(), 0)
  }

  const handleAddToCart = () => {
    const cartOptions = [
      // Add variant as an option
      { name: "Type", value: selectedVariant.name },

      // Add selected options
      ...Object.entries(selectedOptions).map(([groupId, option]) => ({
        name: groupId,
        value: option.name,
        price: option.price,
      })),

      // Add selected addons
      ...selectedAddons.map((addonId) => {
        const addon = addons.find((a) => a.id === addonId)!
        return {
          name: "Add-on",
          value: addon.name,
          price: addon.price,
        }
      }),
    ]

    const item: CartItem = {
      id: uuidv4(),
      serviceId: id,
      name,
      price: calculateTotalPrice() / quantity, // Price per unit
      quantity,
      image,
      options: cartOptions,
    }

    addItem(item)
    openCart()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold">{name}</h1>

        <div className="mt-4 text-2xl font-bold">{formatPrice(calculateTotalPrice())}</div>

        <p className="mt-4 text-muted-foreground">{description}</p>

        <Separator className="my-6" />

        {/* Service Variants */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Select Service Type</h3>
            <RadioGroup value={selectedVariant.id} onValueChange={handleVariantChange} className="space-y-3">
              {variants.map((variant) => (
                <div
                  key={variant.id}
                  className={`flex items-center space-x-2 p-3 rounded-md border transition-all ${
                    selectedVariant.id === variant.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <RadioGroupItem value={variant.id} id={variant.id} />
                  <Label htmlFor={variant.id} className="flex justify-between w-full cursor-pointer">
                    <div>
                      <span className="font-medium">{variant.name}</span>
                      <p className="text-sm text-muted-foreground">{variant.description}</p>
                    </div>
                    <span>{formatPrice(variant.price)}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Service Options */}
          {selectedVariant.options && selectedVariant.options.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-3">Customize Your Service</h3>
              {Object.entries(
                selectedVariant.options.reduce<Record<string, ServiceOption[]>>((acc, option) => {
                  if (!acc[option.name]) {
                    acc[option.name] = []
                  }
                  acc[option.name].push(option)
                  return acc
                }, {}),
              ).map(([groupName, options]) => (
                <div key={groupName} className="mb-4 bg-accent/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2">{groupName}</h4>
                  <RadioGroup
                    value={selectedOptions[groupName]?.id || ""}
                    onValueChange={(value) => handleOptionChange(groupName, value)}
                    className="space-y-2"
                  >
                    {options.map((option) => (
                      <div
                        key={option.id}
                        className={`flex items-center space-x-2 p-2 rounded-md border transition-all ${
                          selectedOptions[groupName]?.id === option.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label htmlFor={option.id} className="flex justify-between w-full cursor-pointer">
                          <div>
                            <span>{option.name}</span>
                            {option.description && (
                              <p className="text-xs text-muted-foreground">{option.description}</p>
                            )}
                          </div>
                          <div>
                            {option.price > 0 && (
                              <span className="text-sm font-medium">+{formatPrice(option.price)}</span>
                            )}
                            {option.price < 0 && (
                              <span className="text-sm font-medium text-green-600">
                                -{formatPrice(Math.abs(option.price))}
                              </span>
                            )}
                            {option.price === 0 && <span className="text-sm text-muted-foreground">Included</span>}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>
          )}

          {/* Add-ons */}
          {addons.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium">Add-ons</h3>
                <Badge variant="outline">Optional</Badge>
              </div>
              <div className="space-y-3 bg-accent/30 rounded-lg p-4">
                {addons.map((addon) => (
                  <div
                    key={addon.id}
                    className={`flex items-start space-x-2 p-3 rounded-md border transition-all ${
                      selectedAddons.includes(addon.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Checkbox
                      id={addon.id}
                      checked={selectedAddons.includes(addon.id)}
                      onCheckedChange={() => handleAddonToggle(addon.id)}
                      className="mt-1"
                    />
                    <div className="flex justify-between w-full">
                      <Label htmlFor={addon.id} className="cursor-pointer">
                        <span className="font-medium">{addon.name}</span>
                        {addon.description && <p className="text-sm text-muted-foreground">{addon.description}</p>}
                      </Label>
                      <span className="text-sm font-medium">+{formatPrice(addon.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Quantity */}
          <div>
            <h3 className="text-lg font-medium mb-3">Quantity</h3>
            <div className="flex items-center space-x-4 bg-accent/30 rounded-lg p-4">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-9 w-9 rounded-full"
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                disabled={quantity >= 10}
                className="h-9 w-9 rounded-full"
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground ml-2">(Max 10 per order)</span>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-accent/30 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-3">Price Breakdown</h3>
            <div className="space-y-2 mb-3">
              {priceBreakdown.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{item.label}</span>
                  <div className="flex items-center">
                    {item.type === "base" && <span>{formatPrice(item.price)}</span>}
                    {item.type === "option" && item.price > 0 && (
                      <span className="text-sm">+{formatPrice(item.price)}</span>
                    )}
                    {item.type === "addon" && <span className="text-sm">+{formatPrice(item.price)}</span>}
                    {item.type === "discount" && (
                      <span className="text-sm text-green-600">-{formatPrice(Math.abs(item.price))}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(calculateTotalPrice())}</span>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleAddToCart} size="lg" className="w-full relative overflow-hidden group">
              <span className="relative z-10">Add to Cart - {formatPrice(calculateTotalPrice())}</span>
              <span className="absolute inset-0 bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
          </div>

          <TooltipProvider>
            <div className="flex items-center gap-1 justify-center text-xs text-muted-foreground">
              <Info className="h-3 w-3" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help underline underline-offset-2">
                    Price may vary based on your selections
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    The final price is calculated based on your service type, options, add-ons, and quantity.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
