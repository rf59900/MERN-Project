# CurrentConversations

## About

Created in the summer of 2024 by Ryan Frederick, CurrentConversations is a web forum reminiscent of the past with some modern flare.
<br/>

## Features

CurrentConversations seeks to give its users the ability to create meaningful conversations between users with features such as multiple topic boards (Currenly 5, but can support an infinite amount), posts that support images, comments that support images, and nested replies that also support images. Users can express themselves through an avatar image or have none at all, at any time users can change their avatar (By clicking their own profile image on their profile page). Users can view their own or others profiles where they can see all of their posts and comments as well as an about section. CurrentConversations is moderated by admin users who have the ability to delete posts (Which also deletes the post image and all comments and images associated with those comments), delete comments (Which also deletes the comment image and all replies with their images), as well as deleting users (Which deletes all of a users posts, comments, and associated images).
<br/>

## Technology Used

CurrentConversations utilizes React to provide a smooth, interactive, and current display for users on the frontend. On the backend NodeJS and ExpressJS are used to create a RESTful API that supplies data to the frontend from a MongoDB database with a seperate S3 bucket for image storage. CurrentConversations is hosted on AWS, with CloudFront being used as a CDN for providing the frontend which is hosted on an S3 bucket, and the backend which is hosted on a seperate EC2 instance. CurrentConversations utilizes JSON webtokens to provide authentication for users.
<br/>

## See it in action at: https://forum.ryan-frederick.com/
