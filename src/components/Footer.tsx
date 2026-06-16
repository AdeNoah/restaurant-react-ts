import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="bg-dusty-rose h-32 p-4 w-full flex flex-col justify-center">
        <p className="font-primary">Culinary</p>
        <div className="flex justify-between font-secondary">
          <div>
            &copy; {new Date().getFullYear()} Culinary. All rights reserved.
          </div>
          <div className="flex gap-4">
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
    </div>
  )
}

export default Footer