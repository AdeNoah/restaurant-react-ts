import { type MealData } from "../data/types"

const mealURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian"

export async function fetchHomeMeals(): Promise<MealData[]> {
  const response = await fetch(mealURL)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result = await response.json()
  const items = Array.isArray(result.meals) ? result.meals : []

  const mappedMeals: MealData[] = items.map((meal: any) => ({
    mealId: Number(meal.idMeal) || 0,
    mealName: meal.strMeal || "Unknown meal",
    mealPrice: Number((Math.random() * 18 + 5).toFixed(2)),
    mealImage: meal.strMealThumb || "",
  }))

  return mappedMeals
}

// export default { fetchHomeMeals }

