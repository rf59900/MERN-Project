import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

export const NavBar = () => {
  const [items, setItems] = useState([1, 2, 3]);

  const { auth } = useContext(AuthContext);
  console.log(auth)
  
  return (
    <>
    <nav className="navbar navbar-expand sticky-top navbar-dark bg-dark">
      <div className="container text-light">
      <a className="navbar-brand" href="#">Forum</a>
      <ul className="navbar-nav">
          { Object.keys(auth).length === 0 ? 
          <li className="nav-item">
          <a href="#" className="nav-link"><Link to={"/login"}>Login</Link></a>
          </li> :
          <li className="nav-item">
          <a href="#" className="nav-link"><Link to={"/logout"}>Logout</Link></a>
          </li>
          }
      </ul>
      </div>
    </nav>
    
    </>
    )
}
