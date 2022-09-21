const User = require ('../models/User')
const bcrypt = require('bcryptjs');

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
        if(!user){ throw new Error('No user found') }
        const authed = bcrypt.compare(req.body.password, user.password)
        if (!!authed){
            res.status(200).json({ user: user.name })
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        res.status(401).json({ err });
    }
}

module.exports = { index, create, showByUsername }
