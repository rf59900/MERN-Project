import useAuth from "../hooks/useAuth"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import useImageURL from "../hooks/useImageURL"
import useAxiosPrivate from "../hooks/useAxiosPrivate"

const UpdateAvatar = () => {
    const [ image, setImage ] = useState();
    const handleImage = useImageURL();
    const { username } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [ userInformation, setUserInformation ] = useState();
    const [avatar, setAvatar] = useState(null);
    const { auth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleUserInformation = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${username}`);
                if (response.data[0].username != auth.user) {
                    navigate('/unauthorized');
                }
                setUserInformation(response.data[0]);
            } catch(err) {
                console.error(err);
            }
        }
        handleUserInformation();
    }, [auth])

    useEffect(() => {
        const handleUserImage = async () => {
            if (userInformation) {
            try {
                const userImage = await handleImage(userInformation.avatar);
                setImage(userImage);
            } catch(err) {
                console.error(err);
            }
            }
        }
        handleUserImage();
    }, [userInformation]);

    const handleChangeAvatar  = async (e) => {
        e.preventDefault()
        const form = new FormData();
        form.append('avatar', avatar);
        form.append('username', username);
        try {
            const response = await axiosPrivate.patch('/users/update-avatar', form, {
                headers: {
                    'content-type': 'multipart/form-data'
            }});
            //console.log(response.data)
        } catch(err) {
            console.error(err)
        }
        setAvatar(null)
        navigate(-1);
    }


  return (
    <>
    { userInformation
    ? <div className="container mt-3">
        <div className="row justify-content-center">
            <div className="col-8 text-center">
                <div className="row justify-content-center">
                    <div className="col-6">
                        { userInformation.avatar != null
                            ?<h1>Current Avatar</h1>
                            :<h1>No Current Avatar</h1>
                        }
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-6">
                        <img src={image} className="img-fluid img-thumbnail w-100"/>
                    </div>
                </div>
                <form onSubmit={handleChangeAvatar}>
                    <div className="row mt-3 justify-content-center">
                        <div className="col-3">
                            <input onChange={(e) => setAvatar(e.target.files[0])} className="form-control custom-file-upload" type="file" id="avatar" />
                        </div>
                        <div className="col-3">
                            <button className="btn btn-block btn-primary w-100" type="submit">Change</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    : <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-4 text-center">
                <h1>User not found...</h1>
            </div>
        </div>
    </div> }
    </>
  )
}

export default UpdateAvatar