import { Routes, Route, useLocation } from "react-router-dom"
import Header from "./components/Header.tsx"
import Footer from "./components/Footer.tsx"
import Home from "./pages/Home.tsx"
import Bookings from "./pages/Bookings.tsx"
import Menu from "./pages/Menu.tsx"
import Favorites from "./pages/Favorites.tsx"
import About from "./pages/About.tsx"

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className={`w-full px-4 sm:px-6 mx-auto flex-1 ${location.pathname === "/" ? "max-w-none" : "max-w-full"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/Bookings" element={<Bookings />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
