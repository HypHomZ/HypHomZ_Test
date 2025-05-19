import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, ArrowRight, Facebook, Twitter, Linkedin, Mail } from "lucide-react"

// This would normally come from a database or CMS
const blogPost = {
  id: 1,
  title: "How to Prepare Your Home for Professional Cleaning",
  excerpt: "Learn how to get the most out of your professional cleaning service with these simple preparation tips.",
  content: `
    <p>When you book a professional cleaning service, a little preparation can go a long way in ensuring you get the most value from your investment. Professional cleaners are experts at what they do, but they can work more efficiently and effectively if your home is ready for their arrival.</p>
    
    <h2>Clear the Clutter</h2>
    <p>Before your cleaning team arrives, take some time to pick up items from floors and surfaces. This includes toys, clothing, documents, and other personal belongings. Cleaners are there to clean, not to organize your possessions. The less time they spend navigating around or moving your items, the more time they can dedicate to deep cleaning.</p>
    
    <h2>Secure Valuables</h2>
    <p>While reputable cleaning services conduct background checks on their employees, it's always a good practice to secure valuable items and sensitive documents. This protects both you and the cleaning professionals from any potential misunderstandings.</p>
    
    <h2>Identify Problem Areas</h2>
    <p>If there are specific areas or items that need special attention, make a note of them. Whether it's a stubborn stain on the carpet or a particularly dusty bookshelf, pointing these out to your cleaning team ensures they won't be overlooked.</p>
    
    <h2>Prepare Your Pets</h2>
    <p>If you have pets, consider how they might react to strangers in your home. Some pets may be anxious or territorial, which can make the cleaning process challenging. It might be best to keep them in a secure area or arrange for them to be elsewhere during the cleaning service.</p>
    
    <h2>Communicate Special Requirements</h2>
    <p>If you have specific cleaning products you prefer or if certain areas require special care, communicate this clearly. For instance, if you have hardwood floors that need a particular cleaning solution or if you prefer eco-friendly products, let your cleaning service know in advance.</p>
    
    <h2>Provide Access</h2>
    <p>Ensure that the cleaning team has access to all areas they need to clean. This might mean leaving keys with a trusted neighbor if you won't be home or ensuring that all rooms are unlocked.</p>
    
    <h2>Conclusion</h2>
    <p>By taking these simple steps to prepare your home, you can help your professional cleaning service deliver the best possible results. Not only will your home be cleaner, but the process will be more efficient, potentially saving you money in the long run.</p>
  `,
  image: "/placeholder.svg?height=600&width=1200",
  date: "April 15, 2023",
  author: "Sarah Johnson",
  authorImage: "/placeholder.svg?height=100&width=100",
  authorBio:
    "Sarah is a cleaning expert with over 10 years of experience in the home services industry. She shares tips and advice to help homeowners maintain clean and healthy living spaces.",
  category: "Cleaning",
  tags: ["Cleaning", "Home Maintenance", "Professional Services", "Tips"],
  slug: "prepare-home-cleaning",
}

const relatedPosts = [
  {
    id: 2,
    title: "5 Signs Your AC Needs Professional Attention",
    excerpt:
      "Don't wait until your AC breaks down completely. Look out for these warning signs that indicate it's time for a service.",
    image: "/placeholder.svg?height=200&width=300",
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
    image: "/placeholder.svg?height=200&width=300",
    date: "June 10, 2023",
    author: "Emily Rodriguez",
    category: "Beauty",
    slug: "salon-vs-home-beauty",
  },
  {
    id: 4,
    title: "The Ultimate Guide to Home Plumbing Maintenance",
    excerpt: "Prevent costly plumbing emergencies with these essential maintenance tips every homeowner should know.",
    image: "/placeholder.svg?height=200&width=300",
    date: "July 5, 2023",
    author: "David Wilson",
    category: "Maintenance",
    slug: "plumbing-maintenance-guide",
  },
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real application, you would fetch the blog post data based on the slug
  // For this example, we're using static data

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/20 to-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4">{blogPost.category}</Badge>
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 max-w-4xl mx-auto">
              {blogPost.title}
            </h1>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{blogPost.date}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{blogPost.author}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-8">
                <Image src={blogPost.image || "/placeholder.svg"} alt={blogPost.title} fill className="object-cover" />
              </div>

              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.content }} />

              {/* Tags */}
              <div className="mt-12 flex flex-wrap gap-2">
                {blogPost.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Share */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Author */}
              <div className="mt-12 p-6 bg-muted rounded-xl">
                <div className="flex items-center gap-4">
                  <Image
                    src={blogPost.authorImage || "/placeholder.svg"}
                    alt={blogPost.author}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{blogPost.author}</h3>
                    <p className="text-muted-foreground">{blogPost.authorBio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24">
                <h3 className="text-xl font-semibold mb-6">Related Articles</h3>
                <div className="space-y-6">
                  {relatedPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      <div className="relative h-40">
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <Badge className="mb-2">{post.category}</Badge>
                        <h4 className="font-semibold mb-2">{post.title}</h4>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-primary flex items-center text-sm hover:underline"
                        >
                          Read more <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-primary/10 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
                  <p className="text-muted-foreground mb-4">
                    Get the latest home service tips and exclusive offers delivered to your inbox.
                  </p>
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 rounded-md border"
                    />
                    <Button className="w-full">Subscribe</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
