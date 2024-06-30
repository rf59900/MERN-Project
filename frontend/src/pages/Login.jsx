import { useContext, useState } from "react"
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post('/auth',
                {
                    username: username,
                    password: password,
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(response.headers.cookies);
            const accessToken = response?.data?.accessToken
            setAuth({ user: username, accessToken });
            setUsername('')
            setPassword('')
            navigate(-1);

        } catch (err) {
            if (!err) {
                setErrorMsg('No response from server.')
            } else {
                setErrorMsg(err?.response?.data?.Error)
            }
            setUsername('')
            setPassword('')
        }
    }

    return (
        <>
        <div className="container col-4 mt-5">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        { errorMsg ? <div class="alert alert-danger" role="alert">{errorMsg}</div>: null}
            <div class="form-group">
                <label for="username">Username</label>
                <input type="username" 
                    class="form-control" 
                    id="username" 
                    aria-describedby="usernameHelp" 
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
            </div>
            <br/>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </div>
        </>
    )
}
