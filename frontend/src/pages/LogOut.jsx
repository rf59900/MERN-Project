import { useContext, useEffect, useState } from "react"
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export const LogOut = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const sleep = (delay) => new Promise(res => setTimeout(res, delay));
    useEffect(() => {
        const handleLogout = async () => {
            await sleep(3000)
            try {
                const response = await axios.get('/auth/logout', {
                    withCredentials: true
                });
                setAuth({})
                navigate('/');
            } catch (err) {
                console.error(err);
            }
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
