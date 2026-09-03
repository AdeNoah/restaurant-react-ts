
import { Heart } from "lucide-react"
import { useEffect, useState } from "react"
import type { MealData } from "../data/types"
import { formatCurrency } from "../utilities/currencyFormat"

const Favorites = () => {
  const [favorites, setFavorites] = useState<MealData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites") ?? "[]")
      setFavorites(Array.isArray(storedFavorites) ? storedFavorites : [])
    } catch (error) {
      console.error("Unable to fetch favorites:", error)
      setFavorites([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleRemoveFavorite = (mealId: number) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.mealId !== mealId)

    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }

  const handleAddMealToBooking = (meal: MealData) => {
    try {
      const storedMeals = JSON.parse(localStorage.getItem("mealsToBooking") ?? "[]")
      const mealsToBooking = Array.isArray(storedMeals) ? storedMeals : []

      const mealAlreadyAdded = mealsToBooking.some((bookingMeal) => bookingMeal.mealId === meal.mealId)

      if (mealAlreadyAdded) {
        alert("This meal has already been added to booking")
        return
      }

      mealsToBooking.push({ ...meal, quantity: 1 })
      localStorage.setItem("mealsToBooking", JSON.stringify(mealsToBooking))
    } catch (error) {
      console.error("Unable to save meal to booking list:", error)
    }
  }

  return (
    <div className="p-4">
      {loading && <p className="font-secondary text-lg text-charcoal">Loading favorites...</p>}

      {!loading && favorites.length === 0 && (
        <p className="font-secondary text-lg text-charcoal">Add favorite meals to see them here</p>
      )}

      {!loading && favorites.length > 0 && (
        <div>
          <h1 className="mb-6 font-primary text-3xl text-charcoal">Your Favorites</h1>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {favorites.map((item) => (
              <article key={item.mealId} className="relative overflow-hidden rounded-md bg-cream shadow">

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    handleRemoveFavorite(item.mealId)
                  }}
                  className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full transition hover:opacity-90 focus:outline-none"
                  aria-label={`Remove ${item.mealName} from favorites`}
                >
                  <Heart
                    size={32}
                    color="#a23917"
                    fill="#a23917"
                  />
                </button>

                <img src={item.mealImage} alt={item.mealName} className="h-40 w-full object-cover" />
                <div className="p-3">
                  <h2 className="font-primary font-semibold">{item.mealName}</h2>
                  <p>{formatCurrency(item.mealPrice)}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleAddMealToBooking(item)
                  }}
                  className="mt-6 w-full rounded-md bg-terracotta px-4 py-3 font-primary text-lg text-cream transition hover:opacity-90"
                >
                  Book Now
                </button>

              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Favorites
