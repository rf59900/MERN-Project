import { Link, useNavigate } from "react-router-dom"
import { AvatarImage } from "./AvatarImage"
import { useEffect } from "react"
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import CreateComment from "./CreateComment"


const Comment = ( {comment }) => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate();
    const handleDeleteComment = async () => {
        try {
          const response = await axiosPrivate.delete(`/comments/${post._id}`);
          window.location.reload(); 
        } catch(err) {
          console.error(err);
        }
    }

    const handleLinkToUser = () => {
        // navigate to view user page
    }
    
    
  return (
    <>
    <div className="row flex-row justify-content-start border border-primary mt-5">
    <div className="col-2 border border-primary py-4 px-4" onClick={handleLinkToUser} style={{cursor: 'pointer'}}>
     { comment.user.avatar != null
      ? <><img  className="img-fluid border border-danger" src={'/uploads/avatars/' + comment.user.avatar}/>
         <div className="d-flex flex-row border border-danger justify-content-center py-3"><p className="mt-3">{comment.user.username}</p></div>
         </>
      : <>
         <div className="d-flex flex-row border border-danger justify-content-center py-3"><p className="border border-primary mt-3">{comment.user.username}</p></div>
      </>
     }
     </div>
     { 
     comment?.img
     ? <><div className="col-3 border border-primary py-4 px-4"><img  className="img-fluid border border-danger" src={'/uploads/comments/' + comment.img}/></div>
     { auth?.roles?.includes('Admin')
     ? <><div className="col-6 border border-primary py-4 px-4">
       <p className="border border-danger">{comment.body}</p>
       </div>
       <div className="col-1 d-flex align-items-center border border-primary">
       <div className="mx-auto">
       <button className="btn btn-danger" onClick={handleDeleteComment}><h6>Delete</h6></button>
       </div>
       </div>
       </>
     : <><div className="col-7 border border-primary py-4 px-4">
       <p className="border border-danger">{comment.body}</p>
       </div>
       </> }
     </>
     : <> { auth?.roles?.includes('Admin')
     ? <><div className="col-9 border border-primary py-4 px-4">
       <p className="border border-danger">{comment.body}</p>
       </div>
       <div className="col-1 d-flex align-items-center border border-primary">
       <div className="mx-auto">
       <button className="btn btn-danger" onClick={handleDeleteComment}><h6>Delete</h6></button>
       </div>
       </div>
       </>
     : <><div className="col-10 border border-primary py-4 px-4">
       <p className="border border-danger">{comment.body}</p>
       </div>
       </> }
       </>
     }
    </div>
    <div className="row">
      <CreateComment post={comment.post} replyTo={comment._id} />
     </div>
    </>
  )
}

export default Comment