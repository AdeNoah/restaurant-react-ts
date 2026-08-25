// import { BrowserRouter } from 'react-router-dom';
// Routes, Route, Link, Outlet, useParams

import { Link } from "react-router-dom"




const Menu = () => {
  return (
    <>
      <div className="w-full py-4 flex justify-between gap-4">
        <div className="bg-cream p-4 rounded-md shadow-lg">
          <p className="font-primary font-bold text-lg border-b mb-4">CATEGORIES</p>
          <ul className="mb-4">
            <li className ="border-b mb2">
              <p className="font-secondary ">Meals</p>
            </li>
            <li><Link to="/starters">Starters</Link></li>
            <li><Link to="/main-courses">Main Course</Link></li>
            <li><Link to="/desserts">Desserts</Link></li>
          </ul>

          <ul>
            <li className ="border-b ">
              <p className="font-secondary ">Drinks</p>
            </li>
            <li><Link to="/alcoholic">Alcoholic</Link></li>
            <li><Link to="/non-alcoholic">Non-Alcoholic</Link></li>
            <li><Link to="/cocktails">Cocktails</Link></li>
          </ul>
        </div>

        <div className="bg-cream p-4 rounded-md shadow-lg fit-content flex-1">
          <p className="font-primary font-bold text-lg border-b mb-4 text-center">CATEGORY</p>
        </div>
      </div>
    </>
  )
}

export default Menu
