import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Post } from "../components/Post";

const ViewUser = () => {
    const [ userInformation, setUserInformation] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const { username } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ selected, setSelected ] = useState('posts');
    const [ pageBody, setPageBody ] = useState('');


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
        setLoading(false);
    }, []);

    
    const handleUserPosts = async () => {
        try {
            const response = await axiosPrivate.get(`/posts/${userInformation?.username}`);
            const posts = response.data;
            console.log(posts)
            setPageBody (
                <>
                {posts.map((post) => {
                    <Post post={post} />
                })}
                </>
            )

        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (selected == 'posts') {
            handleUserPosts()
        }

    }, [loading])



    

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
                    <div className={ selected == 'posts' ? "col-1 border border-dark border-bottom-0 mx-2 rounded" : "col-1 border border-bottom-0 mx-2 rounded" } onClick={() => setSelected('posts')} style={{cursor: 'pointer'}}>
                        <p className="mt-2">Posts</p>
                    </div>
                    <div className={ selected == 'comments' ? "col-1 border border-dark border-bottom-0 mx-2 rounded" : "col-1 border border-bottom-0 mx-2 rounded" } onClick={() => setSelected('comments')} style={{cursor: 'pointer'}}>
                        <p className="mt-2">Comments</p>
                    </div>
                    <div className={ selected == 'about' ? "col-1 border border-dark border-bottom-0 mx-2 rounded" : "col-1 border border-bottom-0 mx-2 rounded" } onClick={() => setSelected('about')} style={{cursor: 'pointer'}}>
                        <p className="mt-2">About</p>
                    </div>
                </div>
                <div className="container border">
                    { loading ? <p>loading....</p> : pageBody }
                </div>
                </> 
            : <p>User Not Found</p>
        }
    </div>
    </>
  )
}

export default ViewUser