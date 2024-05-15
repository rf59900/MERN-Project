import { useState, useEffect } from "react"
import { Post } from "../components/Post";
import { useParams } from "react-router-dom";

export const ViewPost = () => {
    const [comments, setComments] = useState([]);
    const [postInfo, setPostInfo] = useState();
    const { post } = useParams();

    const handlePostInfo = useEffect(() => {
        async function getPostInfo () {
            const response = await fetch(`http://localhost:5000/posts/view/${post}`);
            const newPostInfo = await response.json();
            setPostInfo(...newPostInfo);
        }
    getPostInfo()
    })
    
    const handleComments = useEffect(() => {
        async function getComments () {
            const response = await fetch(`http://localhost:5000/comments/${post}`);
            const newComments = await response.json();
            setComments(...newComments);
        }
    getComments()
    }) 
    

    return (
    <>
     <div className="container"
        style={{backgroundColor: "red",
        maxWidth: "40rem"
    }}>
    {postInfo && <Post postInfo={postInfo} />}
    {comments && comments}
    </div>
    </>
  )
}
