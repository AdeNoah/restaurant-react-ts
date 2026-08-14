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

          <div className="text-charcoal absolute inset-0 flex flex-col items-center justify-center">
            <div className="bg-white/50 p-5 rounded-md max-w-lg text-center md:p-10 lg:p-10">
              <p className="text-2xl font-primary md:text-3xl lg:text-4xl">Welcome to Culinary</p>
              <p className="text-xl font-secondary md:text-2xl lg:text-3xl">Our Collection</p>
              <p className="text-sm font-secondary md:text-md lg:text-lg">
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
            <div className="bg-white/50 text-charcoal p-5 rounded-md max-w-lg text-center md:p-10 lg:p-10">
              <p className="font-primary text-2xl mb-2 md:text-4xl lg:text-4xl">Our Menu</p>
              <p className="font-secondary text-sm md:text-md lg:text-lg">Experience flavours prepared with precision.</p>
            </div>
          </div>
        </div>
      )
    }

    return null
  })()

  return (
    <>
      <div className="h-16 p-4 bg-dusty-rose text-charcoal sticky top-0 z-20 w-full flex justify-between md:w-full lg:w-full">
        <p className='font-primary '>
          <Link to="/">Culinary</Link>
        </p>
        <nav className="flex gap-4 font-secondary text-sm md:text-md lg:text-lg">
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
