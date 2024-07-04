
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
                setComments(response.data);
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
    ? <><Post post={postInfo}/>
        <div className="container">
        <CreateComment post={postInfo._id}/>
        { comments.map((comment) => {
            return <Comment comment={comment}/>
        })}
        </div>
        </>
    : null}
    </div>
    </>
  )
}

export default ViewPost;