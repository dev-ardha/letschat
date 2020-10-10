const router = require('express').Router();
const argon2 = require('argon2');
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');

router.get('/me/:id', async(req, res)=> {
    const meId = req.params.id;

    const me = await User.findById(meId).populate({
        path : 'rooms',
        populate : {
            path : 'participants messages'
        }
    }).populate('contacts')

    if(me){
        res.status(200).send({user: me, secret: process.env.ACCESS_TOKEN_SECRET})
    }
})

router.post('/register',  async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    try {
        const hashedPassword = await argon2.hash(password);

        const user = await User.findOne({username})
        if(user){
            res.status(400).send({msg: "User has already exist."})
        }

        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });

        const accessToken = jwt.sign({ id: newUser._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).send({msg: "Authentication success.", token: accessToken, user: newUser})

    } catch (err) {
        res.status(500).send({msg: "There's a problem. Please try again."})
    }
    
})

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const hashedPassword = req.body.password;

    try {
        const user = await User.findOne({email: email})
        if(!user){
            res.status(400).send({msg: "User not found."})
        }

        const valid = await argon2.verify(user.password, hashedPassword)

        if(!valid){
            res.status(401).send({msg:"Email or password invalid."})
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).send({msg: "Authentication success.", token: accessToken, user: user})

    } catch (error) {
        console.log(error)
        res.status(500).send({msg: "There's a problem. Please try again."})
    }
})

module.exports = router;