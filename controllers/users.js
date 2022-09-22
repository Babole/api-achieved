const User = require ('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function index(req, res) {
    try {
        const users = await User.all;
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function create(req, res) {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt)
        await User.create({...req.body, password: hashed})
        res.status(201).json({msg: 'User created'})
    } catch (err) {
        res.status(500).json({err});
    }
}

async function showByUsername (req, res) {
    try {
        const user = await User.findByUsername(req.body.name)
        console.log(user)
        if(!user){ throw new Error('No user found') }
        const authed = bcrypt.compare(req.body.password, user.password)
        if (!!authed){
            const payload = { username: user.name, user_id: user.id, streak: user.streak, last_update: user.last_update }
            const sendToken = (err, token) => {
                console.log(token)
                if(err){ throw new Error('Error in token generation') }
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            }
            jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, sendToken);
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        res.status(401).json({ err });
    }
}

async function update (req, res) {
    try {
        const user = await User.updateUser(req.body)
        const payload = { username: user.name, user_id: user.id, streak: user.streak, last_update: user.last_update }
        const sendToken = (err, token) => {
            if(err){ throw new Error('Error in token generation') }
            res.status(200).json({
                success: true,
                token: "Bearer " + token,
            });
        }
        jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, sendToken);
    } catch (err) {
        res.status(500).json({err});
    }
}

module.exports = { index, create, showByUsername, update }
