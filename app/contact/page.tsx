"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 1500)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/20 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4" variant="outline">
              Get In Touch
            </Badge>
            <h1 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
              Have questions or need assistance? We're here to help. Reach out to our team for prompt support.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Our Location</h3>
                <p className="text-muted-foreground">123 Main Street, City, Country, 12345</p>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Phone Number</h3>
                <p className="text-muted-foreground">+1 (123) 456-7890</p>
                <p className="text-muted-foreground">+1 (987) 654-3210</p>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email Address</h3>
                <p className="text-muted-foreground">info@hyphomz.com</p>
                <p className="text-muted-foreground">support@hyphomz.com</p>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Working Hours</h3>
                <p className="text-muted-foreground">Monday - Friday: 9AM - 6PM</p>
                <p className="text-muted-foreground">Saturday: 10AM - 4PM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>

              {submitted ? (
                <Card className="bg-primary/10 border-primary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                    <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                    <Button className="mt-4" onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter subject"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message"
                      className="min-h-[150px]"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"} {!loading && <Send className="h-4 w-4" />}
                  </Button>
                </form>
              )}
            </div>

            <div className="flex flex-col">
              <h2 className="text-3xl font-bold mb-6">Our Location</h2>
              <p className="text-muted-foreground mb-8">
                Visit our office or service center. We're conveniently located in the heart of the city.
              </p>
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596552044!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1619427748449!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="HypHomZ Location"
                ></iframe>
              </div>
            </div>
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
            <h2 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Find answers to common questions about contacting us and our support services.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-2">What is your response time for inquiries?</h3>
              <p className="text-muted-foreground">
                We typically respond to all inquiries within 24 hours during business days. For urgent matters, we
                recommend calling our customer support line.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-2">How can I track the status of my service request?</h3>
              <p className="text-muted-foreground">
                You can track the status of your service request by logging into your account on our website or mobile
                app. You'll receive real-time updates on your service status.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-2">Do you offer emergency services?</h3>
              <p className="text-muted-foreground">
                Yes, we offer emergency services for certain categories like plumbing and electrical issues. You can
                request emergency service through our app or by calling our emergency hotline.
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
              <Button size="lg" asChild>
                <a href="/booking">Book a Service Now</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/services">Explore Services</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
