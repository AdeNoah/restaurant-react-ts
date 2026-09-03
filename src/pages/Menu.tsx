
import { Heart } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import type { MealData } from "../data/types"
import {
  fetchAlcoholicDrinks,
  fetchCocktails,
  fetchNonAlcoholicDrinks,
  fetchStarters,
  fetchMainCourses,
  fetchDesserts,
} from "../api/MenuAPI"
import { formatCurrency } from "../utilities/currencyFormat"

const categoryLinks = [
  { key: "starters", label: "Starters", path: "/menu/starters" },
  { key: "main-courses", label: "Main Courses", path: "/menu/main-courses" },
  { key: "desserts", label: "Desserts", path: "/menu/desserts" },
  { key: "alcoholic", label: "Alcoholic", path: "/menu/alcoholic" },
  { key: "non-alcoholic", label: "Non-Alcoholic", path: "/menu/non-alcoholic" },
  { key: "cocktails", label: "Cocktails", path: "/menu/cocktails" },
]

const Menu: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [categories, setCategories] = useState<Record<string, MealData[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMeal, setSelectedMeal] = useState<MealData | null>(null)
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const [starters, mainCourses, desserts, alcoholic, nonAlcoholic, cocktails] = await Promise.all([
          fetchStarters(),
          fetchMainCourses(),
          fetchDesserts(),
          fetchAlcoholicDrinks(),
          fetchNonAlcoholicDrinks(),
          fetchCocktails(),
        ])

        setCategories({
          starters,
          "main-courses": mainCourses,
          desserts,
          alcoholic,
          "non-alcoholic": nonAlcoholic,
          cocktails,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    }

    void loadMenu()
  }, [])

  const selectedCategory = categoryLinks.some((category) => category.key === id) ? id! : "starters"
  const selectedItems = categories[selectedCategory] ?? []

  const handleAddMealToBooking = (meal: MealData) => {
    try {
      const currentMeals = JSON.parse(localStorage.getItem("mealsToBooking") ?? "[]")
      const mealsToBooking = Array.isArray(currentMeals) ? currentMeals : []

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

  const handleToggleFavorite = (meal: MealData, isFav: boolean) => {
    try {
      if (isFav) {
        const currentFavorites = JSON.parse(localStorage.getItem("favorites") ?? "[]")
        const favorites = Array.isArray(currentFavorites) ? currentFavorites : []

        favorites.push(meal)
        localStorage.setItem("favorites", JSON.stringify(favorites))
      } else {  
        const currentFavorites = JSON.parse(localStorage.getItem("favorites") ?? "[]")
        const favorites = Array.isArray(currentFavorites) ? currentFavorites : []

        const updatedFavorites = favorites.filter((fav: MealData) => fav.mealId !== meal.mealId)
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
      }
    } catch (error) {
      console.error("Unable to update favorites:", error)
    }
  }

  return (
    <div className="p-4 px-0 flex gap-4">
      <aside className="p-4 bg-cream mb-4 rounded-lg shadow-lg size-fit">
        <p className="border-b font-primary font-bold text-lg text-center mb-4">CATEGORY</p>

        <div className="space-y-2">
          {categoryLinks.map((category) => {
            const isActive = selectedCategory === category.key

            return (
              <Link
                key={category.key}
                to={category.path}
                className={`block rounded-md px-3 py-2 text-left font-secondary transition ${
                  isActive ? "bg-charcoal text-cream" : "text-charcoal hover:bg-cream/90"
                }`}
              >
                {category.label}
              </Link>
            )
          })}
        </div>
      </aside>

      <div className="flex-1">
        {loading && <p className="font-secondary text-lg text-charcoal">Loading menu...</p>}

        {!loading && error && (
          <p className="text-terracotta text-lg">Error loading menu: {error}</p>
        )}

        {!loading && !error && selectedItems.length === 0 && (
          <p className="font-secondary text-lg text-charcoal">No items found for this category.</p>
        )}

        {!loading && !error && selectedItems.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {selectedItems.map((item) => (
              <article
                key={item.mealId}
                onClick={() => setSelectedMeal(item)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    setSelectedMeal(item)
                  }
                }}  
                tabIndex={0}
                role="button"
                className="cursor-pointer overflow-hidden rounded-md bg-cream shadow transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
              >
                <img src={item.mealImage} alt={item.mealName} className="h-40 w-full object-cover" />
                <div className="p-3">
                  <h2 className="font-primary font-semibold">{item.mealName}</h2>
                  <p>{formatCurrency(item.mealPrice)}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedMeal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/25 p-4"
          onClick={() => setSelectedMeal(null)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setIsFavorited(!isFavorited);                handleToggleFavorite(selectedMeal, !isFavorited)
              }}
              className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full transition hover:opacity-90 focus:outline-none"
              aria-label="Add to favorites"
            >
              <Heart
                size={32}
                color={isFavorited ? "#a23917" : "#fff8f6"}
                fill={isFavorited ? "#a23917" : "#fff8f6"}
              />
            </button>

            <button
              type="button"
              onClick={() => setSelectedMeal(null)}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-cream text-lg font-bold text-charcoal shadow"
              aria-label="Close meal details"
            >
              ×
            </button>

            <img src={selectedMeal.mealImage} alt={selectedMeal.mealName} className="h-64 w-full object-cover" />

            <div className="p-6">
              <p className="font-secondary text-xs uppercase tracking-[0.2em] text-terracotta">Meal details</p>
              <h2 className="mt-2 font-primary text-3xl text-charcoal">{selectedMeal.mealName}</h2>
              <p className="mt-3 text-xl font-semibold text-charcoal">{formatCurrency(selectedMeal.mealPrice)}</p>
              <p className="mt-4 font-secondary text-base leading-7 text-charcoal/80">
                Freshly prepared in our kitchen with quality ingredients and a flavor profile made to impress.
              </p>

              <button
                type="button"
                onClick={() => {
                  handleAddMealToBooking(selectedMeal)
                  setSelectedMeal(null)
                }}
                className="mt-6 w-full rounded-md bg-terracotta px-4 py-3 font-primary text-lg text-cream transition hover:opacity-90"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Menu




