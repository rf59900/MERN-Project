const path = require('path');
const mongoose = require('mongoose');
const User = require(path.join('..', 'models', 'User'));
const Post = require(path.join('..', 'models', 'Post'));
const Comment = require(path.join('..', 'models', 'Comment'));
const fs = require('fs');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');




const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;

const s3 = new S3Client({
    region: bucketRegion
});

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');


// shout outs geeksforgeeks
const isValidObjectId = (id) => {
    if(mongoose.Types.ObjectId.isValid(id)){
        if((String)(new mongoose.Types.ObjectId(id)) === id)
            return true;        
        return false;
    }
    return false;
}

const getAllPosts = async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
}

const createPost = async (req, res) => {
    // img is either path to post image or null
    img = req.file == undefined ? null: req.file.originalname;
    body = req.body.body;
    board = req.body.board;

    if (!body) {
        res.status(400).json({"ERROR": "Post requires body"});
        return;
    }

    const user = await User.findOne({ username: req.user });
    id = user._id;

    if (img != null) {
        const imageName = randomImageName();

        const params = {
            Bucket: bucketName,
            Key: 'posts/' + imageName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        }

        const command = new PutObjectCommand(params);

        await s3.send(command);

        const newPost = new Post({ img: 'posts/' + imageName, body: body, board: board, user: id});
        await newPost.save();

        res.status(200).json({"SUCCESS": "New post created"});
        return;
    } else {
        const newPost = new Post({ img: img, body: body, board: board, user: id});
        await newPost.save();

        res.status(200).json({"SUCCESS": "New post created"});
        return;
    }
}

const deletePost = async (req, res) => {
    // must check that id sent is a valid id or delete query explodes
    const id = req.params.identifier;
    if (!(isValidObjectId(id))) {
        res.status(400).json({"ERROR": "Invalid Post id"});
        return;
    }

    // deletes post and image associated with post if it has one
    const toBeDeleted = await Post.findOneAndDelete({_id : id})
    if (toBeDeleted) {
        if (toBeDeleted?.img != null) {
            const params = {
                Bucket: bucketName,
                Key: toBeDeleted.img
            }

            const command = new DeleteObjectCommand(params);

            await s3.send(command);
        }
        
        // delete all comments associated with post
        const comments = await Comment.find({ post: toBeDeleted._id});
        for (comment of comments) {
            const deletedComment = await Comment.findOneAndDelete({ _id: comment._id});
            // if comment has image delete it
            if (deletedComment?.img != null) {
                const params = {
                    Bucket: bucketName,
                    Key: deletedComment.img
                }
    
                const command = new DeleteObjectCommand(params);
    
                await s3.send(command);
            }
        }    
    } else {
        res.status(400).json({"ERROR": "Post does not exist"});
        return;
    }
}
   


const getPostsByUser = async (req, res) => {
    username = req.params.identifier
    if (await User.exists({ username: username })) {
        const user = await User.findOne({ username: username });
        const posts =  await Post.find({ user: user._id }).populate("user");
        res.status(200).json(posts);
        return;
    } else {
        res.status(404).json({"ERROR": "User does not exist"});
        return;
    }
}

const getPostsByBoard = async (req, res) => {
    board = req.params.board
    if (await Post.exists({ board: board })) {
        const posts = await Post.find({ board: board }).populate("user");
        res.status(200).json(posts);
        return;
    } else {
        res.status(404).json({"ERROR": "Board has no posts/does not exist"});
        return;
    }
}

const getPostByID = async (req, res) => {
    id = req.params.id
    if (!(isValidObjectId(id))) {
        res.status(400).json({"ERROR": "Invalid Post id"});
        return;
    }
    else if (await Post.exists({ _id: id })) {
        const post = await Post.find({ _id: id }).populate("user");
        res.status(200).json(post);
        return;
    } else {
        res.status(404).json({"ERROR": "Post does not exist"});
        console.log("yes")
        return;
    }
}

module.exports = {
    getAllPosts,
    createPost,
    deletePost,
    getPostsByUser,
    getPostsByBoard,
    getPostByID
}
