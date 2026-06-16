import { Routes, Route } from "react-router-dom"
import Header from "./components/Header.tsx"
import Footer from "./components/Footer.tsx"
import Home from "./pages/Home.tsx"
import Menu from "./pages/Menu.tsx"
import DigitalMenu from "./pages/DigitalMenu.tsx"
import Favorites from "./pages/Favorites.tsx"
import About from "./pages/About.tsx"


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="px-4 py-0 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
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
