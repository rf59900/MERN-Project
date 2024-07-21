import { Link, useLocation, useNavigate } from "react-router-dom"
import { AvatarImage } from "./AvatarImage"
import { useEffect } from "react"
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import CreateComment from "./CreateComment"


 export const Post = ({post}) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate();
  const location = useLocation()

  console.log(location.pathname.startsWith('/boards'))

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
    navigate(`/users/${post.user.username}`);
  }


   return (
     <>
     <div className="row bg-secondary d-flex flex-row border border-bottom-0 border-secondary justify-content-end mt-5">
     <div className="col-2 text-end px-auto mx-0 ">
      {post.createdAt.split('T')[0]} {post.createdAt.split('T')[1].split('.')[0]}
    </div>
    </div>
     <div className={location.pathname.startsWith('/boards') ? "row flex-row justify-content-start bg-light bg-gradient border border-secondary": "row flex-row justify-content-start bg-light bg-gradient border border-bottom-0 border-secondary" } style={{cursor: 'pointer'}}>
     <div className="col-2 py-4 px-4 border-end border-secondary" onClick={handleLinkToUser} style={{cursor: 'pointer'}}>
      { post.user.avatar != null
       ? <><img  className="img-fluid" src={'/uploads/avatars/' + post.user.avatar}/>
          <div className="d-flex flex-row justify-content-center py-3"><p className="mt-3">{post.user.username}</p></div>
          </>
       : <>
          <div className="d-flex flex-row justify-content-center py-3"><p className="mt-3">{post.user.username}</p></div>
       </>
      }
      </div>
      { 
      post?.img
      ? <><div className="col-3 py-4 px-4" onClick={handleLinkToPost} style={{cursor: 'pointer'}}><img  className="img-fluid" src={'/uploads/posts/' + post.img}/></div>
      { auth?.roles?.includes('Admin')
      ? <><div className="col-6 py-4 px-4" onClick={handleLinkToPost} style={{cursor: 'pointer'}}>
        <p>{post.body}</p>
        </div>
        <div className="col-1 d-flex align-items-center">
        <div className="mx-auto">
        <button className="btn btn-danger" onClick={handleDeletePost}><h6>Delete</h6></button>
        </div>
        </div>
        </>
      : <><div className="col-7 py-4 px-4" onClick={handleLinkToPost} style={{cursor: 'pointer'}}>
        <p>{post.body}</p>
        </div>
        </> }
      </>
      : <> { auth?.roles?.includes('Admin')
      ? <><div className="col-9 py-4 px-4" onClick={handleLinkToPost} style={{cursor: 'pointer'}}>
        <p>{post.body}</p>
        </div>
        <div className="col-1 d-flex align-items-center">
        <div className="mx-auto">
        <button className="btn btn-danger" onClick={handleDeletePost}><h6>Delete</h6></button>
        </div>
        </div>
        </>
      : <><div className="col-10 py-4 px-4" onClick={handleLinkToPost} style={{cursor: 'pointer'}}>
        <p>{post.body}</p>
        </div>
        </> }
        </>
      }
     </div>
     { location.pathname.split('/')[1] == 'posts'
     ? <div className="row">
      <CreateComment post={post._id} />
     </div>
     : null
     }
     </>
   )
 }
 