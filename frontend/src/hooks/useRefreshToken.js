import axios from "../api/axios"
import useAuth from "./useAuth"
import { jwtDecode } from "jwt-decode"

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();
    console.log(auth)
    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        });
        console.log(response.data.accessToken);
        const accessToken = response.data.accessToken;
        const decoded = jwtDecode(response.data.accessToken)
        const roles = decoded.userInfo.roles;
        const user = decoded.userInfo.username;


        setAuth({ user, accessToken });
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken