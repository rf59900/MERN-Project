const path = require('path');
const mongoose = require('mongoose');
const User = require(path.join('..', 'models', 'User'));
const bcrypt = require('bcrypt');

const getAllUsers = (req, res) => {
    res.send("GET Users");
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
        res.json({"Error": "firstname must be over 2 chars in length"}).status(400);
        return;
    }
    if (lastname.length <= 2) {
        res.json({"Error": "lastname must be over 2 chars in length"}).status(400);
        return;
    }

    // check if username is already used
    if (await User.exists({username: username})) {
        res.json({"Error": "username is in use"}).status(400);
        return;
    }
    
    // check if password is already used
    if (await User.exists({email: email})) {
        res.json({"Error": "email is in use"}).status(400);
        return;
    }

    // check if valid email address
    let re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) {
        res.json({"Error": "Invalid email address"}).status(400);
        return;
    }

    if (password1 != password2) {
        res.json({"Error": "Passwords do not match"}).status(400);
        return;
    }

    // check if password contains a special character
    re = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/;
    if (!re.test(password1)) {
        res.json({"Error": "Password must contain a special character"}).status(400);
        return;
    }

    const newUser = new User({ firstname: firstname, lastname: lastname, username: username, password: await bcrypt.hash(password1, 10), email: email, avatar: avatar});
    await newUser.save();

    res.send(newUser)
}

const getUser = (req, res) => {
    res.send(`Get ID: ${req.params.id}`);
}

module.exports = {
    getAllUsers,
    createUser,
    getUser
}
