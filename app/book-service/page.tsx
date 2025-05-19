import type { Metadata } from "next"
import BookingInterface from "@/components/booking/booking-interface"

export const metadata: Metadata = {
  title: "Book Professional Home Services | Hyphomz",
  description:
    "Book reliable, high-quality home services including cleaning, repairs, beauty services and more. Choose from our wide range of professional services with transparent pricing.",
  keywords:
    "home services, cleaning services, repair services, beauty services, professional services, book services online",
}

export default function BookServicePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/20 to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Book Professional <span className="text-primary">Home Services</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select from our wide range of professional services with transparent pricing and expert professionals
            </p>
          </div>
        </div>
      </section>

      {/* Main Booking Interface */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <BookingInterface />
        </div>
      </section>
    </div>
  )
}
