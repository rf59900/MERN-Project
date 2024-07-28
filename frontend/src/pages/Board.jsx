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

    const current_boards = {
      'a': {'name' :'Anything', 'icon': 'question_mark.svg'},
      'f': {'name' :'Fitness & Wellness', 'icon': 'dumbell.svg'},
      't': {'name' :'Tech & Programming', 'icon': 'programming.svg'},
      'o': {'name' :'Outdoors & Nature', 'icon': 'pine_tree.svg'},
      'c': {'name' :'Food & Cooking', 'icon': 'fork.svg'}
    }

    const handlePosts = useEffect(() => {
      async function getPosts () {
        try {
          const response = await axiosPrivate.get(`/boards/${board}`);
          //console.log(response.data)
          const newPosts = response.data
          setPosts(newPosts);
        } catch(err) {
          console.error(err)
        }
      }
    getPosts()
    }, []) 
    return (
      <>
      { Object.keys(current_boards).includes(board)
      ? 
        <div className="container mb-5">
          <div className="row justify-content-center mt-3">
            <div className="col-4 text-center border border-dark rounded post-header">
              <div className="row justify-content-start">
                <div className="col-3 border-end border-dark">
                  <img className="img-fluid" src={`/icons/${current_boards[board].icon}`}  style={{width: '8rem'}}/>
                </div>
                <div className="col-9 mt-4 text-center">
                  <h4>{current_boards[board].name}</h4>
                </div>
              </div>
            </div>
          </div>
        <CreatePost board={board}/>
        {posts.map((post) => {
          return <Post post={post}/>
        })}
        { posts.length == 0
          ? <p className="mt-5">No posts here yet...</p>
          : null
        }
        </div>
      : 
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-4 text-center">
              <h3>Board Not Found...</h3>
            </div>
          </div>
        </div> }
      </>
    )
}
