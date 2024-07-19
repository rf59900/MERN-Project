import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Post } from "../components/Post";

export const Board = () => {
    const { board } = useParams();
    const [posts, setPosts] = useState([]);
    const axiosPrivate = useAxiosPrivate()
    const handlePosts = useEffect(() => {
      async function getPosts () {
        try {
          const response = await axiosPrivate.get(`/boards/${board}`);
          console.log(response.data)
          const newPosts = response.data
          setPosts(newPosts);
        } catch(err) {
          console.log(err)
        }
      }
    getPosts()
    }, []) 
    return (
      <>
      <div className="container border border-primary">
        <h1>Welcome to {board}</h1>
        <CreatePost board={board}/>
        {posts.map((post) => {
          return <Post post={post}/>
        })}
      </div>
      </>
    )
}
