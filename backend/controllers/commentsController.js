const path = require('path');
const mongoose = require('mongoose');
const User = require(path.join('..', 'models', 'User'));
const Post = require(path.join('..', 'models', 'Post'));
const Comment = require(path.join('..', 'models', 'Comment'));
const fs = require('fs');

// shout outs geeksforgeeks
const isValidObjectId = (id) => {
    if(mongoose.Types.ObjectId.isValid(id)){
        if((String)(new mongoose.Types.ObjectId(id)) === id)
            return true;        
        return false;
    }
    return false;
}

const getAllComments = async (req, res) => {
    const comments = await Comment.find();
    res.status(200).json(comments);
}

const createComment = async (req, res) => {
    // img is either path to post image or null
    img = req.file == undefined ? null: req.file.filename;
    body = req.body.body == undefined ? null: req.body.body;
    board = req.body.board;
    replyTo = req.body.replyTo == undefined ? null: req.body.replyTo;
    post = req.body.post

    const user = await User.findOne({ username: req.user });
    id = user._id;

    const newComment = new Comment({ img: img, body: body, board: board, user: id, replyTo: replyTo, post: post});
    await newComment.save();

    res.status(200).json({"SUCCESS": "New comment created"});
    return;
}

const deleteComment = async (req, res) => {
    // must check that id sent is a valid id or delete query explodes
    const id = req.params.identifier;
    if (!(isValidObjectId(id))) {
        res.status(400).json({"ERROR": "Invalid comment id"});
        return;
    }
    // deletes post and image associated with post if it has one
    const toBeDeleted = await Comment.findOneAndDelete({_id : id})
    if (toBeDeleted) {
        if (toBeDeleted.img != null) {
            fs.unlink(toBeDeleted.img, (err, data) => {
                if (err) {
                    console.error("Comment Image could not be deleted");
                    res.status(400).json({"ERROR": "Comment image could not be deleted"});
                    return;
                } else {
                    res.status(200).json({"SUCCESS": "Comment Deleted"});
                    return;
                }
        })
        } else {
            res.status(200).json({"SUCCESS": "Comment Deleted"});
            return;
        }
    } else {
        res.status(400).json({"ERROR": "Comment does not exist"});
        return;
    }
   
}

const getCommentsByPost= async (req, res) => {
    const id = req.params.identifier
    if (!isValidObjectId(id)) {
        res.status(404).json({"ERROR": "Invalid post id"});
        return;
    }
    if (await Post.exists({ _id: id })) {
        const comments =  await Comment.find({ post: id });
        res.status(200).json(comments);
        return;
    } else {
        res.status(404).json({"ERROR": "Post does not exist"});
        return;
    }
}

const getAllCommentsByUser= async (req, res) => {
    const username = req.params.username
    if (await User.exists({ username: username })) {
        const user = await User.findOne({ username: username })
        const comments =  await Comment.find({ user: user._id});
        res.status(200).json(comments);
        return;
    } else {
        res.status(404).json({"ERROR": "User does not exist"});
        return;
    }
}



module.exports = {
    getAllComments,
    createComment,
    deleteComment,
    getCommentsByPost,
    getAllCommentsByUser
}
