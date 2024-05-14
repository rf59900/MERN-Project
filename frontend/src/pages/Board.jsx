import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { useEffect, useState } from "react";

export const Board = () => {
    const { board } = useParams();
    const [posts, setPosts] = useState([]);
    const handlePosts = useEffect(() => {
      async function getPosts () {
        const response = await fetch(`http://localhost:5000/boards/${board}`);
        const newPosts = await response.json();
        setPosts(newPosts);
      }
    getPosts()
    }) 
    return (
      <>
        <h1>Welcome to {board}</h1>
        <div className="container"
        style={{backgroundColor: "red",
        maxWidth: "40rem"
        }}>
        {posts.map(post => {
         return <Post postInfo={post}/>
        })}
        </div>
      </>
    )
}
