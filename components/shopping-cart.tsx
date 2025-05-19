"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart, type CartItem } from "@/context/cart-context"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"

export function ShoppingCart() {
  const { items, updateItem, removeItem, subtotal, isCartOpen, closeCart } = useCart()

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return
    updateItem(item.id, newQuantity)
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="relative w-40 h-40">
              <Image
                src="/placeholder.svg?height=160&width=160"
                alt="Empty cart"
                fill
                className="object-contain opacity-50"
              />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-lg">Your cart is empty</h3>
              <p className="text-muted-foreground mt-1">Add services to get started</p>
            </div>
            <Button onClick={closeCart}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {item.image && (
                      <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{item.name}</h4>
                      {item.options && item.options.length > 0 && (
                        <div className="mt-1 text-sm text-muted-foreground">
                          {item.options.map((option, idx) => (
                            <div key={idx}>
                              {option.name}: {option.value}
                              {option.price ? ` (+${formatPrice(option.price)})` : ""}
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Taxes & Fees</span>
                  <span className="font-medium">{formatPrice(subtotal * 0.18)}</span>
                </div>
                <div className="flex items-center justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>{formatPrice(subtotal * 1.18)}</span>
                </div>
                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
