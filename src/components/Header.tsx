import { Link, NavLink, useLocation } from "react-router-dom"
import homeBanner from "../assets/homeBanner.png"
import menuBanner from "../assets/menuBanner.png"

const Header = () => {
  const location = useLocation()

  const banner = (() => {
    if (location.pathname === "/") {
      return (
        <div className="mx-0 w-full px-0 relative h-fit">
          <img
            src={homeBanner}
            alt="Home banner"
            className="w-full h-91 object-cover"
          />

          <div className="text-cream absolute inset-0 flex flex-col items-center justify-center">
            <div className="bg-white/30 p-10 rounded-md max-w-lg text-center">
              <p className="">Welcome to Culinary</p>
              <p>Our Collection</p>
              <p>
                A visual journey through our gastronomic creations, every plate is a
                canvas, every dish a masterpiece.
              </p>
            </div>
          </div>
        </div>
      )
    }

    if (location.pathname === "/menu-and-bookings") {
      return (
        <div className="mx-0 w-full px-0 relative h-fit">
          <img
            src={menuBanner}
            alt="Menu banner"
            className="w-full h-91 object-cover"
          />

          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-white/30 text-charcoal p-10 rounded-md max-w-lg text-center">
              <p className="font-primary text-2xl mb-2">Our Menu</p>
              <p>Experience flavours prepared with precision.</p>
            </div>
          </div>
        </div>
      )
    }

    return null
  })()

  return (
    <>
      <div className="h-16 p-4 bg-dusty-rose text-charcoal sticky top-0 z-20 w-full flex justify-between">
        <p className='font-primary '>
          <Link to="/">Culinary</Link>
        </p>
        <nav className="flex gap-4 font-secondary">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu-and-bookings">Menu and Bookings</NavLink>
          <NavLink to="/digital-menu">Digital Menu</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </div>
      {banner}
    </>
  )
}

export default Header
