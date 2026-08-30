// import { BrowserRouter } from 'react-router-dom';
// Routes, Route, Link, Outlet, useParams

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

  return (
    <div className="p-4 flex gap-4">
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
              <article key={item.mealId} className="overflow-hidden rounded-md bg-white shadow">
                <img src={item.mealImage} alt={item.mealName} className="h-40 w-full object-cover" />
                <div className="p-3">
                  <h2 className="font-secondary font-semibold">{item.mealName}</h2>
                  <p>{formatCurrency(item.mealPrice)}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Menu





