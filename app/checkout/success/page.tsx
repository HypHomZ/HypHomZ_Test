"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Calendar, MapPin, Clock } from "lucide-react"
import confetti from "canvas-confetti"

export default function CheckoutSuccessPage() {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  // Generate a random order ID
  const orderId = `HH${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your order. We've received your booking and will confirm it shortly.
        </p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order ID</span>
                <span>{orderId}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Service Date: May 15, 2023</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Service Time: 10:00 AM</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Service Location: Andheri, Mumbai</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/bookings">View My Bookings</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
