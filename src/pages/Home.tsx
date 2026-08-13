import React from "react"
import { type MealData, type HomeProps } from "../data/types"

const Home: React.FC<HomeProps> = ({ meals, loading, error }) => {
  if (loading) {
    return (
      <div className="p-8 font-secondary text-center text-lg font-medium text-gray-700">
        Loading meals...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 font-secondary text-center text-red-600">
        Error loading meals: {error}
      </div>
    )
  }

  return (
    <main className="p-6">
      <section className="mb-8">
        <h1 className="font-primary text-3xl font-bold">Cullinary Digital Gallery</h1>
        <p className="mt-2 font-secondary text-gray-600">
          Welcome to Cullinary's digital gallery, here you can see all our high-quality meals on display.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {meals.map((meal: MealData) => (
          <article
            key={meal.mealId}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <img
              src={meal.mealImage}
              alt={meal.mealName}
              className="h-52 w-full object-cover"
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

