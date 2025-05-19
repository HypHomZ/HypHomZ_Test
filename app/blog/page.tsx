import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, ArrowRight, ArrowLeft } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "How to Prepare Your Home for Professional Cleaning",
    excerpt: "Learn how to get the most out of your professional cleaning service with these simple preparation tips.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 15, 2023",
    author: "Sarah Johnson",
    category: "Cleaning",
    slug: "prepare-home-cleaning",
  },
  {
    id: 2,
    title: "5 Signs Your AC Needs Professional Attention",
    excerpt:
      "Don't wait until your AC breaks down completely. Look out for these warning signs that indicate it's time for a service.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 22, 2023",
    author: "Michael Chen",
    category: "Repair",
    slug: "ac-repair-signs",
  },
  {
    id: 3,
    title: "Salon vs. Home Beauty Services: Which is Right for You?",
    excerpt:
      "Compare the pros and cons of traditional salon visits versus at-home beauty services to make the best choice for your lifestyle.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    image: "/placeholder.svg?height=400&width=600",
    date: "June 10, 2023",
    author: "Emily Rodriguez",
    category: "Beauty",
    slug: "salon-vs-home-beauty",
  },
  {
    id: 4,
    title: "The Ultimate Guide to Home Plumbing Maintenance",
    excerpt: "Prevent costly plumbing emergencies with these essential maintenance tips every homeowner should know.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    image: "/placeholder.svg?height=400&width=600",
    date: "July 5, 2023",
    author: "David Wilson",
    category: "Maintenance",
    slug: "plumbing-maintenance-guide",
  },
  {
    id: 5,
    title: "How to Choose the Right Paint Colors for Your Home",
    excerpt: "Transform your living space with these expert tips on selecting the perfect paint colors for each room.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    image: "/placeholder.svg?height=400&width=600",
    date: "August 18, 2023",
    author: "Jessica Lee",
    category: "Home Improvement",
    slug: "choosing-paint-colors",
  },
  {
    id: 6,
    title: "The Benefits of Regular Appliance Maintenance",
    excerpt: "Extend the life of your home appliances and save money with these essential maintenance routines.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    image: "/placeholder.svg?height=400&width=600",
    date: "September 3, 2023",
    author: "Robert Brown",
    category: "Maintenance",
    slug: "appliance-maintenance-benefits",
  },
]

const categories = ["All", "Cleaning", "Repair", "Beauty", "Maintenance", "Home Improvement", "Gardening", "Technology"]

export default function BlogPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/20 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4" variant="outline">
              Our Blog
            </Badge>
            <h1 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Home Service <span className="text-primary">Insights</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
              Expert tips, guides, and advice to help you maintain your home and make informed decisions about home
              services.
            </p>

            <div className="max-w-2xl mx-auto relative mb-8">
              <div className="flex">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    className="pl-10 pr-4 py-6 rounded-l-md rounded-r-none border-r-0"
                  />
                </div>
                <Button className="rounded-l-none px-6">Search</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button key={category} variant={category === "All" ? "default" : "outline"} size="sm">
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src={blogPosts[0].image || "/placeholder.svg"}
                alt={blogPosts[0].title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <Badge className="mb-2">{blogPosts[0].category}</Badge>
              <h2 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
              <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{blogPosts[0].date}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{blogPosts[0].author}</span>
                </div>
              </div>
              <Button asChild>
                <Link href={`/blog/${blogPosts[0].slug}`}>Read More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge>{post.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{post.author}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-primary flex items-center hover:underline">
                    Read more <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="default" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <span className="mx-2">...</span>
              <Button variant="outline" size="sm">
                10
              </Button>
              <Button variant="outline" size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary/10 p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Stay updated with the latest home service tips, exclusive offers, and expert advice delivered straight to
              your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="Your email address" className="py-6" />
              <Button size="lg">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
