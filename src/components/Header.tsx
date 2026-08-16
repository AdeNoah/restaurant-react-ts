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

          <div className="text-charcoal absolute inset-0 flex flex-col items-center justify-center ">
            <div className="bg-white/50 p-5 rounded-md max-w-4/5 text-center md:p-10 lg:p-10 ">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-primary">Welcome to Culinary</p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-secondary">Our Collection</p>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg font-secondary">
                A visual journey through our gastronomic creations, every plate is a
                canvas, every dish a masterpiece.
              </p>
            </div>
          </div>
        </div>
      )
    }

    if (location.pathname === "/menu") {
      return (
        <div className="mx-0 w-full px-0 relative h-fit">
          <img
            src={menuBanner}
            alt="Menu banner"
            className="w-full h-91 object-cover"
          />

          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-white/50 text-charcoal p-5 rounded-md max-w-4/5 text-center md:p-10 lg:p-10">
              <p className="font-primary text-xl sm:text-2xl md:text-4xl lg:text-4xl mb-2">Our Menu</p>
              <p className="font-secondary text-xs sm:text-sm md:text-base lg:text-lg">Experience flavours prepared with precision.</p>
            </div>
          </div>
        </div>
      )
    }

    return null
  })()

  return (
    <>
      <div className="h-fit p-4 bg-dusty-rose text-charcoal sticky top-0 z-20 flex justify-between items-center">
        <p className='font-primary mr-4 text-lg sm:text-xl md:text-2xl'>
          <Link to="/">Culinary</Link>
        </p>
        <nav className="flex gap-1.5 font-secondary text-sm sm:text-base md:text-lg md:gap-4 lg:text-xl lg:gap-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/bookings">Bookings</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </div>
      {banner}
    </>
  )
}

export default Header
