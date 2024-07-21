import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Post } from "../components/Post";
import Comment from "../components/Comment";


const ViewUser = () => {
    const [ userInformation, setUserInformation] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const { username } = useParams();
    const [ selected, setSelected ] = useState('posts');
    const [ userPosts, setUserPosts ] = useState(null);
    const [ userComments, setUserComments ] = useState(null);




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

   



    

  return (
    <>
    <div className="container">
        {
            userInformation
            ?   <>
                { userInformation?.avatar
                ? <div className="row justify-content-center mt-3">
                    <div className="col-3">
                        <img className="img-fluid" src={'/uploads/avatars/' + userInformation.avatar} />
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
                    <div className={ selected == 'posts' ? "col-1 border border-dark border-bottom-0 mx-2 rounded-top" : "col-1 border border-bottom-0 mx-2 rounded" } onClick={() => setSelected('posts')} style={{cursor: 'pointer'}}>
                        <p className="mt-2">Posts</p>
                    </div>
                    <div className={ selected == 'comments' ? "col-1 border border-dark border-bottom-0 mx-2 rounded-top" : "col-1 border border-bottom-0 mx-2 rounded" } onClick={() => setSelected('comments')} style={{cursor: 'pointer'}}>
                        <p className="mt-2">Comments</p>
                    </div>
                    <div className={ selected == 'about' ? "col-1 border border-dark border-bottom-0 mx-2 rounded-top" : "col-1 border border-bottom-0 mx-2 rounded" } onClick={() => setSelected('about')} style={{cursor: 'pointer'}}>
                        <p className="mt-2">About</p>
                    </div>
                </div>
                <div className="container border">
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
                        return <Comment comment={comment}/>
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
                        <div className="container">
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
                        </div>
                        </>
                    : null }
                </div>
                </> 
            : <p>User Not Found</p>
        }
    </div>
    </>
  )
}

export default ViewUser