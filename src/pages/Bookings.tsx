// imports 
import { useEffect, useState } from "react"
import type { MealData } from "../data/types"
import { formatCurrency } from "../utilities/currencyFormat"

// in page or in component type definition 
type BookingMeal = MealData & {
  quantity?: number
}

const Bookings = () => {
  const [bookingMeals, setBookingMeals] = useState<BookingMeal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const storedMeals = JSON.parse(localStorage.getItem("mealsToBooking") ?? "[]")
      setBookingMeals(Array.isArray(storedMeals) ? storedMeals : [])
    } catch (error) {
      console.error("Unable to fetch booking meals:", error)
      setBookingMeals([])
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div className="p-4">
      {loading && <p className="font-secondary text-lg text-charcoal">Loading bookings...</p>}

      {!loading && bookingMeals.length === 0 && (
        <p className="font-secondary text-lg text-charcoal">Add meals to see them in your bookings</p>
      )}

      {!loading && bookingMeals.length > 0 && (
        <div>
          <h1 className="mb-6 font-primary text-3xl text-charcoal">Your Bookings</h1>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {bookingMeals.map((meal) => (
              <article key={meal.mealId} className="overflow-hidden rounded-md bg-cream shadow">
                <img src={meal.mealImage} alt={meal.mealName} className="h-40 w-full object-cover" />
                <div className="p-3">
                  <h2 className="font-primary font-semibold">{meal.mealName}</h2>
                  <p>{formatCurrency(meal.mealPrice)}</p>
                  <p className="mt-2 font-secondary text-sm text-charcoal/70">
                    Quantity: {meal.quantity ?? 1}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Bookings
