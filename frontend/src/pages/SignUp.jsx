import { useContext, useState } from "react"
import axios from "../api/axios";

export const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');




    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');


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
            const form = new FormData();
            form.append('avatar', avatar);
            form.append('firstname', firstname);
            form.append('lastname', lastname);
            form.append('username', username);
            form.append('password1', password1);
            form.append('password2', password2);
            form.append('email', email);
            // first two registered users are automatically admins
            const users = await axios.get('/users');
            if (users?.data?.length < 2 || users?.data?.length === undefined) {
                form.append('roles[]', 'User'); 
                form.append('roles[]', 'Admin'); 
                const response = await axios.post('/users', form, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }});
                //console.log(response);
            } else {
                const response = await axios.post('/users', form, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }});
                //console.log(response);
            }
            setAvatar(null)
            setUsername('')
            setPassword1('')
            setPassword2('')
            setFirstName('')
            setLastName('')
            setEmail('')
            setSuccessMsg('Account created!')
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
        <div className="container col-4 mt-1">
            <div className="row justify-content-center">
                <div className="col-4 text-center">
                    <h1>Sign Up</h1>
                </div>
            </div>
        <form onSubmit={handleSubmit}>
        { errorMsg ? <div className="alert alert-danger" role="alert">{errorMsg}</div>: null}
        { successMsg ? <div className="alert alert-success" role="alert">{successMsg}</div>: null}
            <div className="form-group mb-2">
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
            <div className="form-group mb-2">
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
            <div className="form-group mb-2">
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
            <div className="form-group mb-2">
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
            <div className="form-group mb-2">
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
            <div className="form-group mb-2">
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
                    className="form-control custom-file-upload" 
                    type="file" 
                    id="avatar"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    />
            </div>
            <div className="row justify-content-end">
                <div className="col-4 text-center">
                    <button type="submit" className="btn btn-primary btn-block w-100">Submit</button>
                </div>
            </div>
        </form>
        </div>
        </>
    )
}
