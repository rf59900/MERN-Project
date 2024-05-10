import { AvatarImage } from "./AvatarImage"

 export const Post = ({postInfo}) => {
   return (
     <>
    <div className="row p-3 gap-3">
    <div className="col bg-primary pt-2"
    style={{maxWidth: "5rem"}}><AvatarImage username={postInfo.user.username} image={postInfo.user.avatar}/></div>
    <div className="col bg-primary"
    style={{maxWidth: "8rem",}}>
    <img src={'/uploads/posts/' + postInfo.img} className="figure-img img-fluid rounded pt-2" 
    style={{height: "10rem"}}/>
    </div>
    <div className="col bg-primary"
    style={{maxWidth: "35rem"}}>
    <div className="row">{postInfo._id}</div>
    <div className="row">{postInfo.body}</div>
    </div>
    </div>
     </>
   )
 }
 