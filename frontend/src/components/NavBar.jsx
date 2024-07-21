import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export const NavBar = () => {
  const [items, setItems] = useState([1, 2, 3]);
  const [user, setUser] = useState();

  const { auth } = useAuth();

  useEffect(() => {
    setUser(auth?.user);
    console.log(auth.roles)
  }, [])
  
  return (
    <>
    <nav className="navbar navbar-expand sticky-top navbar-dark bg-dark"
    style={{height: "5rem"}}>
      <div className="container text-light overflow-hidden">
      <Link to={"/"}>Forum</Link>
      <ul className="navbar-nav">
          { Object.keys(auth).length === 0 ? 
          <li className="nav-item">
          <Link to={"/sign-up"}>Sign Up</Link>
          <Link to={"/login"}>Log in</Link>
          </li> :
          <li className="nav-item">
          <p
          style={{marginBottom: "0rem"}}>{auth.user}</p>
          <Link to={"/logout"}>Log out</Link>
          </li>
          }
      </ul>
      </div>
    </nav>
    
    </>
    )
}
