
import { useParams } from 'react-router-dom'
import { Post } from '../components/Post';
import  Comment  from '../components/Comment';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import CreateComment from '../components/CreateComment';

const ViewPost = () => {
    const { post } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [postInfo, setPostInfo] = useState('');
    const [comments, setComments] = useState([]);
    const [commentBody, setCommentBody] = useState('');


    const printReplies = (allComments, theComment) => {
        const replies = allComments.filter(comment => comment.replyTo == theComment._id);
        if (replies) {
            return replies.map((reply) => {
                return <>
                    <div className="container">
                    <Comment comment={reply} />
                    </div>
                    <div className="container">
                    {printReplies(allComments, reply)}
                    </div>
                    </>
            })
        }
    }
   

    useEffect(() => {
        const handlePostInfo = async () => {
            try {
                const response = await axiosPrivate.get(`/posts/view/${post}`);
                setPostInfo(response.data[0]);
            } catch(err) {
                console.error(err);
            }
        }
        handlePostInfo()
    }, [])

    useEffect(() => {
        const handComments = async () => {
            try {
                const response = await axiosPrivate.get(`/comments/${post}`);
                const comments = response.data;
                setComments(comments);
            } catch(err) {
                console.error(err);
            }
        }
        handComments();
    }, [])

  return (
    <>
    <div className="container">
    { postInfo
    ? <>
        <Post post={postInfo}/>
        <div className="container">
        {
            comments.map((comment) => {
                if (!comment.replyTo) {
                    return <>
                    <Comment comment={comment} />
                    {printReplies(comments, comment)}
                    </>
                }
            })
        }
        </div>
    </>
    : null}
    </div>
    </>
  )
}

export default ViewPost;