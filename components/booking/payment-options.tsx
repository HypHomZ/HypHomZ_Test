"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CreditCard, Wallet, Landmark, Shield } from "lucide-react"

export function PaymentOptions() {
  const [paymentMethod, setPaymentMethod] = useState("card")

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Payment Options</h2>

        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
          <div
            className={`border rounded-md p-4 transition-all ${
              paymentMethod === "card" ? "border-primary bg-primary/5" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem value="card" id="card" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="card" className="flex items-center gap-2 font-medium cursor-pointer">
                  <CreditCard className="h-4 w-4" /> Credit/Debit Card
                </Label>

                {paymentMethod === "card" && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input id="nameOnCard" placeholder="John Doe" />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className={`border rounded-md p-4 transition-all ${
              paymentMethod === "upi" ? "border-primary bg-primary/5" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem value="upi" id="upi" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="upi" className="flex items-center gap-2 font-medium cursor-pointer">
                  <Wallet className="h-4 w-4" /> UPI
                </Label>

                {paymentMethod === "upi" && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input id="upiId" placeholder="username@bank" />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <Button variant="outline" className="p-4 h-auto flex flex-col items-center justify-center">
                        <div className="h-8 w-8 bg-muted rounded-full mb-2"></div>
                        <span className="text-xs">Google Pay</span>
                      </Button>
                      <Button variant="outline" className="p-4 h-auto flex flex-col items-center justify-center">
                        <div className="h-8 w-8 bg-muted rounded-full mb-2"></div>
                        <span className="text-xs">PhonePe</span>
                      </Button>
                      <Button variant="outline" className="p-4 h-auto flex flex-col items-center justify-center">
                        <div className="h-8 w-8 bg-muted rounded-full mb-2"></div>
                        <span className="text-xs">Paytm</span>
                      </Button>
                      <Button variant="outline" className="p-4 h-auto flex flex-col items-center justify-center">
                        <div className="h-8 w-8 bg-muted rounded-full mb-2"></div>
                        <span className="text-xs">Amazon Pay</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className={`border rounded-md p-4 transition-all ${
              paymentMethod === "netbanking" ? "border-primary bg-primary/5" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem value="netbanking" id="netbanking" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="netbanking" className="flex items-center gap-2 font-medium cursor-pointer">
                  <Landmark className="h-4 w-4" /> Net Banking
                </Label>

                {paymentMethod === "netbanking" && (
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <Button variant="outline" className="p-4 h-auto flex flex-col items-center justify-center">
                        <div className="h-8 w-8 bg-muted rounded-full mb-2"></div>
                        <span className="text-xs">HDFC Bank</span>
                      </Button>
                      <Button variant="outline" className="p-4 h-auto flex flex-col items-center justify-center">
                        <div className="h-8 w-8 bg-muted rounded-full mb-2"></div>
                        <span className="text-xs">ICICI Bank</span>
                      </Button>
                      <Button variant="outline" className="p-4 h-auto flex flex-col items-center justify-center">
                        <div className="h-8 w-8 bg-muted rounded-full mb-2"></div>
                        <span className="text-xs">SBI</span>
                      </Button>
                      <Button variant="outline" className="p-4 h-auto flex flex-col items-center justify-center">
                        <div className="h-8 w-8 bg-muted rounded-full mb-2"></div>
                        <span className="text-xs">Axis Bank</span>
                      </Button>
                      <Button variant="outline" className="p-4 h-auto flex flex-col items-center justify-center">
                        <div className="h-8 w-8 bg-muted rounded-full mb-2"></div>
                        <span className="text-xs">Kotak Bank</span>
                      </Button>
                      <Button variant="outline" className="p-4 h-auto flex flex-col items-center justify-center">
                        <div className="h-8 w-8 bg-muted rounded-full mb-2"></div>
                        <span className="text-xs">Other Banks</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className={`border rounded-md p-4 transition-all ${
              paymentMethod === "cod" ? "border-primary bg-primary/5" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem value="cod" id="cod" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="cod" className="flex items-center gap-2 font-medium cursor-pointer">
                  Cash on Delivery
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Pay after the service is completed to your satisfaction
                </p>
              </div>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
