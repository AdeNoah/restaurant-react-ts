
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
              <article key={item.mealId} className="overflow-hidden rounded-md bg-white shadow">
                <img src={item.mealImage} alt={item.mealName} className="h-40 w-full object-cover" />
                <div className="p-3">
                  <h2 className="font-primary font-semibold">{item.mealName}</h2>
                  <p>{formatCurrency(item.mealPrice)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Favorites
