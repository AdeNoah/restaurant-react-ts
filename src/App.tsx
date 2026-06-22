import { Routes, Route } from "react-router-dom"
// import { useEffect } from "react"
import Header from "./components/Header.tsx"
import Footer from "./components/Footer.tsx"
import Home from "./pages/Home.tsx"
import MenuAndBookings from "./pages/MenuAndBookings.tsx"
import DigitalMenu from "./pages/DigitalMenu.tsx"
import Favorites from "./pages/Favorites.tsx"
import About from "./pages/About.tsx"


function App() {

  // messy logic to fetch the data to be used accross the app.
  // const mealDBUrl = 'https://www.themealdb.com/api/json/v1/1/'
  // const handlePageLoad = async () => {
  //   try{
  //     const response = await fetch(`${mealDBUrl}`) 
  //     if(!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`)
  //     }
  //     const data = await response.json();
  //     console.log('Fetched data:', data)
  //   } catch (error) {
  //     if(error instanceof Error) {
  //       console.error("Error loading page:", error)
  //     } else {
  //       console.error("Unknown error loading page:", error)
  //     }
  //   }
  // }


  // the actual rendered part
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="px-0 py-0 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
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
