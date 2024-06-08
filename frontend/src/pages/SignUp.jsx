import { useContext, useState } from "react"
import axiosConfig from "../axiosConfig";

export const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [avatar, setAvatar] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');


    const [errorMsg, setErrorMsg] = useState('');


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
            const response = await axiosConfig.post('/users', {
                avatar: avatar,
                firstname: firstname,
                lastname: lastname,
                username: username,
                password1: password1,
                password2: password2,
                email: email
                });
                console.log(response);
            setAvatar('')
            setUsername('')
            setPassword1('')
            setPassword2('')
            setFirstName('')
            setLastName('')
            setEmail('')
        } catch (err) {
            if (!err) {
                setErrorMsg('No response from server.')
            } else {
                setErrorMsg(err?.response?.data?.Error)
            }
            setAvatar('')
            setUsername('')
            setPassword1('')
            setPassword2('')
            setFirstName('')
            setLastName('')
            setEmail('')
        }
    }

    return (
        <>
        <div className="container col-4 mt-5">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
        { errorMsg ? <div className="alert alert-danger" role="alert">{errorMsg}</div>: null}
            <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input type="firstname" 
                    className="form-control" 
                    id="firstname" 
                    aria-describedby="firstnameHelp" 
                    placeholder="Enter first name"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input type="lastname" 
                    className="form-control" 
                    id="lastname" 
                    aria-describedby="lastnameHelp" 
                    placeholder="Enter last name"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" 
                    className="form-control" 
                    id="email" 
                    aria-describedby="emailHelp" 
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="username" 
                    className="form-control" 
                    id="username" 
                    aria-describedby="usernameHelp" 
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="password1">Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="password1" 
                    placeholder="Password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="password2" 
                    placeholder="Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    />
            </div>
            <div className="mb-3">
                <label htmlFor="formFile" className="form-label">Upload Avatar Image (Optional)</label>
                <input 
                    className="form-control" 
                    type="file" 
                    id="avatar"
                    onChange={(e) => setAvatar(e.target.value)}
                    />
            </div>
            <br/>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
        </>
    )
}
