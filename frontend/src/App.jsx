import { NavBar } from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Board } from "./pages/Board";

const App = () => {
  return (
    <>
    <NavBar></NavBar>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/boards/:board" element={<Board/>} />
    </Routes>
    </>
  )
}

export default App