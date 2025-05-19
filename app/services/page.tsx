import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShowerHead,
  Wrench,
  Briefcase,
  Shirt,
  Utensils,
  Paintbrush,
  Hammer,
  Plug,
  Car,
  Leaf,
  Sofa,
  Wifi,
  Search,
  Filter,
} from "lucide-react"

const services = [
  {
    id: 1,
    name: "Cleaning Services",
    description: "Professional home cleaning services for a spotless environment.",
    icon: <ShowerHead className="h-10 w-10 text-primary" />,
    href: "/services/cleaning",
    category: "cleaning",
  },
  {
    id: 2,
    name: "Repair & Maintenance",
    description: "Expert repair and maintenance for all your home needs.",
    icon: <Wrench className="h-10 w-10 text-primary" />,
    href: "/services/repair",
    category: "repair",
  },
  {
    id: 3,
    name: "Maid Services",
    description: "Reliable maid services for daily or weekly household tasks.",
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    href: "/services/maid",
    category: "cleaning",
  },
  {
    id: 4,
    name: "Laundry Services",
    description: "Professional laundry services with pickup and delivery options.",
    icon: <Shirt className="h-10 w-10 text-primary" />,
    href: "/services/laundry",
    category: "cleaning",
  },
  {
    id: 5,
    name: "Meal Preparation",
    description: "Delicious meal preparation services by professional chefs.",
    icon: <Utensils className="h-10 w-10 text-primary" />,
    href: "/services/meal",
    category: "food",
  },
  {
    id: 6,
    name: "Installation Services",
    description: "Professional installation services for appliances and fixtures.",
    icon: <Paintbrush className="h-10 w-10 text-primary" />,
    href: "/services/installation",
    category: "installation",
  },
  {
    id: 7,
    name: "Carpentry",
    description: "Custom carpentry and woodworking services for your home.",
    icon: <Hammer className="h-10 w-10 text-primary" />,
    href: "/services/carpentry",
    category: "repair",
  },
  {
    id: 8,
    name: "Electrical Services",
    description: "Professional electrical services for all your home needs.",
    icon: <Plug className="h-10 w-10 text-primary" />,
    href: "/services/electrical",
    category: "repair",
  },
  {
    id: 9,
    name: "Car Washing",
    description: "Professional car washing and detailing services.",
    icon: <Car className="h-10 w-10 text-primary" />,
    href: "/services/car-washing",
    category: "cleaning",
  },
  {
    id: 10,
    name: "Gardening",
    description: "Professional gardening and landscaping services.",
    icon: <Leaf className="h-10 w-10 text-primary" />,
    href: "/services/gardening",
    category: "outdoor",
  },
  {
    id: 11,
    name: "Furniture Assembly",
    description: "Expert furniture assembly services for your home.",
    icon: <Sofa className="h-10 w-10 text-primary" />,
    href: "/services/furniture",
    category: "installation",
  },
  {
    id: 12,
    name: "Internet Setup",
    description: "Professional internet and WiFi setup services.",
    icon: <Wifi className="h-10 w-10 text-primary" />,
    href: "/services/internet",
    category: "tech",
  },
]

const popularServices = [
  {
    id: 1,
    name: "Salon for Women",
    image: "/placeholder.svg?height=240&width=240",
    href: "/services/salon-women",
    category: "beauty",
  },
  {
    id: 2,
    name: "Hair Services for Men",
    image: "/placeholder.svg?height=240&width=240",
    href: "/services/hair-men",
    category: "beauty",
  },
  {
    id: 3,
    name: "Spa for Women",
    image: "/placeholder.svg?height=240&width=240",
    href: "/services/spa-women",
    category: "beauty",
  },
  {
    id: 4,
    name: "House Cleaning",
    image: "/placeholder.svg?height=240&width=240",
    href: "/services/cleaning",
    category: "cleaning",
  },
]

const categories = [
  { id: "all", name: "All Services" },
  { id: "cleaning", name: "Cleaning" },
  { id: "repair", name: "Repair" },
  { id: "beauty", name: "Beauty & Spa" },
  { id: "installation", name: "Installation" },
  { id: "tech", name: "Tech" },
  { id: "outdoor", name: "Outdoor" },
  { id: "food", name: "Food" },
]

export default function ServicesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/20 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4" variant="outline">
              Our Services
            </Badge>
            <h1 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Professional <span className="text-primary">Home Services</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
              Browse through our wide range of professional home services designed to make your life easier.
            </p>

            <div className="max-w-2xl mx-auto relative mb-8">
              <div className="flex">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for services..."
                    className="pl-10 pr-4 py-6 rounded-l-md rounded-r-none border-r-0"
                  />
                </div>
                <Button className="rounded-l-none px-6">Search</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-8">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-sm">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {(category.id === "all"
                    ? services
                    : services.filter((service) => service.category === category.id)
                  ).map((service) => (
                    <Card
                      key={service.id}
                      className="service-card h-full overflow-hidden transition-all hover:shadow-lg"
                    >
                      <CardContent className="p-6">
                        <div className="mb-4">{service.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                        <p className="text-muted-foreground mb-4">{service.description}</p>
                        <Link href={service.href}>
                          <Button variant="outline" className="w-full">
                            Learn More
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Most Popular Services</h2>
            <p className="text-muted-foreground">Our most booked services by customers like you</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {popularServices.map((service) => (
              <Link key={service.id} href={service.href}>
                <div className="flex flex-col items-center group">
                  <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-xl">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-center font-medium">{service.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-card p-8 md:p-12 shadow-sm border">
            <div className="text-center">
              <h2 className="font-playfair text-3xl font-bold tracking-tight md:text-4xl mb-4">
                Can't find what you're looking for?
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground mb-8">
                We offer a wide range of services beyond what's listed. Contact us for custom service requests.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">Contact Us</Button>
                <Button size="lg" variant="outline">
                  Request a Custom Service
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
