import { Link, useNavigate, useLocation } from "react-router-dom"
import { AvatarImage } from "./AvatarImage"
import { useEffect } from "react"
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import CreateComment from "./CreateComment"


const Comment = ( {comment }) => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate();
    const location = useLocation();

    const handleDeleteComment = async () => {
        try {
          const response = await axiosPrivate.delete(`/comments/${post._id}`);
          window.location.reload(); 
        } catch(err) {
          console.error(err);
        }
    }

    const handleLinkToUser = () => {
      navigate(`/users/${comment.user.username}`);
    }
    
    const handleLinkToPost = () => {
      navigate(`/posts/${comment.post}`);
    }
  
    
  return (
    <>
    <div className="row bg-secondary d-flex flex-row border border-bottom-0 border-secondary justify-content-end mt-5">
     <div className="col-2 text-end px-auto mx-0 ">
      {comment.createdAt.split('T')[0]} {comment.createdAt.split('T')[1].split('.')[0]}
    </div>
    </div>
    <div className="row flex-row justify-content-start bg-light bg-gradient border border-bottom-0 border-secondary">
    <div className="col-2 py-4 px-4 border-end border-secondary" onClick={handleLinkToUser} style={{cursor: 'pointer'}}>
     { comment.user.avatar != null
      ? <><img  className="img-fluid" src={'/uploads/avatars/' + comment.user.avatar}/>
         <div className="d-flex flex-row justify-content-center py-3"><p className="mt-3">{comment.user.username}</p></div>
         </>
      : <>
         <div className="d-flex flex-row justify-content-center py-3"><p className="mt-3">{comment.user.username}</p></div>
      </>
     }
     </div>
     { 
     comment?.img
     ? <><div className="col-3 py-4 px-4" onClick={handleLinkToPost} style={{cursor: 'pointer'}}><img  className="img-fluid" src={'/uploads/comments/' + comment.img}/></div>
     { auth?.roles?.includes('Admin')
     ? <><div className="col-6 py-4 px-4" onClick={handleLinkToPost} style={{cursor: 'pointer'}}>
       <p>{comment.body}</p>
       </div>
       <div className="col-1 d-flex align-items-center" onClick={handleLinkToPost} style={{cursor: 'pointer'}}>
       <div className="mx-auto">
       <button className="btn btn-danger" onClick={handleDeleteComment}><h6>Delete</h6></button>
       </div>
       </div>
       </>
     : <><div className="col-7" onClick={handleLinkToPost} style={{cursor: 'pointer'}}>
       <p>{comment.body}</p>
       </div>
       </> }
     </>
     : <> { auth?.roles?.includes('Admin')
     ? <><div className="col-9 py-4 px-4" onClick={handleLinkToPost} style={{cursor: 'pointer'}}>
       <p>{comment.body}</p>
       </div>
       <div className="col-1 d-flex align-items-center" onClick={handleLinkToPost} style={{cursor: 'pointer'}}>
       <div className="mx-auto">
       <button className="btn btn-danger" onClick={handleDeleteComment}><h6>Delete</h6></button>
       </div>
       </div>
       </>
     : <><div className="col-10 py-4 px-4" onClick={handleLinkToPost} style={{cursor: 'pointer'}}>
       <p>{comment.body}</p>
       </div>
       </> }
       </>
     }
    </div>
    { location.pathname.split('/')[1] == 'posts'
    ? <div className="row">
      <CreateComment post={comment.post} replyTo={comment._id} />
     </div>
    : null}
    </>
  )
}

export default Comment