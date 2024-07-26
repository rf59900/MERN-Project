import { Link, useLocation, useNavigate } from "react-router-dom"
import { AvatarImage } from "./AvatarImage"
import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import CreateComment from "./CreateComment"
import useImageURL from "../hooks/useImageURL"


 export const Post = ({post}) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate();
  const location = useLocation();
  const handleImage = useImageURL();
  const [ images, setImages ] = useState();

  useEffect(() => {
    const handleImages = async () => {
      try {
        const postImage = await handleImage(post.img);
        const userImage = await handleImage(post.user.avatar);
        setImages({
          postImage: postImage,
          userImage: userImage
        })
        } catch(err) {
          console.error(err);
        }
      }
      handleImages();
    }, []);


  const handleDeletePost = async () => {
    try {
      await axiosPrivate.delete(`/posts/${post._id}`);
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
     <div className="row d-flex flex-row border border-bottom-0 border-dark rounded-top justify-content-end mt-5 post-header">
     <div className="col-2 text-end px-auto mx-0 ">
      {post.createdAt.split('T')[0]} {post.createdAt.split('T')[1].split('.')[0]}
    </div>
    </div>
     <div className={location.pathname.startsWith('/boards') || location.pathname.startsWith('/users') ? "row flex-row justify-content-start border border-dark rounded-bottom post-body": "row flex-row justify-content-start post-body border border-bottom-0 border-dark" } style={{cursor: 'pointer'}}>
     <div className="col-2 py-4 px-4 border-end border-dark" onClick={handleLinkToUser} style={{cursor: 'pointer'}}>
      { post?.user?.avatar != null
       ? <><img  className="img-fluid img-thumbnail w-100" src={images?.userImage}/>
          <div className="d-flex flex-row justify-content-center py-3"><p className="mt-3">{post.user.username}</p></div>
          </>
       : <>
          <div className="d-flex flex-row justify-content-center py-3"><p className="mt-3">{post?.user?.username}</p></div>
       </>
      }
      </div>
      { 
      post?.img
      ? <><div className="col-3 py-4 px-4" onClick={handleLinkToPost} style={{cursor: 'pointer'}}><img  className="img-fluid img-thumbnail w-100" src={images?.postImage}/></div>
      { auth?.roles?.includes('Admin')
      ? <><div className="col-6 py-4 px-4" onClick={handleLinkToPost} style={{cursor: 'pointer'}}>
        <p>{post.body}</p>
        </div>
        <div className="col-1 d-flex align-items-center">
        <div className="mx-auto">
        <button className="btn btn-danger" onClick={() => {handleDeletePost(); window.location.reload()}}><h6>Delete</h6></button>
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
        <button className="btn btn-danger" onClick={() => {handleDeletePost(); window.location.reload()}}><h6>Delete</h6></button>
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
     ? <div className="row post-body rounded-bottom border border-dark">
      <CreateComment post={post._id} />
     </div>
     : null
     }
     </>
   )
 }
 