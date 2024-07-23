import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export const NavBar = () => {
  const [items, setItems] = useState([1, 2, 3]);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const { auth } = useAuth();

  useEffect(() => {
    setUser(auth?.user);
    console.log(auth.roles)
  }, [])
  
  return (
    <>
     <div className="d-flex flex-row justify-content-between cust-nav py-3 sticky-top border-bottom border-dark">
      <div className="ms-4 mt-3">
        <div className="row">
          <div className="col">
            <h5 onClick={() => navigate('/')} style={{cursor: 'pointer'}}>Home</h5>
          </div>
          <div className="col ms-5">
            <p>About</p>
          </div>
        </div>
      </div>
      { auth?.user
        ? 
          <div className="d-flex flex-column me-3 text-center border border-dark rounded px-3">
            <p className="mb-0 border-bottom border-dark" style={{cursor: 'pointer'}} onClick={() =>  navigate(`/users/${auth?.user}`)}>{auth.user}</p>
            <p className="mt-1 mb-0" style={{cursor: 'pointer'}} onClick={() => navigate('/logout')}>Log Out</p>
          </div>
      :
        <div className="d-flex flex-column me-3 text-center border border-dark rounded px-3">
          <p className="mb-0 border-bottom border-dark" style={{cursor: 'pointer'}} onClick={() => navigate('/sign-up')}>Sign Up</p>
          <p className="mt-1 mb-0" style={{cursor: 'pointer'}} onClick={() => navigate('/login')}>Log In</p>
        </div>
      }
     </div>
    </>
    )
}
