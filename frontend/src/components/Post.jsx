import { Link } from "react-router-dom"
import { AvatarImage } from "./AvatarImage"
import { useEffect } from "react"
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate"


 export const Post = ({post}) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate()

  const handleDeletePost = async () => {
    try {
      const response = await axiosPrivate.delete(`/posts/${post._id}`);
      window.location.reload(); 
    } catch(err) {
      console.error(err);
    }

  } 

   return (
     <>
     <div className="row justify-content-start border border-primary mt-5 mb-5">
     <div className="col-2 border border-primary py-5 px-4">
      <img  className="img-fluid border border-danger my-auto" src={'/uploads/avatars/' + post.user.avatar}/>
      <div className="d-flex flex-row border border-danger justify-content-center py-3"><p>{post.user.username}</p></div>
      </div>
      <div className="col-3 border border-primary py-5 px-4"><img  className="img-fluid border border-danger my-auto" src={'/uploads/posts/' + post.img}/></div>
      { auth?.roles.includes('Admin')
      ? <><div className="col-6 border border-primary py-5 px-4">
        <p className="border border-danger">{post.body}</p>
        </div>
        <div className="col-1 d-flex align-items-center border border-primary">
        <div className="mx-auto">
        <button className="btn btn-danger" onClick={handleDeletePost}><h6>Delete</h6></button>
        </div>
        </div>
        </>
      : <><div className="col-7 border border-primary py-5 px-4">
        <p className="border border-danger">{post.body}</p>
        </div>
        </> }
     </div>
     </>
   )
 }
 