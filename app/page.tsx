"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Star, CheckCircle, ArrowRight, Download, Users } from "lucide-react"
import SearchBar from "@/components/search-bar"

const popularServices = [
  {
    id: 1,
    name: "Salon for Women",
    image: "https://i.postimg.cc/nL6K1pTg/women-salon.jpg",
    href: "/services/salon-women",
  },
  {
    id: 2,
    name: "Hair Services for Men",
    image: "https://i.postimg.cc/qvDxz8Kk/salon-service.webp",
    href: "/services/hair-men",
  },
  {
    id: 3,
    name: "Spa for Women",
    image: "https://i.postimg.cc/tJzhyPyG/Spa-Course470-thumbs-500-X500.jpg",
    href: "/services/spa-women",
  },
  {
    id: 4,
    name: "House Cleaning",
    image: "/placeholder.svg?height=240&width=240",
    href: "/services/cleaning",
  },
  {
    id: 5,
    name: "AC Service & Repair",
    image: "/placeholder.svg?height=240&width=240",
    href: "/services/ac-repair",
  },
  {
    id: 6,
    name: "Appliance Repair",
    image: "/placeholder.svg?height=240&width=240",
    href: "/services/appliance-repair",
  },
  {
    id: 7,
    name: "Painting Services",
    image: "/placeholder.svg?height=240&width=240",
    href: "/services/painting",
  },
  {
    id: 8,
    name: "Electrician",
    image: "/placeholder.svg?height=240&width=240",
    href: "/services/electrician",
  },
]

const homeServices = [
  {
    id: 1,
    name: "Salon, Spa & Massage",
    image: "/placeholder.svg?height=300&width=300",
    href: "/services/salon-spa",
  },
  {
    id: 2,
    name: "Cleaning & Pest Control",
    image: "/placeholder.svg?height=300&width=300",
    href: "/services/cleaning-pest",
  },
  {
    id: 3,
    name: "AC & Appliance Repair",
    image: "/placeholder.svg?height=300&width=300",
    href: "/services/appliance-repair",
  },
  {
    id: 4,
    name: "Plumbers & Carpenters",
    image: "/placeholder.svg?height=300&width=300",
    href: "/services/plumbing-carpentry",
  },
  {
    id: 5,
    name: "Electricians",
    image: "/placeholder.svg?height=300&width=300",
    href: "/services/electricians",
  },
  {
    id: 6,
    name: "Home Painting",
    image: "/placeholder.svg?height=300&width=300",
    href: "/services/painting",
  },
]

const cities = [
  "Mumbai",
  "Delhi NCR",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh",
]

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    content:
      "HypHomZ has been a lifesaver! Their cleaning service is thorough and their staff is always professional. I've recommended them to all my friends.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Apartment Resident",
    content:
      "I've used their repair services multiple times and have always been impressed with the quality of work. The technicians are knowledgeable and efficient.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Working Professional",
    content:
      "The salon at home service has changed my life! Professional stylists come right to my door. Worth every penny.",
    rating: 4,
    image: "/placeholder.svg?height=60&width=60",
  },
]

const blogPosts = [
  {
    id: 1,
    title: "How to Prepare Your Home for Professional Cleaning",
    excerpt: "Learn how to get the most out of your professional cleaning service with these simple preparation tips.",
    image: "/placeholder.svg?height=200&width=350",
    href: "/blog/prepare-home-cleaning",
  },
  {
    id: 2,
    title: "5 Signs Your AC Needs Professional Attention",
    excerpt:
      "Don't wait until your AC breaks down completely. Look out for these warning signs that indicate it's time for a service.",
    image: "/placeholder.svg?height=200&width=350",
    href: "/blog/ac-repair-signs",
  },
  {
    id: 3,
    title: "Salon vs. Home Beauty Services: Which is Right for You?",
    excerpt:
      "Compare the pros and cons of traditional salon visits versus at-home beauty services to make the best choice for your lifestyle.",
    image: "/placeholder.svg?height=200&width=350",
    href: "/blog/salon-vs-home-beauty",
  },
]

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCity, setSelectedCity] = useState("Mumbai")
  const [showCityDropdown, setShowCityDropdown] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 items-center">
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center md:text-left"
            >
              <h1 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                Home services, on demand
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
                Quality home services, delivered to your doorstep at affordable prices
              </p>

              <div className="relative max-w-md mx-auto md:mx-0 mb-8">
                <SearchBar placeholder="Search for services" className="w-full" />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="inline-block h-8 w-8 rounded-full bg-primary text-xs flex items-center justify-center border-2 border-background"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold">4,000+</span> happy customers
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-[500px]">
                <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-primary/30 animate-pulse" />
                <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary/20 animate-pulse delay-300" />
                <Image
                  src="https://i.postimg.cc/fyVTZtwC/pngtree-comprehensive-collection-of-construction-tools-for-home-repair-and-building-services-image-1.png"
                  alt="Home Services"
                  width={600}
                  height={600}
                  className="relative z-10 rounded-2xl shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Services</h2>
            <p className="text-muted-foreground">Most booked services by our customers</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
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

      {/* Home Services Categories */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Home Services</h2>
            <p className="text-muted-foreground">Services to make your home life better</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {homeServices.map((service) => (
              <Link key={service.id} href={service.href}>
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className="relative w-full h-48">
                    <Image src={service.image || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{service.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Download the HypHomZ App</h2>
              <p className="text-lg mb-6">
                Get home services at your fingertips. Book services, track your provider, and pay securely - all in one
                app.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex items-center gap-2 bg-black text-white hover:bg-black/80">
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </Button>
                <Button className="flex items-center gap-2 bg-black text-white hover:bg-black/80">
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px]">
              <div className="absolute top-0 right-0 w-3/4 h-full">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="HypHomZ Mobile App"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-3/4 h-full">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="HypHomZ Mobile App"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">Book services in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative mx-auto w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Search className="h-10 w-10 text-primary" />
                <div className="absolute -right-4 -top-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Search Service</h3>
              <p className="text-muted-foreground">Find the service you need from our wide range of offerings</p>
            </div>

            <div className="text-center">
              <div className="relative mx-auto w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Users className="h-10 w-10 text-primary" />
                <div className="absolute -right-4 -top-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Book Professional</h3>
              <p className="text-muted-foreground">Select a time slot that works for you and book instantly</p>
            </div>

            <div className="text-center">
              <div className="relative mx-auto w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-primary" />
                <div className="absolute -right-4 -top-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Service Done</h3>
              <p className="text-muted-foreground">
                Our professional will arrive at your doorstep at the scheduled time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground">Trusted by thousands of customers across the country</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="h-full">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "text-primary fill-primary" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">From Our Blog</h2>
            <Link href="/blog" className="text-primary flex items-center hover:underline">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="relative w-full h-48">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                  <Link href={post.href} className="text-primary flex items-center hover:underline">
                    Read more <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">We're Available In</h2>
            <p className="text-muted-foreground">Serving customers across major cities in India</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {cities.map((city) => (
              <Link key={city} href={`/city/${city.toLowerCase().replace(" ", "-")}`}>
                <div className="bg-background rounded-lg p-4 text-center hover:shadow-md transition-shadow">{city}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary/10 p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Become a Service Professional</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join our network of skilled professionals and grow your business. Enjoy flexible working hours and a
              steady stream of customers.
            </p>
            <Button size="lg" asChild>
              <Link href="/become-provider">Register as Professional</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
