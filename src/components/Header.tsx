import { Link, NavLink } from "react-router-dom"



const Header = () => {
  return (
    <div className="h-16 p-4 bg-dusty-rose text-charcoal sticky top-0 z-10 w-full flex justify-between">
      <p className='font-primary '>
        <Link to="/">Culinary</Link>
      </p>
      <nav className="flex gap-4 font-secondary">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/digital-menu">Digital Menu</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </div>
  )
}

export default Header
