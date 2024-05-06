const path = require('path');
const mongoose = require('mongoose');
const User = require(path.join('..', 'models', 'User'));
const Post = require(path.join('..', 'models', 'Post'));

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
    const id = req.params.username;
    if (!(isValidObjectId(id))) {
        res.status(400).json({"ERROR": "Invalid Post id"});
        return;
    }
    if ((await Post.deleteOne({_id: id})) > 0) {
        res.status(200).json({"SUCCESS": "Post Deleted"});
        return;
    } else {
        res.status(400).json({"ERROR": "Post does not exist"});
        return;
    }
   
}

const getPostsByUser = async (req, res) => {
    if (await User.exists({ username: req.params.username })) {
        const user = await User.findOne({ username: req.params.username });
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
