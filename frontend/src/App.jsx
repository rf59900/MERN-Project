import { NavBar } from "./components/NavBar";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Board } from "./pages/Board";
import { ViewPost } from "./pages/ViewPost";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { LogOut} from "./pages/LogOut";

const App = () => {
  return (
    <>
    <NavBar></NavBar>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/boards/:board" element={<Board/>} />
      <Route path="/posts/:post" element={<ViewPost/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/sign-up" element={<SignUp/>} />
      <Route path="/logout" element={<LogOut/>} />
    </Routes>
    </>
  )
}

export default App