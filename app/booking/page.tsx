import { Badge } from "@/components/ui/badge"
import ServiceBookingForm from "@/components/service-booking-form"
import { CheckCircle } from "lucide-react"

export default function BookingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/20 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4" variant="outline">
              Book a Service
            </Badge>
            <h1 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Schedule Your <span className="text-primary">Home Service</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
              Fill out the form below to book a service. Our professional will arrive at your doorstep at the scheduled
              time.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold mb-6">Book Your Service</h2>
              <p className="text-muted-foreground mb-8">
                Please provide your details and service requirements. We'll confirm your booking and assign a
                professional shortly.
              </p>
              <ServiceBookingForm />
            </div>
            <div className="bg-muted p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-6">Why Book With Us</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Verified Professionals</h3>
                    <p className="text-muted-foreground">
                      All our service providers are thoroughly vetted and trained.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Transparent Pricing</h3>
                    <p className="text-muted-foreground">
                      No hidden fees or surprise charges. Pay only for what you book.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Satisfaction Guarantee</h3>
                    <p className="text-muted-foreground">Not satisfied? We'll redo the service or provide a refund.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Flexible Scheduling</h3>
                    <p className="text-muted-foreground">
                      Choose a time that works for you, including evenings and weekends.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Insured Services</h3>
                    <p className="text-muted-foreground">All our services are fully insured for your peace of mind.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              FAQ
            </Badge>
            <h2 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Find answers to common questions about booking our services.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            <div className="rounded-lg border p-6 bg-card">
              <h3 className="text-lg font-semibold mb-2">How soon can I get a service?</h3>
              <p className="text-muted-foreground">
                Depending on availability, we can often schedule services within 24-48 hours. For emergency services, we
                offer same-day appointments when possible.
              </p>
            </div>
            <div className="rounded-lg border p-6 bg-card">
              <h3 className="text-lg font-semibold mb-2">What if I need to reschedule?</h3>
              <p className="text-muted-foreground">
                You can reschedule your appointment up to 24 hours before the scheduled time without any penalty. Simply
                log into your account or call our customer service.
              </p>
            </div>
            <div className="rounded-lg border p-6 bg-card">
              <h3 className="text-lg font-semibold mb-2">How are your prices determined?</h3>
              <p className="text-muted-foreground">
                Our prices are based on the type of service, the scope of work, and the estimated time required. We
                provide transparent pricing before you confirm your booking.
              </p>
            </div>
            <div className="rounded-lg border p-6 bg-card">
              <h3 className="text-lg font-semibold mb-2">Do I need to provide any supplies or equipment?</h3>
              <p className="text-muted-foreground">
                No, our professionals bring all necessary supplies and equipment. If specific materials are required for
                your job, we'll discuss this with you beforehand.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
