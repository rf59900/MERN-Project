const path = require('path');
const mongoose = require('mongoose');
const User = require(path.join('..', 'models', 'User'));
const Post = require(path.join('..', 'models', 'Post'));
const fs = require('fs');

// deletes uploaded post image when other fields don't meet requirements
const deletePostImage = (img) => {
    if (img != null) {
        fs.unlink(img, (err, data) => {
            if (err) {
                console.error("Avatar Image could not be deleted");
                res.status(400).json({"ERROR": "Post image could not be deleted"});
                return;
            } else {
                return;
            }
    })
    } else {
        return;
    }
}

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
    img = req.file == undefined ? null: req.file.path;
    body = req.body.body;
    board = req.body.board;

    if (!body) {
        res.status(400).json({"ERROR": "Post requires body"});
        deletePostImage(img);
        return;
    }

    const user = await User.findOne({ username: req.user });
    id = user._id;

    const newPost = new Post({ img: img, body: body, board: board, user: id});
    await newPost.save();

    res.status(200).json({"SUCCESS": "New post created"});
    return;
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
        if (toBeDeleted.img != null) {
            fs.unlink(toBeDeleted.img, (err, data) => {
                if (err) {
                    console.error("Post Image could not be deleted");
                    res.status(400).json({"ERROR": "Post image could not be deleted"});
                    return;
                } else {
                    res.status(200).json({"SUCCESS": "Post Deleted"});
                    return;
                }
        })
        } else {
            res.status(200).json({"SUCCESS": "Post Deleted"});
            return;
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
        const posts =  await Post.find({ user: user._id });
        res.status(200).json(posts);
        return;
    } else {
        res.status(404).json({"ERROR": "User does not exist"});
        return;
    }
}

module.exports = {
    getAllPosts,
    createPost,
    deletePost,
    getPostsByUser
}