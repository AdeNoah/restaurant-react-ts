// imports 
import PaystackPop from "@paystack/inline-js"
import type { MealData } from "../data/types"
import { formatCurrency } from "../utilities/currencyFormat"

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

  const handlePaystackCheckout = () => {
    if (!TEST_API_KEY) {
      alert("Please add VITE_TEST_API_KEY to your .env file before testing Paystack.")
      return
    }

    const payment = new PaystackPop()

    payment.newTransaction({
      key: TEST_API_KEY,
      email: "customer@example.com",
      amount: totalPrice * 100,
      currency: "NGN",
      ref: `meal-${meal.mealId}-${Date.now()}`,
      label: meal.mealName,
      onSuccess: (response) => {
        console.log("Payment successful:", response)
        onClose()
      },
      onCancel: () => {
        console.log("Payment cancelled")
      },
    })
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
              value="customer@example.com"
              readOnly
              className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 text-sm text-charcoal outline-none"
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
              value={`meal-${meal.mealId}-${Date.now()}`}
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
