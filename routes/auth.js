const router = require('express').Router();
const argon2 = require('argon2');
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');
const Room = require('../models/room.model');

router.get('/users', async (req, res)=> {
    try {
        const users = await User.find()

        if(users){
            res.status(400)
        }

        res.status(200).send(users)
    } catch (err) {
        
    }
})

router.get('/me/:id', async(req, res)=> {
    const meId = req.params.id;

    const me = await User.findById(meId).populate({
        path : 'rooms',
        populate : {
            path : 'participants messages'
        }
    }).populate('contacts')

    if(me){
        res.status(200).send(me)
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
            res.status(400).send({msg: "User has already exist"})
        }

        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });

        res.status(201).send(newUser)

    } catch (err) {
        res.status(500)
    }
    
})

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const hashedPassword = req.body.password;

    try {
        const user = await User.findOne({email})
        if(!user){
            res.status(400).send({msg: "User not found"})
        }

        const valid = await bcrypt.compare(hashedPassword, user.password)

        if(!valid){
            res.status(401).send({msg:"Anauthorized"})
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d',
        });

        res.cookie('jwtId', accessToken, { maxAge: 1000*60*60*24, httpOnly: true });
        res.status(200).send({msg: "Authentication success", token: accessToken})

    } catch (error) {
        res.status(500)
    }

    
})

module.exports = router;