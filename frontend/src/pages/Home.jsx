import { useState } from "react"
import { Link } from "react-router-dom"
import { Board } from "./Board"

const Home = () => {
    const [boards, setBoards] = useState(["a"])
    return (
        <>
        <ul>
        {boards.map(board => {
            return <li>
                <Link to={"/boards/" + board}>{board}</Link>
                </li>
        })}
        </ul>
        <h1>Home Page</h1>
        </>
  )
}

export default Home