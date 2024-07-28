import axios from "../api/axios"
import useAuth from "./useAuth"
import { jwtDecode } from "jwt-decode"

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();
    //console.log(auth)
    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        });
        //console.log(response)
        //console.log(response.data.accessToken);
        const accessToken = response.data.accessToken;
        try {
            const decoded = jwtDecode(response.data.accessToken)
            //console.log(decoded)
            //console.log(`user info: ${decoded.userInfo}`)
            const roles = decoded?.userInfo?.roles;
            const user = decoded?.userInfo?.username;
            setAuth({ user, roles, accessToken });
            return response.data.accessToken;
        } catch (err) {
            console.error(err)
        }
    }
    return refresh;
}

export default useRefreshToken