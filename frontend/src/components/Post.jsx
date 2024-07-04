import { Link, useNavigate } from "react-router-dom"
import { AvatarImage } from "./AvatarImage"
import { useEffect } from "react"
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate"


 export const Post = ({post}) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate();

  const handleDeletePost = async () => {
    try {
      const response = await axiosPrivate.delete(`/posts/${post._id}`);
      window.location.reload(); 
    } catch(err) {
      console.error(err);
    }

  }
  
  const handleLinkToPost = () => {
    navigate(`/posts/${post._id}`);
  }

  const handleLinkToUser = () => {
    // navigate to view user page
  }


   return (
     <>
     <div className="row justify-content-start border border-primary mt-5 mb-5">
     <div className="col-2 border border-primary py-5 px-4" onClick={handleLinkToUser} style={{cursor: 'pointer'}}>
      { post.user.avatar != null
       ? <><img  className="img-fluid border border-danger my-auto" src={'/uploads/avatars/' + post.user.avatar}/>
          <div className="d-flex flex-row border border-danger justify-content-center py-3"><p>{post.user.username}</p></div>
          </>
       : <>
          <div className="d-flex flex-row border border-danger justify-content-center py-3 mt-5"><p className="mt-auto">{post.user.username}</p></div>
       </>
      }
      </div>
      { 
      post?.img
      ? <><div className="col-3 border border-primary py-5 px-4" onClick={handleLinkToPost} style={{cursor: 'pointer'}}><img  className="img-fluid border border-danger my-auto" src={'/uploads/posts/' + post.img}/></div>
      { auth?.roles?.includes('Admin')
      ? <><div className="col-6 border border-primary py-5 px-4" onClick={handleLinkToPost} style={{cursor: 'pointer'}}>
        <p className="border border-danger">{post.body}</p>
        </div>
        <div className="col-1 d-flex align-items-center border border-primary">
        <div className="mx-auto">
        <button className="btn btn-danger" onClick={handleDeletePost}><h6>Delete</h6></button>
        </div>
        </div>
        </>
      : <><div className="col-7 border border-primary py-5 px-4" onClick={handleLinkToPost} style={{cursor: 'pointer'}}>
        <p className="border border-danger">{post.body}</p>
        </div>
        </> }
      </>
      : <> { auth?.roles?.includes('Admin')
      ? <><div className="col-9 border border-primary py-5 px-4" onClick={handleLinkToPost} style={{cursor: 'pointer'}}>
        <p className="border border-danger">{post.body}</p>
        </div>
        <div className="col-1 d-flex align-items-center border border-primary">
        <div className="mx-auto">
        <button className="btn btn-danger" onClick={handleDeletePost}><h6>Delete</h6></button>
        </div>
        </div>
        </>
      : <><div className="col-10 border border-primary py-5 px-4" onClick={handleLinkToPost} style={{cursor: 'pointer'}}>
        <p className="border border-danger">{post.body}</p>
        </div>
        </> }
        </>
      }
     </div>
     </>
   )
 }
 