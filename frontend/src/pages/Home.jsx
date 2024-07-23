import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Board } from "./Board"

const Home = () => {
    const navigate = useNavigate();

    const handleLinkToBoard = (board) => {
        navigate(`/boards/${board}`);
    }
    return (
        <>
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-6 text-center">
                    <h1>Welcome to Web Forum Name</h1>
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                <div className="col-6 text-center border border-secondary rounded guidebox">
                    <div className="row justify-content-center border-bottom border-secondary">
                        <div className="col-4">
                            <h2>Topics</h2>
                        </div>
                    </div>
                    <div className="row border-bottom border-secondary" onClick={() => handleLinkToBoard('a')} style={{cursor: 'pointer'}}>
                        <div className="col-3 py-1 border-end border-secondary">
                            <img className="img-fluid" src="icons/question_mark.svg" style={{width: '3rem'}}/>
                        </div>
                        <div className="col-3 py-2 border-end border-secondary">
                            <h3>Anything</h3>
                        </div>
                        <div className="col-6 py-3 nowrap">
                            <h6>Posts about Anything</h6>
                        </div>
                    </div>
                    <div className="row border-bottom border-secondary" onClick={() => handleLinkToBoard('f')} style={{cursor: 'pointer'}}>
                        <div className="col-3 py-1 border-end border-secondary">
                            <img className="img-fluid" src="icons/dumbell.svg" style={{width: '3rem'}}/>
                        </div>
                        <div className="col-3 py-2 border-end border-secondary">
                            <h3>Fitness</h3>
                        </div>
                        <div className="col-6 py-3 nowrap">
                            <h6>Posts about Fitness & Wellness</h6>
                        </div>
                    </div>
                    <div className="row border-bottom border-secondary" onClick={() => handleLinkToBoard('t')} style={{cursor: 'pointer'}}>
                        <div className="col-3 py-1 border-end border-secondary">
                            <img className="img-fluid" src="icons/programming.svg" style={{width: '3rem'}}/>
                        </div>
                        <div className="col-3 py-2 border-end border-secondary">
                            <h3>Tech</h3>
                        </div>
                        <div className="col-6 py-3 nowrap">
                            <h6>Posts about programming & technology</h6>
                        </div>
                    </div>
                    <div className="row border-bottom border-secondary" onClick={() => handleLinkToBoard('o')} style={{cursor: 'pointer'}}>
                        <div className="col-3 py-1 border-end border-secondary">
                            <img className="img-fluid" src="icons/pine_tree.svg" style={{width: '3rem'}}/>
                        </div>
                        <div className="col-3 py-2 border-end border-secondary">
                            <h3>Outdoors</h3>
                        </div>
                        <div className="col-6 py-3 nowrap">
                            <h6>Posts about nature & the outdoors</h6>
                        </div>
                    </div>
                    <div className="row border-bottom border-secondary" onClick={() => handleLinkToBoard('c')} style={{cursor: 'pointer'}}>
                        <div className="col-3 py-1 border-end border-secondary">
                            <img className="img-fluid" src="icons/fork.svg" style={{width: '3rem'}}/>
                        </div>
                        <div className="col-3 py-2 border-end border-secondary">
                            <h3>Food</h3>
                        </div>
                        <div className="col-6 py-3 nowrap">
                            <h6>Posts about food & cooking</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
  )
}

export default Home