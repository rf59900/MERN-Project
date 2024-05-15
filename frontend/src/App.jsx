import { NavBar } from "./components/NavBar";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Board } from "./pages/Board";
import { ViewPost } from "./pages/ViewPost";

const App = () => {
  return (
    <>
    <NavBar></NavBar>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/boards/:board" element={<Board/>} />
      <Route path="/posts/:post" element={<ViewPost/>} />
    </Routes>
    </>
  )
}

export default App