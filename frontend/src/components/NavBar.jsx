import { useState } from "react"
import { Link } from "react-router-dom";

export const NavBar = () => {
  const [items, setItems] = useState([1, 2, 3]);
  
  return (
    <>
    <nav className="navbar navbar-expand sticky-top navbar-dark bg-dark">
      <div className="container text-light">
      <a className="navbar-brand" href="#">Forum</a>
      <ul className="navbar-nav">
          <li className="nav-item">
          <a href="#" className="nav-link"><Link to={"/login"}>Login</Link></a>
          </li>
      </ul>
      </div>
    </nav>
    
    </>
    )
}
