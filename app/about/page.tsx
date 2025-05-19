import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Award, Heart } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "John Smith",
    role: "CEO & Founder",
    bio: "John has over 15 years of experience in the home services industry and founded HypHomZ with a vision to revolutionize how people access home services.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Chief Operations Officer",
    bio: "Sarah oversees all operations at HypHomZ, ensuring that our service providers deliver exceptional quality and customer satisfaction.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Chief Technology Officer",
    bio: "Michael leads our technology team, developing innovative solutions to make booking and managing home services seamless and efficient.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Customer Experience Director",
    bio: "Emily is dedicated to ensuring that every customer has an exceptional experience with HypHomZ from booking to service completion.",
    image: "/placeholder.svg?height=300&width=300",
  },
]

const milestones = [
  {
    year: "2018",
    title: "Company Founded",
    description: "HypHomZ was founded with a mission to revolutionize the home services industry.",
  },
  {
    year: "2019",
    title: "Expanded Service Offerings",
    description: "Added multiple new service categories to meet growing customer demands.",
  },
  {
    year: "2020",
    title: "Mobile App Launch",
    description: "Launched our mobile app for iOS and Android, making service booking even more convenient.",
  },
  {
    year: "2021",
    title: "Reached 10,000 Customers",
    description: "Celebrated serving our 10,000th customer with exceptional satisfaction rates.",
  },
  {
    year: "2022",
    title: "Expanded to New Cities",
    description: "Expanded our operations to 10 major cities across the country.",
  },
  {
    year: "2023",
    title: "Quality Certification",
    description: "Received industry certification for our quality management system.",
  },
]

const values = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Customer First",
    description: "We prioritize our customers' needs and satisfaction above all else.",
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "Quality Excellence",
    description: "We are committed to delivering the highest quality services without compromise.",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Integrity",
    description: "We operate with honesty, transparency, and ethical business practices.",
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: "Community Impact",
    description: "We strive to make a positive impact in the communities we serve.",
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/20 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4" variant="outline">
              About Us
            </Badge>
            <h1 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Your Concern's <span className="text-primary">One Stop</span> Solution
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
              Learn about our journey, mission, and the team behind HypHomZ that's revolutionizing the home services
              industry.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <div>
              <Badge className="mb-4" variant="outline">
                Our Story
              </Badge>
              <h2 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                How <span className="text-primary">HypHomZ</span> Began
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  HypHomZ was founded in 2018 with a simple yet powerful vision: to simplify everyday life by providing
                  reliable, high-quality, and on-demand home services at the tap of a button.
                </p>
                <p>
                  Our founder, John Smith, experienced firsthand the challenges of finding reliable home service
                  providers. After a series of disappointing experiences, he decided to create a platform that would
                  connect customers with verified professionals, ensuring convenience, affordability, and trust through
                  a seamless digital experience.
                </p>
                <p>
                  What started as a small team of passionate individuals has now grown into a thriving company serving
                  thousands of customers across multiple cities. Our commitment to quality, reliability, and customer
                  satisfaction remains at the core of everything we do.
                </p>
              </div>
              <div className="mt-8">
                <Button asChild>
                  <a href="/services">Explore Our Services</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-primary/30 animate-pulse" />
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary/20 animate-pulse delay-300" />
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Our Story"
                width={500}
                height={500}
                className="relative z-10 rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="bg-card p-8 rounded-xl shadow-sm border">
              <Badge className="mb-4" variant="outline">
                Our Mission
              </Badge>
              <h2 className="font-playfair text-3xl font-bold tracking-tight mb-6">
                What We <span className="text-primary">Strive For</span>
              </h2>
              <p className="text-muted-foreground">
                Our mission is to transform the home services industry by creating a platform that seamlessly connects
                customers with skilled professionals. We aim to provide convenient, reliable, and high-quality services
                that improve people's lives and homes, while also creating meaningful employment opportunities for
                service providers in the communities we serve.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-sm border">
              <Badge className="mb-4" variant="outline">
                Our Vision
              </Badge>
              <h2 className="font-playfair text-3xl font-bold tracking-tight mb-6">
                Where We're <span className="text-primary">Headed</span>
              </h2>
              <p className="text-muted-foreground">
                We envision a world where accessing quality home services is as easy as ordering a meal or booking a
                ride. Our vision is to become the global leader in on-demand home services, known for our exceptional
                quality, reliability, and customer satisfaction. We strive to continuously innovate and expand our
                offerings to meet the evolving needs of our customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              Our Values
            </Badge>
            <h2 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              What <span className="text-primary">Drives</span> Us
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Our core values guide every decision we make and every service we provide.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              Our Team
            </Badge>
            <h2 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              Meet the <span className="text-primary">People</span> Behind HypHomZ
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Our dedicated team of professionals is committed to providing you with the best home services experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <Card key={member.id} className="h-full overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              Our Journey
            </Badge>
            <h2 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              Key <span className="text-primary">Milestones</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Our journey from a small startup to a leading home services provider.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-primary/20 hidden md:block"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div
                    className={`${index % 2 === 0 ? "md:text-right" : ""} ${index % 2 === 1 ? "md:col-start-2" : ""}`}
                  >
                    <div
                      className={`md:absolute ${
                        index % 2 === 0 ? "md:right-0 md:translate-x-1/2" : "md:left-0 md:-translate-x-1/2"
                      } md:top-0 z-10 mx-auto md:mx-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg`}
                    >
                      {milestone.year}
                    </div>
                    <div className="rounded-lg p-6 shadow-sm border mt-8 md:mt-0">
                      <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  {index % 2 === 0 ? <div></div> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-card p-8 md:p-12 shadow-sm border text-center">
            <h2 className="font-playfair text-3xl font-bold tracking-tight md:text-4xl mb-4">
              Join the HypHomZ Family Today
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground mb-8">
              Experience the difference with our professional home services. Book a service today or join our team of
              service providers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/booking">Book a Service</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/careers">Join Our Team</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
