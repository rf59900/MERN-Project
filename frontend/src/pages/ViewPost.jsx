import { useState, useEffect } from "react"
import { Post } from "../components/Post";
import { useParams } from "react-router-dom";

export const ViewPost = () => {
    const [comments, setComments] = useState([]);
    const [postInfo, setPostInfo] = useState();
    const { post } = useParams();

    useEffect(() => {
        async function getPostInfo () {
            const response = await fetch(`http://localhost:5000/posts/view/${post}`);
            const newPostInfo = await response.json();
            setPostInfo(...newPostInfo);
        }
    getPostInfo()
    }, [])
    
    useEffect(() => {
        async function getComments () {
            try {
                const response = await fetch(`http://localhost:5000/comments/${post}`);
                const newComments = await response.json();
                const commentArray = [];
                const replyArray = [];
                // nest comments that reply to each other together in lists
                newComments.forEach(comment => {
                    if (comment.replyTo) {
                        replyArray.push(comment)
                    } else {
                        commentArray.push([comment]);
                    }
                });
                replyArray.forEach(reply => {
                    const toAdd = commentArray.find(comment => comment._id == reply.replyTo);
                    toAdd.push(reply)
                })
                console.log(commentArray)
                setComments(commentArray);
            } catch (err) {
                console.log(err);
            }
        }
    getComments()
    }, []) 
    

    return (
    <>
     <div className="container"
        style={{backgroundColor: "red",
        maxWidth: "40rem"
    }}>
    {postInfo && <Post postInfo={postInfo} />}
    {comments.map(comment => {
        console.log(comment)
    })}
    </div>
    </>
  )
}
