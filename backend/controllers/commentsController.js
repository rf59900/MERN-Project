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

const getAllComments = async (req, res) => {
    const comments = await Comment.find();
    res.status(200).json(comments);
}

const createComment = async (req, res) => {
    // img is either path to post image or null
    const img = req.file == undefined ? null: req.file.originalname;
    const body = req.body.body == undefined ? null: req.body.body;
    const board = req.body.board;
    const replyTo = req.body.replyTo == undefined ? null: req.body.replyTo;
    const post = req.body.post

    const user = await User.findOne({ username: req.user });
    const id = user._id;

    if (img != null) {
        const imageName = randomImageName();

        const params = {
            Bucket: bucketName,
            Key: 'comments/' + imageName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        }

        const command = new PutObjectCommand(params);

        await s3.send(command);

        const newComment = new Comment({ img: 'comments/' + imageName, body: body, board: board, user: id, replyTo: replyTo, post: post});
        await newComment.save();
        res.status(200).json({"SUCCESS": "New comment created"});
        return;
    } else {
        const newComment = new Comment({ img: img, body: body, board: board, user: id, replyTo: replyTo, post: post});
        await newComment.save();
         res.status(200).json({"SUCCESS": "New comment created"});
         return;
    }

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
        if (toBeDeleted?.img != null) {
            const params = {
                Bucket: bucketName,
                Key: toBeDeleted.img
            }

            const command = new DeleteObjectCommand(params);

            await s3.send(command);
        }
        // delete replies to comment
        const replies = await Comment.find({ replyTo: toBeDeleted._id});
        for (reply of replies) {
            const deletedReply = await Comment.findOneAndDelete({ _id : reply._id});
            if (deletedReply.img != null) {
                const params = {
                    Bucket: bucketName,
                    Key: deletedReply.img
                }
    
                const command = new DeleteObjectCommand(params);
    
                await s3.send(command);
            }
        }
        res.status(200).json({"SUCCESS": "Comment deleted"})
        return;
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
        const comments =  await Comment.find({ post: id }).populate("user");
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
        const comments =  await Comment.find({ user: user._id}).populate("user");
        console.log(comments)
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
