import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import Header from "./components/Header.tsx"
import Footer from "./components/Footer.tsx"
import Home from "./pages/Home.tsx"
import MenuAndBookings from "./pages/MenuAndBookings.tsx"
import DigitalMenu from "./pages/DigitalMenu.tsx"
import Favorites from "./pages/Favorites.tsx"
import About from "./pages/About.tsx"
import { type MealData } from "./data/types"

function App() {
  const [meals, setMeals] = useState<MealData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // const mealURL = "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  const mealURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian"
  
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(mealURL)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        const items = Array.isArray(result.meals) ? result.meals : []

        const mappedMeals: MealData[] = items.map((meal: any) => ({
          mealId: Number(meal.idMeal) || 0,
          mealName: meal.strMeal || "Unknown meal",
          mealPrice: Number((Math.random() * 12 + 5).toFixed(2)),
          mealImage: meal.strMealThumb || "",
        }))

        setMeals(mappedMeals)
      } catch (fetchError) {
        if (fetchError instanceof Error) {
          setError(fetchError.message)
        } else {
          setError("An unknown error occurred while loading meals.")
        }
      } finally {
        setLoading(false)
      }
    }
 
    fetchMeals()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="w-full max-w-5xl px-4 sm:px-6 mx-auto flex-1">
        <Routes>
          <Route
            path="/"
            element={<Home meals={meals} loading={loading} error={error} />}
          />
          <Route path="/menu-and-bookings" element={<MenuAndBookings />} />
          <Route path="/digital-menu" element={<DigitalMenu />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
