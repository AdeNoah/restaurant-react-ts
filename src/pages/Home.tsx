import React, { useEffect, useState } from "react"
import { type MealData } from "../data/types"
import { fetchHomeMeals } from "../api/HomeAPI"


const Home: React.FC = () => {
  const [meals, setMeals] = useState<MealData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchHomeMeals()
        setMeals(data)
      } catch (err) {
        if (err instanceof Error) setError(err.message)
        else setError(String(err))
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  if (loading) {
    return (
      <div className="p-8 font-secondary text-center text-lg font-medium text-charcoal">
        Loading meals...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 font-secondary text-center font-medium text-terracotta">
        Error loading meals: {error}
      </div>
    )
  }

  return (
    <main className="w-full py-4">
      <section className="mb-8 w-full">
        <h1 className="font-primary text-3xl font-bold">Cullinary Digital Gallery</h1>
        <p className="mt-2 font-secondary text-charcoal">
          Welcome to Cullinary's digital gallery, here you can see all our high-quality meals on display.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-full gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {meals.map((meal: MealData) => (
          <article
            key={meal.mealId}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md"
          >
            <img
              src={meal.mealImage}
              alt={meal.mealName}
              className="h-50 w-full object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-slate-900">
                {meal.mealName}
              </h2>
              {/* <p className="mt-3 text-lg text-amber-700">
                ${meal.mealPrice.toFixed(2)}
              </p> */}
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Home

