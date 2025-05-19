"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, CreditCard, Home, MapPin, Phone, Mail, Edit, Save, Plus } from "lucide-react"

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    addresses: [
      {
        id: "addr1",
        type: "home",
        address: "123 Main Street, Apartment 4B",
        city: "Mumbai",
        pincode: "400001",
        isDefault: true,
      },
      {
        id: "addr2",
        type: "office",
        address: "456 Business Park, Tower C, 5th Floor",
        city: "Mumbai",
        pincode: "400051",
        isDefault: false,
      },
    ],
    paymentMethods: [
      {
        id: "card1",
        type: "credit",
        name: "HDFC Credit Card",
        number: "•••• •••• •••• 1234",
        expiry: "12/25",
        isDefault: true,
      },
      {
        id: "card2",
        type: "upi",
        name: "Google Pay",
        number: "user@okbank",
        isDefault: false,
      },
    ],
  })

  const handleSaveProfile = () => {
    // Save profile logic would go here
    setIsEditing(false)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-muted-foreground">{profile.email}</p>
            </div>
          </div>

          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
            className="flex items-center gap-2"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4" /> Save
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" /> Edit
              </>
            )}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  ) : (
                    <span>{profile.name}</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  ) : (
                    <span>{profile.email}</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  ) : (
                    <span>{profile.phone}</span>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="addresses" className="pt-4">
            <div className="space-y-4">
              {profile.addresses.map((address, index) => (
                <div key={address.id} className="border rounded-md p-4 relative">
                  {address.isDefault && (
                    <div className="absolute top-2 right-2 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      Default
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="bg-muted rounded-full p-2">
                      {address.type === "home" ? <Home className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium capitalize">{address.type}</h3>
                      </div>

                      {isEditing ? (
                        <div className="space-y-2 mt-2">
                          <Textarea
                            value={address.address}
                            onChange={(e) => {
                              const newAddresses = [...profile.addresses]
                              newAddresses[index].address = e.target.value
                              setProfile({ ...profile, addresses: newAddresses })
                            }}
                            className="min-h-[80px]"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              value={address.city}
                              onChange={(e) => {
                                const newAddresses = [...profile.addresses]
                                newAddresses[index].city = e.target.value
                                setProfile({ ...profile, addresses: newAddresses })
                              }}
                              placeholder="City"
                            />
                            <Input
                              value={address.pincode}
                              onChange={(e) => {
                                const newAddresses = [...profile.addresses]
                                newAddresses[index].pincode = e.target.value
                                setProfile({ ...profile, addresses: newAddresses })
                              }}
                              placeholder="PIN Code"
                            />
                          </div>
                          <RadioGroup
                            value={address.type}
                            onValueChange={(value) => {
                              const newAddresses = [...profile.addresses]
                              newAddresses[index].type = value
                              setProfile({ ...profile, addresses: newAddresses })
                            }}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="home" id={`home-${address.id}`} />
                              <Label htmlFor={`home-${address.id}`}>Home</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="office" id={`office-${address.id}`} />
                              <Label htmlFor={`office-${address.id}`}>Office</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      ) : (
                        <>
                          <p className="text-muted-foreground mt-1">{address.address}</p>
                          <p className="text-muted-foreground">
                            {address.city}, {address.pincode}
                          </p>
                        </>
                      )}

                      {isEditing && (
                        <div className="flex justify-between mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newAddresses = profile.addresses.filter((a) => a.id !== address.id)
                              setProfile({ ...profile, addresses: newAddresses })
                            }}
                          >
                            Remove
                          </Button>

                          {!address.isDefault && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newAddresses = profile.addresses.map((a) => ({
                                  ...a,
                                  isDefault: a.id === address.id,
                                }))
                                setProfile({ ...profile, addresses: newAddresses })
                              }}
                            >
                              Set as Default
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isEditing && (
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => {
                    const newAddress = {
                      id: `addr${profile.addresses.length + 1}`,
                      type: "home",
                      address: "",
                      city: "",
                      pincode: "",
                      isDefault: profile.addresses.length === 0,
                    }
                    setProfile({ ...profile, addresses: [...profile.addresses, newAddress] })
                  }}
                >
                  <Plus className="h-4 w-4" /> Add New Address
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="payment" className="pt-4">
            <div className="space-y-4">
              {profile.paymentMethods.map((payment, index) => (
                <div key={payment.id} className="border rounded-md p-4 relative">
                  {payment.isDefault && (
                    <div className="absolute top-2 right-2 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      Default
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="bg-muted rounded-full p-2">
                      <CreditCard className="h-4 w-4" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium">{payment.name}</h3>
                      <p className="text-muted-foreground mt-1">{payment.number}</p>
                      {payment.expiry && <p className="text-muted-foreground text-sm">Expires: {payment.expiry}</p>}

                      {isEditing && (
                        <div className="flex justify-between mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newPaymentMethods = profile.paymentMethods.filter((p) => p.id !== payment.id)
                              setProfile({ ...profile, paymentMethods: newPaymentMethods })
                            }}
                          >
                            Remove
                          </Button>

                          {!payment.isDefault && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newPaymentMethods = profile.paymentMethods.map((p) => ({
                                  ...p,
                                  isDefault: p.id === payment.id,
                                }))
                                setProfile({ ...profile, paymentMethods: newPaymentMethods })
                              }}
                            >
                              Set as Default
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isEditing && (
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => {
                    // Add new payment method logic
                  }}
                >
                  <Plus className="h-4 w-4" /> Add Payment Method
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
