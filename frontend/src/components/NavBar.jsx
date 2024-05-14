import { useState } from "react"

export const NavBar = () => {
  const [items, setItems] = useState([1, 2, 3]);
  
  return (
    <>
    <nav className="navbar navbar-expand sticky-top navbar-dark bg-dark">
      <div className="container text-light">
      <a className="navbar-brand" href="#">Forum</a>
      <ul className="navbar-nav">
        {items.map(item => {
          <li className="nav-item">
          <a href="#" className="nav-link">{item}</a>
          </li>
        })}
      </ul>
      </div>
    </nav>
    
    </>
    )
}
