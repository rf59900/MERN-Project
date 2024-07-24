const path = require('path');
const mongoose = require('mongoose');
const User = require(path.join('..', 'models', 'User'));
const bcrypt = require('bcrypt');
const fs = require('fs');
const dotenv = require('dotenv');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');
dotenv.config()


const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;

const s3 = new S3Client({
    region: bucketRegion
});

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

// deletes uploaded avatar image when other fields don't meet requirements
const deleteAvatar = (avatar) => {
    if (avatar != null) {
        fs.unlink(avatar, (err, data) => {
            if (err) {
                console.error("Avatar Image could not be deleted");
                res.status(400).json({"ERROR": "Avatar image could not be deleted"});
                return;
            } else {
                return;
            }
    })
    } else {
        return;
    }
}

const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}

const createUser = async (req, res) => {
    // avatar is either path to avatar image or null
    const avatar = req.file == undefined ? null: req.file.originalname;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    const email = req.body.email;
    const roles = req?.body?.roles;

    console.log(req.file)

    // do error checking
    if (firstname.length <= 2) {
        res.status(400).json({"Error": "firstname must be over 2 chars in length"});
        deleteAvatar(avatar)
        return;
    }
    if (lastname.length <= 2) {
        res.status(400).json({"Error": "lastname must be over 2 chars in length"});
        deleteAvatar(avatar)
        return;
    }

    // check if username is already used
    if (await User.exists({username: username})) {
        res.status(400).json({"Error": "username is in use"});
        deleteAvatar(avatar)
        return;
    }
    
    // check if password is already used
    if (await User.exists({email: email})) {
        res.status(400).json({"Error": "email is in use"});
        deleteAvatar(avatar)
        return;
    }

    // check if valid email address
    let re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) {
        res.status(400).json({"Error": "Invalid email address"});
        deleteAvatar(avatar)
        return;
    }

    if (password1 != password2) {
        res.status(400).json({"Error": "Passwords do not match"});
        deleteAvatar(avatar)
        return;
    }

    // check if password contains a special character
    re = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/;
    if (!re.test(password1)) {
        res.status(400).json({"Error": "Password must contain a special character"});
        deleteAvatar(avatar)
        return;
    }

    // create new user in db, hash password with bcrypt
    // if user has avatar save in s3 bucket with randomized name, save name in db
    try {
        if (!(avatar == null)) {

            const imageName = randomImageName();

            const params = {
                Bucket: bucketName,
                Key: 'avatars/' + imageName,
                Body: req.file.buffer,
                ContentType: req.file.mimetype
            }

            const command = new PutObjectCommand(params);

            await s3.send(command);

            const newUser = new User({ firstname: firstname, lastname: lastname, username: username, password: await bcrypt.hash(password1, 10), email: email, roles: roles, avatar: 'avatars/' + imageName});
            await newUser.save();

            res.status(200).json({"Sucess": "New user created"});
            return;
        } else {
            const newUser = new User({ firstname: firstname, lastname: lastname, username: username, password: await bcrypt.hash(password1, 10), email: email, roles: roles, avatar: avatar});
            await newUser.save();

            res.status(200).json({"Sucess": "New user created"});
        }
        } catch(err) {
            console.error(err);
        }
}

const getUser = async (req, res) => {
    if (await User.exists({ username: req.params.username })) {
        const user =  await User.find({ username: req.params.username });
        res.status(200).json(user);
        return;
    } else {
        res.status(404).json({"Error": "User does not exist"});
        return;
    }
}

const deleteUser = async (req, res) => {
    const toBeDeleted = await User.findOneAndDelete({username : req.params.username})
    if (toBeDeleted) {
        if (toBeDeleted.avatar != null) {
            fs.unlink(toBeDeleted.avatar, (err, data) => {
                if (err) {
                    console.error("Avatar Image could not be deleted");
                    res.status(400).json({"ERROR": "Avatar image could not be deleted"});
                    return;
                } else {
                    res.status(200).json({"SUCCESS": "User Deleted"});
                    return;
                }
        })
        } else {
            res.status(200).json({"SUCCESS": "User Deleted"});
            return;
        }
    } else {
        res.status(400).json({"ERROR": "User does not exist"});
        return;
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    deleteUser
}
