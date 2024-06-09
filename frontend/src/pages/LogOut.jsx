import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthProvider"
import { useNavigate } from "react-router-dom";

export const LogOut = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const sleep = (delay) => new Promise(res => setTimeout(res, delay));
    useEffect(() => {
        const handleLogout = async () => {
            await sleep(3000)
            setAuth({})
            navigate('/');
        }
        handleLogout();
    })
    return (
    <>
    <h1>Logging out...</h1>
    <p>You will be redirected shortly.</p>
    </>
  )
}
