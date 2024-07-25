import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useImageURL from "../hooks/useImageURL";
import { Post } from "../components/Post";
import Comment from "../components/Comment";
import useAuth from "../hooks/useAuth";
import { HashLink } from 'react-router-hash-link';



const ViewUser = () => {
    const [ userInformation, setUserInformation] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const { username } = useParams();
    const [ selected, setSelected ] = useState('posts');
    const [ userPosts, setUserPosts ] = useState(null);
    const [ userComments, setUserComments ] = useState(null);
    const { auth } = useAuth();

    const handleImage = useImageURL();
    const [ image, setImage ] = useState();

    useEffect(() => {
        const handUserInfo = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${username}`)
                setUserInformation(response.data[0]);
            } catch (err) {
                console.error(err);
            }
        }
        handUserInfo();
        const handleUserPosts = async () => {
            try {
                const response = await axiosPrivate.get(`posts/${username}`);
                const posts = response.data;
                console.log(posts)
                setUserPosts(posts)

            } catch(err) {
                console.error(err);
            }
        }
        handleUserPosts();
        const handleUserComments = async () => {
            try {
                const response = await axiosPrivate.get(`comments/user/${username}`);
                const comments = response.data;
                console.log(comments)
                setUserComments(comments)

            } catch(err) {
                console.error(err);
            }
        }
        handleUserComments();
    }, []);

    useEffect(() => {
        if (userInformation?.avatar) {
            const handleUserImage = async () => {
                try {
                    const userImage = await handleImage(userInformation?.avatar);
                    setImage(userImage);
                } catch(err) {
                    console.error(err);
                }
            }
            handleUserImage();
        }
    }, [userInformation]);
    console.log(image)

    console.log(userInformation)
    const handleDeleteUser = async () => {
        try {
            const response = await axiosPrivate.delete(`/users/${username}`);
            window.location.reload(); 
        } catch(err) {
            console.error(err);
        }

    }
   



    

  return (
    <>
    <div className="container mb-5">
        {
            userInformation
            ?   <>
                { userInformation?.avatar
                ? <div className="row justify-content-center mt-4 mb-3">
                    <div className="col-3">
                        <img className="img-fluid img-thumbnail" src={image} />
                    </div>
                </div>
                : null
                }   
                <div className={userInformation?.avatar ? "row justify-content-center" : "row justify-content-center mt-5"}>
                    <div className="col-3 text-center">
                    <p>{userInformation?.username}</p>
                    </div>
                </div>
                <div className="row justify-content-center text-center">
                    <div className={ selected == 'posts' ? "col-1 border border-primary border-bottom-0 mx-2 rounded-top" : "col-1 border border-dark border-bottom-0 mx-2 rounded-top" } onClick={() => setSelected('posts')} style={{cursor: 'pointer'}}>
                        <p className="mt-2">Posts</p>
                    </div>
                    <div className={ selected == 'comments' ? "col-1 border border-primary border-bottom-0 mx-2 rounded-top" : "col-1 border border-dark border-bottom-0 mx-2 rounded-top" } onClick={() => setSelected('comments')} style={{cursor: 'pointer'}}>
                        <p className="mt-2">Comments</p>
                    </div>
                    <div className={ selected == 'about' ? "col-1 border border-primary border-bottom-0 mx-2 rounded-top" : "col-1 border border-dark border-bottom-0 mx-2 rounded-top" } onClick={() => setSelected('about')} style={{cursor: 'pointer'}}>
                        <p className="mt-2">About</p>
                    </div>
                </div>
                <div className="container border-top border-primary">
                    { selected == 'posts'
                    ? <>
                    {userPosts?.map((post) => {
                        return <Post post={post} />
                    })}
                    { userPosts?.length == 0
                    ? <div className="row justify-content-center py-5">
                        <div className="col-3 text-center">
                            <p>{`${userInformation.username} has no posts...`}</p>
                        </div>
                    </div>
                    : null }
                    </> 
                    : null }
                    { selected == 'comments'
                    ? <>
                    {userComments.map((comment) => {
                        console.log(comment.user.avatar)
                        return <HashLink to={`/posts/${comment.post}#${comment._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}><Comment comment={comment}/></HashLink>
                    })}
                    { userComments?.length == 0
                    ? <div className="row justify-content-center py-5">
                        <div className="col-3 text-center">
                            <p>{`${userInformation.username} has no comments...`}</p>
                        </div>
                    </div>
                    : null }
                    </>
                    : null }
                    { selected == 'about'
                    ?   <>
                        <div className="container mt-5">
                            <div className="row justify-content-center">
                                <div className="col-3 text-center">
                                    <p>Date Joined: {userInformation.createdAt.split('T')[0]}</p>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-3 text-center">
                                    <p>Number of Posts: {userPosts.length}</p>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-3 text-center">
                                    <p>Number of Comments: {userComments.length}</p>
                                </div>
                            </div>
                            { auth?.roles?.includes('Admin')
                                ? <div className="row justify-content-center text-center mt-4">
                                    <div className="col-4">
                                        <button onClick={() => handleDeleteUser()}className="btn btn-danger">Delete User</button>
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                        </>
                    : null }
                </div>
                </> 
            : 
                <div className="row justify-content-center mt-5">
                    <div className="col-4 text-center">
                        <h2>User Not Found...</h2>
                    </div>
                </div>
        }
    </div>
    </>
  )
}

export default ViewUser