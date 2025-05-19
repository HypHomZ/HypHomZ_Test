import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Linkedin, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  { name: "Salon for Women", href: "/services/salon-women" },
  { name: "Hair Services for Men", href: "/services/hair-men" },
  { name: "Spa for Women", href: "/services/spa-women" },
  { name: "House Cleaning", href: "/services/cleaning" },
  { name: "AC Service & Repair", href: "/services/ac-repair" },
  { name: "Appliance Repair", href: "/services/appliance-repair" },
  { name: "Painting Services", href: "/services/painting" },
  { name: "Electrician", href: "/services/electrician" },
  { name: "Plumbing", href: "/services/plumbing" },
  { name: "Carpentry", href: "/services/carpentry" },
]

const company = [
  { name: "About Us", href: "/about" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact" },
  { name: "Blog", href: "/blog" },
  { name: "Services", href: "/services" },
  { name: "How It Works", href: "/how-it-works" },
]

const cities = [
  { name: "Mumbai", href: "/city/mumbai" },
  { name: "Delhi NCR", href: "/city/delhi-ncr" },
  { name: "Bangalore", href: "/city/bangalore" },
  { name: "Hyderabad", href: "/city/hyderabad" },
  { name: "Chennai", href: "/city/chennai" },
  { name: "Pune", href: "/city/pune" },
  { name: "Kolkata", href: "/city/kolkata" },
  { name: "Ahmedabad", href: "/city/ahmedabad" },
  { name: "Jaipur", href: "/city/jaipur" },
  { name: "Chandigarh", href: "/city/chandigarh" },
]

export default function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* App Download Section */}
        <div className="mb-12 p-6 bg-primary/10 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Download the HypHomZ App</h3>
              <p className="mb-6">
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
            <div className="hidden md:flex justify-end">
              <div className="relative w-40 h-80">
                <Image
                  src="/placeholder.svg?height=320&width=160"
                  alt="HypHomZ Mobile App"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="HypHomZ Logo" width={150} height={50} className="h-10 w-auto" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your one-stop solution for all home services including salon, cleaning, repairs, and more.
            </p>
            <div className="mt-6 flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Link href="https://www.instagram.com/hyphomz/">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link href={service.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-sm font-medium text-primary hover:underline">
                  View All Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Serving In</h3>
            <ul className="space-y-2">
              {cities.map((city, index) => (
                <li key={index}>
                  <Link href={city.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} HypHomZ. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/sitemap" className="text-sm text-muted-foreground hover:text-foreground">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
