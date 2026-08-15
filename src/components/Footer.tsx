import { Link, NavLink } from "react-router-dom"

const Footer = () => {
  return (
    <div className="bg-dusty-rose h-fit p-4 w-full flex justify-between items-center font-primary text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
      <div>
        <div className="flex flex-col gap-1 sm:flex-col md:flex-row md:gap-2 lg:gap-4">
          <NavLink to="/">Cullinary</NavLink> &copy; {new Date().getFullYear()}. 
          <p>
            All rights reserved.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 sm:flex-col md:flex-row md:gap-4 lg:gap-8">
        <p>
          <Link to="#">PRIVACY POLICY</Link>
        </p>
        <p>
          <Link to="#">TERMS OF SERVICE</Link>
        </p>
        <p>
          <Link to="#">SUSTAINABILITY</Link>
        </p>
        <p>
          <Link to="#">CAREERS</Link>
        </p>
      </div>
    </div>
  )
}

export default Footer