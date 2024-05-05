const path = require('path');
const mongoose = require('mongoose');
const User = require(path.join('..', 'models', 'User'));
const Post = require(path.join('..', 'models', 'Post'));

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
    if (await Post.exists({ _id: req.params.id })) {
        const post =  await Post.deleteOne({ _id: req.params.id });
        res.status(200).json({"SUCCESS": "Post deleted"});
        return;
    } else {
        res.status(404).json({"ERROR": "Post does not exist"});
        return;
    }
}

const viewPostsByUser = async (req, res) => {
    if (await Post.exists({ _id: req.params.id })) {
        const post =  await Post.deleteOne({ _id: req.params.id });
        res.status(200).json({"SUCCESS": "Post deleted"});
        return;
    } else {
        res.status(404).json({"ERROR": "Post does not exist"});
        return;
    }
}

module.exports = {
    getAllPosts,
    createPost,
    deletePost
}
