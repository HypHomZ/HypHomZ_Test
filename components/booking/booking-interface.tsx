"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"
import type { ServiceCategory } from "@/types/service"
import { ServiceSelection } from "@/components/booking/service-selection"
import { BookingSummary } from "@/components/booking/booking-summary"
import { UserProfile } from "@/components/booking/user-profile"
import { BookingHistory } from "@/components/booking/booking-history"
import { serviceCategories } from "@/data/services"
import { ChevronRight, Calendar, Clock, MapPin } from "lucide-react"

export default function BookingInterface() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(serviceCategories[0])
  const [selectedServices, setSelectedServices] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("services")
  const [bookingDate, setBookingDate] = useState<Date | null>(null)
  const [bookingTime, setBookingTime] = useState<string | null>(null)
  const [bookingAddress, setBookingAddress] = useState<string | null>(null)

  const { addItem, items } = useCart()
  const router = useRouter()

  const handleCategoryChange = (category: ServiceCategory) => {
    setSelectedCategory(category)
  }

  const handleServiceToggle = (service: any, isSelected: boolean) => {
    if (isSelected) {
      setSelectedServices((prev) => [...prev, service])
    } else {
      setSelectedServices((prev) => prev.filter((s) => s.id !== service.id))
    }
  }

  const handleAddToCart = () => {
    // Add all selected services to cart
    selectedServices.forEach((service) => {
      if (service.selectedAddons && service.selectedAddons.length > 0) {
        addItem({
          id: service.id,
          serviceId: service.id,
          name: service.name,
          price: service.price,
          quantity: 1,
          image: service.image,
          options: service.selectedAddons.map((addon: any) => ({
            name: "Add-on",
            value: addon.name,
            price: addon.price,
          })),
        })
      } else {
        addItem({
          id: service.id,
          serviceId: service.id,
          name: service.name,
          price: service.price,
          quantity: 1,
          image: service.image,
        })
      }
    })

    router.push("/checkout")
  }

  const totalPrice = selectedServices.reduce((total, service) => {
    const servicePrice = service.price
    const addonPrice = service.selectedAddons
      ? service.selectedAddons.reduce((sum: number, addon: any) => sum + addon.price * (addon.quantity || 1), 0)
      : 0
    return total + servicePrice + addonPrice
  }, 0)

  const canProceed =
    selectedServices.length > 0 && (activeTab !== "schedule" || (bookingDate && bookingTime && bookingAddress))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="mt-6">
            <div className="mb-6 overflow-x-auto pb-2">
              <div className="flex space-x-2 min-w-max">
                {serviceCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory?.id === category.id ? "default" : "outline"}
                    onClick={() => handleCategoryChange(category)}
                    className="flex items-center gap-2"
                  >
                    <category.icon className="h-4 w-4" />
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {selectedCategory && (
              <ServiceSelection
                category={selectedCategory}
                onServiceToggle={handleServiceToggle}
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
              />
            )}
          </TabsContent>

          <TabsContent value="schedule" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Schedule Your Service</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Select Date
                  </h3>
                  {/* Calendar component would go here */}
                  <div className="bg-muted h-64 rounded-md flex items-center justify-center">Calendar Placeholder</div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Select Time
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "09:00 AM",
                      "10:00 AM",
                      "11:00 AM",
                      "12:00 PM",
                      "01:00 PM",
                      "02:00 PM",
                      "03:00 PM",
                      "04:00 PM",
                      "05:00 PM",
                      "06:00 PM",
                      "07:00 PM",
                      "08:00 PM",
                    ].map((time) => (
                      <Button
                        key={time}
                        variant={bookingTime === time ? "default" : "outline"}
                        onClick={() => setBookingTime(time)}
                        className="text-sm"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>

                  <h3 className="font-medium pt-4 flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Service Address
                  </h3>
                  <div className="bg-muted h-32 rounded-md flex items-center justify-center">
                    Address Selection Placeholder
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <UserProfile />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <BookingHistory />
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => {
              if (activeTab === "services") return
              else if (activeTab === "schedule") setActiveTab("services")
              else if (activeTab === "profile") setActiveTab("schedule")
              else if (activeTab === "history") setActiveTab("profile")
            }}
            disabled={activeTab === "services"}
          >
            Back
          </Button>

          <Button
            onClick={() => {
              if (activeTab === "services") setActiveTab("schedule")
              else if (activeTab === "schedule") setActiveTab("profile")
              else if (activeTab === "profile") setActiveTab("history")
              else if (activeTab === "history") handleAddToCart()
            }}
            disabled={!canProceed}
            className="flex items-center gap-2"
          >
            {activeTab === "history" ? "Proceed to Checkout" : "Continue"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="lg:col-span-1">
        <BookingSummary
          selectedServices={selectedServices}
          totalPrice={totalPrice}
          bookingDate={bookingDate}
          bookingTime={bookingTime}
          bookingAddress={bookingAddress}
        />
      </div>
    </div>
  )
}
