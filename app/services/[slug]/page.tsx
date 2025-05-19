"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Clock,
  Shield,
  Award,
  ThumbsUp,
  Calendar,
  MinusCircle,
  PlusCircle,
  Check,
  AlertCircle,
  ChevronRight,
  Info,
  Sparkles,
  Plus,
} from "lucide-react"
import { useCart } from "@/context/cart-context"
import { formatPrice } from "@/lib/utils"
import { v4 as uuidv4 } from "uuid"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define types for better type safety
type AddonQuantity = {
  id: string
  quantity: number
}

type PriceBreakdownItem = {
  id: string
  label: string
  price: number
  type: "base" | "option" | "addon" | "discount" | "quantity"
  quantity?: number
}

type RecommendedAddon = {
  id: string
  name: string
  description: string
  price: number
  reason: string
  matchScore: number // 0-100 score indicating how well this matches the user's selections
}

// This would come from your API or database in a real app
const getServiceData = (slug: string) => {
  const services = {
    "salon-women": {
      id: "salon-women",
      name: "Salon for Women",
      description: "Professional salon services in the comfort of your home",
      longDescription:
        "Pamper yourself with our professional salon services delivered right at your doorstep. Our trained beauticians use high-quality products to give you the perfect salon experience at home.",
      image: "https://i.postimg.cc/D05bRTd2/women-salon-hyphomz.avif",
      rating: 4.8,
      ratingCount: 12453,
      packages: [
        {
          id: "facial",
          name: "Facial",
          description: "Rejuvenate your skin with our premium facials",
          basePrice: 999,
          options: [
            {
              name: "Type",
              required: true,
              choices: [
                {
                  id: "fruit",
                  name: "Fruit Facial",
                  price: 0,
                  description: "Natural fruit extracts for gentle cleansing",
                },
                { id: "gold", name: "Gold Facial", price: 500, description: "24K gold-infused for radiant skin" },
                {
                  id: "diamond",
                  name: "Diamond Facial",
                  price: 1000,
                  description: "Premium diamond dust for deep exfoliation",
                },
              ],
            },
            {
              name: "Add-ons",
              required: false,
              choices: [
                {
                  id: "massage",
                  name: "Face Massage (10 mins)",
                  price: 299,
                  description: "Relaxing massage to improve circulation",
                },
                { id: "mask", name: "Premium Face Mask", price: 399, description: "Hydrating mask for glowing skin" },
              ],
            },
          ],
          image: "/placeholder.svg?height=200&width=300",
          // Recommendation rules for this package
          recommendationRules: [
            {
              // If user selects gold facial, recommend premium face mask
              triggerOption: { name: "Type", value: "gold" },
              recommendAddon: "mask",
              reason: "Enhance your Gold Facial with our Premium Face Mask for ultimate hydration",
              matchScore: 90,
            },
            {
              // If user selects diamond facial, recommend face massage
              triggerOption: { name: "Type", value: "diamond" },
              recommendAddon: "massage",
              reason: "Complete your Diamond Facial with a relaxing Face Massage",
              matchScore: 95,
            },
            // Additional recommendations that aren't in the standard add-ons
            {
              triggerOption: { name: "Type", value: "diamond" },
              recommendAddon: {
                id: "eye-treatment",
                name: "Eye Treatment",
                price: 349,
                description: "Special treatment for the delicate eye area",
              },
              reason: "Diamond Facial clients often add our specialized Eye Treatment",
              matchScore: 85,
            },
            {
              triggerOption: { name: "Type", value: "fruit" },
              recommendAddon: {
                id: "neck-treatment",
                name: "Neck Treatment",
                price: 299,
                description: "Extended care for your neck area",
              },
              reason: "Complete your Fruit Facial with our nourishing Neck Treatment",
              matchScore: 80,
            },
          ],
        },
        {
          id: "haircut",
          name: "Haircut & Styling",
          description: "Get a trendy haircut and styling by experts",
          basePrice: 699,
          options: [
            {
              name: "Length",
              required: true,
              choices: [
                { id: "short", name: "Short Hair", price: 0, description: "For hair length up to shoulders" },
                { id: "medium", name: "Medium Hair", price: 100, description: "For hair length up to mid-back" },
                { id: "long", name: "Long Hair", price: 200, description: "For hair length below mid-back" },
              ],
            },
            {
              name: "Add-ons",
              required: false,
              choices: [
                { id: "styling", name: "Hair Styling", price: 299, description: "Professional styling after haircut" },
                { id: "treatment", name: "Hair Treatment", price: 499, description: "Deep conditioning treatment" },
              ],
            },
          ],
          image: "/placeholder.svg?height=200&width=300",
          // Recommendation rules for this package
          recommendationRules: [
            {
              triggerOption: { name: "Length", value: "long" },
              recommendAddon: "treatment",
              reason: "Long hair benefits greatly from our deep conditioning treatment",
              matchScore: 90,
            },
            {
              triggerOption: { name: "Length", value: "medium" },
              recommendAddon: "styling",
              reason: "Medium length hair looks amazing with professional styling",
              matchScore: 85,
            },
            {
              // Additional recommendations
              triggerOption: { name: "Length", value: "long" },
              recommendAddon: {
                id: "hair-spa",
                name: "Hair Spa",
                price: 599,
                description: "Luxurious hair spa treatment for healthy, shiny hair",
              },
              reason: "Our Hair Spa is perfect for maintaining long hair health",
              matchScore: 95,
            },
            {
              triggerOption: { name: "Length", value: "short" },
              recommendAddon: {
                id: "color-touch",
                name: "Color Touch-Up",
                price: 499,
                description: "Quick color refresh for your roots",
              },
              reason: "Short hair styles look even better with a fresh color touch",
              matchScore: 80,
            },
          ],
        },
        {
          id: "waxing",
          name: "Waxing",
          description: "Smooth and hair-free skin with our waxing services",
          basePrice: 599,
          options: [
            {
              name: "Type",
              required: true,
              choices: [
                { id: "regular", name: "Regular Wax", price: 0, description: "Standard waxing procedure" },
                { id: "rica", name: "Rica Wax", price: 200, description: "Premium Italian wax for sensitive skin" },
                {
                  id: "chocolate",
                  name: "Chocolate Wax",
                  price: 300,
                  description: "Aromatic chocolate wax for extra smoothness",
                },
              ],
            },
            {
              name: "Area",
              required: true,
              choices: [
                { id: "full-arms", name: "Full Arms", price: 0, description: "Complete arm waxing" },
                { id: "half-arms", name: "Half Arms", price: -100, description: "Waxing from elbow to wrist" },
                { id: "full-legs", name: "Full Legs", price: 200, description: "Complete leg waxing" },
                { id: "half-legs", name: "Half Legs", price: 100, description: "Waxing from knee to ankle" },
              ],
            },
            {
              name: "Add-ons",
              required: false,
              choices: [
                {
                  id: "underarms",
                  name: "Underarms",
                  price: 199,
                  description: "Underarm waxing",
                },
                {
                  id: "moisturizer",
                  name: "Premium Moisturizer",
                  price: 149,
                  description: "Soothing moisturizer application after waxing",
                },
              ],
            },
          ],
          image: "/placeholder.svg?height=200&width=300",
          // Recommendation rules for this package
          recommendationRules: [
            {
              triggerOption: { name: "Area", value: "full-legs" },
              recommendAddon: "moisturizer",
              reason: "Soothe your skin after full legs waxing with our premium moisturizer",
              matchScore: 90,
            },
            {
              triggerOption: { name: "Type", value: "chocolate" },
              recommendAddon: "underarms",
              reason: "Many clients add underarm waxing with our premium chocolate wax",
              matchScore: 85,
            },
            {
              // Additional recommendations
              triggerOption: { name: "Area", value: "full-arms" },
              recommendAddon: {
                id: "tan-removal",
                name: "Tan Removal",
                price: 349,
                description: "Removes tan and brightens skin",
              },
              reason: "Full arms waxing pairs perfectly with our tan removal treatment",
              matchScore: 90,
            },
            {
              triggerOption: { name: "Type", value: "rica" },
              recommendAddon: {
                id: "anti-ingrowth",
                name: "Anti-Ingrowth Serum",
                price: 249,
                description: "Prevents ingrown hair after waxing",
              },
              reason: "Rica wax clients love our Anti-Ingrowth Serum for best results",
              matchScore: 95,
            },
          ],
        },
      ],
      faqs: [
        {
          question: "How long does a typical salon service take?",
          answer:
            "Service duration varies based on the treatment. A basic facial takes about 30-45 minutes, while a haircut and styling can take 45-60 minutes. Waxing duration depends on the areas being treated.",
        },
        {
          question: "What products do you use?",
          answer:
            "We use high-quality, branded products that are suitable for different skin and hair types. Our beauticians carry a range of products to cater to your specific needs.",
        },
        {
          question: "How do I prepare for a salon service at home?",
          answer:
            "Please ensure you have a clean space with good lighting. For facials, remove makeup beforehand. For haircuts, having freshly washed hair is recommended but not mandatory as we provide a hair wash.",
        },
        {
          question: "Are the beauticians trained professionals?",
          answer:
            "Yes, all our beauticians are certified professionals with at least 3 years of experience. They undergo rigorous training and quality checks before joining our platform.",
        },
      ],
      reviews: [
        {
          id: "1",
          name: "Priya S.",
          rating: 5,
          date: "2 weeks ago",
          comment:
            "Amazing service! The beautician was very professional and did a fantastic job with my facial. Will definitely book again.",
        },
        {
          id: "2",
          name: "Meera R.",
          rating: 4,
          date: "1 month ago",
          comment:
            "Good haircut and styling. The beautician was punctual and skilled. Just wish they had more styling options.",
        },
        {
          id: "3",
          name: "Anjali T.",
          rating: 5,
          date: "2 months ago",
          comment: "Excellent waxing service. Quick, relatively painless, and very hygienic. Highly recommend!",
        },
      ],
    },
    // Other services would be here
  }

  return services[slug as keyof typeof services] || null
}

export default function ServicePage() {
  const { slug } = useParams()
  const { addItem } = useCart()

  const [service, setService] = useState<any>(null)
  const [selectedPackage, setSelectedPackage] = useState<any>(null)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>({})
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [addonQuantities, setAddonQuantities] = useState<AddonQuantity[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [basePrice, setBasePrice] = useState(0)
  const [activeTab, setActiveTab] = useState("packages")
  const [quantity, setQuantity] = useState(1)
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdownItem[]>([])
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false)
  const [lastUpdatedOption, setLastUpdatedOption] = useState<string | null>(null)
  const [highlightedItem, setHighlightedItem] = useState<string | null>(null)
  const [recommendedAddons, setRecommendedAddons] = useState<RecommendedAddon[]>([])
  const [showRecommendations, setShowRecommendations] = useState(true)
  const [newRecommendation, setNewRecommendation] = useState<string | null>(null)

  // Initialize service data
  useEffect(() => {
    if (typeof slug === "string") {
      const serviceData = getServiceData(slug)
      setService(serviceData)

      if (serviceData && serviceData.packages.length > 0) {
        setSelectedPackage(serviceData.packages[0])
        setBasePrice(serviceData.packages[0].basePrice)

        // Initialize selected options with required options
        const initialOptions: Record<string, any> = {}
        serviceData.packages[0].options.forEach((option: any) => {
          if (option.required && option.choices.length > 0) {
            initialOptions[option.name] = option.choices[0]
          }
        })
        setSelectedOptions(initialOptions)
      }
    }
  }, [slug])

  // Calculate total price whenever selections change
  useEffect(() => {
    if (selectedPackage) {
      calculateTotalPrice()
    }
  }, [selectedPackage, selectedOptions, selectedAddons, addonQuantities, quantity])

  // Generate recommendations whenever selections change
  useEffect(() => {
    if (selectedPackage && selectedPackage.recommendationRules) {
      generateRecommendations()
    }
  }, [selectedPackage, selectedOptions, selectedAddons])

  // Calculate the total price and update price breakdown
  const calculateTotalPrice = () => {
    let price = selectedPackage.basePrice
    const breakdown: PriceBreakdownItem[] = [
      {
        id: `base-${selectedPackage.id}`,
        label: selectedPackage.name,
        price: selectedPackage.basePrice,
        type: "base",
      },
    ]

    // Add price of selected options
    Object.entries(selectedOptions).forEach(([name, choice]) => {
      if (choice && choice.price) {
        price += choice.price
        const type = choice.price < 0 ? "discount" : "option"
        breakdown.push({
          id: `option-${choice.id}`,
          label: `${name}: ${choice.name}`,
          price: choice.price,
          type,
        })
      }
    })

    // Add price of selected add-ons with their quantities
    selectedAddons.forEach((addonId) => {
      const addonOption = selectedPackage.options.find(
        (opt: any) => opt.name === "Add-ons" && opt.choices.some((c: any) => c.id === addonId),
      )

      if (addonOption) {
        const addon = addonOption.choices.find((c: any) => c.id === addonId)
        if (addon) {
          // Find quantity for this addon
          const addonQuantity = addonQuantities.find((aq) => aq.id === addonId)?.quantity || 1
          const addonTotalPrice = addon.price * addonQuantity

          price += addonTotalPrice
          breakdown.push({
            id: `addon-${addon.id}`,
            label: `Add-on: ${addon.name}${addonQuantity > 1 ? ` (×${addonQuantity})` : ""}`,
            price: addonTotalPrice,
            type: "addon",
            quantity: addonQuantity,
          })
        }
      }
    })

    // Calculate single unit price before applying overall quantity
    const singleUnitPrice = price

    // Apply overall quantity
    price *= quantity

    if (quantity > 1) {
      breakdown.push({
        id: "quantity-multiplier",
        label: `Quantity (×${quantity})`,
        price: singleUnitPrice * (quantity - 1),
        type: "quantity",
      })
    }

    setTotalPrice(price)
    setPriceBreakdown(breakdown)
  }

  // Generate personalized recommendations based on user selections
  const generateRecommendations = () => {
    if (!selectedPackage || !selectedPackage.recommendationRules) return

    const newRecommendations: RecommendedAddon[] = []

    // Check each recommendation rule
    selectedPackage.recommendationRules.forEach((rule: any) => {
      // Check if the trigger option is selected
      const isTriggered = Object.entries(selectedOptions).some(
        ([optionName, choice]) =>
          optionName === rule.triggerOption.name && (choice as any).id === rule.triggerOption.value,
      )

      if (isTriggered) {
        // If the recommendation is for an existing add-on
        if (typeof rule.recommendAddon === "string") {
          // Find the add-on in the package options
          const addonOption = selectedPackage.options.find((opt: any) => opt.name === "Add-ons")
          if (addonOption) {
            const addon = addonOption.choices.find((c: any) => c.id === rule.recommendAddon)
            if (addon) {
              // Only recommend if not already selected
              if (!selectedAddons.includes(addon.id)) {
                newRecommendations.push({
                  id: addon.id,
                  name: addon.name,
                  description: addon.description,
                  price: addon.price,
                  reason: rule.reason,
                  matchScore: rule.matchScore,
                })
              }
            }
          }
        } else if (typeof rule.recommendAddon === "object") {
          // This is a custom add-on not in the standard list
          const customAddon = rule.recommendAddon
          // Check if this custom add-on is already selected (shouldn't be possible initially, but for future-proofing)
          if (!selectedAddons.includes(customAddon.id)) {
            newRecommendations.push({
              id: customAddon.id,
              name: customAddon.name,
              description: customAddon.description,
              price: customAddon.price,
              reason: rule.reason,
              matchScore: rule.matchScore,
            })
          }
        }
      }
    })

    // Sort recommendations by match score (highest first)
    newRecommendations.sort((a, b) => b.matchScore - a.matchScore)

    // Check if there are any new recommendations that weren't there before
    const previousRecommendationIds = recommendedAddons.map((rec) => rec.id)
    const hasNewRecommendation = newRecommendations.some((rec) => !previousRecommendationIds.includes(rec.id))

    if (hasNewRecommendation && newRecommendations.length > 0) {
      // Highlight the first new recommendation
      setNewRecommendation(newRecommendations[0].id)

      // Clear the highlight after 5 seconds
      setTimeout(() => {
        setNewRecommendation(null)
      }, 5000)
    }

    setRecommendedAddons(newRecommendations)
  }

  const handlePackageSelect = (pkg: any) => {
    setSelectedPackage(pkg)
    setBasePrice(pkg.basePrice)

    // Reset options when package changes
    const initialOptions: Record<string, any> = {}
    pkg.options.forEach((option: any) => {
      if (option.required && option.choices.length > 0) {
        initialOptions[option.name] = option.choices[0]
      }
    })
    setSelectedOptions(initialOptions)

    // Reset add-ons, quantities, and overall quantity
    setSelectedAddons([])
    setAddonQuantities([])
    setQuantity(1)
    setLastUpdatedOption(null)
    setHighlightedItem(null)
    setRecommendedAddons([])
    setNewRecommendation(null)

    // Show price breakdown when package changes
    setShowPriceBreakdown(true)
  }

  const handleOptionSelect = (optionName: string, choice: any) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: choice,
    }))

    // Highlight the changed option in the price breakdown
    const optionId = `option-${choice.id}`
    setHighlightedItem(optionId)
    setLastUpdatedOption(optionName)

    // Auto-show price breakdown when an option is selected
    setShowPriceBreakdown(true)

    // Clear highlight after 3 seconds
    setTimeout(() => {
      if (highlightedItem === optionId) {
        setHighlightedItem(null)
      }
      if (lastUpdatedOption === optionName) {
        setLastUpdatedOption(null)
      }
    }, 3000)
  }

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons((prev) => {
      const isSelected = prev.includes(addonId)
      const newAddons = isSelected ? prev.filter((id) => id !== addonId) : [...prev, addonId]

      // If adding a new addon, initialize its quantity to 1
      if (!isSelected) {
        setAddonQuantities((prevQuantities) => [...prevQuantities, { id: addonId, quantity: 1 }])
      } else {
        // If removing an addon, remove its quantity entry
        setAddonQuantities((prevQuantities) => prevQuantities.filter((item) => item.id !== addonId))
      }

      return newAddons
    })

    // Find the addon name for highlighting
    const addonOption = selectedPackage.options.find(
      (opt: any) => opt.name === "Add-ons" && opt.choices.some((c: any) => c.id === addonId),
    )

    if (addonOption) {
      const addon = addonOption.choices.find((c: any) => c.id === addonId)
      if (addon) {
        const addonItemId = `addon-${addonId}`
        setHighlightedItem(addonItemId)
        setLastUpdatedOption(`Add-on: ${addon.name}`)

        // Auto-show price breakdown when an addon is toggled
        setShowPriceBreakdown(true)

        // Clear highlight after 3 seconds
        setTimeout(() => {
          if (highlightedItem === addonItemId) {
            setHighlightedItem(null)
          }
          if (lastUpdatedOption === `Add-on: ${addon.name}`) {
            setLastUpdatedOption(null)
          }
        }, 3000)
      }
    }
  }

  const handleRecommendedAddonAdd = (addon: RecommendedAddon) => {
    // Check if this is a standard add-on or a custom one
    const addonOption = selectedPackage.options.find(
      (opt: any) => opt.name === "Add-ons" && opt.choices.some((c: any) => c.id === addon.id),
    )

    if (addonOption) {
      // This is a standard add-on, just toggle it on
      handleAddonToggle(addon.id)
    } else {
      // This is a custom add-on, we need to add it to the selected add-ons
      // and also track its quantity
      setSelectedAddons((prev) => [...prev, addon.id])
      setAddonQuantities((prev) => [...prev, { id: addon.id, quantity: 1 }])

      // Add this custom add-on to the price breakdown
      setPriceBreakdown((prev) => [
        ...prev,
        {
          id: `addon-${addon.id}`,
          label: `Add-on: ${addon.name}`,
          price: addon.price,
          type: "addon",
          quantity: 1,
        },
      ])

      // Highlight the added add-on
      setHighlightedItem(`addon-${addon.id}`)
      setLastUpdatedOption(`Add-on: ${addon.name}`)

      // Auto-show price breakdown
      setShowPriceBreakdown(true)

      // Clear highlight after 3 seconds
      setTimeout(() => {
        setHighlightedItem(null)
        setLastUpdatedOption(null)
      }, 3000)
    }

    // Remove this add-on from recommendations
    setRecommendedAddons((prev) => prev.filter((rec) => rec.id !== addon.id))
  }

  const incrementAddonQuantity = (addonId: string) => {
    setAddonQuantities((prev) => {
      const existingItem = prev.find((item) => item.id === addonId)

      if (existingItem) {
        // Limit to maximum of 5 per addon
        if (existingItem.quantity >= 5) return prev

        return prev.map((item) => (item.id === addonId ? { ...item, quantity: item.quantity + 1 } : item))
      }

      return [...prev, { id: addonId, quantity: 2 }] // Start at 2 if incrementing from default
    })

    // Highlight the changed addon in the price breakdown
    const addonItemId = `addon-${addonId}`
    setHighlightedItem(addonItemId)

    // Find addon name for feedback
    const addonOption = selectedPackage.options.find(
      (opt: any) => opt.name === "Add-ons" && opt.choices.some((c: any) => c.id === addonId),
    )

    if (addonOption) {
      const addon = addonOption.choices.find((c: any) => c.id === addonId)
      if (addon) {
        setLastUpdatedOption(`Add-on: ${addon.name}`)
      }
    }

    // Auto-show price breakdown
    setShowPriceBreakdown(true)

    // Clear highlight after 3 seconds
    setTimeout(() => {
      if (highlightedItem === addonItemId) {
        setHighlightedItem(null)
      }
      setLastUpdatedOption(null)
    }, 3000)
  }

  const decrementAddonQuantity = (addonId: string) => {
    setAddonQuantities((prev) => {
      const existingItem = prev.find((item) => item.id === addonId)

      if (existingItem) {
        // If quantity would go below 1, keep it at 1
        if (existingItem.quantity <= 1) return prev

        return prev.map((item) => (item.id === addonId ? { ...item, quantity: item.quantity - 1 } : item))
      }

      return prev // Should not happen, but just in case
    })

    // Highlight the changed addon in the price breakdown
    const addonItemId = `addon-${addonId}`
    setHighlightedItem(addonItemId)

    // Find addon name for feedback
    const addonOption = selectedPackage.options.find(
      (opt: any) => opt.name === "Add-ons" && opt.choices.some((c: any) => c.id === addonId),
    )

    if (addonOption) {
      const addon = addonOption.choices.find((c: any) => c.id === addonId)
      if (addon) {
        setLastUpdatedOption(`Add-on: ${addon.name}`)
      }
    }

    // Auto-show price breakdown
    setShowPriceBreakdown(true)

    // Clear highlight after 3 seconds
    setTimeout(() => {
      if (highlightedItem === addonItemId) {
        setHighlightedItem(null)
      }
      setLastUpdatedOption(null)
    }, 3000)
  }

  const getAddonQuantity = (addonId: string): number => {
    return addonQuantities.find((item) => item.id === addonId)?.quantity || 1
  }

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 10))
    setHighlightedItem("quantity-multiplier")
    setLastUpdatedOption("quantity")

    // Auto-show price breakdown when quantity changes
    setShowPriceBreakdown(true)

    // Clear highlight after 3 seconds
    setTimeout(() => {
      if (highlightedItem === "quantity-multiplier") {
        setHighlightedItem(null)
      }
      if (lastUpdatedOption === "quantity") {
        setLastUpdatedOption(null)
      }
    }, 3000)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1))
    setHighlightedItem("quantity-multiplier")
    setLastUpdatedOption("quantity")

    // Auto-show price breakdown when quantity changes
    setShowPriceBreakdown(true)

    // Clear highlight after 3 seconds
    setTimeout(() => {
      if (highlightedItem === "quantity-multiplier") {
        setHighlightedItem(null)
      }
      if (lastUpdatedOption === "quantity") {
        setLastUpdatedOption(null)
      }
    }, 3000)
  }

  const handleAddToCart = () => {
    if (!selectedPackage) return

    // Format options for cart
    const cartOptions = [
      // Add selected options
      ...Object.entries(selectedOptions).map(([name, choice]) => ({
        name,
        value: (choice as any).name,
        price: (choice as any).price || 0,
      })),
    ]

    // Add selected add-ons with their quantities
    selectedPackage.options.forEach((option: any) => {
      if (option.name === "Add-ons") {
        option.choices.forEach((choice: any) => {
          if (selectedAddons.includes(choice.id)) {
            const addonQuantity = getAddonQuantity(choice.id)
            cartOptions.push({
              name: "Add-on",
              value: `${choice.name}${addonQuantity > 1 ? ` (×${addonQuantity})` : ""}`,
              price: choice.price * addonQuantity,
              quantity: addonQuantity,
            })
          }
        })
      }
    })

    // Add any custom add-ons that aren't in the standard options
    recommendedAddons.forEach((addon) => {
      if (selectedAddons.includes(addon.id)) {
        const addonQuantity = getAddonQuantity(addon.id)
        cartOptions.push({
          name: "Add-on",
          value: `${addon.name}${addonQuantity > 1 ? ` (×${addonQuantity})` : ""}`,
          price: addon.price * addonQuantity,
          quantity: addonQuantity,
        })
      }
    })

    addItem({
      id: uuidv4(),
      serviceId: service.id,
      name: `${service.name} - ${selectedPackage.name}`,
      price: totalPrice / quantity, // Store base price per unit
      quantity,
      image: selectedPackage.image,
      options: cartOptions,
    })
  }

  const isItemHighlighted = (itemId: string) => {
    return highlightedItem === itemId
  }

  const isNewRecommendation = (addonId: string) => {
    return newRecommendation === addonId
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Service not found</h1>
        <p className="mt-4 text-muted-foreground">The service you're looking for doesn't exist or has been removed.</p>
        <Button className="mt-6" asChild>
          <Link href="/services">Browse All Services</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Service Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
          <Image src={service.image || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              Available Nationwide
            </Badge>
            <div className="flex items-center text-sm">
              <Star className="h-4 w-4 text-primary fill-primary mr-1" />
              <span className="font-medium">{service.rating}</span>
              <span className="text-muted-foreground ml-1">({service.ratingCount.toLocaleString()})</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-3">{service.name}</h1>
          <p className="text-muted-foreground mb-6">{service.longDescription}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Flexible Scheduling</p>
                <p className="text-xs text-muted-foreground">Book at your convenience</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Verified Professionals</p>
                <p className="text-xs text-muted-foreground">Background checked & trained</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Quality Guarantee</p>
                <p className="text-xs text-muted-foreground">Satisfaction or free rework</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ThumbsUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Trusted by Millions</p>
                <p className="text-xs text-muted-foreground">5-star rated service</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" onClick={() => setActiveTab("packages")} className="group relative overflow-hidden">
              <span className="relative z-10">View Packages</span>
              <span className="absolute inset-0 bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
            <Button variant="outline" size="lg" asChild className="group">
              <Link href="#reviews">
                <span className="group-hover:text-primary transition-colors duration-300">Read Reviews</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="reviews" id="reviews">
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="packages" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Available Packages</h2>

              <div className="space-y-6">
                {service.packages.map((pkg: any) => (
                  <Card
                    key={pkg.id}
                    className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                      selectedPackage?.id === pkg.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handlePackageSelect(pkg)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4">
                      <div className="relative h-48 md:h-auto">
                        <Image src={pkg.image || "/placeholder.svg"} alt={pkg.name} fill className="object-cover" />
                        {selectedPackage?.id === pkg.id && (
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <div className="md:col-span-3 p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold">{pkg.name}</h3>
                            <p className="text-muted-foreground mt-1">{pkg.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">{formatPrice(pkg.basePrice)}</p>
                            <p className="text-xs text-muted-foreground">Base price</p>
                          </div>
                        </div>

                        {selectedPackage?.id === pkg.id && (
                          <div className="mt-4 pt-4 border-t">
                            <p className="font-medium mb-2">Customize your package:</p>

                            <div className="space-y-6">
                              {pkg.options.map((option: any) => (
                                <div key={option.name} className="bg-accent/30 rounded-lg p-4">
                                  <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-medium">
                                      {option.name} {option.required && <span className="text-red-500">*</span>}
                                    </h4>
                                    {option.name === "Add-ons" && (
                                      <Badge variant="outline" className="bg-background">
                                        Optional
                                      </Badge>
                                    )}
                                  </div>

                                  {option.name !== "Add-ons" ? (
                                    <RadioGroup
                                      value={selectedOptions[option.name]?.id || ""}
                                      onValueChange={(value) => {
                                        const choice = option.choices.find((c: any) => c.id === value)
                                        if (choice) {
                                          handleOptionSelect(option.name, choice)
                                        }
                                      }}
                                    >
                                      <div className="grid grid-cols-1 gap-3">
                                        {option.choices.map((choice: any) => (
                                          <motion.div
                                            key={choice.id}
                                            className={`flex items-center space-x-2 p-3 rounded-md border transition-all ${
                                              selectedOptions[option.name]?.id === choice.id
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:border-primary/50"
                                            }`}
                                            animate={
                                              isItemHighlighted(`option-${choice.id}`) ? { scale: [1, 1.02, 1] } : {}
                                            }
                                            transition={{ duration: 0.3 }}
                                          >
                                            <RadioGroupItem value={choice.id} id={`${option.name}-${choice.id}`} />
                                            <div className="flex justify-between w-full">
                                              <div>
                                                <Label
                                                  htmlFor={`${option.name}-${choice.id}`}
                                                  className="font-medium cursor-pointer"
                                                >
                                                  {choice.name}
                                                </Label>
                                                {choice.description && (
                                                  <p className="text-xs text-muted-foreground mt-1">
                                                    {choice.description}
                                                  </p>
                                                )}
                                              </div>
                                              <div className="text-right">
                                                {choice.price > 0 && (
                                                  <span className="text-sm font-medium">
                                                    +{formatPrice(choice.price)}
                                                  </span>
                                                )}
                                                {choice.price < 0 && (
                                                  <span className="text-sm font-medium text-green-600">
                                                    -{formatPrice(Math.abs(choice.price))}
                                                  </span>
                                                )}
                                                {choice.price === 0 && (
                                                  <span className="text-sm text-muted-foreground">Included</span>
                                                )}
                                              </div>
                                            </div>
                                          </motion.div>
                                        ))}
                                      </div>
                                    </RadioGroup>
                                  ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      {option.choices.map((choice: any) => (
                                        <div key={choice.id} className="space-y-3">
                                          <motion.div
                                            className={`flex items-start space-x-2 p-3 rounded-md border transition-all ${
                                              selectedAddons.includes(choice.id)
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:border-primary/50"
                                            }`}
                                            animate={
                                              isItemHighlighted(`addon-${choice.id}`) ? { scale: [1, 1.02, 1] } : {}
                                            }
                                            transition={{ duration: 0.3 }}
                                          >
                                            <Checkbox
                                              id={choice.id}
                                              checked={selectedAddons.includes(choice.id)}
                                              onCheckedChange={() => handleAddonToggle(choice.id)}
                                              className="mt-1"
                                            />
                                            <div className="flex justify-between w-full">
                                              <div>
                                                <Label htmlFor={choice.id} className="font-medium cursor-pointer">
                                                  {choice.name}
                                                </Label>
                                                {choice.description && (
                                                  <p className="text-xs text-muted-foreground mt-1">
                                                    {choice.description}
                                                  </p>
                                                )}
                                              </div>
                                              <div className="text-right">
                                                <span className="text-sm font-medium">
                                                  +{formatPrice(choice.price)}
                                                </span>
                                              </div>
                                            </div>
                                          </motion.div>

                                          {/* Addon quantity selector - only shown when addon is selected */}
                                          {selectedAddons.includes(choice.id) && (
                                            <div className="flex items-center justify-end space-x-2 px-3">
                                              <span className="text-xs text-muted-foreground">Quantity:</span>
                                              <div className="flex items-center space-x-2">
                                                <Button
                                                  variant="outline"
                                                  size="icon"
                                                  onClick={() => decrementAddonQuantity(choice.id)}
                                                  disabled={getAddonQuantity(choice.id) <= 1}
                                                  className="h-6 w-6 rounded-full"
                                                >
                                                  <MinusCircle className="h-3 w-3" />
                                                </Button>
                                                <motion.span
                                                  className="text-sm font-medium w-4 text-center"
                                                  animate={
                                                    isItemHighlighted(`addon-${choice.id}`)
                                                      ? { scale: [1, 1.2, 1] }
                                                      : {}
                                                  }
                                                  transition={{ duration: 0.3 }}
                                                >
                                                  {getAddonQuantity(choice.id)}
                                                </motion.span>
                                                <Button
                                                  variant="outline"
                                                  size="icon"
                                                  onClick={() => incrementAddonQuantity(choice.id)}
                                                  disabled={getAddonQuantity(choice.id) >= 5}
                                                  className="h-6 w-6 rounded-full"
                                                >
                                                  <PlusCircle className="h-3 w-3" />
                                                </Button>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}

                              {/* Personalized Recommendations Section */}
                              {recommendedAddons.length > 0 && (
                                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                      <Sparkles className="h-5 w-5 text-primary" />
                                      <h4 className="font-medium">Personalized Recommendations</h4>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setShowRecommendations(!showRecommendations)}
                                      className="h-8 px-2"
                                    >
                                      {showRecommendations ? "Hide" : "Show"}
                                    </Button>
                                  </div>

                                  <AnimatePresence>
                                    {showRecommendations && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="space-y-3">
                                          {recommendedAddons.map((addon) => (
                                            <motion.div
                                              key={addon.id}
                                              className={`p-3 rounded-md border transition-all ${
                                                isNewRecommendation(addon.id)
                                                  ? "border-primary bg-primary/10"
                                                  : "border-border"
                                              }`}
                                              animate={
                                                isNewRecommendation(addon.id)
                                                  ? {
                                                      backgroundColor: [
                                                        "rgba(var(--primary), 0.2)",
                                                        "rgba(var(--primary), 0.05)",
                                                      ],
                                                    }
                                                  : {}
                                              }
                                              transition={{ duration: 2, repeat: 2 }}
                                            >
                                              <div className="flex justify-between items-start mb-2">
                                                <div>
                                                  <h5 className="font-medium">{addon.name}</h5>
                                                  <p className="text-xs text-muted-foreground">{addon.description}</p>
                                                </div>
                                                <div className="text-right">
                                                  <p className="text-sm font-medium">+{formatPrice(addon.price)}</p>
                                                </div>
                                              </div>
                                              <div className="flex items-center justify-between">
                                                <p className="text-xs text-primary flex items-center">
                                                  <Sparkles className="h-3 w-3 mr-1" />
                                                  {addon.reason}
                                                </p>
                                                <Button
                                                  size="sm"
                                                  variant="outline"
                                                  className="h-8"
                                                  onClick={() => handleRecommendedAddonAdd(addon)}
                                                >
                                                  <Plus className="h-4 w-4 mr-1" />
                                                  Add
                                                </Button>
                                              </div>
                                            </motion.div>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              )}

                              {/* Overall Quantity selector */}
                              <div className="bg-accent/30 rounded-lg p-4">
                                <h4 className="font-medium mb-3">Overall Quantity</h4>
                                <div className="flex items-center space-x-4">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={decrementQuantity}
                                    disabled={quantity <= 1}
                                    className="h-9 w-9 rounded-full"
                                  >
                                    <MinusCircle className="h-4 w-4" />
                                  </Button>
                                  <motion.span
                                    className="text-lg font-medium w-8 text-center"
                                    animate={isItemHighlighted("quantity-multiplier") ? { scale: [1, 1.2, 1] } : {}}
                                    transition={{ duration: 0.3 }}
                                  >
                                    {quantity}
                                  </motion.span>
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
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <div className="sticky top-24">
                <Card className="overflow-hidden">
                  <div className="bg-primary/10 p-4 border-b">
                    <h3 className="text-xl font-bold">Order Summary</h3>
                  </div>
                  <CardContent className="p-6">
                    {selectedPackage ? (
                      <>
                        <div className="space-y-4 mb-6">
                          <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                          >
                            <span className="font-medium">Price Details</span>
                            <ChevronRight
                              className={`h-5 w-5 transition-transform ${showPriceBreakdown ? "rotate-90" : ""}`}
                            />
                          </div>

                          <AnimatePresence>
                            {showPriceBreakdown && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-2 pt-2">
                                  {priceBreakdown.map((item) => (
                                    <motion.div
                                      key={item.id}
                                      className={`flex justify-between items-center p-2 rounded-md ${
                                        isItemHighlighted(item.id) ? "bg-primary/10" : ""
                                      }`}
                                      animate={
                                        isItemHighlighted(item.id)
                                          ? {
                                              backgroundColor: [
                                                "rgba(var(--primary), 0.2)",
                                                "rgba(var(--primary), 0.05)",
                                              ],
                                            }
                                          : {}
                                      }
                                      transition={{ duration: 2 }}
                                    >
                                      <span className="text-sm">{item.label}</span>
                                      <div className="flex items-center">
                                        {item.type === "base" && <span>{formatPrice(item.price)}</span>}
                                        {item.type === "option" && item.price > 0 && (
                                          <span className="text-sm">+{formatPrice(item.price)}</span>
                                        )}
                                        {item.type === "addon" && (
                                          <span className="text-sm">+{formatPrice(item.price)}</span>
                                        )}
                                        {item.type === "quantity" && (
                                          <span className="text-sm">+{formatPrice(item.price)}</span>
                                        )}
                                        {item.type === "discount" && (
                                          <span className="text-sm text-green-600">
                                            -{formatPrice(Math.abs(item.price))}
                                          </span>
                                        )}
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <Separator />

                          <motion.div
                            className="flex justify-between font-bold text-lg"
                            animate={lastUpdatedOption !== null ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            <span>Total</span>
                            <span>{formatPrice(totalPrice)}</span>
                          </motion.div>

                          <div className="text-xs text-muted-foreground">
                            {basePrice < totalPrice ? (
                              <div className="flex items-center gap-1 justify-end">
                                <AlertCircle className="h-3 w-3" />
                                <span>Includes add-ons and customizations</span>
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Button className="w-full relative overflow-hidden group" size="lg" onClick={handleAddToCart}>
                            <span className="relative z-10">Add to Cart</span>
                            <span className="absolute inset-0 bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                          </Button>
                          <Button variant="outline" className="w-full" size="lg" asChild>
                            <Link href="/checkout">Book Now</Link>
                          </Button>
                        </div>

                        <div className="mt-4 text-xs text-muted-foreground">
                          <p className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>You can select your preferred date & time at checkout</span>
                          </p>
                        </div>
                      </>
                    ) : (
                      <p className="text-muted-foreground">Select a package to see pricing</p>
                    )}
                  </CardContent>
                  <CardFooter className="bg-accent/30 p-4 flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">100% Satisfaction Guarantee</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Not satisfied with the service? We'll send a professional for rework at no extra cost.
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="link" size="sm" className="p-0 h-auto mt-1">
                            <span className="flex items-center text-xs">
                              <Info className="h-3 w-3 mr-1" />
                              View terms
                            </span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs max-w-xs">
                            Rework must be requested within 24 hours of service completion. Applies to quality issues
                            only.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="faqs" className="mt-6">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {service.faqs.map((faq: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${star <= service.rating ? "text-primary fill-primary" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="font-medium">{service.rating}</span>
              <span className="text-muted-foreground">({service.ratingCount.toLocaleString()} reviews)</span>
            </div>
          </div>

          <div className="space-y-6">
            {service.reviews.map((review: any) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-medium">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= review.rating ? "text-primary fill-primary" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p>{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
