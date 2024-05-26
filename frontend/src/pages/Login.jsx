import { useContext, useState } from "react"
import axiosConfig from "../axiosConfig";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { auth, setAuth } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axiosConfig.post('/auth', {
            username: username,
            password: password
            });
            console.log(response);
        setAuth(response.data);
        console.log(auth);
    }

    return (
        <>
        <div className="container col-4 mt-5">
        <form onSubmit={handleSubmit}>
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
