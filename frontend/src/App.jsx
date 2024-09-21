import { NavBar } from "./components/NavBar";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ViewPost from "./pages/ViewPost";
import { Board } from "./pages/Board";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { LogOut} from "./pages/LogOut";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Unauthorized from "./pages/Unauthorized";
import ViewUser from "./pages/ViewUser";
import UpdateAvatar from "./pages/UpdateAvatar";
import About from "./pages/About";


const App = () => {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/sign-up" element={<SignUp/>} />
      <Route element={<PersistLogin/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/unauthorized" element={<Unauthorized/>} />
        <Route path="/about" element={<About />} />

        
          <Route path="/boards/:board" element={<Board/>} />
          <Route path="/posts/:post" element={<ViewPost/>}/>
          <Route path="/logout" element={<LogOut/>} />
          <Route path="/users/:username" element={<ViewUser />} />
          <Route path="/update-avatar/:username" element={<UpdateAvatar/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App