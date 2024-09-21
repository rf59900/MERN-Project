import { useState  } from "react"
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const CreateComment = ({ post, replyTo }) => {
    const [active, setActive] = useState(false);
    const [postBody, setCommentBody] = useState('');
    const [image, setImage] = useState(null);
    const nav = useNavigate();
    const { auth } = useAuth();

    const axiosPrivate = useAxiosPrivate();

    const handleComment = async (e) => {
        e.preventDefault();
        // if not logged in navigate to login page
        if (!auth?.user) {
            nav('/login');
            return;
        }
        try {
            const form = new FormData();
            form.append('img', image);
            form.append('body', postBody);
            form.append('post', post);
            replyTo ? form.append('replyTo', replyTo) : null;
            const response = await axiosPrivate.post('/comments', form);
            //console.log(response);
        } catch(err) {
            console.error(err);
        }
        setCommentBody('');
        setActive(false);
        window.location.reload(); 

    }

  return (
    <>
    <div className="d-flex flex-column container-fluid mt-0 px-0">
    { active 
    ?   <div className="form-group text-center align-self-center mb-2" style={{width: '70rem'}}>
        <form onSubmit={handleComment}>
        <label className="mt-2" htmlFor="exampleFormControlTextarea1">Comment</label>
        <textarea className="form-control form-control-lg h-100" id="newPost" onChange={(e) => setCommentBody(e.target.value)}></textarea>
        <div className="row mb-2">
            <div className="col">
            <button type="submit" className="btn btn-primary w-100" style={{marginTop: "1rem"}}>Post</button>
            </div>
            <div className="col">
            <button type="button" className="btn btn-primary w-100" onClick={() => setActive(false)} style={{marginTop: "1rem"}}>Cancel</button>
            </div>
            <div className="col">
            <input 
                    className="form-control" 
                    type="file" 
                    id="avatar"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{marginTop: "1rem"}}
            />
            </div>
        </div>
        </form>
        </div>
    : <div className="col align-self-end my-0" style={{cursor: 'pointer'}}>
        <div className="container" onClick={() => setActive(true)}>
        <div className="row">
        <div className="col px-0 mt-1">
        <img className="img-fluid mx-0 px-0" style={{"height": "2rem"}} src={'/icons/ForwardArrow.svg'}/>
        </div>
        <div className="col mx-0 ps-0 pe-2">
        <p className="mt-2 me-1">{ replyTo ? "Reply" : "Comment"}</p>
        </div>
        </div>
        </div>
        </div>
    }
    </div>
    </>
  )
}

export default CreateComment