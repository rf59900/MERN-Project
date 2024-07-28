import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode"

import React, { useEffect } from 'react'

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const decoded = auth?.accessToken ? 
        jwtDecode(auth.accessToken) :
        undefined;

    //console.log(`jwt decoded: ${decoded}`)
    const roles = decoded?.userInfo?.roles || [];
    //console.log(roles)

    return (
    roles?.find(role => allowedRoles?.includes(role)) ?
    <Outlet /> 
    : auth?.accessToken
    ? <Navigate to='/unauthorized' state={{ from: location }} replace/>
    : <Navigate to='/login' state={{ from: location }} replace/>
    )
}

export default RequireAuth;
