import type { ServiceCategory } from "@/types/service"
import { Home, Paintbrush, Wrench, Scissors, Shirt, Utensils, Laptop, Car } from "lucide-react"

export const serviceCategories: ServiceCategory[] = [
  {
    id: "cleaning",
    name: "Cleaning",
    icon: Home,
    services: [
      {
        id: "home-cleaning",
        name: "Home Deep Cleaning",
        description:
          "Professional deep cleaning service for your entire home. Includes dusting, mopping, bathroom cleaning, kitchen cleaning, and more.",
        price: 1499,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.8,
        duration: "4-5 hours",
        type: "Premium",
        addons: [
          {
            id: "sanitize-home",
            name: "Home Sanitization",
            price: 699,
            description: "Complete sanitization of high-touch surfaces",
          },
          {
            id: "sofa-cleaning",
            name: "Sofa Cleaning",
            price: 899,
            description: "Deep cleaning for up to 5 seats",
          },
          {
            id: "carpet-cleaning",
            name: "Carpet Cleaning",
            price: 599,
            description: "Deep cleaning for carpets up to 100 sq ft",
          },
          {
            id: "mattress-cleaning",
            name: "Mattress Cleaning",
            price: 499,
            description: "Deep cleaning for one queen/king mattress",
          },
        ],
      },
      {
        id: "bathroom-cleaning",
        name: "Bathroom Deep Cleaning",
        description: "Thorough cleaning of bathrooms including tiles, fixtures, shower area, and sanitization.",
        price: 699,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.7,
        duration: "1-2 hours",
        type: "Standard",
        addons: [
          {
            id: "toilet-sanitize",
            name: "Toilet Sanitization",
            price: 299,
            description: "Deep sanitization of toilet bowl and seat",
          },
          {
            id: "shower-descale",
            name: "Shower Descaling",
            price: 399,
            description: "Remove hard water stains and limescale",
          },
        ],
      },
      {
        id: "kitchen-cleaning",
        name: "Kitchen Deep Cleaning",
        description: "Detailed cleaning of kitchen including cabinets, appliances, countertops, and sink area.",
        price: 899,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.6,
        duration: "2-3 hours",
        type: "Premium",
        addons: [
          {
            id: "fridge-cleaning",
            name: "Refrigerator Cleaning",
            price: 399,
            description: "Interior and exterior cleaning",
          },
          {
            id: "oven-cleaning",
            name: "Oven Cleaning",
            price: 499,
            description: "Deep cleaning of oven interior and exterior",
          },
          {
            id: "chimney-cleaning",
            name: "Chimney Cleaning",
            price: 699,
            description: "Degreasing and deep cleaning",
          },
        ],
      },
    ],
  },
  {
    id: "painting",
    name: "Painting",
    icon: Paintbrush,
    services: [
      {
        id: "home-painting",
        name: "Home Painting",
        description: "Professional painting service for your home with premium quality paints and expert painters.",
        price: 12999,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.7,
        duration: "3-5 days",
        type: "Premium",
        addons: [
          {
            id: "texture-walls",
            name: "Textured Walls",
            price: 4999,
            description: "Add texture designs to your walls",
          },
          {
            id: "wallpaper-install",
            name: "Wallpaper Installation",
            price: 3999,
            description: "Installation of wallpaper (per room)",
          },
        ],
      },
    ],
  },
  {
    id: "repairs",
    name: "Repairs",
    icon: Wrench,
    services: [
      {
        id: "plumbing",
        name: "Plumbing Services",
        description: "Professional plumbing services including repairs, installations, and maintenance.",
        price: 599,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.6,
        duration: "1-2 hours",
        type: "Standard",
        addons: [
          {
            id: "tap-replacement",
            name: "Tap Replacement",
            price: 399,
            description: "Replace old tap with new one (tap not included)",
          },
          {
            id: "pipe-repair",
            name: "Pipe Repair",
            price: 499,
            description: "Fix leaking or damaged pipes",
          },
        ],
      },
      {
        id: "electrical",
        name: "Electrical Services",
        description: "Professional electrical services including repairs, installations, and maintenance.",
        price: 699,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.7,
        duration: "1-2 hours",
        type: "Standard",
        addons: [
          {
            id: "switch-repair",
            name: "Switch/Socket Repair",
            price: 299,
            description: "Repair or replace switches or sockets",
          },
          {
            id: "fan-repair",
            name: "Fan Repair",
            price: 399,
            description: "Repair ceiling or wall fans",
          },
        ],
      },
    ],
  },
  {
    id: "salon",
    name: "Salon",
    icon: Scissors,
    services: [
      {
        id: "haircut-men",
        name: "Men's Haircut",
        description: "Professional haircut service for men by experienced stylists.",
        price: 299,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.8,
        duration: "30-45 min",
        type: "Standard",
        addons: [
          {
            id: "beard-trim",
            name: "Beard Trim",
            price: 149,
            description: "Professional beard trimming and styling",
          },
          {
            id: "hair-color-men",
            name: "Hair Color",
            price: 699,
            description: "Professional hair coloring (color included)",
          },
        ],
      },
      {
        id: "haircut-women",
        name: "Women's Haircut",
        description: "Professional haircut service for women by experienced stylists.",
        price: 499,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.7,
        duration: "45-60 min",
        type: "Premium",
        addons: [
          {
            id: "hair-spa",
            name: "Hair Spa",
            price: 999,
            description: "Rejuvenating hair spa treatment",
          },
          {
            id: "hair-color-women",
            name: "Hair Color",
            price: 1499,
            description: "Professional hair coloring (color included)",
          },
        ],
      },
    ],
  },
  {
    id: "laundry",
    name: "Laundry",
    icon: Shirt,
    services: [
      {
        id: "wash-iron",
        name: "Wash & Iron",
        description: "Professional washing and ironing service for your clothes.",
        price: 499,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.6,
        duration: "24 hours",
        type: "Standard",
        addons: [
          {
            id: "dry-clean",
            name: "Dry Cleaning",
            price: 799,
            description: "Professional dry cleaning for special garments",
          },
          {
            id: "stain-removal",
            name: "Stain Removal",
            price: 299,
            description: "Special treatment for tough stains",
          },
        ],
      },
    ],
  },
  {
    id: "food",
    name: "Food",
    icon: Utensils,
    services: [
      {
        id: "meal-subscription",
        name: "Weekly Meal Plan",
        description: "Healthy and delicious meals delivered to your doorstep daily.",
        price: 3999,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.5,
        duration: "7 days",
        type: "Subscription",
        addons: [
          {
            id: "diet-plan",
            name: "Custom Diet Plan",
            price: 999,
            description: "Personalized diet plan by nutritionist",
          },
          {
            id: "weekend-special",
            name: "Weekend Special Meals",
            price: 799,
            description: "Premium meals for weekends",
          },
        ],
      },
    ],
  },
  {
    id: "tech",
    name: "Tech",
    icon: Laptop,
    services: [
      {
        id: "computer-repair",
        name: "Computer Repair",
        description: "Professional computer and laptop repair services.",
        price: 799,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.7,
        duration: "1-2 hours",
        type: "Standard",
        addons: [
          {
            id: "virus-removal",
            name: "Virus Removal",
            price: 499,
            description: "Complete virus and malware removal",
          },
          {
            id: "data-recovery",
            name: "Data Recovery",
            price: 1499,
            description: "Recover data from damaged storage",
          },
        ],
      },
    ],
  },
  {
    id: "auto",
    name: "Auto",
    icon: Car,
    services: [
      {
        id: "car-wash",
        name: "Car Wash",
        description: "Professional car washing and cleaning service.",
        price: 599,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.6,
        duration: "45-60 min",
        type: "Standard",
        addons: [
          {
            id: "interior-cleaning",
            name: "Interior Cleaning",
            price: 499,
            description: "Deep cleaning of car interior",
          },
          {
            id: "polish-wax",
            name: "Polish & Wax",
            price: 999,
            description: "Professional polishing and waxing",
          },
        ],
      },
    ],
  },
]
