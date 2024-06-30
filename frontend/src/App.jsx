import { NavBar } from "./components/NavBar";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Board } from "./pages/Board";
import { ViewPost } from "./pages/ViewPost";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { LogOut} from "./pages/LogOut";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Unauthorized from "./pages/Unauthorized";

const App = () => {
  return (
    <>
    <NavBar></NavBar>
    <Routes>
      <Route path="/sign-up" element={<SignUp/>} />
      <Route element={<PersistLogin/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/unauthorized" element={<Unauthorized/>} />

        <Route element={<RequireAuth allowedRoles={['User']}/>}>
          <Route path="/boards/:board" element={<Board/>} />
          <Route path="/posts/:post" element={<ViewPost/>} />
          <Route path="/logout" element={<LogOut/>} />
        </Route>
      </Route>
    </Routes>
    </>
  )
}

export default App