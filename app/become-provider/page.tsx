import { Badge } from "@/components/ui/badge"
import ProviderApplicationForm from "@/components/provider-application-form"
import { CheckCircle } from "lucide-react"

export default function BecomeProviderPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/20 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4" variant="outline">
              Join Our Team
            </Badge>
            <h1 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Become a <span className="text-primary">Service Provider</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
              Join our network of professional service providers and grow your business while helping customers with
              their home service needs.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <ProviderApplicationForm />
            </div>
            <div className="bg-muted p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-6">Why Join HypHomZ?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Steady Income</h3>
                    <p className="text-muted-foreground">
                      Access a steady stream of customers and jobs through our platform.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Flexible Schedule</h3>
                    <p className="text-muted-foreground">
                      Choose your own hours and work when it's convenient for you.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Professional Growth</h3>
                    <p className="text-muted-foreground">
                      Access training resources and improve your skills with our support.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">No Marketing Costs</h3>
                    <p className="text-muted-foreground">
                      We handle marketing and customer acquisition, so you can focus on your work.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Secure Payments</h3>
                    <p className="text-muted-foreground">
                      Get paid securely and on time through our platform, with no payment chasing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h3 className="font-semibold text-lg mb-2">Requirements</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Relevant experience or qualifications in your service area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Valid ID and proof of address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Professional equipment and tools (depending on service)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Smartphone with internet access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Reliable transportation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Excellent customer service skills</span>
                  </li>
                </ul>
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
              Find answers to common questions about becoming a service provider with HypHomZ.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            <div className="rounded-lg border p-6 bg-card">
              <h3 className="text-lg font-semibold mb-2">How do I get paid?</h3>
              <p className="text-muted-foreground">
                Payments are processed through our secure platform. You'll receive payments directly to your bank
                account on a weekly basis for all completed jobs.
              </p>
            </div>
            <div className="rounded-lg border p-6 bg-card">
              <h3 className="text-lg font-semibold mb-2">How much can I earn?</h3>
              <p className="text-muted-foreground">
                Earnings vary based on your services, experience, and how many hours you work. Top providers on our
                platform earn between $1,000 to $5,000 per month.
              </p>
            </div>
            <div className="rounded-lg border p-6 bg-card">
              <h3 className="text-lg font-semibold mb-2">What happens after I apply?</h3>
              <p className="text-muted-foreground">
                After submitting your application, our team will review it within 3-5 business days. If approved, you'll
                be invited for an interview and orientation session before you can start accepting jobs.
              </p>
            </div>
            <div className="rounded-lg border p-6 bg-card">
              <h3 className="text-lg font-semibold mb-2">Do I need insurance?</h3>
              <p className="text-muted-foreground">
                While not required to apply, having liability insurance is recommended. We offer group insurance options
                for our providers at discounted rates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
