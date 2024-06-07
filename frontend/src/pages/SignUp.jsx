import { useContext, useState } from "react"
import axiosConfig from "../axiosConfig";
import AuthContext from "../context/AuthProvider";

export const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');


    const [errorMsg, setErrorMsg] = useState('');

    const { setAuth } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            if (password1 != password2) {
                setErrorMsg('Passwords do not match')
                setUsername('')
                setPassword1('')
                setPassword2('')
                return     
            }
            const response = await axiosConfig.post('/auth', {
                username: username,
                password: password1
                });
                console.log(response);
            const accessToken = response?.data?.accessToken
            const roles = response?.data?.roles
            setAuth({ username, password, roles, accessToken });
            setUsername('')
            setPassword1('')
            setPassword2('')
        } catch (err) {
            if (!err) {
                setErrorMsg('No response from server.')
            } else {
                setErrorMsg(err?.response?.data?.Error)
            }
            setUsername('')
            setPassword1('')
            setPassword2('')
        }
    }

    return (
        <>
        <div className="container col-4 mt-5">
        <h1>Sign Up</h1>
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
                <label for="password1">Password</label>
                <input 
                    type="password" 
                    class="form-control" 
                    id="password1" 
                    placeholder="Password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    />
            </div>
            <div class="form-group">
                <label for="password">Confirm Password</label>
                <input 
                    type="password" 
                    class="form-control" 
                    id="password2" 
                    placeholder="Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    />
            </div>
            <div class="mb-3">
                <label for="formFile" class="form-label">Upload Avatar Image</label>
                <input class="form-control" type="file" id="formFile"/>
            </div>
            <br/>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </div>
        </>
    )
}
