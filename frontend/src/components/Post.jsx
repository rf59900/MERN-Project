import { Link } from "react-router-dom"
import { AvatarImage } from "./AvatarImage"
import { useEffect } from "react"


 export const Post = ({post}) => {

   return (
     <>
     <div className="row justify-content-start border border-primary mt-5 mb-5">
     <div className="col-2 border border-primary py-5 px-4">
      <img  className="img-fluid border border-danger my-auto" src={'/uploads/avatars/' + post.user.avatar}/>
      <div className="d-flex flex-row border border-danger justify-content-center py-3"><p>{post.user.username}</p></div>
      </div>
      <div className="col-3 border border-primary py-5 px-4"><img  className="img-fluid border border-danger my-auto" src={'/uploads/posts/' + post.img}/></div>
      <div className="col-7 border border-primary py-5 px-4">
      <p>{post.body}</p>
      </div>
     </div>
     </>
   )
 }
 