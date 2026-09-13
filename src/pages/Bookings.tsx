// imports 
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import type { MealData } from "../data/types"
import { formatCurrency } from "../utilities/currencyFormat"

// in page or in component type definition 
type BookingMeal = MealData & {
  quantity?: number
}

// getting the booking from local storage 
const getStoredBookingMeals = (): BookingMeal[] => {
  try {
    const storedMeals = JSON.parse(localStorage.getItem("mealsToBooking") ?? "[]")
    return Array.isArray(storedMeals) ? storedMeals : []
  } catch (error) {
    console.error("Unable to fetch booking meals:", error)
    return []
  }
}

// the bookings component that fetches and displays meals added to bookings from localStorage
const Bookings = () => {
  const [bookingMeals, setBookingMeals] = useState<BookingMeal[]>([])
  const [loading, setLoading] = useState(true)

  // logic to set meal to local storage 
  const updateBookingMeals = (updatedMeals: BookingMeal[]) => {
    setBookingMeals(updatedMeals)
    localStorage.setItem("mealsToBooking", JSON.stringify(updatedMeals))
  }

  // logic for the reduce button
  const handleReduceQuantity = (mealId: number) => {
    const updatedMeals = bookingMeals
      .map((meal) => {
        if (meal.mealId !== mealId) return meal

        const currentQuantity = meal.quantity ?? 1
        const nextQuantity = currentQuantity - 1

        return { ...meal, quantity: nextQuantity }
      })
      .filter((meal) => (meal.quantity ?? 1) > 0)

    updateBookingMeals(updatedMeals)
  }

  // logic for the increase button
  const handleIncreaseQuantity = (mealId: number) => {
    const updatedMeals = bookingMeals.map((meal) => {
      if (meal.mealId !== mealId) return meal

      const currentQuantity = meal.quantity ?? 1

      return { ...meal, quantity: currentQuantity + 1 }
    })

    updateBookingMeals(updatedMeals)
  }

  // logic for the remove button
  const handleRemoveMeal = (mealId: number) => {
    const updatedMeals = bookingMeals.filter((meal) => meal.mealId !== mealId)
    updateBookingMeals(updatedMeals)
  }

  // hook to render the 
  useEffect(() => {
    setBookingMeals(getStoredBookingMeals())
    setLoading(false)
  }, [])

  return (
    <div className="p-4">
      {loading && <p className="font-secondary text-lg text-charcoal">Loading bookings...</p>}

{/* render the loading view  */}
      {!loading && bookingMeals.length === 0 && (
        <p className="font-secondary text-lg text-charcoal">Add meals to see them in your bookings</p>
      )}

{/* render the meal  fetched from local storage and the display */}
      {!loading && bookingMeals.length > 0 && (
        <div>
          <h1 className="mb-6 font-primary text-3xl text-charcoal">Your Bookings</h1>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {bookingMeals.map((meal) => {
              const quantity = meal.quantity ?? 1
              const totalPrice = meal.mealPrice * quantity

              return (
                <article key={meal.mealId} className="overflow-hidden rounded-md bg-cream shadow">
                  <img src={meal.mealImage} alt={meal.mealName} className="h-40 w-full object-cover" />
                  <div className="p-3">
                    <h2 className="font-primary font-semibold">{meal.mealName}</h2>
                    <p>{formatCurrency(totalPrice)}</p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleReduceQuantity(meal.mealId)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal text-cream transition hover:opacity-90"
                        aria-label={`Reduce quantity for ${meal.mealName}`}
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <p className="font-secondary text-sm text-charcoal/70">{quantity}</p>

                      <button
                        type="button"
                        onClick={() => handleIncreaseQuantity(meal.mealId)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal text-cream transition hover:opacity-90"
                        aria-label={`Increase quantity for ${meal.mealName}`}
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        className="flex-1 rounded-md bg-terracotta px-3 py-2 font-secondary text-sm font-semibold text-cream transition hover:opacity-90"
                        aria-label={`Checkout ${meal.mealName}`}
                      >
                        Checkout
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemoveMeal(meal.mealId)}
                        className="flex-1 rounded-md border border-terracotta bg-transparent px-3 py-2 font-secondary text-sm font-semibold text-terracotta transition hover:bg-terracotta hover:text-cream"
                        aria-label={`Remove ${meal.mealName} from bookings`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Bookings
