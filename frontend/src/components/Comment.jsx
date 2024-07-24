import { Link, useNavigate, useLocation } from "react-router-dom"
import { AvatarImage } from "./AvatarImage"
import { useEffect } from "react"
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import CreateComment from "./CreateComment"
import useImageURL from "../hooks/useImageURL"


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
  
    
  return (
    <>
    <div id={comment._id} className="row post-header d-flex flex-row border border-bottom-0 border-dark rounded-top justify-content-end mt-5">
     <div className="col-2 text-end px-auto mx-0 ">
      {comment.createdAt.split('T')[0]} {comment.createdAt.split('T')[1].split('.')[0]}
    </div>
    </div>
    <div className={ location.pathname.startsWith('/posts') ? "row flex-row justify-content-start post-body border border-bottom-0 border-dark" : "row flex-row justify-content-start post-body border rounded-bottom border-dark" }>
    <div className="col-2 py-4 px-4 border-end border-dark" onClick={handleLinkToUser} style={{cursor: 'pointer'}}>
     { comment?.user?.avatar != null
      ? <><img  className="img-fluid img-thumbnail" src={useImageURL(comment.user.avatar)}/>
         <div className="d-flex flex-row justify-content-center py-3"><p className="mt-3">{comment?.user?.username}</p></div>
         </>
      : <>
         <div className="d-flex flex-row justify-content-center py-3"><p className="mt-3">{comment?.user?.username}</p></div>
      </>
     }
     </div>
     { 
     comment?.img
     ? <><div className="col-3 py-4 px-4"><img  className="img-fluid img-thumbnail" src={useImageURL(comment.img)}/></div>
     { auth?.roles?.includes('Admin')
     ? <><div className="col-6 py-4 px-4">
       <p>{comment.body}</p>
       </div>
       <div className="col-1 d-flex align-items-center">
       <div className="mx-auto">
       <button className="btn btn-danger" onClick={handleDeleteComment}><h6>Delete</h6></button>
       </div>
       </div>
       </>
     : <><div className="col-7">
       <p>{comment.body}</p>
       </div>
       </> }
     </>
     : <> { auth?.roles?.includes('Admin')
     ? <><div className="col-9 py-4 px-4">
       <p>{comment.body}</p>
       </div>
       <div className="col-1 d-flex align-items-center">
       <div className="mx-auto">
       <button className="btn btn-danger" onClick={handleDeleteComment}><h6>Delete</h6></button>
       </div>
       </div>
       </>
     : <><div className="col-10 py-4 px-4">
       <p>{comment.body}</p>
       </div>
       </> }
       </>
     }
    </div>
    { location.pathname.split('/')[1] == 'posts'
    ? <div className="row post-body border border-dark rounded-bottom">
      <CreateComment post={comment.post} replyTo={comment._id} />
     </div>
    : null}
    </>
  )
}

export default Comment