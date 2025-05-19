export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price)
}

export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
