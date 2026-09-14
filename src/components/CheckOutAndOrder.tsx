// imports 
import { useMemo, useState } from "react"
import PaystackPop from "@paystack/inline-js"
import type { MealData } from "../data/types"
import { formatCurrency } from "../utilities/currencyFormat"
import OrderSuccess from "./OrderSuccess"
import OrderFailed from "./OrderFailed"

const TEST_API_KEY = import.meta.env.VITE_TEST_API_KEY ?? ""

type BookingMeal = MealData & {
  quantity?: number
}

type CheckOutAndOrderProps = {
  meal: BookingMeal
  onClose: () => void
}

const CheckOutAndOrder = ({ meal, onClose }: CheckOutAndOrderProps) => {
  const quantity = meal.quantity ?? 1
  const totalPrice = meal.mealPrice * quantity
  const [email, setEmail] = useState("")
  const [paymentState, setPaymentState] = useState<"checkout" | "success" | "failed">("checkout")

  const paymentReference = useMemo(
    () => `meal-${meal.mealId}-${Date.now()}`,
    [meal.mealId],
  )

  const handlePaystackCheckout = () => {
    try {
      if (!TEST_API_KEY) {
        throw new Error("Please add VITE_TEST_API_KEY to your .env file before testing Paystack.")
      }

      if (!email || !email.includes("@") || !email.includes(".")) {
        throw new Error("Please enter a valid email address.")
      }

      const payment = new PaystackPop()

      payment.newTransaction({
        key: TEST_API_KEY,
        email,
        amount: Math.round(totalPrice * 100),
        currency: "NGN",
        ref: paymentReference,
        label: meal.mealName,
        onSuccess: () => {
          setPaymentState("success")
        },
        onCancel: () => {
          setPaymentState("failed")
        },
      })
    } catch (error) {
      console.error("Paystack checkout error:", error)
      setPaymentState("failed")
    }
  }

  if (paymentState === "success") {
    return <OrderSuccess onClose={onClose} />
  }

  if (paymentState === "failed") {
    return <OrderFailed onClose={onClose} />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-primary text-2xl text-charcoal">Checkout</h2>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-cream text-lg font-bold text-charcoal"
          aria-label="Close checkout"
        >
          ×
        </button>
      </div>

      <div className="rounded-lg bg-cream p-3">
        <p className="font-primary text-xl text-charcoal">{meal.mealName}</p>
        <p className="font-secondary text-sm text-charcoal/70">Quantity: {quantity}</p>
        <p className="mt-2 font-semibold text-charcoal">{formatCurrency(totalPrice)}</p>
      </div>

      <div className="rounded-lg border border-charcoal bg-black/10 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">Paystack test</p>
        <div className="mt-3 space-y-3">
          <div>
            <label className="block text-xs uppercase tracking-wide text-charcoal/60">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-terracotta"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-charcoal/60">Amount</label>
            <input
              type="text"
              value={formatCurrency(totalPrice)}
              readOnly
              className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 text-sm text-charcoal outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-charcoal/60">Reference</label>
            <input
              type="text"
              value={paymentReference}
              readOnly
              className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 text-sm text-charcoal outline-none"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePaystackCheckout}
        className="w-full rounded-md bg-terracotta px-4 py-3 font-primary text-lg text-cream transition hover:opacity-90"
      >
        Pay Now
      </button>
    </div>
  )
}

export default CheckOutAndOrder
