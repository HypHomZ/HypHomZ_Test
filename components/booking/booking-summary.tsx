"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"

interface BookingSummaryProps {
  selectedServices: any[]
  totalPrice: number
  bookingDate: Date | null
  bookingTime: string | null
  bookingAddress: string | null
}

export function BookingSummary({
  selectedServices,
  totalPrice,
  bookingDate,
  bookingTime,
  bookingAddress,
}: BookingSummaryProps) {
  const [showBreakdown, setShowBreakdown] = useState(true)

  // Calculate tax and total
  const taxRate = 0.18 // 18% GST
  const taxAmount = totalPrice * taxRate
  const finalTotal = totalPrice + taxAmount

  // Prepare data for pie chart
  const pieData = selectedServices.map((service) => {
    const servicePrice = service.price
    const addonPrice = service.selectedAddons
      ? service.selectedAddons.reduce((sum: number, addon: any) => sum + addon.price * (addon.quantity || 1), 0)
      : 0

    return {
      name: service.name,
      value: servicePrice + addonPrice,
    }
  })

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

        {selectedServices.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No services selected yet</p>
            <p className="text-sm mt-2">Select services to see your booking summary</p>
          </div>
        ) : (
          <>
            {/* Service details */}
            <div className="space-y-4 mb-6">
              {selectedServices.map((service) => {
                const addonPrice = service.selectedAddons
                  ? service.selectedAddons.reduce(
                      (sum: number, addon: any) => sum + addon.price * (addon.quantity || 1),
                      0,
                    )
                  : 0

                const serviceTotal = service.price + addonPrice

                return (
                  <div key={service.id} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{service.name}</span>
                      <span>{formatPrice(service.price)}</span>
                    </div>

                    {service.selectedAddons && service.selectedAddons.length > 0 && (
                      <div className="pl-4 space-y-1">
                        {service.selectedAddons.map((addon: any) => (
                          <div key={addon.id} className="flex justify-between text-sm text-muted-foreground">
                            <span>
                              {addon.name} {addon.quantity > 1 ? `(×${addon.quantity})` : ""}
                            </span>
                            <span>{formatPrice(addon.price * (addon.quantity || 1))}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Price breakdown toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="flex items-center justify-between w-full mb-4"
            >
              <span>Price Breakdown</span>
              {showBreakdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            <AnimatePresence>
              {showBreakdown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-4"
                >
                  {/* Price visualization chart */}
                  <div className="h-[200px] mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip formatter={(value: number) => formatPrice(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Booking details */}
            {(bookingDate || bookingTime || bookingAddress) && (
              <div className="space-y-3 mb-4 bg-muted/30 p-3 rounded-md">
                <h3 className="font-medium">Booking Details</h3>

                {bookingDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{bookingDate.toLocaleDateString()}</span>
                  </div>
                )}

                {bookingTime && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{bookingTime}</span>
                  </div>
                )}

                {bookingAddress && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{bookingAddress}</span>
                  </div>
                )}
              </div>
            )}

            <Separator className="my-4" />

            {/* Price summary */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST (18%)</span>
                <span>{formatPrice(taxAmount)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>

      {selectedServices.length > 0 && (
        <CardFooter className="p-6 pt-0">
          <Button className="w-full" size="lg" disabled={selectedServices.length === 0}>
            Proceed to Checkout
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
