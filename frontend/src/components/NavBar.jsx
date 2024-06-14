import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

export const NavBar = () => {
  const [items, setItems] = useState([1, 2, 3]);
  const [user, setUser] = useState();

  const { auth } = useContext(AuthContext);
  console.log(auth)

  useEffect(() => {
    setUser(auth?.user);
  }, [])
  
  return (
    <>
    <nav className="navbar navbar-expand sticky-top navbar-dark bg-dark"
    style={{height: "5rem"}}>
      <div className="container text-light overflow-hidden">
      <a className="navbar-brand"><Link to={"/"}>Forum</Link></a>
      <ul className="navbar-nav">
          { Object.keys(auth).length === 0 ? 
          <li className="nav-item">
          <a
          style={{marginBottom: "0rem"}}className="nav-link"><Link to={"/sign-up"}>Sign Up</Link></a>
          <a className="nav-link"><Link to={"/login"}>Log in</Link></a>
          </li> :
          <li className="nav-item">
          <p
          style={{marginBottom: "0rem"}}>{auth?.username}</p>
          <a href="#" className="nav-link"><Link to={"/logout"}>Log out</Link></a>
          </li>
          }
      </ul>
      </div>
    </nav>
    
    </>
    )
}
