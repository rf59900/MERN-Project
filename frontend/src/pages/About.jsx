
const About = () => {
  return (
    <>
    <div className="container">
        <div className="row mt-5 mb-5">
            <div className="row justify-content-start">
                <div className="col-4 border border-primary rounded guidebox">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center post-header">
                            <h1 className="underline tex-center">Purpose</h1>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 text-start">
                            <p>CurrentConversations was founded and created by Ryan Frederick during the summer of 2024 with the goal of creating a web forum reminiscent of the past with some modern flare.</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="row justify-content-end mt-5">
                <div className="col-8 border border-primary rounded guidebox">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center post-header">
                            <h1 className="underline tex-center">Features</h1>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 text-start">
                            <p>CurrentConversations seeks to give its users the ability to create meaningful conversations between users with features such as multiple topic boards (Currenly 5, but can support an infinite amount), posts that support images, comments that support images, and nested replies that also support images. Users can express themselves through an avatar image or have none at all, at any time users can change their avatar (By clicking their own profile image on their profile page). Users can view their own or others profiles where they can see all of their posts and comments as well as an about section. CurrentConversations is moderated by admin users who have the ability to delete posts (Which also deletes the post image and all comments and images associated with those comments), delete comments (Which also deletes the comment image and all replies with their images), as well as deleting users (Which deletes all of a users posts, comments, and associated images).</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="row justify-content-start mt-5">
                <div className="col-6 border border-primary rounded guidebox">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center post-header">
                            <h1 className="underline tex-center">Technology Used</h1>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 text-start">
                            <p>CurrentConversations utilizes React to provide a smooth, interactive, and current display for users on the frontend. On the backend NodeJS and ExpressJS are used to create a RESTful API that supplies data to the frontend from a MongoDB database with a seperate S3 bucket for image storage. CurrentConversations is hosted on AWS, with CloudFront being used as a CDN for providing the frontend which is hosted on an S3 bucket, and the backend which is hosted on a seperate EC2 instance. CurrentConversations utilizes JSON webtokens to provide authentication for users.</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="row justify-content-end mt-5">
                <div className="col-4 border border-primary rounded guidebox">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center post-header">
                            <h1 className="underline tex-center">The Creator</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-start">
                            <p>Ryan Frederick is a passionate full stack web developer and a graduate from Western Michigan University having recieved a bachelor's degree in computer science.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default About