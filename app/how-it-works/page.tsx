import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    id: 1,
    title: "Choose a Service",
    description: "Browse through our wide range of services and select the one you need.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "Book an Appointment",
    description: "Select a convenient date and time for the service.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "Professional Arrives",
    description: "Our verified professional will arrive at your doorstep at the scheduled time.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    title: "Enjoy Quality Service",
    description: "Sit back and relax while our professional takes care of your needs.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    title: "Payment & Feedback",
    description: "Pay securely through our platform and share your feedback about the service.",
    image: "/placeholder.svg?height=300&width=400",
  },
]

const benefits = [
  "Verified and trained professionals",
  "Transparent pricing with no hidden fees",
  "Secure online payment options",
  "100% satisfaction guarantee",
  "24/7 customer support",
  "Flexible scheduling options",
  "Quality service assurance",
  "Insured service providers",
]

export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/20 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4" variant="outline">
              How It Works
            </Badge>
            <h1 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Simple, <span className="text-primary">Reliable</span> Process
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
              Book a service in just a few simple steps and get it delivered at your doorstep.
            </p>
            <Button size="lg">Book a Service Now</Button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.id} className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">
                      {step.id}
                    </div>
                    <h2 className="text-2xl font-bold">{step.title}</h2>
                  </div>
                  <p className="text-muted-foreground mb-6 max-w-md">{step.description}</p>
                  {step.id === 1 && (
                    <Button variant="outline" className="gap-2" asChild>
                      <Link href="/services">
                        View Services <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {step.id === 2 && (
                    <Button variant="outline" className="gap-2" asChild>
                      <Link href="/booking">
                        Book Now <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <Image
                    src={step.image || "/placeholder.svg"}
                    alt={step.title}
                    width={400}
                    height={300}
                    className="rounded-lg shadow-lg mx-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              Benefits
            </Badge>
            <h2 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              Why Choose <span className="text-primary">HypHomZ</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              We strive to provide the best home services experience with numerous benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6 flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                  <p className="font-medium">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              FAQ
            </Badge>
            <h2 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Find answers to common questions about our services.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-2">How do I book a service?</h3>
              <p className="text-muted-foreground">
                You can book a service through our website or mobile app. Simply select the service you need, choose a
                date and time, and provide your address. Our professional will arrive at the scheduled time.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-2">What if I'm not satisfied with the service?</h3>
              <p className="text-muted-foreground">
                We offer a 100% satisfaction guarantee. If you're not satisfied with the service, you can contact our
                customer support team, and we'll either send a professional to redo the service or provide a refund.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-2">How are your professionals vetted?</h3>
              <p className="text-muted-foreground">
                All our professionals undergo a rigorous vetting process, including background checks, skill
                assessments, and training. We only work with the best professionals in the industry.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-2">Can I reschedule or cancel a booking?</h3>
              <p className="text-muted-foreground">
                Yes, you can reschedule or cancel a booking through your account. We request that you do so at least 24
                hours before the scheduled service to avoid any cancellation fees.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, debit cards, and digital wallets. Payment is processed securely
                through our platform after the service is completed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-card p-8 md:p-12 shadow-sm border text-center">
            <h2 className="font-playfair text-3xl font-bold tracking-tight md:text-4xl mb-4">
              Ready to experience hassle-free home services?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground mb-8">
              Join thousands of satisfied customers who have simplified their lives with HypHomZ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Book a Service Now</Button>
              <Button size="lg" variant="outline">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
