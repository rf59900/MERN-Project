
import { useEffect, useState } from "react"
import { AvatarImage } from "./components/AvatarImage";
import { Post } from "./components/Post";

const App = () => {
  const [posts, setPosts] = useState([]);
  const handleUsers = useEffect(() => {
    async function getPosts () {
      const response = await fetch('http://localhost:5000/boards/a');
      const posts = await response.json();
      setPosts(posts);
    }
  getPosts()
  }) 
  return (
    <>
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

export default App