"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatPrice } from "@/lib/utils"
import { Calendar, Clock, MapPin, Star, ChevronDown, ChevronUp } from "lucide-react"

export function BookingHistory() {
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null)

  const bookings = [
    {
      id: "book1",
      date: "2023-05-15",
      time: "10:00 AM",
      status: "completed",
      services: [
        { name: "Deep Cleaning", price: 1499 },
        { name: "Sanitization", price: 699 },
      ],
      totalAmount: 2198,
      address: "123 Main Street, Apartment 4B, Mumbai",
      professional: {
        name: "Rahul Sharma",
        rating: 4.8,
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "book2",
      date: "2023-06-22",
      time: "02:30 PM",
      status: "upcoming",
      services: [{ name: "AC Service", price: 899 }],
      totalAmount: 899,
      address: "456 Business Park, Tower C, 5th Floor, Mumbai",
      professional: null,
    },
    {
      id: "book3",
      date: "2023-04-10",
      time: "11:00 AM",
      status: "cancelled",
      services: [{ name: "Plumbing Repair", price: 599 }],
      totalAmount: 599,
      address: "123 Main Street, Apartment 4B, Mumbai",
      professional: null,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "upcoming":
        return <Badge className="bg-blue-500">Upcoming</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Booking History</h2>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="pt-4">
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border rounded-md overflow-hidden">
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => setExpandedBooking(expandedBooking === booking.id ? null : booking.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.time}</span>
                        </div>

                        <h3 className="font-medium mt-2">{booking.services.map((s) => s.name).join(", ")}</h3>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(booking.status)}
                        <span className="font-medium">{formatPrice(booking.totalAmount)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-4 py-2 bg-muted/30">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground truncate max-w-[250px]">{booking.address}</span>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedBooking(expandedBooking === booking.id ? null : booking.id)
                        }}
                      >
                        {expandedBooking === booking.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {expandedBooking === booking.id && (
                      <div className="p-4 border-t">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Services</h4>
                            <div className="space-y-2">
                              {booking.services.map((service, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span>{service.name}</span>
                                  <span>{formatPrice(service.price)}</span>
                                </div>
                              ))}
                              <div className="flex justify-between font-medium pt-2 border-t">
                                <span>Total</span>
                                <span>{formatPrice(booking.totalAmount)}</span>
                              </div>
                            </div>
                          </div>

                          {booking.professional && (
                            <div>
                              <h4 className="text-sm font-medium mb-2">Professional</h4>
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-muted overflow-hidden relative">
                                  <img
                                    src={booking.professional.image || "/placeholder.svg"}
                                    alt={booking.professional.name}
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">{booking.professional.name}</div>
                                  <div className="flex items-center text-sm">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                                    <span>{booking.professional.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex justify-between pt-2">
                            {booking.status === "completed" && (
                              <Button variant="outline" size="sm">
                                Book Again
                              </Button>
                            )}

                            {booking.status === "upcoming" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive border-destructive hover:bg-destructive/10"
                              >
                                Cancel Booking
                              </Button>
                            )}

                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="pt-4">
            <div className="space-y-4">
              {bookings
                .filter((b) => b.status === "upcoming")
                .map((booking) => (
                  <div key={booking.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.time}</span>
                        </div>

                        <h3 className="font-medium mt-2">{booking.services.map((s) => s.name).join(", ")}</h3>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(booking.status)}
                        <span className="font-medium">{formatPrice(booking.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                ))}

              {bookings.filter((b) => b.status === "upcoming").length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No upcoming bookings</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="pt-4">
            <div className="space-y-4">
              {bookings
                .filter((b) => b.status === "completed")
                .map((booking) => (
                  <div key={booking.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.time}</span>
                        </div>

                        <h3 className="font-medium mt-2">{booking.services.map((s) => s.name).join(", ")}</h3>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(booking.status)}
                        <span className="font-medium">{formatPrice(booking.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                ))}

              {bookings.filter((b) => b.status === "completed").length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No completed bookings</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="cancelled" className="pt-4">
            <div className="space-y-4">
              {bookings
                .filter((b) => b.status === "cancelled")
                .map((booking) => (
                  <div key={booking.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.time}</span>
                        </div>

                        <h3 className="font-medium mt-2">{booking.services.map((s) => s.name).join(", ")}</h3>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(booking.status)}
                        <span className="font-medium">{formatPrice(booking.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                ))}

              {bookings.filter((b) => b.status === "cancelled").length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No cancelled bookings</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
