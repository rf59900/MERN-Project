import { useState  } from "react"
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ board }) => {
    const [active, setActive] = useState(false);
    const [postBody, setPostBody] = useState('');
    const [image, setImage] = useState(null);
    const { auth } = useAuth();
    const nav = useNavigate();

    const axiosPrivate = useAxiosPrivate();

    const handlePost = async (e) => {
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
            form.append('board', board);
            const response = await axiosPrivate.post('/posts', form);
            //console.log(response);
        } catch(err) {
            console.error(err);
        }
        setPostBody('');
        setActive(false);
        window.location.reload(); 

    }

  return (
    <>
    { active 
    ?      
        <div className="d-flex justify-content-center mt-5">
        <div className="col-12">
        <div className="form-group text-center">
        <form onSubmit={handlePost}>
        <label htmlFor="exampleFormControlTextarea1">Create a Post</label>
        <textarea className="form-control form-control-lg" id="newPost" onChange={(e) => setPostBody(e.target.value)}></textarea>
        <div className="row">
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
        </div>
        </div>
    : 
    <div className="d-flex justify-content-end mt-5">
    <button type="button" className="btn btn-primary" onClick={() => setActive(true)}>+ Create a Post</button>
    </div>
        
    }
    </>
  )
}

export default CreatePost