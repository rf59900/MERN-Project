const path = require('path');
const mongoose = require('mongoose');
const User = require(path.join('..', 'models', 'User'));
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}

const createUser = async (req, res) => {
    // avatar is either path to avatar image or null
    avatar = req.file == undefined ? null: req.file.path;
    firstname = req.body.firstname;
    lastname = req.body.lastname;
    username = req.body.username;
    password1 = req.body.password1;
    password2 = req.body.password2;
    email = req.body.email;

    // do error checking
    if (firstname.length <= 2) {
        res.status(400).json({"Error": "firstname must be over 2 chars in length"});
        return;
    }
    if (lastname.length <= 2) {
        res.status(400).json({"Error": "lastname must be over 2 chars in length"});
        return;
    }

    // check if username is already used
    if (await User.exists({username: username})) {
        res.status(400).json({"Error": "username is in use"});
        return;
    }
    
    // check if password is already used
    if (await User.exists({email: email})) {
        res.status(400).json({"Error": "email is in use"});
        return;
    }

    // check if valid email address
    let re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) {
        res.status(400).json({"Error": "Invalid email address"});
        return;
    }

    if (password1 != password2) {
        res.status(400).json({"Error": "Passwords do not match"});
        return;
    }

    // check if password contains a special character
    re = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/;
    if (!re.test(password1)) {
        res.status(400).json({"Error": "Password must contain a special character"});
        return;
    }

    // create new user in db, hash password with bcrypt
    const newUser = new User({ firstname: firstname, lastname: lastname, username: username, password: await bcrypt.hash(password1, 10), email: email, avatar: avatar});
    await newUser.save();

    res.status(200).json({"Sucess": "New user created"});
    return;
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
    if (await User.exists({ username: req.params.username })) {
        const user =  await User.deleteOne({ username: req.params.username });
        res.status(200).json({"Sucess": "User deleted"});
        return;
    } else {
        res.status(404).json({"Error": "User does not exist"});
        return;
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    deleteUser
}
